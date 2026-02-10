import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/air-wings-logo.png";
import { getWhatsAppUrl } from "@/utils/whatsapp";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Packages", path: "/packages" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-header/95 backdrop-blur-sm">
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logoImage} 
              alt="AIR WINGS TOUR & TRAVEL" 
              className="h-10 w-auto object-contain"
              onError={(e) => {
                // Fallback to text if image fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="text-xl font-display font-bold text-header-foreground hidden sm:block">
              <span className="text-[#14B8A6]">AIR</span> <span className="text-header-foreground">WINGS</span>
              <span className="block text-xs font-normal text-header-foreground/70">TOUR & TRAVEL</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-header-foreground/80"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          {/* <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-header-foreground/80 hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Book Now
            </Button>
          </div> */}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-header-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 text-base font-medium ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-header-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href={getWhatsAppUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center w-full py-2 px-4 rounded-lg bg-whatsapp hover:bg-whatsapp/90 text-white transition-colors"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Us
              </a>
              {/* <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                Book Now
              </Button> */}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
