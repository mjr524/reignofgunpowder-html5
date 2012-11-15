//-----------------------------------------------------------------------------
// LesPersos.js			:  Classe contenant tous les persos
//
//	Author : Jo 
//	Dcreat : *
//	Dmodif : 05/11/2012 23:30
//-----------------------------------------------------------------------------

(function (window) {
	
	//Instance de la classe
	LesPersos.instance = null;
	
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


	//Pattern de singleton
	LesPersos.GetInstance = function () {
	    if (LesPersos.instance == null) {
	        LesPersos.instance = new LesPersos();
	    }
	    return LesPersos.instance
	}

	//Ajoute un perso dans la liste
	LesPersos.prototype.Add = function (perso) {
	    this.tabLesPersos[this.getNbPersos()] = perso;
	    stage.addChild(perso);
	    this.intNbrPersos += 1;
	}

	//Retourne la liste de persos
	LesPersos.prototype.Get = function () {
	    return this.tabLesPersos;
	}


	//Boucle sur tous les persos
	LesPersos.prototype.tick = function () {
		for (var i = 0; i <= this.tabLesPersos.length - 1; i++) {
			if (this.tabLesPersos[i].bolEnDeplacement == true)
			{
				if (this.tabLesPersos[i].intDirection == 1) {
					this.tabLesPersos[i].y -= this.tabLesPersos[i].intDeplacement;
					if (this.tabLesPersos[i].currentAnimation.indexOf("haut") == -1 || this.tabLesPersos[i].currentAnimation.indexOf("haut") == 6) {
						this.tabLesPersos[i].gotoAndPlay("haut");
					}				
	            }
	            if (this.tabLesPersos[i].intDirection == 2) {
	            	this.tabLesPersos[i].x += this.tabLesPersos[i].intDeplacement;
	            	if( this.tabLesPersos[i].currentAnimation.indexOf("droite") == -1 || this.tabLesPersos[i].currentAnimation.indexOf("droite") == 6) {
						this.tabLesPersos[i].gotoAndPlay("droite");
					}
	            }
	            if (this.tabLesPersos[i].intDirection == 3) {
	            	this.tabLesPersos[i].y += this.tabLesPersos[i].intDeplacement;
	            	if (this.tabLesPersos[i].currentAnimation.indexOf("bas") == -1 || this.tabLesPersos[i].currentAnimation.indexOf("bas") == 6) {
						this.tabLesPersos[i].gotoAndPlay("bas");
					}
	            }
	            if (this.tabLesPersos[i].intDirection == 4) {
	            	this.tabLesPersos[i].x -= this.tabLesPersos[i].intDeplacement;
	            	if (this.tabLesPersos[i].currentAnimation.indexOf("gauche") == -1 || this.tabLesPersos[i].currentAnimation.indexOf("gauche") == 6) {
						this.tabLesPersos[i].gotoAndPlay("gauche");
					}
	            }
           }
           else
           {
           		if (this.tabLesPersos[i].intDirection == 1) {
           			this.tabLesPersos[i].gotoAndPlay("hidle_haut");
           		}
           		if (this.tabLesPersos[i].intDirection == 2) {
           			this.tabLesPersos[i].gotoAndPlay("hidle_droite");
           		}
           		if (this.tabLesPersos[i].intDirection == 3) {
           			this.tabLesPersos[i].gotoAndPlay("hidle_bas");
           		}
           		if (this.tabLesPersos[i].intDirection == 4) {
           			this.tabLesPersos[i].gotoAndPlay("hidle_gauche");
           		}
           }
		}
	}


	//Supprime un perso par son index
	LesPersos.prototype.DeleteAtIndex = function (index) {
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
	
	//Retourne s'il y a une collision (explosion)
	LesPersos.prototype.GetExplosionDecor = function (recZone) {
		for (var i = 0; i <= this.tabLesPersos.length - 1; i++){
			if (this.tabLesPersos[i].GetRectangle().Intersects(recZone))
			{this.DeleteAtIndex(i);}
		}
	}
	
	//Retourne s'il y a une collision ou pas
	LesPersos.prototype.GetCollisionDecor = function (recZone) {
		for (var i = 0; i <= this.tabLesPersos.length - 1; i++){
			if (this.tabLesPersos[i].GetRectangle().Intersects(recZone)){return i;}
		}
		return -1;
	}
	
	window.LesPersos = LesPersos;
}(window));