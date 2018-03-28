import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import YouTube from 'react-youtube';
import moment from 'moment';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';

import { history } from '../routers/AppRouter';
import LoadingPage from './LoadingPage';
import SingleLineGridList from './SingleLineGridList';
import Rating from './Rating';
import { getMovieDetails, getMovieTrailer, getSimilar } from '../tmdb/tmdb';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  link: {
    textDecoration: 'none'
  },
  mediaContainer: {
    width: '100%',
    height: '56.25vw',
    maxHeight: '50rem'
  },
  card: {
    marginTop: '20px'
  }
});

class MoviePage extends React.Component {
  moviesToTileData = movie => {
    const { config } = this.props;
    const { backdrop_path, title, id } = movie;
    const img = config.images.secure_base_url + config.images.backdrop_sizes[1] + backdrop_path;

    return {
      img,
      title,
      id
    };
  };

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
        similar,
        vote_average,
        vote_count
      } = this.state;
      const year = release_date && moment(release_date).format('YYYY');
      const similarTileData = similar && similar.map(this.moviesToTileData);
      const genresList = genres && genres.map(({ name }, index) => name + (index === genres.length - 1 ? '' : ', '));
      const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0
        }
      };

      return (
        <Grid container justify="center">
          {youtubeId && (
            <Grid item xs={12}>
              <div className={classes.mediaContainer}>
                <YouTube videoId={youtubeId} opts={opts} />
              </div>
            </Grid>
          )}
          <Grid item xs={12} md={10} lg={8}>
            <Card className={classes.card}>
              <CardContent>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    <Typography gutterBottom variant="headline" component="h2">
                      {title} {year && `(${year})`}
                    </Typography>
                  </Grid>
                  <Hidden xsDown>
                    <Grid item>
                      <Rating rating={vote_average} count={vote_count} />
                    </Grid>
                  </Hidden>
                </Grid>
                {genresList && (
                  <Typography variant="subheading" component="p">
                    {genresList}
                  </Typography>
                )}
              </CardContent>
              <Divider />
              <CardContent>
                <Typography component="p">{overview}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  <a className={classes.link} target="_blank" href={`http://www.imdb.com/title/${imdb_id}/`}>
                    IMDB
                  </a>
                </Button>
                {homepage && (
                  <Button size="small" color="primary">
                    <a className={classes.link} target="_blank" href={homepage}>
                      Home Page
                    </a>
                  </Button>
                )}
              </CardActions>
              {similarTileData &&
                similarTileData.length > 0 && (
                  <div>
                    <Divider />
                    <CardContent>
                      <Typography gutterBottom variant="subheading" component="h3">
                        More Like This...
                      </Typography>
                      <SingleLineGridList tileData={similarTileData} />
                    </CardContent>
                  </div>
                )}
            </Card>
          </Grid>
        </Grid>
      );
    }
    return (
      <div className={classes.root}>
        <LoadingPage />
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
