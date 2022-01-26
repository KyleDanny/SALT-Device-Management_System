/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../utils/refreshToken";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

const clientId =
  "223152336662-ggl8sh19jb01koh6v4ekv28qefg2lg6b.apps.googleusercontent.com";

const Login = ({ setLoggedIn }) => {
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSuccess = async (res) => {
    // console.log("[login success] res:", res.profileObj);
    const token = res.tokenId;
    refreshTokenSetup(res);
    const data = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        profileObj: res.profileObj,
      }),
    });
    const returnedData = await data.json();
    // console.log(returnedData);
    setUserInfo({ returnedData, loggedIn: true });
    setLoggedIn(true);
    login().then(() => {
      navigate("/dashboard");
    });
  };

  const setLocalStorage = () => {
    localStorage.setItem("data", JSON.stringify(userInfo));
  };

  useEffect(() => {
    setLocalStorage();
    return () => {
      setUserInfo("");
    };
  }, [userInfo]);

  const onFailure = (res) => {
    console.log("[login failed] res:", res);
  };

  return (
    <div className="login__google-div">
      <GoogleLogin
        clientId={clientId}
        render={renderProps => (
          <button className="google-button-login" onClick={renderProps.onClick} disabled={renderProps.disabled}><i class="fab fa-google"></i> Login</button>
        )}
        buttonText="Login"
        className="login__google-btn"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        // hostedDomain="appliedtechnology.se"
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
