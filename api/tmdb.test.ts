/**
 * Tests for the /api/tmdb Vercel serverless proxy function.
 *
 * Seam: the exported `handler(req, res)` function — we verify its
 * request-validation and proxying behaviour without making real
 * network calls.
 */

import handler from './tmdb.js';
import { vi } from 'vitest';

// ── helpers ────────────────────────────────────────────────────
function mockReq(overrides = {}) {
  return { method: 'GET', query: {}, ...overrides };
}

function mockRes() {
  const res = {
    _status: null,
    _json: null,
    _headers: {},
    status(code) {
      res._status = code;
      return res;
    },
    json(body) {
      res._json = body;
      return res;
    },
    setHeader(key, value) {
      res._headers[key] = value;
      return res;
    },
  };
  return res;
}

// ── save / restore globals ─────────────────────────────────────
const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;

afterEach(() => {
  process.env = { ...originalEnv };
  globalThis.fetch = originalFetch;
});

// ── tests ──────────────────────────────────────────────────────
describe('api/tmdb handler', () => {
  test('rejects non-GET methods with 405', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'POST' }), res);

    expect(res._status).toBe(405);
    expect(res._json).toEqual({ error: 'Method not allowed' });
  });

  test('returns 500 when TMDB_API_KEY is missing', async () => {
    delete process.env.TMDB_API_KEY;
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = mockRes();
    await handler(mockReq({ query: { path: '/movie/popular' } }), res);

    expect(res._status).toBe(500);
    expect(res._json).toEqual({ error: 'Server misconfiguration' });
    consoleSpy.mockRestore();
  });

  test('returns 400 when path param is missing', async () => {
    process.env.TMDB_API_KEY = 'test-key';
    const res = mockRes();
    await handler(mockReq({ query: {} }), res);

    expect(res._status).toBe(400);
    expect(res._json).toEqual({
      error: 'Missing required "path" query parameter',
    });
  });

  test('proxies a successful TMDB response', async () => {
    process.env.TMDB_API_KEY = 'test-key';
    const tmdbPayload = { results: [{ id: 1, title: 'Test Movie' }] };

    globalThis.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(tmdbPayload),
      }),
    );

    const res = mockRes();
    await handler(
      mockReq({ query: { path: '/movie/popular', page: '2' } }),
      res,
    );

    // Verify upstream URL
    const calledUrl = (globalThis.fetch as any).mock.calls[0][0];
    expect(calledUrl).toContain('https://api.themoviedb.org/3/movie/popular');
    expect(calledUrl).toContain('api_key=test-key');
    expect(calledUrl).toContain('language=en-US');
    expect(calledUrl).toContain('page=2');

    // Verify response
    expect(res._status).toBe(200);
    expect(res._json).toEqual(tmdbPayload);
    expect(res._headers['Cache-Control']).toBe(
      's-maxage=300, stale-while-revalidate=60',
    );
  });

  test('forwards TMDB error status codes', async () => {
    process.env.TMDB_API_KEY = 'test-key';
    const errorPayload = { status_message: 'Not Found', status_code: 34 };

    globalThis.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve(errorPayload),
      }),
    );

    const res = mockRes();
    await handler(
      mockReq({ query: { path: '/movie/99999999' } }),
      res,
    );

    expect(res._status).toBe(404);
    expect(res._json).toEqual(errorPayload);
  });

  test('returns 502 when fetch throws', async () => {
    process.env.TMDB_API_KEY = 'test-key';
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    globalThis.fetch = vi.fn().mockImplementation(() =>
      Promise.reject(new Error('network down')),
    );

    const res = mockRes();
    await handler(
      mockReq({ query: { path: '/movie/popular' } }),
      res,
    );

    expect(res._status).toBe(502);
    expect(res._json).toEqual({ error: 'Failed to reach TMDB' });
    consoleSpy.mockRestore();
  });
});
