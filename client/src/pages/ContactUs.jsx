// ContactUs.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ContactUs = () => {
    const navig = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await fetch(`/api/users/contactus`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify(formData)
        });
        const data = await res.json();
        console.log(data);
        navig('/');
    } catch (error) {
        console.log(error.message);
    }
  };
  console.log(formData);
  return (
    <div className='min-h-[800px]'>
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default ContactUs;
