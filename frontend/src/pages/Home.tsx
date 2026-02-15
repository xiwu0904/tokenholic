import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockCustomers } from '../mocks'

function Home() {
  const navigate = useNavigate()
  const [customerName, setCustomerName] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customerName.trim()) {
      navigate(`/token-map?customer=${encodeURIComponent(customerName)}`)
    }
  }

  const handleCustomerClick = (name: string) => {
    navigate(`/token-map?customer=${encodeURIComponent(name)}`)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-orange-600/15 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        {/* Floating geometric shapes */}
        <div className={`absolute top-20 left-[15%] w-24 h-24 border border-orange-500/20 rotate-45 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`} 
             style={{ animationDelay: '200ms' }} />
        <div className={`absolute bottom-32 right-[20%] w-16 h-16 border border-white/10 rotate-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ animationDelay: '400ms' }} />
        <div className={`absolute top-1/3 right-[10%] w-4 h-4 bg-orange-500/60 rounded-full transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
             style={{ animationDelay: '600ms' }} />
        <div className={`absolute bottom-1/4 left-[8%] w-3 h-3 bg-white/40 rounded-full transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
             style={{ animationDelay: '800ms' }} />

        {/* Main content */}
        <div className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <span className="text-2xl font-black text-white">T</span>
              </div>
              <span className="text-3xl font-light tracking-wider text-white/90">
                TOKEN<span className="font-bold text-orange-500">HOLIC</span>
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6 leading-[1.1]">
            <span className="block text-white/60">Map Your Customer's</span>
            <span className="block mt-2 font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              AI Token Universe
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/40 font-light max-w-2xl mx-auto mb-12 tracking-wide">
            Discover AI usage patterns, estimate token consumption, and unlock sales opportunities with intelligent analysis
          </p>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/50 via-orange-600/50 to-orange-500/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-500" />
              
              {/* Input container */}
              <div className="relative flex items-center bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-orange-500/30 group-focus-within:border-orange-500/50">
                <div className="pl-6 pr-3 text-white/30">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name to begin..."
                  className="flex-1 py-5 px-2 bg-transparent text-white placeholder-white/30 text-lg font-light focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!customerName.trim()}
                  className="m-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  Analyze
                </button>
              </div>
            </div>
          </form>

          {/* Scroll indicator */}
          <div className="mt-20 animate-bounce">
            <button 
              onClick={() => document.getElementById('customers')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white/30 hover:text-orange-500 transition-colors"
            >
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-xs tracking-widest uppercase mt-2 block">Scroll</span>
            </button>
          </div>
        </div>
      </section>

      {/* Previous Customers Section */}
      <section id="customers" className="relative py-32 px-6">
        {/* Section header */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-white/40 text-sm tracking-[0.3em] uppercase font-light">Previous Analysis</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extralight text-center text-white/90">
            Your <span className="font-semibold text-orange-500">Customers</span>
          </h2>
        </div>

        {/* Customer cards grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCustomers.map((customer, index) => (
            <button
              key={customer.id}
              onClick={() => handleCustomerClick(customer.name)}
              className="group relative p-6 text-left bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl transition-all duration-500 hover:bg-white/[0.05] hover:border-orange-500/30 hover:scale-[1.02] hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Industry badge */}
                <span className="inline-block px-3 py-1 text-xs tracking-wider uppercase bg-orange-500/10 text-orange-500 rounded-full mb-4">
                  {customer.industry}
                </span>
                
                {/* Company name */}
                <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {customer.name}
                </h3>
                
                {/* Description */}
                <p className="text-white/40 text-sm font-light line-clamp-2 mb-4">
                  {customer.description}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                  <span className="text-white/30 text-xs">
                    Last updated {new Date(customer.updated_at).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">View</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}

          {/* Add new customer card */}
          <button
            onClick={() => document.querySelector('input')?.focus()}
            className="group relative p-6 flex flex-col items-center justify-center min-h-[240px] border-2 border-dashed border-white/[0.1] rounded-2xl transition-all duration-500 hover:border-orange-500/50 hover:bg-white/[0.02]"
          >
            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.1] flex items-center justify-center mb-4 group-hover:border-orange-500/30 group-hover:bg-orange-500/10 transition-all">
              <svg className="w-8 h-8 text-white/30 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-white/30 font-light group-hover:text-white/60 transition-colors">Add New Customer</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/30">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">T</span>
            </div>
            <span className="text-sm">TokenHolic</span>
          </div>
          <p className="text-white/20 text-sm font-light">
            AI-powered sales enablement for Alibaba Cloud
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
