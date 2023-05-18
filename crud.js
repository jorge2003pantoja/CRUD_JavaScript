const formularioTareas = document.querySelector('#formulario');
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
    localStorage.setItem('tareaGuardada',JSON.stringify(arrayTareas));

    Mostrar();
}

const Mostrar = () => {
    listaTareas.innerHTML = '';

    arrayTareas = JSON.parse(localStorage.getItem('tareaGuardada'));
    
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

function editarTarea(){
    var nuevaTarea = {id: null, tarea: null, descripcion: null, estatus: null};

    var id2 =  document.querySelector('#inputId').value;
    let titulo2 = document.querySelector('#inputTitulo').value;
    let descripcion2 = document.querySelector('#inputDescripcion').value;
    let estatus2 = document.querySelector('#inputEstatus').value;

    var idInt = parseInt(id2);

    nuevaTarea = {id: idInt, tarea: titulo2, descripcion: descripcion2, estatus: estatus2};

    actualizarRegistro(idInt, nuevaTarea);

    document.getElementById('btnActualizar').style.display = 'none';
    document.getElementById('btnAgregar').style.display = 'block';

    document.getElementById('labelId').style.display = 'none';
    document.getElementById('inputId').style.display = 'none';

    formularioTareas.reset();
}

function actualizarRegistro(id3, nuevoRegistro) {

    var tareasRegistradas = JSON.parse(localStorage.getItem('tareaGuardada')) || [];

    /*console.log(tareasRegistradas);
    console.log(id3);
    console.log(nuevoRegistro);*/

    for (var i3 = 0; i3 < tareasRegistradas.length; i3++) {
      if (tareasRegistradas[i3].id === id3) {
        tareasRegistradas[i3] = nuevoRegistro;
        localStorage.setItem('tareaGuardada', JSON.stringify(tareasRegistradas));
        return true;
      }
    }
  
    return false;
  }

function cargarTarea(valorId) {

    let result = {id: null, tarea: null, descripcion: null, estatus: null};

    var arrayTareas2 = JSON.parse(localStorage.getItem('tareaGuardada')) || [];

    for(var i = 0;i < arrayTareas2.length; i++){
        if(arrayTareas2[i].id == valorId){
            result = {id: arrayTareas2[i].id, tarea: arrayTareas2[i].tarea, descripcion: arrayTareas2[i].descripcion, estatus: arrayTareas2[i].estatus};
            break;
        }
    }

    formularioTareas.inputId.value = result.id;
    formularioTareas.inputTitulo.value = result.tarea;
    formularioTareas.inputDescripcion.value = result.descripcion;
    formularioTareas.inputEstatus.value = result.estatus;

    document.getElementById('btnActualizar').style.display = 'block';
    document.getElementById('btnAgregar').style.display = 'none';

    document.getElementById('labelId').style.display = 'block';
    document.getElementById('inputId').style.display = 'block';
}
  

formularioTareas.addEventListener('submit', (e) => {

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
    formularioTareas.reset();
    
});

document.addEventListener('DOMContentLoaded', Mostrar);

listaTareas.addEventListener('click', (e) => {
    e.preventDefault(); 

    if(e.target.innerHTML === 'edit' || e.target.innerHTML == 'delete'){
        let valorId = e.target.id;
        if(e.target.innerHTML === 'edit'){
            cargarTarea(valorId);
        }
        if(e.target.innerHTML === 'delete'){
            eliminarTarea(valorId);
        }
    }

});