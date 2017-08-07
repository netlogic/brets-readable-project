import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native-web'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import logo from '../logo.svg';
import './App.css';

import { Link, browserHistory } from 'react-router'

import { updateTime } from '../actions'

import CategoryBar from '../components/CategoryBar'

class App extends Component {
  render() {
    let me = this;

    return (
      <View style={styles.container}>
        <View style={styles.appheader}>
          <Text style={styles.headerLine1}>Readable</Text>
          <Text style={styles.headerLine1}>An udacity project by BDS</Text>
        </View>
        <CategoryBar />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <View style={{ height: 30, backgroundColor: 'red', width: '100%' }}>
        </View>
        <Link key={'cat1'} to={{ pathname: '/categories', query: {} }}>
          Categories
        </Link>
        <Link key={'posts1'} to={'/silly'}>
          Posts
        </Link>
        <TouchableHighlight onPress={() => {
          me.props.changeRoute("/categories");
          me.props.updateTime((new Date()))
        }}>
          <View>
            <Text>here</Text>
            <Text>{this.props.time.toString()}</Text>
          </View>
        </TouchableHighlight>
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
    updateTime: (time) => dispatch(updateTime(time)),
    dispatch,

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  appheader: {
    width: '100%',
    height: 80,
    backgroundColor: '#f0f0f0',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  headerLine1: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
    marginLeft: 15,

  },
  headerLine2: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333333',
    marginLeft: 15,
  }
}
);