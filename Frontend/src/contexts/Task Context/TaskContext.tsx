import { useState, ReactNode } from 'react';
import { TaskContext } from './TaskContextDefinition';

interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  return (
    <TaskContext.Provider value={{ selectedTask, setSelectedTask }}>
      {children}
    </TaskContext.Provider>
  )
}

