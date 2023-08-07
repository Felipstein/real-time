import { server } from './app'

console.log('\x1b[2J\x1b[0f')

server.listen(3333, () => console.info('Server is running.'))
