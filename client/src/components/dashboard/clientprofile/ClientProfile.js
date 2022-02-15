import React from 'react';
import { HeatMapComponent, Inject, Legend, Tooltip} from '@syncfusion/ej2-react-heatmap';
import ReactTooltip from 'react-tooltip';
import CalendarHeatmap from 'react-calendar-heatmap';
import '../../../heatmap.css';

import Heatmap from './Heatmap.js';
import ClientStats from './ClientStats.js';
import WorkoutForm from './WorkoutForm.js';

const today = new Date();

const ClientProfile = ({ setAuth }) => {
  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomValues = getRange(200).map(index => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 3),
    };
  });

  return (
    <div className="bg-gray-800 h-screen flex-row">
      <ClientStats />
      <WorkoutForm />
      <div className="flex-row justify-center items-center border-4 overflow-x-auto overflow-y-auto p-10">
        <h2 className="relative bottom-5 right-5 text-white text-3xl text-center">
          Daily Goals Heat Map
        </h2>
        <Heatmap />
      </div>
    </div>
  )
}

export default ClientProfile