import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
      const [passwordConfirm, setPasswordConfirm] = useState("");
      const [error, setError] = useState('');

      const navigate = useNavigate()
    
      function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError("");
      }

      function handleConfirmChange(evt) {
        setPasswordConfirm(evt.target.value);
        setError("");
      }
    
      async function handleSubmit(evt) {
        // Prevent form from being submitted to the server
        evt.preventDefault();

        //validation
        if (credentials.username === "") {
            setError('Please enter a username.');
            return
          }
      
          else if (credentials.email === "") {
            setError("Please enter an email address.");
            return
          }
      
          else if (credentials.password === "") {
            setError("Please enter a password.");
            return
          }
      
          else if (passwordConfirm !== credentials.password) {
            setError("The passwords do not match.");
            return
          }



        try {
          
            if(error !== '') {
                console.log("trying!")
                // const user = await usersService.signUp(credentials);
                // setUser(user);
      
                navigate('/')
            }

          
        } catch (err){
            console.log(err)
          setError("Sign Up Failed - Try Again");
        }
      }

  return (
    <div className="loginContainer" style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <div className="loginBox" style = {{height: '80vh'}}>
            <div style = {{backgroundColor: 'rgb(53, 53, 53)', width: "40%", overflow: "hidden", position: "relative"}}>
                <img id = "hiveIconLogin" src={hive} alt="" />
                <h1 style = {{fontFamily: "Pathway Gothic One", fontSize: "3em", position: "absolute", top: "50%", left: "32%"}}>CODE <span style = {{color: "var(--accentOrange"}}>HIVE</span></h1>
            </div>
            <div style = {{width: "60%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "2%"}}>
                <h1 style = {{fontWeight: "600", marginBottom: "0"}}>Join the <span style = {{color: "var(--accentOrange"}}>Hive</span>!</h1>
                <h4 style = {{fontWeight: "200", marginTop: "15px",color: "var(--paynes"}}>Let's start with some details:</h4>
                
                <form id = "loginForm" autoComplete="off" onSubmit={handleSubmit} >
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
                            type="email"
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
                        <label htmlFor="password" style = {{fontSize: "0.7em"}}>confirm password</label>
                        <input
                            type="password"
                            name="passwordConfirm"
                            placeholder="password confirm"
                            value={passwordConfirm}
                            onChange={handleConfirmChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="profilePic" style = {{fontSize: "0.7em"}}>profile picture URL (optional)</label>
                        <input
                            type="text"
                            name="profilePic"
                            placeholder="Profile Picture URL"
                            value={credentials.profilePic}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <p style = {{color: "rgb(241, 80, 80)"}}>{error}</p>
                   
                
                    <Link to = "/" ><div className = "orangeButton" onClick={handleSubmit} style = {{width: "100%"}}>Sign Up</div></Link>
                </form>
                <Link to = "/" ><div className = "orangeButton" style = {{ width: "100%"}}>Back to home</div></Link>
            </div>
        </div>
    </div>
  )
}