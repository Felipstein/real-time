'use client'

import { useSocketIO } from '@/hooks/useSocketIO'
import { MousePointer2 } from 'lucide-react'
import { MouseEvent, useEffect, useState } from 'react'

type Pos = { x: number; y: number }

type CursorClient = {
  username: string
  pos?: Pos
}

export interface ContentProps {
  username: string
}

export function Content({ username }: ContentProps) {
  const socket = useSocketIO(username)

  const [cursors, setCursors] = useState<CursorClient[]>([])

  useEffect(() => {
    socket?.on('users@updated', (users: CursorClient[]) => {
      console.log({ users })

      setCursors(users)
    })
  }, [socket])

  if (!socket) {
    return <span>Connecting...</span>
  }

  function handleMouseMove(event: MouseEvent) {
    const { clientX: x, clientY: y } = event

    if (!socket) {
      return
    }

    const payload: CursorClient = {
      username,
      pos: { x, y },
    }

    socket.emit('cursor-client@move', payload)
  }

  function handleMouseLeave() {
    socket?.emit('cursor-client@move', {
      username,
      pos: undefined,
    } as CursorClient)
  }

  return (
    <div
      className="flex-1"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {cursors.map((cursor) => (
        <div key={cursor.username}>
          <span>{cursor.username}</span>
        </div>
      ))}

      {cursors
        .filter((cursor) => !!cursor.pos)
        .map((cursor) => (
          <div
            key={cursor.username}
            className="pointer-events-none absolute"
            style={{
              top: `${cursor.pos!.y}px`,
              left: `${cursor.pos!.x}px`,
            }}
          >
            <div className="relative">
              <span className="absolute -translate-x-1/4 -translate-y-full text-xs font-light opacity-10">
                {cursor.username}
              </span>

              <MousePointer2 className="h-5 w-5" />
            </div>
          </div>
        ))}
    </div>
  )
}
