
interface LeaderboardRowProps {
  rank: number;
  name: string;
  xp: number;
  avatarUrl?: string;
  isCurrentUser?: boolean;
  userId?: string;
}

const RankBadge: React.FC<{ rank: number }> = ({ rank }) => {
  const badgeStyle =
    rank === 1
      ? 'bg-[linear-gradient(180deg,#ffe082_0%,#f9bf3b_100%)] border-[#e6a800] text-white'
      : rank === 2
      ? 'bg-[linear-gradient(180deg,#e8eaed_0%,#b8bcc4_100%)] border-[#9ca3af] text-white'
      : rank === 3
      ? 'bg-[linear-gradient(180deg,#f5a855_0%,#d56214_100%)] border-[#c2410c] text-white'
      : 'bg-[linear-gradient(180deg,#f9fafb_0%,#e5e7eb_100%)] border-gray-300 text-gray-600';

  return (
    <div
      className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${badgeStyle} border-2 flex items-center justify-center font-rubik font-extrabold text-xl sm:text-3xl`}
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
      <span style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25), 0 1px 1px rgba(0,0,0,0.15)' }}>{rank}</span>
    </div>
  );
};

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ rank, name, xp, avatarUrl, isCurrentUser, userId }) => {
  const innerGradient =
    rank === 1
      ? 'bg-[linear-gradient(90deg,#fee59c_0%,#e6ba1f_48%,#fff1c6_100%)] border-amber-400'
      : rank === 2
      ? 'bg-[linear-gradient(90deg,#e9eaed_0%,#b9bdc4_48%,#f7f7f7_100%)] border-gray-400'
      : rank === 3
      ? 'bg-[linear-gradient(90deg,#f5b27f_0%,#c75400_48%,#ffd8b9_100%)] border-orange-600'
      : 'bg-[linear-gradient(90deg,#ffffff_0%,#f5f5f5_48%,#ffffff_100%)] border-gray-300';

  const outerBorder =
    rank === 1
      ? 'border-amber-300'
      : rank === 2
      ? 'border-gray-300'
      : rank === 3
      ? 'border-orange-400'
      : 'border-gray-200';

  return (
    <div className={`rounded-[18px] border ${outerBorder} bg-white shadow-sm p-[6px] ${isCurrentUser ? 'ring-2 ring-orange-400 border-orange-400 bg-orange-50 shadow-[0_0_8px_rgba(251,146,60,0.15)] scale-[1.01] transition-transform' : ''}`}> 
      <div className={`relative flex items-center gap-3 sm:gap-6 rounded-[14px] border ${innerGradient} ring-1 ring-inset ring-white/70 px-3 sm:px-5 py-2.5 sm:py-4`}>
        <div className="absolute inset-0 rounded-[14px] pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.06)]" />
        <RankBadge rank={rank} />
        <div className="relative z-10 flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.15)] bg-white border-2 ${isCurrentUser ? 'border-orange-500 ring-2 ring-orange-300' : 'border-gray-800'}`}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white grid place-items-center text-3xl sm:text-4xl shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.12)]">🐯</div>
          )}
          <span 
            className={`text-2xl sm:text-4xl font-rubik font-medium truncate ${isCurrentUser ? 'text-orange-600' : 'text-[#111827]'}`}
            style={isCurrentUser ? { textShadow: '0 0 8px rgba(251,146,60,0.4)' } : undefined}
          >
            <span className="flex items-center gap-2">
              {name}
              {isCurrentUser && <span className="text-sm font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">Akun Kamu</span>}
            </span>
          </span>
        </div>
        <div className="relative z-10 flex items-center gap-1 sm:gap-2">
          <span className="text-2xl sm:text-4xl font-semibold text-[#111827] tracking-tight">{xp.toLocaleString()}</span>
          <span className="text-sm sm:text-lg font-medium text-[#111827]/80">XP</span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardRow;
