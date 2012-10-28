//-----------------------------------------------------------------------------
// Bonus.js			:  Classe basique pour un bonus
//
//	Author : Pizzi 
//	Dcreat : 20/10/2012
//	Dmodif : 24/10/2012 19:40
//-----------------------------------------------------------------------------

/// <summary>
/// Un Bonus
/// </summary>
(function (window) {
	
	// Attributs de la classe Bonus
	this.intTEMPSAPPARITION; // Temps avant le bonus disparaît
	this.intTemps // Temps depuis l'apparition du bonus
	this.intIndex; // Index du bonus 
	this.recRectangle; // Rectangle du bonus collision
	this.imgBonus; // Image du Bonus
	
	function Bonus(imgBonus, ptnPosition, ptnTaille, recRectangle){
		this.initialize(imgBonus, ptnPosition, ptnTaille, recRectangle);
	}
	
	// Using EaselJS BitmapSequence as the based prototype
    Bonus.prototype = new createjs.BitmapAnimation();

    // constructor:
    //unique to avoid overiding base class
    Bonus.prototype.BitmapAnimation_initialize = Bonus.prototype.initialize;
    
    // Initialisation du bonus
    Bonus.prototype.initialize = function (imgBonus, ptnPosition, ptnTaille, recRectangle) {
    	var spritesSheet = new createjs.SpriteSheet({
    	// image à utliser et à découper
    	images: [imgBonus],
    	// Largeur, hauteur & point central de chacun des sprites
    	frames: {width: ptnTaille.x, height: ptnTaille.y, regX: 0, regY: 0},	
    	});
    	// -- Initialisation de l'animation
    	this.BitmapAnimation_initialize(spritesSheet);
    	this.vX = 1; // Défilement de l'animation
    	this.currentFrame = 0;
    	// -- Position, index et dimension du bonus
    	this.x = ptnPosition.x;
    	this.y = ptnPosition.y;
    	// -- Initialisation des timers
    	this.intTemps = 0;
    	this.intTEMPSAPPARITION = 30;
    	// -- Initialisation de l'index de la bombe
    	this.intIndex = tab_bonus.GetNbBonus();
    	// -- Initialisation du rectangle
    	this.recRectangle = new XNARectangle(this.x, this.y, ptnTaille.x, ptnTaille.y);
    	// -- On finit en ajoutant le bonus au dessin
    	tab_bonus.Add(this);
    }
    
    // Boucle sur le bonus
    Bonus.prototype.tick = function () {
    	/*this.intTemps += 1;
    	if (this.intTemps == this.intTEMPSAPPARITION){
    		//SupprimerBonus(this.index);  TODO 
    		stage.removeChild(this);
    	}*/
    }
    
    // Retourne le rectangle du bonus
    Bonus.prototype.GetRectangle = function (){
    	return this.recRectangle;
    }

	
	window.Bonus = Bonus;
}(window));
