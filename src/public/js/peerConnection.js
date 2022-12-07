var peerConnections = []
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

const createOffer = async remoteClientId => {
    const pc = new RTCPeerConnection()
    peerConnections[remoteClientId] = pc
    var flag = true
    pc.onicecandidate = e => {
        if (flag) {
            socket.emit('create-answer', pc.localDescription, remoteClientId)
            flag = false
        }
    }
    localStream.getTracks().forEach(t => pc.addTrack(t, localStream))
    var flag2 = true
    pc.ontrack = e => {
        if (flag2) {
            const rs = new MediaStream()
            e.streams[0].getTracks().forEach(t => rs.addTrack(t))
            addRemoteVideo(rs)
            flag2 = false
        }
    }
    const dc = pc.createDataChannel('channel')
    peerConnections[remoteClientId].dataChannel = dc
    dc.onopen = e => console.log('Connection opened.')
    dc.onmessage = e => onMessage(e.data, remoteClientId)
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    console.log('Offer created.')
}

const createAnswer = async (offer, remoteClientId) => {
    const pc = new RTCPeerConnection()
    peerConnections[remoteClientId] = pc
    var flag1 = true
    pc.onicecandidate = e => {
        if (flag1) {
            socket.emit('set-answer', pc.localDescription, remoteClientId)
            flag1 = false
        }
    }
    localStream.getTracks().forEach(t => pc.addTrack(t, localStream))
    pc.ondatachannel = e => {
        const dc = e.channel
        peerConnections[remoteClientId].dataChannel = dc
        dc.onopen = x => console.log('Connection opened.')
        dc.onmessage = x => onMessage(x.data, remoteClientId)
    }
    var flag2 = true
    pc.ontrack = e => {
        if (flag2) {
            const rs = new MediaStream()
            e.streams[0].getTracks().forEach(t => rs.addTrack(t))
            addRemoteVideo(rs)
            flag2 = false
        }
    }
    await pc.setRemoteDescription(offer)
    const answer = pc.createAnswer()
    await pc.setLocalDescription(answer)
    console.log('Answer created.')
}

const setAnswer = async (answer, remoteClientId) => {
    const pc = peerConnections[remoteClientId]
    await pc.setRemoteDescription(answer)
    console.log('Answer set.')
}