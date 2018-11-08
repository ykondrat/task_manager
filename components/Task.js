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
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { merge } from 'immutable';

// Components
import AlertModal from './AlertModal';

// Actions
import { removeTask, updateTask } from '../bus/tasks/actions';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {
            removeTask,
            updateTask
        },
        dispatch,
    )
});

@connect(null, mapDispatchToProps)
export default class Task extends Component {

    state = {
        taskTitle: this.props.task.get('taskTitle'),
        taskMsg: this.props.task.get('task'),
        editing: false,
        headers: 'Task editor error message',
        errorText: '',
        visible: false
    }

    _handleTitleInput = (text) => {
        this.setState({ taskTitle: text });
    }

    _handleTextInput = (text) => {
        this.setState({ taskMsg: text });
    }

    _handleEdit = () => {
        const { editing } = this.state;

        this.setState({ editing: !editing });
    }

    _handleModal = () => {
        this.setState({ visible: false });
    }

    _handleDelete = () => {
        const { task, actions } = this.props;

        actions.removeTask(task.get('id'));
    }

    _handleImportant = () => {
        const { task, actions } = this.props;
        const updatedTask = task.set('important', !task.get('important'));

        actions.updateTask(updatedTask);
    }

    _handleStartTask = () => {

    }

    _handleForm = () => {
        const { taskTitle, taskMsg } = this.state;
        const { task, actions } = this.props;
        const updatedTask = merge(task, {
            task: taskMsg,
            updated: moment(),
            taskTitle
        });

        if (!taskTitle.trim() || task.length > 50) {
            this.setState({
                errorText: 'Task title cant be blank & length more then 50 symbols!!!',
                visible: true
            });
            return (false);
        }

        if (!taskMsg.trim() || taskMsg.length > 120) {
            this.setState({
                errorText: 'Task text cant be blank & length more then 120 symbols!!!',
                visible: true
            });
            return (false);
        }

        actions.updateTask(updatedTask);
        this.setState({ editing: false });
    }

    render () {
        const { editing, taskTitle, taskMsg, visible, headers, errorText } = this.state;
        const { task, index } = this.props;

        return (
            <View style = { styles.container }>
                <AlertModal
                    _handleModal = { this._handleModal }
                    visible = { visible }
                    headers = { headers }
                    text = { errorText }
                />
                <View>
                    <View>
                        {
                            editing ?
                            <View>
                                <TextInput style = { styles.input }
                                    value = { taskTitle }
                                    underlineColorAndroid = "transparent"
                                    placeholder = "Title"
                                    placeholderTextColor = "#9a73ef"
                                    autoCapitalize = "none"
                                    onChangeText = { this._handleTitleInput }
                                />
                                <TextInput style = { styles.textArea }
                                    value = { taskMsg }
                                    multiline = { true }
                                    numberOfLines = { 4 }
                                    underlineColorAndroid = "transparent"
                                    placeholder = "Text"
                                    placeholderTextColor = "#9a73ef"
                                    autoCapitalize = "none"
                                    onChangeText = { this._handleTextInput }
                                />
                                <TouchableOpacity
                                    style = { styles.submitButton }
                                    onPress = { this._handleForm }
                                >
                                    <Text style = { styles.submitButtonText }> Save </Text>
                               </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <Text>{ index + 1 }.</Text>
                                <Text>{ taskTitle }</Text>
                            </View>
                        }
                    </View>

                    <View>
                        <View>
                            <Text>Created at: </Text>
                            <Text>{ moment(task.get('created')).format('DD-MM-YYYY HH:mm') }</Text>
                        </View>
                        {
                            task.get('updated') ?
                                <View>
                                    <Text>Updated at: </Text>
                                    <Text>{ moment(task.get('updated')).format('DD-MM-YYYY HH:mm') }</Text>
                                </View>
                                : null
                        }
                    </View>
                </View>


                <View style = { styles.actions }>
                    <Icon
                        style = { styles.icon }
                        name = 'create'
                        color= { editing ? '#9a73ef' : '#e3e3e3' }
                        onPress = { this._handleEdit }
                    />
                    <Icon
                        name = 'star'
                        color= { task.get('important') ? '#9a73ef' : '#e3e3e3' }
                        onPress = { this._handleImportant }
                    />
                    <Icon
                        name = 'forward'
                        color = '#e3e3e3'
                        onPress = { this._handleStartTask }
                    />
                    <Icon
                        name = 'delete'
                        color= '#e3e3e3'
                        onPress = { this._handleDelete }
                    />
                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        margin: 15,
        padding: 10,
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
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});
