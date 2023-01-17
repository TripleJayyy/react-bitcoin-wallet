import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Transactions from './components/Transactions';
import Buttons from './components/Buttons';
import Chart from './components/Chart';

function App() {
  const [price, setPrice] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState(null);

  const getPrice = () => {
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")

      .then((res) => {
        console.log(res.data.data.amount);
        setPrice(res.data.data.amount);
        updateChartData(res.data.data.amount);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const getWalletBalance = () => {
    const headers = {
      "x-Api-Key": "9c70f13ada074722a74335ca67e198bf",
    }
    axios
      .get("https://legend.lnbits.com/api/v1/wallet", { headers })
      .then((res) => {
        setBalance(res.data.balance / 1000);
      })
      .catch((err) => console.log(err));
  }

  const getTransactions = () => {
    const headers = {
      "x-Api-Key": "9c70f13ada074722a74335ca67e198bf",
    };
    axios
      .get("https://legend.lnbits.com/api/v1/payments", { headers })
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateChartData = (currentPrice) => {
    const timestamp = Date.now();

    setChartData((prevState) => {
      if(!prevState)
      return [
        {
          x: timestamp,
          y: Number(currentPrice),
        },
      ];

      if (
        prevState[prevState.length -1].x === timestamp ||
        prevState[prevState.length -1].y === Number(currentPrice)
      )
        return prevState;
      
        return [
          ...prevState,
          {
            x:timestamp,
            y:Number(currentPrice),
          },
        ];
    });
  };

  useEffect(() => {
    getPrice();
    getWalletBalance();
    getTransactions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getPrice();
      getWalletBalance();
      getTransactions();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>TripleJay Wallet</h1>
      </header>
      <Buttons />
      <div className='row'>
        <div className='balance-card'>
          <h2>Balance</h2>
          <p>{balance}</p>
        </div>
        <div className='balance-card'>
          <h2>Price</h2>
          <p>${price}</p>
        </div>
      </div>
      <div className='row'>
        <div className='row-item'>
          <Transactions transactions={transactions} />
        </div>
        <div className='row-item'>
          <Chart chartData={chartData} />
          </div>
      </div>
      <footer>
        <p>For plebs, by plebs</p>
      </footer>
    </div>  
  );
}

export default App;
