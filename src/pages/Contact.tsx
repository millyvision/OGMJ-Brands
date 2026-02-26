import { useState } from 'react'
import { Mail, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { blink } from '../blink/client'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await blink.db.messages.create({
        name: formData.name,
        email: formData.email,
        message: formData.message
      })
      
      setIsSent(true)
      toast.success('Message sent successfully!')
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">Get in Touch</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
              Have questions about OGMJ Brands? Our automated support system is here 24/7, or you can message our team directly.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-all shrink-0">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-lg">Email Us</h4>
                <p className="text-muted-foreground">Our team typically responds within 4 hours.</p>
                <a href="mailto:ogmjbrandingagency@gmail.com" className="text-primary hover:underline font-medium block pt-1">
                  ogmjbrandingagency@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-all shrink-0">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-lg">WhatsApp Support</h4>
                <p className="text-muted-foreground">Available for priority business accounts.</p>
                <a href="tel:+2348109720301" className="text-primary hover:underline font-medium block pt-1">
                  +2348109720301
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem]">
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <textarea 
                  required
                  rows={6}
                  placeholder="How can we help scale your brand?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button 
                disabled={isSubmitting}
                className="w-full btn-primary h-14 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-in space-y-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center shadow-glow">
                <CheckCircle2 className="text-primary w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">Message Received!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Thank you for reaching out. We've stored your message and our team will get back to you shortly.
                </p>
              </div>
              <button 
                onClick={() => setIsSent(false)}
                className="btn-secondary px-8"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
