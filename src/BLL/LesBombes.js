//LesBombes.js
//Constructeur
function LesBombes() {
    this.lesBombes = new Array();

    //Si on ne passe pas par getInstance pour r�cup�rer l'instance
    //On g�n�re une erreur
    if (LesBombes.caller != LesBombes.getInstance) {
        throw new Error("On ne peut pas instancier LesBombes, on doit la r�cup�rer par getInstance, c'est un singleton");
    }
}

//Instance de la classe
LesBombes.instance = null;

//Pattern de singleton
LesBombes.getInstance = function () {
    if (LesBombes.instance == null) {
        LesBombes.instance = new LesBombes();
    }
    return LesBombes.instance
}

//Ajoute une bombe dans la liste
LesBombes.prototype.add = function (bombe) {
    this.lesBombes[nbr_bombes] = bombe;
}

//Retourne la liste de bombes
LesBombes.prototype.get = function () {
    return this.lesBombes;
}

//Supprime une bombe par son index
LesBombes.prototype.deleteAtIndex = function (index) {
    this.lesBombes.splice(index, 1);
}