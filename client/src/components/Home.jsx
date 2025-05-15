  import React from 'react';
 
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
       

        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 leading-tight">
            Welcome to the University Digital Archive
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            This is your official hub for academic resources—notes, past year question papers, and study material. All organized by
            <span className="font-semibold text-blue-600"> Department</span>,
            <span className="font-semibold text-blue-600"> Branch</span>, and
            <span className="font-semibold text-blue-600"> Year</span>.
          </p>

          <p className="text-md text-gray-600 mb-4">
            To access or contribute materials, please log in or create an account.
            After logging in, you’ll be able to upload and view PDFs easily.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to="/login">
              <button className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition duration-200 shadow-md">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white border border-blue-700 text-blue-700 px-6 py-3 rounded-xl hover:bg-blue-100 transition duration-200 shadow-md">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center max-w-3xl">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Why use this archive?</h2>
        <ul className="text-gray-700 space-y-2 text-lg">
          <li>📚 Easily find semester-wise notes and materials</li>
          <li>📤 Contribute your PDFs to help fellow students</li>
          <li>🔍 Filter by department, branch, and year</li>
          <li>✅ 100% free and organized content</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
