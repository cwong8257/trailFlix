import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

import HeaderSearchIcon from './HeaderSearchIcon';

interface HeaderSearchBarProps {
  onFocusChange?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const HeaderSearchBar = ({ onFocusChange }: HeaderSearchBarProps) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/results?search_query=${search}`);
    setSearch('');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '20rem' }}>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          autoFocus
          id="search-input"
          placeholder="Search"
          value={search}
          onBlur={onFocusChange}
          onChange={onSearchChange}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <HeaderSearchIcon />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiInputBase-root': {
              color: 'inherit',
              backgroundColor: 'inherit',
              border: '1px solid #ced4da',
              padding: '0.1rem'
            },
            '& .MuiInputBase-input': {
              color: 'inherit',
              fontSize: '1rem'
            }
          }}
        />
      </form>
    </Box>
  );
};

export default HeaderSearchBar;
