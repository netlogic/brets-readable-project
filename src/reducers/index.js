/** reducer for readable
 * 
 */
import * as ActionTypes from '../actions'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'


const errorMessage = (state = null, action) => {
  const { type, error } = action

//   if (type === ActionTypes.RESET_ERROR_MESSAGE) {
//     return null
//   } else if (error) {
//     return error
//   }

  return state
}

export default combineReducers( {routing, errorMessage} );