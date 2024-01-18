import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
<footer className=" shadow bg-orange-400 relative bottom-0 w-full">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <div className='flex justify-between items-center max-w-6xl mx-auto py-3 px-3'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>QckJUST</span>
                <span className='text-cyan-500'>Find</span>
                <span className='text-cyan-500 '>.in</span>
                </h1>
            </div>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 ">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <Link to="/contactus" className="hover:underline">Contact</Link>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm  sm:text-center">© 2023 <a href="/" className="hover:underline">QckJUSTFind™</a>. All Rights Reserved.</span>
    </div>
</footer>


  )
}
