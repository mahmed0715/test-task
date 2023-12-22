'use client'
import React, { useState } from 'react';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    contact_number: '',
    email: '',
    day: '',
    month: '',
    year: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!formData.full_name.trim()) {
      validationErrors.full_name = 'Full name is required';
    }

    if (!formData.contact_number.trim()) {
      validationErrors.contact_number = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contact_number)) {
      validationErrors.contact_number = 'Contact number must be a 10-digit number';
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!formData.day.trim() || !formData.month.trim() || !formData.year.trim()) {
      validationErrors.date_of_birth = 'Date of birth is required';
    }

    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)) {
      validationErrors.password =
        'Password must contain at least 8 characters including uppercase, lowercase, and numbers';
    }

    if (formData.confirm_password !== formData.password) {
      validationErrors.confirm_password = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      try {
        const response = await fetch('https://fullstack-test-navy.vercel.app/api/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/on',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.on();

        if (response.ok) {
          showAlert(data.title, data.description);
        } else {
          showAlert(data.title, data.description);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showAlert = (title, description) => {
    const alertBox = document.createElement('div');
    alertBox.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-16', 'bg-red-500', 'text-white', 'text-center', 'py-4');
    alertBox.innerHTML = `
      <p class="font-bold">${title}</p>
      <p>${description}</p>
    `;
    document.body.appendChild(alertBox);

    setTimeout(() => {
      document.body.removeChild(alertBox);
    }, 5000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Registration Page</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="full_name" className="block text-gray-800 font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full border ${
                errors.full_name ? 'border-red-500' : 'border-gray-300'
              } p-2 rounded-lg`}
              placeholder="Enter your full name"
            />
            {errors.full_name && <p className="text-red-500 mt-1">{errors.full_name}</p>}
          </div>
          
          <div>
            <label htmlFor="contact_number" className="block text-gray-800 font-bold mb-2">
              Contact Number
            </label>
            <input
              type="text"
              id="contact_number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              className={`w-full border ${
                errors.contact_number ? 'border-red-500' : 'border-gray-300'
              } p-2 rounded-lg`}
              placeholder="Enter your contact number"
            />
            {errors.contact_number && <p className="text-red-500 mt-1">{errors.contact_number}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-800 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } p-2 rounded-lg`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="day" className="block text-gray-800 font-bold mb-2">
              Day
            </label>
            <input
              type="text"
              id="day"
              name="day"
              value={formData.day}
              onChange={handleChange}
              className={`w-full border ${
                errors.day ? 'border-red-500' : 'border-gray-300'
              } p-2 rounded-lg`}
              placeholder="Enter your day of birth"
            />
            {errors.day && <p className="text-red-500 mt-1">{errors.day}</p>}
          </div>
          
          <div>
            <label htmlFor="month" className="block text-gray-800 font-bold mb-2">
              Month
            </label>
            <input
              type="text"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              className={`w-full border ${
                errors.month ? 'border-red-500' : 'border-gray-300'
              } p-2 rounded-lg`}
              placeholder="Enter your month of birth"
            />
            {errors.month && <p className="text-red-500 mt-1">{errors.month}</p>}
          </div>
          
          <div>
            <label htmlFor="year" className="block text-gray-800 font-bold mb-2">
              Year
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`w-full border ${
                errors.year ? 'border-red-500' : 'border-gray-300'
              } p-2 rounded-lg`}
              placeholder="Enter your year of birth"
            />
            {errors.year && <p className="text-red-500 mt-1">{errors.year}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-800 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } p-2 rounded-lg`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <label htmlFor="confirm_password" className="block text-gray-800 font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className={`w-full border ${
                errors.confirm_password ? 'border-red-500' : 'border-gray-300'
              } p-2 rounded-lg`}
              placeholder="Confirm your password"
            />
            {errors.confirm_password && <p className="text-red-500 mt-1">{errors.confirm_password}</p>}
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;