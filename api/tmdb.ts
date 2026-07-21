/**
 * Vercel Serverless Function – TMDB API Proxy
 *
 * Proxies requests to the TMDB v3 API so the browser never sees the
 * API key.  The key is read from the `TMDB_API_KEY` environment
 * variable (set in the Vercel dashboard for production, and in
 * `.env.development` locally via `vercel dev`).
 *
 * Usage:
 *   GET /api/tmdb?path=/movie/popular&page=1
 *
 * The `path` query parameter is required and maps to the TMDB v3
 * endpoint (e.g. `/movie/popular`, `/search/movie`).  All other
 * query parameters are forwarded to TMDB as-is.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

const TMDB_BASE = 'https://api.themoviedb.org/3';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error('TMDB_API_KEY is not configured');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const { path, ...params } = req.query;

  if (!path || typeof path !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid required "path" query parameter' });
  }

  // Build the upstream TMDB query string
  const queryParts = [
    'api_key=' + encodeURIComponent(apiKey),
    'language=en-US',
  ];

  // Forward remaining query params
  Object.keys(params).forEach(function(key) {
    const val = params[key];
    if (val !== undefined) {
      const valStr = Array.isArray(val) ? val.join(',') : val;
      queryParts.push(encodeURIComponent(key) + '=' + encodeURIComponent(valStr));
    }
  });

  const url = TMDB_BASE + path + '?' + queryParts.join('&');

  try {
    const upstream = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json(data);
    }

    // Cache successful responses for 5 minutes at the edge
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    return res.status(200).json(data);
  } catch (error) {
    console.error('TMDB proxy error:', error);
    return res.status(502).json({ error: 'Failed to reach TMDB' });
  }
}
