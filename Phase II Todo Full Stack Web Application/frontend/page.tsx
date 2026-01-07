// // export default function Home() {
// //   return (
// //     <main className="p-4">
// //       <h1 className="text-2xl font-bold">Phase II Todo Full Stack Web Application</h1>
// //       <p>Welcome! Start by logging in or creating tasks.</p>
// //     </main>
// //   )
// // }



"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      alert(`Sign Up successful!\nName: ${formData.name}\nEmail: ${formData.email}`);
    } else {
      alert(`Sign In successful!\nEmail: ${formData.email}`);
    }
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-80 flex flex-col">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isSignup ? "Sign Up" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="text-center text-gray-500 mt-4 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-green-500 font-bold cursor-pointer hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
}
