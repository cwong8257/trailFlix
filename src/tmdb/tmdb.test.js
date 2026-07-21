/**
 * Tests for the frontend TMDB proxy client (src/tmdb/tmdb.js).
 *
 * Seam: the public exported functions — we verify they call the
 * correct proxy path with the right params and return the expected
 * data shape, without hitting the network.
 */

var mockFetch = jest.fn();
globalThis.fetch = mockFetch;

var tmdb = require('./tmdb.js');

function resolve(data) {
  mockFetch.mockImplementation(function() {
    return Promise.resolve({
      ok: true,
      json: function() {
        return Promise.resolve(data.data);
      },
    });
  });
}

beforeEach(function() {
  mockFetch.mockReset();
});

describe('TMDB proxy client', function() {
  test('getMovieDetails calls proxy with correct path', function() {
    var movie = { id: 42, title: 'Test' };
    resolve({ data: movie });

    return tmdb.getMovieDetails(42).then(function(result) {
      expect(mockFetch).toHaveBeenCalledWith('/api/tmdb?path=%2Fmovie%2F42');
      expect(result).toEqual(movie);
    });
  });

  test('getPopular forwards page param', function() {
    resolve({ data: { results: ['a', 'b'] } });

    return tmdb.getPopular(3).then(function(result) {
      expect(mockFetch).toHaveBeenCalledWith('/api/tmdb?path=%2Fmovie%2Fpopular&page=3');
      expect(result).toEqual(['a', 'b']);
    });
  });

  test('getMovieList forwards search params', function() {
    resolve({ data: { results: [] } });

    return tmdb.getMovieList(1, 'inception').then(function() {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/tmdb?path=%2Fsearch%2Fmovie&include_adult=false&page=1&query=inception'
      );
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
      expect(mockFetch).toHaveBeenCalledWith('/api/tmdb?path=%2Fconfiguration');
      expect(result).toEqual(config);
    });
  });

  test('getNowPlaying defaults to page 1', function() {
    resolve({ data: { results: [] } });

    return tmdb.getNowPlaying().then(function() {
      expect(mockFetch).toHaveBeenCalledWith('/api/tmdb?path=%2Fmovie%2Fnow_playing&page=1');
    });
  });

  test('getUpcoming forwards page param', function() {
    resolve({ data: { results: [] } });

    return tmdb.getUpcoming(2).then(function() {
      expect(mockFetch).toHaveBeenCalledWith('/api/tmdb?path=%2Fmovie%2Fupcoming&page=2');
    });
  });

  test('getTopRated forwards page param', function() {
    resolve({ data: { results: [] } });

    return tmdb.getTopRated(5).then(function() {
      expect(mockFetch).toHaveBeenCalledWith('/api/tmdb?path=%2Fmovie%2Ftop_rated&page=5');
    });
  });

  test('getMovieCredits returns results array', function() {
    resolve({ data: { results: [{ name: 'Actor' }] } });

    return tmdb.getMovieCredits(10).then(function(result) {
      expect(mockFetch).toHaveBeenCalledWith('/api/tmdb?path=%2Fmovie%2F10%2Fcredits');
      expect(result).toEqual([{ name: 'Actor' }]);
    });
  });

  test('getSimilar returns results array', function() {
    resolve({ data: { results: [{ id: 2, title: 'Similar' }] } });

    return tmdb.getSimilar(1).then(function(result) {
      expect(mockFetch).toHaveBeenCalledWith('/api/tmdb?path=%2Fmovie%2F1%2Fsimilar');
      expect(result).toEqual([{ id: 2, title: 'Similar' }]);
    });
  });

  test('getMovieReviews defaults to page 1', function() {
    resolve({ data: { results: [] } });

    return tmdb.getMovieReviews(5).then(function() {
      expect(mockFetch).toHaveBeenCalledWith('/api/tmdb?path=%2Fmovie%2F5%2Freviews&page=1');
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
