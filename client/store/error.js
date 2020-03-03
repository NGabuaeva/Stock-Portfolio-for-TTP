/**
 * ACTION TYPES
 */

const ERROR = 'ERROR';

/**
 * INITIAL STATE
 */
const defaultError = '';

/**
 * ACTION CREATORS
 */
export const getError = error => ({ type: ERROR, error });

/**
 * REDUCER
 */
export default function(state = defaultError, action) {
  switch (action.type) {
    case ERROR:
      return action.error;
    default:
      return state;
  }
}
