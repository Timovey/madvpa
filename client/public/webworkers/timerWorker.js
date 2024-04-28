let timerInterval = null;
let timer = [0, 0, 0];

function formatTimer() {
    return timer
        .map((v) => {
            const st = v.toString();
            return st.length === 1 ? `0${st}` : st;
        })
        .join(':');
}

function checkTimerValues() {
    if (timer[2] === 60) {
        timer[2] = 0;
        timer[1] += 1;

        checkTimerValues();
    }

    if (timer[1] === 60) {
        timer[1] = 0;
        timer[0] += 1;
    }
}

function runTimer(startTime) {
    const [hours = 0, minutes = 0, seconds = 0] = startTime
        .split(':')
        .map((v) => +v ?? 0);

    timer = [hours, minutes, seconds];
    const formatted = formatTimer();
    postMessage(formatted);

    timerInterval = setInterval(() => {
        timer[2] += 1;
        checkTimerValues();

        const formatted = formatTimer();
        postMessage(formatted);
    }, 1000);
}

onmessage = (event) => {
    const { start, stop, startTime = '00:00:00' } = event.data;

    if (start) {
        runTimer(startTime);
    }

    if (stop) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
};
