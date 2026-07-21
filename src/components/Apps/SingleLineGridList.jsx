import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function SingleLineGridList({ tileData }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: 'background.paper'
      }}
    >
      <ImageList
        sx={{
          flexWrap: 'nowrap',
          transform: 'translateZ(0)'
        }}
        cols={2.5}
      >
        {tileData.map(tile => (
          <ImageListItem key={tile.id}>
            <Box component="img" src={tile.img} alt={tile.title} />
            <Link component={RouterLink} to={`/movie/${tile.id}`} underline="none" color="inherit">
              <ImageListItemBar
                title={tile.title}
                sx={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  '& .MuiImageListItemBar-title': {
                    color: 'primary.contrastText'
                  }
                }}
              />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default SingleLineGridList;
