import React from 'react'

import { useSelector } from 'react-redux'
import {Outlet,Navigate,Link} from 'react-router-dom'

export default function Privr() {
    const currentUser = useSelector((state)=>state.user);
    console.log(currentUser.currentUser);
  return (currentUser.currentUser===null? <Navigate to='/sign-in'/>:<Outlet/>);
}
