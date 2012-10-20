//-----------------------------------------------------------------------------
// Bombe.js			:  Classe basique pour une bombe
//
//	Author : Pizzi 
//	Dcreat : 20/10/2012
//	Dmodif : 20/10/2012 11:25
//-----------------------------------------------------------------------------

/// <summary>
/// Une Simple Bombe
/// </summary>
(function (window) {

    //Attributs de la classe Bombe
    this.temps_explosion;  // Temps avant que la bombe explose
	this.temps_rouge;  // Temps avant que la bombe rougit
    this.temps;	// Temps �coul� depuis la pause de la bombe
    this.index;   // Index de la bombe dans le tableau
	this.rectangle;  // Rectangle de la bombe collision
	this.imgBombe;  // Image de la bombe � l'initialisation
	this.imgBombeRouge; // Image de la bombe juste avant l'explosion
	this.width  // Largeur de la bombe
	this.height // Hauteur de la bombe

    function Bombe(imgBombe, imgBombeRouge, position, temps_explosion) {
        this.initialize(imgBombe, imgBombeRouge, position, temps_explosion);
    }

    // Using EaselJS BitmapSequence as the based prototype
    Bombe.prototype = new createjs.Bitmap();

    // constructor:
    //unique to avoid overiding base class
    Bombe.prototype.Bitmap_initialize = Bombe.prototype.initialize;

	// Initialisation de la bombe
    Bombe.prototype.initialize = function (imgBombe, imgBombeRouge, position, temps_explosion) {
        this.Bitmap_initialize(imgBombe);
		// --- Position et taille de la bombe
        this.x = position.x;
        this.y = position.y;
		this.width = imgBombe.width;
		this.height = imgBombe.height;
		// --- Les deux images de la bombe
		this.imgBombe = imgBombe;
		this.imgBombeRouge = imgBombeRouge;
		// -- Les diff�rentes Timers de la bombe
        this.temps = 0;
		this.temps_explosion = temps_explosion;
		this.temps_explosion = temps_explosion - (temps_explosion/10); 
		// -- Initialisation de l'index de la bombe
		this.index = tab_bombes.getNbBombes();
		// -- Initialisation du rectange de la bombe
		this.rectange = new XNARectangle(this.x, this.y, this.width, this.height);
		// On fini en ajoutant la bombe sur le dessin
		tab_bombes.add(this);
    }

	// Boucle sur une bombe
    Bombe.prototype.tick = function () {
        this.temps += 1;
		// -- On v�rifie si la bombe doit rougir
		if (this.temps >= this.temps_explosion - (this.temps_explosion/10)
			this.RougirBombe();
		// -- On v�rifie si la bombe doit exploser
        if (this.temps >= this.TEMPS_EXPLOSION) {
            tab_bombes.deleteAtIndex(this.index);
			// On enl�ve la bombe du dessin
            stage.removeChild(this);
        }
    }
	
	// Faire rougir la bombe (signal de l'explosion imminente de la bombe
	Bombe.prototype.RougirBombe = function () {
		this.Bitmap_initialize(imgBombeRouge);
		this.width = imgBombeRouge.width;
		this.height = imgBombeRouge.height;
		this.rectange = new XNARectangle(this.x, this.y, this.width, this.height);
	}
	
	// Actualise le rectangle de la bombe
	Bombe.prototype.GetRectangle = function () {
		this.rectangle = new XNARectangle(this.x, this.y, this.width, this.height);
		return this.rectangle;
	}
    
    window.Bombe = Bombe;
}(window));