import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-gradient py-16 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-white font-rubik mb-4">
          Siap Memulai Perjalanan Bahasamu ?
        </h2>
        <p className="text-white/90 mb-8 font-poppins">
          Bergabung bersama pengguna lain yang belajar dengan cara satu seru dan konsisten.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="bg-white text-primary font-bold px-8 py-4 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 font-poppins"
        >
          Mulai Belajar Gratis
        </button>
        <p className="text-white/70 text-sm mt-4 font-poppins">
          Klik "<span className="font-semibold">Mulai Belajar Gratis</span>" di atas untuk memulai
        </p>
      </div>
    </section>
  );
};

export default CTASection;
