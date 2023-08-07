'use client'

import { useEffect, useState } from 'react'
import socketIo, { Socket } from 'socket.io-client'

export function useSocketIO() {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socket = socketIo('http://localhost:3333', {
      transports: ['websocket'],
    })

    setSocket(socket)

    return () => {
      socket.close()
    }
  }, [])

  return socket
}
