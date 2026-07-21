import React from 'react';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';

interface HeaderSearchIconProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const HeaderSearchIcon: React.FC<HeaderSearchIconProps> = ({ onClick }) => {
  return (
    <Box sx={{ float: 'right' }}>
      <IconButton color="inherit" aria-label="Search" onClick={onClick} size="large">
        <Icon sx={{ color: 'inherit' }}>search</Icon>
      </IconButton>
    </Box>
  );
};

export default HeaderSearchIcon;
