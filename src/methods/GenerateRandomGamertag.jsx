export default function GenerateRandomGamertag() {
  const adjectives = [
    "Crazy",
    "Savage",
    "Blazing",
    "Mystic",
    "Fierce",
    "Swift",
    "Mighty",
    "Epic",
    "Glorious",
    "Dynamic",
    "Tusked",
    "Dark",
    "Holy",
    "Enraged",
    "King",
    "Fast",
    "Deadly",
  ];
  const nouns = [
    "Dragon",
    "Shadow",
    "Storm",
    "Phoenix",
    "Thunder",
    "Pirate",
    "Spartan",
    "Ninja",
    "Warden",
    "Vortex",
    "Fountain",
    "Bear",
    "Goblin",
    "Dorito",
    "Hawk",
    "Machine",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  const randomNumber = Math.floor(Math.random() * 1000);

  const gamertag = `${randomAdjective}${randomNoun}${randomNumber}`;
  return gamertag;
}
