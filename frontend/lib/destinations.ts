export interface Destination {
  code: string;
  name: string;
  flag: string;
  region: string;
  /** Additional terms that help surface this destination in search */
  aliases: string[];
}

export const DESTINATIONS: Destination[] = [
  // Africa — ECOWAS / visa-free
  { code: "GH", name: "Ghana", flag: "🇬🇭", region: "Africa", aliases: ["accra"] },
  { code: "CI", name: "Ivory Coast", flag: "🇨🇮", region: "Africa", aliases: ["cote d'ivoire", "côte d'ivoire", "abidjan"] },
  { code: "SN", name: "Senegal", flag: "🇸🇳", region: "Africa", aliases: ["dakar"] },

  // Africa — visa / evisa
  { code: "RW", name: "Rwanda", flag: "🇷🇼", region: "Africa", aliases: ["kigali"] },
  { code: "MA", name: "Morocco", flag: "🇲🇦", region: "Africa", aliases: ["marrakech", "casablanca", "rabat"] },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", region: "Africa", aliases: ["cape town", "johannesburg", "joburg", "sa"] },
  { code: "NA", name: "Namibia", flag: "🇳🇦", region: "Africa", aliases: ["windhoek"] },
  { code: "EG", name: "Egypt", flag: "🇪🇬", region: "Africa", aliases: ["cairo", "sharm"] },
  { code: "MU", name: "Mauritius", flag: "🇲🇺", region: "Africa", aliases: ["port louis"] },
  { code: "SC", name: "Seychelles", flag: "🇸🇨", region: "Africa", aliases: ["mahe", "mahé"] },
  { code: "UG", name: "Uganda", flag: "🇺🇬", region: "Africa", aliases: ["kampala"] },
  { code: "KE", name: "Kenya", flag: "🇰🇪", region: "Africa", aliases: ["nairobi", "mombasa"] },

  // Middle East
  { code: "AE", name: "UAE", flag: "🇦🇪", region: "Middle East", aliases: ["dubai", "abu dhabi", "united arab emirates"] },
  { code: "QA", name: "Qatar", flag: "🇶🇦", region: "Middle East", aliases: ["doha"] },
  { code: "MV", name: "Maldives", flag: "🇲🇻", region: "Indian Ocean", aliases: ["male", "malé"] },

  // Europe
  { code: "SCHENGEN", name: "Schengen Area", flag: "🇪🇺", region: "Europe", aliases: ["europe", "france", "germany", "italy", "spain", "netherlands", "portugal", "greece", "switzerland", "eu"] },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", region: "Europe", aliases: ["uk", "britain", "england", "london", "great britain"] },

  // Americas
  { code: "CA", name: "Canada", flag: "🇨🇦", region: "Americas", aliases: ["toronto", "vancouver", "montreal"] },
  { code: "US", name: "United States", flag: "🇺🇸", region: "Americas", aliases: ["usa", "america", "new york", "los angeles"] },

  // Asia
  { code: "TH", name: "Thailand", flag: "🇹🇭", region: "Asia", aliases: ["bangkok", "phuket", "chiang mai"] },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", region: "Asia", aliases: ["hanoi", "ho chi minh", "saigon"] },
  { code: "PH", name: "Philippines", flag: "🇵🇭", region: "Asia", aliases: ["manila", "cebu", "boracay"] },
  { code: "JP", name: "Japan", flag: "🇯🇵", region: "Asia", aliases: ["tokyo", "osaka", "kyoto"] },
  { code: "SG", name: "Singapore", flag: "🇸🇬", region: "Asia", aliases: [] },
];

export function searchDestinations(query: string): Destination[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return DESTINATIONS.filter((d) => {
    const nameMatch = d.name.toLowerCase().includes(q);
    const aliasMatch = d.aliases.some((a) => a.includes(q));
    return nameMatch || aliasMatch;
  }).slice(0, 8);
}
