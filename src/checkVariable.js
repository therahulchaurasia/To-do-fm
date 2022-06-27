export default function checkVariables(element) {
  const elem = document.querySelector(element);
  if (elem) {
    return elem;
  } else {
    console.log(`${elem} not correct element`);
  }
}
