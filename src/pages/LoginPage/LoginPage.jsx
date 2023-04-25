import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './LoginPage.css'
import hive from "../../components/NavBar/hiveIcon.png"
import LoginForm from '../../components/LoginForm/LoginForm'
import * as usersService from "../../utilities/users-services";




export default function LoginPage({setUser}) {

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
      });
      const [error, setError] = useState("");
    
      function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError("");
      }
    
      async function handleSubmit(evt) {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        try {
          // The promise returned by the signUp service method
          // will resolve to the user object included in the
          // payload of the JSON Web Token (JWT)
          const user = await usersService.login(credentials);
          setUser(user);
        } catch (err){
            console.log(err)
          setError("Log In Failed - Try Again");
        }
      }

  return (
    <div className="loginContainer" style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <div className="loginBox">
            <div style = {{backgroundColor: 'rgb(53, 53, 53)', width: "40%", overflow: "hidden", position: "relative"}}>
                <img id = "hiveIconLogin" src={hive} alt="" />
                <h1 style = {{fontFamily: "Pathway Gothic One", fontSize: "3em", position: "absolute", top: "50%", left: "32%"}}>CODE <span style = {{color: "var(--accentOrange"}}>HIVE</span></h1>
            </div>
            <div style = {{width: "60%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "6%"}}>
                <h1 style = {{fontWeight: "600", marginBottom: "0"}}>Welcome back!</h1>
                <h4 style = {{fontWeight: "200", marginTop: "5px",color: "var(--paynes"}}>Sign in below:</h4>
                
                <form id = "loginForm" autoComplete="off" onSubmit={handleSubmit}>
                    {/* <label>- Email -</label> */}
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                    {/* <label>- Password -</label> */}
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    <Link to = "/"><button id = "loginButton" type="submit" style = {{width:"100%"}} onClick = {handleSubmit}>LOG IN</button></Link>
                </form>
                <h5 style = {{fontWeight: "400"}}>Not a user yet? <Link to = "/signup" style = {{color: "var(--accentOrange)"}}>Join the hive!</Link></h5>
                <Link to = "/" ><button id = "loginButton" style = {{ width: "100%"}}>Back to home.</button></Link>
            </div>
        </div>
    </div>
  )
}
