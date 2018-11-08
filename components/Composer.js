// Core
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CheckBox } from 'react-native-elements';
import { v4 } from 'uuid';
import moment from 'moment';

// Components
import AlertModal from './AlertModal';

// Actions
import { createTask } from '../bus/tasks/actions';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        { createTask },
        dispatch,
    )
});

@connect(null, mapDispatchToProps)
export default class Composer extends Component {

    state = {
        taskTitle: '',
        task: '',
        important: true,
        headers: 'Composer error message',
        visible: false,
        errorText: ''
    }

    _handleTitleInput = (text) => {
        this.setState({ taskTitle: text });
    }

    _handleTextInput = (text) => {
        this.setState({ task: text });
    }

    _handleCheckBox = () => {
        const { important } = this.state;

        this.setState({ important: !important })
    }

    _handleForm = () => {
        const { actions } = this.props;
        const { taskTitle, task, important } = this.state;

        if (!taskTitle.trim() || task.length > 50) {
            this.setState({
                errorText: 'Task title cant be blank & length more then 50 symbols!!!',
                visible: true
            });
            return (false);
        }

        if (!task.trim() || task.length > 120) {
            this.setState({
                errorText: 'Task text cant be blank & length more then 120 symbols!!!',
                visible: true
            });
            return (false);
        }

        actions.createTask({
            id: v4(),
            created: moment(),
            updated: null,
            started: null,
            ended: null,
            completed: false,
            important,
            taskTitle,
            task
        });

        this.setState({
            taskTitle: '',
            task: '',
            important: true,
        });
    }

    _handleModal = () => {
        this.setState({
            visible: false
        });
    }

    render () {
        const { taskTitle, task, important, visible, headers, errorText } = this.state;

        return (
            <View style = { styles.container }>
                <AlertModal
                    _handleModal = { this._handleModal }
                    visible = { visible }
                    headers = { headers }
                    text = { errorText }
                />
                <Text style = { styles.text } >Create your own task</Text>
                <TextInput style = { styles.input }
                    value = { taskTitle }
                    underlineColorAndroid = "transparent"
                    placeholder = "Title"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = { this._handleTitleInput }
                />
                <TextInput style = { styles.textArea }
                    value = { task }
                    multiline = { true }
                    numberOfLines = { 4 }
                    underlineColorAndroid = "transparent"
                    placeholder = "Text"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = { this._handleTextInput }
                />
                <CheckBox
                    containerStyle = { styles.checkBox }
                    title = 'Set as important'
                    checked = { important }
                    uncheckedColor = '#9a73ef'
                    checkedColor = '#9a73ef'
                    onPress = { this._handleCheckBox }
                />
                <TouchableOpacity
                    style = { styles.submitButton }
                    onPress = { this._handleForm }
                >
                    <Text style = { styles.submitButtonText }> Submit </Text>
               </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 15
    },
    input: {
        margin: 15,
        height: 40,
        paddingLeft: 10,
        borderColor: '#7a42f4',
        borderWidth: 1,
        borderRadius: 7,
        fontWeight: 'bold',
        backgroundColor: '#f9f9f9'
    },
    textArea: {
        padding: 10,
        margin: 15,
        height: 140,
        borderColor: '#7a42f4',
        borderWidth: 1,
        textAlignVertical: 'top',
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        borderRadius: 7,
        backgroundColor: '#f9f9f9'
    },
    checkBox: {
        borderColor: '#fff',
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 7
    },
    submitButtonText:{
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
