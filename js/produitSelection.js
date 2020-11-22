//Récupération de la chaîne de requête dans l'url qui provient de index.html lorsque l'on clique sur un produit
const queryString_url_id = window.location.search;

//Méthode pour extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");
console.log("id du produit sélectionné");
console.log(id);

//AFFICHAGE DU PRODUIT (de l'objet) qui a été sélectionné par l'id
//Sélection des données dans la webAPI du produit sélectionné
const dataApi = fetch(`http://localhost:3000/api/cameras/${id}`);

dataApi.then(async (responseData) => {
  const response = await responseData.json();
  console.log("response-donnée du produit sélectionné");
  console.log(response);

  try {
    //Sélection de la classe ou je vais injecter le code html
    const positionElement2 = document.querySelector(".container-page-produit");

    //La structure html pour l'affichage du produit sélectionné
    const structureProduit2 = `
    <div class="mise-en-page-produit">  
                <div class="produit_photo">
              <img src="${response.imageUrl}">
            </div>
            <div class="produit">

              <ul>
                <li><span class="gras">Nom produit : </span> <span>${response.name}</span></li>
                <li><span class="gras">Description :</span> <span>${
                  response.description
                }</span></li>                
                <li><span class="gras">prix : </span> <span>${response.price / 100} €</span></li>
              </ul>

              <div class="option_produit_mise_en_page">

                <form class="page-produit-form">
                
                  <div class="label-option_produit">
                    <label for="option_produit"><span class="gras">Choisir l'option:</span></label>
                    <select name="option_produit" id="option_produit"></select>
                  </div>

                  <div class="label-quantite_produit">
                    <label for="quantite_produit"><span class="gras">Choisir la quantité:</span></label>
                    <select name="quantite_produit" id="quantite_produit"></select>
                  </div>

                </form>
              
                
                <button id="btn-envoyer" type="submit" name="btn-envoyer">Ajouter l'article au panier</button>
                </div>
            </div>
          </div>
          `;
    //Le formulaire (form où s'affiche les options) s'adpate au nombre de "lenses" qu'il y dans l'objet du produit
    const optionQuantite = response.lenses;
    let structureOptions = [];

    //La boucle for qui va permettre d'afficher toutes les options du produit
    for (let j = 0; j < optionQuantite.length; j++) {
      structureOptions =
        structureOptions +
        `
      <option value="${optionQuantite[j]}">${optionQuantite[j]}</option>                     
      `;
    }

    //Injection du code html dans la page web produit
    positionElement2.innerHTML = structureProduit2;

    //Injection du code html dans la page produit pour le choix des options dans le formulaire
    const positionElement3 = document.querySelector("#option_produit");
    positionElement3.innerHTML = structureOptions;

    //QUANTITE : choisir la quantité de produit, limitation à 4 quantités car les objet ont un prix élevé-structure HTML
    const structureQuantité = `
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    `;

    //QUANTITE : Afficher les quantités de structureQuantité dans le formulaire
    //Sélection de l'élément
    const positionElementQuantite = document.querySelector("#quantite_produit");

    //Injection du code html
    positionElementQuantite.innerHTML = structureQuantité;


    // LA GESTION DU PANIER
    // La récupération des données séléctionné par l'utilisateur et envoie du panier

    //Sélection de l'id du formulaire
    const idForm = document.querySelector("#option_produit");

    //Sélection du bouton Ajouter l'article au panier
    const envoyerPanier = document.querySelector("#btn-envoyer");

    //LE ADDEVENTLISTENER
    //addEventListener - Ecouter le click du bouton et envoyer le panier-
    envoyerPanier.addEventListener("click", (event) => {
      event.preventDefault();

      //Mettre le choix de l'utilisateur dans une variable
      const choixFormulaire = idForm.value;
      console.log(choixFormulaire);

      //QUANTITE : Mettre la quantité dans une variable
      const choixQuantite = positionElementQuantite.value;

      //Récupération des valeurs du formulaire
      let optionsProduit = {
        name: response.name,
        id_ProduitSelectionner: response._id,
        option_produit: choixFormulaire,
        quantite: choixQuantite,
        price: (response.price * choixQuantite) / 100,
      };

      console.log(optionsProduit);


      //LE LOCAL STORAGE
      //Stocker la récupération des valeurs du formulaire (choix client) dans le local storage

      //Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
      let produitEnregistreDansLocalStorage = JSON.parse(
        localStorage.getItem("produit")
      );
      //JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
      console.log(produitEnregistreDansLocalStorage);

      //Fonction fenêtre pop up
      const popupConfirmation = () => {
        if (
          window.confirm(`${response.name} option: ${choixFormulaire} a bien été ajouté au panier
          Consultez le panier OK ou revenir à l'accueil ANNULER`)
        ) {
          window.location.href = "panier.html";
        } else {
          window.location.href = "index.html";
        }
      };

      //Fonction ajouter un produit sélectionné dans le localStorage
      const ajoutProduitLocalStorage = () => {
        //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
        produitEnregistreDansLocalStorage.push(optionsProduit);

        //La transformation en format JSON et l'envoyer dans la key "produit" du localStorage
        localStorage.setItem(
          "produit",
          JSON.stringify(produitEnregistreDansLocalStorage)
        );
      };

      //S'il y a deja des produits d'enregistré dans le local storage
      if (produitEnregistreDansLocalStorage) {
        ajoutProduitLocalStorage();
        popupConfirmation();
      }
      //S'il n'y a pas de produit d'enregistré dans le local storage
      else {
        produitEnregistreDansLocalStorage = [];
        ajoutProduitLocalStorage();
        popupConfirmation();
      }
    }); //FIN du addEventListener

    
  } catch (e) {
    console.log(e);
  }
});
