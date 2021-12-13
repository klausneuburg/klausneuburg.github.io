const pixelsTag = document.querySelector('div.pixels');
const bodyTag = document.querySelector('body');
const progressTag = document.querySelector('div.progress');
const headerTag = document.querySelector('header');

const quoteWobble = document.getElementById('quote-wobble');
const quotePogo = document.querySelector('#pogoQuote');


let ToggleImg = true;

document.addEventListener('scroll', function () {
  const pixels = Math.floor(window.pageYOffset);
  //pixelsTag.innerHTML = pixels;

  const pageHeight = bodyTag.getBoundingClientRect().height;
  // gBCR erzeugt ein Objekt mit den Maßen der Seite
  // wirwollen den value des keys height

  const totalScrollableDistance = pageHeight - window.innerHeight;
  // windows ist auch ein Objekt mit den Werten des Fensters

  const percentage = pixels / totalScrollableDistance *100;

  progressTag.style.width = `${percentage}%`
  // Backticks weil: Variablen-Schreibweise
  console.log(percentage * 100);

  // Zitate

  if (percentage >= 6  && percentage <= 18) {
    quoteWobble.classList.remove('hide');
    quoteWobble.classList.add('show');
  }
  else {
    quoteWobble.classList.remove('show');
    quoteWobble.classList.add('hide');
  }

  //let pogoLeft = -65 + (((((((percentage *10 / 6 ) - 1) * 100)  + 65)/( 5 +65) * (1 - 0) + 0)*10) - 9) * 40;
  //let pogoLeft = -650 + ((((  ( (percentage * 1.667 ) - 1) + 65) / (70) ) * 10 ) - 9) * 40;
  //let pogoLeft = -650 + ( ( ( (  ( percentage * 1.667 ) - 1) + 65) / 7 ) - 9) * 40;
  let pogoLeft = -1000 + (  ( percentage * 1.667 )  + 55)  * 6;
  //console.log("percentage: " + percentage);
  //console.log(quotePogo);
  //console.log("percentage * 1,667 etc: " + (  ( percentage * 1.667 )  + 55)  * 6);
  //console.log("pogo: " + pogoLeft);
  // Start: 61.27 --> - 60
  // Ende: 77.60 --> 106
  quotePogo.style.left =  pogoLeft +"%";

});

// Toggle Dark Mode

const sunTag = document.getElementById("sun");
const moonTag = document.getElementById("moon");

sunTag.addEventListener("click", toggleDarkmode);
moonTag.addEventListener("click", toggleDarkmode);

function toggleDarkmode() {
  bodyTag.classList.toggle("dark-mode");
  progressTag.classList.toggle("dark-mode");
  headerTag.classList.toggle("dark-mode");

  if (ToggleImg == false) {
    sunTag.style.display = "block";
    moonTag.style.display = "none";
    ToggleImg = true;
  }
  else {
    sunTag.style.display = "none";
    moonTag.style.display = "block";
    ToggleImg = false;
  }
}

//////////////////////////////////////
// Threshold mit offsetTop
// sehen, wie weit wir gescrollt haben
// mit de tresholds vergleichen

const photos = document.querySelectorAll("figure");
const photoTag = document.querySelector("div.photo");

document.addEventListener('scroll', function () {
  const pixels = window.pageYOffset

  /*photos.forEach(photo => {
    if (photo.offsetTop - 100 <= pixels) {
      photoTag.innerHTML = photo.getAttribute("data-photo");
    }*/

  photos.forEach ( function (photo) {
    if (photo.offsetTop - 100 <= pixels) {
      photoTag.innerHTML = photo.getAttribute("data-photo");
    }

  })

})

/// 
// PARALAX 1:1

// PARALLAX
// Veränderung der Eizelteile abhängig vom Scrollen

// Als Parallaxe (von altgriechisch παράλλαξις parállaxis „Veränderung, Hin- und Herbewegen“)[1] 
// bezeichnet man die scheinbare Änderung der Position eines Objektes, 
// wenn der Beobachter seine eigene Position durch eigene Bewegungen verändert.
// https://de.wikipedia.org/wiki/Parallaxe

// Definiert wird die Parallaxe als Winkel zwischen den Geraden, 
// die von zwei verschiedenen Standorten auf denselben Punkt (ein Objekt) führen. 
// Dies ist auch der Winkel, unter dem der Abstand der beiden Standorte, 
// die „Basislinie“, erscheint, wenn sie vom beobachteten Objekt aus gesehen werden.

// UEBUNG

// Hält man z. B. den Daumen aufwärts und betrachtet ihn abwechselnd 
// mit dem linken und dem rechten Auge, so verschiebt sich sein Bild 
// vor dem weiter entfernten Hintergrund. Die Basislinie ist hier der Augenabstand, 
// die Methode heißt Daumensprung. 

// Bewbungsparallaxe 

// Das Lichtmuster naher Objekte bewegt sich hierbei schneller über die Netzhaut 
// als das weiter entfernt liegender Objekte. Dieser Effekt tritt beispielsweise auf, 
// wenn man aus dem Seitenfenster eines fahrenden Autos oder Zuges schaut.
// Das Resultat ist, dass diejenigen Objekte, die nahe beim Betrachter sind, 
// sich schneller bewegen als die weit vom Betrachter entfernten.

// deshalb genauer: abhängig vom Mittelpunkt des Bereiches auf den man schaut, 
// hier den Sections

// hatten wir noch nicht: 

const sections = document.querySelectorAll('section');

// Wo ist der Ankerpunkt für jedes der Elemente?
// --> Mitte der Sction und der Abstand dazu 
// je weiter weg von der Mitte, je mehr Bewegung brauchen wir

// Wir wollen verschiedene Elemente bewegen
// abhängig von dem Abstand zum Ankerpunkt
// Ankerpunkt ist die Mitte der Section 
// Verhältnis: Distanz scolled zum Mittelpunkt

document.addEventListener("scroll", function () {
  
  // wie weit ist es von oben bis zur Hälfte des Viewports?
  // Erstmal die Entfernung von oben: 
  const topViewport = window.pageYOffset;
  // dann: die Entfernungh von oben plus die Hälfte der Fensterhöhe
  const midViewport = topViewport + (window.innerHeight / 2);
  // Können wir mal ausdrucken: 
 
  //console.log("midViewport: " + midViewport);
  // ggf. zum Vergleich: 
   //console.log("Höhe " + window.innerHeight);

  // Jetzt find teh midpoint of each section
  // deswegen loopen wir über jede Section 
  // (brauchen den querySelectorAll oben)
  sections.forEach(section => {
    // wie weit vonn oben ist die eizelne Section?
    // offsetTop auf jede Section:
    const topSection = section.offsetTop;
    // jetzt den Mittelpunkt der Einzelnen Section
    // document.querySelector(".s2").offsetHeight --> in der Konsole
    const midSection = topSection + (section.offsetHeight / 2);
    // nicht innerHeight sonder offsetHeight
    // jetzt ausdrucken:
    //console.log(section.className + "/" + midSection);
    // jetzt herausfinden: wie weit die Entfernung 
    // zwischen midSection und midViewport
    // -> wenn keine große Distanz: keine große Änderung
    // wenn große Distanz, viel Änderung
    // so funktioniert Parallax
    // das letzte ist dann die Entfernung
    const distanceToSection = midViewport - midSection;
    //console.log(section.className + " Abstand: " + distanceToSection);

    //////////////////////////////

    //erstmal nur ein Tag: 
    //const tag = section.querySelector("#test");
    //console.log(tag);
    //tag.style.transform = "translate(0,0);";
    //tag.style.transform = `translate(0, $(distanceToSection)px)`;
    //tag.style.backgroundColor = #333333;
    //tag.style.transform = `translate(20px, $(distanceToSection)px)`;
    //tag.style.backgroundColor = "yellow";
    //tag.style.transform = "translate(100px, 200px)";

    // geht:
    //tag.style.transform = "translate(0px, " + distanceToSection + "px)";
    //tag.style.width = "translate(0px, " + distanceToSection + "px)";
    // geteilt: 
    //tag.style.transform = "translate(0px, " + distanceToSection / 4 + "px)";
    // --> gewichtet um 1/4
    
    // Speed aus Data-Attributes:
    //const speed = tag.getAttribute("data-parallax");
    // sicherheitshalber (w/ Browsers) eine Dezimalzahl aus dem Text machen: 
    //const speed = parseFloat(tag.getAttribute("data-parallax"));
    
    //tag.style.transform = "translate(0px, " + distanceToSection * 0.25 + "px)";

    //-> jetzt brauchen wir noch unterschiedliche gewichtungen/geschwindigkeiten
    // pro element --> dafür wieder data-attributes (s.o.=)
    //tag.style.transform = "translate(0px, " + distanceToSection * speed + "px)";

    // parallaxTags.forEach(tag => {
    //   const speed = parseFloat(tag.getAttribute("data-parallax"));
    //   tag.style.transform = "translate(0px, " + distanceToSection * speed + "px)";
    // })

    // stattdessen für alle parallax-tags: 
    // alle tags mit dem Attribut data-parallax
    
    //!

    const parallaxTags = section.querySelectorAll(`[data-parallax]`);

    parallaxTags.forEach(function(tag){

      //const speed = parseFloat(tag.getAttribute("data-parallax"));
      //tag.style.transform = "translate(0px, " + distanceToSection * 0.5 + "px)";

      const speed = parseFloat(tag.getAttribute("data-parallax"));
      tag.style.transform = "translate(0px, " + distanceToSection * speed + "px)";
    })

  })
});

