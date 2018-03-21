const key = process.env.TMDB_API_KEY;

export const getMovieTrailer = id => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`, { mode: 'cors' }).then(
    function(response) {
      return response.json();
    }
  );
};

export const getMovieCredits = id => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`, {
    mode: 'cors'
  }).then(function(response) {
    return response.json();
  });
};

export const getSimilar = id => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}&language=en-US`, { mode: 'cors' }).then(
    function(response) {
      return response.json();
    }
  );
};

export const getConfiguration = () => {
  return fetch(`https://api.themoviedb.org/3/configuration?api_key=${key}`, {
    mode: 'cors'
  }).then(function(response) {
    return response.json();
  });
};

export const getGenreList = () => {
  return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`, { mode: 'cors' }).then(
    function(response) {
      return response.json();
    }
  );
};

export const getMovieList = query => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${query}&language=en-US&api_key=${key}`,
    { mode: 'cors' }
  ).then(function(response) {
    return response.json();
  });
};

export const getNowPlaying = () => {
  return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US`, { mode: 'cors' }).then(
    function(response) {
      return response.json();
    }
  );
};

export const getUpcoming = () => {
  return fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US`, {
    mode: 'cors'
  }).then(function(response) {
    return response.json();
  });
};

export const getPopular = () => {
  return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US`, {
    mode: 'cors'
  }).then(function(response) {
    return response.json();
  });
};

export const getTopRated = () => {
  return fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US`, {
    mode: 'cors'
  }).then(function(response) {
    return response.json();
  });
};

export const getMovieDetails = id => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`, { mode: 'cors' }).then(
    function(response) {
      return response.json();
    }
  );
};

export const getPersonDetails = id => {
  return fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${key}&language=en-US`, { mode: 'cors' }).then(
    function(response) {
      return response.json();
    }
  );
};

export const getPersonMovieCredits = id => {
  return fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${key}&language=en-US`, {
    mode: 'cors'
  }).then(function(response) {
    return response.json();
  });
};

export const getPersonImages = id => {
  return fetch(`https://api.themoviedb.org/3/person/${id}/tagged_images?api_key=${key}&language=en-US`, {
    mode: 'cors'
  }).then(function(response) {
    return response.json();
  });
};
