/* DOM Elements */

const todoForm = document.querySelector(".add-task-actions");
const todoInput = todoForm.querySelector("input");
const addTodoButton = todoForm.querySelector("button#addTodo");
const deleteFirstTodoButton = todoForm.querySelector("button#deleteFirstTodo");
const deleteLastTodoButton = todoForm.querySelector("button#deleteLastTodo");

const todoTasks = document.querySelector("div.todo-tasks ul");



/* DB */
let tasks = getTodoTasksFromDB();
tasks = tasks ? tasks : [];

 /* Functions */

function getTodoTasksFromDB(){
    return JSON.parse(localStorage.getItem("tasks"));
}

function setTodoTasksInDB(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

let addTodo = () => {
    let task = todoInput.value;
    if(task.trim().length > 0){
        tasks.push({
            desc:task,
            completed:false
        });
        todoInput.value = "";
        render();
        setTodoTasksInDB();
    }else{
        alert("Kindly type in the task in the input");
    }
}

let deleteFirstTodo = () => {
    tasks.splice(0, 1);
    render();
    setTodoTasksInDB();

}

let deleteLastTodo = () => {
    tasks.pop();
    render();
    setTodoTasksInDB();

}

let deleteTodo = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
    setTodoTasksInDB();
}

let updateProgressBar = () => {
    let widthPerc = returnCompletedTaskPercentage();
    console.log(widthPerc);

    let progressBar = document.querySelector(".progressInner");
    progressBar.style.width = widthPerc + "%";
    setTimeout(() => {
        progressBar.innerHTML = `<p>${widthPerc}%</p>`;
    }, 500);
}

let returnCompletedTaskPercentage = () => {
    let perc = 0;
    if(tasks.length > 0){
        let checkBoxesArray = Array.from(document.querySelectorAll("input[type='checkbox']"));
        let checked_Checkboxes = checkBoxesArray.filter(checkbox => {
            return checkbox.checked == true;
        });

        console.log(checkBoxesArray); 
        console.log(checked_Checkboxes);

        perc = Math.round((checked_Checkboxes.length/checkBoxesArray.length)*100);
    }
    return perc;
}




let createTodoComponent = (task, index) => {
    let taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        <label class="container">
            <input type="checkbox">
            <span class="checkmark"></span>
        </label>
        <span>${task.desc}</span>
        <button><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>
    `;
    if(task.completed){
        taskItem.querySelector("input").checked = true;
    }
    todoTasks.appendChild(taskItem);
    taskItem.querySelector("button").setAttribute("onclick", "deleteTodo(" + index + ")");
    taskItem.querySelector("input").addEventListener("click", updateProgressBar);
    taskItem.querySelector("input").addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        setTodoTasksInDB();
    });
}


let render = () => {
  todoTasks.innerHTML = ``;
  if (tasks.length > 0) {
    for (let index = 0; index < tasks.length; index++) {
      createTodoComponent(tasks[index], index);
    }
  } else {
    todoTasks.innerHTML = `<h2>No tasks</h2>`;
  }
  updateProgressBar();
};





 /* Events */
 addTodoButton.addEventListener("click", addTodo);
 deleteFirstTodoButton.addEventListener("click", deleteFirstTodo);
 deleteLastTodoButton.addEventListener("click", deleteLastTodo);


 /* App initialization */
 render();
 updateProgressBar();
