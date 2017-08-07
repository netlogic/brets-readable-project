import React, { Component } from 'react'
import { View, Text } from 'react-native-web'


class Posts extends Component {
    render() {
        let me = this;
        return (
            <View style={{ height: 100, backgroundColor: 'red' }}>
                <Text>{me.props.params.type}</Text>
            </View>
        )
    }
}

export default Posts;
