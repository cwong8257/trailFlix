import axios from 'axios';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 12000,
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'en-US'
  }
});

export const getMovieDetails = async id => {
  const response = await tmdb.get(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async id => {
  const response = await tmdb.get(`/movie/${id}/credits`);
  return response.data.results;
};

export const getSimilar = async id => {
  const response = await tmdb.get(`/movie/${id}/similar`);
  return response.data.results;
};

export const getMovieTrailer = async id => {
  const response = await tmdb.get(`/movie/${id}/videos`);
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
export const getMovieReviews = async (id, page = 1) => {
  const response = await tmdb.get(`/movie/${id}/reviews?page=${page}`);
  return response.data.results;
};

export const getMovieList = async (page, query) => {
  const response = await tmdb.get(`/search/movie?include_adult=false&page=${page}&query=${query}`);
  return response.data.results;
};

export const getNowPlaying = async page => {
  const response = await tmdb.get(`/movie/now_playing?page=${page}`);
  return response.data.results;
};

export const getUpcoming = async page => {
  const response = await tmdb.get(`/movie/upcoming?page=${page}`);
  return response.data.results;
};

export const getPopular = async page => {
  const response = await tmdb.get(`/movie/popular?page=${page}`);
  return response.data.results;
};

export const getTopRated = async page => {
  const response = await tmdb.get(`/movie/top_rated?page=${page}`);
  return response.data.results;
};

export const getPersonDetails = async id => {
  const response = await tmdb.get(`/person/${id}`);
  return response.data;
};

export const getPersonMovieCredits = async id => {
  const response = await tmdb.get(`/person/${id}/movie_credits`);
  return response.data.results;
};

export const getPersonImages = async id => {
  const response = await tmdb.get(`/person/${id}/tagged_images`);
  return response.data.results;
};

export const getConfiguration = async () => {
  const response = await tmdb.get(`/configuration`);
  return response.data;
};

export const getGenreList = async () => {
  const response = await tmdb.get(`/genre/movie/list`);
  return response.data.results;
};
