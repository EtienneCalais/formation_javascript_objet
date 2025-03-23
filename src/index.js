import "./style.css";
import * as data from "/data.js";
let donnees =data.getData();
const inputLogin=document.getElementById("input2");
let personne="Etienne"
let jour="Lundi"
if (localStorage.getItem("TODODATA")){
    let recup=JSON.parse(localStorage.getItem("TODODATA"))
    for (let i=0;i<recup.info.utilisateurs.length;i++) {
        donnees.addPersonne(recup.info.utilisateurs[i])
    }
    personne=recup.info.utilisateurs[recup.info.utilisateurs.length-1].login;
    inputLogin.value=personne
}
else{
    personne=inputLogin.value
    donnees.addPersonne(personne)
}
donnees =data.getData();

const ul = document.getElementById("ul1");
const form =document.getElementById("form1");
const form2 =document.getElementById("form2");
const input=document.getElementById("input1");

const ul2 = document.getElementById("ul2");
const ul3 = document.getElementById("ul3");
const selday=document.getElementById("day-select");
let todos =donnees.getaskDayToDo(personne,jour);
let isdones =donnees.getaskDayIsDone(personne,jour);
let isdelteted =donnees.getaskDayIsDelete(personne,jour);

const chargement=()=>{
    todos =donnees.getaskDayToDo(personne,jour);
    isdones =donnees.getaskDayIsDone(personne,jour);
    isdelteted =donnees.getaskDayIsDelete(personne,jour);
    displayTodo();
}
selday.addEventListener("change",(event)=>{jour=selday.value
   chargement()

})


form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const value = input.value;
    input.value="";
    addTodo(value);
})
form2.addEventListener("submit",(event)=>{
    event.preventDefault();
    const value = inputLogin.value;
    personne=value
    donnees.addPersonne(value)
    chargement();
})

const displayTodo =()=>{
    ul.innerHTML="";
   for (let index=0;index<todos.length;index++){
        if(todos[index].isEdit){
            ul.append(createTodoEditElement(todos[index].name));
        } else{
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
    const buttonProcrastiner=document.createElement("button");
    const buttonAvancer = document.createElement("button");
    const buttonDelete=document.createElement("button");
    const buttonEdit = document.createElement("button");
    buttonDelete.innerHTML="Supprimer";
    buttonEdit.innerHTML="Edit";
    buttonProcrastiner.innerHTML="Procrastiner";
    buttonAvancer.innerHTML="Avancer"
    buttonDelete.addEventListener("click",(event)=>{
        event.stopPropagation();
        deleteTodo(todo);
    })
    buttonEdit.addEventListener("click",(event)=>{
        event.stopPropagation();
        toggleEditMode(todo);
    })
    buttonProcrastiner.addEventListener("click",(event)=>{
        event.stopPropagation();
        toggleProcrastiner(todo);
    })
    buttonAvancer.addEventListener("click",(event)=>{
        event.stopPropagation();
        togglebuttonAvancer(todo);
    })
    li.innerHTML=`
    <span class="todo"></span>
    <p>${todo}</p>
    `;    
    li.addEventListener("click",(event)=>{
        toggleTodo(todo);
    })
    li.append(buttonAvancer,buttonProcrastiner,buttonEdit,buttonDelete);
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
    const buttonCorbeille=document.createElement("button");
    buttonCorbeille.addEventListener("click",(event)=>{
        event.stopPropagation();
        toggleCorbeilleMode(isdelete);
    })
    buttonRestore.innerHTML="Restore";
    buttonCorbeille.innerHTML="Corbeille";
    li.append(buttonRestore,buttonCorbeille)
    return li;
};
const addTodo=(text)=>{
    donnees.addTaskDayToDo(personne,jour,text);
    displayTodo();
}

const  deleteTodo =(todo)=>{
    donnees.delTaskDayToDo(personne,jour,todo);
    donnees.addTaskDayIsDelete(personne,jour,todo);
    displayTodo();
}
const toggleRestoreMode=(text)=>{
    donnees.delTaskDayIsDelete(personne,jour,text);
    donnees.addTaskDayToDo(personne,jour,text);
    displayTodo();
}
const toggleCorbeilleMode=(text)=>{
    donnees.delTaskDayIsDelete(personne,jour,text);
    displayTodo();
}
const toggleTodo=(text)=>{
    donnees.delTaskDayToDo(personne,jour,text);
    donnees.addTaskDayIsDone(personne,jour,text);
    displayTodo();
}
const toggleIsDone=(text)=>{
    donnees.delTaskDayIsDone(personne,jour,text);
    donnees.addTaskDayToDo(personne,jour,text);
    displayTodo();
}
const toggleEditMode=(text)=>{
    donnees.getToDo(personne,jour,text).isEdit=!donnees.getToDo(personne,jour,text).isEdit
    displayTodo();
}
const toggleProcrastiner=(text)=>{
    if(donnees.addTaskDayToDo(personne,demain(jour),text)){
        donnees.delTaskDayToDo(personne,jour,text);
    };
    displayTodo();
}
const togglebuttonAvancer=(text)=>{
    if(donnees.addTaskDayToDo(personne,hier(jour),text)){
        donnees.delTaskDayToDo(personne,jour,text);
    };
    displayTodo();
}


const editTodo=(text,input)=>{
    const value=input.value;
    donnees.getToDo(personne,jour,text).name=value;
    donnees.getToDo(personne,jour,value).isEdit=!donnees.getToDo(personne,jour,value).isEdit
    displayTodo();
}
displayTodo();


let sauvegarde =setInterval (()=>{
    const jsonS=JSON.stringify(data.getData())
   localStorage.setItem("TODODATA",jsonS)},2000)
const demain=(jour)=>{
    switch (jour){
        case "Lundi"    :   return "Mardi"
        case "Mardi"    :   return "Mercredi"
        case "Mercredi" :   return "Jeudi"
        case "Jeudi"    :   return "Vendredi"
        case "Vendredi" :   return "Samedi"
        case "Samedi"   :   return "Diamnche"
        case "Diamnche" :   return "Lundi"
        default         :   return "Lundi"
    }
}
const hier=(jour)=>{
    switch (jour){
        case "Mercredi" :   return "Mardi"
        case "Jeudi"    :   return "Mercredi"
        case "Vendredi" :   return "Jeudi"
        case "Samedi"   :   return "Vendredi"
        case "Diamnche" :   return "Samedi"
        case "Lundi"    :   return "Diamnche"
        case "Mardi"    :   return "Lundi"
        default         :   return "Lundi"
    }
}