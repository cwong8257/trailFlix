import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import MoviePage from '../components/MoviePage';
import ResultsPage from '../components/ResultsPage';
import MostPopularPage from '../components/MostPopularPage';
import UpcomingPage from '../components/UpcomingPage';
import TopRatedPage from '../components/TopRatedPage';
import NotFoundPage from '../components/NotFoundPage';

export const history = createHistory();

history.listen((location, action) => {
  window.scrollTo(0, 0);
});

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/movie/:id" component={MoviePage} />
        <Route path="/results" component={ResultsPage} />
        <Route path="/most_popular" component={MostPopularPage} />
        <Route path="/upcoming" component={UpcomingPage} />
        <Route path="/top_rated" component={TopRatedPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
