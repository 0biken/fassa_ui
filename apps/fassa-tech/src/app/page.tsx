import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/home/Hero";
import { Events } from "@/components/home/Events";
import { Updates } from "@/components/home/Updates";
import { QuickActions } from "@/components/home/QuickActions";

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Events />
      <Updates />
      <QuickActions />

      {/* Newsletter Section */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
            Stay in the loop
          </h2>
          <p className="text-white/80 text-sm mb-8 max-w-lg mx-auto">
            Get weekly updates, event reminders and exclusive content delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/15 border border-white/30 rounded-full px-5 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 transition-colors text-sm"
            />
            <button className="bg-white text-primary px-7 py-3 rounded-full font-bold text-sm hover:bg-white/90 transition-colors shadow-sm">
              Subscribe
            </button>
          </div>

          <p className="text-white/50 text-xs mt-4">
            We respect your privacy, unsubscribe anytime.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
