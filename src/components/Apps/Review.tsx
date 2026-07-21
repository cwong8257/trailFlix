import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

interface ReviewProps {
  author: string;
  content: string;
  url: string;
}

const Review: React.FC<ReviewProps> = ({ author, content, url }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(prev => !prev);
  };

  return (
    <ListItem
      sx={{
        padding: '0 0 1rem 0',
        alignItems: 'flex-start'
      }}
    >
      <Box
        component="a"
        target="_blank"
        href={url}
        sx={{ textDecoration: 'none', marginRight: '16px' }}
      >
        <Avatar>
          <Icon>account_circle</Icon>
        </Avatar>
      </Box>
      <ListItemText
        disableTypography={false}
        primary={
          <Box>
            <Box
              component="a"
              target="_blank"
              href={url}
              sx={{ textDecoration: 'none' }}
            >
              <Typography variant="body2" color="primary">{author}</Typography>
            </Box>
            {!expanded && (
              <Typography variant="body1">{`${
                content.length > 200 ? content.substring(0, 200) + '...' : content
              }`}</Typography>
            )}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography variant="body1">{content}</Typography>
            </Collapse>
            {content.length > 200 && (
              <Button onClick={handleExpandClick} aria-expanded={expanded} aria-label="Show more">
                {expanded ? 'Show Less' : 'Read More'}
              </Button>
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

export default Review;
