
import React from "react";
import { useBkash } from "react-bkash";

const Checkout = () => {
  // const p = {
  //   amount: "500",
  //   currency: "BDT",
  //   intent: "sale",
  //   merchantInvoiceNumber: "Inv0124",
  // };
  const { error, loading, triggerBkash } = useBkash({
    onSuccess: (data) => {
      console.log(data); // this contains data from api response from onExecutePayment
    },
    onClose: () => {
      console.log("Bkash iFrame closed");
    },
    bkashScriptURL:"https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js",
    amount: 1000,
    onCreatePayment: async (paymentRequest) => {
      // call your API with the payment request here
      return await fetch("http://localhost:8000/createRequest", {
        method: "POST",
        body: JSON.stringify(paymentRequest),
      }).then((res) => res.json());

      // must return the following object:
      // {
      // 	paymentID: string;
      // 	createTime: string;
      // 	orgLogo: string;
      // 	orgName: string;
      // 	transactionStatus: string;
      // 	amount: string;
      // 	currency: string;
      // 	intent: string;
      // 	merchantInvoiceNumber: string;
      // }
    },
    onExecutePayment: async (paymentID) => {
      // call your executePayment API here
      return await fetch(`http://localhost:8000/executeRequest`, {
        method: "POST",
      }).then((res) => res.json());

      // it doesn't matter what you return here, any errors thrown here will be available on error return value of the useBkash hook
    },
  });

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <button onClick={triggerBkash}>Pay with bKash</button>
    </div>
  );
};

export default Checkout;