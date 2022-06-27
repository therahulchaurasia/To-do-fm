import checkVariables from "./checkVariable.js";
const tickbutton = checkVariables(".labeltick");
const input = checkVariables(".main-input");
export default function inputtick() {
  if (input.value.length >= 1) {
    tickbutton.classList.add("show-tick");
  } else {
    tickbutton.classList.remove("show-tick");
  }
}
