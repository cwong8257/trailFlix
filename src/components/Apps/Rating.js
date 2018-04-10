import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const Rating = props => {
  const { rating, count } = props;

  return (
    <Grid container alignItems="center" spacing={0}>
      <Grid item>
        <img src="/images/star.png" />
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={0}>
          <Grid item>
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
          </Grid>
          <Grid item>
            <Typography variant="body2" component="p">
              {count}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Rating;
