import { createApp } from '../../app'
import { TasksModel } from '../Models/MongoDB/tasksModel'
import { randomUUID } from 'node:crypto'
import request from 'supertest'

const app = createApp({ tasksModel: TasksModel })
const date = new Date().toLocaleString()
const taskMock = {
  title: 'Just a test Task',
  creationDate: date,
}

describe('GET /tasks', () => {
  it('It should return all the registered tasks', (done) => {
    request(app)
      .get('/tasks')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('POST /tasks', () => {
  let taskId
  it('It should be able to create a new task', (done) => {
    request(app)
      .post('/tasks')
      .send(taskMock)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body)
        taskId = res.body._id
        expect(taskId).toBeDefined()
        done()
      })
  }, 10000)
})
