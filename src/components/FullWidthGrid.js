import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import Poster from './Poster';

const FullWidthGrid = ({ classes, tileData }) => {
  return (
    <Grid container spacing={8}>
      {tileData.map((tile, index) => (
        <Grid item key={index} xs={6} sm={3} lg={2}>
          <Poster {...tile} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FullWidthGrid;
