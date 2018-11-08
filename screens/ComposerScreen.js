// Core
import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

// Components
import Composer from '../components/Composer';
import Header from '../components/Header';

export default class ComposerScreen extends Component {

    static navigationOptions = {
        headerTitle: <Header />,
        headerStyle: {
            backgroundColor: '#9a73ef',
        },
    };

    render () {
        return (
            <ScrollView style = { styles.container }>
                <Composer />
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    }
});
