import React from 'react';

import HeroSection from '@components/landing/HeroSection';
import AITutorSection from '@components/landing/AITutorSection';
import LevelsSection from '@components/landing/LevelsSection';
import ChallengeSection from '@components/landing/ChallengeSection';
import LeaderboardSection from '@components/landing/LeaderboardSection';
import CTASection from '@components/landing/CTASection';
import Footer from '@components/landing/Footer';

const Landing: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden">
      <HeroSection />
      <AITutorSection />
      <LevelsSection />
      <ChallengeSection />
      <LeaderboardSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Landing;
