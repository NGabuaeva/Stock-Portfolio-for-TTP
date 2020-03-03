import React from 'react';
import { connect } from 'react-redux';
import StockForm from './stockForm';
/**
 * COMPONENT
 */
export const UserHome = props => {
  const { cash, stocks } = props.user;
  console.log('user:', props.user);
  return (
    <div>
      <div>
        <h2>Portfolio (${cash})</h2>
        {stocks.length ? (
          <ul>
            {stocks.map(stock => (
              <div key={stock.id}>
                <h4>
                  {stock.ticker} - {stock.quantity} shares
                </h4>{' '}
                <h4>
                  {Math.floor(+stock.price * +stock.quantity * 100) / 100}
                </h4>
              </div>
            ))}
          </ul>
        ) : (
          <h4>No Stocks yet</h4>
        )}
      </div>
      <StockForm />
      {props.error &&
        props.error.response && <div> {props.error.response.data} </div>}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    error: state.error,
  };
};

export default connect(mapState)(UserHome);
