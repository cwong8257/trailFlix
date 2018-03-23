import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import FullWidthGrid from './FullWidthGrid';
import LoadingPage from './LoadingPage';
import { getPopular, getUpcoming, getTopRated } from '../tmdb/tmdb';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class HomePage extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  moviesToTileData = movie => {
    const { config } = this.props;
    const { backdrop_path, title, id } = movie;
    const img = config.images.secure_base_url + config.images.backdrop_sizes[1] + backdrop_path;
    return {
      img,
      title,
      id
    };
  };

  componentDidMount() {
    getPopular().then(response => {
      const mostPopular = response.results;
      this.setState(() => ({ mostPopular }));
    });
    getUpcoming().then(response => {
      const upcoming = response.results;
      this.setState(() => ({ upcoming }));
    });
    getTopRated().then(response => {
      const topRated = response.results;
      this.setState(() => ({ topRated }));
    });
  }

  render() {
    const { classes, config } = this.props;
    const { value, mostPopular, upcoming, topRated } = this.state;

    if (mostPopular && upcoming && topRated) {
      const mostPopularTileData = mostPopular.map(this.moviesToTileData);
      const upcomingTileData = upcoming.map(this.moviesToTileData);
      const topRatedTileData = topRated.map(this.moviesToTileData);

      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Most Popular" />
              <Tab label="Upcoming" />
              <Tab label="Top Rated" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              <FullWidthGrid tileData={mostPopularTileData} />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <FullWidthGrid tileData={upcomingTileData} />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <FullWidthGrid tileData={topRatedTileData} />
            </TabContainer>
          )}
        </div>
      );
    }
    return <LoadingPage />;
  }
}

export default compose(
  withStyles(styles, {
    name: 'HomePage'
  }),
  connect(state => ({
    config: state.config
  }))
)(HomePage);
