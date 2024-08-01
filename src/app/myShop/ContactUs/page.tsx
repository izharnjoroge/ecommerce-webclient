"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    email: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    description: "",
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(formData.email)
        ? ""
        : "Please enter a valid email address.",
      description: formData.description ? "" : "Description is required.",
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      if (isMobile) {
        window.location.href = `https://wa.me/?text=Email: ${formData.email}%0A%0ADescription: ${formData.description}`;
      } else {
        window.location.href = `mailto:?subject=Contact Us&body=Email: ${formData.email}%0A%0ADescription: ${formData.description}`;
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block text-purple-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b-2 border-purple-500 focus:outline-none focus:border-purple-700"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-purple-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b-2 border-purple-500 focus:outline-none focus:border-purple-700"
              rows={4}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-2">{errors.description}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
