//-----------------------------------------------------------------------------
// Bombe.js			:  Classe basique pour une bombe
//
//	Author : Pizzi 
//	Dcreat : 20/10/2012
//	Dmodif : 24/10/2012 19:40
//-----------------------------------------------------------------------------

/// <summary>
/// Une Simple Bombe
/// </summary>
(function (window) {

    //Attributs de la classe Bombe
    this.intTempsExplosion;  // Temps avant que la bombe explose
	this.intTempsRouge;  // Temps avant que la bombe rougit
    this.intTemps;	// Temps écoulé depuis la pause de la bombe
    this.intIndex;   // Index de la bombe dans le tableau
	this.recRectangle;  // Rectangle de la bombe collision
	this.imgBombe;  // Image de la bombe à l'initialisation
	this.imgBombeRouge; // Image de la bombe juste avant l'explosion
	this.intWidth;  // Largeur de la bombe
	this.intHeight; // Hauteur de la bombe

    function Bombe(imgBombe, imgBombeRouge, ptnPosition, intTemps_Explosion) {
        this.initialize(imgBombe, imgBombeRouge, ptnPosition, intTemps_Explosion);
    }

    // Using EaselJS BitmapSequence as the based prototype
    Bombe.prototype = new createjs.Bitmap();

    // constructor:
    //unique to avoid overiding base class
    Bombe.prototype.Bitmap_initialize = Bombe.prototype.initialize;

	// Initialisation de la bombe
    Bombe.prototype.initialize = function (imgBombe, imgBombeRouge, ptnPosition, intTemps_Explosion) {
        this.Bitmap_initialize(imgBombe);
		// -- Position et taille de la bombe
        this.x = ptnPosition.x;
        this.y = ptnPosition.y;
		this.intWidth = imgBombe.width;
		this.intHeight = imgBombe.height;
		// -- Les deux images de la bombe
		this.imgBombe = imgBombe;
		this.imgBombeRouge = imgBombeRouge;
		// -- Les différentes Timers de la bombe
        this.intTemps = 0;
		this.intTempsExplosion = intTemps_Explosion;
		// -- Initialisation de l'index de la bombe
		this.intIndex = tab_bombes.getNbBombes();
		// -- Initialisation du rectange de la bombe
		this.recRectangle = new XNARectangle(this.x, this.y, this.intWidth, this.intHeight);
		// -- On fini en ajoutant la bombe sur le dessin
		tab_bombes.add(this);
    }

	// Boucle sur une bombe
    Bombe.prototype.tick = function () {
        this.intTemps += 1;
		// -- On vérifie si la bombe doit rougir
		if (this.intTemps == this.intTempsExplosion - (30)){   // Pour l'instant mis en brute il faudra trouver une solution pour que cela soit proportionnel au temps explosion
			this.RougirBombe();
		}
		// -- On vérifie si la bombe doit exploser
        if (this.intTemps >= this.intTempsExplosion) {
            tab_bombes.deleteAtIndex(this.intIndex);
			// On enlève la bombe du dessin
            stage.removeChild(this);
        }
    }
	
	// Faire rougir la bombe (signal de l'explosion imminente de la bombe
	Bombe.prototype.RougirBombe = function () {
		this.Bitmap_initialize("images/bomb2.png");
		this.intWidth = imgBombeRouge.width;
		this.intHeight = imgBombeRouge.height;
		this.recRectangle = new XNARectangle(this.x, this.y, this.intWidth, this.intHeight);
	}
	
	// Actualise le rectangle de la bombe
	Bombe.prototype.GetRectangle = function () {
		this.recRectangle = new XNARectangle(this.x, this.y, this.intWidth, this.intHeight);
		return this.recRectangle;
	}
    
    window.Bombe = Bombe;
}(window));