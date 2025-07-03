let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

document.getElementById("startBtn").addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
  }
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  updateDisplay();
  laps.innerHTML = '';
});

document.getElementById("lapBtn").addEventListener("click", () => {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = formatTime(elapsedTime);
    laps.appendChild(li);
  }
});
