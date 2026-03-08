let input = document.getElementById("routine");
let taskList = document.getElementById("taskList");
let form = document.getElementById("taskForm");
let stats = document.getElementById("stats");
let clearBtn = document.getElementById("clearCompleted");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  addTask();
});

function addTask() {
  
  let taskText = input.value.trim();
  if (taskText === "") return;
  
  createTaskElement (taskText);
  input.value = "";
  
  saveTask();
  updateStats();
}

clearBtn.addEventListener ("click", function() {
    document.querySelectorAll("#taskList span.completed").forEach(function (span) {
      span.parentElement.remove();
    });
    
      saveTask();
      updateStats();
  });
  
  function createTaskElement(text, completed = false) {
  let li = document.createElement("li");
  let span = document.createElement("span");
  span.textContent = text;
  li.appendChild(span);
  
  if (completed) {
      span.classList.add("completed");
    }
    
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  
  deleteBtn.addEventListener ("click", function(event) {
    event.stopPropagation();
    li.remove();
    
    saveTask();
    updateStats();
  });
  
  li.addEventListener ("click", function () {
    span.classList.toggle("completed");
    
    saveTask();
    updateStats();
  });

li.appendChild(deleteBtn)
taskList.appendChild(li);
}

function saveTask() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    let task = {
      text: li.querySelector("span").textContent, completed:
      li.querySelector("span").classList.contains("completed")
    };
    tasks.push(task);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(function (task) {
createTaskElement(task.text, task.completed);
});

updateStats();
}

function updateStats() {

let allTasks = 
document.querySelectorAll("#taskList li").length;

const completedTasks = 
document.querySelectorAll("#taskList span.completed").length;

let pendingTasks = allTasks - completedTasks;

stats.textContent = `Tasks: ${allTasks} | Completed: ${completedTasks} | pending: ${pendingTasks}`;
}


loadTasks();