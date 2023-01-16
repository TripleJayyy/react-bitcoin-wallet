import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [price, setPrice] = useState(null);

  const getPrice = () => {
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")

      .then((res) => {
        console.log(res.data.data.amount);
        setPrice(res.data.data.amount);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPrice();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getPrice();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Pleb Wallet</h1>
      </header>
      {/* <Buttons> */}
      <div className='row'>
        <div className='balance-card'>
          <h2>Balance</h2>
          {/* <p>{balance}</p>*/}
        </div>
        <div className='balance-card'>
          <h2>Price</h2>
          <p>${price}</p>
        </div>
      </div>
      <div className='row'>
        <div className='row-item'>
          {/* <Transactions transactions={transactions} /> */}
        </div>
        <div className='row-item'>{/* <Chart chartData={chartData} /> */}</div>
      </div>
      <footer>
        <p>For plebs, by plebs</p>
      </footer>
    </div>  
  );
}

export default App;
