import React, { useState } from 'react';

const PostJob = () => {
  const [description, setDescription] = useState('');
  const [dateOption, setDateOption] = useState('onDate');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-7xl min-h-[800px] bg-gray-100 rounded-2xl shadow-xl p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side: Steps list */}
          <div className="text-gray-600 text-lg space-y-4 font-medium">
            <p className="text-green-600 font-semibold text-xl">Post a task</p>
            <p className="text-black font-bold">Title & Date</p>
            <p className="text-gray-400">Details & Category</p>
            <p className="text-gray-400">Location</p>
            <p className="text-gray-400">Budget</p>
          </div>

          {/* Right Side: Form */}
          <div>
            <h2 className="text-green-600 text-xl font-semibold mb-4">
              Let’s get started with the essentials
            </h2>

            {/* Description */}
            <label className="block text-gray-600 text-sm mb-2">
              Briefly describe what you need help with
            </label>
            <input
              type="text"
              placeholder="eg: Help me to build my sofa"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Date Options */}
            <label className="block text-gray-600 text-sm mb-2">
              When would you like this done?
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setDateOption('onDate')}
                className={`px-4 py-2 rounded-full border ${
                  dateOption === 'onDate'
                    ? 'bg-green-600 text-white'
                    : 'bg-white border-gray-300 text-black'
                }`}
              >
                On date
              </button>
              <button
                onClick={() => setDateOption('beforeDate')}
                className={`px-4 py-2 rounded-full border ${
                  dateOption === 'beforeDate'
                    ? 'bg-green-600 text-white'
                    : 'bg-white border-gray-300 text-black'
                }`}
              >
                Before date
              </button>
              <button
                onClick={() => {
                  setDateOption('flexible');
                  setSelectedDate('');
                }}
                className={`px-4 py-2 rounded-full border ${
                  dateOption === 'flexible'
                    ? 'bg-green-600 text-white'
                    : 'bg-white border-gray-300 text-black'
                }`}
              >
                I'm flexible
              </button>
            </div>

            {/* Show date input if On or Before date is selected */}
            {(dateOption === 'onDate' || dateOption === 'beforeDate') && (
              <div className="mb-6">
                <label className="block text-gray-600 text-sm mb-2">
                  Select {dateOption === 'onDate' ? 'a date' : 'the latest date'}
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            )}

            {/* Time Slot Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              {['Morning', 'Midday', 'Afternoon', 'Evening'].map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => setTimeSlot(slot)}
                  className={`p-3 text-center rounded-lg border ${
                    timeSlot === slot
                      ? 'bg-green-100 border-green-600 text-green-700'
                      : 'bg-gray-100 border-gray-300 text-black'
                  }`}
                >
                  {slot}
                  <p className="text-xs text-gray-500">
                    {slot === 'Morning'
                      ? 'Before 10am'
                      : slot === 'Midday'
                      ? '10am - 2pm'
                      : slot === 'Afternoon'
                      ? '2pm - 6pm'
                      : 'After 6pm'}
                  </p>
                </button>
              ))}
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
