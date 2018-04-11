import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import moment from 'moment';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';

import HorizontalSlider from '../Apps/HorizontalSlider';
import Loading from '../Apps/Loading';
import SingleLineGridList from '../Apps/SingleLineGridList';
import Rating from '../Apps/Rating';
import Video from '../Apps/Video';
import { history } from '../../routers/AppRouter';
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

class MoviePage extends React.Component {
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

  loadAllData = id => {
    getMovieDetails(id)
      .then(movie => {
        this.setState(() => ({ ...movie }));
        return getMovieTrailer(id);
      })
      .then(youtubeId => {
        this.setState(() => ({ youtubeId }));
        return getSimilar(id);
      })
      .then(response => {
        const similar = response.results;
        this.setState(() => ({ similar }));
        return getMovieReviews(id);
      })
      .then(response => {
        const reviews = response.results;
        console.log(reviews);
        this.setState(() => ({ reviews }));
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadAllData(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.loadAllData(nextProps.match.params.id);
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
            <Grid container justify="center">
              <Grid item xs lg={10} xl={9}>
                <Grid container direction="row">
                  <Grid item xs>
                    <CardContent>
                      <div className={classes.rating}>
                        <Hidden xsDown>
                          <Rating rating={vote_average} count={vote_count} />
                        </Hidden>
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
                    <Hidden smUp>
                      <CardContent>
                        <Divider />
                      </CardContent>
                    </Hidden>
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

export default compose(
  withStyles(styles, {
    name: 'MoviePage'
  }),
  connect(state => ({
    config: state.config
  }))
)(MoviePage);
