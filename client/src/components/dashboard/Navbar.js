import React, { useState, useEffect } from 'react';

const Navbar = ({ clients, setClients, setClientsChange, setAuth, setFilteredClients, setView }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
    const filteredClients = clients.filter(client => {
      const searchTerm = search.toLowerCase();
      const firstNameSlice = client.first_name.slice(0, search.length).toLowerCase();
      const lasttNameSlice = client.last_name.slice(0, search.length).toLowerCase();
      const emailSlice = client.email.slice(0, search.length).toLowerCase();

      // console.log('slice', firstNameSlice, client.first_name)
      if (firstNameSlice === searchTerm || lasttNameSlice === searchTerm || emailSlice === searchTerm) {

        return client;
      }
    });

    setFilteredClients(filteredClients);
    setView('filteredClients');
  }

  useEffect(() => {
    if (search === '') {
      setView('clientList');
      setClientsChange(true)
    } else {
      setView('filteredClients');
      setClientsChange(true);
    }
  }, [search]);

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const sortBy = () => {
    clients.filter( client => {
      console.log('sort By', client)
    })
  }

  return (
    <nav className="bg-gray-100 border border-red-600 p-5">
        <div className="flex justify-around items-center ">

          <div className="flex border-2 text-2xl">
            Chiron
            <a href="/" className="">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </a>
          </div>

          <div className="border border-black w-2/3">
            <input type="text" placeholder="Search by Name" name="search" value={search} className="h-[5vh] w-full text-3xl" onChange={(e) => handleChange(e)} />
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
