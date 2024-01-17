import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { RiRestaurant2Fill} from "react-icons/ri";
import { FaStoreAlt,FaBriefcaseMedical } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";
import { IoAirplaneSharp } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa";

export default function Home() {
  const navig = useNavigate();
    const [sidebardata,setSidebardata] = useState({
        searchTerm:'',
        ListingType:'',
        AuthorizedBiz:false
    });
    const [result,SetResult] = useState([]);
    useEffect(()=>{
      fetchResult();
  },[location.search]);
  const fetchResult=async()=>{
      const res = await fetch(`/api/listing/get?searchTerm=&AuthorizedBiz=true`);
      const data= await res.json();
      SetResult(data);
  }
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div
        className="w-full h-96 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?cs=srgb&dl=pexels-bri-schneiter-346529.jpg&fm=jpg")',
        }}
      ></div>
      <div className="bg-slate-200 flex justify-around p-4 w-full lg:px-80 px-20 flex-wrap gap-4">
        <Link to="/category/FoodRestro" className="bg-blue-300 flex flex-col p-4 items-center text-sm rounded-md">
        <RiRestaurant2Fill size={100}/>
        <p>Foods & restro</p>
        </Link>
        <Link to="/category/Commercial+Store" className="bg-blue-300 flex flex-col p-4 items-center text-sm rounded-md">
        <FaStoreAlt size={100}/>
        <p>Commercial Store</p>
        </Link>
        <Link to="/category/Delivery+Service" className="bg-blue-300 flex flex-col p-4 items-center text-sm rounded-md">
        <MdDeliveryDining size={100}/>
        <p>Delivery</p>
        </Link>
        <Link to="/category/Education" className="bg-blue-300 flex flex-col p-4 items-center text-sm rounded-md">
        <IoMdSchool size={100}/>
        <p>Education</p>
        </Link>
        <Link to="/category/Medical" className="bg-blue-300 flex flex-col p-4 items-center text-sm rounded-md">
        <FaBriefcaseMedical size={100}/>
        <p>Medical</p>
        </Link>
        <Link to="/category/Travel" className="bg-blue-300 flex flex-col p-4 items-center text-sm rounded-md">
        <IoAirplaneSharp  size={100}/>
        <p>Travel</p>
        </Link>
        <Link to="/category/Dealer" className="bg-blue-300 flex flex-col p-4 items-center text-sm rounded-md">
        <FaHandshake size={100}/>
        <p>Dealer</p>
        </Link>
        
      </div>

      {/* The text below is the card */}
      <div>
            <h1 className="text-3xl font-semibold p-3 text-slate-700 mt-5">Our Authorized Buisness</h1>
            
                {result.length !== 0 && <div className='p-5 flex flex-col flex-wrap gap-2 md:flex-row'>
                    {
                        result.map((res)=>{
                            return(<div key={res._id} className='bg-slate-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden border rounded-md'>
                                {
                                    <Link to={`/listing/${res._id}`}>
                                        <img src={res.imageUrls[0]} alt="listing img" className='h-[320px] sm:h-[220px] w-full object-cover self-center p-3 rounded-lg'/>
                                        <div className='px-3 pb-3 items-center flex justify-between font-semibold'>
                                        <p className='truncate'>
                                        {res.name}
                                        </p>
                                        <p className='bg-green-200 rounded-md p-2 font-semibold'>
                                            {res.ListingType}
                                        </p>
                                        </div>
                                        
                                    </Link>
                                }
                            </div>)
                        })
                    }
                    </div>}
            
        </div>
      
    </div>
  );
}
