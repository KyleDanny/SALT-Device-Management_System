import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

const DoughnutChart = ( {laptops} ) => {

  const daysArray = () => {
    // const data = [0, 0, 0, 0, 0, 0, 0]
    let [Handedout, Returned, Broken, BeingRepaired, StolenorLost, Readytobehandedout, Unknown] = [0, 0, 0, 0, 0, 0, 0]
    laptops.forEach((laptop) => {
      console.log(laptop.status);
      switch(laptop.status) {
        case 'Handed out':
          Handedout += 1
          break;
        case 'Returned':
          Returned += 1
          break;
        case 'Broken':
          Broken += 1
          break;
        case 'Being Repaired':
          BeingRepaired += 1
          break;
        case 'Stolen or Lost':
          StolenorLost += 1
          break;
        case 'Ready to be handed out':
          Readytobehandedout += 1
          break;
        default:
          Unknown += 1
      }
    })
    return [Handedout, Returned, Broken, BeingRepaired, StolenorLost, Readytobehandedout, Unknown];
  };

  const days = daysArray();
  // rgba(75,192,192,1) blue
  //4cc040

  const state = {
    labels: ['Handed out', 'Returned', 'Broken',
      'Being Repaired', 'Stolen or Lost', 'Ready to be handed out', 'Unknown'],
    datasets: [
      {
        label: 'Status of Laptops',
        backgroundColor: [
          '#ff7a61',
          '#FFBCB0',
          '#E6553B',
          '#C03319',
          '#FF9885',
          '#4bc0c0',
          '#B20064',
        ],
        hoverBackgroundColor: [
          '#FF9885',
          '#FFBCB0',
          '#E6553B',
          '#C03319',
          '#ff7a61',
          '#4bc0c0',
          '#B20064',
        ],
        data: days
      }
    ]
  }

  return (
    <div>
      <Doughnut
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
    </div>
  );
}

export default DoughnutChart;