/* =========================================================
   ROULEZZEN — CALCULATEUR WHEELSECURE
   Version sécurisée et consolidée
========================================================= */

const DOSAGES_VEHICULES = {
    loisir: { coefficient: 0.003, volumeParRoue: 100 },
    light: { coefficient: 0.003, volumeParRoue: 100 },
    moto: { coefficient: 0.0038, volumeParRoue: 100 },
    util: { coefficient: 0.0041, volumeParRoue: 100 },
    heavy: { coefficient: 0.0095, volumeParRoue: 250 },
    agri: { coefficient: 0.008, volumeParRoue: 250 },
    tp: { coefficient: 0.01, volumeParRoue: 500 },
    forest: { coefficient: 0.01, volumeParRoue: 500 },

    /* Le 4X4 utilise provisoirement le dosage des véhicules légers. */
    offroad: { coefficient: 0.003, volumeParRoue: 100 }
};

const AFFICHAGE_VEHICULES = {
    loisir: {
        image: "images/velo.png",
        titre: "VÉHICULES DE LOISIRS",
        sousTitre: "Mobilité douce"
    },
    light: {
        image: "images/Berlines_suv.png",
        titre: "VÉHICULES LÉGERS",
        sousTitre: "Sur route"
    },
    moto: {
        image: "images/moto_route.png",
        titre: "MOTOS / QUADS / SSV",
        sousTitre: "Sur route et hors route"
    },
    util: {
        image: "images/utilitaires.png",
        titre: "UTILITAIRES",
        sousTitre: "Fourgons et camionnettes"
    },
    heavy: {
        image: "images/camion.png",
        titre: "POIDS LOURDS",
        sousTitre: "Camions, bus et remorques"
    },
    offroad: {
        image: "images/4x4.png",
        titre: "4X4 / OFF-ROAD",
        sousTitre: "Tout-terrain et loisirs"
    },
    agri: {
        image: "images/tracteur.png",
        titre: "AGRICOLE",
        sousTitre: "Tracteurs et remorques"
    },
    tp: {
        image: "images/pelle_pneus.png",
        titre: "TP / CHANTIER",
        sousTitre: "Mini-pelles et chargeuses"
    },
    forest: {
        image: "images/forestier.png",
        titre: "FORESTIER",
        sousTitre: "Engins forestiers"
    }
};

function lireNombre(id) {
    const champ = document.getElementById(id);
    if (!champ) {
        return NaN;
    }

    return Number.parseFloat(champ.value.replace(",", "."));
}

function afficherAlerte(message, champId = null) {
    window.alert(message);

    if (champId) {
        document.getElementById(champId)?.focus();
    }
}

function obtenirVehiculeSelectionne() {
    return document.querySelector('input[name="vehicule"]:checked')?.value || null;
}

function validerDimensions() {
    const largeur = lireNombre("width");
    const ratio = lireNombre("ratio");
    const diametre = lireNombre("rim");

    if (!Number.isFinite(largeur) || largeur <= 0) {
        afficherAlerte("Renseignez une largeur de pneu valide.", "width");
        return null;
    }

    if (!Number.isFinite(ratio) || ratio <= 0) {
        afficherAlerte("Renseignez un ratio de pneu valide.", "ratio");
        return null;
    }

    if (!Number.isFinite(diametre) || diametre <= 0) {
        afficherAlerte("Renseignez un diamètre de jante valide.", "rim");
        return null;
    }

    return { largeur, ratio, diametre };
}

function calculer() {
    const vehicule = obtenirVehiculeSelectionne();
    const dimensions = validerDimensions();

    if (!vehicule || !DOSAGES_VEHICULES[vehicule]) {
        afficherAlerte("Sélectionnez un type de véhicule.");
        return;
    }

    if (!dimensions) {
        return;
    }

    const dosage = DOSAGES_VEHICULES[vehicule];
    const { largeur, ratio, diametre } = dimensions;

    let coupsDePompe =
        largeur *
        ((largeur * (ratio / 100) * 2) + (diametre * 25.4)) *
        (dosage.coefficient / 100);

    coupsDePompe = Math.round(coupsDePompe * 2) / 2;

    document.getElementById("result-pumps").textContent =
        coupsDePompe.toLocaleString("fr-FR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1
        });

    document.getElementById("result-ml").textContent =
        dosage.volumeParRoue.toLocaleString("fr-FR");
}

function mettreAJourVehicule(typeVehicule) {
    const configuration = AFFICHAGE_VEHICULES[typeVehicule];

    if (!configuration) {
        return;
    }

    const image = document.getElementById("vehicle-image");
    const titre = document.getElementById("vehicle-title");
    const sousTitre = document.getElementById("vehicle-subtitle");

    if (image) {
        image.src = configuration.image;
        image.alt = `Illustration ${configuration.titre.toLowerCase()}`;
    }

    if (titre) {
        titre.textContent = configuration.titre;
    }

    if (sousTitre) {
        sousTitre.textContent = configuration.sousTitre;
    }
}

function reinitialiser() {
    ["client", "immatriculation", "width", "ratio", "rim"].forEach((id) => {
        const champ = document.getElementById(id);
        if (champ) {
            champ.value = "";
        }
    });

    const vehiculeLeger = document.querySelector(
        'input[name="vehicule"][value="light"]'
    );

    if (vehiculeLeger) {
        vehiculeLeger.checked = true;
        mettreAJourVehicule("light");
    }

    const resultatPompes = document.getElementById("result-pumps");
    const resultatMl = document.getElementById("result-ml");

    if (resultatPompes) {
        resultatPompes.textContent = "0";
    }

    if (resultatMl) {
        resultatMl.textContent = "100";
    }

    document.getElementById("client")?.focus();
}

function chargerImageEnDataURL(source) {
    return new Promise((resolve) => {
        const image = new Image();

        image.onload = () => {
            try {
                const canvas = document.createElement("canvas");
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;

                const contexte = canvas.getContext("2d");
                contexte.drawImage(image, 0, 0);

                resolve(canvas.toDataURL("image/png"));
            } catch (erreur) {
                console.warn("Le logo n'a pas pu être ajouté au PDF.", erreur);
                resolve(null);
            }
        };

        image.onerror = () => resolve(null);
        image.src = source;
    });
}

function donneesCalculDisponibles() {
    const dimensions = validerDimensions();

    if (!dimensions) {
        return false;
    }

    const resultat = document.getElementById("result-pumps")?.textContent.trim();

    if (!resultat || resultat === "0") {
        afficherAlerte("Cliquez d'abord sur CALCULER avant d'imprimer ou de générer le PDF.");
        return false;
    }

    return true;
}

async function genererPDF() {
    if (!window.jspdf?.jsPDF) {
        afficherAlerte(
            "Le générateur PDF n'est pas disponible. Vérifiez votre connexion Internet puis réessayez."
        );
        return null;
    }

    if (!donneesCalculDisponibles()) {
        return null;
    }

    const { jsPDF } = window.jspdf;
    const documentPDF = new jsPDF();
    const logo = await chargerImageEnDataURL("logo.png");

    documentPDF.setFillColor(17, 17, 17);
    documentPDF.rect(0, 0, 210, 45, "F");

    if (logo) {
        documentPDF.addImage(logo, "PNG", 8, 6, 82, 30);
    }

    documentPDF.setTextColor(255, 255, 255);
    documentPDF.setFontSize(20);
    documentPDF.text("RAPPORT DE DOSAGE", 118, 17);

    documentPDF.setFontSize(10);
    documentPDF.text("Sécurité • Performance • Sérénité", 118, 27);

    const nom = document.getElementById("client")?.value.trim() || "Non renseigné";
    const immatriculation =
        document.getElementById("immatriculation")?.value.trim() || "Non renseignée";
    const vehicule =
        document.getElementById("vehicle-title")?.textContent.trim() || "Non renseigné";
    const largeur = document.getElementById("width")?.value || "-";
    const ratio = document.getElementById("ratio")?.value || "-";
    const diametre = document.getElementById("rim")?.value || "-";
    const coups = document.getElementById("result-pumps")?.textContent || "0";
    const volume = document.getElementById("result-ml")?.textContent || "0";
    const date = new Date().toLocaleDateString("fr-FR");

    documentPDF.setTextColor(17, 17, 17);
    documentPDF.setFontSize(14);
    documentPDF.text("Informations client", 20, 62);

    documentPDF.setFontSize(11);
    documentPDF.text(`Date : ${date}`, 20, 76);
    documentPDF.text(`Nom : ${nom}`, 20, 88);
    documentPDF.text(`Immatriculation : ${immatriculation}`, 20, 100);

    documentPDF.setDrawColor(220, 220, 220);
    documentPDF.line(20, 112, 92, 112);

    documentPDF.setFontSize(14);
    documentPDF.text("Informations véhicule", 20, 130);

    documentPDF.setFontSize(11);
    documentPDF.text(`Type : ${vehicule}`, 20, 144);
    documentPDF.text(`Largeur : ${largeur}`, 20, 157);
    documentPDF.text(`Ratio : ${ratio}`, 20, 170);
    documentPDF.text(`Diamètre : ${diametre}`, 20, 183);

    documentPDF.setDrawColor(122, 201, 67);
    documentPDF.setLineWidth(1);
    documentPDF.roundedRect(105, 72, 80, 108, 5, 5);

    documentPDF.setTextColor(45, 143, 70);
    documentPDF.setFontSize(16);
    documentPDF.text("RÉSULTAT", 145, 88, { align: "center" });

    documentPDF.setFontSize(40);
    documentPDF.text(coups, 145, 120, { align: "center" });

    documentPDF.setFontSize(11);
    documentPDF.text("COUPS DE POMPE", 145, 136, { align: "center" });

    documentPDF.line(120, 148, 170, 148);

    documentPDF.setFontSize(24);
    documentPDF.text(`${volume} ml`, 145, 167, { align: "center" });

    documentPDF.setTextColor(100, 100, 100);
    documentPDF.setFontSize(8);
    documentPDF.text(
        `Document généré le ${date} par RoulezZen`,
        105,
        285,
        { align: "center" }
    );

    return documentPDF;
}

async function telechargerPDF() {
    const documentPDF = await genererPDF();

    if (documentPDF) {
        documentPDF.save("dosage-wheelsecure-roulezzen.pdf");
    }
}

async function imprimer() {
    /* La fenêtre est ouverte immédiatement pour éviter son blocage sur mobile. */
    const fenetreImpression = window.open("", "_blank");

    if (!fenetreImpression) {
        afficherAlerte(
            "Votre navigateur bloque la fenêtre d'impression. Autorisez les fenêtres contextuelles puis réessayez."
        );
        return;
    }

    fenetreImpression.document.write(
        "<p style='font-family:Arial,sans-serif;padding:20px'>Préparation du document…</p>"
    );

    const documentPDF = await genererPDF();

    if (!documentPDF) {
        fenetreImpression.close();
        return;
    }

    if (typeof documentPDF.autoPrint === "function") {
        documentPDF.autoPrint();
    }

    fenetreImpression.location.href = documentPDF.output("bloburl");
}

/* Initialisation du changement de véhicule. */
document.querySelectorAll('input[name="vehicule"]').forEach((radio) => {
    radio.addEventListener("change", () => {
        mettreAJourVehicule(radio.value);
    });
});

const vehiculeInitial = obtenirVehiculeSelectionne();
if (vehiculeInitial) {
    mettreAJourVehicule(vehiculeInitial);
}
