//LesPersos.js
//Constructeur
function LesPersos() {
    this.lesPersos = new Array();

    //Si on ne passe pas par getInstance pour récupérer l'instance
    //On génère une erreur
    if (LesPersos.caller != LesPersos.getInstance) {
        throw new Error("On ne peut pas instancier LesPersos, on doit la récupérer par getInstance, c'est un singleton");
    }
}

//Instance de la classe
LesPersos.instance = null;

//Pattern de singleton
LesPersos.getInstance = function () {
    if (LesPersos.instance == null) {
        LesPersos.instance = new LesPersos();
    }
    return LesPersos.instance
}

//Ajoute un perso dans la liste
LesPersos.prototype.add = function (perso) {
    this.lesPersos.push(perso);
}

//Retourne la liste de persos
LesPersos.prototype.get = function () {
    return this.lesPersos;
}

//Supprime un perso par son index
LesPersos.prototype.deleteAtIndex = function (index) {
    this.lesPersos.splice(index, 1);
}