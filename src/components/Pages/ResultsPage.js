import React from 'react';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import qs from 'querystringify';

import InfinitePage from './InfinitePage';
import { getMovieList } from '../../tmdb/tmdb';
import { withRouter } from '../../routers/withRouter';

class ResultsPage extends React.Component {
  state = {};

  componentDidMount() {
    const { search_query: query } = qs.parse(this.props.location.search);
    this.setState(() => ({ query }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const { search_query: query } = qs.parse(nextProps.location.search);
      this.setState(() => ({ query }));
    }
  }

  render() {
    const { query } = this.state;
    const title = `Results for "${query}"`;

    return <div>{query && <InfinitePage loadMore={getMovieList} title={title} query={query} />}</div>;
  }
}

export default withRouter(ResultsPage);

