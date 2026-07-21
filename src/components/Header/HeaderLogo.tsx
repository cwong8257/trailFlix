import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const HeaderLogo = () => {
  return (
    <Link
      component={RouterLink}
      to="/"
      underline="none"
      sx={{
        color: '#e50914',
        display: 'inline-block',
        marginRight: '1rem',
        '&:hover': {
          color: '#e50914'
        }
      }}
    >
      <Typography variant="h5" color="inherit" sx={{ fontWeight: 'bold' }}>
        MovieTrailers
      </Typography>
    </Link>
  );
};

export default HeaderLogo;
