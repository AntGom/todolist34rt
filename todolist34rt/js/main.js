"use strict";
import State, {
  addTask,
  deleteTasks,
  toggleStateTask,
  clearTasks,
  toggleThemeDark,
} from "./state.js";

// Selecciono elementos de la página HTML
const bodyElement = document.querySelector("body");
const formElement = document.forms.formTodo;
const btnClearElement = document.querySelector("button#clear");
const btnDeleteElement = document.querySelector("button#delete");
const todoListElement = document.querySelector("ul#todoList");
const modalElement = document.querySelector(".modal-bg");
const siButtonElement = document.querySelector("button#si");
const pErrorElement = document.querySelector("p.error");
const themeElement = document.querySelector("#theme");

// Gestión del click en el icono del tema
themeElement.addEventListener("click", () => {
  bodyElement.classList.toggle("dark");
  toggleThemeDark();
});

// Función que pinta en la pagina html las tareas
const render = () => {
  // Creo fragmento react
  const fragmentTasks = document.createDocumentFragment();

  if (State.dark) {
    // Añado la clase dark al body para aplicar CSS dark
    bodyElement.classList.add("dark");
  }

  let counter = 0;
  // Recorro el array de tareas (State.tasks)
  for (const task of State.tasks) {
    // Creo li
    const liElement = document.createElement("li");
    liElement.setAttribute("data-counter", counter++);

    // Añado texto a span
    const spanElement = document.createElement("span");
    spanElement.textContent = task.text;

    // Creo un input de tipo checkbox
    const checkElement = document.createElement("input");
    checkElement.setAttribute("type", "checkbox");
    if (task.done) {
      // Si task hecho lo pongo checked y añado al span la clase done para tacharlo
      checkElement.setAttribute("checked", true);
      spanElement.classList.add("done");
    }
    // Adjunto el check a el li
    liElement.append(checkElement);

    // Adjunto lo span al li
    liElement.append(spanElement);

    // Añado el li al fragmento
    fragmentTasks.prepend(liElement);
  }
  // Limpio el contenido html de ul
  todoListElement.innerHTML = "";

  // Añado nuevos lis (tareas) a ul
  todoListElement.append(fragmentTasks);

  //Borro el error (si hay)
  pErrorElement.textContent = "";
};

// Función que pinta el error en el párrafo de los errores
const showError = (message) => {
  pErrorElement.textContent = message;
};

// Función manejadora del evento submit del formulario (cuando se añade una tarea)
const handleNewTaskSubmit = (evento) => {
  // Tomo el control del formulario
  evento.preventDefault();
  // Seleciono el input con el texto de la tarea
  const newTaskElement = formElement.elements.newTask;
  // Elimino los espacios a la tarea con trim (antes y al final)
  const taskText = newTaskElement.value.trim();
  if (taskText !== "") {
    // Añado la tarea llamando la funcion addTask
    addTask(taskText);
    // Pinto a pantalla el listado de tareas (ahora tengo una más!!)
    render();
  } else {
    // En el caso de cadena de texto vacía visualizo un error rojo en el párrafo
    showError("Valor no valido");
  }
  // Limpio el input de la tarea
  newTaskElement.value = "";
};

// Gestiono evento click en el botón que limpia los tasks hechos
btnClearElement.addEventListener("click", () => {
  // LLamo la función que se ocupa de borrar los tasks hechos (done = true)
  clearTasks();
  render();
});

// Cuando el usuario hace click en qualquier punto del modal, occulto el mismo
// volviendo a poner la clase hide
modalElement.addEventListener("click", () => {
  modalElement.classList.add("hide");
});

// Gestiono evento click en el botón que borra todos los tasks
btnDeleteElement.addEventListener("click", () => {
  // Quito la clase hide a <div class="modal-bg hide"> para visualizar el modal
  modalElement.classList.remove("hide");
  // Gestiono el evento click al boton Sí del modal
  siButtonElement.addEventListener("click", (event) => {
    // Llamo la función que borra todos los tasks (solo si el usuario hace click en el Sí)
    deleteTasks();
    render();
  });
});

// Gestiono el evento submit del formulario (añado tarea)
formElement.addEventListener("submit", handleNewTaskSubmit);

// Demando a ul la gestión del click en un checkbox
// para invertir el valor del done
todoListElement.addEventListener("click", (event) => {
  const target = event.target;
  // console.log(target.parentElement);
  if (target.matches("input")) {
    const indexTask = parseInt(
      target.parentElement.getAttribute("data-counter")
    );
    // Llamo la función que se ocupa de invertir el valor done de un task
    toggleStateTask(indexTask);
    render();
  }
});

// Renderizo las tareas cuando entro/refresco la página
render();
