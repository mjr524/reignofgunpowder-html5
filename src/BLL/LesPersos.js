//LesPersos.js
//Constructeur
function LesPersos() {
    this.lesPersos = new Array();
	this.nbr_persos = 0;
	
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
    this.lesPersos[this.getNbPersos()] = perso;
    stage.addChild(perso);
    this.nbr_persos += 1;
}

//Retourne la liste de persos
LesPersos.prototype.get = function () {
    return this.lesPersos;
}

//Supprime un perso par son index
LesPersos.prototype.deleteAtIndex = function (index) {
    this.lesPersos.splice(index, 1);
	this.nbr_persos -= 1;
	for (var i = index; i <= this.lesPersos.length - 1; i++) {
		this.lesPersos[i].index--;
	}
}

//Retourne le nombre de persos
LesPersos.prototype.getNbPersos = function () {
	return this.nbr_persos;
}