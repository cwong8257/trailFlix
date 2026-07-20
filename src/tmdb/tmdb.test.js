/**
 * Tests for the frontend TMDB proxy client (src/tmdb/tmdb.js).
 *
 * Seam: the public exported functions — we verify they call the
 * correct proxy path with the right params and return the expected
 * data shape, without hitting the network.
 */

var mockGet = jest.fn();

jest.mock('axios', function() {
  return {
    create: function() {
      return { get: mockGet };
    },
  };
});

var tmdb = require('./tmdb.js');

function resolve(data) {
  mockGet.mockImplementation(function() {
    return Promise.resolve(data);
  });
}

beforeEach(function() {
  mockGet.mockReset();
});

describe('TMDB proxy client', function() {
  test('getMovieDetails calls proxy with correct path', function() {
    var movie = { id: 42, title: 'Test' };
    resolve({ data: movie });

    return tmdb.getMovieDetails(42).then(function(result) {
      expect(mockGet).toHaveBeenCalledWith('', {
        params: { path: '/movie/42' },
      });
      expect(result).toEqual(movie);
    });
  });

  test('getPopular forwards page param', function() {
    resolve({ data: { results: ['a', 'b'] } });

    return tmdb.getPopular(3).then(function(result) {
      expect(mockGet).toHaveBeenCalledWith('', {
        params: { path: '/movie/popular', page: 3 },
      });
      expect(result).toEqual(['a', 'b']);
    });
  });

  test('getMovieList forwards search params', function() {
    resolve({ data: { results: [] } });

    return tmdb.getMovieList(1, 'inception').then(function() {
      expect(mockGet).toHaveBeenCalledWith('', {
        params: {
          path: '/search/movie',
          include_adult: false,
          page: 1,
          query: 'inception',
        },
      });
    });
  });

  test('getMovieTrailer returns first YouTube Trailer key', function() {
    var trailers = [
      { site: 'Vimeo', type: 'Trailer', key: 'vimeo-key' },
      { site: 'YouTube', type: 'Clip', key: 'clip-key' },
      { site: 'YouTube', type: 'Trailer', key: 'yt-trailer' },
    ];
    resolve({ data: { results: trailers } });

    return tmdb.getMovieTrailer(1).then(function(key) {
      expect(key).toBe('yt-trailer');
    });
  });

  test('getConfiguration returns full data object', function() {
    var config = { images: { base_url: 'https://image.tmdb.org' } };
    resolve({ data: config });

    return tmdb.getConfiguration().then(function(result) {
      expect(mockGet).toHaveBeenCalledWith('', {
        params: { path: '/configuration' },
      });
      expect(result).toEqual(config);
    });
  });

  test('getNowPlaying defaults to page 1', function() {
    resolve({ data: { results: [] } });

    return tmdb.getNowPlaying().then(function() {
      expect(mockGet).toHaveBeenCalledWith('', {
        params: { path: '/movie/now_playing', page: 1 },
      });
    });
  });

  test('getUpcoming forwards page param', function() {
    resolve({ data: { results: [] } });

    return tmdb.getUpcoming(2).then(function() {
      expect(mockGet).toHaveBeenCalledWith('', {
        params: { path: '/movie/upcoming', page: 2 },
      });
    });
  });

  test('getTopRated forwards page param', function() {
    resolve({ data: { results: [] } });

    return tmdb.getTopRated(5).then(function() {
      expect(mockGet).toHaveBeenCalledWith('', {
        params: { path: '/movie/top_rated', page: 5 },
      });
    });
  });

  test('getMovieCredits returns results array', function() {
    resolve({ data: { results: [{ name: 'Actor' }] } });

    return tmdb.getMovieCredits(10).then(function(result) {
      expect(mockGet).toHaveBeenCalledWith('', {
        params: { path: '/movie/10/credits' },
      });
      expect(result).toEqual([{ name: 'Actor' }]);
    });
  });

  test('getSimilar returns results array', function() {
    resolve({ data: { results: [{ id: 2, title: 'Similar' }] } });

    return tmdb.getSimilar(1).then(function(result) {
      expect(mockGet).toHaveBeenCalledWith('', {
        params: { path: '/movie/1/similar' },
      });
      expect(result).toEqual([{ id: 2, title: 'Similar' }]);
    });
  });

  test('getMovieReviews defaults to page 1', function() {
    resolve({ data: { results: [] } });

    return tmdb.getMovieReviews(5).then(function() {
      expect(mockGet).toHaveBeenCalledWith('', {
        params: { path: '/movie/5/reviews', page: 1 },
      });
    });
  });

  test('getPersonDetails returns full data object', function() {
    var person = { id: 3, name: 'Test Person' };
    resolve({ data: person });

    return tmdb.getPersonDetails(3).then(function(result) {
      expect(result).toEqual(person);
    });
  });

  test('getPersonMovieCredits returns results', function() {
    resolve({ data: { results: [{ id: 99 }] } });

    return tmdb.getPersonMovieCredits(3).then(function(result) {
      expect(result).toEqual([{ id: 99 }]);
    });
  });

  test('getPersonImages returns results', function() {
    resolve({ data: { results: [{ file_path: '/img' }] } });

    return tmdb.getPersonImages(3).then(function(result) {
      expect(result).toEqual([{ file_path: '/img' }]);
    });
  });

  test('getGenreList returns results', function() {
    resolve({ data: { results: [{ id: 28, name: 'Action' }] } });

    return tmdb.getGenreList().then(function(result) {
      expect(result).toEqual([{ id: 28, name: 'Action' }]);
    });
  });
});
