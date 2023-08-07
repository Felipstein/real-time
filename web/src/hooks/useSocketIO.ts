'use client'

import { useEffect, useState } from 'react'
import socketIo, { Socket } from 'socket.io-client'

export function useSocketIO(username: string) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socket = socketIo(process.env.SERVER_URL ?? 'http://localhost:3333', {
      transports: ['websocket'],
    })

    socket.emit('client@connected', username)

    setSocket(socket)

    return () => {
      socket.emit('client@disconnected', username)

      socket.close()
    }
  }, [username])

  return socket
}
