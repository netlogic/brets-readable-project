import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native-web'
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import { fetchComments, voteComment, vote, 
        deleteComment,
        deletePost, clearPostDetail, clearAddPost } from '../actions'
import Popup from 'react-popup';

function keepShort(a, len) {
    if (a && (a.length > len)) {
        a = a.substr(0, len - 3);
        return a + "...";
    }
    return a;
}

const Margin = () => {
    return <View style={{
        height: 1, width: 290,
        alignSelf: 'flex-start',
        marginBottom: 15, marginTop: 15, marginRight: 15, backgroundColor: 'lightgray'
    }} />;
}

class Post extends Component {

    componentDidMount() {
        this.props.fetchComments(this.props.post.id);
    }

    renderComments(all,postId) {
        let me = this;

        if (me.props.loading) {
            return <Text>loading comments...</Text>
        }
        if (me.props.errorLoading) {
            let errormsg = ```error loading comments (${this.props.errorText})```;
            return (<Text>{errormsg}</Text>);
        }
        let commentDisplay;



        if (me.props.comments.length > 0) {
            let comments = me.props.comments.sort( (a,b)=> a.timestamp < b.timestamp );
            if (all) {

                commentDisplay = comments.map((c) => {
                    let timestamp = new Date(parseInt(c.timestamp, 10));
                    let displayTime = timestamp.toLocaleTimeString("en-US") + " - " + timestamp.toLocaleDateString("en-US")

                    return (<View key={c.id}>
                        <Text style={styles.shortComment}>{c.author + " - said - " + c.body}</Text>
                        <View style={styles.infoLine}>
                            <Text style={styles.infoLineTime}>{displayTime}</Text>
                            <TouchableHighlight onPress={() => {
                                me.props.voteComment(postId,c.id, false);
                            }}>
                                <Text style={{ fontSize: 14, margin: 5 }}><span role="img" aria-labelledby="voteDown">&#128078;</span></Text>
                            </TouchableHighlight>
                            <Text>{c.voteScore}</Text>
                            <TouchableHighlight onPress={() => {
                                me.props.voteComment(postId,c.id, true );
                            }}>
                                <Text style={{ fontSize: 14, margin: 5 }}><span role="img" aria-labelledby="voteUp">&#128077;</span></Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => {
                                me.handleDeleteComment(postId,c.id);
                            }}>
                                <Text style={{ fontSize: 14, margin: 5 }}><span role="img" aria-labelledby="delete">&#128465;</span></Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => {
                                //me.handleEditPost(post);
                            }}>
                                <Text style={{ fontSize: 14, margin: 5 }}><span role="img" aria-labelledby="edit">&#x1F4DD;</span></Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    )
                });

            } else {
                // show a preview comment
                // for the first comment lets display something
                console.log(this.props.comments[0]);
                let comment = comments[0];
                commentDisplay = <Text style={styles.shortComment}>{comment.author + " - said - " + keepShort(comment.body, 20)}</Text>
            }
        }

        return (<View key="comments">
            <View style={styles.commentHeader}>
                <Text style={styles.commentHeaderText}>{'# comments: ' + this.props.comments.length}</Text>
                <TouchableHighlight onPress={() => {
                    me.showDetailPost();
                }}>
                    <Text style={styles.addCommentText}>ADD COMMENT</Text>
                </TouchableHighlight>
            </View>
            {commentDisplay}
        </View>
        )
    }

    showDetailPost(post) {
        this.props.clearPostDetail();
        this.props.changeRoute("/" + post.category + "/" + post.id);
    }

    render() {
        let me = this;
        let { post, detailed } = me.props;

        console.log(post);

        let timestamp = new Date(parseInt(post.timestamp, 10));
        let displayTime = timestamp.toLocaleTimeString("en-US") + " - " + timestamp.toLocaleDateString("en-US")

        return (
            <View>
                {!detailed && (
                    <TouchableHighlight key={post.id} onPress={() => {
                        me.showDetailPost(post);
                    }}>
                        <Text style={styles.categoryText}>{keepShort(post.title, 50)}</Text>
                    </TouchableHighlight>
                )}
                {detailed && (
                    <Text style={styles.textDetailed}>{post.title}</Text>
                )
                }
                <Text numberOfLines={1} key="title" style={styles.bodyLine}>{keepShort(post.body, detailed ? 1024 : 60)}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text><span role="img" aria-labelledby="author">&#x1f464;</span></Text>
                    <Text style={styles.infoLineText}>{post.author}</Text>
                </View>
                <View style={styles.infoLine}>
                    <TouchableHighlight onPress={() => {
                        me.props.changeRoute("/" + post.category);
                    }}>
                        <Text style={styles.infoLineText}>{'Category: ' + post.category}</Text>
                    </TouchableHighlight>
                    <Text style={styles.infoLineTime}>{displayTime}</Text>

                    <TouchableHighlight onPress={() => {
                        me.props.vote(post.id, false);
                    }}>
                        <Text style={{ fontSize: 20, margin: 5 }}><span role="img" aria-labelledby="voteDown">&#128078;</span></Text>
                    </TouchableHighlight>
                    <Text>{post.voteScore}</Text>
                    <TouchableHighlight onPress={() => {
                        me.props.vote(post.id, true);
                    }}>
                        <Text style={{ fontSize: 20, margin: 5 }}><span role="img" aria-labelledby="voteUp">&#128077;</span></Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {
                        me.handleDelete(post);
                    }}>
                        <Text style={{ fontSize: 20, margin: 5 }}><span role="img" aria-labelledby="delete">&#128465;</span></Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {
                        me.handleEditPost(post);
                    }}>
                        <Text style={{ fontSize: 20, margin: 5 }}><span role="img" aria-labelledby="edit">&#x1F4DD;</span></Text>
                    </TouchableHighlight>
                </View>
                {this.renderComments(detailed, post.id)}
                {!this.props.detailed && (
                    [
                        <TouchableHighlight key="showDetailsBottom" onPress={() => {
                            me.showDetailPost(post);
                        }}>
                            <Text style={styles.seeAllDetailsText}>See all details</Text>
                        </TouchableHighlight>,
                        <Margin key="marbot" />]
                )}
            </View >
        );
    }

    handleEditPost(post) {
        this.props.clearAddPost();
        this.props.changeRoute("/editPost/" + post.id);
    }

    handleDeleteComment(postId,cid) {
        let me = this;
        Popup.registerPlugin('deletePost', function (callback) {
            this.create({
                title: 'Delete Comment',
                content: <Text>{"Are you sure you want to delete this comment?"}</Text>,
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
            me.props.deleteComment(postId,cid);
        });
    }


    handleDelete(post) {
        let me = this;
        Popup.registerPlugin('deletePost', function (callback) {
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
            if (me.props.detailed) {
                me.props.goBack();
            }
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
        goBack: () => dispatch(goBack()),
        changeRoute: (url) => dispatch(push(url)),
        fetchComments: (postId) => dispatch(fetchComments(postId)),
        vote: (postId, upvote) => dispatch(vote(postId, upvote)),
        voteComment: (postId, commentId, upvote) => dispatch(voteComment(postId, commentId, upvote)),
        deletePost: (postId) => dispatch(deletePost(postId)),
        clearPostDetail: () => dispatch(clearPostDetail()),
        clearAddPost: () => dispatch(clearAddPost()),
        deleteComment: (postId, commentId) => dispatch(deleteComment(postId, commentId)),
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
    textDetailed: {
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
    },
    commentHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
    },
    addCommentText: {
        fontSize: 10,
        color: 'blue',
        backgroundColor: 'lightgray',
        padding: 6,
        borderRadius: 6,
        marginLeft: 30,
    }
}
);