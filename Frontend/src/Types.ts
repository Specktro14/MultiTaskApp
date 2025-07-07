export type Task = {
  title: string;
  description: string;
  id: string;
  status: boolean;
  getTasks: () => void;
}

export type TaskState = {
  editing: boolean,
  title: string,
  description: string,
  status: boolean,
  id: string
}

export type TaskActions = 
  {type: 'SET_TITLE'; payload: string} |
  {type: 'SET_DESCRIPTION'; payload: string} |
  {type: 'SET_STATUS'; payload: boolean} |
  {type: 'SET_ID'; payload: string} | 
  {type: 'SET_EDITING'; payload: boolean} |
  {type: 'RESET_FORM'} |
  {type: 'LOAD_TASK'; payload: Task}

export type Reminder = {
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  id: string;
}

export type FiltersType = {
  low: boolean;
  medium: boolean;
  high: boolean;
  date: string;
  customFilters: {
    school: boolean;
    work: boolean;
    health: boolean;
    personal: boolean;
    other: boolean;
  };
};

export interface CustomSelectWithCheckboxesProps {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}