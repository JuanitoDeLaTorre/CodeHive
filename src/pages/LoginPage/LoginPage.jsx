import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginPage.css'
import hive from "../../resources/hiveIcon.png"
import LoginForm from '../../components/LoginForm/LoginForm'
import * as usersService from "../../utilities/users-services";




export default function LoginPage({setUser}) {

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
      });
      const [error, setError] = useState("");

      const navigate = useNavigate()
    
      function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError("");
      }
    
      async function handleSubmit(evt) {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        try {
          
          const user = await usersService.login(credentials);
          setUser(user);

          navigate('/')
       

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
                    <Link to = "/" onClick = {handleSubmit}><div className = "orangeButton" type="submit" style = {{width:"100%"}}>LOG IN</div></Link>
                    
                </form>
                <p style = {{color: "rgb(241, 80, 80)"}}>{error}</p>
                <h5 style = {{fontWeight: "400"}}>Not a user yet? <Link to = "/signup" style = {{color: "var(--accentOrange)"}}>Join the hive!</Link></h5>
                <Link to = "/" ><div className = "orangeButton"  style = {{ width: "100%"}}>Back to home.</div></Link>
            </div>
        </div>
    </div>
  )
}
