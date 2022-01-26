import * as React from "react";
import { useState } from "react";
// import { useAuth } from "./UseAuth";
// import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const [userAuth] = useState(() => {
    const localRef = localStorage.getItem("data")
    const data = JSON.parse(localRef);
    return data || "";
  });

  return userAuth.loggedIn === true
    ? children 
    : <div className="login__error-msg">Please log in to have access to the dashboard!</div>
}
