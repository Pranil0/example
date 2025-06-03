import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Location = () => {
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState({ lat: '', lng: '' });
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Fetch suggestions from Nominatim as user types
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (address.length > 2) {
        axios
          .get(`https://nominatim.openstreetmap.org/search`, {
            params: {
              q: address,
              countrycodes: 'np', // Nepal only
              format: 'json',
              addressdetails: 1,
              limit: 5,
            },
          })
          .then((res) => {
            setSuggestions(res.data);
            setShowDropdown(true);
          });
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [address]);

  const handleSelectSuggestion = (place) => {
    setAddress(place.display_name);
    setPosition({ lat: parseFloat(place.lat), lng: parseFloat(place.lon) });
    setShowDropdown(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-7xl min-h-[800px] bg-gray-100 rounded-2xl shadow-xl p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side: Steps list */}
          <div className="text-gray-600 text-lg space-y-4 font-medium">
            <p className="text-green-600 font-semibold text-xl">Post a task</p>
            <p className="text-gray-400">Title & Date</p>
            <p className="text-gray-400">Details & Category</p>
            <p className="text-black font-bold">Location</p>
            <p className="text-gray-400">Budget</p>
          </div>

          {/* Right Side: Form */}
          <div ref={dropdownRef}>
            <h2 className="text-green-600 text-xl font-semibold mb-4">
              Where should the task be done?
            </h2>

            {/* Address Input */}
            <label className="block text-gray-600 text-sm mb-2">Street Address</label>
            <input
              type="text"
              placeholder="Type a location in Nepal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Suggestions Dropdown */}
            {showDropdown && suggestions.length > 0 && (
              <ul className="bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto mt-1 z-50 absolute w-full">
                {suggestions.map((sug, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelectSuggestion(sug)}
                    className="px-4 py-2 hover:bg-green-100 cursor-pointer text-sm text-gray-700"
                  >
                    {sug.display_name}
                  </li>
                ))}
              </ul>
            )}

            {/* Display selected address & coordinates */}
            {position.lat && position.lng && (
              <div className="text-sm text-gray-700 mt-6 mb-6">
                <p><strong>📍 Address:</strong> {address}</p>
                <p><strong>🧭 Latitude:</strong> {position.lat}</p>
                <p><strong>🧭 Longitude:</strong> {position.lng}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button className="bg-white border border-green-600 text-green-600 py-2 px-6 rounded-full font-semibold hover:bg-green-50 transition">
                Back
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full font-semibold transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
