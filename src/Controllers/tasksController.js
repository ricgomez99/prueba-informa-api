export class TasksController {
  constructor({ tasksModel }) {
    this.tasksModel = tasksModel
  }

  getAll = async (req, res) => {
    const tasks = await this.tasksModel.getTasks()
    res.json(tasks)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const task = await this.tasksModel.getTaskById({ id })
    if (task) {
      return res.status(200).json(task)
    }
    return res.status(400).json({ message: 'Task not found' })
  }

  createTask = async (req, res) => {
    if (!req.body) {
      res.status(400).json({ message: 'Unable to create task' })
    }

    const token = req.headers.authorization.split(' ')[1]
    const newTask = await this.tasksModel.createTask({ input: req.body, token })
    res.status(201).json(newTask)
  }

  deleteTask = async (req, res) => {
    const { id } = req.params
    const result = await this.tasksModel.deleteTask({ id })
    if (result === false) {
      return res.status(400).json({ message: 'Task not found' })
    }
    return res.status(200).json({ message: 'Task Deleted' })
  }

  updateTask = async (req, res) => {
    const { id } = req.params
    const formData = req.body

    const result = await this.tasksModel.updateTask({ id, formData })
    if (result == false) {
      return res.status(400).json({
        message:
          'Failed updating task, make sure to pass an id and the data to be updated',
      })
    }

    return res.status(201).json({ message: 'Task Updated', result: result })
  }
}
