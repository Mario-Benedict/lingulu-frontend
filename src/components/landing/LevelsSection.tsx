import React from 'react';
import beginner from '@assets/lessons/beginner.svg';
import intermediate from '@assets/lessons/intermediate.svg';
import advanced from '@assets/lessons/advance.svg';

interface LevelCardProps {
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}

const LevelCard: React.FC<LevelCardProps> = ({ title, subtitle, image, bgColor }) => (
  <div className={`${bgColor} rounded-2xl p-6 text-white flex flex-col items-center transition-transform hover:scale-105 border-4 border-white`}>
    <img src={image} alt={title} className="w-32 h-32 object-contain mb-4" />
    <h4 className="font-bold text-lg font-rubik">{title}</h4>
    <p className="text-sm opacity-90 font-poppins">{subtitle}</p>
  </div>
);

const LevelsSection: React.FC = () => {
  const levels = [
    { title: 'Level 1:', subtitle: 'Beginner', image: beginner, bgColor: 'bg-gradient-to-br from-orange-400 to-orange-700' },
    { title: 'Level 2:', subtitle: 'Intermediate', image: intermediate, bgColor: 'bg-gradient-to-br from-blue-400 to-blue-700' },
    { title: 'Level 3:', subtitle: 'Advanced', image: advanced, bgColor: 'bg-gradient-to-br from-purple-400 to-purple-700' },
  ];

  return (
    <section className="auth-gradient py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white font-rubik mb-2">
          Temukan Level yang
        </h2>
        <h2 className="text-3xl lg:text-4xl font-bold text-white font-rubik mb-10">
          Paling Pas Buat Kamu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {levels.map((level, index) => (
            <LevelCard key={index} {...level} />
          ))}
        </div>

        <p className="text-white text-lg font-semibold mt-8 font-poppins">
          Pilih levelmu dan jadilah makin jago setiap harinya!
        </p>
      </div>
    </section>
  );
};

export default LevelsSection;
