import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';

import HorizontalSlider from '../Apps/HorizontalSlider';
import Loading from '../Apps/Loading';
import { getPopular, getUpcoming, getTopRated } from '../../tmdb/tmdb';

const styles = theme => ({
  root: {
    padding: '6rem 2rem 2rem 2rem',
    backgroundColor: '#141414',
    color: '#e5e5e5'
  }
});

class HomePage extends React.Component {
  state = {};

  mapMovies = ({ poster_path, title, id, release_date, overview }) => {
    const { config } = this.props;
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

  async componentDidMount() {
    const [mostPopular, upcoming, topRated] = await Promise.all([
      getPopular().then(mostPopular),
      getUpcoming().then(upcoming),
      getTopRated().then(topRated)
    ]);
    this.setState(() => ({ mostPopular, upcoming, topRated }));
  }

  render() {
    const { classes, config } = this.props;
    const { mostPopular, upcoming, topRated } = this.state;

    if (mostPopular && upcoming && topRated) {
      const mostPopularTileData = mostPopular.map(this.mapMovies);
      const upcomingTileData = upcoming.map(this.mapMovies);
      const topRatedTileData = topRated.map(this.mapMovies);

      return (
        <div className={classes.root}>
          <HorizontalSlider title="Most Popular" link="/most_popular" tileData={mostPopularTileData} />
          <HorizontalSlider title="Upcoming" link="/upcoming" tileData={upcomingTileData} />
          <HorizontalSlider title="Top Rated" link="/top_rated" tileData={topRatedTileData} />
        </div>
      );
    }
    return <Loading />;
  }
}

export default compose(
  withStyles(styles, {
    name: 'HomePage'
  }),
  connect(state => ({
    config: state.config
  }))
)(HomePage);
