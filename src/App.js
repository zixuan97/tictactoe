import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Games from './pages/Games';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route path='/' element={<Navigate replace to='/login' />} />

        <Route path='/ticTacToe' element={<Home />}>
          <Route index element={<Navigate replace to='/games' />} />
          <Route path='profile' element={<Profile />} />
          <Route path='games' element={<Games />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
