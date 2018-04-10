import React from 'react';

import InfinitePage from './InfinitePage';
import { getPopular } from '../../tmdb/tmdb';

export default () => <InfinitePage loadMore={getPopular} title="Most Popular" />;
