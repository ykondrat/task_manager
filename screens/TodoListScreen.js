// Core
import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// Components
import Header from '../components/Header';
import Task from '../components/Task';

const mapStateToProps = (state) => ({
    tasks: state.tasks,
});

@connect(mapStateToProps)
export default class TodoListScreen extends Component {

    static navigationOptions = {
        headerTitle: <Header />,
        headerStyle: {
            backgroundColor: '#9a73ef',
        },
    };

    render () {
        const { tasks } = this.props;

        return (
            <ScrollView style = { styles.container }>
                <View>
                    <Text style = { styles.text }>List of tasks to be performed</Text>
                </View>
                {
                    tasks.map((task, index) => {
                        if (!task.get('inprogress') && !task.get('completed')) {
                            return (<Task key = { task.get('id') } index = { index } task = { task } />)
                        }
                    })
                }
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 15
    }
});
