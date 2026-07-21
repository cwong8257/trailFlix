import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import HeaderLogo from './HeaderLogo';
import HeaderNavigation from './HeaderNavigation';
import HeaderSearchBar from './HeaderSearchBar';
import HeaderSearchIcon from './HeaderSearchIcon';
import HeaderNavBar from './HeaderNavBar';

const Header = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  const handleShowSearchBar = () => {
    setSearchFocused(prev => !prev);
  };

  return (
    <Box sx={{ color: '#e5e5e5' }}>
      <AppBar sx={{ backgroundColor: '#141414', height: '4rem' }} position="fixed" color="inherit">
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
            <HeaderSearchBar onFocusChange={handleShowSearchBar} />
          ) : (
            <HeaderSearchIcon onClick={handleShowSearchBar} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
