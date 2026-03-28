// Save prefix constant for localStorage keys
const SAVE_PREFIX = "fac_012_";

// Configuration for level progression
const levelProgressionConfig = {
  // Skill points gained at each level (cumulative) - array index = level
  skillPointsPerLevel: [
    10, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 2, 2, 2, 3, 3, 3, 4,
    4
  ],
  // Attribute points: base 5 + 1 for every even level
  attributePointsBase: 5,
  attributePointsPerThreeLevels: 1,
};

// Configuration JSON for resource sections
const resourceSectionsConfig = [
  {
    resourceName: "HP",
    totalLabel: "HP Total",
    currentLabel: "HP Atual",
    baseId: "hp-base",
    extraId: "hp-extra",
    totalId: "hp-total",
    currentId: "hp-current",
    columnSize: 6,
    diceType: "d6",
    diceSelectId: "hp-dice-select",
  },
  {
    resourceName: "Mana",
    totalLabel: "Mana Total",
    currentLabel: "Mana Atual",
    baseId: "mana-base",
    extraId: "mana-extra",
    totalId: "mana-total",
    currentId: "mana-current",
    columnSize: 6,
    diceType: "d6",
    diceSelectId: "mana-dice-select",
  },
  // You can easily add more resource types here:
  // {
  //   resourceName: "Stamina",
  //   totalLabel: "Stamina Total",
  //   currentLabel: "Stamina Atual",
  //   baseId: "stamina-base",
  //   extraId: "stamina-extra",
  //   totalId: "stamina-total",
  //   currentId: "stamina-current",
  //   columnSize: 6,
  //   diceType: "d8",
  //   diceSelectId: "stamina-dice-select"
  // }
];
