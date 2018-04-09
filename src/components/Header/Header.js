import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Hidden from 'material-ui/Hidden';

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
            <Hidden smDown>
              <HeaderLogo />
              <HeaderNavBar />
            </Hidden>
            {!searchFocused && (
              <Hidden mdUp>
                <HeaderLogo />
                <HeaderNavigation />
              </Hidden>
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
