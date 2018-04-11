import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const Tile = styled.div`
  display: block;
  position: relative;
  margin-bottom: 4rem;
`;

const Image = styled.img`
  width: 100%;
`;

const TextBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.6rem;
  color: #fff;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  width: 100%;
  height 100%;
  overflow: hidden;
  transition: all 0.5s;

  &:hover {
    opacity: 1;
  }
`;

const Poster = ({ classes, id, img, title, overview, year }) => {
  return (
    <Tile>
      <Link to={`/movie/${id}`}>
        <Image src={img} alt={title} />
        <TextBox>
          <Typography color="inherit" variant="body2" component="h3" noWrap gutterBottom>
            {title}
          </Typography>
          <Typography color="inherit" variant="body2" component="h4" gutterBottom>
            {year}
          </Typography>
          <Typography color="inherit" variant="caption" component="p">
            {overview}
          </Typography>
        </TextBox>
      </Link>
    </Tile>
  );
};

export default Poster;
