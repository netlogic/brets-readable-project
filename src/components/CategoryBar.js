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

        return (
            <View style={styles.container}>
                <Text>Category Quick Select:</Text>
                {this.props.categories && (
                    this.props.categories.map((category) => {
                        return (
                            <TouchableHighlight  key={category.name} onPress={() => {
                                me.props.changeRoute("/category/" + category.name);
                            }}>
                                <Text style={styles.categoryText}>{' ' + category.name + ' '}</Text>
                            </TouchableHighlight>
                        );
                    }
                    )
                )}
                {!this.props.categories && (
                    (
                        <Text>No Categories Loaded</Text>
                    )
                )
                }
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
        backgroundColor: '#F5FCFF',
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
         textDecoration: 'underline',
         marginRight : 10,
    }
}
);