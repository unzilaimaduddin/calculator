const buttons = document.querySelectorAll(".btn");
const display = document.querySelector("#display");
const modeToggle = document.querySelector("#modeToggle");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBeep() {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = "sine";
  oscillator.frequency.value = 500;
  gainNode.gain.value = 0.1;

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.08);
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    playBeep();

    let value = button.innerText;

    if (value === "C") {
      display.value = "";
    } else if (value === "⌫") {
      display.value = display.value.slice(0, -1);
    } else if (value === "=") {
      try {
        let result = eval(display.value);

        if (result === Infinity || result === -Infinity || isNaN(result)) {
          display.value = "Error";
        } else {
          display.value = result;
        }
      } catch (error) {
        display.value = "Error";
      }
    } else {
      display.value = display.value + value;
    }
  });
});

modeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    modeToggle.innerText = "☀️ Light Mode";
  } else {
    modeToggle.innerText = "🌙 Dark Mode";
  }
});
