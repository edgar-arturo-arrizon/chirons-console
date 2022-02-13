import React from 'react';
import { toast } from "react-toastify";

const Navbar = ({ setAuth }) => {
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <nav className="bg-gray-100 border border-red-600 p-5">
        <div className="flex justify-around items-center ">

          <div className="flex border-2 text-2xl">
            Chiron
            <a href="/" className="">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </a>
          </div>

          <div className="border border-black w-2/3">
            <input type="text" placeholder="Search by Name" className="h-[5vh] w-full" />
          </div>

          <div>
            <button onClick={(e) => logout(e)} className="">
              Logout
            </button>
          </div>

        </div>
      </nav>
  )
}

export default Navbar;
