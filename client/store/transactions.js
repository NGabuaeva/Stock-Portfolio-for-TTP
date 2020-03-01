import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

/**
 * INITIAL STATE
 */
const defaultTransactions = [];

/**
 * ACTION CREATORS
 */
const gotTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions,
});

/**
 * THUNK CREATORS
 */
export const getTransactions = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/transactions');
    dispatch(gotTransactions(data));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */

export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions;
    default:
      return state;
  }
}
