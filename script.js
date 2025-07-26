window.onload = function () {
  loadTasks();
};

function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value.trim();
  if (task === "") return;

  createTaskElement(task, false);
  saveTask({ text: task, completed: false });

  input.value = "";
}

function createTaskElement(taskText, isCompleted) {
  let li = document.createElement("li");
  li.textContent = taskText;
  if (isCompleted) li.classList.add("completed");

  // ✅ Toggle complete on click
  li.onclick = function () {
    li.classList.toggle("completed");
    updateTaskStatus(taskText);
  };

  // ❌ Delete button
  let delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = function (event) {
    event.stopPropagation();
    li.remove();
    deleteTask(taskText);
  };

  li.appendChild(delBtn);
  document.getElementById("taskList").appendChild(li);
}

function saveTask(taskObj) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => {
    if (task.text === taskText) {
      task.completed = !task.completed;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}