document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loaded");
});

let container = document.querySelector('.welcome-container');
function startGame(btn) {
    stopConfetti();
    let div = document.createElement('div');
    div.classList.add('options');
    let btn1 = document.createElement('button');
    let btn2 = document.createElement('button');
    let btn3 = document.createElement('button');
    btn1.innerHTML = '<a href="game">Two Player</a>';
    btn2.innerHTML = '<a href="computer">Play Against Computer</a>';
    btn3.innerHTML = '<a href="multiplayer">Online Multiplayer</a>';
    div.appendChild(btn1);
    div.appendChild(btn2);
    div.appendChild(btn3);
    container.removeChild(btn);
    container.appendChild(div);
}

let audio = new Audio('./tune/welcome.mp3');
let isAudioPlaying = false;

function welcomeSong() {
    audio.play();
    isAudioPlaying = true;
}

mute.addEventListener('click', () => {
    if (!isAudioPlaying) {
        welcomeSong();
    }

    if (audio.paused) {
        audio.play();
        mute.innerHTML = '<i class="fa fa-volume-up"></i>';
    } else {
        audio.pause();
        mute.innerHTML = '<i class="fa fa-volume-mute"></i>';
    }
});

document.addEventListener('click', () => {
    if (!isAudioPlaying) {
        welcomeSong();
        startConfetti();
    }
});


// window.onbeforeunload = function () {
//     return "Do You want to exit";
// };