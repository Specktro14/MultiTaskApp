import { ListTodo } from "lucide-react" 
import { useState, useCallback, useEffect } from "react";
import { Task } from "./Task";
import { Task as taskType } from "@/Types";
import axios from "axios";
import { Link } from "react-router-dom";

export function TaskList () {

  const [state, setState] = useState<{
    tasks: taskType[]
    filterTasks: taskType[]
    filter: string
  }>({
    tasks: [{
      title: "Cook",
      description: "Cook dinner for the family djasjdkajdkjakdjakdjkadjkajdskjaskdjakdjkajdasdkjaskdjkasjdklajklfhkjsdafaudshgfdshgfhjsgdfhsgdfhwuerioeweuiqueiuiuqiwueiqwueiqwueiqwueiqwueiuqwieuqweuiqwueioqwueioqwueiou",
      id: "1",
      status: false,
    }],
    filterTasks: [],
    filter: "",
  })

  const prevFilter = localStorage.getItem('statusFilter') || 'all'
  const apiURL = "http://localhost:4000/api/tasks";
  

  const filterTasks = useCallback((tasks: taskType[], filter: string) => {
    console.log("filtering tasks");
    let filtered: taskType[] = [];
    switch (filter) {
      case "all":
        filtered = tasks;
        localStorage.setItem("statusFilter", "all")
        break;
      case "pending":
        filtered = tasks.filter((task) => task.status === false);
        localStorage.setItem("statusFilter", "pending")
        break;
      case "completed":
        filtered = tasks.filter((task) => task.status === true);
        localStorage.setItem("statusFilter", "completed")
        break;
      default:
        return tasks;
    }

    setState((prevState) => ({
      ...prevState,
      filterTasks: filtered,
    }));
  }, []);

  useEffect(() => {
    if (state.tasks.length > 0) {
      filterTasks(state.tasks, prevFilter)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tasks, prevFilter])

  const getTasks = useCallback(async () => {
    const res = await axios.get(apiURL);
    const tasks = res.data.data;
    setState((prevState) => ({
      ...prevState,
      title: "",
      description: "",
      editing: false,
      status: false,
      id: "",
      tasks: tasks,
      filterTasks: tasks,
    }));
  }, [])

  const renderTasks = useCallback(() => {
    if (state.filterTasks.length === 0) {
      return <h1 className="text-white/50 text-[1.2rem]">No tasks found</h1>;
    }
    if (state.filterTasks.length > 0) {
      return state.filterTasks.map((task: taskType) => {
        return (
          <Task
            title={task.title}
            description={task.description}
            id={task.id}
            key={task.id}
            status={task.status}
            getTasks={getTasks}
          ></Task>
        );
      });
    }
  }, [state, getTasks]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return(
    <>
      <div className="max-h-[596px] h-fit bg-white/10 rounded-2xl p-6 shadow-md backdrop-blur-md top-8 border border-white/10">
        <div className="flex max-h-15 pb-3 gap-1.5 border-b-white/10 border-b-1">
          <ListTodo className="text-primary-ta" size={40} />
          <h1 className="text-[1.8rem] text-primary-ta font-bold mb-4">
            Tasks Tracker
          </h1>
        </div>
        <div className="flex flex-col mt-[0.7rem]">
          <h3 className="text-primary-ta mt-1 mb-2 text-[1.17rem] font-bold">
            Filter Tasks
          </h3>
          <div className="grid grid-cols-2 grid-rows-2 gap-x-2 mb-5 py-2 border-b border-b-white/10">
            <button
              className="bg-white/10 text-white mb-[0.6rem] rounded-md font-semibold px-6 py-[0.8rem] text-[0.9rem] hover:bg-primary-light-ta hover:-translate-y-0.5 active:bg-primary-ta active:text-[#050b2c] col-span-full"
              onClick={() => filterTasks(state.tasks, "all")}
            >
              All
            </button>
            <button
              className="bg-white/10 text-white mb-[0.6rem] rounded-md font-semibold px-6 py-[0.8rem] text-[0.9rem] hover:bg-primary-light-ta hover:-translate-y-0.5 active:bg-primary-ta active:text-[#050b2c]"
              onClick={() => filterTasks(state.tasks, "pending")}
            >
              Pending
            </button>
            <button
              className="bg-white/10 text-white mb-[0.6rem] rounded-md font-semibold px-6 py-[0.8rem] text-[0.9rem] hover:bg-primary-light-ta hover:-translate-y-0.5 active:bg-primary-ta active:text-[#050b2c]"
              onClick={() => filterTasks(state.tasks, "completed")}
            >
              Completed
            </button>
          </div>
          <div>
            <button className="bg-primary-ta rounded-lg py-2 px-3 w-fit h-10 font-bold text-blackrich-800" title='To create task page'><Link to='/tasks/create'>Create new task</Link></button>
          </div>
        </div>
      </div>
      <div className="md:max-h-[596px] h-full bg-white/5 rounded-lg py-6 px-8 border-1 border-white/10">
        <div className="flex justify-between items-baseline gap-2 mb-2 border-b-white/10 border-b-1 pb-3 h-[50px]">
          <h1 className="text-[1.4rem] sm:text-[1.8rem] text-white font-bold">Tasks Overview</h1>
          <span className="text-white/70 sm:text-[1.2rem] font-bold">
            {state.filterTasks.length}{" "}
            {state.filterTasks.length > 1 ? "tasks" : "task"}
          </span>
        </div>
        <div className="flex flex-col flex-nowrap gap-4 pt-3 md:pr-2 md:max-h-[500px] h-full md:overflow-y-auto [&::-webkit-scrollbar-track]:bg-white/20  [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-[5px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-[5px]">
          {renderTasks()}
        </div>
      </div>
    </>
  )  
}

/* 
<div className="flex flex-col mb-3">
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="What's your next big task?"
              className="w-full p-4 bg-white/5 border border-white/10  rounded-[8px] text-white text-[0.95rem] focus:border-primary-ta focus:outline-0 focus:shadow-xs focus:shadow-primary-ta/20 placeholder:text-placeholder"
              name="title"
              value={state.title}
              onChange={onChange}
            ></input>
            <textarea
              placeholder="Add details about your task (optional)"
              className="w-full p-4 bg-white/5 border border-white/10 rounded-[8px] text-white text-[0.95rem] resize-none h-[150px] leading-6 tracking-[0.8px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-[5px] focus:border-primary-ta focus:outline-0 focus:shadow-xs focus:shadow-primary-ta/20 placeholder:text-placeholder"
              name="description"
              value={state.description}
              onChange={onChange}
            ></textarea>
            <button className="flex justify-center items-center gap-2 w-full bg-primary-ta rounded-lg px-6 py-3.5 text-[#050b2c] cursor-pointer text-[0.9rem] font-semibold transition-all duration-200 ease-in-out hover:bg-primary-light-ta hover:-translate-y-0.5">
              <Plus /> Create note
            </button>
          </form>
        </div>
*/