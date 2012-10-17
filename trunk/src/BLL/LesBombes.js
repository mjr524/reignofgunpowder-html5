//LesBombes.js
(function (window)
{
    //Instance de la classe
    LesBombes.instance = null;
    
    //Constructeur
    function LesBombes() {
        this.lesBombes = new Array();
        this.nbr_bombes = 0;

        //Si on ne passe pas par getInstance pour récupérer l'instance
        //On génère une erreur
        if (LesBombes.caller != LesBombes.getInstance) {
            throw new Error("On ne peut pas instancier LesBombes, on doit la récupérer par getInstance, c'est un singleton");
        }
    }

    //Pattern de singleton
    LesBombes.getInstance = function () {
        if (LesBombes.instance == null) {
            LesBombes.instance = new LesBombes();
        }
        return LesBombes.instance
    }

    //Ajoute une bombe dans la liste
    LesBombes.prototype.add = function (bombe) {
        this.lesBombes[this.getNbBombes()] = bombe;
        stage.addChild(bombe);
        this.nbr_bombes += 1;
    }

    //Retourne la liste de bombes
    LesBombes.prototype.get = function () {
        return this.lesBombes;
    }

    //Supprime une bombe par son index
    LesBombes.prototype.deleteAtIndex = function (index) {
        CreerExplosion(new createjs.Point(this.lesBombes[index].x, this.lesBombes[index].y), 10);
        this.lesBombes.splice(index, 1);
        this.nbr_bombes -= 1;
        for (var i = index; i <= this.lesBombes.length - 1; i++) {
            this.lesBombes[i].index--;
        }
    }

    //Retourne le nombre de bombes
    LesBombes.prototype.getNbBombes = function () {
        return this.nbr_bombes;
    }

window.LesBombes = LesBombes;
}(window));