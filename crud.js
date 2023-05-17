const formularioT = document.querySelector('#formulario');
const listaTareas = document.getElementById('lista');
let arrayTareas = [];

function obtenerUltimoId() {
    var id = localStorage.getItem("ultimoId");
    return id ? parseInt(id) : 0;
  }
  
  function guardarUltimoId(id) {
    localStorage.setItem("ultimoId", id.toString());
  }
  
  function generarId() {
    var ultimoId = obtenerUltimoId();
    var nuevoId = ultimoId + 1;
    guardarUltimoId(nuevoId);
    return nuevoId;
  }

const crearTarea = (tarea, descripcion, estatus) => {
    let item = {
        id: generarId(), tarea, descripcion, estatus
    }

    arrayTareas.push(item);

    return item;
}

const guardarTarea = () => {
    localStorage.setItem('tarea',JSON.stringify(arrayTareas));

    Mostrar();
}

const Mostrar = () => {
    listaTareas.innerHTML = '';

    arrayTareas = JSON.parse(localStorage.getItem('tarea'));
    
    if(arrayTareas === null){
        arrayTareas = [];
    }else{
        arrayTareas.forEach(element => {
            listaTareas.innerHTML += `<div class="alert alert-success" role="alert"><b>${element.id}</b> - ${element.tarea} - ${element.descripcion} - ${element.estatus}<span class="float-right"><i id="${element.id}" class="material-icons" style="color:green; padding-left:20px">edit</i><i id="${element.id}" class="material-icons" style="color:red; padding-left:5px">delete</i></span></div>`
        });
    }
}

const eliminarTarea = (id) => {
    let indexArray;
    arrayTareas.forEach((elemento, index) => {

        if(elemento.id === id){
            indexArray = index;
        }
    });

    arrayTareas.splice(indexArray,1);
    guardarTarea();
}

formularioT.addEventListener('submit', (e) => {

    e.preventDefault();
    let Titulo = document.querySelector('#inputTitulo').value;
    let Descripcion = document.querySelector('#inputDescripcion').value;
    let Estatus = document.querySelector('#inputEstatus').value;

    if(Titulo === "" || Descripcion === ""){
        alert("Por favor llene todos los campos");
        return false;
    }


    crearTarea(Titulo, Descripcion, Estatus);
    guardarTarea();
    formularioT.reset();
    
    
});

document.addEventListener('DOMContentLoaded', Mostrar);

listaTareas.addEventListener('click', (e) => {
    e.preventDefault(); 

    if(e.target.innerHTML === 'edit' || e.target.innerHTML == 'delete'){
        let valorId = e.target.id;
        if(e.target.innerHTML === 'edit'){

        }
        if(e.target.innerHTML === 'delete'){
            eliminarTarea(valorId);
        }
    }

});