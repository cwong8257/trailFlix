import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Poster from './Poster';

describe('Poster Component', () => {
  const posterProps = {
    id: 12345,
    img: 'https://example.com/poster.jpg',
    title: 'Awesome Movie',
    overview: 'A movie about testing code.',
    year: '2026',
  };

  test('renders image, title, year, and overview with link to movie page', () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Poster {...posterProps} />
      </MemoryRouter>
    );

    // Verify image
    const image = screen.getByRole('img', { name: 'Awesome Movie' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/poster.jpg');

    // Verify typography content
    expect(screen.getByText('Awesome Movie')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('A movie about testing code.')).toBeInTheDocument();

    // Verify link to movie details
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/movie/12345');
  });
});
