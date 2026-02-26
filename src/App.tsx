import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { Boost } from './pages/Boost'
import { WebsiteBuilder } from './pages/WebsiteBuilder'
import { Domains } from './pages/Domains'
import { Dashboard } from './pages/Dashboard'
import { Pricing } from './pages/Pricing'
import { Contact } from './pages/Contact'
import { Admin } from './pages/Admin'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/boost" element={<Boost />} />
          <Route path="/builder" element={<WebsiteBuilder />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" theme="dark" richColors />
    </Router>
  )
}

export default App
