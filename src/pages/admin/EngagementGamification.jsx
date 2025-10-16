import React from 'react';
import { 
  Trophy, BarChart3, Users, Clock, Medal, 
  Star, Video, Gamepad2, BookOpen, AlertTriangle 
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

// Sample data for charts
const interactionData = [
  { name: 'Mon', videos: 65, immersive: 45, gamified: 35, resources: 28 },
  { name: 'Tue', videos: 59, immersive: 49, gamified: 38, resources: 32 },
  { name: 'Wed', videos: 80, immersive: 55, gamified: 42, resources: 35 },
  { name: 'Thu', videos: 81, immersive: 56, gamified: 40, resources: 30 },
  { name: 'Fri', videos: 76, immersive: 61, gamified: 45, resources: 40 },
  { name: 'Sat', videos: 51, immersive: 49, gamified: 30, resources: 25 },
  { name: 'Sun', videos: 48, immersive: 43, gamified: 28, resources: 20 },
];

// KPI Card Component
const KPICard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-green-100 rounded-lg">
        <Icon className="h-5 w-5 text-green-600" />
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    </div>
    <div className="flex items-baseline justify-between">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <span className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>
  </div>
);

// Leaderboard Row Component
const LeaderboardRow = ({ rank, name, points, badges, pathway }) => (
  <div className="grid grid-cols-5 py-3 px-4 hover:bg-green-50 rounded-lg transition-colors cursor-pointer">
    <div className="font-semibold">{rank}</div>
    <div>{name}</div>
    <div>{points}</div>
    <div>{badges}</div>
    <div className="text-green-600">{pathway}</div>
  </div>
);

const EngagementGamification = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Engagement & Gamification</h1>
              <p className="text-gray-600 mt-1">Monitor engagement and achievements</p>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <KPICard icon={Users} title="Active Learners Today" value="2,847" change={12} />
            <KPICard icon={Clock} title="Avg. Time Spent" value="2.5h" change={8} />
            <KPICard icon={Medal} title="Total Badges" value="1,234" change={15} />
            <KPICard icon={Star} title="Avg. Points" value="456" change={-3} />
          </div>
        </div>

        {/* Content Interaction Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Content Interaction Overview</h2>
              <select className="rounded-lg border-gray-200 text-sm">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={interactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="videos" stackId="1" stroke="#3b82f6" fill="#93c5fd" />
                  <Area type="monotone" dataKey="immersive" stackId="1" stroke="#22c55e" fill="#86efac" />
                  <Area type="monotone" dataKey="gamified" stackId="1" stroke="#8b5cf6" fill="#c4b5fd" />
                  <Area type="monotone" dataKey="resources" stackId="1" stroke="#f59e0b" fill="#fcd34d" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gamification Analytics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Leaderboard & Rewards</h2>
            <div className="space-y-2">
              <div className="grid grid-cols-5 py-2 px-4 bg-gray-50 rounded-lg font-medium text-sm text-gray-600">
                <div>Rank</div>
                <div>Name</div>
                <div>Points</div>
                <div>Badges</div>
                <div>Pathway</div>
              </div>
              <LeaderboardRow rank="#1" name="John Doe" points="2,456" badges="12" pathway="Advanced" />
              <LeaderboardRow rank="#2" name="Jane Smith" points="2,123" badges="10" pathway="Intermediate" />
              <LeaderboardRow rank="#3" name="Alex Johnson" points="1,897" badges="8" pathway="Basic" />
            </div>
          </div>
        </div>

        {/* Pathway Engagement */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Engagement by Learning Pathway</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <Video className="h-6 w-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium">Video-only</p>
              <p className="text-2xl font-bold text-blue-600">45%</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-100">
              <BookOpen className="h-6 w-6 text-green-600 mb-2" />
              <p className="text-sm font-medium">Video + Immersive</p>
              <p className="text-2xl font-bold text-green-600">30%</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-100">
              <Gamepad2 className="h-6 w-6 text-orange-600 mb-2" />
              <p className="text-sm font-medium">Immersive-only</p>
              <p className="text-2xl font-bold text-orange-600">15%</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
              <Trophy className="h-6 w-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium">Gamified</p>
              <p className="text-2xl font-bold text-purple-600">10%</p>
            </div>
          </div>
        </div>

        {/* Alerts & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Top 3 Engaged Learners</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                <Medal className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-600">12 badges earned this week</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-green-50/50 rounded-lg">
                <Medal className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-sm text-gray-600">10 badges earned this week</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-green-50/30 rounded-lg">
                <Medal className="h-5 w-5 text-green-400" />
                <div>
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-sm text-gray-600">8 badges earned this week</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Low Engagement Alerts</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">5 users inactive for 7+ days</p>
                  <p className="text-sm text-gray-600">Recommended: Send reminder notification</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">3 users with incomplete modules</p>
                  <p className="text-sm text-gray-600">Recommended: Schedule follow-up</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Low quiz completion rate</p>
                  <p className="text-sm text-gray-600">Consider reviewing difficulty level</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementGamification;