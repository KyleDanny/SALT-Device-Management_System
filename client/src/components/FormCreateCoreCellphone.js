import { React, useState } from "react";
import '../css/formCreateDevice.css';

const FormCreateCoreCellphone = ({ setUpdatedCellphone }) => {
  const [newCellphone, setNewCellphone] = useState({
    cellphoneID: "",
    name: "",
    imei: "",
    type: "",
    comments: "",
  });

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setNewCellphone({
      ...newCellphone,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDevComputer = newCellphone;
    // console.log(newDevComputer);
    const bearer = "Bearer " + userAuth.returnedData.accessToken;
    const response = await fetch(`http://localhost:3001/coreCellphones/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify(newDevComputer),
    });
    const parsedResponse = await response.json();
    if (parsedResponse) {
      setUpdatedCellphone(parsedResponse);
    }

    setNewCellphone({
      cellphoneID: "",
      name: "",
      imei: "",
      type: "",
      comments: "",
    });
  };

  return (
    <div className="device-create-form">
      <div className="device-create-form-width">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="cellphoneID"
            value={newCellphone.cellphoneID || ""}
            placeholder="Cellphone ID"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <input
            type="text"
            name="name"
            value={newCellphone.name || ""}
            placeholder="User name"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <input
            type="text"
            name="imei"
            value={newCellphone.imei || ""}
            placeholder="*imei*"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <input
            type="text"
            name="type"
            value={newCellphone.type || ""}
            placeholder="Type"
            onChange={(e) => handleChange(e)}
            required
          ></input>
          <input
            type="text"
            name="comments"
            value={newCellphone.comments || ""}
            placeholder="Comments"
            onChange={(e) => handleChange(e)}
          ></input>
          <button type="submit" className="create-submit-button"> submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormCreateCoreCellphone;
