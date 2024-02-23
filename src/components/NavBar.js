import React from 'react'
import Logo from '../MovieLogo.png'
import {Link} from 'react-router-dom'
// one mistake is very common in your react  
// that is capital letter and small letter mistakes please be careful

function NavBar() {
  return (
    <div className='flex border space-x-8 items-centre pl-3 py-4'>
        <img src={Logo} className='w-[50px]'/>
    <Link to='/' className='text-blue-400'>Movies</Link>
    <Link to='/WatchList' className='text-blue-400'>Watchlist</Link>
    </div>
  )
}

export default NavBar
