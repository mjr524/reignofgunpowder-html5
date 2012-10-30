//-----------------------------------------------------------------------------
// Map.js			:  Classe basique pour une map
//
//	Author : Pizzi 
//	Dcreat : 30/10/2012
//	Dmodif : 30/10/2012 23:00
//-----------------------------------------------------------------------------
/// <summary>
/// Une Simple Bombe
/// </summary>
(function (window) {

    //Attributs de la classe Map
    this.strXhr = new XMLHttpRequest();
    this.tabDecorMap;
    // -- Les constantes
    this.INTNBRCASELARGEUR = 20;


    function Bombe(strMap) {
        ChargerMap(strMap);
    }

	Map.prototype.ChargerMap = function(strMap){
    	xhr.onreadystatechange = TraiterDonnees;
		xhr.open("GET", strMap, true);
		xhr.send(null);
   }
   
   Map.prototype.TraiterDonnees = function(){
   		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			var tabDecorMap = eval('(' + xhr.responseText + ')');
		}
		else{
			alert("Impossible de charger la map " + strHxr + "...");
		}
   }

    window.Map = Map;
}(window));