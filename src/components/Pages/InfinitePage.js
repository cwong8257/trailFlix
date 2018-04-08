import React from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';

import CircularIndeterminate from '../CircularIndeterminate';
import FullWidthGrid from '../FullWidthGrid';

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

  loadItems = page => {
    const getMovies = this.props.loadMore;

    getMovies(page).then(response => {
      const newMovies = response.results;
      const hasMoreItems = page !== 1000;

      this.setState(({ movies }) => ({
        movies: [...movies, ...newMovies],
        hasMoreItems
      }));
    });
  };

  render() {
    const { classes, config, title } = this.props;
    const { movies } = this.state;
    const loader = <div key={3}>Loading ...</div>;

    if (movies) {
      const tileData = movies.filter(this.filterMovies).map(this.mapMovies);

      return (
        <InfiniteScroll pageStart={0} loadMore={this.loadItems} hasMore={this.state.hasMoreItems} loader={loader}>
          <Typography color="inherit" variant="display1" component="h1" gutterBottom>
            {title}
          </Typography>
          <FullWidthGrid tileData={tileData} />
        </InfiniteScroll>
      );
    }
    return <CircularIndeterminate />;
  }
}

export default connect(state => ({
  config: state.config
}))(InfinitePage);
