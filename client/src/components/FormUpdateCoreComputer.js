import { React, useState } from "react";

const FormUpdateCoreComputer = ({ computer, callback }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [coreUser, setCoreUser] = useState("");

  const [updatedCoreComputer, setUpdatedCoreComputer] = useState({
    computerID: computer.computerID,
    serialNO: computer.serialNO,
    type: computer.type,
    licenseLink: computer.licenseLink,
    comments: computer.comments,
    currentFileValueKey: computer.currentFileValueKey,
    handoutDate: computer.handoutDate,
    chargerNumber: computer.chargerNumber,
  });

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const {
    _id,
    computerID,
    serialNO,
    type,
    licenseLink,
    users,
    comments,
    currentFileValueKey,
    handoutDate,
    chargerNumber,
  } = computer;

  const handleComputerChange = (e) => {
    const { value } = e.target;
    setUpdatedCoreComputer({
      ...updatedCoreComputer,
      [e.target.name]: value,
    });
  };

  const handleUserChange = (e) => {
    setCoreUser(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const computer = updatedCoreComputer;
    const users = coreUser;
    // console.log(newDevComputer);
    const bearer = "Bearer " + userAuth.returnedData.accessToken;
    const response = await fetch(`http://localhost:3001/coreComputers/:id`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({ computer, users }),
    });
    const parsedResponse = await response.json();
    // console.log(parsedResponse);
    if (parsedResponse) {
      console.log("form response", parsedResponse);
      callback(parsedResponse);
      setShowUpdateForm(!showUpdateForm);
    }
  };

  const handleDelete = async () => {
    const confirmBox = window.confirm(
      "Do you really want to delete this device?"
    )
    if (confirmBox === true) {
      const bearer = "Bearer " + userAuth.returnedData.accessToken;
      const response = await fetch(
        `http://localhost:3001/coreComputers/${computer.computerID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: bearer,
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        callback("");
      }
    }
  };

  const renderTable = () => {
    return (
      <>
        <tr key={_id}>
          <td className="dev-com__info-link">{computerID}</td>
          <td>{serialNO}</td>
          <td>{type}</td>
          <td>
            <a href={`${licenseLink}`} target="blank">
              Link
            </a>
          </td>
          <td>{users[0]}</td>
          <td>{comments ? comments : "-"}</td>
          <td>{currentFileValueKey ? currentFileValueKey : "-"}</td>
          <td>{handoutDate ? handoutDate.split("T")[0] : "-"}</td>
          <td>{chargerNumber ? chargerNumber : "-"}</td>
          <td>
            <div className="dashboard-icons">
              <div className="edit-icon"><i className="far fa-edit" onClick={renderUpdateForm}></i></div>
              <div className="delete-icon"><i className="far fa-trash-alt" onClick={handleDelete}></i></div>
            </div>
          </td>
        </tr>
      </>
    );
  };

  const renderForm = () => {
    return (
      <tr key={_id} className="table-row-update">
        <td>{computerID}</td>
        <td>
          <input
            type="text"
            name="serialNO"
            defaultValue={serialNO}
            placeholder="Serial NO"
            onChange={(e) => handleComputerChange(e)}
          />
        </td>
        <td>
          <input
            type="text"
            name="type"
            defaultValue={type}
            placeholder="Type"
            onChange={(e) => handleComputerChange(e)}
          />
        </td>
        <td>
          <input
            type="text"
            name="licenseLink"
            defaultValue={licenseLink}
            placeholder="License Link"
            onChange={(e) => handleComputerChange(e)}
          />
        </td>
        <td>
          <input
            type="text"
            name="users"
            defaultValue={users[0]}
            placeholder="User"
            onChange={(e) => handleUserChange(e)}
          />
        </td>
        <td>
          <input
            type="text"
            name="comments"
            defaultValue={comments ? comments : ""}
            placeholder="Comments"
            onChange={(e) => handleComputerChange(e)}
          />
        </td>
        <td>
          <input
            type="text"
            name="currentFileValueKey"
            defaultValue={currentFileValueKey ? currentFileValueKey : ""}
            placeholder="File Value Key"
            onChange={(e) => handleComputerChange(e)}
          />
        </td>
        <td>
          <input
            type="date"
            name="handoutDate"
            defaultValue={handoutDate ? handoutDate.split("T")[0] : ""}
            placeholder="File Value Key"
            onChange={(e) => handleComputerChange(e)}
          />
        </td>
        <td>
          <input
            type="text"
            name="chargerNumber"
            defaultValue={chargerNumber}
            placeholder="Charger Number"
            onChange={(e) => handleComputerChange(e)}
          />
        </td>
        <td>
          <div className="dashboard-icons"> 
            <div className="update-green"><i class="far fa-check-circle" onClick={handleUpdate}></i></div>
            <div className="cancel-icon"><i class="far fa-window-close" onClick={renderUpdateForm}></i></div>
          </div>
        </td>
      </tr>
    );
  };

  const renderUpdateForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowUpdateForm(!showUpdateForm);
  };

  return <>{showUpdateForm ? renderForm() : renderTable()}</>;
};

export default FormUpdateCoreComputer;
