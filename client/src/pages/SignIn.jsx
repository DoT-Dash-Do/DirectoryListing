import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
export default function SignIn() {
  const [error,setError] = useState(null);
  const [formData,setFormData] = useState({});
  const [load,setLoad] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const res = await fetch('/api/auth/signin',
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false)
      {
        setError(data.message);
        setLoad(false);
        return;
      }
      setLoad(false)
      setError(null);
    } catch (error) {
      setLoad(false);
      setError(data.message);
    }
      
     
  }
  
  return (
    <div className='items-center max-w-xs mx-auto sm:max-w-sm'>
      <h1 className='text-4xl text-center font-semibold my-7 text-orange-400'>Sign in</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-3'>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={load} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{load?'Signing IN':'Sign in'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>New User?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
