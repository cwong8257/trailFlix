import React from 'react';
import List from '@mui/material/List';

import VerticalListItem from '../Apps/VerticalListItem';

const VerticalList = ({ tileData }) => (
  <List>{tileData.map(({ ...data }) => <VerticalListItem key={data.id} {...data} />)}</List>
);
export default VerticalList;
