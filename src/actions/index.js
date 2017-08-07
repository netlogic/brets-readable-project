/** action handler for readable
 * 
 */

import * as constants from '../constants';

const HOST_URL = "http://localhost:5001/";
const MYTOKEN = Math.random() * 100;

export function updateTime(newtime) {
    return {
        type: constants.UPDATE_TIME,
        time: newtime
    }
}

export const resetErrorMessage = () => ({
    type: constants.RESET_ERROR_MESSAGE
});

function buildCmdURL(cmd) {
    return HOST_URL + cmd;
}


export const categoriesReceived = categories => ({
    type: constants.CATEGORIES_RECEIVED,
    categories: categories.categories
});

export const categoriesError = (error, errorText) => ({
    type: constants.CATEGORIES_ERROR,
    categoriesError: error,
    categoriesErrorText: errorText,
    categoriesLoading: false
});

export const categoriesLoading = (loading) => ({
    type: constants.CATEGORIES_LOADING,
    categoriesLoading: loading
});

export function fetchCategories() {
    return (dispatch) => {
        dispatch(categoriesLoading(true));
        fetch(buildCmdURL("categories"), { headers: { 'Authorization': MYTOKEN } })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(categoriesLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((categories) => {
                dispatch(categoriesReceived(categories));
            })
            .catch((e) => dispatch(categoriesError(true, e.toString())));
    };
}

export const postsReceived = posts => ({
    type: constants.POSTS_RECEIVED,
    posts: posts
});

export const postsError = (error, errorText) => ({
    type: constants.POSTS_ERROR,
    postError: error,
    postErrorText: errorText,
    postsLoading: false
});

export const postsLoading = (loading) => ({
    type: constants.POSTS_LOADING,
    categoriesLoading: loading
});

export function fetchPosts() {
    return (dispatch) => {
        dispatch(categoriesLoading(true));
        fetch(buildCmdURL("posts"), { headers: { 'Authorization': MYTOKEN } })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(postsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((posts) => {
                dispatch(postsReceived(posts));
            })
            .catch((e) => dispatch(postsError(true, e.toString())));
    };
}