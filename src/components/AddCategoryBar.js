import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native-web'
import { connect } from 'react-redux'
import { fetchCategories, setAddPostCategory } from '../actions'

class AddCategoryBar extends Component {

    componentDidMount() {
        if (!this.props.categories) {
            this.props.fetchCategories();
        }
    }

    render() {
        let me = this;
        let categories = this.props.categories;
        let activeCategory = this.props.activeCategory;

        return (
            <View style={styles.container}>
                <Text style={styles.displayPosts}>{'Select Category:'}</Text>
                {categories && (
                    categories.map((category) => {
                        return (
                            <TouchableHighlight key={category.name} onPress={() => {
                                me.props.setAddPostCategory(category.name);
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
    activeCategory: state.addPost.category,
})

function mapDispatchToProps(dispatch) {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        setAddPostCategory: (val) => dispatch(setAddPostCategory(val)),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryBar)

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
        fontSize: 14,
        fontWeight: 'normal',
        color: 'gray',
        //textDecoration: 'underline',
        marginRight: 10,
    },
    categoryTextSelected: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'lightgray',
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