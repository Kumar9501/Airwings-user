import { motion } from "framer-motion";
import { FileCheck, Map, Sparkles, Users, Building, Plane, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceCard from "@/components/cards/ServiceCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-landscape.jpg";
import baliImage from "@/assets/destination-bali.jpg";
import santoriniImage from "@/assets/destination-santorini.jpg";
import dubaiImage from "@/assets/destination-dubai.jpg";
import maldivesImage from "@/assets/destination-maldives.jpg";

const iconMap: Record<string, any> = {
  FileCheck,
  Map,
  Sparkles,
  Users,
  Building,
  Plane,
};

const services = [
  {
    icon: FileCheck,
    title: "Visa Services",
    description: "Hassle-free visa processing for all destinations. We handle the paperwork so you can focus on your trip.",
  },
  {
    icon: Map,
    title: "Tour Packages",
    description: "Curated travel packages with the best experiences, accommodations, and local guides.",
  },
  {
    icon: Sparkles,
    title: "Custom Trips",
    description: "Personalized itineraries tailored to your preferences, budget, and travel style.",
  },
  {
    icon: Users,
    title: "Group Tours",
    description: "Join fellow travelers on exciting group adventures with shared experiences.",
  },
  {
    icon: Building,
    title: "Hotel Booking",
    description: "Access to premium hotels and resorts worldwide at competitive prices.",
  },
  {
    icon: Plane,
    title: "Flight Booking",
    description: "Best flight deals and seamless booking for your travel needs.",
  },
];

const galleryImages = [
  { src: baliImage, alt: "Bali Rice Terraces" },
  { src: santoriniImage, alt: "Santorini Greece" },
  { src: dubaiImage, alt: "Dubai Skyline" },
  { src: maldivesImage, alt: "Maldives Paradise" },
  { src: heroImage, alt: "Mongolia Yurt Camp" },
  { src: baliImage, alt: "Bali Temple" },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Travel Services"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="tag-accent mb-4 inline-block">Our Services</span>
            <h1 className="heading-display text-foreground mb-6">
              What We Offer
            </h1>
            <p className="text-xl text-muted-foreground">
              From visa processing to luxury tours, we've got everything you need for an 
              unforgettable travel experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="tag-primary mb-4 inline-block"
            >
              How It Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-section text-foreground"
            >
              Book Your Trip in 4 Easy Steps
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Choose Destination", desc: "Browse our packages or tell us where you want to go" },
              { step: "02", title: "Customize Trip", desc: "Work with our team to personalize your itinerary" },
              { step: "03", title: "Confirm Booking", desc: "Review details, make payment, and get ready to travel" },
              { step: "04", title: "Enjoy Journey", desc: "Experience your dream vacation with 24/7 support" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 text-primary/30 h-6 w-6" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="tag-accent mb-4 inline-block"
            >
              📸 Photo Gallery
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-section text-foreground"
            >
              Moments from Our Trips
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl group ${
                  index === 0 || index === 5 ? "row-span-2" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover min-h-[200px] transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-gold">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-section text-dark mb-6"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-dark/80 mb-8 max-w-2xl mx-auto"
          >
            Contact us today and let our experts craft the perfect travel experience for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact">
              <Button size="lg" className="bg-dark hover:bg-dark/90 text-white">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
