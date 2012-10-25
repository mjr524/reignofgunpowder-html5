//LesPersos.js
//Constructeur
function LesPersos() {
    this.tabLesPersos = new Array();
	this.intNbrPersos = 0;
	
    //Si on ne passe pas par GetInstance pour r�cup�rer l'instance
    //On g�n�re une erreur
    if (LesPersos.caller != LesPersos.GetInstance) {
        throw new Error("On ne peut pas instancier LesPersos, on doit la r�cup�rer par GetInstance, c'est un singleton");
    }
}

//Instance de la classe
LesPersos.instance = null;

//Pattern de singleton
LesPersos.GetInstance = function () {
    if (LesPersos.instance == null) {
        LesPersos.instance = new LesPersos();
    }
    return LesPersos.instance
}

//Ajoute un perso dans la liste
LesPersos.prototype.add = function (perso) {
    this.tabLesPersos[this.getNbPersos()] = perso;
    stage.addChild(perso);
    this.intNbrPersos += 1;
}

//Retourne la liste de persos
LesPersos.prototype.get = function () {
    return this.tabLesPersos;
}

//Supprime un perso par son index
LesPersos.prototype.deleteAtIndex = function (index) {
    this.tabLesPersos.splice(index, 1);
	this.intNbrPersos -= 1;
	for (var i = index; i <= this.tabLesPersos.length - 1; i++) {
		this.tabLesPersos[i].index--;
	}
}

//Retourne le nombre de persos
LesPersos.prototype.getNbPersos = function () {
	return this.intNbrPersos;
}