import React from 'react';
// Component libraries
import {View, StyleSheet} from 'react-native';
import {Button, Icon, Text, ListItem} from '@rneui/themed';
import moment from 'moment';
// Task store
import {useTaskListStore} from '../utils/store';
// Notifications
import onDisplayNotification from './NoftificationItem';

const styles = StyleSheet.create({
  taskItem: {
    marginBottom: 10,
    padding: 10,
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTopRow: {
    width: 340,
  },
  taskMiddleRow: {},
  taskBottomRow: {},
  statusIcon: {
    marginLeft: 10,
    marginRight: 20,
  },
  taskTitle: {
    fontSize: 22,
    color: 'black',
    fontWeight: '500',
  },
  taskDate: {
    color: '#123FED',
    fontSize: 15,
    marginRight: 5,
  },
});

const TaskItem = ({navigation, ...props}) => {
  const changeCompletion = useTaskListStore(state => state.changeCompletion);
  const removeTask = useTaskListStore(state => state.removeTask);
  const toggleTaskStatus = () => {
    console.log(id);
    changeCompletion(id);
  };

  const {
    id,
    taskTitle,
    isCompleted,
    taskDate,
    taskProject,
    taskPriority,
    taskTags,
    onPress,
    isOverdue
  } = props;

  let checkboxColor = 'black';
  switch (taskPriority) {
    case 3:
      checkboxColor = 'red';
      break;
    case 2:
      checkboxColor = 'orange';
      break;
    case 1:
      checkboxColor = 'blue';
      break;
  }
  let projectTextColor = 'black';
  switch (taskProject) {
    case 'Math':
      projectTextColor = 'green';
      break;
    case 'Daily':
      projectTextColor = 'tomato';
      break;
    case 'Physics':
      projectTextColor = 'indigo';
      break;
    case 'Programming':
      projectTextColor = 'blue';
      break;
  }
  const thisDateFormatted = moment().format('DDD')
  // TODO: Fix taskCount to show true count of  uncompleted tasks of today or earlier
  const taskCount = useTaskListStore(state => state.taskList).filter(task => (moment(moment(taskDate).format('DDD')).diff(thisDateFormatted, 'years')) <= 0 && task.isCompleted === false).length;
  return (
    <ListItem.Swipeable
      containerStyle={[
        styles.taskItem,
        {backgroundColor: isCompleted ? 'lightgrey' : 'white'},
        // {backgroundColor: isOverdue ? 'pink' : isCompleted ? 'lightgrey' : 'white'},
      ]}
      onPress={() => onPress(id)}
      leftStyle={{marginBottom: 10}}
      leftContent={reset => (
        <Button
          title="Notify"
          onPress={() => { reset();
            onDisplayNotification(taskCount)
            console.log(moment(moment(taskDate).format('DDD')).diff(moment().format('DDD'), 'years'));
          }}
          icon={{name: 'info', color: 'white'}}
          buttonStyle={{minHeight: '100%'}}
        />
      )}
      rightStyle={{marginBottom: 10}}
      rightContent={reset => (
        <Button
          title="Delete"
          onPress={() => {
            reset();
            removeTask(id);
          }}
          icon={{name: 'delete', color: 'white'}}
          buttonStyle={{minHeight: '100%', backgroundColor: 'red'}}
        />
      )}>
      <ListItem.Content>
        <View style={[styles.taskRow, styles.taskTopRow]}>
          <Text style={{color: projectTextColor}}>{taskProject} </Text>
          <Text style={{color: isOverdue? 'red' : 'coral'}}>{String(moment(taskDate).calendar())}</Text>
        </View>
        <View style={[styles.taskRow, styles.taskMiddleRow]}>
          <Icon name={ isCompleted ? 'check-circle-outline' : 'checkbox-blank-circle-outline' }
            type="material-community"
            style={styles.statusIcon}
            size={30}
            onPress={toggleTaskStatus}
            borderRadius={0}
            color={checkboxColor}
          />
          <Text
            style={[ styles.taskTitle, {textDecorationLine: isCompleted ? 'line-through' : 'none'}, {color: isOverdue ? 'red' : 'black'}]}>
            {taskTitle}
          </Text>
        </View>
        <View style={[styles.taskRow, styles.taskBottomRow]}>
          {taskTags.map((taskTag, taskTagI) => (
            <Text
              key={taskTagI}
              style={{marginRight: 10, textTransform: 'capitalize'}}>
              {taskTag}
            </Text>
          ))}
          <Text></Text>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

export default TaskItem;
