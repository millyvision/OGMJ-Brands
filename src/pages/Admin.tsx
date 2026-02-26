import { useState, useEffect } from 'react'
import { 
  Users, CreditCard, Rocket, MessageSquare, 
  ChevronRight, ArrowUpRight, Search, Shield
} from 'lucide-react'
import { blink } from '../blink/client'
import { useAuth } from '../hooks/useAuth'

export function Admin() {
  const { user, isAuthenticated } = useAuth()
  const [stats, setStats] = useState({ users: 0, campaigns: 0, orders: 0, messages: 0 })
  const [recentMessages, setRecentMessages] = useState<any[]>([])

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData()
    }
  }, [isAuthenticated])

  const fetchAdminData = async () => {
    try {
      // In a real app, these counts would be fetched from the backend
      // Here we just fetch recent messages as an example
      const messages = await blink.db.messages.list({ limit: 5, orderBy: { createdAt: 'desc' } })
      setRecentMessages(messages)
      
      // Simulated stats
      setStats({
        users: 124,
        campaigns: 48,
        orders: 86,
        messages: 12
      })
    } catch (error) {
      console.error('Error fetching admin data:', error)
    }
  }

  if (!isAuthenticated) return null

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
          <Shield className="text-primary w-6 h-6" />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground">Platform-wide overview and management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Users', value: stats.users, icon: Users, color: 'text-blue-400' },
          { label: 'Active Campaigns', value: stats.campaigns, icon: Rocket, color: 'text-primary' },
          { label: 'Total Sales', value: stats.orders, icon: CreditCard, color: 'text-amber-400' },
          { label: 'New Messages', value: stats.messages, icon: MessageSquare, color: 'text-rose-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl space-y-2">
            <div className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Inquiries</h2>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <div className="divide-y divide-white/5">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="p-8 hover:bg-white/5 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold">{msg.name}</div>
                    <span className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-primary mb-3">{msg.email}</div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {msg.message}
                  </p>
                </div>
              ))}
              {recentMessages.length === 0 && (
                <div className="p-12 text-center text-muted-foreground italic">
                  No messages yet.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
            <h2 className="text-xl font-bold">Platform Status</h2>
            <div className="space-y-4">
              {[
                { name: 'AI Generation Service', status: 'Operational' },
                { name: 'Ads API Integration', status: 'Operational' },
                { name: 'Payment Processing', status: 'Operational' },
                { name: 'Database Clusters', status: 'Operational' },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="font-medium">{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-[2.5rem] bg-primary/10 border-primary/20">
            <h3 className="font-bold mb-2">System Performance</h3>
            <p className="text-sm text-muted-foreground mb-4">Current load is low. Automation cycles running at peak efficiency.</p>
            <div className="flex items-center gap-2 text-primary font-bold">
              99.9% Uptime <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
