'use client'

import { MousePointer2 } from 'lucide-react'
import { MouseEvent, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3333')

type Pos = { x: number; y: number }

export default function Home() {
  const [otherMouse, setOtherMouse] = useState<Pos | null>(null)

  useEffect(() => {
    socket.on('mouse@client', (a) => {
      setOtherMouse(a as Pos)
    })
  }, [])

  function handleMouseMove(event: MouseEvent) {
    const { clientX: x, clientY: y } = event

    socket.emit('mouse@move', { x, y } as Pos)
  }

  return (
    <div className="h-full" onMouseMove={handleMouseMove}>
      {otherMouse && (
        <div
          className="absolute"
          style={{ top: otherMouse.y, left: otherMouse.x }}
        >
          <MousePointer2 className="h-5 w-5" />
        </div>
      )}

      {!otherMouse && <span>No mouse</span>}
    </div>
  )
}
