import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress sx={{ m: 2 }} size={50} color="secondary" />
    </Box>
  );
};

export default Loading;
