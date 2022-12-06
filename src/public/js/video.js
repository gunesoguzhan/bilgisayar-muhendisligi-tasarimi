const cameraButton = document.querySelector('#camera-button')
const microphoneButton = document.querySelector('#microphone-button')
var isCameraEnabled = true
var isMicrophoneEnabled = true

cameraButton.addEventListener('click', async => {
    if (isCameraEnabled) {
        turnOffCamera()
        isCameraEnabled = false
        cameraButton.style.backgroundImage = "url('../img/camera-off.png')"
    }
    else {
        turnOnCamera()
        isCameraEnabled = true
        cameraButton.style.backgroundImage = "url('../img/camera-on.png')"
    }
})

microphoneButton.addEventListener('click', async () => {
    if (isMicrophoneEnabled) {
        turnOffMicrophone()
        isMicrophoneEnabled = false
        microphoneButton.style.backgroundImage = "url('../img/mute.png')"

    } else {
        turnOnMicrophone()
        isMicrophoneEnabled = true
        microphoneButton.style.backgroundImage = "url('../img/unmute.png')"
    }
})