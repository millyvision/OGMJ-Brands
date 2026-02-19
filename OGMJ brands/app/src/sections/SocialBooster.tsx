import { useState } from 'react';
import { 
  Youtube, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Music2,
  Zap,
  Clock,
  Users,
  Shield,
  Globe,
  Radio,
  Headphones,
  ShoppingBag,
  MessageCircle,
  Video,
  Camera,
  TrendingUp,
  MousePointer,
  MapPin,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Social Media Platforms
const socialPlatforms = [
  {
    name: 'YouTube',
    icon: <Youtube className="w-6 h-6" />,
    color: 'bg-red-600',
    services: [
      { name: 'Subscribers', price: '$50 per 1K' },
      { name: 'Views', price: '$25 per 10K' },
      { name: 'Likes', price: '$15 per 1K' },
      { name: 'Watch Hours', price: '$100 per 1K' },
      { name: 'Comments', price: '$30 per 100' },
    ],
  },
  {
    name: 'Instagram',
    icon: <Instagram className="w-6 h-6" />,
    color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
    services: [
      { name: 'Followers', price: '$40 per 1K' },
      { name: 'Likes', price: '$10 per 1K' },
      { name: 'Views', price: '$8 per 10K' },
      { name: 'Comments', price: '$30 per 100' },
      { name: 'Story Views', price: '$12 per 10K' },
      { name: 'Reel Views', price: '$15 per 10K' },
    ],
  },
  {
    name: 'Facebook',
    icon: <Facebook className="w-6 h-6" />,
    color: 'bg-blue-600',
    services: [
      { name: 'Page Likes', price: '$35 per 1K' },
      { name: 'Post Likes', price: '$12 per 1K' },
      { name: 'Views', price: '$10 per 10K' },
      { name: 'Shares', price: '$25 per 100' },
      { name: 'Group Members', price: '$45 per 1K' },
      { name: 'Event Attending', price: '$20 per 100' },
    ],
  },
  {
    name: 'Twitter/X',
    icon: <Twitter className="w-6 h-6" />,
    color: 'bg-black border border-white/20',
    services: [
      { name: 'Followers', price: '$45 per 1K' },
      { name: 'Likes', price: '$15 per 1K' },
      { name: 'Retweets', price: '$20 per 100' },
      { name: 'Impressions', price: '$30 per 100K' },
      { name: 'Poll Votes', price: '$25 per 1K' },
      { name: 'Space Listeners', price: '$50 per 1K' },
    ],
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="w-6 h-6" />,
    color: 'bg-blue-700',
    services: [
      { name: 'Connections', price: '$60 per 500' },
      { name: 'Post Likes', price: '$20 per 1K' },
      { name: 'Views', price: '$15 per 10K' },
      { name: 'Endorsements', price: '$40 per 100' },
      { name: 'Recommendations', price: '$75 per 10' },
      { name: 'Company Followers', price: '$55 per 1K' },
    ],
  },
  {
    name: 'TikTok',
    icon: <Music2 className="w-6 h-6" />,
    color: 'bg-black border border-white/20',
    services: [
      { name: 'Followers', price: '$35 per 1K' },
      { name: 'Likes', price: '$12 per 1K' },
      { name: 'Views', price: '$10 per 10K' },
      { name: 'Shares', price: '$18 per 1K' },
      { name: 'Comments', price: '$25 per 100' },
      { name: 'Live Stream Views', price: '$40 per 1K' },
    ],
  },
];

// Additional Social Platforms
const additionalPlatforms = [
  {
    name: 'Snapchat',
    icon: <Camera className="w-6 h-6" />,
    color: 'bg-yellow-400',
    services: [
      { name: 'Followers', price: '$30 per 1K' },
      { name: 'Story Views', price: '$15 per 10K' },
      { name: 'Spotlight Views', price: '$20 per 10K' },
    ],
  },
  {
    name: 'Pinterest',
    icon: <ShoppingBag className="w-6 h-6" />,
    color: 'bg-red-700',
    services: [
      { name: 'Followers', price: '$25 per 1K' },
      { name: 'Pin Saves', price: '$18 per 1K' },
      { name: 'Monthly Views', price: '$35 per 100K' },
    ],
  },
  {
    name: 'Reddit',
    icon: <MessageCircle className="w-6 h-6" />,
    color: 'bg-orange-600',
    services: [
      { name: 'Karma Points', price: '$50 per 1K' },
      { name: 'Upvotes', price: '$30 per 100' },
      { name: 'Subreddit Members', price: '$40 per 1K' },
    ],
  },
  {
    name: 'Telegram',
    icon: <Smartphone className="w-6 h-6" />,
    color: 'bg-blue-500',
    services: [
      { name: 'Channel Members', price: '$35 per 1K' },
      { name: 'Group Members', price: '$30 per 1K' },
      { name: 'Post Views', price: '$15 per 10K' },
    ],
  },
  {
    name: 'WhatsApp',
    icon: <MessageCircle className="w-6 h-6" />,
    color: 'bg-green-500',
    services: [
      { name: 'Group Members', price: '$25 per 1K' },
      { name: 'Status Views', price: '$20 per 10K' },
      { name: 'Channel Followers', price: '$30 per 1K' },
    ],
  },
  {
    name: 'Twitch',
    icon: <Video className="w-6 h-6" />,
    color: 'bg-purple-600',
    services: [
      { name: 'Followers', price: '$45 per 1K' },
      { name: 'Live Viewers', price: '$60 per 1K' },
      { name: 'Clip Views', price: '$20 per 10K' },
    ],
  },
];

// Music Streaming Platforms
const musicPlatforms = [
  {
    name: 'Spotify',
    icon: <Headphones className="w-6 h-6" />,
    color: 'bg-green-500',
    services: [
      { name: 'Followers', price: '$40 per 1K' },
      { name: 'Monthly Listeners', price: '$55 per 1K' },
      { name: 'Playlist Followers', price: '$35 per 1K' },
      { name: 'Track Plays', price: '$20 per 10K' },
      { name: 'Saves', price: '$25 per 1K' },
    ],
  },
  {
    name: 'Apple Music',
    icon: <Music2 className="w-6 h-6" />,
    color: 'bg-red-500',
    services: [
      { name: 'Plays', price: '$30 per 10K' },
      { name: 'Playlist Adds', price: '$40 per 1K' },
    ],
  },
  {
    name: 'SoundCloud',
    icon: <Radio className="w-6 h-6" />,
    color: 'bg-orange-500',
    services: [
      { name: 'Followers', price: '$25 per 1K' },
      { name: 'Plays', price: '$15 per 10K' },
      { name: 'Likes', price: '$20 per 1K' },
      { name: 'Reposts', price: '$30 per 1K' },
      { name: 'Comments', price: '$35 per 100' },
    ],
  },
  {
    name: 'Audiomack',
    icon: <Radio className="w-6 h-6" />,
    color: 'bg-orange-600',
    services: [
      { name: 'Followers', price: '$20 per 1K' },
      { name: 'Plays', price: '$12 per 10K' },
      { name: 'Favorites', price: '$18 per 1K' },
      { name: 'Re-Ups', price: '$25 per 1K' },
    ],
  },
  {
    name: 'Boomplay',
    icon: <Headphones className="w-6 h-6" />,
    color: 'bg-orange-500',
    services: [
      { name: 'Followers', price: '$22 per 1K' },
      { name: 'Streams', price: '$15 per 10K' },
      { name: 'Playlist Followers', price: '$20 per 1K' },
    ],
  },
  {
    name: 'Deezer',
    icon: <Music2 className="w-6 h-6" />,
    color: 'bg-cyan-500',
    services: [
      { name: 'Followers', price: '$28 per 1K' },
      { name: 'Plays', price: '$18 per 10K' },
      { name: 'Playlist Fans', price: '$22 per 1K' },
    ],
  },
  {
    name: 'Tidal',
    icon: <Radio className="w-6 h-6" />,
    color: 'bg-blue-800',
    services: [
      { name: 'Followers', price: '$35 per 1K' },
      { name: 'Streams', price: '$25 per 10K' },
    ],
  },
  {
    name: 'YouTube Music',
    icon: <Youtube className="w-6 h-6" />,
    color: 'bg-red-600',
    services: [
      { name: 'Subscribers', price: '$45 per 1K' },
      { name: 'Views', price: '$22 per 10K' },
      { name: 'Playlist Followers', price: '$30 per 1K' },
    ],
  },
];

// Website Traffic
const websiteTraffic = [
  {
    name: 'Website Traffic',
    icon: <Globe className="w-6 h-6" />,
    color: 'bg-blue-600',
    services: [
      { name: 'Global Visitors', price: '$15 per 10K' },
      { name: 'USA Visitors', price: '$35 per 10K' },
      { name: 'UK Visitors', price: '$30 per 10K' },
      { name: 'EU Visitors', price: '$28 per 10K' },
      { name: 'African Visitors', price: '$20 per 10K' },
    ],
  },
  {
    name: 'SEO Services',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'bg-green-600',
    services: [
      { name: 'Backlinks (DA 30+)', price: '$50 per 100' },
      { name: 'Guest Posts', price: '$100 per post' },
      { name: 'Keyword Ranking', price: '$200 per keyword' },
    ],
  },
  {
    name: 'Engagement',
    icon: <MousePointer className="w-6 h-6" />,
    color: 'bg-purple-600',
    services: [
      { name: 'Page Views', price: '$12 per 10K' },
      { name: 'Time on Site', price: '$25 per 1K hours' },
      { name: 'Bounce Rate Reduction', price: '$75 per campaign' },
    ],
  },
  {
    name: 'Local SEO',
    icon: <MapPin className="w-6 h-6" />,
    color: 'bg-red-500',
    services: [
      { name: 'Google Business Reviews', price: '$15 per review' },
      { name: 'Local Citations', price: '$100 per 50' },
      { name: 'Map Pack Ranking', price: '$300 per location' },
    ],
  },
];

const howItWorks = [
  { step: '01', title: 'Select Platform', description: 'Choose the platform you want to boost.' },
  { step: '02', title: 'Enter Details', description: 'Provide your account URL and select package.' },
  { step: '03', title: 'Auto-Boost', description: 'Our system starts boosting instantly.' },
];

const guarantees = [
  { icon: <Zap className="w-5 h-5" />, title: 'Instant Delivery' },
  { icon: <Users className="w-5 h-5" />, title: 'Real Engagement' },
  { icon: <Clock className="w-5 h-5" />, title: '24/7 Support' },
  { icon: <Shield className="w-5 h-5" />, title: 'Money Back Guarantee' },
];

export default function SocialBooster() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('social');

  const handleBoostClick = (platform: any) => {
    setSelectedService(platform);
    setIsDialogOpen(true);
  };

  const renderPlatformCard = (platform: any) => (
    <div key={platform.name} className="glass-card rounded-xl p-6 hover-lift">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center`}>
          <span className="text-white">{platform.icon}</span>
        </div>
        <h3 className="text-white font-semibold text-lg">{platform.name}</h3>
      </div>

      <div className="space-y-2 mb-4">
        {platform.services.map((service: any, idx: number) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-white/60 text-sm">{service.name}</span>
            <span className="text-lime text-sm font-medium">{service.price}</span>
          </div>
        ))}
      </div>

      <Button 
        className="w-full bg-lime text-black hover:bg-lime/90 font-semibold rounded-full"
        onClick={() => handleBoostClick(platform)}
      >
        <Zap className="w-4 h-4 mr-2" />
        Boost {platform.name}
      </Button>
    </div>
  );

  return (
    <section id="social-booster" className="w-full py-20 lg:py-32 bg-dark">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
            Social Media Auto-Booster
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Boost your social media, music streams, and website traffic automatically. Select your platform, enter your details, and watch your engagement grow.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'social', label: 'Social Media', icon: <Users className="w-4 h-4" /> },
            { id: 'more-social', label: 'More Platforms', icon: <Smartphone className="w-4 h-4" /> },
            { id: 'music', label: 'Music Apps', icon: <Headphones className="w-4 h-4" /> },
            { id: 'traffic', label: 'Website Traffic', icon: <Globe className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-lime text-black'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Platform Cards */}
        <div className="mb-16">
          {activeTab === 'social' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialPlatforms.map(renderPlatformCard)}
            </div>
          )}
          {activeTab === 'more-social' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalPlatforms.map(renderPlatformCard)}
            </div>
          )}
          {activeTab === 'music' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {musicPlatforms.map(renderPlatformCard)}
            </div>
          )}
          {activeTab === 'traffic' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {websiteTraffic.map(renderPlatformCard)}
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h3 className="text-white text-2xl font-bold text-center mb-8">How Auto-Boost Works</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lime text-xl font-bold">{item.step}</span>
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-white/50 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-lime">{guarantee.icon}</span>
              <span className="text-white/70 text-sm font-medium">{guarantee.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Boost Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {selectedService && (
                <>
                  <div className={`w-10 h-10 rounded-lg ${selectedService.color} flex items-center justify-center`}>
                    {selectedService.icon}
                  </div>
                  Boost {selectedService.name}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Fill in your details and select your package. We'll start boosting within minutes.
            </DialogDescription>
          </DialogHeader>

          {selectedService && (
            <form className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="url">Account/Profile URL</Label>
                <Input
                  id="url"
                  placeholder={`Enter your ${selectedService.name} URL`}
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
                <Label>Select Service Package</Label>
                <div className="grid gap-2">
                  {selectedService.services.map((service: any, idx: number) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input type="radio" name="package" className="accent-lime" />
                        <span className="text-white text-sm">{service.name}</span>
                      </div>
                      <span className="text-lime font-medium">{service.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity (e.g., 1000)"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>

              <div className="pt-4 space-y-3">
                <Button className="w-full bg-lime text-black hover:bg-lime/90 font-semibold py-6 rounded-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Boosting Now
                </Button>
                <p className="text-white/40 text-xs text-center">
                  Secure payment via PayPal, Stripe, or Crypto. Instant delivery guaranteed.
                </p>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
