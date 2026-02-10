import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export interface TestimonialCardProps {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
  trip: string;
}

const TestimonialCard = ({
  name,
  location,
  avatar,
  rating,
  content,
  trip,
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-3xl p-8 shadow-xl relative overflow-hidden border border-border/50 group"
    >
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
      
      {/* Quote Icon - Enhanced */}
      <motion.div 
        className="absolute top-6 right-6 text-primary/15"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ duration: 0.3 }}
      >
        <Quote className="h-16 w-16" />
      </motion.div>

      {/* Rating - Enhanced */}
      <div className="flex gap-1.5 mb-5">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <Star
              className={`h-5 w-5 ${
                i < rating 
                  ? "text-primary fill-primary drop-shadow-sm" 
                  : "text-muted/30"
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <p className="text-card-foreground/85 leading-relaxed mb-6 relative z-10 text-lg italic">
        "{content}"
      </p>

      {/* Trip Info - Enhanced */}
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 mb-5">
        <span className="text-sm text-muted-foreground">Trip:</span>
        <span className="text-sm text-primary font-semibold ml-2">{trip}</span>
      </div>

      {/* Author - Enhanced */}
      <div className="flex items-center gap-4">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={avatar}
            alt={name}
            className="w-14 h-14 rounded-full object-cover ring-3 ring-primary/20"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </motion.div>
        <div>
          <h4 className="font-bold text-card-foreground text-lg">{name}</h4>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
