import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTMDBConfig } from '../../context/TMDBConfigContext';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import Loading from '../Apps/Loading';
import Rating from '../Apps/Rating';
import Video from '../Apps/Video';
import { getMovieDetails, getMovieTrailer, getSimilar, getMovieReviews } from '../../tmdb/tmdb';
import VerticalList from '../Apps/VerticalList';
import ReviewsList from '../Apps/ReviewsList';

import { Movie, Review } from '../../types/tmdb';

interface ExtendedMovie extends Movie {
  imdb_id?: string;
  homepage?: string;
  youtubeId: string | undefined;
  similar: Movie[];
  reviews: Review[];
}

const MoviePage = () => {
  const { id } = useParams();
  const config = useTMDBConfig();
  const [movieData, setMovieData] = useState<ExtendedMovie | null>(null);

  const filterMovies = ({ backdrop_path }: Movie) => backdrop_path;

  const mapMovies = ({ backdrop_path, title, id, release_date }: Movie) => {
    const secureBaseUrl = config?.images?.secure_base_url || '';
    const backdropSize = config?.images?.backdrop_sizes?.[0] || 'w300';
    const img = backdrop_path ? secureBaseUrl + backdropSize + backdrop_path : '';
    const secondary = release_date && moment(release_date).format('YYYY');

    return {
      id,
      img,
      title,
      primary: title,
      secondary: secondary || ''
    };
  };

  useEffect(() => {
    let isMounted = true;
    setMovieData(null); // Show loading when switching movies

    const loadAllData = async (movieId: string | undefined) => {
      if (!movieId) return;
      try {
        const [movie, youtubeId, similar, reviews] = await Promise.all([
          getMovieDetails(movieId),
          getMovieTrailer(movieId),
          getSimilar(movieId),
          getMovieReviews(movieId)
        ]);

        if (isMounted) {
          setMovieData({
            ...movie,
            youtubeId,
            similar,
            reviews
          });
        }
      } catch (err) {
        console.error('Failed to load movie details:', err);
      }
    };

    loadAllData(id);

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (movieData && config) {
    const {
      title,
      overview,
      imdb_id,
      youtubeId,
      homepage,
      release_date,
      genres,
      reviews,
      similar,
      vote_average,
      vote_count
    } = movieData;

    const year = release_date && moment(release_date).format('YYYY');
    const similarTileData = similar && similar.filter(filterMovies).map(mapMovies);
    const genresList = genres && genres.map(({ name }, index) => name + (index === genres.length - 1 ? '' : ', '));

    return (
      <Box sx={{ paddingTop: '4rem' }}>
        {youtubeId && <Video videoId={youtubeId} />}
        <Card sx={{ padding: '0.5rem' }}>
          <Grid container justifyContent="center">
            <Grid item xs lg={10} xl={9}>
              <Grid container direction="row">
                <Grid item xs>
                  <CardContent>
                    <Box sx={{ float: 'right' }}>
                      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Rating rating={vote_average} count={vote_count} />
                      </Box>
                    </Box>
                    <Typography gutterBottom variant="h5" component="h2">
                      {title} {year && `(${year})`}
                    </Typography>
                    {genresList && (
                      <Typography variant="subtitle1" component="p">
                        {genresList}
                      </Typography>
                    )}
                  </CardContent>
                  <CardContent>
                    <Typography component="p">{overview}</Typography>
                  </CardContent>
                  <CardActions>
                    {imdb_id && (
                      <Button size="small" color="primary">
                        <a
                          style={{ textDecoration: 'none', color: 'inherit' }}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`http://www.imdb.com/title/${imdb_id}/`}
                        >
                          IMDB
                        </a>
                      </Button>
                    )}
                    {homepage && (
                      <Button size="small" color="primary">
                        <a
                          style={{ textDecoration: 'none', color: 'inherit' }}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={homepage}
                        >
                          Home Page
                        </a>
                      </Button>
                    )}
                  </CardActions>
                  <CardContent>
                    <Divider />
                  </CardContent>
                  {reviews && (
                    <CardContent>
                      <ReviewsList reviews={reviews} />
                    </CardContent>
                  )}
                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <CardContent>
                      <Divider />
                    </CardContent>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5} lg={4}>
                  <CardContent>
                    <Typography variant="subtitle1" component="h3" gutterBottom>
                      More Like This...
                    </Typography>
                    {similarTileData && similarTileData.length > 0 ? (
                      <VerticalList tileData={similarTileData} />
                    ) : (
                      <Typography variant="body1">Similar movies not found</Typography>
                    )}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: '4rem' }}>
      <Loading />
    </Box>
  );
};

export default MoviePage;
