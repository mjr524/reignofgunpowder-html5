//-----------------------------------------------------------------------------
// LesFlammes.js			:  Classe contenant toutes les flammes
//
//	Author : Pizzi
//	Dcreat : 27/10/2012 19:30
//	Dmodif : 27/10/2012 21:30
//-----------------------------------------------------------------------------

(function (window) {
	
	// Instance de la classe
	LesFlammes.instance = null;
	
	//Constructeur 
	function LesFlammes() {
		this.tabLesFlammes = new Array();
		this.intNbrFlammes = 0;
		
		//Si on ne passe pas par GetInstance pour récupérer l'instance
		// On génére une erreur
		if (LesFlammes.caller != LesFlammes.GetInstance) {
			throw new Error("On ne peut pas instancier LesFlammes, on doit récupérer par GetInstance, c'est un singleton");	
		}	
	}
	
	//Pattern de Singleton
	LesFlammes.GetInstance = function () {
		if (LesFlammes.instance == null) {
			LesFlammes.instance = new LesFlammes();
		}
		return LesFlammes.instance	
	}

	//Ajoute une flamme dans le tableau
	LesFlammes.prototype.Add = function(flamme) {
		this.tabLesFlammes[this.getNbFlammes()] = flamme;
		stage.addChild(flamme);
		this.intNbrFlammes += 1;	
	}
	
	//Returne la liste des flammes
	LesFlammes.prototype.Get = function () {
		return this.tabLesFlammes;	
	}
	
	//Boucle sur toutes les flammes
	LesFlammes.prototype.tick = function () {
		
	}
	
	//Supprimer une flamme par son index
	LesFlammes.prototype.DeleteAtIndex = function (index) {
		this.tabLesFlammes.splice(index, 1);
		this.intNbrFlammes -= 1;
		for (var i = index; i <= this.tabLesFlammes.length - 1; i++) {
			this.tabLesFlammes[i].index--;	
		}
	}	
	
	//Retourne le nombre de flammes
	LesFlammes.prototype.getNbFlammes = function () {
		return this.intNbrFlammes;	
	}

	window.LesFlammes = LesFlammes;
}(window));
