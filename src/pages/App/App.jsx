import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from '../../utilities/users-services';
import "./App.css";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import AuthPage from "../AuthPage/AuthPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import LoginPage from "../LoginPage/LoginPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import CommunityPage from "../Community/CommunityPage";
import ProfilePage from "../ProfilePage/ProfilePage";



function App() {
  const [user, setUser] = useState(getUser());
  console.log(user)
  return (
    <main className="App">
      {/* <h1>Apps</h1>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders/" element={<OrderHistoryPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser}/>
      )} */}
      <>
      {/* <NavBar user={user} setUser={setUser}/> */}
      
      <Routes>
            {/* SIGN IN ROUTE */}
            <Route path="/signin" element={<LoginPage setUser={setUser}/>}></Route>

            {/* SIGN UP ROUTE */}
            <Route path="/signup" element={<SignUpPage setUser={setUser}/>}></Route>

            {/* HOME ROUTE */}
            <Route path="/" element={
            <>
              <NavBar user={user} setUser={setUser}/>
            </>} 
            />
            {/* COMMUNITY ROUTE */}
            <Route path="/community" element={
            <>
              <NavBar user={user} setUser={setUser}/>
              <CommunityPage user={user}/>
            </>} 
            />
            {/* PROFILE ROUTE */}
            <Route path="/profile/:name" element={
            <>
              <NavBar user={user} setUser={setUser}/>
              <ProfilePage user={user}/>
            </>} 
            />  
      </Routes>
      </>

    </main>
  );
}

export default App;
