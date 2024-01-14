import React from 'react'
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-orange-400 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto py-3 px-3'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>QckJUST</span>
        <span className='text-cyan-500'>Find</span>
        <span className='text-cyan-500 '>.in</span>
      </h1>
      <form className='bg-slate-200 p-2 rounded-md flex items-center'>
        <input type="text" placeholder='Search...' className=' bg-transparent focus:outline-none w-24 sm:w-64 '/>
        <FaSearch className='text-slate-500'/>
      </form>
      <ul className='flex gap-4'>
        <Link to="/">
        <li className='hidden sm:inline hover:underline hover:text-cyan-400'>Home</li>
        </Link>
        <Link to='/about'>
        <li className='hidden sm:inline hover:underline hover:text-cyan-400'>About</li>
        </Link>
        <Link to='/profile'>
          {
            currentUser?(<img className='rounded-full h-8 w-8'src={currentUser.avatar} alt='profile'/>):(<li className='hover:underline hover:text-cyan-400'>Sign in</li>)
          }
        </Link>
      </ul>
      </div>
      
    </header>
  )
}
