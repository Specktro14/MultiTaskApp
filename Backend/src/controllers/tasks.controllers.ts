import supabase from "../config/supabase.ts"

interface TasksController {
  getTasks?: (req: any, res: any) => Promise<void>;
  createTask?: (req: any, res: any) => Promise<void>;
  getTask?: (req: any, res: any) => Promise<void>;
  updateTask?: (req: any, res: any) => Promise<void>;
  deleteTask?: (req: any, res: any) => Promise<void>;
}

const tasksCtrl: TasksController = {}

tasksCtrl.getTasks = async (req, res) => {
  const tasks = await supabase.from('Tasks').select('*')
  if (tasks.error) {
    return res.status(400).json({ error: tasks.error.message })
  }
  res.json(tasks)
}

tasksCtrl.createTask = async (req, res) => {
  const { title, description, status } = req.body
  const { data, error } = await supabase.from('Tasks').insert([{ title, description, status }])
  if (error) {
    return res.status(400).json({ error: error.message })
  }
  res.json(data)
}

tasksCtrl.getTask = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('Tasks').select('*').eq('id', id).single()
  if (error) {
    return res.status(400).json({ error: error.message })
  }
  if (!data) {
    return res.status(404).json({ error: 'Task not found' })
  }
  res.json(data)
}

tasksCtrl.updateTask = async (req, res) => {
  const { id } = req.params
  const { title, description, status } = req.body
  const { data, error } = await supabase.from('Tasks').update({ title, description, status }).eq('id', id)
  if (error) {
    return res.status(400).json({ error: error.message })
  }
  res.json(data)
}

tasksCtrl.deleteTask = async (req, res) => {
  const { id } = req.params
  const { data, error } =await supabase.from('Tasks').delete().eq('id', id)
  if (error) {
    return res.status(400).json({ error: error.message })
  }
  res.json(data)
}

export const { getTasks, createTask, getTask, updateTask, deleteTask } = tasksCtrl