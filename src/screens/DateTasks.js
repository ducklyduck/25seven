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
  screenTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'crimson',
    paddingLeft: 20,
  },
  taskList: {
    flexDirection: 'column',
    marginBottom: 100,
    padding: 10,
  },
  overdueTaskList: {
    flexDirection: 'column',
    marginBottom: 20,
    padding: 10,
  }
});

const DateTasks = ({navigation}) => {
  const thisDate = moment();
  const thisDateTitle = moment(thisDate).calendar(null,
    {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    })
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
      <Text style={styles.screenTitle} onPress={() => navigation.openDrawer()}>{thisDateTitle}</Text>
      <ScrollView>
        <View style={styles.overdueTaskList}>
          {list
            .filter(task => isDateOverdue(task.taskDate) && task.isCompleted == false)
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
                onPress={(id) => navigation.navigate('ChangeTaskScreen', id)}
              />
            ))}
        </View>
        <View style={styles.taskList}>
          {list
            .filter(task => isDateFilter(task.taskDate))
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

export default DateTasks;
