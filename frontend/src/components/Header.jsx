import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate();
  const redirectToRegister = () => {
    navigate('/register');
  }

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className='container'>
      <div className='flex justify-between items-center'>
        <div className=''><Link to="/" >My site</Link></div>
        <div className='navigation'>
          <ul className='flex gap-4'>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'text-red-500' : ''}>Home</NavLink> 
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'text-red-500' : ''}>About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-red-500' : ''}>Contact</NavLink>
            </li>
          </ul>
        </div>
        <button className="text-white bg-blue-500 border-1 p-2 uppercase font-bold" type="button" onClick={redirectToRegister}>
          Toggle modal
        </button>
      </div>
      </div>

    </header>
  )
}

export default Header
