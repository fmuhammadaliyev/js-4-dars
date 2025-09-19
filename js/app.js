import { aiChoose } from "./ai-choose.js";
import {
  elAi,
  elCloseModal,
  elHands,
  elLevelUp,
  elOverlay,
  elPlayer,
  elRefreshGame,
  elRules,
  elRulesModal,
  elScore,
  elStatus,
} from "./html-elements.js";
import { refreshGame } from "./refresh-game.js";
import { switchZone } from "./switch-zone.js";
import { mode, setMode } from "./mode.js";
import { checkWinner } from "./check-winner.js";
let score = 0;
function startGame(player, playerSrc) {
  switchZone(true);
  elPlayer.src = playerSrc;

  setTimeout(() => {
    const ai = aiChoose(mode);
    elAi.src = `/images/${ai}.svg`;
    elAi.classList.add("w-[145px]", "h-[148px]");
    elPlayer.classList.add("w-[145px]", "h-[148px]");
    const winner = checkWinner(ai, player);
    elStatus.innerText = winner;

    if (winner === "Win") {
      score++;
      elScore.textContent = score;
      localStorage.setItem("score", score);
    } else if (winner === "Lose" && score > 0) {
      score--;
      elScore.textContent = score;
      localStorage.setItem("score", score);
    } else if (winner === "Draw") {
      elScore.textContent = score;
    }
  }, 1000);
}

elHands.forEach((hand) => {
  hand.addEventListener("click", (evt) => {
    const player = evt.target.alt;
    const playerSrc = evt.target.src;

    startGame(player, playerSrc);
    localStorage.setItem(
      "lastMove",
      JSON.stringify({ player, playerSrc, time: Date.now() })
    );
  });
});

elRules.addEventListener("click", () => {
  elRulesModal.classList.remove("hidden");
  elOverlay.style.filter = "blur(2px)";
  localStorage.setItem("rulesOpen", "true");
});

elCloseModal.addEventListener("click", () => {
  elRulesModal.classList.add("hidden");
  elOverlay.style.filter = "none";
  localStorage.setItem("rulesOpen", "false");
});

elLevelUp.addEventListener("click", () => {
  window.location.href = "./pages/hard.html";
});

elRefreshGame.addEventListener("click", () => {
  refreshGame();
  localStorage.setItem("refreshGame", Date.now());
});

if (document.body.classList.contains("index")) {
  setMode("easy");
} else if (document.body.classList.contains("hard")) {
  setMode("hard");
}

const elBtm = document.getElementById("btm");

elBtm.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    localStorage.setItem("mode", "light");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("mode", "dark");
  }
});

window.addEventListener("storage", (e) => {
  if (e.key === "mode") {
    if (e.newValue === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  if (e.key === "score") {
    elScore.textContent = e.newValue;
    score = parseInt(e.newValue);
  }

  if (e.key === "lastMove" && e.newValue) {
    const { player, playerSrc } = JSON.parse(e.newValue);
    startGame(player, playerSrc);
  }

  if (e.key === "rulesOpen") {
    if (e.newValue === "true") {
      elRulesModal.classList.remove("hidden");
      elOverlay.style.filter = "blur(2px)";
    } else {
      elRulesModal.classList.add("hidden");
      elOverlay.style.filter = "none";
    }
  }

  if (e.key === "refreshGame") {
    refreshGame();
  }
});

const savedMode = localStorage.getItem("mode");
if (savedMode === "dark") {
  document.body.classList.add("dark");
}

const savedScore = localStorage.getItem("score");
if (savedScore) {
  elScore.textContent = savedScore;
  score = parseInt(savedScore);
}

if (localStorage.getItem("rulesOpen") === "true") {
  elRulesModal.classList.remove("hidden");
  elOverlay.style.filter = "blur(2px)";
}
