"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Camera, Bell, Lock, Network, Sun, Phone, Mail, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide header on mobile (screen width < 768px)
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past 100px on mobile
          setIsHeaderVisible(false);
          setIsMenuOpen(false); // Close mobile menu when hiding header
        } else {
          // Scrolling up on mobile
          setIsHeaderVisible(true);
        }
      } else {
        // Always show header on desktop
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Track gallery scroll position for dots
  useEffect(() => {
    const handleGalleryScroll = () => {
      if (galleryRef.current) {
        const scrollAmount = 400; // Width of one image (384px) + gap (16px)
        const currentScroll = galleryRef.current.scrollLeft;
        const newIndex = Math.round(currentScroll / scrollAmount);
        setCurrentGalleryIndex(newIndex);
      }
    };

    const galleryElement = galleryRef.current;
    if (galleryElement) {
      galleryElement.addEventListener('scroll', handleGalleryScroll, { passive: true });
      return () => galleryElement.removeEventListener('scroll', handleGalleryScroll);
    }
  }, []);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = 400; // Width of one image (384px) + gap (16px)
      const currentScroll = galleryRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? Math.max(0, currentScroll - scrollAmount)
        : currentScroll + scrollAmount;
      
      galleryRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const scrollToGalleryIndex = (index: number) => {
    if (galleryRef.current) {
      const scrollAmount = 400; // Width of one image (384px) + gap (16px)
      const targetScroll = index * scrollAmount;
      
      galleryRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };


  const services = [
    {
      icon: Camera,
      title: 'CCTV System',
      description: 'Advanced surveillance solutions',
      imageUrl: '/images/services/cctv.jpg',
    },
    {
      icon: Bell,
      title: 'Alarms & Fire System',
      description: 'Reliable fire detection and alarm systems',
      imageUrl: '/images/services/alarms.jpg',
    },
    {
      icon: Lock,
      title: 'Electrical Installations',
      description: 'Secure access management',
      imageUrl: '/images/services/Electrical.jpg',
    },
    {
      icon: Network,
      title: 'Sructured Cabling',
      description: 'Robust network infrastructure',
      imageUrl: '/images/services/networking.jpg',
    },
    {
      icon: Sun,
      title: 'Solar Panel Solutions',
      description: 'Comprehensive solar panel maintenance',
      imageUrl: '/images/services/solar.jpg',
    },
    {
      icon: Lock,
      title: 'Access Control System',
      description: 'Secure access management',
      imageUrl: '/images/services/access-control.jpg',
    },
  ];

  return (
    <div className="min-h-screen">
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 md:space-x-10">
                <div className="relative w-10 h-10 overflow-visible">
                  <Image
                    src="/images/logo.png"
                    alt="AGM Black Lion logo"
                    fill
                    sizes="40px"
                    className="object-contain"
                    style={{ transform: 'translateY(4%) scale(2)', transformOrigin: 'center center' }}
                  />
                </div>
                <div className="flex flex-col -translate-y-1">
                  <span className="text-xl font-bold text-[#090909]">AGM Black Lion</span>
                  <span className="text-sm text-[#090909]/70">Security Systems LTD</span>
                </div>
              </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-[#090909] hover:text-[#dc2625] transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-[#090909] hover:text-[#dc2625] transition-colors font-medium"
              >
                Services
              </Link>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-[#090909] hover:text-[#dc2625] transition-colors font-medium"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-[#090909] hover:text-[#dc2625] transition-colors font-medium"
              >
                About Us
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-[#dc2625] hover:bg-[#b91c1c] text-white"
              >
                Call Us
              </Button>
            </div>

            <button
              className="md:hidden text-[#090909]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <Link
                href="/"
                className="block w-full text-left text-[#090909] hover:text-[#dc2625] transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="block w-full text-left text-[#090909] hover:text-[#dc2625] transition-colors font-medium"
              >
                Services
              </Link>
              <button
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-left text-[#090909] hover:text-[#dc2625] transition-colors font-medium"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-[#090909] hover:text-[#dc2625] transition-colors font-medium"
              >
                About Us
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-[#dc2625] hover:bg-[#b91c1c] text-white"
              >
                Call Us
              </Button>
            </div>
          )}
        </nav>
      </header>

      <main>
        <section id="home" className="relative">
          {/* Hero Photo */}
          <div className="relative w-full overflow-hidden" style={{ height: '540px' }}>
            <img
              src="/images/hero.jpg"
              alt="Security Systems"
              className="w-full h-full object-cover"
            />
            
            {/* Horizontal transparent/dark label with white text for readability */}
              <div className="absolute left-15 top-1/2 -translate-y-1/2 max-w-xl">
                <div className="bg-white/40 p-4 rounded text-black font-bold text-2xl md:text-4xl text-left drop-shadow-lg leading-tight">
                  Your Peace of Mind<br />Is Our Business.
                </div>
              </div>
          </div>
        </section>

        <section id="services" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#dc2625]"></div>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#090909] mb-6">
                What we offer.
              </h2>
              <p className="text-base md:text-lg text-[#090909]/70 max-w-6xl mx-auto leading-relaxed">
                Our organisation offers supply and installation of CCTV, alarms, Electrical Installations and alarm system monitoring services. We deliver professional advice on property and personal protection solutions that provide peace of mind for our customers. Our response times from initial contact through to design and completion are second to none. All services, home and business products are guaranteed, backed by full product support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="card-shadow p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-white border border-gray-100 hover:border-[#dc2625]"
                  style={{
                    '--bg-image': `url(${service.imageUrl})`,
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${service.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  } as React.CSSProperties & { '--bg-image': string }}
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm leading-relaxed text-white">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/30">
                    <Link 
                      href="/services" 
                      className="text-sm font-semibold text-white hover:text-gray-200 transition duration-150 border-b border-white/0 hover:border-white"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="py-16 md:py-29 bg-[#cd3535]">
          <div className="container mx-auto px-4">
            <div className="text-left mb-8">
              <h2 className="text-lg font-normal text-white uppercase tracking-wide mb-2">
                Our Gallery
              </h2>
              <div className="w-full h-px bg-white"></div>
            </div>

            <div className="relative">
              {/* Navigation Arrows - Desktop Only */}
              <button
                onClick={() => scrollGallery('left')}
                className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={() => scrollGallery('right')}
                className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Gallery Container */}
              <div 
                ref={galleryRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide gallery-scroll"
              >
                {[
                  '/images/services/cctv.jpg',
                  '/images/services/alarms.jpg',
                  '/images/services/access-control.jpg',
                  '/images/services/networking.jpg',
                  '/images/services/solar.jpg',
                  '/images/services/cctv.jpg',
                  '/images/services/alarms.jpg',
                  '/images/services/networking.jpg'
                ].map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-96 h-72 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group gallery-item"
                  >
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Dots Indicator */}
              <div className="md:hidden flex justify-center mt-6 space-x-2">
                {[
                  '/images/services/cctv.jpg',
                  '/images/services/alarms.jpg',
                  '/images/services/access-control.jpg',
                  '/images/services/networking.jpg',
                  '/images/services/solar.jpg',
                  '/images/services/cctv.jpg',
                  '/images/services/alarms.jpg',
                  '/images/services/networking.jpg'
                ].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToGalleryIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentGalleryIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to gallery image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-29 bg-[#dc2625]">
          <div className="container mx-auto px-4">
            <div className="text-left mb-8">
              <h2 className="text-lg font-normal text-white uppercase tracking-wide mb-2">
                About Us
              </h2>
              <div className="w-full h-px bg-white"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <p className="text-lg md:text-xl text-[#f9f9fb] leading-relaxed">
                  AGM Black Lion Security Systems LTD is a team of experienced professionals specializing in comprehensive security and infrastructure solutions. We provide advanced CCTV systems, alarms,Electrical Installations, access control, as well as modern network and solar energy solutions, guaranteeing reliability and quality for every client in Cyprus.
                </p>
              </div>
              
              <div>
                <img
                  src="/images/castle.jpg"
                  alt="Historic castle fortress"
                  className="w-full h-80 object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 md:py-24 bg-[#101827]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-left mb-8">
                <h2 className="text-lg font-normal text-white uppercase tracking-wide mb-2">
                  Contact Us Today
                </h2>
                <div className="w-full h-px bg-white"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center space-x-4 bg-white/5 p-6 rounded-lg">
                  <Phone className="h-8 w-8 text-[#dc2625]" />
                  <div>
                    <p className="text-sm text-[#f9f9fb]/70 mb-1">Call Us</p>
                    <p className="text-lg font-semibold text-[#f9f9fb]">+357 XXX XXXXX</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white/5 p-6 rounded-lg">
                  <Mail className="h-8 w-8 text-[#dc2625]" />
                  <div>
                    <p className="text-sm text-[#f9f9fb]/70 mb-1">Email Us</p>
                    <p className="text-lg font-semibold text-[#f9f9fb]">info@asmblacklion.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#101827] border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-[#f9f9fb]/70">
              © 2025 AGM Black Lion Security Systems LTD. All rights reserved.
            </p>
            <button className="text-[#f9f9fb]/70 hover:text-[#f9f9fb] transition-colors mt-2">
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
