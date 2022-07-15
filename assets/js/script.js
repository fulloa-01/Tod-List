let  nuevaTarea, resultado = [];
const tareas = [];

const tareaInput = document.querySelector("#tareaInput");
const btnAgregar = document.querySelector("#btnAgregar");
const listaTareas = document.querySelector("#listaTareas");
const cuentaTareas = document.querySelector("#cuenta-tareas");
const listaIDS = document.querySelector("#listaIDS");
const tareasRealizadas = document.querySelector("#tareasRealizadas");

btnAgregar.addEventListener("click", () => {
    nuevaTarea = tareaInput.value
    if (nuevaTarea == ""){
        alert("No lleva nombre de tarea")
    }
    else{
        tareas.push({id: Date.now(), nombre: nuevaTarea, estado: ""})
        tareaInput.value = ""
    renderTareas();
    }
    
});

function renderTareas(){
    let i = 0;
    let html = "";
    let html2= "";
    let html3= "";
    for (let tarea of tareas){
        html += `
        <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${tarea.id}-------${tarea.nombre}
          <span class=" "><input class="form-check-input" onclick=marcar(${tarea.id}) type="checkbox" value="" id="flexCheckDefault-${tarea.id}" ${tarea.estado}> 
          <button class="btn btn-danger" onclick=borrar(${tarea.id})>x</button></span>
        </li>
        </ul>
        `           
    }
    html2 += `<span id="cuenta-tareas">Total: ${tareas.length}</span>`
    html3 += `<span id="tareasRealizadas">Realizadas: ${resultado.length}</span>`

    listaTareas.innerHTML = html;
    cuentaTareas.innerHTML = html2;
    tareasRealizadas.innerHTML = html3;
    
}

function borrar(id){
    const index = tareas.findIndex((ele) => ele.id == id)
    tareas.splice(index, 1) 
    actualizarContador();   
    renderTareas();
}



function marcar(id){ //Encuentra el ID de la tarea para mantener el check o quitarlo, al mismo tiempo actualiza las tareas realizadas
    let estadoTarea = ""
    estadoTarea = document.getElementById("flexCheckDefault-"+id).checked;
    let index = tareas.findIndex((ele) => ele.id == id)
    console.log(estadoTarea.checked)

   
    if (estadoTarea == true){
        tareas[index].estado = "checked"
     }
    else{
        tareas[index].estado = ""        
    }
    actualizarContador();
    renderTareas();
    console.log(estadoTarea.checked)
}

function actualizarContador(){
    resultado = tareas.filter(function(tarea){
        if (tarea.estado == "checked"){
            return true;
        }
        else{
            return false;
        }
    })
    console.log(resultado) 
}