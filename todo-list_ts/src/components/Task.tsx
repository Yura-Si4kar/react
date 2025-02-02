"use client";

import React from "react";
import { motion } from "framer-motion";
import { Task as TaskType } from "../type/task";
import { useTaskStore } from "@/store/useTaskStore";

type TaskProps = {
  task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  const { toggleTask } = useTaskStore();

  return (
    <motion.div
      className="flex justify-between items-center w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span
        className={task.completed ? "line-through text-gray-500" : ""}
        onClick={() => toggleTask(task.id)}
      >
        {task.title}
      </span>
    </motion.div>
  );
};

export default Task;
