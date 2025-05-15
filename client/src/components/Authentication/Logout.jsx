 import React from 'react'
import axios from 'axios'

const Logout = () => {
  async function Handlseclick() {
    try {
      const data_back = await axios.get("/authenttication/user/logout", { withCredentials: true });
      if (data_back) {
        alert(data_back.data.message);
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message + " " + "first login then logout");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-300 shadow-sm">
      <button
        onClick={Handlseclick}
        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
      >
        Log Out
      </button>
    </div>
  );
};

export default Logout;
