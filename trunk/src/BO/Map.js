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
    this.NBRCASELARGEUR = 20;
    this.NBRCASEHAUTEUR = 10;
    this.TAILLECASE = 50;
    // -- TODO --> Faire énumération avec tous les types de décors possibles (colonnes, rocher, arbre, etc...)


    function Bombe(strMap) {
        ChargerMap(strMap);
        MettreDecor;
    }

	Map.prototype.ChargerMap = function(strMap){
    	strXhr.onreadystatechange = TraiterDonnees;
		strXhr.open("GET", strMap, true);
		strXhr.send(null);
   }
   
   Map.prototype.TraiterDonnees = function(){
   		if (strXhr.readyState == 4 && (strXhr.status == 200 || strXhr.status == 0)) {
			tabDecorMap = eval('(' + strXhr.responseText + ')');
		}
		else{
			alert("Impossible de charger la map " + strHxr + "...");
		}
   }
   
   /*
    * alert(doc.commands[0].value);
	* alert(doc.commands[1].value);
    */
   
   Map.prototype.MettreDecor = function(){
   		// -- Tableau stockant les espaces décorés
   		var tabEspacesOccupés;
   		var intCompteur;
   		// -- On parcourt toutes les occurences pour charger l'intégralité de la map
   		// -- On boucle d'abord sur la hateur (y)
   		for (var i = 0; i <= NBRCASEHAUTEUR; i++)
   		{
   			// -- Puis sur la largeur (x)
   			for (var j = 0; j <= NBRCASELARGEUR; j++)
   			{
   				if (tabEspacesOccupés[j] <= i)
   				{
   					AjouterDecor(tabDecorMap.decors[intCompteur].type, j*TAILLECASE, i*TAILLECASE);
	   				// -- Si la hauteur du décor est plus grande que le décor, alors on enregistre les espaces occupés (verticalement)
	   				tabEspacesOccupés[j] += tabDecorMap.decors[intCompteur].tailleY;
	   				// -- Si la largeur du décor est plus grande que la case, alors on passe directement aux cases suivantes
	   				j += tabDecorMap.decors[intCompteur].tailleX - 1;
   				}
   				// -- On passe à l'occurence suivante
   				intCompteur ++;
   			}
   		}   	
   }
   
   Map.prototype.AjouterDecor = function(pintTypeDecor, pintX, pintY){
   		
   }

    window.Map = Map;
}(window));