import React from 'react';
import YouTube from 'react-youtube';
import Box from '@mui/material/Box';

const opts = {
  width: '100%',
  height: '100%',
  playerVars: {
    autoplay: 1,
    iv_load_policy: 3,
    modestbranding: 1,
    rel: 0,
    showinfo: 0
  }
};

const Video = ({ videoId }) => (
  <Box sx={{ width: '100%', height: '56.25vw', maxHeight: '50rem' }}>
    <YouTube videoId={videoId} opts={opts} />
  </Box>
);

export default Video;
