class task{
    constructor(name){
        this.name=name;
        this.isEdit=false;
    }
    static name;
    static isEdit;
}
class taskDay{
    constructor(tache){
        
        if (tache.jour) this.jour=tache.jour;
        if (tache.toDo) {this.toDo=tache.toDo} else {this.toDo=[]};
        if (tache.isDone) {this.isDone=tache.isDone}else {this.isDone=[]};
        if (tache.isDelete) {this.isDelete=tache.isDelete}else {this.isDelete=[]};
    }
    static day;
    static toDo=[];
    static isDone=[];
    static isDelete=[];
    addToDo(tache){
        const tacheN=new task(tache);
        if (!this.getToDoTache(tache)&&!this.getIsDoneTache(tache)&&!this.getIsDeleteTache(tache)){
        this.toDo.push(tacheN)
        return true}
        else {alert("Tâche existante");
            return false}
    }
    getToDoAll(){
        return this.toDo;
    }
    getToDoTache(tache){
        for (let i = 0;i<this.toDo.length;i++){
            if (this.toDo[i].name===tache){
                return this.toDo[i]
            }
        }
        return false;
    }
    delToDo(tache){
        for (let i = 0;i<this.toDo.length;i++){
            if (this.toDo[i].name===tache){
                this.toDo.splice(i,1)
            }
        }
    }
    addIsDone(tache){
        const tacheN=new task(tache);
        this.isDone.push(tacheN)
    }
    getIsDoneAll(){
        return this.isDone;
    }
    getIsDoneTache(tache){
        for (let i = 0;i<this.isDone.length;i++){
            if (this.isDone[i].name===tache){
                return this.isDone[i]
            }
        }
        return false;
    }
    delIsDone(tache){
        for (let i = 0;i<this.isDone.length;i++){
            if (this.isDone[i].name===tache){
                this.isDone.splice(i,1)
            }
        }
    }
    addIsDelete(tache){
        const tacheN=new task(tache);
        this.isDelete.push(tacheN)
    }
    getIsDeleteAll(){
        return this.isDelete;
    }
    getIsDeleteTache(tache){
        for (let i = 0;i<this.isDelete.length;i++){
            if (this.isDelete[i].name===tache){
                return this.isDelete[i]
            }
        }
        return false;
    }
    delIsDelete(tache){
        for (let i = 0;i<this.isDelete.length;i++){
            if (this.isDelete[i].name===tache){
                this.isDelete.splice(i,1)
            }
        }
    }
}
class tasksWeek{
    constructor(tasks){
        if (tasks.monday)  {
            const tache=new taskDay(tasks.monday)
            this.monday=tache;}
         if (tasks.tuesday)  {
            const tache=new taskDay(tasks.tuesday)
            this.tuesday=tache;}
        if (tasks.wednesday)  {
            const tache=new taskDay(tasks.wednesday)
            this.wednesday=tache;}
        if (tasks.thursday)  {
            const tache=new taskDay(tasks.thursday)
            this.thursday=tache;}
        if (tasks.friday)  {
            const tache=new taskDay(tasks.friday)
            this.friday=tache;}
        if (tasks.saturday)  {
            const tache=new taskDay(tasks.saturday)
            this.saturday=tache;}        
        if (tasks.sunday)  {
            const tache=new taskDay(tasks.sunday)
            this.sunday=tache;}
    }
    static monday;
    static tuesday;
    static wednesday;
    static thursday;
    static friday;
    static saturday;
    static sunday;
    addTaskDay(tachejournee){
        if (tachejournee.day){
            switch (tachejournee.day){
                case "Lundi":
                this.monday=tachejournee;
                return true;    
                case "Mardi":
                this.tuesday=tachejournee;
                return true;    
                case "Mercredi":
                this.wednesday=tachejournee;
                return true;    
                case "Jeudi":
                this.thursday=tachejournee;
                return true;    
                case "Vendredi":
                this.friday=tachejournee;
                return true;    
                case "Samedi":
                this.saturday=tachejournee;
                return true;    
                case "Dimanche":
                this.sunday=tachejournee;
                return true;    
                default:
                return false;}
        }
        else{
            return false;
        }
    }
    getTaskDay(journee){
            switch (journee){
            case "Lundi":
                return this.monday;   
            case "Mardi":
                return this.tuesday;  
            case "Mercredi":
                return this.wednesday;   
            case "Jeudi":
                return this.thursday;
            case "Vendredi":
                return this.friday;
            case "Samedi":
                    return his.saturday;
            case "Dimanche":
                return this.sunday;
            default:
            return false;}
    }
      
    
    delTaskDay(tachejournee){
        if (tachejournee.day){
            switch (tachejournee.day){
                case "Lundi":
                    this.monday=null;
                    return true;   
                case "Mardi":
                    this.tuesday=null;
                    return true;  
                case "Mercredi":
                    this.wednesday=null;
                    return true;   
                case "Jeudi":
                    this.thursday=null;
                    return true;
                case "Vendredi":
                    this.friday=null;
                    return true;
                case "Samedi":
                    this.saturday=null;
                    return true;
                case "Dimanche":
                    this.sunday=null;
                    return true;
                default:
                return false;}
        }
        else{
            return false;
        }
    }

}
class user{
    static login;
    static tachesSemaine;
    static actif;
    constructor(personne){
        if (personne.login){
            this.login=personne.login;
            if (personne.actif){
                this.actif=true;
            }
            else{
                this.actif=false;
            }
            
            if (personne.tachesSemaine){
            this.tachesSemaine=new tasksWeek(personne.tachesSemaine);}
            else{
                this.tachesSemaine=new tasksWeek({monday:{jour:"Lundi"},
                    sunday:{jour:"Dimanche"},
                    tuesday:{jour:"Mardi"},
                    wednesday:{jour:"Mercredi"},
                    thursday:{jour:"Jeudi"},
                    friday:{jour:"Vendredi"},
                    saturday:{jour:"Samedi"}} );
                console.log(this.tachesSemaine)
            }
        }
        else{if (personne){
            this.login=personne;
            this.actif=false;
            this.tachesSemaine=new tasksWeek({monday:{jour:"Lundi"},
                sunday:{jour:"Dimanche"},
                tuesday:{jour:"Mardi"},
                wednesday:{jour:"Mercredi"},
                thursday:{jour:"Jeudi"},
                friday:{jour:"Vendredi"},
                saturday:{jour:"Samedi"}} );
            }
        }
    };
    match(utilisateur){
        return utilisateur ===this.login;
    }
    addTaskDay(tachejournee){
        return this.tachesSemaine.addTaskDay(tachejournee);
    }
    getTaskDay(tachejournee){
        return this.tachesSemaine.getTaskDay(tachejournee);
    }
    delTaskDay(tachejournee){
        return this.tachesSemaine.delTaskDay(tachejournee);
    }
}
class data{
    static info;
    
    constructor(){
        this.info={utilisateurs:[]};
    };

    getInfoG()  {
        return this.info;       
    };
    //Gestion personne
    addPersonne(personne){
        let trouve = false
        for(let i =0;i<this.info.utilisateurs.length;i++){
            if (this.info.utilisateurs[i].match(personne)){trouve=true;break;}
        } 
        if(!trouve)
        {const utilisateur = new user(personne);
        this.info.utilisateurs.push(utilisateur);
        return utilisateur}
        else{
            alert("Type de tâche existante");
        }
    }
    getPersonne(personne){
        for(let i =0;i<this.info.utilisateurs.length;i++){
            if (this.info.utilisateurs[i].match(personne)){return this.info.utilisateurs[i]}
        }       
        return false;
    };
    setActifPersonne(personne){
        for(let i =0;i<this.info.utilisateurs.length;i++){
            if (this.info.utilisateurs[i].match(personne)){this.info.utilisateurs[i].actif=true}
            else{this.info.utilisateurs[i].actif=false}
        }       
        return false;
    };
    getActifPersonne(){
        for(let i =0;i<this.info.utilisateurs.length;i++){
            if (this.info.utilisateurs[i].actif=true){return this.info.utilisateurs[i].login}
        }       
        return false;
    };
    getAllPersonne(){
        return this.info.utilisateurs;
    };
    delPersonne(personne){
        for(let i =0;i<this.info.utilisateurs.length;i++){
            if (this.info.utilisateurs[i].match(personne)){this.info.utilisateurs.splice(i,1)}
        }       
        return false;
    };

    //Gestion taches de la semaine
    addTaskDay(personne,tachejournee){
        return this.getPersonne(personne).addTaskDay(tachejournee)
    }
    getTaskDay(personne,journee){
        return this.getPersonne(personne).getTaskDay(journee)
    };
    delTaskDay(personne,tachejournee){
        return this.getPersonne(personne).delTaskDay(tachejournee)
    };

    //Gestion taches toDo
    addTaskDayToDo(personne,jour,tache){
        return this.getTaskDay(personne,jour).addToDo(tache);
    }
    getaskDayToDo(personne,jour){
        return this.getTaskDay(personne,jour).getToDoAll();
    }
    getToDo(personne,jour,tache){
        return this.getTaskDay(personne,jour).getToDoTache(tache);
    }
    delTaskDayToDo(personne,jour,tache){
        return this.getTaskDay(personne,jour).delToDo(tache);
    } 
    //Gestion taches isDone
    addTaskDayIsDone(personne,jour,tache){
        return this.getTaskDay(personne,jour).addIsDone(tache);
    }
    getaskDayIsDone(personne,jour){
        return this.getTaskDay(personne,jour).getIsDoneAll();
    }
    getIsDone(personne,jour,tache){
        return this.getTaskDay(personne,jour).getIsDoneTache(tache);
    }
    delTaskDayIsDone(personne,jour,tache){
        return this.getTaskDay(personne,jour).delIsDone(tache);
    }   
    //Gestion taches isDelete
    addTaskDayIsDelete(personne,jour,tache){
        return this.getTaskDay(personne,jour).addIsDelete(tache);
    }
    getaskDayIsDelete(personne,jour){
        return this.getTaskDay(personne,jour).getIsDeleteAll();
    }
    getIsDelete(personne,jour,tache){
        return this.getTaskDay(personne,jour).getIsDeleteTache(tache);
    }
    delTaskDayIsDelete(personne,jour,tache){
        return this.getTaskDay(personne,jour).delIsDelete(tache);
    }    
};
var dataW = new data();
export function getData(){
    return(dataW);
}
