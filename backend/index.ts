import { Hono } from 'hono'
import { Logger } from 'openbot-commons/logger'

async function startServer() {
    
    const app = new Hono()
    app.get('/', (c) => c.text('Hono!'))
    
    Logger.info('Server started')
    return app
}

export default startServer