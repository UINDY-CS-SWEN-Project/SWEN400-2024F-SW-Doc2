import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Registration from './pages/Registration'; 
import Login from './pages/Login'; 
import PrivateRoutes from './utils/PrivateRoutes'; 
import Teams from './pages/Teams';
import Editor from './pages/Editor';
import ViewTeams from './pages/ViewTeams';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('/api/db')
        .then((response) => response.json()) 
        .then((data) => { console.log(data); }); 
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/home" />
            <Route element={<Teams />} path="/teams" />
            <Route element={<Editor />} path="/editor" />
            <Route element={<ViewTeams />} path="/viewteams" />
          </Route>
          <Route element={<Registration />} path="/registration" />
          <Route element={<Login />} path="/" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
