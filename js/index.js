//----------------Mettre les données sur la page index.html
//----------------PRODUIT ---------------------------------

const dataApi = fetch("http://localhost:3000/api/cameras");

dataApi.then(async (responseData) => {
  const response = await responseData.json();
  console.log("response-données du backend");
  console.log(response);

  try {
    //Déclaration de variable pour pouvoir y mettre les données de l'API
    let _id = [];
    let name = [];
    let description = [];
    let imageUrl = [];
    let price = [];
    let structureProduits = "";
    let i = [];

    //Fonction qui va afficher les produits dans la page web automatiquement

    function affichageProduits(response) {
      //Séléction élément du DOM
      const positionElement = document.querySelector(".container-produits");

      //La boucle pour afficher tous les objets dans la page web
      for (i = 0; i < response.length; i++) {
        //Mettre les données dans les variables
        response.forEach((element, i) => {
          _id[i] = element._id;
          name[i] = element.name;
          description[i] = element.description;
          imageUrl[i] = element.imageUrl;
          price[i] = element.price;
        });

        //Afficher tous les objets sur la page web
        structureProduits += `
        <a href="./produit.html?id=${_id[i]}">
          <div class="mise-en-page-produit">
            <div class="produit_photo">
              <img src="${imageUrl[i]}">
            </div>
            <div class="produit">
              <ul>
                <li>Nom produit : <span>${name[i]}</span></li>
                <li>Description : <span>${
                  description[i]
                }</span></li>              
                <li>price : <span>${price[i] / 100} €</span></li>
              </ul>
              <button>Commander l'article</button>
            </div>
          </div>
        </a>
        `;

        //Injection html
        positionElement.innerHTML = structureProduits;
      }
    }

    affichageProduits(response);
    window.onload = () => {
      affichageProduits(response);
    };
    
  } catch (e) {
    console.log(e);
  }
});
