import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import {VictoryBar, VictoryPie} from 'victory-native';
// Task store
import { useTaskListStore } from '../utils/store';

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
  dailyStats: {
    width: 360,
  },
});

const Statistics = ({navigation}) => {
  // const dailyData = useTaskListStore(state => state.dailyData);
  // const projectData = useTaskListStore(state => state.projectData);
  const list = useTaskListStore(state => state.taskList);

  const today = moment();
  const lastWeek = moment().subtract(7, 'days');
  const tasksByDayOfWeek = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };
  const tasksByProject = {};
  list.filter(task => task.isCompleted === true).forEach(task => {
    if (moment(task.taskDate).isBetween(lastWeek, today, 'days', '[]')) {
      const dayOfWeek = moment(task.taskDate).format('dddd');
      tasksByProject[task.taskProject] === undefined ? tasksByProject[task.taskProject] = 1 : tasksByProject[task.taskProject]++;
      tasksByDayOfWeek[dayOfWeek]++;
    }
  });
  const dailyData = [
    {x: 1, y: tasksByDayOfWeek['Monday'], label: 'Mon', opacity: 0.5, fill: 'grey'},
    {x: 2, y: tasksByDayOfWeek['Tuesday'], label: 'Tue', opacity: 0.5, fill: 'grey'},
    {x: 3, y: tasksByDayOfWeek['Wednesday'], label: 'Wed', opacity: 0.5, fill: 'grey'},
    {x: 4, y: tasksByDayOfWeek['Thursday'], label: 'Thu', opacity: 1, fill: 'blue'},
    {x: 5, y: tasksByDayOfWeek['Friday'], label: 'Fri', opacity: 0.5, fill: 'grey'},
    {x: 6, y: tasksByDayOfWeek['Saturday'], label: 'Sat', opacity: 0.5, fill: 'grey'},
    {x: 7, y: tasksByDayOfWeek['Sunday'], label: 'Sun', opacity: 0.5, fill: 'grey'},
  ];
  const projectData = [
    {x: 1, y: tasksByProject['Daily'], label: 'Daily', opacity: 0.5, fill: 'coral'},
    {x: 2, y: tasksByProject['Programming'], label: 'Progr...', opacity: 0.5, fill: 'blue'},
    {x: 3, y: tasksByProject['Math'], label: 'Math', opacity: 0.5, fill: 'green'},
    {x: 4, y: tasksByProject['Physics'], label: 'Physics', opacity: 0.5, fill: 'indigo'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={styles.screenTitle}>Statistics</Text>
      </TouchableOpacity>
      <View style={styles.dailyStats}>
        {/* BarChart of tasks sorted by day completed on a weeek */}
        <VictoryBar style={{data: {fill: 'coral'}}} data={dailyData} />
      </View>
      <View style={styles.projectStats}>
        {/* PieChart of tasks sorted by project completed on a week */}
        <VictoryPie
          radius={130}
          colorScale={['coral', 'lightskyblue', 'limegreen', 'mediumpurple']}
          data={projectData}
        />
      </View>
    </SafeAreaView>
  );
};

export default Statistics;
