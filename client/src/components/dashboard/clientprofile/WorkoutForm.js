import React from 'react';

const WorkoutForm = () => {
  return (
    <div className="text-white font-extrabold flex justify-center items-center">
      <div>
        <h2 className="text-center">Start a New Workout</h2>
        <button className="bg-yellow-500 border-4 border-gray-200 rounded text-black font-extrabold w-[200px]">Start</button>
      </div>
      <div>
        <h2 className="text-center">Edit a Program</h2>
        <button className="bg-blue-500 border-4 border-gray-200 rounded text-white font-extrabold w-[200px]">Start</button>
      </div>
    </div>
  )
}

export default WorkoutForm;
