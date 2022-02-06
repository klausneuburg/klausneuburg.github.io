function setup() {
  createCanvas(800, 800);
  background(100, 100, 250);
}

function draw() {
  fill(250, 100, 100);

  erase();
  ellipse(mouseX, mouseY, 100);

  noErase();

}

function mousePressed() {
  background(100, 100, 250);

}