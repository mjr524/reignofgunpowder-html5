//-----------------------------------------------------------------------------
// LesFlammes.js			:  Classe contenant toutes les flammes
//
//	Author : Pizzi
//	Dcreat : 27/10/2012 19:30
//	Dmodif : 27/10/2012 23:30
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
		return LesFlammes.instance;	
	}

	//Ajoute une flamme dans le tableau
	LesFlammes.prototype.Add = function(flamme) {
		this.tabLesFlammes[this.GetNbFlammes()] = flamme;
		stage.addChild(flamme);
		this.intNbrFlammes += 1;	
	}
	
	//Retourne la liste des flammes
	LesFlammes.prototype.Get = function () {
		return this.tabLesFlammes;	
	}
	
	//Boucle sur toutes les flammes
	LesFlammes.prototype.tick = function () {
		for (var i = 0; i <= this.tabLesFlammes.length - 1; i++) {
			this.tabLesFlammes[i].intTemps += 1;
	        if (this.tabLesFlammes[i].intTemps == this.tabLesFlammes[i].intTEMPS_FLAMME) {
	            this.DeleteAtIndex(this.tabLesFlammes[i].intIndex);
	        }
			
			if (this.tabLesFlammes[i].GetRectangle().Intersects(prsHero.GetRectangle()) != false)
			{
				//Le perso a �t� touch� par une flamme
				stage.removeChild(prsHero);
			}
			
			if (this.tabLesFlammes[i].GetRectangle().Intersects(decArbre.GetRectangle()) != false)
			{
				//Le perso a �t� touch� par une flamme
				stage.removeChild(decArbre);
			}
		}
	}
	
	//Supprimer une flamme par son index
	LesFlammes.prototype.DeleteAtIndex = function (intIndex) {
		// -- On enlève la flamme du dessin
		stage.removeChild(this.tabLesFlammes[intIndex]);
		this.tabLesFlammes.splice(intIndex, 1);
		this.intNbrFlammes -= 1;
		// -- On remet les index pour les autres flammes
		for (var i = intIndex; i <= this.tabLesFlammes.length - 1; i++) {
			this.tabLesFlammes[i].intIndex--;
		}
	}	
	
	//Retourne le nombre de flammes
	LesFlammes.prototype.GetNbFlammes = function () {
		return this.intNbrFlammes;	
	}

	window.LesFlammes = LesFlammes;
}(window));
