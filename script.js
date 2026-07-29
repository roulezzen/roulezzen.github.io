/* =========================================================
   ROULEZZEN — FORMULAIRE DE DEVIS
   Version sécurisée et consolidée
========================================================= */

const particulier = document.getElementById("particulier");
const professionnel = document.getElementById("professionnel");
const blocSociete = document.getElementById("bloc-societe");
const boutonAjout = document.getElementById("ajouterVehicule");
const conteneurVehicules = document.getElementById("vehicules");

let compteurVehicules = 0;
const nombreMaximumVehicules = 5;

function afficherBlocSociete(doitEtreVisible) {
    if (!blocSociete) {
        return;
    }

    blocSociete.style.display = doitEtreVisible ? "block" : "none";
}

if (particulier && professionnel && blocSociete) {
    afficherBlocSociete(professionnel.checked);

    professionnel.addEventListener("change", () => {
        afficherBlocSociete(true);
    });

    particulier.addEventListener("change", () => {
        afficherBlocSociete(false);
    });
}

function creerBlocVehicule(numero) {
    const nouveauVehicule = document.createElement("div");
    nouveauVehicule.className = "bloc bloc-vehicule";

    nouveauVehicule.innerHTML = `
        <h2>Véhicule n°${numero}</h2>

        <div class="grid-2">
            <select name="type_vehicule${numero}" aria-label="Type du véhicule n°${numero}">
                <option value="">Type de véhicule</option>
                <option value="Loisir">Loisir</option>
                <option value="Voiture">Voiture</option>
                <option value="Utilitaire">Utilitaire</option>
                <option value="Poids lourd">Poids lourd</option>
                <option value="Agricole">Agricole</option>
                <option value="Travaux publics">Travaux publics</option>
                <option value="Moto / Quad">Moto / Quad</option>
                <option value="Forestier">Forestier</option>
            </select>

            <input
                type="text"
                name="marque_modele${numero}"
                placeholder="Marque / Modèle"
                aria-label="Marque et modèle du véhicule n°${numero}"
            >
        </div>

        <input
            type="text"
            name="dimension_pneus${numero}"
            placeholder="Dimension pneus (ex. : 255/80 R19)"
            aria-label="Dimensions des pneus du véhicule n°${numero}"
        >

        <span class="titre-valve">Valves électroniques ?</span>

        <div class="radio">
            <label>
                <input type="radio" name="valve${numero}" value="oui">
                Oui
            </label>

            <label>
                <input type="radio" name="valve${numero}" value="non">
                Non
            </label>
        </div>

        <div class="message-tpms" role="alert" style="display:none;color:red;font-weight:bold;">
            ⚠️ Les valves électroniques TPMS nécessitent une vérification préalable de compatibilité. Contactez-nous avant toute commande.
        </div>
    `;

    const radioOui = nouveauVehicule.querySelector('input[value="oui"]');
    const radioNon = nouveauVehicule.querySelector('input[value="non"]');
    const messageTpms = nouveauVehicule.querySelector(".message-tpms");

    radioOui?.addEventListener("change", () => {
        if (messageTpms) {
            messageTpms.style.display = "block";
        }
    });

    radioNon?.addEventListener("change", () => {
        if (messageTpms) {
            messageTpms.style.display = "none";
        }
    });

    return nouveauVehicule;
}

function ajouterVehicule() {
    if (!conteneurVehicules) {
        return;
    }

    if (compteurVehicules >= nombreMaximumVehicules) {
        window.alert("Maximum 5 véhicules par demande.");
        return;
    }

    compteurVehicules += 1;
    conteneurVehicules.appendChild(creerBlocVehicule(compteurVehicules));
}

if (boutonAjout && conteneurVehicules) {
    boutonAjout.addEventListener("click", ajouterVehicule);

    /* Un premier véhicule est affiché automatiquement à l'ouverture du devis. */
    ajouterVehicule();
}
