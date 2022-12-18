var peerConnections = []

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

const createPeerConnection = remoteClientId => {
    const pc = new RTCPeerConnection()
    pc.remoteClientId = remoteClientId
    peerConnections[remoteClientId] = pc
    var flag = false
    pc.ontrack = e => {
        if (flag)
            return
        flag = true
        addRemoteVideo(e.streams[0], remoteClientId)
    }
    localVideo.srcObject.getTracks().forEach(t => pc.addTrack(t, localVideo.srcObject))
    return pc
}

const createOffer = async pc => {
    pc.dataChannel = pc.createDataChannel('channel')
    pc.dataChannel.onopen = e => console.log('Connection opened.')
    pc.dataChannel.onmessage = e => onMessage(e.data)
    var flag = true
    pc.onicecandidate = e => {
        if (flag) {
            socket.emit('create-answer', pc.localDescription, pc.remoteClientId)
            flag = false
        }
    }
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    console.log('Offer created.')
    return offer
}

const createAnswer = async (pc, offer) => {
    pc.ondatachannel = e => {
        pc.dataChannel = e.channel
        pc.dataChannel.onopen = x => console.log('Connection opened.')
        pc.dataChannel.onmessage = x => onMessage(x.data)
    }
    var flag = true
    pc.onicecandidate = e => {
        if (flag) {
            socket.emit('set-answer', pc.localDescription, pc.remoteClientId)
            flag = false
        }
    }
    await pc.setRemoteDescription(offer)
    const answer = pc.createAnswer()
    await pc.setLocalDescription(answer)
    console.log('Answer created.')
    return answer
}

const setAnswer = async (pc, answer) => {
    await pc.setRemoteDescription(answer)
    console.log('Answer set.')
}