let elTodoForm = document.querySelector("#todo-form");
let elTodoInput = document.querySelector("#todo-input");
let elTodoList = document.querySelector("#todo-list");
let elTodoCount = document.querySelector(".todo-count")

let todos = [];
let initialId = 0;

function NewPrototypeItem (title, id) {
  this.title = title;
  this.id = id;
};

function createTodo(todoTitle, todoId) {
  todos.push(new NewPrototypeItem(todoTitle, todoId));

  createHTMLTodoItem(todoTitle, todoId)
};

function removeItem(todoId) {
  document.querySelector(`#todo-item-${todoId}`).remove();
  todos.forEach((todo, i) => {
    if (todo.id === todoId) {
      todos.splice(i, 1)
    };
  });

  console.log(todos);
  elTodoCount.textContent = todos.length;
}

function createHTMLTodoItem(todoTitle, todoId) {
  let todoItem = document.createElement("li");
  todoItem.setAttribute("id", `todo-item-${todoId}`)
  todoItem.setAttribute("class", "list-group-item flex-row-reverse d-flex justify-content-between align-items-center");

  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "btn btn-outline-danger");
  deleteBtn.textContent = `O'chirish`;

  deleteBtn.addEventListener("click", ()=> {
    removeItem(todoId)
  })

  todoItem.appendChild(deleteBtn);

  let editInput = document.createElement("input");
  editInput.value = elTodoInput.value;
  editInput.disabled = true;
  editInput.setAttribute("class", "edit-input")

  todoItem.appendChild(editInput);

  todoItem.addEventListener("dblclick", ()=> {
    editInput.disabled = false;
    editInput.focus()
  });

  editInput.addEventListener("blur", function (e) {
    if (editInput.value.length == 0) {
      editInput.disabled = false;
      editInput.focus()
      editInput.style.borderBottomColor = "red";
    }
  });

  editInput.addEventListener("keypress", (e)=> {
    if (e.key ==="Enter") {
      editInput.disabled = true;
    }
  })

  elTodoList.appendChild(todoItem)
}

elTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (elTodoInput.value.length > 0) {
    createTodo(elTodoInput.value, initialId);
    initialId++
  }

  elTodoCount.textContent = todos.length;

  console.log(todos);
  elTodoForm.reset()
})