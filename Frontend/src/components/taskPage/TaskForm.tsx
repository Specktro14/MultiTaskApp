import { useDebounce } from "@/hooks/useDebounce"
import { TaskActions, TaskState } from "@/Types" 
import axios from "axios"
import { ListTodo, Plus } from "lucide-react"
import { useCallback, useEffect, useReducer } from "react"
import { useParams, useNavigate } from "react-router-dom"

export function TaskForm () {

  const taskReducer = (state: TaskState, action: TaskActions): TaskState => {
    switch (action.type) {
      case 'SET_TITLE':
        return { ...state, title: action.payload }
      case 'SET_DESCRIPTION':
        return { ...state, description: action.payload}
      case 'SET_ID':
        return { ...state, id: action.payload}
      case 'SET_STATUS':
        return { ...state, status: action.payload}
      case 'SET_EDITING':
        return { ...state, editing: action.payload}
      case 'LOAD_TASK': 
        return {
          ...state,
          editing: true,
          title: action.payload.title,
          description: action.payload.description,
          id: action.payload.id,
          status: action.payload.status  
        }
      case 'RESET_FORM': 
        return {
          ...state,
          title: "",
          description: "",
          status: false,
          editing: false,
          id: "",
        }
      default: 
        return state
    }
  }

  const [state, dispatch] = useReducer(taskReducer, {
    title: "",
    description: "",
    status: false,
    editing: false,
    id: "",
  })

  const { id } = useParams()
  const apiURL = "http://localhost:4000/api/tasks"
  const navigate = useNavigate()
  const debouncedDisplay = useDebounce(state, 500)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (e.target.name) {
      case 'title':
        return dispatch({ type: 'SET_TITLE', payload: e.target.value });
      case 'description':
        return dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.editing) {
      const editedTask = {
        title: state.title,
        description: state.description,
        status: state.status,
        id: state.id
      }
      await axios.put(`${apiURL}/${id}`, editedTask)
      navigate('/tasks')
    } else {
      const newTask = {
        title: state.title,
        description: state.description,
        status: false,
        id: "",
      }
      await axios.put(apiURL, newTask)
      navigate('/tasks')
    }
  }

  const getTask = useCallback(async (id: string | undefined) => {
    const res = await axios.get(`${apiURL}/${id}`)
    
    dispatch({type: 'LOAD_TASK', payload: res.data})  
    dispatch({type: 'SET_EDITING', payload: true})
  }, [])

  useEffect (() => {
    if (id) {
      getTask(id)
    }
  }, [getTask, id])

  return(
    <>
      <div className="max-h-[596px] bg-white/10 rounded-2xl p-6 shadow-md backdrop-blur-md md:sticky top-8 border border-white/10">
        <div className="flex max-h-15 pb-3 gap-1.5 border-b-white/10 border-b-1 mb-3">
          <ListTodo className="text-primary-ta" size={40} />
          <h1 className="text-[1.8rem] text-primary-ta font-bold mb-4">
            Tasks Tracker
          </h1>
        </div>
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
          <div className="mt-4 text-white">
            <h3>Status: {state.status ? 'Completed' : 'Pending'}</h3>
            <h3>ID: {state.id ? id : 'No ID assigned'}</h3>
          </div>
        </div>
      </div>
      <div className="max-w-[700px] max-h-[596px] h-fit bg-white/10 rounded-lg border border-white/10 shadow-md backdrop-blur-md p-8">
        <div>
          <h1 className="h-14 text-4xl text-white py-2 mb-2 border-b border-b-white/10">{debouncedDisplay.title ? debouncedDisplay.title : 'Add a title'}</h1>
          <p className="whitespace-pre-wrap break-words text-white py-2">{debouncedDisplay.description ? debouncedDisplay.description : 'Add also a description'}</p>
        </div>
        <div>
          <span className="inline-block py-1 px-3 rounded-xl font-medium text-[0.85rem] mb-[5px] mt-2 bg-primary-ta/20 text-primary-ta">Pending</span>
        </div>
      </div>
    </>
  )
}