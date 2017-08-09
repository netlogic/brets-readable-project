import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native-web'
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
        let { activeCategory , sortField, ascending } = this.props ;
        let numberOfPosts

        // display all posts not deleted.
        let displayPosts =me.props.posts ? me.props.posts.filter( (post) => !post.deleted  ) : null;

        if ( displayPosts && activeCategory ) {
            displayPosts = displayPosts.filter ( post => post.category===activeCategory)
        }

        // now sort posts based on criteria
        if ( displayPosts ) {
            displayPosts.sort( 
                    (a,b)=> {
                        if ( ascending ) {
                            return a[sortField] >= b[sortField];
                        } else {
                            return a[sortField] <= b[sortField];
                        }
                    }
            );
            numberOfPosts = displayPosts.length;
        } else {
            numberOfPosts = 0;
        }

        
        return (
            <View style={styles.container}>
                <Text style={styles.numberOfPostsText}>{'Number of Posts: ' + numberOfPosts}</Text>
                {displayPosts && (
                    displayPosts.map((post) => {
                        return (
                            <Post key={post.id} post={post}/>
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
                    <Text>Loading Posts...</Text>
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
    sortField: state.sorting.sortField,
    ascending : state.sorting.ascending,
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
        marginTop: 5,
        marginBottom: 20,
        marginLeft: 15,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
    },
    numberOfPostsText : {
        fontSize : 12,
        color : '#333333',
        marginBottom : 15,
    }
}
);