import { useState } from 'react';
import { ArrowRight, Globe, LayoutDashboard, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const countries = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Morocco',
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'UAE', 'India', 'Brazil', 'Singapore', 'China', 'Japan'
];

export default function GlobalDashboard() {
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  return (
    <section id="dashboard" className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Global Coverage Card */}
          <div className="group relative overflow-hidden rounded-2xl hover-lift">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/cta-bg.jpg"
                alt="Global Coverage"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-lime" />
                <span className="text-white/60 text-sm uppercase tracking-wider">Global Coverage</span>
              </div>
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">Worldwide Ready</h3>
              <ul className="space-y-2 mb-6">
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Multi-country guidance
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Local requirements mapped
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  One dashboard, many markets
                </li>
              </ul>
              <Button 
                className="bg-lime text-black hover:bg-lime/90 font-semibold rounded-full group/btn"
                onClick={() => setIsCountriesOpen(true)}
              >
                View Countries
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Dashboard Card */}
          <div className="group relative overflow-hidden rounded-2xl hover-lift">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/dashboard.jpg"
                alt="Dashboard"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-3">
                <LayoutDashboard className="w-5 h-5 text-lime" />
                <span className="text-white/60 text-sm uppercase tracking-wider">Dashboard</span>
              </div>
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">Track Everything</h3>
              <ul className="space-y-2 mb-6">
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Service progress at a glance
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Files, notes, and deadlines
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Renewal reminders
                </li>
              </ul>
              <Button 
                className="bg-lime text-black hover:bg-lime/90 font-semibold rounded-full group/btn"
                onClick={() => setIsDashboardOpen(true)}
              >
                See Dashboard
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Countries Dialog */}
      <Dialog open={isCountriesOpen} onOpenChange={setIsCountriesOpen}>
        <DialogContent className="bg-dark border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <Globe className="w-6 h-6 text-lime" />
              Countries We Serve
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Select your country to see available services.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {countries.map((country, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <MapPin className="w-4 h-4 text-lime" />
                  <span className="text-white text-sm">{country}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-white/40 text-xs text-center">
                Don't see your country? Contact us for custom solutions.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dashboard Dialog */}
      <Dialog open={isDashboardOpen} onOpenChange={setIsDashboardOpen}>
        <DialogContent className="bg-dark border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-lime" />
              Access Your Dashboard
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Sign in to track your services and manage your account.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="dashboard-email">Email Address</Label>
              <Input
                id="dashboard-email"
                type="email"
                placeholder="your@email.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            <div className="pt-4 space-y-3">
              <Button className="w-full bg-lime text-black hover:bg-lime/90 font-semibold py-6 rounded-full">
                <Check className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <div className="flex justify-between text-sm">
                <button type="button" className="text-lime hover:underline">Create Account</button>
                <button type="button" className="text-white/50 hover:text-white">Forgot Password?</button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
