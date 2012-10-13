//-----------------------------------------------------------------------------
// Bombe.js
//-----------------------------------------------------------------------------

/// <summary>
/// Une Simple Bombe
/// </summary>
(function (window) {

    //Attributs de la classe Bombe


    function Bombe(imgBombe) {
        this.initialize(imgBombe);
    }

    // Using EaselJS BitmapSequence as the based prototype
    Bombe.prototype = new createjs.BitmapAnimation();

    // constructor:
    //unique to avoid overiding base class
    Bombe.prototype.BitmapAnimation_initialize = Bombe.prototype.initialize;

    Bombe.prototype.initialize = function (imgBombe) {

    }


    Bombe.prototype.tick = function () {

    }

    window.Bombe = Bombe;
}(window));