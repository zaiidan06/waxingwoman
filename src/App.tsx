import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, Heart, Shield, Star, Phone, Mail, MapPin, Award, Users, Calendar, Gift, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import MainHeroSection from '@/assets/img-content-1.png';
import MainHeroSection2 from '@/assets/img-content-2.png';
// import NavbarCustom from './components/NavbarCustom';
import Logo from "@/assets/logo_waxingwoman.png";

// Custom hook untuk animasi berdasarkan section visibility - DIPERBAIKI
const useSectionAnimation = (options: IntersectionObserverInit = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = ref.current; // Copy ref.current to a variable
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          setIsVisible(true);
        }
        // Jangan reset visibility untuk mempertahankan interaktivitas
      },
      {
        threshold: [0, 0.2, 0.5],
        rootMargin: '0px 0px -10% 0px',
        ...options
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible] as const;
};

// Komponen wrapper untuk section-based animation - DIPERBAIKI
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  sectionId?: string;
}

const AnimatedSection = ({ children, className = "", sectionId = "" }: AnimatedSectionProps) => {
  const [ref, isVisible] = useSectionAnimation();

  return (
    <section
      ref={ref}
      id={sectionId}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0.3, // Jangan sampai 0 untuk mempertahankan interaktivitas
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: 'auto' // Selalu aktif
      }}
    >
      {children}
    </section>
  );
};

// Komponen AnimatedCounter - DIPERBAIKI
interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
  delay?: number;
}

const AnimatedCounter = ({ target, duration = 2000, className = "", delay = 0 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useSectionAnimation();
  const animationRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      
      let startTime: number | null = null;

      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        if (elapsed < delay) {
          animationRef.current = requestAnimationFrame(animateCount);
          return;
        }

        const progress = Math.min((elapsed - delay) / duration, 1);
        const easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : -1 + (4 - 2 * progress) * progress;

        const currentCount = Math.floor(easedProgress * target);
        setCount(currentCount);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateCount);
        } else {
          setCount(target);
        }
      };

      animationRef.current = requestAnimationFrame(animateCount);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, target, duration, delay]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {count}
    </span>
  );
};

// Komponen AnimatedPercentage - SAMA DENGAN COUNTER
interface AnimatedPercentageProps {
  target: number;
  duration?: number;
  className?: string;
  delay?: number;
}

const AnimatedPercentage = ({ target, duration = 2000, className = "", delay = 0 }: AnimatedPercentageProps) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useSectionAnimation();
  const animationRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      
      let startTime: number | null = null;

      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        if (elapsed < delay) {
          animationRef.current = requestAnimationFrame(animateCount);
          return;
        }

        const progress = Math.min((elapsed - delay) / duration, 1);
        const easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : -1 + (4 - 2 * progress) * progress;

        const currentCount = Math.floor(easedProgress * target);
        setCount(currentCount);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateCount);
        } else {
          setCount(target);
        }
      };

      animationRef.current = requestAnimationFrame(animateCount);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, target, duration, delay]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {count}%
    </span>
  );
};

// NAVBAR COMPONENT - BARU
const NavbarCustom = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md shadow-pink-300/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex justify-center items-center gap-4 flex-shrink-0">
            <a href="#">
              <img
                src={Logo}
                alt="Waxing Woman Logo"
                className="w-14 h-14 border border-pink-300 rounded-full object-cover"
                />
            </a>
            <h1 className={`text-2xl font-bold transition-colors hidden sm:flex ${
              isScrolled ? 'text-pink-600' : 'text-white'
            }`}>
              WaxingWoman
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className={`hover:text-pink-500 transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Beranda
              </a>
              <a href="#services" className={`hover:text-pink-500 transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Layanan
              </a>
              <a href="#about" className={`hover:text-pink-500 transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Tentang
              </a>
              <a href="#gallery" className={`hover:text-pink-500 transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Galeri
              </a>
              <a href="#contact" className={`hover:text-pink-500 transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Kontak
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://wa.me/6287884808447', '_blank')}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <div className={`w-6 h-0.5 bg-current transform transition-all ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}></div>
                <div className={`w-6 h-0.5 bg-current mt-1 transition-all ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}></div>
                <div className={`w-6 h-0.5 bg-current mt-1 transform transition-all ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 py-2">
            <a href="#home" className="block px-4 py-2 text-gray-800 hover:bg-pink-50">Beranda</a>
            <a href="#services" className="block px-4 py-2 text-gray-800 hover:bg-pink-50">Layanan</a>
            <a href="#about" className="block px-4 py-2 text-gray-800 hover:bg-pink-50">Tentang</a>
            <a href="#gallery" className="block px-4 py-2 text-gray-800 hover:bg-pink-50">Galeri</a>
            <a href="#contact" className="block px-4 py-2 text-gray-800 hover:bg-pink-50">Kontak</a>
            <div className="px-4 py-2">
              <Button 
                className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full"
                onClick={() => window.open('https://wa.me/6287884808447', '_blank')}
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

function App() {
  const [currentBackground, setCurrentBackground] = useState(0);

  // Background images placeholder
  const backgroundImages = [
    MainHeroSection,
    MainHeroSection2
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="w-full overflow-x-hidden">
      <NavbarCustom />
      
      {/* Hero Section - DIPERBAIKI */}
      <section id="home" className="relative h-screen flex items-center justify-center mt-0 w-full overflow-hidden">
        <div className="w-full px-32">
          {/* Background Slider */}
          <div className="absolute inset-0 z-0">
            {backgroundImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                  index === currentBackground ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-pink-900/50"></div>
          </div>
          
          {/* Konten Hero - Z-INDEX DIPERBAIKI */}
          <div className="container mx-auto px-6 z-20 text-white w-full relative">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 mt-12 leading-tight animate-fade-in">
                SELAMAT DATANG
              </h1>
              <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
                Nikmati layanan waxing terbaik kami dengan mudah, cepat, dan nyaman.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
                <Button 
                  className="w-fit px-8 py-4 text-lg bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2 z-30 relative"
                  onClick={() => {
                    console.log('Pesan Sekarang clicked!');
                    window.open('https://wa.me/6287884808447?text=Halo, saya ingin booking layanan waxing', '_blank');
                  }}
                >
                  Pesan Sekarang!
                  <ArrowRight size={20} />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-fit px-8 py-4 text-lg border-white text-black hover:bg-white hover:text-pink-600 rounded-full z-30 relative"
                  onClick={() => {
                    console.log('Lihat Layanan clicked!');
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Lihat Layanan
                </Button>
              </div>
                
              {/* Benefits List */}
              <div className="mt-10 flex flex-col gap-3 animate-fade-in-delay-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-pink-300 animate-bounce-slow" />
                  <span className="text-lg">Hygienis dan steril</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-pink-300 animate-bounce-slow" />
                  <span className="text-lg">Teknologi terbaru</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-pink-300 animate-bounce-slow" />
                  <span className="text-lg">Terapis profesional</span>
                </div>
              </div>
              </div>
          </div>
                
          {/* Scroll Down Indicator */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden sm:flex">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
                
          {/* Background Slider Indicators */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 hidden sm:flex">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBackground ? 'bg-pink-500 scale-125' : 'bg-white/50'
                }`}
                onClick={() => setCurrentBackground(index)}
                aria-label={`Go to slide ${index + 1}`}
                />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="relative py-16 bg-pink-50 w-full" sectionId="stats">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 group-hover:bg-pink-500">
                  <Users className="w-8 h-8 text-pink-600 transition-colors duration-300 group-hover:text-white" />
                </div>
                <div className="flex items-baseline justify-center mb-2">
                  <div className="text-4xl md:text-5xl font-bold text-pink-600">
                    <AnimatedCounter target={500} duration={1500} delay={200} />
                  </div>
                  <span className="text-3xl md:text-4xl font-bold text-pink-600 ml-1">+</span>
                </div>
                <div className="text-lg font-semibold text-gray-800">Klien Puas</div>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 group-hover:bg-pink-500">
                  <Award className="w-8 h-8 text-pink-600 transition-colors duration-300 group-hover:text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
                  <AnimatedPercentage target={98} duration={1800} delay={400} />
                </div>
                <div className="text-lg font-semibold text-gray-800">Tingkat Kepuasan</div>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 group-hover:bg-pink-500">
                  <Calendar className="w-8 h-8 text-pink-600 transition-colors duration-300 group-hover:text-white" />
                </div>
                <div className="flex items-baseline justify-center mb-2">
                  <div className="text-4xl md:text-5xl font-bold text-pink-600">
                    <AnimatedCounter target={10} duration={1200} delay={600} />
                  </div>
                  <span className="text-3xl md:text-4xl font-bold text-pink-600 ml-1">+</span>
                </div>
                <div className="text-lg font-semibold text-gray-800">Tahun Pengalaman</div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="py-16 bg-white" sectionId="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Layanan Kami</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Berbagai perawatan waxing profesional untuk kebutuhan Anda dengan hasil terbaik
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <div className="h-48 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <img src="https://thumb.viva.co.id/media/frontend/thumbs3/2025/04/16/67ff65316fe31-5-tips-memutihkan-kulit-tangan-usai-waxing_375_211.jpg" alt="Waxing Tangan" className="w-full h-48" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Waxing Tangan</h3>
                <p className="text-gray-600 mb-6">Perawatan waxing khusus untuk tangan dengan teknik terbaik dan bahan premium.</p>
                <div className="text-pink-500 font-bold text-lg mb-4">Rp 150.000</div>
                <Button 
                  className="w-full bg-pink-500 hover:bg-pink-600 rounded-full transition-all duration-300 group-hover:scale-105"
                  onClick={() => {
                    console.log('Detail Layanan Tangan clicked!');
                    window.open('https://wa.me/6287884808447?text=Halo, saya tertarik dengan layanan Waxing Tangan', '_blank');
                  }}
                >
                  Detail Layanan
                </Button>
              </div>
            </div>
            
            {/* Service Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <div className="h-48 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <img src="data:image/jpeg;base64,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" alt="Waxing Kaki" className="w-full h-48" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Waxing Kaki</h3>
                <p className="text-gray-600 mb-6">Hilangkan bulu di kaki dengan waxing profesional yang aman dan hasil maksimal.</p>
                <div className="text-pink-500 font-bold text-lg mb-4">Rp 250.000</div>
                <Button 
                  className="w-full bg-pink-500 hover:bg-pink-600 rounded-full transition-all duration-300 group-hover:scale-105"
                  onClick={() => {
                    console.log('Detail Layanan Kaki clicked!');
                    window.open('https://wa.me/6287884808447?text=Halo, saya tertarik dengan layanan Waxing Kaki', '_blank');
                  }}
                >
                  Detail Layanan
                </Button>
              </div>
            </div>
            
            {/* Service Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <div className="h-48 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <img src="https://beautymone.com/wp-content/uploads/2023/08/BM-Post-1-27-1024x577.jpg" alt="Waxing Body" className="w-full h-48" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Waxing Body</h3>
                <p className="text-gray-600 mb-6">Perawatan waxing menyeluruh untuk seluruh tubuh dengan hasil halus dan tahan lama.</p>
                <div className="text-pink-500 font-bold text-lg mb-4">Rp 450.000</div>
                <Button 
                  className="w-full bg-pink-500 hover:bg-pink-600 rounded-full transition-all duration-300 group-hover:scale-105"
                  onClick={() => {
                    console.log('Detail Layanan Body clicked!');
                    window.open('https://wa.me/6287884808447?text=Halo, saya tertarik dengan layanan Waxing Body', '_blank');
                  }}
                >
                  Detail Layanan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* About Section - SECTION BARU */}
      <AnimatedSection className="py-16 bg-pink-50" sectionId="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Tentang WaxingWoman</h2>
              <p className="text-lg text-gray-600 mb-6">
                Dengan pengalaman lebih dari 10 tahun, WaxingWoman telah menjadi pilihan utama untuk layanan waxing profesional di Indonesia. Kami berkomitmen memberikan pelayanan terbaik dengan standar kebersihan tinggi.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Teknisi Bersertifikat</h4>
                    <p className="text-gray-600">Semua teknisi kami telah mendapatkan sertifikasi internasional</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Peralatan Modern</h4>
                    <p className="text-gray-600">Menggunakan teknologi terkini untuk hasil optimal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-pink-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Bahan Premium</h4>
                    <p className="text-gray-600">Hanya menggunakan produk wax berkualitas tinggi dan aman</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-pink-300 rounded-3xl flex items-center justify-center">
                <img src="https://remedytupelo.com/storage/2022/11/10-Things-To-Know-Before-Getting-Your-Facial-Waxing-scaled.jpeg" alt="Waxing Woman" className="w-full h-full object-cover rounded-xl"/>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center">
                <Star className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection className="py-16 bg-white" sectionId="why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Mengapa Memilih Kami?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Keunggulan yang membuat layanan kami berbeda dari yang lain
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 group hover:bg-pink-50 rounded-2xl transition-all duration-300">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 text-pink-600 mb-4 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cepat & Efisien</h3>
              <p className="text-gray-600">Proses waxing yang cepat tanpa mengorbankan kualitas hasil</p>
            </div>
            
            <div className="text-center p-6 group hover:bg-pink-50 rounded-2xl transition-all duration-300">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 text-pink-600 mb-4 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hygienis & Aman</h3>
              <p className="text-gray-600">Perlengkapan steril dan teknik yang aman untuk kulit sensitif</p>
            </div>
            
            <div className="text-center p-6 group hover:bg-pink-50 rounded-2xl transition-all duration-300">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 text-pink-600 mb-4 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Berkualitas Tinggi</h3>
              <p className="text-gray-600">Menggunakan produk premium untuk hasil terbaik dan tahan lama</p>
            </div>
            
            <div className="text-center p-6 group hover:bg-pink-50 rounded-2xl transition-all duration-300">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 text-pink-600 mb-4 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pelayanan Ramah</h3>
              <p className="text-gray-600">Staf profesional dan ramah siap membuat Anda nyaman</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Gallery Section - SECTION BARU */}
      <AnimatedSection className="py-16 bg-pink-50" sectionId="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Galeri Kami</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Lihat fasilitas modern dan hasil kerja profesional kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((_, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-pink-100 to-pink-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-pink-400">
                    {index % 3 === 0 ? <Heart className="w-16 h-16" /> : 
                     index % 3 === 1 ? <Star className="w-16 h-16" /> : 
                     <Shield className="w-16 h-16" />}
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      className="bg-white/90 text-pink-600 hover:bg-white rounded-full"
                      onClick={() => console.log(`Gallery item ${index + 1} clicked`)}
                    >
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Promo Section - SECTION BARU */}
      <AnimatedSection className="py-16 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Gift className="w-16 h-16 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Promo Spesial Bulan Ini!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Dapatkan diskon hingga 30% untuk paket treatment lengkap. Kesempatan terbatas!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2">Paket Pemula</h3>
                <p className="text-pink-100 mb-4">1x Waxing Tangan + Konsultasi</p>
                <div className="text-2xl font-bold">
                  <span className="line-through text-pink-200">Rp 200.000</span>
                  <br />
                  <span className="text-yellow-300">Rp 140.000</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 scale-105 border-2 border-yellow-300">
                <div className="bg-yellow-300 text-pink-600 px-3 py-1 rounded-full text-sm font-bold mb-2 inline-block">TERPOPULER</div>
                <h3 className="text-xl font-bold mb-2">Paket Lengkap</h3>
                <p className="text-pink-100 mb-4">Waxing Tangan + Kaki + After Care</p>
                <div className="text-2xl font-bold">
                  <span className="line-through text-pink-200">Rp 450.000</span>
                  <br />
                  <span className="text-yellow-300">Rp 315.000</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2">Paket Premium</h3>
                <p className="text-pink-100 mb-4">Full Body + Perawatan Khusus</p>
                <div className="text-2xl font-bold">
                  <span className="line-through text-pink-200">Rp 600.000</span>
                  <br />
                  <span className="text-yellow-300">Rp 420.000</span>
                </div>
              </div>
            </div>
            <Button 
              className="bg-yellow-400 hover:bg-yellow-500 text-pink-600 px-12 py-4 text-xl font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
              onClick={() => {
                console.log('Claim Promo clicked!');
                window.open('https://wa.me/6287884808447?text=Halo, saya ingin mengklaim promo spesial bulan ini!', '_blank');
              }}
            >
              Klaim Promo Sekarang!
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-16 bg-white" sectionId="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Apa Kata Pelanggan Kami?</h2>
            <p className="mt-4 text-lg text-gray-600">Testimoni dari pelanggan yang telah merasakan layanan kami</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-pink-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={20} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">
                "Pelayanan yang sangat memuaskan! Hasil waxingnya halus dan tidak menyebabkan iritasi. 
                Pasti akan kembali lagi untuk perawatan berikutnya."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mr-4">
                  SD
                </div>
                <div>
                  <h4 className="font-semibold">Sari Dewi</h4>
                  <p className="text-sm text-gray-500">Pelanggan Setia</p>
                </div>
              </div>
            </div>
            
            <div className="bg-pink-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={20} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">
                "Teknisinya sangat profesional dan ramah. Tempatnya juga bersih dan nyaman. 
                Hasil waxingnya rapi dan tahan lama. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mr-4">
                  RM
                </div>
                <div>
                  <h4 className="font-semibold">Rina Melati</h4>
                  <p className="text-sm text-gray-500">Pelanggan Baru</p>
                </div>
              </div>
            </div>
            
            <div className="bg-pink-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={20} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">
                "Harga terjangkau dengan kualitas premium. Sudah 3 kali treatment disini dan selalu puas. 
                Staff nya juga sangat informatif tentang perawatan."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold mr-4">
                  AP
                </div>
                <div>
                  <h4 className="font-semibold">Anita Putri</h4>
                  <p className="text-sm text-gray-500">Regular Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section - SECTION BARU */}
      <AnimatedSection className="py-16 bg-pink-50" sectionId="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Hubungi Kami</h2>
            <p className="mt-4 text-lg text-gray-600">Siap membantu Anda dengan pelayanan terbaik</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-pink-500 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Alamat</h3>
                  <p className="text-gray-600">
                    Jl. Kebon Jeruk Raya No. 123<br />
                    Jakarta Barat 11530<br />
                    Indonesia
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-500 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Telepon</h3>
                  <p className="text-gray-600">+62 812 3456 7890</p>
                  <p className="text-gray-600">+62 21 1234 5678</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-500 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">info@waxingwoman.com</p>
                  <p className="text-gray-600">booking@waxingwoman.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-500 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Jam Operasional</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Senin - Jumat: 09:00 - 21:00</p>
                    <p>Sabtu - Minggu: 08:00 - 22:00</p>
                    <p>Hari Libur Nasional: 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Masukkan email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Tulis pesan Anda disini..."
                  ></textarea>
                </div>
                <Button 
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Form submitted!');
                    alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
                  }}
                >
                  Kirim Pesan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-16 bg-pink-600 text-white" sectionId="cta">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap untuk Pengalaman Waxing Terbaik?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Dapatkan kulit halus dan mulus dengan layanan waxing profesional kami. 
            Book sekarang dan dapatkan penawaran spesial!
          </p>
          <div className="flex flex-col sm:flexRow gap-4 justify-center">
            <Button 
              className="px-8 py-4 text-lg bg-white text-pink-600 hover:bg-gray-100 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 z-10 relative"
              onClick={() => {
                console.log('Hubungi Kami Sekarang clicked!');
                window.open('https://wa.me/6287884808447?text=Halo, saya ingin booking layanan waxing sekarang!', '_blank');
              }}
            >
              <MessageCircle className="w-5 h-5 mr-2 inline" />
              Hubungi Kami Sekarang
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-4 text-lg border-white text-black rounded-full z-10 relative"
              onClick={() => {
                console.log('Lihat Gallery clicked!');
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Lihat Gallery
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">WaxingWoman</h3>
              <p className="text-gray-400 mb-4">
                Waxing Woman menyediakan layanan waxing profesional dengan standar tinggi 
                untuk hasil terbaik dan kepuasan pelanggan.
              </p>
              <div className="flex space-x-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
                  onClick={() => window.open('https://facebook.com', '_blank')}
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button 
                  className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full"
                  onClick={() => window.open('https://instagram.com', '_blank')}
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button 
                  className="bg-blue-400 hover:bg-blue-500 p-2 rounded-full"
                  onClick={() => window.open('https://twitter.com', '_blank')}
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 p-2 rounded-full"
                  onClick={() => window.open('https://wa.me/6287884808447', '_blank')}
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Waxing Tangan</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Waxing Kaki</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Waxing Wajah</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Waxing Body</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Paket Treatment</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Beranda</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Layanan</a></li>
                <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Galeri</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Kontak</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Jl. Kebon Jeruk Raya No. 123, Jakarta</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+62 812 3456 7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@waxingwoman.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>09:00 - 21:00 (Sen-Jum)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 WaxingWoman. Semua hak dilindungi. | Dibuat dengan ❤️ untuk pelanggan terbaik</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button - BARU */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl animate-bounce"
          onClick={() => {
            console.log('Floating WhatsApp clicked!');
            window.open('https://wa.me/6287884808447?text=Halo, saya ingin konsultasi tentang layanan waxing', '_blank');
          }}
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}

export default App;