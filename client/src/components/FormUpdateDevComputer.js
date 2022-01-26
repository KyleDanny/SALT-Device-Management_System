import { React, useState } from "react";
import '../css/formUpdateDevComputer.css';

const FormUpdateDevComputer = ({ callback, currentComputer, cancelUpdate }) => {
  const [user, setUser] = useState("");

  const [updatedComputer, setUpdatedComputer] = useState({
    computerID: currentComputer.computerID,
    serialNO: currentComputer.serialNO,
    informationLink: currentComputer.informationLink,
    status: currentComputer.status,
    handoutDate: currentComputer.handoutDate,
  });

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const handleComputerChange = (e) => {
    const { value } = e.target;
    setUpdatedComputer({
      ...updatedComputer,
      [e.target.name]: value,
    });
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const computer = updatedComputer;
    const users = user;
    // console.log(newDevComputer);
    const bearer = "Bearer " + userAuth.returnedData.accessToken;
    const response = await fetch(`http://localhost:3001/dashboard/:id`, {
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
      console.log('form response', parsedResponse);
      callback(parsedResponse);
    }
  };

  return (
    <>
      <form className="devComputerCard-height" onSubmit={(e) => handleSubmit(e)}>
        <div className="devComputerCard__computer-name"><h2>{currentComputer.computerID}</h2></div>
        <div className="laptopImage"></div>
        <div className="devComputerCardInfo">
          <div>
            <label className="updateFormLabel"> Serial Number </label>
            <input
              className="updateFormInput"
              type="text"
              name="serialNO"
              defaultValue={currentComputer.serialNO || updatedComputer.serialNO}
              placeholder="Serial NO"
              onChange={(e) => handleComputerChange(e)}
              required
            ></input>
          </div>
          <div>
            <label className="updateFormLabel"> Information Link </label>
            <input
              className="updateFormInput"
              type="text"
              name="informationLink"
              defaultValue={
                currentComputer.informationLink || updatedComputer.informationLink
              }
              placeholder="Information Link"
              onChange={(e) => handleComputerChange(e)}
              required
            ></input>
          </div>
          <div>
            <label className="updateFormLabel"> Status </label>
            <select
              className="updateFormInput"
              name="status"
              defaultValue={currentComputer.status || updatedComputer.status}
              onChange={(e) => handleComputerChange(e)}
            >
              <option value="Handed out"> Handed out </option>
              <option value="Returned"> Returned </option>
              <option value="Broken"> Broken </option>
              <option value="Being Repaired"> Being Repaired </option>
              <option value="Stolen or Lost"> Stolen or Lost </option>
              <option value="Ready to be handed out"> Ready to be handed out </option>
              <option value="Unknown"> Unknown </option>
            </select>
          </div>
          <div>
            <label className="updateFormLabel"> Users </label>
            <input
              className="updateFormInput"
              type="text"
              name="users"
              defaultValue={currentComputer.users[0] || user}
              placeholder="User"
              onChange={(e) => handleUserChange(e)}
            ></input>
          </div>
          <div>
            <label className="updateFormLabel"> Handed Out </label>
            <input
              className="updateFormInput"
              type="date"
              name="handoutDate"
              defaultValue={
                (currentComputer.handoutDate !== undefined && currentComputer.handoutDate !== null ? currentComputer.handoutDate.split('T')[0] : "") || updatedComputer.handoutDate
              }
              placeholder="Handout Date"
              onChange={(e) => handleComputerChange(e)}
            ></input>
          </div>

        </div>
        <div className="devComputerCard__buttons">
          <div><input className="update-button" type="submit" value="Update" /></div>
          <div><button className="cancel-button" onClick={cancelUpdate}>Cancel</button></div>
        </div>
      </form>
    </>
  );
};

export default FormUpdateDevComputer;
