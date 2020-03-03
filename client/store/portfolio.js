import axios from 'axios';
import { getError } from './error';

const GET_STOCKS = 'GET_STOCKS';
const BUY_STOCK = 'BUY_STOCK';
/**
 * INITIAL STATE
 */
const defaultPortfolio = [];

/**
 * ACTION CREATORS
 */
const gotPortfolio = portfolio => ({ type: GET_STOCKS, portfolio });
const boughtStocks = newStock => ({ type: BUY_STOCK, newStock });

/**
 * THUNK CREATORS
 */

export const getPortfolio = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/portfolio');
    dispatch(gotPortfolio(data));
  } catch (error) {
    console.log(error);
  }
};

export const buyStock = values => async dispatch => {
  try {
    const { data } = await axios.post('/api/portfolio', values);
    console.log('data from thunk:', data);
    dispatch(boughtStocks(data));
  } catch (err) {
    return dispatch(getError(err));
  }
};

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_STOCKS:
      return action.portfolio;
    case BUY_STOCK:
      return [...state, action.newStock];
    default:
      return state;
  }
}
