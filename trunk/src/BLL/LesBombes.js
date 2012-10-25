//-----------------------------------------------------------------------------
// LesBombes.js			:  Classe contenant toutes les bombes
//
//	Author : Jo 
//	Dcreat : *
//	Dmodif : 24/10/2012 23:30
//-----------------------------------------------------------------------------

(function (window)
{
    //Instance de la classe
    LesBombes.instance = null;
    
    //Constructeur
    function LesBombes() {
        this.lesBombes = new Array();
        this.nbr_bombes = 0;

        //Si on ne passe pas par getInstance pour r�cup�rer l'instance
        //On g�n�re une erreur
        if (LesBombes.caller != LesBombes.getInstance) {
            throw new Error("On ne peut pas instancier LesBombes, on doit la r�cup�rer par getInstance, c'est un singleton");
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
    
    //Boucle sur toutes les bombes;
    LesBombes.prototype.tick = function () {
    	for (var i = 0; i <= this.lesBombes.length - 1; i++) {
            this.lesBombes[i].intTemps += 1;
			// -- On vérifie si la bombe doit rougir
			if (this.lesBombes[i].intTemps == this.lesBombes[i].intTempsExplosion - (30)){   // Pour l'instant mis en brute il faudra trouver une solution pour que cela soit proportionnel au temps explosion
				this.lesBombes[i].RougirBombe();
			}
			// -- On vérifie si la bombe doit exploser
	        if (this.lesBombes[i].intTemps >= this.lesBombes[i].intTempsExplosion) {
	            this.deleteAtIndex(this.lesBombes[i].intIndex);
	        }
        }
    }

    //Supprime une bombe par son index
    LesBombes.prototype.deleteAtIndex = function (index) {
    	// -- On crée l'explosion
        CreerExplosion(new createjs.Point(this.lesBombes[index].x, this.lesBombes[index].y), 10);
        // -- On enlève la bombe du dessin
        stage.removeChild(this.lesBombes[index]);
        // -- On supprimr la bombe du tableau
        this.lesBombes.splice(index, 1);
        this.nbr_bombes -= 1;
        // -- On remet les index pour les autres bombes
        for (var i = index; i <= this.lesBombes.length - 1; i++) {
            this.lesBombes[i].intIndex--;
        }
    }

    //Retourne le nombre de bombes
    LesBombes.prototype.getNbBombes = function () {
        return this.nbr_bombes;
    }

window.LesBombes = LesBombes;
}(window));