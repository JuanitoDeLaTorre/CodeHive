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
import NewCatForm from "../NewCatForm/NewCatForm";
import NewSnippetForm from "../NewSnippetForm/NewSnippetForm";
import SnippetListPage from "../SnippetListPage/SnippetListPage";
import SnippetShowPage from "../SnippetShowPage/SnippetShowPage";
import ResultPage from "../ResultPage/ResultPage";
import EditSnippetForm from "../EditSnippetForm/EditSnippetForm";
import EditCategoryForm from "../EditCategoryForm/EditCategoryForm";
import HomePage from "../HomePage/HomePage";
import ProfileEditPage from "../ProfileEditPage/ProfileEditPage";

import "highlight.js/styles/atom-one-dark.css";
import Page404 from "../Page404/Page404";




function App() {
  const [user, setUser] = useState(getUser());
  const [searchResults, setSearchResults] = useState({});

  console.log(user)
  return (
    <main className="App">
      
      <>

      <Routes>
            {/* SIGN IN ROUTE */}
            <Route path="/signin" element={<LoginPage setUser={setUser}/>}></Route>

            {/* SIGN UP ROUTE */}
            <Route path="/signup" element={<SignUpPage setUser={setUser}/>}></Route>

            {/* HOME ROUTE */}
            <Route path="/" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <HomePage user={user}/>
            </>} 
            />
            {/* COMMUNITY ROUTE */}
            <Route path="/community" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <CommunityPage user={user}/>
            </>} 
            />
            {/* PROFILE ROUTE */}
            <Route path="/profile/:name" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <ProfilePage user={user}/>
            </>} 
            />  
            {/* PROFILE EDIT ROUTE */}
            <Route path="/profileEdit" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <ProfileEditPage user={user} setUser = {setUser}/>
            </>} 
            />  
            {/* ADD CATEGORY FORM */}
            <Route path="/addCatForm" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <NewCatForm user={user}/>
            </>} 
            />  
            {/* ADD SNIPPET FORM */}
            <Route path="/addSnippetForm/:catID" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <NewSnippetForm user={user}/>
            </>} 
            />  

            {/* LIST SNIPPETS FROM CAT */}
            <Route path="/snippets-list/:catID" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <SnippetListPage user={user}/>
            </>} 
            /> 

            {/* SNIPPETS SHOW ROUTE */}
            <Route path="/snippets-show/:snipID" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <SnippetShowPage user={user}/>
            </>} 
            /> 

            {/* EDIT SNIPPETS FORM ROUTE */}
            <Route path="/snippets-edit/:snipID" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <EditSnippetForm user={user}/>
            </>} 
            
            /> 
            {/* EDIT CATEGORY FORM ROUTE */}
            <Route path="/bins-edit/:catID" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <EditCategoryForm user={user}/>
            </>} 
            
            /> 
            {/* RESULTS PAGE */}
            <Route path="/results" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <ResultPage searchResults={searchResults} user={user}/>
            </>} 
            /> 
            {/* 404 PAGE */}
            <Route path="*" element={
            <>
              <NavBar setSearchResults={setSearchResults} user={user} setUser={setUser}/>
              <Page404 />
            </>} 
            /> 
      </Routes>
      </>

    </main>
  );
}

export default App;
