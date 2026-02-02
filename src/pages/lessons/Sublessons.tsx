import { createElement } from 'react';
import { ArrowLeft, BookOpenText, NotebookPen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@components/common/Sidebar';

const Sublessons: React.FC = () => {
  const navigate = useNavigate();
  // Removed unused activeMenu state for consistency

  const sublessons = [
    {
      id: 1,
      title: 'Judul materi',
      icon: BookOpenText,
      type: 'material',
    },
    {
      id: 2,
      title: 'Judul Soal',
      icon: NotebookPen,
      type: 'exercise',
    },
  ];

  return (
    <div className="flex h-screen bg-lessongray-100 w-screen">
      <Sidebar activeMenu="lessons" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 font-poppins">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 py-2">
          <div className="flex items-center px-8 py-4 gap-6">
            <button onClick={() => navigate('/lessons/map')} className='group transition p-4 hover:bg-lessongray-50 hover:shadow-primary shadow-lg rounded-lg bg-primary'><ArrowLeft className="text-white font-semibold group-hover:text-lessongray-800" size={28} /></button>
            <div>
              <p className="text-lg text-lessongray-600">Level 1: Beginner</p>
              <h2 className="text-5xl font-bold text-primary font-rubik">Lessons 2</h2>
            </div>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="space-y-4">
              {sublessons.map((sublesson) => (
                <div
                  key={sublesson.id}
                  className="bg-white rounded-lg p-6 shadow-md flex items-center justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3">
                      {createElement(sublesson.icon, {
                        size: 48,
                        className: "text-primary",
                      })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-lessongray-800">
                        {sublesson.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (sublesson.type === 'material') {
                        navigate(`/lessons/materials/${sublesson.id}`);
                      } else if (sublesson.type === 'exercise') {
                        navigate(`/lessons/exercises/${sublesson.id}`);
                      }
                    }}
                    className="bg-primary text-white px-10 py-2 rounded-lg font-semibold hover:bg-primary-dark transition"
                  >
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sublessons;
