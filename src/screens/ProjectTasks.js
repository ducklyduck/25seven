import React from 'react';
// import from component libraries
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FAB} from '@rneui/themed';
// Task store
import {useTaskListStore} from '../utils/store';
// Task component
import TaskItem from '../components/TaskItem';

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

const ProjectTasks = ({navigation}) => {
  const project = 'Math';
  const thisDate = moment();
  const isDateOverdue = (date) => {
    date = moment(date).format('DDD')
    const thisDateFormatted = moment(thisDate).format('DDD');
    return moment(date).diff(thisDateFormatted, 'years') < 0
  }
  const isDateFilter = (date) => {
    date = moment(date).format('DDD')
    const thisDateFormatted = moment(thisDate).format('DDD');
    return moment(date).diff(thisDateFormatted, 'years') == 0
  }

  const list = useTaskListStore(state => state.taskList);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle} onPress={() => navigation.openDrawer()}>{project}</Text>
      <ScrollView>
        <View style={styles.taskList}>
          {list
            .filter(task => task.taskProject === project &&
              (isDateFilter(task.taskDate) | (isDateOverdue(task.taskDate) && task.isCompleted == false)))
            .map((task, taskI) => (
              <TaskItem
                key={taskI}
                id={task.id}
                taskTitle={task.taskTitle}
                isCompleted={task.isCompleted}
                taskDate={task.taskDate}
                taskProject={task.taskProject}
                taskPriority={task.taskPriority}
                taskTags={task.taskTags}
                onPress={(id) => navigation.navigate('ChangeTaskScreen', id)}
              />
            ))}
        </View>
      </ScrollView>
      <FAB
        placement={'right'}
        color="tomato"
        icon={{ name: 'plus', type: 'material-community', color: 'white' }}
        onPress={() => navigation.navigate('FabScreens', {screen: 'Task'})}
      />
      <FAB
        placement={'left'}
        color="tomato"
        icon={{ name: 'lightbulb-outline', type: 'material-community', color: 'white' }}
        onPress={() => navigation.navigate('FabScreens', {screen: 'Focus'})}
      />
    </SafeAreaView>
  );
};

export default ProjectTasks;
