import React from 'react';
import mascot from '@assets/dashboard/start-convo.svg';
import { Mic, Volume2 } from 'lucide-react';

const AITutorSection: React.FC = () => {
  return (
    <section className="bg-lessongray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left - Content */}
        <div className="flex-1 flex justify-center">
          <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary font-rubik mb-4">
            Punya Tutor Pribadi<br />di sakumu
          </h2>
          <p className="text-lessongray-600 mb-6 font-poppins">
            Berlatih Bicara kapan saja tanpa rasa malu.<br />
            Tutor AI Lingulu siap menemani kamu bercakap<br />
            setiap layaknya teman.
          </p>
          <ul className="space-y-3 font-poppins text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-lesson-green text-xl">✓</span>
              Latihan percakapan di semua level
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lesson-green text-xl">✓</span>
              Bisa <span className="font-semibold">mengulang</span> pelajaran kapan saja
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lesson-green text-xl">✓</span>
              Aman sekali, tanpa takut dinilai
            </li>
          </ul>
          </div>
        </div>

        {/* Right - Chat Preview */}
        <div className="flex-1 flex justify-center">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4 border-b border-primary pb-4">
              <h3 className="text-lg font-bold text-gray-800 font-rubik">AI Conversation</h3>
              <span className="text-primary text-xl">ⓘ</span>
            </div>
            <p className="text-xs text-gray-400 mb-4 font-poppins">Practice speaking</p>
            
            {/* Chat Messages */}
            <div className="space-y-3 mb-6">
              <div className="flex gap-3">
                <img src={mascot} alt="AI" className="w-8 h-8 rounded-full" />
                <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm font-poppins">
                  <p>Hello Nicko, I'm your tutor!</p>
                  <p>how are you ready to speak english?</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-white rounded-lg px-3 py-2 text-sm font-poppins">
                  Hello, I am fine and you
                </div>
              </div>
            </div>

            {/* Mic Button */}
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-poppins mb-4">
              <Mic size={20} />
              TAP TO SPEAK
            </button>
            <p className="text-center text-xs text-gray-400 mt-2 font-poppins"><Volume2 size={16} className="inline mr-2" />Listen Again</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITutorSection;
