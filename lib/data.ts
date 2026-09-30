const photo = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export type TableShape = "round" | "rect" | "booth";
export type Facing = "both" | "south" | "north";
export type TableStatus = "open" | "held";

export type DiningTable = {
  id: string;
  name: string;
  seats: number;
  zone: string;
  shape: TableShape;
  x: number;
  y: number;
  w: number;
  h: number;
  facing?: Facing;
  status: TableStatus;
  photo: string;
  photoAlt: string;
  note: string;
  perks: string[];
};

export type Review = {
  quote: string;
  author: string;
  score: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Branch = {
  id: string;
  name: string;
  short: string;
  address: string;
  area: string;
  rating: string;
  reviewCount: string;
  slots: string[];
  gallery: GalleryImage[];
  reviews: Review[];
  tables: DiningTable[];
};

export const restaurant = {
  name: "The Velvet Truffle",
  cuisine: "Modern European",
  style: "Fine Dining",
  price: "$$$",
  hours: "Tue–Sun · 5:30–11:00 PM",
  closed: "Closed Mondays",
  description:
    "Wood-fired cooking, seasonal truffles, and a quiet room. Pick the hour, then the exact seat — and see how that table actually looks before you reserve it.",
};

export const heroImages: GalleryImage[] = [
  {
    src: photo("photo-1517248135467-4c7edcad34c4"),
    alt: "Warm dining room with set tables",
  },
  {
    src: photo("photo-1544025162-d76694265947"),
    alt: "Wood-fired dish finished with herbs",
  },
  {
    src: photo("photo-1550966871-3ed3cdb5ed0c"),
    alt: "Low-lit lounge with botanical cocktails",
  },
];

function table(
  input: Omit<DiningTable, "photo"> & { photo: string },
): DiningTable {
  return input;
}

export const branches: Branch[] = [
  {
    id: "downtown",
    name: "Downtown",
    short: "Downtown Branch",
    address: "18 Mercer Street",
    area: "Dining room, banquette, and a small terrace",
    rating: "4.9",
    reviewCount: "540+ reviews",
    slots: ["6:30 PM", "7:15 PM", "8:30 PM", "9:00 PM"],
    gallery: [
      {
        src: photo("photo-1552566626-52f8b828add9", 900),
        alt: "Downtown dining room in the evening",
      },
      {
        src: photo("photo-1559339352-11d035aa65de", 900),
        alt: "Plated dinner on a linen table",
      },
      {
        src: photo("photo-1525610553991-2bede1a236e2", 900),
        alt: "Candlelit tables along the banquette",
      },
    ],
    reviews: [
      {
        quote:
          "The ambiance at Downtown is breathtaking. Truffle risotto is an absolute must-try.",
        author: "Sarah M. · Verified diner",
        score: "5.0",
      },
      {
        quote:
          "Asked for the window and got exactly that. Quiet enough for a real conversation.",
        author: "Jonah P. · Verified diner",
        score: "4.8",
      },
      {
        quote:
          "The grand round handled six of us without anyone shouting across the table.",
        author: "Amelia K. · Verified diner",
        score: "5.0",
      },
    ],
    tables: [
      table({
        id: "dt-window-1",
        name: "Mercer Window",
        seats: 2,
        zone: "Window",
        shape: "rect",
        x: 92,
        y: 118,
        w: 76,
        h: 36,
        status: "open",
        photo: photo("photo-1414235077428-338989a2e8c0"),
        photoAlt: "A two-top set beside tall dining-room windows",
        note: "Two seats on the Mercer Street glass, with the room behind you.",
        perks: ["Street view", "Window light", "Quiet"],
      }),
      table({
        id: "dt-window-2",
        name: "Mercer Window",
        seats: 2,
        zone: "Window",
        shape: "rect",
        x: 188,
        y: 118,
        w: 76,
        h: 36,
        status: "held",
        photo: photo("photo-1466978913421-dad2ebd01d17"),
        photoAlt: "Window table with glassware and a low candle",
        note: "The center window. Already held for this evening.",
        perks: ["Street view", "Window light"],
      }),
      table({
        id: "dt-window-3",
        name: "Corner Window",
        seats: 2,
        zone: "Window",
        shape: "rect",
        x: 300,
        y: 118,
        w: 76,
        h: 36,
        status: "held",
        photo: photo("photo-1424847651672-bf20a4b0982b"),
        photoAlt: "Corner table dressed in white linen",
        note: "The corner pane. Booked, but you can still see the seat.",
        perks: ["Street view", "Quiet"],
      }),
      table({
        id: "dt-grand",
        name: "Grand Round",
        seats: 6,
        zone: "Dining room",
        shape: "round",
        x: 148,
        y: 258,
        w: 90,
        h: 90,
        status: "open",
        photo: photo("photo-1555396273-367ea4eb4db5"),
        photoAlt: "A large round table in the center of a dining room",
        note: "The round in the middle of the room. Best when six people actually want to talk.",
        perks: ["Celebration", "Dining room"],
      }),
      table({
        id: "dt-garden",
        name: "Garden Round",
        seats: 4,
        zone: "Dining room",
        shape: "round",
        x: 292,
        y: 272,
        w: 64,
        h: 64,
        status: "held",
        photo: photo("photo-1600891964599-f61ba0e24092"),
        photoAlt: "Four-top with a shared plate in the center",
        note: "A four-top nearer the kitchen pass. Held tonight.",
        perks: ["Dining room"],
      }),
      table({
        id: "dt-booth-1",
        name: "Velvet Booth",
        seats: 4,
        zone: "Banquette",
        shape: "booth",
        x: 108,
        y: 418,
        w: 120,
        h: 78,
        status: "open",
        photo: photo("photo-1514933651103-005eec06c04b"),
        photoAlt: "A high-backed booth in warm, low light",
        note: "High back, softer noise. Four people fit without crowding.",
        perks: ["Velvet booth", "Quiet"],
      }),
      table({
        id: "dt-booth-2",
        name: "Velvet Booth",
        seats: 4,
        zone: "Banquette",
        shape: "booth",
        x: 108,
        y: 528,
        w: 120,
        h: 78,
        status: "held",
        photo: photo("photo-1470337458703-46ad1756a187"),
        photoAlt: "Banquette seating with cocktails on the table",
        note: "The second booth, closer to the terrace line. Already booked.",
        perks: ["Velvet booth"],
      }),
      table({
        id: "dt-chef",
        name: "Chef's Counter",
        seats: 4,
        zone: "Kitchen pass",
        shape: "rect",
        x: 300,
        y: 448,
        w: 132,
        h: 32,
        facing: "south",
        status: "held",
        photo: photo("photo-1551218808-94e220e084d2"),
        photoAlt: "Counter seats looking into an open kitchen",
        note: "Four stools facing the pass. You watch the plates leave the kitchen.",
        perks: ["Chef's counter"],
      }),
      table({
        id: "dt-terrace",
        name: "Terrace Four",
        seats: 4,
        zone: "Terrace",
        shape: "round",
        x: 268,
        y: 632,
        w: 58,
        h: 58,
        status: "open",
        photo: photo("photo-1559339352-11d035aa65de"),
        photoAlt: "A round terrace table set for four",
        note: "Just past the terrace line. A little more air than the main room.",
        perks: ["Terrace", "Window light"],
      }),
    ],
  },
  {
    id: "midtown",
    name: "Midtown",
    short: "Midtown Branch",
    address: "420 Park Avenue",
    area: "Cocktail lounge and booth seating",
    rating: "4.7",
    reviewCount: "310 reviews",
    slots: ["7:00 PM", "8:45 PM"],
    gallery: [
      {
        src: photo("photo-1514933651103-005eec06c04b", 900),
        alt: "Midtown cocktail lounge",
      },
      {
        src: photo("photo-1560624052-449f5ddf0c31", 900),
        alt: "Cozy booth seating at Midtown",
      },
    ],
    reviews: [
      {
        quote:
          "Great cocktail lounge and cozy booth seating. Perfect for celebrations.",
        author: "David R. · Verified diner",
        score: "4.8",
      },
      {
        quote: "The lamp tables are genuinely for two. We didn’t feel parked in a hallway.",
        author: "Priya S. · Verified diner",
        score: "4.6",
      },
    ],
    tables: [
      table({
        id: "mt-booth-a",
        name: "Cocktail Booth",
        seats: 4,
        zone: "Lounge",
        shape: "booth",
        x: 118,
        y: 168,
        w: 132,
        h: 86,
        status: "open",
        photo: photo("photo-1514362545857-3bc16c4c7d1b"),
        photoAlt: "A lounge booth with cocktails",
        note: "The corner booth. Low light, easy to linger, fits four.",
        perks: ["Velvet booth", "Cocktails", "Quiet"],
      }),
      table({
        id: "mt-booth-b",
        name: "Lounge Booth",
        seats: 4,
        zone: "Lounge",
        shape: "booth",
        x: 118,
        y: 300,
        w: 132,
        h: 86,
        status: "held",
        photo: photo("photo-1560624052-449f5ddf0c31"),
        photoAlt: "A dim booth along the lounge wall",
        note: "Middle booth, already reserved.",
        perks: ["Velvet booth", "Cocktails"],
      }),
      table({
        id: "mt-booth-c",
        name: "Two-Seat Booth",
        seats: 2,
        zone: "Lounge",
        shape: "booth",
        x: 112,
        y: 425,
        w: 112,
        h: 72,
        status: "held",
        photo: photo("photo-1521017432531-fbd92d768814"),
        photoAlt: "An intimate two-seat booth",
        note: "A narrower booth for two. Held this evening.",
        perks: ["Quiet", "Cocktails"],
      }),
      table({
        id: "mt-lamp",
        name: "Lamp Round",
        seats: 2,
        zone: "Lounge",
        shape: "round",
        x: 278,
        y: 175,
        w: 52,
        h: 52,
        status: "open",
        photo: photo("photo-1544148103-0773bf10d330"),
        photoAlt: "A small round table under warm light",
        note: "A small round under the lamp. Made for two.",
        perks: ["Quiet", "Intimate"],
      }),
      table({
        id: "mt-center",
        name: "Center Four",
        seats: 4,
        zone: "Lounge",
        shape: "round",
        x: 275,
        y: 325,
        w: 68,
        h: 68,
        status: "held",
        photo: photo("photo-1498654896293-37aacf113fd9"),
        photoAlt: "A four-person table in a restaurant lounge",
        note: "The center four-top. Booked.",
        perks: ["Celebration"],
      }),
      table({
        id: "mt-lounge",
        name: "Lounge Four",
        seats: 4,
        zone: "Lounge",
        shape: "round",
        x: 275,
        y: 475,
        w: 68,
        h: 68,
        status: "held",
        photo: photo("photo-1533777857889-4be7c70b33f7"),
        photoAlt: "Round dining table with ambient restaurant lighting",
        note: "Closer to the bar. Already held.",
        perks: ["Cocktails"],
      }),
      table({
        id: "mt-bar",
        name: "Bar Two-Top",
        seats: 2,
        zone: "Bar",
        shape: "rect",
        x: 268,
        y: 610,
        w: 74,
        h: 34,
        status: "held",
        photo: photo("photo-1470337458703-46ad1756a187"),
        photoAlt: "A small table beside the bar",
        note: "Right by the bar rail. Held tonight.",
        perks: ["Cocktails"],
      }),
    ],
  },
  {
    id: "harbor",
    name: "Harbor Bay",
    short: "Harbor Bay Branch",
    address: "9 Pier Walk",
    area: "Waterfront dining room",
    rating: "4.8",
    reviewCount: "280 reviews",
    slots: ["6:00 PM", "6:45 PM", "8:00 PM", "9:15 PM"],
    gallery: [
      {
        src: photo("photo-1537047902294-62a40c20a6ae", 900),
        alt: "Harbor dining room at sunset",
      },
      {
        src: photo("photo-1578474846511-04ba529f0b88", 900),
        alt: "Waterfront tables set for dinner",
      },
    ],
    reviews: [
      {
        quote:
          "Sunset over the water, fresh seafood, and a wine list that doesn’t try too hard.",
        author: "Elena T. · Verified diner",
        score: "4.9",
      },
      {
        quote: "Sit on the water side if you can. The pier four-top is the one we rebook.",
        author: "Chris L. · Verified diner",
        score: "4.7",
      },
    ],
    tables: [
      table({
        id: "hb-water-1",
        name: "Water Two-Top",
        seats: 2,
        zone: "Waterfront",
        shape: "round",
        x: 72,
        y: 148,
        w: 50,
        h: 50,
        status: "open",
        photo: photo("photo-1537047902294-62a40c20a6ae"),
        photoAlt: "A two-top facing the water at sunset",
        note: "First table on the water. Two seats, full window.",
        perks: ["Waterfront", "Sunset view", "Quiet"],
      }),
      table({
        id: "hb-water-2",
        name: "Water Two-Top",
        seats: 2,
        zone: "Waterfront",
        shape: "round",
        x: 178,
        y: 148,
        w: 50,
        h: 50,
        status: "open",
        photo: photo("photo-1578474846511-04ba529f0b88"),
        photoAlt: "Waterfront dinner table set for two",
        note: "Center water table. Same view, a step in from the corner.",
        perks: ["Waterfront", "Sunset view"],
      }),
      table({
        id: "hb-water-3",
        name: "Water Four",
        seats: 4,
        zone: "Waterfront",
        shape: "round",
        x: 305,
        y: 158,
        w: 64,
        h: 64,
        status: "open",
        photo: photo("photo-1559329007-40df8a9345d8"),
        photoAlt: "A four-top beside a bright restaurant window",
        note: "Four on the water. The wide one at the end of the glass.",
        perks: ["Waterfront", "Celebration"],
      }),
      table({
        id: "hb-sunset",
        name: "Sunset Round",
        seats: 6,
        zone: "Dining room",
        shape: "round",
        x: 150,
        y: 305,
        w: 88,
        h: 88,
        status: "open",
        photo: photo("photo-1592861956120-e524fc739696"),
        photoAlt: "A large round table set for a group dinner",
        note: "Six seats, one table, the last of the sunset still in the glass.",
        perks: ["Celebration", "Sunset view"],
      }),
      table({
        id: "hb-room",
        name: "Room Four",
        seats: 4,
        zone: "Dining room",
        shape: "rect",
        x: 305,
        y: 310,
        w: 104,
        h: 40,
        status: "held",
        photo: photo("photo-1544148103-0773bf10d330"),
        photoAlt: "A rectangular four-top in the dining room",
        note: "Inland four-top. Already booked.",
        perks: ["Dining room"],
      }),
      table({
        id: "hb-booth-1",
        name: "Pier Booth",
        seats: 4,
        zone: "Banquette",
        shape: "booth",
        x: 112,
        y: 470,
        w: 124,
        h: 80,
        status: "held",
        photo: photo("photo-1514933651103-005eec06c04b"),
        photoAlt: "Booth seating away from the windows",
        note: "Quieter booth off the water. Held.",
        perks: ["Velvet booth", "Quiet"],
      }),
      table({
        id: "hb-pier",
        name: "Pier Four",
        seats: 4,
        zone: "Waterfront",
        shape: "round",
        x: 292,
        y: 500,
        w: 64,
        h: 64,
        status: "open",
        photo: photo("photo-1550966871-3ed3cdb5ed0c"),
        photoAlt: "A four-person table with evening light",
        note: "The table regulars rebook. Four seats, still near the glass.",
        perks: ["Waterfront", "Sunset view"],
      }),
      table({
        id: "hb-booth-2",
        name: "Pier Booth",
        seats: 4,
        zone: "Banquette",
        shape: "booth",
        x: 112,
        y: 590,
        w: 124,
        h: 80,
        status: "held",
        photo: photo("photo-1525610553991-2bede1a236e2"),
        photoAlt: "A second booth deeper in the room",
        note: "Far booth, nearer the door. Booked.",
        perks: ["Velvet booth"],
      }),
      table({
        id: "hb-door",
        name: "Door Two-Top",
        seats: 2,
        zone: "Entrance",
        shape: "rect",
        x: 292,
        y: 630,
        w: 72,
        h: 34,
        status: "held",
        photo: photo("photo-1521017432531-fbd92d768814"),
        photoAlt: "A small table near the entrance",
        note: "Closest to the door. Held, and a bit busier.",
        perks: ["Dining room"],
      }),
    ],
  },
];

export function getBranch(id: string) {
  return branches.find((branch) => branch.id === id) ?? branches[0];
}

export function openTables(branch: Branch, guests = 1) {
  return branch.tables.filter(
    (table) => table.status === "open" && table.seats >= guests,
  );
}
