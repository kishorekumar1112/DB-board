import React from 'react'
import './nav.css';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <nav>
      <ul className='nav'>
        <h2 className='label'><span>D</span>ash<span>B</span>oard</h2>
        <li><Link to="/" className='link'>Home</Link></li>
        <li><Link to="/post" className='link'>Posts</Link></li>
      </ul>
    </nav>
  )
}

export default Nav;
