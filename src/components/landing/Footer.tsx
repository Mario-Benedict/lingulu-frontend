import React from 'react';
import logo from '@assets/auth/lingulu-logo.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-lessongray-800 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Lingulu" className="h-8 brightness-0 invert" />
        </div>
        <p className="text-gray-400 text-sm font-poppins">
          © 2026 Lingulu. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
