import React from 'react';
import withStyles from '@mui/styles/withStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import HeaderLogo from './HeaderLogo';
import HeaderNavigation from './HeaderNavigation';
import HeaderSearchBar from './HeaderSearchBar';
import HeaderSearchIcon from './HeaderSearchIcon';
import HeaderNavBar from './HeaderNavBar';

const styles = theme => ({
  root: {
    color: '#e5e5e5'
  },
  appBar: {
    backgroundColor: '#141414',
    height: '4rem'
  }
});

class Header extends React.Component {
  state = {
    searchFocused: false
  };

  handleShowSearchBar = () => {
    this.setState(prevState => ({ searchFocused: !prevState.searchFocused }));
  };

  render() {
    const { classes } = this.props;
    const { searchFocused } = this.state;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="fixed" color="inherit">
          <Toolbar>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <HeaderLogo />
              <HeaderNavBar />
            </Box>
            {!searchFocused && (
              <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                <HeaderLogo />
                <HeaderNavigation />
              </Box>
            )}
            {searchFocused ? (
              <HeaderSearchBar onFocusChange={this.handleShowSearchBar} />
            ) : (
              <HeaderSearchIcon onClick={this.handleShowSearchBar} />
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
