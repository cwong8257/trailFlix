import React, { useState, useEffect } from 'react';
import { useTMDBConfig } from '../../context/TMDBConfigContext';
import Box from '@mui/material/Box';
import moment from 'moment';

import HorizontalSlider from '../Apps/HorizontalSlider';
import Loading from '../Apps/Loading';
import { getPopular, getUpcoming, getTopRated } from '../../tmdb/tmdb';

import { Movie } from '../../types/tmdb';

interface HomeData {
  mostPopular: Movie[] | null;
  upcoming: Movie[] | null;
  topRated: Movie[] | null;
}

const HomePage = () => {
  const [data, setData] = useState<HomeData>({
    mostPopular: null,
    upcoming: null,
    topRated: null
  });
  const config = useTMDBConfig();

  useEffect(() => {
    let isMounted = true;
    Promise.all([getPopular(), getUpcoming(), getTopRated()]).then(
      ([mostPopular, upcoming, topRated]) => {
        if (isMounted) {
          setData({ mostPopular, upcoming, topRated });
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  const mapMovies = ({ poster_path, title, id, release_date, overview }: Movie) => {
    const secureBaseUrl = config?.images?.secure_base_url || '';
    const posterSize = config?.images?.poster_sizes?.[3] || 'w342';
    const img = poster_path ? secureBaseUrl + posterSize + poster_path : '';
    const year = release_date && moment(release_date).format('YYYY');

    return {
      id,
      img,
      title,
      overview,
      year: year || ''
    };
  };

  const { mostPopular, upcoming, topRated } = data;

  if (mostPopular && upcoming && topRated && config) {
    const mostPopularTileData = mostPopular.map(mapMovies);
    const upcomingTileData = upcoming.map(mapMovies);
    const topRatedTileData = topRated.map(mapMovies);

    return (
      <Box
        sx={{
          padding: '6rem 2rem 2rem 2rem',
          backgroundColor: '#141414',
          color: '#e5e5e5'
        }}
      >
        <HorizontalSlider title="Most Popular" link="/most_popular" tileData={mostPopularTileData} />
        <HorizontalSlider title="Upcoming" link="/upcoming" tileData={upcomingTileData} />
        <HorizontalSlider title="Top Rated" link="/top_rated" tileData={topRatedTileData} />
      </Box>
    );
  }
  return <Loading />;
};

export default HomePage;
