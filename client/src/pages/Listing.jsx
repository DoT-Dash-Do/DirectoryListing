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
  const postListing = async()=>{
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
    <div className="bg-slate-400">
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

          <div className="mt-7 flex  flex-col gap-4 items-center">
            <div className="flex flex-wrap justify-between items-center">
              <h1 className="text-bold text-blue-900 italic text-3xl">
                {listing.name}
              </h1>
              <span className="bg-green-600 p-2 rounded-lg">
                {listing.ListingType}
              </span>
              {listing.AuthorizedBiz && <p className='bg-orange-500 p-2 rounded-lg'>Authorized Buissness</p>}
            </div>
            <p className="max-w-[800px] self-center">{listing.description}</p>
            <p>{listing.address}</p>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
            
                <div>
                {
                  currentUser.currentUser &&
                  <form>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                  <textarea id="review" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." onChange={hndlCmnt}></textarea>
                  <button className="p-3 bg-green-700 text-white" onClick={postListing} type="button">Comment</button>
                  </form>
                }
                {
                  revs.map((revi)=>{
                    return (<div class="min-w-[400px] border rounded-md p-3 ml-3 my-3">
                    <div class="flex gap-3 items-center">
                        <h3 class="font-bold">
                            {revi.userName}
                        </h3>
                    </div>


                    <p class="text-gray-600 mt-2">
                        {revi.review}
                    </p>

                </div>)
                  })
                }
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
