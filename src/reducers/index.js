/** reducer for readable
 * 
 */
import * as ActionTypes from '../actions'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as constants from '../constants'


const initialErrorState = null;


const errorMessage = (state = initialState, action) => {
  const { type, error } = action

  if (type === constants.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}



const initialState = {
    time : (new Date())
}

const appState = (state = initialState, action) => {
  switch (action.type) {
    case constants.UPDATE_TIME:
      var { time } = action
        return {
          ...state,
          time : time,
        }
        break;

    default:
      return state
  }
}


export default combineReducers( {
        appState,
        errorMessage,
        routing : routerReducer} 
    );