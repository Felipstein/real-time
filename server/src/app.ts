import http from 'node:http'
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.use(express.json())
app.use(cors())

type CursorClient = {
  username: string
  pos?: {
    x: number
    y: number
  }
}

let users: CursorClient[] = []

io.on('connection', (socket) => {
  socket.on('client@connected', (username) => {
    users.push({ username })

    socket.emit('users@updated', users)
  })

  socket.on('client@disconnected', (username) => {
    users = users.filter((user) => user.username !== username)

    socket.emit('users@updated', users)
  })

  socket.on('cursor-client@move', (cursorUpdated: CursorClient) => {
    users = users.map((user) =>
      user.username === cursorUpdated.username ? cursorUpdated : user,
    )

    console.log(cursorUpdated)

    socket.emit('users@updated', users)
  })
})

export { app, server, io }
