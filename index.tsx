import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu,
  Instagram,
  Facebook,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  Phone,
  ArrowRight,
  Plus,
  Minus,
  Search,
  MapPin,
  Calendar,
  Clock,
  Wine,
  Users,
  Camera,
  Mail,
  X,
  Ticket,
  Sparkles
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
type Page = 'HOME' | 'EVENTS' | 'BRUNCH' | 'DRINKS' | 'BOOK' | 'PRIVATE_HIRE' | 'GALLERY' | 'CONTACT' | 'LEGAL' | 'DESIGN';

// --- Shared UI Components ---

const Button = ({ children, onClick, variant = 'primary', className = '' }: { children?: React.ReactNode, onClick?: () => void, variant?: 'primary' | 'secondary' | 'outline', className?: string }) => {
  const baseStyles = "px-6 py-2.5 rounded-full font-black uppercase tracking-widest text-[14px] md:text-base transition-all transform active:scale-95 inline-flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-[#f97316] text-[#1a1512] hover:bg-white hover:text-black",
    secondary: "bg-white text-[#1a1512] hover:bg-[#1a1512] hover:text-white",
    outline: "border-2 border-white/20 text-white hover:bg-[#f97316] hover:border-[#f97316]"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const PageHero = ({ title, subtitle, videoSrc, imageSrc, children }: { title: string, subtitle?: string, videoSrc?: string, imageSrc?: string, children?: React.ReactNode }) => (
  <section className="relative pt-20 bg-[#2d0a14] overflow-hidden min-h-screen flex flex-col items-center justify-center text-center">
    <div className="absolute inset-0 w-full h-full z-0">
      {videoSrc ? (
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img src={imageSrc} className="w-full h-full object-cover" alt="" />
      )}
      <div className="absolute inset-0 bg-[#2d0a14]/70" />
    </div>
    <div className="relative z-10 max-w-4xl px-6">
      {subtitle && <p className="text-[#f97316] text-[13px] md:text-base font-black uppercase tracking-[0.6em] mb-4">{subtitle}</p>}
      <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8 drop-shadow-2xl italic">
        {title}
      </h1>
      {children}
    </div>
  </section>
);

// --- Navigation ---

const Header = ({ currentView, setView }: { currentView: Page, setView: (p: Page) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string, view: Page }[] = [
    { label: "Events", view: 'EVENTS' },
    { label: "Brunch", view: 'BRUNCH' },
    { label: "Drinks", view: 'DRINKS' },
    { label: "Private Hire", view: 'PRIVATE_HIRE' },
    { label: "Gallery", view: 'GALLERY' },
    { label: "Contact", view: 'CONTACT' },
    { label: "Design", view: 'DESIGN' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f97316] text-[#1a1512] h-16 flex items-center px-6 md:px-12 shadow-sm border-b border-black/5">
        <div className="flex items-center space-x-12">
          {/* Logo - Far Left */}
          <img
            src="/logo.png"
            alt="ORANGE ROOMS"
            className="h-8 md:h-10 w-auto cursor-pointer"
            style={{ filter: 'brightness(0)' }}
            onClick={() => setView('HOME')}
          />

          {/* Social Icons - Near Logo */}
          <div className="hidden lg:flex items-center space-x-5 border-l border-black/10 pl-10">
            <Instagram className="w-4 h-4 cursor-pointer hover:opacity-100 opacity-60 transition-opacity" />
            <Facebook className="w-4 h-4 cursor-pointer hover:opacity-100 opacity-60 transition-opacity" />
            <Phone className="w-4 h-4 cursor-pointer hover:opacity-100 opacity-60 transition-opacity" />
          </div>
        </div>

        {/* Big Spacer in Middle */}
        <div className="flex-1" />

        {/* Navigation Links - Right Side */}
        <nav className="hidden xl:flex items-center space-x-8 text-[14px] font-black uppercase tracking-[0.2em]">
          {navItems.map(item => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`hover:text-[#1a1512]/60 transition-all ${currentView === item.view ? 'text-[#1a1512]' : 'text-[#1a1512]/70'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Section - Far Right with Separator */}
        <div className="flex items-center space-x-8 ml-10 pl-10 border-l border-black/10 h-8">
          <Button
            variant="secondary"
            className="!py-2 !px-6 hidden sm:flex text-[14px] group"
            onClick={() => setView('BOOK')}
          >
            BOOK NOW <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>

          <button className="xl:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#2d0a14] flex flex-col p-8 text-white">
          <div className="flex justify-between items-center mb-12">
            <img
              src="/logo.png"
              alt="ORANGE ROOMS"
              className="h-10 w-auto"
            />
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-10 h-10 text-[#f97316]" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            <button onClick={() => { setView('HOME'); setMobileMenuOpen(false); }} className="text-5xl font-black uppercase italic tracking-tighter text-left">Home</button>
            {navItems.map(item => (
              <button
                key={item.view}
                onClick={() => { setView(item.view); setMobileMenuOpen(false); }}
                className="text-5xl font-black uppercase italic tracking-tighter text-left"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

// --- Homepage Sections ---

const ProductCarousel = () => {
  const [activeCategory, setActiveCategory] = useState('GARDEN');

  const products = [
    { name: "Neon Jungle Garden", category: 'GARDEN', image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=400" },
    { name: "Tiki Table Booking", category: 'GARDEN', image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400" },
    { name: "Secret Garden Sip", category: 'GARDEN', image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400" },
    { name: "Floral Terrace", category: 'GARDEN', image: "https://images.unsplash.com/photo-1597075687490-8f673c6c179a?q=80&w=400" },
    { name: "Main Room Table", category: 'LOUNGE', image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=400" },
    { name: "Velvet Booth Service", category: 'LOUNGE', image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c3d?q=80&w=400" },
    { name: "Artisanal Cocktail Bar", category: 'LOUNGE', image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400" },
    { name: "Corner Chill Zone", category: 'LOUNGE', image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400" },
    { name: "Dance Floor VIP", category: 'CLUB', image: "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=400" },
    { name: "DJ Booth Table", category: 'CLUB', image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400" },
    { name: "Bottomless Cocktails", category: 'CLUB', image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=400" },
    { name: "Legendary Club Night", category: 'CLUB', image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400" },
  ];

  const filteredProducts = products.filter(p => p.category === activeCategory);

  return (
    <section className="bg-[#2d0a14] py-24 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <p className="text-white/60 text-sm font-black uppercase tracking-[0.4em] mb-8">Speaking Of Vibes From Plants...</p>
        <div className="flex items-center justify-center space-x-12 mb-16">
          {['GARDEN', 'LOUNGE', 'CLUB'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`transition-all duration-300 font-black uppercase text-sm pb-2 border-b-2 ${activeCategory === cat ? 'text-[#f97316] border-[#f97316]' : 'text-white/40 hover:text-white border-transparent'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 relative">
                <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-white font-black uppercase text-base mb-4">{p.name}</h3>
              <div className="flex items-center justify-center space-x-4">
                <a href="#" className="text-[#f97316] text-[13px] font-black uppercase underline decoration-2 underline-offset-4">Learn More</a>
                <a href="#" className="text-white text-[13px] font-black uppercase underline decoration-2 underline-offset-4">Find It</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PotluckGrid = () => {
  const recipes = [
    { title: "Neon Jungle Garden Party", tag: "AN EASY NIGHT", image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1000", servings: "Table for 4", items: "3 Cocktails", difficulty: "Expert" },
    { title: "Saturday Bottomless Brunch", tag: "THE VIBE", image: "https://images.unsplash.com/photo-1525268771113-32d9e9bb2d40?q=80&w=1000", servings: "Groups of 6", items: "Unlimited", difficulty: "Legendary" },
  ];

  return (
    <section className="bg-[#2d0a14] py-32 px-6 border-t border-white/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-white/60 text-sm font-black uppercase tracking-[0.4em] mb-4">Want Nightlife Inspo? We Got You.</p>
          <div className="flex justify-center space-x-4 mb-12">
            <button className="bg-white/10 text-white px-4 py-1 rounded-full text-[13px] font-black uppercase">Garden</button>
            <button className="bg-white/10 text-white px-4 py-1 rounded-full text-[13px] font-black uppercase">Cocktails</button>
            <button className="bg-white/10 text-white px-4 py-1 rounded-full text-[13px] font-black uppercase">Food</button>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Minus className="w-4 h-4 text-[#f97316]" />
            <p className="text-white text-sm font-black uppercase tracking-[0.4em]">Flex On Everyone At</p>
            <Minus className="w-4 h-4 text-[#f97316]" />
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-[#f97316] uppercase tracking-tighter leading-none italic">THE POTLUCK</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {recipes.map((r, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 border-4 border-white/5">
                <img src={r.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
              </div>
              <div className="text-center">
                <span className="bg-[#f97316] text-[#1a1512] px-3 py-1 text-[12px] font-black uppercase rounded-full">{r.tag}</span>
                <h3 className="text-white text-3xl font-black uppercase tracking-tighter mt-4 mb-6">{r.title}</h3>
                <div className="flex items-center justify-center space-x-6 text-[13px] font-black uppercase tracking-widest text-white/50">
                  <span>{r.servings}</span>
                  <span>{r.items} Items</span>
                  <span>{r.difficulty}</span>
                </div>
                <button className="mt-8 border-2 border-[#f97316] text-[#f97316] px-8 py-2 rounded-full text-[13px] font-black uppercase hover:bg-[#f97316] hover:text-[#1a1512] transition-all">View Vibes</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 flex justify-center">
          <Button variant="primary" className="!py-4 !px-16">See All Vibes <Plus className="inline w-3 h-3 ml-2" /></Button>
        </div>
      </div>
    </section>
  );
};

const MissionSection = () => (
  <section className="bg-[#f97316] py-32 px-6 text-center">
    <div className="container mx-auto max-w-4xl">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <Plus className="w-4 h-4 text-[#2d0a14]" />
        <p className="text-[#2d0a14] text-sm font-black uppercase tracking-[0.4em]">Our</p>
        <Plus className="w-4 h-4 text-[#2d0a14]" />
      </div>
      <div className="relative inline-block mb-12">
        <h2 className="text-7xl md:text-[10rem] font-black text-[#2d0a14] uppercase tracking-tighter leading-none italic">MISSION</h2>
        <div className="absolute -top-4 -right-12 bg-[#2d0a14] text-[#f97316] p-2 rounded-full w-20 h-20 flex items-center justify-center rotate-12">
          <span className="text-[12px] font-black uppercase leading-tight">Small <br /> Actions <br /> Big <br /> Change</span>
        </div>
      </div>
      <p className="text-[#2d0a14] text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-wider">
        We strive to make hospitality that's delicious, better for the planet, and way better for the vibe. "The way to solve the most important and urgent problem humanity has potentially ever faced turned out to be to figure out how to make the best drink on earth."
      </p>
      <p className="mt-12 text-[#2d0a14] font-black uppercase text-sm tracking-[0.3em]">The Founder of Orange Rooms</p>
    </div>
  </section>
);

const FeatureTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Table Service", "VIP Lounge", "Private Hire", "Nightlife"];

  return (
    <section className="bg-[#2d0a14] py-32 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-4">
            {tabs.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`w-full flex items-center justify-between p-6 rounded-xl transition-all ${activeTab === i ? 'bg-[#f97316] text-[#1a1512]' : 'bg-white/5 text-white hover:bg-white/10'}`}
              >
                <span className="text-sm font-black uppercase tracking-widest">{t}</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === i ? 'rotate-180' : ''}`} />
              </button>
            ))}
          </div>
          <div className="bg-[#1a050b] p-12 rounded-[3rem] border-4 border-white/5 relative overflow-hidden group min-h-[500px] flex items-center">
            <div className="absolute bottom-[-40px] right-[-20px] w-32 h-48 bg-[#f97316] rounded-3xl flex items-center justify-center p-4 transform rotate-12 opacity-90 transition-transform group-hover:rotate-6 z-0">
              <div className="grid grid-cols-2 gap-3 opacity-30">
                {[...Array(6)].map((_, i) => <div key={i} className="w-7 h-7 rounded-full border-4 border-black" />)}
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8 italic max-w-xl">
                We are all about making <span className="text-[#f97316]">unbelievably</span> tasty cocktails.
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-12 font-bold max-w-xl">
                Our hospitality products are nutrient-packed and have 0% boredom. And our super meaty vibe? That's what makes us kind of famous. Our protein/serving is 33% less fat than the animal version. Aren't plants amazing?
              </p>
              <Button variant="primary" className="!px-12 !py-4 shadow-xl">Book This Experience</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FAQ with AI Integration ---

const FAQ = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  // AI Vibe Concierge interaction following latest SDK guidelines
  const askConcierge = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAnswer('');

    // Always initialize a fresh instance before making a call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: "You are the AI Vibe Concierge at Orange Rooms Southampton. Be enthusiastic, edgy, and helpful. Use emojis. Keep answers focused on nightlife, drinks, and events at Orange Rooms. Be very concise and cool.",
        },
      });
      // Correct usage of .text property
      setAnswer(response.text || "The vibe is slightly distorted. Try asking again!");
    } catch (e) {
      setAnswer("Our vibe sensors are temporarily offline. Catch us on the dance floor!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#2d0a14] py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Minus className="w-4 h-4 text-[#f97316]" />
            <p className="text-white text-sm font-black uppercase tracking-[0.4em]">Browse Our</p>
            <Minus className="w-4 h-4 text-[#f97316]" />
          </div>
          <h2 className="text-7xl md:text-9xl font-black text-[#f97316] uppercase tracking-tighter leading-none italic">FAQ'S</h2>
        </div>

        {/* Gemini powered Concierge UI */}
        <div className="mb-20 bg-[#1a050b] p-8 md:p-12 rounded-[3rem] border-4 border-[#f97316]/20 relative">
          <h3 className="text-white text-2xl font-black uppercase mb-6 flex items-center gap-3 italic">
            <Sparkles className="w-6 h-6 text-[#f97316]" /> AI Vibe Concierge
          </h3>
          <p className="text-white/60 text-sm font-bold uppercase mb-8 tracking-widest">Ask about drinks, dress code, or event vibes.</p>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && askConcierge()}
              placeholder="What's the dress code tonight?..."
              className="flex-1 bg-white/5 border-2 border-white/10 p-4 rounded-full text-white outline-none focus:border-[#f97316] font-bold uppercase tracking-widest text-sm"
            />
            <Button onClick={askConcierge} className="!px-10">
              {loading ? 'Analyzing...' : 'Ask Vibe Concierge'}
            </Button>
          </div>
          {answer && (
            <div className="mt-8 p-6 bg-[#f97316]/10 rounded-2xl border border-[#f97316]/30 text-white font-bold animate-in fade-in slide-in-from-top-4 tracking-wide uppercase text-sm">
              {answer}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {[
            "WHAT ARE THE INGREDIENTS IN ORANGE ROOMS VIBES?",
            "WHAT IS THE DRESS CODE FOR SATURDAYS?",
            "DO YOU HOST PRIVATE EVENTS?"
          ].map((q, i) => (
            <div key={i} className="bg-[#1a050b] p-8 rounded-2xl border-4 border-white/5 flex items-center justify-between group cursor-pointer hover:border-[#f97316]/40 transition-all">
              <span className="text-white text-sm md:text-xl font-black uppercase tracking-tight">{q}</span>
              <ChevronRight className="w-6 h-6 text-white group-hover:rotate-90 transition-transform group-hover:text-[#f97316]" />
            </div>
          ))}
        </div>
        <div className="mt-32 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Plus className="w-4 h-4 text-[#f97316]" />
            <p className="text-white text-sm font-black uppercase tracking-[0.4em]">Still</p>
            <Plus className="w-4 h-4 text-[#f97316]" />
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic mb-12">HAVE <br /> QUESTIONS?</h2>
          <div className="flex justify-center">
            <Button variant="primary" className="!px-16">Find Help <Plus className="inline w-3 h-3 ml-2" /></Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const MeatLocator = () => (
  <section className="bg-[#2d0a14] py-32 px-6">
    <div className="container mx-auto max-w-5xl">
      <div className="bg-[#fde6d2] rounded-[3rem] overflow-hidden p-12 md:p-24 text-center relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1000')] bg-cover grayscale" />
        <div className="relative z-10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Minus className="w-4 h-4 text-[#f97316]" />
            <p className="text-[#1a1512] text-xs font-black uppercase tracking-[0.4em]">Experience</p>
            <Minus className="w-4 h-4 text-[#f97316]" />
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-[#1a1512] uppercase tracking-tighter leading-none italic mb-8">LOCATOR</h2>
          <p className="text-[#1a1512] text-lg md:text-xl font-bold max-w-xl mx-auto mb-12 uppercase tracking-wider">Where's the vibe? This map knows. And it can even give you directions to all the Orange Rooms vibes you could want.</p>
          <div className="flex justify-center">
            <Button variant="primary" className="!bg-[#1a1512] !text-white !px-16 hover:!bg-[#f97316]">Get Directions <Plus className="inline w-3 h-3 ml-2" /></Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Page Components ---

const HomePage = ({ setView }: { setView: (p: Page) => void }) => {
  return (
    <>
      <PageHero
        title="ORANGE VIBES"
        subtitle="ESTABLISHED 2001"
        videoSrc="https://www.orangerooms.co.uk/wp-content/uploads/2024/02/x2mate.com-Orange-Rooms-Cocktails-LG-1080p.mp4"
      >
        <div className="mt-8 flex justify-center">
          <Button onClick={() => setView('EVENTS')} className="!py-4 !px-12">See What's On <Plus className="w-4 h-4" /></Button>
        </div>
      </PageHero>
      <ProductCarousel />
      <PotluckGrid />
      <MissionSection />
      <FeatureTabs />
      <FAQ />
      <MeatLocator />
    </>
  );
};

const EventsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerId = 'fixr-widget-container';

  useEffect(() => {
    const initWidget = () => {
      const FixrWidget = (window as any).FixrWidget;
      if (FixrWidget) {
        const container = document.getElementById(containerId);
        if (container) container.innerHTML = '';

        try {
          FixrWidget.create({
            containerId: containerId,
            shopSlug: 'orange-rooms',
            theme: 'dark'
          });
          setTimeout(() => setIsLoading(false), 1000);
        } catch (e) {
          console.error("FIXR Widget error:", e);
          setIsLoading(false);
        }
      }
    };

    const scriptId = 'fixr-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://fixr.co/widget/fixr-widget.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      if ((window as any).FixrWidget) {
        initWidget();
      } else {
        script.onload = initWidget;
      }
    }
  }, []);

  return (
    <div className="bg-[#2d0a14]">
      <PageHero
        title="LIVE EVENTS"
        subtitle="GET YOUR TICKETS"
        videoSrc="https://www.orangerooms.co.uk/wp-content/uploads/2024/02/x2mate.com-Orange-Rooms-Cocktails-LG-1080p.mp4"
      >
        <div className="mt-4 flex items-center justify-center gap-2 text-[#f97316]">
          <Ticket className="w-6 h-6" />
          <span className="text-xs font-black uppercase tracking-[0.4em]">Secure Tickets via FIXR</span>
        </div>
      </PageHero>

      <section className="py-24 px-6 bg-[#1a050b] border-t border-white/5 min-h-[800px] relative">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Upcoming Lineup</h2>
            <div className="w-24 h-1 bg-[#f97316] mx-auto rounded-full" />
          </div>

          <div className="max-w-6xl mx-auto bg-[#120408] p-4 md:p-8 rounded-[3rem] border-4 border-white/5 shadow-2xl relative overflow-hidden min-h-[400px]">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 text-white/20 bg-[#120408] z-20">
                <div className="w-12 h-12 border-4 border-t-[#f97316] border-white/10 rounded-full animate-spin" />
                <p className="font-black uppercase tracking-widest text-xs">Loading Live Tickets...</p>
              </div>
            )}
            <div id={containerId}></div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 container mx-auto text-center border-t border-white/5">
        <p className="text-white/40 text-xs font-black uppercase tracking-[0.4em] mb-4">Planning a big group night?</p>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-12">VIP TABLE ENQUIRIES</h2>
        <div className="flex justify-center">
          <Button variant="primary" className="!px-16 !py-5 shadow-2xl">Request a Table <ArrowRight className="w-5 h-5 ml-2" /></Button>
        </div>
      </section>
    </div>
  );
};

const BookPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerId = 'dmn-widget-container';

  useEffect(() => {
    const initDMN = () => {
      setTimeout(() => setIsLoading(false), 2000);
    };

    const scriptId = 'dmn-widget-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://embed.designmynight.com/dmn-widget.js";
      script.type = "text/javascript";
      script.async = true;
      script.setAttribute('data-dmn-widget-id', '5a05b1f06a9202117531773a');
      script.onload = initDMN;
      document.body.appendChild(script);
    } else {
      initDMN();
    }
  }, []);

  return (
    <div className="bg-[#2d0a14]">
      <PageHero
        title="BOOK NOW"
        subtitle="SECURE YOUR SPOT"
        imageSrc="https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1200"
      >
        <div className="mt-4 flex items-center justify-center gap-2 text-[#f97316]">
          <Calendar className="w-6 h-6" />
          <span className="text-xs font-black uppercase tracking-[0.4em]">Powered by DesignMyNight</span>
        </div>
      </PageHero>

      <section className="py-24 px-6 bg-[#1a050b] border-t border-white/5 min-h-[900px] relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8">Reservations</h2>
            <p className="text-lg text-white/60 font-bold uppercase tracking-wider mb-12">
              Orange Rooms is the perfect venue for your next party, offering multiple themed areas and the best cocktails in town. Book your table below.
            </p>
            <div className="w-24 h-1 bg-[#f97316] mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-[3rem] overflow-hidden shadow-2xl relative min-h-[600px]">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 text-[#1a1512]/20 bg-white z-20">
                <div className="w-12 h-12 border-4 border-t-[#f97316] border-[#1a1512]/10 rounded-full animate-spin" />
                <p className="font-black uppercase tracking-widest text-xs text-[#1a1512]">Fetching Booking System...</p>
              </div>
            )}
            <div className="p-4 md:p-8">
              <div id={containerId} data-dmn-widget-id="5a05b1f06a9202117531773a"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#f97316] text-[#1a1512] text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-8">BIG PLANS?</h2>
          <p className="text-xl font-bold uppercase tracking-widest mb-12">For groups larger than 12 or for full venue private hire, please contact our events team directly.</p>
          <div className="flex justify-center">
            <Button variant="secondary" className="!px-16 !py-5 shadow-2xl">Get in Touch <Mail className="w-5 h-5 ml-2" /></Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const BrunchPage = () => (
  <div className="bg-[#2d0a14]">
    <PageHero title="BOTTOMLESS BRUNCH" subtitle="BEST IN SOUTHAMPTON" imageSrc="https://images.unsplash.com/photo-1525268771113-32d9e9bb2d40?q=80&w=1200" />
    <section className="py-24 px-6 container mx-auto text-center">
      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-[#f97316] mb-8">£30 OF PURE JOY</h2>
        <p className="text-xl font-bold text-white/80 leading-relaxed uppercase tracking-widest">Unlimited prosecco, beer, or our signature cocktails paired with the legendary Orange Rooms burger. Two hours of vibing with the city's best DJs.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {['Unlimited Drinks', 'Gourmet Burger', 'Live Entertainment'].map((item, i) => (
          <div key={i} className="bg-[#1a050b] p-12 rounded-[2rem] border-4 border-white/5">
            <Plus className="w-8 h-8 text-[#f97316] mx-auto mb-6" />
            <h3 className="text-2xl font-black uppercase italic">{item}</h3>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="primary" className="!py-4 !px-16">Book Your Slot</Button>
      </div>
    </section>
  </div>
);

const DrinksPage = () => (
  <div className="bg-[#2d0a14]">
    <PageHero title="DRINKS & COCKTAILS" subtitle="MIXOLOGY MAGIC" imageSrc="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200" />
    <section className="py-24 px-6 container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-black italic uppercase text-[#f97316]">SIGNATURES</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="flex flex-col items-center text-center p-8 bg-[#1a050b] rounded-[3rem] border-2 border-white/5">
            <div className="w-24 h-24 bg-[#f97316] rounded-full flex items-center justify-center mb-6">
              <Wine className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-2xl font-black uppercase mb-2">Tiki Power Blast</h3>
            <p className="text-white/40 font-bold uppercase text-[10px] mb-4">Dark Rum, Pineapple, Secret Spices</p>
            <span className="text-[#f97316] font-black text-xl">£9.50</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const PrivateHirePage = () => (
  <div className="bg-[#2d0a14]">
    <PageHero title="PRIVATE HIRE" subtitle="YOUR OWN PARADISE" imageSrc="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200" />
    <section className="py-24 px-6 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-5xl font-black uppercase italic mb-8">THE ENTIRE VENUE OR JUST A ROOM</h2>
          <p className="text-lg text-white/60 font-bold mb-12">From corporate mixers to epic birthdays, Orange Rooms offers unique spaces. Hire our Tiki Bar for an intimate island vibe or the Garden for a neon-lit outdoor bash.</p>
          <div className="space-y-4">
            {['Tiki Bar', 'Neon Garden', 'Main Room', 'VIP Lounge'].map(room => (
              <div key={room} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="font-black uppercase tracking-widest">{room}</span>
                <Users className="w-5 h-5 text-[#f97316]" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#1a050b] p-12 rounded-[3rem] border-4 border-white/5">
          <h3 className="text-2xl font-black uppercase mb-8">Send Enquiry</h3>
          <form className="space-y-4">
            <input placeholder="Full Name" className="w-full bg-white/5 border-2 border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#f97316]" />
            <input placeholder="Email" className="w-full bg-white/5 border-2 border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#f97316]" />
            <textarea placeholder="Event Details" rows={4} className="w-full bg-white/5 border-2 border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#f97316]"></textarea>
            <Button className="w-full !py-4">Request Quote</Button>
          </form>
        </div>
      </div>
    </section>
  </div>
);

const GalleryPage = () => (
  <div className="bg-[#2d0a14]">
    <PageHero title="GALLERY" subtitle="PICTURE PERFECT" imageSrc="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200" />
    <section className="py-24 px-6 container mx-auto">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {[
          "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600",
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600",
          "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=600",
          "https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=600",
          "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=600",
          "https://images.unsplash.com/photo-1525268771113-32d9e9bb2d40?q=80&w=600",
          "https://images.unsplash.com/photo-1560624052-449f5ddf0c3d?q=80&w=600",
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=400",
          "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600"
        ].map((src, i) => (
          <div key={i} className="rounded-[2rem] overflow-hidden border-2 border-white/5 shadow-xl">
            <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
          </div>
        ))}
      </div>
    </section>
  </div>
);

// --- Brand Guide / Design Page ---

const DesignBook = () => {
  const colors = [
    { name: 'Brand Orange', hex: '#f97316', usage: 'Primary brand color, buttons, highlights, accents.' },
    { name: 'Deep Burgundy', hex: '#2d0a14', usage: 'Primary background, section headers, dramatic contrast.' },
    { name: 'Total Black', hex: '#1a1512', usage: 'Logo styling on light backgrounds, footer text, button text.' },
    { name: 'Dark Maroon', hex: '#1a050b', usage: 'Section backgrounds, containers, depth sections.' },
    { name: 'Vibe White', hex: '#ffffff', usage: 'Body text, secondary buttons, clean contrast.' },
  ];

  const typography = [
    { label: 'H1 Display', size: '8rem (Mobile: 5rem)', style: 'font-black uppercase italic tracking-tighter leading-[0.85]' },
    { label: 'H2 Section', size: '10rem (Mobile: 7rem)', style: 'font-black uppercase italic tracking-tighter' },
    { label: 'Subtitles', size: '14px', style: 'font-black uppercase tracking-[0.6em]' },
    { label: 'Body Text', size: '18px (text-lg)', style: 'font-bold uppercase tracking-wider leading-relaxed' },
    { label: 'Small Info', size: '13px', style: 'font-bold uppercase tracking-widest' },
    { label: 'Navigation', size: '14px', style: 'font-black uppercase tracking-[0.2em]' },
  ];

  return (
    <div className="bg-[#2d0a14] min-h-screen pt-32 pb-64 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32">
          <p className="text-[#f97316] text-sm font-black uppercase tracking-[0.6em] mb-4">Milktree x Orange Rooms</p>
          <h1 className="text-6xl md:text-[10rem] font-black text-white uppercase italic tracking-tighter leading-none mb-12">BRAND GUIDE</h1>
          <div className="w-24 h-1 bg-[#f97316] rounded-full" />
        </div>

        {/* Colors */}
        <section className="mb-48">
          <h2 className="text-white text-3xl font-black uppercase italic mb-16 border-b-2 border-white/5 pb-4">01. COLOR PALETTE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colors.map((c) => (
              <div key={c.hex} className="group">
                <div className="h-48 rounded-[2rem] border-4 border-white/5 mb-6 group-hover:scale-[1.02] transition-transform" style={{ backgroundColor: c.hex }} />
                <h3 className="text-white font-black text-xl uppercase italic mb-2">{c.name}</h3>
                <p className="text-[#f97316] font-black uppercase text-sm mb-4">{c.hex}</p>
                <p className="text-white/40 text-[13px] font-bold uppercase tracking-wider leading-relaxed">{c.usage}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-48">
          <h2 className="text-white text-3xl font-black uppercase italic mb-16 border-b-2 border-white/5 pb-4">02. TYPOGRAPHY</h2>
          <div className="space-y-16">
            {typography.map((t) => (
              <div key={t.label} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-b border-white/5 pb-16">
                <div>
                  <h3 className="text-white font-black text-2xl uppercase italic mb-4">{t.label}</h3>
                  <p className="text-[#f97316] font-black uppercase text-sm mb-2">Size: {t.size}</p>
                  <code className="bg-white/5 p-4 rounded-xl text-white/40 block text-xs overflow-x-auto">{t.style}</code>
                </div>
                <div className="bg-[#1a050b] p-12 rounded-[2rem] border-4 border-white/5">
                  <span className={`text-white block ${t.style}`}>The Quick Brown Fox Jumps Over The Lazy Dog</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* UI Components */}
        <section className="mb-48">
          <h2 className="text-white text-3xl font-black uppercase italic mb-16 border-b-2 border-white/5 pb-4">03. UI COMPONENTS</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <h4 className="text-[#f97316] text-sm font-black uppercase tracking-widest">Buttons</h4>
              <div className="flex flex-wrap gap-6">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
              </div>
              <div className="p-8 bg-white rounded-[2rem] flex flex-wrap gap-6">
                <Button variant="primary">Button on White</Button>
                <Button variant="secondary" className="!bg-[#1a1512] !text-white">Dark Variant</Button>
              </div>
            </div>
            <div className="space-y-12">
              <h4 className="text-[#f97316] text-sm font-black uppercase tracking-widest">Badges & Icons</h4>
              <div className="flex flex-wrap gap-6 items-center">
                <span className="bg-[#f97316] text-black px-4 py-1 text-[12px] font-black uppercase rounded-full tracking-widest">Tag Example</span>
                <div className="p-4 bg-white/5 rounded-full"><Plus className="w-6 h-6 text-[#f97316]" /></div>
                <div className="p-4 bg-white/5 rounded-full"><Minus className="w-6 h-6 text-white" /></div>
                <div className="p-1.5 bg-[#1a1512] text-white font-black px-3 py-1 uppercase text-sm">OR</div>
              </div>
            </div>
          </div>
        </section>

        {/* Layout & Spacing */}
        <section className="mb-48">
          <h2 className="text-white text-3xl font-black uppercase italic mb-16 border-b-2 border-white/5 pb-4">04. SPACING & GRIDS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[32, 24, 16, 12, 8, 4].map(s => (
              <div key={s} className="bg-[#1a050b] p-8 rounded-3xl border-4 border-white/5 text-center group">
                <div className="bg-[#f97316] mx-auto group-hover:bg-white transition-colors duration-500" style={{ width: s * 4, height: s * 4 }} />
                <p className="text-white mt-6 font-black uppercase">Level {s / 4}</p>
                <p className="text-[#f97316] text-xs font-black uppercase">{s * 4}px</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactions */}
        <section className="mb-48">
          <h2 className="text-white text-3xl font-black uppercase italic mb-16 border-b-2 border-white/5 pb-4">05. MICRO-INTERACTIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1a050b] p-12 rounded-[3rem] border-4 border-white/5 group overflow-hidden relative">
              <h3 className="text-white font-black text-2xl uppercase italic mb-6">Magnetic Scale</h3>
              <p className="text-white/40 font-bold uppercase mb-12">Active elements use a 95% scale-down transform on click for tactile feedback.</p>
              <Button className="transform active:scale-95 transition-transform" variant="secondary">Scale Down Me</Button>
            </div>
            <div className="bg-[#1a050b] p-12 rounded-[3rem] border-4 border-white/5 group overflow-hidden relative">
              <div className="absolute inset-0 bg-[#f97316] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none opacity-20" />
              <h3 className="text-white font-black text-2xl uppercase italic mb-6">Vertical Reveal</h3>
              <p className="text-white/40 font-bold uppercase mb-12">Overlays and hover masks slide up from the bottom with ease-out timing.</p>
              <span className="text-[#f97316] font-black uppercase">Hover Container</span>
            </div>
          </div>
        </section>

        {/* Image Style */}
        <section className="mb-32">
          <h2 className="text-white text-3xl font-black uppercase italic mb-16 border-b-2 border-white/5 pb-4">06. IMAGE PHILOSOPHY</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-[3rem] overflow-hidden border-4 border-white/5 relative group">
              <img src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1000" className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0" alt="" />
              <div className="absolute inset-0 bg-[#2d0a14]/60 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
            </div>
            <div className="space-y-8">
              <h3 className="text-[#f97316] font-black text-2xl uppercase italic">Cinematic Gritty</h3>
              <p className="text-white/80 font-bold uppercase tracking-wider leading-relaxed">
                Images should use high contrast, heavy shadows, and a signature "Grayscale to Vibrant" transition. Edges are rounded at `3rem` to soften the hardcore brand edges. Mix-blend-modes are used to ground visuals in the project's burgundy ecosystem.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-1 bg-[#f97316]" />
                <div className="w-12 h-1 bg-white" />
                <div className="w-12 h-1 bg-white/20" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ContactPage = () => (
  <div className="bg-[#2d0a14]">
    <PageHero title="CONTACT US" subtitle="GET IN TOUCH" imageSrc="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200" />
    <section className="py-24 px-6 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="bg-[#1a050b] p-12 rounded-[3rem] border-4 border-white/5 text-center">
          <MapPin className="w-10 h-10 text-[#f97316] mx-auto mb-6" />
          <h3 className="text-2xl font-black uppercase mb-4">Visit Us</h3>
          <p className="text-white/60 font-bold uppercase tracking-widest text-xs">1-2 Vernon Walk,<br />Southampton SO15 2EJ</p>
        </div>
        <div className="bg-[#1a050b] p-12 rounded-[3rem] border-4 border-white/5 text-center">
          <Clock className="w-10 h-10 text-[#f97316] mx-auto mb-6" />
          <h3 className="text-2xl font-black uppercase mb-4">Opening Times</h3>
          <p className="text-white/60 font-bold uppercase tracking-widest text-xs">Mon-Thu: 4PM - Late<br />Fri-Sat: 12PM - 3AM<br />Sun: 12PM - Late</p>
        </div>
        <div className="bg-[#1a050b] p-12 rounded-[3rem] border-4 border-white/5 text-center">
          <Mail className="w-10 h-10 text-[#f97316] mx-auto mb-6" />
          <h3 className="text-2xl font-black uppercase mb-4">Direct</h3>
          <p className="text-white/60 font-bold uppercase tracking-widest text-xs">info@orangerooms.co.uk<br />023 8023 2333</p>
        </div>
      </div>
      <div className="mt-20 h-96 bg-white/5 rounded-[3rem] border-4 border-white/10 flex items-center justify-center">
        <span className="text-white/20 font-black uppercase tracking-[1em]">Interactive Map View</span>
      </div>
    </section>
  </div>
);

// --- Layout Wrapper ---

const Footer = ({ setView }: { setView: (p: Page) => void }) => (
  <footer className="bg-[#1a050b] pt-32 text-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row justify-between mb-32 gap-20">
        <div className="max-w-md">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">Sign up to stay updated on the latest vibes and releases.</h3>
          <div className="flex bg-white rounded-full p-2">
            <input type="email" placeholder="Email*" className="bg-transparent flex-1 px-4 text-black outline-none font-bold placeholder:text-black/40" />
            <Button>Submit</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-[10px] font-black uppercase tracking-widest text-white/50">
          <div className="space-y-4">
            <p className="text-white">Experience</p>
            <button onClick={() => setView('EVENTS')} className="block hover:text-[#f97316]">Events</button>
            <button onClick={() => setView('BRUNCH')} className="block hover:text-[#f97316]">Brunch</button>
          </div>
          <div className="space-y-4">
            <p className="text-white">Business</p>
            <button onClick={() => setView('PRIVATE_HIRE')} className="block hover:text-[#f97316]">Private Hire</button>
            <button onClick={() => setView('CONTACT')} className="block hover:text-[#f97316]">Find Us</button>
          </div>
          <div className="space-y-4">
            <p className="text-white">Media</p>
            <button onClick={() => setView('GALLERY')} className="block hover:text-[#f97316]">Gallery</button>
            <button onClick={() => setView('LEGAL')} className="block hover:text-[#f97316]">Legal</button>
          </div>
          <div className="space-y-4">
            <p className="text-white">Follow Us</p>
            <div className="flex space-x-4">
              <Instagram className="w-4 h-4 hover:text-[#f97316] cursor-pointer" />
              <Facebook className="w-4 h-4 hover:text-[#f97316] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 py-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
        <p className="text-center md:text-left">© 2026 Orange Rooms Inc.</p>
        <div className="flex justify-center space-x-8 mt-6 md:mt-0">
          <button onClick={() => setView('LEGAL')} className="hover:text-white transition-colors">Privacy Policy</button>
          <button onClick={() => setView('LEGAL')} className="hover:text-white transition-colors">Terms of Use</button>
        </div>
        <p className="text-center md:text-right">
          Website by <a href="https://milktreeagency.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Milktree Agency</a>
        </p>
      </div>
    </div>
  </footer>
);

// --- App Entry ---

const App = () => {
  const [view, setView] = useState<Page>('HOME');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'HOME': return <HomePage setView={setView} />;
      case 'EVENTS': return <EventsPage />;
      case 'BRUNCH': return <BrunchPage />;
      case 'DRINKS': return <DrinksPage />;
      case 'BOOK': return <BookPage />;
      case 'PRIVATE_HIRE': return <PrivateHirePage />;
      case 'GALLERY': return <GalleryPage />;
      case 'CONTACT': return <ContactPage />;
      case 'DESIGN': return <DesignBook />;
      case 'LEGAL': return (
        <div className="bg-[#2d0a14] pt-40 pb-24 px-6 container mx-auto text-white/80 max-w-4xl font-bold uppercase tracking-widest leading-loose">
          <h1 className="text-4xl text-[#f97316] mb-8">LEGAL POLICIES</h1>
          <p className="mb-8">Your privacy matters to us. This page contains our standard terms and conditions for venue entry, bookings, and data usage.</p>
          <div className="space-y-4 text-xs">
            <p>1. Entry is subject to age verification (18+).</p>
            <p>2. We use cookies to enhance your experience on this site.</p>
            <p>3. Bookings are non-refundable within 48 hours of the event.</p>
          </div>
        </div>
      );
      default: return <HomePage setView={setView} />;
    }
  };

  return (
    <div className="bg-[#2d0a14] selection:bg-[#f97316] selection:text-[#1a1512] antialiased min-h-screen flex flex-col">
      <Header currentView={view} setView={setView} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer setView={setView} />

      {/* Scroll Indicator / Scroll to Top */}
      <div className="fixed bottom-10 right-10 z-[60] flex flex-col items-center space-y-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-[#f97316] text-[#1a1512] rounded-full flex items-center justify-center shadow-2xl animate-bounce hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6 -rotate-90" />
        </button>
      </div>
    </div>
  );
};

// Fix: Removed file markers and initialized the React root properly
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}