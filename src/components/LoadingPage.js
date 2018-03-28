import React from 'react';
import Grid from 'material-ui/Grid';

const LoadingPage = () => (
  <Grid container alignItems="center" justify="center">
    <Grid item>
      <img src="/images/loader.gif" />
    </Grid>
  </Grid>
);

export default LoadingPage;
