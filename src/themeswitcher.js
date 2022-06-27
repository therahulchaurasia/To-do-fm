import checkVariables from "./checkVariable.js";

const span1 = document.querySelectorAll("span");

const toggletheme = checkVariables(".toggle");
export default toggletheme.addEventListener("click", () => {
  themeSwitch();
});
const themeSwitch = () => {
  document.documentElement.classList.toggle("dark-theme");
  span1[0].classList.toggle("donot");
  span1[1].classList.toggle("donot");
};
