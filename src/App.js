import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Cpu, Dna, Brain, Satellite, GitBranch, Network, Zap, Hexagon, Menu, X } from 'lucide-react';

const ABPlusVentures = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['hero', 'thesis', 'how', 'focus', 'ventures', 'principles', 'insights', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 1.2;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 60 : 120; // Fewer particles on mobile

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.2;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const focusAreas = [
    {
      title: "Intelligence / AGI",
      description: "Intelligence has become infrastructure. Agents, teammates, and autonomous systems are re-architecting how the world operates.",
      symbol: "α",
      icon: Cpu,
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Biology / TechBio",
      description: "Biology is no longer observed — it is programmed. Cells, systems, and code converge to enable longevity, prevention, precision, and personalization.",
      symbol: "β",
      icon: Dna,
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Neurotech & Human Enhancement",
      description: "The brain is no longer bounded. Interfaces and augmentation expand cognition, extend vitality, and blur the line between human and machine.",
      symbol: "γ",
      icon: Brain,
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      title: "Robotics & Embodied AI",
      description: "Intelligence is no longer digital — it moves, builds, and operates in the physical world. Autonomous systems bridge bits and atoms.",
      symbol: "δ",
      icon: Hexagon,
      gradient: "from-orange-500/20 to-amber-500/20"
    },
    {
      title: "Space & Quantum",
      description: "Space and matter are no longer distant. Computation, energy, and exploration push beyond planetary limits into interplanetary design.",
      symbol: "ε",
      icon: Satellite,
      gradient: "from-indigo-500/20 to-violet-500/20"
    },
    {
      title: "Web3 / Crypto / Blockchain",
      description: "Value is no longer centralized — it is distributed, programmable, and sovereign. Decentralized systems reshape trust, ownership, and coordination at scale.",
      symbol: "ζ",
      icon: GitBranch,
      gradient: "from-cyan-500/20 to-teal-500/20"
    },
    {
      title: "Convergence Zones",
      description: "Frontiers are no longer separate. Disciplines collide and compound, accelerating the trajectory toward singularity.",
      symbol: "Ω",
      icon: Network,
      gradient: "from-gray-500/20 to-slate-500/20"
    }
  ];

  const WavePattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wave" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
          <path d="M0,25 Q25,10 50,25 T100,25" stroke="currentColor" fill="none" strokeWidth="2"/>
          <path d="M0,35 Q25,20 50,35 T100,35" stroke="currentColor" fill="none" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wave)"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .gradient-animate { 
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-3xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-xl sm:text-2xl font-extralight tracking-tight hover:text-white/80 transition-colors"
          >
            AB Plus Ventures
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-6 xl:gap-10 text-sm">
            {['Thesis', 'Focus', 'Ventures', 'Principles', 'Insights', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`transition-colors font-light tracking-wide ${
                  activeSection === item.toLowerCase() 
                    ? 'text-white' 
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-3xl border-t border-white/5">
            <div className="px-4 py-6 space-y-4">
              {['Thesis', 'Focus', 'Ventures', 'Principles', 'Insights', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left py-2 transition-colors font-light ${
                    activeSection === item.toLowerCase() 
                      ? 'text-white' 
                      : 'text-white/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
        <canvas ref={canvasRef} className="absolute inset-0" />
        
        <div 
          className="absolute w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full blur-3xl opacity-20 bg-gradient-to-r from-violet-600 to-purple-600 animate-pulse-glow"
          style={{
            top: '20%',
            left: '10%',
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.03}px, ${(mousePosition.y - window.innerHeight / 2) * 0.03}px)`
          }}
        />
        <div 
          className="absolute w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] rounded-full blur-3xl opacity-20 bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse-glow"
          style={{
            bottom: '20%',
            right: '10%',
            animationDelay: '1.5s',
            transform: `translate(${-(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${-(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
          }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div className="hidden sm:block absolute top-20 left-10 text-[8rem] lg:text-[12rem] font-extralight animate-float" style={{ animationDelay: '0s' }}>α</div>
          <div className="hidden sm:block absolute top-1/3 right-20 text-[6rem] lg:text-[10rem] font-extralight animate-float" style={{ animationDelay: '1s' }}>β</div>
          <div className="hidden sm:block absolute bottom-20 left-1/4 text-[5rem] lg:text-[8rem] font-extralight animate-float" style={{ animationDelay: '2s' }}>γ</div>
          <div className="hidden sm:block absolute bottom-1/3 right-1/3 text-[8rem] lg:text-[14rem] font-extralight animate-float" style={{ animationDelay: '1.5s' }}>Ω</div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-extralight tracking-tighter mb-4 sm:mb-6 leading-none bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
              AB Plus Ventures
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl text-white/70 font-extralight italic tracking-wide">
              Lean. Exponential. Inevitable.
            </div>
            
            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 sm:gap-4 text-base sm:text-lg text-white/30 font-extralight">
              <span className="text-violet-400">α</span>
              <span>→</span>
              <span className="text-purple-400">β</span>
              <span>→</span>
              <span className="text-pink-400">γ</span>
              <span>→</span>
              <span className="text-orange-400">δ</span>
              <span className="text-white/20">...</span>
              <span>→</span>
              <span className="text-cyan-400">Ω</span>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/60 leading-relaxed max-w-5xl mx-auto font-light px-4">
            "We believe the next greatest ventures won't be built by massive institutions or armies of people — they'll be created by solo founders and lean teams, moving with precision at the edge of exponential technologies. AB Plus Ventures partners deeply at this frontier: building, advising, and accelerating the companies shaping the singularity."
          </p>

          <button 
            onClick={() => scrollToSection('thesis')}
            className="mt-12 sm:mt-20 inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full hover:shadow-2xl hover:shadow-violet-500/50 transition-all hover:gap-4 font-light text-base sm:text-lg"
          >
            Explore Our Thesis
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Thesis */}
      <section id="thesis" className="py-20 sm:py-32 lg:py-40 relative px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/20 to-black" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-xs tracking-[0.3em] sm:tracking-[0.5em] text-violet-400/60 uppercase mb-6 sm:mb-8 font-light">Thesis</div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight mb-6 sm:mb-10 bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
            Lean is the new scale.
          </h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white/70 font-extralight mb-12 sm:mb-20">
            Solo founders and sharp teams are enough to build what matters.
          </p>
          
          <div className="relative pl-8 sm:pl-12 mb-12 sm:mb-20">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-purple-500 to-transparent" />
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/50 italic font-extralight leading-relaxed">
              "History shows us: a handful of people can bend the arc of the future."
            </p>
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl text-white/60 leading-relaxed font-light max-w-5xl">
            Our thesis is simple: when purpose and clarity meet exponential technologies, focus beats force. We operate where the curves accelerate, and the singularity shifts from theory to practice.
          </p>
        </div>
      </section>

      {/* How We Work */}
      <section id="how" className="py-20 sm:py-32 lg:py-40 relative px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-xs tracking-[0.3em] sm:tracking-[0.5em] text-purple-400/60 uppercase mb-6 sm:mb-8 font-light">How We Work</div>
          
          <div className="relative pl-8 sm:pl-12 mb-16 sm:mb-24">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent" />
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/50 italic font-extralight leading-relaxed">
              "Embedded partnership. Precision at the critical edge. Every venture is unique."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Conviction Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative p-8 sm:p-10 bg-gradient-to-br from-violet-950/30 to-black/50 backdrop-blur-xl border border-white/5 rounded-3xl hover:border-violet-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-2">
                <div className="text-6xl sm:text-8xl font-extralight text-violet-500/20 mb-6 sm:mb-8 group-hover:text-violet-500/40 transition-colors">
                  01
                </div>
                <h3 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-5">Conviction</h3>
                <p className="text-white/50 font-light leading-relaxed text-base sm:text-lg">
                  We move with deep conviction at the intersection of exponential technologies and inevitable markets.
                </p>
              </div>
            </div>

            {/* Creation Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative p-8 sm:p-10 bg-gradient-to-br from-purple-950/30 to-black/50 backdrop-blur-xl border border-white/5 rounded-3xl hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
                <div className="text-6xl sm:text-8xl font-extralight text-purple-500/20 mb-6 sm:mb-8 group-hover:text-purple-500/40 transition-colors">
                  02
                </div>
                <h3 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-5">Creation</h3>
                <p className="text-white/50 font-light leading-relaxed text-base sm:text-lg">
                  We build with precision, iterating rapidly where the curves steepen and acceleration compounds.
                </p>
              </div>
            </div>

            {/* Capital Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative p-8 sm:p-10 bg-gradient-to-br from-pink-950/30 to-black/50 backdrop-blur-xl border border-white/5 rounded-3xl hover:border-pink-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2">
                <div className="text-6xl sm:text-8xl font-extralight text-pink-500/20 mb-6 sm:mb-8 group-hover:text-pink-500/40 transition-colors">
                  03
                </div>
                <h3 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-5">Capital</h3>
                <p className="text-white/50 font-light leading-relaxed text-base sm:text-lg">
                  We activate resources strategically, amplifying momentum at the critical inflection points.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section id="focus" className="py-20 sm:py-28 lg:py-32 relative px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/10 to-black"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-xs tracking-[0.3em] sm:tracking-[0.4em] text-white/40 uppercase mb-6 sm:mb-8 font-light">Focus</div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight mb-16 sm:mb-24">
            Where exponential curves steepen.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div 
                  key={index}
                  className="group relative p-8 sm:p-10 lg:p-12 border border-white/10 rounded-3xl hover:border-white/30 transition-all duration-500 overflow-hidden backdrop-blur-sm"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-6xl sm:text-8xl lg:text-9xl font-extralight text-white/5 group-hover:text-white/10 transition-colors">
                    {area.symbol}
                  </div>
                  
                  <div className="relative z-10 mb-4 sm:mb-6">
                    <Icon size={32} className="sm:w-10 sm:h-10 text-white/40 group-hover:text-white/80 transition-colors" strokeWidth={1} />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 relative z-10">{area.title}</h3>
                  <p className="text-white/60 leading-relaxed font-light text-sm sm:text-base relative z-10">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ventures */}
      <section id="ventures" className="py-20 sm:py-28 lg:py-32 relative px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-xs tracking-[0.3em] sm:tracking-[0.5em] text-blue-400/60 uppercase mb-6 sm:mb-8 font-light">Ventures</div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight mb-12 sm:mb-16">
            Where the future takes form.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* AI-Native Infrastructure */}
            <div className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-purple-950/30 to-black" />
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="50" cy="50" r="2" fill="currentColor" className="text-violet-400"/>
                    <circle cx="20" cy="20" r="1.5" fill="currentColor" className="text-purple-400"/>
                    <circle cx="80" cy="20" r="1.5" fill="currentColor" className="text-purple-400"/>
                    <circle cx="20" cy="80" r="1.5" fill="currentColor" className="text-purple-400"/>
                    <circle cx="80" cy="80" r="1.5" fill="currentColor" className="text-purple-400"/>
                    <line x1="20" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-violet-400/40"/>
                    <line x1="80" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-violet-400/40"/>
                    <line x1="20" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-violet-400/40"/>
                    <line x1="80" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-violet-400/40"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#neural)"/>
              </svg>
              <div className="relative h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm rounded-full text-xs font-light mb-4 sm:mb-6 border border-white/10">
                    <Cpu size={14} />
                    Intelligence
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4">AI-Native Infrastructure</h3>
                  <p className="text-white/70 font-light leading-relaxed text-sm">
                    Intelligence as infrastructure. Autonomous agents, reasoning systems, and AI-native architectures re-architecting markets, networks, and capital.
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <span className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-light border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                    Sequence Sync
                  </span>
                </div>
              </div>
            </div>

            {/* Programmable Biology */}
            <div className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-black" />
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dna-helix" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M20,10 Q30,30 20,50 T20,90" stroke="currentColor" fill="none" strokeWidth="2" className="text-emerald-400"/>
                    <path d="M80,10 Q70,30 80,50 T80,90" stroke="currentColor" fill="none" strokeWidth="2" className="text-teal-400"/>
                    <line x1="20" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" className="text-emerald-400/40"/>
                    <line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="1" className="text-emerald-400/40"/>
                    <line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="1" className="text-emerald-400/40"/>
                    <line x1="20" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="1" className="text-emerald-400/40"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dna-helix)"/>
              </svg>
              <div className="relative h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm rounded-full text-xs font-light mb-4 sm:mb-6 border border-white/10">
                    <Dna size={14} />
                    Biology
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4">Programmable Biology</h3>
                  <p className="text-white/70 font-light leading-relaxed text-sm">
                    Biology and medicine as code. Enabling longevity, prevention, precision, and personalization.
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <span className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-light border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                    CellSight AI
                  </span>
                </div>
              </div>
            </div>

            {/* New Signals of Value */}
            <div className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all lg:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-cyan-950/30 to-black" />
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="signals" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
                    <path d="M0,30 Q20,10 40,30 T80,30 T120,30" stroke="currentColor" fill="none" strokeWidth="2" className="text-cyan-400"/>
                    <path d="M0,40 Q20,20 40,40 T80,40 T120,40" stroke="currentColor" fill="none" strokeWidth="1.5" className="text-blue-400/60"/>
                    <path d="M0,20 Q20,0 40,20 T80,20 T120,20" stroke="currentColor" fill="none" strokeWidth="1" className="text-cyan-400/40"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#signals)"/>
              </svg>
              <div className="relative h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm rounded-full text-xs font-light mb-4 sm:mb-6 border border-white/10">
                    <Network size={14} />
                    Markets
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4">New Signals of Value</h3>
                  <p className="text-white/70 font-light leading-relaxed text-sm max-w-3xl">
                    Markets that measure what matters. Prediction, adoption, momentum, growth.
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <span className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-light border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                    iFutures
                  </span>
                  <span className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-light border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                    Nexus IP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="py-20 sm:py-32 lg:py-40 relative px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-rose-950/10 to-black" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-xs tracking-[0.3em] sm:tracking-[0.5em] text-rose-400/60 uppercase mb-6 sm:mb-8 font-light">Principles</div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight mb-12 sm:mb-20 bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
            How we operate.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "Lean team ethos", desc: "Proof that greatness doesn't require armies" },
              { title: "Embedded partnership", desc: "We step in when it matters, not from the sidelines" },
              { title: "Founder-aligned", desc: "No rigid structures, no bloat, just shared commitment to building the future" },
              { title: "Build, don't observe", desc: "Ideas only matter when they touch the world. Execution compounds and action is proof" },
              { title: "Markets are shaped, not waited for", desc: "The best ventures don't follow trends, they create gravity" },
              { title: "Signals over stories", desc: "Traction, adoption, and data outrun narrative and hype" },
              { title: "Exponential, with integrity", desc: "Scale without compromise. Compounding with purpose" }
            ].map((principle, index) => (
              <div 
                key={index} 
                className="group relative p-6 sm:p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl hover:border-rose-500/30 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10">
                  <div className="text-rose-500/40 font-extralight text-sm mb-3 sm:mb-4 group-hover:text-rose-400/60 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg sm:text-xl font-light mb-2 sm:mb-3 group-hover:text-white transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-white/50 group-hover:text-white/70 font-light leading-relaxed text-sm transition-colors">
                    {principle.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section id="insights" className="py-20 sm:py-28 lg:py-32 relative px-4 sm:px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/10 to-black"></div>
          <WavePattern />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-xs tracking-[0.3em] sm:tracking-[0.4em] text-white/40 uppercase mb-6 sm:mb-8 font-light">Insights</div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight mb-6 sm:mb-8">
            Frontier Insights
          </h2>
          <p className="text-lg sm:text-xl text-white/60 font-light mb-12 sm:mb-16 max-w-3xl">
            Stay ahead of the curves reshaping intelligence, biology, and the frontier economy. Weekly perspectives, delivered simply.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-2xl">
            <input 
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-full focus:outline-none focus:border-white/40 transition-colors font-light text-white placeholder-white/40"
            />
            <a 
              href="mailto:anitha@abplusventures.com"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full hover:bg-white/90 transition-all font-light text-center"
            >
              Subscribe
            </a>
          </div>

          <div className="text-sm text-white/40 font-light">
            Latest insights coming soon — launching with the singularity's acceleration.
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-32 lg:py-40 relative px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="text-xs tracking-[0.3em] sm:tracking-[0.5em] text-purple-400/60 uppercase mb-6 sm:mb-8 font-light">Contact</div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight mb-8 sm:mb-12 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Building at the edge?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/60 font-light mb-12 sm:mb-20 max-w-3xl mx-auto leading-relaxed">
            Are you building solo? In stealth? With a lean team at the edge? We want to hear from you.
          </p>
          
          <a 
            href="mailto:anitha@abplusventures.com"
            className="px-10 sm:px-14 py-4 sm:py-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg sm:text-xl font-light hover:scale-105 inline-block"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 sm:py-32 lg:py-40 relative px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-950" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="border-t border-white/10 pt-16 sm:pt-24 pb-12 sm:pb-16">
            <p className="text-2xl sm:text-3xl lg:text-4xl text-white/60 italic font-extralight leading-relaxed">
              "Our ventures are born where exponential technologies meet inevitable markets. We build what matters, prove it early, and let momentum compound."
            </p>
          </div>
          
          <div className="mt-16 sm:mt-24 pt-16 sm:pt-24 border-t border-white/10">
            <div className="text-xl sm:text-2xl font-light tracking-tight mb-6 sm:mb-8">
              AB Plus Ventures
            </div>
            <div className="text-sm sm:text-base text-white/30 font-light flex items-center justify-center gap-3 sm:gap-4 mb-4 flex-wrap">
              <span className="text-violet-400">α</span>
              <span>→</span>
              <span className="text-purple-400">β</span>
              <span>→</span>
              <span className="text-pink-400">γ</span>
              <span>...</span>
              <span>→</span>
              <span className="text-cyan-400">ω</span>
            </div>
            <div className="text-xs sm:text-sm text-white/40 font-light mt-6 sm:mt-8">
              © AB Plus Ventures 2025
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ABPlusVentures;
