import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Wallet, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    console.log({ destination, date, budget });
    // Navigate to packages with filters
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-card rounded-2xl shadow-2xl p-4 md:p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="relative">
          <label className="block text-xs font-medium text-muted-foreground mb-2">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where to?"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        {/* Date */}
        <div className="relative">
          <label className="block text-xs font-medium text-muted-foreground mb-2">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Select dates"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        {/* Budget */}
        <div className="relative">
          <label className="block text-xs font-medium text-muted-foreground mb-2">
            Budget (AED)
          </label>
          <div className="relative">
            <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-muted border-0 text-foreground appearance-none focus:ring-2 focus:ring-primary outline-none cursor-pointer"
            >
              <option value="">Select budget</option>
              <option value="0-2000">Under AED 2,000</option>
              <option value="2000-5000">AED 2,000 - 5,000</option>
              <option value="5000-10000">AED 5,000 - 10,000</option>
              <option value="10000+">AED 10,000+</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl"
          >
            <Search className="mr-2 h-5 w-5" />
            Explore
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;
