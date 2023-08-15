


import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

const Menu = () => (
  <div>
    <NavLink to="/">Anecdotes</NavLink>
    <NavLink to="/create">Create New</NavLink>
  </div>
);


const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Menu />

      <Switch>
        <Route path="/create">
          {/* Render create form */}
        </Route>
        <Route path="/">
          {/* Render list of anecdotes */}
        </Route>
      </Switch>
    </div>
  );
};
