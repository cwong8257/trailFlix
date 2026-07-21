import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import HomePage from '../components/Pages/HomePage';
import MoviePage from '../components/Pages/MoviePage';
import ResultsPage from '../components/Pages/ResultsPage';
import MostPopularPage from '../components/Pages/MostPopularPage';
import UpcomingPage from '../components/Pages/UpcomingPage';
import TopRatedPage from '../components/Pages/TopRatedPage';
import NotFoundPage from '../components/Pages/NotFoundPage';
import ScrollToTop from './ScrollToTop';

const AppRouter = () => (
  <BrowserRouter>
    <ScrollToTop />
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/most_popular" element={<MostPopularPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/top_rated" element={<TopRatedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;

