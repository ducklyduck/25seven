import React from 'react';
// Import from component libraries
import {Text, StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import {Icon, Button} from '@rneui/themed';
import {useTaskListStore} from '../utils/store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'column',
  },
  input: {
    height: 40,
    width: 360,
    margin: 12,
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    padding: 10,
  },
  firstRowButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 360,
    gap: 15,
    marginBottom: 15,
  },
  secondRowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: 360,
  },
  specsButtons: {
    flexDirection: 'row',
    gap: 15,
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
    <SafeAreaView style={styles.container}>
      <Text style={{fontWeight: '500', fontSize: 20, color: 'black'}}>Task</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTaskTitle}
        value={taskTitle}
      />
      <View style={styles.firstRowButtons}>
        <Button
          type="outline"
          radius={'md'}
          buttonStyle={{borderColor: 'coral', borderWidth: 1}}
          titleStyle={{color: 'coral'}}
          onPress={() => setOpen(true)}>
          <Icon name="calendar-blank-outline" type="material-community" />
          Date
        </Button>
        <DatePicker
          modal
          open={open}
          date={taskDate}
          onConfirm={taskDate => {
            setOpen(false);
            setTaskDate(taskDate);
            console.log(taskDate);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Button
          type="outline"
          radius={'md'}
          buttonStyle={{borderColor: 'indigo', borderWidth: 1}}
          titleStyle={{color: 'indigo'}}
          onPress={() => console.log('project is selected')}>
          <Icon name="file-table-box-outline" type="material-community" />
          Project
        </Button>
      </View>
      <View style={styles.secondRowButtons}>
        <View style={styles.specsButtons}>
          <Icon
            name="tag-outline"
            type="material-community"
            size={32}
            color="charcoal"
            onPress={() => console.log('tags choosed')}
          />
          <Icon
            name="flag-variant-outline"
            type="material-community"
            size={32}
            color="charcoal"
            onPress={() => console.log('priority choosed')}
          />
        </View>
        <Button
          color="tomato"
          buttonStyle={{
            borderRadius: 20,
          }}
          icon={{
            name: 'send',
            type: 'material-community',
            size: 24,
            color: 'white',
          }}
          onPress={saveNewTask}
        />
      </View>
    </SafeAreaView>
  );
};

export default MakeTask;
