import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native-web'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchPosts } from '../actions'
import Post from './Post.js'

class Posts extends Component {

    componentDidMount() {
       this.props.fetchPosts();
    }

    render() {
        let me = this;

        // display all posts not deleted.
        let displayPosts =me.props.posts ? me.props.posts.filter( (post) => !post.deleted  ) : null;

        return (
            <View style={styles.container}>
                <Text>Category Quick Select:</Text>
                {displayPosts && (
                    displayPosts.map((post) => {
                        console.log(post);
                        return (
                            <Post id={post.id} post={post}/>
                        );
                    })
                )}
                {this.props.errorLoading && (
                    (
                        <Text>this.props.errorText</Text>
                    )
                )
                }
                {this.props.loading && (
                    <Text>Loading Categories</Text>
                )}
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    posts: state.appState.posts,
    loading: state.appState.postsLoading,
    errorLoading: state.appState.postsError,
    errorText: state.appState.postsErrorText,
})

function mapDispatchToProps(dispatch) {
    return {
        changeRoute: (url) => dispatch(push(url)),
        fetchPosts: () => dispatch(fetchPosts()),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)

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
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
        // textDecoration: 'underline',
         marginRight : 10,
    }
}
);