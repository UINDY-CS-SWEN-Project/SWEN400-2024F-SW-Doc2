import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginHome from '../../../../../SWEN400-2024F-SW-Doc2/react/client-app/src/pages/LoginHome'
import Home from '../../../../../SWEN400-2024F-SW-Doc2/react/client-app/src/pages/Home'
import Registration from '../../../../../SWEN400-2024F-SW-Doc2/react/client-app/src/pages/Registration'
import Login from '../../../../../SWEN400-2024F-SW-Doc2/react/client-app/src/pages/Login'
import PrivateRoutes from './utils/PrivateRoutes'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('/api/db')
        .then((data) => {console.log(data)});
  }, []);
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<LoginHome/>} path="/home" exact/>
                <Route element={<Registration/>} path="/registration"/>
            </Route>
            <Route element={<Registration/>} path="/registration"/>
            <Route element={<Login/>} path="/login"/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;