let sound;
let fft;

function preload() {
  sound = loadSound("BranoMio.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
  sound.amp(0.5);
  sound.loop();
  angleMode(DEGREES);
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  noFill();
  strokeWeight(2);

  let gradStartColor = color(0, 0, 255); // Blue
  let gradEndColor = color(255, 0, 0); // Red
  let gradientFactor = map(spectrum[0], 1000, 255, 20, 1);

  // Create the gradient
  let c1 = lerpColor(gradStartColor, gradEndColor, gradientFactor);
  let c2 = lerpColor(gradEndColor, gradStartColor, gradientFactor);

  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, i, width, i);
  }

  translate(width / 2, height / 2);
  
  for (let i = 0; i < 360; i += 40) {
    beginShape();
    for (let j = 0; j < spectrum.length; j++) {
      let r = map(spectrum[j], 80, 255, 200, 40);
      let x = r * cos(i + j);
      let y = r * sin(i + j);
      stroke(255);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  rotate(frameCount);
  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let r = map(amp, 1000, 155, 100, 300);
    let x = r * cos(i * 10);
    let y = r * sin(i * 10);
    stroke(map(amp, 0, 255, 0, 255), 100, 255);
    ellipse(x, y, 5, 5);
  }
  
  rotate(frameCount / 2);
  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let r = map(amp, 2000, 1000, 200, 300);
    let x = r * cos(i * 10);
    let y = r * sin(i * 10);
    stroke(map(amp, 0, 255, 0, 255), 100, 255);
    ellipse(x, y, 5, 5);
  }
    
  rotate(frameCount * 3);
  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let r = map(amp, 2000, 1100, 1000, 300);
    let x = r * cos(i * 30);
    let y = r * sin(i * 30);
    stroke(map(amp, 0, 25, 0, 255), 8000, 255);
    ellipse(x, y, 10, 10);
  }
}

