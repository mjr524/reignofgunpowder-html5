//-----------------------------------------------------------------------------
// Perso.js			:  Classe basique pour un perso
//
//	Author : Pizzi 
//	Dcreat : 22/10/2012
//	Dmodif : 22/10/2012 13:30
//-----------------------------------------------------------------------------

/// <summary>
/// Un Simple Perso
/// </summary>
(function (window) {
    
	//Attributs de la classe Perso
	this.nextX = 0;  // La prochaine coordonnée X du perso
	this.nextY = 0; // La prochaine coordonnée Y du perso
	this.preX = 0; // La précédente coordonnée X du perso 
	this.preY = 0;  // La précédente coordonnée Y du perso
	this.direction; // La direction du personnage : haut=1 / droite=2 / bas=3 / gauche=4
	this.width; // La largeur du perso
	this.height; // La hauteur du perso
	this.EnDeplacement = false; // Le déplacement est-il en train de se déplacer?
	this.rectangle; // Le rectangue du perso

    function Perso(imgPerso, position, taille) {
        this.initialize(imgPerso, position);
    }
    
	// Using EaselJS BitmapSequence as the based prototype
    Perso.prototype = new createjs.BitmapAnimation();

    // constructor:
    //unique to avoid overiding base class
    Perso.prototype.BitmapAnimation_initialize = Perso.prototype.initialize;

	// Initialisation du perso
    Perso.prototype.initialize = function (imgPerso, position, taille) {
        var spriteSheet = new createjs.SpriteSheet({
		// image à utiliser et à découper
		images: [imgPerso], 
		// largeur, hauteur & point central de chacun des sprites
		frames: {width: taille.x, height: taille.y, regX: 0, regY: 0}, 
		animations: {    
			bas: [0, 3, "bas",8],
			gauche: [4, 7, "gauche",8],
			droite: [8, 11, "droite",8],
			haut: [12, 15, "haut",8],
		}
		});
		// -- Initialisation de l'animation 
		this.BitmapAnimation_initialize(spriteSheet);
		this.vX = 1; // Défilement de l'animation
		this.currentFrame = 0;
		// -- Position, direction et dimension du perso
		this.direction = 3; // Direction vers le bas par défaut
		this.x = position.x;
		this.y = position.y;
		this.nextX = this.x;
		this.nextY = this.y;
		this.width = taille.x
		this.height = taille.y;
		// -- Initialisation du rectangle
		this.rectangle = new XNARectangle(this.x, this.y, imgPerso.width, imgPerso.height);
		// -- On fini en ajoutant le perso au dessin
		tab_persos.add(this);
	}
	
	// Boucle sur un perso
	Perso.prototype.tick = function () {
        if (this.nextX == this.x && this.nextY == this.y){
			EnDeplacement = false;
			this.stop();
		}
		else{
			if (this.direction == 2){
				this.x += this.vX;
			}
			else if(this.direction == 4){
				this.x -= this.vX;
			}
			if (this.direction == 1){
				this.y -= this.vX;
			}
			else if(this.direction == 3){
				this.y += this.vX;
			}
		}
    }
	
	// Deplacement du personnage
	Perso.prototype.Deplacer = function(TypeDeplacement){
		if (!EnDeplacement){
			if (TypeDeplacement == 4){
				this.gotoAndPlay("gauche");
				this.nextX = this.x - 32; // Mettre valeurs d'une case en globale
				this.nextY = this.y;
				this.direction = 4;
				if (Arbre.rectangle.Intersects(this.RetourRectangle())==false) // A modifier lors de la création les décors
				{
					EnDeplacement = true;
				}
				else
				{
					this.nextX = this.x;
					this.nextY = this.y;
				}
			}
			if (TypeDeplacement == 1){
				this.gotoAndPlay("haut");
				this.nextX = this.x;
				this.nextY = this.y - 32;
				this.direction = 1;
				if (Arbre.rectangle.Intersects(this.RetourRectangle())==false) // A modifier lors de la création les décors
				{
					EnDeplacement = true;
				}
				else
				{
					this.nextX = this.x;
					this.nextY = this.y;
				}
			}
			if (TypeDeplacement == 2){
				this.gotoAndPlay("droite");
				this.nextX = this.x + 32;
				this.nextY = this.y;
				this.direction = 2;
				if (Arbre.rectangle.Intersects(this.RetourRectangle())==false) // A modifier lors de la création les décors
				{
					EnDeplacement = true;
				}
				else
				{
					this.nextX = this.x;
					this.nextY = this.y;
				}
			}
			if (TypeDeplacement == 3){
				this.gotoAndPlay("bas");
				this.nextX = this.x;
				this.nextY = this.y + 32;
				this.direction = 3;
				if (Arbre.rectangle.Intersects(this.RetourRectangle())==false)  // A modifier lors de la création les décors
				{ 
					EnDeplacement = true;
				}
				else
				{
					this.nextX = this.x;
					this.nextY = this.y;
				}
			}
		}
	}

	// Poser une bombe ===> Rien à faire ici
	Perso.prototype.PoserBombe = function(){
		if (!EnDeplacement){
			if (this.direction == 2){
			    //tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x + 32,this.y + (this.height-32)));
			    new Bombe(bombe, bombeRouge,new createjs.Point(this.x + 32, this.y + (this.height - 32)), 100);
			}
			else if(this.direction == 4){
			    //tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x - 32,this.y + (this.height-32)));
			    new Bombe(bombe, bombeRouge, new createjs.Point(this.x - 32, this.y + (this.height - 32)), 100);
			}
			else if(this.direction == 3){
			    //tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x, this.y + 32 + (this.height - 32)));
			    new Bombe(bombe, bombeRouge,new createjs.Point(this.x, this.y + 32 + (this.height - 32)), 100);
			}
			else if(this.direction == 1){
			    //tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x, this.y - 32 + (this.height - 32)));
			    new Bombe(bombe, bombeRouge, new createjs.Point(this.x, this.y - 32 + (this.height - 32)), 100);
			}
			
			stage.addChild(this);
		}
	}
	
	// Actualise et retourne le rectange du perso
	Perso.prototype.GetRectangle = function(){
		return new XNARectangle(this.nextX, this.nextY + this.width, 1, 1);
	}
	
    window.Perso = Perso;
} (window));