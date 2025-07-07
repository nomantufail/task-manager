import { Router, Response } from 'express'
import { authenticateToken, AuthenticatedRequest } from './auth'
import { Task, tasks } from '../models/task'
import { v4 as uuidv4 } from 'uuid'
import { mock } from 'node:test'

const router = Router()

const mockTasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Draft and finalize the project proposal for the new client',
    status: 'pending',
    dueDate: '2024-07-10'
  },
  {
    id: '2',
    title: 'Team meeting',
    description: 'Weekly sync with the development team',
    status: 'completed',
    dueDate: '2024-07-05'
  },
  {
    id: '3',
    title: 'Submit expense report',
    description: '',
    status: 'pending',
    dueDate: '2024-07-15'
  },
  {
    id: '4',
    title: 'Client feedback review',
    description: 'Analyze feedback from last deployment',
    status: 'pending',
    dueDate: '2024-07-09'
  },
  {
    id: '5',
    title: 'Design new login page',
    description: 'Redesign the login screen for better UX',
    status: 'completed',
    dueDate: '2024-07-02'
  },
  {
    id: '6',
    title: 'Backend API testing',
    description: '',
    status: 'pending',
    dueDate: '2024-07-12'
  },
  {
    id: '7',
    title: 'Prepare presentation slides',
    description: 'Slides for project demo to the client',
    status: 'pending',
    dueDate: '2024-07-11'
  },
  {
    id: '8',
    title: 'Code review session',
    description: 'Review PRs from frontend team',
    status: 'completed',
    dueDate: '2024-07-06'
  },
  {
    id: '9',
    title: 'Bug fixes from QA',
    description: 'Resolve reported issues from the QA team',
    status: 'pending',
    dueDate: '2024-07-14'
  },
  {
    id: '10',
    title: 'Deploy to staging',
    description: 'Push the latest build to staging environment',
    status: 'pending',
    dueDate: '2024-07-08'
  }
]

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  let userTasks = tasks.get(req.uid!)

  // adding mock data for new users
  if (!userTasks && !Array.isArray(userTasks)) {
    tasks.set(req.uid!, [...mockTasks as Task[]]);
    userTasks = tasks.get(req.uid!);
  }
  //--------------------------------

  res.json(userTasks)
})

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Add a new task
 *     security:
 *       - bearerAuth: []
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { title, description, dueDate } = req.body
  if (!title) {
    res.status(400).json({ message: 'Title is required' })
    return;
  }

  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    dueDate,
    status: 'pending',
  }
  const userTasks = tasks.get(req.uid!) || [];
  userTasks.push(newTask);
  tasks.set(req.uid!, userTasks);

  res.status(201).json(newTask)
})

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a single task by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const userTasks = tasks.get(req.uid!) || []
  const index = userTasks.findIndex(t => t.id === req.params.id)
  if (index === -1) {
    res.status(404).json({ message: 'Task not found' })
    return;
  }

  res.status(200).json(userTasks[index])
})

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     security:
 *       - bearerAuth: []
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { title, description, dueDate, status } = req.body

  const userTasks = tasks.get(req.uid!) || []
  const taskIndex = userTasks.findIndex(t => t.id === req.params.id)

  if (taskIndex === -1) {
    res.status(404).json({ message: 'Task not found' })
    return;
  }

  // Update the task
  const existingTask = userTasks[taskIndex]
  const updatedTask = {
    ...existingTask,
    title,
    description,
    dueDate,
    status: status === 'completed' || status === 'pending' ? status : existingTask.status
  }

  userTasks[taskIndex] = updatedTask
  tasks.set(req.uid!, userTasks)

  res.json(updatedTask)
})

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     security:
 *       - bearerAuth: []
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const userTasks = tasks.get(req.uid!) || []
  const index = userTasks.findIndex(t => t.id === req.params.id)
  if (index === -1) {
    res.status(404).json({ message: 'Task not found' })
    return;
  }

  userTasks.splice(index, 1)
  tasks.set(req.uid!, userTasks)

  res.status(204).send()
})

export default router
