const microphoneSwitch = document.querySelector('#microphone-switch  input')
const cameraSwitch = document.querySelector('#camera-switch  input')
const form = document.querySelector('#form form')
var isCamEnabled = true
var isMicEnabled = true

form.onsubmit = () => {
    console.log('hello')
    const username = document.querySelector("#username")
    if (username.value == '') return false
}

cameraSwitch.addEventListener('change', () => {
    if (isCamEnabled) disableCam()
    else enableCam()

})

microphoneSwitch.addEventListener('change', () => {
    if (isCamEnabled) enableMic()
    else disableMic()
})

const initialize = async () =>
    localVideo.srcObject = new MediaStream([...(await createMedia()).getTracks()])


const enableCam = () => {
    enableVideoTracks()
    isCamEnabled = true
}

const enableMic = () => {
    enableAudioTracks()
    isMicEnabled = true
}

const disableCam = () => {
    disableVideoTracks()
    isCamEnabled = false

}

const disableMic = () => {
    disableAudioTracks()
    isMicEnabled = false
}

initialize();