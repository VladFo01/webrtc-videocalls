// RTC configuration
const peerConnectionConfig = {
    iceServers: [
        {
            urls: 'stun:stun1.l.google.com:19302'
        }
    ],
    iceCandidatePoolSize: 10
}


//Global state
const pc = new RTCPeerConnection(peerConnectionConfig);
let localStream = null;
let remoteStream = null;

// DOM elements
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const localWebcam = document.getElementById('localWebcam');

// start stream event
localWebcam.addEventListener('click', async event => {
    event.preventDefault();
    
    localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    remoteStream = new MediaDevices();

    localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
    });

    pc.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        });
    }

    localVideo.srcObject = localStream;
    remoteVideo.srcObject = remoteStream;
});

