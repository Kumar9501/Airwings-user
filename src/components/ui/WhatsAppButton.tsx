import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/utils/whatsapp";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  floating?: boolean;
}

export default function WhatsAppButton({ message, className = "", floating = false }: WhatsAppButtonProps) {
  const buttonClasses = floating
    ? "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp hover:bg-whatsapp/90 text-white shadow-2xl hover:shadow-whatsapp/50 transition-all duration-300 flex items-center justify-center group"
    : `inline-flex items-center justify-center bg-whatsapp hover:bg-whatsapp/90 text-white transition-all duration-300 ${className}`;

  return (
    <motion.a
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className={floating ? "h-7 w-7" : "h-5 w-5"} />
      {floating && (
        <span className="absolute -top-12 right-0 bg-dark text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us
        </span>
      )}
    </motion.a>
  );
}
