import { useId } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AsyncStorage } from 'react-native'

export const useTaskListStore = create(
  persist(
    (set, get) => ({
      taskList: [
        {
          id: 1,
          taskTitle: 'Code',
          isCompleted: false,
          taskDate: 'Today',
          taskProject: '',
          taskPriority: 3,
          taskTags: []
        },
        {
          id: 2,
          taskTitle: 'Test preparations',
          isCompleted: false,
          taskDate: 'Today',
          taskProject: 'Math',
          taskPriority: 2,
          taskTags: []
        },
        {
          id: 3,
          taskTitle: 'Take Foxy for',
          isCompleted: true,
          taskDate: 'Today',
          taskProject: 'Daily',
          taskPriority: 1,
          taskTags: []
        },
        {
          id: 4,
          taskTitle: 'Prepare for exams',
          isCompleted: false,
          taskDate: 'Tomorrow',
          taskProject: 'Daily',
          taskPriority: 3,
          taskTags: []
        },
        {
          id: 5,
          taskTitle: 'Exercise 14.A',
          isCompleted: false,
          taskDate: 'Saturday',
          taskProject: 'Physics',
          taskPriority: 2,
          taskTags: ['homework', 'studies']
        },
        {
          id: 6,
          taskTitle: 'Exercise 24.C',
          isCompleted: false,
          taskDate: 'Saturday',
          taskProject: 'Math',
          taskPriority: 2,
          taskTags: ['homework', 'studies']
        },
        {
          id: 7,
          taskTitle: 'Exercise 15.A and 15.B',
          isCompleted: false,
          taskDate: 'Saturday',
          taskProject: 'Physics',
          taskPriority: 2,
          taskTags: ['homework', 'studies']
        },
        {
          id: 8,
          taskTitle: 'Test',
          isCompleted: false,
          taskDate: 'Monday',
          taskProject: 'Math',
          taskPriority: 3,
          taskTags: ['studies']
        },
        {
          id: 9,
          taskTitle: 'Fix the project',
          isCompleted: false,
          taskDate: 'Today',
          taskProject: 'Math',
          taskPriority: 3,
          taskTags: ['studies']
        },
        {
          id: 10,
          taskTitle: 'Morning exercises',
          isCompleted: true,
          taskDate: 'Today',
          taskProject: 'Daily',
          taskPriority: 0,
          taskTags: ['']
        },
        {
          id: 11,
          taskTitle: 'Morning exercises',
          isCompleted: true,
          taskDate: 'Today',
          taskProject: 'Daily',
          taskPriority: 0,
          taskTags: ['']
        },
      ],
      projectList: ['Daily', 'Math', 'Physics'],
      tagsList: ['homework', 'studies'],
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
    }),
    {
      name: 'taskStorage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage),
      // getStorage: () => AsyncStorage,
    },
  )
)
