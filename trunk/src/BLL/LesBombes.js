//-----------------------------------------------------------------------------
// LesBombes.js			:  Classe contenant toutes les bombes
//
//	Author : Jo 
//	Dcreat : *
//	Dmodif : 16/11/2012 00:30
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
        this.CreerExplosion(new createjs.Point(this.tabLesBombes[intIndex].x, this.tabLesBombes[intIndex].y - 25), 6);
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
    
    //Crée une explosion à une position et à une puissance donnée
	LesBombes.prototype.CreerExplosion = function (position, puissance){
		var image = null;
		for (var i = puissance; i >= 0; i--) {
			if(i==0)
			{
				image = this.ChoisirFlamme(3,1);
				new Flamme(image, new createjs.Point(position.x,position.y),new createjs.Point(50,75));
			}
			else{
				image = this.ChoisirFlamme(3,1);
				new Flamme(image, new createjs.Point(position.x + i*30,position.y),new createjs.Point(50,75));
				image = this.ChoisirFlamme(3,1);
				new Flamme(image, new createjs.Point(position.x - i*30,position.y),new createjs.Point(50,75));
				image = this.ChoisirFlamme(3,1);
				new Flamme(image, new createjs.Point(position.x,position.y + i*30),new createjs.Point(50,75));
				image = this.ChoisirFlamme(3,1);
				new Flamme(image, new createjs.Point(position.x,position.y - i*30),new createjs.Point(50,75));
			}	
		}
	}
	
	//Permet de choisir la flamme via un random
	LesBombes.prototype.ChoisirFlamme = function (intMax,intMin){
		var image = null;
		var random = Math.floor((Math.random()*intMax)+intMin);
		if (random == 1){image = sprExplosion1;}
		else if(random == 2){image = sprExplosion2;}
		else{ image = sprExplosion3;}
		return image;
	}

    //Retourne le nombre de bombes
    LesBombes.prototype.GetNbBombes = function () {
        return this.intNbrBombes;
    }
    
    //Retoune s'il y a une collision (deplacement)
    LesBombes.prototype.GetCollsionBombe = function (recZone) {
    	for (var i = 0; i <= this.tabLesBombes.length - 1; i++){
    		if (this.tabLesBombes[i].GetRectangle().Intersects(recZone))
    		{return true;}
    	}
    	return false;
    }

	window.LesBombes = LesBombes;
}(window));