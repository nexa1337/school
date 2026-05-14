import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlayCircle, BookOpen, Code, Terminal, Layout, Database, Shield, ArrowRight, Zap, Target, Award, CheckCircle2, ChevronRight, Video, Users, Github, Youtube, Cloud, Search, BarChart3, Star, Layers } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { useStore } from '../store/useStore';
import { filterByLanguage, filterPathsByLanguage } from '../lib/utils';

const iconMap: Record<string, any> = {
  Code,
  Terminal,
  Layout,
  Database,
  Shield
};

function PartnersSection() {
  const { t } = useTranslation();
  const partners = [
    { name: 'YouTube', icon: Youtube },
    { name: 'GitHub', icon: Github },
    { name: 'Vercel', icon: Zap },
    { name: 'Firebase', icon: Database },
    { name: 'Google Cloud', icon: Cloud },
    { name: 'Google Analytics', icon: BarChart3 }
  ];

  return (
    <div className="w-full bg-background border-y border-border/50 py-8 overflow-hidden relative">
      <div className="absolute start-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute end-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
      
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">{t('trusted_integrated_with', 'Trusted by & Integrated With')}</p>
      
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Double the array for seamless infinite scroll */}
        {[...partners, ...partners, ...partners].map((partner, idx) => {
          const Icon = partner.icon;
          return (
            <div key={idx} className="flex items-center gap-2 mx-8 text-foreground/60 hover:text-foreground transition-colors cursor-pointer grayscale hover:grayscale-0">
              <Icon className="w-6 h-6" />
              <span className="font-bold text-lg">{partner.name}</span>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

function ModernHero() {
  const { t } = useTranslation();
  const { language } = useStore();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      className="relative w-full overflow-hidden bg-zinc-950 py-20 lg:py-32 min-h-[90vh] flex items-center justify-center group"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
      
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full mt-10">
        <motion.div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-8 hover:bg-primary/20 transition-colors cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-primary/90">{t('hero_trust', '100% Free • Curated Content • No Distractions')}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, type: 'spring', bounce: 0.3 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-[1.05] text-white"
          >
            <span className="inline-block">{t('hero_title_1', 'Learn Without Distractions.')}</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 inline-block mt-2">{t('hero_title_2', 'Build Real Skills.')}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            {t('hero_subtitle', 'N E X A 1337 is a structured learning platform that organizes the best free YouTube courses into clear paths. Stay focused, save time, and actually finish what you start.')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto justify-center"
          >
            <Link 
              to="/courses" 
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center gap-2">{t('start_learning')} <ArrowRight className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" /></span>
            </Link>
            
            <Link 
              to="/paths"
              className="px-8 py-4 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 text-white hover:bg-zinc-800 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-1"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              <Layers className="w-5 h-5 text-fuchsia-500" /> {t('explore_paths')}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
        className="absolute top-[20%] left-[15%] hidden lg:flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800/50 shadow-2xl backdrop-blur-xl z-0 text-fuchsia-500 opacity-60"
      >
        <Code size={32} />
      </motion.div>
      <motion.div 
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
        className="absolute bottom-[20%] right-[15%] hidden lg:flex items-center justify-center w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800/50 shadow-2xl backdrop-blur-xl z-0 text-violet-500 opacity-60"
      >
        <Terminal size={40} />
      </motion.div>
      <motion.div 
        animate={{ y: [-15, 15, -15], rotate: [5, -5, 5] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
        className="absolute top-[30%] right-[25%] hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800/50 shadow-2xl backdrop-blur-xl z-0 text-cyan-500 opacity-50"
      >
        <Database size={24} />
      </motion.div>
    </section>
  );
}

function StatsSection() {
  const { t } = useTranslation();
  return (
    <section className="py-20 relative overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-fuchsia-500/20 opacity-30"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight">{t('smarter_way', 'A Smarter Way to Learn Online')}</h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              {t('smarter_way_desc', 'Online learning is powerful, but it’s easy to lose focus. N E X A 1337 solves that by organizing high-quality content into structured learning paths.')}
            </p>
            <ul className="space-y-4">
              {[
                { title: t('step_1'), icon: Target },
                { title: t('step_2'), icon: Video },
                { title: t('step_3'), icon: Terminal },
                { title: t('step_4'), icon: Award }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex items-center gap-3 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-fuchsia-500 blur-2xl opacity-20 rounded-full"></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative shadow-2xl">
               <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-800">
                  <div className="bg-fuchsia-500/10 text-fuchsia-500 p-3 rounded-2xl">
                    <Layers className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{t('choose_your_path')}</div>
                    <div className="text-zinc-400 text-sm">{t('choose_your_path_desc')}</div>
                  </div>
               </div>
               <div className="space-y-6">
                 <div className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-xl">
                   <span className="text-white font-medium">Cybersecurity</span>
                   <Shield className="w-5 h-5 text-emerald-400" />
                 </div>
                 <div className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-xl">
                   <span className="text-white font-medium">Fullstack Development</span>
                   <Code className="w-5 h-5 text-blue-400" />
                 </div>
                 <div className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-xl">
                   <span className="text-white font-medium">Interior Design</span>
                   <Layout className="w-5 h-5 text-orange-400" />
                 </div>
                 <div className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-xl">
                   <span className="text-white font-medium">Artificial Intelligence</span>
                   <Zap className="w-5 h-5 text-fuchsia-400" />
                 </div>
                 <div className="text-center text-zinc-500 text-sm mt-4 italic">More coming soon</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuePropsSection() {
  const { t } = useTranslation();
  const props = [
    {
      icon: Database,
      title: t('curated_not_created'),
      description: t('curated_desc')
    },
    {
      icon: Code,
      title: 'Playlists & Masterclasses',
      description: (
        <ul className="mt-2 space-y-1 text-sm list-disc pl-4">
          <li>{t('playlists_desc')}</li>
          <li>{t('masterclasses_desc')}</li>
        </ul>
      )
    },
    {
      icon: Award,
      title: t('stay_consistent'),
      description: (
        <>
          <p className="mb-2">{t('stay_consistent_desc')}</p>
          <p className="text-xs text-muted-foreground italic font-semibold">{t('cert_note')}</p>
        </>
      )
    }
  ];

  return (
    <section className="w-full py-20 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t('why_learn', 'Why learn with N E X A 1337?')}</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-background border border-border rounded-full text-sm font-bold text-foreground">✓ {t('no_distractions', 'No distractions')}</span>
            <span className="px-4 py-2 bg-background border border-border rounded-full text-sm font-bold text-foreground">✓ {t('no_random_content', 'No random content')}</span>
            <span className="px-4 py-2 bg-background border border-border rounded-full text-sm font-bold text-foreground">✓ {t('no_paid_barriers', 'No paid barriers')}</span>
            <span className="px-4 py-2 bg-background border border-border rounded-full text-sm font-bold text-foreground">✓ {t('only_structured_learning', 'Only structured learning')}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {props.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-card border border-border p-8 rounded-3xl hover:shadow-lg transition-all flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{prop.title}</h3>
                <div className="text-muted-foreground leading-relaxed w-full bg-transparent">{prop.description}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  const { t } = useTranslation();
  
  return (
    <section className="w-full py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-10"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
        <Award className="w-16 h-16 mb-8 opacity-90" />
        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{t('final_cta')}</h2>
        <Link 
          to="/courses" 
          className="mt-8 px-10 py-5 bg-background text-foreground rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl flex items-center gap-3"
        >
          {t('enter_nexa')} <ArrowRight className="w-6 h-6" />
        </Link>
      </div>
    </section>
  );
}

function ContinueLearningSection() {
  const { t } = useTranslation();
  const { user, courses, progress, language } = useStore();

  if (!user) return null;

  const ongoingCourses = filterByLanguage(courses, language).filter(c => {
    const p = progress[c.id];
    return p && p.completedVideoIds.length > 0 && !p.isCompleted;
  });

  if (ongoingCourses.length === 0) return null;

  return (
    <section className="w-full py-12 bg-muted/20 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-primary" />
            {t('continue_learning', 'Continue Learning')}, {user.displayName || t('demo_student', 'Student')}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t('jump_back_in', 'Jump back in and complete your ongoing courses by category.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ongoingCourses.slice(0, 4).map((course, index) => {
             const userProgress = progress[course.id];
             const totalVideos = course.videos.length || 1;
             const completedVideos = userProgress.completedVideoIds.length;
             const progressPercentage = Math.round((completedVideos / totalVideos) * 100);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group flex gap-4 bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-all hover:border-primary/30 relative"
              >
                <div className="relative w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  {course.thumbnail ? (
                    <img 
                      src={course.thumbnail} 
                      alt="" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                      <Code className="w-6 h-6 text-primary/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-primary mb-1">
                    {course.category}
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-2 leading-tight mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">
                      <span>{progressPercentage}% {t('completed', 'Completed')}</span>
                      <span>{completedVideos}/{totalVideos}</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  <Link 
                    to={`/course/${course.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`Continue ${course.title}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AdBanner({ desktopUrl, mobileUrl, targetUrl, ...props }: { desktopUrl: string, mobileUrl: string, targetUrl?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const content = (
    <div className="w-full flex justify-center">
      <div className="w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-muted/10 border border-border group relative flex items-center justify-center min-h-[100px] md:min-h-[160px]">
        <picture className="w-full h-full block">
          <source media="(min-width: 768px)" srcSet={desktopUrl} />
          <img 
            src={mobileUrl} 
            alt="Advertisement" 
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500 block" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== desktopUrl) {
                target.src = desktopUrl;
              }
            }}
          />
        </picture>
      </div>
    </div>
  );

  if (targetUrl) {
    return <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="block w-full">{content}</a>;
  }
  return <div className="w-full">{content}</div>;
}

export function Home() {
  const { t } = useTranslation();
  const { user, courses, learningPaths, banners, setIsAuthModalOpen, language } = useStore();

  const featuredCourses = filterByLanguage(courses, language).filter(c => !c.isSingleVideo).slice(0, 4);
  const featuredPaths = filterPathsByLanguage(learningPaths, courses, language).slice(0, 2);

  const activeBanners = banners?.filter(b => b.isActive && (!b.language || b.language === 'all' || b.language === language)) || [];
  const homeHeroBanners = activeBanners.filter(b => b.placement === 'home-hero');
  const homeMiddleBanners = activeBanners.filter(b => b.placement === 'home-middle');

  const homeBottomBanners = activeBanners.filter(b => b.placement === 'home-bottom');

  return (
    <div className="w-full">
      <ModernHero />
      <PartnersSection />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-4 space-y-4">
        {homeHeroBanners.length > 0 ? (
          homeHeroBanners.map(banner => (
            <AdBanner 
              key={banner.id}
              desktopUrl={banner.desktopImageUrl}
              mobileUrl={banner.mobileImageUrl}
              targetUrl={banner.targetUrl}
            />
          ))
        ) : (
          <AdBanner 
            desktopUrl="https://blogger.googleusercontent.com/img/a/AVvXsEjvKO51qmORWNQeRzbG0U66BuGMMlWmMsA344VdhJ8V3JcioC2XrW66Z3kGy4HQMsosM0LgGjCkVJ8NpZ1VIqQIz-mCNWf2jiDCevjoyxhPdqA6XP2XHfgLGCu8RoW85ZbirIllNSaBFZtKZ6z3-HWvKg8LZQxSlaU80PE4nVwUPB9b4feyPJjzjDMUZhVF"
            mobileUrl="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEis_fA71Qn7M3Wf_EHTj4A-Dqun-QW8Z2G-gX7Q2HjD-M_h7qT9-TK0TBxqOZgGl5eCoALki-Zuz-YEhFXcxsVXK-F1cHpVOy5CCz/s1600/Untitled-3.png"
            targetUrl="https://nexa1337.github.io/digitalstore"
          />
        )}
      </div>

      <ContinueLearningSection />
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-24">
        
        {/* Featured Paths */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2"><Layout className="w-6 h-6 text-primary" /> {t('featured_learning_paths', 'Featured Learning Paths')}</h2>
              <p className="text-muted-foreground">{t('structured_curriculums', 'Structured curriculums to guide your journey from zero to mastery.')}</p>
            </div>
            <Link to="/paths" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full font-semibold transition-all group w-fit">
              {t('view_all', 'View all')} <Layers className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPaths.map((path, index) => {
              const Icon = iconMap[path.icon] || Code;
              return (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-3">{path.title}</h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{path.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <span className="text-sm font-medium text-foreground bg-muted px-3 py-1 rounded-full">{path.courseIds.length} {t('playlists_in_this_path', 'Playlists')}</span>
                      <Link 
                        to={`/path/${path.id}`}
                        className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 w-fit group"
                      >
                        {t('start_path', 'Start Path')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Featured Courses (Playlists) */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2"><BookOpen className="w-6 h-6 text-primary" /> {t('popular_courses', 'Popular Playlists')}</h2>
              <p className="text-muted-foreground">{t('dive_straight', 'Dive straight into a specific technology or topic.')}</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full font-semibold transition-all group w-fit">
              {t('explore_all', 'View all')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCourses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {course.language && (
                    <div className="absolute top-3 end-3 z-10 bg-black/70 backdrop-blur text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                      {course.language}
                    </div>
                  )}
                  {course.thumbnail?.trim() ? (
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                     <div className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 flex items-center justify-center p-4">
                      <span className="text-muted-foreground font-medium text-center">{course.title}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.videos.length} {t('videos')}</span>
                    </div>
                  </div>

                  {user ? (
                    <Link 
                      to={`/course/${course.id}`}
                      className="w-full mt-auto py-2.5 bg-foreground text-background rounded-xl font-bold text-center hover:bg-foreground/90 transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
                    >
                      {t('start_learning')}
                    </Link>
                  ) : (
                    <button 
                      onClick={() => setIsAuthModalOpen(true)}
                      className="w-full mt-auto py-2.5 bg-foreground text-background rounded-xl font-bold text-center hover:bg-foreground/90 transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
                    >
                      {t('login_to_start')}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Masterclasses Section */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2"><Video className="w-6 h-6 text-primary" /> {t('masterclasses', 'Masterclasses')}</h2>
              <p className="text-muted-foreground">{t('dive_straight', 'Long-form comprehensive tutorials in a single video')}</p>
            </div>
            <Link to="/masterclasses" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full font-semibold transition-all group w-fit">
              {t('explore_all', 'View all')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filterByLanguage(courses, language).filter(c => c.isSingleVideo).slice(0, 4).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {course.language && (
                    <div className="absolute top-3 end-3 z-10 bg-black/70 backdrop-blur text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                      {course.language}
                    </div>
                  )}
                  {course.thumbnail?.trim() ? (
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 flex items-center justify-center p-4">
                      <span className="text-muted-foreground font-medium text-center">{course.title}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute top-3 start-3 flex gap-2">
                    <div className="bg-primary/90 backdrop-blur text-white px-2.5 py-1 rounded-md text-xs font-bold">
                      {t('masterclass', 'Masterclass')}
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Terminal className="w-4 h-4" />
                      <span>{course.videos[0]?.duration || '2h+'}</span>
                    </div>
                  </div>

                  {user ? (
                    <Link 
                      to={`/course/${course.id}`}
                      className="w-full mt-auto py-2.5 bg-foreground text-background rounded-xl font-bold text-center hover:bg-foreground/90 transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
                    >
                      {t('start_learning')}
                    </Link>
                  ) : (
                    <button 
                      onClick={() => setIsAuthModalOpen(true)}
                      className="w-full mt-auto py-2.5 bg-foreground text-background rounded-xl font-bold text-center hover:bg-foreground/90 transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
                    >
                      {t('login_to_start')}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Banner Bottom */}
        {homeBottomBanners.length > 0 && (
          <section className="space-y-4">
            {homeBottomBanners.map(banner => (
              <AdBanner 
                key={banner.id}
                desktopUrl={banner.desktopImageUrl}
                mobileUrl={banner.mobileImageUrl}
                targetUrl={banner.targetUrl}
              />
            ))}
          </section>
        )}
      </div>
      <ValuePropsSection />
      <StatsSection />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-4">
        {/* Banner 2 */}
        <section className="space-y-4">
          {homeMiddleBanners.length > 0 ? (
            homeMiddleBanners.map(banner => (
              <AdBanner 
                key={banner.id}
                desktopUrl={banner.desktopImageUrl}
                mobileUrl={banner.mobileImageUrl}
                targetUrl={banner.targetUrl}
              />
            ))
          ) : (
            <AdBanner 
              desktopUrl="https://blogger.googleusercontent.com/img/a/AVvXsEg0zMrZ22tyGW-aXpu2FAjvrfTlqRz699E3AMMRvV1z26qjt1QZTk45h6pPUhWEzmBW-AmKnKGnEg8qanKwtoP76u8qxQoXjCb91OBqZbQLsr4zRM9WUpBr9w5iGZL668__-C8S7LDj-0nfljMmyL9NLQuKMYsCwPcjtfqbuHF8sbOsKoeyNC-kkXOQ5wnl"
              mobileUrl="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjD96N8hkeoib7OrzYw5DlfIhpkSjPySH4xy3R2_4NL6pbcN_zAGHK6Wg/s1600/Untitled-5.png"
              targetUrl="https://linktr.ee/nexa1337"
            />
          )}
        </section>
      </div>
      <FinalCTA />
    </div>
  );
}
