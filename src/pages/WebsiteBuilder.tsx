import { useState } from 'react'
import { 
  Wand2, Layout, ArrowRight, Loader2, 
  Sparkles, CheckCircle2, Monitor, Smartphone, Globe,
  Layers, Palette, Type, Search, Settings, ChevronRight, X
} from 'lucide-react'
import { toast } from 'sonner'
import { blink } from '../blink/client'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

export function WebsiteBuilder() {
  const { user, isAuthenticated } = useAuth()
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [siteData, setSiteData] = useState<any>(null)
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    description: '',
    pages: ['home', 'about', 'services', 'contact'],
    colorPreference: 'modern-green',
    stylePreference: 'minimalist'
  })

  const handleGenerate = async () => {
    if (!isAuthenticated) {
      blink.auth.login()
      return
    }
    
    setIsGenerating(true)
    try {
      const { object } = await blink.ai.generateObject({
        prompt: `Generate a complete multi-page website content for "${formData.businessName}" in the ${formData.industry} industry. 
        Description: ${formData.description}. 
        Style: ${formData.stylePreference}.
        Generate content for these pages: ${formData.pages.join(', ')}.
        Include SEO title, description, and sections for each page.`,
        schema: {
          type: 'object',
          properties: {
            brandName: { type: 'string' },
            tagline: { type: 'string' },
            theme: {
              type: 'object',
              properties: {
                primary: { type: 'string' },
                accent: { type: 'string' },
                font: { type: 'string' }
              }
            },
            pages: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  title: { type: 'string' },
                  sections: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        type: { type: 'string' },
                        heading: { type: 'string' },
                        content: { type: 'string' },
                        cta: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          },
          required: ['brandName', 'tagline', 'pages']
        }
      })

      setSiteData(object)
      
      // Save to database
      await blink.db.websites.create({
        userId: user!.id,
        name: formData.businessName,
        industry: formData.industry,
        description: formData.description,
        content: JSON.stringify(object),
        theme: formData.colorPreference,
        status: 'draft'
      })

      setStep(3)
      toast.success('Website generated successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to generate website. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const togglePage = (page: string) => {
    setFormData(prev => ({
      ...prev,
      pages: prev.pages.includes(page) 
        ? prev.pages.filter(p => p !== page)
        : [...prev.pages, page]
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shadow-glow">
            <Layout className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">AI Website Builder</h1>
            <p className="text-muted-foreground">Build, host, and deploy in seconds.</p>
          </div>
        </div>
        
        {step === 3 && (
          <div className="flex items-center gap-3">
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
              <button 
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            <button className="btn-primary py-2 text-sm flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Deploy Website
            </button>
          </div>
        )}
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-fade-in">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Project Details</h2>
              <p className="text-muted-foreground">Tell us about the business you're building for.</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Business Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Acme Creative Agency"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Industry</label>
                <input 
                  type="text"
                  placeholder="e.g. Digital Marketing, Fintech"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Business Description</label>
                <textarea 
                  rows={4}
                  placeholder="What does your business do? Who is it for?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            <button 
              disabled={!formData.businessName || !formData.industry}
              onClick={() => setStep(2)}
              className="w-full btn-primary h-14 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
            >
              Continue to Preferences
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl -z-10" />
            <div className="glass-card p-8 rounded-3xl space-y-8 border-dashed border-white/10">
              <div className="space-y-4">
                <div className="h-4 w-32 bg-white/5 rounded" />
                <div className="h-8 w-64 bg-white/10 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-white/5 rounded" />
                  <div className="h-4 w-full bg-white/5 rounded" />
                  <div className="h-4 w-2/3 bg-white/5 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-white/5 rounded-2xl" />
                <div className="h-32 bg-white/5 rounded-2xl" />
              </div>
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <p className="text-sm text-muted-foreground">AI will generate custom copy and structure based on your inputs.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="text-primary w-5 h-5" />
                <h3 className="text-xl font-bold">Select Pages</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['home', 'about', 'services', 'contact', 'blog', 'portfolio', 'faq', 'team'].map(page => (
                  <button
                    key={page}
                    onClick={() => togglePage(page)}
                    className={`p-4 rounded-xl border text-sm font-medium transition-all text-left capitalize ${
                      formData.pages.includes(page)
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-white/5 border-white/5 text-muted-foreground hover:border-white/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="text-primary w-5 h-5" />
                <h3 className="text-xl font-bold">Visual Style</h3>
              </div>
              <div className="space-y-3">
                {[
                  { id: 'modern-green', name: 'Modern Green (OGMJ)', colors: 'bg-primary' },
                  { id: 'minimal-dark', name: 'Minimalist Dark', colors: 'bg-zinc-800' },
                  { id: 'clean-white', name: 'Corporate Clean', colors: 'bg-slate-200' },
                  { id: 'luxury-gold', name: 'Premium Luxury', colors: 'bg-amber-500' }
                ].map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setFormData({...formData, colorPreference: theme.id})}
                    className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
                      formData.colorPreference === theme.id
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-white/5 border-white/5 text-muted-foreground hover:border-white/20'
                    }`}
                  >
                    <span className="font-medium">{theme.name}</span>
                    <div className={`w-6 h-6 rounded-full ${theme.colors} border border-white/10`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-8">
            <button onClick={() => setStep(1)} className="btn-secondary px-8">Back</button>
            <button 
              disabled={isGenerating}
              onClick={handleGenerate}
              className="flex-1 btn-primary h-14 text-lg flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating Your Website...
                </>
              ) : (
                <>
                  Build My Website
                  <Wand2 className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {step === 3 && siteData && (
        <div className="animate-fade-in space-y-8">
          <div className="flex items-center justify-center">
            <div className={`bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${viewMode === 'desktop' ? 'w-full max-w-6xl' : 'w-[375px]'}`}>
              {/* Browser Header */}
              <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="flex-1 max-w-sm mx-auto h-6 bg-white/5 rounded-md flex items-center px-3 gap-2">
                  <Globe className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground truncate">{formData.businessName.toLowerCase().replace(/\s+/g, '-')}.ogmjbrands.com</span>
                </div>
              </div>

              {/* Mock Website Preview */}
              <div className="h-[600px] overflow-y-auto bg-background p-8 custom-scrollbar space-y-20">
                <nav className="flex items-center justify-between">
                  <div className="font-bold text-lg text-primary">{siteData.brandName}</div>
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    {siteData.pages.map((p: any) => (
                      <span key={p.id} className="hover:text-primary cursor-pointer capitalize">{p.id}</span>
                    ))}
                  </div>
                </nav>

                <div className="text-center space-y-6 pt-10">
                  <h1 className="text-5xl font-bold tracking-tight">{siteData.tagline}</h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {siteData.pages[0].sections[0].content}
                  </p>
                  <button className="btn-primary py-2 px-8">Get Started</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {siteData.pages[0].sections.slice(1, 4).map((section: any, i: number) => (
                    <div key={i} className="glass-card p-6 rounded-2xl space-y-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg" />
                      <h3 className="font-bold">{section.heading}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>

                <footer className="pt-20 border-t border-white/5 text-center text-sm text-muted-foreground">
                  © 2024 {siteData.brandName}. Powered by OGMJ Brands.
                </footer>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Pages Generated</h4>
              <div className="text-2xl font-bold">{siteData.pages.length}</div>
            </div>
            <div className="glass-card p-6 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Style Pattern</h4>
              <div className="text-2xl font-bold capitalize">{formData.stylePreference}</div>
            </div>
            <div className="glass-card p-6 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Status</h4>
              <div className="text-2xl font-bold text-amber-500">Draft</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button onClick={() => setStep(2)} className="btn-secondary px-8">Edit Details</button>
            <Link to="/dashboard" className="btn-primary px-12">Save & Exit</Link>
          </div>
        </div>
      )}
    </div>
  )
}
