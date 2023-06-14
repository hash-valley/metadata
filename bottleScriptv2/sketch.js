const urlParams = new URLSearchParams(window.location.search);
const seed = urlParams.get("seed").split("-");

let bottleTypes = [
  {
    name: "Red",
    subtypes: [
      {
        name: "Fruity Dry Red",
        notes: [
          {
            name: "Blueberry Blackberry",
            type: [
              "Shiraz",
              "Monastrell",
              "Mencia",
              "Nero Buono",
              "Petit Verdot",
              "Pinotage",
            ],
          },
          {
            name: "Black Cherry Rasberry",
            type: [
              "Cabernet Suavignon",
              "Merlot",
              "Super Tuscan",
              "Amarone",
              "Valpolicalla",
              "Cabernet France",
              "Sangiovese",
              "Priorat",
            ],
          },
          {
            name: "Strawberry Cherry",
            type: [
              "Garnacha",
              "Pinot Nior",
              "Carmenere",
              "Primitivo",
              "Counoise",
              "Barbera",
              "Grenache",
            ],
          },
          {
            name: "Tart Cherry Cranberry",
            type: [
              "Zweigelt",
              "Gamay",
              "Blaufrankisch",
              "St. Laurent",
              "Spatburgunder",
            ],
          },
        ],
      },
      {
        name: "Herbal Dry Red",
        notes: [
          {
            name: "Clay and Cured Meats",
            type: [
              "Barolo",
              "Barbaresco",
              "Chianti",
              "Vacqueyras",
              "Gigondas",
              "Brunello di Montalcino",
            ],
          },
          {
            name: "Truffle & Forest",
            type: [
              "Bourgogne",
              "Dolcetto",
              "Grignolino",
              "Barbera",
              "Beaujolais",
            ],
          },
          {
            name: "Smoke Tobacco Leather",
            type: [
              "Taurasi",
              "Cahors",
              "Rioja",
              "Aglianico",
              "Graves",
              "Rioja",
              "Pessac-Leognan",
            ],
          },
          {
            name: "Black Pepper Gravel",
            type: [
              "Cahors",
              "Medoc",
              "Sagrantino",
              "Tannat",
              "Pauillac",
              "Saint-Julien",
              "Chinon",
              "Lagrein",
              "Hermitage",
              "Bandol",
              "Cotes de Castillon",
              "Fronsac",
              "Rhone",
            ],
          },
        ],
      },
      {
        name: "Sweet Red",
        notes: [
          {
            name: "Sweet Red",
            type: ["Recioto della Valpolicella", "Occhio di Pernice", "Freisa"],
          },
        ],
      },
    ],
  },
  {
    name: "White",
    subtypes: [
      {
        name: "Dry White",
        notes: [
          {
            name: "Light Grapefruit Floral",
            type: [
              "Cortese",
              "Vermentino",
              "Moschofilero",
              "Verdicchio",
              "Orvieto",
              "Pinot Blanc",
              "Greco di Tufo",
            ],
          },
          {
            name: "Light Citrus Lemon",
            type: [
              "Chablis",
              "Picpoul",
              "Garganega",
              "Fiano",
              "Muscadet",
              "Assyrtiko",
              "Silvaner",
              "Albarino",
            ],
          },
          {
            name: "Light Herbal Grassy",
            type: [
              "Pouilly Fume",
              "Entre-deux-Mers",
              "Ugni Blanc",
              "Touraine",
              "Sauvignon Blanc",
              "Chevemy",
              "Verdejo",
            ],
          },
          {
            name: "Rich Creamy Nutty",
            type: [
              "Chardonnay",
              "Montrachet",
              "Macconais",
              "Soave",
              "pessac-Leognan",
              "Savennieres",
              "Antao Vaz",
              "Cote de Beaune",
            ],
          },
          {
            name: "Medium Perfume Floral",
            type: [
              "Torrontes",
              "Vouvray Sec",
              "Malvasiz Secco",
              "Condrieu",
              "Roussanne",
              "Tokaji",
              "Viognier",
              "Fiano",
              "Marsanne",
            ],
          },
        ],
      },
      {
        name: "Sweet White",
        notes: [
          {
            name: "Off-Dry Apricots Peaches",
            type: [
              "Chenin Blanc",
              "Spatlese",
              "Kaniett",
              "Demi-sec",
              "Gewurztraminer",
              "Muller-Thurgau",
            ],
          },
          {
            name: "Sweet Tropical Honey",
            type: [
              "Late Harvest",
              "Muscat Blanc",
              "Aboccato",
              "Sauternes",
              "Auslese",
              "Moelleux",
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Rose",
    subtypes: [
      {
        name: "Dry Rose",
        notes: [
          {
            name: "Herbal Savory",
            type: [
              "Loire Rose",
              "Bandol Rose",
              "Cabernet Franc Rose",
              "Syrah Rose",
              "Cabernet Sauvignon Rose",
            ],
          },
          {
            name: "Fruity Floral",
            type: [
              "Pinot Noir Rose",
              "Grenache Rose",
              "Provence Rose",
              "Sangiovese Rose",
              "Rosado",
              "Tavel",
            ],
          },
        ],
      },
      {
        name: "Off Dry Rose",
        notes: [
          {
            name: "Off Dry Rose",
            type: [
              "Blush",
              "Merlot",
              "Zinfandel",
              "Vin Gris",
              "Garnacha Rosado",
              "Rose d' Anjou",
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Sparkling",
    subtypes: [
      {
        name: "White",
        notes: [
          {
            name: "Dry Creamy Rich",
            type: [
              "Vintage Champagne",
              "Blance de Noirs",
              "Blanc de Blancs",
              "Metodo Classico",
            ],
          },
          {
            name: "Dry Light Citrus",
            type: [
              "Brut Nature",
              "Sec",
              "Cava",
              "Brut",
              "Extra-Brut",
              "Metodo Classico",
              "Proseco Extra-Brut",
            ],
          },
          {
            name: "Off Dry Floral",
            type: [
              "Champagne Extra Dry",
              "Proseco",
              "Sparkling Riesling",
              "Valdobbiadene",
              "Malvasia Secco",
            ],
          },
          {
            name: "Sweet Apricots Rich",
            type: [
              "Moscato d'Asti",
              "Vouvray Mousseux",
              "Demi-Sec",
              "Doux",
              "Asti Spumante",
            ],
          },
        ],
      },
      {
        name: "Red",
        notes: [
          {
            name: "Dry Raspberry Blueberry",
            type: ["Lambrusco Spumante", "Lambrusco Secco", "Sparkling Shiraz"],
          },
          {
            name: "Sweet Blueberry Cherry",
            type: ["Brachetto d'Acqui", "Lambrusco Dolce"],
          },
          {
            name: "Off Dry Raspberry Cherry",
            type: ["Lambrusco Amabile", "Brachetto d'Acqui"],
          },
        ],
      },
      {
        name: "Rose",
        notes: [
          {
            name: "Dry Strawberry Floral",
            type: ["Champagne Rose", "Cremant Rose", "Cava Rose Brut"],
          },
          {
            name: "Off Dry Strawberry Orange",
            type: ["Moscato Rose", "Brachetto d'Acqui Rose", "Cava Rose"],
          },
        ],
      },
    ],
  },
  {
    name: "Exotic",
    subtypes: [
      {
        name: "Aquatic",
        notes: [
          {
            name: "Kelp",
            type: ["Laminaria", "Feather Boa", "Kombu Kelp"],
          },
          {
            name: "Sponge",
            type: [
              "Azure Vase",
              "Vulcano Carpet",
              "Convoluted Sponge",
              "Chimney Sponge",
              "Chicken Liver",
            ],
          },
        ],
      },
      {
        name: "Nebulic",
        notes: [
          {
            name: "Star Dust",
            type: [
              "Red Star",
              "Orange Nebula",
              "Yellow Dust",
              "Green Atmos",
              "Blue System",
              "Purple Quasar",
            ],
          },
          {
            name: "Zero Point",
            type: ["000", "111"],
          },
        ],
      },
      {
        name: "Hypercubic",
        notes: [
          {
            name: "Tesselated Manifold",
            type: ["Symplectic Manifold", "Combinatorial", "Digital Manifold"],
          },
          {
            name: "Holomorphic",
            type: ["Convex Function", "Concave Function"],
          },
        ],
      },
    ],
  },
];

let year = BigInt(365 * 24 * 60 * 60);
let bottleEras = [
  {
    name: "Contemporary",
    range: [BigInt(0), BigInt(100) * year],
  },
  {
    name: "Modern",
    range: [BigInt(100) * year, BigInt(250) * year],
  },
  {
    name: "Romantic",
    range: [BigInt(250) * year, BigInt(500) * year],
  },
  {
    name: "Renaissance",
    range: [BigInt(500) * year, BigInt(800) * year],
  },
  {
    name: "Medeival",
    range: [BigInt(800) * year, BigInt(1600) * year],
  },
  {
    name: "Classical",
    range: [BigInt(1600) * year, BigInt(2700) * year],
  },
  {
    name: "Ancient",
    range: [BigInt(2700) * year, BigInt(4000) * year],
  },
  {
    name: "Neolithic",
    range: [BigInt(4000) * year, BigInt(10000) * year],
  },
  {
    name: "Prehistoric",
    range: [BigInt(10000) * year, BigInt(100000) * year],
  },
  {
    name: "Primordial",
    range: [BigInt(100000) * year, BigInt(1000000000) * year],
  },
  {
    name: "Archean",
    range: [BigInt(1000000000) * year, BigInt(4000000000) * year],
  },
  {
    name: "Astral",
    range: [BigInt(4000000000) * year, BigInt(13000000000) * year],
  },
  {
    name: "Akashic",
    range: [BigInt(13000000000) * year, BigInt(13000000001) * year],
  },
];

function getBottleEra(bottleAge) {
  let bigAge = BigInt(bottleAge);
  for (let i = 0; i < bottleEras.length; ++i) {
    let range = bottleEras[i].range;
    if (range[0] <= bigAge && bigAge < range[1]) {
      return { era: bottleEras[i].name, eraIndex: i };
    }
  }
}

let raw = {
  type: parseInt(seed[0]),
  subtype: parseInt(seed[1]),
  note: parseInt(seed[2]),
  name: parseInt(seed[3]),
};
let attributes = {
  type: bottleTypes[raw.type].name,
  subtype: bottleTypes[raw.type].subtypes[raw.subtype].name,
  note: bottleTypes[raw.type].subtypes[raw.subtype].notes[raw.note].name,
  name: bottleTypes[raw.type].subtypes[raw.subtype].notes[raw.note].type[
    raw.name
  ],
};
let age = parseInt(seed[4]);
let { era, eraIndex } = getBottleEra(age);

let sum = raw.type + raw.subtype + raw.note + raw.name;

let font;
function preload() {
  font = loadFont("./font.ttf");
}

const Y_AXIS = 1;
const X_AXIS = 2;

let rotation = 0;
let angularVelocity = 0;

let sparkles = [];

function addSparkle() {
  // Choose a random position on the bottle for the sparkle
  let x = random(50, 550); // Adjust these values to match the shape of your bottle
  let y = random(50, 550); // Adjust these values to match the shape of your bottle

  // Add the sparkle to the array
  sparkles.push(new Sparkle(x, y));
}

function setup() {
  createCanvas(600, 600);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

let displayNotes = false;
function mouseClicked() {
  // Check if the user clicked on the bottle
  if (mouseX > 140 && mouseX < 400 && mouseY > 200 && mouseY < 400) {
    // Adjust these values to match the shape of your bottle
    // Display the tasting notes
    displayTastingNotes();
  }
}

function displayTastingNotes() {
  // Set the text properties
  displayNotes = !displayNotes;
}

function mouseDragged() {
  // Calculate the change in mouse position
  let dx = mouseX - pmouseX;

  // Update the angular velocity based on the mouse movement
  angularVelocity = -dx * 0.01; // Note the negative sign here
}

function draw() {
  let bg;
  if (attributes.type == "Red") bg = color("#9d0e41");
  if (attributes.type == "White") bg = color("#fdffde");
  if (attributes.type == "Rose") bg = color("pink");
  if (attributes.type == "Sparkling") {
    if (attributes.subtype == "Red") bg = color("#9d0e41");
    if (attributes.subtype == "White") bg = color("#fdffde");
    if (attributes.subtype == "Rose") bg = color("pink");
  }
  if (attributes.type == "Exotic") {
    setGradient(
      0,
      0,
      width,
      height,
      color("rgb(255,215,252)"),
      color("#FFCA5C"),
      X_AXIS
    );
  } else {
    background(bg);
  }

  // Add a new sparkle at random intervals
  if (random() < 0.09 * eraIndex) {
    // Adjust this value to control the frequency of sparkles
    addSparkle();
  }
  // Update and display each sparkle
  for (let i = sparkles.length - 1; i >= 0; i--) {
    let sparkle = sparkles[i];
    sparkle.update();
    sparkle.display();

    // Remove the sparkle if it's finished
    if (sparkle.isFinished()) {
      sparkles.splice(i, 1);
    }
  }

  if (attributes.type == "Sparkling") {
    sparkle(250, 100);
    sparkle(500, 350);
    sparkle(100, 250);
  }

  // Update the rotation angle based on the angular velocity
  rotation += angularVelocity;

  // Apply a deceleration to the angular velocity
  angularVelocity *= 0.95; // Adjust this value to control the rate of deceleration

  // Apply the rotation
  push();
  translate(width / 2, height / 2);
  rotate(rotation);
  translate(-width / 2, -height / 2);

  bottle();
  label();

  if (displayNotes) {
    if (attributes.type == "Red" || attributes.subtype == "Red") {
      fill("white");
    } else {
      fill("black");
    }
    textSize(16);

    // Display the tasting notes
    text(attributes.subtype, -180, 524);
    text(attributes.note, -180, 564);
  }

  // Reset the transformation
  pop();

  doEra();
}

function doEra() {
  textFont(font);
  if (attributes.type == "Red" || attributes.subtype == "Red") {
    fill("white");
  } else {
    fill("black");
  }
  textSize(26);
  text(era, 20, 560);
}

function label() {
  rotate(-HALF_PI / 2);
  textFont(font);
  if (
    attributes.subtype == "Hypercubic" ||
    era === "Astral" ||
    era == "Akashic"
  ) {
    fill("white");
  } else {
    fill("black");
  }
  textSize(26);
  text(attributes.name, -170, 430);
}

function bottle() {
  noStroke();
  if (attributes.type == "Exotic") {
    if (attributes.subtype == "Aquatic") fill("rgb(140,247,238)");
    if (attributes.subtype == "Nebulic") fill("rgb(139,55,184)");
    if (attributes.subtype == "Hypercubic") fill("rgb(188,27,68)");
  } else if (sum % 3 == 0) {
    fill("rgb(219,137,77)");
  } else if (sum % 4 == 0) {
    fill("rgb(118,64,138)");
  } else if (sum % 5 == 0) {
    fill("rgb(167,82,114)");
  } else if (sum % 7 == 0) {
    fill("#1A1F39");
  } else {
    fill("green");
  }
  quad(100, 400, 200, 500, 455, 245, 355, 150);
  quad(500, 80, 520, 100, 425, 225, 375, 175);
  fill("brown");
  quad(500, 80, 520, 100, 540, 90, 510, 60);

  if (
    attributes.subtype == "Hypercubic" ||
    era === "Astral" ||
    era == "Akashic"
  ) {
    fill("black");
  } else {
    fill("white");
  }
  quad(140, 400, 200, 460, 400, 245, 355, 200);
}

function sparkle(x, y) {
  let w = 50;
  let h = 50;
  if (attributes.subtype == "Red") {
    stroke("white");
  } else {
    stroke("black");
  }
  noFill();
  arc(x, y, w, w, 0, HALF_PI);
  arc(x + w, y, w, w, HALF_PI, PI);
  arc(x + w, y + w, h, h, PI, -HALF_PI);
  arc(x, y + w, w, w, -HALF_PI, 0);
  noStroke();
}

class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lifespan = 255;
  }

  update() {
    this.lifespan -= 5;
  }

  display() {
    let c;
    if (attributes.type == "Red" || attributes.subtype == "Red") {
      c = 255;
    } else {
      c = 0;
    }
    stroke(c, this.lifespan);
    ellipse(this.x, this.y, 1, 1);
  }

  isFinished() {
    return this.lifespan < 0;
  }
}
