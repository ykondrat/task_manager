import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import Logo from '../assets/images/logo.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        marginLeft: 15,
        width: 30,
        height: 30
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        paddingLeft: 10
    }
});

export default class Header extends Component {

    render () {
        return (
            <View style = { styles.container }>
                <Image
                    source = { Logo }
                    style = { styles.img }
                />
                <Text style = { styles.text } >React & Redux App</Text>
            </View>
        );
    }
}
