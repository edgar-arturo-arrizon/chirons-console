import React from "react";
import Register from './Register.js';


const Landing = ({ setAuth }) => {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2">
        <div className="bg-yellow-600 flex justify-center items-start">
          <h1 className="text-6xl font-serif font-extrabold relative  top-40">Chiron's Log</h1>
        </div>
          <Register setAuth={setAuth}/>
      </div>
    </>
  );
};

export default Landing;
