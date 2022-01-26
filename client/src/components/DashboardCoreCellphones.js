import { React, useState, useEffect } from "react";
import FormCreateCoreCellphone from "./FormCreateCoreCellphone";
import FormUpdateCoreCellphone from "./FormUpdateCoreCellphone";

const DashboardCoreCellphones = () => {
  const [cellphones, setCellphones] = useState([]);
  const [updatedCellphone, setUpdatedCellphone] = useState();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filteredData, setFilteredData] = useState(cellphones)

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const handleSearch = (e) => {
    const search = e.target.value;
    const filteredData = cellphones.filter(cellphone => {
      return cellphone.cellphoneID.toLowerCase().includes(search.toLowerCase())
    })
    setFilteredData(filteredData);
  }

  const getCoreCellphones = async () => {
    const bearer = "Bearer " + userAuth.returnedData.accessToken;
    // console.log(bearer)
    const response = await fetch("http://localhost:3001/coreCellphones", {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    });
    const parsedResponse = await response.json();
    setCellphones(parsedResponse);
    setFilteredData(parsedResponse);
  };

  useEffect(() => {
    getCoreCellphones();
  }, [updatedCellphone]);

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
          <th> user </th>
          <th> imei </th>
          <th> type </th>
          <th> comments </th>
          <th></th>
        </tr>
      </>
    );
  };

  const renderTableData = () => {
    return filteredData.map((cellphone) => {
      return <FormUpdateCoreCellphone key={cellphone._id} cellphone={cellphone} callback={setUpdatedCellphone} />;
    });
  };
  

  return (
    <div>
      <div className="create-form-container">
        {showCreateForm && (
          <FormCreateCoreCellphone setUpdatedCellphone={setUpdatedCellphone} />
        )}
      </div>
      <div className="devComputerCard__controls">
        <div className="devComputerCard__controls--width">
          <div className="devComputerCard__controls-sub-title"><h2 className="dashboard-sub-title"> Core Cellphones </h2> </div>
          <div className="devComputerCard__controls-search">
            <label> Search: </label>
            <input type="text" onChange={(e) => handleSearch(e)} />
          </div>
          <div className="devComputerCard__controls-button"> <button onClick={renderCreateForm}className="devComputerCard__add-button"> Add new </button> </div>
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

export default DashboardCoreCellphones;
