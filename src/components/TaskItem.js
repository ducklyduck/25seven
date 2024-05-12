import React from 'react'
// Component libraries
import { View, Text, StyleSheet } from 'react-native'
import { Button, Icon, ListItem } from '@rneui/themed';
// Task store
import { useTaskListStore } from '../utils/store'

const styles = StyleSheet.create({
  taskItem: {
    marginVertical: 10,
  },
  taskRow: {
    flexDirection: "row"
  },
  taskTopRow: {
    justifyContent: "space-around",

  },
  taskMiddleRow: {
    justifyContent: "space-between",

  },
  taskBottomRow: {

  },
  statusIcon: {
    marginLeft: 10,
    marginRight: 20
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
    marginRight: 5
  }
})

const TaskItem = ({
  id,
  taskTitle,
  isCompleted,
  taskDate,
  taskProject,
  taskPriority,
  taskTags
}) => {
  // TODO: make checkbox change completion's state
  const changeCompletion = useTaskListStore((state) =>
    state.changeCompletion
  )
  const toggleTaskStatus = () => {
    console.log(id)
    changeCompletion(id)
  }

  let checkboxColor = 'black'
  switch (taskPriority) {
    case 3:
      checkboxColor = 'red'
      break
    case 2:
      checkboxColor = 'orange'
      break
    case 1:
      checkboxColor = 'blue'
      break
  }

  return (
    <ListItem.Swipeable style={styles.taskItem} onPress={() => console.log('task is opened')}
      leftStyle={{ paddingVertical: 10 }}
      leftContent={(reset) => (
        <Button
          title="Info"
          onPress={() => reset()}
          icon={{ name: 'info', color: 'white' }}
          buttonStyle={{ minHeight: '100%' }}
        />
      )}
      rightStyle={{ paddingRight: 25, paddingVertical: 10 }}
      rightContent={(reset) => (
        <Button
          title="Delete"
          onPress={() => reset()}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      )}
    >
      <ListItem.Content>

        <View style={[styles.taskRow, styles.taskTopRow]} >
          <Text>{taskProject}</Text>
          <Text>{taskDate}</Text>
        </View>
        <View style={[styles.taskRow, styles.taskMiddleRow]}>
          <Icon
            name={isCompleted ? 'check-circle-outline' : 'checkbox-blank-circle-outline'}
            type='material-community'
            style={styles.statusIcon}
            size={30}
            onPress={toggleTaskStatus}
            borderRadius={0}
            color={checkboxColor}
          />
          <Text style={[styles.taskTitle, { textDecorationLine: isCompleted ? "line-through" : "none" }]}>{taskTitle}</Text>
        </View>
        <View style={[styles.taskRow, styles.taskBottomRow]}>
          <Text>{taskTags}</Text>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  )
}

export default TaskItem
