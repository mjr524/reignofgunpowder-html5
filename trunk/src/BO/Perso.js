//-----------------------------------------------------------------------------
// Perso.js
//-----------------------------------------------------------------------------

/// <summary>
/// Un Simple Perso
/// </summary>
(function (window) {
    
	//Attributs de la classe Perso
	this.nextX = 0;
	this.nextY = 0;
	this.preX = 0;
	this.preY = 0;
	this.width;
	this.height;
	var EnDeplacement = false;
	this.rectangle;

    function Perso(imgPerso) {
        this.initialize(imgPerso);
    }
    
	// Using EaselJS BitmapSequence as the based prototype
    Perso.prototype = new createjs.BitmapAnimation();

    // constructor:
    //unique to avoid overiding base class
    Perso.prototype.BitmapAnimation_initialize = Perso.prototype.initialize;

    Perso.prototype.initialize = function (imgPerso) {
        var spriteSheet = new createjs.SpriteSheet({
		// image à utiliser et à découper
		images: [imgPerso], 
		// largeur, hauteur & point central de chacun des sprites
		frames: {width: 32, height: 48, regX: 0, regY: 0}, 
		animations: {    
			bas: [0, 3, "bas",8],
			gauche: [4, 7, "gauche",8],
			droite: [8, 11, "droite",8],
			haut: [12, 15, "haut",8],
		}
		});
		
		this.BitmapAnimation_initialize(spriteSheet);
		this.direction = -45;
		this.vX = 1;
		this.x = 500;
		this.y = 200;
		this.nextX = this.x;
		this.nextY = this.y;
		this.width = imgPerso.width/16;
		this.height = 48;
		this.width = 32;
		this.rectangle = new XNARectangle(this.x, this.y, imgPerso.width, imgPerso.height);
		this.currentFrame = 0;
		this.AjouterPerso();
	}
	
	Perso.prototype.Deplacer = function(TypeDeplacement){
		if (!EnDeplacement){
			if (TypeDeplacement == 4){
				this.gotoAndPlay("gauche");
				this.nextX = this.x - 32;
				this.nextY = this.y;
				this.direction = -90;
				if (Arbre.rectangle.Intersects(this.RetourRectangle())==false)
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
				this.direction = 45;
				if (Arbre.rectangle.Intersects(this.RetourRectangle())==false)
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
				this.direction = 90;
				if (Arbre.rectangle.Intersects(this.RetourRectangle())==false)
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
				this.direction = -45;
				if (Arbre.rectangle.Intersects(this.RetourRectangle())==false)
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

    Perso.prototype.tick = function () {
        if (this.nextX == this.x && this.nextY == this.y){
			EnDeplacement = false;
			this.stop();
		}
		else{
			if (this.direction == 90){
				this.x += this.vX;
			}
			else if(this.direction == -90){
				this.x -= this.vX;
			}
			if (this.direction == 45){
				this.y -= this.vX;
			}
			else if(this.direction == -45){
				this.y += this.vX;
			}
		}
    }

	Perso.prototype.PoserBombe = function(){
		if (!EnDeplacement){
			if (this.direction == 90){
			    tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x + 32,this.y + (this.height-32)));
			}
			else if(this.direction == -90){
			    tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x - 32,this.y + (this.height-32)));
			}
			else if(this.direction == -45){
			    tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x,this.y + 32 + (this.height-32)));
			}
			else if(this.direction == 45){
			    tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x, this.y - 32 + (this.height-32)));
			}
			
			stage.addChild(this);
		}
	}
	
	Perso.prototype.RetourRectangle = function(){
		return new XNARectangle(this.nextX, this.nextY, this.width, this.height);
	}
	
	Perso.prototype.AjouterPerso = function () {
		stage.addChild(this);
	}
	
    window.Perso = Perso;
} (window));