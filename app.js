const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const session = document.querySelector('.minutes');
const sessionSeconds = document.querySelector('.seconds');
const message = document.querySelector('.app-message');
let myInterval;
let state = true;
let pause = false;

const messages = [
    "Keep going, you're doing great!",
    "Don't stop now, you're on a roll!",
    "You're making progress, keep it up!",
    "Every step you take is a step closer to your goal!",
    "The only way to achieve the impossible is to believe it is possible.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "Believe you can and you're halfway there.",
    "You are stronger than you think."
];

const resetTimer = () => {
    state = true;
    clearInterval(myInterval);
    session.textContent = '25';
    sessionSeconds.textContent = '00';
    startBtn.innerText = "Start";
    pause = false;
}

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent) + Number.parseInt(sessionSeconds.textContent) / 60;

    if(state && !pause) {
        state = false;
        let totalSeconds = sessionAmount * 60;

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds/60);
            let secondsLeft = totalSeconds % 60;

            if(secondsLeft < 10) {
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = `${secondsLeft}`;
            }

            if (Number.parseInt(minuteDiv.textContent) !== minutesLeft) {
                message.textContent = messages[Math.floor(Math.random() * messages.length)];
            }

            if (minutesLeft < 10) {
                minuteDiv.textContent = '0' + minutesLeft;
            } else {
                minuteDiv.textContent = `${minutesLeft}`;
            }


            if(minutesLeft === 0 && secondsLeft === 0) {
                message.textContent = "Time's up!";
                resetTimer()
                bells.play()
                clearInterval(myInterval);
            }
        }
        myInterval = setInterval(updateSeconds, 1000);
    } else if (!state && !pause) {
        alert('Session has already started.')
    }
}

startBtn.addEventListener('click', () => {
    if (pause) {
        pause = false;
    } else if (!state) {
        message.textContent = "press start to begin";
        resetTimer()
        return;
    }
    if (state) {
        appTimer();
        startBtn.innerText = "Stop";
    }
});
pauseBtn.addEventListener('click', () => {
    if (!state) {
        startBtn.innerText = "Resume";
        clearInterval(myInterval);
        state = true;
        pause = true;
    }
})