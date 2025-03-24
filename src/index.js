import "./style.css";
import * as data from "/data.js";
let donnees =data.getData();
const inputLogin=document.getElementById("input2");
let personne="";
let jour="Lundi";
let todos;
let isdones;
let isdelteted;
const ul0 = document.getElementById("ul0");
const ul = document.getElementById("ul1");
const form =document.getElementById("form1");
const form2 =document.getElementById("form2");
const input=document.getElementById("input1");

const ul2 = document.getElementById("ul2");
const ul3 = document.getElementById("ul3");
const selday=document.getElementById("day-select");
const unlock=()=>{
    const body1 = document.getElementById("div1");
    body1.hidden=false
    const body2 = document.getElementById("div2");
    body2.hidden=false

}
const chargement=()=>{

    todos =donnees.getaskDayToDo(personne,jour);

    isdones =donnees.getaskDayIsDone(personne,jour);
    isdelteted =donnees.getaskDayIsDelete(personne,jour);
    displayTodo();
    displayUser();
}


donnees =data.getData();



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
    unlock()
    toggleSelectUser(value)
    chargement();
})

const createUserInactifElement=(user)=>{
    const li =document.createElement("li");
    const span=document.createElement("span");
    const par=document.createElement("p");
    const buttonDelete=document.createElement("button");
    buttonDelete.textContent="Supprimer Utilisateur";
    buttonDelete.addEventListener("click",(event)=>{
        event.stopPropagation();
        deleteUser(user);
    })
    span.className="todo"
    par.textContent=user
    li.className="ligne";
    li.addEventListener("click",(event)=>{
        toggleSelectUser(user);
    })
    li.append(span,par,buttonDelete)
    return li;
};
const createUserActifElement=(user)=>{
    const li =document.createElement("li");
    const span=document.createElement("span");
    const par=document.createElement("p");
    span.className="todo done"
    par.textContent=user
    li.className="ligne";
    li.addEventListener("click",(event)=>{
        toggleSelectUser(user);
    })
    li.append(span,par)
    return li;
};
const createTodoElement=(todo)=>{
    const li =document.createElement("li");
    const span=document.createElement("span");
    const par=document.createElement("p");
    const buttonProcrastiner=document.createElement("button");
    const buttonAvancer = document.createElement("button");
    const buttonDelete=document.createElement("button");
    const buttonEdit = document.createElement("button");
    buttonDelete.textContent="Supprimer";
    buttonEdit.textContent="Edit";
    buttonProcrastiner.textContent="Procrastiner";
    buttonAvancer.textContent="Avancer"
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
    span.className="todo"
    par.textContent=todo
    li.addEventListener("click",(event)=>{
        toggleTodo(todo);
    })
    li.append(span,par,buttonAvancer,buttonProcrastiner,buttonEdit,buttonDelete);
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
    buttonSave.textContent="Save";
    buttonCancel.textContent="Cancel";
    li.append(input,buttonCancel,buttonSave);
    li.className="ligneEdit";
    return li;
};
const createIsDoneElement=(isdone)=>{
    const li =document.createElement("li");
    const span=document.createElement("span");
    const par=document.createElement("p");
    span.className="todo done"
    par.textContent=isdone
    li.className="ligne";
    li.addEventListener("click",(event)=>{
        toggleIsDone(isdone);
    })
    li.append(span,par)
    return li;
};
const createIsDeleteElement=(isdelete)=>{
    const li =document.createElement("li");
    const span=document.createElement("span");
    const par=document.createElement("p");
    span.className="todo done"
    par.textContent=isdelete
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
    buttonRestore.textContent="Restore";
    buttonCorbeille.textContent="Corbeille";
    li.append(span,par,buttonRestore,buttonCorbeille)
    return li;
};
const addTodo=(text)=>{
    donnees.addTaskDayToDo(personne,jour,text);
    chargement();
}
const toggleSelectUser =(user)=>{
    donnees.setActifPersonne(user)
    personne=user
    console.log(personne)
    chargement();
}
const  deleteTodo =(todo)=>{
    donnees.delTaskDayToDo(personne,jour,todo);
    donnees.addTaskDayIsDelete(personne,jour,todo);
    chargement();
}
const  deleteUser =(user)=>{
    donnees.delPersonne(user);
    chargement();
}
const toggleRestoreMode=(text)=>{
    donnees.delTaskDayIsDelete(personne,jour,text);
    donnees.addTaskDayToDo(personne,jour,text);
    chargement();
}
const toggleCorbeilleMode=(text)=>{
    donnees.delTaskDayIsDelete(personne,jour,text);
    chargement();
}
const toggleTodo=(text)=>{
    donnees.delTaskDayToDo(personne,jour,text);
    donnees.addTaskDayIsDone(personne,jour,text);
    chargement();
}
const toggleIsDone=(text)=>{
    donnees.delTaskDayIsDone(personne,jour,text);
    donnees.addTaskDayToDo(personne,jour,text);
    chargement();
}
const toggleEditMode=(text)=>{
    donnees.getToDo(personne,jour,text).isEdit=!donnees.getToDo(personne,jour,text).isEdit
    chargement();
}
const toggleProcrastiner=(text)=>{
    if(donnees.addTaskDayToDo(personne,demain(jour),text)){
        donnees.delTaskDayToDo(personne,jour,text);
    };
    chargement();
}
const togglebuttonAvancer=(text)=>{
    if(donnees.addTaskDayToDo(personne,hier(jour),text)){
        donnees.delTaskDayToDo(personne,jour,text);
    };
    chargement();
}


const editTodo=(text,input)=>{
    const value=input.value;
    donnees.getToDo(personne,jour,text).name=value;
    donnees.getToDo(personne,jour,value).isEdit=!donnees.getToDo(personne,jour,value).isEdit
    chargement();
}



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
const displayUser=()=>{
    ul0.textContent="";
    for (let index=0;index<donnees.getAllPersonne().length;index++){
         if(donnees.getAllPersonne()[index].actif){
            ul0.append(createUserActifElement(donnees.getAllPersonne()[index].login));
            break;
        }
    }
    for (let index=0;index<donnees.getAllPersonne().length;index++){
        if(!donnees.getAllPersonne()[index].actif){
            ul0.append(createUserInactifElement(donnees.getAllPersonne()[index].login));
        }
    }   
}
const displayTodo =()=>{
    ul.textContent="";
   for (let index=0;index<todos.length;index++){
        if(todos[index].isEdit){
            ul.append(createTodoEditElement(todos[index].name));
        } else{
            ul.append(createTodoElement(todos[index].name));
        }
    }
    ul2.textContent="";
   for (let index=0;index<isdones.length;index++){
        ul2.append(createIsDoneElement(isdones[index].name));
    }   
    ul3.textContent="";
   for (let index=0;index<isdelteted.length;index++){
        ul3.append(createIsDeleteElement(isdelteted[index].name));
    }  
};
const lock=()=>{
    const body1 = document.getElementById("div1");
    body1.hidden=true
    const body2 = document.getElementById("div2");
    body2.hidden=true

}
if (localStorage.getItem("TODODATA")){
    let recup=JSON.parse(localStorage.getItem("TODODATA"))
    let nb=recup.info.utilisateurs.length
    if (nb>0)
    {
        for (let i=0;i<nb;i++) {
        donnees.addPersonne(recup.info.utilisateurs[i])
        }
        personne=donnees.getActifPersonne();
        inputLogin.value=personne
        chargement();
    }
    else{
        lock()
    }
}
else{
    lock()
}