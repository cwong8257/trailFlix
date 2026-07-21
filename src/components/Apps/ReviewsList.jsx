import React from 'react';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Review from '../Apps/Review';

const ReviewsList = ({ reviews }) => {
  const length = reviews.length;
  const word = length === 1 ? 'Review' : 'Reviews';
  return (
    <Box>
      <Typography variant="subtitle1">{`${length} ${word}`}</Typography>
      <List>{reviews.map(({ ...data }) => <Review key={data.id} {...data} />)}</List>
    </Box>
  );
};

export default ReviewsList;
