/** action handler for readable
 * 
 */

import * as constants from '../constants';
import uuid from 'uuid/v4';

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
        dispatch(postsLoading(true));
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

export const commentsReceived = (postId, comments) => ({
    type: constants.COMMENTS_RECEIVED,
    postId: postId,
    comments: comments
});

export const commentsError = (postId, error, errorText) => ({
    type: constants.COMMENTS_ERROR,
    error: error,
    errorText: errorText,
    commentsLoading: false,
    postId: postId,
});

export const commentsLoading = (postId, loading) => ({
    type: constants.COMMENTS_LOADING,
    commentsLoading: loading,
    postId: postId
});

export function fetchComments(postId) {
    return (dispatch) => {
        dispatch(commentsLoading(postId, true));
        fetch(buildCmdURL("posts/" + postId + "/comments"), { headers: { 'Authorization': MYTOKEN } })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(commentsLoading(postId, false));
                return response;
            })
            .then((response) => response.json())
            .then((comments) => {
                dispatch(commentsReceived(postId, comments));
            })
            .catch((e) => dispatch(commentsError(postId, true, e.toString())));
    };
}

export const setSortField = (sortField) => ({
    type: constants.SET_SORT_FIELD,
    field: sortField,
});

export const setSortAscending = (val) => ({
    type: constants.SET_SORT_ASCENDING,
    val: val,
});


export const votingComplete = (postId, upvote, post) => ({
    type: constants.VOTING_COMPLETE,
    postId: postId,
    upvote: upvote,
    post,
});

export const votingError = (postId, error, errorText) => ({
    type: constants.VOTING_ERROR,
    error: error,
    errorText: errorText,
    loading: false,
    postId: postId,
});

export const voting = (postId, loading) => ({
    type: constants.VOTING_LOADING,
    loading: loading,
    postId: postId
});

export function vote(postId, upvote) {
    return (dispatch) => {
        dispatch(voting(postId, true));
        fetch(buildCmdURL("posts/" + postId),
            {
                headers: {
                    'Authorization': MYTOKEN,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ option: upvote ? "upVote" : "downVote" })
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(voting(postId, false));
                return response;
            })
            .then((response) => response.json())
            .then((post) => {
                dispatch(votingComplete(postId, upvote, post));
            })
            .catch((e) => dispatch(votingError(postId, true, e.toString())));
    };
}

export const deletePostComplete = (postId) => ({
    type: constants.DELETE_POST_COMPLETE,
    postId: postId,
});

export const deletingPostError = (postId, error, errorText) => ({
    type: constants.DELETE_POST_ERROR,
    error: error,
    errorText: errorText,
    loading: false,
    postId: postId,
});

export const deletingPost = (postId, loading) => ({
    type: constants.DELETING_POST,
    loading: loading,
    postId: postId
});

export function deletePost(postId) {
    return (dispatch) => {
        dispatch(deletingPost(postId, true));
        fetch(buildCmdURL("posts/" + postId),
            {
                headers: {
                    'Authorization': MYTOKEN,
                },
                method: 'delete',
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(deletingPost(postId, false));
                return response;
            })
            .then(() => {
                dispatch(deletePostComplete(postId));
            })
            .catch((e) => dispatch(deletingPostError(postId, true, e.toString())));
    };
}

export const postDetailReceived = post => ({
    type: constants.POST_DETAIL_RECEIVED,
    postDetail: post,
    loadingPostDetail: false,
    loadingPostDetailError: undefined
});

export const postDetailError = (error, errorText) => ({
    type: constants.POST_DETAIL_ERROR,
    loadingPostDetailError: errorText,
    loadingPostDetail: false
});

export const postDetailLoading = (loading) => ({
    type: constants.POST_DETAIL_LOADING,
    loadingPostDetail: loading,
    loadingPostDetailError: undefined
});

export function fetchPostDetail(postId) {
    return (dispatch) => {
        dispatch(postDetailLoading(true));
        fetch(buildCmdURL("posts/" + postId), { headers: { 'Authorization': MYTOKEN } })
            .then((response) => {
                if (!response.ok || response.status === 404) {
                    throw Error(response.statusText);
                }
                dispatch(postDetailLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((post) => {
                dispatch(postDetailReceived(post));
            })
            .catch((e) => dispatch(postDetailError(true, e.toString())));
    };
}

export const addingPost = loading => ({
    type : constants.ADDINGPOST_LOADING,
    loading : loading,
});

export const addingPostError = (error, errorText) => ({
    type: constants.ADDINGPOST_ERROR,
    addingPostDetailError: errorText,
    loading: false
});

export const addedPost = post => ({
    type: constants.ADDING_POST_DETAIL_RECEIVED,
    postDetail: post,
    loading: false,
    addingPostDetailError: undefined,
    loading : false
});


export function addPost(id, title, bodyText, author, category) {
    return (dispatch) => {
        dispatch(addingPost(true));
        let method;
        let cmd ;
        let options;
        let body;

        if ( id ) {
            method = 'PUT';
            cmd = "posts/" + id;
            body = JSON.stringify({
                title: title, body: bodyText,
            })
        } else {
            method = 'POST';
            cmd = "posts";
            body = JSON.stringify({
                title: title, body: bodyText,
                timestamp: Date.now(),
                author: author, 
                category: category,
                id : uuid()
            })
        }

        fetch(buildCmdURL(cmd), {
            headers: {
                'Authorization': MYTOKEN,
                'Content-Type': 'application/json',
            },
            method: method,
            body: body,
        })
            .then((response) => {
                if (!response.ok ) {
                    throw Error(response.statusText);
                }
                dispatch(addingPost(false));
                return response;
            })
            .then((response) => response.json())
            .then((post) => {
                dispatch(addedPost(post));
            })
            .catch((e) => dispatch(addingPostError(true, e.toString())));
    };
}

export const clearPostDetail = () => ({
    type: constants.POST_DETAIL_CLEAR,
});


const intialStateAddPost = {
    title: "",
    body: "",
    author: "",
    category: "redux",
}

export const setAddPostTitle = title => ({
    type: constants.ADD_POST_TITLE,
    title: title
});

export const setAddPostBody = body => ({
    type: constants.ADD_POST_BODY,
    body: body
});

export const setAddPostAuthor = author => ({
    type: constants.ADD_POST_AUTHOR,
    author: author
});

export const setAddPostCategory = category => ({
    type: constants.ADD_POST_CATEGORY,
    category: category
});

export const clearAddPost = () => ({
    type: constants.ADD_POST_CLEAR,
});

