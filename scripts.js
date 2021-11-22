const secondsSpan = document.querySelector(".seconds");
const startBtn = document.querySelector(".start-button");
const resetBtn = document.querySelector(".reset-button");
const redLight = document.querySelector("#red");
const yellowLight = document.querySelector("#yellow");
const greenLight = document.querySelector("#green");

const fsm = {
  START: {
    handler: handleStateStart,
    time: 0,
    next: "RED"
  },
  RED: {
    handler: handleStateRed,
    time: 6,
    next: "RED_YELLOW",
  },
  RED_YELLOW: {
    handler: handleStateRedYellow,
    time: 6,
    next: "GREEN",
  },
  GREEN: {
    handler: handleStateGreen,
    time: 6,
    next: "GREEN_YELLOW",
  },
  GREEN_YELLOW: {
    handler: handleStateGreenYellow,
    time: 6,
    next: "RED",
  }
}

let currState = "START";
let isRunning = false;
let currTime = 0;
let secondsText = "";
let ref = 0;
let timeOutId = 0;
let target = 0;
let intervalID = 0;
let mainInterface = true;

function setCurrState(name) {
  currState = name;
}

function handleStateStart() {
  setCurrState("RED");
}

function handleStateRed() {
  setCurrState("RED_YELLOW");
}

function handleStateRedYellow() {
  setCurrState("GREEN");
}

function handleStateGreen() {
  setCurrState("GREEN_YELLOW")
}

function handleStateGreenYellow() {
  setCurrState("RED");
}

function handleColorType(currState) {
  switch (currState) {
    case "START":
      redLight.classList.remove("red-lit");
      yellowLight.classList.remove("yellow-lit");
      greenLight.classList.remove("green-lit");
      secondsSpan.classList.remove("yellow-counter");
      secondsSpan.classList.remove("green-counter");
      secondsSpan.classList.remove("red-counter");
      break;
    case "RED":
      redLight.classList.add("red-lit");
      yellowLight.classList.remove("yellow-lit");
      greenLight.classList.remove("green-lit");
      secondsSpan.classList.remove("yellow-counter");
      secondsSpan.classList.remove("green-counter");
      secondsSpan.classList.add("red-counter");
      break;
    case "RED_YELLOW":
      redLight.classList.remove("red-lit");
      yellowLight.classList.add("yellow-lit");
      greenLight.classList.remove("green-lit");
      secondsSpan.classList.remove("red-counter");
      secondsSpan.classList.remove("green-counter");
      secondsSpan.classList.add("yellow-counter");
      break;
    case "GREEN":
      redLight.classList.remove("red-lit");
      yellowLight.classList.remove("yellow-lit");
      greenLight.classList.add("green-lit");
      secondsSpan.classList.remove("yellow-counter");
      secondsSpan.classList.remove("red-counter");
      secondsSpan.classList.add("green-counter");
      break;
    case "GREEN_YELLOW":
      redLight.classList.remove("red-lit");
      yellowLight.classList.add("yellow-lit");
      greenLight.classList.remove("green-lit");
      secondsSpan.classList.remove("red-counter");
      secondsSpan.classList.remove("green-counter");
      secondsSpan.classList.add("yellow-counter");
      break;
    default:
      break;
  }
}

function updateUI(currTime, currState) {
  secondsSpan.textContent = currTime;
  if (isRunning) {
    startBtn.textContent = "Pause"
  } else if(currState !== "START") {
    startBtn.textContent = "Resume";
  } else {
    startBtn.textContent = "Start";
  }
  handleColorType(currState);
  // if (!currTime) {
  //   target = fsm[currState].time;
  //   // isRunning = !isRunning;
  //   startBtn.innerHTML = `
  //     Stop
  //   `;
  //   // startBtn.disabled = true;
  //   // startBtn.classList.remove("start-active");
  //   // startBtn.style.transform = "scale(1)";
  // }
}

// function countDown() {
//   let start = document.timeline.currentTime;
//   function frame(time) {
//     const elapsed = time - start;
//     const _seconds = Math.round(elapsed / 1000);
//     currTime = target - _seconds;
//     updateUI(currTime, currState);
//     const targetNext = (_seconds + 1) * 1000 + start;
//     setTimeout(
//       () => {
//         resetBtn.addEventListener("click", () => {          
//           cancelAnimationFrame(ref);
//           clearTimeout();
//           ref = 0;
//           currState = "START"
//           currTime = fsm[currState].time;
//           updateUI(currTime, currState);
//           isRunning = false;
//           return;
//         });
//         if (currTime < 1) {
//           // cancelAnimationFrame(ref);
//           // clearTimeout();
//           ref = 0;
//           console.log(currTime)
//           target = fsm[fsm[currState].next].time;
//           currTime = target;
//           console.log(currTime)
//           fsm[currState].handler();
//           // playAudio();
//           // return;
//         }
//         if (!isRunning) {
//           cancelAnimationFrame(ref);
//           clearTimeout();
//           ref = 0;
//           return;
//         }
//         ref = requestAnimationFrame(frame)
//       },
//       targetNext - performance.now()
//     );
//   }
  
//   frame(start);
// }

function countDown() {
  if (!isRunning) {
    clearInterval(intervalID);
    return;
  }
  intervalID = setInterval(
    () => {
      resetBtn.addEventListener("click", () => {          
        clearInterval(intervalID);
        ref = 0;
        currState = "START"
        currTime = fsm[currState].time;
        updateUI(currTime, currState);
        isRunning = false;
        return;
      });
      if (currTime < 0) {
        // cancelAnimationFrame(ref);
        // clearTimeout();
        // ref = 0;
        currTime = 0;
        target = fsm[fsm[currState].next].time;
        currTime = target;
        fsm[currState].handler();
        // playAudio();
        // return;
      }
      updateUI(currTime, currState);
      currTime--;
    }, 1000);
};

startBtn.addEventListener("click", (e) => {
  isRunning = !isRunning;
  target = fsm[currState].time;
  if (isRunning) {
    countDown();
  } else {
    // startBtn.style.backgroundColor = "#31791b";
    clearInterval(intervalID);
    if (currTime < 0) {
      currTime = 0;
    } else {
      currTime = Math.round(currTime + ((currTime + 500) / 1000))
    }

    updateUI(currTime, currState);
  }

});