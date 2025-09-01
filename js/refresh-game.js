import { elAi } from "./html-elements.js";
import { switchZone } from "./switch-zone.js";

export function refreshGame() {
  switchZone(false);
  elAi.src = `/images/oval.svg`;
}
