//FONCTION-----------------------------------------------------------------
//Fonction pour savoir si le panier est vide
function panierVide() {
  if (
    produitEnregistreDansLocalStorage === null ||
    produitEnregistreDansLocalStorage == 0
  ) {
    //ne pas afficher le formulaire
    console.log(`Le panier est vide : true`);
    return true;
    
  } else {
    console.log("Le panier est vide : false");
    return false;    
  }
}
//FIN Fonction--------------------------------------------------------------


//Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(
  localStorage.getItem("produit")
);
//JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log("produitEnregistreDansLocalStorage");
console.log(produitEnregistreDansLocalStorage);


//L'AFFICHAGE DES PRODUITS DU PANIER------------------------------------------------------------
//Sélection de la classe où je vais injecter le code HTML
const positionElement3 = document.querySelector("#container-produits-panier");

let structureProduitPanier = [];

//Si le panier est vide : afficher le panier est vide
if (
  produitEnregistreDansLocalStorage === null ||
  produitEnregistreDansLocalStorage == 0
) {
  const panierVide = `
  <div class="container-panier-vide">
    <div> Le panier est vide</div>
  </div>
`;
  positionElement3.innerHTML = panierVide;
} else {
  //Si le panier n'est pas vide : afficher les produits dans le localStorage
  for (k = 0; k < produitEnregistreDansLocalStorage.length; k++) {
    structureProduitPanier =
      structureProduitPanier +
      `
    <div class="container-recapitulatif">
      <div><span class="gras">Quantité :</span> ${produitEnregistreDansLocalStorage[k].quantite} <span class="gras"> - Produit : </span> ${produitEnregistreDansLocalStorage[k].name} - ${produitEnregistreDansLocalStorage[k].option_produit}</div>
      <div>
        <div class="prix-produit"><span class="gras">${produitEnregistreDansLocalStorage[k].price}€</span></div> 
        <div><button class="btn-supprimer"> supprimer </button></div>
       </div>
    </div>      
    `;
  }
  if (k == produitEnregistreDansLocalStorage.length) {
    //Injection du code html dans la page panier
    positionElement3.innerHTML = structureProduitPanier;
  }
}
//FIN de l'affichage des produits du panier------------------------------------------------------------------


//GESTION DU BOUTTON SUPPRIMER L'ARTICLE---------------------------------------------------------------------
//Sélection des références de tous les boutons btn-supprimer
let btn_supprimer = document.querySelectorAll(".btn-supprimer");

for (let l = 0; l < btn_supprimer.length; l++) {
  btn_supprimer[l].addEventListener("click", (event) => {
    event.preventDefault();

    //Sélection de l'id du produit qui va être supprimer en cliquant sur le bouton
    let id_selectionner_suppression =
      produitEnregistreDansLocalStorage[l].id_ProduitSelectionner;

    //Avec la méthode filter je sélectionne  les éléments à garder et je supprime l'élément où le btn-supprimer a été cliqué
    produitEnregistreDansLocalStorage = produitEnregistreDansLocalStorage.filter(
      (el) => el.id_ProduitSelectionner !== id_selectionner_suppression
    );

    //On envoie la variable dans le local Storage
    //La transformation en format JSON et l'envoyer dans la key "produit" du localStorage
    localStorage.setItem(
      "produit",
      JSON.stringify(produitEnregistreDansLocalStorage)
    );

    //Pop Up Alert pour avertir que le produit a été supprimer et rechargement de la page
    alert("Ce produit a été supprimer du panier");
    window.location.href = "panier.html";
  });
};
//FIN-GESTION DU BOUTTON SUPPRIMER L'ARTICLE----------------------------------------------------


if(panierVide() == false){
//LE BOUTON PANIER POUR VIDER ENTIEREMENT LE PANIER---------------------------------------------
//Le code HTML du boutton à afficher dans la page
const btn_tous_supprimer_panier_html = `
<div class="btn-tous-supprimer-panier">
<button class="btn">Vider le panier</button>
</div>
`;

//Insertion du bouton dans le HTML du panier s'il n'est pas vide
if (panierVide() == false) {
  positionElement3.insertAdjacentHTML(
    "beforeend",
    btn_tous_supprimer_panier_html
  );
}

//La sélection de la référence du bouton "btn-tous-supprimer-panier"
const btn_tous_supprimer_panier = document.querySelector(
  ".btn-tous-supprimer-panier"
);

//Suppression de la key "produit" du local Storage pour vider entierement le panier
//Le addEventListener
btn_tous_supprimer_panier.addEventListener("click", (e) => {
  
  //.removeItem pour vider le local storage
  localStorage.removeItem("produit");

  //Pop up alert "Le panier a été vidé"
  alert("Le panier a été vidé");

  //Rechargement de la page panier.html
  window.location.href = "panier.html";
});

//FIN - Le bouton pour vider entièrement le panier-------------------------------------------


//LE MONTANT TOTAL DU PANIER-----------------------------------------------------------------
//Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
let priceTotlaCalcul = [];

//Aller chercher les prix dans le panier
if (produitEnregistreDansLocalStorage == null) {
  //pour supprimer l'erreur .length lorsque le panier est vide
} else {
  for (let m = 0; m < produitEnregistreDansLocalStorage.length; m++) {
    let priceProduitsDansLePanier = produitEnregistreDansLocalStorage[m].price;

    //Mettre les prix du panier dans la variable "priceTotlaCalcul"
    priceTotlaCalcul.push(priceProduitsDansLePanier);
  }
}

//Additionner les prix qu'il y a dans le tableau de la variable "priceTotalCalcul" avec la méthode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const priceTotal = priceTotlaCalcul.reduce(reducer, 0);

//Le code HTML du price total à afficher
const affichagepriceHtml = `
<div class="affichage-prix-html">Le prix total est de : <span class="gras"> ${priceTotal} € </span></div>
`;

//Injection du code html dans la page panier après le dernier enfant
positionElement3.insertAdjacentHTML("beforeend", affichagepriceHtml);

//FIN - Le montant total du panier------------------------------------------------------------


//LE FORMULAIRE DE COMMANDE-------------------------------------------------------------------
//La fonction afficherFormulaireHtml(){}
const afficherFormulaireHtml = () => {
  //Sélection élément du DOM pour le positionnement du formulaire
  const positionElement4 = document.querySelector("#container-produits-panier");

  //La strucuture du code HTML du formulaire de commande
  const structureFormulaire = `
  
        <div id="formulaireCommande">
          <h2>Remplissez le formulaire pour valider la commande</h2>

          <form>
            <label for="prenom">Prénom :</label><span id="prenomManquant" class="infoChampManquant"></span>
            <input type="text" id="prenom" name="prenom" required />

            <label for="nom"> Nom : </label><span id="nomManquant" class="infoChampManquant"></span>
            <input type="text" id="nom" name="nom" required />

            <label for="adresse"> Adresse : </label><span id="adresseManquant" class="infoChampManquant"></span>
            <textarea id="adresse" name="adresse" required> </textarea>

            <label for="ville"> Ville : </label><span id="villeManquant" class="infoChampManquant"></span>
            <input type="text" id="ville" name="ville" required />

            <label for="codePostal"> Code Postal : </label><span id="codePostalManquant" class="infoChampManquant"></span>
            <input type="text" id="codePostal" name="codePostal" required />

            <label for="email"> E-mail : </label><span id="emailManquant" class="infoChampManquant"></span>
            <input type="text" id="email" name="email" required />

            <button
              id="envoyerFormulaire"
              type="submit"
              name="envoyerFormulaire"
            >
              Confirmation de la commande
            </button>
          </form>
        </div>
  `;

  //Injection du code dans la page HTML
  positionElement4.insertAdjacentHTML("beforeend", structureFormulaire);
};

//Affichage du formulaire si le panier contient au moins un article
if (
  produitEnregistreDansLocalStorage === null ||
  produitEnregistreDansLocalStorage == 0
) {
  //ne pas afficher le formulaire
} else {
  afficherFormulaireHtml();
}

//Sélection du bouton envoyer le formulaire
const btnEnvoyerFormulaire = document.querySelector("#envoyerFormulaire");
//FIN Formulaire de commande--------------------------------------------------------------------------------


//GESTION VALIDATION DU FORMULAIRE--------------------------------------------------------------------------
//ADDEVENTLISTENER : ecoute du click du bouton envoyer le formulaire (Confirmation de la commande)
btnEnvoyerFormulaire.addEventListener("click", (e) => {
  e.preventDefault();

  //Création / définition d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire
  class Formulaire {
    constructor(input) {
      this.prenom = document.querySelector("#prenom").value;
      this.nom = document.querySelector("#nom").value;
      this.adresse = document.querySelector("#adresse").value;
      this.ville = document.querySelector("#ville").value;
      this.codePostal = document.querySelector("#codePostal").value;
      this.email = document.querySelector("#email").value;
    }
  }

  //Appel de l'instance de classe Formulaire pour créer l'objet formulaireValues
  const formulaireValues = new Formulaire();

  console.log("formulaireValues");
  console.log(formulaireValues);

  //GESTION VALIDATION DU FORMULAIRE : les REGEX
  const textAlert = (value) => {
    return `${value}: Chiffre et symbole ne sont pas autorisé \n Ne pas dépasser 20 caractères, minimum 3 caractères`;
  };

  const regExPrenomNomVille = (value) => {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
  };

  const regExCodePostal = (value) => {
    return /^[0-9]{5}$/.test(value);
  };

  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  const regExAdresse = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  };

  //Fonction pour gérer l'affichage du texte à coté de l'input pour indiquer qu'il faut le remplir correctement
  function dataChampManquantTextVide(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).textContent = "";
  };

  function dataChampManquantText(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).textContent =
      "Veuillez bien remplir ce champ";
  };
  
  //Fonction prenomControle()
  function prenomControle() {
    //Contrôle de la validité du prenom
    const lePrenom = formulaireValues.prenom;
    if (regExPrenomNomVille(lePrenom)) {
      dataChampManquantTextVide("prenomManquant");
      return true;
    } else {
      dataChampManquantText("prenomManquant");
      alert(textAlert("Prénom"));
      return false;
    };
  };

  //Fonction nomControle()
  function nomControle() {
    //Contrôle de la validité du nom
    const leNom = formulaireValues.nom;
    if (regExPrenomNomVille(leNom)) {
      dataChampManquantTextVide("nomManquant");
      return true;
    } else {
      dataChampManquantText("nomManquant");
      alert(textAlert("Nom"));
      return false;
    };
  };

  //Fonction villeControle()
  function villeControle() {
    //Contrôle de la validité de la ville
    const laville = formulaireValues.ville;
    if (regExPrenomNomVille(laville)) {
      dataChampManquantTextVide("villeManquant");
      return true;
    } else {
      dataChampManquantText("villeManquant");
      alert(textAlert("ville"));
      return false;
    };
  };

  //Fonction codePostalControle()
  function codePostalControle() {
    //Contrôle de la validité du code postal
    const lecodePostal = formulaireValues.codePostal;
    if (regExCodePostal(lecodePostal)) {
      dataChampManquantTextVide("codePostalManquant");
      return true;
    } else {
      dataChampManquantText("codePostalManquant");
      alert("Code Postal : doit être composé de 5 chiffres");
      return false;
    };
  };

  //Fonction emailControle()
  function emailControle() {
    //Contrôle de la validité de l'email
    const leEmail = formulaireValues.email;
    if (regExEmail(leEmail)) {
      dataChampManquantTextVide("emailManquant");
      return true;
    } else {
      dataChampManquantText("emailManquant");
      alert("L'email n'est pas valide");
      return false;
    };
  };

  //Fonction adresseControle()
  function adresseControle() {
    const leAdresse = formulaireValues.adresse;
    if (regExAdresse(leAdresse)) {
      dataChampManquantTextVide("adresseManquant");
      return true;
    } else {
      dataChampManquantText("adresseManquant");
      alert(
        "L'adresse doit contenir que des lettres sans ponctuation et des chiffres"
      );
      return false;
    };
  };

  //Contrôle de la validité du formulaire avant envoie dans le local storage
  if (
    prenomControle() &&
    nomControle() &&
    codePostalControle() &&
    emailControle() &&
    adresseControle() &&
    villeControle()
  ) {
    //Mettre l'objet "formulaireValues" dans le local storage
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
    localStorage.setItem("priceTotal", JSON.stringify(priceTotal));

    //Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
    const aEnvoyer = {
      produitEnregistreDansLocalStorage,
      formulaireValues,
      priceTotal,
    };

    envoieVersServeur(aEnvoyer);
  } else {
    alert("Veuillez bien remplir le formulaire");
  };

  //FIN - GESTION VALIDATION DU FORMULAIRE-------------------------------------------
}); //Fin addEventListener


//FONCTION envoieVersServeur()------------------------------------------------------
function envoieVersServeur(aEnvoyer) {
  //Envoie de l'objet "aEnvoyer" vers le serveur
  const promise01 = fetch("https://restapi.fr/api/commandeTest1", {
    method: "POST",
    body: JSON.stringify(aEnvoyer),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //Pour voir le résultat du serveur dans la console
  promise01.then(async (response) => {
    //Si la promesse n'est pas résolu, si elle est rejeté - gestions des erreurs
    try {
      const contenu = await response.json();
      console.log("contenu de response");
      console.log(contenu);

      if (response.ok) {
        console.log(`Resultat de response.ok : ${response.ok}`);

        //Récupération de l'id de la response du serveur
        console.log("id de response");
        console.log(contenu._id);

        //Mettre l'id dans le local storage
        localStorage.setItem("responseId", contenu._id);

        //Aller vers la page confirmation-commande
        window.location = "confirmation-commande.html";
      } else {
        console.log(`Réponse du serveur : ${response.status}`);
        alert(`Problème avec le serveur : erreur ${response.status}`);
      }
    } catch (e) {
      console.log("ERREUR qui vient du catch()");
      console.log(e);
      alert(`ERREUR qui vient du catch() ${e}`);
    }
  });
}//FIN FONCTION envoieVersServeur()-----------------------------------------------------------


//METTRE LE CONTENU DU LOCALSTORAGE DANS LES CHAMPS DU FORMULAIRE-----------------------------
//Prendre la key dans le localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem("formulaireValues");

//Convertir la chaîne de caractère en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//Fonction pour que le champ du formulaire soit rempli par les données du  local storage si elle existe
function remplirChampInputDepuisLocalStorage(input) {
  if (dataLocalStorageObjet == null) {
    console.log("le local storage à pour valeur null");
  } else {
    document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
  }
}

//Appel des fonctions pour remplir automatiquement les champs du formulaire suivant les données du localStorage

remplirChampInputDepuisLocalStorage("prenom");
remplirChampInputDepuisLocalStorage("nom");
remplirChampInputDepuisLocalStorage("adresse");
remplirChampInputDepuisLocalStorage("ville");
remplirChampInputDepuisLocalStorage("codePostal");
remplirChampInputDepuisLocalStorage("email");

console.log("dataLocalStorageObjet");
console.log(dataLocalStorageObjet);
};