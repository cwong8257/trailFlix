import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { withTMDBConfig } from '../../context/TMDBConfigContext';
import compose from 'recompose/compose';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import withStyles from '@mui/styles/withStyles';
import Paper from '@mui/material/Paper';
import Card, { CardActions, CardContent, CardMedia } from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import HorizontalSlider from '../Apps/HorizontalSlider';
import Loading from '../Apps/Loading';
import SingleLineGridList from '../Apps/SingleLineGridList';
import Rating from '../Apps/Rating';
import Video from '../Apps/Video';
import { getMovieDetails, getMovieTrailer, getSimilar, getMovieReviews } from '../../tmdb/tmdb';
import VerticalList from '../Apps/VerticalList';
import ReviewsList from '../Apps/ReviewsList';

const styles = theme => ({
  root: {
    paddingTop: '4rem'
  },
  link: {
    textDecoration: 'none'
  },
  card: {
    padding: '0.5rem'
  },
  rating: {
    float: 'right'
  }
});

class MoviePageInner extends React.Component {
  mapMovies = ({ backdrop_path, title: primary, id, release_date }) => {
    const { config } = this.props;
    const img = config.images.secure_base_url + config.images.backdrop_sizes[0] + backdrop_path;
    const secondary = release_date && moment(release_date).format('YYYY');

    return {
      id,
      img,
      primary,
      secondary
    };
  };

  filterMovies = ({ backdrop_path }) => backdrop_path;

  loadAllData = async id => {
    const [movie, youtubeId, similar, reviews] = await Promise.all([
      getMovieDetails(id),
      getMovieTrailer(id),
      getSimilar(id),
      getMovieReviews(id)
    ]);

    this.setState(() => ({
      ...movie,
      youtubeId,
      similar,
      reviews
    }));
  };

  componentDidMount() {
    this.loadAllData(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.loadAllData(nextProps.id);
    }
  }

  render() {
    const { classes } = this.props;

    if (this.state) {
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
      } = this.state;
      const year = release_date && moment(release_date).format('YYYY');
      const similarTileData = similar && similar.filter(this.filterMovies).map(this.mapMovies);
      const genresList = genres && genres.map(({ name }, index) => name + (index === genres.length - 1 ? '' : ', '));

      return (
        <div className={classes.root}>
          {youtubeId && <Video videoId={youtubeId} />}
          <Card className={classes.card}>
            <Grid container justifyContent="center">
              <Grid item xs lg={10} xl={9}>
                <Grid container direction="row">
                  <Grid item xs>
                    <CardContent>
                      <div className={classes.rating}>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                          <Rating rating={vote_average} count={vote_count} />
                        </Box>
                      </div>
                      <Typography gutterBottom variant="headline" component="h2">
                        {title} {year && `(${year})`}
                      </Typography>
                      {genresList && (
                        <Typography variant="subheading" component="p">
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
                          <a className={classes.link} target="_blank" href={`http://www.imdb.com/title/${imdb_id}/`}>
                            IMDB
                          </a>
                        </Button>
                      )}
                      {homepage && (
                        <Button size="small" color="primary">
                          <a className={classes.link} target="_blank" href={homepage}>
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
                      <Typography variant="subheading" component="h3" gutterBottom>
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
        </div>
      );
    }
    return (
      <div className={classes.root}>
        <Loading />
      </div>
    );
  }
}

const MoviePage = (props) => {
  const { id } = useParams();
  return <MoviePageInner {...props} id={id} />;
};

export default compose(
  withStyles(styles, {
    name: 'MoviePage'
  }),
  withTMDBConfig
)(MoviePage);
