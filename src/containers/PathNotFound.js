import React from 'react';

import { View, Text } from 'react-native-web'

const PathNotFound = () => (
    <View style={{
        position: 'absolute',
        top: 0, bottom: 0, right: 0, left: 0, flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }}>
        <Text style={{ fontSize: 26, color: 'red' }}>404 page not found</Text>
        <Text style={{
            textAlign: 'center',
            marginTop: 30,
            fontSize: 32, color: 'black'
        }}>
            {'WOW!!! We can\'t find\nthe page you are looking for!'}
        </Text>
    </View>
)

export default PathNotFound;

