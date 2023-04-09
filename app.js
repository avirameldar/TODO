//? Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoButton = document.querySelector('.todo-button');
const toDoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//? Event Listners
document.addEventListener('DOMContentLoaded', getTodos);
toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//? Functions
function addToDo(event) {
  //? prevent form from submitting
  event.preventDefault();
  //? Todo div
  const toDoDiv = document.createElement('div');
  toDoDiv.classList.add('todo');
  //? Create li
  const newTodo = document.createElement('li');
  newTodo.innerText = toDoInput.value;
  newTodo.classList.add('todo-item');
  toDoDiv.appendChild(newTodo);
  //* ADD TO DO TO LOCKAL STORAGE
  saveLocalTodos(toDoInput.value);
  //? Check Mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-Btn");
  toDoDiv.appendChild(completedButton);
  //? Check Trush
  const trushButton = document.createElement('button');
  trushButton.innerHTML = '<i class="fas fa-trash"></i>';
  trushButton.classList.add("trush-Btn");
  toDoDiv.appendChild(trushButton);
  //? Append to list
  toDoList.appendChild(toDoDiv)
  //? Clear Todo Input Value
  toDoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // DELETE TODO
  if (item.classList[0] === "trush-Btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // CHECK MARK
  if (item.classList[0] === "completed-Btn") {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = toDoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        console.log(e.target.value);
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

function saveLocalTodos(todo) {
  //? CHECK --- Hey Do I  already have things in there?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

function getTodos() {
  //? CHECK --- Hey Do I  already have things in there?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
    console.log(todos);
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    console.log(todos);
  }
  todos.forEach(function (todo) {
    //? Todo div
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('todo');
    //? Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    toDoDiv.appendChild(newTodo);
    //? Check Mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-Btn");
    toDoDiv.appendChild(completedButton);
    //? Check Trush
    const trushButton = document.createElement('button');
    trushButton.innerHTML = '<i class="fas fa-trash"></i>';
    trushButton.classList.add("trush-Btn");
    toDoDiv.appendChild(trushButton);
    //? Append to list
    toDoList.appendChild(toDoDiv)
  });
};

function removeLocalTodos(todo) {
  //? CHECK --- Hey Do I  already have things in there?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

