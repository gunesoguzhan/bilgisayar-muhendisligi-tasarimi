const localVideo = document.querySelector('#local-video > video')

const createMedia = async () =>
    await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

const enableVideoTracks = () =>
    localVideo.srcObject.getVideoTracks().forEach(t => t.enabled = true)

const disableVideoTracks = () =>
    localVideo.srcObject.getVideoTracks().forEach(t => t.enabled = false)

const enableAudioTracks = () =>
    localVideo.srcObject.getAudioTracks().forEach(t => t.enabled = true)

const disableAudioTracks = () =>
    localVideo.srcObject.getAudioTracks().forEach(t => t.enabled = false)