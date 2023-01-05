const token = "...";

async function getJourneys(from, to) {
  const allJourneys = [];
  for (const time of ["060000", "120000", "180000"]) {
    const url = `https://api.sncf.com/v1/coverage/sncf/journeys?from=${from}&to=${to}&datetime=20230107T${time}`;
    const response = await fetch(url, { headers: { Authorization: token } });
    const data = await response.json();
    if (typeof data.message === "string" && data.message.startsWith("Quota")) {
      throw new Error("Rety later");
    }
    if (Array.isArray(data.journeys)) {
      allJourneys.push(...data.journeys);
      if (allJourneys.length >= 2) {
        break;
      }
    }
  }
  const bestJourney = Math.min(...allJourneys.map((j) => j.duration));
  return bestJourney;
}

const cities = [
  { name: "Bourg-en-Bresse", zipCode: "01053" },
  { name: "Laon", zipCode: "02408" },
  { name: "Moulins", zipCode: "03190" },
  { name: "Digne-les-Bains", zipCode: "04070" },
  { name: "Gap", zipCode: "05061" },
  { name: "Nice", zipCode: "06088" },
  { name: "Privas", zipCode: "07186" },
  { name: "Charleville-Mézières", zipCode: "08105" },
  { name: "Foix", zipCode: "09122" },
  { name: "Troyes", zipCode: "10387" },
  { name: "Carcassonne", zipCode: "11069" },
  { name: "Rodez", zipCode: "12202" },
  { name: "Marseille", zipCode: "13055" },
  { name: "Caen", zipCode: "14118" },
  { name: "Aurillac", zipCode: "15014" },
  { name: "Angoulême", zipCode: "16015" },
  { name: "La Rochelle", zipCode: "17300" },
  { name: "Bourges", zipCode: "18033" },
  { name: "Tulle", zipCode: "19272" },
  // { name: "Ajaccio", zipCode: "2A004" },
  // { name: "Bastia", zipCode: "2B033" },
  { name: "Dijon", zipCode: "21231" },
  { name: "Saint-Brieuc", zipCode: "22278" },
  { name: "Guéret", zipCode: "23096" },
  { name: "Périgueux", zipCode: "24322" },
  { name: "Besançon", zipCode: "25056" },
  { name: "Valence", zipCode: "26362" },
  { name: "Évreux", zipCode: "27229" },
  { name: "Chartres", zipCode: "28085" },
  { name: "Quimper", zipCode: "29232" },
  { name: "Nîmes", zipCode: "30189" },
  { name: "Toulouse", zipCode: "31555" },
  { name: "Auch", zipCode: "32013" },
  { name: "Bordeaux", zipCode: "33063" },
  { name: "Montpellier", zipCode: "34172" },
  { name: "Rennes", zipCode: "35238" },
  { name: "Châteauroux", zipCode: "36044" },
  { name: "Tours", zipCode: "37261" },
  { name: "Grenoble", zipCode: "38185" },
  { name: "Lons-le-Saunier", zipCode: "39300" },
  { name: "Mont-de-Marsan", zipCode: "40192" },
  { name: "Blois", zipCode: "41018" },
  { name: "Saint-Étienne", zipCode: "42218" },
  { name: "Le Puy-en-Velay", zipCode: "43157" },
  { name: "Nantes", zipCode: "44109" },
  { name: "Orléans", zipCode: "45234" },
  { name: "Cahors", zipCode: "46042" },
  { name: "Agen", zipCode: "47001" },
  { name: "Mende", zipCode: "48095" },
  { name: "Angers", zipCode: "49007" },
  { name: "Saint-Lô", zipCode: "50502" },
  { name: "Châlons-en-Champagne", zipCode: "51108" },
  { name: "Chaumont", zipCode: "52121" },
  { name: "Laval", zipCode: "53130" },
  { name: "Nancy", zipCode: "54395" },
  { name: "Bar-le-Duc", zipCode: "55029" },
  { name: "Vannes", zipCode: "56260" },
  { name: "Metz", zipCode: "57463" },
  { name: "Nevers", zipCode: "58194" },
  { name: "Lille", zipCode: "59350" },
  { name: "Beauvais", zipCode: "60057" },
  { name: "Alençon", zipCode: "61001" },
  { name: "Arras", zipCode: "62041" },
  { name: "Clermont-Ferrand", zipCode: "63113" },
  { name: "Pau", zipCode: "64445" },
  { name: "Tarbes", zipCode: "65440" },
  { name: "Perpignan", zipCode: "66136" },
  { name: "Strasbourg", zipCode: "67482" },
  { name: "Colmar", zipCode: "68066" },
  { name: "Lyon", zipCode: "69123" },
  { name: "Vesoul", zipCode: "70550" },
  { name: "Mâcon", zipCode: "71270" },
  { name: "Le Mans", zipCode: "72181" },
  { name: "Chambéry", zipCode: "73065" },
  { name: "Annecy", zipCode: "74010" },
  { name: "Paris", zipCode: "75056" },
  { name: "Rouen", zipCode: "76540" },
  { name: "Melun", zipCode: "77288" },
  { name: "Versailles", zipCode: "78646" },
  { name: "Niort", zipCode: "79191" },
  { name: "Amiens", zipCode: "80021" },
  { name: "Albi", zipCode: "81004" },
  { name: "Montauban", zipCode: "82121" },
  { name: "Toulon", zipCode: "83137" },
  { name: "Avignon", zipCode: "84007" },
  { name: "La Roche-sur-Yon", zipCode: "85191" },
  { name: "Poitiers", zipCode: "86194" },
  { name: "Limoges", zipCode: "87085" },
  { name: "Épinal", zipCode: "88160" },
  { name: "Auxerre", zipCode: "89024" },
  { name: "Belfort", zipCode: "90010" },
  { name: "Évry-Courcouronnes", zipCode: "91228" },
  { name: "Nanterre", zipCode: "92050" },
  { name: "Bobigny", zipCode: "93008" },
  { name: "Créteil", zipCode: "94028" },
  { name: "Cergy", zipCode: "95127" },
];

let csvData = "";
csvData += ";" + cities.map((city) => city.name).join(";") + "\n";
for (const cityFrom of cities) {
  console.log(`Processing ${cityFrom.name}...`);
  csvData += `${cityFrom.name};`;
  for (const cityTo of cities) {
    if (cityFrom.zipCode === cityTo.zipCode) {
      csvData += "0;";
    } else {
      const time = await getJourneys(
        `admin:fr:${cityFrom.zipCode}`,
        `admin:fr:${cityTo.zipCode}`
      );
      csvData += `${time};`;
    }
  }
  console.log(csvData);
  csvData += "\n";
}

console.log("----");
console.log(csvData);
