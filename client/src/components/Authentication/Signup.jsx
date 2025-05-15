  import React, { useState, useContext } from 'react';
import MyContext from '../Mycontext';
import axios from 'axios';

const Signup = () => {
  const {
    department,
    setDepartment,
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    name,
    Setname
  } = useContext(MyContext);

  const [dataget, setDataget] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/authenttication/sinup',
        {
              department:department.trim().toLowerCase()
          ,username,password,email:email.trim().toLowerCase(),name:name.trim().toLowerCase() },
        { withCredentials: true }
      );

      if (response) {
        alert(response.data.message);
        setDataget(response.data.saveuser);
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-300 shadow-sm flex flex-col items-center justify-center px-4 py-12 space-y-6">
      
      {/* 👇 Welcome Paragraph */}
      <div className="text-center max-w-md text-gray-700">
        <h1 className="text-2xl font-semibold text-blue-800 mb-2">Welcome to the University Portal</h1>
        <p className="text-sm">
          Sign up to create your account and start uploading and accessing academic PDFs. 
          Once registered, you can securely log in to manage your documents anytime.
        </p>
      </div>

      {/* 👇 Signup Form */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">
            Signup Form
          </h2>
 <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              onChange={(e) => Setname(e.target.value)}
              placeholder="Enter your name"
              type="name"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-gray-700 font-medium mb-1">
              Department
            </label>
            <input
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter your department"
              type="text"
              id="department"
              name="department"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter the username"
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {dataget && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-xl">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Registration Successful 🎉</h3>
            <p><span className="font-medium text-gray-700">Department:</span> {dataget.department}</p>
            <p><span className="font-medium text-gray-700">Username:</span> {dataget.username}</p>
            <p><span className="font-medium text-gray-700">Email:</span> {dataget.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
