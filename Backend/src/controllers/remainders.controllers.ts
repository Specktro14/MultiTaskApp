import supabase from "../config/supabase.ts";

interface RemindersController {
  getReminders?: (req: any, res: any) => Promise<void>;
  createReminder?: (req: any, res: any) => Promise<void>;
  getReminder?: (req: any, res: any) => Promise<void>;
  updateReminder?: (req: any, res: any) => Promise<void>;
  deleteReminder?: (req: any, res: any) => Promise<void>;
}

const remindersCtrl : RemindersController = {}

remindersCtrl.getReminders = async (req, res) => {
  const reminders = await supabase.from('Reminders').select('*')
  if (reminders.error) {
    return res.status(400).json({ error: reminders.error.message })
  }
  res.json(reminders)
}

remindersCtrl.createReminder = async (req, res) => {
  const { title, description, dueDate, priority } = req.body
  const { data, error } = await supabase.from('Reminders').insert([{ title, description, dueDate, priority }])
  if (error) {
    return res.status(400).json({ error: error.message })
  }
  res.json(data)
}

remindersCtrl.getReminder = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('Reminders').select('*').eq('id', id).single()
  if (error) {
    return res.status(400).json({ error: error.message })
  }
  if (!data) {
    return res.status(404).json({ error: 'Reminder not found.'})
  }
  res.json(data)
}

remindersCtrl.updateReminder = async (req, res) => {
  const { id } = req.params
  const { title, description, dueDate, priority } = req.body
  const { data, error } = await supabase.from('Reminders').update({ title, description, dueDate, priority }).eq('id', id)
  if (error) {
    return res.status(400).json({ error: error.message })
  }
  if (!data) {
    return res.status(404).json({ error: 'Reminder not found.'})
  }
  res.json(data)
}

remindersCtrl.deleteReminder = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('Reminders').delete().eq('id', id)
  if (error) {
    return res.status(400).json({ error: error.message })
  }
  res.json(data)
}

export const { getReminders, createReminder, getReminder, updateReminder, deleteReminder } = remindersCtrl