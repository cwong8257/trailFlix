import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import FullWidthGrid from '../FullWidthGrid';
import { getPopular } from '../../tmdb/tmdb';

const imageList = [];

class InfiniteScrollPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      hasMoreItems: true,
      nextHref: null
    };
  }

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

  loadItems(page) {
    getPopular(page).then(response => {
      const newMovies = response.results;

      this.setState(({ movies }) => {
        return {
          movies: [...movies, ...newMovies]
        };
      });
    });
  }

  render() {
    const loader = <div>Loading ...</div>;

    const tileData = this.state.movies.map(this.moviesToTileData);

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems.bind(this)}
        hasMore={this.state.hasMoreItems}
        loader={loader}
      >
        <FullWidthGrid tileData={tileData} />
      </InfiniteScroll>
    );
  }
}

export default connect(state => ({
  config: state.config
}))(InfiniteScrollPage);
