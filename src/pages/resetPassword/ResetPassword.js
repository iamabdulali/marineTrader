// ResetPassword.js

import React from 'react';
import { Link } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80">
        <h2 className="text-blue-700">Reset Your Password</h2>
        <p className="text-gray-500">Type in your registered email address</p>

        <input
          type="text"
          placeholder="Enter your email address"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-500"
        />

        <input
          type="submit"
          value="Reset Password"
          className="w-full p-3 bg-blue-700 text-white border-none rounded cursor-pointer"
        />

        <p className="text-gray-600 text-center">
          Remembered your password? <Link to="/login" className="text-blue-700">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
