import { React, useState } from "react";
import '../css/formCreateDevice.css';

const FormCreateCoreComputer = ({ setUpdatedComputer }) => {
  const [newComputer, setNewComputer] = useState({
    computerID: "",
    serialNO: "",
    type: "",
    licenceLink: "",
    users: "",
    comments: "",
    currentFileValueKey: "",
    handoutDate: "",
    chargerNumber: "",
  });

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setNewComputer({
      ...newComputer,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDevComputer = newComputer;
    // console.log(newDevComputer);
    const bearer = "Bearer " + userAuth.returnedData.accessToken;
    const response = await fetch(`http://localhost:3001/coreComputers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify(newDevComputer),
    });
    const parsedResponse = await response.json();
    if (parsedResponse) {
      setUpdatedComputer(parsedResponse);
    }

    setNewComputer({
      computerID: "",
      serialNO: "",
      type: "",
      licenceLink: "",
      users: "",
      comments: "",
      currentFileValueKey: "",
      handoutDate: "",
      chargerNumber: "",
    });
  };

  return (
    <div className="device-create-form">
      <div className="device-create-form-width">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="computerID"
            value={newComputer.computerID || ""}
            placeholder="Computer ID"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <input
            type="text"
            name="serialNO"
            value={newComputer.serialNO || ""}
            placeholder="Serial NO"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <input
            type="text"
            name="type"
            value={newComputer.type || ""}
            placeholder="Type"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <input
            type="text"
            name="licenceLink"
            value={newComputer.licenceLink || ""}
            placeholder="Licence Link"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <input
            type="text"
            name="users"
            value={newComputer.users || ""}
            placeholder="User"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="text"
            name="comments"
            value={newComputer.comments || ""}
            placeholder="Comments"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <input
            type="text"
            name="currentFileValueKey"
            value={newComputer.currentFileValueKey || ""}
            placeholder="Current File Value Key"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <input
            type="date"
            name="handoutDate"
            value={newComputer.handoutDate || ""}
            placeholder="Handout Date"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="text"
            name="chargerNumber"
            value={newComputer.chargerNumber || ""}
            placeholder="Charger Number"
            onChange={(e) => handleChange(e)}
            required
          ></input>
            <button type="submit" className="create-submit-button"> submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormCreateCoreComputer;
