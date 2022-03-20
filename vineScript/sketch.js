const urlParams = new URLSearchParams(window.location.search);
const seed = urlParams.get("seed").split("-");

let vine_location = parseInt(seed[0]);
let vine_elevation = parseInt(seed[1]);
if (seed[2] == 1) vine_elevation *= -1;
let vine_soil = parseInt(seed[3]);
let vine_xp = parseInt(seed[4]);

const day = 86400;
let numStars;
let numVines = 20;

let sky = [];
let vines = [];
let cloudX = -200;
let cloudsOn = false;
let cnv;
let trainX = -200;

function setup() {
  cnv = createCanvas(600, 600);
  noStroke();
  numStars = map(vine_xp, 0, 100000, 0, 500);

  if (isNight()) {
    for (let i = 0; i < numStars; i++) {
      sky[i] = new Star();
    }
  }
  for (let i = 0; i < numVines; i++) {
    vines[i] = new Vineyard(i);
  }

  cnv.mousePressed(function () {
    cloudsOn = !cloudsOn;
  });
}

function draw() {
  background(backgroundFromTime(), 73, 100);

  if (isNight()) {
    for (let i = 0; i < numStars; i++) {
      sky[i].shine();
    }
  }

  locationAction();

  manor();

  trellis();

  for (let i = 0; i < numVines; i++) {
    vines[i].display();
  }

  if (cloudsOn) {
    cloudX += 0.2;
    if (cloudX == 700) cloudX = -200;
  }
  doClouds();

  if (vine_location == 13) {
    trainX += 8;
    if (trainX == 3000) trainX = -200;
  }
}

function timeOfDay() {
  const seconds = Math.floor((Date.now() / 1000) % (24 * 60 * 60));
  const offsets = [2, 9, -7, -10, -2, 5, 9, 7, 6, -4, -4, 7, 8, -4, 2];
  return seconds + offsets[vine_location] * 60 * 60;
}

function isNight() {
  return timeOfDay() > 0.85 * day || timeOfDay() < 0.25 * day;
}

function backgroundFromTime() {
  const time = timeOfDay();
  const factor = time / (day / 2);
  let result;
  if (time <= day / 2) result = factor * 255;
  else result = -(factor - 1) * 255 + 255;
  return result;
}

function getClimate() {
  const climates = [0, 1, 2, 3, 4, 5, 6, 3, 7, 8, 1, 9, 10, 1, 2];
  return climates[vine_location];
}

function locationAction() {
  doTerrain();
}

function doGround(h) {
  if (vine_soil == 0) fill("#c4c4c4");
  if (vine_soil == 1) fill("#f3f4a0");
  if (vine_soil == 2) fill("#eeb75d");
  if (vine_soil == 3) fill("#0b6707");
  if (vine_soil == 4) fill("#00952f");
  if (vine_soil == 5) fill("#c5b973");

  rect(0, h, width, height);
}

function doTulips(x, y) {
  strokeWeight(8);
  for (let i = 0; i < 3; i++) {
    y += 12;
    stroke("#f7167d");
    line(x, y, x + 260, y);
    stroke("#16f7db");
    line(x, y + 4, x + 260, y + 4);
    stroke("#f7f016");
    line(x, y + 8, x + 260, y + 8);
  }
  noStroke();
}

function doRiver(x, y) {
  strokeWeight(40);
  stroke("#169bf7");
  bezier(x, y, x + 150, y + 100, x + 300, y, x + 600, y + 120);
  noStroke();
}

function doWaterfall(x, y, weight, length, xVary) {
  noFill();
  strokeWeight(weight);
  stroke("#169bf7");
  bezier(
    x,
    y,
    x + xVary,
    y + length / 2,
    x - xVary,
    y + length,
    x,
    y + length * 2
  );
  noStroke();
}

function doTusks() {
  let x = 500;
  let y = 400;
  stroke("white");
  noFill();
  strokeWeight(8);
  arc(x, y, 20, 40, 0, PI + HALF_PI);
  arc(x - 30, y, 20, 40, -(2 * PI + HALF_PI), PI);

  x = 50;
  y = 360;
  strokeWeight(3);
  arc(x, y, 5, 15, 0, PI + HALF_PI);
  arc(x - 10, y, 5, 15, -(2 * PI + HALF_PI), PI);
  noStroke();
}

function mHeight(h) {
  let elev_factor = map(vine_elevation, -6000, 30000, 0, 1);
  return elev_factor * (1 - h) + h;
}

function doTerrain() {
  if (vine_location == 0) {
    //Amsterdam
    doGround(425);

    fill("#416C6C");
    triangle(-200, 425, 0, 350, 400, 425);
    fill("#CCD8D9");
    triangle(200, 425, 450, 350, 800, 425);

    doTulips(300, 430);
  } else if (vine_location == 1) {
    //tokyo
    doGround(475);

    fill("#CCD8D9");
    triangle(-100, 375, 70, 240, 300, 375);
    triangle(200, 375, 425, 240, 900, 375);
    fill("#B8CBCD");
    triangle(-200, 475, 270, 280, 1000, 475);
    fill("#94AEB2");
    triangle(-400, 475, 50, 360, 420, 475);

    //building 1
    fill(224, 193, 215);
    rect(80, 335, 64, 140);
    rect(85, 330, 52, 10);
    //windows
    fill(194, 168, 187);
    rect(83, 340, 8, 130);
    rect(93, 340, 8, 130);
    rect(103, 340, 8, 130);
    rect(113, 340, 8, 130);
    rect(123, 340, 8, 130);
    rect(133, 340, 8, 130);

    //building 2
    fill(224, 193, 215);
    rect(205, 325, 40, 150);
    ellipse(225, 325, 20, 20);
    strokeWeight(1);
    stroke(224, 193, 215);
    line(225, 325, 225, 300);
    noStroke();

    //building 3
    fill(224, 193, 215);
    rect(300, 345, 60, 130);
    fill(194, 168, 187);
    rect(298, 355, 64, 10);
    rect(298, 375, 64, 10);
    rect(298, 395, 64, 10);
    rect(298, 415, 64, 10);
    rect(298, 435, 64, 10);
    rect(298, 455, 64, 10);

    //building 4
    fill(224, 193, 215);
    rect(425, 355, 65, 120);
    rect(435, 325, 45, 40);
    rect(456, 295, 5, 40);
  } else if (vine_location == 2) {
    // napa
    doGround(325);

    fill("#CCD8D9");
    triangle(200, 325, 450, 250, 800, 325);
  } else if (vine_location == 3) {
    //denali
    doGround(275);

    fill("#CCD8D9");
    triangle(-100, 275, 70, mHeight(275), 300, 275);
    triangle(200, 275, 425, mHeight(275), 900, 275);
    fill("#B8CBCD");
    triangle(-200, 375, 270, mHeight(375), 1000, 375);
    fill("#94AEB2");
    triangle(-200, 425, 20, mHeight(425), 300, 425);
    fill("#6E9091");
    triangle(100, 425, 320, mHeight(425), 600, 425);
    fill("#416C6C");
    triangle(-200, 425, 0, mHeight(425), 400, 425);
  } else if (vine_location == 4) {
    //madeira
    doGround(375);

    fill("#dad78d");
    triangle(-100, 375, 70, mHeight(225), 300, 375);
    triangle(200, 375, 425, mHeight(255), 900, 375);

    doWaterfall(25, 340, 3, -44, 24);
    doWaterfall(410, 265, 3, 20, 17);

    fill("#6a7325");
    triangle(-200, 420, 210, mHeight(320), 1000, 420);

    doWaterfall(75, 340, 3, 38, 24);
    doWaterfall(490, 340, 3, 38, -24);

    fill("#b3c480");
    triangle(250, 475, 590, mHeight(455), 900, 475);
  } else if (vine_location == 5) {
    //kashmere
    doGround(275);

    fill("#CCD8D9");
    triangle(-100, 275, 70, mHeight(275), 300, 275);
    triangle(200, 275, 425, mHeight(275), 900, 275);
    fill("#B8CBCD");
    triangle(-200, 375, 270, mHeight(375), 1000, 375);
    fill("#94AEB2");
    triangle(60, 275, 280, mHeight(275), 490, 275);
    fill("#6E9091");
    triangle(100, 425, 320, mHeight(425), 600, 425);
    fill("#416C6C");
    triangle(-200, 425, 0, mHeight(425), 400, 425);
  } else if (vine_location == 6) {
    //outback
    doGround(325);

    fill("#c44715");
    quad(150, 325, 180, mHeight(310), 420, mHeight(310), 450, 325);
  } else if (vine_location == 7) {
    //siberia
    doGround(325);

    fill("#d8f2f4");
    triangle(-100, 325, 150, mHeight(250), 700, 325);
    triangle(-200, 325, 50, mHeight(250), 200, 325);

    // tusks
    doTusks();
  } else if (vine_location == 8) {
    //mt everest
    doGround(325);

    fill("#a3b0c5");
    triangle(-200, 325, 40, 125, 400, 325);
    fill("#4e6384");
    triangle(-200, 325, 300, 25, 800, 325);
    fill("#fff");
    triangle(91, 150, 300, 25, 509, 150);
  } else if (vine_location == 9) {
    //amazon
    doGround(325);
    doRiver(0, 325);

    fill("#50e842");
    triangle(200, 325, 450, mHeight(250), 800, 325);
    fill("#2a9720");
    triangle(-200, 325, 40, mHeight(305), 400, 325);
  } else if (vine_location == 10) {
    //ohio
    doGround(325);

    fill("#95855e");
    triangle(200, 325, 450, mHeight(350), 800, 325);
  } else if (vine_location == 11) {
    //borneo
    doGround(325);

    fill("#7cf17d");
    triangle(200, 325, 450, mHeight(250), 800, 325);
    fill("#7cc67c");
    triangle(-100, 345, 80, mHeight(250), 345, 345);
    fill("#53c454");
    triangle(-200, 420, 210, mHeight(420), 1000, 420);
  } else if (vine_location == 12) {
    //fujian
    doGround(325);

    fill("#a3b0c5");
    triangle(-200, 325, 40, mHeight(310), 400, 325);
    fill("#657165");
    triangle(200, 325, 450, mHeight(250), 800, 325);
  } else if (vine_location == 13) {
    //long island
    doGround(325);

    //building 1
    fill("#8ca7d1");
    rect(80, 185, 64, 140);
    rect(85, 180, 52, 10);
    //windows
    fill("#ab8cd1");
    rect(83, 190, 8, 130);
    rect(93, 190, 8, 130);
    rect(103, 190, 8, 130);
    rect(113, 190, 8, 130);
    rect(123, 190, 8, 130);
    rect(133, 190, 8, 130);

    //building 2
    fill("#8ca7d1");
    rect(205, 175, 40, 150);
    ellipse(225, 175, 20, 20);
    strokeWeight(1);
    stroke("#8ca7d1");
    line(225, 175, 225, 150);
    noStroke();

    //building 3
    fill("#8ca7d1");
    rect(300, 195, 60, 130);
    fill("#ab8cd1");
    rect(298, 205, 64, 10);
    rect(298, 225, 64, 10);
    rect(298, 245, 64, 10);
    rect(298, 265, 64, 10);
    rect(298, 285, 64, 10);
    rect(298, 305, 64, 10);

    //building 4
    fill("#8ca7d1");
    rect(425, 205, 65, 120);
    rect(435, 175, 45, 40);
    rect(456, 145, 5, 40);

    //monorail
    fill("#6f85a7");
    rect(0, 350, 600, 10);
    rect(40, 350, 8, 30);
    rect(140, 350, 8, 30);
    rect(240, 350, 8, 30);
    rect(340, 350, 8, 30);
    rect(440, 350, 8, 30);
    rect(540, 350, 8, 30);

    //train
    fill("#d4e9ed");
    let trainXs = [0, 30, 60, 90, 120];
    rect(trainX + trainXs[0], 340, 20, 10);
    rect(trainX + trainXs[1], 340, 20, 10);
    rect(trainX + trainXs[2], 340, 20, 10);
    rect(trainX + trainXs[3], 340, 20, 10);
    rect(trainX + trainXs[4], 340, 20, 10);
  } else if (vine_location == 14) {
    //champagne
    doGround(325);

    fill("#896b9a");
    triangle(-80, 325, 150, mHeight(320), 500, 325);
    fill("#998e9f");
    triangle(200, 325, 450, mHeight(320), 800, 325);
  }
}

function doClouds() {
  fill(256, 125);
  let x1s = [
    cloudX + 74,
    cloudX + 135,
    cloudX + 40,
    cloudX + 17,
    cloudX,
    cloudX + 55,
    cloudX + 145,
    cloudX + 95,
  ];

  cloud(x1s[0], 231);
  cloud(x1s[1], 217);
  cloud(x1s[2], 240);
  cloud(x1s[3], 235);
  cloud(x1s[4], 214);
  cloud(x1s[5], 265);
  cloud(x1s[6], 258);
  cloud(x1s[7], 265);
}

function cloud(x, y) {
  fill(256, 125);
  ellipse(x, y, 64, 64);
  // quad(x, y, x+40, y+18, x, y+36, x-40, y+18)

  fill("rgba(193,254,255, 0.25)");
  ellipse(x, y, 48, 48);
  // y += 6
  // quad(x, y, x+30, y+12, x, y+24, x-30, y+12)

  // fill('rgba(255,255,255, 0.25)')
  // // ellipse(x, y, 32, 32)
  // y += 6
  // quad(x, y, x+20, y+6, x, y+12, x-20, y+6)
}

function manor() {
  fill("#e9edc5"); // white
  rect(95, 415, 80, 70);

  fill(0); // black
  rect(105, 425, 8, 15);
  rect(131, 425, 8, 15);
  rect(157, 425, 8, 15);
  rect(128.5, 470, 15, 15);

  fill("#e96161"); //red
  rect(95, 450, 80, 4);
  quad(85, 415, 100, 405, 170, 405, 185, 415);
}

function trellis() {
  fill("#594300");
  rect(102, 500, 365, 15);
  rect(102, 550, 365, 15);

  fill("#268415");
  rect(102, 503, 365, 9);
  rect(102, 553, 365, 9);

  fill("#594300");
  rect(102, 506, 365, 3);
  rect(102, 556, 365, 3);
}

class Star {
  constructor() {
    this.x = 255;
    this.y = 255;
    this.c = 255;
    this.a = -1;
    this.dir = 0.0;
    this.sz = 0.0;
  }

  shine() {
    if (this.a < 0) {
      this.x = random(width);
      this.y = random(0, 475);
      this.sz = random(3);
      this.dir = random(1, 3);
      this.a = 0;
    }
    fill(this.c, this.a);
    rect(this.x, this.y, this.sz, this.sz);
    this.a = this.a + this.dir;
    if (this.a > 255) {
      this.a = 255;
      this.dir = random(-5, -10);
    }
  }
}

class Vineyard {
  constructor(i) {
    if (i < numVines / 2) this.x = 100 + i * 40;
    else this.x = -300 + i * 40;
    if (i < numVines / 2) this.y = 500;
    else this.y = 550;
  }

  display() {
    fill("#594300");
    rect(this.x, this.y, 8, 32);

    fill("#268415");
    ellipse(this.x + 4, this.y + 7, 24, 24);

    fill("#c013ed");
    ellipse(this.x + 4, this.y + 7, 16, 16);

    fill("#268415");
    ellipse(this.x + 4, this.y + 7, 8, 8);
  }
}
