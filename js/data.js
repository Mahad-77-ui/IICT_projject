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
      price: 14500,
      material: "22k Gold-Plated Brass & Kundan Stones",
      artisanId: "art-01",
      badge: "Bestseller",
      image: "images/products/placeholder-necklace.jpg",
      description: "Hand-set kundan choker crafted using traditional foil-backing techniques.",
      inStock: true
    },
    {
      id: "zv-002",
      name: "Lahori Jhumka Drops",
      category: "Earrings",
      price: 4800,
      material: "925 Sterling Silver & Freshwater Pearls",
      artisanId: "art-02",
      badge: "Handmade",
      image: "images/products/placeholder-earrings.jpg",
      description: "Lightweight bell-shaped jhumkas finished with hand-strung pearl drops.",
      inStock: true
    },
    {
      id: "zv-003",
      name: "Chitrali Filigree Cuff",
      category: "Bracelets",
      price: 6200,
      material: "Hammered Recycled Brass & Turquoise",
      artisanId: "art-03",
      badge: "Limited",
      image: "images/products/placeholder-cuff.jpg",
      description: "Adjustable open cuff featuring hand-twisted wire filigree and a cabochon centre.",
      inStock: true
    },
    {
      id: "zv-004",
      name: "Sufi Signet Ring",
      category: "Rings",
      price: 3900,
      material: "925 Sterling Silver & Onyx",
      artisanId: "art-02",
      badge: "New",
      image: "images/products/placeholder-ring.jpg",
      description: "Hand-engraved sterling silver band set with a matte black onyx stone.",
      inStock: true
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
