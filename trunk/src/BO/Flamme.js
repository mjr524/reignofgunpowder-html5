//-----------------------------------------------------------------------------
// Flamme.js			:  Classe basique pour une flamme
//
//	Author : Pizzi 
//	Dcreat : 23/10/2012
//	Dmodif : 23/10/2012 22:00
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
		this.index = nbr_flammes;
		nbr_flammes ++;
		// -- Initialisation des timers
		this.intTemps = 0;
		this.intTEMPS_FLAMME = 10;
		// -- Initialisation du rectangle
		this.recRectangle = new XNARectangle(this.x, this.y, this.intWidth, this.intHeight);
		// -- On finit en ajoutant la flamme au dessin
		this.AjouterFlamme();
    }


	// Boucle sur une flamme
    Flamme.prototype.tick = function () {
		this.intTemps += 1;
        if (this.intTemps == this.intTEMPS_FLAMME) {
            SupprimerFlamme(this.index);
            stage.removeChild(this);
        }
		
		if (this.GetRectangle().Intersects(Hero.GetRectangle()) != false)
		{
			//Le perso a �t� touch� par une flamme
			stage.removeChild(Hero);
		}
		
		if (this.GetRectangle().Intersects(Arbre.GetRectangle()) != false)
		{
			//Le perso a �t� touch� par une flamme
			stage.removeChild(Arbre);
		}
    }
	
	// Ajoute la flamme au dessin
	Flamme.prototype.AjouterFlamme = function () {
		stage.addChild(this);
	}
	
	// Retourne le rectangle de la flamme
	Flamme.prototype.GetRectangle = function () {
		return this.recRectangle;
	}

    window.Flamme = Flamme;
}(window));