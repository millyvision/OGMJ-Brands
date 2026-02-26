import { Link } from 'react-router-dom'
import { Rocket, Zap, Shield, Globe, ArrowRight, CheckCircle2, Star, Users, BarChart3 } from 'lucide-react'

export function Home() {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>The Future of Branding is Here</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Build. Brand. <br />
              <span className="text-primary shadow-glow">Boost. Automate.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              OGMJ BRANDS is a 100% self-service AI-powered SaaS platform for professional brand growth. 
              No bots. No manual processing. Just 100% user control and automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="btn-primary text-center px-10 text-lg flex items-center justify-center gap-2 group">
                Start Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/boost" className="btn-secondary text-center px-10 text-lg flex items-center justify-center gap-2">
                View Services
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent -z-10 blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 glass-card rounded-3xl">
          {[
            { label: 'Active Users', value: '10K+', icon: Users },
            { label: 'Brands Built', value: '5K+', icon: Rocket },
            { label: 'Campaigns Boosted', value: '25K+', icon: BarChart3 },
            { label: 'Success Rate', value: '99.9%', icon: CheckCircle2 },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Why Choose OGMJ Brands?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the power of total automation. We provide the tools, you provide the vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '100% Self-Service',
              desc: 'Total control over your brand assets and campaigns without manual intervention.',
              icon: Shield
            },
            {
              title: 'AI-Powered Precision',
              desc: 'Leverage cutting-edge AI for strategies, design concepts, and content creation.',
              icon: Zap
            },
            {
              title: 'Official Ad Integration',
              desc: 'Our boosting platform uses official APIs. No bots or fake engagement.',
              icon: Globe
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 glass-card rounded-3xl hover:border-primary/50 transition-colors group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services CTA */}
      <section className="relative overflow-hidden py-32 bg-primary/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-5xl font-bold mb-8">Ready to Scale Your Brand?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
            Join thousands of successful business owners who use OGMJ Brands to automate their growth.
          </p>
          <Link to="/services" className="btn-primary text-lg px-12">
            Get Started for Free
          </Link>
        </div>
        
        {/* Decorative particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-primary rounded-full animate-pulse delay-700" />
        </div>
      </section>
    </div>
  )
}
