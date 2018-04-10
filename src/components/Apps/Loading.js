import React from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

const Loading = ({ classes }) => {
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} size={50} color="secondary" />
    </div>
  );
};

export default withStyles(styles)(Loading);
