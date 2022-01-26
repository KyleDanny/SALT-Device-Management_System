import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormCreateCoreComputer from "./FormCreateCoreComputer";
import FormUpdateCoreComputer from "./FormUpdateCoreComputer";

const DashboardCoreComputers = () => {
  const [coreComputers, setCoreComputers] = useState([]);
  const [updatedComputer, setUpdatedComputer] = useState();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filteredData, setFilteredData] = useState(coreComputers);

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    const filteredData = coreComputers.filter((computer) => {
      return computer.computerID.toLowerCase().includes(search);
    });
    setFilteredData(filteredData);
  }

  const getCoreComputers = async () => {
    const bearer = "Bearer " + userAuth.returnedData.accessToken;
    // console.log(bearer)
    const response = await fetch("http://localhost:3001/coreComputers", {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    });
    const parsedResponse = await response.json();
    setCoreComputers(parsedResponse);
    setFilteredData(parsedResponse);
  };

  useEffect(() => {
    getCoreComputers();
    // return () => {
    //   setCoreComputers([])
    //   setShowCreateForm(false)
    // }  
  }, [updatedComputer]);

  const renderCreateForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowCreateForm(!showCreateForm);
  };

  const renderTableHeaders = () => {
    return (
      <>
        <tr>
          <th> device ID </th>
          <th> serial NO </th>
          <th> type </th>
          <th> licence Link </th>
          <th> users </th>
          <th> comments </th>
          <th> file value key </th>
          <th> handout date </th>
          <th> charger number </th>
          <th></th>
        </tr>
      </>
    );
  };

  const renderTableData = () => {
    return filteredData.map((computer) => {
      return <FormUpdateCoreComputer key={computer._id} computer={computer} callback={setUpdatedComputer} />;
    });
  };

  return (
    <div>
      <div className="create-form-container">
        {showCreateForm && (
          <FormCreateCoreComputer setUpdatedComputer={setUpdatedComputer} />
        )}
      </div>
      <div className="devComputerCard__controls">
        <div className="devComputerCard__controls--width">
          <div className="devComputerCard__controls-sub-title"><h2>  Core Laptops </h2></div>
          <div className="devComputerCard__controls-search">
            <label> Search: </label>
            <input type="text" onChange={(e) => handleSearch(e)} />
          </div>
          <div className="devComputerCard__controls-button"> <button onClick={renderCreateForm} className="devComputerCard__add-button"> Add new </button> </div>
        </div>
      </div>
      <div className="dashboard__table">
        <table className="styled-table">
          <thead>{renderTableHeaders()}</thead>
          <tbody className="dashboard__table-data">{renderTableData()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardCoreComputers;
