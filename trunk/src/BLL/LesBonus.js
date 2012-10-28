//-----------------------------------------------------------------------------
// LesBonus.js			:  Classe contenant tous les bonus
//
//	Author : Pizzi
//	Dcreat : 28/10/2012 16:30
//	Dmodif : 28/10/2012 16:30
//-----------------------------------------------------------------------------

(function (window) {
	
	// Instance de la classe
	LesBonus.instance = null;
	
	//Constructeur
	function LesBonus() {
		this.tabLesBonus = new Array();
		this.intNbrBonus = 0;
		
		//Si on ne passe pas GetInstance pour récupérer l'instance
		// On génére une ereur
		if (LesBonus.caller != LesBonus.GetInstance) {
			throw new Error("On ne peut pas instancier LesBonus, on doit récupérer par GetInstance, c'est un Singleton");
		}
	}
	
	//Pattern de Singleton
	LesBonus.GetInstance = function () {
		if (LesBonus.instance == null) {
			LesBonus.instance = new LesBonus();
		}
		return LesBonus.instance;
	}
	
	//Ajoute le bonus dans le tableau
	LesBonus.prototype.Add = function(bonus) {
		this.tabLesBonus[this.GetNbBonus()] = bonus;
		stage.addChild(bonus);
		this.intNbrBonus += 1;
	}
	
	//Retourne la liste des flammes
	LesBonus.prototype.Get = function () {
		return this.tabLesBonus;
	}
	
	//Supprimer un bonus par son index
	LesBonus.prototype.DeleteAtIndex = function (intIndex) {
		// -- On enlève le bonus du dessin
		stage.removeChild(this.tabLesBonus[intIndex]);
		this.tabLesBonus.splice(intIndex, 1);
		this.intNbrBonus -= 1;
		// -- On remet les index pour les autres bonus
		for (var i = intIndex; i <= this.tabLesBonus.length - 1; i++) {
			this.tabLesBonus[i].intIndex--;
		}
	}
	
	//Retourne le nombre de bonus
	LesBonus.prototype.GetNbBonus = function () {
		return this.intNbrBonus;
	}
	
	window.LesBonus = LesBonus;
}(window));
