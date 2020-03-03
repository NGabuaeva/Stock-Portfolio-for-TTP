import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockForm from './stockForm';
import { getPortfolio } from '../store/portfolio';
/**
 * COMPONENT
 */
const UserHome = () => {
  const { cash } = useSelector(state => state.user);
  const stocks = useSelector(state => state.portfolio);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPortfolio());
  }, []);
  return (
    <div>
      <div>
        <h2>Portfolio (${Math.floor(cash * 100) / 100})</h2>
        {stocks.length ? (
          <ul>
            {stocks.map(stock => (
              <div key={stock.id}>
                <h4>
                  {stock.ticker} - {stock.quantity} shares
                </h4>{' '}
                <h4>
                  {Math.floor(stock.currentPrice * stock.quantity * 100) / 100}
                </h4>
              </div>
            ))}
          </ul>
        ) : (
          <h4>No Stocks yet</h4>
        )}
      </div>
      <StockForm />
      {error && error.response && <div> {error.response.data} </div>}
    </div>
  );
};

export default UserHome;
