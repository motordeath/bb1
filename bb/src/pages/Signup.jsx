import React from "react";
import AuthCard from "../components/AuthCard";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthCard initialMode="signup" />
    </div>
  );
}
