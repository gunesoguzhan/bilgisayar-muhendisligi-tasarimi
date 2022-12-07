var socket = io()

socket.on('join-room', async socketId => {
    localClientId = socketId
    console.log(`Joined room ${ROOM_ID}`)
    await initialize(true, true)
    socket.emit('join-room', ROOM_ID)
})

socket.on('user-connected', remoteClientId => {
    console.log('User connected: ' + remoteClientId)
})

socket.on('user-disconnected', remoteClientId => {
    console.log('User disconnected: ' + remoteClientId)
})

socket.on('create-offer', async remoteClientId => {
    await createOffer(remoteClientId)
})

socket.on('create-answer', async (offer, remoteClientId) => {
    await createAnswer(offer, remoteClientId)
})

socket.on('set-answer', async (answer, remoteClientId) => {
    await setAnswer(answer, remoteClientId)
})