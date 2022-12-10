var socket = io()

socket.on('join-room', async socketId => {
    console.log(`Joined room ${ROOM_ID}`)
    await initialize(CAM, MIC)
    socket.emit('join-room', ROOM_ID)
})

socket.on('user-connected', remoteClientId => {
    console.log('User connected: ' + remoteClientId)
})

socket.on('user-disconnected', remoteClientId => {
    console.log('User disconnected: ' + remoteClientId)
    const index = peerConnections.findIndex(p => p.remoteClientId == remoteClientId)
    peerConnections.splice(index, 1)
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
    const pc = peerConnections.find(p => p.remoteClientId == remoteClientId)
    await setAnswer(pc, answer)
})

socket.on('camera-turned-on', remoteClientId => {
    showVideo(remoteClientId)
})
socket.on('camera-turned-off', remoteClientId => {
    hideVideo(remoteClientId)
})
socket.on('microphone-turned-on', remoteClientId => {

})
socket.on('microphone-turned-off', remoteClientId => {

})