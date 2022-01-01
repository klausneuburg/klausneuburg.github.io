const button = document.getElementById("button");
const img = document.getElementById("myImage");

let i = 0;
let toggleImg = false;

function randomIntFromInterval(min, max) {
    var randomValue = Math.floor(Math.random() * (max - min + 1) + min);
    return randomValue
}

button.addEventListener("mouseover", function () {
    if (i < 7) {
        button.style.left = randomIntFromInterval(20, 800) + 'px';
        button.style.top = randomIntFromInterval(20, 800) + 'px';
        i++
    }
    if (i === 7) {
        button.style.background = "rgb(26, 205, 71)";
    }
})


button.addEventListener("click", function () {

    if (toggleImg == false) {
        img.style.display = "block";
        toggleImg = true;

    }
    else {
        img.style.display = "none";
        toggleImg = false;
    }

})
