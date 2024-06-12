import React from 'react';
// Component libraries
import {View, Text, StyleSheet} from 'react-native';
import {Icon, ListItem} from '@rneui/themed';
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
  },
  taskDate: {
    color: '#123FED',
    fontSize: 15,
    marginRight: 5,
  },
});

const FocusTaskItem = ({
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
    changeCompletion(id);
  };

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

  return (
    <ListItem
      containerStyle={[
        styles.taskItem,
        {backgroundColor: isCompleted ? 'lightgrey' : 'white'},
      ]}>
      <ListItem.Content>
        <View style={[styles.taskRow, styles.taskTopRow]}>
          <Text style={{color: projectTextColor}}>{taskProject} </Text>
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
          <Text></Text>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default FocusTaskItem;
