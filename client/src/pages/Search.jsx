import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Search() {
    const navig = useNavigate();
    const [sidebardata,setSidebardata] = useState({
        searchTerm:'',
        ListingType:'',
        AuthorizedBiz:false
    });
    const [result,SetResult] = useState([]);
    const hndlChange = (e)=>{
        if(e.target.id === 'AuthorizedBiz')
        {
            setSidebardata(
                {
                    ...sidebardata,
                    [e.target.id]:e.target.checked
                }
            )
        }
        else
        {
            setSidebardata(
                {
                    ...sidebardata,
                    [e.target.id]:e.target.value
                }
            )
        }
    }
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        fetchResult(urlParams);
    },[location.search]);
    const fetchResult=async(urlParams)=>{
        const searchQuery = urlParams.toString();
        console.log(searchQuery);
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data=res.json();
        SetResult(data);
    }
    const hndlSubmit = (e) =>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm',sidebardata.searchTerm);
        urlParams.set('ListingType',sidebardata.ListingType);
        urlParams.set('AuthorizedBiz',sidebardata.AuthorizedBiz);
        const searchQuery = urlParams.toString();
        navig(`/search?${searchQuery}`);  
    }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 sm:border-r-2 md:min-h-screen">
            <form action="" onSubmit={hndlSubmit} className='flex flex-col gap-y-2'>
                <div className='flex items-center'>
                    <label className="whitespace-nowrap">Search:</label>
                    <input type="text" id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full' value={sidebardata.searchTerm} onChange={hndlChange}/>
                </div>
                <div className='flex-col'>
                    <label htmlFor="ListingType" className="mb-2 text-sm">Select Type</label>
                    <select id="ListingType" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={hndlChange}>
                    <option selected>{sidebardata.ListingType}</option>
                    <option value="FoodRestro">Restaurant And Hotels</option>
                    <option value="Commercial Store">Commercial Store</option>
                    <option value="Delivery Service">Delivery Service</option>
                    <option value="Education">Education</option>
                    <option value="Medical">Medical</option>
                    <option value="Travel">Travel</option>
                    <option value="Dealer">Dealer</option>
                    </select>
                </div>
                <div >
                    <span>Authorized Buissness</span>
                    <input type="checkbox" name="" id="AuthorizedBiz" className='w-5' onChange={hndlChange}/>
                </div>
                <button type='submit' className='text-white w-full bg-green-800 p-2 rounded-lg'>
                    Search
                </button>
            </form>
        </div>
        <div className="text-3xl font-semibold p-3 text-slate-700 mt-5">
            <h1>Listing Results:</h1>
        </div>
    </div>
  )
}
