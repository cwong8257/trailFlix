import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';

import InfinitePage from './InfinitePage';
import { getUpcoming } from '../../tmdb/tmdb';

const styles = theme => ({
  root: {
    padding: '4rem 2rem',
    backgroundColor: '#141414',
    color: '#e5e5e5'
  }
});

class UpcomingPage extends React.Component {
  render() {
    const { classes, config } = this.props;

    return (
      <div className={classes.root}>
        <InfinitePage loadMore={getUpcoming} title="Upcoming" />
      </div>
    );
  }
}

export default compose(
  withStyles(styles, {
    name: 'UpcomingPage'
  }),
  connect(state => ({
    config: state.config
  }))
)(UpcomingPage);
