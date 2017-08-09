/** reducer for readable
 * 
 */
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

/** update a post with additional information
 * about its vote processing
 */
function updatePost(state, postId, error, errorText, loading, post) {
    if (!state.posts) {
        return state;
    }

    let newPosts = state.posts.filter((a) => a.id !== postId);
    let oldPost = state.quickPostSearch[postId];
    if (!oldPost) {
        return state;
    }

    // make a new post object 
    let newPost;

    let postDetail = state.postDetail;
    let setNewPostDetail = false;

    if (post) {
        newPost = {
            ...post,
            votingError: error,
            votingErrorText: errorText,
            voting: loading
        }
        if (postDetail && postDetail.id === post.id) {
            postDetail = newPost;
            setNewPostDetail = true;
        }
    } else {
        newPost = {
            ...oldPost,
            votingError: error,
            votingErrorText: errorText,
            voting: loading
        }
    }

    newPosts.push(newPost);

    let newQuickPostSearch = Object.assign({}, state.quickPostSearch);
    newQuickPostSearch[newPost.id] = newPost;

    if (setNewPostDetail) {
        return {
            ...state,
            posts: newPosts,
            quickPostSearch: newQuickPostSearch,
            postDetail
        }
    } else {

        return {
            ...state,
            posts: newPosts,
            quickPostSearch: newQuickPostSearch
        }
    }
}


/** delete a post with info
 * about its deletion processing
 */
function deletingPost(state, postId, error, errorText, loading, post) {
    if (!state.posts) {
        return state;
    }

    let newPosts = state.posts.filter((a) => a.id !== postId);
    let oldPost = state.quickPostSearch[postId];
    if (!oldPost) {
        return state;
    }

    // make a new post object 
    let newPost;
    let newQuickPostSearch = Object.assign({}, state.quickPostSearch);


    if (post) {
        // we need to remove this post from the system
        // do to new posts
        delete newQuickPostSearch[postId]; // remove the post property
    } else {


        newPost = {
            ...oldPost,
            deletingError: error,
            deletingErrorText: errorText,
            deleting: loading
        }
        newPosts.push(newPost);
        newQuickPostSearch[newPost.id] = newPost;
    }
    return {
        ...state,
        posts: newPosts,
        newQuickPostSearch
    }
}

function buildNewCommentArray(commentsHolder, comment, deletedId) {
    if (!commentsHolder) {
        commentsHolder = {};
    }
    let comments = commentsHolder.comments;
    if (!comments) {
        comments = [];
    }
    let removeId = deletedId || (comment ? comment.id : undefined);
    comments = comments.filter((a) => {
        return (!a.deleted && a.id !== removeId);
    });
    if (comment) {
        comments.push(comment);
    }
    return comments;
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
        case constants.POST_DETAIL_CLEAR:
            return {
                ...state,
                postDetail: undefined,
                loadingPostDetail: false,
                loadingPostDetailError: undefined
            }
        case constants.POST_DETAIL_RECEIVED:
            return {
                ...state,
                postDetail: action.postDetail,
                loadingPostDetail: action.loadingPostDetail,
                loadingPostDetailError: action.loadingPostDetailError
            }
        case constants.POST_DETAIL_ERROR:
            return {
                ...state,
                postDetail: action.postDetail,
                loadingPostDetail: action.loadingPostDetail,
                loadingPostDetailError: action.loadingPostDetailError
            }
        case constants.POST_DETAIL_LOADING:
            return {
                ...state,
                postDetail: action.postDetail,
                loadingPostDetail: action.loadingPostDetail,
                loadingPostDetailError: action.loadingPostDetailError
            }
        case constants.POSTS_LOADING:
            return {
                ...state,
                postsLoading: action.postsLoading,
            }
        case constants.POSTS_ERROR:
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
                    comments: action.comments ? action.comments.filter((a) => !a.deleted) : [],
                }
            }
            return {
                ...state,
                comments: newcomments
            }
        case constants.VOTING_COMMENT_COMPLETE:
            newcomments = {
                ...state.comments,
                [action.comment.parentId]: {
                    loading: false,
                    errorLoading: false,
                    comments: buildNewCommentArray(state.comments ? (state.comments[action.comment.parentId]) : [], action.comment),
                }
            }
            return {
                ...state,
                comments: newcomments
            }
        case constants.ADDED_COMMENT:
            newcomments = {
                ...state.comments,
                [action.comment.parentId]: {
                    loading: false,
                    errorLoading: false,
                    loadingPostDetail: undefined,
                    loadingPostDetailError: undefined,
                    comments: buildNewCommentArray(state.comments ? (state.comments[action.comment.parentId]) : [], action.comment),
                }
            }
            return {
                ...state,
                comments: newcomments
            }
        case constants.DELETE_COMMENT_COMPLETE:
            newcomments = {
                ...state.comments,
                [action.postId]: {
                    loading: false,
                    errorLoading: false,
                    comments: buildNewCommentArray(state.comments ? (state.comments[action.postId]) : [], null, action.commentId),
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
        case constants.VOTING_COMPLETE:
            return updatePost(state, action.postId, undefined, undefined, false, action.post);

        case constants.VOTING_ERROR:
            return updatePost(state, action.postId, action.error, action.errorText, false, undefined);

        case constants.VOTING_LOADING:
            return updatePost(state, action.postId, undefined, undefined, action.loading, undefined);

        case constants.DELETE_POST_COMPLETE:
            return deletingPost(state, action.postId, undefined, undefined, false, action.postId);

        case constants.DELETE_POST_ERROR:
            return deletingPost(state, action.postId, action.error, action.errorText, false, undefined);
        case constants.DELETING_POST:
            return deletingPost(state, action.postId, undefined, undefined, action.loading, undefined);

        case constants.ADDING_POST_DETAIL_RECEIVED:
            return state;

        default:
            return state
    }
}


const intialStateAddPost = {
    title: "",
    body: "",
    author: "",
    category: "redux",
    valid: false,
    oldPostId: undefined,
    addingComment: undefined,
}

function addPostValid(p, t, b, a, c) {
    if (p && b && b.length && a && a.length) {
        return true;
    }
    if (a && a.length > 0) {
        if (b && b.length > 0) {
            if (c && c.length > 0) {
                if (t && t.length > 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

const addPost = (state = intialStateAddPost, action) => {
    switch (action.type) {
        case constants.ADD_POST_TITLE:
            return {
                ...state,
                title: action.title,
                valid: addPostValid(state.addingComment, action.title, state.body, state.author, state.category)
            }
        case constants.ADD_POST_BODY:
            return {
                ...state,
                body: action.body,
                valid: addPostValid(state.addingComment, state.title, action.body, state.author, state.category)
            }
        case constants.ADD_POST_AUTHOR:
            return {
                ...state,
                author: action.author,
                valid: addPostValid(state.addingComment, state.title, state.body, action.author, state.category)
            }
        case constants.ADD_POST_CATEGORY:
            return {
                ...state,
                category: action.category,
                valid: addPostValid(state.addingComment, state.title, state.body, state.author, action.category)
            }
        case constants.ADD_POST_CLEAR:
            return {
                ...state,
                title: "",
                body: "",
                author: "",
                category: "redux",
                valid: false,
                loading: false,
                oldPostId: undefined,
                addingPostDetailError: undefined,
                addingComment: undefined,
            }
        case constants.ADDING_COMMENT:
            return {
                ...state,
                addingComment: action.post
            }
        case constants.ADDINGPOST_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case constants.ADDINGPOST_ERROR:
            return {
                ...state,
                addingPostDetailError: action.addingPostDetailError,
                loading: false,
            }
        case constants.ADDING_POST_DETAIL_RECEIVED:
            return {
                ...state,
                addingPostDetailError: undefined,
                loading: false,
                addingPostDetail: false,
            }
        case constants.POST_DETAIL_RECEIVED:
            return {
                ...state,
                oldPostId: action.postDetail.id,
                title: action.postDetail.title,
                body: action.postDetail.body,
                category: action.postDetail.category,
                author: action.postDetail.author,
            }
        default:
            return state;
    }
}

export const addingPost = loading => ({
    type: constants.ADDINGPOST_LOADING,
    loading: loading,
});

export const addingPostError = (error, errorText) => ({
    type: constants.ADDINGPOST_ERROR,
    addingPostDetailError: errorText,
    addingPostDetail: false
});

export const addedPost = post => ({
    type: constants.ADDING_POST_DETAIL_RECEIVED,
    postDetail: post,
    addingPostDetail: false,
    addingPostDetailError: undefined
});




export default combineReducers({
    appState,
    errorMessage,
    sorting,
    addPost,
    routing: routerReducer
}
);