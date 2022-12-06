var combinedStream
var audioStream
var videoStream
const video = document.querySelector('#local-video > video')
video.height = 160
video.width = 320

const constraintsVideo = {
    audio: false,
    video: {
        width: video.width,
        height: video.height
    }
}
const constraintsAudio = {
    audio: true,
    video: false
}

const createVideoMedia = async () => await navigator.mediaDevices.getUserMedia(constraintsVideo)
const createAudioMedia = async () => await navigator.mediaDevices.getUserMedia(constraintsAudio)

const initialize = async () => {
    audioStream = await createAudioMedia()
    videoStream = await createVideoMedia()
    combinedStream = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()])
    video.srcObject = combinedStream
}

initialize()

const turnOnCamera = async () => {
    videoStream = await createVideoMedia()
    videoStream.getTracks().forEach(async (el) => { await combinedStream.addTrack(el) })
}

const turnOffCamera = async () => {
    combinedStream.getVideoTracks().forEach(async (e) => {
        await e.stop()
        await combinedStream.removeTrack(e)
    })
}

const turnOnMicrophone = async () => {
    audioStream = await createAudioMedia()
    audioStream.getTracks().forEach(el => { combinedStream.addTrack(el) })
}

const turnOffMicrophone = async () => {
    combinedStream.getAudioTracks().forEach(e => {
        e.stop()
        combinedStream.removeTrack(e)
    })
}