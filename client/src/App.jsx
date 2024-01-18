import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './Components/Header';
import Privr from './Components/Privr';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Category from './pages/Category';
import Footer from './Components/Footer';
import ContactUs from './pages/ContactUs';
export default function App() {
  return (
    <BrowserRouter>
    <div className='min-h-screen'>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/listing/:lstid" element={<Listing/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/category/:type" element={<Category/>}/>
      <Route path="/contactus" element={<ContactUs/>}/>
      <Route element={<Privr/>}>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/update-listing/:lstid" element={<UpdateListing/>}/>
      </Route>
    </Routes>
    <Footer/>
    </div>
   
    </BrowserRouter>
  )
}
