import { useState } from 'react'
import { 
  Palette, Globe, Camera, Megaphone, Share2, Briefcase, 
  Settings, PenTool, Layout, FileText, TrendingUp, Users,
  ArrowRight, X, Loader2, Sparkles, CheckCircle2
} from 'lucide-react'
import { toast } from 'sonner'
import { blink } from '../blink/client'
import { useAuth } from '../hooks/useAuth'

const SERVICES = [
  { id: 'brand-strategy', name: 'Brand Strategy Development', price: 499, icon: Briefcase, desc: 'Complete brand positioning and market analysis.' },
  { id: 'logo-design', name: 'Logo Design', price: 299, icon: Palette, desc: 'Professional AI-assisted logo concepts and files.' },
  { id: 'brand-identity', name: 'Brand Identity Design', price: 799, icon: PenTool, desc: 'Full visual identity guidelines and assets.' },
  { id: 'website-design', name: 'Website Design', price: 1499, icon: Layout, desc: 'Modern, high-converting landing pages.' },
  { id: 'content-creation', name: 'Content Creation', price: 399, icon: Camera, desc: 'Professional social media and web content.' },
  { id: 'social-mgmt', name: 'Social Media Management', price: 599, icon: Share2, desc: 'Automated post scheduling and engagement.' },
  { id: 'business-reg', name: 'Business Registration', price: 249, icon: Settings, desc: 'Seamless business setup and registration.' },
  { id: 'biz-mgmt', name: 'Business Management', price: 899, icon: TrendingUp, desc: 'Strategic oversight and process optimization.' },
  { id: 'biz-strategy', name: 'Business Strategies', price: 699, icon: FileText, desc: 'AI-generated roadmaps for scaling.' },
  { id: 'marketing-ads', name: 'Social Media Marketing Ads', price: 999, icon: Megaphone, desc: 'Data-driven ad campaigns on top platforms.' },
  { id: 'rebranding', name: 'Business Rebranding', price: 1299, icon: Globe, desc: 'Complete brand overhaul and modernization.' },
  { id: 'boosting', name: 'Social Media Accounts Boosting', price: 199, icon: Users, desc: 'Official platform-based account growth.' },
]

export function Services() {
  const { user, isAuthenticated } = useAuth()
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({ businessName: '', industry: '', goals: '' })
  const [result, setResult] = useState<string | null>(null)

  const handleStartService = (service: any) => {
    if (!isAuthenticated) {
      blink.auth.login()
      return
    }
    if (service.id === 'website-design') {
      window.location.href = '/builder'
      return
    }
    if (service.id === 'boosting') {
      window.location.href = '/boost'
      return
    }
    setSelectedService(service)
    setResult(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      // Simulate AI generation based on service type
      const prompt = `Generate a ${selectedService.name} for ${formData.businessName} in the ${formData.industry} industry. Goals: ${formData.goals}`
      
      const { text } = await blink.ai.generateText({
        messages: [
          { role: 'system', content: 'You are an expert brand strategist and business consultant.' },
          { role: 'user', content: prompt }
        ]
      })

      setResult(text)
      
      // Save to database
      await blink.db.brandAssets.create({
        userId: user!.id,
        assetType: selectedService.id,
        content: text
      })

      toast.success('Strategy generated successfully!')
    } catch (error) {
      toast.error('Failed to generate strategy. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">Professional Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Fully automated self-service solutions for every stage of your business growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div key={service.id} className="glass-card p-8 rounded-3xl flex flex-col h-full group hover:border-primary/50 transition-all">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <service.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{service.name}</h3>
            <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
              {service.desc}
            </p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
              <span className="text-2xl font-bold text-primary">${service.price}</span>
              <button 
                onClick={() => handleStartService(service)}
                className="btn-primary py-2 px-6 text-sm flex items-center gap-2"
              >
                Start Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal Overlay */}
      {selectedService && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <selectedService.icon className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedService.name}</h2>
                  <p className="text-sm text-muted-foreground">Self-service automation</p>
                </div>
              </div>
              <button onClick={() => setSelectedService(null)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              {!result ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Business Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Industry</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Fintech, E-commerce"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Primary Goals</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Describe what you want to achieve..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      value={formData.goals}
                      onChange={(e) => setFormData({...formData, goals: e.target.value})}
                    />
                  </div>
                  
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary mt-1" />
                    <p className="text-sm text-muted-foreground">
                      Our AI will analyze your inputs to generate a professional {selectedService.name.toLowerCase()} tailored to your goals.
                    </p>
                  </div>

                  <button 
                    disabled={isProcessing}
                    className="w-full btn-primary h-14 text-lg flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Generating Your Assets...
                      </>
                    ) : (
                      <>
                        Confirm & Generate
                        <Zap className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex items-center gap-3 text-primary bg-primary/10 p-4 rounded-xl border border-primary/20">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-semibold">Generation Complete!</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold border-b border-white/10 pb-2">Generated {selectedService.name}</h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                        {result}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="flex-1 btn-secondary"
                    >
                      Close
                    </button>
                    <Link 
                      to="/dashboard"
                      className="flex-1 btn-primary text-center flex items-center justify-center"
                    >
                      View in Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
