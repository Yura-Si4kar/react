"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Task from '@/components/Task';
import { Task as TaskType } from '../type/task';
import { useTaskStore } from '@/store/useTaskStore';

export default function Home() {
  const { tasks, addTask, editTask, deleteTask } = useTaskStore();
  const [newTask, setNewTask] = useState('');

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold mb-8 text-center text-indigo-600">
        Список завдань
      </h1>

      {/* Форма для додавання завдань */}
      <motion.div
        className="flex gap-4 justify-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <input
          type="text"
          className="border p-3 rounded-lg w-80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Нове завдання..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition-all"
          onClick={() => {
            if (newTask.trim()) {
              addTask(newTask);
              setNewTask('');
            }
          }}
        >
          Додати
        </button>
      </motion.div>

      {/* Відображення списку завдань */}
      <div className="space-y-4">
        {tasks.map((task: TaskType) => (
          <motion.div
            key={task.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <Task key={task.id} task={task} />
            <div className="flex gap-4">
              {/* Кнопка редагування */}
              <button
                className="bg-yellow-400 text-white px-4 py-1 rounded-lg hover:bg-yellow-300 transition-all"
                onClick={() => {
                  const newTitle = prompt('Введіть нову назву завдання:', task.title);
                  if (newTitle) {
                    editTask(task.id, newTitle);
                  }
                }}
              >
                Редагувати
              </button>
              {/* Кнопка видалення */}
              <button
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-400 transition-all"
                onClick={() => deleteTask(task.id)}
              >
                Видалити
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
