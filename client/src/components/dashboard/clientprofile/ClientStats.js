import React from 'react';
import picture from './client.jpeg';

const clientStats = {"name": "Edgar Arrizon", 'age': 30, 'weight': 195, 'experience': '10 years', 'goals': 'lose body fat'}

const ClientStats = () => {
  return (
    <>
          <div className=" bg-gray-800 text-white rounded-lg  w-full max-w-md grid grid-cols-2 max-h-[500px] overflow-hidden">
            <div>
              <img src={picture} className="max-h-[500px]" />
            </div>
            <div className="flex">
              <ul className="">
                <li className="text-white p-2 font-extrabold">NAME : {clientStats.name}</li>
                <li className="text-white p-2 font-extrabold">AGE : {clientStats.age}</li>
                <li className="text-white p-2 font-extrabold">YEARS EXP: {clientStats.experience}</li>
                <li className="text-white p-2 font-extrabold">AGE {clientStats.age}</li>
                <li className="text-white p-2 font-extrabold">GOALS: {clientStats.goals} {clientStats.age}</li>
              </ul>
            </div>
          </div>
    </>
  )
}

export default ClientStats;