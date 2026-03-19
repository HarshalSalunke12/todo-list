const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    const taskValue = input.value;

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    // Create the list item
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskValue}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Add delete functionality
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });

    // Add to list and clear input
    todoList.appendChild(li);
    input.value = "";
});