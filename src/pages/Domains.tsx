import { useState } from 'react'
import { 
  Globe, Search, CheckCircle2, ShieldCheck, 
  ArrowRight, Loader2, Zap, Info, CreditCard,
  ChevronRight, Calendar, AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'
import { blink } from '../blink/client'
import { useAuth } from '../hooks/useAuth'

const SUGGESTIONS = [
  '.com', '.net', '.org', '.ai', '.io', '.biz'
]

export function Domains() {
  const { user, isAuthenticated } = useAuth()
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [selectedDomain, setSelectedDomain] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    
    setIsSearching(true)
    // Simulate domain search API
    await new Promise(r => setTimeout(r, 1500))
    
    const domainName = query.split('.')[0]
    const found = SUGGESTIONS.map(ext => ({
      name: `${domainName}${ext}`,
      available: Math.random() > 0.3,
      price: ext === '.ai' ? 99 : 14,
      renewal: ext === '.ai' ? 99 : 14
    }))
    
    setResults(found)
    setIsSearching(false)
  }

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      blink.auth.login()
      return
    }

    setIsProcessing(true)
    try {
      // Simulate Stripe checkout and registrar API
      await new Promise(r => setTimeout(r, 2000))
      
      const expiry = new Date()
      expiry.setFullYear(expiry.getFullYear() + 1)

      await blink.db.domains.create({
        userId: user!.id,
        domainName: selectedDomain.name,
        registrar: 'OGMJ Registrar',
        status: 'active',
        expiryDate: expiry.toISOString()
      })

      toast.success(`Domain ${selectedDomain.name} registered successfully!`)
      setSelectedDomain(null)
      setQuery('')
      setResults([])
    } catch (error) {
      toast.error('Failed to register domain. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">Domain Names</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Secure the perfect address for your brand. Direct registration, instant activation.
        </p>
      </div>

      <div className="space-y-12">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative group max-w-3xl mx-auto">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex bg-card border border-white/10 rounded-2xl overflow-hidden p-2">
            <div className="flex-1 flex items-center px-4 gap-3">
              <Search className="text-muted-foreground w-6 h-6" />
              <input 
                type="text" 
                placeholder="Search for your perfect domain..."
                className="w-full bg-transparent border-none focus:outline-none text-lg py-4"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button 
              disabled={isSearching}
              className="btn-primary px-8 h-14 text-lg flex items-center gap-3 disabled:opacity-50"
            >
              {isSearching ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Search'}
            </button>
          </div>
        </form>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Search Results for <span className="text-primary">{query}</span>
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {results.map((domain) => (
                <div 
                  key={domain.name}
                  className={`glass-card p-6 rounded-2xl flex items-center justify-between transition-all ${
                    !domain.available ? 'opacity-50 grayscale' : 'hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${domain.available ? 'bg-primary/10 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">{domain.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {domain.available ? (
                          <span className="flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-wider">
                            <CheckCircle2 className="w-3 h-3" /> Available
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-500 text-xs font-bold uppercase tracking-wider">
                            <AlertCircle className="w-3 h-3" /> Taken
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {domain.available && (
                      <div className="text-right">
                        <div className="text-xl font-bold">${domain.price}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Per Year</div>
                      </div>
                    )}
                    <button 
                      disabled={!domain.available}
                      onClick={() => setSelectedDomain(domain)}
                      className={`btn-primary py-2 px-8 text-sm disabled:opacity-50 ${domain.available ? '' : 'bg-white/5 border border-white/10'}`}
                    >
                      {domain.available ? 'Select' : 'Check Whois'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Purchase Summary */}
        {selectedDomain && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden">
              <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h2 className="text-2xl font-bold">Review Order</h2>
                <button onClick={() => setSelectedDomain(null)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-lg font-bold">{selectedDomain.name}</div>
                    <div className="text-sm text-muted-foreground">Domain Registration (1 Year)</div>
                  </div>
                  <div className="text-xl font-bold">${selectedDomain.price}</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground">Includes free WHOIS Privacy Protection</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground">Instant DNS activation & hosting ready</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold">Total Due</span>
                    <span className="text-3xl font-extrabold text-primary">${selectedDomain.price}</span>
                  </div>
                  <button 
                    disabled={isProcessing}
                    onClick={handlePurchase}
                    className="w-full btn-primary h-14 text-lg flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay & Register
                        <CreditCard className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {[
            { title: 'Global Coverage', desc: 'Register any TLD from .com to .ai with direct registrar access.', icon: Globe },
            { title: 'Secure & Private', desc: 'Free WHOIS privacy included with every domain registration.', icon: ShieldCheck },
            { title: 'Easy Management', desc: 'Full control over DNS, nameservers, and renewals in one dashboard.', icon: Settings }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
