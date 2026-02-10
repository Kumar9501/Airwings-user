import baliBg from "@/assets/destination-bali.jpg";
import santoriniBg from "@/assets/destination-santorini.jpg";
import dubaiBg from "@/assets/destination-dubai.jpg";
import maldivesBg from "@/assets/destination-maldives.jpg";

export interface Package {
  id: string;
  title: string;
  location: string;
  country: string;
  duration: string;
  price: number;
  image: string;
  rating: number;
  tag?: string;
  slots?: number;
  description: string;
  inclusions: string[];
  featured: boolean;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  packageCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
  trip: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Mock Packages Data
export const packages: Package[] = [
  {
    id: "1",
    title: "Magical Bali Experience",
    location: "Bali",
    country: "Indonesia",
    duration: "7 Days / 6 Nights",
    price: 4999,
    image: baliBg,
    rating: 4.9,
    tag: "Open Trip",
    slots: 4,
    description: "Experience the magic of Bali with our curated tour package featuring temples, rice terraces, and stunning beaches.",
    inclusions: ["Hotel Accommodation", "Daily Breakfast", "Private Transport", "Tour Guide", "Temple Visits", "Beach Activities"],
    featured: true,
  },
  {
    id: "2",
    title: "Santorini Dream Escape",
    location: "Santorini",
    country: "Greece",
    duration: "5 Days / 4 Nights",
    price: 7999,
    image: santoriniBg,
    rating: 4.8,
    tag: "Private",
    description: "Discover the romantic beauty of Santorini with white-washed buildings and stunning sunsets over the Aegean Sea.",
    inclusions: ["Luxury Hotel", "All Meals", "Wine Tasting", "Sunset Cruise", "Photography Tour"],
    featured: true,
  },
  {
    id: "3",
    title: "Dubai Luxury Adventure",
    location: "Dubai",
    country: "UAE",
    duration: "4 Days / 3 Nights",
    price: 3499,
    image: dubaiBg,
    rating: 4.7,
    tag: "Limited Seats",
    slots: 2,
    description: "Experience the glamour of Dubai with desert safaris, luxury shopping, and iconic landmarks.",
    inclusions: ["5-Star Hotel", "Desert Safari", "Burj Khalifa Access", "Dubai Mall Tour", "Creek Cruise"],
    featured: true,
  },
  {
    id: "4",
    title: "Maldives Paradise Retreat",
    location: "Maldives",
    country: "Maldives",
    duration: "6 Days / 5 Nights",
    price: 12999,
    image: maldivesBg,
    rating: 5.0,
    tag: "Premium",
    description: "Ultimate luxury in the Maldives with overwater villas, crystal-clear waters, and world-class service.",
    inclusions: ["Overwater Villa", "All-Inclusive Meals", "Spa Treatment", "Snorkeling", "Private Beach Dinner"],
    featured: true,
  },
  {
    id: "5",
    title: "Bali Cultural Journey",
    location: "Ubud, Bali",
    country: "Indonesia",
    duration: "5 Days / 4 Nights",
    price: 3299,
    image: baliBg,
    rating: 4.6,
    tag: "Open Trip",
    slots: 8,
    description: "Deep dive into Balinese culture with temple ceremonies, traditional arts, and local cuisine.",
    inclusions: ["Boutique Hotel", "Cooking Class", "Art Workshop", "Temple Tours", "Local Guide"],
    featured: false,
  },
  {
    id: "6",
    title: "Greek Island Hopping",
    location: "Athens & Islands",
    country: "Greece",
    duration: "10 Days / 9 Nights",
    price: 11999,
    image: santoriniBg,
    rating: 4.9,
    description: "Explore multiple Greek islands including Santorini, Mykonos, and Athens.",
    inclusions: ["Island Hotels", "Ferry Transfers", "Guided Tours", "Traditional Meals", "Beach Access"],
    featured: false,
  },
];

// Mock Destinations Data
export const destinations: Destination[] = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: baliBg,
    packageCount: 12,
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image: santoriniBg,
    packageCount: 8,
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    image: dubaiBg,
    packageCount: 15,
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    image: maldivesBg,
    packageCount: 6,
  },
];

// Mock Testimonials Data
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Dubai, UAE",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content: "An absolutely incredible experience! Travel Air Wing organized everything perfectly. From the moment we landed to our departure, every detail was taken care of. Will definitely book again!",
    trip: "Bali Adventure Package",
  },
  {
    id: "2",
    name: "Ahmed Al Maktoum",
    location: "Abu Dhabi, UAE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content: "The best travel agency I've ever worked with. Their attention to detail and personalized service made our family vacation unforgettable. The Maldives trip was pure luxury!",
    trip: "Maldives Luxury Retreat",
  },
  {
    id: "3",
    name: "Emily Chen",
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content: "I was amazed by the level of service and the beautiful destinations they curated for us. The Greece tour exceeded all expectations. Thank you, Travel Air Wing!",
    trip: "Santorini Dream Escape",
  },
];

// Services Data
export const services = [
  {
    id: "visa",
    title: "Visa Services",
    description: "Hassle-free visa processing for all destinations. We handle the paperwork so you can focus on your trip.",
    icon: "FileCheck",
  },
  {
    id: "tours",
    title: "Tour Packages",
    description: "Curated travel packages with the best experiences, accommodations, and local guides.",
    icon: "Map",
  },
  {
    id: "custom",
    title: "Custom Trips",
    description: "Personalized itineraries tailored to your preferences, budget, and travel style.",
    icon: "Sparkles",
  },
  {
    id: "group",
    title: "Group Tours",
    description: "Join fellow travelers on exciting group adventures with shared experiences.",
    icon: "Users",
  },
  {
    id: "hotels",
    title: "Hotel Booking",
    description: "Access to premium hotels and resorts worldwide at competitive prices.",
    icon: "Building",
  },
  {
    id: "flights",
    title: "Flight Booking",
    description: "Best flight deals and seamless booking for your travel needs.",
    icon: "Plane",
  },
];

// Hero Content
export const heroContent = {
  title: "Travel",
  subtitle: "with intention",
  description: "Discover retreats, active adventures, and boutique stays all in one place.",
  stats: [
    { label: "Happy Travelers", value: "5K+" },
    { label: "Destinations", value: "50+" },
    { label: "Years Experience", value: "10+" },
  ],
};

// About Content
export const aboutContent = {
  title: "Not Your Boring Travel Agent",
  subtitle: "We plan chill, curated trips with good vibes and better experiences.",
  story: `Travel Air Wing was born from a passion for authentic travel experiences. 
  Founded in Dubai, we've been crafting unforgettable journeys for over a decade, 
  connecting travelers with the world's most breathtaking destinations.`,
  mission: "To transform travel from a routine trip into a life-changing adventure, ensuring every journey is filled with wonder, comfort, and unforgettable memories.",
  vision: "To be the most trusted travel partner in the region, known for exceptional service, innovative experiences, and a deep commitment to sustainable tourism.",
  values: [
    "Excellence in every detail",
    "Authentic cultural experiences",
    "Sustainable travel practices",
    "Customer-first approach",
  ],
};
