import React, { useState } from "react";
import API_BASE_URL from '../config/api';
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
import FloatingCard from "./FloatingCard";
import OutlineButton from "./OutlineButton";
import axios from "axios";

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <label className="block text-sm mb-4">
      <div className="font-bold mb-1">{label}</div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="w-full p-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        placeholder={label}
      />
    </label>
  );
}

export default function AuthCard({ initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError("");
  }

  async function syncWithBackend(user) {
    try {
      const token = await user.getIdToken();
      await axios.post(`${API_BASE_URL}/api/auth/sync", {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Backend sync failed:", err);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      let user;
      if (mode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        user = userCredential.user;
        if (form.name) {
          await updateProfile(user, { displayName: form.name });
        }
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
        user = userCredential.user;
      }

      await syncWithBackend(user);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  async function handleSocialLogin(provider) {
    try {
      setError("");
      const result = await signInWithPopup(auth, provider);
      await syncWithBackend(result.user);
      navigate("/home");
    } catch (err) {
      console.error("Social Login Error:", err);
      setError(err.message);
    }
  }

  return (
    <FloatingCard className="w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">
            {mode === "login" ? "Welcome back!" : "Join the crew"}
          </h1>
          <p className="text-sm text-gray-500">Build something awesome today.</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-100 border-2 border-red-500 text-red-700 text-sm font-bold">
            {error}
          </div>
        )}

        {mode === "signup" && (
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <OutlineButton type="submit" className="w-full justify-center">
          {mode === "login" ? "Sign In" : "Create Account"}
        </OutlineButton>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500 font-bold">
        OR CONTINUE WITH
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <OutlineButton variant="secondary" onClick={() => handleSocialLogin(googleProvider)} className="justify-center">
          Google
        </OutlineButton>
        <OutlineButton variant="secondary" onClick={() => handleSocialLogin(githubProvider)} className="justify-center">
          GitHub
        </OutlineButton>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setMode((m) => (m === "login" ? "signup" : "login"));
            setError("");
          }}
          className="text-sm font-bold underline hover:text-brand-orange"
        >
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </FloatingCard>
  );
}
