import { pexelsImage } from "@/lib/images";
import type { Product } from "@/types/product";

/**
 * The product catalog (demo data).
 *
 * Later this file can be replaced by a database or CMS. Components never read
 * this array directly: they go through the helpers in lib/products.ts, so only
 * that file needs to change when the data source does.
 */
export const products: Product[] = [

  // Clothing

  {
    id: "c1",
    slug: "tailored-wool-coat",
    name: "Tailored Wool Coat",
    category: "Clothing",
    price: 720000,
    image: pexelsImage(9428074),
    images: [
      pexelsImage(9428074),
      pexelsImage(25194063),
      pexelsImage(27869836),
    ],
    description:
      "A timeless tailored wool coat with a clean silhouette. Crafted from premium Italian wool for warmth and elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Camel", hex: "#C9B491" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Ivory", hex: "#F5EFE6" },
    ],
    badge: "New",
  },
  {
    id: "c2",
    slug: "silk-blouse",
    name: "Silk Blouse",
    category: "Clothing",
    price: 330000,
    image: pexelsImage(25194063),
    images: [
      pexelsImage(25194063),
      pexelsImage(15127334),
      pexelsImage(9428074),
    ],
    description:
      "Flowing silk blouse with a relaxed fit. Perfect for both office and evening wear.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Sand", hex: "#DCCBB2" },
    ],
  },
  {
    id: "c3",
    slug: "leather-trousers",
    name: "Leather Trousers",
    category: "Clothing",
    price: 525000,
    image: pexelsImage(7205905),
    images: [
      pexelsImage(7205905),
      pexelsImage(19319832),
      pexelsImage(39646826),
    ],
    description:
      "Sleek leather trousers with a modern cut. Soft lambskin leather with a comfortable stretch.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Espresso", hex: "#4A3B2C" },
    ],
  },
  {
    id: "c4",
    slug: "cashmere-knit-sweater",
    name: "Cashmere Knit Sweater",
    category: "Clothing",
    price: 435000,
    image: pexelsImage(19319832),
    images: [
      pexelsImage(19319832),
      pexelsImage(27869836),
      pexelsImage(9428074),
    ],
    description:
      "Luxuriously soft cashmere sweater with a relaxed crew neck. The ultimate in everyday comfort.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal", hex: "#EBE0D0" },
      { name: "Charcoal", hex: "#333333" },
      { name: "Sand", hex: "#DCCBB2" },
    ],
    badge: "Bestseller",
  },


  // Bags

  {
    id: "b1",
    slug: "structured-leather-tote",
    name: "Structured Leather Tote",
    category: "Bags",
    price: 885000,
    image: pexelsImage(8502484),
    images: [pexelsImage(8502484), pexelsImage(20380733), pexelsImage(6650009)],
    description:
      "A structured tote in full-grain leather. Spacious interior with a laptop sleeve and magnetic closure.",
    sizes: ["One Size"],
    colors: [
      { name: "Cognac", hex: "#826847" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    badge: "New",
  },
  {
    id: "b2",
    slug: "chain-shoulder-bag",
    name: "Chain Shoulder Bag",
    category: "Bags",
    price: 630000,
    image: pexelsImage(6650000),
    images: [pexelsImage(6650000), pexelsImage(6650023), pexelsImage(23223834)],
    description:
      "Elegant shoulder bag with a gold chain strap. Compact yet roomy enough for essentials.",
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Cream", hex: "#F5EFE6" },
      { name: "Cognac", hex: "#826847" },
    ],
  },
  {
    id: "b3",
    slug: "mini-crossbody",
    name: "Mini Crossbody",
    category: "Bags",
    price: 465000,
    image: pexelsImage(20380733),
    images: [pexelsImage(20380733), pexelsImage(8502484), pexelsImage(6650003)],
    description:
      "A compact crossbody bag in smooth leather. The perfect companion for day-to-night transitions.",
    sizes: ["One Size"],
    colors: [
      { name: "Tan", hex: "#B89A6F" },
      { name: "Black", hex: "#1A1A1A" },
    ],
  },
  {
    id: "b4",
    slug: "quilted-evening-clutch",
    name: "Quilted Evening Clutch",
    category: "Bags",
    price: 420000,
    image: pexelsImage(23223834),
    images: [
      pexelsImage(23223834),
      pexelsImage(6650000),
      pexelsImage(21897309),
    ],
    description:
      "A quilted clutch with a delicate chain. Designed for the most special occasions.",
    sizes: ["One Size"],
    colors: [
      { name: "Champagne", hex: "#F5EFE6" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    badge: "Limited",
  },


  // Watches

  {
    id: "w1",
    slug: "automatic-steel-watch",
    name: "Automatic Steel Watch",
    category: "Watches",
    price: 127500,
    image: pexelsImage(3766111),
    images: [pexelsImage(3766111), pexelsImage(8364556), pexelsImage(33511755)],
    description:
      "Swiss automatic movement housed in a brushed steel case. Sapphire crystal with a sunburst dial.",
    sizes: ["38mm", "40mm", "42mm"],
    colors: [
      { name: "Steel", hex: "#B8B8B8" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    badge: "New",
  },
  {
    id: "w2",
    slug: "leather-strap-classic",
    name: "Leather Strap Classic",
    category: "Watches",
    price: 780000,
    image: pexelsImage(1697218),
    images: [pexelsImage(1697218), pexelsImage(8364556), pexelsImage(3766111)],
    description:
      "A timeless dress watch with a genuine leather strap. Minimal dial with slim hands.",
    sizes: ["36mm", "40mm"],
    colors: [
      { name: "Brown", hex: "#65513A" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    badge: "Bestseller",
  },
  {
    id: "w3",
    slug: "all-black-minimal",
    name: "All-Black Minimal",
    category: "Watches",
    price: 960000,
    image: pexelsImage(31049999),
    images: [
      pexelsImage(31049999),
      pexelsImage(25682459),
      pexelsImage(22032446),
    ],
    description:
      "An all-black timepiece with a matte finish. Stealth design for the modern individual.",
    sizes: ["40mm", "42mm"],
    colors: [{ name: "Black", hex: "#1A1A1A" }],
  },
  {
    id: "w4",
    slug: "gold-accent-heritage",
    name: "Gold Accent Heritage",
    category: "Watches",
    price: 108000,
    image: pexelsImage(10436602),
    images: [
      pexelsImage(10436602),
      pexelsImage(8364556),
      pexelsImage(33511755),
    ],
    description:
      "A heritage piece with gold-tone accents and a textured dial. A statement of quiet luxury.",
    sizes: ["38mm", "40mm"],
    colors: [
      { name: "Gold", hex: "#C9B491" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    badge: "Limited",
  },
];
