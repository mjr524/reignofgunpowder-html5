//-----------------------------------------------------------------------------
// LesBombes.js			:  Classe contenant toutes les bombes
//
//	Author : Jo 
//	Dcreat : *
//	Dmodif : 25/10/2012 21:30
//-----------------------------------------------------------------------------

(function (window) {
	
    //Instance de la classe
    LesBombes.instance = null;
    
    //Constructeur
    function LesBombes() {
        this.tabLesBombes = new Array();
        this.intNbrBombes = 0;

        //Si on ne passe pas par GetInstance pour r�cup�rer l'instance
        //On g�n�re une erreur
        if (LesBombes.caller != LesBombes.GetInstance) {
            throw new Error("On ne peut pas instancier LesBombes, on doit la r�cup�rer par GetInstance, c'est un singleton");
        }
    }

    //Pattern de singleton
    LesBombes.GetInstance = function () {
        if (LesBombes.instance == null) {
            LesBombes.instance = new LesBombes();
        }
        return LesBombes.instance
    }

    //Ajoute une bombe dans la liste
    LesBombes.prototype.Add = function (bombe) {
        this.tabLesBombes[this.GetNbBombes()] = bombe;
        stage.addChild(bombe);
        this.intNbrBombes += 1;
    }

    //Retourne la liste des bombes
    LesBombes.prototype.Get = function () {
        return this.tabLesBombes;
    }
    
    //Boucle sur toutes les bombes;
    LesBombes.prototype.tick = function () {
    	for (var i = 0; i <= this.tabLesBombes.length - 1; i++) {
            this.tabLesBombes[i].intTemps += 1;
			// -- On vérifie si la bombe doit exploser
	        if (this.tabLesBombes[i].intTemps >= this.tabLesBombes[i].intTempsExplosion) {
	            this.DeleteAtIndex(this.tabLesBombes[i].intIndex);
	        }
        }
    }

    //Supprime une bombe par son index
    LesBombes.prototype.DeleteAtIndex = function (intIndex) {
    	// -- On crée l'explosion
        CreerExplosion(new createjs.Point(this.tabLesBombes[intIndex].x, this.tabLesBombes[intIndex].y), 6);
        // -- On enlève la bombe du dessin
        stage.removeChild(this.tabLesBombes[intIndex]);
        // -- On supprimr la bombe du tableau
        this.tabLesBombes.splice(intIndex, 1);
        this.intNbrBombes -= 1;
        // -- On remet les index pour les autres bombes
        for (var i = intIndex; i <= this.tabLesBombes.length - 1; i++) {
            this.tabLesBombes[i].intIndex--;
        }
    }

    //Retourne le nombre de bombes
    LesBombes.prototype.GetNbBombes = function () {
        return this.intNbrBombes;
    }

	window.LesBombes = LesBombes;
}(window));