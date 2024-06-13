import React from 'react';
// Import from component libraries
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Icon} from '@rneui/themed';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import moment from 'moment';
// Task store
import {useTaskListStore} from '../utils/store';
// Task component
import FocusTaskItem from '../components/FocusTaskItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  timer: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tasksWrapper: {
    flexDirection: 'column',
    marginVertical: 30,
    padding: 10,
  },
});

const FocusMode = ({navigation}) => {
  const thisDate = moment();
  const isDateFilter = (date) => {
    date = moment(date).format('DDD')
    const thisDateFormatted = moment(thisDate).format('DDD');
    return moment(date).diff(thisDateFormatted, 'years') == 0
  }
  const durationTime = 1600;
  let workTime = 0;
  const list = useTaskListStore(state => state.taskList);

  const children = ( remainingTime ) => {
    const minutes = moment(Math.floor(remainingTime / 60)).format('mm').toString();
    const seconds = moment(remainingTime % 60).format('ss').toString();

    return `${minutes}:${seconds}`
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <CountdownCircleTimer
          isPlaying
          size={220}
          duration={durationTime}
          colors={['tomato']}
          onComplete={({remainingTime}) => {
            console.log(remainingTime)
            workTime = durationTime - remainingTime
          }}>
          {({remainingTime}) => (
            // <Text style={styles.timer}>{remainingTime}</Text>
            // <Text style={styles.timer}>{children(remainingTime)}</Text>
            <Text style={styles.timer}>{children(remainingTime)}</Text>
          )}
        </CountdownCircleTimer>
      </View>
      <View style={styles.tasksWrapper}>
        {list
          .filter(
            task => isDateFilter(task.taskDate) && task.isCompleted === false,
          )
          .map(task => (
            <FocusTaskItem
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
      <View style={styles.textContainer}>
        <Button
          color="tomato" size="lg" radius={45}
          onPress={() => {
            // onConcentrationStop(workTime);
            navigation.goBack();
          }}>
          <Icon name={'pause'} type="material-community" size={48} color={'white'} />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default FocusMode;
