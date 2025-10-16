'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Camera, Bell, Lock, Network, Sun, Phone, Mail, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

export default function ServicesPage() {
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
      detailedDescription: 'Our comprehensive CCTV systems provide round-the-clock monitoring and recording capabilities for your property. We offer high-definition cameras with night vision, motion detection, and remote viewing capabilities. Our systems include both wired and wireless options, cloud storage solutions, and mobile app integration for real-time monitoring from anywhere.',
      features: [
        'High-definition recording',
        'Night vision capabilities',
        'Motion detection alerts',
        'Remote viewing via mobile app',
        'Cloud storage options',
        'Professional installation'
      ]
    },
    {
      icon: Bell,
      title: 'Alarms & Fire System',
      description: 'Reliable fire detection and alarm systems',
      imageUrl: '/images/services/alarms.jpg',
      detailedDescription: 'Protect your property with our state-of-the-art alarm and fire detection systems. Our solutions include intrusion detection, fire alarms, smoke detectors, and emergency response integration. All systems are professionally monitored and can be integrated with local emergency services for immediate response.',
      features: [
        'Intrusion detection sensors',
        'Fire and smoke detectors',
        'Emergency response integration',
        '24/7 professional monitoring',
        'Mobile app control',
        'Battery backup systems'
      ]
    },
    {
      icon: Lock,
      title: 'Electrical Installations',
      description: 'Secure access management',
      imageUrl: '/images/services/Electrical.jpg',
      detailedDescription: 'Control who enters your premises with our advanced access control systems. From simple keycard systems to biometric scanners, we provide solutions that meet your security requirements. Our systems include visitor management, time-based access, and comprehensive audit trails.',
      features: [
        'Keycard and biometric access',
        'Visitor management system',
        'Time-based access control',
        'Comprehensive audit trails',
        'Mobile app management',
        'Integration with other security systems'
      ]
    },
    {
      icon: Network,
      title: 'Sructured Cablinga',
      description: 'Robust network infrastructure',
      imageUrl: '/images/services/networking.jpg',
      detailedDescription: 'Build a reliable and secure network infrastructure for your business. We design and implement wired and wireless networks that support your security systems and business operations. Our solutions include network security, VPN setup, and ongoing maintenance and support.',
      features: [
        'Wired and wireless networks',
        'Network security implementation',
        'VPN setup and configuration',
        'Network monitoring and maintenance',
        'Scalable infrastructure design',
        '24/7 technical support'
      ]
    },
    {
      icon: Sun,
      title: 'Full Photovoltaic System Service',
      description: 'Comprehensive solar panel maintenance',
      imageUrl: '/images/services/solar.jpg',
      detailedDescription: 'Maximize your solar investment with our comprehensive photovoltaic system services. We provide installation, maintenance, monitoring, and optimization services for residential and commercial solar installations. Our team ensures your system operates at peak efficiency year-round.',
      features: [
        'Solar panel installation',
        'System maintenance and cleaning',
        'Performance monitoring',
        'Efficiency optimization',
        'Warranty support',
        'Energy production analysis'
      ]
    },
  ];

  return (
    <div className="min-h-screen">
       <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-6 md:space-x-10">
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
            </Link>

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

      <main className="pt-24">
        {/* Services Header */}
        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-left mb-4">
              <h2 className="text-lg font-normal text-[#090909] uppercase tracking-wide mb-2">
                Our Services
              </h2>
              <div className="w-full h-px bg-[#090909]"></div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden shadow-2xl">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        width={600}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#090909]">
                      {service.title}
                    </h2>
                    
                    <p className="text-lg text-[#090909]/80 leading-relaxed">
                      {service.detailedDescription}
                    </p>

                    <div>
                      <h3 className="text-xl font-semibold text-[#090909] mb-4">Key Features:</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-[#dc2625] rounded-full"></div>
                            <span className="text-[#090909]/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16 md:py-29 bg-[#cd3535]">
          <div className="container mx-auto px-4">
            <div className="text-left mb-8">
              <h2 className="text-lg font-normal text-white uppercase tracking-wide mb-2">
                Our Gallery
              </h2>
              <div className="w-full h-px bg-white"></div>
            </div>

            <div className="relative">
              {/* Navigation Arrows */}
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

        {/* About Us Section */}
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

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-[#101827]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-[#f9f9fb] mb-4">
                  Ready to Secure Your Property?
                </h2>
                <p className="text-lg text-[#f9f9fb]/80">
                  Contact us today for a free consultation and quote
                </p>
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
              © 2023 AGM Black Lion Security Systems LTD. All rights reserved.
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
