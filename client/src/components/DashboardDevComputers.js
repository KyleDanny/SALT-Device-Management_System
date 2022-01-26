/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import "../css/dashboardDevComputers.css";
import differenceInDays from '../utils/util'

import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormDevComputer from "./FormCreateDevComputer";

import DoughnutChart from './DoughnutChart'
// import PieChart from './PieChart'
import LineGraph from './LineGraph'
import BarChart from './BarChart'

const DashboardDevComputers = () => {
  const [laptops, setLaptops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filteredData, setFilteredData] = useState(laptops);
  const [newComputer, setNewComputer] = useState();

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const parentCallback = (formInput) => setNewComputer(formInput);

  const handleSearch = (e) => {
    const filteredComputers = laptops.filter(laptop => {
      let matchForNumbers = e.target.value.match(/.*\d+/gi);
      if (matchForNumbers) {
        return (
          laptop.computerID.toLowerCase().includes(e.target.value.toLowerCase())
        )
      } else { 
        if(laptop.users[0] !== undefined) {
          return (
            laptop.users[0].toLowerCase().includes(e.target.value.toLowerCase())
          )
        }  
      }
    })
    setFilteredData(filteredComputers);
  };

  const allLaptops = async () => {
    const bearer = "Bearer " + userAuth.returnedData.accessToken;
    // console.log(bearer)
    const response = await fetch("http://localhost:3001/dashboard", {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    });
    const parsedResponse = await response.json();
    //console.log(parsedResponse)
    setLaptops(parsedResponse);
    setFilteredData(parsedResponse);
  };

  useEffect(() => {
    allLaptops();
    // return () => {
    //   setLaptops([])
    // }  
  }, [newComputer]);

  const renderForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowForm(!showForm);
  };

  const renderTableHeaders = () => {
    return (
      <>
        <tr>
          <th> device ID </th>
          <th> serial NO </th>
          <th> information link </th>
          <th> user </th>
          <th> handout date </th>
          <th> days since handout </th>
          <th> status </th>
          <th> licence link </th>
        </tr>
      </>
    );
  };

  const renderTableData = () => {
    return filteredData.map((computer) => {
      const {
        _id,
        computerID,
        serialNO,
        informationLink,
        users,
        handoutDate,
        status,
        licenseLink,
      } = computer;
      return (
        <>
          <tr key={_id}>
            <td>
              <Link className="dev-com__info-link" to={`/dashboard/${computerID}`}> {computerID} </Link>
            </td>
            <td>{serialNO}</td>
            <td>{informationLink}</td>
            <td>{users[0]}</td>
            <td>{handoutDate ? handoutDate.split("T")[0] : "-"}</td>
            <td className="center-item">{status === "Handed out" && handoutDate !== undefined && handoutDate !== null ? differenceInDays(handoutDate) : "0"} </td>
            <td>{status}</td>
            <td>
              <a href={`${licenseLink}`} target="blank">
                Link
              </a>
            </td>
          </tr>
        </>
      );
    });
  };

  return (
    <div>
      <div className="create-form-container">
        {showForm && <FormDevComputer callback={parentCallback} />}
      </div>
      <div className="devComputerCard__controls">
        <div className="devComputerCard__controls--width">
          <div className="devComputerCard__controls-sub-title"><h2> Developer Laptops </h2></div>
          <div className="devComputerCard__controls-search">
            <label> Search: </label>
            <input type="text" onChange={(e) => handleSearch(e)} />
          </div>
          <div className="devComputerCard__controls-button"> <button onClick={renderForm} className="devComputerCard__add-button"> Add new </button> </div>
        </div>
      </div>
      <div className="dashboard__table">
        <table className="styled-table">
          <thead>
            {renderTableHeaders()}
          </thead>
          <tbody className="dashboard__table-data">
            {renderTableData()}
          </tbody>
        </table>
      </div>
        <div className="charts-container">
          <div className="LineGraph"> <LineGraph laptops={filteredData} /> </div>
          <div className="DoughnutChart"> <DoughnutChart laptops={filteredData} /> </div>
          <div className="BarChart"> <BarChart laptops={filteredData} /> </div>
        </div>
    </div>
  );
}

export default DashboardDevComputers;