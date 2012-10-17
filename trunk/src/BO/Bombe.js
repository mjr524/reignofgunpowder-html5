//-----------------------------------------------------------------------------
// Bombe.js
//-----------------------------------------------------------------------------

/// <summary>
/// Une Simple Bombe
/// </summary>
(function (window) {

    //Attributs de la classe Bombe
    this.TEMPS_EXPLOSION;
    this.temps;
    this.index;

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
        this.temps = 0;
		this.TEMPS_EXPLOSION = 100;
        //this.index = nbr_bombes;
		this.index = tab_bombes.getNbBombes();
		//nbr_bombes++;
        //this.AjouterBombe();
		tab_bombes.add(this);
    }


    Bombe.prototype.tick = function () {
        this.temps += 1;
        if (this.temps == this.TEMPS_EXPLOSION) {
            //SupprimerBombe(this.index);
            tab_bombes.deleteAtIndex(this.index);
            stage.removeChild(this);
        }
    }

    //Bombe.prototype.AjouterBombe = function () {
    //    stage.addChild(this);
    //}

    window.Bombe = Bombe;
}(window));