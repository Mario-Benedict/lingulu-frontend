import React from 'react';
import { useNavigate } from 'react-router-dom';
import mascot from '@assets/landing/mascot-herosection.svg';
import logo from '@assets/auth/lingulu-logo.svg';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white pt-24 pb-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Mascot - positioned to the left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:-translate-x-1/4 z-10">
          <img 
            src={mascot} 
            alt="Lingulu Mascot" 
            className="w-80 lg:w-96 animate-bounce-slow"
          />
        </div>

        {/* Content - centered */}
        <div className="text-center relative z-20 pl-16 lg:pl-24">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src={logo} alt="Lingulu" className="h-24" />
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-primary font-rubik leading-tight mb-1 italic">
            Kuasai Bahasa Baru
          </h1>

          {/* ABC Blocks with subtitle */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="text-2xl lg:text-3xl text-primary font-poppins">
              dengan Cara yang seru<br />bersama <span className="font-bold">Lingulu !</span>
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm lg:text-base mb-8 font-poppins max-w-lg mx-auto">
            Belajar bahasa bukan lagi beban. Dengan tutor AI<br />
            dan metode bermain, kamu bisa lancar mulai dari nol.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/register')}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-4 rounded-lg text-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 font-poppins italic"
          >
            Mulai Belajar Gratis
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
