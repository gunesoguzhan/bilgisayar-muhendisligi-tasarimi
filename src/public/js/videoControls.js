const cameraButton = document.querySelector('#camera-button')
const microphoneButton = document.querySelector('#microphone-button')
var isCameraEnabled = true
var isMicrophoneEnabled = true

cameraButton.addEventListener('click', async () => {
    if (isCameraEnabled) await turnOffCamera()
    else await turnOnCamera()
})

microphoneButton.addEventListener('click', async () => {
    if (isMicrophoneEnabled) await turnOffMicrophone()
    else await turnOnMicrophone()
})

const addRemoteVideo = remoteStream => {
    const div = document.createElement('div')
    div.setAttribute('class', 'remote-video')
    const video = document.createElement('video')
    video.muted = true
    video.srcObject = remoteStream
    video.autoplay = true
    div.appendChild(video)
    const videoGrid = document.querySelector('#video-grid')
    videoGrid.appendChild(div)
}

const turnOnCamera = async () => {
    isCameraEnabled = true
    cameraButton.style.backgroundImage = "url('../img/camera-on.png')"
    await addVideoTracks()
}

const turnOffCamera = async () => {
    isCameraEnabled = false
    cameraButton.style.backgroundImage = "url('../img/camera-off.png')"
    await removeVideoTracks()
}

const turnOnMicrophone = async () => {
    isMicrophoneEnabled = true
    microphoneButton.style.backgroundImage = "url('../img/unmute.png')"
    await addAudioTracks()

}

const turnOffMicrophone = async () => {
    isMicrophoneEnabled = false
    microphoneButton.style.backgroundImage = "url('../img/mute.png')"
    await removeAudioTracks()
}