var socket = io()

var myId
var peerId
var lc
var dc

const iceConfiguration = {
    iceServers: [{
        urls: [
            // 'stun:stun1.l.google.com:19302',
            // 'stun:stun2.l.google.com:19302'
            'turn:numb.viagenie.ca'
        ],
        credential: 'muazkh',
        username: 'webrtc@live.com'
    }]
}

socket.on('connection', id => {
    console.log('Joined to the room.')
    myId = id
})

socket.on('peer connect', id => {
    peerId = id
    console.log('Peer connected.')
    lc = new RTCPeerConnection(iceConfiguration)
    var flag = 0;
    lc.onicecandidate = e => {
        if (flag == 0) {
            socket.emit('offer', lc.localDescription)
            flag = 1
        }
    }
    dc = lc.createDataChannel('channel')
    dc.onopen = e => console.log('Channel opened.')
    dc.onmessage = e => onMessage(e.data)
    lc.createOffer().then(o => lc.setLocalDescription(o)).then(x => console.log('Offer created.'))
})

socket.on('offer', offer => {
    lc = new RTCPeerConnection(iceConfiguration)
    lc.onicecandidate = e => socket.emit('answer', lc.localDescription)
    lc.ondatachannel = e => {
        dc = e.channel
        dc.onopen = e => console.log('Channel opened.')
        dc.onmessage = e => onMessage(e.data)
    }
    lc.setRemoteDescription(offer).then(x => console.log('Offer set.'))
    lc.createAnswer().then(o => lc.setLocalDescription(o)).then(x => console.log('Answer created.'))
})

socket.on('answer', answer => {
    lc.setRemoteDescription(answer).then(x => console.log('Answer set.'))
})

