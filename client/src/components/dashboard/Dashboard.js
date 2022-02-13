import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import {client_data} from '../../client_data.js';

import Navbar from './Navbar.js';
import ClientList from './ClientList.js';


const tenClients = client_data.slice(0,11)

const Dashboard = ( { setAuth }) => {
  const [name , setName] = useState('');
  const [clients, setClients] = useState(tenClients)


  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { 'token': localStorage.token }
      });

      const parseRes = await response.json();

      // console.log('get profile', parseRes)
      setName(parseRes[0])
    } catch (err) {
      console.log('Dashboard request error');
      console.error(err.message);
    }
  }

  useEffect(() => {
    // setBlogsChange(false);
    getProfile();
  }, []);

  return (
    <>
      <Navbar />
      <ClientList clients={clients} setClients={setClients}/>
    </>
  )
}

export default Dashboard;
