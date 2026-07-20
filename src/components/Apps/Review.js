import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { ListItemAvatar, ListItem, ListItemText } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import classnames from 'classnames';
import Collapse from '@mui/material/Collapse';

const styles = theme => ({
  root: {
    padding: '0 0 1rem 0',
    alignItems: 'flex-start'
  },
  link: {
    textDecoration: 'none'
  }
});

class Review extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { author, classes, content, url } = this.props;
    const { expanded } = this.state;

    return (
      <ListItem
        classes={{
          root: classes.root
        }}
      >
        <a className={classes.link} target="_blank" href={url}>
          <Avatar>
            <Icon>account_circle</Icon>
          </Avatar>
        </a>
        <ListItemText
          disableTypography={false}
          primary={
            <div>
              <a className={classes.link} target="_blank" href={url}>
                <Typography variant="body2">{author}</Typography>
              </a>
              {!expanded && (
                <Typography variant="body1">{`${
                  content.length > 200 ? content.substring(0, 200) + '...' : content
                }`}</Typography>
              )}
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <Typography variant="body1">{content}</Typography>
              </Collapse>
              {content.length > 200 && (
                <Button onClick={this.handleExpandClick} aria-expanded={this.state.expanded} aria-label="Show more">
                  {expanded ? 'Show Less' : 'Read More'}
                </Button>
              )}
            </div>
          }
        />
      </ListItem>
    );
  }
}
export default withStyles(styles)(Review);
