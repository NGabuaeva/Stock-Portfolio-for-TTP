import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../store/transactions';

function Transactions() {
  const transactions = useSelector(state => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  return (
    <div>
      <h3>Transactions</h3>
      {transactions.length ? (
        transactions.map(transaction => (
          <div key={transaction.id}>
            {transaction.type}({transaction.ticker}) - {transaction.quantity}{' '}
            Shares @ {transaction.price}
          </div>
        ))
      ) : (
        <div>No Transactions Yet</div>
      )}
    </div>
  );
}

export default Transactions;
