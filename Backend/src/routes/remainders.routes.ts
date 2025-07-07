import { Router } from 'express';
import { getReminders, createReminder, getReminder, updateReminder, deleteReminder } from '../controllers/remainders.controllers.ts';

const reminders = Router()

reminders.route('/')
  .get(getReminders)
  .post(createReminder)

reminders.route('/:id')
  .get(getReminder)
  .put(updateReminder)
  .delete(deleteReminder)

export default reminders