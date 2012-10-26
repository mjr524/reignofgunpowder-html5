//-----------------------------------------------------------------------------
// LesPersos.js			:  Classe contenant tous les persos
//
//	Author : Jo 
//	Dcreat : *
//	Dmodif : 25/10/2012 21:30
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
			if (this.tabLesPersos[i].intNextX == this.tabLesPersos[i].x && this.tabLesPersos[i].intNextY == this.tabLesPersos[i].y){
				this.tabLesPersos[i].bolEnDeplacement = false;
				this.tabLesPersos[i].stop();
			}
			else{
				if (this.tabLesPersos[i].intDirection == 2){
					this.tabLesPersos[i].x += this.tabLesPersos[i].vX;
				}
				else if(this.tabLesPersos[i].intDirection == 4){
					this.tabLesPersos[i].x -= this.tabLesPersos[i].vX;
				}
				if (this.tabLesPersos[i].intDirection == 1){
					this.tabLesPersos[i].y -= this.tabLesPersos[i].vX;
				}
				else if(this.tabLesPersos[i].intDirection == 3){
					this.tabLesPersos[i].y += this.tabLesPersos[i].vX;
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
	
	window.LesPersos = LesPersos;
}(window));