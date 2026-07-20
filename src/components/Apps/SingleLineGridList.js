import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@mui/styles/withStyles';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.contrastText
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
});

function SingleLineGridList(props) {
  const { classes, tileData } = props;

  return (
    <div className={classes.root}>
      <ImageList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
          <ImageListItem key={tile.id}>
            <img src={tile.img} alt={tile.title} />
            <Link to={`/movie/${tile.id}`} key={tile.id}>
              <ImageListItemBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title
                }}
              />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default withStyles(styles)(SingleLineGridList);
