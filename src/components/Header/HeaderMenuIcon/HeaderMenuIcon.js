import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  icon: {
    color: 'inherit'
  }
});

const HeaderMenuIcon = props => {
  const { classes } = props;
  return (
    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
      <Icon className={classes.icon}>menu</Icon>
    </IconButton>
  );
};

export default withStyles(styles)(HeaderMenuIcon);
