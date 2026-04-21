let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let msg = document.querySelector(".msg");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

//add task to the tasksArray
submit.onclick = function () {
  if (input.value !== "") {
    msg.style.display = "none"; //clear the error message
    addTaskToArray(input.value);
    input.value = "";
  }
  else {
    msg.innerHTML = "<p>You didn't enter any task</p>" //add error message if the user submit nothing
  }
};

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    //remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
    //remove element from page
    e.target.parentElement.remove();
  }
  //task element
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
})

// add task to the tasksArray
function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    isCompleted: false
  }
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addDateToLocalStorageFrom(arrayOfTasks);
}

// add task to the page
function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {

    let div = document.createElement("div");
    div.className = "task"

    if (task.isCompleted) {
      div.className = "task done"
    }

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);

    tasksDiv.appendChild(div);
  })
}

function addDateToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDateToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].isCompleted == false ? (arrayOfTasks[i].isCompleted = true) : (arrayOfTasks[i].isCompleted = false);
    }
  }
  addDateToLocalStorageFrom(arrayOfTasks);
}