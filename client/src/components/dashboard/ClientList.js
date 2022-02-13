import React from 'react';

const ClientList = ( { clients, setName}) => {

  const getClientProfile = async (client) => {
   console.log(client)
  };

  return (
  <>
    <div className="bg-yellow-500 h-screen p-10 flex justify-center">
      <table className="bg-gray-200 h-2/3 w-100 flex-row max-w-5xl w-full">
        <thead className="rounded text-left ">
          <tr className="">
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">FIRST NAME</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">LAST NAME</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">EMAIL</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SELECT</th>
          </tr>
        </thead>
        <tbody className=" bg-white  flex-row">
          {clients.map(client => {
            return (
              <>
                <tr className="">
                  <td className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">{client.contact.first_name}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{client.contact.last_name}</td>
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
    </div>
  </>
  )
}

export default ClientList;