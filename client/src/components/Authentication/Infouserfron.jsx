  import React, { useState } from 'react'
import axios from "axios"

const Infouserfron = () => {
  const [usserData, getUserrdata] = useState("");

  async function handleclick1() {
    console.log("hello");
    try {
      const getUsetrInfo = await axios.get("/authenttication/user/info", {
        withCredentials: true,
      });

      if (getUsetrInfo && getUsetrInfo.status === 200) {
        alert(getUsetrInfo.data.message);
        getUserrdata(getUsetrInfo.data.findUser);
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        console.log(e);
        alert(e.response.data.message + " " + "log in again");
      }
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-300 shadow-sm">
      <button
        onClick={handleclick1}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Click
      </button>

      {usserData && (
        <>
          <p className="text-center text-gray-600 mb-4 w-80">
            You can view your personal information below. This includes your registered email, department, and username.
          </p>

          <div className="bg-white shadow-lg rounded-xl p-6 w-80 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">User Information</h2>
            <div className="text-gray-700 space-y-2">
              <p><span className="font-medium">Email:</span> {usserData.email}</p>
              <p><span className="font-medium">Department:</span> {usserData.department}</p>
              <p><span className="font-medium">Username:</span> {usserData.username}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Infouserfron;
