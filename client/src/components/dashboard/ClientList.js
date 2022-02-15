import React, { useState} from 'react';

const ClientList = ( { clients, filteredClients, getClientProfile, setName, setAuth, setClientsChange, setView}) => {
  const [inputs , setInputs] = useState({
    first: '',
    last: '',
    email: '',
  });

  const { first, last, email } = inputs;

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const sortBy = () => {
    console.log('sort by');
  }


  //POST REQ - ADD CLIENT
  const onSubmitForm =  async (e) => {
    e.preventDefault();
    try {
      const body = { first, last, email,  };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const response = await fetch("http://localhost:5000/dashboard/clients", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();
      setClientsChange(true)
    } catch (err) {
      console.log('error at login')
      console.error(err.message, 'Error at user Login');
    }
  }

  return (
  <>
    <div className="bg-yellow-500 h-screen p-10 flex-row justify-center overflow-y-scroll">
        <table className="bg-gray-200 h-2/3 w-100 flex-row max-w-5xl w-full ">
          <thead className="rounded text-left">
            <tr className="">
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider"><button onClick={() => sortBy()} className="hover:text-blue-500 font-bold">FIRST NAME</button></th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider"><button className="hover:text-blue-500 font-bold" onClick={() => sortBy()}>LAST NAME</button></th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider"><button className="hover:text-blue-500 font-bold" onClick={() => sortBy()}>EMAIL NAME</button></th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">SELECT</th>

            </tr>
          </thead>
          <tbody className="bg-white flex-row">
            {
              clients.map(client => {
              return (
                <>
                  <tr key={client.id} className="">
                    <td className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">{client.first_name}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{client.last_name}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{client.email}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button onClick={() => getClientProfile(client)} className="bg-black text-gray-200 hover:bg-green-500 p-1 font-extrabold rounded">View Profile</button>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
        <div className="">
        <form className="flex-col p-10 max-w-5xl" onSubmit={onSubmitForm}>
          <div className="">
              <label className="block mb-1 font-bold">FIRST NAME</label>
              <input className="border border-gray-400 text-xl w-full p-3"
                type="text"
                name='first'
                value={first}
                placeholder='first'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">LAST NAME</label>
              <input className="border border-gray-400 text-xl w-full p-3"
                type="text"
                name='last'
                value={last}
                placeholder='last'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">EMAIL</label>
              <input className="border border-gray-400 text-xl w-full p-3 "
                type='text'
                name='email'
                value={email}
                placeholder="email"
                onChange={(e) => handleChange(e)}
                />
            </div>
            <button className="bg-blue-600 border border-black w-full hover:bg-blue-400 transition duration-300 rounded text-xl p-4">Add Client</button>
          </form>
        </div>
    </div>
  </>
  )
}

export default ClientList;