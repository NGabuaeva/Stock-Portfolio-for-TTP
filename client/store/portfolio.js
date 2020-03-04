import axios from 'axios';
import { getError } from './error';
import { me } from './user';

const GET_STOCKS = 'GET_STOCKS';
/**
 * INITIAL STATE
 */
const defaultPortfolio = [];

/**
 * ACTION CREATORS
 */
const gotPortfolio = portfolio => ({ type: GET_STOCKS, portfolio });

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
    await axios.post('/api/portfolio', values);
    dispatch(me());
    dispatch(getPortfolio());
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
    default:
      return state;
  }
}
