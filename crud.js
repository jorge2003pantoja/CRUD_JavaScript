const formularioT = document.querySelector('#formulario');
const listaTareas = document.getElementById('lista');
let arrayTareas = [];

const crearTarea = (tarea, descripcion, estatus) => {
    let item = {
        tarea: tarea,
        descripcion: descripcion,
        estatus: estatus
    }

    arrayTareas.push(item);

    return item;
}

const Guardar = () => {
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
            listaTareas.innerHTML += `<tr>
            <td>${element.tarea}</td>
            <td>${element.descripcion}</td>
            <td>${element.estatus}</td>
            <td><i class="fa-solid fa-pen-nib" style="color: green; padding-left: 5px;"></i><i class="fa-solid fa-trash" style="color: red; padding-left: 5px;"></i></td>
          </tr>`
        });
    }
}

formularioT.addEventListener('submit', (e) => {

    e.preventDefault();
    let Titulo = document.querySelector('#inputTitulo').value;
    let Descripcion = document.querySelector('#inputDescripcion').value;
    let Estatus = document.querySelector('#inputEstatus').value;

    crearTarea(Titulo, Descripcion, Estatus);
    Guardar();
    formularioT.reset();
})

document.addEventListener('DOMContentLoaded', Mostrar);