var combinedStream;
var audioStream;
var videoStream;
const btnCam = document.querySelector('#btnCam');
const btnMic = document.querySelector('#btnMic');
const video = document.querySelector('video');
video.height = 320;
video.width = 640;
var camEnabled = true;
var micEnabled = true;

const constraintsVideo = {
    audio: false,
    video: {
        width: video.width,
        height: video.height
    }
};
const constraintsAudio = {
    audio: true,
    video: false
};

const createVideoMedia = async () => await navigator.mediaDevices.getUserMedia(constraintsVideo);
const createAudioMedia = async () => await navigator.mediaDevices.getUserMedia(constraintsAudio);

(async () => {
    audioStream = await createAudioMedia();
    videoStream = await createVideoMedia();
    combinedStream = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()])
    video.srcObject = combinedStream;
})();

btnCam.addEventListener('click', async () => {
    if (camEnabled) {
        combinedStream.getVideoTracks().forEach(async (e) => {
            await e.stop();
            await combinedStream.removeTrack(e);
        });
        camEnabled = false;
        btnCam.innerHTML = 'Cam on'
    } else {
        videoStream = await createVideoMedia();
        videoStream.getTracks().forEach(async (el) => { await combinedStream.addTrack(el) });
        camEnabled = true;
        btnCam.innerHTML = 'Cam off'
    }
});

btnMic.addEventListener('click', async () => {
    if (micEnabled) {
        combinedStream.getAudioTracks().forEach(e => {
            e.stop();
            combinedStream.removeTrack(e);
        });
        micEnabled = false;
        btnMic.innerHTML = "Mic on";
    } else {
        audioStream = await createAudioMedia();
        audioStream.getTracks().forEach(el => { combinedStream.addTrack(el) });
        micEnabled = true;
        btnMic.innerHTML = "Mic off";
    }
})