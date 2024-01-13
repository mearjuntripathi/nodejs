function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var sound;
function startConfetti() {
    sound = new Audio('./tune/confetty.mp3');
    sound.play();
    const confettiContainer = document.getElementById('confetti-container');

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 10 + 1}s`;
        confetti.style.backgroundColor = getRandomColor(); // Set random color

        confettiContainer.appendChild(confetti);
    }
}

function looser() {
    sound = new Audio('./tune/loss.mp3');
    sound.play();
}

function tie(){
    sound = new Audio('./tune/tie.m4a');
    sound.play();
}

function stopConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
    sound.pause();
}
