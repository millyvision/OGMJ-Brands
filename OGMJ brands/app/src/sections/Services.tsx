import { useState } from 'react';
import { FileText, Briefcase, Palette, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const services = [
  {
    title: 'Documents & Certificates',
    description: 'Passports • IDs • Business certs • Verifications',
    image: '/images/documents-certs.jpg',
    offerings: [
      'International Passport Processing',
      'National ID Card Registration',
      'Business Certificate (CAC)',
      'Tax Identification Number (TIN)',
      'Driver\'s License Renewal',
      'Birth Certificate',
      'Marriage Certificate',
      'Educational Certificate Verification',
    ],
  },
  {
    title: 'Business',
    description: 'Launch & Compliance',
    image: '/images/business-launch.jpg',
    offerings: [
      'Company Registration (Ltd, PLC)',
      'Business Name Registration',
      'Trademark Registration',
      'Annual Returns Filing',
      'Business Plan Writing',
      'Market Research',
      'Compliance Documentation',
      'Investor Pitch Deck',
    ],
  },
  {
    title: 'Branding',
    description: 'Identity & Growth',
    image: '/images/branding.jpg',
    offerings: [
      'Logo Design (3 concepts)',
      'Brand Identity Package',
      'Business Card Design',
      'Letterhead & Stationery',
      'Social Media Kit',
      'Brand Guidelines',
      'Packaging Design',
      'Brand Strategy Consultation',
    ],
  },
];

const serviceIcons = [
  <FileText className="w-5 h-5" />,
  <Briefcase className="w-5 h-5" />,
  <Palette className="w-5 h-5" />,
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  return (
    <section id="services" className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">Services</h2>
          <p className="text-white/60 text-lg">Professional services to help you launch and grow</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(service)}
              className="group relative overflow-hidden rounded-2xl hover-lift cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lime">{serviceIcons[index]}</span>
                  <h3 className="text-white text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-white/60 text-sm">{service.description}</p>
                <div className="mt-4 flex items-center text-lime text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Services <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-lime/30 rounded-2xl transition-colors duration-300" />
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
                  <span className="text-lime">
                    {serviceIcons[services.findIndex(s => s.title === selectedService.title)]}
                  </span>
                  {selectedService.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Select the service you need and we'll get started right away.
            </DialogDescription>
          </DialogHeader>

          {selectedService && (
            <form className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Select Service Type</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark border-white/10">
                    {selectedService.offerings.map((offering: string, idx: number) => (
                      <SelectItem key={idx} value={offering} className="text-white hover:bg-white/10">
                        {offering}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 000 000 0000"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Your country"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>

              <div className="pt-4 space-y-3">
                <Button className="w-full bg-lime text-black hover:bg-lime/90 font-semibold py-6 rounded-full">
                  <Check className="w-4 h-4 mr-2" />
                  Request Service
                </Button>
                <p className="text-white/40 text-xs text-center">
                  Our team will contact you within 24 hours with next steps.
                </p>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
