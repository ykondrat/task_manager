// Core
import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View , StyleSheet } from 'react-native';

export default class AlertModal extends Component {

    render () {
        const { visible, headers, text, _handleModal } = this.props;

        return (
            <Modal
                animationType = 'fade'
                transparent = { true }
                visible = { visible }
                style = { styles.main }
                onRequestClose = {() => {
                    alert('Modal has been closed.');
                }}
            >
                <View style = { styles.container } >
                    <View style = { styles.wrapper } >
                        <Text style= { styles.header } >{ headers }</Text>
                        <Text style= { styles.text } >{ text }</Text>
                        <TouchableOpacity
                            style= { styles.button }
                            onPress = { _handleModal }
                        >
                            <Text style= { styles.buttonText }>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(42, 42, 42, 0.8)',
        width: '100%',
        height: '100%',
    },
    wrapper: {
        marginTop: 120,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 7,
        backgroundColor: '#fff',
    },
    header: {
        fontWeight: 'bold',
        color: '#ff5656',
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 10
    },
    text: {
        textAlign: 'center',
        margin: 15,
    },
    button: {
        backgroundColor: '#ff5656',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 7
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
