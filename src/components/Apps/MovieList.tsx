import React, { useState, useEffect } from 'react';
import { useTMDBConfig } from '../../context/TMDBConfigContext';
import Box from '@mui/material/Box';
import FullWidthGrid from './FullWidthGrid';

import { Movie } from '../../types/tmdb';

interface MovieListProps {
  getMovie: () => Promise<{ results: Movie[] }>;
}

const MovieList = ({ getMovie }: MovieListProps) => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
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

  const moviesToTileData = (movie: Movie) => {
    const { backdrop_path, title, id, overview, release_date } = movie;
    const secureBaseUrl = config?.images?.secure_base_url || '';
    const backdropSize = config?.images?.backdrop_sizes?.[1] || 'w300';
    const img = backdrop_path ? secureBaseUrl + backdropSize + backdrop_path : '';

    return {
      img,
      title,
      id,
      overview: overview || '',
      year: release_date || ''
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
