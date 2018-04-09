import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  root: {
    float: 'right'
  },
  icon: {
    color: 'inherit'
  }
});

const HeaderSearchIcon = props => {
  const { classes, onClick } = props;
  return (
    <div className={classes.root}>
      <IconButton color="inherit" aria-label="Menu" onClick={onClick}>
        <Icon className={classes.icon}>search</Icon>
      </IconButton>
    </div>
  );
};

export default withStyles(styles)(HeaderSearchIcon);
