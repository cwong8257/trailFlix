import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'url';

/**
 * Vite plugin that serves Vercel-style serverless functions from the
 * /api directory during development.  This removes the need to run
 * `vercel dev` alongside `vite dev`.
 *
 * It loads .env.development into process.env so the TMDB_API_KEY is
 * available to the handler at runtime.
 */
function vercelApiPlugin() {
  return {
    name: 'vercel-api',
    configureServer(server) {
      // Load .env.development into process.env for the handler
      try {
        const envPath = resolve(process.cwd(), '.env.development');
        const envFile = readFileSync(envPath, 'utf-8');
        envFile.split('\n').forEach(line => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) return;
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx === -1) return;
          const key = trimmed.slice(0, eqIdx);
          const val = trimmed.slice(eqIdx + 1);
          if (!process.env[key]) {
            process.env[key] = val;
          }
        });
      } catch {
        // .env.development is optional
      }

      server.middlewares.use(async (req, res, next) => {
        const parsed = parse(req.url, true);
        if (!parsed.pathname.startsWith('/api/')) return next();

        // Map /api/tmdb → api/tmdb.js handler
        const fnName = parsed.pathname.replace(/^\/api\//, '');
        const fnPath = resolve(process.cwd(), 'api', fnName + '.js');

        let handler;
        try {
          // Use Vite's SSR module loader so ESM imports work
          const mod = await server.ssrLoadModule(fnPath);
          handler = mod.default;
        } catch {
          return next(); // no matching function, pass through
        }

        if (typeof handler !== 'function') return next();

        // Build a Vercel-compatible req.query and res adapter
        req.query = parsed.query;

        const fakeRes = {
          _statusCode: 200,
          _headers: {},
          status(code) {
            fakeRes._statusCode = code;
            return fakeRes;
          },
          json(body) {
            res.writeHead(fakeRes._statusCode, {
              'Content-Type': 'application/json',
              ...fakeRes._headers,
            });
            res.end(JSON.stringify(body));
          },
          setHeader(key, value) {
            fakeRes._headers[key] = value;
          },
        };

        try {
          await handler(req, fakeRes);
        } catch (err) {
          console.error('Serverless function error:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal server error' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), vercelApiPlugin()],
  define: {
    global: 'window',
  },
  build: {
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
  },
});

