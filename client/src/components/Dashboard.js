import { React, useState, useEffect } from "react";
// import { Link } from "react-router-dom";

import "../css/dashboard.css";
import "../css/chartstyle.css";

import DashboardDevComputers from "./DashboardDevComputers";
import DashboardCoreComputers from "./DashboardCoreComputers";
import DashboardCoreCellphones from "./DashboardCoreCellphones";

const Dashboard = () => {
  const [renderDev, setRenderDev] = useState(true);
  const [renderCore, setRenderCore] = useState(false);
  const [, setRenderCell] = useState(false);

  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data");
    const data = JSON.parse(localRef);
    return data || "";
  });

// useEffect(() => {
// useAuth()
// }, [])

  const renderDevComputers = () => {
    setRenderDev(true);
    setRenderCore(false);
    setRenderCell(false);
  };

  const renderCoreComputers = () => {
    setRenderCore(true);
    setRenderDev(false);
    setRenderCell(false);
  };
  const renderCoreCellphones = () => {
    setRenderCell(true);
    setRenderCore(false);
    setRenderDev(false);
  };

  return (
    <div className="dashboard__container">
      <div className="dashboard__user">
        <div></div>
        <div className="dashboard__title">
          <h1> Dashboard </h1>
          <h2> Welcome, {userAuth.returnedData.user.givenName}!</h2>
        </div>
        <div>
          <img
            src={userAuth.returnedData.user.imageUrl}
            alt="profile"
            className="profile-img"
          />
        </div>
      </div>
      <div className="dashboard__tabs-btns">
        <button className="dashboard__dev-lap-btn" onClick={renderDevComputers}>Dev Laptops</button>
        <button className="dashboard__core-lap-btn" onClick={renderCoreComputers}>Core Laptops</button>
        <button className="dashboard__core-cell-btn" onClick={renderCoreCellphones}>Core Cellphones </button>
      </div>
      <div className="table-background">
        {renderDev ? (
          <DashboardDevComputers />
        ) : renderCore ? (
          <DashboardCoreComputers />
        ) : (
          <DashboardCoreCellphones />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
