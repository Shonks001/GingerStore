// Initialiser le panier vide ou charger les données du localStorage s'il y en a déjà
let panier = JSON.parse(localStorage.getItem('panier')) || [];

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(nomProduit, prixProduit) {
    // Chercher si le produit existe déjà dans le panier
    const produitExiste = panier.find(produit => produit.nom === nomProduit);

    if (produitExiste) {
        // Si le produit existe, on augmente la quantité
        produitExiste.quantite += 1;
    } else {
        // Sinon, on ajoute un nouveau produit avec une quantité initiale de 1
        const produit = {
            nom: nomProduit,
            prix: prixProduit,
            quantite: 1
        };
        panier.push(produit);
    }

    // Sauvegarder le panier dans le localStorage
    localStorage.setItem('panier', JSON.stringify(panier));

    // Confirmation de l'ajout
    alert(`${nomProduit} a été ajouté au panier !`);

    mettreAJourCompteurPanier();

    const confirmationMessage = document.createElement('span');
    confirmationMessage.classList.add('confirmation-ajout', 'produit-ajoute');
    confirmationMessage.innerText = `${nomProduit} ajouté au panier !`;

    const header = document.querySelector('header'); // Par exemple, l'endroit où tu veux afficher le message
    header.appendChild(confirmationMessage);

    setTimeout(() => {
        confirmationMessage.classList.add('fade-out');
    }, 1000); // Attends 1 seconde avant de commencer le fondu

    // Supprimer le message après l'effet de fondu
    setTimeout(() => {
        header.removeChild(confirmationMessage);
    }, 2000); // 1 seconde de plus pour le temps de l'animation (1s + 1s de fondu)
}

// Fonction pour afficher le panier
function afficherPanier() {
    const panierDiv = document.getElementById('contenu-panier');
    panierDiv.innerHTML = ''; // Vider le contenu actuel avant de réafficher

    let total = 0;  // Initialiser le total du panier

    // Parcourir chaque produit dans le panier et l'afficher
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
    const nombreArticles = panier.reduce((total, produit) => total + produit.quantite, 0); // Calcul du total d'articles
    document.querySelector('.nombre-articles-panier').innerText = nombreArticles;
}

function redirigerVersFormulaire() {
    window.location.href = 'formulaire.html';  // Redirige vers la page de validation
}