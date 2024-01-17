import React from 'react';
import { useSelector } from 'react-redux';
import { useRef,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {app} from '../firebase.js'
import { useDispatch } from 'react-redux';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import { updateUserFailure,updateUserSuccess,updateUserStart, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutStart, signOutFailure, signOutSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
  const navig = useNavigate();
  const dispatch = useDispatch();
  const {currentUser,load,error} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [file,setFile] = useState(undefined);
  const [filePr,setFilepr] = useState(0);
  const [fileUploadError,setFileUploaderror] = useState(false);
  const [formData,setFormData] = useState({});
  const [shLiserr,setShLiserr] = useState(false);
  const [userListings,setUserListings]=useState([]);
  useEffect(()=>{
    if(file)
      {
        handleFileUpload(file);
      }
  },[file])
  const handleChange = (e) =>{
    setFormData(
      {
        ...formData,
        [e.target.id] : e.target.value
      }
    )
  }
  const handleDelete = async(e)=>{
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/users/delete/${currentUser._id}`,{
      method:'DELETE'
    })
    const data = await res.json();
    if(data.success===false)
    {
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
    navig('/sign-in');
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/users/update/${currentUser._id}`,{
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.success === false)
        {
          dispatch(updateUserFailure(data.message));
          return;
        }
        dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }

  }
  const signOut = async () =>{
    try {
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signOut');
      const data = await res.json();
      if(data.success === false)
      {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data.message));
      navig('/sign-in')
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  }
  const handleShowLs = async() => {
  setShLiserr(false);
    try {
      const res = await fetch(`/api/users/shlistings/${currentUser._id}`)
      const data = await res.json();
      setUserListings(data);
    } catch (err) {
      setShLiserr(true);
    }
  }
  const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on('state_changed',(snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setFilepr(Math.round(progress));
      },
      (error)=>{setFileUploaderror(true)},
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl)=>{
          setFormData({...formData,avatar:downloadUrl})
        })
      }
      );
  };
  const hndlDelList=async(e)=>{
      try {
        const res = await fetch(`/api/listing/deleteListing/${e}`,{
          method:"DELETE",      
        })
        const data = await res.json();
        if(data.success === false)
        {
          console.log(data.message);
          return;
        }
        setUserListings((prev)=>prev.filter((lst)=>lst._id!==e));
      } catch (error) {
        console.log(error.message);
      }
  }
  const hndlEditList=(e)=>{
      navig(`/update-listing/${e}`);
  }
  return (
    <div className='max-w-lg mx-auto min-h-[700px]'>
      
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="img" className='rounded-full h-24 w-24 mt-2 self-center'/>
        <p className='self-center'>{fileUploadError?(<span className='text-red-700'>Error</span>) : filePr>0 && filePr <100?(<span className='text-green-400'>uploading {filePr}%</span>):filePr===100?(<span className='text-green-400'>uploaded {filePr}%</span>):(<span></span>)}</p>
        <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button className='bg-red-500 hover:opacity-95 rounded-lg p-3 disabled:opacity-80 cursor-pointer'>{load?("updating"):("update")}</button>
        <Link className='bg-green-300 p-3 rounded-lg text-center hover:opacity-80' to={"/create-listing"}>Create Listing</Link>
      </form >
      <div className='flex justify-between mt-2'>
        <span onClick={handleDelete}className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={signOut} className='text-red-700 cursor-pointer'>Sign out</span></div>
      <div className='text-red-500 self-center'>{error?error:''}</div>
      <button className='self-center w-full mt-5 bg-orange-300 p-3 rounded-lg text-center hover:opacity-80' onClick={handleShowLs}>show listings</button>
      <p className='text-red-500 self-center'>{shLiserr?shLiserr:''}</p>
      <div className='mt-4 flex flex-col gap-4'>{
      userListings && userListings.length>0 && 
      userListings.map((lst)=>{
          return (<div  className='border-red-400 text-center p-3 flex flex-wrap items-center border rounded-lg gap-4 justify-between'
            key={lst._id}><Link to={`/listing/${lst._id}`}>
            <img className=' h-16 w-18 object-contain' 
            src={lst.imageUrls[0]} 
            alt="listing cover" />
            </Link>
            <Link className='text-blue-400 font-bold truncate' to={`/listing/${lst._id}`}>{lst.name}</Link>
            <div>
              <p onClick ={()=>hndlDelList(lst._id)} className='text-red-700 cursor-pointer'>Delete</p>
              <p onClick={()=>hndlEditList(lst._id)} className='text-green-700 cursor-pointer'>Edit</p>
              
            </div>
            </div>)
            
      })}</div>
    </div>
  )
}
