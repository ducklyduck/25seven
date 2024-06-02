import React from 'react';
// Import from component libraries
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTaskListStore} from '../utils/store';
import {Button, Icon} from '@rneui/themed';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
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
  const durationTime = 1600;
  let workTime = 0;
  const list = useTaskListStore(state => state.taskList);

  const children = ( remainingTime ) => {
    const minutes = Math.floor(remainingTime / 60) ? Math.floor(remainingTime / 60) : '00';
    const seconds = remainingTime % 60 ? remainingTime % 60 : '00';

    return `${minutes}:${seconds}`
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <CountdownCircleTimer
          isPlaying
          size={220}
          duration={durationTime}
          colors={['tomato']}>
          {({remainingTime}) => (
            <Text style={styles.timer}>{children(remainingTime)}</Text>
          )}
          onComplete={({remainingTime}) => {
            workTime = durationTime - remainingTime
          }}
        </CountdownCircleTimer>
      </View>
      <View style={styles.tasksWrapper}>
        {list
          .filter(
            task => task.taskDate === 'Today' && task.isCompleted === false,
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
            onConcentrationStop(workTime);
            navigation.goBack();
          }}>
          <Icon name={'pause'} type="material-community" size={48} color={'white'} />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default FocusMode;
