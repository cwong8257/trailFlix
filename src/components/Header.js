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
    color: 'inherit'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const Header = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <Grid container alignItems="center">
            <Grid item xs sm md lg>
              <Typography variant="title" color="inherit">
                <Link className={classes.logo} to="/">
                  MovieTrailers
                </Link>
              </Typography>
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
