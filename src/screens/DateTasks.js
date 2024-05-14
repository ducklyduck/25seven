import React from 'react';
// import from component libraries
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FAB, Icon} from '@rneui/themed';
// Task store
import {useTaskListStore} from '../utils/store';
// Task component
import TaskItem from '../components/TaskItem';

// TODO: import styles from a special style file
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskList: {
    flexDirection: 'column',
    marginBottom: 100,
    padding: 10,
  },
  screenTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'crimson',
    paddingLeft: 20,
  },
});

const DateTasks = ({navigation}) => {
  const date = 'Today';
  const list = useTaskListStore(state => state.taskList);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={styles.screenTitle}>{date}</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.taskList}>
          {list
            .filter(task => task.taskDate === date)
            .map(task => (
              <TaskItem
                key={task.id}
                id={task.id}
                taskTitle={task.taskTitle}
                isCompleted={task.isCompleted}
                taskDate={task.taskDate}
                taskProject={task.taskProject}
                taskPriority={task.taskPriority}
                taskTags={task.taskTags}
              />
            ))}
        </View>
      </ScrollView>
      <FAB
        placement={'right'}
        backgroundColor="tomato"
        onPress={() => navigation.navigate('FabScreens', { screen: 'Task' })}
      >
        <Icon
          name="plus"
          type="material-community"
          width={20}
          size={24}
          color="white"
        />
      </FAB>
      <FAB
        placement={'left'}
        backgroundColor="tomato"
        onPress={() => navigation.navigate('FabScreens', { screen: 'Focus' })}
      >
        <Icon
          name="lightbulb-outline"
          type="material-community"
          width={20}
          size={24}
          color="white"
        />
      </FAB>
    </SafeAreaView>
  )
}

export default DateTasks
