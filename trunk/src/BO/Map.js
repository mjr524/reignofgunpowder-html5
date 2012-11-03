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
    this.tabDecorMap = new Array();
    // -- Les constantes
    this.NBRCASELARGEUR = 2;
    this.NBRCASEHAUTEUR = 1;
    this.TAILLECASE = 50;
    // -- Enumération pour les décors
    var EnuDecors = 
	{
	      Vide : 0, 
	      Arbre : 1,
	      Caisse : 2,
	}


    function Map(strMap) {
        ChargerMap(strMap);
    }

	this.ChargerMap = function(strMap){
    	strXhr.onreadystatechange = TraiterDonnees;
		strXhr.open("GET", strMap, true);
		strXhr.send(null);
   }
   
   this.TraiterDonnees = function(){
   		if (strXhr.readyState == 4 && (strXhr.status == 200 || strXhr.status == 0)) {
			this.tabDecorMap = eval('(' + strXhr.responseText + ')');
			MettreDecor(this.tabDecorMap);
		}
		else{
			alert("Impossible de charger la map " + strHxr + "...");
		}
   }
   
   this.MettreDecor = function(pTabDecor){
   		// -- Tableau stockant les espaces décorés
   		var tabEspacesOccupés = new Array();
   		var intCompteur = 0;
   		// -- On parcourt toutes les occurences pour charger l'intégralité de la map
   		// -- On boucle d'abord sur la hateur (y)
   		for (var i = 0; i <= NBRCASEHAUTEUR; i++)
   		{
   			// -- Puis sur la largeur (x)
   			for (var j = 0; j <= NBRCASELARGEUR; j++)
   			{
   				/*alert(pTabDecor.decors[intCompteur].type);
   				alert(pTabDecor.decors[intCompteur].tailleX);
   				alert(pTabDecor.decors[intCompteur].tailleY);*/
   				if (tabEspacesOccupés[j] <= i | i == 0)
   				{
   					AjouterDecor(pTabDecor.decors[intCompteur].type, j*TAILLECASE, i*TAILLECASE);
	   				// -- Si la hauteur du décor est plus grande que le décor, alors on enregistre les espaces occupés (verticalement)
	   				tabEspacesOccupés[j] += pTabDecor.decors[intCompteur].tailleY;
	   				// -- Si la largeur du décor est plus grande que la case, alors on passe directement aux cases suivantes
	   				j += pTabDecor.decors[intCompteur].tailleX - 1;
   				}
   				// -- On passe à l'occurence suivante
   				intCompteur ++;
   			}
   		}   	
   }
   
   this.AjouterDecor = function(pintTypeDecor, pintX, pintY){
   		// -- Selon le type de décor, on dessine tel ou tel image
   		if (pintTypeDecor = EnuDecors.Arbre){ new Decor(imgArbre, new createjs.Point(pintX,pintY), new createjs.Point(100,150), new XNARectangle(pintX,pintY,25,25), true, false);}
   }

    window.Map = Map;
}(window));