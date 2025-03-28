import "./style.css";
import * as data from "/data.js";
let donnees = data.getData();
const inputLogin = document.getElementById("input2");
let personne = "";
let jour = "Lundi";
let todos;
let isdones;
let isdelteted;
let sauvegardeauto = true;
const ul0 = document.getElementById("ul0");
const ul = document.getElementById("ul1");
const form = document.getElementById("form1");
const form2 = document.getElementById("form2");
const form3 = document.getElementById("form3");
const input = document.getElementById("input1");

const ul2 = document.getElementById("ul2");
const ul3 = document.getElementById("ul3");
const selday = document.getElementById("day-select");
const aujourdhui = new Date(Date.now());
let day = aujourdhui.getDate();
let mois = aujourdhui.getMonth() + 1;
if (day < 10) {
  day = "0" + day;
}
if (mois < 10) {
  mois = "0" + mois;
}
const aujourdhui_date = aujourdhui.getFullYear() + "-" + mois + "-" + day;
selday.value = aujourdhui_date;
jour = new Date(selday.value).toDateString();
const unlock = () => {
  const body1 = document.getElementById("div1");
  body1.hidden = false;
  const body2 = document.getElementById("div2");
  body2.hidden = false;
};
const chargement = () => {
  todos = donnees.getPersonne(personne).getTaskDay(jour);
  displayTodo();
  displayUser();
};

donnees = data.getData();

selday.addEventListener("change", (event) => {
  jour = new Date(selday.value).toDateString();
  chargement();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";

  addTodo(value);
});
form2.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = inputLogin.value;
  personne = value;
  sauvegardeauto = true;
  donnees.addCategorie(value, jour);
  unlock();
  toggleSelectUser(value);
  chargement();
});
form3.addEventListener("submit", (event) => {
  event.preventDefault();
  if (confirm("Souhaitez-vous supprimer définitivement le storage?")) {
    localStorage.removeItem("TODODATA");
    sauvegardeauto = false;
    window.location = document.location;
  }
});

const createUserInactifElement = (user) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const par = document.createElement("p");
  const buttonDelete = document.createElement("button");
  buttonDelete.textContent = "Supprimer le thème";
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteUser(user);
  });
  span.className = "todo";
  par.textContent = user;
  li.className = "ligne";
  li.addEventListener("click", (event) => {
    toggleSelectUser(user);
  });
  li.append(span, par, buttonDelete);
  return li;
};
const createUserActifElement = (user) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const par = document.createElement("p");
  span.className = "todo done";
  par.textContent = user;
  li.className = "ligne";
  li.addEventListener("click", (event) => {
    toggleSelectUser(user);
  });
  li.append(span, par);
  return li;
};
const createTodoElement = (todo) => {
  let tache = todos.getTaches().get(todo);
  const li = document.createElement("li");
  const span = document.createElement("span");
  const par = document.createElement("p");
  const buttonProcrastiner = document.createElement("button");
  const buttonAvancer = document.createElement("button");
  const buttonDelete = document.createElement("button");
  const buttonEdit = document.createElement("button");
  buttonDelete.textContent = "Supprimer";
  buttonEdit.textContent = "Edit";
  buttonProcrastiner.textContent = "Procrastiner";
  buttonAvancer.textContent = "Avancer";
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(tache);
  });
  buttonEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(tache);
  });
  buttonProcrastiner.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleProcrastiner(tache);
  });
  buttonAvancer.addEventListener("click", (event) => {
    event.stopPropagation();
    togglebuttonAvancer(tache);
  });
  span.className = "todo";
  par.textContent = tache.getName();
  span.addEventListener("click", (event) => {
    toggleIsDone(tache);
  });
  li.append(
    span,
    par,
    buttonAvancer,
    buttonProcrastiner,
    buttonEdit,
    buttonDelete
  );
  li.className = "ligne";
  return li;
};
const createTodoEditElement = (todo) => {
  let tache = todos.getTaches().get(todo);
  const li = document.createElement("li");
  let inputedit = document.createElement("input");
  const buttonSave = document.createElement("button");
  const buttonCancel = document.createElement("button");
  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(tache);
  });
  buttonSave.addEventListener("click", (event) => {
    event.stopPropagation();
    editTodo(tache, inputedit);
  });
  input.type = "text";
  inputedit.value = tache.getName();
  buttonSave.textContent = "Save";
  buttonCancel.textContent = "Cancel";
  li.append(inputedit, buttonCancel, buttonSave);
  li.className = "ligneEdit";
  return li;
};
const createIsDoneElement = (isdone) => {
  let tache = todos.getTaches().get(isdone);
  const li = document.createElement("li");
  const span = document.createElement("span");
  const par = document.createElement("p");
  span.className = "todo done";
  par.textContent = tache.getName();
  li.className = "ligne";
  li.addEventListener("click", (event) => {
    toggleTodo(tache);
  });
  li.append(span, par);
  return li;
};
const createIsDeleteElement = (isdelete) => {
  let tache = todos.getTaches().get(isdelete);
  const li = document.createElement("li");
  const span = document.createElement("span");
  const par = document.createElement("p");
  span.className = "todo done";
  par.textContent = tache.getName();
  li.className = "ligne";
  const buttonRestore = document.createElement("button");
  buttonRestore.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleRestoreMode(tache);
  });
  const buttonCorbeille = document.createElement("button");
  buttonCorbeille.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleCorbeilleMode(isdelete);
  });
  buttonRestore.textContent = "Restore";
  buttonCorbeille.textContent = "Corbeille";
  li.append(span, par, buttonRestore, buttonCorbeille);
  return li;
};
const addTodo = (text) => {
  todos.addTaskDay(text);
  chargement();
};
const toggleSelectUser = (user) => {
  donnees.setActifPersonne(user);
  personne = user;
  chargement();
};
const deleteTodo = (todo) => {
  todo.setType("delete");
  chargement();
};
const deleteUser = (user) => {
  donnees.delPersonne(user);
  chargement();
};
const toggleRestoreMode = (text) => {
  text.setType("todo");
  chargement();
};
const toggleCorbeilleMode = (text) => {
  if (confirm("Souhaitez-vous supprimer définitivement la tâche?")) {
    todos.getTaches().delete(text);
    chargement();
  }
};
const toggleTodo = (text) => {
  text.setType("todo");
  chargement();
};
const toggleIsDone = (text) => {
  text.setType("done");
  chargement();
};
const toggleEditMode = (text) => {
  text.setIsEdit(!text.getIsEdit());
  chargement();
};
const toggleProcrastiner = (text) => {
  if (donnees.addTaskDayToDo(personne, demain(jour), text)) {
    donnees.delTaskDayToDo(personne, jour, text);
  }
  chargement();
};
const togglebuttonAvancer = (text) => {
  if (donnees.addTaskDayToDo(personne, hier(jour), text)) {
    donnees.delTaskDayToDo(personne, jour, text);
  }
  chargement();
};

const editTodo = (text, input) => {
  const value = input.value;

  text.setName(value);
  chargement();
};

let sauvegarde = setInterval(() => {
  if (sauvegardeauto) {
    const jsonS = JSON.stringify(data.getData().toSerialise());
    localStorage.setItem("TODODATA", jsonS);
  }
}, 2000);
const demain = (jour) => {
  switch (jour) {
    case "Lundi":
      return "Mardi";
    case "Mardi":
      return "Mercredi";
    case "Mercredi":
      return "Jeudi";
    case "Jeudi":
      return "Vendredi";
    case "Vendredi":
      return "Samedi";
    case "Samedi":
      return "Diamnche";
    case "Diamnche":
      return "Lundi";
    default:
      return "Lundi";
  }
};
const hier = (jour) => {
  switch (jour) {
    case "Mercredi":
      return "Mardi";
    case "Jeudi":
      return "Mercredi";
    case "Vendredi":
      return "Jeudi";
    case "Samedi":
      return "Vendredi";
    case "Diamnche":
      return "Samedi";
    case "Lundi":
      return "Diamnche";
    case "Mardi":
      return "Lundi";
    default:
      return "Lundi";
  }
};
const displayUser = () => {
  ul0.textContent = "";
  for (let index = 0; index < donnees.getAllPersonne().length; index++) {
    if (donnees.getAllPersonne()[index].actif) {
      ul0.append(createUserActifElement(donnees.getAllPersonne()[index].nom));
      break;
    }
  }
  for (let index = 0; index < donnees.getAllPersonne().length; index++) {
    if (!donnees.getAllPersonne()[index].actif) {
      ul0.append(createUserInactifElement(donnees.getAllPersonne()[index].nom));
    }
  }
};
const displayTodo = () => {
  ul.textContent = "";

  ul2.textContent = "";

  ul3.textContent = "";
  if (todos) {
    console.log(todos);
    if (todos.taches.size > 0) {
      const remplissage = (value, key, map) => {
        switch (value.getType()) {
          case "todo":
            if (value.isEdit) {
              ul.append(createTodoEditElement(key));
            } else {
              ul.append(createTodoElement(key));
            }
            break;
          case "done":
            ul2.append(createIsDoneElement(key));
            break;
          case "delete":
            ul3.append(createIsDeleteElement(key));
        }
      };
      todos.taches.forEach(remplissage);
    }
  }
};

const lock = () => {
  const body1 = document.getElementById("div1");
  body1.hidden = true;
  const body2 = document.getElementById("div2");
  body2.hidden = true;
};
if (localStorage.getItem("TODODATA")) {
  donnees = data
    .getData()
    .toDeserialise(JSON.parse(localStorage.getItem("TODODATA")));
  let nb = donnees.info.categories.length;
  if (nb > 0) {
    if (!(personne = donnees.getActifPersonne())) {
      personne = donnees.info.categories[nb - 1];
      donnees.setActifPersonne(personne);
    }
    inputLogin.value = personne;
    chargement();
  } else {
    lock();
  }
} else {
  lock();
}
