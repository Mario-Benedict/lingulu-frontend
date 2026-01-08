import { useNavigate } from 'react-router-dom'
import sidebarLogo from '../../assets/dashboard/sidebar-logo.svg';
import { Home, BookOpen, ChartColumn, BotMessageSquare, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import bannerBg from '../../assets/leaderboard/banner-leaderboard.svg'
import lbEmptyImg from '../../assets/leaderboard/LB-empty.svg'

type LeaderboardEntry = {
	name: string
	xp: number
	avatarUrl?: string
	userId?: string
	rank?: number
}

type CurrentUserInfo = {
	name: string
	xp: number
	avatarUrl?: string
	userId?: string
	rank: number
}

type ApiResponse<T> = {
	success: boolean
	message: string
	data: T
}



function Sidebar({ onClose, className }: { onClose?: () => void; className?: string }) {
	const navigate = useNavigate()
	const [activeMenu, setActiveMenu] = useState<'dashboard' | 'lessons' | 'leaderboard' | 'conversation' | 'profile'>('leaderboard')

	const menuItems = [
		{ id: 'dashboard', label: 'Dashboard', icon: Home, to: '/dashboard' },
		{ id: 'lessons', label: 'Lessons', icon: BookOpen, to: '/lessons' },
		{ id: 'leaderboard', label: 'Leaderboard', icon: ChartColumn, to: '/leaderboard' },
		{ id: 'conversation', label: 'AI Conversation', icon: BotMessageSquare, to: '/ai' },
		{ id: 'profile', label: 'Profile', icon: User, to: '/profile' },
	] as const

	return (
		<aside className={`bg-white shadow-lg h-screen flex flex-col ${className ?? 'w-64'}`}>
			<div className="py-2 border-b">
				<img src={sidebarLogo} alt="Lingulu Logo" className="h-16 mx-auto" />
			</div>

			<nav className="pt-6">
				{menuItems.map((item) => {
					const Icon = item.icon
					const isActive = activeMenu === item.id
					return (
						<button
							key={item.id}
							onClick={() => {
								setActiveMenu(item.id)
								navigate(item.to)
								onClose?.()
							}}
							className={`w-full px-6 py-3 flex items-center gap-3 transition-colors ${
								isActive
									? 'bg-orange-500 text-white border-r-4 border-orange-600'
									: 'text-gray-600 hover:bg-gray-50'
							}`}
						>
							<Icon size={20} />
							<span className="font-large font-rubik">{item.label}</span>
						</button>
					)
				})}
			</nav>
		</aside>
	)
}

function RankBadge({ rank }: { rank: number }) {
	// Simple badge matching the mock — solid gradient, subtle shadow
	const badgeStyle =
		rank === 1
			? 'bg-[linear-gradient(180deg,#ffe082_0%,#f9bf3b_100%)] border-[#e6a800] text-white'
			: rank === 2
			? 'bg-[linear-gradient(180deg,#e8eaed_0%,#b8bcc4_100%)] border-[#9ca3af] text-white'
			: rank === 3
			? 'bg-[linear-gradient(180deg,#f5a855_0%,#d56214_100%)] border-[#c2410c] text-white'
			: 'bg-[linear-gradient(180deg,#f9fafb_0%,#e5e7eb_100%)] border-gray-300 text-gray-600'

	return (
		<div
			className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${badgeStyle} border-2 flex items-center justify-center font-rubik font-extrabold text-xl sm:text-3xl`}
			style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
		>
			<span style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25), 0 1px 1px rgba(0,0,0,0.15)' }}>{rank}</span>
		</div>
	)
}

function LeaderboardRow({ entry, index, currentUserId }: { entry: LeaderboardEntry; index: number; currentUserId?: string | null }) {
	const rank = index + 1
	const isCurrentUser = currentUserId && entry.userId && currentUserId === entry.userId

	const innerGradient =
		rank === 1
			? 'bg-[linear-gradient(90deg,#fee59c_0%,#e6ba1f_48%,#fff1c6_100%)] border-amber-400'
			: rank === 2
			? 'bg-[linear-gradient(90deg,#e9eaed_0%,#b9bdc4_48%,#f7f7f7_100%)] border-gray-400'
			: rank === 3
			? 'bg-[linear-gradient(90deg,#f5b27f_0%,#c75400_48%,#ffd8b9_100%)] border-orange-600'
			: 'bg-[linear-gradient(90deg,#ffffff_0%,#f5f5f5_48%,#ffffff_100%)] border-gray-300'

	const outerBorder =
		rank === 1
			? 'border-amber-300'
			: rank === 2
			? 'border-gray-300'
			: rank === 3
			? 'border-orange-400'
			: 'border-gray-200'

	return (
		<div className={`rounded-[18px] border ${outerBorder} bg-white shadow-sm p-[6px] ${isCurrentUser ? 'ring-2 ring-orange-400 border-orange-400 bg-orange-50 shadow-[0_0_8px_rgba(251,146,60,0.15)] scale-[1.01] transition-transform' : ''}`}> 
			<div className={`relative flex items-center gap-3 sm:gap-6 rounded-[14px] border ${innerGradient} ring-1 ring-inset ring-white/70 px-3 sm:px-5 py-2.5 sm:py-4`}>
				<div className="absolute inset-0 rounded-[14px] pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.06)]" />

				<RankBadge rank={rank} />

				<div className="relative z-10 flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
					{entry.avatarUrl ? (
						<img
							src={entry.avatarUrl}
							alt={entry.name}
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
							{entry.name}
							{isCurrentUser && <span className="text-sm font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">Akun Kamu</span>}
						</span>
					</span>
				</div>

				<div className="relative z-10 flex items-center gap-1 sm:gap-2">
					<span className="text-2xl sm:text-4xl font-semibold text-[#111827] tracking-tight">{entry.xp.toLocaleString()}</span>
					<span className="text-sm sm:text-lg font-medium text-[#111827]/80">XP</span>
				</div>
			</div>
		</div>
	)
}

export default function Leaderboard() {
	const [entries, setEntries] = useState<LeaderboardEntry[]>([])
	const [currentUser, setCurrentUser] = useState<CurrentUserInfo | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

	useEffect(() => {
		const controller = new AbortController()
		const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

		async function fetchLeaderboard() {
			try {
				setLoading(true)
				setError(null)

				const token = localStorage.getItem('accessToken')
				// Untuk dummy leaderboard, jangan kirim Authorization jika token tidak ada
				const headers = token
					? { Accept: 'application/json', Authorization: `Bearer ${token}` }
					: { Accept: 'application/json' };
				const res = await fetch(`${API_BASE}/api/leaderboard`, {
					method: 'GET',
					headers,
					credentials: 'include',
					signal: controller.signal,
				})

				if (!res.ok) {
					throw new Error(`HTTP ${res.status}`)
				}

				const payload: ApiResponse<any> = await res.json()
				if (!payload?.success) {
					throw new Error(payload?.message ?? 'Failed to fetch leaderboard')
				}

				// Handle response format: array of leaderboard entries or wrapped in data object
				const data = payload.data
				const leaderboardData: any[] = Array.isArray(data) ? data : (data?.leaderboard ?? [])

				// Normalize leaderboard entries from backend format:
				// { leaderboardId, user: { userId, userProfile: { username, avatarUrl } }, totalPoints, profileUrl }
				const normalized: LeaderboardEntry[] = leaderboardData.map((item: any, idx: number) => ({
					name: item.user?.userProfile?.username ?? item.username ?? item.name ?? `Player ${idx + 1}`,
					xp: Number(item.totalPoints ?? item.xp ?? item.points ?? 0),
					avatarUrl: item.profileUrl ?? item.user?.userProfile?.avatarUrl ?? item.avatarUrl ?? null,
					userId: item.user?.userId ?? item.userId ?? null,
					rank: idx + 1,
				}))

				if (normalized.length > 0) {
					setEntries(normalized)
				}

				// Set current user info from backend response
				if (data?.currentUser) {
					const cu = data.currentUser
					setCurrentUser({
						name: cu.username ?? cu.name ?? 'You',
						xp: Number(cu.totalPoints ?? cu.xp ?? 0),
						avatarUrl: cu.avatarUrl ?? null,
						userId: cu.userId ?? null,
						rank: cu.rank ?? 0,
					})
				}
			} catch (err: any) {
				// Ignore abort errors (normal behavior when component unmounts or React StrictMode)
				if (err?.name === 'AbortError') {
					return
				}
				setError(err?.message ?? 'Network error')
			} finally {
				setLoading(false)
			}
		}

		fetchLeaderboard()

		return () => controller.abort()
	}, [])
	return (
		<div className="flex h-screen w-screen bg-gray-50">
			{/* Desktop sidebar */}
			<div className="hidden md:block">
				<Sidebar />
			</div>

			<main className="flex-1 overflow-y-auto">
				{/* Banner */}
				<header className="relative h-40 overflow-hidden">
					<img src={bannerBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
					
					<div className="relative h-full flex items-center px-6">
						<button
							className="md:hidden p-2 mr-4 rounded-lg bg-white/20 backdrop-blur text-white border border-white/40"
							onClick={() => setMobileMenuOpen(true)}
							aria-label="Open menu"
						>
							☰
						</button>
						<div>
							<h1 className="text-3xl md:text-5xl font-rubik font-medium text-orange-500">Leaderboard</h1>
							<p className="text-sm md:text-base text-gray-800 mt-1">Based on XP from completed lessons</p>
						</div>
					</div>
				</header>

				<section className="px-4 sm:px-6 py-6 space-y-3">
					{loading && (
						<div className="text-gray-600">Loading leaderboard...</div>
					)}

					{error && (
						<div className="text-sm text-red-600">{error}</div>
					)}

					{!loading && !error && entries.length === 0 && (
						<div className="flex flex-col items-center justify-center py-12">
							<img src={lbEmptyImg} alt="No data" className="w-40 h-40 mb-4 opacity-70" />
							<div className="text-lg font-semibold text-gray-600 mb-2">Belum ada data leaderboard</div>
							<div className="text-sm text-gray-400 mb-4">Ayo selesaikan pelajaran untuk masuk leaderboard!</div>
							<button
								className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
								onClick={() => window.location.reload()}
							>
								Refresh
							</button>
						</div>
					)}

					{entries.map((entry, idx) => (
						<LeaderboardRow key={`${entry.name}-${idx}`} entry={entry} index={idx} currentUserId={currentUser?.userId} />
					))}
				</section>

				{/* Spacer for sticky bar */}
				{currentUser && currentUser.rank > 10 && <div className="h-24" />}
			</main>

			{/* Sticky "Your Rank" bar at bottom - shows when current user is not in top 10 */}
			{currentUser && currentUser.rank > 10 && (
				<div className="fixed bottom-0 left-0 md:left-64 right-0 z-30 bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-t border-orange-400 animate-fade-in">
					<div className="flex items-center gap-6 px-6 sm:px-10 py-[15px] sm:py-[23px] min-h-[73px] sm:min-h-[93px]">
						{/* Rank badge */}
						<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center font-rubik font-extrabold text-xl sm:text-3xl text-white shadow-md" style={{textShadow:'0 2px 8px rgba(0,0,0,0.25)'}}>
							{currentUser.rank}
						</div>

						{/* Avatar */}
						{currentUser.avatarUrl ? (
							<img
								src={currentUser.avatarUrl}
								alt={currentUser.name}
								className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shrink-0 border-2 border-white shadow-md"
								referrerPolicy="no-referrer"
							/>
						) : (
							<div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-white shadow-md grid place-items-center text-3xl sm:text-5xl shrink-0">🐯</div>
						)}

						{/* Name */}
						<div className="flex-1 min-w-0">
							<div className="text-xl sm:text-3xl font-rubik font-semibold text-white truncate">
								{currentUser.name}
							</div>
							<div className="text-base sm:text-lg text-white/70">Rank kamu di leaderboard</div>
						</div>

						{/* XP */}
						<div className="flex items-baseline gap-2">
							<span className="text-2xl sm:text-4xl font-bold text-white">{currentUser.xp.toLocaleString()}</span>
							<span className="text-base sm:text-lg text-white/80">XP</span>
						</div>
					</div>
				</div>
			)}

			{/* Mobile sidebar drawer */}
			{mobileMenuOpen && (
				<>
					<div className="fixed inset-0 z-40 bg-black/30" onClick={() => setMobileMenuOpen(false)} />
					<Sidebar onClose={() => setMobileMenuOpen(false)} className="fixed inset-y-0 left-0 z-50 w-64" />
				</>
			)}
		</div>
	)
}

