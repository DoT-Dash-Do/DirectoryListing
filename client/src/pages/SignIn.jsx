import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import OAuth from '../Components/OAuth';
export default function SignIn() {
  const navig = useNavigate();
  const Dispatch = useDispatch();
  const{load,error} = useSelector((state)=>state.user);
  const [formData,setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      Dispatch(signInStart());
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
        Dispatch(signInFailure(data.message));
        return;
      }
      Dispatch(signInSuccess(data));
      navig('/');
    } catch (error) {
      Dispatch(signInFailure(error.message));
    }
      
     
  }
  
  return (
    <div className='items-center max-w-xs mx-auto sm:max-w-sm'>
      <h1 className='text-4xl text-center font-semibold my-7 text-orange-400'>Sign in</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-3'>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={load} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{load?'Signing IN':'Sign in'}</button>
        <OAuth/>
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
