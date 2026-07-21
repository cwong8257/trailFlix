import React from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'querystringify';

import InfinitePage from './InfinitePage';
import { getMovieList } from '../../tmdb/tmdb';

const ResultsPage = () => {
  const location = useLocation();
  const parsed = qs.parse(location.search) as { search_query?: string };
  const query = parsed.search_query;
  const title = `Results for "${query || ''}"`;

  return (
    <div>
      {query && <InfinitePage loadMore={getMovieList} title={title} query={query} />}
    </div>
  );
};

export default ResultsPage;


