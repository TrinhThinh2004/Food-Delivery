import React, { use, useState, useEffect, useContext } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const {url,setToken}=useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLoginHandle = async (event) => {
    event.preventDefault();
    let newUrl = url + "/api/user/login";
    if(currState==="Login"){
      newUrl = url + "/api/user/login"
    } else {
      newUrl = url + "/api/user/register"
    }
    const response = await axios.post(newUrl, data);
    const result = await response.data;
    console.log(result);
    if(result.success){
      setToken(result.token);
      localStorage.setItem("token", result.token);
      localStorage.setItem("isAdmin", result.isAdmin);
      setShowLogin(false);
      
      if (result.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      };
    
    } else {
      alert(result.message);
    }
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="login">
      <form onSubmit={onLoginHandle} className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandle}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandle}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandle}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continiuing, i agree to the terms of use & Privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>CLick here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
