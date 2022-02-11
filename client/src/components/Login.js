import React, { useState } from 'react';

const Login = ( { setAuth }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputs , setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const handleOnCheck = () => {
    setPasswordShown(!passwordShown)
  }

  const onSubmitForm =  async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();

      localStorage.setItem('token', parseRes.token);
      localStorage.setItem('id', parseRes.id);

      setAuth(true);
    } catch (err) {
      console.log('error at login')
      console.error(err.message, 'Error at user Login');
    }
  }

  return (
    <>
    <div className="lg:grid lg:grid-cols-2">

      <div className="bg-yellow-600 flex justify-center items-center lg:items-start">
        <h1 className="text-6xl font-serif font-extrabold relative  top-40">Chiron's Log</h1>
      </div>
      <div className="bg-yellow-600 min-h-screen flex items-center justify-center">
        <div className="bg-gray-200 p-16 rounded shadow-2xl w-2/3">
          <h2 className="text-3xl font-bold mb-10">Login</h2>
          <form className="space-y-8" onSubmit={onSubmitForm}>
          <div>
              <label className="block mb-1 font-bold">Email</label>
              <input className="border border-gray-400 text-xl w-full p-3"
                type="text"
                name='email'
                value={email}
                placeholder='email'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Password</label>
              <input className="border border-gray-400 text-xl w-full p-3"
                type={passwordShown ? "text" : "password"}
                name='password'
                value={password}
                placeholder="Password"
                onChange={(e) => handleChange(e)}
                />
            </div>
            <input
              type="checkbox"
              checked={passwordShown}
              onChange={handleOnCheck}
              /> show password
            <button className="bg-blue-600 border border-black w-full hover:bg-blue-400 transition duration-300 rounded text-xl p-4">Login</button>
          </form>
          <a className="hover:text-green-800 text-bold" href='/register'>Dont have an account? Register</a>
        </div>
      </div>
    </div>

    </>
  )
}

export default Login;
