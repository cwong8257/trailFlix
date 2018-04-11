import React from 'react';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';

import Review from '../Apps/Review';

export default ({ reviews }) => {
  const length = reviews.length;
  const word = length === 1 ? 'Review' : 'Reviews';
  return (
    <div>
      <Typography variant="subheading">{`${length} ${word}`}</Typography>
      <List>{reviews.map(({ ...data }) => <Review key={data.id} {...data} />)}</List>
    </div>
  );
};
