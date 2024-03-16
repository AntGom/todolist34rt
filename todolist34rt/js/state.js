"use strict";
// cuando arranco la plataforma miro si tengo en localstorage (stateTodo) datos guardados
const localstorageState = window.localStorage.getItem("stateTodo");

// Patrón programación
// Estado de la aplicación
const State = {
  tasks: localstorageState ? JSON.parse(localstorageState).tasks : [],
  dark: localstorageState ? JSON.parse(localstorageState).dark : false,
};

// Función que guarda en locastorage el State
const SaveState = () => {
  const jsonState = JSON.stringify(State);
  window.localStorage.setItem("stateTodo", jsonState);
};

// Función que añade una tarea
const addTask = (task) => {
  const taskObject = {
    text: task,
    done: false,
  };
  State.tasks.push(taskObject);
  SaveState();
};

// Función que elimina todas las tareas
const deleteTasks = () => {
  State.tasks = [];
  SaveState();
};

// Función que inverte el valor done de un task
const toggleStateTask = (index) => {
  State.tasks[index].done = !State.tasks[index].done;
  SaveState();
};

// Función que borra los tasks hechos (done = true)
const clearTasks = () => {
  const tasksFiltered = State.tasks.filter((task) => {
    return task.done === false;
  });
  State.tasks = tasksFiltered;
  SaveState();
};

// Función que cambia el valor de dark
const toggleThemeDark = () => {
  State.dark = !State.dark;
  SaveState();
};

// Exporto State y funciones
export default State;
export { addTask, deleteTasks, toggleStateTask, clearTasks, toggleThemeDark };
