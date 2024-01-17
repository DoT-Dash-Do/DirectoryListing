import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function Category() {
    const params = useParams();
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
      const res = await fetch(`/api/listing/get?searchTerm=&ListingType=${params.type}`);
      const data= await res.json();
      SetResult(data);
  }
  return (
    <div className='min-h-[800px]'>
            <h1 className="text-3xl font-semibold p-3 text-slate-700 mt-5">{params.type.replace("+"," ")}</h1>
            
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
  )
}
