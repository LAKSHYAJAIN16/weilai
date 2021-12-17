export default function rarityToColor(rarity) {
  if (rarity === "Common") {
    return "white";
  } else if (rarity === "Uncommon") {
    return "#e0ffe5";
  } else if (rarity === "Rare") {
    return "#bffaff";
  }
  else if (rarity === "Epic") {
    return "#c4b5fd";
  }
}
