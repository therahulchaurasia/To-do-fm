import checkVariables from "./checkVariable.js";
import themeswitcher from "./themeswitcher.js";
import inputtick from "./tickbutton.js";
const list = checkVariables(".list-start");
const input = checkVariables(".main-input");
const form = checkVariables(".formheader");
const numberofitems = checkVariables(".once");
const btns = document.querySelectorAll(".btn");
const clearCompleted = checkVariables(".removebtn");
let arrayofValues = [];

input.addEventListener("input", () => {
  inputtick();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createElem();
});

window.addEventListener("DOMContentLoaded", () => {
  let newValues = JSON.parse(localStorage.getItem("list"));
  // console.log(newValues);
  if (newValues) {
    arrayofValues = arrayofValues.concat(newValues);
    showElem(newValues);
  }
});

clearCompleted.addEventListener("click", () => {
  removeComp();
});

function createElem() {
  const randomid = Math.random();
  const valueobject = { id: randomid, value: input.value, state: "active" };
  arrayofValues.push(valueobject);
  writeToLocalStorage(arrayofValues);
  showElem(arrayofValues);
  input.value = "";
  inputtick();
  btns.forEach((removeActive) => {
    removeActive.classList.remove("active");
  });
  btns[0].classList.add("active");
}
function showElem(value) {
  let displayItems = value
    .map((item) => {
      if (item.state === "completed") {
        return `<div class="main-li draggable" draggable="true" id=${item.id}>
        <li class="just-one another-one" >${item.value}</li>
        <span class="tick-circle"> <img src="../images/radio_button_unchecked_FILL0_wght300_GRAD0_opsz24.svg" alt="circle">
         <img src="../images/icon-check.svg" class="tickmark checked" alt="tick">
       </span>
        <span class="cross-tick">
         <img src="../images/icon-cross.svg" alt="cross"></span>
         </div>
        <hr>  `;
      } else {
        return `<div class="main-li draggable" draggable="true" id=${item.id}>
      <li class="just-one">${item.value}</li>
      <span class="tick-circle just-fill"> <img src="../images/radio_button_unchecked_FILL0_wght300_GRAD0_opsz24.svg" alt="circle">
       <img src="../images/icon-check.svg" class="tickmark" alt="tick">
     </span>
      <span class="cross-tick">
       <img src="../images/icon-cross.svg" alt="cross"></span>
       </div>
      <hr>  `;
      }
    })
    .join("");
  list.innerHTML = displayItems;
  numberofitems.textContent = `${
    arrayofValues.filter((someVal) => {
      return someVal.state !== "completed";
    }).length
  } items left`;
  //removeItem
  const crosstick = document.querySelectorAll(".cross-tick");
  crosstick.forEach((singletick) => {
    singletick.addEventListener("click", (e) => {
      const tick = e.currentTarget.parentElement;
      const newArray = arrayofValues.filter((item) => {
        if (item.id !== +tick.id) {
          return item;
        }
      });
      arrayofValues = newArray;
      showElem(arrayofValues);

      writeToLocalStorage(arrayofValues);
    });
  });
  //removeItems Completed
  //CompletedItem
  const listItem = document.querySelectorAll(".just-one");
  const circle = document.querySelectorAll(".tick-circle");
  circle.forEach((item) => {
    item.addEventListener("click", (e) => {
      const maindivElem = e.currentTarget.parentElement;
      const newArray = arrayofValues.filter((item) => {
        if (item.id === +maindivElem.id) {
          item["state"] = "completed";
        }
      });
      console.log(arrayofValues);
      showElem(arrayofValues);
      writeToLocalStorage(arrayofValues);
    });
  });
  addEventListener();
  let dragStartIndex;
  function dragStart() {
    // console.log("Event:", "dragstart");
    dragStartIndex = +this.closest("div").getAttribute("id");
  }
  function dragEnter() {
    // console.log("Event:", "dragenter");
  }
  function dragLeave() {
    // console.log("Event:", "dragleaver");
  }
  function dragOver(e) {
    e.preventDefault();
    // console.log("Event:", "dragover");
  }
  function dragDrop() {
    const dragEndIndex = +this.parentElement.getAttribute("id");
    swapItems(dragStartIndex, dragEndIndex);

    // console.log("Event:", "drop");
  }

  function swapItems(fromIndex, toIndex) {
    // console.log(fromIndex, toIndex);

    let startInd;
    let endInd;
    arrayofValues.forEach((item, index) => {
      if (item.id === fromIndex) {
        startInd = index;
      }
      if (item.id === toIndex) {
        endInd = index;
      }
    });
    let temp = arrayofValues[startInd];
    arrayofValues[startInd] = arrayofValues[endInd];
    arrayofValues[endInd] = temp;
    showElem(arrayofValues);
    writeToLocalStorage(arrayofValues);
  }

  function addEventListener() {
    const draggable = document.querySelectorAll(".draggable");
    const dragListItem = document.querySelectorAll(".list-start li");
    console.log(draggable, dragListItem);

    draggable.forEach((draggable) => {
      draggable.addEventListener("dragstart", dragStart);
    });
    dragListItem.forEach((item) => {
      item.addEventListener("dragover", dragOver);
      item.addEventListener("drop", dragDrop);
      item.addEventListener("dragenter", dragEnter);
      item.addEventListener("dragleave", dragLeave);
    });
  }
}

//Different states buttons start
btns.forEach((item) => {
  item.addEventListener("click", () => {
    const newArray = arrayofValues.filter((each) => {
      btns.forEach((removeActive) => {
        removeActive.classList.remove("active");
      });
      item.classList.add("active");
      if (item.dataset.id === each.state) {
        return each;
      }
      if (item.dataset.id === "all") {
        return arrayofValues;
      }
    });
    console.log(newArray);
    showElem(newArray);
  });
});
//Different states buttons end

//Clear Completed
const removeComp = () => {
  const newArray = arrayofValues.filter((val) => {
    return val.state !== "completed";
  });
  arrayofValues = newArray;
  showElem(arrayofValues);
  writeToLocalStorage(newArray);
  btns.forEach((removeActive) => {
    removeActive.classList.remove("active");
  });
  btns[0].classList.add("active");
};
// Clear completed

//Write to local Storage(since it is used multiple times throughout the code I created a function for it)
function writeToLocalStorage(value) {
  localStorage.setItem("list", JSON.stringify(value));
}
//Write to local Storage complete
