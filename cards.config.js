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
    health: 30,
    strength: 32,
    intelligence: 20,
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
    desc: "Loves Harry Potter a Bit too much",
    health: 30,
    strength: 20,
    intelligence: 10,
    rarity: "Common",
    image: "/vasant.png",
  },
  {
    name: "Rachel Green",
    desc: "You can be F.R.I.E.N.D.S with her",
    health: 50,
    strength: 50,
    intelligence: 50,
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
  {
    name: "Agent Ana",
    desc: "Incharge of protecting the world and stuff...",
    health: 30,
    strength: 80,
    intelligence: 80,
    rarity: "Uncommon",
    image: "/ana.png",
  },
  {
    name: "Chris Smith",
    desc: "Likes to bake Cookies and Read Books",
    health: 90,
    strength: 20,
    intelligence: 40,
    rarity: "Epic",
    image: "/chris.png",
  },
  {
    name: "Lil' Johnny",
    desc: "He ain't 'lil'. You don't want to get on his wrong side",
    health: 80,
    strength: 90,
    intelligence: 30,
    rarity: "Uncommon",
    image: "/johnny.png",
  },
  {
    name: "Kate Not Winslet",
    desc: "Who's Kate Winslet? Never heard of her",
    health: 53,
    strength: 32,
    intelligence: 21,
    rarity: "Epic",
    image: "/kate.png",
  },
  {
    name: "Andrea Jones",
    desc: "Goes to Middle School. No more explanation needed",
    health: 33,
    strength: 22,
    intelligence: 11,
    rarity: "Common",
    image: "/andrea.png",
  },
  {
    name: "Elsa",
    desc: "Let it Go! Let it Go! Who am I kidding that doesn't look like Elsa.",
    health: 60,
    strength: 73,
    intelligence: 81,
    rarity: "Rare",
    image: "/elsa.png",
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
  "Bill" : 8,
  "Agent Ana" : 9,
  "Chris Smith" : 10,
  "Lil' Johnny" : 11,
  "Kate Not Winslet" : 12,
  "Andrea Jones" : 13,
  "Elsa" : 14
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
