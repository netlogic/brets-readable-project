/** reducer for readable
 * 
 */
import * as ActionTypes from '../actions'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as constants from '../constants'


const initialErrorState = null;


const errorMessage = (state = initialErrorState, action) => {
    const { type, error } = action

    if (type === constants.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return error
    }

    return state
}

const initialSortState = {
    sortField: 'timestamp',
    ascending: false
}

const sorting = (state = initialSortState, action) => {
    switch (action.type) {
        case constants.SET_SORT_FIELD:
            return {
                ...state,
                sortField: action.field
            }
        case constants.SET_SORT_ASCENDING:
            return {
                ...state,
                ascending: action.val
            }
        default:
            return state;
    }
}

const initialState = {
    time: (new Date()),
    comments: {},
}

const appState = (state = initialState, action) => {
    let newcomments;

    switch (action.type) {
        case constants.UPDATE_TIME:
            var { time } = action
            return {
                ...state,
                time: time,
            }
        case constants.CATEGORIES_RECEIVED:
            return {
                ...state,
                categories: action.categories,
            }
        case constants.CATEGORIES_LOADING:
            return {
                ...state,
                categoriesLoading: action.categoriesLoading,
            }
        case constants.CATEGORIES_ERROR:
            return {
                ...state,
                categoriesError: action.categoriesError,
                categoriesErrorText: action.categoriesErrorText,
                categoriesLoading: action.categoriesLoading
            }
        case constants.POSTS_RECEIVED:
            let quickPostSearch = {};
            // create a hash map of posts
            // so we can quickly retrieve
            // on detail page
            for (let post of action.posts) {
                quickPostSearch[post.id] = post;
            }
            return {
                ...state,
                posts: action.posts,
                quickPostSearch
            }
        case constants.CATEGORIES_LOADING:
            return {
                ...state,
                postsLoading: action.postsLoading,
            }
        case constants.CATEGORIES_ERROR:
            return {
                ...state,
                postsError: action.postsError,
                postsErrorText: action.postsErrorText,
                postsLoading: action.postsLoading
            }
        case constants.COMMENTS_RECEIVED:
            newcomments = {
                ...state.comments,
                [action.postId]: {
                    loading: false,
                    errorLoading: false,
                    comments: action.comments,
                }
            }
            return {
                ...state,
                comments: newcomments
            }
        case constants.COMMENTS_ERROR:
            newcomments = {
                ...state.comments,
                [action.postId]: {
                    loading: false,
                    errorLoading: action.error,
                    errorText: action.errorText,
                }
            }
            return {
                ...state,
                comments: newcomments
            }
        case constants.COMMENTS_LOADING:
            newcomments = {
                ...state.comments,
                [action.postId]: {
                    loading: action.loading,
                }
            }
            return {
                ...state,
                comments: newcomments
            }
        default:
            return state
    }
}

export default combineReducers({
    appState,
    errorMessage,
    sorting,
    routing: routerReducer
}
);