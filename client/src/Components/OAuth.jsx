import React from 'react'
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signInSuccess} from '../redux/user/userSlice';
export default function OAuth() {
  const Navig = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClk = async()=>{
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth,provider);
      const res = await fetch('/api/auth/google',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            name:result.user.displayName,
            email: result.user.email,
            photo:result.user.photoURL
          }),
      })
      const data = await res.json();
      dispatch(signInSuccess(data));
      Navig('/');
    } catch (error) {
      console.log('could not sign in with in the google',error);
    }
  };
  return (
    <button type='button' onClick={handleGoogleClk} className='bg-red-700 text-white p-3 rounded-lg flex flex-col gap-3'>
      CONTINUE WITH GOOGLE
    </button>
  )
}
