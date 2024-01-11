import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OAuth from '../Components/OAuth';
export default function SignUp() {
  const [error,setError] = useState(null);
  const [formData,setFormData] = useState({});
  const [load,setLoad] = useState(false);
  const navig = useNavigate();
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
      const res = await fetch('/api/auth/signup',
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false)
      {
        setError(data.message);
        setLoad(false);
        return;
      }
      setLoad(false)
      setError(null);
      navig('/sign-in');
    } catch (error) {
      setLoad(false);
      setError(error.message);
    }
      
     
  }
  
  return (
    <div className='items-center max-w-xs mx-auto sm:max-w-sm'>
      <h1 className='text-4xl text-center font-semibold my-7 text-orange-400'>Sign up</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-3'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={load} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{load?'Signing-up':'Sign-UP'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
