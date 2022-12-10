const cameraButton = document.querySelector('#camera-button')
const microphoneButton = document.querySelector('#microphone-button')
var isCameraEnabled = false
var isMicrophoneEnabled = false

cameraButton.addEventListener('click', () => {
    if (isCameraEnabled) turnOffCamera()
    else turnOnCamera()
})

microphoneButton.addEventListener('click', () => {
    if (isMicrophoneEnabled) turnOffMicrophone()
    else turnOnMicrophone()
})

const initialize = async (cam, mic) => {
    localVideo.srcObject = new MediaStream([...(await createMedia()).getTracks()])
    if (mic == 'on') turnOnMicrophone()
    else turnOffMicrophone()
    if (cam == 'on') turnOnCamera()
    else turnOffCamera()
}

const setVideoGrid = () => {
    console.log('set video grid init')
    const activeVideos = document.querySelectorAll('.active-video')
    if (activeVideos.length == 1)
        activeVideos[0].className = 'active-video video-single'
    else if (activeVideos.length == 2)
        for (var i = 0; i < 2; i++)
            activeVideos[i].className = `active-video video-double-${i}`
    else if (activeVideos.length == 3)
        for (var i = 0; i < 3; i++)
            activeVideos[i].className = `active-video video-triple-${i}`
    else if (activeVideos.length == 4)
        for (var i = 0; i < 4; i++)
            activeVideos[i].className = `active-video video-quadriple-${i}`
}

const addRemoteVideo = (remoteStream, remoteClientId) => {
    const videoGrid = document.querySelector('#video-grid')
    const div = document.createElement('div')
    div.setAttribute('id', remoteClientId)
    div.setAttribute('class', 'active-video')
    const video = document.createElement('video')
    video.srcObject = remoteStream
    video.autoplay = true
    div.appendChild(video)
    videoGrid.prepend(div)
    setVideoGrid()
}

const removeRemoteVideo = remoteClientId => {
    document.getElementById(remoteClientId).remove()
    setVideoGrid()
}

const turnOnCamera = () => {
    isCameraEnabled = true
    cameraButton.style.backgroundImage = "url('../img/camera-on.png')"
    enableVideoTracks()
    socket.emit('camera-turned-on')
}

const turnOffCamera = () => {
    isCameraEnabled = false
    cameraButton.style.backgroundImage = "url('../img/camera-off.png')"
    disableVideoTracks()
    socket.emit('camera-turned-off')
}

const turnOnMicrophone = () => {
    isMicrophoneEnabled = true
    microphoneButton.style.backgroundImage = "url('../img/unmute.png')"
    enableAudioTracks()
    socket.emit('microphone-turned-on')
}

const turnOffMicrophone = () => {
    isMicrophoneEnabled = false
    microphoneButton.style.backgroundImage = "url('../img/mute.png')"
    disableAudioTracks()
    socket.emit('microphone-turned-off')
}

const showVideo = remoteClientId => {
    const e = document.getElementById(remoteClientId)
    e.classList.remove('hidden-video')
    e.classList.add('active-video')
    setVideoGrid()
}

const hideVideo = remoteClientId => {
    const e = document.getElementById(remoteClientId)
    e.classList.remove('active-video')
    e.classList.add('hidden-video')
    setVideoGrid()
}