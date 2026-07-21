import React from 'react';
import Grid from '@mui/material/Grid';
import Poster from './Poster';

interface GridTileData {
  id: string | number;
  img: string;
  title: string;
  overview: string;
  year: string;
}

interface FullWidthGridProps {
  tileData: GridTileData[];
}

const FullWidthGrid: React.FC<FullWidthGridProps> = ({ tileData }) => {
  return (
    <Grid container spacing={1}>
      {tileData.map((tile, index) => (
        <Grid item key={index} xs={6} sm={4} md={3} xl={2}>
          <Poster {...tile} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FullWidthGrid;
