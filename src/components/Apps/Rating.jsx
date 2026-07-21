import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

export default ({ rating, count }) => {
  const word = count === 1 ? 'vote' : 'votes';
  return (
    <Grid container alignItems="center" spacing={0}>
      <Grid item>
        <IconButton color="inherit" aria-label="Rating" size="large">
          <Icon style={{ fontSize: '2rem' }}>star_border</Icon>
        </IconButton>
      </Grid>
      <Grid item>
        <Stack spacing={0}>
          <Grid container alignItems="flex-end" spacing={0}>
            <Grid item>
              <Typography variant="headline" component="p">
                {rating}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="p">/10</Typography>
            </Grid>
          </Grid>
          <Typography variant="caption" component="p">
            {`${count} ${word}`}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
