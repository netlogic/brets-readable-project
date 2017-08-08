import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native-web'
import { connect } from 'react-redux'
import { push  } from 'react-router-redux'
import {fetchComments} from '../actions'

function keepShort(a, len) {
    if (a.length > len) {
        a = a.substr(0, len - 3);
        return a + "...";
    }
    return a;
}

class Post extends Component {

    componentDidMount() {
       this.props.fetchComments(this.props.post.id);
    }

    renderComments() {
        if ( this.props.loading  ) {
            return <Text>loading comments...</Text>
        }
        if ( this.props.errorLoading ) {
            let errormsg = ```error loading comments (${this.props.errorText})```;
            return (<Text>{errormsg}</Text>);
        }
        return ( <Text>{this.props.comments.length}</Text> );
    }

    render() {
        let me = this;
        let { post } = me.props;

        console.log(post);

        let timestamp = new Date( parseInt(post.timestamp));
        let displayTime = timestamp.toLocaleTimeString("en-US") + " - " + timestamp.toLocaleDateString("en-US") 

        return (
            <View>

                <TouchableHighlight key={post.id} onPress={() => {
                    me.props.changeRoute("/category/" + post.id);
                }}>
                    <Text style={styles.categoryText}>{keepShort(post.title, 50)}</Text>
                </TouchableHighlight>
                <Text numberOfLines={1}>{keepShort(post.body, 60)}</Text>

                <View style={styles.infoLine}>
                    <Text>{post.category}</Text>
                    <Text>{displayTime}</Text>
                    <Text>&#128078;</Text><Text>{post.voteScore}</Text><Text>&#128077;</Text>
                </View>
                {this.renderComments()}
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let commentsForPost = state.appState.comments[ownProps.post.id];
    if ( !commentsForPost ) {
        commentsForPost = { comments : [] ,loading : false, errorLoading : false, errorText : null };
    }
    return   {
        comments: commentsForPost.comments || [] ,
        loading: commentsForPost.loading,
        errorLoading: commentsForPost.errorLoading,
        errorText: commentsForPost.errorText,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeRoute: (url) => dispatch(push(url)),
        fetchComments: (postId) => dispatch(fetchComments(postId)),
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
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
        //textDecoration: 'underline',
        marginRight: 10,
    }
}
);