export const cards = [
  {
    name: "Juiliana Smith",
    desc: "Let's just say the pen might be mightier than the sword...",
    health: 60,
    strength: 40,
    intelligence: 80,
    rarity: "Uncommon",
    image: "/juliana.png",
  },
  {
    name: "Herb Carolus",
    desc: "Someone really told him to be there or be square",
    health: 60,
    strength: 50,
    intelligence: 40,
    rarity: "Common",
    image: "/herb.png",
  },
  {
    name: "The Stone",
    desc: "Definately not a rip-off rock..",
    health: 70,
    strength: 80,
    intelligence: 20,
    rarity: "Uncommon",
    image: "/stone.png",
  },
  {
    name: "Vasant Aabraham",
    desc: "Cool Guy who loves Harry Potter",
    health: 50,
    strength: 70,
    intelligence: 80,
    rarity: "Common",
    image: "/vasant.png",
  },
  {
    name: "Rachel Green",
    desc: "You can be F.R.I.E.N.D.S with her",
    health: 60,
    strength: 60,
    intelligence: 60,
    rarity: "Common",
    image: "/rachel.png",
  },
  {
    name: "Chef Jack",
    desc: "Makes the best Pasta in the World",
    health: 100,
    strength: 40,
    intelligence: 50,
    rarity: "Rare",
    image: "/jack.png",
  },
  {
    name: "Agent Vinny",
    desc: "Incharge of protecting the world and stuff...",
    health: 20,
    strength: 70,
    intelligence: 80,
    rarity: "Rare",
    image: "/vinny.png",
  },
  {
    name: "Dr. Amanda",
    desc: "Had to go to college for 6 years to add that 'Dr'",
    health: 90,
    strength: 20,
    intelligence: 90,
    rarity: "Rare",
    image: "/amanda.png",
  },
  {
    name: "Bill",
    desc: "No Description required",
    health: 69,
    strength: 69,
    intelligence: 69,
    rarity: "Uncommon",
    image: "/bill.png",
  },
];

export const numberIndex = {
  "Juiliana Smith": 0,
  "Herb Carolus": 1,
  "The Stone": 2,
  "Vasant Aabraham": 3,
  "Rachel Green" : 4,
  "Chef Jack" : 5,
  "Agent Vinny" : 6,
  "Dr. Amanda" : 7,
  "Bill" : 8
};

export function convertNameToIndex(name) {
  const buffer = numberIndex[name];
  if (!buffer) {
    if (name === "Juiliana Smith") {
      return 0;
    } else {
      return 69420;
    }
  } else {
    return buffer;
  }
}
