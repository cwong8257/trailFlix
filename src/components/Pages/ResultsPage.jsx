import React from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'querystringify';

import InfinitePage from './InfinitePage';
import { getMovieList } from '../../tmdb/tmdb';

const ResultsPage = () => {
  const location = useLocation();
  const { search_query: query } = qs.parse(location.search);
  const title = `Results for "${query}"`;

  return (
    <div>
      {query && <InfinitePage loadMore={getMovieList} title={title} query={query} />}
    </div>
  );
};

export default ResultsPage;


