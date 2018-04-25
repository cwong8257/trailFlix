import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import qs from 'querystringify';

import Loading from '../Apps/Loading';
import FullWidthGrid from '../Apps/FullWidthGrid';

const styles = theme => ({
  root: {
    padding: '6rem 2rem 2rem 2rem',
    backgroundColor: '#141414',
    color: '#e5e5e5'
  }
});

class InfinitePage extends React.Component {
  state = {
    movies: [],
    hasMoreItems: true
  };

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

  filterMovies = ({ poster_path }) => poster_path;

  loadItems = async page => {
    const { loadMore, query } = this.props;
    const newMovies = await loadMore(page, query);
    const hasMoreItems = page !== 1000 && newMovies.length > 0;

    if (hasMoreItems) {
      this.setState(({ movies }) => ({
        movies: [...movies, ...newMovies],
        hasMoreItems
      }));
    } else {
      this.setState(() => ({
        hasMoreItems
      }));
    }
  };

  componentWillReceiveProps({ query }) {
    if (query) {
      this.setState(() => ({ movies: [], hasMoreItems: true }));
    }
  }

  render() {
    const { classes, config, title, query } = this.props;
    const { movies } = this.state;
    const tileData = movies && movies.filter(this.filterMovies).map(this.mapMovies);

    return (
      <div className={classes.root}>
        <InfiniteScroll
          key={query}
          pageStart={0}
          loadMore={this.loadItems}
          hasMore={this.state.hasMoreItems}
          loader={<Loading key="3" />}
        >
          <Typography color="inherit" variant="display1" component="h1" gutterBottom>
            {title}
          </Typography>
          {tileData && <FullWidthGrid tileData={tileData} />}
        </InfiniteScroll>
      </div>
    );
  }
}

export default compose(
  withStyles(styles, {
    name: 'InfinitePage'
  }),
  connect(state => ({
    config: state.config
  }))
)(InfinitePage);
