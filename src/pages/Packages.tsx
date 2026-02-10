import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, ChevronDown, RefreshCw } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PackageCard from "@/components/cards/PackageCard";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { packages as mockPackages } from "@/data/mockData";
import heroImage from "@/assets/hero-landscape.jpg";

const Packages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const queryClient = useQueryClient();

  const { data: packagesData, isLoading, error, refetch, isError } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      try {
        console.log('🔄 Fetching packages from API...');
        const data = await api.getPackages();
        console.log('✅ Packages fetched from API:', data.length, 'packages');
        if (Array.isArray(data)) {
          console.log('✅ Data is valid array');
          return data;
        } else {
          console.warn('⚠️ API returned non-array data:', data);
          return [];
        }
      } catch (err: any) {
        console.error('❌ API call failed:', err);
        console.error('❌ Error type:', err?.constructor?.name);
        console.error('❌ Error message:', err?.message);
        throw err;
      }
    },
    staleTime: 0, // Always consider data stale, refetch on mount
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Always refetch on component mount
    retry: 2, // Retry twice on failure
    retryDelay: 1000, // Wait 1 second between retries
  });

  // Refetch packages every 30 seconds to catch new additions
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing packages...');
      refetch();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  // Determine which data to use
  // IMPORTANT: Only use mock data if API explicitly failed AND we have no data
  // If API returns empty array, use empty array (don't fallback to mock)
  const packages = useMemo(() => {
    if (packagesData !== undefined && packagesData !== null) {
      // API returned data (even if empty array)
      console.log('📦 Using API data:', packagesData.length, 'packages');
      if (packagesData.length === 0) {
        console.log('ℹ️ API returned empty array - no packages in database yet');
      }
      return packagesData;
    } else if (isError && packagesData === undefined) {
      // API failed and we have no data - use mock as fallback
      console.warn('⚠️ API failed, using mock data:', mockPackages.length, 'packages');
      console.warn('⚠️ Error details:', error);
      return mockPackages;
    } else {
      // Still loading or no data yet
      console.log('⏳ Loading packages...');
      return [];
    }
  }, [packagesData, isError, error]);

  // Get unique locations
  const locations = useMemo(() => {
    const locs = new Set(packages.map((pkg) => pkg.country));
    return Array.from(locs);
  }, [packages]);

  // Filter packages - only show active packages
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // Only show active packages
      if (pkg.isActive === false) return false;

      const matchesSearch =
        searchQuery === "" ||
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        selectedLocation === "" || pkg.country === selectedLocation;

      const matchesDuration =
        selectedDuration === "" ||
        (selectedDuration === "short" && (pkg.duration.includes("3") || pkg.duration.includes("4"))) ||
        (selectedDuration === "medium" && (pkg.duration.includes("5") || pkg.duration.includes("6") || pkg.duration.includes("7"))) ||
        (selectedDuration === "long" && parseInt(pkg.duration) >= 8);

      const matchesPrice =
        selectedPrice === "" ||
        (selectedPrice === "budget" && pkg.price < 4000) ||
        (selectedPrice === "mid" && pkg.price >= 4000 && pkg.price < 8000) ||
        (selectedPrice === "luxury" && pkg.price >= 8000);

      return matchesSearch && matchesLocation && matchesDuration && matchesPrice;
    });
  }, [packages, searchQuery, selectedLocation, selectedDuration, selectedPrice]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading packages...</div>
      </div>
    );
  }

  // Show warning banner if using mock data
  // Only show if we have an error AND no data was ever successfully fetched
  const isUsingMockData = isError && packagesData === undefined && !isLoading;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedDuration("");
    setSelectedPrice("");
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Packages"
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
            <span className="tag-primary mb-4 inline-block">🎯 Explore</span>
            <h1 className="heading-display text-foreground mb-6">
              Travel Packages
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover our handpicked collection of travel packages designed to create
              unforgettable experiences. All prices in AED.
            </p>
          </motion.div>
        </div>
      </section>

      {/* API Error Warning */}
      {isUsingMockData && (
        <section className="py-4 bg-yellow-500/10 border-b border-yellow-500/20">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                <div className="flex flex-col">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                    Cannot connect to API. Showing mock data.
                  </p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                    API URL: {import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}
                    {error && (
                      <span className="block mt-1">Error: {error.message}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log('Manual retry triggered');
                    refetch();
                  }}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Retry
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.open('http://localhost:3001/api/health', '_blank');
                  }}
                >
                  Test API
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters Section */}
      <section className="py-8 bg-muted border-b border-border sticky top-20 z-30">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search packages..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-card border border-border text-foreground appearance-none focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="">All Destinations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Duration
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground appearance-none focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">Any Duration</option>
                  <option value="short">3-4 Days</option>
                  <option value="medium">5-7 Days</option>
                  <option value="long">8+ Days</option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Budget (AED)
                </label>
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground appearance-none focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">Any Price</option>
                  <option value="budget">Under 4,000</option>
                  <option value="mid">4,000 - 8,000</option>
                  <option value="luxury">8,000+</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button variant="ghost" onClick={clearFilters} className="w-full">
                  Clear All
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredPackages.length}</span> packages
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: ['packages'] });
                refetch();
              }}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Packages */}
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PackageCard {...pkg} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                No packages found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
