import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'
import differenceInDays from '../utils/util'

Chart.register(...registerables)

const BarChart = ( { laptops } ) => {
  // const [data, setData] = useState()

  const labelsArray = () => {
    let data = [];
    laptops.map((laptop) => {
      if (laptop.status === "Handed out" && laptop.handoutDate) {
        data.push(laptop.computerID);
      }
    })
    return data;
  };

  const daysArray = () => {
    let data = [];
    laptops.map((laptop) => {
      if (laptop.status === "Handed out" && laptop.handoutDate) {
        data.push(differenceInDays(laptop.handoutDate));
      }
    })
    return data;
  };

  const labels = labelsArray();
  const days = daysArray();

  const state = {
    labels: labels,
    datasets: [
      {
        label: 'Days Since Handout',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: days,
      }
    ]
  }

  return (
    <Bar
      data={state}
      options={{
        title: {
          display: true,
          text: 'Average Rainfall per month',
          fontSize: 20
        },
        legend: {
          display: true,
          position: 'right'
        }
      }}
    />
  );
}

export default BarChart;