import { React, useState } from "react";
import '../css/formCreateDevice.css';

const FormDevComputer = ({ callback }) => {
  const [newComputer, setNewComputer] = useState({
    computerID: "",
    serialNO: "",
    informationLink: "",
    status: "Ready to be handed out",
    users: "",
    handoutDate: "",
  });

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data")
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
    const bearer = 'Bearer ' + userAuth.returnedData.accessToken;
    const response = await fetch(`http://localhost:3001/dashboard/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify(newDevComputer)
    });
    const parsedResponse = await response.json();
    if (parsedResponse) {
      callback(parsedResponse);
    }

    setNewComputer({
      computerID: "",
      serialNO: "",
      informationLink: "",
      status: "Ready to be handed out",
      users: "",
      handoutDate: ""
    });
  }

  return (
    <div className="device-create-form">
      <div className="device-create-form-width">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="computerID" value={newComputer.computerID || ""} placeholder="Computer ID" onChange={(e) => handleChange(e)} required></input>
          <input type="text" name="serialNO" value={newComputer.serialNO || ""} placeholder="Serial NO" onChange={(e) => handleChange(e)} required></input>
          <input type="text" name="informationLink" value={newComputer.informationLink || ""} placeholder="Information Link" onChange={(e) => handleChange(e)} required></input>
          <select name="status" value={newComputer.status || "Ready to be handed out"} onChange={(e) => handleChange(e)}>
            <option value="Handed out"> Handed out </option>
            <option value="Returned"> Returned </option>
            <option value="Broken"> Broken </option>
            <option value="Being Repaired"> Being Repaired </option>
            <option value="Stolen or Lost"> Stolen or Lost </option>
            <option value="Ready to be handed out"> Ready to be handed out </option>
            <option value="Unknown"> Unknown </option>
          </select>
          <input type="text" name="users" value={newComputer.users || ""} placeholder="User" onChange={(e) => handleChange(e)}></input>
          <input type="date" name="handoutDate" value={newComputer.handoutDate || ""} placeholder="Handout Date" onChange={(e) => handleChange(e)}></input>
          <button type="submit" className="create-submit-button"> submit</button>
        </form>
      </div>
    </div>
  )
}


export default FormDevComputer;