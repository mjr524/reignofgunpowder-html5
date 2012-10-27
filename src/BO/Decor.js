//-----------------------------------------------------------------------------
// Decor.js			:  Classe basique pour un décor
//
//	Author : Pizzi 
//	Dcreat : 22/10/2012
//	Dmodif : 22/10/2012 23:20
//-----------------------------------------------------------------------------

/// <summary>
/// Une Simple Decor
/// </summary>
(function (window) {

    //Attributs de la classe Decor
    this.intIndex; // Index du décor dans le tableau
	this.bolIsColliseable; // Le décor peut-il créer une collison?
	this.bolIsAnimated; // Le décor est-il animé?
	this.recRectangle; // Le rectangle du décor

    function Decor(imgDecor, ptnPosition, taille, recCollision, bolColliseable, bolAnimated) {
        this.initialize(imgDecor, ptnPosition, taille, recCollision, bolColliseable, bolAnimated);
    }

    // Using EaselJS BitmapSequence as the based prototype
    Decor.prototype = new createjs.BitmapAnimation();

    // constructor:
    //unique to avoid overiding base class
    Decor.prototype.BitmapAnimation_initialize = Decor.prototype.initialize;

    Decor.prototype.initialize = function (imgDecor, ptnPosition, taille, recCollision, bolColliseable, bolAnimated) {
    	var spriteSheet = new createjs.SpriteSheet({
		// image � utiliser et � d�couper
		images: [imgDecor], 
		// largeur, hauteur & point central de chacun des sprites
		frames: {width: taille.x, height: taille.y, regX: 0, regY: 0}, 
		animations: {  
			//Rien pour l'instant
		}
		});
		// -- Initialisation de l'animation
		this.BitmapAnimation_initialize(spriteSheet);
		this.vx = 1; // Défilement de l'animation
		this.currentFrame = 0;
		// -- Position et dimension du décor
		this.x = ptnPosition.x;
		this.y = ptnPosition.y;
		// -- Colliseable? 
		this.bolIsColliseable = bolColliseable;
		// -- Initialisation de l'index de la bombe
		this.intIndex = tab_decors.GetNbDecors();
		// -- Initialisation du rectangle
		this.recRectangle = recCollision;
		// -- On finit en ajoutant le décor au dessin
		tab_decors.Add(this);
    }

    
    //Retourne le rectangle
    Decor.prototype.GetRectangle = function () {
    	return this.recRectangle;
    }

    window.Decor = Decor;
}(window));