import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

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

interface HorizontalSliderProps {
  color?: string;
  link: string;
  tileData: any[];
  title: string;
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({ color, link, tileData, title }) => {
  const settings = {
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
    <Box sx={{ backgroundColor: 'inherit', color: 'inherit' }}>
      <Link
        component={RouterLink}
        to={link}
        underline="none"
        sx={{
          color: 'inherit',
          marginBottom: '0.5rem',
          display: 'inline-block',
          position: 'relative',
          '&:hover': {
            color: 'white',
            '& .explore-all': {
              animation: `${unhide} 1s both`
            }
          }
        }}
      >
        <Typography color="inherit" variant="h6" component="span" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        <Box
          className="explore-all"
          sx={{
            position: 'absolute',
            bottom: '0.1rem',
            right: '-4.5rem',
            opacity: 0
          }}
        >
          <Typography color="inherit" variant="caption" component="span">
            Explore All &gt;
          </Typography>
        </Box>
      </Link>
      <Slider {...settings}>
        {tileData.map((tile, index) => (
          <Box key={index} sx={{ paddingRight: '4px' }}>
            <Poster {...tile} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HorizontalSlider;
