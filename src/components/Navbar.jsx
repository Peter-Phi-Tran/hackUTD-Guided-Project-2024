// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";


 
function Navbar() {
  return (
    <>
      <div className="flex flex-row justify-between items-center px-20 py-4 bg-pastelblue">
        {/* TITLE */}
        <Link to="/home" className="text-darkgreen text-3xl poppins-bold hover:text-pastelgreen transition duration-300">
          Ripple & Refresh
        </Link>
        {/* PAGES */}
        <div className="flex flex-row gap-8 poppins-semibold text-2xl text-darkblue">
          <Link to="/map" className="hover:text-pastelgreen transition duration-300">map</Link>
          <Link to="/rsvp" className="hover:text-pastelgreen transition duration-300">rsvp</Link>
          <Link to="/activity" className="hover:text-pastelgreen transition duration-300">
            activity
          </Link>
        </div>
      </div>
      {/* Horizontal line separator */}
      <hr className="w-full border-t-2 border-pastelgreen border-opacity-50" />
    </>
  );
}
 
export default Navbar;