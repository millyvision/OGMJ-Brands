import { useState, useEffect } from 'react'
import { 
  Rocket, Briefcase, FileText, LayoutDashboard, 
  Settings, CreditCard, ExternalLink, Calendar, 
  ChevronRight, Sparkles, TrendingUp, Search, Bell,
  Globe, Layout, Activity, Plus
} from 'lucide-react'
import { blink } from '../blink/client'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [assets, setAssets] = useState<any[]>([])
  const [websites, setWebsites] = useState<any[]>([])
  const [domains, setDomains] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchData()
    }
  }, [isAuthenticated, user])

  const fetchData = async () => {
    try {
      const [cRes, aRes, wRes, dRes] = await Promise.all([
        blink.db.boostCampaigns.list({ where: { userId: user!.id } }),
        blink.db.brandAssets.list({ where: { userId: user!.id } }),
        blink.db.websites.list({ where: { userId: user!.id } }),
        blink.db.domains.list({ where: { userId: user!.id } })
      ])
      setCampaigns(cRes)
      setAssets(aRes)
      setWebsites(wRes)
      setDomains(dRes)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  if (loading) return null
  if (!isAuthenticated) return null

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            Welcome back, <span className="text-primary font-semibold">{user?.displayName || user?.email}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
            { id: 'websites', name: 'My Websites', icon: Layout, count: websites.length },
            { id: 'domains', name: 'My Domains', icon: Globe, count: domains.length },
            { id: 'campaigns', name: 'My Boost Campaigns', icon: Rocket, count: campaigns.length },
            { id: 'assets', name: 'Brand Assets', icon: Sparkles, count: assets.length },
            { id: 'orders', name: 'My Payments', icon: CreditCard },
            { id: 'settings', name: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-muted-foreground hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </div>
              {item.count !== undefined && (
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full">{item.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Website Views', value: '0', icon: Activity },
                  { label: 'Active Boosts', value: campaigns.filter(c => c.status === 'active').length, icon: TrendingUp },
                  { label: 'Domains Owned', value: domains.length, icon: Globe },
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-6 rounded-3xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Websites */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Recent Websites</h2>
                  <button onClick={() => setActiveTab('websites')} className="text-sm text-primary hover:underline">View All</button>
                </div>
                {websites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {websites.slice(0, 2).map((site) => (
                      <div key={site.id} className="glass-card p-6 rounded-3xl group cursor-pointer hover:border-primary/50 transition-all space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Layout className="text-primary w-5 h-5" />
                          </div>
                          <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full uppercase font-bold text-muted-foreground">{site.status}</span>
                        </div>
                        <div>
                          <h3 className="font-bold">{site.name}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-1">{site.description}</p>
                        </div>
                        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                          <span className="text-[10px] text-muted-foreground uppercase">{new Date(site.createdAt).toLocaleDateString()}</span>
                          <button className="text-xs font-bold text-primary flex items-center gap-1">
                            Edit <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 glass-card rounded-3xl text-center space-y-4 border-dashed">
                    <Layout className="w-12 h-12 text-muted-foreground mx-auto opacity-20" />
                    <p className="text-muted-foreground">No websites built yet.</p>
                    <Link to="/builder" className="btn-primary py-2 px-6 text-sm inline-block">Build My Website</Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'websites' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Websites</h2>
                <Link to="/builder" className="btn-primary py-2 px-6 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" /> New Website
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {websites.map((site) => (
                  <div key={site.id} className="glass-card p-8 rounded-3xl space-y-6 group">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Layout className="text-primary w-6 h-6" />
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[10px] px-2 py-1 bg-primary/10 text-primary rounded-full font-bold uppercase">{site.status}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{site.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{site.industry} industry</p>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex gap-3">
                      <button className="flex-1 btn-secondary py-2 text-xs">Edit Content</button>
                      <button className="flex-1 btn-primary py-2 text-xs">Deploy Live</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'domains' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Domains</h2>
                <Link to="/domains" className="btn-primary py-2 px-6 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Register Domain
                </Link>
              </div>
              <div className="space-y-4">
                {domains.map((d) => (
                  <div key={d.id} className="glass-card p-6 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Globe className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold">{d.domain_name}</h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">Expires: {new Date(d.expiry_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-xs font-bold uppercase text-primary">{d.status}</span>
                      </div>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
                {domains.length === 0 && (
                  <div className="p-20 glass-card rounded-3xl text-center space-y-4 border-dashed">
                    <Globe className="w-12 h-12 text-muted-foreground mx-auto opacity-20" />
                    <p className="text-muted-foreground">No custom domains registered yet.</p>
                    <Link to="/domains" className="btn-primary py-2 px-8 text-sm inline-block">Search Domains</Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Social Media Boosts</h2>
              {campaigns.map((c) => (
                <div key={c.id} className="glass-card p-6 rounded-3xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Rocket className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg uppercase">{c.platform} Campaign</h3>
                        <p className="text-sm text-muted-foreground uppercase">{c.goal} objective</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">${c.budget * c.duration}</div>
                      <div className="text-xs text-muted-foreground">Total Budget</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground block mb-1">Status</span>
                      <span className="text-sm font-semibold text-primary">{c.status}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground block mb-1">Duration</span>
                      <span className="text-sm font-semibold">{c.duration} Days</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground block mb-1">Daily Budget</span>
                      <span className="text-sm font-semibold">${c.budget}</span>
                    </div>
                    <div className="text-right">
                      <button className="text-xs text-primary hover:underline flex items-center gap-1 ml-auto">
                        Details <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {assets.map((a) => (
                <div key={a.id} className="glass-card p-6 rounded-3xl flex flex-col hover:border-primary/50 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Sparkles className="text-primary w-5 h-5" />
                    </div>
                    <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full uppercase font-bold text-muted-foreground">{a.assetType}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-4 flex-1 mb-6 italic leading-relaxed">
                    "{a.content}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</span>
                    <button className="text-sm font-bold text-primary flex items-center gap-1">
                      Download PDF <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {assets.length === 0 && (
                <div className="col-span-2 p-20 glass-card rounded-3xl text-center space-y-4 border-dashed">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto opacity-20" />
                  <p className="text-muted-foreground">You haven't generated any brand assets yet.</p>
                  <Link to="/services" className="btn-primary py-2 px-8 text-sm inline-block">Explore Services</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
