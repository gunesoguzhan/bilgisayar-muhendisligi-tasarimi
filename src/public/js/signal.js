var socket = io()

var localConnections = []
var dataChannels = []
var localClientId

const iceConfiguration = {
    iceServers: [{
        urls: [
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302'
            // 'turn:numb.viagenie.ca'
        ],
        // credential: 'muazkh',
        // username: 'webrtc@live.com'
    }]
}
socket.on('join-room', socketId => {
    socket.emit('join-room', ROOM_ID)
    localClientId = socketId
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

const createOffer = async remoteClientId => {
    const lc = new RTCPeerConnection()
    localConnections[remoteClientId] = lc
    var flag = true
    lc.onicecandidate = e => {
        if (flag) {
            socket.emit('create-answer', lc.localDescription, remoteClientId)
            flag = false
        }
    }
    const dc = lc.createDataChannel('channel')
    dataChannels[remoteClientId] = dc
    dc.onopen = e => console.log('Connection opened.')
    dc.onmessage = e => onMessage(e.data, remoteClientId)
    const offer = await lc.createOffer()
    await lc.setLocalDescription(offer)
    console.log('Offer created.')
}

const createAnswer = async (offer, remoteClientId) => {
    const lc = new RTCPeerConnection()
    localConnections[remoteClientId] = lc
    var flag = true
    lc.onicecandidate = e => {
        if (flag) {
            socket.emit('set-answer', lc.localDescription, remoteClientId)
            flag = false
        }
    }
    lc.ondatachannel = e => {
        const dc = e.channel
        dataChannels[remoteClientId] = dc
        dc.onopen = x => console.log('Connection opened.')
        dc.onmessage = x => onMessage(x.data, remoteClientId)
    }
    await lc.setRemoteDescription(offer)
    const answer = lc.createAnswer()
    await lc.setLocalDescription(answer)
    console.log('Answer created.')
}

const setAnswer = async (answer, remoteClientId) => {
    const lc = localConnections[remoteClientId]
    await lc.setRemoteDescription(answer)
    console.log('Answer set.')
}