// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold mb-4 text-white">Build Buddy</h1>
      <p className="max-w-xl text-gray-300 mb-6">
        Platform for students to register projects, find teammates, and collaborate.
      </p>

      <div className="flex gap-4">
        <Link to="/login" className="px-6 py-3 bg-green-600 rounded-md">Login</Link>
        <Link to="/signup" className="px-6 py-3 bg-gray-700 rounded-md">Create account</Link>
      </div>
    </div>
  );
}
