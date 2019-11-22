import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom';
import './App.css';
import MovieList from './components/MovieList.js';
import MovieView from './components/MovieView.js';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Switch>
            <Route path="/movie/:id" component={Movie} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <MovieList />
  );
}

function Movie() {
  let {id} = useParams();
  return (
    <MovieView id={id} />
  );
};

export default App;
