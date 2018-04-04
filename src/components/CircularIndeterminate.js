import React from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return <CircularProgress className={classes.progress} size={50} color="secondary" />;
}

export default withStyles(styles)(CircularIndeterminate);
