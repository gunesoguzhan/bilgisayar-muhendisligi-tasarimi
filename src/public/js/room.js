const lc = new RTCPeerConnection();
const dc = lc.createDataChannel('channel');
dc.onopen = e => console.log('channel created!')
dc.onmessage = e => console.log(`new message from client: ${e.data}`)
lc.onicecandidate = e => console.log(`new ice candidate! Reprinting SDP: ${JSON.stringify(lc.localDescription)}`)
lc.createOffer().then(o => lc.setLocalDescription(o)).then(e => console.log('offer created!'))