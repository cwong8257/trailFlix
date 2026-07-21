import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { ListItem, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';

interface VerticalListItemProps {
  id: string | number;
  img: string;
  title: string;
  primary: React.ReactNode;
  secondary: React.ReactNode;
}

const VerticalListItem: React.FC<VerticalListItemProps> = ({ id, img, title, primary, secondary }) => (
  <Link
    component={RouterLink}
    to={`/movie/${id}`}
    underline="none"
    sx={{ display: 'block' }}
  >
    <ListItem
      sx={{
        alignItems: 'flex-start',
        overflow: 'hidden',
        paddingTop: 0
      }}
      disableGutters
    >
      <Grid container>
        <Grid item xs={5}>
          <Box
            component="img"
            src={img}
            alt={title}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={7}>
          <ListItemText primary={primary} secondary={secondary} />
        </Grid>
      </Grid>
    </ListItem>
  </Link>
);

export default VerticalListItem;
