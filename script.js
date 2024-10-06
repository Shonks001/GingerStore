
let panier = JSON.parse(localStorage.getItem('panier')) || [];

function ajouterAuPanier(nomProduit, prixProduit) {

    const produitExiste = panier.find(produit => produit.nom === nomProduit);

    if (produitExiste) {

        produitExiste.quantite += 1;
    } else {

        const produit = {
            nom: nomProduit,
            prix: prixProduit,
            quantite: 1
        };
        panier.push(produit);
    }


    localStorage.setItem('panier', JSON.stringify(panier));


    alert(`${nomProduit} a été ajouté au panier !`);

    mettreAJourCompteurPanier();

    const confirmationMessage = document.createElement('span');
    confirmationMessage.classList.add('confirmation-ajout', 'produit-ajoute');
    confirmationMessage.innerText = `${nomProduit} ajouté au panier !`;

    const header = document.querySelector('header');
    header.appendChild(confirmationMessage);

    setTimeout(() => {
        confirmationMessage.classList.add('fade-out');
    }, 1000);

   
    setTimeout(() => {
        header.removeChild(confirmationMessage);
    }, 2000); 
}


function afficherPanier() {
    const panierDiv = document.getElementById('contenu-panier');
    panierDiv.innerHTML = ''; 

    let total = 0;  

    
    panier.forEach((produit, index) => {
        const produitDiv = document.createElement('div');
        produitDiv.classList.add('produit-panier');
        produitDiv.innerHTML = `
            ${produit.nom} - ${produit.prix.toFixed(2)} Ss 
            <input type="number" value="${produit.quantite}" min="1" data-index="${index}">
            <button onclick="supprimerProduit(${index})">Supprimer</button>
        `;

        panierDiv.appendChild(produitDiv);

        total += produit.prix * produit.quantite;
    });

    document.getElementById('total').innerText = `Total : ${total.toFixed(2)} Ss`;
}

function supprimerProduit(index) {
    panier.splice(index, 1);

    localStorage.setItem('panier', JSON.stringify(panier));

    afficherPanier();

    mettreAJourCompteurPanier();
}

document.addEventListener('change', function(e) {
    if (e.target && e.target.type === 'number') {
        const index = e.target.getAttribute('data-index');
        const nouvelleQuantite = parseInt(e.target.value, 10);

        if (nouvelleQuantite > 0) {
            panier[index].quantite = nouvelleQuantite;

            localStorage.setItem('panier', JSON.stringify(panier));

            afficherPanier();
        }
    }
});

window.onload = function() {
    if (window.location.pathname.includes('panier.html')) {
        afficherPanier();
    }
    mettreAJourCompteurPanier();
};
function mettreAJourCompteurPanier() {
    const nombreArticles = panier.reduce((total, produit) => total + produit.quantite, 0);
    document.querySelector('.nombre-articles-panier').innerText = nombreArticles;
}

function redirigerVersFormulaire() {
    window.location.href = 'formulaire.html';  // Redirige vers la page de validation
}
