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

  // Zitate

  if (percentage >= 6  && percentage <= 18) {
    quoteWobble.classList.remove('hide');
    quoteWobble.classList.add('show');
  }
  else {
    quoteWobble.classList.remove('show');
    quoteWobble.classList.add('hide');
  }


  let pogoLeft = -1000 + (  ( percentage * 1.667 )  + 55)  * 6;

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

const photos = document.querySelectorAll("figure");
const photoTag = document.querySelector("div.photo");

document.addEventListener('scroll', function () {
  const pixels = window.pageYOffset


  photos.forEach ( function (photo) {
    if (photo.offsetTop - 100 <= pixels) {
      photoTag.innerHTML = photo.getAttribute("data-photo");
    }

  })

});

const sections = document.querySelectorAll("section");

document.addEventListener("scroll", function () {

const topViewport = window.pageYOffset;
const midViewport = topViewport + (window.innerHeight / 2);

sections.forEach(section => {

  const topSection = section.offsetTop;
  const midSection = topSection + (section.offsetHeight / 2);
  const distanceToSection = midViewport - midSection;
  const parallaxTags = section.querySelectorAll(`[data-parallax]`);

  parallaxTags.forEach( function (tag) {

    const speed = tag.getAttribute("data-parallax");
    tag.style.transform = "translate (0px, " + distanceToSection * 0.2 + "px )";

  });

});

});
