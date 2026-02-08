import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react'
import bannerBg from '@assets/leaderboard/banner-leaderboard.svg'
import lbEmptyImg from '@assets/leaderboard/LB-empty.svg'
import PageLayout from '@components/common/PageLayout';
import LeaderboardRow from '@components/leaderboard/LeaderboardRow';
import type { LeaderboardEntry, LeaderboardApiUser } from '@/types';




const Leaderboard: React.FC = () => {
	const { t } = useTranslation();
	const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
	const [currentUser, setCurrentUser] = useState<LeaderboardEntry | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const controller = new AbortController();
		const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

		const fetchLeaderboard = async () => {
			try {
				setLoading(true);
				setError(null);
				const token = localStorage.getItem('token');
				const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};
				const res = await fetch(`${API_BASE}/api/leaderboard`, {
					signal: controller.signal,
					headers
				});
				const contentType = res.headers.get('content-type');
				if (!res.ok) {
					if (res.status === 401) {
						throw new Error('Sesi login habis/invalid. Silakan login ulang.');
					}
					throw new Error('Gagal fetch leaderboard');
				}
				if (!contentType || !contentType.includes('application/json')) {
					const text = await res.text();
					throw new Error('Response bukan JSON. Cek backend!\n' + text.slice(0, 200));
				}
				const payload = await res.json();
				if (!payload?.success) {
					throw new Error(payload?.message ?? 'Failed to fetch leaderboard');
				}
				const data = payload.data;
				const leaderboardData: LeaderboardApiUser[] = Array.isArray(data) ? data : [];
				const loggedInUserId = localStorage.getItem('userId');
				const normalized: LeaderboardEntry[] = leaderboardData.map((item: LeaderboardApiUser, idx: number) => ({
					name: item.user?.username || item.user?.userId || "",
					xp: Number(item.totalPoints ?? 0),
					avatarUrl: item.profileUrl || item.porfileUrl || undefined,
					userId: item.user?.userId ?? undefined,
					rank: idx + 1,
				}));
				setEntries(normalized);
				if (loggedInUserId) {
					const idx = normalized.findIndex(e => e.userId === loggedInUserId);
					if (idx !== -1) {
						const entry = normalized[idx];
						setCurrentUser({
							name: entry.name,
							xp: entry.xp,
							avatarUrl: entry.avatarUrl,
							userId: entry.userId,
							rank: entry.rank ?? (idx + 1),
						});
					} else {
						setCurrentUser(null);
					}
				} else {
					setCurrentUser(null);
				}
			} catch (err: any) {
				if (err?.name === 'AbortError') {
					return;
				}
				setError(err?.message ?? 'Network error');
			} finally {
				setLoading(false);
			}
		};

		fetchLeaderboard();
		return () => controller.abort();
	}, []);

	return (
		<PageLayout activeMenu="leaderboard" showHeader={false}>
			{/* Banner */}
			<header className="relative h-32 sm:h-40 overflow-hidden">
				<img src={bannerBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
				<div className="relative h-full flex items-center px-4 sm:px-6">
					<div>
						<h1 className="text-2xl sm:text-3xl md:text-5xl font-rubik font-medium text-orange-500">{t('leaderboard.title')}</h1>
						<p className="text-xs sm:text-sm md:text-base text-gray-800 mt-1">{t('leaderboard.yourPosition')}</p>
					</div>
				</div>
			</header>

			<section className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-2 sm:space-y-3">
				{loading && (
					<div className="text-gray-600 text-sm sm:text-base">Loading leaderboard...</div>
				)}

				{error && (
					<div className="text-sm text-red-600">{error}</div>
				)}

				{!loading && !error && entries.length === 0 && (
					<div className="flex flex-col items-center justify-center py-8 sm:py-12">
						<img src={lbEmptyImg} alt="No data" className="w-28 h-28 sm:w-40 sm:h-40 mb-4 opacity-70" />
						<div className="text-base sm:text-lg font-semibold text-gray-600 mb-2 text-center">{t('leaderboard.noData')}</div>
						<div className="text-xs sm:text-sm text-gray-400 mb-4 text-center px-4">{t('leaderboard.completeLesson')}</div>
						<button
							className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition text-sm sm:text-base"
							onClick={() => window.location.reload()}
						>
							Refresh
						</button>
					</div>
				)}

				{entries.slice(0, 10).map((entry, idx) => (
					<LeaderboardRow
						key={`${entry.name}-${idx}`}
						rank={idx + 1}
						name={entry.name}
						xp={entry.xp}
						avatarUrl={entry.avatarUrl}
						isCurrentUser={!!(currentUser?.userId && entry.userId && currentUser.userId === entry.userId)}
					/>
				))}
			</section>

			{/* Spacer for sticky bar */}
			{currentUser && currentUser.rank > 10 && <div className="h-20 sm:h-24" />}

			{/* Sticky "Your Rank" bar at bottom - shows when current user is not in top 10 */}
			{currentUser && currentUser.rank > 10 && (
				<div className="fixed bottom-0 left-0 md:left-64 right-0 z-30 bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-t border-orange-400 animate-fade-in">
					<div className="flex items-center gap-3 sm:gap-6 px-3 sm:px-6 md:px-10 py-3 sm:py-[15px] md:py-[23px] min-h-[65px] sm:min-h-[73px] md:min-h-[93px]">
						{/* Rank badge */}
						<div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center font-rubik font-extrabold text-lg sm:text-xl md:text-3xl text-white shadow-md" style={{textShadow:'0 2px 8px rgba(0,0,0,0.25)'}}>
							{currentUser.rank}
						</div>

						{/* Avatar */}
						{currentUser.avatarUrl ? (
							<img
								src={currentUser.avatarUrl}
								alt={currentUser.name}
								className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover shrink-0 border-2 border-white shadow-md"
								referrerPolicy="no-referrer"
							/>
						) : (
							<div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white border-2 border-white shadow-md grid place-items-center text-2xl sm:text-3xl md:text-5xl shrink-0">🐯</div>
						)}

						{/* Name */}
						<div className="flex-1 min-w-0">
							<div className="text-base sm:text-xl md:text-3xl font-rubik font-semibold text-white truncate">
								{currentUser.name}
							</div>
							<div className="text-xs sm:text-base md:text-lg text-white/70 hidden xs:block">{t('leaderboard.yourRank')}</div>
						</div>

						{/* XP */}
						<div className="flex items-baseline gap-1 sm:gap-2">
							<span className="text-lg sm:text-2xl md:text-4xl font-bold text-white">{currentUser.xp.toLocaleString()}</span>
							<span className="text-xs sm:text-base md:text-lg text-white/80">XP</span>
						</div>
					</div>
				</div>
			)}
		</PageLayout>
	);
};

export default Leaderboard;