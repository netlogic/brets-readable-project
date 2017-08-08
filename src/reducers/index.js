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
    time: (new Date())
}

const appState = (state = initialState, action) => {
    switch (action.type) {
        case constants.UPDATE_TIME:
            var { time } = action
            return {
                ...state,
                time: time,
            }
            break;
        case constants.CATEGORIES_RECEIVED:
            return {
                ...state,
                categories: action.categories,
            }
            break;
        case constants.CATEGORIES_LOADING:
            return {
                ...state,
                categoriesLoading: action.categoriesLoading,
            }
            break;
        case constants.CATEGORIES_ERROR:
            return {
                ...state,
                categoriesError: action.categoriesError,
                categoriesErrorText: action.categoriesErrorText,
                categoriesLoading: action.categoriesLoading
            }
            break;
        case constants.POSTS_RECEIVED:
            let quickPostSearch = {};
            // create a hash map of posts
            // so we can quickly retrieve
            // on detail page
            for ( let post of action.posts ) {
                quickPostSearch[post.id] = post;
            } 
            return {
                ...state,
                posts: action.posts,
                quickPostSearch
            }
            break;
        case constants.CATEGORIES_LOADING:
            return {
                ...state,
                postsLoading: action.postsLoading,
            }
            break;
        case constants.CATEGORIES_ERROR:
            return {
                ...state,
                postsError: action.postsError,
                postsErrorText: action.postsErrorText,
                postsLoading: action.postsLoading
            }
            break;

        default:
            return state
    }
}


export default combineReducers({
    appState,
    errorMessage,
    routing: routerReducer
}
);