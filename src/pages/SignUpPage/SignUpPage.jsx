import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './SignUpPage.css'
import hive from "../../resources/hiveIcon.png"
import * as usersService from "../../utilities/users-services";




export default function SignUpPage({setUser}) {

    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        profilePic: ""
      });
      const [error, setError] = useState("");
    
      function handleChange(evt) {
        console.log("CHANGING!")
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
          const user = await usersService.signUp(credentials);
          setUser(user);

          const back = document.querySelector('.backToHome')
          back.click()
          
        } catch (err){
            console.log(err)
          setError("Sign Up Failed - Try Again");
        }
      }

  return (
    <div className="loginContainer" style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <div className="loginBox">
            <div style = {{backgroundColor: 'rgb(53, 53, 53)', width: "40%", overflow: "hidden", position: "relative"}}>
                <img id = "hiveIconLogin" src={hive} alt="" />
                <h1 style = {{fontFamily: "Pathway Gothic One", fontSize: "3em", position: "absolute", top: "50%", left: "32%"}}>CODE <span style = {{color: "var(--accentOrange"}}>HIVE</span></h1>
            </div>
            <div style = {{width: "60%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "2%"}}>
                <h1 style = {{fontWeight: "600", marginBottom: "0"}}>Join the <span style = {{color: "var(--accentOrange"}}>Hive</span>!</h1>
                <h4 style = {{fontWeight: "200", marginTop: "15px",color: "var(--paynes"}}>Let's start with some details:</h4>
                
                <form id = "loginForm" autoComplete="off" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" style = {{fontSize: "0.7em"}}>username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" style = {{fontSize: "0.7em"}}>email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style = {{fontSize: "0.7em"}}>password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="profilePic" style = {{fontSize: "0.7em"}}>profile picture URL</label>
                        <input
                            type="text"
                            name="profilePic"
                            placeholder="Profile Picture URL"
                            value={credentials.profilePic}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Link to = "/" ><button id = "loginButton" type="submit" onClick={handleSubmit} style = {{width: "100%", margin: "5%"}}>Sign Up</button></Link>
                </form>
                <Link to = "/" ><button id = "loginButton" class = "backToHome" style = {{ width: "100%", marginTop: "25%"}}>Back to home</button></Link>
            </div>
        </div>
    </div>
  )
}