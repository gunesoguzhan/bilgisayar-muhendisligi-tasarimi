var socket = io()

socket.on('join-room', async socketId => {
    USERID = socketId
    console.log(`Joined room ${ROOM_ID}`)
    await initialize(CAM, MIC)
    socket.emit('join-room', ROOM_ID)
})

socket.on('user-connected', remoteClientId => {
    console.log('User connected: ' + remoteClientId)
})

socket.on('user-disconnected', remoteClientId => {
    console.log('User disconnected: ' + remoteClientId)
    delete peerConnections[remoteClientId]
    removeRemoteVideo(remoteClientId)
})

socket.on('create-offer', async remoteClientId => {
    const pc = createPeerConnection(remoteClientId)
    await createOffer(pc)
})

socket.on('create-answer', async (offer, remoteClientId) => {
    const pc = createPeerConnection(remoteClientId)
    await createAnswer(pc, offer)
})

socket.on('set-answer', async (answer, remoteClientId) => {
    await setAnswer(peerConnections[remoteClientId], answer)
})

socket.on('camera-turned-on', remoteClientId => {
    showVideo(remoteClientId)
})
socket.on('camera-turned-off', remoteClientId => {
    hideVideo(remoteClientId)
})