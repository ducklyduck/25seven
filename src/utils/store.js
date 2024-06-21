import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { StateStorage } from 'zustand/middleware'
import { AsyncStorage } from 'react-native'

export const useTaskListStore = create((set) => ({
  taskList: [
    {
      id: 1,
      taskTitle: 'Code',
      isCompleted: true,
      taskDate: '2024-06-09T13:16:00.000Z',
      taskProject: 'Programming',
      taskPriority: 3,
      taskTags: []
    },
    {
      id: 2,
      taskTitle: 'Test preparations',
      isCompleted: true,
      taskDate: '2024-06-09T15:16:00.000Z',
      taskProject: 'Math',
      taskPriority: 2,
      taskTags: []
    },
    {
      id: 3,
      taskTitle: 'Take Foxy for a walk',
      isCompleted: false,
      taskDate: '2024-06-14T10:00:00.000Z',
      taskProject: 'Daily',
      taskPriority: 1,
      taskTags: ['dog']
    },
    {
      id: 4,
      taskTitle: 'Prepare for exams',
      isCompleted: false,
      taskDate: '2024-06-14T12:00:00.000Z',
      taskProject: 'Math',
      taskPriority: 3,
      taskTags: []
    },
    {
      id: 5,
      taskTitle: 'Exercise 14.A',
      isCompleted: true,
      taskDate: '2024-06-09T15:16:00.000Z',
      taskProject: 'Physics',
      taskPriority: 2,
      taskTags: ['homework', 'studies']
    },
    {
      id: 6,
      taskTitle: 'Exercise 24.C',
      isCompleted: false,
      taskDate: '2024-06-08T15:16:00.000Z',
      taskProject: 'Math',
      taskPriority: 2,
      taskTags: ['homework', 'studies']
    },
    {
      id: 7,
      taskTitle: 'Exercise 15.A and 15.B',
      isCompleted: false,
      taskDate: '2024-06-11T11:16:00.000Z',
      taskProject: 'Physics',
      taskPriority: 2,
      taskTags: ['homework', 'studies']
    },
    {
      id: 8,
      taskTitle: 'Test',
      isCompleted: true,
      taskDate: '2024-06-13T13:16:00.000Z',
      taskProject: 'Math',
      taskPriority: 3,
      taskTags: ['studies']
    },
    {
      id: 9,
      taskTitle: 'Fix the project',
      isCompleted: false,
      taskDate: '2024-06-14T20:46:00.000Z',
      taskProject: 'Physics',
      taskPriority: 3,
      taskTags: ['studies']
    },
    {
      id: 10,
      taskTitle: 'Morning exercises',
      isCompleted: true,
      taskDate: '2024-06-11T08:16:00.000Z',
      taskProject: 'Daily',
      taskPriority: 0,
      taskTags: ['']
    },
    {
      id: 11,
      taskTitle: 'Exercise 20.C',
      isCompleted: false,
      taskDate: '2024-06-08T15:16:00.000Z',
      taskProject: 'Math',
      taskPriority: 2,
      taskTags: ['homework', 'studies']
    },
    {
      id: 12,
      taskTitle: 'Exercises 22.A and 25.A',
      isCompleted: true,
      taskDate: '2024-06-07T15:16:00.000Z',
      taskProject: 'Physics',
      taskPriority: 2,
      taskTags: ['homework', 'studies']
    },
    {
      id: 13,
      taskTitle: 'Exercise 18.B',
      isCompleted: true,
      taskDate: '2024-06-09T15:16:00.000Z',
      taskProject: 'Physics',
      taskPriority: 2,
      taskTags: ['homework', 'studies']
    },
  ],
  addTask: (taskTitle, taskDate, taskProject, taskPriority, taskTags) =>
    set((state) => ({
      taskList: [
        ...state.taskList,
        {
          id: Date.now(),
          taskTitle: taskTitle,
          isCompleted: false,
          taskDate: taskDate,
          taskProject: taskProject,
          taskPriority: taskPriority,
          taskTags: taskTags
        },
      ]
    })),
  changeTask: (id, isCompleted, taskTitle, taskDate, taskProject, taskPriority, taskTags) =>
    set((state) => ({
      taskList: state.taskList.map((task) =>
        task.id === id ?
          {
            id: id,
            taskTitle: taskTitle,
            isCompleted: isCompleted,
            taskDate: taskDate,
            taskProject: taskProject,
            taskPriority: taskPriority,
            taskTags: taskTags
          } : task
      ),
    })),
  changeCompletion: (id) =>
    set((state) => ({
      taskList: state.taskList.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    })),
  removeTask: (id) =>
    set((state) => ({
      taskList: state.taskList.filter((task) => task.id !== id),
    })),
  projectList: ['Daily', 'Math', 'Physics', 'Programming'],
  tagsList: ['homework', 'studies', 'dog'],
  saveWorktime: (time) =>
    set ((state) => ({
      worktime: [...state.worktime, time]
    })),
  worktime: [1546, 1200, 1600],

}))

// export default useTaskListStore
// = create(
//   devtools(
//     persist(taskListStore, {
//       name: 'task-list',
//       storage: createJSONStorage(() => AsyncStorage),
//     })
//   )
// )