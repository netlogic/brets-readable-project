import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native-web'

import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import Post from '../components/Post'
import Popup from 'react-popup';

import { fetchPostDetail } from '../actions'

class PostDetails extends Component {

    componentDidMount() {
        if (this.props.params.postId) {
            this.props.fetchPostDetail(this.props.params.postId);
        }
    }

    render() {
        let me = this;
        let postId = this.props.params.postId;

        let msg;

        if (this.props.loadingPostDetail) {
            msg = "Post loading..."
        } else if (this.props.loadingPostDetailError) {
            msg = this.props.loadingPostDetailError;
        } else if (!postId) {
            msg = "No post id specified";
        } else if (!this.props.postDetail) {
            msg = "Post loading...";
        } else if ( this.props.postDetail.deleted === undefined || this.props.postDetail.deleted ) {
            msg = "Post not found (perhaps deleted, please check id)"
        }

        if (msg) {
            return (<View style={styles.appheader}>
                <TouchableHighlight onPress={() => {
                    me.props.goBack();
                }}>
                    <Text style={styles.headerLine1}>{'<BACK'}</Text>
                </TouchableHighlight>
                <Text style={{marginLeft:50}}>{msg}</Text>
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
                    <Text style={styles.headerLine1}>{this.props.postDetail.title}</Text>
                </View>
                <View style={{ marginLeft: 15 }}>
                    <Post post={this.props.postDetail} detailed={true} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    time: state.appState.time,
    postDetail: state.appState.postDetail,
    loadingPostDetail: state.appState.postDetailLoading,
    loadingPostDetailError: state.appState.postDetailErrorLoading,
})

function mapDispatchToProps(dispatch) {
    return {
        goBack: () => dispatch(goBack()),
        fetchPostDetail: (postId) => dispatch(fetchPostDetail(postId)),
        dispatch,

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
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
    }
}
);