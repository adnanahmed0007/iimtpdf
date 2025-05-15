  import React from 'react';
import { Link } from 'react-router-dom';
import img from './iimhyjhydd.jpeg';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src={img}
            alt="IIMT University"
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-400 shadow-md"
          />
          <div>
            <h1 className="text-2xl font-extrabold text-blue-900">IIMT University</h1>
            <p className="text-sm text-blue-700">Welcome to the Digital Archive</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-base">
          <Link to="/" className="text-gray-700 hover:text-blue-700 font-semibold transition duration-150">
            Home
          </Link>
          <Link to="/sendpdf" className="text-gray-700 hover:text-blue-700 font-semibold transition duration-150">
            Send PDF
          </Link>
           <Link to="/branchdeaprtemntyear" className="text-gray-700 hover:text-blue-700 font-semibold transition duration-150">
           Department_year_branch
          </Link>
          <Link to="/userdepartmentpdf" className="text-gray-700 hover:text-blue-700 font-semibold transition duration-150">
           Department_year
          </Link>
          <Link to="/notessubjectwise" className="text-gray-700 hover:text-blue-700 font-semibold transition duration-150">
           Notes_Subject
          </Link>
           <Link to="/getallview" className="text-gray-700 hover:text-blue-700 font-semibold transition duration-150">
           deaprtemnt search
          </Link>
          <Link to="/signup" className="text-gray-700 hover:text-blue-700 font-semibold transition duration-150">
            Signup
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-700 font-semibold transition duration-150">
            Login
          </Link>
           <Link to="/userInfo" className="text-gray-700 hover:text-blue-700 font-semibold transition duration-150">
            UserInfo
          </Link>
          <Link to="/userlogedout" className="text-gray-700 hover:text-blue-700 font-semibold transition duration-150">
            Log out
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
