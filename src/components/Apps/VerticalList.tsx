import React from 'react';
import List from '@mui/material/List';

import VerticalListItem from '../Apps/VerticalListItem';

interface VerticalListData {
  id: string | number;
  img: string;
  title: string;
  primary: React.ReactNode;
  secondary: React.ReactNode;
}

interface VerticalListProps {
  tileData: VerticalListData[];
}

const VerticalList: React.FC<VerticalListProps> = ({ tileData }) => (
  <List>{tileData.map((data) => <VerticalListItem key={data.id} {...data} />)}</List>
);
export default VerticalList;
