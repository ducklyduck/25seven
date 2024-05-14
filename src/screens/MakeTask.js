import React from 'react';
// Import from component libraries
import {Text, StyleSheet, TextInput, View} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context'
// import DatePicker from 'react-native-date-picker'
import {Icon, Button} from '@rneui/themed';
import {useTaskListStore} from '../utils/store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const MakeTask = ({navigation}) => {
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskDate, setTaskDate] = React.useState(new Date());
  const [taskProject, setTaskProject] = React.useState('');
  const [taskPriority, setTaskPriority] = React.useState(0);
  const [taskTags, setTaskTags] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const addTask = useTaskListStore(state => state.addTask);
  const saveNewTask = () => {
    console.log(taskTitle);
    addTask(taskTitle);
    navigation.goBack();
  };

  //TODO: change screen to overlay

  //TODO: make a toast for a task creation cancellation
  //TODO: make a toast warning when trying to add a task without title

  return (
    <View style={styles.container}>
      <Text>Task</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTaskTitle}
        value={taskTitle}
      />
      <View style={{flexDirection: 'row'}}>
        {/* TODO: choosing date via calender styled input */}
        <Button title="Date" onPress={() => setOpen(true)} />
        {/* <DatePicker
        modal
        open={open}
        date={taskDate}
        onConfirm={(taskDate) => {
          setOpen(false)
          setTaskDate(taskDate)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      >
    </DatePicker> */}
        {/* TODO: tags, priorities, project pickers */}

        <Text>Tags</Text>
        <Icon
          name="send"
          type="material-community"
          width={20}
          size={24}
          color="charcoal"
          onPress={saveNewTask}
        />
      </View>
    </View>
  );
};

export default MakeTask;
