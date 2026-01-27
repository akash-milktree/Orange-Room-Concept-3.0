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
  Sparkles,
  Linkedin,
  Twitter
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
type Page = 'HOME' | 'EVENTS' | 'BRUNCH' | 'DRINKS' | 'FOOD' | 'BOOK' | 'PRIVATE_HIRE' | 'GALLERY' | 'CONTACT' | 'LEGAL' | 'DESIGN';

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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          poster={imageSrc} // Use image as fallback/poster
        >
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
  { label: "Food", view: 'FOOD' },
    { label: "Private Hire", view: 'PRIVATE_HIRE' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'h-20 glass border-b border-white/5' : 'h-28 bg-transparent'}`}>
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Logo Replaced with Text for Visibility */}
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
  const [activeCategory, setActiveCategory] = useState('GARDEN');

  const layers = [
    {
      id: 'GARDEN',
      title: 'NEON GARDEN',
      desc: 'Sip under the stars in our lush outdoor paradise.',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200',
      features: ['Heated Booths', 'Tiki Bar Access', 'Fire Pit']
    },
    {
      id: 'LOUNGE',
      title: 'VELVET LOUNGE',
      desc: 'Indulge in craft cocktails and deep house vibes.',
      image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1200',
      features: ['Premium Cocktails', 'Table Service', 'Chill Vibes']
    },
    {
      id: 'CLUB',
      title: 'MAIN ROOM',
      desc: 'The heartbeat of Southampton nightlife.',
      image: 'https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1200',
      features: ['VIP Booths', 'Bottle Service', 'Dance Floor']
    },
  ];

  return (
    <section className="bg-[#412B1D] pt-32 pb-10 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-6">Choose Your Atmosphere</p>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none italic">THE SPACES</h2>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
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
          <div className="lg:col-span-4 flex">
            <div className="p-10 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 flex flex-col justify-between w-full">
              <div>
                <h4 className="text-[#f29100] font-black uppercase tracking-widest mb-6">Available Tonight</h4>
                <ul className="space-y-4">
                  {layers.find(l => l.id === activeCategory)?.features.map((item) => (
                    <li key={item} className="flex items-center justify-between text-white font-bold uppercase text-sm border-b border-white/5 pb-4">
                      <span>{item}</span>
                      <Plus className="w-4 h-4 text-[#f29100]" />
                    </li>
                  ))}
                </ul>
              </div>
              <Button variant="primary" className="w-full mt-12 !py-5">RESERVE THIS SPACE</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BrandStrip = () => {
  const logos = [
    { src: '/Vector1.png', alt: 'Tiki Lounge' },
    { src: '/Vector2.png', alt: 'Off Piste' },
    { src: '/Vector3.png', alt: 'Mile High' },
    { src: '/Vector4.png', alt: 'Outside Orange' },
  ];

  return (
    <section className="bg-[#412B1D] border-t border-white/5">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-80">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-12 md:h-16 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Highlights = ({ setView }: { setView: (p: Page) => void }) => {
  return (
    <section className="bg-[#412B1D] pt-10 pb-40 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bottomless Highlight */}
          <div className="relative h-[650px] rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl" onClick={() => setView('BRUNCH')}>
            <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-[#f29100]/0 group-hover:bg-[#f29100]/10 transition-all duration-500" />
            <div className="absolute bottom-12 left-12 right-12 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
              <span className="bg-[#f29100] text-black px-5 py-2 text-[11px] font-black uppercase rounded-full mb-6 inline-block shadow-lg">Saturdays & Sundays</span>
              <h3 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">BOTTOMLESS <br /> BRUNCH</h3>
              <Button variant="outline" className="!border-white/40 !text-white group-hover:!bg-[#f29100] group-hover:!border-[#f29100] group-hover:!text-black transition-all">
                VIEW OFFER <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Events Highlight */}
          <div className="relative h-[650px] rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl" onClick={() => setView('EVENTS')}>
            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
            <div className="absolute bottom-12 left-12 right-12 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
              <span className="bg-white text-black px-5 py-2 text-[11px] font-black uppercase rounded-full mb-6 inline-block shadow-lg">Upcoming</span>
              <h3 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">THE <br /> LINEUP</h3>
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

const MissionSection = () => {
  const carouselImages = [
    'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800',
    'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800',
    'https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=800',
    'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=800',
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800',
  ];

  const ScrollingCarousel = ({ direction = 'ltr' }: { direction?: 'ltr' | 'rtl' }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer || isPaused || isDragging) return;

      const scrollSpeed = direction === 'ltr' ? 1 : -1;
      let animationId: number;

      const scroll = () => {
        if (scrollContainer) {
          scrollContainer.scrollLeft += scrollSpeed;

          // Reset scroll for infinite loop
          if (direction === 'ltr' && scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          } else if (direction === 'rtl' && scrollContainer.scrollLeft <= 0) {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
          }
        }
        animationId = requestAnimationFrame(scroll);
      };

      animationId = requestAnimationFrame(scroll);
      return () => cancelAnimationFrame(animationId);
    }, [direction, isPaused, isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
      setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
      const walk = (x - startX) * 2;
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - walk;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
      setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
      const walk = (x - startX) * 2;
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - walk;
      }
    };

    return (
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Duplicate images for infinite scroll */}
        {[...carouselImages, ...carouselImages].map((img, idx) => (
          <div key={idx} className="flex-shrink-0 w-80 h-64 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={img}
              className="w-full h-full object-cover pointer-events-none"
              alt=""
              draggable="false"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-[#f29100] py-20 px-6 overflow-hidden relative">
      {/* Centered Content */}
      <div className="container mx-auto max-w-5xl text-center mb-16">
        <p className="text-black text-xs font-black uppercase tracking-[0.5em] mb-6">The Orange Philosophy</p>
        <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-[0.9] italic mb-8">
          EST. 2001<br />IN SOUTHAMPTON
        </h2>
        <p className="text-black text-2xl md:text-3xl font-black leading-tight uppercase italic mb-8">
          "WE PROVIDE THE VIBE.<br />YOU PROVIDE THE RIDICULOUS MEMORIES."
        </p>
        <div className="flex justify-center gap-3">
          {[...Array(5)].map((_, i) => <div key={i} className="w-3 h-3 bg-black rounded-full opacity-30" />)}
        </div>
      </div>

      {/* Scrolling Carousels */}
      <div className="space-y-8">
        <ScrollingCarousel direction="ltr" />
        <ScrollingCarousel direction="rtl" />
      </div>
    </section>
  );
};

const ExperienceTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: "VIP BOOTHS", desc: "Premium table service with dedicated hosts and spirit packages.", icon: <Users /> },
    { title: "GARDEN PARTIES", desc: "Year-round outdoor vibing with tiki cocktails and neon lights.", icon: <Camera /> },
    { title: "LIVE DJ SETS", desc: "The best local and guest DJs playing house, R&B, and retro hits.", icon: <Sparkles /> },
    { title: "MIXOLOGY CLASS", desc: "Learn the secrets behind our legendary cocktails.", icon: <Wine /> },
  ];

  return (
    <section className="bg-[#412B1D] py-32 px-6 border-t border-white/5">
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "DRESS CODE POLICY",
      answer: "Smart casual. No tracksuits, gym wear, or flip flops. We encourage you to dress to impress, but keep it comfortable enough to dance!"
    },
    {
      question: "BOOKING DEPOSITS",
      answer: "We require a small deposit per person for all table bookings to secure your space. This is fully redeemable against your bill on the night."
    },
    {
      question: "AGE RESTRICTIONS",
      answer: "We are an 18+ venue. Valid physical photo ID (Passport or Driving License) is required for entry. We operate a Challenge 25 policy."
    },
    {
      question: "LOST PROPERTY",
      answer: "Left something behind? Email us at info@orangerooms.co.uk with a description of the item and when you visited. We keep lost property for 14 days."
    }
  ];

  return (
    <section className="bg-[#050505] py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-24">
          <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-6">Common Questions</p>
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">FAQ</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`bg-[#0A0A0A] rounded-3xl border border-white/5 overflow-hidden transition-all duration-300 ${openIndex === i ? 'border-[#f29100]/40 bg-white/5' : 'hover:border-[#f29100]/40'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between cursor-pointer"
              >
                <span className="text-white text-xl font-black uppercase italic tracking-tighter text-left">{item.question}</span>
                <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-[#f29100] border-[#f29100] rotate-45' : 'group-hover:border-[#f29100]'}`}>
                  <Plus className={`w-4 h-4 transition-colors ${openIndex === i ? 'text-black' : 'text-white'}`} />
                </div>
              </button>
              <div
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-40 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-white/60 font-bold leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MeatLocator = () => (
  <section className="bg-[#050505] pb-32 pt-10 px-6">
    <div className="container mx-auto">
      <div className="bg-[#0A0A0A] rounded-[4rem] overflow-hidden p-12 md:p-24 text-center border border-white/5 relative group">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200')] bg-cover bg-center grayscale mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/80" />

        <div className="relative z-10">
          <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-6">Find The Vibe</p>
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic mb-8">SOUTHAMPTON</h2>
          <p className="text-white/80 text-lg md:text-2xl font-bold max-w-2xl mx-auto mb-12 uppercase tracking-wider italic">
            1-2 Vernon Walk, Southampton. SO15 2EJ
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="primary" className="!px-16 !py-5 shadow-xl shadow-[#f29100]/20" onClick={() => window.open('https://maps.google.com/?q=Orange+Rooms+Southampton', '_blank')}>
              GET DIRECTIONS <MapPin className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="!px-16 !py-5" onClick={() => window.location.href = 'tel:02380232333'}>
              023 8023 2333 <Phone className="w-5 h-5 ml-2" />
            </Button>
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
        imageSrc="https://images.unsplash.com/photo-1536935338788-843bb52887f8?q=80&w=1920"
        videoSrc="https://www.orangerooms.co.uk/wp-content/uploads/2024/02/x2mate.com-Orange-Rooms-Cocktails-LG-1080p.mp4"
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
      <BrandStrip />
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
  const containerId = 'fixr-shop-widget-container';

  useEffect(() => {
    const scriptId = 'fixr-shop-script';
    const container = document.getElementById(containerId);

    if (!container) return;

    // Clear any previous script instance inside the container
    container.innerHTML = '';
    setIsLoading(true);

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      container.appendChild(existingScript);
      setIsLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = "https://web-cdn.fixr.co/scripts/fixr-shop-widget.v1.min.js";
    script.async = true;
    script.setAttribute('data-fixr-shop-id', 'f3717626-1c33-4870-a80d-8fa5a61fa568');
    script.onload = () => setIsLoading(false);
    script.onerror = () => setIsLoading(false);

    container.appendChild(script);
  }, []);

  return (
    <div className="bg-[#050505]">
      <PageHero
        title="THE LINEUP"
        subtitle="DJs & EVENTS"
        imageSrc="/events-header.jpg"
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
        imageSrc="/booking-header.jpg"
      />

      <section className="py-24 px-6">
        <div className="container mx-auto">
          {/* Intro + party mood */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-4">
                Choose Your Party Mood
              </p>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-6 leading-tight">
                OUR TABLES <br className="hidden md:block" /> &amp; SPACES
              </h2>
              <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-6 max-w-xl">
                Orange Rooms is Southampton&apos;s finest independent bar with a whole range of tables and spaces
                available every night of the week. Pick the vibe that matches your night, then complete your booking
                through our DesignMyNight widget below.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-white/70">
                <span className="px-4 py-2 rounded-full border border-white/10">CASSETTE BOOTHS</span>
                <span className="px-4 py-2 rounded-full border border-white/10">TIKI BOOTHS</span>
                <span className="px-4 py-2 rounded-full border border-white/10">GARDEN TABLES</span>
                <span className="px-4 py-2 rounded-full border border-white/10">DANCEFLOOR</span>
                <span className="px-4 py-2 rounded-full border border-white/10">OFF PISTE LOUNGE</span>
                <span className="px-4 py-2 rounded-full border border-white/10">FULL VENUE HIRE</span>
              </div>
            </div>
            <div className="bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 p-6 flex flex-col justify-between">
              <h3 className="text-sm font-black uppercase italic tracking-[0.25em] text-white mb-4">
                QUICK BOOKING TIPS
              </h3>
              <ul className="space-y-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                <li>• PICK YOUR DATE, ARRIVAL TIME &amp; GROUP SIZE.</li>
                <li>• SELECT A TABLE OR SPACE THAT SUITS YOUR VIBE.</li>
                <li>• ADD ANY OCCASION NOTES OR SPECIAL REQUESTS.</li>
                <li>• CONFIRM YOUR BOOKING SECURELY VIA DESIGNMYNIGHT.</li>
              </ul>
            </div>
          </div>

          {/* Tables and spaces overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            <div className="bg-[#0A0A0A] p-10 rounded-[3rem] border border-white/5">
              <h3 className="text-2xl font-black uppercase italic text-white mb-4">Our Tables</h3>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-5">
                Perfect for smaller groups who want to be close to the action but still have a home base for the night.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                {[
                  'FISH TANK TABLES',
                  'HIGH BAR TABLES',
                  'NEON BOOTHS',
                  'GARDEN TABLES',
                  'DANCE FLOOR TABLES',
                  'SMALL CASSETTE BOOTHS',
                  'LARGE CASSETTE BOOTHS',
                  'SMALL DANCEFLOOR BOOTHS',
                ].map((item) => (
                  <div key={item} className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0A0A0A] p-10 rounded-[3rem] border border-white/5">
              <h3 className="text-2xl font-black uppercase italic text-white mb-4">Our Spaces</h3>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-5">
                For bigger celebrations and takeovers, choose from full venue, half venue and our iconic concept rooms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                {[
                  'FULL VENUE',
                  'HALF VENUE',
                  'TIKI LOUNGE',
                  'OFF PISTE',
                  'MILE HIGH',
                  'OUTSIDE ORANGE',
                ].map((item) => (
                  <div key={item} className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DesignMyNight embed */}
          <div className="max-w-4xl mx-auto rounded-[3rem] overflow-hidden bg-white relative min-h-[700px]">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-white z-20">
                <div className="w-12 h-12 border-4 border-t-[#f29100] border-black/10 rounded-full animate-spin" />
                <p className="font-black uppercase tracking-[0.3em] text-[10px] text-black/40">
                  Connecting to DesignMyNight...
                </p>
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
    <PageHero
      title="BOTTOMLESS COCKTAILS"
      subtitle="SOUTHAMPTON'S ORIGINAL"
      imageSrc="/bottomless-header.jpg.jpg"
    >
      <div className="flex flex-wrap justify-center gap-4">
        <Button className="!px-10 !py-4 text-[11px]">
          BOOK SUN–FRI
        </Button>
        <Button variant="outline" className="!px-10 !py-4 text-[11px]">
          BOOK SATURDAY
        </Button>
      </div>
    </PageHero>

    {/* Overview */}
    <section className="py-24 px-6 bg-[#050505]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-6">
              Every Day • Wristband • 2 Hours
            </p>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-6 leading-tight">
              GO BOTTOMLESS <br /> FROM ONLY £25PP
            </h2>
            <p className="text-sm md:text-base font-bold text-white/60 leading-relaxed uppercase tracking-[0.25em] mb-8">
              Choose your session, pick your table mood, and enjoy two hours of unlimited cocktails with your crew.
              Water is freely available and our team will keep you topped up – responsibly.
            </p>
            <div className="flex flex-wrap gap-3">
              {['2 HOUR SESSION', 'WRISTBAND ON ARRIVAL', 'ONE DRINK AT A TIME', 'WALK-UPS SUBJECT TO AVAILABILITY'].map((chip) => (
                <span
                  key={chip}
                  className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.25em] text-white/70"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[3rem] overflow-hidden border border-white/5 bg-[#0A0A0A] p-10 flex flex-col justify-between min-h-[320px]">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <p className="text-[#f29100] text-xs font-black uppercase tracking-[0.35em] mb-2">
                  Sun–Fri Sessions
                </p>
                <h3 className="text-3xl font-black uppercase italic text-white tracking-tight">
                  FROM £25PP
                </h3>
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50">
                DAILY
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-6">
              Bottomless cocktails Sunday–Friday using the Orange Rooms booking system. Sessions are available
              every day – arrive at least 15 minutes before your start time to collect your wristbands.
            </p>
            <Button variant="primary" className="w-full !py-4 text-[11px]">
              VIEW SUN–FRI BOOKINGS
            </Button>
          </div>
        </div>

        {/* Sun–Fri vs Saturday tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          <div className="bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 hover:border-[#f29100]/40 transition-all">
            <span className="inline-block px-4 py-1 rounded-full bg-[#f29100] text-black text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Sun–Fri
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase italic text-white mb-4">
              Bottomless Cocktails Sunday–Friday
            </h3>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-4">
              FROM ONLY £25PP • EVENING SESSIONS
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
              Book a table with bottomless cocktails Sunday–Friday through our online booking system. You&apos;ll get a
              2-hour slot, a wristband on arrival and access to our full bottomless cocktail list.
            </p>
            <Button variant="outline" className="!px-10 !py-4 text-[11px]">
              BOOK SUN–FRI
            </Button>
          </div>
          <div className="bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 hover:border-[#f29100]/40 transition-all">
            <span className="inline-block px-4 py-1 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Saturdays
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase italic text-white mb-4">
              Bottomless Cocktails Every Saturday
            </h3>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-4">
              ONLY £27 • 2PM–5PM & 6PM–9PM
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
              Upgrade your Saturday for just £5 to include bottomless beer and Prosecco. Pick from two time slots,
              bring the squad and let our DJs handle the soundtrack.
            </p>
            <Button variant="primary" className="!px-10 !py-4 text-[11px]">
              BOOK SATURDAY SESSIONS
            </Button>
          </div>
        </div>

        {/* Cocktail line-up */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
            <div>
              <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-4">
                Choose Your Poison
              </p>
              <h3 className="text-3xl md:text-5xl font-black uppercase italic text-white tracking-tighter leading-tight">
                THE BOTTOMLESS <br /> COCKTAIL LINE-UP
              </h3>
            </div>
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white/50 max-w-md">
              Each guest can order one drink at a time and must finish their glass before ordering the next.
              Our team serves responsibly and may refuse service at their discretion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'PINA COLADA',
              'PORNSTAR MARTINI',
              'SEX / SPECS ON THE BEACH',
              'COSMOPOLITAN',
              'JUNE BUG',
              'ORANGE LONG ISLAND',
              'STRAWBERRY WOOWOO',
              'PINK GIN FIZZ',
              'SEASONAL SPECIALS'
            ].map((name) => (
              <div
                key={name}
                className="bg-[#0A0A0A] p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-sm font-black uppercase italic tracking-[0.25em] text-white">
                    {name}
                  </h4>
                </div>
                <Wine className="w-6 h-6 text-[#f29100]" />
              </div>
            ))}
          </div>
        </div>

        {/* How it works + Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          <div className="bg-[#0A0A0A] p-10 rounded-[3rem] border border-white/5">
            <h3 className="text-2xl font-black uppercase italic text-white mb-6">
              HOW IT WORKS
            </h3>
            <ol className="space-y-4 text-xs font-bold uppercase tracking-[0.25em] text-white/60">
              <li>1. BOOK YOUR TABLE ONLINE FOR YOUR CHOSEN SESSION.</li>
              <li>2. ARRIVE AT LEAST 15 MINUTES BEFORE YOUR START TIME.</li>
              <li>3. COLLECT YOUR WRISTBAND AND TAKE YOUR SEATS.</li>
              <li>4. ORDER ONE COCKTAIL AT A TIME FROM THE BOTTOMLESS MENU.</li>
              <li>5. FINISH YOUR DRINK BEFORE ORDERING ANOTHER.</li>
              <li>6. BE READY TO VACATE YOUR SEATS 15 MINUTES BEFORE THE END.</li>
            </ol>
          </div>
          <div className="bg-[#0A0A0A] p-10 rounded-[3rem] border border-white/5">
            <h3 className="text-2xl font-black uppercase italic text-white mb-6">
              KEY TERMS & CONDITIONS
            </h3>
            <ul className="space-y-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
              <li>• BOOKINGS MUST BE MADE IN ADVANCE THROUGH THE WEBSITE TICKET / BOOKING LINK.</li>
              <li>• VALID FOR 2 HOURS ONLY. LATE ARRIVALS MAY LOSE TIME OR HAVE BOOKINGS CANCELLED.</li>
              <li>• NOT VALID IN CONJUNCTION WITH ANY OTHER OFFER OR PROMOTION.</li>
              <li>• WE SERVE RESPONSIBLY AND MAY REFUSE SERVICE AT THE TEAM&apos;S DISCRETION.</li>
              <li>• WATER IS FREELY AVAILABLE THROUGHOUT YOUR SESSION.</li>
              <li>• WE RESERVE THE RIGHT TO STOP OR AMEND THE OFFER AT ANY TIME.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const DrinksPage = () => (
  <div className="bg-[#050505]">
    <PageHero
      title="COCKTAILS"
      subtitle="NEW SUMMER MENU"
      imageSrc="/drinks-header.jpg"
    >
      <div className="flex flex-wrap justify-center gap-4">
        <Button className="!px-10 !py-4 text-[11px]">
          VIEW SUMMER MENU
        </Button>
        <Button variant="outline" className="!px-10 !py-4 text-[11px]">
          COCKTAIL MASTERCLASS
        </Button>
      </div>
    </PageHero>

    <section className="py-32 px-6">
      <div className="container mx-auto">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-6">
            Signature Selection
          </p>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase text-white tracking-tighter mb-6">
            THE NEW DRINKS MENU
          </h2>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white/60">
            From tiki sharers in the Neon Garden to espresso martinis in the Velvet Lounge, every drink
            on our list is built for the dancefloor. Explore our new summer serves, classics and
            low &amp; no options.
          </p>
        </div>

        {/* Signature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {[
            { name: 'TIKI POWER BLAST', desc: 'Dark Rum, Pineapple, Secret Spices', price: '£10.50' },
            { name: 'ORANGE VELVET', desc: 'Vodka, Fresh Orange, Vanilla Silk', price: '£9.50' },
            { name: 'NEON MARGARITA', desc: 'Silver Tequila, Agave, Lime Glow', price: '£11.00' },
            { name: 'SOUTHAMPTON SOUR', desc: 'Whiskey, Lemon, Red Wine Float', price: '£10.00' },
            { name: 'MIDNIGHT MARTINI', desc: 'Espresso, Coffee Liqueur, Gold Dust', price: '£11.50' },
            { name: 'GARDEN FIZZ', desc: 'Gin, Elderflower, Cucumber Sprint', price: '£9.50' }
          ].map((drink, i) => (
            <div
              key={i}
              className="p-10 bg-[#0A0A0A] rounded-[3rem] border border-white/5 hover:border-[#f29100]/40 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 group-hover:bg-[#f29100] transition-colors">
                <Wine className="w-8 h-8 text-white group-hover:text-black" />
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tighter">
                {drink.name}
              </h3>
              <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest mb-6">
                {drink.desc}
              </p>
              <span className="text-[#f29100] font-black text-2xl">{drink.price}</span>
            </div>
          ))}
        </div>

        {/* Visual menu spreads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
          <div className="rounded-[3rem] overflow-hidden border border-white/5 bg-[#0A0A0A]">
            <img
              src="/drinks-menu-outside.png"
              alt="Orange Rooms summer drinks menu – front"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-[3rem] overflow-hidden border border-white/5 bg-[#0A0A0A]">
            <img
              src="/drinks-menu-inside.png"
              alt="Orange Rooms summer drinks menu – inside"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Sections row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: 'TIKI & SHARERS', desc: 'Big serves and sharers built for groups and birthdays.' },
            { title: 'CLASSICS & TWISTS', desc: 'Margaritas, martinis and Orange Rooms signatures.' },
            { title: 'LOW & NO', desc: 'Full-flavour alcohol-free cocktails for designated drivers.' }
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 hover:border-[#f29100]/40 transition-all"
            >
              <Plus className="w-8 h-8 text-[#f29100] mb-6" />
              <h3 className="text-2xl font-black uppercase italic mb-3">
                {item.title}
              </h3>
              <p className="text-white/40 font-bold uppercase text-[10px] tracking-[0.25em]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Cocktail Masterclass section */}
        <div className="bg-[#0A0A0A] rounded-[3.5rem] border border-white/5 overflow-hidden relative mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-4">
                Cocktail Masterclasses
              </p>
              <h3 className="text-3xl md:text-5xl font-black uppercase italic text-white tracking-tighter mb-6 leading-tight">
                SHAKE, STIR &amp; SIP
              </h3>
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white/60 mb-6">
                Learn the stories behind our most iconic serves and step behind the bar with our team.
                Perfect for hen parties, staff socials and birthday nights with a twist.
              </p>
              <ul className="space-y-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-8">
                <li>• WELCOME DRINK ON ARRIVAL.</li>
                <li>• HANDS-ON TUITION WITH OUR BARTENDERS.</li>
                <li>• MAKE (AND DRINK) MULTIPLE COCKTAILS EACH.</li>
                <li>• UPGRADE PACKAGES AVAILABLE FOR GROUPS.</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  className="!px-12 !py-4 text-[11px]"
                  onClick={() =>
                    window.open(
                      'https://www.orangerooms.co.uk/new-drinks-menu/cocktail-masterclasses/',
                      '_blank'
                    )
                  }
                >
                  VIEW MASTERCLASS INFO
                </Button>
                <Button
                  variant="outline"
                  className="!px-12 !py-4 text-[11px]"
                  onClick={() => window.open('https://www.orangerooms.co.uk/contact/', '_blank')}
                >
                  ENQUIRE FOR YOUR GROUP
                </Button>
              </div>
            </div>
            <div className="relative min-h-[260px] lg:min-h-[420px]">
              <img
                src="/drinks-menu-outside.png"
                alt="Cocktail masterclass at Orange Rooms"
                className="w-full h-full object-cover lg:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0A] via-transparent to-transparent lg:bg-gradient-to-l" />
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
          MENUS AND PRICING SUBJECT TO CHANGE. PLEASE CHECK IN-VENUE OR ON OUR WEBSITE FOR THE LATEST
          DRINKS LIST.
        </p>
      </div>
    </section>
  </div>
);

const FoodPage = () => (
  <div className="bg-[#050505]">
    <PageHero
      title="BOTTOMLESS FONDUE"
      subtitle="FOOD • TUESDAY–SUNDAY"
      imageSrc="/food-header.webp"
    >
      <div className="flex flex-wrap justify-center gap-4">
        <Button className="!px-10 !py-4 text-[11px]">
          BOOK FONDUE TABLE
        </Button>
        <Button
          variant="outline"
          className="!px-10 !py-4 text-[11px]"
          onClick={() => window.open('https://www.orangerooms.co.uk/food/', '_blank')}
        >
          VIEW FULL FOOD INFO
        </Button>
      </div>
    </PageHero>

    <section className="py-32 px-6">
      <div className="container mx-auto">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-[#f29100] text-sm font-black uppercase tracking-[0.4em] mb-6">
              Food: Tuesday–Sunday
            </p>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter mb-6 leading-tight">
              BOTTOMLESS <br /> FONDUE EXPERIENCE
            </h2>
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white/60 mb-6">
              Perfect for date nights, mate nights or pre-party fuel. Dip, swirl and share our new
              bottomless fondue while the Orange Rooms soundtrack does the rest.
            </p>
            <div className="flex flex-wrap gap-3">
              {['SWEET OR SAVOURY', 'PER-GROUP PRICING', 'BOTTOMLESS FONDUE', 'TUESDAY–SUNDAY'].map((chip) => (
                <span
                  key={chip}
                  className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.25em] text-white/70"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[3rem] overflow-hidden border border-white/5 bg-[#0A0A0A] p-10 flex flex-col justify-between min-h-[320px]">
            <h3 className="text-2xl md:text-3xl font-black uppercase italic text-white mb-4">
              Choose Your Style
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <p className="text-[#f29100] mb-3">Sweet</p>
                <p>FLOWING CHOCOLATE, MARSHMALLOWS &amp; SWEET TREATS.</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <p className="text-[#f29100] mb-3">Savoury</p>
                <p>GOOEY MELTED CHEESE, CURED MEATS &amp; SAVOURY BITES.</p>
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mt-6">
              SUBJECT TO AVAILABILITY. PLEASE INFORM US OF ANY ALLERGIES BEFORE ORDERING.
            </p>
          </div>
        </div>

        {/* Pricing grid */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-black uppercase italic text-white mb-8">
            PER GROUP PRICING
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: '1 PERSON', price: '£7.99' },
              { label: '2 PEOPLE', price: '£14.95' },
              { label: '3 PEOPLE', price: '£19.95' },
              { label: '4 PEOPLE', price: '£24.95' },
              { label: '5 PEOPLE', price: '£29.95' },
              { label: '6 PEOPLE', price: '£34.95' },
            ].map((tier) => (
              <div
                key={tier.label}
                className="bg-[#0A0A0A] p-5 rounded-2xl border border-white/5 text-center flex flex-col justify-center"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">
                  {tier.label}
                </p>
                <p className="text-xl font-black text-[#f29100]">{tier.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking & info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-[#0A0A0A] p-10 rounded-[3rem] border border-white/5">
            <h3 className="text-2xl font-black uppercase italic text-white mb-6">
              BOOK YOUR TABLE
            </h3>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-6">
              Walk ups are welcome, but we always recommend booking to secure your fondue spot.
              You can book a table online or get in touch with the team directly.
            </p>
            <ul className="space-y-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 mb-6">
              <li>• CALL US ON 023 8023 2333.</li>
              <li>• EMAIL INFO@ORANGEROOMS.CO.UK.</li>
              <li>• MESSAGE US ON FACEBOOK OR INSTAGRAM.</li>
            </ul>
            <Button
              variant="primary"
              className="w-full !py-4 text-[11px]"
              onClick={() => window.open('https://www.orangerooms.co.uk/food/', '_blank')}
            >
              BOOK FOOD TABLE
            </Button>
          </div>
          <div className="bg-[#0A0A0A] p-10 rounded-[3rem] border border-white/5">
            <h3 className="text-2xl font-black uppercase italic text-white mb-6">
              GOOD TO KNOW
            </h3>
            <ul className="space-y-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
              <li>• FONDUE IS AVAILABLE TUESDAY–SUNDAY.</li>
              <li>• PRICING IS PER GROUP, NOT PER PERSON.</li>
              <li>• OPTIONS AVAILABLE FOR SWEET OR SAVOURY SESSIONS.</li>
              <li>• PLEASE LET US KNOW ABOUT DIETARY REQUIREMENTS.</li>
              <li>• MENUS AND PRICING MAY CHANGE – CHECK IN-VENUE FOR THE LATEST.</li>
            </ul>
          </div>
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
  <footer className="bg-[#412B1D] pt-32 pb-12 text-white border-t border-white/10 overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-32">
        <div className="lg:col-span-2">
          <img src="/logo.png" alt="Orange Rooms" className="h-10 mb-12" />
          <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-12 max-w-md text-white">SOUTHAMPTON'S MOST LEGENDARY NIGHTLIFE EXPERIENCE.</h3>
          <div className="flex gap-4">
            <Instagram className="w-6 h-6 text-white/40 hover:text-[#f29100] cursor-pointer transition-colors" />
            <Facebook className="w-6 h-6 text-white/40 hover:text-[#f29100] cursor-pointer transition-colors" />
            <Twitter className="w-6 h-6 text-white/40 hover:text-[#f29100] cursor-pointer transition-colors" />
            <Linkedin className="w-6 h-6 text-white/40 hover:text-[#f29100] cursor-pointer transition-colors" />
          </div>
          <p className="mt-8 text-white/60 font-bold uppercase tracking-wider text-xs">
            023 8023 2333 • info@orangerooms.co.uk
          </p>
        </div>
        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Navigation</h4>
          <nav className="flex flex-col gap-4">
            {['HOME', 'EVENTS', 'BRUNCH', 'DRINKS', 'BOOK', 'PRIVATE_HIRE'].map((v) => (
              <button key={v} onClick={() => setView(v as Page)} className="text-left font-black uppercase italic tracking-tighter text-xl hover:text-white transition-colors">
                {v.replace('_', ' ')}
              </button>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Quick Links</h4>
          <nav className="flex flex-col gap-4">
            {['Privacy Policy', 'Cookie Policy', 'Terms of Use', 'Jobs', 'Contact'].map((item) => (
              <button key={item} onClick={() => setView('LEGAL')} className="text-left font-bold uppercase tracking-wider text-[10px] hover:text-white transition-colors">
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-12">
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Join the Vibe</h4>
            <div className="flex bg-black/5 border border-black/10 rounded-full p-2">
              <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent flex-1 px-4 text-black placeholder-black/40 outline-none font-bold uppercase text-[10px]" />
              <button className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
        <p>© 2026 ORANGE ROOMS SOUTHAMPTON</p>
        <div className="flex gap-8">
          <button onClick={() => setView('LEGAL')}>PRIVACY</button>
          <button onClick={() => setView('LEGAL')}>TERMS</button>
        </div>
        <a href="https://milktreeagency.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
          MADE BY MILKTREE <Sparkles className="w-3 h-3" />
        </a>
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
      case 'FOOD': return <FoodPage />;
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