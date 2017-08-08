import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight, Text, StyleSheet } from 'react-native-web'

import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import Popup from 'react-popup';

import { setAddPostTitle, setAddPostBody, setAddPostAuthor, 
            setAddPostCategory, fetchPostDetail, addPost } from '../actions'

class AddPost extends Component {

    componentDidMount() {
        if (this.props.params.postId) {
            this.props.fetchPostDetail(this.props.params.postId);
        }
    }

    render() {
        let me = this;
        let props = me.props;
        let msg;
        let postId = props.params.postId;

        if (this.props.loadingPostDetail) {
            msg = "Post loading..."
        } else if (this.props.loadingPostDetailError) {
            msg = this.props.loadingPostDetailError;
        } else if (!postId) {
            msg = "No post id specified";
        } else if (!this.props.postDetail) {
            msg = "Post loading...";
        }

        if (msg) {
            return (<View style={styles.appheader}>
                <TouchableHighlight onPress={() => {
                    me.props.goBack();
                }}>
                    <Text style={styles.headerLine1}>{'<BACK'}</Text>
                </TouchableHighlight>
                <Text>{msg}</Text>
            </View>);
        }

        return (
            <View style={styles.container}>
                <Popup />
                <View style={styles.appheader}>
                    <TouchableHighlight onPress={() => {
                        me.props.goBack();
                    }}>
                        <Text style={styles.headerLine1}>{'<BACK    '}</Text>
                    </TouchableHighlight>
                    <Text style={styles.headerLine1}>Edit Post</Text>
                    <TouchableHighlight style={{ marginLeft: 50 }} onPress={() => {
                        props.addPost(postId, props.title, props.body);
                        me.props.goBack();
                    }}>
                        <Text style={props.valid ? styles.addBtnActive : styles.addBtn} >DONE!</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.headerLine2}>Please edit any information below and press Add!</Text>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputTitle}>Title:</Text>
                        <TextInput style={styles.inputText} placeholder='title' onChange={(event) => {
                            me.props.setAddPostTitle(event.target.value);
                        }} value={props.title} />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputTitle}>Body:</Text>
                        <TextInput style={styles.inputText} placeholder='body' onChange={(event) => {
                            me.props.setAddPostBody(event.target.value);
                        }} value={props.body} />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    title: state.addPost.title,
    author: state.addPost.author,
    category: state.addPost.category,
    body: state.addPost.body,
    valid: state.addPost.valid,
    postDetail: state.appState.postDetail,
    loadingPostDetail: state.appState.postDetailLoading,
    loadingPostDetailError: state.appState.postDetailErrorLoading,
})

function mapDispatchToProps(dispatch) {
    return {
        goBack: () => dispatch(goBack()),
        setAddPostTitle: (val) => dispatch(setAddPostTitle(val)),
        setAddPostBody: (val) => dispatch(setAddPostBody(val)),
        setAddPostAuthor: (val) => dispatch(setAddPostAuthor(val)),
        setAddPostCategory: (val) => dispatch(setAddPostCategory(val)),
        fetchPostDetail: (postId) => dispatch(fetchPostDetail(postId)),
        addPost: (id,title, body, author, category) => dispatch(addPost(id,title, body, author, category)),
        dispatch,

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddPost)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        width: '100%',
    },
    appheader: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    addPostText: {
        fontSize: 16,
        backgroundColor: 'lightgray',
        color: 'black',
        width: 120,
        fontWeight: 'bold',
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        padding: 10,
    },
    addBtnActive: {
        fontSize: 16,
        backgroundColor: 'lightgray',
        color: 'blue',
        width: 120,
        fontWeight: 'bold',
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        padding: 10,
    },
    addBtn: {
        fontSize: 16,
        backgroundColor: 'lightgray',
        color: 'gray',
        width: 120,
        fontWeight: 'normal',
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        padding: 10,
    },
    headerLine1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginLeft: 15,
        marginTop: 30,
        marginBottom: 15,
    },
    headerLine2: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#333333',
        marginLeft: 15,
        marginTop: 10,
    },
    inputRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 15,
        width: 600,
    },
    inputTitle: {
        fontSize: 18,
        color: '#333333',
        fontWeight: 'normal',
        marginRight: 10,
    },
    inputText: {
        fontSize: 18,
        color: '#333333',
        fontWeight: 'normal',
        width: 600,
        height: 40,
        borderRadius: 6,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
    },
}
);