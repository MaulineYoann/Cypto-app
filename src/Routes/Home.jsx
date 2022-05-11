import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Refresh from '../images/refresh.png';
import Coins from '../components/Coins';
import '../App.css';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshPage();
  }, []);

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm)
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const refreshPage = () => {
    setIsLoading(true);
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setCoins(res.data);
      });
  };

  return (
    <div className="App">
      <div className="headerContainer">
        <h1>Welcome to the CryptoChecker</h1>
        <div className="buttonContainer">
          <input
            placeholder="Search for a Coin"
            type="text"
            onChange={handleChange}
          />
          <img onClick={refreshPage} src={Refresh} alt="icon"></img>
        </div>
      </div>
      <div className="coinContainer">
        {isLoading && <h1 className="loadingMssg">Data Loading....</h1>}
        {filterCoins.map((coins) => {
          return (
            <Coins
              id={coins.id}
              icon={coins.image}
              coinName={coins.name}
              coinSymbol={coins.symbol}
              price={coins.current_price}
              marketCap={coins.market_cap}
              priceChange={coins.price_change_percentage_24h}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
