import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native-web'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchComments, vote, deletePost, clearPostDetail } from '../actions'
import Popup from 'react-popup';

function keepShort(a, len) {
    if (a.length > len) {
        a = a.substr(0, len - 3);
        return a + "...";
    }
    return a;
}

const Margin = () => {
    return <View style={{
        height: 1, width: 290,
        alignSelf: 'flexStart',
        marginBottom: 15, marginTop: 15, marginRight: 15, backgroundColor: 'lightgray'
    }} />;
}

class Post extends Component {

    componentDidMount() {
        this.props.fetchComments(this.props.post.id);
    }

    renderComments(all) {
        if (this.props.loading) {
            return <Text>loading comments...</Text>
        }
        if (this.props.errorLoading) {
            let errormsg = ```error loading comments (${this.props.errorText})```;
            return (<Text>{errormsg}</Text>);
        }
        let commentDisplay;

        if (this.props.comments.length > 0) {
            // for the first comment lets display something
            console.log(this.props.comments[0]);
            let comment = this.props.comments[0];
            commentDisplay = <Text style={styles.shortComment}>{comment.author + " - said - " + keepShort(comment.body, 20)}</Text>
        }
        return (<View key="comments">
            <Text style={styles.commentHeaderText}>{'# comments: ' + this.props.comments.length}</Text>
            {commentDisplay}
        </View>
        )
    }

    showDetailPost(postId) {
        this.props.clearPostDetail();
        this.props.changeRoute("/postDetail/" + postId);
    }

    render() {
        let me = this;
        let { post , detailed } = me.props;

        console.log(post);

        let timestamp = new Date(parseInt(post.timestamp));
        let displayTime = timestamp.toLocaleTimeString("en-US") + " - " + timestamp.toLocaleDateString("en-US")

        return (
            <View>
                {!detailed && (
                    <TouchableHighlight key={post.id} onPress={() => {
                        me.showDetailPost(post.id);
                    }}>
                        <Text style={styles.categoryText}>{keepShort(post.title,  50)}</Text>
                    </TouchableHighlight>
                )}
                {detailed && (
                    <Text style={styles.textDetailed}>{post.title}</Text>
                ) 
                }
                <Text numberOfLines={1} key="title" style={styles.bodyLine}>{keepShort(post.body, detailed ? 1024 : 60)}</Text>
                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    <Text>&#x1f464;</Text>
                    <Text style={styles.infoLineText}>{post.author}</Text>
                </View>
                <View style={styles.infoLine}>
                    <TouchableHighlight onPress={() => {
                        me.props.changeRoute("/category/" + post.category);
                    }}>
                        <Text style={styles.infoLineText}>{'Category: ' + post.category}</Text>
                    </TouchableHighlight>
                    <Text style={styles.infoLineTime}>{displayTime}</Text>

                    <TouchableHighlight onPress={() => {
                        me.props.vote(post.id, false);
                    }}>
                        <Text style={{ fontSize: 20, margin: 5 }}>&#128078;</Text>
                    </TouchableHighlight>
                    <Text>{post.voteScore}</Text>
                    <TouchableHighlight onPress={() => {
                        me.props.vote(post.id, true);
                    }}>
                        <Text style={{ fontSize: 20, margin: 5 }}>&#128077;</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {
                        me.handleDelete(post);
                    }}>
                        <Text style={{ fontSize: 20, margin: 5 }}>&#128465;</Text>
                    </TouchableHighlight>
                </View>
                {this.renderComments(true)}
                {!this.props.detailed && (
                        [
                        <TouchableHighlight key="showDetailsBottom" onPress={() => {
                            me.showDetailPost(post.id);
                        }}>
                            <Text style={styles.seeAllDetailsText}>See all details</Text>
                        </TouchableHighlight>,
                         <Margin key="marbot"/> ]
                )}
            </View >
        );
    }


    handleDelete(post) {
        let me = this;
        Popup.registerPlugin('deletePost', function (callback) {
            let promptValue = null;
            let promptChange = function (value) {
                promptValue = value;
            };

            this.create({
                title: 'Delete Post',
                content: <Text>{"Are you sure you want to delete post '" + post.title + "'"}</Text>,
                buttons: {
                    left: ['cancel'],
                    right: [{
                        text: 'DELETE',
                        className: 'success',
                        action: function () {
                            callback(true);
                            Popup.close();
                        }
                    }]
                }
            });
        });
        Popup.plugins().deletePost(function (value) {
            me.props.deletePost(post.id);
        });
    }
}



const mapStateToProps = (state, ownProps) => {
    let commentsForPost = state.appState.comments[ownProps.post.id];
    if (!commentsForPost) {
        commentsForPost = { comments: [], loading: false, errorLoading: false, errorText: null };
    }
    return {
        comments: commentsForPost.comments || [],
        loading: commentsForPost.loading,
        errorLoading: commentsForPost.errorLoading,
        errorText: commentsForPost.errorText,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeRoute: (url) => dispatch(push(url)),
        fetchComments: (postId) => dispatch(fetchComments(postId)),
        vote: (postId, upvote) => dispatch(vote(postId, upvote)),
        deletePost: (postId) => dispatch(deletePost(postId)),
        clearPostDetail: () => dispatch(clearPostDetail()),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    infoLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
        //textDecoration: 'underline',
        marginRight: 10,
    },
    textDetailed : {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginRight: 10,
    },
    infoLineText: {
        fontSize: 12,
        fontWeight: 'lighter',
        color: '#333333'
    },
    infoLineTime: {
        fontSize: 12,
        fontWeight: 'lighter',
        color: '#333333',
        marginLeft: 5,
        marginLeft: 5,
    },
    bodyLine: {
        fontSize: 14,
        fontWeight: 'lighter',
        color: '#333333'
    },
    commentHeaderText: {
        fontSize: 12,
        fontWeight: 'lighter',
        color: '#333333',
        marginLeft: 5,
        marginLeft: 5,
    },
    shortComment: {
        fontSize: 12,
        fontWeight: 'lighter',
        color: '#333333',
        marginLeft: 30,
    },
    seeAllDetailsText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'blue',
        marginLeft: 45,
        marginTop: 10
    }
}
);