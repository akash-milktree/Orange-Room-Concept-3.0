
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
  MapPin
} from 'lucide-react';

// --- Shared UI Components ---

const Button = ({ children, variant = 'primary', className = '' }: { children?: React.ReactNode, variant?: 'primary' | 'secondary' | 'outline', className?: string }) => {
  const baseStyles = "px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs transition-all transform active:scale-95";
  const variants = {
    primary: "bg-[#f97316] text-[#1a1512] hover:bg-white hover:text-black", // Reverted to brand orange
    secondary: "bg-white text-[#1a1512] hover:bg-[#f97316] hover:text-white",
    outline: "border-2 border-white/20 text-white hover:bg-[#f97316] hover:border-[#f97316]"
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ subtitle, title, centered = true }: { subtitle?: string, title: string, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    {subtitle && <p className="text-white/60 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4">{subtitle}</p>}
    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-xl italic">
      {title}
    </h2>
  </div>
);

// --- Sections ---

const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 bg-[#f97316] text-[#1a1512] h-12 flex items-center px-4 md:px-8 shadow-lg">
    <div className="flex-1 flex items-center space-x-6">
      <div className="text-[11px] font-black uppercase tracking-tighter flex items-center">
        <span className="bg-[#1a1512] text-white px-1 mr-2">OR</span> ORANGE ROOMS
      </div>
      <nav className="hidden lg:flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest">
        <a href="#" className="hover:opacity-70">Products <ChevronRight className="inline w-3 h-3 rotate-90" /></a>
        <a href="#" className="hover:opacity-70">Mission <ChevronRight className="inline w-3 h-3 rotate-90" /></a>
        <a href="#" className="hover:opacity-70">Experience <ChevronRight className="inline w-3 h-3 rotate-90" /></a>
        <a href="#" className="hover:opacity-70">Events</a>
      </nav>
    </div>
    <div className="flex-none flex items-center space-x-6">
      <nav className="hidden lg:flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest">
        <a href="#" className="hover:opacity-70">Bookings</a>
        <a href="#" className="hover:opacity-70">Find Us</a>
      </nav>
      <button className="lg:hidden"><Menu className="w-5 h-5" /></button>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 bg-[#2d0a14] overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
    {/* Floating Elements like the reference */}
    <div className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#f97316]/40 rotate-12 animate-pulse hidden md:block">
      <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
    </div>
    <div className="absolute top-20 right-10 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#f97316]/40 -rotate-12 animate-pulse delay-700 hidden md:block">
      <img src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
    </div>
    <div className="absolute bottom-20 left-20 w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#f97316]/40 rotate-45 animate-pulse delay-300 hidden md:block">
      <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
    </div>
    <div className="absolute bottom-20 right-20 w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#f97316]/40 -rotate-45 animate-pulse delay-500 hidden md:block">
      <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
    </div>

    <div className="relative z-10 text-center max-w-4xl px-6">
      <p className="text-[#f97316] text-[10px] md:text-sm font-black uppercase tracking-[0.6em] mb-4">Established 2001</p>
      <div className="flex items-center justify-center space-x-2 mb-2">
        <Plus className="w-4 h-4 text-[#f97316]" />
        <p className="text-white text-xs md:text-base font-black uppercase tracking-[0.4em]">It's Giving</p>
        <Minus className="w-4 h-4 text-[#f97316]" />
      </div>
      <h1 className="text-6xl md:text-[12rem] font-black text-white uppercase tracking-tighter leading-[0.75] mb-8 drop-shadow-2xl">
        <span className="text-[#f97316]">ORANGE</span> <br />
        <span>VIBES</span>
      </h1>
      <Button className="!py-4 !px-12 bg-[#f97316] !text-[#1a1512] hover:bg-white">
        Learn More <Plus className="inline w-3 h-3 ml-2" />
      </Button>
    </div>
  </section>
);

const ProductCarousel = () => {
  const products = [
    { name: "Neon Jungle Garden", image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=400" },
    { name: "Main Room Table", image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=400" },
    { name: "Tiki Table Booking", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400" },
    { name: "Bottomless Cocktails", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=400" },
  ];

  return (
    <section className="bg-[#2d0a14] py-24 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em] mb-8">Speaking Of Vibes From Plants...</p>
        
        <div className="flex items-center justify-center space-x-12 mb-16">
          <button className="text-[#f97316] border-b-2 border-[#f97316] pb-2 font-black uppercase text-sm">Garden</button>
          <button className="text-white/40 hover:text-white transition-colors font-black uppercase text-sm">Lounge</button>
          <button className="text-white/40 hover:text-white transition-colors font-black uppercase text-sm">Club</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 relative">
                 <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-white font-black uppercase text-base mb-4">{p.name}</h3>
              <div className="flex items-center justify-center space-x-4">
                <a href="#" className="text-[#f97316] text-[10px] font-black uppercase underline decoration-2 underline-offset-4">Learn More</a>
                <a href="#" className="text-white text-[10px] font-black uppercase underline decoration-2 underline-offset-4">Find It</a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center space-x-2">
          {[0,1,2,3,4].map(i => <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#f97316]' : 'bg-white/20'}`} />)}
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
    <section className="bg-[#2d0a14] py-32 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em] mb-4">Want Nightlife Inspo? We Got You.</p>
          <div className="flex justify-center space-x-4 mb-12">
            <button className="bg-white/10 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">Garden</button>
            <button className="bg-white/10 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">Cocktails</button>
            <button className="bg-white/10 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">Food</button>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Minus className="w-4 h-4 text-[#f97316]" />
            <p className="text-white text-xs font-black uppercase tracking-[0.4em]">Flex On Everyone At</p>
            <Minus className="w-4 h-4 text-[#f97316]" />
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-[#f97316] uppercase tracking-tighter leading-none italic">THE POTLUCK</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {recipes.map((r, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 border-4 border-white/5">
                <img src={r.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="text-center">
                <span className="bg-[#f97316] text-[#1a1512] px-3 py-1 text-[9px] font-black uppercase rounded-full">{r.tag}</span>
                <h3 className="text-white text-3xl font-black uppercase tracking-tighter mt-4 mb-6">{r.title}</h3>
                <div className="flex items-center justify-center space-x-6 text-[10px] font-black uppercase tracking-widest text-white/50">
                  <span>{r.servings}</span>
                  <span>{r.items} Items</span>
                  <span>{r.difficulty}</span>
                </div>
                <button className="mt-8 border-2 border-[#f97316] text-[#f97316] px-8 py-2 rounded-full text-[10px] font-black uppercase hover:bg-[#f97316] hover:text-[#1a1512] transition-all">View Vibes</button>
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
  <section className="bg-[#41ccce] py-32 px-6 text-center">
    <div className="container mx-auto max-w-4xl">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <Plus className="w-4 h-4 text-[#2d0a14]" />
        <p className="text-[#2d0a14] text-xs font-black uppercase tracking-[0.4em]">Our</p>
        <Plus className="w-4 h-4 text-[#2d0a14]" />
      </div>
      <div className="relative inline-block mb-12">
        <h2 className="text-7xl md:text-[10rem] font-black text-[#2d0a14] uppercase tracking-tighter leading-none italic">MISSION</h2>
        <div className="absolute -top-4 -right-12 bg-[#2d0a14] text-[#41ccce] p-2 rounded-full w-20 h-20 flex items-center justify-center rotate-12">
          <span className="text-[10px] font-black uppercase leading-tight">Small <br/> Actions <br/> Big <br/> Change</span>
        </div>
      </div>
      <p className="text-[#2d0a14] text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-wider">
        We strive to make hospitality that's delicious, better for the planet, and way better for the vibe. "The way to solve the most important and urgent problem humanity has potentially ever faced turned out to be to figure out how to make the best drink on earth."
      </p>
      <p className="mt-12 text-[#2d0a14] font-black uppercase text-xs tracking-[0.3em]">The Founder of Orange Rooms</p>
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
                <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === i ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </div>

          <div className="bg-[#1a050b] p-12 rounded-[3rem] border-4 border-white/5 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8 italic">
                We are all about making <span className="text-[#f97316]">unbelievably</span> tasty cocktails.
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-12 font-bold">
                Our hospitality products are nutrient-packed and have 0% boredom. And our super meaty vibe? That's what makes us kind of famous. Our protein/serving is 33% less fat than the animal version. Aren't plants amazing?
              </p>
              <Button variant="primary" className="!px-12 !py-4">Book This Experience</Button>
            </div>
            
            <div className="absolute top-10 right-10 w-32 h-48 bg-[#f97316] rounded-2xl hidden md:flex items-center justify-center p-4">
               <div className="grid grid-cols-2 gap-2 opacity-40">
                  {[...Array(6)].map((_, i) => <div key={i} className="w-8 h-8 rounded-full border-4 border-black" />)}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => (
  <section className="bg-[#2d0a14] py-32 px-6">
    <div className="container mx-auto max-w-4xl">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Minus className="w-4 h-4 text-[#f97316]" />
          <p className="text-white text-xs font-black uppercase tracking-[0.4em]">Browse Our</p>
          <Minus className="w-4 h-4 text-[#f97316]" />
        </div>
        <h2 className="text-7xl md:text-9xl font-black text-[#f97316] uppercase tracking-tighter leading-none italic">FAQ'S</h2>
      </div>

      <div className="space-y-6">
        {[1,2,3].map(i => (
          <div key={i} className="bg-[#1a050b] p-8 rounded-2xl border-4 border-white/5 flex items-center justify-between group cursor-pointer hover:border-[#f97316]/40 transition-all">
            <span className="text-white text-sm md:text-xl font-black uppercase tracking-tight">What are the ingredients in Orange Rooms vibes?</span>
            <ChevronRight className="w-6 h-6 text-white group-hover:rotate-90 transition-transform group-hover:text-[#f97316]" />
          </div>
        ))}
      </div>
      
      <div className="mt-32 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Plus className="w-4 h-4 text-[#f97316]" />
          <p className="text-white text-xs font-black uppercase tracking-[0.4em]">Still</p>
          <Plus className="w-4 h-4 text-[#f97316]" />
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic mb-12">HAVE <br/> QUESTIONS?</h2>
        <Button variant="primary" className="!px-16">Find Help <Plus className="inline w-3 h-3 ml-2" /></Button>
      </div>
    </div>
  </section>
);

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
          <Button variant="primary" className="!bg-[#1a1512] !text-white !px-16 hover:!bg-[#f97316]">Get Directions <Plus className="inline w-3 h-3 ml-2" /></Button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#1a050b] pt-32 text-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row justify-between mb-32 gap-20">
        <div className="max-w-md">
           <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">Sign up to stay updated on the latest vibes and releases.</h3>
           <div className="flex bg-white rounded-full p-2">
             <input type="email" placeholder="Email*" className="bg-transparent flex-1 px-4 text-black outline-none font-bold placeholder:text-black/40" />
             <Button variant="primary" className="!bg-[#f97316] !text-[#1a1512]">Submit</Button>
           </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-[10px] font-black uppercase tracking-widest text-white/50">
           <div className="space-y-4">
             <p className="text-white">Eat Vibes</p>
             <a href="#" className="block hover:text-[#f97316]">Locator</a>
             <a href="#" className="block hover:text-[#f97316]">Recipes</a>
           </div>
           <div className="space-y-4">
             <p className="text-white">Sell Vibes</p>
             <a href="#" className="block hover:text-[#f97316]">Restaurant</a>
             <a href="#" className="block hover:text-[#f97316]">Supplier</a>
           </div>
           <div className="space-y-4">
             <p className="text-white">About Us</p>
             <a href="#" className="block hover:text-[#f97316]">Impact</a>
             <a href="#" className="block hover:text-[#f97316]">Science</a>
             <a href="#" className="block hover:text-[#f97316]">Careers</a>
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

      <div className="relative mt-20 group">
        <h2 className="text-[12vw] md:text-[22vw] font-black uppercase tracking-tighter leading-none text-[#f97316] transition-transform duration-700 group-hover:-translate-y-12">
          ORANGE
        </h2>
        <div className="absolute -bottom-20 md:-bottom-40 left-1/2 -translate-x-1/2 w-full max-w-4xl aspect-video rounded-[4rem] overflow-hidden border-8 border-white/10 group-hover:scale-105 transition-all duration-700 shadow-2xl">
          <img src="https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1500" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="mt-[20rem] md:mt-[40rem] py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
         <p>© 2024 Orange Rooms Inc.</p>
         <div className="flex space-x-8 mt-6 md:mt-0">
           <a href="#" className="hover:text-white">Terms of Use</a>
           <a href="#" className="hover:text-white">Privacy Policy</a>
         </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="bg-[#2d0a14] selection:bg-[#f97316] selection:text-[#1a1512] antialiased">
      <Header />
      <main>
        <Hero />
        <ProductCarousel />
        <PotluckGrid />
        <MissionSection />
        <FeatureTabs />
        <FAQ />
        <MeatLocator />
      </main>
      <Footer />
      
      {/* Scroll Indicator */}
      <div className="fixed bottom-10 right-10 z-[60] flex flex-col items-center space-y-4">
         <button className="w-12 h-12 bg-[#f97316] text-[#1a1512] rounded-full flex items-center justify-center shadow-2xl animate-bounce hover:bg-white transition-colors">
           <ChevronRight className="w-6 h-6 rotate-90" />
         </button>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
