import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Registration from './pages/Registration'; 
import Login from './pages/Login'; 
import PrivateRoutes from './utils/PrivateRoutes'; 
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
          </Route>
          <Route element={<Registration />} path="/registration" />
          <Route element={<Login />} path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
