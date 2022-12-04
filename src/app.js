import express from 'express'
import config from './config.json' assert { type: 'json' }
import router from './routes/router.js'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const port = config.server.port || 3000
const server = http.createServer(app)
const io = new Server(server)

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.static('./src/public'))
app.use('/', router)

var numberOfParticipans = 0

io.on('connection', socket => {
    io.emit('connection', socket.id)
    numberOfParticipans++
    if (numberOfParticipans == 2) {
        socket.broadcast.emit('peer connect', socket.id)
    }
    socket.on('offer', offer => {
        socket.broadcast.emit('offer', offer)
    })
    socket.on('answer', answer => {
        socket.broadcast.emit('answer', answer)
    })
    socket.on('disconnect', () => {
        numberOfParticipans--
    })
})

server.listen(port, () => {
    console.log(`Application running on port: ${port}`)
});