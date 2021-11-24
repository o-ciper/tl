const secondsSpan = document.querySelector(".seconds");
const startBtn = document.querySelector(".start-button");
const resetBtn = document.querySelector(".reset-button");
const redLight = document.querySelector("#red");
const yellowLight = document.querySelector("#yellow");
const greenLight = document.querySelector("#green");

const btnRed = document.querySelector(".red-btn");
const btnYellow = document.querySelector(".yellow-btn");
const btnGreen = document.querySelector(".green-btn");
const btnReset = document.querySelector(".reset-btn");
const redLight2 = document.querySelector("#red2");
const yellowLight2 = document.querySelector("#yellow2");
const greenLight2 = document.querySelector("#green2");

const waitTime = 5;

const fsm = {
  START: {
    handler: handleStateStart,
    time: 0,
    next: "RED"
  },
  RED: {
    handler: handleStateRed,
    time: waitTime,
    next: "RED_YELLOW",
  },
  RED_YELLOW: {
    handler: handleStateRedYellow,
    time: waitTime,
    next: "GREEN",
  },
  GREEN: {
    handler: handleStateGreen,
    time: waitTime,
    next: "GREEN_YELLOW",
  },
  GREEN_YELLOW: {
    handler: handleStateGreenYellow,
    time: waitTime,
    next: "RED",
  }
}

const fsm2 = {
  START: {
    handler: handleStateStart,
    time: 0,
    next: "RED"
  },
  RED: {
    handler: handleStateRed,
    time: waitTime,
    next: "RED_YELLOW",
  },
  RED_YELLOW: {
    handler: handleStateRedYellow,
    time: waitTime,
    next: "GREEN",
  },
  GREEN: {
    handler: handleStateGreen,
    time: waitTime,
    next: "GREEN_YELLOW",
  },
  GREEN_YELLOW: {
    handler: handleStateGreenYellow,
    time: waitTime,
    next: "RED",
  }
}

let currState = "START";
let currState2 = "START";
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

function handleColorType2(currState) {
  switch (currState) {
    case "START":
      redLight2.classList.remove("red-lit");
      yellowLight2.classList.remove("yellow-lit");
      greenLight2.classList.remove("green-lit");
      break;
    case "RED":
      redLight2.classList.add("red-lit");
      yellowLight2.classList.remove("yellow-lit");
      greenLight2.classList.remove("green-lit");
      break;
    case "RED_YELLOW":
      redLight2.classList.remove("red-lit");
      yellowLight2.classList.add("yellow-lit");
      greenLight2.classList.remove("green-lit");
      break;
    case "GREEN":
      redLight2.classList.remove("red-lit");
      yellowLight2.classList.remove("yellow-lit");
      greenLight2.classList.add("green-lit");
      break;
    case "GREEN_YELLOW":
      redLight2.classList.remove("red-lit");
      yellowLight2.classList.add("yellow-lit");
      greenLight2.classList.remove("green-lit");
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

function updateUI2(currState2) {
  console.log("click")
  handleColorType2(currState2);
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
        currTime = 0;
        target = fsm[fsm[currState].next].time;
        currTime = target;
        fsm[currState].handler();
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
    clearInterval(intervalID);
    if (currTime < 0) {
      currTime = 0;
    } else {
      currTime = Math.round(currTime + ((currTime + 500) / 1000))
    }
    updateUI(currTime, currState);
  }
});

btnRed.addEventListener("click", () => {
  currState2 = "RED";
  updateUI2(currState2);
});

btnYellow.addEventListener("click", () => {
  currState2 = "RED_YELLOW";
  updateUI2(currState2);
});

btnGreen.addEventListener("click", () => {
  currState2 = "GREEN";
  updateUI2(currState2);
});

btnReset.addEventListener("click", () => {
  currState2 = "START";
  updateUI2(currState2);
});