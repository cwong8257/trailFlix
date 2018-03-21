getMovieTrailer = id => {
  return fetch(
    'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=df14d9ac8a66811c0dde927cc1ce36c6&language=en-US',
    { mode: 'cors' }
  )
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getMovieCredits = id => {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=df14d9ac8a66811c0dde927cc1ce36c6', {
    mode: 'cors'
  })
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getSimilar = id => {
  return fetch(
    'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=df14d9ac8a66811c0dde927cc1ce36c6&language=en-US',
    { mode: 'cors' }
  )
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getConfiguration = () => {
  return fetch('https://api.themoviedb.org/3/configuration?api_key=df14d9ac8a66811c0dde927cc1ce36c6', { mode: 'cors' })
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getGenreList = () => {
  return fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=df14d9ac8a66811c0dde927cc1ce36c6&language=en-US',
    { mode: 'cors' }
  )
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getMovieList = query => {
  return fetch(
    'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=' +
      query +
      '&language=en-US&api_key=df14d9ac8a66811c0dde927cc1ce36c6',
    { mode: 'cors' }
  )
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getNowPlaying = () => {
  return fetch(
    'https://api.themoviedb.org/3/movie/now_playing?api_key=df14d9ac8a66811c0dde927cc1ce36c6&language=en-US',
    { mode: 'cors' }
  )
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getUpcoming = () => {
  return fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=df14d9ac8a66811c0dde927cc1ce36c6&language=en-US', {
    mode: 'cors'
  })
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getPopular = () => {
  return fetch('https://api.themoviedb.org/3/movie/popular?api_key=df14d9ac8a66811c0dde927cc1ce36c6&language=en-US', {
    mode: 'cors'
  })
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getTopRated = () => {
  return fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=df14d9ac8a66811c0dde927cc1ce36c6&language=en-US', {
    mode: 'cors'
  })
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getMovieDetails = id => {
  return fetch(
    'https://api.themoviedb.org/3/movie/' + id + '?api_key=df14d9ac8a66811c0dde927cc1ce36c6&language=en-US',
    { mode: 'cors' }
  )
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getPersonDetails = id => {
  return fetch(
    'https://api.themoviedb.org/3/person/' + id + '?api_key=df14d9ac8a66811c0dde927cc1ce36c6&language=en-US',
    { mode: 'cors' }
  )
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getPersonMovieCredits = id => {
  return fetch(
    'https://api.themoviedb.org/3/person/' +
      id +
      '/movie_credits?api_key=df14d9ac8a66811c0dde927cc1ce36c6&language=en-US',
    { mode: 'cors' }
  )
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

getPersonImages = id => {
  return fetch(
    'https://api.themoviedb.org/3/person/' +
      id +
      '/tagged_images?api_key=df14d9ac8a66811c0dde927cc1ce36c6&language=en-US',
    { mode: 'cors' }
  )
    .then(function(response) {
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    });
};

export {
  getMovieTrailer,
  getConfiguration,
  getGenreList,
  getMovieList,
  getNowPlaying,
  getUpcoming,
  getMovieCredits,
  getSimilar,
  getMovieDetails,
  getPopular,
  getTopRated,
  getPersonDetails,
  getPersonMovieCredits,
  getPersonImages
};
