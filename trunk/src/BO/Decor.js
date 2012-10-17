//-----------------------------------------------------------------------------
// Decor.js
//-----------------------------------------------------------------------------

/// <summary>
/// Une Simple Decor
/// </summary>
(function (window) {

    //Attributs de la classe Decor
	this.IsColliseable;
	this.rectangle;

    function Decor(imgDecor, position) {
        this.initialize(imgDecor, position);
    }

    // Using EaselJS BitmapSequence as the based prototype
    Decor.prototype = new createjs.Bitmap();

    // constructor:
    //unique to avoid overiding base class
    Decor.prototype.Bitmap_initialize = Decor.prototype.initialize;

    Decor.prototype.initialize = function (imgDecor, position) {
		this.Bitmap_initialize(imgDecor);
		this.x = position.x;
		this.y = position.y;
		this.IsColliseable = true;
		this.rectangle = new XNARectangle(this.x, this.y, 100, 150);
		this.AjouterDecor();
    }

    Decor.prototype.tick = function () {
		//Normalement pas besoin
    }
	
	Decor.prototype.AjouterDecor = function () {
		stage.addChild(this);
	}

    window.Decor = Decor;
}(window));