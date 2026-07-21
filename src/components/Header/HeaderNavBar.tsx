import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const HeaderNavBar = () => {
  const linkSx = {
    color: 'inherit',
    marginRight: '1rem',
    '&:hover': {
      color: '#b3b3b3'
    }
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Link component={RouterLink} to="/" variant="body1" underline="none" sx={linkSx}>
        Home
      </Link>
      <Link component={RouterLink} to="/most_popular" variant="body1" underline="none" sx={linkSx}>
        Most Popular
      </Link>
      <Link component={RouterLink} to="/upcoming" variant="body1" underline="none" sx={linkSx}>
        Upcoming
      </Link>
      <Link component={RouterLink} to="/top_rated" variant="body1" underline="none" sx={linkSx}>
        Top Rated
      </Link>
    </Box>
  );
};

export default HeaderNavBar;
