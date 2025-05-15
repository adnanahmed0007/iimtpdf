import React, { useState, useContext } from 'react';
import MyContext from '../Mycontext';
import axios from 'axios';

const Login = () => {
  const { username, setUsername, password, setPassword } = useContext(MyContext);
  const [dataget_login, setDta] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data_Get = await axios.post("/authenttication/login", {
        username,
        password
      }, { withCredentials: true });

      console.log(data_Get);

      if (data_Get) {
        alert(data_Get.data.message);
        setDta(data_Get.data.findOne);
      }

    } catch (e) {
      if (e.response && e.response.status === 400) {
        console.log(e);
        alert(e.response.data.message);
      }
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-300 shadow-sm flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
    
  
  {/* 👇 Welcome Text Here */}
  <div className="text-center max-w-md text-gray-700">
    <h1 className="text-2xl font-semibold text-blue-800 mb-2">Welcome to the University Portal</h1>
    <p className="text-sm">
      Log in to securely access and upload your academic PDFs. 
      This portal is designed for quick and easy document sharing. 
      Please enter your credentials to continue.
    </p>
  </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-800">Login</h2>

        <div>
          <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
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
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200"
        >
          Login
        </button>
      </form>

      {dataget_login && (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm text-gray-800">
          <h3 className="text-lg font-semibold text-blue-700 mb-4">User Details</h3>
          <p><span className="font-medium">Email:</span> {dataget_login.email}</p>
          <p><span className="font-medium">Username:</span> {dataget_login.username}</p>
          <p><span className="font-medium">Department:</span> {dataget_login.department}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
