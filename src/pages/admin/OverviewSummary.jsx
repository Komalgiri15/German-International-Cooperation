import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Award, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const OverviewSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - Replace with real API data
  const programKPIs = {
    totalLearners: 15,
    completionRate: 73.3,
    averageScore: 84.8,
    activeToday: 8,
    trends: {
      learners: 7.1,
      completion: 4.2,
      score: 2.1,
      active: 14.3
    }
  };

  const pathwayData = [
    { 
      pathway: 'Digital Literacy → Financial Planning',
      recommended: 5,
      actual: 4,
      matchRate: 80.0
    },
    { 
      pathway: 'Labour Rights → Legal Compliance',
      recommended: 4,
      actual: 3,
      matchRate: 75.0
    },
    { 
      pathway: 'Communication → Leadership',
      recommended: 3,
      actual: 3,
      matchRate: 100.0
    },
    { 
      pathway: 'Financial Literacy → Entrepreneurship',
      recommended: 2,
      actual: 1,
      matchRate: 50.0
    },
    { 
      pathway: 'Workplace Safety → Risk Management',
      recommended: 1,
      actual: 1,
      matchRate: 100.0
    }
  ];

  const learnersData = [
    {
      id: 1,
      name: 'Anna Schmidt',
      email: 'anna.schmidt@example.com',
      modulesCompleted: 12,
      totalModules: 15,
      currentModule: 'Financial Planning',
      score: 92.5,
      status: 'active',
      pathway: 'Digital Literacy',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Hans Müller',
      email: 'hans.mueller@example.com',
      modulesCompleted: 8,
      totalModules: 15,
      currentModule: 'Labour Rights',
      score: 88.3,
      status: 'active',
      pathway: 'Legal Compliance',
      lastActive: '5 hours ago'
    },
    {
      id: 3,
      name: 'Sophie Weber',
      email: 'sophie.weber@example.com',
      modulesCompleted: 15,
      totalModules: 15,
      currentModule: 'Completed',
      score: 95.7,
      status: 'completed',
      pathway: 'Communication',
      lastActive: '1 day ago'
    },
    {
      id: 4,
      name: 'Klaus Fischer',
      email: 'klaus.fischer@example.com',
      modulesCompleted: 5,
      totalModules: 15,
      currentModule: 'Financial Literacy',
      score: 76.2,
      status: 'at-risk',
      pathway: 'Entrepreneurship',
      lastActive: '3 days ago'
    },
    {
      id: 5,
      name: 'Maria Wagner',
      email: 'maria.wagner@example.com',
      modulesCompleted: 15,
      totalModules: 15,
      currentModule: 'Completed',
      score: 94.8,
      status: 'completed',
      pathway: 'Digital Literacy',
      lastActive: '2 days ago'
    },
    {
      id: 6,
      name: 'Peter Becker',
      email: 'peter.becker@example.com',
      modulesCompleted: 10,
      totalModules: 15,
      currentModule: 'Communication Skills',
      score: 85.6,
      status: 'active',
      pathway: 'Leadership',
      lastActive: '1 hour ago'
    },
    {
      id: 7,
      name: 'Laura Hoffmann',
      email: 'laura.hoffmann@example.com',
      modulesCompleted: 3,
      totalModules: 15,
      currentModule: 'Basic Computer Skills',
      score: 72.4,
      status: 'at-risk',
      pathway: 'Digital Literacy',
      lastActive: '4 days ago'
    },
    {
      id: 8,
      name: 'Michael Schulz',
      email: 'michael.schulz@example.com',
      modulesCompleted: 13,
      totalModules: 15,
      currentModule: 'Risk Management',
      score: 89.2,
      status: 'active',
      pathway: 'Workplace Safety',
      lastActive: '3 hours ago'
    },
    {
      id: 9,
      name: 'Emma Koch',
      email: 'emma.koch@example.com',
      modulesCompleted: 15,
      totalModules: 15,
      currentModule: 'Completed',
      score: 91.3,
      status: 'completed',
      pathway: 'Legal Compliance',
      lastActive: '1 day ago'
    },
    {
      id: 10,
      name: 'Thomas Bauer',
      email: 'thomas.bauer@example.com',
      modulesCompleted: 7,
      totalModules: 15,
      currentModule: 'Labour Code Basics',
      score: 80.5,
      status: 'active',
      pathway: 'Labour Rights',
      lastActive: '6 hours ago'
    },
    {
      id: 11,
      name: 'Lena Meyer',
      email: 'lena.meyer@example.com',
      modulesCompleted: 15,
      totalModules: 15,
      currentModule: 'Completed',
      score: 93.1,
      status: 'completed',
      pathway: 'Communication',
      lastActive: '3 days ago'
    },
    {
      id: 12,
      name: 'Felix Richter',
      email: 'felix.richter@example.com',
      modulesCompleted: 2,
      totalModules: 15,
      currentModule: 'Introduction to Finance',
      score: 68.7,
      status: 'inactive',
      pathway: 'Financial Literacy',
      lastActive: '7 days ago'
    },
    {
      id: 13,
      name: 'Sarah Schneider',
      email: 'sarah.schneider@example.com',
      modulesCompleted: 9,
      totalModules: 15,
      currentModule: 'Digital Marketing',
      score: 86.9,
      status: 'active',
      pathway: 'Entrepreneurship',
      lastActive: '4 hours ago'
    },
    {
      id: 14,
      name: 'Markus Wolf',
      email: 'markus.wolf@example.com',
      modulesCompleted: 11,
      totalModules: 15,
      currentModule: 'Advanced Safety Protocols',
      score: 87.4,
      status: 'active',
      pathway: 'Risk Management',
      lastActive: '2 hours ago'
    },
    {
      id: 15,
      name: 'Julia Zimmermann',
      email: 'julia.zimmermann@example.com',
      modulesCompleted: 6,
      totalModules: 15,
      currentModule: 'Team Collaboration',
      score: 79.8,
      status: 'active',
      pathway: 'Leadership',
      lastActive: '8 hours ago'
    }
  ];

  // Filtering and sorting logic
  const filteredAndSortedLearners = useMemo(() => {
    let filtered = learnersData.filter(learner => {
      const matchesSearch = learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           learner.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || learner.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'progress') {
        aVal = a.modulesCompleted / a.totalModules;
        bVal = b.modulesCompleted / b.totalModules;
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, sortConfig, filterStatus]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      completed: 'bg-blue-50 text-blue-700 border-blue-200',
      'at-risk': 'bg-amber-50 text-amber-700 border-amber-200',
      inactive: 'bg-slate-50 text-slate-700 border-slate-200'
    };
    return colors[status] || colors.inactive;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-emerald-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50/20 to-purple-50/10 p-6">
      <div className="max-w-[1800px] mx-auto space-y-5">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-slate-800">Overview Summary</h1>
          </div>
          <p className="text-sm text-slate-500">Real-time program analytics and learner insights</p>
        </motion.div>

        {/* 1. Overall Program KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Learners */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs ${programKPIs.trends.learners >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {programKPIs.trends.learners >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(programKPIs.trends.learners)}%
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-semibold text-slate-900">{programKPIs.totalLearners.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Total Learners</p>
              </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-emerald-200 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Award className="h-5 w-5 text-emerald-500" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs ${programKPIs.trends.completion >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {programKPIs.trends.completion >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(programKPIs.trends.completion)}%
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-semibold text-slate-900">{programKPIs.completionRate}%</p>
                <p className="text-xs text-slate-500">Completion Rate</p>
              </div>
            </div>

            {/* Average Score */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-amber-200 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs ${programKPIs.trends.score >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {programKPIs.trends.score >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(programKPIs.trends.score)}%
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-semibold text-slate-900">{programKPIs.averageScore}%</p>
                <p className="text-xs text-slate-500">Average Score</p>
              </div>
            </div>

            {/* Active Today */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-violet-200 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-violet-50 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-violet-500" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs ${programKPIs.trends.active >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {programKPIs.trends.active >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(programKPIs.trends.active)}%
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-semibold text-slate-900">{programKPIs.activeToday.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Active Today</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 2. Two Column Layout: Pathway Tracker & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Predictive Pathway Tracker - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6"
          >
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-800 mb-1">Predictive Pathway Tracker</h2>
              <p className="text-xs text-slate-500">Recommended vs actual learner pathways</p>
            </div>

            <div className="space-y-5">
              {pathwayData.slice(0, 3).map((pathway, index) => {
                // Generate trend data for visualization
                const dataPoints = 7;
                const maxValue = Math.max(pathway.recommended, pathway.actual);
                const recommendedTrend = Array.from({ length: dataPoints }, (_, i) => {
                  const progress = i / (dataPoints - 1);
                  return pathway.recommended * (0.3 + progress * 0.7) + (Math.random() - 0.5) * 5;
                });
                const actualTrend = Array.from({ length: dataPoints }, (_, i) => {
                  const progress = i / (dataPoints - 1);
                  return pathway.actual * (0.3 + progress * 0.7) + (Math.random() - 0.5) * 5;
                });

                const chartHeight = 60;
                const chartWidth = 500;
                const pointSpacing = chartWidth / (dataPoints - 1);
                const yScale = chartHeight / (maxValue * 1.2);

                // Create path for recommended
                const recPoints = recommendedTrend.map((val, i) => ({
                  x: i * pointSpacing,
                  y: chartHeight - val * yScale
                }));
                const recPath = recPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
                const recArea = `${recPath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

                // Create path for actual
                const actPoints = actualTrend.map((val, i) => ({
                  x: i * pointSpacing,
                  y: chartHeight - val * yScale
                }));
                const actPath = actPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
                const actArea = `${actPath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="bg-gradient-to-br from-slate-50 to-white rounded-lg p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 font-medium">{pathway.pathway}</p>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${pathway.matchRate >= 85 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {pathway.matchRate}% match
                      </div>
                    </div>

                    {/* Interactive Area Chart */}
                    <div className="relative">
                      <svg 
                        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                        className="w-full h-16"
                        preserveAspectRatio="none"
                      >
                        {/* Grid line */}
                        <line 
                          x1="0" 
                          y1={chartHeight/2} 
                          x2={chartWidth} 
                          y2={chartHeight/2} 
                          stroke="currentColor" 
                          className="text-slate-200" 
                          strokeWidth="1" 
                          strokeDasharray="4 2" 
                        />

                        {/* Recommended area and line */}
                        <path 
                          d={recArea}
                          fill="url(#recGradient-${index})"
                          className="opacity-40"
                        />
                        <path 
                          d={recPath}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="drop-shadow-sm"
                        />

                        {/* Actual area and line */}
                        <path 
                          d={actArea}
                          fill="url(#actGradient-${index})"
                          className="opacity-40"
                        />
                        <path 
                          d={actPath}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="drop-shadow-sm"
                        />

                        {/* Data points */}
                        {recPoints.map((point, i) => (
                          <circle
                            key={`rec-${i}`}
                            cx={point.x}
                            cy={point.y}
                            r="3"
                            fill="#3b82f6"
                            className="hover:r-5 transition-all cursor-pointer"
                          />
                        ))}
                        {actPoints.map((point, i) => (
                          <circle
                            key={`act-${i}`}
                            cx={point.x}
                            cy={point.y}
                            r="3"
                            fill="#10b981"
                            className="hover:r-5 transition-all cursor-pointer"
                          />
                        ))}

                        <defs>
                          <linearGradient id={`recGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                          </linearGradient>
                          <linearGradient id={`actGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Legend with values */}
                    <div className="flex items-center justify-between mt-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                        <span className="text-slate-600">Recommended: <span className="font-semibold">{pathway.recommended}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                        <span className="text-slate-600">Actual: <span className="font-semibold">{pathway.actual}</span></span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

          {/* Quick Stats - 1 column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-4"
          >
            {/* Status Distribution */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Learner Status</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-600">Active (8)</span>
                    <span className="font-medium text-emerald-600">53.3%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: '53.3%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-600">Completed (4)</span>
                    <span className="font-medium text-blue-600">26.7%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: '26.7%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-600">At Risk (2)</span>
                    <span className="font-medium text-amber-600">13.3%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: '13.3%' }}></div>
                  </div>
            </div>
            <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-600">Inactive (1)</span>
                    <span className="font-medium text-slate-600">6.7%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 transition-all duration-500" style={{ width: '6.7%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-xl border border-amber-100 p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Top Performers</h3>
              <div className="space-y-2">
                {learnersData.slice(0, 3).sort((a, b) => b.score - a.score).map((learner, index) => (
                  <div key={learner.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-xs text-slate-700">{learner.name.split(' ')[0]}</span>
                    </div>
                    <span className="text-xs font-semibold text-amber-600">{learner.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* 3. Learner Progress Tracker - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-800 mb-1">Learner Progress Tracker</h2>
            <p className="text-xs text-slate-500">Individual progress and completion status</p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search learners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="at-risk">At Risk</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Compact Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th 
                    onClick={() => handleSort('name')}
                    className="text-left py-2.5 px-3 text-xs font-medium text-slate-600 cursor-pointer hover:text-blue-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Learner
                      {sortConfig.key === 'name' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('progress')}
                    className="text-left py-2.5 px-3 text-xs font-medium text-slate-600 cursor-pointer hover:text-blue-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Progress
                      {sortConfig.key === 'progress' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-left py-2.5 px-3 text-xs font-medium text-slate-600">
                    Current Module
                  </th>
                  <th 
                    onClick={() => handleSort('score')}
                    className="text-left py-2.5 px-3 text-xs font-medium text-slate-600 cursor-pointer hover:text-blue-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Score
                      {sortConfig.key === 'score' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('status')}
                    className="text-left py-2.5 px-3 text-xs font-medium text-slate-600 cursor-pointer hover:text-blue-500 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {sortConfig.key === 'status' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAndSortedLearners.map((learner, index) => {
                  const progress = (learner.modulesCompleted / learner.totalModules) * 100;
                  return (
                    <motion.tr
                      key={learner.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className="hover:bg-sky-50/30 transition-colors"
                    >
                      <td className="py-2.5 px-3">
                        <div>
                          <p className="text-sm text-slate-800 font-medium">{learner.name}</p>
                          <p className="text-xs text-slate-400">{learner.email}</p>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="space-y-1 max-w-[140px]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">{learner.modulesCompleted}/{learner.totalModules}</span>
                            <span className="text-slate-700 font-medium">{progress.toFixed(0)}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getProgressColor(progress)} transition-all duration-500`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <p className="text-sm text-slate-700">{learner.currentModule}</p>
                        <p className="text-xs text-slate-400">{learner.lastActive}</p>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-slate-700 font-medium">{learner.score}%</span>
                          {learner.score >= 90 && <Award className="h-3.5 w-3.5 text-amber-500" />}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${getStatusColor(learner.status)}`}>
                          {learner.status.charAt(0).toUpperCase() + learner.status.slice(1)}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredAndSortedLearners.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500">No learners found</p>
            </div>
          )}

          {/* Results count */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Showing {filteredAndSortedLearners.length} of {learnersData.length} learners
            </p>
        </div>
        </motion.div>

      </div>
    </div>
  );
};

export default OverviewSummary;

