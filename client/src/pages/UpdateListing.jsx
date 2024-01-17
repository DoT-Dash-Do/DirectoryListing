import { uploadBytesResumable } from 'firebase/storage';
import {getDownloadURL, getStorage,ref} from 'firebase/storage';
import {app} from '../firebase.js';
import React, { useState ,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
export default function UpdateListing() {
    const params = useParams();
    const navig = useNavigate();
    const currentUser = useSelector(state => state.user)
    const [files,setFiles] = useState([]);
    const [error,setError] = useState(false);
    const [load,setLoad] = useState(false);
    const [formData,setformData] = useState({imageUrls:[],
    name:'',
    description:'',
    address:'',
    ListingType:'',
    AuthorizedBiz:false,
    pincode:0,
    mapUrl:''});
    const [imageUploadError,setImageUploadError] = useState(false);
    useEffect(()=>{
        fetchListing();
    },[]);
    const fetchListing = async()=>{
        console.log(1);
                const listingid = params.lstid;
                const res = await fetch(`/api/listing/getinfo/${listingid}`);
                const data = await res.json();
                setformData(data);
                return;
            }
    const handleImageSumit = (e) => {
        if(files.length>0 && files.length + formData.imageUrls.length<6)
        {
            const promises = [];

            for(let i = 0;i<files.length;i++)
            {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls)=>{
                setformData({...formData,imageUrls:formData.imageUrls.concat(urls)});
                setImageUploadError(false);
            }).catch((err)=>{
                setImageUploadError('please check the files uploaded <2mb');
            })
        }
        else
        {
            setImageUploadError("Images should not be more than 5")
        }
    };
    const storeImage = async(file) => {
        return new Promise((resolve,reject)=>{
            const storage = getStorage(app);
            const fileName = new Date().getTime()+file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef,file)
            uploadTask.on("state_change",(snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(Math.round(progress));
              },error=>{reject(error);},()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                    resolve(downloadUrl);
                })
            });
        })
    }
    const HandleSubmit = async(e) => {
        e.preventDefault();
        try {
            setLoad(true);
            setError(false);
            const res = await fetch(`/api/listing/updateListing/${params.lstid}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({...formData,userRef:currentUser.currentUser._id})
            });
            const data = await res.json();
            setLoad(false);
            if(data.success === false)
            {
                setError(true);
                return;
            }
            navig(`/listing/${data._id}`);
        } catch (err) {
            setError(false);
            setLoad(false)    
        }
    }
    const handleChange=(e)=>{
        if(e.target.id === 'ListingType')
        {
            setformData(
                {
                    ...formData,
                    [e.target.id]:e.target.value
                }
            )
        }
        if(e.target.id === 'AuthorizedBiz')
        {
            setformData(
                {
                    ...formData,
                    [e.target.id]:e.target.checked
                }
            )
        }
        console.log(error);
        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea')
        {
            setformData(
            {
                ...formData,
                [e.target.id]:e.target.value
            })
        }
    };
  return (
    <div className='p-3 max-w-4xl mx-auto'><h1 className='text-3xl font-semibold text-center my-7 min-h-[700px]'>Update Listing</h1>
    <form onSubmit={HandleSubmit} className='flex flex-col sm:flex-row'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' minLength='10' onChange={handleChange} value={formData.name} required/>
            <textarea type="text" placeholder="Description" className='border p-3 rounded-lg' id='description' minLength='10' onChange={handleChange} value={formData.description}/>
            <input type="text" placeholder="Address" className='border p-3 rounded-lg' id='address' minLength='10' onChange={handleChange} value={formData.address}/>
            <div className='flex gap-2 flex-col'>
        
                <label htmlFor="listingType" className="block mb-2 text-sm font-medium">Select The Type</label>
                <select id="ListingType" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleChange} value={formData.Listingtype}>
                <option selected>{formData.ListingType}</option>
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
                <input type="checkbox" name="" id="AuthorizedBiz" className='w-5' onChange={handleChange} checked={formData.AuthorizedBiz}/>
            </div>
            <textarea type="text" placeholder="Map Url" className='border p-3 rounded-lg' id='mapUrl' minLength='10' onChange={handleChange} value={formData.mapUrl}/>
            <div>
                <label htmlFor="pincode" className="block mb-2 text-sm font-medium">Pincode</label>
                <input type="number" id="pincode" className='border p-3 rounded-lg' onChange={handleChange} value={formData.pincode}required/>
            </div>
            <div className='flex flex-col flex-l gap-4'>
                <p className='font-medium'>Images</p>
                <span className='text-gray-600'>The first image will be cover(max 5)</span>
                <div className='flex gap-4 border border-black-800 rounded-lg max-w-fit'>
                    <input type="file" onChange={(e)=>setFiles(e.target.files)} id='images' accept='image/*' multiple/>
                    <button type='button' onClick={handleImageSumit} className='p-3 text-green-500 border border-green-500 rounded-lg hover:bg-slate-300'>Upload</button>
                </div>
                <p className='text-red-400'>{imageUploadError && imageUploadError}</p>
                <div className='flex flex-col gap-4'>
                    {formData.imageUrls.length>0 && formData.imageUrls.map((url)=>
                        (<div className='flex p-3 max-w-xs gap-4 items-center justify-between border rounded-lg border-black-800'><img src={url} alt='image' className='w-20 h-20 object-cover rounded-lg'/></div>)
                    )}
                </div>
            </div>
            <button className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>{load?'loading':'Update Lisitng'}</button>
        </div>
    </form></div>
    
  )
}
