import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    color: '#e50914',
    display: 'inline-block',
    marginRight: '1rem',
    textDecoration: 'none'
  }
});

const HeaderLogo = props => {
  const { classes } = props;
  return (
    <Link className={classes.root} to="/">
      <Typography variant="headline" color="inherit">
        MovieTrailers
      </Typography>
    </Link>
  );
};

export default withStyles(styles)(HeaderLogo);
