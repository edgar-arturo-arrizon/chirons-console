import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Register = ( { setAuth } ) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: ''
  });

  const { email, password, name } = inputs;

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  }

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const handleOnCheck = () => {
    setPasswordShown(!passwordShown)
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };

      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

      localStorage.setItem('token', parseRes.token);

      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <div className="bg-yellow-600 flex justify-center items-center">
      <h1 className="text-6xl font-serif font-extrabold relative  top-40">Chiron's Consel</h1>
      </div>
      <div className="bg-yellow-600 h-screen flex items-center justify-center ">
        <div className="bg-gray-200 p-16 rounded shadow-2xl w-2/3">
          <h2 className="text-3xl font-bold mb-10">Sign-Up</h2>
          <form className="space-y-8">
            <div>
              <label className="block mb-1 font-bold">Name</label>
              <input className="border border-gray-400 text-xl w-1/2 p-3" type="text" placeholder="First" />
              <input className="border border-gray-400 text-xl w-1/2 p-3" type="text" placeholder="Last" />
            </div>
            <div>
              <label className="block mb-1 font-bold">Email</label>
              <input className="border border-gray-400 text-xl w-full p-3" type="text" placeholder="Email" />
            </div>
            <div>
              <label className="block mb-1 font-bold">Password</label>
              <input className="border border-gray-400 text-xl w-full p-3" type={passwordShown ? "text" : "password"} placeholder="Password" />
            </div>
            <input type="checkbox" checked={passwordShown}
          onChange={handleOnCheck}/> show password
            <button className="bg-blue-600 border border-black w-full hover:bg-blue-400 transition duration-300 rounded text-xl p-4">Login</button>
          </form>
          <a className="hover:text-green-800 text-bold" href='/login'>Already have an account? Login</a>
        </div>
      </div>
    </>
  )
}

export default Register;