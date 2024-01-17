import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { list } from "firebase/storage";
// Initialize Swiper modules
SwiperCore.use([Navigation]);

export default function Listing() {
  const currentUser = useSelector((state) => state.user);
  const [listing, setListing] = useState({});
  const [error, setError] = useState(false);
  const [html, setHtml] = useState("");
  const [revs,setRevs] = useState([]);
  const [rev,setRev] = useState({
      userRef:"",
      review:""
  });
  const params = useParams();

  useEffect(() => {
    fetchListing();
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);
  const fetchComments=async()=>{
    const res = await fetch(`/api/reviews/getRevs/${params.lstid}`);
    const data = await res.json();
    setRevs(data);
  }
  useEffect(() => {
    // Update the html state immediately when the listing state changes
    setHtml(listing.mapUrl);
  }, [listing]);
  const postListing = async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch(`/api/reviews/create/${params.lstid}`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(rev)
      });
      const data = await res.json();
      setRev({
        userRef:"",
        review:""
    });
    } catch (error) {
      console.log(error.message());
    }
  }
  const fetchListing = async () => {
    try {
      const listingid = params.lstid;
      const res = await fetch(`/api/listing/getinfo/${listingid}`);
      const data = await res.json();
      setListing(data);
    } catch (err) {
      console.log(err.message);
      setError(true);
    }
  };
  const hndlCmnt = (e)=>{
    setRev({
      ...rev,
      userRef:currentUser.currentUser._id,
      review:e.target.value
    });
  }
  return (
    <div className="bg-slate-200 min-h-[700px]">
      {error ? (
        <p>Error loading listing</p>
      ) : (
        <div>
          <Swiper>
            {listing?.imageUrls &&
              listing.imageUrls.map((imageUrl, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="h-[350px]"
                    style={{
                      background: `url(${imageUrl}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
          </Swiper>

          <div className="mt-7 flex  flex-col gap-4 items-center ">
            <div className="flex flex-wrap justify-between gap-4 items-center">
              <h1 className="font-bold text-blue-900 font-serif text-5xl">
                {listing.name}
              </h1>
              <span className="bg-green-600 text-white p-2 rounded-lg select-none">
                {listing.ListingType}
              </span>
              {listing.AuthorizedBiz && <p className='bg-slate-800 text-white p-2 rounded-lg select-none'>Authorized Buissness</p>}
            </div>
            <p className="block max-w-[1000px] text-center">{listing.description}</p>
            
              <div className="flex flex-col lg:flex-row mt-16 w-full justify-evenly mb-8">
                <div>
                {
                  currentUser.currentUser &&
                  <form onSubmit={postListing}>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                  <textarea id="review" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Leave a comment..." onChange={hndlCmnt}></textarea>
                  <button className="p-3 bg-green-700 text-white">Comment</button>
                  </form>
                }
                {
                  revs.map((revi)=>{
                    return (<div class="min-w-[401px] border-2 rounded-md p-3 my-3 mx-8 lg:mx-0 border-slate-700">
                    <div className="flex gap-3 items-center">
                        <h3 className="font-bold">
                            {revi.userName}
                        </h3>
                    </div>


                    <p className="text-gray-600 mt-2">
                        {revi.review}
                    </p>

                </div>)
                  })
                }
                </div>
                <div className="flex flex-col items-center">
                  <p>{listing.address}</p>
                  <div dangerouslySetInnerHTML={{ __html: html }}></div>
                </div>
                  
                </div>
          
              
                
          </div>
        </div>
      )}
    </div>
  );
}
