import { createApp } from '../../app'
import { TasksModel } from '../Models/MongoDB/tasksModel'
import request from 'supertest'

const app = createApp({ tasksModel: TasksModel })
const date = new Date().toLocaleString()
const taskMock = {
  title: 'Just a test Task',
  creationDate: date,
}
let taskId

describe('GET /tasks', () => {
  it('It should return all the registered tasks', (done) => {
    request(app)
      .get('/tasks')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET /tasks/:id', () => {
  it('It should return a json with a single task', (done) => {
    request(app)
      .get('/tasks/65e103ce802f0c26b1212083')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })

  it("It should fail if the task doesn't exists in the database", (done) => {
    request(app)
      .get('/tasks/65e1d59cd026df73626c3cc6')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect({ message: 'Task not found' })
      .expect(400)
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('POST /tasks', () => {
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

describe('DELETE /tasks/:id', () => {
  it('It should be able to delete a task', (done) => {
    expect(taskId).toBeDefined()
    request(app)
      .delete(`/tasks/${taskId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect({ message: 'Task Deleted' })
      .expect(200)
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('PATCH /tasks/:id', () => {
  it('It should be able to update task title', (done) => {
    const dataUpdate = {
      title: 'My first update',
    }
    request(app)
      .patch('/tasks/65e123aad36324668fd6a33a')
      .send(dataUpdate)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.title = 'My first update'
      })
      .expect(201)
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })

  it('It should be able to update task creation date', (done) => {
    const dataUpdate = {
      creationDate: date,
    }
    request(app)
      .patch('/tasks/65e123aad36324668fd6a33a')
      .send(dataUpdate)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.creationDate = date
      })
      .expect(201)
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })
})
