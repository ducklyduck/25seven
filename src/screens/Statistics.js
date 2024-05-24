import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {VictoryBar, VictoryPie} from 'victory-native';

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
  const dailyData = [
    {x: 1, y: 1, label: 'Monday', opacity: 0.5, fill: 'grey'},
    {x: 2, y: 3, label: 'Tuesday', opacity: 0.5, fill: 'grey'},
    {x: 3, y: 2, label: 'Wednesday', opacity: 0.5, fill: 'grey'},
    {x: 4, y: 5, label: 'Thursday', opacity: 1, fill: 'blue'},
    {x: 5, y: 4, label: 'Friday', opacity: 0.5, fill: 'grey'},
    {x: 6, y: 2, label: 'Saturday', opacity: 0.5, fill: 'grey'},
    {x: 7, y: 2, label: 'Sunday', opacity: 0.5, fill: 'grey'},
  ];
  const projectData = [
    {x: 1, y: 5, label: 'Daily', opacity: 0.5, fill: 'coral'},
    {x: 2, y: 4, label: 'Programming', opacity: 0.5, fill: 'blue'},
    {x: 3, y: 2, label: 'Math', opacity: 0.5, fill: 'green'},
    {x: 4, y: 2, label: 'Physics', opacity: 0.5, fill: 'indigo'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={styles.screenTitle}>Statistics</Text>
      </TouchableOpacity>
      <View style={styles.dailyStats}>
        {/* TODO: BarChart of tasks sorted by day completed on a weeek */}
        <VictoryBar style={{data: {fill: 'coral'}}} data={dailyData} />
      </View>
      <View style={styles.projectStats}>
        {/* TODO: PieChart of tasks sorted by project completed on a week */}
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
