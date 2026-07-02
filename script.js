const particulier = document.getElementById("particulier");
const professionnel = document.getElementById("professionnel");
const blocSociete = document.getElementById("bloc-societe");

blocSociete.style.display = "none";

professionnel.addEventListener("change", () => {
    blocSociete.style.display = "block";
});

particulier.addEventListener("change", () => {
    blocSociete.style.display = "none";
});

const boutonAjout = document.querySelector(".btn-ajout");

let compteur = 0;

boutonAjout.addEventListener("click", () => {
    if(compteur>=5){
        alert("Maximum 5 véhicules par demande.");
        return;
    }

    compteur++;

    const vehicules = document.getElementById("vehicules");

    const nouveauVehicule = document.createElement("div");

    nouveauVehicule.className = "bloc";

    nouveauVehicule.innerHTML = `
<h2>Véhicule n°${compteur}</h2>

<div class="grid-2">

<select name="type_vehicule${compteur}">
    <option>Type de véhicule</option>
    <option>Loisir</option>
    <option>Voiture</option>
    <option>Utilitaire</option>
    <option>Poids lourd</option>
    <option>Agricole</option>
    <option>Travaux publics</option>
    <option>Moto / Quad</option>
    <option>Forestier</option>
</select>

<input type="text"
name="marque_modele${compteur}" placeholder="Marque / Modèle">

</div>

<input type="text"
name="dimension_pneus${compteur}" placeholder="Dimension pneus (ex : 255/80 R19)">

<label class="titre-valve">Valves électroniques ?</label>

<div class="radio">

<label>
<input type="radio" name="valve${compteur}" value="oui">
Oui
</label>

<label>
<input type="radio" name="valve${compteur}" value="non">
Non
</label>

</div>

<div class="message-tpms" style="display:none;color:red;font-weight:bold;">
⚠️ Les valves électroniques TPMS nécessitent une vérification préalable de comptatibilité. Contactez-nous avant toute commande.
</div>
`;


    vehicules.appendChild(nouveauVehicule);
const radioOui = nouveauVehicule.querySelector('input[value="oui"]');
const radioNon = nouveauVehicule.querySelector('input[value="non"]');

radioOui.addEventListener("change", () => {

    const message = nouveauVehicule.querySelector(".message-tpms");

    message.style.display = "block";

   
});

radioNon.addEventListener("change", () => {

    const message = nouveauVehicule.querySelector(".message-tpms");

    message.style.display = "none";

});
});
document.querySelector(".btn-ajout").click();
