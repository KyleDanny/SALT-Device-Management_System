import "../css/navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Login from "./Login";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState();

  const userLoggedIn = () => {
    if (loggedIn) {
      return (
        <div>
          <Logout setLoggedIn={setLoggedIn} />{" "}
        </div>
      );
    } else {
      return (
        <div>
          <Login setLoggedIn={setLoggedIn} />{" "}
        </div>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__elements">
        <div className="navbar__home">
          <Link to="/">
            <i class="fas fa-home"></i> Home
          </Link>
        </div>
        <div className="navbar__dashboard">
          <Link to="/dashboard">
            <i class="fas fa-table"></i> Dashboard
          </Link>
        </div>
      <div>
      {userLoggedIn()}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
