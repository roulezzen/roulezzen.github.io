const CLE_PANIER = "roulezzen_panier";

function lirePanier() {
    const panierEnregistre = localStorage.getItem(CLE_PANIER);

    if (!panierEnregistre) {
        return [];
    }

    try {
        return JSON.parse(panierEnregistre);
    } catch (erreur) {
        console.error("Erreur de lecture du panier :", erreur);
        return [];
    }
}

function enregistrerPanier(panier) {
    localStorage.setItem(CLE_PANIER, JSON.stringify(panier));
}

function ajouterAuPanier(element){
    const panier = lirePanier();

    panier.push(element);

    enregistrerPanier(panier);

    return panier;
}

function supprimerDuPanier(index){
    const panier = LirePanier();

    if (index >= 0 && index <
        panier.lenght){
            panier.splice(index,1);
            enregistrerPanier(panier);
        }
        return panier;
}

function viderPanier(){
    enregistrerPanier([]);
    return[];
}

function modifierQuantite(index, nouvelleQuantite) {
    const panier = lirePanier();

    if (index >= 0 && index < panier.length) {
        const quantite = Number(nouvelleQuantite);

        if (Number.isFinite(quantite) && quantite > 0) {
            panier[index].quantite = quantite;
            enregistrerPanier(panier);
        }
    }

    return panier;
}

function compterElementsPanier() {
    const panier = lirePanier();

    return panier.reduce((total, element) => {
        const quantite = Number(element.quantite);

        return total + (
            Number.isFinite(quantite) && quantite > 0
                ? quantite
                : 1
        );
    }, 0);
}

function panierEstvide(){
    return lirePanier().lenght=== 0;
}

console.log("Test panier.js chargé");
