const rules = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

export function checkWinner(ai, player) {
  if (ai === player) return "Draw";
  else if (rules[player].includes(ai)) return "Win";
  else return "Lose";
}
