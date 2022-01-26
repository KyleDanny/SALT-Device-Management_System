import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


const LineGraph = ({ laptops }) => {

  const getYearlyData = (data, year) => {
    let [jan, feb, mar, apr, may, jun, jul, aug, sept, oct, nov, dec] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    laptops.forEach(laptop => {
      if (laptop.handoutDate !== null && laptop.handoutDate !== undefined) {
        const date = laptop.handoutDate.split('-');
        if (date[0] === year) {
          switch (date[1]) {
            case '01':
              jan++;
              break;
            case '02':
              feb++;
              break;
            case '03':
              mar++;
              break;
            case '04':
              apr++;
              break;
            case '05':
              may++;
              break;
            case '06':
              jun++;
              break;
            case '07':
              jul++;
              break;
            case '08':
              aug++;
              break;
            case '09':
              sept++;
              break;
            case '10':
              oct++;
              break;
            case '11':
              nov++;
              break;
            case '12':
              dec++;
              break;
            default:
              break;
          }
        }
      }
    });
    return [jan, feb, mar, apr, may, jun, jul, aug, sept, oct, nov, dec]
  }

  const data2020 = getYearlyData(laptops, '2020');
  const data2021 = getYearlyData(laptops, '2021');
  console.log(data2021);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "2020",
        data: data2020,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "2021",
        data: data2021,
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  return (
    <Line data={data} />
  );
}

export default LineGraph;