import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';

const ClientProfile = ({ setAuth }) => {
  const today = new Date();

  
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

  return (
    <div className="bg-yellow-500 h-screen">
      <h1>react-calendar-heatmap demos</h1>
      <p>Random values with onClick and react-tooltip</p>
      <CalendarHeatmap
        startDate={shiftDate(today, -150)}
        endDate={today}
        values={randomValues}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={value => {
          return {
            'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${
              value.count
            }`,
          };
        }}
        showWeekdayLabels={true}
        onClick={value => alert(`Clicked on value with count: ${value.count}`)}
      />
      <ReactTooltip />
    </div>
  )
}

export default ClientProfile