import { useState } from 'react';
import { ArrowRight, Building2, FileCheck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const businessServices = [
  {
    id: 'launch',
    icon: <Building2 className="w-5 h-5" />,
    tag: 'Business Launch',
    title: 'Register & Launch',
    image: '/images/business-launch.jpg',
    features: [
      'Step-by-step incorporation guides',
      'Domain + email setup',
      'Compliance checklists',
    ],
    offerings: [
      'Private Limited Company (Ltd)',
      'Public Limited Company (PLC)',
      'Limited Liability Partnership',
      'Sole Proprietorship',
      'Non-Profit Organization',
      'Holding Company',
    ],
    buttonText: 'Start a Business',
  },
  {
    id: 'documents',
    icon: <FileCheck className="w-5 h-5" />,
    tag: 'Document Hub',
    title: 'Process Documents',
    image: '/images/documents-certs.jpg',
    features: [
      'Identity & civil records',
      'Travel & security paperwork',
      'Education & business certs',
    ],
    offerings: [
      'International Passport',
      'National ID Card',
      'Driver\'s License',
      'Birth Certificate',
      'Marriage Certificate',
      'Educational Certificates',
      'Police Clearance',
    ],
    buttonText: 'Explore Documents',
  },
];

export default function BusinessLaunch() {
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
          {businessServices.map((service) => (
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
              Fill in your details and we'll guide you through the process.
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
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
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
                <Label htmlFor="location">Location/Address</Label>
                <Input
                  id="location"
                  placeholder="Your city and country"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>

              <div className="pt-4 space-y-3">
                <Button className="w-full bg-lime text-black hover:bg-lime/90 font-semibold py-6 rounded-full">
                  <Check className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
                <p className="text-white/40 text-xs text-center">
                  Free consultation included. No obligation required.
                </p>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
