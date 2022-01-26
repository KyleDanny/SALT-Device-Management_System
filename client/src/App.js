import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import DevComputer from "./components/DevComputer";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

const Home = () => {
  return (
    <div className="main-home">
      <div className="hero"><h1>{`</SLAP>`}</h1></div>
      <div className="hero2"><h1>DEVICE MANAGEMENT SYSTEM</h1></div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route exact path="/login" element={<Login />}></Route> */}

          <Route exact path="/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }></Route>

          <Route exact path="/dashboard/:id" element={
            <RequireAuth>
              <DevComputer />
            </RequireAuth>
          }></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
