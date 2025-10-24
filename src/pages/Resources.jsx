import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, FileText, Video, Headphones, Heart, Download, Eye, Bookmark, Sparkles, TrendingUp, BookOpen, Clock, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Workplace Safety & Harassment Prevention Resources
const sampleResources = [
  {
    id: 1,
    type: 'document',
    title: 'Sexual Harassment Prevention Training Guide',
    description: 'Complete 9-module training guide covering Introduction, Understanding Harassment & Discrimination, Four Forms of Sexual Harassment, Response Strategies, and Complaint Procedures. Essential for all employees.',
    tags: ['Training', 'Policy', 'Prevention'],
    fileSize: '3.2 MB',
    publishedDate: 'October 23, 2024',
    views: '4.5k',
    downloads: '1,250',
    rating: 5.0,
    image: '/assets/Workplace Compliance Awareness.PNG'
  },
  {
    id: 2,
    type: 'video',
    title: 'Bystander Intervention: Practical Techniques',
    description: 'Video training on how to safely intervene when witnessing harassment. Learn your role as an individual contributor, supervisor, or leader in creating workplace accountability and respect.',
    tags: ['Training', 'Intervention', 'Safety'],
    fileSize: '78 MB',
    publishedDate: 'October 15, 2024',
    views: '3.8k',
    downloads: '980',
    rating: 4.9,
    image: '/assets/communication.PNG'
  },
  {
    id: 3,
    type: 'document',
    title: 'Understanding Four Forms of Sexual Harassment',
    description: 'Detailed guide on quid pro quo, hostile work environment, verbal and non-verbal harassment. Includes real-world examples to recognize subtle and overt behaviors.',
    tags: ['Policy', 'Recognition', 'Examples'],
    fileSize: '2.8 MB',
    publishedDate: 'October 8, 2024',
    views: '3.2k',
    downloads: '890',
    rating: 4.8,
    image: '/assets/Course2.PNG'
  },
  {
    id: 4,
    type: 'document',
    title: 'Supervisor Guide: Responding to Complaints',
    description: 'Professional procedures for receiving, documenting, and escalating harassment complaints. Learn legal responsibilities and best practices for supporting affected employees.',
    tags: ['Supervisor', 'Compliance', 'Procedures'],
    fileSize: '4.1 MB',
    publishedDate: 'September 30, 2024',
    views: '2.9k',
    downloads: '720',
    rating: 4.9,
    image: '/assets/LAw.PNG'
  },
  {
    id: 5,
    type: 'video',
    title: 'Building a Respectful Workplace Culture',
    description: 'Strategic approaches to creating and maintaining a culture of respect, inclusion, and zero tolerance for harassment. Essential viewing for all organizational leaders.',
    tags: ['Culture', 'Leadership', 'Prevention'],
    fileSize: '95 MB',
    publishedDate: 'September 22, 2024',
    views: '2.4k',
    downloads: '640',
    rating: 4.7,
    image: '/assets/Course.jpg'
  },
  {
    id: 6,
    type: 'document',
    title: 'Employee Rights & Reporting Procedures',
    description: 'Know your rights and responsibilities under harassment prevention policies. Learn reporting procedures, support resources, and how to take appropriate action confidently.',
    tags: ['Rights', 'Procedures', 'Support'],
    fileSize: '1.9 MB',
    publishedDate: 'September 15, 2024',
    views: '5.1k',
    downloads: '1,450',
    rating: 5.0,
    image: '/assets/Workplace Compliance Awareness.PNG'
  }
];

const featuredResource = {
  id: 'featured-1',
  type: 'video',
  title: 'Preventing Sexual Harassment in the Workplace - Complete Training',
  description: 'Comprehensive training covering all 9 lessons: Introduction, Understanding Harassment, Four Forms of Sexual Harassment, Response Strategies, Bystander Intervention, Supervisor Prevention, and Complaint Procedures. Every employee has the right to a safe, respectful, and inclusive work environment.',
  tags: ['Training', 'Prevention', 'Compliance', 'Mandatory'],
  fileSize: '156 MB',
  publishedDate: 'October 23, 2024',
  views: '8.2k',
  rating: 5.0,
  duration: '2 hours 15 minutes'
};

const Resources = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  const filters = [
    { key: 'training', label: 'Training Materials' },
    { key: 'policy', label: 'Policy & Compliance' },
    { key: 'prevention', label: 'Prevention Strategies' },
    { key: 'supervisor', label: 'Supervisor Resources' },
    { key: 'intervention', label: 'Bystander Intervention' },
    { key: 'procedures', label: 'Reporting Procedures' }
  ];

  const languages = [
    { code: 'en', label: t('resources.languages.en'), flag: '🇬🇧' },
    { code: 'ar', label: t('resources.languages.ar'), flag: '🇸🇦' },
    { code: 'de', label: t('resources.languages.de'), flag: '🇩🇪' }
  ];

  const toggleFilter = (filterKey) => {
    setActiveFilters(prev => 
      prev.includes(filterKey)
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const toggleBookmark = (resourceId) => {
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
      } else {
        newSet.add(resourceId);
      }
      return newSet;
    });
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'document':
        return <FileText className="h-10 w-10" />;
      case 'video':
        return <Video className="h-10 w-10" />;
      case 'audio':
        return <Headphones className="h-10 w-10" />;
      default:
        return <FileText className="h-10 w-10" />;
    }
  };

  const filteredResources = sampleResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilters.length === 0 || 
                         activeFilters.some(filter => 
                           resource.tags.some(tag => 
                             tag.toLowerCase().includes(filter.toLowerCase().replace(/([A-Z])/g, ' $1').trim())
                           )
                         );
    
    return matchesSearch && matchesFilter;
  });

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedIndex(prev => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50/50">
      {/* Premium Blue Header */}
      <div className="relative bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            {/* Left side: Title */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 text-xs font-semibold border border-blue-200">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Workplace Safety Resources
                </Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                Sexual Harassment Prevention Resource Library
              </h1>
              <p className="text-base text-gray-600 max-w-3xl leading-relaxed">
                Essential training materials, policy guides, and resources to create a safe, respectful, and inclusive workplace. Access comprehensive harassment prevention content for all employees, supervisors, and leaders.
              </p>
            </div>
          </div>

          {/* Premium Blue Search Bar and Language Switcher */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative group">
              <div className="relative flex items-center">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors">
                  <Search className="h-4 w-4" />
                </div>
          <Input
            type="text"
                  placeholder={t('resources.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-5 text-sm rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm hover:shadow-md bg-white"
                />
              </div>
            </div>
            
            {/* Premium Blue Language Switcher */}
            <Select value={i18n.language} onValueChange={changeLanguage}>
              <SelectTrigger className="sm:w-48 py-5 rounded-xl border-2 border-gray-200 hover:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm hover:shadow-md bg-white font-medium text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {languages.find(l => l.code === i18n.language)?.flag}
                  </span>
                  <SelectValue placeholder="Language" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-lg border-2">
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code} className="py-2.5 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Premium Blue Filters */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-xs font-bold text-gray-700 whitespace-nowrap mr-1 uppercase tracking-wide">Filter:</span>
            {filters.map(filter => (
              <motion.button
                key={filter.key}
                onClick={() => toggleFilter(filter.key)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 border text-sm",
                  activeFilters.includes(filter.key)
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:shadow-sm"
                )}
              >
                {filter.label}
              </motion.button>
            ))}
            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="px-4 py-2 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap border border-gray-300 hover:border-gray-400"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Premium Blue Resource Cards */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {filteredResources.length} {filteredResources.length === 1 ? 'Resource' : 'Resources'}
              </h2>
              {searchQuery && (
                <Badge variant="secondary" className="px-3 py-1 text-xs bg-blue-50 border border-blue-200 text-blue-700">
                  Search: "{searchQuery}"
                </Badge>
              )}
        </div>

            <AnimatePresence mode="popLayout">
              {filteredResources.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-2xl border-2 border-dashed border-gray-200"
                >
                  <div className="p-6 bg-blue-50 rounded-full mb-4 border-2 border-blue-100">
                    <Search className="h-12 w-12 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('resources.noResults')}</h3>
                  <p className="text-gray-500 text-center max-w-md text-sm">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="space-y-6"
                >
                  {filteredResources.map((resource, index) => (
                    <motion.div
                    key={resource.id} 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-500 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Icon Section */}
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300 shadow-lg">
                              {getFileIcon(resource.type)}
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                                {resource.title}
                              </h3>
                              <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                                <Star className="h-3.5 w-3.5 text-blue-600 fill-blue-600" />
                                <span className="font-bold text-xs text-blue-600">{resource.rating}</span>
                              </div>
                            </div>

                            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                              {resource.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {resource.tags.map(tag => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-3 py-0.5 font-semibold"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100 text-xs text-gray-600">
                              <div className="flex items-center gap-1.5">
                                <Eye className="h-3.5 w-3.5 text-blue-500" />
                                <span className="font-medium">{resource.views}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Download className="h-3.5 w-3.5 text-blue-500" />
                                <span className="font-medium">{resource.downloads}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5 text-blue-500" />
                                <span className="font-medium">{resource.publishedDate}</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 bg-blue-600 text-white hover:bg-blue-700 font-semibold py-4 text-sm rounded-lg shadow-md hover:shadow-lg transition-all">
                                <Eye className="h-4 w-4 mr-1.5" />
                                {t('resources.card.view')}
                              </Button>
                              <Button size="sm" variant="outline" className="border border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500 transition-all py-4 px-4 rounded-lg font-semibold">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleBookmark(resource.id)}
                                className={cn(
                                  "border transition-all py-4 px-4 rounded-lg font-semibold",
                                  bookmarkedItems.has(resource.id) 
                                    ? "bg-blue-50 text-blue-600 border-blue-500" 
                                    : "border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500"
                                )}
                              >
                                <Heart
                                  className={cn(
                                    "h-4 w-4",
                                    bookmarkedItems.has(resource.id) && "fill-current"
                                  )}
                                />
                              </Button>
                            </div>
                      </div>
                    </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Premium Blue Featured Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Featured Resource */}
              <motion.div
                key={currentFeaturedIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-6 text-white shadow-xl border-2 border-blue-500"
              >
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-wider">
                      {currentFeaturedIndex === 0 
                        ? t('resources.featured.title')
                        : t('resources.featured.recommended')}
                    </span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-4 flex items-center justify-center border border-white/20">
                    <Video className="h-16 w-16 text-white" />
      </div>

                  <div className="flex items-center gap-1.5 mb-3">
                    <Star className="h-4 w-4 text-white fill-white" />
                    <span className="font-bold text-base">{featuredResource.rating}</span>
                  </div>

                  <h4 className="font-bold text-lg mb-3 leading-tight">{featuredResource.title}</h4>
                  <p className="text-blue-100 text-sm mb-4 leading-relaxed line-clamp-3">
                    {featuredResource.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredResource.tags.slice(0, 3).map(tag => (
                      <Badge
                        key={tag}
                        className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-2.5 py-0.5 font-semibold text-xs"
                      >
                        {tag}
                      </Badge>
                ))}
              </div>

                  <div className="flex items-center gap-4 mb-4 text-xs">
                    <div className="flex items-center gap-1.5 text-blue-100">
                      <Clock className="h-3.5 w-3.5" />
                      <span className="font-medium">{featuredResource.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-100">
                      <Eye className="h-3.5 w-3.5" />
                      <span className="font-medium">{featuredResource.views} views</span>
                    </div>
                  </div>

                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-5 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm">
                    <Sparkles className="h-4 w-4 mr-1.5" />
                    {featuredResource.type === 'video' 
                      ? t('resources.featured.watchNow')
                      : t('resources.featured.readMore')}
                  </Button>

                  {/* Progress dots */}
                  <div className="flex justify-center gap-2 mt-5">
                    {[0, 1, 2].map(index => (
                      <button
                        key={index}
                        onClick={() => setCurrentFeaturedIndex(index)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          currentFeaturedIndex === index 
                            ? "bg-white w-8" 
                            : "bg-white/40 w-1.5 hover:bg-white/70"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
