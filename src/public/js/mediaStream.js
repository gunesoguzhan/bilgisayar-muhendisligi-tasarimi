var audioStream = null
var videoStream = null
var localStream = null
const localVideo = document.querySelector('#local-video > video')

const initialize = async (cam, mic) => {
    localStream = new MediaStream()
    if (cam) await turnOnCamera()
    else await turnOffCamera()
    if (mic) await turnOnMicrophone()
    else await turnOffMicrophone()
    localVideo.srcObject = localStream
}

const createVideoMedia = async () => await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
const createAudioMedia = async () => await navigator.mediaDevices.getUserMedia({ audio: true, video: false })

const addVideoTracks = async () => {
    videoStream = await createVideoMedia()
    videoStream.getTracks().forEach(async t => localStream.addTrack(t))
}

const removeVideoTracks = async () => {
    localStream.getVideoTracks().forEach(async t => {
        t.stop()
        localStream.removeTrack(t)
    })
}

const addAudioTracks = async () => {
    audioStream = await createAudioMedia()
    audioStream.getTracks().forEach(t => localStream.addTrack(t))
}

const removeAudioTracks = async () => {
    localStream.getAudioTracks().forEach(t => {
        t.stop()
        localStream.removeTrack(t)
    })
}