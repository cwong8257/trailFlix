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

import { history } from '../routers/AppRouter';
import LoadingPage from './LoadingPage';
import SingleLineGridList from './SingleLineGridList';
import { getMovieDetails, getMovieTrailer, getSimilar } from '../tmdb/tmdb';

const styles = theme => ({
  root: {
    marginTop: 0
  },
  link: {
    textDecoration: 'none'
  },
  videoContainer: {
    width: '100%',
    height: '56.25vw',
    maxHeight: '835px'
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
    if (this.state) {
      const { classes } = this.props;
      const { title, overview, imdb_id, youtubeId, homepage, release_date, genres, similar } = this.state;
      const year = moment(release_date).format('YYYY');
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
          <Grid item xs={12}>
            <div className={classes.videoContainer}>
              <YouTube videoId={youtubeId} opts={opts} />
            </div>
          </Grid>
          <Grid item xs={12} sm={10} lg={8}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {title} {year && `(${year})`}
                </Typography>
                {genresList && <Typography component="p">{genresList}</Typography>}
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
              <Divider />
              <CardContent>{similarTileData && <SingleLineGridList tileData={similarTileData} />}</CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }
    return <LoadingPage />;
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
