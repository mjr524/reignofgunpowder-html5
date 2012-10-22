//-----------------------------------------------------------------------------
// Flamme.js
//-----------------------------------------------------------------------------

/// <summary>
/// Une Simple Flamme
/// </summary>
(function (window) {

    //Attributs de la classe Flamme
	this.TEMPS_FLAMME;
    this.temps;
	this.index;
	this.rectangle;

    function Flamme(imgFlamme, position) {
        this.initialize(imgFlamme, position);
    }

    // Using EaselJS BitmapSequence as the based prototype
    Flamme.prototype = new createjs.BitmapAnimation();

    // constructor:
    //unique to avoid overiding base class
    Flamme.prototype.BitmapAnimation_initialize = Flamme.prototype.initialize;

    Flamme.prototype.initialize = function (imgFlamme, position) {
		var spriteSheet = new createjs.SpriteSheet({
		// image � utiliser et � d�couper
		images: [imgFlamme], 
		// largeur, hauteur & point central de chacun des sprites
		frames: {width: 32, height: 32, regX: 0, regY: 0}, 
		});
		this.BitmapAnimation_initialize(spriteSheet);
		this.vX = 1;
		this.x = position.x;
		this.y = position.y;
		this.index = nbr_flammes;
		nbr_flammes ++;
		this.currentFrame = 0;
		this.temps = 0;
		this.TEMPS_FLAMME = 10;
		this.rectangle = new XNARectangle(this.x, this.y, imgFlamme.width/3, imgFlamme.height/3);
		this.AjouterFlamme();
    }


    Flamme.prototype.tick = function () {
		this.temps += 1;
        if (this.temps == this.TEMPS_FLAMME) {
            SupprimerFlamme(this.index);
            stage.removeChild(this);
        }
		
		if (this.rectangle.Intersects(Hero.GetRectangle()) != false)
		{
			//Le perso a �t� touch� par une flamme
			stage.removeChild(Hero);
		}
		
		if (this.rectangle.Intersects(Arbre.GetRectangle()) != false)
		{
			//Le perso a �t� touch� par une flamme
			stage.removeChild(Arbre);
		}
    }
	
	Flamme.prototype.AjouterFlamme = function () {
		stage.addChild(this);
	}

    window.Flamme = Flamme;
}(window));