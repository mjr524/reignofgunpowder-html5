//-----------------------------------------------------------------------------
// LesDecors.js			:  Classe contenant tous les decors
//
//	Author : Pizzi
//	Dcreat : 28/10/2012 00:30
//	Dmodif : 08/11/2012 20:45
//-----------------------------------------------------------------------------

(function (window) {
	
	// Instance de la classe
	LesDecors.instance = null;
	
	//Constructeur
	function LesDecors() {
		this.tabLesDecors = new Array();
		this.intNbrDecors = 0;
		
		//Si on ne passe pas par GetInstance pour récupérer l'instance
		//On génére une erreur
		if (LesDecors.caller != LesDecors.GetInstance) {
			throw new Error("On ne peut pas instancier LesDecors, on doit récuperer par GetInstance, c'est un singleton");
		}
	}
	
	//Pattern de Singleton
	LesDecors.GetInstance = function () {
		if (LesDecors.instance == null) {
			LesDecors.instance = new LesDecors();
		}
		return LesDecors.instance;
	}
	
	//Ajoute un décor dans le tableau
	LesDecors.prototype.Add = function (decor) {
		this.tabLesDecors[this.GetNbDecors()] = decor;
		stage.addChild(decor);
		this.intNbrDecors += 1;
	}
	
	//Retourne la liste des decors
	LesDecors.prototype.Get = function () {
		return this.tabLesDecors;
	}
	
	//Boucle sur tous les décors
	LesDecors.prototype.tick = function () {
		// ---> POUR TEST L'APPARITION DE TOUS LES DECORS
	}
	
	//Supprimer un décor par son index
	LesDecors.prototype.DeleteAtIndex = function (intIndex) {
		// -- On enlève le décor du dessin
		stage.removeChild(this.tabLesDecors[intIndex]);
		this.tabLesDecors.splice(intIndex, 1);
		this.intNbrDecors -= 1;
		// -- On remet les index pour les autres décors
		for (var i = intIndex; i <= this.tabLesDecors.length - 1; i++){
			this.tabLesDecors[i].intIndex--;
		}
	}
	
	//Retourne le nombre de decors
	LesDecors.prototype.GetNbDecors = function () {
		return this.intNbrDecors;
	}
	
	//Retourne s'il y a une collision ou pas
	LesDecors.prototype.GetCollisionDecor = function (recZone) {
		for (var i = 0; i <= this.tabLesDecors.length - 1; i++){
			if (this.tabLesDecors[i].GetRectangle().Intersects(recZone))
			{this.DeleteAtIndex(i);}
		}
	}
	
	window.LesDecors = LesDecors;
}(window));
