import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Award, BookOpen, Star, Crown, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const Catalog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCatalogOpen, setIsAddCatalogOpen] = useState(false);
  const [isEditCatalogOpen, setIsEditCatalogOpen] = useState(false);
  const [editingCatalog, setEditingCatalog] = useState(null);
  const [newCatalogName, setNewCatalogName] = useState('');
  const [newCatalogDescription, setNewCatalogDescription] = useState('');
  
  // Workplace Safety & Harassment Prevention Catalogs
  const [catalogs, setCatalogs] = useState([
    // FREE COURSES - Based on SCORM Training Content
    {
      id: 1,
      nameKey: 'preventingSexualHarassment',
      name: 'Preventing Sexual Harassment in the Workplace',
      description: 'Complete 9-lesson course: Introduction, Understanding Harassment & Discrimination, What Is Sexual Harassment, Four Forms, Response Strategies, Bystander Intervention, and more. Build a safe, respectful workplace culture.',
      imageUrl: '/assets/Workplace Compliance Awareness.PNG',
      courseCount: 9,
      category: 'Free',
      level: 'Beginner',
      featured: true,
      prize: 'Sexual Harassment Prevention Certificate'
    },
    {
      id: 2,
      nameKey: 'understandingHarassment',
      name: 'Understanding Harassment and Discrimination',
      description: 'Learn the key differences between harassment and discrimination. Understand legal definitions, recognize violations of trust and dignity, and identify behaviors that affect workplace culture.',
      imageUrl: '/assets/Course2.PNG',
      courseCount: 3,
      category: 'Free',
      level: 'Beginner',
      featured: true,
      prize: 'Awareness Specialist Badge'
    },
    {
      id: 3,
      nameKey: 'fourFormsOfHarassment',
      name: 'Four Forms of Sexual Harassment',
      description: 'Deep dive into the four main categories: quid pro quo, hostile work environment, verbal harassment, and non-verbal harassment. Learn to recognize subtle and overt behaviors through real examples.',
      imageUrl: '/assets/communication.PNG',
      courseCount: 4,
      category: 'Free',
      level: 'Beginner',
      featured: false,
      prize: 'Recognition Expert Badge'
    },
    
    // PREMIUM COURSES - Advanced Training
    {
      id: 4,
      nameKey: 'bystanderIntervention',
      name: 'Bystander Intervention: Taking Action Safely',
      description: 'Practical techniques to safely intervene when witnessing harassment. Learn your role as an individual contributor, supervisor, or leader in creating accountability and fostering respect.',
      imageUrl: '/assets/LAw.PNG',
      courseCount: 5,
      category: 'Premium',
      level: 'Intermediate',
      featured: true,
      prize: 'Active Bystander Certification'
    },
    {
      id: 5,
      nameKey: 'supervisorPrevention',
      name: 'Preventing Sexual Harassment as a Supervisor',
      description: 'Advanced training for leaders on preventing harassment, handling complaints with confidentiality, understanding legal responsibilities, and fostering proactive communication in your team.',
      imageUrl: '/assets/Workplace Compliance Awareness.PNG',
      courseCount: 6,
      category: 'Premium',
      level: 'Advanced',
      featured: true,
      prize: 'Leadership Excellence Certificate'
    },
    {
      id: 6,
      nameKey: 'respondingToComplaints',
      name: 'Responding to Sexual Harassment Complaints',
      description: 'Professional procedures for receiving, documenting, and escalating harassment complaints. Learn reporting procedures, support resources, and how to take appropriate action confidently and responsibly.',
      imageUrl: '/assets/Course.jpg',
      courseCount: 4,
      category: 'Premium',
      level: 'Advanced',
      featured: false,
      prize: 'Compliance Officer Certification'
    }
  ]);

  // Filter catalogs based on search query
  const filteredCatalogs = catalogs.filter(catalog => {
    const catalogName = catalog.name || t(`catalog.sampleCatalogs.${catalog.nameKey}.name`);
    const catalogDescription = catalog.description || t(`catalog.sampleCatalogs.${catalog.nameKey}.description`);
    
    return catalogName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           catalogDescription.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Group catalogs by category
  const freeCatalogs = filteredCatalogs.filter(catalog => catalog.category === 'Free');
  const premiumCatalogs = filteredCatalogs.filter(catalog => catalog.category === 'Premium');

  const handleAddCatalog = () => {
    if (newCatalogName.trim()) {
      const newCatalog = {
        id: Date.now(),
        name: newCatalogName,
        description: newCatalogDescription,
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format',
        courseCount: 0
      };
      setCatalogs([...catalogs, newCatalog]);
      setNewCatalogName('');
      setNewCatalogDescription('');
      setIsAddCatalogOpen(false);
      toast({
        title: t('catalog.toasts.catalogCreated'),
        description: t('catalog.toasts.catalogCreatedSuccess', { name: newCatalogName }),
      });
    }
  };

  const handleEditCatalog = (catalog) => {
    setEditingCatalog(catalog);
    setNewCatalogName(catalog.name);
    setNewCatalogDescription(catalog.description);
    setIsEditCatalogOpen(true);
  };

  const handleUpdateCatalog = () => {
    if (editingCatalog && newCatalogName.trim()) {
      setCatalogs(catalogs.map(catalog =>
        catalog.id === editingCatalog.id
          ? { ...catalog, name: newCatalogName, description: newCatalogDescription }
          : catalog
      ));
      setIsEditCatalogOpen(false);
      setEditingCatalog(null);
      setNewCatalogName('');
      setNewCatalogDescription('');
      toast({
        title: t('catalog.toasts.catalogUpdated'),
        description: t('catalog.toasts.catalogUpdatedSuccess'),
      });
    }
  };

  const handleDeleteCatalog = (catalogId, catalogName) => {
    if (window.confirm(t('catalog.deleteConfirm', { name: catalogName }))) {
      setCatalogs(catalogs.filter(catalog => catalog.id !== catalogId));
      toast({
        title: t('catalog.toasts.catalogDeleted'),
        description: t('catalog.toasts.catalogDeletedSuccess', { name: catalogName }),
      });
    }
  };

  const handleCatalogClick = (catalog) => {
    const catalogName = catalog.name || t(`catalog.sampleCatalogs.${catalog.nameKey}.name`);
    navigate(`/catalog/${catalogName.toLowerCase().replace(/\s+/g, '-')}`, {
      state: { catalog }
    });
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workplace Safety Training Catalog</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive courses on harassment prevention, workplace safety, and professional conduct
          </p>
        </div>
        
        <Button onClick={() => setIsAddCatalogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t('catalog.addCatalog')}
        </Button>
      </div>
      
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder={t('catalog.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* Free Courses Section */}
      {freeCatalogs.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-black rounded-xl">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t('catalog.freeCourses')}</h2>
              <p className="text-sm text-gray-500 mt-1">{t('catalog.freeCoursesDescription')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freeCatalogs.map((catalog) => (
          <Card 
            key={catalog.id}
                className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-white border-2 border-gray-200 hover:border-gray-900 group relative"
              >
                {/* Featured Badge */}
                {catalog.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-black text-white border-0 shadow-xl flex items-center gap-1.5 px-3 py-1.5 font-semibold text-xs tracking-wide">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {t('catalog.featured')}
                    </Badge>
                  </div>
                )}

                <div 
                  className="h-56 relative overflow-hidden bg-gray-100"
              onClick={() => handleCatalogClick(catalog)}
            >
              <img 
                src={catalog.imageUrl} 
                alt={catalog.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-95" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Level Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/95 text-gray-900 border-0 shadow-lg backdrop-blur-sm font-bold text-xs tracking-wide px-3 py-1.5">
                      {catalog.level}
                    </Badge>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl mb-1 line-clamp-2 drop-shadow-2xl tracking-tight">
                      {catalog.name}
                    </h3>
              </div>
            </div>
            
            <CardContent className="p-6" onClick={() => handleCatalogClick(catalog)}>
                  <p className="text-sm text-gray-600 mb-5 line-clamp-3 min-h-[60px] leading-relaxed">
                    {catalog.description}
                  </p>

                  {/* Prize Section */}
                  <div className="mb-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2.5">
                      <Award className="h-4 w-4 text-gray-900 flex-shrink-0" />
                      <span className="text-xs font-semibold text-gray-900 line-clamp-1 tracking-wide">
                        {catalog.prize}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <BookOpen className="h-4 w-4 text-gray-900" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium tracking-wide">{t('catalog.courses')}</p>
                        <p className="text-lg font-bold text-gray-900">{catalog.courseCount}</p>
                      </div>
                    </div>
                    <Badge className="bg-black text-white border-0 font-bold text-xs tracking-wider px-4 py-2">
                      {t('catalog.free')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Premium Courses Section */}
      {premiumCatalogs.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t('catalog.premiumCourses')}</h2>
              <p className="text-sm text-gray-500 mt-1">{t('catalog.premiumCoursesDescription')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumCatalogs.map((catalog) => (
              <Card 
                key={catalog.id}
                className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-800 hover:border-gray-600 group relative"
              >
                {/* Featured Badge */}
                {catalog.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-white text-gray-900 border-0 shadow-xl flex items-center gap-1.5 px-3 py-1.5 font-semibold text-xs tracking-wide">
                      <Crown className="h-3.5 w-3.5 fill-current" />
                      {t('catalog.premium')}
                    </Badge>
                  </div>
                )}

                <div 
                  className="h-56 relative overflow-hidden bg-gray-800"
                  onClick={() => handleCatalogClick(catalog)}
                >
                  <img 
                    src={catalog.imageUrl} 
                    alt={catalog.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-90" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  {/* Level Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900 border-0 shadow-lg backdrop-blur-sm font-bold text-xs tracking-wide px-3 py-1.5">
                      {catalog.level}
                    </Badge>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl mb-1 line-clamp-2 drop-shadow-2xl tracking-tight">
                      {catalog.name}
                    </h3>
                  </div>
                </div>
                
                <CardContent className="p-6 bg-gradient-to-br from-gray-900 to-gray-800" onClick={() => handleCatalogClick(catalog)}>
                  <p className="text-sm text-gray-300 mb-5 line-clamp-3 min-h-[60px] leading-relaxed">
                    {catalog.description}
                  </p>

                  {/* Prize Section */}
                  <div className="mb-5 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-2.5">
                      <Award className="h-4 w-4 text-white flex-shrink-0" />
                      <span className="text-xs font-semibold text-white line-clamp-1 tracking-wide">
                        {catalog.prize}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-800 rounded-lg">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium tracking-wide">{t('catalog.courses')}</p>
                        <p className="text-lg font-bold text-white">{catalog.courseCount}</p>
                      </div>
                    </div>
                    <Badge className="bg-white text-gray-900 border-0 font-bold text-xs tracking-wider px-4 py-2 flex items-center gap-1.5">
                      <Crown className="h-3 w-3" />
                      {t('catalog.premium')}
                    </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
        </div>
      )}
      
      {filteredCatalogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t('catalog.noCatalogsFound')}</p>
        </div>
      )}

      {/* Add Catalog Dialog */}
      <Dialog open={isAddCatalogOpen} onOpenChange={setIsAddCatalogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('catalog.createNewCatalog')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="catalogName">{t('catalog.catalogName')}</Label>
              <Input
                id="catalogName"
                value={newCatalogName}
                onChange={(e) => setNewCatalogName(e.target.value)}
                placeholder={t('catalog.enterCatalogName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catalogDescription">{t('catalog.description')}</Label>
              <Textarea
                id="catalogDescription"
                value={newCatalogDescription}
                onChange={(e) => setNewCatalogDescription(e.target.value)}
                placeholder={t('catalog.enterCatalogDescription')}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCatalogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleAddCatalog} disabled={!newCatalogName.trim()}>
              {t('catalog.createCatalog')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Catalog Dialog */}
      <Dialog open={isEditCatalogOpen} onOpenChange={setIsEditCatalogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('catalog.editCatalog')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editCatalogName">{t('catalog.catalogName')}</Label>
              <Input
                id="editCatalogName"
                value={newCatalogName}
                onChange={(e) => setNewCatalogName(e.target.value)}
                placeholder={t('catalog.enterCatalogName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editCatalogDescription">{t('catalog.description')}</Label>
              <Textarea
                id="editCatalogDescription"
                value={newCatalogDescription}
                onChange={(e) => setNewCatalogDescription(e.target.value)}
                placeholder={t('catalog.enterCatalogDescription')}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCatalogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleUpdateCatalog} disabled={!newCatalogName.trim()}>
              {t('catalog.updateCatalog')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Catalog;