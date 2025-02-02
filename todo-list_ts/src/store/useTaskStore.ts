import { create } from 'zustand';
import { Task } from '@/type/task';
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from './localStorages';

interface TaskStore {
    tasks: Task[];
    addTask: (title: string) => void;
    toggleTask: (id: number) => void;
    editTask: (id: number, newTask: string) => void;
    deleteTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: getTasksFromLocalStorage(),
    addTask: (title) => {
        const task = { id: Date.now(), title, completed: false };
        set((state) => {
            const newTasks = [...state.tasks, task];  // Створюємо новий масив з доданим завданням
            saveTasksToLocalStorage(newTasks);  // Зберігаємо новий список в localStorage
            return { tasks: newTasks };  // Оновлюємо стан
        });
    },
    toggleTask: (id) => 
        set((state) => {
            const updatedTasks = state.tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            saveTasksToLocalStorage(updatedTasks);  // Зберігаємо оновлений список
            return { tasks: updatedTasks };  // Оновлюємо стан
        }),
    editTask: (id, newTask) => 
        set((state) => {
            const updatedTasks = state.tasks.map((task) =>
                task.id === id ? { ...task, title: newTask } : task
            );
            saveTasksToLocalStorage(updatedTasks);  // Зберігаємо оновлений список
            return { tasks: updatedTasks };  // Оновлюємо стан
        }),
    deleteTask: (id) => 
        set((state) => {
            const updatedTasks = state.tasks.filter((task) => task.id !== id);
            saveTasksToLocalStorage(updatedTasks);  // Зберігаємо оновлений список
            return { tasks: updatedTasks };  // Оновлюємо стан
        })
}));
