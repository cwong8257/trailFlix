import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { InputLabel, InputAdornment } from 'material-ui/Input';

import HeaderSearchIcon from './HeaderSearchIcon';

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

const HeaderSearchBar = ({ classes, onFocusChange }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    navigate(`/results?search_query=${search}`);
    setSearch('');
  };

  return (
    <div className={classes.root}>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          autoFocus
          id="search-input"
          placeholder="Search"
          value={search}
          onBlur={onFocusChange}
          onChange={onSearchChange}
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
};

export default withStyles(styles)(HeaderSearchBar);


