import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native-web'

import { connect } from 'react-redux'

import { push } from 'react-router-redux'

import CategoryBar from '../components/CategoryBar'
import SortBar from '../components/SortBar'
import Posts from '../components/Posts'
import Popup from 'react-popup';

import {clearAddPost} from '../actions'

class App extends Component {
  render() {
    let me = this;
    let keyVal = this.props.params.type || "default"
    
    return (
      <View style={styles.container}>
        <Popup/>
        <View style={styles.appheader}>
          <Text style={styles.headerLine1}>Readable</Text>
          <Text style={styles.headerLine2}> - (An udacity project by BDS)</Text>
          <TouchableHighlight style={{marginLeft:50}} onPress={
              ()=>{
                  me.props.clearAddPost();
                  me.props.changeRoute("/addPost");
              }
          }>
            <Text style={styles.addPostText} >ADD POST</Text>
          </TouchableHighlight>
        </View>
        <CategoryBar key={keyVal+"catbar"} activeCategory={this.props.params.category}/>
        <SortBar/>
        <Posts  key={keyVal+"posts"}  activeCategory={this.props.params.category}/>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  time: state.appState.time,
})

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    clearAddPost : () => dispatch(clearAddPost()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

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
  addPostText : {
      fontSize: 16,
      backgroundColor : 'lightgray',
      color : 'black',
      width : 120,
      fontWeight : 'bold',
      borderRadius : 10,
      overflow : 'hidden',
      textAlign : 'center',
      padding : 10,
  },
  headerLine1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 15,
    marginTop : 15,
    marginBottom : 15,
  },
  headerLine2: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#333333',
    marginLeft: 15,
  }
}
);