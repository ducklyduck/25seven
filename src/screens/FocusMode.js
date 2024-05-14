import React from 'react';
// Import from component libraries
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTaskListStore} from '../utils/store';
import {Button, Icon} from '@rneui/themed';
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
    fontSize: 100,
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
  const timer = '57:00';
  const list = useTaskListStore(state => state.taskList);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.timer}>{timer}</Text>
        <Text style={{fontWeight: '600', fontSize: 28}}>Your tasks</Text>
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
          color="indianred"
          size="lg"
          radius={45}
          onPress={() => {
            console.log('concentration stopped');
            navigation.goBack();
          }}>
          <Icon
            name={'pause'}
            type="material-community"
            size={48}
            color={'white'}
          />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default FocusMode;
