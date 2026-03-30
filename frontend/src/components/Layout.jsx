import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <div>
      <Header />
      <main className='min-h-lvh container py-4'>
        <Outlet />
      </main>
      <Footer />    
    </div>
  )
}

export default Layout
