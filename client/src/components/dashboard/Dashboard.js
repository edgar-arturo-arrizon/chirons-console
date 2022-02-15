import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { client_data } from '../../client_data.js';

import Navbar from './Navbar.js';
import ClientList from './ClientList.js';
import ClientProfile from './clientprofile/ClientProfile.js';


const tenClients = client_data.slice(0,11)

const Dashboard = ( { setAuth }) => {
  const [clients, setClients] = useState([]);
  const [clientsChange, setClientsChange] = useState(false);
  const [filteredClients, setFilteredClients] = useState([]);
  const [view, setView] = useState('clientList');

  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { 'token': localStorage.token }
      });

      const parseRes = await response.json();
      const clientsRes = parseRes.slice(1);

      setClients(...clientsRes)
    } catch (err) {
      console.log('Dashboard request error');
      console.error(err.message);
    }
  }

  const getClientProfile = async (client) => {

    try {
     const response = await fetch('http://localhost:5000/dashboard/client', {
         method: 'GET',
         headers: { 'token': localStorage.token, 'client' : client.client_id },
       });

      const parseRes = await response.json();
    } catch (err) {
       console.error(err.message, 'Error getting client profile')
    }

    setView('clientProfile')
   };

  useEffect(() => {
    setClientsChange(false);
    getProfile();
  }, [clientsChange]);

  return (
    <>
        <Navbar setAuth={setAuth} clients={clients} setClients={setClients} setClientsChange={setClientsChange} setFilteredClients={setFilteredClients} setView={setView} />

        {view === 'clientList' &&
        <ClientList clients={clients} getClientProfile={getClientProfile} setClients={setClients} setAuth={setAuth} setClientsChange={setClientsChange} filteredClients={filteredClients}  />}

        {view === 'filteredClients' &&
        <ClientList clients={filteredClients} getClientProfile={getClientProfile} setClients={setClients} setAuth={setAuth} setClientsChange={setClientsChange}  />}

        {view === 'clientProfile' &&
        <ClientProfile clients={clients} getClientProfile={getClientProfile} setClients={setClients}/>
      }

    </>
  )
}

export default Dashboard;
