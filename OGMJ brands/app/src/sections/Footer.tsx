const footerLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Social Booster', href: '#social-booster' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Privacy', href: '#' },
];

const socialLinks = [
  { name: 'TikTok', href: 'https://www.tiktok.com/@ogmj.branding.age?_r=1&_t=ZS-942Q1PRH9hx' },
  { name: 'WhatsApp', href: 'https://wa.me/2348109720301' },
];

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-dark border-t border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-white font-bold text-lg tracking-wider">
              OGMJ <span className="text-lime">BRANDS</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime hover:text-lime/80 text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-white/40 text-sm">
            © OGMJ BRANDS. All rights reserved.
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-white/30 text-xs text-center max-w-3xl mx-auto">
            This platform provides guided application support only. Final approval and document issuance are handled by official government or authorized agencies. We are not a government entity and do not process documents directly.
          </p>
        </div>
      </div>
    </footer>
  );
}
