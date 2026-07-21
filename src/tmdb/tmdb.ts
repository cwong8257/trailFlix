import { TMDBConfig, Movie, Review, CastMember } from '../types/tmdb';

/**
 * Helper – builds the query string expected by the proxy.
 * The proxy reads `path` to know which TMDB endpoint to hit,
 * and forwards everything else as query-string params.
 */
const proxyGet = async (path: string, extraParams: Record<string, string | number | boolean | undefined> = {}) => {
  const params = new URLSearchParams();
  params.append('path', path);
  Object.keys(extraParams).forEach(key => {
    const val = extraParams[key];
    if (val !== undefined) {
      params.append(key, String(val));
    }
  });

  const response = await fetch(`/api/tmdb?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return { data };
};

export const getMovieDetails = async (id: string | number): Promise<Movie> => {
  const response = await proxyGet(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id: string | number): Promise<CastMember[]> => {
  const response = await proxyGet(`/movie/${id}/credits`);
  return response.data.results;
};

export const getSimilar = async (id: string | number): Promise<Movie[]> => {
  const response = await proxyGet(`/movie/${id}/similar`);
  return response.data.results;
};

export const getMovieTrailer = async (id: string | number): Promise<string | undefined> => {
  const response = await proxyGet(`/movie/${id}/videos`);
  const trailers = response.data.results;
  const types = ['Trailer', 'Teaser', 'Featurette', 'Clip'];

  for (let i = 0; i < types.length; i++) {
    let type = types[i];

    for (let j = 0; j < trailers.length; j++) {
      let trailer = trailers[j];

      if (trailer.site === 'YouTube' && trailer.type === type) {
        return trailer.key;
      }
    }
  }
};

export const getMovieReviews = async (id: string | number, page: number = 1): Promise<Review[]> => {
  const response = await proxyGet(`/movie/${id}/reviews`, { page });
  return response.data.results;
};

export const getMovieList = async (page: number, query: string = ''): Promise<Movie[]> => {
  const response = await proxyGet('/search/movie', {
    include_adult: false,
    page,
    query,
  });
  return response.data.results;
};

export const getNowPlaying = async (page: number = 1): Promise<Movie[]> => {
  const response = await proxyGet('/movie/now_playing', { page });
  return response.data.results;
};

export const getUpcoming = async (page: number = 1): Promise<Movie[]> => {
  const response = await proxyGet('/movie/upcoming', { page });
  return response.data.results;
};

export const getPopular = async (page: number = 1): Promise<Movie[]> => {
  const response = await proxyGet('/movie/popular', { page });
  return response.data.results;
};

export const getTopRated = async (page: number = 1): Promise<Movie[]> => {
  const response = await proxyGet('/movie/top_rated', { page });
  return response.data.results;
};

export const getPersonDetails = async (id: string | number): Promise<any> => {
  const response = await proxyGet(`/person/${id}`);
  return response.data;
};

export const getPersonMovieCredits = async (id: string | number): Promise<any[]> => {
  const response = await proxyGet(`/person/${id}/movie_credits`);
  return response.data.results;
};

export const getPersonImages = async (id: string | number): Promise<any[]> => {
  const response = await proxyGet(`/person/${id}/tagged_images`);
  return response.data.results;
};

export const getConfiguration = async (): Promise<TMDBConfig> => {
  const response = await proxyGet('/configuration');
  return response.data;
};

export const getGenreList = async (): Promise<{ id: number; name: string }[]> => {
  const response = await proxyGet('/genre/movie/list');
  return response.data.results;
};
