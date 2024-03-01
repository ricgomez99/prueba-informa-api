export class TasksController {
  constructor({ tasksModel }) {
    this.tasksModel = tasksModel
  }

  getAll = async (req, res) => {
    const tasks = await this.tasksModel.getTasks()
    res.json(tasks)
  }

  createTask = async (req, res) => {
    if (!req.body) {
      res.status(400).json({ message: 'Unable to create task' })
    }

    const newTask = await this.tasksModel.createTask({ input: req.body })
    res.status(201).json(newTask)
  }
}
