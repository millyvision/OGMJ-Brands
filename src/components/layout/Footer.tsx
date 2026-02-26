import { Link } from 'react-router-dom'
import { Mail, Phone, Instagram, Twitter, Linkedin, Github, Rocket } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Rocket className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">OGMJ BRANDS</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-8">
              The world's most automated AI-powered branding and business growth platform. 
              100% self-service. No bots. No fakes. Just results.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-muted-foreground hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/boost" className="text-muted-foreground hover:text-white transition-colors">Boost</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>ogmjbrandingagency@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+2348109720301</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 OGMJ Brands Platform. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
