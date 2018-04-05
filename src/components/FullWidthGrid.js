import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';

const getBig = keyframes`
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(1.1, 1.1);
  }
`;

const Tile = styled.div`
  position: relative;
  display: block;

  &:hover {
    animation: ${getBig} 0.3s 0.1s both;
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const TextBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.8rem;
  margin: 0;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 100%);
  opacity: 1;
  width: 100%;
`;

function FullWidthGrid(props) {
  const { classes, tileData } = props;

  return (
    <Grid container spacing={16}>
      {tileData.map(({ id, img, title }) => (
        <Grid item key={img} xs={6} sm={3} lg={2}>
          <Tile key={img}>
            <Link to={`/movie/${id}`}>
              <Image src={img} alt={title} />
              <TextBox>
                <Typography color="inherit" variant="caption" component="span">
                  {title}
                </Typography>
              </TextBox>
            </Link>
          </Tile>
        </Grid>
      ))}
    </Grid>
  );
}

export default FullWidthGrid;
