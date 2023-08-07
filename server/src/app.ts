import http from 'node:http'
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

let connected = 0

app.use(express.json())
app.use(cors())

io.on('connection', (socket) => {
  connected += 1
  console.log(`a user connected ${connected} times`)

  socket.on('mouse@move', (a) => {
    socket.emit('mouse@client', a)
  })
})

export { app, server, io }
