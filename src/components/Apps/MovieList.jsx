import React, { useState, useEffect } from 'react';
import { useTMDBConfig } from '../../context/TMDBConfigContext';
import Box from '@mui/material/Box';
import FullWidthGrid from './FullWidthGrid';

const MovieList = ({ getMovie }) => {
  const [movies, setMovies] = useState(null);
  const config = useTMDBConfig();

  useEffect(() => {
    let isMounted = true;
    getMovie().then(response => {
      if (isMounted) {
        setMovies(response.results);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [getMovie]);

  const moviesToTileData = movie => {
    const { backdrop_path, title, id } = movie;
    const img = config.images.secure_base_url + config.images.backdrop_sizes[1] + backdrop_path;

    return {
      img,
      title,
      id
    };
  };

  if (movies && config) {
    const tileData = movies.map(moviesToTileData);

    return (
      <Box sx={{ padding: '2rem', backgroundColor: '#141414' }}>
        <FullWidthGrid tileData={tileData} />
      </Box>
    );
  }
  return <Box />;
};

export default MovieList;
