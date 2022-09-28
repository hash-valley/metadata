const urlParams = new URLSearchParams(window.location.search);
const seed = urlParams.get("seed").split("-");

const vine_location = parseInt(seed[0]);
let vine_elevation = parseInt(seed[1]);
if (seed[2] == 1) vine_elevation *= -1;
const vine_soil = parseInt(seed[3]);
const vine_xp = parseInt(seed[4]);

const day = 86400;
const climates = [0, 1, 2, 3, 4, 5, 6, 3, 7, 8, 1, 9, 4, 1, 2, 10, 11, 12];
const offsets = [2, 9, -7, -10, -2, 5, 9, 7, 6, -4, -4, 7, 8, -4, 2, -2, -5, 0];

let numStars;
let numVines = 20;
let sky = [];
let vines = [];
let cloudX = -200;
let cloudY = 550;
let cloudsOn = false;
let cnv;
let trainX = -200;

function setup() {
  cnv = createCanvas(600, 600);
  noStroke();
  numStars = map(vine_xp, 0, 100000, 0, 500);

  if (isNight() || vine_location == 16) {
    for (let i = 0; i < numStars; i++) {
      sky[i] = new Star();
    }
  }

  if (vine_location < 17) {
    for (let i = 0; i < numVines; i++) {
      vines[i] = new Vineyard(i);
    }
  } else {
    for (let i = 0; i < numVines * 2; i++) {
      vines[i] = new Vineyard(i);
    }
    numVines = 40;
  }

  if (vine_location == 16 || vine_location == 17) {
    cloudY = -200;
  }

  cnv.mousePressed(function () {
    cloudsOn = !cloudsOn;
  });
}

function draw() {
  if (vine_location <= 14) {
    background(backgroundFromTime(), 73, 100);

    if (isNight()) {
      for (let i = 0; i < numStars; i++) {
        sky[i].shine();
      }
    }
  } else if (vine_location == 15) {
    background(0, 45, backgroundFromTime());
  } else if (vine_location == 16) {
    background(0, 0, 0);
    for (let i = 0; i < numStars; i++) {
      sky[i].shine();
    }
  } else if (vine_location == 17) {
    background(255, 255, 255);
    for (let i = 0; i < numStars; i++) {
      sky[i].shine();
    }
  }

  if (vine_location == 15) {
    if (cloudsOn) {
      cloudY -= 1.2;
      if (cloudY < -300) cloudY = 510;
    }
    doBubbles();
  }
  if (vine_location == 16) {
    if (cloudsOn) {
      cloudY += 8;
      cloudX += 8;
      if (cloudY > 1500) {
        cloudY = -200;
        cloudX = -200;
      }
    }
    doComet();
  }
  if (vine_location == 17) {
    if (cloudsOn) {
      cloudY += 8;
      cloudX += 8;
      if (cloudY > 1500) {
        cloudY = -200;
        cloudX = -200;
      }
    }
    doComet();
  }

  locationAction();

  manor();

  trellis();

  for (let i = 0; i < numVines; i++) {
    vines[i].display();
  }

  if (vine_location <= 14) {
    if (cloudsOn) {
      cloudX += 0.2;
      if (cloudX > 700) cloudX = -200;
    }
    doClouds();
  }

  if (vine_location == 13) {
    trainX += 8;
    if (trainX == 3000) trainX = -200;
  }
}

function timeOfDay() {
  const seconds = Math.floor((Date.now() / 1000) % (24 * 60 * 60));
  return seconds + offsets[vine_location] * 60 * 60;
}

function isNight() {
  const time = timeOfDay();
  return time > 0.85 * day || time < 0.25 * day;
}

function backgroundFromTime() {
  const time = timeOfDay();
  const factor = time / (day / 2);
  let result;
  if (time <= day / 2) result = factor * 255;
  else result = -(factor - 1) * 255 + 255;
  return result;
}

function locationAction() {
  doTerrain();
}

function doGround(h) {
  if (vine_soil == 0) fill("#c4c4c4");
  else if (vine_soil == 1) fill("#f3f4a0");
  else if (vine_soil == 2) fill("#eeb75d");
  else if (vine_soil == 3) fill("#0b6707");
  else if (vine_soil == 4) fill("#00952f");
  else if (vine_soil == 5) fill("#c5b973");

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

function mHeight(h, big = false) {
  let elev_factor;
  if (big) {
    elev_factor = map(vine_elevation, 117406080, 8448000, 0, 1);
    return elev_factor * h + 12;
  } else {
    elev_factor = map(vine_elevation, -6000, 30000, 0, 1);
    return (1 - elev_factor) * h;
  }
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

    // hot air balloon
    balloon(120, 130, "rgb(238,81,81)");
    balloon(470, 155, "rgb(237,241,161)");
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

    // glaciers
    fill("rgb(209,248,241)");
    quad(60, 600, 30, 470, -10, 450, -10, 600);
    quad(540, 600, 570, 470, 610, 450, 610, 600);
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

    // trees
    tree(74, 315, 22, 16);
    tree(104, 319, 22, 16);
    tree(118, 326, 22, 16);
    tree(132, 316, 22, 16);
    tree(162, 324, 22, 14);
    tree(188, 316, 18, 24);
    tree(238, 316, 29, 16);
    tree(258, 322, 22, 26);
    tree(288, 316, 26, 16);
    tree(318, 316, 24, 18);
    tree(358, 316, 19, 16);
    tree(374, 336, 24, 24);

    tree(104, 319, 22, 16);
    tree(455, 335, 22, 14);
    tree(335, 325, 32, 16);
    tree(215, 315, 16, 18);
    tree(535, 325, 42, 15);
    tree(525, 315, 32, 21);
    tree(515, 345, 31, 22);
    tree(535, 325, 32, 16);
    tree(475, 342, 32, 12);
    tree(425, 335, 32, 16);
    tree(410, 315, 32, 19);
    tree(465, 315, 22, 16);
    tree(575, 315, 38, 16);
    tree(565, 345, 55, 23);
    tree(585, 365, 26, 25);
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

    // trees
    tree(14, 335, 22, 21);
    tree(34, 345, 22, 18);
    tree(54, 340, 22, 17);
    tree(84, 340, 22, 25);
    tree(112, 333, 22, 16);

    tree(455, 335, 22, 14);
    tree(335, 325, 32, 16);
    tree(535, 325, 42, 15);
    tree(525, 315, 32, 21);
    tree(515, 345, 31, 22);
    tree(535, 325, 32, 16);
    tree(475, 342, 26, 12);
    tree(425, 335, 23, 16);
    tree(410, 315, 32, 19);
    tree(465, 315, 22, 16);
    tree(575, 315, 38, 16);

    //mountain
    fill("#53c454");
    triangle(-200, 420, 210, mHeight(420), 1000, 420);
  } else if (vine_location == 12) {
    //fujian
    doGround(325);

    fill("#a3b0c5");
    triangle(-200, 325, 40, mHeight(310), 400, 325);
    fill("#657165");
    triangle(200, 325, 450, mHeight(250), 800, 325);

    // pagoda lol
    pagoda(490, 305);
    pagoda(50, 290);
    pagoda(270, 345);
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

    //windmill
    windmill(500, 360);
    windmill(200, 300);
  } else if (vine_location == 15) {
    //atlantis
    doGround(425);

    fill("#875e91");
    triangle(-240, 425, 150, mHeight(280), 500, 425);
    fill("#70abd0");
    triangle(200, 425, 450, mHeight(380), 900, 425);

    fill("#875e91");
    ellipse(41, 464, 22, 22);
    fill("#4b4153");
    ellipse(34, 514, 32, 32);
    fill("#a8d9cf");
    ellipse(15, 515, 32, 32);
    fill("#4b4153");
    ellipse(415, 478, 28, 28);
    fill("#e9ef15");
    ellipse(199, 456, 20, 20);
    fill("#e6859b");
    ellipse(214, 452, 20, 20);
    fill("#e9ef15");
    ellipse(539, 488, 34, 34);
    fill("#9267b7");
    ellipse(518, 492, 34, 34);
    fill("#54e7cb");
    ellipse(560, 504, 28, 28);
    fill("#e6859b");
    ellipse(472, 438, 16, 16);
    fill("#39d175");
    ellipse(372, 442, 17, 17);
    fill("#a8d9cf");
    ellipse(378, 448, 17, 17);
    fill("#9f344a");
    ellipse(283, 466, 19, 19);
  } else if (vine_location == 16) {
    //secret
    doGround(460);
    fill("#6AC8EF");
    ellipse(440, 150, mHeight(128, true), mHeight(128, true));
  } else if (vine_location == 17) {
    //secret
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

  fill("rgba(193,254,255, 0.25)");
  ellipse(x, y, 48, 48);
}

function doBubbles() {
  fill(256, 125);
  let x1s = [
    cloudY + 74,
    cloudY + 135,
    cloudY + 40,
    cloudY + 17,
    cloudY,
    cloudY + 55,
    cloudY + 145,
    cloudY + 95,
  ];

  bubble(x1s[0], 78);
  bubble(x1s[1], 123);
  bubble(x1s[2], 168);
  bubble(x1s[3], 341);
  bubble(x1s[4], 412);
  bubble(x1s[5], 434);
  bubble(x1s[6], 565);
  bubble(x1s[7], 590);
}

function bubble(y, x) {
  fill(256, 125);
  ellipse(x, y, 64, 64);

  fill("rgba(193,254,255, 0.25)");
  ellipse(x - 15, y - 15, 12, 12);
}

function doComet() {
  if (vine_location == 16) fill("#white");
  // else fill("#black");
  ellipse(cloudX, cloudY, 12, 12);
  triangle(
    cloudX - 4,
    cloudY + 2,
    cloudX + 4,
    cloudY - 2,
    cloudX - 64,
    cloudY - 64
  );
}

function manor() {
  if (vine_location <= 14) {
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
  } else if (vine_location == 15) {
    fill("#DDED0E"); // white
    rect(95, 415, 80, 70);

    fill(0); // black
    rect(105, 425, 8, 15);
    rect(131, 425, 8, 15);
    rect(157, 425, 8, 15);
    rect(128.5, 470, 15, 15);

    fill("#f58f30"); //red
    rect(95, 450, 80, 4);
    quad(85, 415, 100, 405, 170, 405, 185, 415);
  } else if (vine_location == 16) {
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

    fill("rgba(88,198,241,0.41)");
    ellipse(300, 600, 700, 700);
  } else if (vine_location == 17) {
    fill("#e96161"); //red
    ellipse(300, 300, 140, 140);

    fill("#e9edc5"); // white
    ellipse(300, 300, 120, 120);

    fill("#e96161"); //red
    ellipse(300, 300, 100, 100);

    fill("#e9edc5"); // white
    ellipse(300, 300, 80, 80);

    fill(0); // black
    ellipse(280, 300, 20, 20);
    ellipse(320, 300, 20, 20);
    ellipse(300, 280, 20, 20);
    ellipse(300, 320, 20, 20);
  }
}

function trellis() {
  if (vine_location < 17) {
    fill("#594300");
    rect(102, 500, 365, 15);
    rect(102, 550, 365, 15);

    fill("#268415");
    rect(102, 503, 365, 9);
    rect(102, 553, 365, 9);

    fill("#594300");
    rect(102, 506, 365, 3);
    rect(102, 556, 365, 3);
  } else {
    fill("#594300");
    rect(0, 500, width, 15);
    rect(0, 550, width, 15);

    fill("#268415");
    rect(0, 503, width, 9);
    rect(0, 553, width, 9);

    fill("#594300");
    rect(0, 506, width, 3);
    rect(0, 556, width, 3);
  }
}

function windmill(x, y) {
  fill("rgb(117,42,42)");
  ellipse(x, y, 30, 30);
  quad(x - 15, y, x + 15, y, x + 20, y + 55, x - 20, y + 55);
  fill("brown");
  triangle(x, y, x - 48, y - 8, x - 48, y + 8);
  triangle(x, y, x + 48, y + 8, x + 48, y - 8);
  triangle(x, y, x - 8, y - 48, x + 8, y - 48);
  triangle(x, y, x - 8, y + 40, x + 8, y + 40);
}

function pagoda(x, y) {
  // 440 305
  fill("#F6FAD6"); // white
  rect(x, y, 40, 80);

  fill("black");
  rect(x + 10, y + 70, 10, 10);

  fill("#e96161"); //red
  quad(x, y, x + 40, y, x + 75, y + 10, x - 35, y + 10);
  quad(x, y + 20, x + 40, y + 20, x + 75, y + 30, x - 35, y + 30);
  quad(x, y + 40, x + 40, y + 40, x + 75, y + 50, x - 35, y + 50);
}

function balloon(x, y, color) {
  let size = 60;
  stroke("white");
  line(x - 11, y + 50, x - 18, y + 15);
  line(x + 11, y + 50, x + 18, y + 15);
  noStroke();
  fill(color);
  ellipse(x, y, size, size);
  fill("brown");
  quad(x - 12, y + 50, x + 12, y + 50, x + 10, y + 60, x - 10, y + 60);
}

function tree(x, y, height, width) {
  fill("brown");
  quad(x - 2, y, x + 2, y, x + 2, y + height, x - 2, y + height);

  fill("#68B35A");
  ellipse(x, y, width, width);
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
      if (vine_location < 17) {
        this.y = random(0, 475);
      } else {
        this.y = random(height);
      }

      this.sz = random(3);
      this.dir = random(1, 3);
      this.a = 0;
    }
    if (vine_location < 17) {
      fill(this.c, this.a);
    } else {
      fill(0, this.a);
    }
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
    if (vine_location < 17) {
      if (i < numVines / 2) {
        this.x = 100 + i * 40;
        this.y = 500;
      } else {
        this.x = -300 + i * 40;
        this.y = 550;
      }
    } else {
      if (i < numVines) {
        this.x = -4 + i * 40;
        this.y = 500;
      } else {
        this.x = -4 + (i - 20) * 40;
        this.y = 550;
      }
    }
  }

  fillNextColor() {
    fill(
      `rgb(${int(random(0, 255))},${int(random(0, 255))},${int(
        random(0, 255)
      )})`
    );
  }

  display() {
    if (vine_location < 17) {
      fill("#594300");
      rect(this.x, this.y, 8, 32);
    }

    fill("#268415");
    ellipse(this.x + 4, this.y + 7, 24, 24);

    if (vine_location == 15) fill("#B8ECFF");
    else if (vine_location == 16) fill("#FC61D0");
    else if (vine_location == 17) this.fillNextColor();
    else fill("#c013ed");
    ellipse(this.x + 4, this.y + 7, 16, 16);

    fill("#268415");
    ellipse(this.x + 4, this.y + 7, 8, 8);
  }
}
