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
elHands.forEach((hand) => {
  hand.addEventListener("click", (evt) => {
    const player = evt.target.alt;
    const playerSrc = evt.target.src;
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
      } else if (winner === "Lose" && score > 0) {
        score--;
        elScore.textContent = score;
      } else if (winner === "Draw") {
        elScore.textContent = score;
      }
    }, 1000);
  });
});

elRules.addEventListener("click", () => {
  elRulesModal.classList.remove("hidden");
  elOverlay.style.filter = "blur(2px)";
});

elCloseModal.addEventListener("click", () => {
  elRulesModal.classList.add("hidden");
  elOverlay.style.filter = "none";
});

elLevelUp.addEventListener("click", () => {
  window.location.href = "./pages/hard.html";
});

if (document.body.classList.contains("index")) {
  setMode("easy");
} else if (document.body.classList.contains("hard")) {
  setMode("hard");
}
elRefreshGame.addEventListener("click", refreshGame);
