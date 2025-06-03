import React, { useState } from 'react';

const DetailsAndCategory = () => {
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [detailsError, setDetailsError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleNext = () => {
    const wordCount = details.trim().split(/\s+/).length;
    if (wordCount < 10) {
      setDetailsError('Please enter at least 10 words in the task details.');
      return;
    }

    setDetailsError('');
    // Proceed to next step (if implemented)
  };

  const handleBack = () => {
    // Navigate to previous step (e.g., Title & Date)
    console.log('Back button clicked');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-7xl min-h-[800px] bg-gray-100 rounded-2xl shadow-xl p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side: Steps list */}
          <div className="text-gray-600 text-lg space-y-4 font-medium">
            <p className="text-green-600 font-semibold text-xl">Post a task</p>
            <p className="text-gray-400">Title & Date</p>
            <p className="text-black font-bold">Details & Category</p>
            <p className="text-gray-400">Location</p>
            <p className="text-gray-400">Budget</p>
          </div>

          {/* Right Side: Form */}
          <div>
            <h2 className="text-green-600 text-xl font-semibold mb-4">
              Add details to help get the right Tasker
            </h2>

            {/* Description */}
            <label className="block text-gray-600 text-sm mb-2">
              What are the details of your task?
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
              placeholder="eg: I need help assembling my IKEA bookshelf..."
              className={`w-full border ${
                detailsError ? 'border-red-500' : 'border-gray-300'
              } rounded-lg px-4 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {detailsError && (
              <p className="text-red-500 text-sm mb-5">{detailsError}</p>
            )}

            {/* Category Selection */}
            <label className="block text-gray-600 text-sm mb-2">Select a category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Choose category</option>
              <option value="Furniture Assembly">Furniture Assembly</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Moving Help">Moving Help</option>
              <option value="Mounting">Mounting</option>
              <option value="Delivery">Delivery</option>
              <option value="Other">Other</option>
            </select>

            {/* Image Upload */}
            <label className="block text-gray-600 text-sm mb-2">Add images (optional)</label>
            <label className="w-24 h-24 bg-white border border-dashed border-gray-400 flex items-center justify-center rounded-lg mb-4 cursor-pointer relative overflow-hidden">
              <span className="text-2xl text-gray-400">+</span>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </label>

            {/* Preview + Remove */}
            {preview && (
              <div className="mb-6 relative w-24 h-24">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handleBack}
                className="bg-white border border-green-600 text-green-600 py-2 px-6 rounded-full font-semibold hover:bg-green-50 transition"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full font-semibold transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsAndCategory;
