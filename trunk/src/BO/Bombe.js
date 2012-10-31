//-----------------------------------------------------------------------------
// Bombe.js			:  Classe basique pour une bombe
//
//	Author : Pizzi 
//	Dcreat : 20/10/2012
//	Dmodif : 25/10/2012 20:40
//-----------------------------------------------------------------------------

/// <summary>
/// Une Simple Bombe
/// </summary>
(function (window) {

    // Attributs de la classe Bombe
    this.intTempsExplosion;  // Temps avant que la bombe explose
    this.intTemps;	// Temps écoulé depuis la pose de la bombe
    this.intIndex;   // Index de la bombe dans le tableau
	this.recRectangle;  // Rectangle de la bombe collision
	this.imgBombe;  // Image de la bombe à l'initialisation
	this.intWidth;  // Largeur de la bombe
	this.intHeight; // Hauteur de la bombe

    function Bombe(imgBombe, ptnPosition, ptnTaille, intTempsExplosion) {
        this.initialize(imgBombe, ptnPosition, ptnTaille, intTempsExplosion);
    }

    // Using EaselJS BitmapSequence as the based prototype
    Bombe.prototype = new createjs.BitmapAnimation();

    // constructor:
    //unique to avoid overiding base class
    Bombe.prototype.BitmapAnimation_initialize = Bombe.prototype.initialize;

	// Initialisation de la bombe
    Bombe.prototype.initialize = function (imgBombe, ptnPosition, ptnTaille, intTempsExplosion) {
        var spriteSheet = new createjs.SpriteSheet({
		// image � utiliser et � d�couper
		images: [imgBombe], 
		// largeur, hauteur & point central de chacun des sprites
		frames: {width: ptnTaille.x, height: ptnTaille.y, regX: 0, regY: 0}, 
		animations: {    
			chauffe: [0, 20, "chauffe",6],
		}
		});
        // -- Initialisation de l'animation
        this.BitmapAnimation_initialize(spriteSheet);
        this.vX = 1; // Défilement de l'animation
        this.currentFrame = 0;
		// -- Position et taille de la bombe
        this.x = ptnPosition.x;
        this.y = ptnPosition.y;
		this.intWidth = imgBombe.width;
		this.intHeight = imgBombe.height;
		// -- Les deux images de la bombe
		this.imgBombe = imgBombe;
		// -- Les différentes Timers de la bombe
        this.intTemps = 0;
		this.intTempsExplosion = intTempsExplosion;
		// -- Initialisation de l'index de la bombe
		this.intIndex = tabLesBombes.GetNbBombes();
		// -- Initialisation du rectange de la bombe
		this.recRectangle = new XNARectangle(this.x, this.y, this.intWidth, this.intHeight);
		// -- On fini en ajoutant la bombe sur le dessin
		tabLesBombes.Add(this);
		// -- On joue l'animation
		this.gotoAndPlay("chauffe");
    }
	
	// Actualise le rectangle de la bombe
	Bombe.prototype.GetRectangle = function () {
		this.recRectangle = new XNARectangle(this.x, this.y, this.intWidth, this.intHeight);
		return this.recRectangle;
	}
    
    window.Bombe = Bombe;
}(window));