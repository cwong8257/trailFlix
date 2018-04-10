import React from 'react';

import InfinitePage from './InfinitePage';
import { getUpcoming } from '../../tmdb/tmdb';

export default () => <InfinitePage loadMore={getUpcoming} title="Upcoming" />;
