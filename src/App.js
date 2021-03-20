import "./App.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function App() {
  const [price, setPrice] = useState(0);
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price, //To Charge Customers
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    console.log(data);
    return actions.order.capture();
  };

  return (
    <div className="app">
      <div className="wrapper">
        <input
          className="app__input"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </div>
  );
}

export default App;
