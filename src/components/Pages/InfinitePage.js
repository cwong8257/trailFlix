import React, { useState, useEffect } from 'react';
import { useTMDBConfig } from '../../context/TMDBConfigContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Loading from '../Apps/Loading';
import FullWidthGrid from '../Apps/FullWidthGrid';

const InfinitePage = ({ loadMore, query, title }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [loading, setLoading] = useState(false);
  const config = useTMDBConfig();

  const mapMovies = ({ poster_path, title, id, release_date, overview }) => {
    const img = config.images.secure_base_url + config.images.poster_sizes[3] + poster_path;
    const year = release_date && moment(release_date).format('YYYY');

    return {
      id,
      img,
      title,
      overview,
      year
    };
  };

  const filterMovies = ({ poster_path }) => poster_path;

  const loadItems = async () => {
    if (loading) return;
    setLoading(true);
    const newMovies = await loadMore(page, query);
    const hasMore = page !== 1000 && newMovies.length > 0;

    if (hasMore) {
      setMovies(prev => [...prev, ...newMovies]);
      setPage(prev => prev + 1);
      setHasMoreItems(hasMore);
    } else {
      setHasMoreItems(hasMore);
    }
    setLoading(false);
  };

  useEffect(() => {
    let active = true;
    const fetchInitial = async () => {
      setLoading(true);
      setMovies([]);
      setHasMoreItems(true);
      
      const initialMovies = await loadMore(1, query);
      if (!active) return;

      const hasMore = initialMovies.length > 0;
      setMovies(initialMovies);
      setPage(2);
      setHasMoreItems(hasMore);
      setLoading(false);
    };

    fetchInitial();

    return () => {
      active = false;
    };
  }, [query]);

  if (!config) return <Loading />;

  const tileData = movies && movies.filter(filterMovies).map(mapMovies);

  return (
    <Box
      sx={{
        padding: '6rem 2rem 2rem 2rem',
        backgroundColor: '#141414',
        color: '#e5e5e5'
      }}
    >
      <InfiniteScroll
        key={query}
        dataLength={movies.length}
        next={loadItems}
        hasMore={hasMoreItems}
        loader={<Loading key="3" />}
      >
        <Typography color="inherit" variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {tileData && <FullWidthGrid tileData={tileData} />}
      </InfiniteScroll>
    </Box>
  );
};

export default InfinitePage;
