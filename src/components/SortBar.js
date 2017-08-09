import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native-web'
import { connect } from 'react-redux'
import { setSortField, setSortAscending } from '../actions'

class SortBar extends Component {

    render() {
        let me = this;
        let categories = [ { title : "title",  field : 'title'},
                           { title : "time",  field : 'timestamp' } ,
                           { title : "votes" , field : 'voteScore' }]; 
        let activeSortField = this.props.sortField;

        return (
            <View style={styles.container}>
                <Text style={styles.displayPosts}>{'Sort\nPosts By:'}</Text>
                {categories.map((category) => {
                        return (
                            <TouchableHighlight key={category.field} onPress={() => {
                                    me.props.setSortField(category.field);
                            }}>
                                <Text style={
                                    activeSortField === category.field ?
                                        styles.categoryTextSelected :
                                        styles.categoryText}>
                                    {' ' + category.title + ' '}</Text>
                            </TouchableHighlight>
                        );
                    }
                    )
                }
                <TouchableHighlight key={'clickup'} onPress={() => {
                                    me.props.setSortAscending(true);
                            }}>
                    <Text style={me.props.ascending?styles.arrowClickerSelected:styles.arrowClicker}>&#8593;</Text>
                </TouchableHighlight>
                 <TouchableHighlight key={'clickdown'} onPress={() => {
                                    me.props.setSortAscending(false);
                            }}>
                    <Text style={!me.props.ascending?styles.arrowClickerSelected:styles.arrowClicker}>&#8595;</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    sortField: state.sorting.sortField,
    ascending : state.sorting.ascending,
})

function mapDispatchToProps(dispatch) {
    return {
        setSortField : (field) =>dispatch(setSortField(field)), 
        setSortAscending  : (flag)=>dispatch(setSortAscending(flag)),
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortBar)

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginLeft: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexBasis : '100'
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
        backgroundColor : 'lightgray',
        //textDecoration: 'underline',
        marginRight: 10,
    },
    displayPosts: {
        fontSize: 12,
        fontWeight: 'lighter',
        color: '#333333',
        marginRight: 15,
    },
    arrowClicker : {
        margin : 10,
        fontSize : 20,
    },
    arrowClickerSelected : {
        margin : 10,
        fontSize : 20,
        backgroundColor : 'lightgray',
    }
}
);