import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockForm from './stockForm';
import { getPortfolio } from '../store/portfolio';

//helper function to set colors to stocks
const setColor = stock => {
  if (stock.currentPrice < stock.openingPrice) {
    return 'less';
  } else if (stock.currentPrice > stock.openingPrice) {
    return 'greater';
  } else {
    return 'equal';
  }
};

/**
 * COMPONENT
 */
const UserHome = () => {
  const gimmeState = useSelector(state => state)
  console.log(gimmeState)
  const { cash } = useSelector(state => state.user);
  const stocks = useSelector(state => state.portfolio);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPortfolio());
  }, []);

  return (
    <div>
      <h2 className="title">Portfolio (${Math.floor(cash * 100) / 100})</h2>
      <div className="portfolio">
        {stocks.length ? (
          <ul>
            {stocks.map(stock => {
              const colorClass = setColor(stock);
              return (
                <div key={stock.id} className={colorClass}>
                  <h4>
                    {stock.ticker} - {stock.quantity} shares
                  </h4>
                  <h4 className="price">
                    ${Math.floor(stock.currentPrice * stock.quantity * 100) /
                      100}
                  </h4>
                </div>
              );
            })}
          </ul>
        ) : (
            <h4>No Stocks yet</h4>
          )}
        <StockForm />
        {error && error.response && <div> {error.response.data} </div>}
      </div>
    </div>
  );
};

export default UserHome;
