import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { InputLabel, InputAdornment } from 'material-ui/Input';

import HeaderSearchIcon from './HeaderSearchIcon';
import { history } from '../../routers/AppRouter';
import { getMovieList } from '../../tmdb/tmdb';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '20rem'
  },
  textFieldRoot: {
    color: 'inherit',
    backgroundColor: 'inherit',
    border: '1px solid #ced4da',
    padding: '0.1rem'
  },
  textFieldInput: {
    color: 'inherit',
    fontSize: '1rem'
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
    const { classes, onFocusChange } = this.props;
    return (
      <div className={classes.root}>
        <form onSubmit={this.onSubmit}>
          <TextField
            fullWidth
            autoFocus
            id="search-input"
            placeholder="Search"
            value={this.state.search}
            onBlur={onFocusChange}
            onChange={this.onSearchChange}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.textFieldRoot,
                input: classes.textFieldInput
              },
              startAdornment: (
                <InputAdornment position="start">
                  <HeaderSearchIcon />
                </InputAdornment>
              )
            }}
          />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(HeaderSearchBar);
