import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>home
      <Link className="link" to="/teams">Teams</Link>
    </div>
    
  )
}

export default Home