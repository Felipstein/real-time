import http from 'node:http'
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(cors())

io.on('connect', () => {
  console.log('Client connected')
})

export { app, server, io }
