import "./style.css";
import * as data from "/data.js";
let donnees =data.getData();
if (localStorage.getItem("TODODATA")){
    let recup=JSON.parse(localStorage.getItem("TODODATA"))
    for (let i=0;i<recup.info.utilisateurs.length;i++) {
        donnees.addPersonne(recup.info.utilisateurs[i])
    }
}
else{
    donnees.addPersonne({login:"Etienne",tachesSemaine:{monday:{jour:"lundi"}}})
}
donnees =data.getData();

const ul = document.getElementById("ul1");
const form =document.getElementById("form1");
const input=document.getElementById("input1");

const ul2 = document.getElementById("ul2");
const ul3 = document.getElementById("ul3");


const todos =donnees.getaskDayToDo("Etienne","Lundi");
const isdones =donnees.getaskDayIsDone("Etienne","Lundi");
const isdelteted =donnees.getaskDayIsDelete("Etienne","Lundi");
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const value = input.value;
    input.value="";
    addTodo(value);
})

const personne="Etienne"
const displayTodo =()=>{
    ul.innerHTML="";
   for (let index=0;index<todos.length;index++){
        if(todos[index].isEdit){
            ul.append(createTodoEditElement(todos[index].name));
        } else{
            console.log("ul");
            ul.append(createTodoElement(todos[index].name));
        }
    }
    ul2.innerHTML="";
   for (let index=0;index<isdones.length;index++){
        ul2.append(createIsDoneElement(isdones[index].name));
    }   
    ul3.innerHTML="";
   for (let index=0;index<isdelteted.length;index++){
        ul3.append(createIsDeleteElement(isdelteted[index].name));
    }  
};

const createTodoElement=(todo)=>{
    const li =document.createElement("li");
    const buttonDelete=document.createElement("button");
    const buttonEdit = document.createElement("button");
    buttonDelete.innerHTML="Supprimer";
    buttonEdit.innerHTML="Edit";
    buttonDelete.addEventListener("click",(event)=>{
        event.stopPropagation();
        deleteTodo(todo);
    })
    buttonEdit.addEventListener("click",(event)=>{
        event.stopPropagation();
        toggleEditMode(todo);
    })
    li.innerHTML=`
    <span class="todo"></span>
    <p>${todo}</p>
    `;    
    li.addEventListener("click",(event)=>{
        toggleTodo(todo);
    })
    li.append(buttonEdit,buttonDelete);
    li.className="ligne";
    return li;
};
const createTodoEditElement=(todo)=>{
    const li =document.createElement("li");
    const input = document.createElement("input");
    const buttonSave=document.createElement("button");
    const buttonCancel=document.createElement("button");
    buttonCancel.addEventListener("click",(event)=>{
        event.stopPropagation();
        toggleEditMode(todo);
    })
    buttonSave.addEventListener("click",(event)=>{
        event.stopPropagation();
        editTodo(todo,input);
    })
    input.type="text";
    input.value=todo;
    buttonSave.innerHTML="Save";
    buttonCancel.innerHTML="Cancel";
    li.append(input,buttonCancel,buttonSave);
    li.className="ligneEdit";
    return li;
};
const createIsDoneElement=(isdone)=>{
    const li =document.createElement("li");
    li.innerHTML=`
    <span class="todo done"></span>
    <p>${isdone}</p>
    `;
    li.className="ligne";
    li.addEventListener("click",(event)=>{
        toggleIsDone(isdone);
    })
    return li;
};
const createIsDeleteElement=(isdelete)=>{
    const li =document.createElement("li");
    li.innerHTML=`
    <span class="todo done"></span>
    <p>${isdelete}</p>
    `;
    li.className="ligne";
    const buttonRestore=document.createElement("button");
    buttonRestore.addEventListener("click",(event)=>{
        event.stopPropagation();
        toggleRestoreMode(isdelete);
    })
    buttonRestore.innerHTML="Restore";
    li.append(buttonRestore)
    return li;
};
const addTodo=(text)=>{
    donnees.addTaskDayToDo("Etienne","Lundi",text);
    displayTodo();
}

const  deleteTodo =(todo)=>{
    donnees.delTaskDayToDo("Etienne","Lundi",todo);
    donnees.addTaskDayIsDelete("Etienne","Lundi",todo);
    displayTodo();
}
const toggleRestoreMode=(text)=>{
    donnees.addTaskDayToDo("Etienne","Lundi",text);
    donnees.delTaskDayIsDelete("Etienne","Lundi",text);
    displayTodo();
}
const toggleTodo=(text)=>{
    donnees.addTaskDayIsDone("Etienne","Lundi",text);
    donnees.delTaskDayToDo("Etienne","Lundi",text);
    displayTodo();
}
const toggleIsDone=(text)=>{
    donnees.delTaskDayIsDone("Etienne","Lundi",text);
    donnees.addTaskDayToDo("Etienne","Lundi",text);
    displayTodo();
}
const toggleEditMode=(text)=>{
    console.log(personne)
    donnees.getToDo("Etienne","Lundi",text).isEdit=!donnees.getToDo("Etienne","Lundi",text).isEdit

    displayTodo();
}

const editTodo=(text,input)=>{
    const value=input.value;
    donnees.getToDo("Etienne","Lundi",text).name=value;
    donnees.getToDo("Etienne","Lundi",value).isEdit=!donnees.getToDo("Etienne","Lundi",value).isEdit
    displayTodo();
}
displayTodo();


let sauvegarde =setInterval (()=>{
    const jsonS=JSON.stringify(data.getData())
   localStorage.setItem("TODODATA",jsonS)},2000)
