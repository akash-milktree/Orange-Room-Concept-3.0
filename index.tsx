import React, { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';

// --- Types ---
type Page = 'HOME' | 'WHATS_ON' | 'BRUNCH' | 'DRINKS' | 'BOOK' | 'PRIVATE_HIRE' | 'GALLERY' | 'CONTACT' | 'LEGAL';

// --- Shared UI Components ---

const Button = ({ children, onClick, variant = 'primary', className = '' }: { children?: React.ReactNode, onClick?: () => void, variant?: 'primary' | 'secondary' | 'outline', className?: string }) => {
  const baseStyles = "px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs transition-all transform active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-[#f97316] text-[#1a1512] hover:bg-white hover:text-black",
    secondary: "bg-white text-[#1a1512] hover:bg-[#f97316] hover:text-white",
    outline: "border-2 border-white/20 text-white hover:bg-[#f97316] hover:border-[#f97316]"
  };
  
  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const PageHero = ({ title, subtitle, videoSrc, imageSrc }: { title: string, subtitle?: string, videoSrc?: string, imageSrc?: string }) => (
  <section className="relative pt-32 pb-20 bg-[#2d0a14] overflow-hidden min-h-[60vh] flex flex-col items-center justify-center text-center">
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
      {subtitle && <p className="text-[#f97316] text-[10px] md:text-sm font-black uppercase tracking-[0.6em] mb-4">{subtitle}</p>}
      <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8 drop-shadow-2xl italic">
        {title}
      </h1>
    </div>
  </section>
);

// --- Navigation ---

const Header = ({ currentView, setView }: { currentView: Page, setView: (p: Page) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems: { label: string, view: Page }[] = [
    { label: "What's On", view: 'WHATS_ON' },
    { label: "Brunch", view: 'BRUNCH' },
    { label: "Drinks", view: 'DRINKS' },
    { label: "Book", view: 'BOOK' },
    { label: "Private Hire", view: 'PRIVATE_HIRE' },
    { label: "Gallery", view: 'GALLERY' },
    { label: "Contact", view: 'CONTACT' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f97316] text-[#1a1512] h-12 flex items-center px-4 md:px-8 shadow-lg">
        <div className="flex-1 flex items-center space-x-6">
          <div 
            className="text-[11px] font-black uppercase tracking-tighter flex items-center cursor-pointer"
            onClick={() => setView('HOME')}
          >
            <span className="bg-[#1a1512] text-white px-1 mr-2">OR</span> ORANGE ROOMS
          </div>
          <nav className="hidden xl:flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest">
            {navItems.map(item => (
              <button 
                key={item.view} 
                onClick={() => setView(item.view)}
                className={`hover:opacity-70 px-2 py-1 transition-all ${currentView === item.view ? 'underline decoration-2 underline-offset-4' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-none flex items-center space-x-6">
          <Button 
            variant="secondary" 
            className="!py-1 !px-4 hidden sm:flex"
            onClick={() => setView('BOOK')}
          >
            Book Now
          </Button>
          <button className="xl:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#2d0a14] flex flex-col p-8 text-white">
          <div className="flex justify-between items-center mb-12">
            <div className="text-[11px] font-black uppercase tracking-tighter flex items-center">
              <span className="bg-[#f97316] text-black px-1 mr-2">OR</span> ORANGE ROOMS
            </div>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8 text-[#f97316]" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            <button onClick={() => { setView('HOME'); setMobileMenuOpen(false); }} className="text-4xl font-black uppercase italic tracking-tighter text-left">Home</button>
            {navItems.map(item => (
              <button 
                key={item.view} 
                onClick={() => { setView(item.view); setMobileMenuOpen(false); }}
                className="text-4xl font-black uppercase italic tracking-tighter text-left"
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

// --- Page Components ---

const HomePage = ({ setView }: { setView: (p: Page) => void }) => {
  const [activeCategory, setActiveCategory] = useState('GARDEN');
  const products = [
    { name: "Neon Jungle Garden", category: 'GARDEN', image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=400" },
    { name: "Tiki Table Booking", category: 'GARDEN', image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400" },
    { name: "Main Room Table", category: 'LOUNGE', image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=400" },
    { name: "Dance Floor VIP", category: 'CLUB', image: "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=400" },
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 bg-[#2d0a14] overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://www.orangerooms.co.uk/wp-content/uploads/2024/02/x2mate.com-Orange-Rooms-Cocktails-LG-1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#2d0a14]/70" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <p className="text-[#f97316] text-[10px] md:text-sm font-black uppercase tracking-[0.6em] mb-4">Established 2001</p>
          <h1 className="text-6xl md:text-[12rem] font-black text-white uppercase tracking-tighter leading-[0.75] mb-8 drop-shadow-2xl">
            <span className="text-[#f97316]">ORANGE</span> <br />
            <span>VIBES</span>
          </h1>
          <Button onClick={() => setView('WHATS_ON')} className="!py-4 !px-12">See What's On</Button>
        </div>
      </section>

      <section className="bg-[#2d0a14] py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-12 mb-16">
            {['GARDEN', 'LOUNGE', 'CLUB'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-black uppercase text-sm pb-2 border-b-2 ${activeCategory === cat ? 'text-[#f97316] border-[#f97316]' : 'text-white/40 border-transparent'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.category === activeCategory || activeCategory === 'ALL').map((p, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 relative">
                   <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={p.name} />
                </div>
                <h3 className="text-white font-black uppercase text-base mb-4">{p.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const WhatsOnPage = () => {
  const events = [
    { title: "Neon Saturdays", date: "Every Saturday", time: "9PM - 3AM", tag: "CLUB NIGHT", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=600" },
    { title: "Tiki Quiz Night", date: "Tuesdays", time: "7PM - 10PM", tag: "LIVE EVENT", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600" },
    { title: "Bottomless Beats", date: "Every Sunday", time: "12PM - 6PM", tag: "BRUNCH", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600" },
    { title: "Student Takeover", date: "Wednesdays", time: "10PM - 3AM", tag: "DISCOUNTED", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600" },
  ];

  return (
    <div className="bg-[#2d0a14]">
      <PageHero 
        title="WHAT'S ON" 
        subtitle="THE FULL LINEUP" 
        videoSrc="https://www.orangerooms.co.uk/wp-content/uploads/2024/02/x2mate.com-Orange-Rooms-Cocktails-LG-1080p.mp4" 
      />
      <section className="py-24 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {events.map((ev, i) => (
            <div key={i} className="bg-[#1a050b] rounded-[2rem] overflow-hidden border-4 border-white/5 group hover:border-[#f97316]/40 transition-all">
              <div className="h-64 overflow-hidden">
                <img src={ev.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
              </div>
              <div className="p-8">
                <span className="bg-[#f97316] text-black text-[9px] font-black uppercase px-3 py-1 rounded-full mb-4 inline-block">{ev.tag}</span>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">{ev.title}</h3>
                <div className="flex gap-6 text-[10px] font-bold text-white/60 mb-8">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {ev.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ev.time}</span>
                </div>
                <Button className="w-full">Book Tickets</Button>
              </div>
            </div>
          ))}
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
      <Button variant="primary" className="!py-4 !px-16 mx-auto">Book Your Slot</Button>
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
         {[1,2,3,4,5,6].map(i => (
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

const BookPage = () => (
  <div className="bg-[#2d0a14]">
    <PageHero title="BOOK A TABLE" subtitle="GUARANTEE THE VIBE" imageSrc="https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1200" />
    <section className="py-24 px-6 max-w-2xl mx-auto">
       <div className="bg-[#1a050b] p-8 md:p-12 rounded-[3rem] border-4 border-white/5 shadow-2xl">
          <h2 className="text-3xl font-black uppercase mb-8 italic">Choose Your Experience</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Select Date</label>
              <input type="date" className="w-full bg-white/5 border-2 border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#f97316]" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Number of Guests</label>
              <select className="w-full bg-white/5 border-2 border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#f97316]">
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Guests</option>)}
                <option value="9+">9+ (Enquiry needed)</option>
              </select>
            </div>
            <Button variant="primary" className="w-full !py-4">Check Availability</Button>
          </div>
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
           "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600",
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

const ContactPage = () => (
  <div className="bg-[#2d0a14]">
    <PageHero title="CONTACT US" subtitle="GET IN TOUCH" imageSrc="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200" />
    <section className="py-24 px-6 container mx-auto">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="bg-[#1a050b] p-12 rounded-[3rem] border-4 border-white/5 text-center">
             <MapPin className="w-10 h-10 text-[#f97316] mx-auto mb-6" />
             <h3 className="text-2xl font-black uppercase mb-4">Visit Us</h3>
             <p className="text-white/60 font-bold uppercase tracking-widest text-xs">1-2 Vernon Walk,<br/>Southampton SO15 2EJ</p>
          </div>
          <div className="bg-[#1a050b] p-12 rounded-[3rem] border-4 border-white/5 text-center">
             <Clock className="w-10 h-10 text-[#f97316] mx-auto mb-6" />
             <h3 className="text-2xl font-black uppercase mb-4">Opening Times</h3>
             <p className="text-white/60 font-bold uppercase tracking-widest text-xs">Mon-Thu: 4PM - Late<br/>Fri-Sat: 12PM - 3AM<br/>Sun: 12PM - Late</p>
          </div>
          <div className="bg-[#1a050b] p-12 rounded-[3rem] border-4 border-white/5 text-center">
             <Mail className="w-10 h-10 text-[#f97316] mx-auto mb-6" />
             <h3 className="text-2xl font-black uppercase mb-4">Direct</h3>
             <p className="text-white/60 font-bold uppercase tracking-widest text-xs">info@orangerooms.co.uk<br/>023 8023 2333</p>
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
             <button onClick={() => setView('WHATS_ON')} className="block hover:text-[#f97316]">What's On</button>
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

      <div className="mt-20 py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
         <p>© 2024 Orange Rooms Inc.</p>
         <div className="flex space-x-8 mt-6 md:mt-0">
           <button onClick={() => setView('LEGAL')} className="hover:text-white">Privacy Policy</button>
           <button onClick={() => setView('LEGAL')} className="hover:text-white">Terms of Use</button>
         </div>
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
    switch(view) {
      case 'HOME': return <HomePage setView={setView} />;
      case 'WHATS_ON': return <WhatsOnPage />;
      case 'BRUNCH': return <BrunchPage />;
      case 'DRINKS': return <DrinksPage />;
      case 'BOOK': return <BookPage />;
      case 'PRIVATE_HIRE': return <PrivateHirePage />;
      case 'GALLERY': return <GalleryPage />;
      case 'CONTACT': return <ContactPage />;
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

const root = createRoot(document.getElementById('root')!);
root.render(<App />);