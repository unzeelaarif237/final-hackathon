import React, { useState } from "react";
import axios from "axios";

const UpdateEmail = () => {
  const [formData, setFormData] = useState({
    currentEmail: "",
    newEmail: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Handles change events for the form fields
   * @param {React.FormEvent<HTMLInputElement>} e - The change event
   * @returns {void}
   */
/*******  43fb7354-a5cd-4fc1-b453-0aa8f125ffab  *******/    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/auth/update-email", formData);
      alert("Email updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Update Email</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="currentEmail"
            placeholder="Current Email"
            value={formData.currentEmail}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="email"
            name="newEmail"
            placeholder="New Email"
            value={formData.newEmail}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
          >
            Update Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmail;
