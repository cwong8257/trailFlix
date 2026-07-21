import React from 'react';
import { render, screen } from '@testing-library/react';
import Rating from './Rating';

describe('Rating Component', () => {
  test('renders rating score and vote count with singular suffix', () => {
    render(<Rating rating={7.8} count={1} />);
    
    expect(screen.getByText('7.8')).toBeInTheDocument();
    expect(screen.getByText('/10')).toBeInTheDocument();
    expect(screen.getByText('1 vote')).toBeInTheDocument();
  });

  test('renders plural vote suffix for multiple votes', () => {
    render(<Rating rating={8.5} count={150} />);
    
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('150 votes')).toBeInTheDocument();
  });
});
