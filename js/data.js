/**
 * Zaverat — Central Data Store
 * Starter data arrays/objects for jewellery catalogue, artisans, reviews, and FAQs.
 */

window.ZAVERAT_DATA = {
  brand: {
    name: "Zaverat",
    tagline: "Handcrafted Heritage Jewellery",
    currency: "PKR"
  },

  products: [
    {
      id: "zv-001",
      name: "Mehrunisa Kundan Choker",
      category: "Necklaces",
      metal: "18k Gold Vermeil",
      gemstone: "Kundan & Polki Stones",
      material: "18k Gold Vermeil & Kundan Stones",
      price: 14500,
      rating: 4.9,
      reviewsCount: 42,
      inStock: true,
      artisanId: "art-01",
      badge: "Bestseller",
      image: "images/products/placeholder-necklace.svg",
      description: "Hand-set kundan choker crafted in Lahore using traditional foil-backing techniques and freshwater pearl drops."
    },
    {
      id: "zv-002",
      name: "Lahori Jhumka Drops",
      category: "Earrings",
      metal: "925 Silver",
      gemstone: "Freshwater Pearls",
      material: "925 Silver & Freshwater Pearls",
      price: 4800,
      rating: 4.8,
      reviewsCount: 37,
      inStock: true,
      artisanId: "art-02",
      badge: "Handmade",
      image: "images/products/placeholder-earrings.svg",
      description: "Lightweight bell-shaped sterling silver jhumkas finished with hand-strung pearl ghungroo drops."
    },
    {
      id: "zv-003",
      name: "Chitrali Filigree Cuff",
      category: "Cuffs & Bracelets",
      metal: "Antique Brass",
      gemstone: "Natural Turquoise",
      material: "Antique Brass & Natural Turquoise",
      price: 6200,
      rating: 4.7,
      reviewsCount: 24,
      inStock: true,
      artisanId: "art-03",
      badge: "Limited",
      image: "images/products/placeholder-cuff.svg",
      description: "Adjustable open hammered brass cuff featuring hand-twisted wire filigree and a turquoise cabochon centre."
    },
    {
      id: "zv-004",
      name: "Sufi Signet Ring",
      category: "Rings",
      metal: "925 Silver",
      gemstone: "Black Onyx",
      material: "925 Silver & Black Onyx",
      price: 3900,
      rating: 4.8,
      reviewsCount: 31,
      inStock: true,
      artisanId: "art-02",
      badge: "New",
      image: "images/products/placeholder-ring.svg",
      description: "Hand-engraved sterling silver signet band set with a matte black onyx stone and subtle gold bezel accents."
    },
    {
      id: "zv-005",
      name: "Swat Emerald Pendant Necklace",
      category: "Necklaces",
      metal: "18k Gold Vermeil",
      gemstone: "Swat Emerald",
      material: "18k Gold Vermeil & Swat Emerald",
      price: 12800,
      rating: 5.0,
      reviewsCount: 19,
      inStock: true,
      artisanId: "art-01",
      badge: "Heirloom",
      image: "images/products/swat-emerald-necklace.svg",
      description: "Faceted Swat valley emerald suspended from a fine 18k gold vermeil chain with delicate pearl side accents."
    },
    {
      id: "zv-006",
      name: "Pearl Elegance Haar",
      category: "Necklaces",
      metal: "18k Gold Vermeil",
      gemstone: "Freshwater Pearls",
      material: "18k Gold Vermeil & Freshwater Pearls",
      price: 7400,
      rating: 4.7,
      reviewsCount: 28,
      inStock: true,
      artisanId: "art-02",
      badge: "Classic",
      image: "images/products/pearl-elegance.svg",
      description: "Luminous freshwater pearls paired with a hand-formed gold vermeil filigree medallion and teardrop centre."
    },
    {
      id: "zv-007",
      name: "Multani Chandbali Earrings",
      category: "Earrings",
      metal: "Antique Brass",
      gemstone: "Carnelian & Pearls",
      material: "Antique Brass & Carnelian",
      price: 3600,
      rating: 4.6,
      reviewsCount: 22,
      inStock: true,
      artisanId: "art-03",
      badge: "Artisan Pick",
      image: "images/products/multani-chandbali.svg",
      description: "Crescent chandbali earrings cast in warm antique brass with carnelian cabochons and ivory pearl fringe."
    },
    {
      id: "zv-008",
      name: "Hunza Lapis Stack Bangle",
      category: "Cuffs & Bracelets",
      metal: "925 Silver",
      gemstone: "Lapis Lazuli",
      material: "925 Silver & Lapis Lazuli",
      price: 5400,
      rating: 4.9,
      reviewsCount: 16,
      inStock: false,
      artisanId: "art-02",
      badge: "Small Batch",
      image: "images/products/hunza-lapis-bangle.svg",
      description: "Hand-forged 925 silver bangle inlaid with deep ultramarine lapis lazuli stations speckled with natural pyrite."
    },
    {
      id: "zv-009",
      name: "Shalimar Ruby Kangan",
      category: "Cuffs & Bracelets",
      metal: "18k Gold Vermeil",
      gemstone: "Pigeon-Blood Ruby",
      material: "18k Gold Vermeil & Ruby",
      price: 11200,
      rating: 4.8,
      reviewsCount: 14,
      inStock: true,
      artisanId: "art-01",
      badge: "Signature",
      image: "images/products/shalimar-ruby-kangan.svg",
      description: "Traditional Mughal-inspired gold vermeil kangan adorned with oval ruby cabochons and fine gold granulation."
    },
    {
      id: "zv-010",
      name: "Ziarat Garnet Filigree Ring",
      category: "Rings",
      metal: "Antique Brass",
      gemstone: "Almandine Garnet",
      material: "Antique Brass & Almandine Garnet",
      price: 3200,
      rating: 4.5,
      reviewsCount: 18,
      inStock: true,
      artisanId: "art-03",
      badge: "Everyday",
      image: "images/products/ziarat-garnet-ring.svg",
      description: "Hand-pierced antique brass filigree crown ring showcasing a deep wine-red almandine garnet centrepiece."
    }
  ],

  artisans: [
    {
      id: "art-01",
      name: "Ustad Tariq Mahmood",
      craft: "Kundan & Meenakari Setting",
      city: "Lahore",
      experienceYears: 24,
      bio: "Third-generation goldsmith preserving hand-set kundan and enamel work.",
      image: "images/artisans/placeholder-artisan-1.jpg"
    },
    {
      id: "art-02",
      name: "Sadia Parveen",
      craft: "Sterling Silver Filigree",
      city: "Multan",
      experienceYears: 12,
      bio: "Specializes in delicate silver wirework and freshwater pearl accents.",
      image: "images/artisans/placeholder-artisan-2.jpg"
    },
    {
      id: "art-03",
      name: "Kamran Karim",
      craft: "Recycled Brass & Stonework",
      city: "Chitral",
      experienceYears: 15,
      bio: "Transforms reclaimed brass into hammered cuffs and natural gemstone pieces.",
      image: "images/artisans/placeholder-artisan-3.jpg"
    }
  ],

  reviews: [
    {
      id: "rev-001",
      productId: "zv-001",
      author: "Amina S.",
      rating: 5,
      date: "2026-10-18",
      comment: "Remarkable craftsmanship and comfortable weight for long wear."
    },
    {
      id: "rev-002",
      productId: "zv-002",
      author: "Zainab K.",
      rating: 5,
      date: "2026-11-02",
      comment: "The pearl finish on the jhumkas is gorgeous and packaging was eco-friendly."
    }
  ],

  faqs: [
    {
      id: "faq-01",
      category: "Orders & Shipping",
      question: "How long does it take to craft and deliver a handmade order?",
      answer: "In-stock pieces ship within 2 business days; custom-built pieces require 7–10 days of bench crafting."
    },
    {
      id: "faq-02",
      category: "Materials & Care",
      question: "How should I care for gold-plated brass and sterling silver jewellery?",
      answer: "Store pieces in dry anti-tarnish pouches away from perfumes, lotions, and direct humidity."
    },
    {
      id: "faq-03",
      category: "Sizing & Repairs",
      question: "Do you offer resizing or stone-setting repairs?",
      answer: "Yes, every Zaverat piece includes complimentary inspection and paid artisan repair services."
    }
  ]
};
