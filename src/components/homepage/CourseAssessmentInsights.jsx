import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Target, Award, AlertCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, PieChart, Pie, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line
} from 'recharts';
import { cn } from '@/lib/utils';

// Sample data
const moduleProgressData = [
  { name: 'Module 1', completion: 85, engagement: 90 },
  { name: 'Module 2', completion: 70, engagement: 75 },
  { name: 'Module 3', completion: 45, engagement: 60 },
  { name: 'Module 4', completion: 20, engagement: 30 },
];

const assessmentData = [
  { name: 'Correct', value: 65, color: '#86efac' },
  { name: 'Incorrect', value: 25, color: '#fca5a5' },
  { name: 'Unattempted', value: 10, color: '#cbd5e1' },
];

// Heatmap data for module engagement
const heatmapData = [
  { module: 'Module 1', week1: 90, week2: 85, week3: 88, week4: 92 },
  { module: 'Module 2', week1: 75, week2: 80, week3: 78, week4: 85 },
  { module: 'Module 3', week1: 60, week2: 65, week3: 70, week4: 68 },
  { module: 'Module 4', week1: 30, week2: 35, week3: 40, week4: 45 },
];

const difficultyData = [
  { difficulty: 'Easy', score: 85 },
  { difficulty: 'Medium', score: 70 },
  { difficulty: 'Hard', score: 55 },
];

const pathwayData = [
  { module: 'Basics', recommended: 100, actual: 100 },
  { module: 'Intermediate', recommended: 100, actual: 80 },
  { module: 'Advanced', recommended: 100, actual: 40 },
  { module: 'Expert', recommended: 100, actual: 0 },
];

const strengthsWeaknesses = {
  strengths: [
    { topic: 'Labour Laws', score: 92, difficulty: 'Easy' },
    { topic: 'Digital Tools', score: 88, difficulty: 'Medium' },
    { topic: 'Compliance', score: 85, difficulty: 'Easy' },
  ],
  weaknesses: [
    { topic: 'Advanced Policies', score: 45, difficulty: 'Hard' },
    { topic: 'Legal Framework', score: 52, difficulty: 'Hard' },
    { topic: 'Case Studies', score: 58, difficulty: 'Medium' },
  ],
};

const translations = {
  en: {
    title: 'Course & Assessment Insights',
    subtitle: 'Track your learning progress and performance',
    moduleProgress: 'Module Progress',
    completion: 'Completion',
    engagement: 'Engagement',
    pathwayTracker: 'Pathway Tracker',
    recommended: 'Recommended',
    actual: 'Actual Progress',
    pathwayMatch: 'following recommended path',
    assessmentBreakdown: 'Assessment Breakdown',
    correct: 'Correct',
    incorrect: 'Incorrect',
    unattempted: 'Unattempted',
    difficultyAnalysis: 'Difficulty Analysis',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    strengths: 'Top Strengths',
    weaknesses: 'Areas to Improve',
    score: 'Score',
    topic: 'Topic',
    engagementHeatmap: 'Engagement Heatmap',
    module: 'Module',
    week: 'Week',
    legend: 'Legend',
  },
  ar: {
    title: 'رؤى الدورة والتقييم',
    subtitle: 'تتبع تقدمك في التعلم والأداء',
    moduleProgress: 'تقدم الوحدات',
    completion: 'الإكمال',
    engagement: 'التفاعل',
    pathwayTracker: 'متتبع المسار التعليمي',
    recommended: 'الموصى به',
    actual: 'التقدم الفعلي',
    pathwayMatch: 'اتباع المسار الموصى به',
    assessmentBreakdown: 'تحليل التقييمات',
    correct: 'صحيح',
    incorrect: 'خاطئ',
    unattempted: 'لم تتم المحاولة',
    difficultyAnalysis: 'تحليل مستوى الصعوبة',
    easy: 'سهل',
    medium: 'متوسط',
    hard: 'صعب',
    strengths: 'نقاط القوة الرئيسية',
    weaknesses: 'مجالات التحسين',
    score: 'النتيجة',
    topic: 'الموضوع',
    engagementHeatmap: 'خريطة التفاعل الحرارية',
    module: 'الوحدة',
    week: 'الأسبوع',
    legend: 'وسيلة الإيضاح',
  },
};

export function CourseAssessmentInsights() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState('en');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const t = translations[language];

  const slides = [
    { id: 'module-progress', component: 'ModuleProgress' },
    { id: 'pathway-tracker', component: 'PathwayTracker' },
    { id: 'assessment-breakdown', component: 'AssessmentBreakdown' },
    { id: 'engagement-heatmap', component: 'EngagementHeatmap' },
    { id: 'strengths-weaknesses', component: 'StrengthsWeaknesses' },
  ];

  const pathwayCompletion = Math.round(
    (pathwayData.reduce((acc, item) => acc + item.actual, 0) / 
    pathwayData.reduce((acc, item) => acc + item.recommended, 0)) * 100
  );

  // Auto-swipe every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const renderSlide = () => {
    const slide = slides[currentSlide];

    switch (slide.component) {
      case 'ModuleProgress':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{t.moduleProgress}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
                  <div className="w-4 h-4 bg-blue-400 rounded"></div>
                  <span className="font-medium">{t.completion}</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-lg">
                  <div className="w-4 h-4 bg-purple-400 rounded"></div>
                  <span className="font-medium">{t.engagement}</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={moduleProgressData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#374151', fontWeight: 500 }} />
                <YAxis tick={{ fontSize: 14, fill: '#374151', fontWeight: 500 }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '13px',
                    padding: '10px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                <Bar dataKey="completion" fill="#93c5fd" name="Completion %" radius={[8, 8, 0, 0]} barSize={50} />
                <Bar dataKey="engagement" fill="#c4b5fd" name="Engagement %" radius={[8, 8, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'PathwayTracker':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{t.pathwayTracker}</h3>
              <div className="text-base font-bold text-blue-700 bg-blue-100 px-4 py-2 rounded-full border-2 border-blue-300">
                {pathwayCompletion}% {t.pathwayMatch}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={pathwayData} layout="horizontal" margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 14, fill: '#374151', fontWeight: 500 }} domain={[0, 100]} />
                <YAxis dataKey="module" type="category" tick={{ fontSize: 14, fill: '#374151', fontWeight: 500 }} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '13px',
                    padding: '10px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                <Bar dataKey="recommended" fill="#e0e7ff" name={t.recommended} radius={[0, 8, 8, 0]} barSize={30} />
                <Bar dataKey="actual" fill="#93c5fd" name={t.actual} radius={[0, 8, 8, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'AssessmentBreakdown':
        return (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.assessmentBreakdown}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={assessmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                    labelLine={false}
                  >
                    {assessmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={3} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '13px',
                      padding: '10px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2.5 mt-2">
                {assessmentData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-800 font-medium">{t[item.name.toLowerCase()]}</span>
                    </div>
                    <span className="font-bold text-gray-900 text-base">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.difficultyAnalysis}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={difficultyData}>
                  <PolarGrid stroke="#cbd5e1" strokeWidth={2} />
                  <PolarAngleAxis dataKey="difficulty" tick={{ fontSize: 14, fill: '#374151', fontWeight: 600 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Radar 
                    name="Score" 
                    dataKey="score" 
                    stroke="#60a5fa" 
                    fill="#93c5fd" 
                    fillOpacity={0.7}
                    strokeWidth={3}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '13px',
                      padding: '10px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {difficultyData.map((item) => (
                  <div key={item.difficulty} className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                    <span className="text-sm font-medium text-gray-800">{item.difficulty}</span>
                    <span className="font-bold text-blue-600 text-base">{item.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'EngagementHeatmap':
        const getHeatmapColor = (value) => {
          if (value >= 80) return '#d1fae5'; // Very light green
          if (value >= 60) return '#fef3c7'; // Very light yellow
          if (value >= 40) return '#fed7aa'; // Very light orange
          return '#fecaca'; // Very light red
        };

        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">{t.engagementHeatmap}</h3>
            </div>
            
            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 bg-gray-100 rounded-tl-lg font-bold text-gray-800">
                      {t.module}
                    </th>
                    <th className="text-center p-3 bg-gray-100 font-bold text-gray-800">{t.week} 1</th>
                    <th className="text-center p-3 bg-gray-100 font-bold text-gray-800">{t.week} 2</th>
                    <th className="text-center p-3 bg-gray-100 font-bold text-gray-800">{t.week} 3</th>
                    <th className="text-center p-3 bg-gray-100 rounded-tr-lg font-bold text-gray-800">{t.week} 4</th>
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((row, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="p-3 font-semibold text-gray-800 bg-gray-50">
                        {row.module}
                      </td>
                      <td className="p-3 text-center">
                        <div 
                          className="mx-auto w-16 h-16 rounded-lg flex items-center justify-center font-bold text-gray-700 text-base border-2 border-gray-200 shadow-sm transition-transform hover:scale-110"
                          style={{ backgroundColor: getHeatmapColor(row.week1) }}
                        >
                          {row.week1}%
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div 
                          className="mx-auto w-16 h-16 rounded-lg flex items-center justify-center font-bold text-gray-700 text-base border-2 border-gray-200 shadow-sm transition-transform hover:scale-110"
                          style={{ backgroundColor: getHeatmapColor(row.week2) }}
                        >
                          {row.week2}%
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div 
                          className="mx-auto w-16 h-16 rounded-lg flex items-center justify-center font-bold text-gray-700 text-base border-2 border-gray-200 shadow-sm transition-transform hover:scale-110"
                          style={{ backgroundColor: getHeatmapColor(row.week3) }}
                        >
                          {row.week3}%
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div 
                          className="mx-auto w-16 h-16 rounded-lg flex items-center justify-center font-bold text-gray-700 text-base border-2 border-gray-200 shadow-sm transition-transform hover:scale-110"
                          style={{ backgroundColor: getHeatmapColor(row.week4) }}
                        >
                          {row.week4}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-6 bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-semibold text-gray-700">{t.legend}:</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#fecaca] border-2 border-gray-300"></div>
                <span className="text-sm text-gray-700">Low (&lt;40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#fed7aa] border-2 border-gray-300"></div>
                <span className="text-sm text-gray-700">Medium (40-59%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#fef3c7] border-2 border-gray-300"></div>
                <span className="text-sm text-gray-700">Good (60-79%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#d1fae5] border-2 border-gray-300"></div>
                <span className="text-sm text-gray-700">Excellent (≥80%)</span>
              </div>
            </div>
          </div>
        );

      case 'StrengthsWeaknesses':
        return (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-bold text-gray-900">{t.strengths}</h3>
              </div>
              <div className="space-y-3">
                {strengthsWeaknesses.strengths.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-gray-900">{item.topic}</span>
                      <span className="text-2xl font-bold text-green-500">{item.score}%</span>
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-green-300 to-green-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium bg-white border border-green-200 px-2 py-1 rounded-full">{item.difficulty}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-6 w-6 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-900">{t.weaknesses}</h3>
              </div>
              <div className="space-y-3">
                {strengthsWeaknesses.weaknesses.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-gray-900">{item.topic}</span>
                      <span className="text-2xl font-bold text-orange-500">{item.score}%</span>
                    </div>
                    <div className="w-full bg-orange-100 rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-orange-300 to-orange-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium bg-white border border-orange-200 px-2 py-1 rounded-full">{item.difficulty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t.title}</h2>
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
        </div>
        
        {/* Language Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-semibold transition-all",
              language === 'en' 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            🇬🇧 EN
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-semibold transition-all",
              language === 'ar' 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            🇸🇦 AR
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative min-h-[480px]">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>

        {/* Slide Content */}
        <div className="px-12 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[420px]"
            >
              {renderSlide()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentSlide === idx 
                  ? "w-8 bg-blue-600" 
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseAssessmentInsights;

