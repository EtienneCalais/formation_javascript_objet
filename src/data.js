class task {
  constructor(name) {
    this.name = name;
    this.isEdit = false;
    this.isDelete = false;
    this.isDone = false;
    this.isTodo = true;
  }
  static name;
  static isEdit;
  static isDone;
  static isDelete;
  static isTodo;
}

class tasksDay {
  static date;
  static taches;
  constructor(tasks) {
    if (tasks) {
      if (tasks.date) {
        this.date = tasks.date;
        if (tasks.taches) {
          const remplissage = (value, key, map) => {
            this.taches.set(`${key}, ${value}`);
          };
          tasks.taches.forEach(remplissage);
        }
      } else {
        this.date = tasks;
        this.taches = new Map();
      }
    } else {
      this.date = new Date(Date.now()).toDateString();
      this.taches = new Map();
    }
  }
  addTaskDay(tache) {
    if (tache.nom) {
      if (!this.getTaskDay(tache.nom)) {
        this.taches.set(tache.nom, tache);
      } else {
        alert("La tâche existe déjà");
      }
    }
    if (!this.getTaskDay(tache)) {
      let tache_temp = new task(tache);
      this.taches.set(tache, tache_temp);
    } else {
      alert("La tâche existe déjà");
    }
  }
  getTaskDay(journee) {
    if (this.taches.size > 0) {
      return this.taches.get(journee);
    }
  }

  delTaskDay(journee) {
    return this.taches.delete(journee);
  }
}
class categorie {
  static nom;
  static date;
  static taches = new Map();
  static actif;
  constructor(Icategorie, Ijour) {
    if (Icategorie.nom) {
      this.nom = Icategorie.nom;
      if (Icategorie.actif) {
        this.actif = true;
      } else {
        this.actif = false;
      }
      this.taches = new Map();
      if (Icategorie.taches) {
        const taskday_temp = new tasksDay(Icategorie.taches);
        this.taches.set(Ijour, taskday_temp);
      } else {
        const taskday_temp = new tasksDay(Ijour);
        this.taches.set(Ijour, taskday_temp);
      }
    } else {
      if (Icategorie) {
        this.nom = Icategorie;
        this.actif = false;
        this.date = new Date(Date.now()).toDateString();
        const taskday_temp = new tasksDay(this.date);
        this.taches = new Map();
        this.taches.set(this.date, taskday_temp);
      }
    }
  }

  match(Icategorie) {
    return Icategorie === this.nom;
  }
  addTaskDay(tachejournee) {
    return this.taches.addTaskDay(tachejournee);
  }
  getTaskDay(tachejournee) {
    if (this.taches.get(tachejournee)) {
      return this.taches.get(tachejournee);
    } else {
      const taskday_temp = new tasksDay(tachejournee);
      this.taches.set(tachejournee, taskday_temp);
      return this.taches.get(tachejournee);
    }
  }
  delTaskDay(tachejournee) {
    return this.taches.deleteItem(tachejournee);
  }
}
class data {
  static info;

  constructor() {
    this.info = { categories: [] };
  }

  getInfoG() {
    return this.info;
  }
  //Gestion personne
  addCategorie(Icategorie, jour) {
    let trouve = false;
    for (let i = 0; i < this.info.categories.length; i++) {
      if (this.info.categories[i].match(Icategorie)) {
        trouve = true;
        break;
      }
    }
    if (!trouve) {
      const categorie_temp = new categorie(Icategorie, jour);
      this.info.categories.push(categorie_temp);
      return categorie_temp;
    } else {
      alert("Thème existant");
    }
  }
  getPersonne(Icategorie) {
    for (let i = 0; i < this.info.categories.length; i++) {
      if (this.info.categories[i].match(Icategorie)) {
        return this.info.categories[i];
      }
    }
    return false;
  }
  setActifPersonne(Icategorie) {
    for (let i = 0; i < this.info.categories.length; i++) {
      if (this.info.categories[i].match(Icategorie)) {
        this.info.categories[i].actif = true;
      } else {
        this.info.categories[i].actif = false;
      }
    }
    return false;
  }
  getActifPersonne() {
    for (let i = 0; i < this.info.categories.length; i++) {
      if ((this.info.categories[i].actif = true)) {
        return this.info.categories[i].nom;
      }
    }
    return false;
  }
  getAllPersonne() {
    return this.info.categories;
  }
  delPersonne(Icategorie) {
    for (let i = 0; i < this.info.categories.length; i++) {
      if (this.info.categories[i].match(Icategorie)) {
        if (confirm("Souhaitez-vous supprimer définitivement le thème?")) {
          this.info.categories.splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }

  //Gestion taches de la semaine
  addTaskDay(personne, tachejournee) {
    return this.getPersonne(personne).addTaskDay(tachejournee);
  }
  getTaskDay(personne, journee) {
    return this.getPersonne(personne).getTaskDay(journee);
  }
  delTaskDay(personne, tachejournee) {
    return this.getPersonne(personne).delPersonne(tachejournee);
  }

  //Gestion taches
  addTaskDayToDo(personne, jour, tache) {
    return this.getTaskDay(personne, jour).addToDo(tache);
  }
  getaskDayToDo(personne, jour) {
    return this.getTaskDay(personne, jour);
  }
  getToDo(personne, jour, tache) {
    return this.getTaskDay(personne, jour).getToDoTache(tache);
  }
  delTaskDayToDo(personne, jour, tache) {
    return this.getTaskDay(personne, jour).delToDo(tache);
  }
}
var dataW = new data();
export function getData() {
  return dataW;
}
