import { useState } from 'react'
import { 
  Rocket, Youtube, Instagram, Facebook, Linkedin, Twitter,
  TrendingUp, Users, Target, MousePointer2, 
  ArrowRight, Loader2, Zap, ShieldCheck, Info
} from 'lucide-react'
import { toast } from 'sonner'
import { blink } from '../blink/client'
import { useAuth } from '../hooks/useAuth'

const PLATFORMS = [
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
  { id: 'tiktok', name: 'TikTok', icon: Rocket, color: '#000000' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0077B5' },
  { id: 'x', name: 'X (Twitter)', icon: Twitter, color: '#000000' },
]

const GOALS = [
  { id: 'followers', name: 'Increase Followers', icon: Users, desc: 'Grow your audience base organically.' },
  { id: 'engagement', name: 'Boost Engagement', icon: TrendingUp, desc: 'Get more likes, comments, and shares.' },
  { id: 'traffic', name: 'Drive Traffic', icon: MousePointer2, desc: 'Send visitors to your website or link.' },
  { id: 'conversions', name: 'Direct Conversions', icon: Target, desc: 'Turn followers into paying customers.' },
]

export function Boost() {
  const { user, isAuthenticated } = useAuth()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selection, setSelection] = useState({
    platform: '',
    goal: '',
    budget: 50,
    duration: 7,
    url: ''
  })

  const handleNext = () => {
    if (!isAuthenticated) {
      blink.auth.login()
      return
    }
    setStep(step + 1)
  }

  const handleLaunch = async () => {
    setIsProcessing(true)
    try {
      // Create campaign in DB
      await blink.db.boostCampaigns.create({
        userId: user!.id,
        platform: selection.platform,
        goal: selection.goal,
        budget: selection.budget,
        duration: selection.duration,
        status: 'active'
      })

      toast.success('Campaign launched successfully!')
      setStep(4) // Success step
    } catch (error) {
      toast.error('Failed to launch campaign. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">Social Media Boosting</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Scale your social presence with 100% automated, official ad-based growth. 
          No bots. No fake engagement.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= s ? 'bg-primary text-white shadow-glow' : 'bg-white/5 text-muted-foreground border border-white/10'
            }`}>
              {s}
            </div>
            {s < 3 && <div className={`w-20 md:w-32 h-[2px] ${step > s ? 'bg-primary' : 'bg-white/5'}`} />}
          </div>
        ))}
      </div>

      <div className="glass-card p-10 rounded-3xl min-h-[500px] flex flex-col">
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Select Platform</h2>
              <p className="text-muted-foreground">Which platform do you want to boost today?</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelection({...selection, platform: p.id})}
                  className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-4 ${
                    selection.platform === p.id 
                      ? 'border-primary bg-primary/5 shadow-glow scale-105' 
                      : 'border-white/5 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <p.icon className="w-10 h-10" style={{ color: selection.platform === p.id ? 'var(--primary)' : p.color }} />
                  <span className="font-semibold">{p.name}</span>
                </button>
              ))}
            </div>
            <div className="pt-8 flex justify-end">
              <button 
                disabled={!selection.platform}
                onClick={handleNext}
                className="btn-primary px-12 disabled:opacity-50"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Select Campaign Goal</h2>
              <p className="text-muted-foreground">What is the primary objective of this boost?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelection({...selection, goal: g.id})}
                  className={`p-6 rounded-2xl border transition-all text-left flex gap-6 ${
                    selection.goal === g.id 
                      ? 'border-primary bg-primary/5 shadow-glow' 
                      : 'border-white/5 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${selection.goal === g.id ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                    <g.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{g.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="pt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="btn-secondary px-8">Back</button>
              <button 
                disabled={!selection.goal}
                onClick={handleNext}
                className="btn-primary px-12 disabled:opacity-50"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Finalize Details</h2>
              <p className="text-muted-foreground">Set your budget and provide the URL to boost.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground flex justify-between">
                    Daily Budget
                    <span className="text-primary font-bold">${selection.budget}</span>
                  </label>
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    step="10"
                    className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary"
                    value={selection.budget}
                    onChange={(e) => setSelection({...selection, budget: parseInt(e.target.value)})}
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
                    <span>$10 Min</span>
                    <span>$1000 Max</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground flex justify-between">
                    Duration (Days)
                    <span className="text-primary font-bold">{selection.duration} Days</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="90" 
                    className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary"
                    value={selection.duration}
                    onChange={(e) => setSelection({...selection, duration: parseInt(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Target URL</label>
                  <input 
                    type="url" 
                    placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={selection.url}
                    onChange={(e) => setSelection({...selection, url: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Campaign Summary
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform</span>
                      <span className="font-semibold uppercase">{selection.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goal</span>
                      <span className="font-semibold">{GOALS.find(g => g.id === selection.goal)?.name}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-3 mt-3">
                      <span className="text-muted-foreground">Total Budget</span>
                      <span className="font-bold text-lg text-primary">${selection.budget * selection.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    By clicking Launch, you agree that your campaign will be executed via official advertising APIs. We do not use bots or fake engagement.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="btn-secondary px-8">Back</button>
              <button 
                disabled={!selection.url || isProcessing}
                onClick={handleLaunch}
                className="btn-primary px-16 h-14 text-lg flex items-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Launching...
                  </>
                ) : (
                  <>
                    Launch Campaign
                    <Rocket className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center text-center space-y-8 h-full py-20 animate-fade-in">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center shadow-glow">
              <Rocket className="text-primary w-12 h-12" />
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-bold">Campaign Launched!</h2>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Your boost campaign for {selection.platform.toUpperCase()} is now active. 
                You can monitor its progress in your dashboard.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/dashboard" className="btn-primary px-12">
                Go to Dashboard
              </Link>
              <button onClick={() => setStep(1)} className="btn-secondary px-12">
                New Campaign
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-16 p-8 rounded-3xl bg-card border border-white/5 flex items-start gap-4">
        <Info className="w-6 h-6 text-primary shrink-0" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-bold text-white block mb-1">Compliance Notice</span>
          OGMJ BRANDS strictly adheres to all social media platform policies. Our automated boosting is done through legitimate advertising networks and content strategy optimization. We do not support, provide, or facilitate the use of bots, fake followers, or artificial engagement tools.
        </p>
      </div>
    </div>
  )
}
