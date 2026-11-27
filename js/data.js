/**
 * LUMIÈRE HANDMADE JEWELLERY - DATA REPOSITORY
 * Introduction to Information and Communication Technologies - Fall 2026
 * Theme #6: Handmade Jewellery Store
 */

const LUMIERE_DATA = {
  // 1. Core Products Catalog
  products: [
    {
      id: "lum-01",
      name: "Pearl Elegance Necklace",
      category: "Necklaces",
      price: 2850,
      originalPrice: 3200,
      rating: 4.9,
      reviewCount: 42,
      inStock: true,
      stockCount: 8,
      isBestseller: true,
      metal: "18K Gold Vermeil",
      gemstone: "Freshwater Pearl",
      description: "Delicately strung baroque freshwater pearls accented with 18k gold vermeil wire wrapping. Each pearl is hand-selected by our master artisans.",
      specs: { length: "42 cm (adjustable to 46 cm)", clasp: "Hand-forged lobster claw", weight: "14 grams" },
      image: "images/products/pearl-elegance.svg",
      tags: ["pearl", "gold", "necklace", "classic"]
    },
    {
      id: "lum-02",
      name: "Golden Hoop Earrings",
      category: "Earrings",
      price: 1650,
      originalPrice: 1950,
      rating: 4.8,
      reviewCount: 38,
      inStock: true,
      stockCount: 15,
      isBestseller: true,
      metal: "18K Gold Vermeil",
      gemstone: "None",
      description: "Hammered texture lightweight circular hoops designed for timeless everyday wear. Hypoallergenic post.",
      specs: { diameter: "28 mm", closure: "Latch back", weight: "6 grams" },
      image: "images/products/golden-hoops.svg",
      tags: ["gold", "earrings", "minimalist"]
    },
    {
      id: "lum-03",
      name: "Swat Emerald Solitaire Ring",
      category: "Rings",
      price: 4500,
      originalPrice: 5200,
      rating: 5.0,
      reviewCount: 19,
      inStock: true,
      stockCount: 4,
      isBestseller: false,
      metal: "925 Sterling Silver",
      gemstone: "Swat Valley Emerald",
      description: "Ethically sourced natural Swat emerald set in hand-engraved recycled 925 sterling silver band with leaf filigree motif.",
      specs: { cut: "Cushion Cut (1.2 carat)", bandWidth: "2.4 mm", finish: "High Polish" },
      image: "images/products/emerald-ring.svg",
      tags: ["ring", "emerald", "silver", "pakistani"]
    },
    {
      id: "lum-04",
      name: "Moonstone Celestial Pendant",
      category: "Necklaces",
      price: 3100,
      originalPrice: 3500,
      rating: 4.7,
      reviewCount: 27,
      inStock: true,
      stockCount: 7,
      isBestseller: true,
      metal: "925 Sterling Silver",
      gemstone: "Rainbow Moonstone",
      description: "Iridescent blue-flash rainbow moonstone suspended in handcrafted crescent moon silver filigree.",
      specs: { stoneSize: "12x10 mm", chainLength: "45 cm", silverPurity: "92.5%" },
      image: "images/products/moonstone-pendant.svg",
      tags: ["moonstone", "silver", "necklace", "celestial"]
    },
    {
      id: "lum-05",
      name: "Artisan Twisted Cuff Bracelet",
      category: "Bracelets",
      price: 2400,
      originalPrice: 2800,
      rating: 4.9,
      reviewCount: 16,
      inStock: true,
      stockCount: 11,
      isBestseller: false,
      metal: "Antiqued Brass",
      gemstone: "None",
      description: "Hand-twisted dual-strand solid brass cuff bracelet with rounded comfort ends. Sealed with organic beeswax to preserve patina.",
      specs: { innerCircumference: "17 cm (flexible fit)", width: "6 mm", weight: "22 grams" },
      image: "images/products/brass-cuff.svg",
      tags: ["brass", "bracelet", "artisan", "cuff"]
    },
    {
      id: "lum-06",
      name: "Rose Quartz Botanical Drops",
      category: "Earrings",
      price: 1850,
      originalPrice: 2100,
      rating: 4.6,
      reviewCount: 22,
      inStock: true,
      stockCount: 12,
      isBestseller: false,
      metal: "Rose Gold Plated",
      gemstone: "Madagascar Rose Quartz",
      description: "Faceted pastel rose quartz droplets dangling beneath hand-stamped rose gold leaf charms.",
      specs: { dropLength: "35 mm", stoneShape: "Briolette", hook: "French Wire" },
      image: "images/products/rose-quartz-drops.svg",
      tags: ["quartz", "rose gold", "earrings", "floral"]
    },
    {
      id: "lum-07",
      name: "Kundan Heritage Choker Set",
      category: "Bridal",
      price: 9800,
      originalPrice: 12000,
      rating: 5.0,
      reviewCount: 11,
      inStock: true,
      stockCount: 3,
      isBestseller: true,
      metal: "24K Gold Plated Brass",
      gemstone: "Glass Kundan & Seed Pearls",
      description: "Imperial Rajasthani-style kundan choker with hanging cluster seed pearls and matching jhumkas.",
      specs: { includes: "Choker + Jhumkas + Maang Tikka", cord: "Adjustable silk dori", craftTime: "32 artisan hours" },
      image: "images/products/kundan-choker.svg",
      tags: ["bridal", "kundan", "choker", "traditional"]
    },
    {
      id: "lum-08",
      name: "Lapis Lazuli Raw Bar Bracelet",
      category: "Bracelets",
      price: 2250,
      originalPrice: 2600,
      rating: 4.8,
      reviewCount: 14,
      inStock: true,
      stockCount: 9,
      isBestseller: false,
      metal: "925 Sterling Silver",
      gemstone: "Badakhshan Lapis Lazuli",
      description: "Deep azure Badakhshan lapis lazuli beads with natural pyrite golden flecks linked on hand-hammered silver wire.",
      specs: { length: "18 cm + 3 cm extender", beadSize: "6 mm", closure: "Handmade S-hook" },
      image: "images/products/lapis-bracelet.svg",
      tags: ["lapis", "silver", "bracelet", "natural"]
    }
  ],

  // 2. Customer Reviews (Matching prototype: 4.6/5, 120 reviews)
  reviews: [
    {
      id: "rev-01",
      author: "Ayesha K.",
      rating: 5,
      date: "24 Nov 2026",
      verified: true,
      product: "Pearl Elegance Necklace",
      title: "Beautiful quality!",
      comment: "The necklace looks even prettier in person! The luster of the baroque pearls is breathtaking and the gold plating feels very durable. Perfectly packaged in a handmade linen pouch."
    },
    {
      id: "rev-02",
      author: "Sara M.",
      rating: 5,
      date: "21 Nov 2026",
      verified: true,
      product: "Golden Hoop Earrings",
      title: "Loved the earrings!",
      comment: "Very elegant and perfect for gifting. Extremely lightweight so my ears don't ache at all even after 8 hours of wear at university."
    },
    {
      id: "rev-03",
      author: "Hira Usman",
      rating: 4,
      date: "19 Nov 2026",
      verified: true,
      product: "Swat Emerald Solitaire Ring",
      title: "Stunning craftsmanship",
      comment: "The hand engraved band has such lovely detail. The emerald has a deep rich green shade. Delivered in 2 days to Lahore!"
    },
    {
      id: "rev-04",
      author: "Mariam Bilal",
      rating: 5,
      date: "15 Nov 2026",
      verified: true,
      product: "Moonstone Celestial Pendant",
      title: "Magical blue flash",
      comment: "I have received so many compliments on this pendant. You can tell it was handcrafted with authentic care rather than machine stamped."
    }
  ],

  // 3. FAQs (Matching prototype accordion categories)
  faqs: [
    {
      category: "Orders & Payments",
      question: "How can I place an order?",
      answer: "You can browse our collections, select your desired specifications (such as ring size or chain length), click 'Add to Cart', and proceed through our seamless multi-step checkout. We accept Cash on Delivery (COD) across Pakistan as well as secure Online Bank Transfer and Credit/Debit cards."
    },
    {
      category: "Orders & Payments",
      question: "What payment methods do you accept?",
      answer: "We support Cash on Delivery (COD) for all cities in Pakistan, Direct Bank Transfer (IBFT via 1Link), and major Credit/Debit Cards (Visa, MasterCard)."
    },
    {
      category: "Delivery & Shipping",
      question: "How long does shipping take and what are the charges?",
      answer: "Standard nationwide delivery takes 3 to 5 business days for Rs. 250. Express 24-48 hour courier delivery is available for Rs. 500. Orders above Rs. 3,000 enjoy 100% Free Shipping nationwide!"
    },
    {
      category: "Delivery & Shipping",
      question: "Can I track my parcel live?",
      answer: "Yes! As soon as your jewellery is handcrafted and dispatched, you will receive an SMS and email with an active tracking link. You can also enter your Order ID on our Track Order page."
    },
    {
      category: "Products & Jewellery Care",
      question: "Are your jewellery pieces hypoallergenic?",
      answer: "Yes, 100%. All our pieces are lead-free and nickel-free, made using genuine 925 sterling silver, brass sealed with organic coatings, and 18K gold vermeil that is gentle on sensitive skin."
    },
    {
      category: "Products & Jewellery Care",
      question: "How should I store and clean my handmade jewellery?",
      answer: "Store your pieces in the airtight linen pouch provided away from humidity and perfumes. To restore brilliance, gently buff with a soft microfiber jewellery cloth. Check our dedicated Jewellery Care & Repair page for full instructions."
    }
  ],

  // 4. Artisans Showcase
  artisans: [
    {
      name: "Ustad Tariq Mehmood",
      role: "Master Filigree Goldsmith",
      experience: "28 Years",
      location: "Lahore Heritage Quarter",
      bio: "Carrying forward a three-generation legacy of delicate wire filigree art, Ustad Tariq handcrafts our signature bridal pendants and intricate bezels.",
      specialty: "Pure Silver Filigree & Bezels"
    },
    {
      name: "Rabia Noor",
      role: "Lead Gemstone Lapidary & Setter",
      experience: "12 Years",
      location: "Peshawar Gemstone Bazaar",
      bio: "Graduated from the Pakistan Gems and Jewellery Development Company, Rabia selects and cuts our raw emeralds and moonstones with surgical precision.",
      specialty: "Prong Setting & Cabochons"
    },
    {
      name: "Daniyal Qureshi",
      role: "Metalsmith & Texture Artist",
      experience: "9 Years",
      location: "Islamabad Studio",
      bio: "Daniyal specializes in organic hammering, wax model carving, and cold-forging brass and copper statement pieces.",
      specialty: "Hammered Cuffs & Ring Bands"
    }
  ],

  // 5. Workshops & Masterclasses
  workshops: [
    {
      id: "ws-01",
      title: "Silversmithing 101: Hand-Forge Your Own Ring",
      date: "Saturday, 12th Dec 2026",
      time: "2:00 PM - 6:00 PM",
      instructor: "Daniyal Qureshi",
      location: "Lumière Studio, F-7 Markaz, Islamabad",
      fee: 4500,
      totalSeats: 8,
      seatsRemaining: 3,
      level: "Beginner Friendly",
      description: "Learn fundamental metal sawing, annealing with torch, hammering textures, and soldering your own sterling silver ring to take home."
    },
    {
      id: "ws-02",
      title: "Artisanal Pearl Stringing & Wire Wrapping",
      date: "Sunday, 20th Dec 2026",
      time: "3:00 PM - 6:30 PM",
      instructor: "Rabia Noor",
      location: "Lumière Studio, F-7 Markaz, Islamabad",
      fee: 3800,
      totalSeats: 10,
      seatsRemaining: 5,
      level: "All Levels",
      description: "Master traditional French silk knotting between pearls and elegant wire-wrapping loops for gemstones and earrings."
    }
  ],

  // 6. Gemstone Encyclopedia
  gemstones: [
    {
      name: "Emerald",
      origin: "Swat Valley, Pakistan",
      hardness: "7.5 - 8.0 Mohs",
      color: "Vibrant Forest Green",
      meaning: "Rebirth, wisdom, and eternal harmony",
      birthstone: "May",
      care: "Avoid ultrasonic cleaning; clean with mild soapy water."
    },
    {
      name: "Rainbow Moonstone",
      origin: "Balochistan / Sri Lanka",
      hardness: "6.0 - 6.5 Mohs",
      color: "Milky with Blue Adularescence",
      meaning: "Intuition, serenity, and new beginnings",
      birthstone: "June",
      care: "Sensitive to high heat and harsh chemicals."
    },
    {
      name: "Lapis Lazuli",
      origin: "Badakhshan Region",
      hardness: "5.0 - 5.5 Mohs",
      color: "Deep Celestial Blue with Pyrite Flecks",
      meaning: "Truth, royalty, and inner self-knowledge",
      birthstone: "September",
      care: "Porous stone; wipe dry immediately after damp cloth cleaning."
    },
    {
      name: "Rose Quartz",
      origin: "Skardu / Madagascar",
      hardness: "7.0 Mohs",
      color: "Translucent Soft Pink",
      meaning: "Unconditional love and emotional healing",
      birthstone: "October",
      care: "Very durable for everyday wear."
    }
  ]
};

// Global helper to resolve asset paths reliably regardless of current page location
function getAssetUrl(relPath) {
  if (!relPath) return "";
  if (relPath.startsWith("http") || relPath.startsWith("data:")) return relPath;
  var root = (typeof window !== "undefined" && window.LUMIERE_ROOT) ? window.LUMIERE_ROOT : "./";
  var clean = relPath.replace(/^(\.\.\/|\.\/)/, "");
  return root + clean;
}
