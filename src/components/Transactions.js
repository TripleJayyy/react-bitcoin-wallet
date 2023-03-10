import React from "react";
import "./Transactions.css";

export const Transactions = ({transactions}) => {
//  const transactions = [
//    {
//      checking_id: 1,
//      amount: 1000,
//      time: 1669064951,
//      bolt11: "lnbc20n1p3h24fhsp590ccjwy...",
//    },
//    {
//      checking_id: 2,
//      amount: 2000,
//      time: 1668035952,
//      bolt11: "lnbc980n1p3h24fhsp5cpcjdw...",
//    },
//  ];

// ToDo: Improve tx parsing to display internal payments, incomplete payments, and further verify the transactions we are listing out
const parseTx = (tx) => {
    // turn unix timestamp into a date
    // Todo: format date further to include hours, minutes, and seconds
    const date = new Date(tx.time * 1000);
    const formattedDate = date.toLocaleDateString("en-US");

    if (tx.pendiing) return null;

    if (tx.amount > 0) {
        return (
            <div key={tx.checking_id} className="tx-item">
              <p>Received from {tx.bolt11.substring(0, 25)}...</p>
              <p>+{tx.amount / 1000} sats</p>
              <p className="transaction-date">{formattedDate}</p>
            </div>
        );
    }

    if (tx.amount < 0) {
        return (
            <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
                <p>Sent with {tx.bolt11.substring(0,25)}...</p>
                <p className="tx-amount">{tx.amount / 1000} sats</p>
                <p className="transaction-date">{formattedDate}</p>
            </div>
        )
    }  
  };
 
  return (
    <div>
      <h3>Transactions</h3>
      {transactions.map((transaction) => {
        return parseTx(transaction);
      })}
    </div>
  );
 };
 
 export default Transactions;

