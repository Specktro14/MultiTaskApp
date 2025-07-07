import { Router } from 'express';
import { getTasks, createTask, getTask, deleteTask, updateTask } from '../controllers/tasks.controllers.ts';

const tasks = Router()

tasks.route('/')
  .get(getTasks)
  .post(createTask)

tasks.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask)

export default tasks
// This code defines a set of routes for handling tasks in an Express application.  