import { createContext } from 'react'

interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

interface TaskContextType {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

