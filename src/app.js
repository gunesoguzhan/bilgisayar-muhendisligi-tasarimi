import express from 'express'
import config from './config.json' assert { type: 'json' }
import http from 'http'
import { Server } from 'socket.io'
import { randomUUID } from 'crypto'

const app = express()
const port = config.server.port || 3000
const server = http.createServer(app)
const io = new Server(server)

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.static('./src/public'))
app.get('/', (req, res) => res.redirect(`/${randomUUID()}`))
app.get('/:room', (req, res) => res.render('room', { roomId: req.params.room }))

io.on('connection', socket => {
    socket.emit('join-room', socket.id)
    socket.on('join-room', (roomId) => {
        socket.join(roomId)
        console.log(`User ${socket.id} connected to room ${roomId}`)
        socket.broadcast.to(roomId).emit('user-connected', socket.id)
        switch (io.sockets.adapter.rooms.get(roomId).size) {
            case 1:
                break
            case 2:
            case 3:
            case 4:
                io.sockets.adapter.rooms.get(roomId).forEach(x => {
                    if (x != socket.id) {
                        socket.emit('create-offer', x)
                        console.log(`User ${socket.id} offered to user ${x}`)
                    }
                })
                break
            default:
                break
        }
        socket.on('create-answer', (offer, remoteClientId) => {
            socket.to(remoteClientId).emit('create-answer', offer, socket.id)
            console.log(`User ${socket.id} answered to user ${remoteClientId}`)
        })
        socket.on('set-answer', (answer, remoteClientId) => {
            socket.to(remoteClientId).emit('set-answer', answer, socket.id)
            console.log(`Connection is ready in room ${roomId}`)
        })
        socket.on('disconnect', () => {
            socket.leave(roomId)
            console.log(`User ${socket.id} disconnected from room ${roomId}`)
            socket.broadcast.to(roomId).emit('user-disconnected', socket.id)
        })
    })
})

server.listen(port, () => {
    console.log(`Application running on port: ${port}`)
});