import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  link: {
    textDecoration: 'none'
  }
});

class HeaderNavigation extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <Button
          aria-owns={anchorEl ? 'header-navigation' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          Browse
        </Button>
        <Menu id="header-navigation" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/most_popular" className={classes.link}>
              Most Popular
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/upcoming" className={classes.link}>
              Upcoming
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/top_rated" className={classes.link}>
              Top Rated
            </Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(HeaderNavigation);
