import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="">Welcome to Ripple & Refresh</h1>
      <p className="text-lg text-darkblue mb-6">Please log in or register to continue</p>
      <div className="flex space-x-4">
        <Link to="/login" className="px-6 py-3">
          Login
        </Link>
        <Link to="/register" className="px-6 py-3">
          Register
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;