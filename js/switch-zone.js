import { elGameZone, elProcessZone } from "./html-elements.js";

export function switchZone(boolean) {
  if (boolean) {
    elGameZone.classList.add("hidden");
    elProcessZone.classList.remove("hidden");
  } else {
    elGameZone.classList.remove("hidden");
    elProcessZone.classList.add("hidden");
  }
}
