import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight, Text, StyleSheet } from 'react-native-web'

import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import Popup from 'react-popup';

import {
    setAddPostBody,
    addComment,
    setAddPostAuthor
} from '../actions'

class AddComment extends Component {

    render() {
        let me = this;
        let props = me.props;

        if (!props.post) {
            setTimeout(
                props.goBack, 10);
            return <Text>Going back</Text>;
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
                    <Text style={styles.headerLine1}>Add Comment To Post</Text>
                    <TouchableHighlight  disabled={!props.valid}  style={{ marginLeft: 50 }} onPress={() => {
                        props.addComment(props.post, props.author, props.body);
                        me.props.goBack();
                    }}>
                        <Text style={props.valid ? styles.addBtnActive : styles.addBtn} >ADD!</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.headerLine1}>{props.post.title}</Text>
                    <Text style={styles.headerLine2}>Please enter comment below!</Text>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputTitle}>Comment:</Text>
                        <TextInput style={styles.inputText} placeholder='comment' onChange={(event) => {
                            me.props.setAddPostBody(event.target.value);
                        }} value={props.body} />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputTitle}>Author:</Text>
                        <TextInput style={styles.inputText} placeholder='author' onChange={(event) => {
                            me.props.setAddPostAuthor(event.target.value);
                        }} value={props.author} />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    author: state.addPost.author,
    body: state.addPost.body,
    valid: state.addPost.valid,
    post: state.addPost.addingComment,
})

function mapDispatchToProps(dispatch) {
    return {
        goBack: () => dispatch(goBack()),
        setAddPostBody: (val) => dispatch(setAddPostBody(val)),
        setAddPostAuthor: (val) => dispatch(setAddPostAuthor(val)),
        addComment: (post, author, body) => dispatch(addComment(post, author, body)),
        dispatch,

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddComment)

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
        flexBasis : '100'
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
        flexBasis : '100'
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