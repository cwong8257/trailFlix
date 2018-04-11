import React from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { ListItemAvatar, ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  listItem: {
    alignItems: 'flex-start',
    overflow: 'hidden',
    paddingTop: '0'
  },
  link: {
    textDecoration: 'none'
  },
  img: {
    width: '100%'
  }
});

const VerticalListItem = ({ classes, id, img, title, primary, secondary }) => (
  <Link className={classes.link} to={`/movie/${id}`}>
    <ListItem classes={{ root: classes.listItem }} disableGutters>
      <Grid container>
        <Grid item xs={5}>
          <img className={classes.img} src={img} alt={title} />
        </Grid>
        <Grid item xs={7}>
          <ListItemText primary={primary} secondary={secondary} />
        </Grid>
      </Grid>
    </ListItem>
  </Link>
);

export default withStyles(styles)(VerticalListItem);
