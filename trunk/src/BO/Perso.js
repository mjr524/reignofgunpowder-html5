//-----------------------------------------------------------------------------
// Perso.js			:  Classe basique pour un perso
//
//	Author : Pizzi 
//	Dcreat : 22/10/2012
//	Dmodif : 22/10/2012 22:30
//-----------------------------------------------------------------------------

/// <summary>
/// Un Simple Perso
/// </summary>
(function (window) {
    
	//Attributs de la classe Perso
	this.intNextX = 0;  // La prochaine coordonn�e X du perso
	this.intNextY = 0; // La prochaine coordonn�e Y du perso
	this.intPreX = 0; // La pr�c�dente coordonn�e X du perso 
	this.intPreY = 0;  // La pr�c�dente coordonn�e Y du perso
	this.intDirection; // La intDirection du personnage : haut=1 / droite=2 / bas=3 / gauche=4
	this.intWidth; // La largeur du perso
	this.intHeight; // La hauteur du perso
	this.bolEnDeplacement; // Le d�placement est-il en train de se d�placer?
	this.recRectangle; // Le rectangue du perso

    function Perso(imgPerso, intPosition, intTaille) {
        this.initialize(imgPerso, intPosition, intTaille);
    }
    
	// Using EaselJS BitmapSequence as the based prototype
    Perso.prototype = new createjs.BitmapAnimation();

    // constructor:
    //unique to avoid overiding base class
    Perso.prototype.BitmapAnimation_initialize = Perso.prototype.initialize;

	// Initialisation du perso
    Perso.prototype.initialize = function (imgPerso, intPosition, intTaille) {
        var spriteSheet = new createjs.SpriteSheet({
		// image � utiliser et � d�couper
		images: [imgPerso], 
		// largeur, hauteur & point central de chacun des sprites
		frames: {width: intTaille.x, height: intTaille.y, regX: 0, regY: 0}, 
		animations: {    
			bas: [0, 3, "bas",8],
			gauche: [4, 7, "gauche",8],
			droite: [8, 11, "droite",8],
			haut: [12, 15, "haut",8],
		}
		});
		// -- Initialisation de l'animation 
		this.BitmapAnimation_initialize(spriteSheet);
		this.vX = 1; // D�filement de l'animation
		this.currentFrame = 0;
		// -- Position, intDirection et dimension du perso
		this.intDirection = 3; // intDirection vers le bas par d�faut
		this.x = intPosition.x;
		this.y = intPosition.y;
		this.intNextX = this.x;
		this.intNextY = this.y;
		this.intWidth = intTaille.x
		this.intHeight = intTaille.y;
		this.bolEnDeplacement = false;
		// -- Initialisation du recRectangle
		this.recRectangle = new XNARectangle(this.x, this.y, this.intWidth, this.intHeight);
		// -- On fini en ajoutant le perso au dessin
		tab_persos.add(this);
	}
	
	// Boucle sur un perso
	Perso.prototype.tick = function () {
        if (this.intNextX == this.x && this.intNextY == this.y){
			this.bolEnDeplacement = false;
			this.stop();
		}
		else{
			if (this.intDirection == 2){
				this.x += this.vX;
			}
			else if(this.intDirection == 4){
				this.x -= this.vX;
			}
			if (this.intDirection == 1){
				this.y -= this.vX;
			}
			else if(this.intDirection == 3){
				this.y += this.vX;
			}
		}
    }
	
	// Deplacement du personnage
	Perso.prototype.Deplacer = function(TypeDeplacement){
		if (TypeDeplacement == 4){
			if(this.intDirection != 4 || this.bolEnDeplacement == false )
			{
				this.gotoAndPlay("gauche");
				this.intNextX = this.x - 32; // Mettre valeurs d'une case en globale
				this.intNextY = this.y;
				this.intDirection = 4;
				this.bolEnDeplacement = true;
			}
		}
		if (TypeDeplacement == 1){
			if(this.intDirection != 1 || this.bolEnDeplacement == false )
			{
				this.gotoAndPlay("haut");
				this.intNextX = this.x;
				this.intNextY = this.y - 32;
				this.intDirection = 1;
				this.bolEnDeplacement = true;
			}
		}
		if (TypeDeplacement == 2){
			if(this.intDirection != 2 || this.bolEnDeplacement == false )
			{
				this.gotoAndPlay("droite");
				this.intNextX = this.x + 32;
				this.intNextY = this.y;
				this.intDirection = 2;
				this.bolEnDeplacement = true;
			}
		}
		if (TypeDeplacement == 3){
			if(this.intDirection != 3 || this.bolEnDeplacement == false )
			{
				this.gotoAndPlay("bas");
				this.intNextX = this.x;
				this.intNextY = this.y + 32;
				this.intDirection = 3;
				this.bolEnDeplacement = true;
			}
		}
	}

	// Poser une bombe ===> Rien � faire ici
	Perso.prototype.PoserBombe = function(){
		if (!this.bolEnDeplacement){
			if (this.intDirection == 2){
			    //tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x + 32,this.y + (this.intHeight-32)));
			    new Bombe(bombe, bombeRouge,new createjs.Point(this.x + 32, this.y + (this.intHeight - 32)), 100);
			}
			else if(this.intDirection == 4){
			    //tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x - 32,this.y + (this.intHeight-32)));
			    new Bombe(bombe, bombeRouge, new createjs.Point(this.x - 32, this.y + (this.intHeight - 32)), 100);
			}
			else if(this.intDirection == 3){
			    //tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x, this.y + 32 + (this.intHeight - 32)));
			    new Bombe(bombe, bombeRouge,new createjs.Point(this.x, this.y + 32 + (this.intHeight - 32)), 100);
			}
			else if(this.intDirection == 1){
			    //tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x, this.y - 32 + (this.intHeight - 32)));
			    new Bombe(bombe, bombeRouge, new createjs.Point(this.x, this.y - 32 + (this.intHeight - 32)), 100);
			}
			
			stage.addChild(this);
		}
	}
	
	// Actualise et retourne le rectange du perso
	Perso.prototype.GetRectangle = function(){
		this.recRectangle = new XNARectangle(this.intNextX, this.intNextY + this.intWidth, 1, 1); 
		return this.recRectangle;
	}
	
    window.Perso = Perso;
} (window));