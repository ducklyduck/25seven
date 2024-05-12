import React from 'react'
// Import from component libraries
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTaskListStore } from '../utils/store'
import { Button, Icon } from '@rneui/themed'
// Task component
import TaskItem from '../components/TaskItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100
    // justifyContent: 'center'
  },
  timer: {
    fontSize: 100,
    fontWeight: 'bold',
    marginBottom: 20
  },
  tasksWrapper: {
    flexDirection: 'column',
    marginVertical: 30
  }
})

const FocusMode = ({ navigation }) => {
  const timer = '57:00'
  const list = useTaskListStore((state) => state.taskList)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.timer}>{timer}</Text>
      <Text style={{ fontWeight: '600', fontSize: 28 }}>Your tasks</Text>
      <View style={styles.tasksWrapper}>
        {list
          .filter((task) => task.taskDate === 'Today')
          .map((task, taskI) => (
            <TaskItem
              key={taskI}
              taskTitle={task.taskTitle}
              isCompleted={task.isCompleted}
              taskDate={task.taskDate}
              taskProject={task.taskProject}
              taskPriority={task.taskPriority}
              taskTags={task.taskTags}
            />
          ))}
      </View>
      {/* <Button
        backgroundColor="indianred"
        size={36}
        borderRadius={40}
        style={{ marginHorizontal: 7, marginLeft: 15 }}
        onPress={() => {
          console.log('concentration stopped')
          navigation.goBack()
        }}
      >
        <Icon
          name={'pause'}
          type='material-community'
          size={25}
          color={'grey'}
        />
      </Button> */}
    </SafeAreaView>
  )
}

export default FocusMode
