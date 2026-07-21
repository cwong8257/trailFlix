import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Review from './Review';

describe('Review Component', () => {
  const shortReview = {
    author: 'John Doe',
    content: 'This was a short but really great movie.',
    url: 'https://example.com/review/1',
  };

  const longReview = {
    author: 'Jane Smith',
    content: 'A'.repeat(300), // 300 characters long
    url: 'https://example.com/review/2',
  };

  test('renders short review without read more button', () => {
    render(<Review {...shortReview} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('This was a short but really great movie.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /read more/i })).not.toBeInTheDocument();
  });

  test('renders long review truncated and toggles expand state', () => {
    render(<Review {...longReview} />);

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // The text should be truncated (200 characters + '...')
    const expectedTruncatedText = 'A'.repeat(200) + '...';
    expect(screen.getByText(expectedTruncatedText)).toBeInTheDocument();

    // Check button exists
    const button = screen.getByRole('button', { name: /show more/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Read More');

    // Click to expand
    fireEvent.click(button);
    expect(screen.getByText('A'.repeat(300))).toBeInTheDocument();
    expect(button).toHaveTextContent('Show Less');

    // Click to collapse
    fireEvent.click(button);
    expect(screen.getByText(expectedTruncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent('Read More');
  });
});
