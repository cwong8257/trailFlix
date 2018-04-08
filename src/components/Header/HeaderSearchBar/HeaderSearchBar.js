import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import { history } from '../../../routers/AppRouter';
import { getMovieList } from '../../../tmdb/tmdb';

const styles = theme => ({
  textFieldRoot: {
    padding: 0
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
});

class HeaderSearchBar extends React.Component {
  state = {
    search: ''
  };

  onSearchChange = e => {
    const search = e.target.value;
    this.setState(() => ({ search }));
  };

  onSubmit = e => {
    e.preventDefault();

    history.push(`/results?search_query=${this.state.search}`);
    this.setState(() => ({ search: '' }));
  };

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          id="bootstrap-input"
          placeholder="Search"
          value={this.state.search}
          onChange={this.onSearchChange}
          InputProps={{
            disableUnderline: true,
            classes: {
              root: classes.textFieldRoot,
              input: classes.textFieldInput
            }
          }}
          fullWidth
        />
      </form>
    );
  }
}

export default withStyles(styles)(HeaderSearchBar);
