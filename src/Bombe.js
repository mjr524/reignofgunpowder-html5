//-----------------------------------------------------------------------------
// Bombe.js
//-----------------------------------------------------------------------------

/// <summary>
/// Une Simple Bombe
/// </summary>
(function (window) {
    
	//Attributs de la classe Bombe
	var TEMPS_EXPLOSION = 100;
	
    function Bombe(imgBombe, position) {
        this.initialize(imgBombe, position);
    }
    
	// Using EaselJS BitmapSequence as the based prototype
    Bombe.prototype = new createjs.Bitmap();

    // constructor:
    //unique to avoid overiding base class
    Bombe.prototype.Bitmap_initialize = Bombe.prototype.initialize;

    Bombe.prototype.initialize = function (imgBombe, position) {
        this.Bitmap_initialize(imgBombe);
		this.x = position.x;
		this.y = position.y;
		var temps = 0;
		var index = nbr_bombes;
		nbr_bombes ++;
		this.AjouterBombe();
	}
	

    Bombe.prototype.tick = function () {
        //temps += 1;
		/*if(temps == TEMPS_EXPLOSION){
			//SupprimerBombe(index);
			stage.removeChild(this);
		}*/
    }

	Bombe.prototype.AjouterBombe = function (){
		stage.addChild(this);
	}
	
    window.Bombe = Bombe;
} (window));