//-----------------------------------------------------------------------------
// Perso.js
//-----------------------------------------------------------------------------

/// <summary>
/// Un Simple Perso
/// </summary>
(function (window) {
    
	//Attributs de la classe Perso
	var nextX = 0;
	var nextY = 0;
	var EnDeplacement = false;

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
		frames: {width: 32, height: 48, regX: 16, regY: 24}, 
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
		this.y = 150;
		nextX = this.x;
		nextY = this.y;
		this.currentFrame = 0;
	}
	
	Perso.prototype.Deplacer = function(TypeDeplacement){
		if (!EnDeplacement){
			if (TypeDeplacement == 4){
				this.gotoAndPlay("gauche");
				nextX = this.x - 32;
				nextY = this.y;
				this.direction = -90;
				EnDeplacement = true;
			}
			if (TypeDeplacement == 1){
				this.gotoAndPlay("haut");
				nextX = this.x;
				nextY = this.y - 32;
				this.direction = 45;
				EnDeplacement = true;
			}
			if (TypeDeplacement == 2){
				this.gotoAndPlay("droite");
				nextX = this.x + 32;
				nextY = this.y;
				this.direction = 90;
				EnDeplacement = true;
			}
			if (TypeDeplacement == 3){
				this.gotoAndPlay("bas");
				nextX = this.x;
				nextY = this.y + 32;
				this.direction = -45;
				EnDeplacement = true;
			}
		}
	}

    Perso.prototype.tick = function () {
        if (nextX == this.x && nextY == this.y){
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
			    tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x + 16,this.y - 6));
			}
			else if(this.direction == -90){
			    tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x - 50,this.y - 6));
			}
			else if(this.direction == -45){
			    tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x - 16,this.y + 27));
			}
			else if(this.direction == 45){
			    tab_bombes[nbr_bombes] = new Bombe(bombe, new createjs.Point(this.x - 16, this.y - 32));
			}
			
			stage.addChild(this);
		}
	}
	
    window.Perso = Perso;
} (window));