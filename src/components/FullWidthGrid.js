import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  gridList: {
    width: '100%',
    height: 'auto',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  titleBar: {
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
});

function FullWidthGrid(props) {
  const { classes, tileData } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        {tileData.map(tile => (
          <Grid item key={tile.img} xs={6} lg={3}>
            <Link to={`/movie/${tile.id}`}>
              <GridList className={classes.gridList}>
                <GridListTile key={tile.id} cols={2} rows={2}>
                  <img className={classes.img} src={tile.img} alt={tile.title} />
                  <GridListTileBar title={tile.title} titlePosition="top" className={classes.titleBar} />
                </GridListTile>
              </GridList>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(FullWidthGrid);
