import React from 'react'

export default function CreateListing() {
  return (
    <div className='p-3 max-w-4xl mx-auto'><h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
    <form className='flex flex-col sm:flex-row'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' minLength='10'/>
            <textarea type="text" placeholder="Description" className='border p-3 rounded-lg' id='description' minLength='10'/>
            <input type="text" placeholder="Address" className='border p-3 rounded-lg' id='address' minLength='10'/>
            <div className='flex gap-2 flex-col'>
        
                <label for="listingType" className="block mb-2 text-sm font-medium">Select The Type</label>
                <select id="listingType" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option selected>Choose a Listing Type</option>
                <option value="Food&Restro">Restaurant And Hotels</option>
                <option value="Commercial Store">Commercial Store</option>
                <option value="Delivery Service">Delivery Service</option>
                <option value="Education">Education</option>
                <option value="Medical">Medical</option>
                <option value="Travel">Travel</option>
                </select>
            </div>
            <div >
                <span>Authorized Buissness</span>
                <input type="checkbox" name="" id="AuthorizedBiz" className='w-5'/>
            </div>
            <textarea type="text" placeholder="Map Url" className='border p-3 rounded-lg' id='mapUrl' minLength='10'/>
            <div>
                <label for="pincode" class="block mb-2 text-sm font-medium">Pincode</label>
                <input type="number" id="pincode" className='border p-3 rounded-lg' required/>
            </div>
            <div className='flex flex-col flex-l gap-4'>
                <p className='font-medium'>Images</p>
                <span className='text-gray-600'>The first image will be cover(max 5)</span>
                <div className='flex gap-4 border border-black-800 rounded-lg max-w-fit'>
                    <input type="file" name="" id='images' accept='image/*' multiple/>
                    <button className='p-3 text-green-500 border border-green-500 rounded-lg hover:bg-slate-300'>Upload</button>
                </div>
            </div>
            <button className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>
    </form></div>
    
  )
}
