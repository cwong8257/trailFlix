import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import SearchBar from './SearchBar';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  logo: {
    textDecoration: 'none',
    color: 'red',
    display: 'inline-block'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  appBar: {
    backgroundColor: '#141414'
  }
});

const Header = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Toolbar className={classes.toolbar}>
          <Grid container alignItems="center">
            <Grid item xs sm md lg>
              <Link className={classes.logo} to="/">
                <Typography variant="headline" color="inherit">
                  MovieTrailers
                </Typography>
              </Link>
            </Grid>
            <Grid item xs sm={6} md={5} lg={4}>
              <SearchBar />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Header);
