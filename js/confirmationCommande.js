//Récupération de l'id de la commande (provenant du serveur) dans le local storage
const responseId = localStorage.getItem("responseId");
console.log(`responseId : ${responseId}`);


//Récupération du prix total de la commande
const priceTotal = localStorage.getItem("priceTotal");
console.log(`priceTotal : ${priceTotal}`);


//LA STRUCTURE HTML DE LA PAGE confirmationCommande.js
//Sélection élément du DOM pour le positionnement
const positionElement5 = document.querySelector("#container-recapitulatif-commande");

const structureConfirmationCommande = `
<h2>Récapitulatif de votre commande</h2>

<div class="recapCommande">
  <p>Merci pour votre commande</p>
  <p>
    Votre <span class="gras">commande numéro: ${responseId}</span> a bien été
    prise en compte
  </p>
  <p>
    Le montant de votre commande est de :
    <span class="gras">${priceTotal}</span> €
  </p>
  <p class="gras">Au plaisir de vous revoir</p>
</div>
`;

//Injection HTML
positionElement5.insertAdjacentHTML("afterbegin", structureConfirmationCommande);

//Effacer tout le local storage sauf le formulaire
function enleverCleLocalStorage(key){
    localStorage.removeItem(key);
};

enleverCleLocalStorage("priceTotal");
enleverCleLocalStorage("produit");
enleverCleLocalStorage("responseId");
