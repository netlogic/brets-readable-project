import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native-web'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchCategories } from '../actions'

class CategoryBar extends Component {

    componentDidMount() {
        if (!this.props.categories) {
            this.props.fetchCategories();
        }
    }

    render() {
        let me = this;
        let categories = this.props.categories;
        let activeCategory = this.props.activeCategory || "ALL";

        if (categories) {
            categories = categories.slice();
            categories.push({ name: "all" });
        }

        return (
            <View style={styles.container}>
                <Text style={styles.displayPosts}>{'Display Posts\nBy Categories:'}</Text>
                {categories && (
                    categories.map((category) => {
                        return (
                            <TouchableHighlight key={category.name} onPress={() => {
                                if (category.name === 'ALL') {
                                    me.props.changeRoute("/");
                                } else {
                                    me.props.changeRoute("/category/" + category.name);
                                }
                            }}>
                                <Text style={
                                    activeCategory === category.name ?
                                        styles.categoryTextSelected :
                                        styles.categoryText}>
                                    {' ' + category.name + ' '}</Text>
                            </TouchableHighlight>
                        );
                    }
                    )
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
    categories: state.appState.categories,
    loading: state.appState.categoriesLoading,
    errorLoading: state.appState.categoriesError,
    errorText: state.appState.categoriesErrorText,
})

function mapDispatchToProps(dispatch) {
    return {
        changeRoute: (url) => dispatch(push(url)),
        fetchCategories: () => dispatch(fetchCategories()),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBar)

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: 'gray',
        //textDecoration: 'underline',
        marginRight: 10,
    },
    categoryTextSelected: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor : 'lightgray',
        //textDecoration: 'underline',
        marginRight: 10,
    },
    displayPosts: {
        fontSize: 12,
        fontWeight: 'lighter',
        color: '#333333',
        marginRight: 15,
    }
}
);