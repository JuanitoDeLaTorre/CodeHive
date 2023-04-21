import React from "react";
import { checkToken } from "../../utilities/users-services";

const OrderHistoryPage = () => {
  async function handleCheckToken(e) {
   const expDate = await checkToken();
  }
  return (
    <div>
      <h1>OrderHistoryPage</h1>
      <button onClick={handleCheckToken}>Check when my content expires</button>
    </div>
  );
};

export default OrderHistoryPage;
