import express from 'express'
import config from './config.json' assert { type: 'json' }
import http from 'http'
import { Server } from 'socket.io'
import router from './router/route.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = config.server.port || 3000
const server = http.createServer(app)
const io = new Server(server)

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./src/public'))
app.use(cookieParser())
app.use('/', router)


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
                return
        }
        socket.on('create-answer', (offer, remoteClientId) => {
            socket.to(remoteClientId).emit('create-answer', offer, socket.id)
            console.log(`User ${socket.id} answered to user ${remoteClientId}`)
        })
        socket.on('set-answer', (answer, remoteClientId) => {
            socket.to(remoteClientId).emit('set-answer', answer, socket.id)
            console.log(`Connection is ready in room ${roomId}`)
        })
        socket.on('camera-turned-on', () => {
            socket.broadcast.to(roomId).emit('camera-turned-on', socket.id)
        })
        socket.on('camera-turned-off', () => {
            socket.broadcast.to(roomId).emit('camera-turned-off', socket.id)
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