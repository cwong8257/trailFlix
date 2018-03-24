import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import qs from 'querystringify';
import moment from 'moment';

import { getMovieList } from '../tmdb/tmdb';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  listItem: {
    alignItems: 'flex-start',
    height: '158px',
    overflow: 'hidden'
  },
  link: {
    textDecoration: 'none'
  }
});

class ResultsPage extends React.Component {
  state = {
    dense: false,
    secondary: true
  };

  loadAllData = query => {
    getMovieList(query)
      .then(response => {
        const movies = response.results;
        this.setState(() => ({ movies, query }));
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const parsed = qs.parse(this.props.location.search);
    this.loadAllData(parsed.search_query);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const parsed = qs.parse(nextProps.location.search);
      this.loadAllData(parsed.search_query);
    }
  }

  render() {
    const { classes, config } = this.props;
    const { dense, secondary, query, movies } = this.state;
    console.log(movies);

    return (
      <div className={classes.root}>
        <Grid container justify="center" wrap="nowrap">
          <Grid item xs={12} md={10} lg={8} zeroMinWidth>
            <Typography variant="title" className={classes.title}>
              {`Results for "${query}"`}
            </Typography>
            {movies &&
              movies.map(({ title, release_date, id, poster_path, overview }) => {
                const primary = `${title} (${moment(release_date).format('YYYY')})`;
                const img = poster_path
                  ? config.images.secure_base_url + config.images.poster_sizes[0] + poster_path
                  : `https://via.placeholder.com/90x130?text=${title}`;
                return (
                  <List dense={dense} key={id}>
                    <Link className={classes.link} to={`/movie/${id}`}>
                      <ListItem classes={{ root: classes.listItem }} button disableGutters>
                        <img src={img} alt="title" />
                        <ListItemText primary={title} secondary={secondary ? overview : null} />
                        <ListItemSecondaryAction />
                      </ListItem>
                    </Link>
                  </List>
                );
              })}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default compose(
  withStyles(styles, {
    name: 'ResultsPage'
  }),
  connect(state => ({
    config: state.config
  }))
)(ResultsPage);
