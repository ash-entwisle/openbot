import { Hono } from 'hono'
import { Logger } from './libs/logger'
const app = new Hono()

Logger.info('Server started')

app.get('/', (c) => c.text('Hono!'))

export default app