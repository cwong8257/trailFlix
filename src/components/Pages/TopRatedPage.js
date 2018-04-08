import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';

import InfinitePage from './InfinitePage';
import { getTopRated } from '../../tmdb/tmdb';

const styles = theme => ({
  root: {
    padding: '2rem',
    backgroundColor: '#141414',
    color: 'white'
  }
});

class MostPopularPage extends React.Component {
  render() {
    const { classes, config } = this.props;

    return (
      <div className={classes.root}>
        <InfinitePage loadMore={getTopRated} title="Top Rated" />
      </div>
    );
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
