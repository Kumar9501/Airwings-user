import { motion } from "framer-motion";
import { Play, MapPin } from "lucide-react";
import { useState } from "react";

// Import Dubai videos
import burjKhalifaVideo from "@/assets/videos/burj-khalifa.mp4";
import palmJumeirahVideo from "@/assets/videos/palm-jumeirah.mp4";
import burjAlArabVideo from "@/assets/videos/burj-al-arab.mp4";
import dubaiMarinaVideo from "@/assets/videos/dubai-marina.mp4";

interface Landmark {
  id: string;
  name: string;
  description: string;
  video: string;
}

const landmarks: Landmark[] = [
  {
    id: "burj-khalifa",
    name: "Burj Khalifa",
    description: "World's tallest building",
    video: burjKhalifaVideo,
  },
  {
    id: "palm-jumeirah",
    name: "Palm Jumeirah",
    description: "Iconic man-made island",
    video: palmJumeirahVideo,
  },
  {
    id: "burj-al-arab",
    name: "Burj Al Arab",
    description: "Luxury sail-shaped hotel",
    video: burjAlArabVideo,
  },
  {
    id: "dubai-marina",
    name: "Dubai Marina",
    description: "Stunning waterfront district",
    video: dubaiMarinaVideo,
  },
];

const DubaiShowcase = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-primary/15 text-primary border border-primary/20 mb-5"
          >
            <MapPin className="h-4 w-4" />
            Dubai Landmarks
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-section text-white mb-4"
          >
            Experience <span className="text-gradient-gold">Dubai</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Discover the iconic landmarks that make Dubai one of the world's most visited destinations
          </motion.p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {landmarks.map((landmark, index) => (
            <motion.div
              key={landmark.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative rounded-3xl overflow-hidden aspect-video cursor-pointer"
              onMouseEnter={() => setActiveVideo(landmark.id)}
              onMouseLeave={() => setActiveVideo(null)}
            >
              {/* Video */}
              <video
                src={landmark.video}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                autoPlay={activeVideo === landmark.id}
                ref={(el) => {
                  if (el) {
                    if (activeVideo === landmark.id) {
                      el.play().catch(() => {});
                    } else {
                      el.pause();
                      el.currentTime = 0;
                    }
                  }
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500" />

              {/* Play indicator */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: activeVideo === landmark.id ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-6 w-6 text-white ml-1" fill="white" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white font-display text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {landmark.name}
                  </h3>
                  <p className="text-white/70 text-sm font-medium">
                    {landmark.description}
                  </p>
                </motion.div>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-primary/50 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 text-sm">
            Hover over videos to play • Experience Dubai with Travel Air Wing
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DubaiShowcase;
