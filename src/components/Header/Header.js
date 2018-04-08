import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderMenuIcon from './HeaderMenuIcon/HeaderMenuIcon';
import HeaderSearchBar from './HeaderSearchBar/HeaderSearchBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
    color: 'white'
  },
  appBar: {
    backgroundColor: '#141414'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  icon: {
    color: 'inherit'
  }
});

const Header = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Toolbar className={classes.toolbar}>
          <HeaderMenuIcon />
          <Grid container alignItems="center">
            <Grid item xs sm md lg>
              <HeaderLogo />
            </Grid>
            <Grid item xs sm={6} md={5} lg={4}>
              <HeaderSearchBar />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Header);
