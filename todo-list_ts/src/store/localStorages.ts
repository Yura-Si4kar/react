import { Task } from "@/type/task";
const STORAGE_KEY = "tasks";

export const getTasksFromLocalStorage = (): Task[] => {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
};

export const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};