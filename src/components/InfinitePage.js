import React from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import InfiniteScroll from 'react-infinite-scroller';

import CircularIndeterminate from './CircularIndeterminate';
import FullWidthGrid from './FullWidthGrid';
import { getPopular } from '../tmdb/tmdb';

class InfinitePage extends React.Component {
  state = {
    movies: [],
    hasMoreItems: true
  };

  moviesToTileData = movie => {
    const { config } = this.props;
    const { poster_path, title, id } = movie;
    const img = config.images.secure_base_url + config.images.poster_sizes[3] + poster_path;

    return {
      img,
      title,
      id
    };
  };

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
    const loader = <div>Loading ...</div>;

    if (movies) {
      const tileData = movies.map(this.moviesToTileData);

      return (
        <InfiniteScroll pageStart={0} loadMore={this.loadItems} hasMore={this.state.hasMoreItems} loader={loader}>
          <Typography color="inherit" variant="display2" component="h1" gutterBottom>
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
