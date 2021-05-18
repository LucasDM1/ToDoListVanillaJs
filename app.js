const formulario = document.getElementById('formulario');
const listaTarea = document.getElementById('lista-tareas');
const input = document.getElementById('input')
const template =document.getElementById('template').content;
const frag = document.createDocumentFragment();

let tareas = {}
document.addEventListener("DOMContentLoaded", ()=>{
    pintarTareas()
})
listaTarea.addEventListener('click', e=>{
    btnAccion(e)
})

formulario.addEventListener("submit", e => {
    e.preventDefault()
    // console.log(input.value);
    setTarea(e)
})

const setTarea = e => {
    if(input.value.trim() === ""){
        console.log("Esta vacio")
        return
    }
    const tarea = {
        id:Date.now(),
        texto:input.value,
        estado:false
    }

    tareas[tarea.id] = tarea
    //console.log(tareas)
    formulario.reset();
    input.focus();

    pintarTareas()
}

const pintarTareas = () =>{
    listaTarea.innerHTML=''
    Object.values(tareas).forEach(tarea =>{
        const clone = template.cloneNode(true)
        clone.querySelector("p").textContent = tarea.texto;
        if(tarea.estado){
            //continue here
        }

        clone.querySelectorAll(".fas")[0].dataset.id= tarea.id;
        clone.querySelectorAll(".fas")[1].dataset.id= tarea.id;
        frag.appendChild(clone);
        //console.log(tarea);
    })
    listaTarea.appendChild(frag)
}
const btnAccion= (e)=>{
    if(e.target.classList.contains("fa-check-circle")){
        console.log(e.target.dataset.id);
        tareas[e.target.dataset.id].estado= true;
        pintarTareas()
        console.log(tareas)
    };

    if(e.target.classList.contains("fa-minus-circle")){
        delete  tareas[e.target.dataset.id]
        pintarTareas()
        console.log()
    }
    e.stopPropagation()
}