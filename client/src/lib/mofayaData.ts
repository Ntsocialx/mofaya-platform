// Single source of truth for brand assets and flavour content.
// Images and flavour copy are taken from the official MoFaya site (mofaya.co.za).

const UPLOADS = "https://mofaya.co.za/wp-content/uploads";

export const BRAND = {
  name: "MoFaya",
  site: "https://mofaya.co.za",
  logo: `${UPLOADS}/2023/10/cropped-cropped-Horizontal-Wordmark_White-RGB-2-01-e1697309284817.png`,
  // Red & gold brushstroke flame from the official About page.
  flame: `${UPLOADS}/2024/08/About-MoFaya.png`,
};

export const DJ_SBU = {
  portrait: `${UPLOADS}/2025/02/DJ-Sbu-Collab.png`,
  // DJ set shot, MoFaya can in hand, from the official home page.
  action: `${UPLOADS}/2023/12/Home-Page-Scews-04.webp`,
  source: "https://mofaya.co.za/collabs/",
  // Quoted from mofaya.co.za/collabs.
  bio: "DJ Sbu is a MoFaya co-founder, award-winning social entrepreneur, DJ, TV & radio host, music producer, actor, best-selling author, motivational speaker, and philanthropist who thrives on giving back to the youth.",
  pull: "Considered by many as an African youth icon, DJ Sbu is the face of MoFaya and his story is synonymous with the brand's aspirations.",
};

export type Flavor = {
  id: string;
  name: string;
  edition: string;
  tagline: string;
  description: string;
  image: string;
  page: string;
  from: string;
  to: string;
  // Readable text colour on that flavour's background.
  accent: string;
};

// Taglines and descriptions are quoted from each flavour's page on mofaya.co.za/products.
export const FLAVORS: Flavor[] = [
  {
    id: "original",
    name: "Original Faya",
    edition: "The original energy drink",
    tagline: "A free spirited, sparkling energy drink.",
    description:
      "The berry flavours dance around your mouth, leaving a crisp, tantalising and refreshing finish. From kasi to emasububsini, it's got “that thing”.",
    image: `${UPLOADS}/2025/02/Original-1.webp`,
    page: "https://mofaya.co.za/products/original/",
    from: "#D32F2F",
    to: "#FFB300",
    accent: "#FFB300",
  },
  {
    id: "flavatron",
    name: "Flavatron",
    edition: "Robot Boii edition",
    tagline: "Green means go.",
    description:
      "Experience a flava revolution that will ignite all your senses. The mixture of 3 flavours, stimulating your tastebuds times 3 just like Roboto, Roboto, Roboto!",
    image: `${UPLOADS}/2025/02/Flavatron-1.webp`,
    page: "https://mofaya.co.za/products/flavatron/",
    from: "#00E676",
    to: "#00B0FF",
    accent: "#00E676",
  },
  {
    id: "berry-queen",
    name: "Berry Queen",
    edition: "Miss SA edition, sugar-free",
    tagline: "Full of personality!",
    description:
      "An elegant & complex combination of a medley of berries. Inspired by Ubuhle Bendalo and ignited by Beauty & Brains. Love queening on the walkway of countless possibilities? This one is for you.",
    image: `${UPLOADS}/2025/02/Berry-Queen-1.webp`,
    page: "https://mofaya.co.za/products/berry-queen/",
    from: "#C2185B",
    to: "#7B1FA2",
    accent: "#F48FB1",
  },
  {
    id: "vitamin-ting",
    name: "Vitamin Ting",
    edition: "Citrus",
    tagline: "Imnandi blind iVRRRRRPHA!",
    description:
      "An ephaphayo nememezayo (excitable, bold, vibrant) sparkling energy drink, packed with citrus notes that produce a clean, crisp and refreshing lemon-orange taste.",
    image: `${UPLOADS}/2025/02/Vitamin-Ting-1.webp`,
    page: "https://mofaya.co.za/products/vitamin-ting/",
    from: "#FF6D00",
    to: "#FFD600",
    accent: "#FFD600",
  },
  {
    id: "dry-lemza",
    name: "Dry Lemza",
    edition: "Lemon made in ZA",
    tagline: "When life throws you lemons, set them on Faya.",
    description:
      "The master of socialising, leaving your taste buds with a sour, bitter-sweet confusingiling. It's dry, but you can mocktail it!",
    image: `${UPLOADS}/2025/02/Dry-Lemza-1.webp`,
    page: "https://mofaya.co.za/products/dry-lemza/",
    from: "#AEEA00",
    to: "#1B5E20",
    accent: "#C6FF00",
  },
];

export const UNIVERSITIES = [
  "University of Johannesburg",
  "University of the Witwatersrand",
  "University of Pretoria",
  "Tshwane University of Technology",
  "University of Cape Town",
  "Stellenbosch University",
  "Cape Peninsula University of Technology",
  "University of KwaZulu-Natal",
  "Durban University of Technology",
  "Rhodes University",
  "North-West University",
  "University of Limpopo",
  "University of Venda",
  "University of the Free State",
  "Nelson Mandela University",
  "Other",
];

export const STUDY_YEARS = ["1st year", "2nd year", "3rd year", "Honours", "Postgraduate"];
