import React, { useState } from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Filter,
  ChevronDown,
  ChevronRight,
  Users,
  Award,
  BarChart2,
  PieChart,
  Activity,
  Star,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ModuleAnalytics = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Mock data for modules with detailed info
  const moduleData = [
    {
      id: 1,
      name: 'Digital Literacy Basics',
      icon: '💻',
      color: 'sky',
      completion: 92,
      avgScore: 87.5,
      enrolled: 458,
      completed: 421,
      inProgress: 28,
      notStarted: 9,
      avgTime: '4.2h',
      topScore: 98,
      lowestScore: 65,
      assessments: 3,
      passRate: 89.8
    },
    {
      id: 2,
      name: 'Financial Planning',
      icon: '💰',
      color: 'purple',
      completion: 78,
      avgScore: 82.3,
      enrolled: 412,
      completed: 321,
      inProgress: 67,
      notStarted: 24,
      avgTime: '5.8h',
      topScore: 96,
      lowestScore: 58,
      assessments: 2,
      passRate: 83.2
    },
    {
      id: 3,
      name: 'Labour Rights & Compliance',
      icon: '⚖️',
      color: 'sky',
      completion: 85,
      avgScore: 88.9,
      enrolled: 389,
      completed: 331,
      inProgress: 42,
      notStarted: 16,
      avgTime: '3.9h',
      topScore: 99,
      lowestScore: 71,
      assessments: 4,
      passRate: 90.0
    },
    {
      id: 4,
      name: 'Communication Skills',
      icon: '💬',
      color: 'purple',
      completion: 71,
      avgScore: 79.4,
      enrolled: 356,
      completed: 253,
      inProgress: 78,
      notStarted: 25,
      avgTime: '6.1h',
      topScore: 94,
      lowestScore: 54,
      assessments: 3,
      passRate: 83.4
    },
    {
      id: 5,
      name: 'Workplace Safety',
      icon: '🛡️',
      color: 'sky',
      completion: 88,
      avgScore: 91.2,
      enrolled: 334,
      completed: 294,
      inProgress: 31,
      notStarted: 9,
      avgTime: '3.5h',
      topScore: 100,
      lowestScore: 78,
      assessments: 2,
      passRate: 93.9
    },
    {
      id: 6,
      name: 'Entrepreneurship Fundamentals',
      icon: '🚀',
      color: 'purple',
      completion: 65,
      avgScore: 76.8,
      enrolled: 298,
      completed: 194,
      inProgress: 89,
      notStarted: 15,
      avgTime: '7.2h',
      topScore: 92,
      lowestScore: 49,
      assessments: 4,
      passRate: 78.5
    }
  ];

  // Mock data for assessments
  const assessmentData = [
    {
      id: 1,
      name: 'Digital Literacy Quiz',
      type: 'Quiz',
      difficulty: 'Easy',
      totalAttempts: 421,
      passed: 378,
      failed: 43,
      passRate: 89.8,
      avgScore: 87.5
    },
    {
      id: 2,
      name: 'Financial Planning Assessment',
      type: 'Assessment',
      difficulty: 'Medium',
      totalAttempts: 321,
      passed: 267,
      failed: 54,
      passRate: 83.2,
      avgScore: 82.3
    },
    {
      id: 3,
      name: 'Labour Law Exam',
      type: 'Exam',
      difficulty: 'Hard',
      totalAttempts: 331,
      passed: 298,
      failed: 33,
      passRate: 90.0,
      avgScore: 88.9
    },
    {
      id: 4,
      name: 'Communication Skills Quiz',
      type: 'Quiz',
      difficulty: 'Easy',
      totalAttempts: 253,
      passed: 211,
      failed: 42,
      passRate: 83.4,
      avgScore: 79.4
    },
    {
      id: 5,
      name: 'Safety Protocol Assessment',
      type: 'Assessment',
      difficulty: 'Medium',
      totalAttempts: 294,
      passed: 276,
      failed: 18,
      passRate: 93.9,
      avgScore: 91.2
    }
  ];

  const getModuleColorClasses = (color) => {
    const colors = {
      sky: {
        bg: 'bg-gradient-to-br from-sky-50/80 to-blue-50/60',
        border: 'border-sky-200/60',
        hover: 'hover:border-sky-300/80',
        text: 'text-sky-600',
        badge: 'bg-sky-100/70 text-sky-700',
        progress: 'bg-sky-400'
      },
      purple: {
        bg: 'bg-gradient-to-br from-purple-50/80 to-violet-50/60',
        border: 'border-purple-200/60',
        hover: 'hover:border-purple-300/80',
        text: 'text-purple-600',
        badge: 'bg-purple-100/70 text-purple-700',
        progress: 'bg-purple-400'
      }
    };
    return colors[color] || colors.sky;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      Medium: 'bg-amber-50 text-amber-600 border-amber-200',
      Hard: 'bg-rose-50 text-rose-600 border-rose-200'
    };
    return colors[difficulty] || colors.Easy;
  };

  const getPassRateColor = (rate) => {
    if (rate >= 90) return 'text-emerald-600';
    if (rate >= 75) return 'text-sky-600';
    if (rate >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50/30 to-purple-50/20 p-6">
      <div className="max-w-[1800px] mx-auto space-y-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-br from-sky-500 to-purple-500 rounded-lg">
              <BarChart2 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-slate-800">Module & Assessment Analytics</h1>
          </div>
          <p className="text-sm text-slate-500">Click on any module to view detailed analytics</p>
        </motion.div>

        {/* Module Performance - Interactive Cards */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-5"
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-sky-500" />
              Module Performance
            </h2>
            <p className="text-sm text-slate-500">Click any module card to view detailed analytics</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {moduleData.map((module, index) => {
              const colors = getModuleColorClasses(module.color);
              
              // Generate mini sparkline for progress
              const sparklinePoints = 8;
              const trendData = Array.from({ length: sparklinePoints }, (_, i) => {
                const baseProgress = (i / sparklinePoints) * module.completion;
                const variation = Math.sin(i * 0.7) * 2;
                return Math.max(0, Math.min(100, baseProgress + variation));
              });
              
              const sparkHeight = 40;
              const sparkWidth = 300;
              const pointSpacing = sparkWidth / (sparklinePoints - 1);
              const sparkPath = trendData.map((value, i) => {
                const x = i * pointSpacing;
                const y = sparkHeight - (value / 100) * sparkHeight;
                return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
              }).join(' ');
              
              const sparkArea = `${sparkPath} L ${sparkWidth},${sparkHeight} L 0,${sparkHeight} Z`;
              
  return (
                <div
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className={`relative overflow-hidden bg-gradient-to-br ${module.color === 'sky' ? 'from-blue-50/50 via-white to-sky-50/30' : 'from-purple-50/50 via-white to-violet-50/30'} rounded-xl border-2 ${module.color === 'sky' ? 'border-blue-100/50' : 'border-purple-100/50'} p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${module.color === 'sky' ? 'hover:border-blue-200' : 'hover:border-purple-200'}`}
                >
                  {/* Decorative accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${module.color === 'sky' ? 'bg-blue-100/20' : 'bg-purple-100/20'} rounded-full blur-3xl -z-0`}></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2.5 ${module.color === 'sky' ? 'bg-gradient-to-br from-blue-100 to-blue-50' : 'bg-gradient-to-br from-purple-100 to-purple-50'} rounded-xl text-3xl shadow-sm ring-1 ${module.color === 'sky' ? 'ring-blue-200/50' : 'ring-purple-200/50'}`}>
                          {module.icon}
            </div>
            <div>
                          <h3 className="font-semibold text-slate-800">{module.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{module.enrolled} learners</p>
                        </div>
                      </div>
                      <div className={`p-2 rounded-lg ${module.color === 'sky' ? 'bg-blue-100/50' : 'bg-purple-100/50'} transition-transform hover:translate-x-1`}>
                        <ChevronRight className={`h-4 w-4 ${module.color === 'sky' ? 'text-blue-600' : 'text-purple-600'}`} />
                      </div>
                    </div>

                    {/* Progress Graph */}
                    <div className={`bg-gradient-to-br ${module.color === 'sky' ? 'from-blue-50/80 to-sky-50/50' : 'from-purple-50/80 to-violet-50/50'} rounded-xl p-3.5 mb-3 border ${module.color === 'sky' ? 'border-blue-100/50' : 'border-purple-100/50'} shadow-sm`}>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-xs font-medium text-slate-600">Completion Progress</span>
                        <span className="text-xl font-bold bg-gradient-to-r ${module.color === 'sky' ? 'from-blue-600 to-sky-600' : 'from-purple-600 to-violet-600'} bg-clip-text text-transparent">{module.completion}%</span>
                      </div>
                      <div className="relative">
                        <svg 
                          viewBox={`0 0 ${sparkWidth} ${sparkHeight}`}
                          className="w-full h-10"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient id={`cardGradient-${module.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={module.color === 'sky' ? '#3b82f6' : '#a855f7'} stopOpacity="0.4" />
                              <stop offset="100%" stopColor={module.color === 'sky' ? '#7dd3fc' : '#d8b4fe'} stopOpacity="0.1" />
                            </linearGradient>
                          </defs>
                          
                          <path 
                            d={sparkArea}
                            fill={`url(#cardGradient-${module.id})`}
                          />
                          <path 
                            d={sparkPath}
                            fill="none"
                            stroke={module.color === 'sky' ? '#3b82f6' : '#a855f7'}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-sm"
                          />
                          
                          {trendData.map((value, i) => (
                            <circle
                              key={i}
                              cx={i * pointSpacing}
                              cy={sparkHeight - (value / 100) * sparkHeight}
                              r="2.5"
                              fill={module.color === 'sky' ? '#3b82f6' : '#a855f7'}
                              className="drop-shadow"
                            />
                          ))}
                        </svg>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between text-xs bg-white/60 rounded-lg p-2.5 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-sm"></div>
                        <span className="text-slate-700 font-medium">{module.completed} done</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 shadow-sm"></div>
                        <span className="text-slate-700 font-medium">{module.inProgress} active</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 shadow-sm"></div>
                        <span className="text-slate-700 font-medium">{module.notStarted} pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module Detail Modal */}
        <AnimatePresence>
          {selectedModule && (
            <>
              <style>{`
                /* Hide admin navigation bar when modal is open */
                nav[class*="bg-gradient"],
                header[class*="bg-gradient"],
                .admin-portal-nav,
                [class*="AdminFloatingNav"] {
                  display: none !important;
                }
              `}</style>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
                onClick={() => setSelectedModule(null)}
              >
                <motion.div
                  initial={{ scale: 0.85, y: 40, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.85, y: 40, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gradient-to-br from-white via-white to-slate-50/80 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 module-modal-scroll border border-slate-200/80 ring-1 ring-white/40"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  <style>{`
                    .module-modal-scroll::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {/* Modal Header */}
                <div className="relative flex items-center justify-between mb-6 pb-4 border-b-2 border-gradient-to-r from-transparent via-slate-200 to-transparent">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent h-px top-0"></div>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 ${selectedModule.color === 'sky' ? 'bg-gradient-to-br from-blue-100 to-blue-50' : 'bg-gradient-to-br from-purple-100 to-purple-50'} rounded-xl text-2xl shadow-md ring-2 ${selectedModule.color === 'sky' ? 'ring-blue-200/50' : 'ring-purple-200/50'} flex-shrink-0 transform hover:scale-110 transition-transform`}>
                      {selectedModule.icon}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent truncate">{selectedModule.name}</h2>
                      <p className="text-sm text-slate-500 truncate flex items-center gap-2">
                        <Users className="h-3.5 w-3.5" />
                        {selectedModule.enrolled} enrolled • {selectedModule.assessments} tests
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="p-2 hover:bg-rose-50 rounded-xl transition-all flex-shrink-0 hover:rotate-90 duration-300 group border border-transparent hover:border-rose-200"
                  >
                    <X className="h-5 w-5 text-slate-500 group-hover:text-rose-500 transition-colors" />
                  </button>
                </div>

                {/* Compact Stats Row */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'Done', value: selectedModule.completed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50', ring: 'ring-emerald-200/40', shadow: 'hover:shadow-emerald-200/50' },
                    { label: 'Active', value: selectedModule.inProgress, icon: Activity, color: 'text-amber-600', bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50', ring: 'ring-amber-200/40', shadow: 'hover:shadow-amber-200/50' },
                    { label: 'Pending', value: selectedModule.notStarted, icon: AlertCircle, color: 'text-slate-600', bg: 'bg-gradient-to-br from-slate-50 to-slate-100/50', ring: 'ring-slate-200/40', shadow: 'hover:shadow-slate-200/50' },
                    { label: 'Pass Rate', value: `${selectedModule.passRate}%`, icon: Award, color: 'text-purple-600', bg: 'bg-gradient-to-br from-purple-50 to-purple-100/50', ring: 'ring-purple-200/40', shadow: 'hover:shadow-purple-200/50' }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`${stat.bg} rounded-xl p-3 text-center flex flex-col items-center justify-center min-h-[76px] border border-white shadow-sm ring-1 ${stat.ring} hover:shadow-md ${stat.shadow} transition-all duration-300 hover:scale-105 cursor-default`}
                    >
                      <div className={`p-1.5 bg-white/70 rounded-lg mb-2 shadow-sm`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <p className="text-base font-bold text-slate-800 leading-tight">{stat.value}</p>
                      <p className="text-[10px] text-slate-600 leading-tight mt-1 font-medium uppercase tracking-wide">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Main Grid - 2 Columns */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Left: Performance Gauges */}
                  <div className="space-y-3">
                    {[
                      { label: 'Completion', value: selectedModule.completion, color: '#10b981', gradient: 'from-emerald-400 to-emerald-600', bg: 'from-emerald-50 to-emerald-100/50' },
                      { label: 'Avg Score', value: selectedModule.avgScore, color: '#3b82f6', gradient: 'from-blue-400 to-blue-600', bg: 'from-blue-50 to-blue-100/50' }
                    ].map((metric, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`bg-gradient-to-br ${metric.bg} rounded-xl p-4 border border-white shadow-md ring-1 ring-slate-200/50 flex items-center gap-4 min-h-[80px] hover:shadow-lg transition-all duration-300`}
                      >
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="26" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                            <circle
                              cx="32" cy="32" r="26" fill="none" stroke={metric.color} strokeWidth="5"
                              strokeDasharray={`${2 * Math.PI * 26}`}
                              strokeDashoffset={`${2 * Math.PI * 26 * (1 - metric.value / 100)}`}
                              strokeLinecap="round"
                              className="transition-all duration-1000 drop-shadow-md"
                              style={{
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                              }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-sm font-bold bg-gradient-to-br ${metric.gradient} bg-clip-text text-transparent`}>{metric.value}%</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-slate-700">{metric.label}</span>
                          <div className="h-2 bg-white/60 rounded-full mt-2 overflow-hidden shadow-inner">
                            <div 
                              className={`h-full bg-gradient-to-r ${metric.gradient} rounded-full transition-all duration-1000`}
                              style={{ width: `${metric.value}%` }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Time Info */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gradient-to-br from-sky-50 to-blue-100/50 rounded-xl p-4 border border-white shadow-md ring-1 ring-sky-200/50 flex items-center gap-3 min-h-[64px] hover:shadow-lg transition-all duration-300"
                    >
                      <div className="p-2.5 bg-white/70 rounded-lg shadow-sm">
                        <Clock className="h-5 w-5 text-sky-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-600 leading-tight font-medium">Average Time</p>
                        <p className="text-lg font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent leading-tight mt-1">{selectedModule.avgTime}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: Charts */}
                  <div className="space-y-4">
                    {/* Status Donut */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-br from-white to-slate-50/50 rounded-xl p-4 border border-white shadow-md ring-1 ring-slate-200/50 hover:shadow-lg transition-all duration-300"
                    >
                      <h3 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                        <PieChart className="h-3.5 w-3.5 text-slate-500" />
                        Status Split
                      </h3>
                      <div className="flex items-center gap-3">
                        {(() => {
                          const total = selectedModule.enrolled;
                          const completedPercent = (selectedModule.completed / total) * 100;
                          const activePercent = (selectedModule.inProgress / total) * 100;
                          const radius = 26;
                          const circumference = 2 * Math.PI * radius;
                          const activeOffset = (completedPercent / 100) * circumference;
                          
                          return (
                            <>
                              <div className="relative flex-shrink-0">
                                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                                  <circle cx="32" cy="32" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="7" />
                                  <circle
                                    cx="32" cy="32" r={radius} fill="none" stroke="#10b981" strokeWidth="7"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference - (completedPercent / 100) * circumference}
                                    strokeLinecap="round"
                                    className="drop-shadow-md transition-all duration-1000"
                                  />
                                  <circle
                                    cx="32" cy="32" r={radius} fill="none" stroke="#f59e0b" strokeWidth="7"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference - activeOffset - (activePercent / 100) * circumference}
                                    strokeLinecap="round"
                                    className="drop-shadow-md transition-all duration-1000"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-sm font-bold text-slate-800">{total}</div>
                                    <div className="text-[9px] text-slate-500">Total</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-1 space-y-1.5 min-w-0">
                                {[
                                  { label: 'Done', value: selectedModule.completed, color: 'bg-emerald-500', percent: completedPercent.toFixed(1) },
                                  { label: 'Active', value: selectedModule.inProgress, color: 'bg-amber-400', percent: activePercent.toFixed(1) },
                                  { label: 'Pending', value: selectedModule.notStarted, color: 'bg-slate-400', percent: ((selectedModule.notStarted / total) * 100).toFixed(1) }
                                ].map((item, i) => (
                                  <div key={i} className="flex items-center justify-between text-xs gap-2">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                      <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0 shadow-sm`}></div>
                                      <span className="text-slate-600 truncate text-[11px]">{item.label}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                      <span className="font-bold text-slate-800">{item.value}</span>
                                      <span className="text-slate-400 text-[10px]">({item.percent}%)</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </motion.div>

                    {/* Score Bars */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-br from-white to-slate-50/50 rounded-xl p-4 border border-white shadow-md ring-1 ring-slate-200/50 hover:shadow-lg transition-all duration-300"
                    >
                      <h3 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                        <BarChart2 className="h-3.5 w-3.5 text-slate-500" />
                        Score Range
                      </h3>
                      <div className="flex items-end justify-around h-28 gap-3">
                        {[
                          { label: 'Top', value: selectedModule.topScore, color: 'from-amber-400 to-amber-500' },
                          { label: 'Avg', value: selectedModule.avgScore, color: 'from-blue-400 to-blue-500' },
                          { label: 'Low', value: selectedModule.lowestScore, color: 'from-slate-400 to-slate-500' }
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col items-center flex-1 gap-1.5 group">
                            <div className="text-xs mb-0.5">{item.icon}</div>
                            <div className="text-sm font-bold text-slate-800">{item.value}%</div>
                            <div 
                              className={`w-full max-w-[40px] bg-gradient-to-t ${item.color} rounded-t-lg shadow-md transition-all duration-700 group-hover:shadow-lg relative overflow-hidden`}
                              style={{ height: `${(item.value / 100) * 64}px` }}
                            >
                              <div className="absolute inset-0 bg-white/20"></div>
                            </div>
                            <span className="text-[11px] text-slate-600 font-medium">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Assessment Performance */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-5 flex items-center justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-500" />
                Assessment Performance
              </h2>
              <p className="text-sm text-slate-500">Quiz pass rates and difficulty analysis</p>
            </div>
            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="pl-8 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </motion.div>

          {/* Assessment Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessmentData
              .filter(a => difficultyFilter === 'all' || a.difficulty === difficultyFilter)
              .map((assessment, index) => (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.06 }}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-purple-300 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-slate-800 mb-1">{assessment.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{assessment.type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded border ${getDifficultyColor(assessment.difficulty)}`}>
                          {assessment.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pass Rate Circle */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="text-xs text-slate-500 mb-1">Pass Rate</div>
                      <div className={`text-2xl font-semibold ${getPassRateColor(assessment.passRate)}`}>
                        {assessment.passRate}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 mb-1">Avg Score</div>
                      <div className="text-2xl font-semibold text-slate-700">
                        {assessment.avgScore}%
            </div>
          </div>
        </div>

                  {/* Pass/Fail Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{assessment.totalAttempts} total attempts</span>
                    </div>
                    <div className="h-3 bg-slate-50 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                        style={{ width: `${(assessment.passed / assessment.totalAttempts) * 100}%` }}
                      />
                      <div 
                        className="bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-500"
                        style={{ width: `${(assessment.failed / assessment.totalAttempts) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-600 font-medium">{assessment.passed} passed</span>
                      <span className="text-rose-600 font-medium">{assessment.failed} failed</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModuleAnalytics;


