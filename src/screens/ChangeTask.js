import React from 'react';
// Import from component libraries
import {Text, StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import {Icon, Button} from '@rneui/themed';
import {useTaskListStore} from '../utils/store';
import SelectDropdown from 'react-native-select-dropdown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  dateButton: {
    borderColor: 'coral',
    borderWidth: 1
  },
  projectButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: 'indigo',
    borderWidth: 1,
  },
  projectText: {
    color: 'indigo',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 1,
    fontFamily: 'sans-serif-medium',
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
  dropdownMenu: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    height: 200,
    width: 200,
  },
  dropdownItem: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdownItemText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  }
});

const ChangeTask = ({navigation, ...props}) => {
  const list = useTaskListStore(state => state.taskList);
  const id = props.id;
  const task = list.find(item => {
    return item.id === id
  })

  const [taskTitle, setTaskTitle] = React.useState(task.taskTitle);
  const [taskDate, setTaskDate] = React.useState(task.taskDate);
  const [taskProject, setTaskProject] = React.useState(task.taskProject);
  const [taskPriority, setTaskPriority] = React.useState(task.taskPriority);
  const [taskTags, setTaskTags] = React.useState(task.taskTags);

  const [open, setOpen] = React.useState(false);

  const projectList = useTaskListStore(state => state.projectList);
  const tagsList = useTaskListStore(state => state.tagsList);

  const projects = ['', ...projectList];
  const tags = ['', ...tagsList];
  const priorities = [
    {
      key: 0, color: '#6F6F6F',
    },
    {
      key: 1, color: 'blue',
    },
    {
      key: 2, color: 'orange',
    },
    {
      key: 3, color: 'red',
    },
  ]

  const changeTask = useTaskListStore(state => state.changeTask);

  const onChangeTaskClick = () => {
    changeTask(id, task.isCompleted, taskTitle, taskDate, taskProject, taskPriority, taskTags);
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
          titleStyle={styles.dateButton}
          onPress={() => setOpen(true)}>
          <Icon name="calendar-blank-outline" size={28} style={{marginRight: 5}} type="material-community" />
          Date
        </Button>
        <DatePicker modal open={open} date={taskDate}
          onConfirm={taskDate => {setOpen(false); setTaskDate(taskDate); }}
          onCancel={() => { setOpen(false); }}
        />
        {/* Project */}
        <SelectDropdown
          data={projects}
          onSelect={(selectedItem, index) => {
            setTaskProject(selectedItem);
          }}
          // button render
          renderButton={(selectedItem, isOpen) => {
            return (
              <View type="outline" radius={'md'} style={styles.projectButton} titleStyle={{color: 'indigo'}} >
                <Icon name="file-table-box-outline" size={28} style={{marginRight: 5}} type="material-community" />
                <Text style={styles.projectText}>{selectedItem ? selectedItem : 'Project'}</Text>
              </View>
            );
          }}
          // item in the list render
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItem,
                  ...(isSelected && {backgroundColor: '#D2D9DF'}),
                }}>
                <Text style={styles.dropdownItemText}>{item}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenu}
        />
      </View>
      <View style={styles.secondRowButtons}>
        <View style={styles.specsButtons}>
          {/* Tag */}
          <SelectDropdown
            data={tags}
            onSelect={(selectedItem, index) => {
              setTaskTags(selectedItem);
            }}
            // button render
            renderButton={(selectedItem, isOpen) => {
              return (
                <View >
                  <Icon name="tag-outline" type="material-community" size={40} color="charcoal" />
                </View>
              );
            }}
            // item in the list render
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItem,
                    ...(isSelected && {backgroundColor: '#D2D9DF'}),
                  }}>
                  <Text style={[styles.dropdownItemText, {color: item.color}]}> {item}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenu}
          />
          {/* Priority */}
          <SelectDropdown
            data={priorities}
            onSelect={(selectedItem, index) => {
              setTaskPriority(selectedItem);
            }}
            // button render
            renderButton={(selectedItem, isOpen) => {
              return (
                <View >
                  <Icon name="flag-variant-outline" type="material-community" size={40} color={selectedItem?.color || '#6F6F6F'} />
                </View>
              );
            }}
            // item in the list render
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItem,
                    ...(isSelected && {backgroundColor: '#D2D9DF'}),
                  }}>
                  <Text style={[styles.dropdownItemText, {color: item.color}]}>Priority {item.key}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenu}
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
          onPress={onChangeTaskClick}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangeTask;
