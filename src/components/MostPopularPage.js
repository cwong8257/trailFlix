import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import FullWidthGrid from './FullWidthGrid';
import CircularIndeterminate from './CircularIndeterminate';
import { getPopular } from '../tmdb/tmdb';

const styles = theme => ({
  root: {
    padding: '2rem',
    backgroundColor: '#141414'
  }
});

class MostPopularPage extends React.Component {
  state = {};

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

  componentDidMount() {
    getPopular().then(response => {
      const movies = response.results;
      this.setState(() => ({ movies }));
    });
  }

  render() {
    const { classes, config } = this.props;
    const { movies } = this.state;

    if (movies) {
      const tileData = movies.map(this.moviesToTileData);

      return (
        <div className={classes.root}>
          <FullWidthGrid tileData={tileData} />
        </div>
      );
    }
    return <div />;
  }
}

export default compose(
  withStyles(styles, {
    name: 'MostPopularPage'
  }),
  connect(state => ({
    config: state.config
  }))
)(MostPopularPage);
