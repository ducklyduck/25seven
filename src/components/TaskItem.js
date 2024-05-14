import React from 'react';
// Component libraries
import {View, StyleSheet} from 'react-native';
import {Button, Icon, Text, ListItem} from '@rneui/themed';
// Task store
import {useTaskListStore} from '../utils/store';

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
    // marginRight: 'auto'
  },
  taskDate: {
    color: '#123FED',
    fontSize: 15,
    marginRight: 5,
  },
});

const TaskItem = ({
  id,
  taskTitle,
  isCompleted,
  taskDate,
  taskProject,
  taskPriority,
  taskTags,
}) => {
  const changeCompletion = useTaskListStore(state => state.changeCompletion);
  const toggleTaskStatus = () => {
    console.log(id);
    changeCompletion(id);
  };
  const removeTask = useTaskListStore(state => state.removeTask);

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
      projectTextColor = 'lightblue';
      break;
  }

  return (
    <ListItem.Swipeable
      containerStyle={[
        styles.taskItem,
        {backgroundColor: isCompleted ? 'lightgrey' : 'white'},
      ]}
      onPress={() => console.log(`task ${id} is opened`)}
      leftStyle={{marginBottom: 10}}
      leftContent={reset => (
        <Button
          title="Info"
          onPress={() => reset()}
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
          <Text style={{color: 'coral'}}>{taskDate}</Text>
        </View>
        <View style={[styles.taskRow, styles.taskMiddleRow]}>
          <Icon
            name={
              isCompleted
                ? 'check-circle-outline'
                : 'checkbox-blank-circle-outline'
            }
            type="material-community"
            style={styles.statusIcon}
            size={30}
            onPress={toggleTaskStatus}
            borderRadius={0}
            color={checkboxColor}
          />
          <Text
            style={[
              styles.taskTitle,
              {textDecorationLine: isCompleted ? 'line-through' : 'none'},
            ]}>
            {taskTitle}
          </Text>
        </View>
        <View style={[styles.taskRow, styles.taskBottomRow]}>
          {/* TODO: every tag contains an exclusive icon */}
          {taskTags.map(taskTag => (
            <Text style={{marginRight: 10, textTransform: 'capitalize'}}>{taskTag}</Text>
          ))}
          <Text> </Text>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

export default TaskItem;
