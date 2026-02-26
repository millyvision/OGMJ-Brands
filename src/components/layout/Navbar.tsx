import { Link, useLocation } from 'react-router-dom'
import { Rocket, LayoutDashboard, Briefcase, Zap, Mail, LogOut, Menu, X, Layout, Globe } from 'lucide-react'
import { useState } from 'react'
import { blink } from '../../blink/client'
import { useAuth } from '../../hooks/useAuth'

export function Navbar() {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/', icon: Zap },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'Boost', path: '/boost', icon: Rocket },
    { name: 'Websites', path: '/builder', icon: Layout },
    { name: 'Domains', path: '/domains', icon: Globe },
    { name: 'Pricing', path: '/pricing', icon: Zap },
    { name: 'Contact', path: '/contact', icon: Mail },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 my-4 rounded-2xl border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-glow">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 tracking-tight">
            OGMJ BRANDS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive(item.path)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
          <div className="h-6 w-[1px] bg-white/10 mx-2" />
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="btn-primary py-2 text-sm flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={() => blink.auth.signOut()}
                className="p-2 text-muted-foreground hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => blink.auth.login()}
              className="btn-primary py-2 text-sm"
            >
              Get Started
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 border-t border-white/5 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                isActive(item.path)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary text-center"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    blink.auth.signOut()
                    setIsOpen(false)
                  }}
                  className="btn-secondary text-center"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  blink.auth.login()
                  setIsOpen(false)
                }}
                className="btn-primary text-center"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
