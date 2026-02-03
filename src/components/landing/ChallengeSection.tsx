import React from 'react';
import { Lock, CheckCircle } from 'lucide-react';
// Pastikan path import ini benar sesuai struktur project Anda
import learningMapBg from '@assets/lessons/learning-map.svg';

type LessonStatus = 'completed' | 'in-progress' | 'locked';

interface LandingLesson {
  id: number;
  status: LessonStatus;
}

// Asumsi: class warna custom (bg-lesson-green, dll) sudah didefinisikan di konfigurasi Tailwind Anda.
const getStatusColor = (status: LessonStatus) => {
  switch (status) {
    case 'completed':
      return 'bg-lesson-green border-8 border-lessongray-100 border-b-12';
    case 'in-progress':
      return 'bg-orange-500 border-8 border-lessongray-100 border-b-12';
    case 'locked':
      return 'bg-lesson-gray border-8 border-lessongray-100 border-b-12';
    default:
      return 'bg-blue-500';
  }
};

const renderIcon = (status: LessonStatus, lessonId: number) => {
  switch (status) {
    case 'completed':
      return <CheckCircle size={32} className="text-white" />;
    case 'in-progress':
      return <span className="text-white font-bold text-2xl">{lessonId}</span>;
    case 'locked':
      return <Lock size={32} className="text-white" />;
    default:
      return null;
  }
};

const ChallengeSection: React.FC = () => {
  const lessons: LandingLesson[] = [
    { id: 1, status: 'completed' },
    { id: 2, status: 'in-progress' },
    { id: 3, status: 'locked' },
  ];

  return (
    <section className="bg-white w-full overflow-hidden">
      {/* Hapus max-w-7xl, mx-auto, dan gap-8 agar full width tanpa celah */}
      <div className="w-full flex flex-col lg:flex-row items-stretch">

        {/* Left - Learning Map with Buttons */}
        {/* Ubah menjadi setengah lebar pada LG, dan atur tinggi relatif */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
            {/* Background Image - gunakan w-full h-full object-cover */}
            <img
              src={learningMapBg}
              alt="Learning Map"
              className="absolute inset-0 w-full h-full object-cover object-left"
            />

            {/* Lesson Buttons Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 pt-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl z-10 ${getStatusColor(lesson.status)} ${
                    lesson.status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {renderIcon(lesson.status, lesson.id)}
                </div>
              ))}
            </div>
        </div>

        {/* Right - Content */}
        {/* Gunakan justify-center untuk vertikal tengah, dan tambahkan padding besar */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 xl:p-24 bg-white">
          {/* Wrapper tambahan untuk membatasi lebar teks agar tidak terlalu panjang di layar besar */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 font-rubik mb-6 leading-tight">
              Jelajahi Pulau<br />
              <span className="text-primary">Bahasa</span> & Taklukkan<br />
              Tantangannya!
            </h2>
            <p className="text-gray-600 font-poppins text-lg leading-relaxed">
              Setiap pulau punya tantangan unik yang menantimu. Naiki setiap anak tangga, kumpulkan XP sebanyak-banyaknya, dan buktikan bahwa kamu adalah penjelajah bahasa yang tak terkalahkan di <span className="text-primary font-semibold">Lingulu!</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ChallengeSection;