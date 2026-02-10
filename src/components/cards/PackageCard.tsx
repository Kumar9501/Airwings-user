import { motion } from "framer-motion";
import { MapPin, Clock, Star, MessageCircle, Sparkles } from "lucide-react";
import { getWhatsAppPackageUrl } from "@/utils/whatsapp";

export interface PackageCardProps {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  image: string;
  rating: number;
  tag?: string;
  slots?: number;
}

const PackageCard = ({
  id,
  title,
  location,
  duration,
  price,
  image,
  rating,
  tag,
  slots,
}: PackageCardProps) => {
  // Handle image URL - support both full URLs and relative paths
  const getImageUrl = () => {
    if (!image) return '/placeholder.svg';
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    // Relative path from backend uploads
    if (image.startsWith('/uploads/')) {
      return `http://localhost:3001${image}`;
    }
    return image;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5 }}
      className="group bg-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/50"
    >
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <motion.img
          src={getImageUrl()}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Decorative shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tags */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          {tag && (
            <motion.span 
              className="px-4 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-full shadow-lg flex items-center gap-1.5"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-3 w-3" />
              {tag}
            </motion.span>
          )}
          {slots && slots <= 5 && (
            <motion.span 
              className="px-4 py-1.5 text-xs font-bold bg-destructive text-destructive-foreground rounded-full shadow-lg animate-pulse"
              whileHover={{ scale: 1.05 }}
            >
              {slots} Slots Left
            </motion.span>
          )}
        </div>

        {/* Price Badge - Premium style */}
        <div className="absolute bottom-4 left-4">
          <div className="glass-dark rounded-xl px-4 py-2">
            <span className="text-xs text-white/70 uppercase tracking-wider">From</span>
            <p className="text-2xl font-bold text-white">
              AED <span className="text-primary">{price.toLocaleString()}</span>
            </p>
          </div>
        </div>

        {/* Rating - Premium style */}
        <motion.div 
          className="absolute bottom-4 right-4 flex items-center gap-1.5 glass-dark px-3 py-2 rounded-xl"
          whileHover={{ scale: 1.1 }}
        >
          <Star className="h-4 w-4 text-primary fill-primary" />
          <span className="text-white text-sm font-bold">{rating.toFixed(1)}</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-card-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-medium">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-medium">{duration}</span>
          </div>
        </div>

        <motion.a
          href={getWhatsAppPackageUrl(title)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl text-sm font-bold bg-whatsapp text-white hover:bg-whatsapp/90 transition-all duration-300 shadow-lg hover:shadow-whatsapp/25"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Enquire on WhatsApp
        </motion.a>
      </div>
    </motion.div>
  );
};

export default PackageCard;
