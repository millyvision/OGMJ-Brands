import { useState } from 'react';
import { ArrowRight, CreditCard, Headphones, Check, MessageCircle, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$99',
    period: 'per service',
    features: [
      'Single service request',
      'Email support',
      '5-day delivery',
      '1 revision included',
    ],
  },
  {
    name: 'Business',
    price: '$299',
    period: 'per month',
    features: [
      '3 active services',
      'Priority support',
      '3-day delivery',
      'Unlimited revisions',
      'Dedicated account manager',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$799',
    period: 'per month',
    features: [
      'Unlimited services',
      '24/7 phone support',
      'Same-day delivery',
      'Unlimited revisions',
      'Dedicated team',
      'Custom solutions',
    ],
  },
];

export default function PricingSupport() {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <section id="pricing" className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Pricing Card */}
          <div className="group relative overflow-hidden rounded-2xl hover-lift">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/pricing.jpg"
                alt="Pricing"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-lime" />
                <span className="text-white/60 text-sm uppercase tracking-wider">Pricing</span>
              </div>
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">Pay for Progress</h3>
              <ul className="space-y-2 mb-6">
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  One-time service purchases
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Bundles that save time
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Subscriptions for growth
                </li>
              </ul>
              <Button 
                className="bg-lime text-black hover:bg-lime/90 font-semibold rounded-full group/btn"
                onClick={() => setIsPricingOpen(true)}
              >
                View Pricing
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Support Card */}
          <div className="group relative overflow-hidden rounded-2xl hover-lift">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/support.jpg"
                alt="Support"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Headphones className="w-5 h-5 text-lime" />
                <span className="text-white/60 text-sm uppercase tracking-wider">Support</span>
              </div>
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">Help When You Need It</h3>
              <ul className="space-y-2 mb-6">
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Guided answers, not guesses
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  AI assistant + email support
                </li>
                <li className="text-white/70 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-lime rounded-full" />
                  Clear next steps always
                </li>
              </ul>
              <Button 
                className="bg-lime text-black hover:bg-lime/90 font-semibold rounded-full group/btn"
                onClick={() => setIsSupportOpen(true)}
              >
                Contact Support
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Dialog */}
      <Dialog open={isPricingOpen} onOpenChange={setIsPricingOpen}>
        <DialogContent className="bg-dark border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-lime" />
              Pricing Plans
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Choose the plan that works best for your business.
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-6 ${
                  plan.popular
                    ? 'bg-lime/10 border-2 border-lime'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {plan.popular && (
                  <span className="inline-block bg-lime text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-white text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/50 text-sm">/{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="text-white/70 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-lime" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full py-5 ${
                    plan.popular
                      ? 'bg-lime text-black hover:bg-lime/90'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Support Dialog */}
      <Dialog open={isSupportOpen} onOpenChange={setIsSupportOpen}>
        <DialogContent className="bg-dark border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <Headphones className="w-6 h-6 text-lime" />
              Contact Support
            </DialogTitle>
            <DialogDescription className="text-white/60">
              We're here to help. Reach out through any channel.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="form" className="mt-4">
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="form" className="data-[state=active]:bg-lime data-[state=active]:text-black">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-lime data-[state=active]:text-black">
                <Phone className="w-4 h-4 mr-2" />
                Contact Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form" className="mt-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="support-name">Name</Label>
                  <Input
                    id="support-name"
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-email">Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-message">Message</Label>
                  <Textarea
                    id="support-message"
                    placeholder="How can we help you?"
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
                  />
                </div>

                <Button className="w-full bg-lime text-black hover:bg-lime/90 font-semibold py-6 rounded-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="contact" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                  <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-lime" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Email</p>
                    <p className="text-white">ogmjbrandingagency@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                  <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-lime" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Phone/WhatsApp</p>
                    <p className="text-white">+234 810 972 0301</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                  <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-lime" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Live Chat</p>
                    <p className="text-white">Available 24/7</p>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-lime/10 border border-lime/30">
                  <p className="text-lime text-sm text-center">
                    Average response time: Under 2 hours
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </section>
  );
}
