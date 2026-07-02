function calculer() {

  let width = parseFloat(document.getElementById("width").value);
  let ratio = parseFloat(document.getElementById("ratio").value);
  let rim = parseFloat(document.getElementById("rim").value);

  let vehicule = document.querySelector('input[name="vehicule"]:checked').value;

  let indicator = 0;
  let volume = 100;

  if(vehicule == "loisir"){
    indicator = 0.003;
    volume = 100;
  }

  if(vehicule == "light"){
    indicator = 0.003;
    volume = 100;
  }

  if(vehicule == "util"){
    indicator = 0.0041;
    volume = 100;
  }

  if(vehicule == "heavy"){
    indicator = 0.0095;
    volume = 250;
  }

  if(vehicule == "moto"){
    indicator = 0.0038;
    volume = 100;
  }

if(vehicule == "agri"){
    indicator = 0.008;
    volume = 250;
}

if(vehicule == "tp"){
    indicator = 0.01;
    volume = 500;
}

if(vehicule == "forest"){
    indicator = 0.01;
    volume = 500;
}

  let result = (
    width *
    ((width * (ratio / 100) * 2) + (rim * 25.4))
    * (indicator / 100)
  );

  result = Math.round(result * 2) / 2;
  
  document.getElementById("result-pumps").innerText=result;
  document.getElementById("result-ml").innerText=volume;
}
const vehicleRadios = document.querySelectorAll('input[name="vehicule"]');

vehicleRadios.forEach(radio => {

    radio.addEventListener('change', function(){

        let image = document.getElementById("vehicle-image");
        let title = document.getElementById("vehicle-title");
        let subtitle = document.getElementById("vehicle-subtitle");

        if(this.value == "loisir"){
            image.src = "images/velo.png";
            title.innerText = "VÉHICULES DE LOISIRS";
            subtitle.innerText = "Mobilité douce";
        }

        if(this.value == "light"){
            image.src = "images/Berlines_suv.png";
            title.innerText = "VÉHICULES LÉGERS";
            subtitle.innerText = "Sur route";
        }

        if(this.value == "util"){
            image.src = "images/utilitaires.png";
            title.innerText = "UTILITAIRES";
            subtitle.innerText = "Fourgons et camionnettes";
        }

        if(this.value == "heavy"){
            image.src = "images/camion.png";
            title.innerText = "POIDS LOURDS";
            subtitle.innerText = "Camions et remorques";
        }

        if(this.value == "moto"){
            image.src = "images/moto_route.png";
            title.innerText = "MOTOS / QUADS / SSV";
            subtitle.innerText = "Hors route";
        }

        if(this.value == "agri"){
            image.src = "images/tracteur.png";
            title.innerText = "AGRICOLE";
            subtitle.innerText = "Tracteurs et remorques";
        }

        if(this.value == "tp"){
            image.src = "images/pelle_pneus.png";
            title.innerText = "TP / CHANTIER";
            subtitle.innerText = "Mini-pelles et chargeuses";
        }

        if(this.value == "forest"){
            image.src = "images/forestier.png";
            title.innerText = "FORESTIER";
            subtitle.innerText = "Engins forestiers";
        }

        if(this.value == "offroad"){
            image.src = "images/4x4.png";
            title.innerText = "4X4 / OFF-ROAD";
            subtitle.innerText = "Tout-terrain";
        }

    });

});
function reinitialiser(){
    document.getElementById("client").value="";
    document.getElementById("immatriculation").value="";

    document.getElementById("width").value="";
    document.getElementById("ratio").value="";
    document.getElementById("rim").value="";

    document.getElementById("result-pumps").innerText="0";
    document.getElementById("result-ml").innerText="100";


}
function genererPDF(){

    const { jsPDF } = window.jspdf;

    let doc = new jsPDF();

    //construction du PDF
  

    // Bandeau noir
doc.setFillColor(0, 0, 0);
doc.rect(0, 0, 210, 45, "F");

doc.addImage("logo.png","PNG",8,5,90,32);

// Titre à droite
doc.setTextColor(255,255,255);

doc.setFontSize(20);
doc.text("RAPPORT DE DOSAGE", 120, 15, {align:"left"});

doc.setFontSize(10);
doc.text("Sécurité • Performance • Sérénité", 120, 25, {align:"left"});

// Retour texte noir
doc.setTextColor(0,0,0);

    let nom = document.getElementById("client")?.value || "";
    let immat = document.getElementById("immatriculation")?.value || "";

    let vehicule = document.getElementById("vehicle-title").innerText;
    let largeur = document.getElementById("width").value;
    let ratio = document.getElementById("ratio").value;
    let diametre = document.getElementById("rim").value;
    let coups = document.getElementById("result-pumps").innerText;
    let volume = document.getElementById("result-ml").innerText;

    // Client
    doc.setFontSize(14);
    doc.text("Informations client", 20, 60);

    doc.setFontSize(11);
    doc.text("Nom : " + nom, 20, 95);
    doc.text("Immatriculation : " + immat, 20, 105);

    let date=new Date().toLocaleDateString("fr-FR");
    doc.text("Date: "+date,20,78);

    doc.setDrawColor(220,220,220);
    doc.line(20,125,95,125);

    // Véhicule
    doc.setFontSize(14);
    doc.text("Informations véhicule", 20, 145);

    doc.setFontSize(11);
    doc.text("Type : " + vehicule, 20, 158);
    doc.text("Largeur : " + largeur, 20, 171);
    doc.text("Ratio : " + ratio, 20, 184);
    doc.text("Diamètre : " + diametre, 20, 197);

    // Encadré résultat
    doc.setDrawColor(0,150,0);
    doc.setLineWidth(1);
    doc.roundedRect(105, 85, 80, 95, 5, 5);

    doc.setTextColor(0,150,0);

    doc.setFontSize(16);
    doc.text("RESULTAT", 145, 95, {align:"center"});

    doc.setFontSize(40);
    doc.text(coups, 145, 125, {align:"center"});

    doc.setFontSize(12);
    doc.text("COUPS DE POMPE", 145, 140, {align:"center"});

    doc.line(120,150,170,150);

    doc.setFontSize(24);
    doc.text(volume + " ml", 145, 170, {align:"center"});

    // Pied de page
    doc.setTextColor(100,100,100);
    doc.setFontSize(8);

        doc.text(
        "Document généré le " + date + " par RoulezZen",
        105,
        285,
        {align:"center"}
    );
    
    return doc;
}
    function telechargerPDF(){
        
    let doc=genererPDF();
    doc.save("dosage-wheelsecure-roulezzen.pdf");
    
}

function imprimer(){
    
    let doc=genererPDF();
   
    let pdfBlob=doc.output("blob");
    let pdfUrl=URL.createObjectURL(pdfBlob);

    let win=window.open(pdfUrl);

    win.onload=function(){
        win.print();
    }
}