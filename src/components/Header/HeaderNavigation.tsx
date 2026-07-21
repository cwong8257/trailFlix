import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Menu, MenuItem } from '@mui/material';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const HeaderNavigation = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        aria-owns={anchorEl ? 'header-navigation' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        Browse
      </Button>
      <Menu id="header-navigation" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Link component={RouterLink} to="/" underline="none" color="inherit" sx={{ width: '100%' }}>
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link component={RouterLink} to="/most_popular" underline="none" color="inherit" sx={{ width: '100%' }}>
            Most Popular
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link component={RouterLink} to="/upcoming" underline="none" color="inherit" sx={{ width: '100%' }}>
            Upcoming
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link component={RouterLink} to="/top_rated" underline="none" color="inherit" sx={{ width: '100%' }}>
            Top Rated
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HeaderNavigation;
