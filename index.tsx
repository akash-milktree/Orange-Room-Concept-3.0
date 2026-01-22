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
  const baseStyles = "px-8 py-4 rounded-full font-extrabold uppercase tracking-[0.15em] text-[13px] transition-all duration-300 transform active:scale-95 inline-flex items-center justify-center gap-2 relative overflow-hidden group";

  const variants = {
    primary: "bg-[#f29100] text-black hover:bg-white hover:scale-[1.02]",
    secondary: "bg-white text-black hover:bg-[#f29100] hover:scale-[1.02]",
    outline: "border border-white/20 text-white hover:bg-[#f29100] hover:border-[#f29100] hover:text-black"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

const PageHero = ({ title, subtitle, videoSrc, imageSrc, children }: { title: string, subtitle?: string, videoSrc?: string, imageSrc?: string, children?: React.ReactNode }) => (
  <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
    <div className="absolute inset-0 w-full h-full z-0">
      {videoSrc ? (
        <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105 animate-slow-zoom">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img src={imageSrc} className="w-full h-full object-cover scale-105 animate-slow-zoom" alt="" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />
    </div>

    <div className="relative z-10 max-w-5xl w-full pt-20">
      {subtitle && (
        <p className="text-[#f29100] text-sm md:text-base font-black uppercase tracking-[0.5em] mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
          {subtitle}
        </p>
      )}
      <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-12 italic drop-shadow-2xl animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
        {title.split(' ').map((word, i) => (
          <span key={i} className="block">{word}</span>
        ))}
      </h1>
      <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
        {children}
      </div>
    </div>

    {/* Elegant Scroll Indicator */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block opacity-30">
      <div className="w-[1px] h-20 bg-gradient-to-b from-[#f29100] to-transparent" />
    </div>
  </section>
);

const Header = ({ currentView, setView }: { currentView: Page, setView: (p: Page) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string, view: Page }[] = [
    { label: "Events", view: 'EVENTS' },
    { label: "Bottomless", view: 'BRUNCH' },
    { label: "Drinks", view: 'DRINKS' },
    { label: "Private Hire", view: 'PRIVATE_HIRE' },
    { label: "Gallery", view: 'GALLERY' },
    { label: "Contact", view: 'CONTACT' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'h-20 glass border-b border-white/5' : 'h-28 bg-transparent'}`}>
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <img
              src="/logo.png"
              alt="ORANGE ROOMS"
              className="h-8 md:h-10 w-auto cursor-pointer"
              onClick={() => setView('HOME')}
            />

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map(item => (
                <button
                  key={item.view}
                  onClick={() => setView(item.view)}
                  className={`text-[12px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#FF6B00] ${currentView === item.view ? 'text-[#FF6B00]' : 'text-white/60'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-4 text-white/40">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-[#FF6B00] transition-colors" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-[#FF6B00] transition-colors" />
            </div>

            <Button
              variant="primary"
              className="!py-3 !px-8 hidden sm:flex text-[12px]"
              onClick={() => setView('BOOK')}
            >
              BOOK NOW
            </Button>

            <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col p-8 text-white animate-fade-in">
          <div className="flex justify-between items-center mb-16">
            <img
              src="/logo.png"
              alt="ORANGE ROOMS"
              className="h-10 w-auto"
            />
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-10 h-10 text-[#f29100]" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            <button onClick={() => { setView('HOME'); setMobileMenuOpen(false); }} className="text-5xl font-black uppercase italic tracking-tighter text-left">Home</button>
            {navItems.map(item => (
              <button
                key={item.view}
                onClick={() => { setView(item.view); setMobileMenuOpen(false); }}
                className="text-5xl font-black uppercase italic tracking-tighter text-left border-b border-white/5 pb-4"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto">
            <Button onClick={() => { setView('BOOK'); setMobileMenuOpen(false); }} className="w-full !py-6 text-xl">BOOK NOW</Button>
          </div>
        </div>
      )}
    </>
  );
};

// --- Homepage Sections ---

const CategoryShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('LOUNGE');

  const layers = [
    { id: 'GARDEN', title: 'NEON GARDEN', desc: 'Sip under the stars in our lush outdoor paradise.', image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200' },
    { id: 'LOUNGE', title: 'VELVET LOUNGE', desc: 'Indulge in craft cocktails and deep house vibes.', image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1200' },
    { id: 'CLUB', title: 'MAIN ROOM', desc: 'The heartbeat of Southampton nightlife.', image: 'https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1200' },
  ];

  return (
    <section className="bg-[#050505] py-32 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-6">Choose Your Atmosphere</p>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none italic">THE <br /> SPACES</h2>
          </div>
          <div className="flex gap-4">
            {layers.map((l) => (
              <button
                key={l.id}
                onClick={() => setActiveCategory(l.id)}
                className={`px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-widest transition-all ${activeCategory === l.id ? 'bg-[#f29100] text-black' : 'bg-white/5 text-white/40 hover:text-white'}`}
              >
                {l.id}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 relative rounded-[3rem] overflow-hidden aspect-[16/9] group">
            <img
              src={layers.find(l => l.id === activeCategory)?.image}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
              <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
                {layers.find(l => l.id === activeCategory)?.title}
              </h3>
              <p className="text-white/60 text-lg font-bold uppercase tracking-wider max-w-md">
                {layers.find(l => l.id === activeCategory)?.desc}
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <div className="p-10 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5">
              <h4 className="text-[#f29100] font-black uppercase tracking-widest mb-6">Available Tonight</h4>
              <ul className="space-y-4">
                {['VIP Booths', 'Spirit Packages', 'Guestlist Entry'].map((item) => (
                  <li key={item} className="flex items-center justify-between text-white font-bold uppercase text-sm border-b border-white/5 pb-4">
                    <span>{item}</span>
                    <Plus className="w-4 h-4 text-[#f29100]" />
                  </li>
                ))}
              </ul>
              <Button variant="primary" className="w-full mt-12 !py-5">RESERVE THIS SPACE</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Highlights = ({ setView }: { setView: (p: Page) => void }) => {
  return (
    <section className="bg-[#050505] py-32 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bottomless Highlight */}
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[600px] rounded-[3rem] overflow-hidden group cursor-pointer" onClick={() => setView('BRUNCH')}>
            <img src="https://images.unsplash.com/photo-1525268771113-32d9e9bb2d40?q=80&w=1200" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
              <span className="bg-[#f29100] text-black px-4 py-1 text-[12px] font-black uppercase rounded-full mb-6 inline-block">Saturdays & Sundays</span>
              <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">BOTTOMLESS <br /> BRUNCH</h3>
              <Button variant="outline" className="!border-white/40 !text-white group-hover:!bg-[#f29100] group-hover:!border-[#f29100] group-hover:!text-black transition-all">
                VIEW OFFER <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Events Highlight */}
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[700px] rounded-[3rem] overflow-hidden group cursor-pointer" onClick={() => setView('EVENTS')}>
            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
              <span className="bg-white text-black px-4 py-1 text-[12px] font-black uppercase rounded-full mb-6 inline-block">Upcoming</span>
              <h3 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">THE <br /> LINEUP</h3>
              <Button variant="outline" className="!border-white/40 !text-white group-hover:!bg-white group-hover:!border-white group-hover:!text-black transition-all">
                WHAT'S ON <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MissionSection = () => (
  <section className="bg-[#f29100] py-40 px-6 text-center overflow-hidden relative">
    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#050505] to-transparent opacity-20" />
    <div className="container mx-auto max-w-5xl">
      <p className="text-black text-sm font-black uppercase tracking-[0.5em] mb-8 animate-fade-in">The Orange Philosophy</p>
      <h2 className="text-4xl md:text-7xl font-black text-black uppercase tracking-tighter leading-[0.85] italic mb-12">
        EST. 2001 <br /> IN SOUTHAMPTON
      </h2>
      <p className="text-black text-xl md:text-3xl font-black max-w-3xl mx-auto leading-tight uppercase italic">
        "WE PROVIDE THE VIBE. <br className="hidden md:block" /> YOU PROVIDE THE RIDICULOUS MEMORIES."
      </p>
      <div className="mt-16 flex justify-center gap-4">
        {[...Array(3)].map((_, i) => <Plus key={i} className="w-8 h-8 text-black opacity-20" />)}
      </div>
    </div>
  </section>
);

const ExperienceTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: "VIP BOOTHS", desc: "Premium table service with dedicated hosts and spirit packages.", icon: <Users /> },
    { title: "GARDEN PARTIES", desc: "Year-round outdoor vibing with tiki cocktails and neon lights.", icon: <Camera /> },
    { title: "LIVE DJ SETS", desc: "The best local and guest DJs playing house, R&B, and retro hits.", icon: <Sparkles /> },
    { title: "MIXOLOGY CLASS", desc: "Learn the secrets behind our legendary cocktails.", icon: <Wine /> },
  ];

  return (
    <section className="bg-[#050505] py-32 px-6 border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-4">
            <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-8">What We Do Best</p>
            {tabs.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`w-full flex items-center justify-between p-8 rounded-3xl transition-all border ${activeTab === i ? 'bg-[#f29100] border-[#f29100] text-black scale-[1.02]' : 'bg-[#0A0A0A] border-white/5 text-white hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-6">
                  <span className={`p-3 rounded-xl ${activeTab === i ? 'bg-black/10' : 'bg-white/5'}`}>
                    {React.cloneElement(t.icon as React.ReactElement, { className: "w-6 h-6" })}
                  </span>
                  <span className="text-xl font-black uppercase italic tracking-tighter">{t.title}</span>
                </div>
                <ChevronRight className={`w-6 h-6 transition-transform ${activeTab === i ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </div>
          <div className="bg-[#0A0A0A] p-12 md:p-20 rounded-[3rem] border border-white/5 relative overflow-hidden group min-h-[500px] flex items-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f29100]/10 blur-[100px]" />
            <div className="relative z-10">
              <h3 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8 italic">
                {tabs[activeTab].title}
              </h3>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-12 font-bold uppercase tracking-wider">
                {tabs[activeTab].desc}
              </p>
              <Button variant="outline" className="!px-12 !py-5">INQUIRE NOW</Button>
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

  const askConcierge = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAnswer('');

    // Simulating AI response for now to avoid ENV issues in demo
    setTimeout(() => {
      setAnswer("The vibe at Orange Rooms is legendary! Tonight we've got happy hour until 9pm and the dance floor is heating up at 10pm. Dress code: Dress to impress, but keep it edgy. 🍸🔥");
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="bg-[#050505] py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-24">
          <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-6">Common Questions</p>
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">FAQ</h2>
        </div>

        <div className="mb-20 glass p-10 md:p-16 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#f29100]/10 blur-[50px]" />
          <h3 className="text-white text-3xl font-black uppercase mb-8 flex items-center gap-4 italic font-black">
            <Sparkles className="w-8 h-8 text-[#f29100]" /> AI CONCIERGE
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && askConcierge()}
              placeholder="ASK ABOUT THE VIBE..."
              className="flex-1 bg-white/5 border border-white/10 p-6 rounded-2xl text-white outline-none focus:border-[#f29100] font-bold uppercase tracking-widest text-sm"
            />
            <Button onClick={askConcierge} className="!px-10">
              {loading ? 'WAIT...' : 'ASK'}
            </Button>
          </div>
          {answer && (
            <div className="mt-12 p-8 bg-[#f29100]/5 rounded-3xl border border-[#f29100]/20 text-white font-bold animate-fade-in tracking-wide uppercase text-sm leading-relaxed">
              {answer}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {[
            "DRESS CODE POLICY",
            "BOOKING DEPOSITS",
            "AGE RESTRICTIONS",
            "LOST PROPERTY"
          ].map((q, i) => (
            <div key={i} className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/5 flex items-center justify-between group cursor-pointer hover:border-[#f29100]/40 transition-all">
              <span className="text-white text-xl font-black uppercase italic tracking-tighter">{q}</span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#f29100] group-hover:border-[#f29100] transition-all">
                <Plus className="w-4 h-4 text-white group-hover:text-black" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MeatLocator = () => (
  <section className="bg-[#050505] py-32 px-6">
    <div className="container mx-auto">
      <div className="bg-[#0A0A0A] rounded-[4rem] overflow-hidden p-12 md:p-24 text-center border border-white/5 relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200')] bg-cover grayscale mix-blend-overlay" />
        <div className="relative z-10">
          <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-6">Find The Vibe</p>
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic mb-12">SOUTHAMPTON</h2>
          <p className="text-white/60 text-lg md:text-2xl font-bold max-w-2xl mx-auto mb-16 uppercase tracking-wider italic font-bold">
            1-2 Vernon Walk, Southampton. SO15 2EJ
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="primary" className="!px-16">GET DIRECTIONS</Button>
            <Button variant="outline" className="!px-16">CALL US</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Page Components ---

const HomePage = ({ setView }: { setView: (p: Page) => void }) => {
  return (
    <div className="animate-fade-in">
      <PageHero
        title="ORANGE ROOMS"
        subtitle="ESTABLISHED 2001"
        imageSrc="hero_cocktail_orange_1769116896978.png"
      >
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <Button onClick={() => setView('BOOK')} className="!py-5 !px-16 shadow-[0_0_50px_rgba(242,145,0,0.3)]">
            BOOK A TABLE <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button variant="outline" onClick={() => setView('EVENTS')} className="!py-5 !px-16">
            WHAT'S ON
          </Button>
        </div>
      </PageHero>
      <CategoryShowcase />
      <Highlights setView={setView} />
      <MissionSection />
      <ExperienceTabs />
      <FAQ />
      <MeatLocator />
    </div>
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
          FixrWidget.create({ containerId, shopSlug: 'orange-rooms', theme: 'dark' });
          setTimeout(() => setIsLoading(false), 1000);
        } catch (e) {
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
      ((window as any).FixrWidget) ? initWidget() : script.onload = initWidget;
    }
  }, []);

  return (
    <div className="bg-[#050505]">
      <PageHero
        title="THE LINEUP"
        subtitle="DJs & EVENTS"
        imageSrc="https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1200"
      />

      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden border border-white/5 bg-[#0A0A0A] relative min-h-[600px] p-4 md:p-12">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-[#050505] z-20">
                <div className="w-12 h-12 border-4 border-t-[#f29100] border-white/10 rounded-full animate-spin" />
                <p className="font-black uppercase tracking-[0.3em] text-[10px] text-white/40">Syncing with FIXR...</p>
              </div>
            )}
            <div id={containerId}></div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter mb-12 leading-tight">PLANNING A<br /> GROUP NIGHT?</h2>
          <Button variant="primary" className="!px-16 !py-6">INQUIRE ABOUT VIP TABLES</Button>
        </div>
      </section>
    </div>
  );
};

const BookPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerId = 'dmn-widget-container';

  useEffect(() => {
    const initDMN = () => setTimeout(() => setIsLoading(false), 1500);
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
    <div className="bg-[#050505]">
      <PageHero
        title="RESERVATIONS"
        subtitle="BOOK A TABLE"
        imageSrc="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200"
      />

      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto rounded-[3rem] overflow-hidden bg-white relative min-h-[700px]">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-white z-20">
                <div className="w-12 h-12 border-4 border-t-[#f29100] border-black/10 rounded-full animate-spin" />
                <p className="font-black uppercase tracking-[0.3em] text-[10px] text-black/40">Connecting to DesignMyNight...</p>
              </div>
            )}
            <div className="p-4 md:p-8">
              <div id={containerId} data-dmn-widget-id="5a05b1f06a9202117531773a"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#f29100] text-black text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-none">LARGE GROUPS?</h2>
          <p className="text-xl font-bold uppercase tracking-widest mb-12">For parties of 12+ or private hire, please enquiry below.</p>
          <Button variant="secondary" className="!px-16 !py-6 text-xl">PRIVATE ENQUIRY</Button>
        </div>
      </section>
    </div>
  );
};

const BrunchPage = () => (
  <div className="bg-[#050505]">
    <PageHero title="BOTTOMLESS BRUNCH" subtitle="THE BEST IN SOUTHAMPTON" imageSrc="https://images.unsplash.com/photo-1525268771113-32d9e9bb2d40?q=80&w=1200" />
    <section className="py-32 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-6">Unbeatable Value</p>
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-8 leading-tight">£30 OF PURE <br /> VIBE</h2>
            <p className="text-xl font-bold text-white/60 leading-relaxed uppercase tracking-widest mb-12">
              Two hours of bottomless prosecco, beer, or our signature cocktails. Paired with a gourmet burger and the city's finest DJs.
            </p>
            <div className="flex gap-4">
              <Button className="!px-12 !py-5">BOOK SATURDAY</Button>
              <Button variant="outline" className="!px-12 !py-5">BOOK SUNDAY</Button>
            </div>
          </div>
          <div className="rounded-[3rem] overflow-hidden aspect-square border border-white/5">
            <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200" className="w-full h-full object-cover" alt="" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Unlimited Drinks', desc: 'Prosecco, Beer, & Cocktails' },
            { title: 'Gourmet Food', desc: 'Legendary Orange Burger' },
            { title: 'Live Energy', desc: 'Best DJs in the City' }
          ].map((item, i) => (
            <div key={i} className="bg-[#0A0A0A] p-12 rounded-[2.5rem] border border-white/5 hover:border-[#f29100]/40 transition-all">
              <Plus className="w-8 h-8 text-[#f29100] mb-8" />
              <h3 className="text-2xl font-black uppercase italic mb-2">{item.title}</h3>
              <p className="text-white/40 font-bold uppercase text-xs tracking-widest">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const DrinksPage = () => (
  <div className="bg-[#050505]">
    <PageHero title="COCKTAILS" subtitle="MIXOLOGY ART" imageSrc="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200" />
    <section className="py-32 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-6">Signature Selection</p>
          <h2 className="text-5xl md:text-8xl font-black italic uppercase text-white tracking-tighter">THE MENU</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'TIKI POWER BLAST', desc: 'Dark Rum, Pineapple, Secret Spices', price: '£10.50' },
            { name: 'ORANGE VELVET', desc: 'Vodka, Fresh Orange, Vanilla Silk', price: '£9.50' },
            { name: 'NEON MARGARITA', desc: 'Silver Tequila, Agave, Lime Glow', price: '£11.00' },
            { name: 'SOUTHAMPTON SOUR', desc: 'Whiskey, Lemon, Red Wine Float', price: '£10.00' },
            { name: 'MIDNIGHT MARTINI', desc: 'Espresso, Coffee Liqueur, Gold Dust', price: '£11.50' },
            { name: 'GARDEN FIZZ', desc: 'Gin, Elderflower, Cucumber Sprint', price: '£9.50' }
          ].map((drink, i) => (
            <div key={i} className="p-10 bg-[#0A0A0A] rounded-[3rem] border border-white/5 hover:border-[#f29100]/40 transition-all flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 group-hover:bg-[#f29100] transition-colors">
                <Wine className="w-8 h-8 text-white group-hover:text-black" />
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tighter">{drink.name}</h3>
              <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest mb-6">{drink.desc}</p>
              <span className="text-[#f29100] font-black text-2xl">{drink.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-24 text-center">
          <Button variant="outline" className="!px-16 !py-5">VIEW FULL DRINKS LIST (PDF)</Button>
        </div>
      </div>
    </section>
  </div>
);

const PrivateHirePage = () => (
  <div className="bg-[#050505]">
    <PageHero title="PRIVATE HIRE" subtitle="YOUR OWN PARADISE" imageSrc="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200" />
    <section className="py-32 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">THE ENTIRE <br /> VENUE</h2>
            <p className="text-xl text-white/60 font-bold uppercase tracking-wider mb-12">From corporate mixers to epic birthdays, Orange Rooms offers unique spaces for every vibe.</p>
            <div className="space-y-4">
              {['TIKI BAR (50 GUESTS)', 'NEON GARDEN (100 GUESTS)', 'MAIN ROOM (300 GUESTS)', 'FULL VENUE (500 GUESTS)'].map(room => (
                <div key={room} className="flex items-center justify-between p-6 bg-[#0A0A0A] rounded-2xl border border-white/5">
                  <span className="font-black uppercase italic tracking-tighter text-xl">{room}</span>
                  <Users className="w-6 h-6 text-[#f29100]" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0A0A0A] p-12 md:p-16 rounded-[3rem] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f29100]/10 blur-[50px]" />
            <h3 className="text-3xl font-black uppercase italic mb-8">ENQUIRY FORM</h3>
            <form className="space-y-6">
              <input placeholder="NAME" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-[#f29100] font-bold uppercase tracking-widest text-sm" />
              <input placeholder="EMAIL" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-[#f29100] font-bold uppercase tracking-widest text-sm" />
              <textarea placeholder="EVENT DETAILS & GUEST COUNT" rows={4} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-[#f29100] font-bold uppercase tracking-widest text-sm"></textarea>
              <Button variant="primary" className="w-full !py-6 text-xl">REQUEST A CALL BACK</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const GalleryPage = () => (
  <div className="bg-[#050505]">
    <PageHero title="GALLERY" subtitle="BEYOND THE SHUTTER" imageSrc="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200" />
    <section className="py-32 px-6">
      <div className="container mx-auto">
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
            <div key={i} className="rounded-[2.5rem] overflow-hidden border border-white/5 relative group cursor-pointer">
              <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// --- Brand Guide / Design Page ---

// DesignBook removed as per new clean architecture.

const ContactPage = () => (
  <div className="bg-[#050505]">
    <PageHero title="EST. 2001" subtitle="SOUTHAMPTON" imageSrc="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200" />
    <section className="py-32 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { title: 'Visit', desc1: '1-2 Vernon Walk,', desc2: 'Southampton SO15 2EJ', icon: <MapPin /> },
            { title: 'Contact', desc1: 'info@orangerooms.co.uk', desc2: '023 8023 2333', icon: <Mail /> },
            { title: 'Vibe', desc1: 'Mon-Thu: 4pm - Late', desc2: 'Fri-Sat: 12pm - 3am', icon: <Clock /> }
          ].map((item, i) => (
            <div key={i} className="bg-[#0A0A0A] p-12 rounded-[3.5rem] border border-white/5 text-center group transition-all hover:border-[#f29100]/40">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-[#f29100] transition-colors">
                {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6 text-white group-hover:text-black" })}
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-4">{item.title}</h3>
              <p className="text-white/60 font-bold uppercase tracking-widest text-xs leading-loose">
                {item.desc1} <br /> {item.desc2}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <MeatLocator />
  </div>
);

// --- Layout Wrapper ---

const Footer = ({ setView }: { setView: (p: Page) => void }) => (
  <footer className="bg-[#050505] pt-32 pb-12 text-white border-t border-white/5 overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-32">
        <div className="lg:col-span-2">
          <img src="/logo.png" className="h-12 mb-12" alt="" />
          <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-12 max-w-md">SOUTHAMPTON'S MOST LEGENDARY NIGHTLIFE EXPERIENCE.</h3>
          <div className="flex gap-4">
            <Instagram className="w-6 h-6 text-white/40 hover:text-[#f29100] cursor-pointer" />
            <Facebook className="w-6 h-6 text-white/40 hover:text-[#f29100] cursor-pointer" />
          </div>
        </div>
        <div>
          <h4 className="text-[#f29100] font-black uppercase tracking-widest text-sm mb-8">Navigation</h4>
          <nav className="flex flex-col gap-4">
            {['HOME', 'EVENTS', 'BRUNCH', 'DRINKS', 'BOOK', 'PRIVATE_HIRE'].map((v) => (
              <button key={v} onClick={() => setView(v as Page)} className="text-left font-black uppercase italic tracking-tighter text-xl hover:text-[#f29100] transition-colors">
                {v.replace('_', ' ')}
              </button>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="text-[#f29100] font-black uppercase tracking-widest text-sm mb-8">Join the Vibe</h4>
          <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-6">Stay updated on events and offers.</p>
          <div className="flex bg-white/5 border border-white/10 rounded-full p-2">
            <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent flex-1 px-4 text-white outline-none font-bold uppercase text-[10px]" />
            <button className="bg-[#f29100] text-black w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
        <p>© 2026 ORANGE ROOMS SOUTHAMPTON</p>
        <div className="flex gap-8">
          <button onClick={() => setView('LEGAL')}>PRIVACY POLICY</button>
          <button onClick={() => setView('LEGAL')}>TERMS OF USE</button>
        </div>
        <p>MADE BY MILKTREE</p>
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

      case 'LEGAL': return (
        <div className="bg-[#050505] pt-40 pb-24 px-6 container mx-auto text-white/80 max-w-4xl font-bold uppercase tracking-widest leading-loose">
          <h1 className="text-4xl text-[#f29100] mb-8 font-black italic">LEGAL POLICIES</h1>
          <p className="mb-8">Your privacy matters to us. This page contains our standard terms and conditions for venue entry, bookings, and data usage.</p>
          <div className="space-y-4 text-xs font-bold">
            <p>1. ENTRY IS SUBJECT TO AGE VERIFICATION (18+).</p>
            <p>2. WE USE COOKIES TO ENHANCE YOUR EXPERIENCE ON THIS SITE.</p>
            <p>3. BOOKINGS ARE NON-REFUNDABLE WITHIN 48 HOURS OF THE EVENT.</p>
          </div>
        </div>
      );
      default: return <HomePage setView={setView} />;
    }
  };

  return (
    <div className="bg-[#050505] selection:bg-[#f29100] selection:text-black antialiased min-h-screen flex flex-col font-urbanist">
      <Header currentView={view} setView={setView} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer setView={setView} />

      {/* Premium Scroll Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 right-10 z-[60] w-16 h-16 bg-[#f29100]/10 backdrop-blur-xl border border-[#f29100]/20 rounded-full flex items-center justify-center hover:bg-[#f29100] transition-all group overflow-hidden"
      >
        <ChevronRight className="w-6 h-6 -rotate-90 text-[#f29100] group-hover:text-black transition-colors" />
      </button>
    </div>
  );
};

// Fix: Removed file markers and initialized the React root properly
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}