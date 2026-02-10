import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  image: string;
  packageCount: number;
}

const DestinationCard = ({
  id,
  name,
  country,
  image,
  packageCount,
}: DestinationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-3xl overflow-hidden shadow-xl"
    >
      <Link to={`/packages?destination=${id}`} className="block">
        {/* Image with parallax effect */}
        <div className="aspect-[4/5] overflow-hidden">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>

        {/* Gradient Overlay with enhanced depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/80 transition-all duration-500" />

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={{ y: 10, opacity: 0.8 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-primary text-sm font-semibold mb-1 tracking-wider uppercase">
              {country}
            </p>
            <h3 className="text-white font-display text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
              {name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-white/80 text-sm font-medium">
                {packageCount} Packages
              </p>
              <motion.div
                className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30 group-hover:bg-primary group-hover:border-primary transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 45 }}
              >
                <ArrowUpRight className="h-5 w-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Animated border on hover */}
        <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-primary/40 transition-all duration-500" />
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
