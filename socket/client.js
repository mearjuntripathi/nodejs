const socket = io();

let localStream;
let remoteStream;

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localStream = stream;
        const localVideo = document.getElementById('localVideo');
        localVideo.srcObject = localStream;
        socket.emit('offer', JSON.stringify(stream));
    })
    .catch(error => {
        console.error('Error accessing media devices:', error);
    });

socket.on('offer', offer => {
    const offerObj = JSON.parse(offer);
    createPeerConnection();
    pc.setRemoteDescription(new RTCSessionDescription(offerObj));

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            localStream = stream;
            const localVideo = document.getElementById('localVideo');
            localVideo.srcObject = localStream;
            pc.addStream(localStream);
            pc.createAnswer()
                .then(answer => {
                    pc.setLocalDescription(answer);
                    socket.emit('answer', JSON.stringify(answer));
                })
                .catch(error => {
                    console.error('Error creating answer:', error);
                });
        })
        .catch(error => {
            console.error('Error accessing media devices:', error);
        });
});

socket.on('answer', answer => {
    const answerObj = JSON.parse(answer);
    pc.setRemoteDescription(new RTCSessionDescription(answerObj));
});

socket.on('ice-candidate', candidate => {
    pc.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
});

function createPeerConnection() {
    pc = new RTCPeerConnection();

    pc.onaddstream = (event) => {
        remoteStream = event.stream;
        const remoteVideo = document.getElementById('remoteVideo');
        remoteVideo.srcObject = remoteStream;
    };

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice-candidate', JSON.stringify(event.candidate));
        }
    };
}
