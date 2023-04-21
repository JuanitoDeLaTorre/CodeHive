import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from '../../utilities/users-services';
import "./App.css";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import AuthPage from "../AuthPage/AuthPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      <h1>App</h1>
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
      )}
    </main>
  );
}

export default App;
