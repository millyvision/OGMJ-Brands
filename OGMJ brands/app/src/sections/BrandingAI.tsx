import { useState } from 'react';
import { ArrowRight, Paintbrush, Cpu, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const brandingServices = [
  {
    id: 'branding',
    icon: <Paintbrush className="w-5 h-5" />,
    tag: 'Branding',
    title: 'Look Like a Pro',
    image: '/images/branding.jpg',
    features: [
      'Logo + identity packages',
      'Social media branding kit',
      'Website + landing pages',
    ],
    packages: [
      { name: 'Starter Package', price: '$299', includes: 'Logo, Business Card, Letterhead' },
      { name: 'Professional Package', price: '$599', includes: 'Full Brand Identity + Social Kit' },
      { name: 'Enterprise Package', price: '$1,299', includes: 'Complete Brand System + Guidelines' },
    ],
    buttonText: 'Build Your Brand',
  },
  {
    id: 'ai',
    icon: <Cpu className="w-5 h-5" />,
    tag: 'AI & Automation',
    title: 'Work Smarter',
    image: '/images/dashboard.jpg',
    features: [
      'AI content & captions',
      'Workflow automation',
      'Smart recommendations',
    ],
    packages: [
      { name: 'Content AI', price: '$99/mo', includes: 'AI-generated posts, captions, hashtags' },
      { name: 'Automation Suite', price: '$199/mo', includes: 'Auto-posting, scheduling, analytics' },
      { name: 'Full AI Stack', price: '$399/mo', includes: 'Complete AI + automation + support' },
    ],
    buttonText: 'Explore AI Tools',
  },
];

export default function BrandingAI() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  return (
    <section className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {brandingServices.map((service) => (
            <div key={service.id} className="group relative overflow-hidden rounded-2xl hover-lift">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lime">{service.icon}</span>
                  <span className="text-white/60 text-sm uppercase tracking-wider">{service.tag}</span>
                </div>
                <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">{service.title}</h3>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-white/70 text-sm flex items-center gap-2">
                      <span className="w-1 h-1 bg-lime rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="bg-lime text-black hover:bg-lime/90 font-semibold rounded-full group/btn"
                  onClick={() => handleServiceClick(service)}
                >
                  {service.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {selectedService && (
                <>
                  <span className="text-lime">{selectedService.icon}</span>
                  {selectedService.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Choose your package and let's get started.
            </DialogDescription>
          </DialogHeader>

          {selectedService && (
            <form className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Select Package</Label>
                <div className="grid gap-2">
                  {selectedService.packages.map((pkg: any, idx: number) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input type="radio" name="package" className="accent-lime" />
                        <div>
                          <span className="text-white text-sm block">{pkg.name}</span>
                          <span className="text-white/50 text-xs">{pkg.includes}</span>
                        </div>
                      </div>
                      <span className="text-lime font-medium">{pkg.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand-name">Brand/Business Name</Label>
                <Input
                  id="brand-name"
                  placeholder="Your brand name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Project Details</Label>
                <Textarea
                  id="details"
                  placeholder="Tell us about your project..."
                  rows={3}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
                />
              </div>

              <div className="pt-4 space-y-3">
                <Button className="w-full bg-lime text-black hover:bg-lime/90 font-semibold py-6 rounded-full">
                  <Check className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                <p className="text-white/40 text-xs text-center">
                  50% upfront payment required. Delivery in 5-10 business days.
                </p>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
