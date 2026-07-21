import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { vi } from 'vitest';

describe('ScrollToTop Component', () => {
  let scrollToSpy: any;

  beforeEach(() => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
  });

  test('calls window.scrollTo(0, 0) on mount and on route change', () => {
    const NavigationTester = () => {
      const navigate = useNavigate();
      React.useEffect(() => {
        navigate('/next-page');
      }, [navigate]);
      return null;
    };

    render(
      <MemoryRouter
        initialEntries={['/']}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<NavigationTester />} />
          <Route path="/next-page" element={<div>Next Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    expect(scrollToSpy).toHaveBeenCalledTimes(2);
  });
});
