import { Check, Zap, Rocket, Briefcase } from 'lucide-react'
import { toast } from 'sonner'

const PLANS = [
  {
    name: 'Starter',
    price: 29,
    desc: 'Perfect for small businesses starting their journey.',
    features: ['3 AI Brand Assets', 'Basic Boost Campaigns', 'Logo Concept Ideas', 'Email Support'],
    icon: Zap,
    color: 'text-blue-400'
  },
  {
    name: 'Pro',
    price: 99,
    desc: 'Most popular for professional brand scaling.',
    features: ['Unlimited AI Brand Assets', 'Advanced Boost Strategies', 'Full Brand Identity', 'Priority Support', 'Ad Copy Generation'],
    icon: Rocket,
    color: 'text-primary',
    popular: true
  },
  {
    name: 'Business',
    price: 249,
    desc: 'Complete business automation suite.',
    features: ['Everything in Pro', 'Business Roadmap Generation', 'Market Analysis', 'Multi-Platform Management', 'Custom API Access'],
    icon: Briefcase,
    color: 'text-amber-400'
  }
]

export function Pricing() {
  const handleSubscribe = (planName: string) => {
    toast.info(`Checkout for ${planName} plan coming soon!`)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your ambition. No hidden fees. No long-term contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <div 
            key={plan.name} 
            className={`glass-card p-8 rounded-[2.5rem] flex flex-col relative transition-all hover:scale-[1.02] ${
              plan.popular ? 'border-primary/50 shadow-glow' : 'border-white/5'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-glow">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 ${plan.color}`}>
                <plan.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.desc}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleSubscribe(plan.name)}
              className={`w-full py-4 rounded-2xl font-bold transition-all ${
                plan.popular ? 'btn-primary' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              Get Started with {plan.name}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 glass-card rounded-[2.5rem] text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Need Enterprise Solutions?</h2>
        <p className="text-muted-foreground mb-8">
          We offer custom plans for agencies and large-scale enterprises with specific needs.
        </p>
        <button className="btn-secondary px-12">Contact Sales</button>
      </div>
    </div>
  )
}
