import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlayCircle, BookOpen, ChevronLeft, ChevronRight, Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { cn, filterByLanguage } from '../lib/utils';
import { useStore } from '../store/useStore';

export function Courses() {
  const { t } = useTranslation();
  const { user, courses, setIsAuthModalOpen, language } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const categories = useMemo(() => {
    const categoriesMap: Record<string, Set<string>> = {};
    courses.forEach(c => {
      if (c.isSingleVideo) return; // Masterclass
      const cat = c.category || 'Other';
      if (!categoriesMap[cat]) categoriesMap[cat] = new Set();
      if (c.subCategory) categoriesMap[cat].add(c.subCategory);
    });

    return [
      { name: "All", subCategories: [] },
      ...Object.keys(categoriesMap).map(k => ({
        name: k,
        subCategories: Array.from(categoriesMap[k])
      }))
    ];
  }, [courses]);

  const currentCategoryObj = categories.find(c => c.name === selectedCategory);

  const filteredCourses = useMemo(() => {
    return filterByLanguage(courses, language)
      .filter(c => {
        // Exclude single video courses (masterclasses)
        if (c.isSingleVideo) return false;
        const matchCat = selectedCategory === "All" || c.category === selectedCategory;
        const matchSub = selectedSubCategory === "All" || c.subCategory === selectedSubCategory;
        const matchQuery = !searchQuery || 
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.instructor?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSub && matchQuery;
      })
      .reverse(); // Organic courses from new to last
  }, [courses, selectedCategory, selectedSubCategory, searchQuery, language]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCourses, currentPage]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory("All");
    setCurrentPage(1);
  };

  const handleSubCategoryClick = (sub: string) => {
    setSelectedSubCategory(sub);
    setCurrentPage(1);
  };

  return (
    <div className="w-full px-4 md:px-8 py-8 max-w-[1600px] mx-auto">
      <div className="mb-6 lg:hidden flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('all_courses', 'All Playlists')}</h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 border border-border rounded-xl bg-card text-foreground"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
      {/* Smart Sidebar Filter */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: window.innerWidth >= 1024 ? 320 : '100%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="shrink-0 flex flex-col gap-6"
          >
            <div className="sticky top-24">
              <div className="bg-card border border-border p-5 rounded-3xl shadow-sm flex flex-col gap-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" /> {t('filters', 'Filters')}
                </h2>
            
            {/* Search */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder={t('search_courses', 'Search playlists...')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="block w-full ps-10 pe-10 py-3 border border-border rounded-xl bg-background text-sm text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:font-normal"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="absolute inset-y-0 end-0 pe-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs uppercase font-extrabold text-muted-foreground mb-3 tracking-widest ps-2">{t('categories', 'Categories')}</h3>
              <div className="flex flex-col gap-1.5">
                {categories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={cn(
                      "text-start px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex justify-between items-center group cursor-pointer",
                      selectedCategory === category.name 
                        ? "bg-primary text-primary-foreground shadow-sm" 
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {category.name === 'All' ? t('all') : category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-Categories */}
            <AnimatePresence>
              {currentCategoryObj && currentCategoryObj.subCategories.length > 0 && selectedCategory !== 'All' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <h3 className="text-xs uppercase font-extrabold text-muted-foreground mb-3 tracking-widest border-t border-border/50 pt-6 ps-2">{t('topics', 'Topics')}</h3>
                  <div className="flex flex-wrap gap-2 ps-2">
                    <button
                      onClick={() => handleSubCategoryClick("All")}
                      className={cn(
                        "px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200",
                        selectedSubCategory === "All" 
                          ? "bg-foreground text-background" 
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      All
                    </button>
                    {currentCategoryObj.subCategories.map(sub => (
                      <button
                        key={sub}
                        onClick={() => handleSubCategoryClick(sub)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200",
                          selectedSubCategory === sub 
                            ? "bg-foreground text-background" 
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
      )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="hidden lg:block mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">{t('all_courses', 'All Playlists')}</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl">{t('browse_entire_catalog', 'Explore all our available series and playlists from newest to oldest.')}</p>
        </div>

        {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-12">
        {currentItems.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
          >
            <div className="relative aspect-video overflow-hidden bg-muted">
              {course.language && (
                <div className="absolute top-3 end-3 z-10 bg-black/70 backdrop-blur text-white px-2.5 py-1 rounded-md text-[10px] uppercase font-black tracking-widest shadow-sm">
                  {course.language}
                </div>
              )}
              {course.thumbnail?.trim() ? (
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 flex items-center justify-center p-4">
                  <span className="text-muted-foreground font-medium text-center">{course.title}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-16 h-16 bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center shadow-2xl ps-1 text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                  <PlayCircle className="w-10 h-10" />
                </div>
              </div>
              <div className="absolute top-3 start-3 flex flex-wrap gap-2 pe-16 bg-gradient-to-b from-black/60 to-transparent w-full p-3 pt-0 ps-0 start-3">
                <div className="bg-background/95 backdrop-blur text-foreground px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
                  {course.category}
                </div>
                {course.subCategory && (
                  <div className="bg-primary/95 backdrop-blur text-primary-foreground px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
                    {course.subCategory}
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">{course.description}</p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-6 bg-muted/30 p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{course.videos.length} {t('videos')}</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-foreground">
                  {course.instructor}
                </div>
              </div>

              {user ? (
                <Link 
                  to={`/course/${course.id}`}
                  className="w-full py-3.5 bg-foreground text-background rounded-xl font-bold text-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-[0.98] shadow-md flex items-center justify-center relative overflow-hidden group/btn"
                >
                  <span className="relative z-10">{t('start_learning')}</span>
                </Link>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full py-3.5 bg-foreground text-background rounded-xl font-bold text-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-[0.98] shadow-md flex items-center justify-center relative overflow-hidden group/btn"
                >
                  <span className="relative z-10">{t('login_to_start')}</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
        {filteredCourses.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-card border border-dashed border-border rounded-3xl">
            <BookOpen className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-xl font-bold mb-2">{t('no_courses_found', 'No courses found')}</h3>
            <p className="text-muted-foreground">{t('try_different_category', 'Try selecting a different category or clearing your search.')}</p>
            <button 
              onClick={() => {
                handleCategoryClick('All');
                setSearchQuery('');
              }}
              className="mt-6 px-6 py-2 bg-primary/10 text-primary font-semibold rounded-full hover:bg-primary/20 transition-colors"
            >
              {t('clear_filters', 'Clear Filters')}
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-border bg-card text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center transition-all",
                  currentPage === page 
                    ? "bg-primary text-primary-foreground shadow-md scale-110" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-border bg-card text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180" />
          </button>
        </div>
      )}
      </div>
      </div>
    </div>
  );
}