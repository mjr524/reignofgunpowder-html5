//-----------------------------------------------------------------------------
// Flamme.js			:  Classe basique pour une flamme
//
//	Author : Pizzi 
//	Dcreat : 23/10/2012
//	Dmodif : 27/10/2012 23:30
//-----------------------------------------------------------------------------

/// <summary>
/// Une Simple Flamme
/// </summary>
(function (window) {

    //Attributs de la classe Flamme
	this.intTEMPS_FLAMME; // Constante sur les temps des flammes
    this.intTemps; // Temps écoulé depuis l'apparition des flammes
	this.intIndex; // Index de la flamme dans le tableau
	this.intWidth; // Largeur de l'image
	this.intHeight; // Hauteur de l'image
	this.recRectangle; // Rectangle de la flamme collision

    function Flamme(imgFlamme, ptnPosition, ptnTaille) {
        this.initialize(imgFlamme, ptnPosition, ptnTaille);
    }

    // Using EaselJS BitmapSequence as the based prototype
    Flamme.prototype = new createjs.BitmapAnimation();

    // constructor:
    //unique to avoid overiding base class
    Flamme.prototype.BitmapAnimation_initialize = Flamme.prototype.initialize;

	// Initialisation de la flamme
    Flamme.prototype.initialize = function (imgFlamme, ptnPosition, ptnTaille) {
		var spriteSheet = new createjs.SpriteSheet({
		// image � utiliser et � d�couper
		images: [imgFlamme], 
		// largeur, hauteur & point central de chacun des sprites
		frames: {width: ptnTaille.x, height: ptnTaille.y, regX: 0, regY: 0}, 
		animations: {    
			explose: [0, 10, "explose",8],
		}
		});
		// -- Initialisation de l'animation
		this.BitmapAnimation_initialize(spriteSheet);
		this.vX = 1; // Défilement de l'animation
		this.currentFrame = 0;
		// -- Position, index et dimension du perso
		this.x = ptnPosition.x;
		this.y = ptnPosition.y;
		this.intWidth = ptnTaille.x;
		this.intHeight = ptnTaille.y;
		// -- Initialisation des timers
		this.intTemps = 0;
		this.intTEMPS_FLAMME = 80;
		// -- Initialisation de l'index de la bombe
		this.intIndex = tabLesFlammes.GetNbFlammes();
		// -- Initialisation du rectangle
		this.recRectangle = new XNARectangle(this.x, this.y, this.intWidth, this.intHeight);
		// -- On finit en ajoutant la flamme au dessin
		tabLesFlammes.Add(this);
		// -- On joue l'animation
		this.gotoAndPlay("explose");
    }

	
	// Retourne le rectangle de la flamme
	Flamme.prototype.GetRectangle = function () {
		return this.recRectangle;
	}

    window.Flamme = Flamme;
}(window));