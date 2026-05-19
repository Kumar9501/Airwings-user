import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import heroImage from "@/assets/Dubai3.jpeg";

const fallbackBlogs = [
  {
    id: "dubai-guide",
    title: "A Simple Dubai Travel Guide for First-Time Visitors",
    excerpt:
      "Plan a smooth Dubai trip with ideas for city views, shopping, desert experiences, and relaxed family time.",
    createdAt: "2026-01-15",
    slug: "dubai-travel-guide",
  },
  {
    id: "visa-tips",
    title: "Visa and Travel Planning Tips",
    excerpt:
      "A practical checklist for documents, timing, bookings, and support before your next international trip.",
    createdAt: "2026-01-10",
    slug: "visa-and-travel-planning-tips",
  },
];

const Blog = () => {
  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => api.getBlogs(10, 0),
    retry: 1,
  });

  const blogs = data?.blogs?.length ? data.blogs : fallbackBlogs;

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Travel blog"
            className="w-full h-full object-cover opacity-25"
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
            <span className="tag-primary mb-4 inline-block">Travel Blog</span>
            <h1 className="heading-display text-foreground mb-6">Stories & Guides</h1>
            <p className="text-xl text-muted-foreground">
              Helpful travel notes, destination ideas, and planning tips from Air Wings.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 gap-6">
            {blogs.map((blog: any, index: number) => (
              <motion.article
                key={blog.id || blog.slug || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString("en-AE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Travel Guide"}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-card-foreground mb-3">
                  {blog.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {blog.excerpt || blog.summary || blog.description}
                </p>
                <Link to="/contact">
                  <Button variant="outline" className="group rounded-full px-6">
                    Plan This Trip
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
