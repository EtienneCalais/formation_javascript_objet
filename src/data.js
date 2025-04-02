class task {
  constructor(name, Iedit = false, Itype = "todo", Ipoids = 5) {
    this.name = name;
    this.isEdit = Iedit;
    this.type = Itype;
    this.poids = Ipoids;
    return this;
  }
  static name;
  static isEdit;
  static type;
  static poids;
  toSerialise() {
    return JSON.stringify(this);
  }
  toDeserialise(archive) {
    let objetTask = JSON.parse(archive);
    return new task(
      objetTask.name,
      objetTask.isEdit,
      objetTask.type,
      objetTask.poids
    );
  }
  getName() {
    return this.name;
  }
  setName(Iname) {
    this.name = Iname;
  }
  getIsEdit() {
    return this.isEdit;
  }
  setIsEdit(IEdit) {
    this.isEdit = IEdit;
  }
  getType() {
    return this.type;
  }
  setType(Itype) {
    this.type = Itype;
  }
  getPoids() {
    return this.poids;
  }
  setPoids(IPoids) {
    this.poids = IPoids;
  }
}

class tasksDay {
  static date;
  static taches;
  constructor(Idate = new Date(Date.now()).toDateString(), Itasks = new Map()) {
    this.date = Idate;
    this.taches = Itasks;
  }
  toSerialise() {
    const object2 = {
      date: this.date,
      taches: Array.from(this.taches, ([k, v]) => [k, v.toSerialise()]),
    };
    return JSON.stringify(object2);
  }
  trier(){
    const sortedArray = Array.from(this.taches).sort((a, b) => a[1].getPoids()-b[1].getPoids());
    this.taches=new Map(sortedArray)
  }
  toDeserialise(archive) {
    let object2 = JSON.parse(archive);
    const c = new Map(object2.taches);
    const e = new task();
    const d = Array.from(c, ([k, v]) => [k, e.toDeserialise(v)]);
    return new tasksDay(object2.date, new Map(d));
  }
  getDate() {
    return this.date;
  }
  setDate(Idate) {
    this.date = Idate;
  }
  getTaches() {
    return this.taches;
  }
  setTaches(Itaches) {
    this.taches = Itaches;
  }
  addTaskDay(tache) {

    if (tache.name) {
      if (!this.getTaskDay(tache.name)) {
        this.taches.set(tache.name, tache);
        return true
      } else {
        return false;
      }
    }else{
      if (!this.getTaskDay(tache)) {
      let tache_temp = new task(tache);
      this.taches.set(tache, tache_temp);
    } else {
      alert("La tâche existe déjà");
      return false;
    }}
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
  constructor(
    Inom,
    Idate = new Date(Date.now()).toDateString(),
    Itaches = new Map(),
    Iactif = false
  ) {
    this.nom = Inom;
    this.date = Idate;
    this.taches = Itaches;
    this.actif = Iactif;
    return this;
  }
  toSerialise() {
    const object2 = {
      nom: this.nom,
      date: this.date,
      taches: Array.from(this.taches, ([k, v]) => [k, v.toSerialise()]),
      actif: this.actif,
    };
    return JSON.stringify(object2);
  }
  toDeserialise(archive) {
    let object2 = JSON.parse(archive);
    const c = new Map(object2.taches);
    const e = new tasksDay();
    let d = Array.from(c, ([k, v]) => [k, e.toDeserialise(v)]);
    return new categorie(
      object2.nom,
      object2.date,
      new Map(Array.from(new Map(d))),
      object2.actif
    );
  }
  getNom() {
    return this.nom;
  }
  setNom(Inom) {
    this.nom = Inom;
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

  constructor(info = { categories: [] }) {
    this.info = info;
  }
  toSerialise() {
    const object2 = {
      info: { categories: new Array() },
    };  
    for (let j = 0; j < this.info.categories.length; j++) {
      object2.info.categories.push(this.info.categories[j].toSerialise());
    }
    
    return JSON.stringify(object2);
  }
  toDeserialise(archive) {
    let object2 = JSON.parse(archive);
    let cat = new categorie();
    for (let j = 0; j < object2.info.categories.length; j++) {
        this.info.categories.push(cat.toDeserialise(object2.info.categories[j]));
    }

    return this;
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
      this.setActifPersonne(categorie_temp.getNom())
      return categorie_temp;
    } else {
      alert("Thème existant");
    }
  }
  goToCategorie(Icategorie) {
    for (let i = 0; i < this.info.categories.length; i++) {
      if (this.info.categories[i].match(Icategorie)) {
       return this.info.categories[i]
      }
    }
      const categorie_temp = new categorie(Icategorie, jour);
      this.info.categories.push(categorie_temp);
      this.setActifPersonne(categorie_temp.getNom())
      return categorie_temp;
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
      if ((this.info.categories[i].actif)) {
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
