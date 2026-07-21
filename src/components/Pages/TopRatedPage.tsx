import React from 'react';

import InfinitePage from './InfinitePage';
import { getTopRated } from '../../tmdb/tmdb';

export default () => <InfinitePage loadMore={getTopRated} title="Top Rated" />;
