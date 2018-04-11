import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Typography from 'material-ui/Typography';
import { keyframes } from 'styled-components';
import { withStyles } from 'material-ui/styles';

import Poster from './Poster';

const unhide = keyframes`
  from {
    opacity: 0;
    transform: translateX(-1rem);
  }
  to {
    opacity: 1;
    transform: translate(0);
  }
`;

const styles = theme => ({
  root: {
    backgroundColor: 'inherit',
    color: 'inherit'
  },
  hidden: {
    position: 'absolute',
    bottom: '0.1rem',
    right: '-4.5rem',
    opacity: 0
  },
  title: {
    color: 'inherit',
    textDecoration: 'none',
    marginBottom: '0.5rem',
    display: 'inline-block',
    position: 'relative',

    '&:hover': {
      color: 'white',

      '& div': {
        animation: `${unhide} 1s both`
      }
    }
  },
  slide: {
    paddingRight: '4px'
  }
});

const HorizontalSlider = ({ color, classes, link, tileData, title }) => {
  const settings = {
    className: classes.slider,
    infinite: true,
    slidesToScroll: 6,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      }
    ]
  };

  return (
    <div className={classes.root}>
      <Link to={`${link}`} className={classes.title}>
        <Typography color="inherit" variant="title" component="span">
          {title}
        </Typography>
        <div className={classes.hidden}>
          <Typography color="inherit" variant="caption" component="span">
            Explore All &gt;
          </Typography>
        </div>
      </Link>
      <Slider {...settings}>
        {tileData.map((tile, index) => (
          <div key={index} className={classes.slide}>
            <Poster {...tile} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default withStyles(styles)(HorizontalSlider);
