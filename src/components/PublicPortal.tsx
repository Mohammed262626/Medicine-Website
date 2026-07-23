/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import KassalaLogo from './KassalaLogo';
import MediaGallery from './MediaGallery';
import { 
  Megaphone, 
  BookOpen, 
  Users, 
  FileText, 
  Calendar, 
  Play, 
  Pause, 
  Volume2, 
  Clock, 
  Heart, 
  ChevronRight, 
  ChevronLeft,
  ExternalLink, 
  Search, 
  MapPin, 
  Award, 
  User, 
  Mail, 
  FileCheck,
  CheckCircle2,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { Department, NewsItem, PodcastEpisode, MedicalConvoy } from '../types';

interface PublicPortalProps {
  departments: Department[];
  news: NewsItem[];
  podcasts: PodcastEpisode[];
  convoys: MedicalConvoy[];
}

type PublicTab = 'home' | 'departments' | 'kamsa' | 'academic-guide' | 'gallery' | 'public-bulletin';

export default function PublicPortal({ departments, news, podcasts, convoys }: PublicPortalProps) {
  const [activeTab, setActiveTab] = useState<PublicTab>('home');
  const [selectedDeptId, setSelectedDeptId] = useState<string>(departments[0]?.id || 'anatomy');
  
  // Public Bulletin & Newsletter States
  const [newsletterForm, setNewsletterForm] = useState({ name: '', email: '' });
  const [newsletterInterests, setNewsletterInterests] = useState<string[]>(['fever']);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [isNewsletterSuccess, setIsNewsletterSuccess] = useState(false);

  const [proposedVillages, setProposedVillages] = useState([
    { id: 'pv-1', name: 'قرية ود شريفي', population: '4500 مواطن', issue: 'زيادة رقعة انتشار الملاريا الموسمي بعد الخريف', phone: '09123456XX', date: 'منذ يومين', votes: 14 },
    { id: 'pv-2', name: 'منطقة كبري ستيت', population: '3000 مواطن', issue: 'الحاجة لعيادة أطفال تخصصية وتوعية عن سلامة مياه الشرب', phone: '09187654XX', date: 'منذ 5 أيام', votes: 8 }
  ]);

  const [newProposal, setNewProposal] = useState({ name: '', population: '', issue: '', phone: '' });
  const [isProposalSubmitting, setIsProposalSubmitting] = useState(false);
  const [isProposalSuccess, setIsProposalSuccess] = useState(false);

  const [leafletSearch, setLeafletSearch] = useState('');
  const [leafletLikes, setLeafletLikes] = useState<Record<string, number>>({
    'l-1': 148,
    'l-2': 92,
    'l-3': 121
  });
  const [leafletUserLiked, setLeafletUserLiked] = useState<Record<string, boolean>>({});

  const handleLeafletLike = (id: string) => {
    const alreadyLiked = !!leafletUserLiked[id];
    setLeafletUserLiked(prev => ({ ...prev, [id]: !alreadyLiked }));
    setLeafletLikes(prev => ({
      ...prev,
      [id]: alreadyLiked ? prev[id] - 1 : prev[id] + 1
    }));
  };

  const [activeAdvisoryId, setActiveAdvisoryId] = useState<string | null>(null);

  // Slide indicator state for hero image slider
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: '/src/assets/images/kassala_med_students_1784710226776.jpg',
      tag: 'الحياة الجامعية والطلاب',
      title: 'أطباء المستقبل بروح العطاء والتميز الأكاديمي والخدمي بجامعة كسلا'
    },
    {
      image: '/src/assets/images/kassala_teaching_hospital_1784710241883.jpg',
      tag: 'التدريب السريري والعملي',
      title: 'تدريب سريري متكامل في أقسام الباطنية، الجراحة، النساء والتوليد، والأطفال'
    },
    {
      image: '/src/assets/images/kamsa_health_convoy_1784710256947.jpg',
      tag: 'المسؤولية المجتمعية',
      title: 'قوافل صحية تجوب قرى ولاية كسلا لتقديم الرعاية الطبية المجانية والتوعية'
    },
    {
      image: '/src/assets/images/kassala_medical_lab_1784710272789.jpg',
      tag: 'البحوث والمختبرات',
      title: 'مختبرات تخصصية مجهزة بأحدث أدوات الفحص والأبحاث الطبية والوبائية'
    }
  ];

  // Auto transition slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  // Podcast simulated audio player state
  const [playingEpisode, setPlayingEpisode] = useState<PodcastEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playerProgress, setPlayerProgress] = useState<number>(35); // simulated percent
  const [currentTime, setCurrentTime] = useState<string>('08:35');

  // Filter approved news for public display
  const approvedNews = news.filter(item => item.status === 'approved');

  // Search filter for departments or courses
  const [deptSearchQuery, setDeptSearchQuery] = useState('');

  // Department selection helper
  const selectedDept = departments.find(d => d.id === selectedDeptId) || departments[0];

  // Podcast play simulation ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && playingEpisode) {
      interval = setInterval(() => {
        setPlayerProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
        
        // Advance current time
        const [minutesStr, secondsStr] = currentTime.split(':');
        let minutes = parseInt(minutesStr);
        let seconds = parseInt(secondsStr) + 1;
        if (seconds >= 60) {
          minutes += 1;
          seconds = 0;
        }
        const formatNum = (num: number) => num < 10 ? `0${num}` : num;
        setCurrentTime(`${formatNum(minutes)}:${formatNum(seconds)}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playingEpisode, currentTime]);

  const handlePlayEpisode = (episode: PodcastEpisode) => {
    if (playingEpisode?.id === episode.id) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingEpisode(episode);
      setIsPlaying(true);
      setPlayerProgress(0);
      setCurrentTime('00:00');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8faf9] text-slate-800 font-sans leading-relaxed" id="public-portal-container">
      
      {/* 1. Breaking News Ticker / Interactive News Feed */}
      <div className="bg-emerald-800 text-white py-2.5 px-4 overflow-hidden border-b border-emerald-900 shadow-sm" id="news-ticker">
        <div className="max-w-7xl mx-auto flex items-center space-x-3 space-x-reverse">
          <div className="flex items-center gap-1.5 bg-slate-950 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold shrink-0 shadow-sm whitespace-nowrap">
            <Megaphone className="h-3.5 w-3.5 animate-bounce" />
            <span>تحديثات البوابة</span>
          </div>
          <div className="relative flex-1 overflow-hidden h-5">
            <div className="absolute flex gap-12 text-sm font-semibold animate-marquee whitespace-nowrap">
              {approvedNews.length > 0 ? (
                approvedNews.map((item) => (
                  <span key={item.id} className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                    <span>{item.title}</span>
                    <span className="text-xs text-emerald-100 font-normal font-mono">({item.date})</span>
                  </span>
                ))
              ) : (
                <span className="text-white">أهلاً بكم في المنصة الرقمية الرسمية لكلية الطب والعلوم الصحية - جامعة كسلا</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Visual Area & Welcome Title inspired by medical branding */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#0b1d19] text-white border-b border-emerald-500/10 shadow-md relative overflow-hidden" id="portal-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left/Middle side: Textual info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white p-1 rounded-xl shadow-md border border-emerald-500/15 shrink-0">
                  <KassalaLogo size={46} />
                </div>
                <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  التميز الطبي الأكاديمي والخدمي
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                كلية الطب والعلوم الصحية <br />
                <span className="text-emerald-400">جامعة كـسلا</span>
              </h2>
              <p className="text-slate-200 text-sm md:text-base max-w-xl leading-relaxed">
                مرحباً بكم في البوابة الإلكترونية المعتمدة لتطوير الخدمات الأكاديمية، والبحث العلمي المتميز، وتفعيل قنوات التواصل للأقسام العلمية، والأنشطة الإنسانية لـرابطة الطلاب <span className="text-emerald-300 font-semibold">(KaMSA)</span>.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={() => { setActiveTab('departments'); }} className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg shadow-emerald-950/40 transition">
                  استكشاف الأقسام الأكاديمية
                </button>
                <button onClick={() => { setActiveTab('kamsa'); }} className="bg-white/10 hover:bg-white/15 text-white text-xs font-bold px-5 py-3 rounded-xl transition">
                  مبادرات الرابطة والبودكاست
                </button>
              </div>
            </div>

            {/* Right side: Dynamic High-Fidelity Photo Gallery Slideshow */}
            <div className="lg:col-span-5 relative" id="hero-slider-section">
              <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-800/20 bg-slate-900 aspect-[4/3] flex flex-col justify-end p-4 group">
                
                {/* Image Slide Layers */}
                <div className="absolute inset-0 w-full h-full">
                  {heroSlides.map((slide, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        idx === currentSlide 
                          ? 'opacity-100 scale-100 pointer-events-auto' 
                          : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                    >
                      {/* Gradient overlay to guarantee text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10" />
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Left and Right Manual Slide Nav Buttons (Visible on Hover) */}
                <button
                  id="slide-prev-btn"
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/45 hover:bg-emerald-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md flex items-center justify-center"
                  aria-label="الصورة السابقة"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  id="slide-next-btn"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/45 hover:bg-emerald-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md flex items-center justify-center"
                  aria-label="الصورة التالية"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Slide captions and indicator dots */}
                <div className="relative z-20 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-emerald-400 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {heroSlides[currentSlide].tag}
                    </span>
                    
                    {/* Dots indicator */}
                    <div className="flex gap-1.5" dir="ltr">
                      {heroSlides.map((_, idx) => (
                        <button
                          key={idx}
                          id={`dot-btn-${idx}`}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentSlide ? 'w-4 bg-emerald-400' : 'w-1.5 bg-white/40 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-white leading-relaxed text-right">
                    {heroSlides[currentSlide].title}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sub-navigation tabs */}
      <nav className="sticky top-16 md:top-20 z-45 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 -mt-6 mb-2" id="public-sub-menu">
        <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-slate-200/80 shadow-md flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center space-x-2 space-x-reverse overflow-x-auto w-full py-1 scrollbar-thin">
            <button
              id="tab-home"
              onClick={() => setActiveTab('home')}
              className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-950 hover:bg-slate-50'
              }`}
            >
              الرئيسية والإعلانات
            </button>
            <button
              id="tab-public-bulletin"
              onClick={() => setActiveTab('public-bulletin')}
              className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'public-bulletin'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-950 hover:bg-slate-50'
              }`}
            >
              النشرة الطبية والإرشادية للجمهور
            </button>
            <button
              id="tab-depts"
              onClick={() => setActiveTab('departments')}
              className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'departments'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-950 hover:bg-slate-50'
              }`}
            >
              الأقسام والمقررات الدراسية
            </button>
            <button
              id="tab-kamsa"
              onClick={() => {
                setActiveTab('kamsa');
                if (!playingEpisode && podcasts.length > 0) {
                  setPlayingEpisode(podcasts[0]);
                }
              }}
              className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'kamsa'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-950 hover:bg-slate-50'
              }`}
            >
              رابطة الطلاب وبودكاست الكلية
            </button>
            <button
              id="tab-guide"
              onClick={() => setActiveTab('academic-guide')}
              className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'academic-guide'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-950 hover:bg-slate-50'
              }`}
            >
              لوائح الكلية وجهات الاتصال
            </button>
            <button
              id="tab-gallery"
              onClick={() => setActiveTab('gallery')}
              className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-950 hover:bg-slate-50'
              }`}
            >
              معرض الصور والأنشطة
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Tab Contents */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="public-main-content">
        
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fadeIn" id="home-tab-view">
            
            {/* SCREENSHOT 1: DIGITAL PORTAL SERVICES GRID */}
            <div className="space-y-6">
              <div className="text-center md:text-right max-w-xl">
                <h3 className="text-xl font-extrabold text-slate-900 font-sans">الخدمات والمناشط الرقمية الموحدة</h3>
                <p className="text-slate-500 text-xs mt-1">
                  الوصول الفوري لبوابات التسجيل، التعليم الإلكتروني، والمستودع الرقمي لأبحاث كلية الطب جامعة كسلا
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="neelain-services-grid">
                {/* Card 1: التسجيل الإلكتروني للطلاب */}
                <div onClick={() => setActiveTab('academic-guide')} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer flex flex-col justify-between aspect-square md:aspect-auto md:h-64">
                  <div className="relative h-28 bg-emerald-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-800 to-emerald-500 opacity-90" />
                    {/* Circle and Icon overlay */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-14 w-14 rounded-full bg-white shadow-md flex items-center justify-center z-10 group-hover:scale-110 transition duration-300 border border-emerald-100">
                      <GraduationCap className="h-6 w-6 text-emerald-700" />
                    </div>
                  </div>
                  <div className="p-4 pt-10 text-center flex-1 flex flex-col justify-center">
                    <h4 className="font-extrabold text-sm text-slate-900">التسجيل الإلكتروني للطلاب الجدد</h4>
                    <p className="text-[11px] text-slate-400 mt-1">تنسيق استلام الملفات وخطوات تفعيل القيد</p>
                  </div>
                </div>

                {/* Card 2: بوابة الشؤون العلمية */}
                <div onClick={() => setActiveTab('academic-guide')} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer flex flex-col justify-between aspect-square md:aspect-auto md:h-64">
                  <div className="relative h-28 bg-emerald-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-800 to-emerald-500 opacity-90" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-14 w-14 rounded-full bg-white shadow-md flex items-center justify-center z-10 group-hover:scale-110 transition duration-300 border border-emerald-100">
                      <Award className="h-6 w-6 text-emerald-700" />
                    </div>
                  </div>
                  <div className="p-4 pt-10 text-center flex-1 flex flex-col justify-center">
                    <h4 className="font-extrabold text-sm text-slate-900">التقديم لشهادات التخرج والمستندات</h4>
                    <p className="text-[11px] text-slate-400 mt-1">متابعة طلبات الخريجين والتوثيق الأكاديمي</p>
                  </div>
                </div>

                {/* Card 3: منصة التعليم الإلكتروني */}
                <a href="https://lms.kassala.edu.sd" target="_blank" rel="noreferrer" className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer flex flex-col justify-between aspect-square md:aspect-auto md:h-64">
                  <div className="relative h-28 bg-emerald-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-800 to-emerald-500 opacity-90" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-14 w-14 rounded-full bg-white shadow-md flex items-center justify-center z-10 group-hover:scale-110 transition duration-300 border border-emerald-100">
                      <BookOpen className="h-6 w-6 text-emerald-700" />
                    </div>
                  </div>
                  <div className="p-4 pt-10 text-center flex-1 flex flex-col justify-center">
                    <h4 className="font-extrabold text-sm text-slate-900">منصة التعليم الإلكتروني (LMS)</h4>
                    <p className="text-[11px] text-slate-400 mt-1">تحميل المحاضرات والتدريب الطبي الإلكتروني</p>
                  </div>
                </a>

                {/* Card 4: بوابة خدمات التدريب */}
                <div onClick={() => setActiveTab('departments')} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer flex flex-col justify-between aspect-square md:aspect-auto md:h-64">
                  <div className="relative h-28 bg-emerald-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-800 to-emerald-500 opacity-90" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-14 w-14 rounded-full bg-white shadow-md flex items-center justify-center z-10 group-hover:scale-110 transition duration-300 border border-emerald-100">
                      <FileText className="h-6 w-6 text-emerald-700" />
                    </div>
                  </div>
                  <div className="p-4 pt-10 text-center flex-1 flex flex-col justify-center">
                    <h4 className="font-extrabold text-sm text-slate-900">توصيف وجداول التدريب السريري</h4>
                    <p className="text-[11px] text-slate-400 mt-1">متابعة الأقسام السريرية والأطباء المشرفين</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Callout to Public Newsletter & Health Bulletin */}
            <div className="bg-gradient-to-r from-emerald-50 via-slate-50 to-transparent border border-emerald-200/80 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm" id="public-bulletin-callout-banner">
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 shadow-xs">
                  <Megaphone className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    النشرة الإرشادية والتوعوية لعامة المواطنين بشرق السودان
                    <span className="text-[10px] bg-emerald-700 text-white font-black px-2.5 py-0.5 rounded-md">مُحدَّث</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    إرشادات الوقاية من الأوبئة الموسمية وجدول القوافل الطبية القادمة لبلدات ولاية كسلا.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('public-bulletin')} 
                className="bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-black px-5 py-2.5 rounded-xl transition shadow-sm cursor-pointer shrink-0"
              >
                تصفّح النشرة والتحذيرات الطبية ←
              </button>
            </div>

            {/* SCREENSHOT 2: UNIVERSITY IN NUMBERS PANEL */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xs space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">الكلية بالأرقام والإحصائيات</h3>
                  <p className="text-slate-500 text-xs mt-0.5">مؤشرات الأداء الأكاديمي والخدمي والطلابي بكلية الطب</p>
                </div>
                <button onClick={() => setActiveTab('academic-guide')} className="text-xs text-emerald-700 font-extrabold border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition mt-3 md:mt-0">
                  المزيد من الإحصائيات الأكاديمية ←
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" id="neelain-stats-grid">
                {/* Stat 1: الطلاب */}
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center space-y-2 hover:bg-white hover:shadow-md transition duration-300">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-100">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">1420</span>
                  <span className="text-xs text-slate-500 font-bold">عدد الطلاب المقيدين</span>
                </div>

                {/* Stat 2: أعضاء هيئة التدريس */}
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center space-y-2 hover:bg-white hover:shadow-md transition duration-300">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-100">
                    <User className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">184</span>
                  <span className="text-xs text-slate-500 font-bold">عضو هيئة تدريس معتمد</span>
                </div>

                {/* Stat 3: الأقسام العلمية */}
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center space-y-2 hover:bg-white hover:shadow-md transition duration-300">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-100">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">9</span>
                  <span className="text-xs text-slate-500 font-bold">أقسام أكاديمية وسريرية</span>
                </div>

                {/* Stat 4: المبادرات والقوافل */}
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 text-center flex flex-col items-center justify-center space-y-2 hover:bg-white hover:shadow-md transition duration-300">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-100">
                    <Heart className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">15+</span>
                  <span className="text-xs text-slate-500 font-bold">قافلة صحية ريفية منجزة</span>
                </div>
              </div>
            </div>

            {/* SCREENSHOT 3: NEWS IN DARK LUXURY EMERALD GRADIENT BACKGROUND */}
            <div className="bg-[#111622] bg-gradient-to-b from-[#111622] via-[#111d1a] to-[#0f241d] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl" id="neelain-dark-news">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.12),transparent)] pointer-events-none" />
              
              <div className="relative z-10 space-y-8">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-extrabold text-white">آخر الأخبار والإعلانات الرسمية</h3>
                  <p className="text-emerald-400 text-xs font-semibold">تعرف على آخر مستجدات الأنشطة والقرارات الأكاديمية بالكلية</p>
                  <div className="h-0.5 w-16 bg-emerald-500 mx-auto mt-3 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="neelain-dark-news-grid">
                  {approvedNews.slice(0, 3).map((item) => (
                    <div key={item.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl shadow-lg hover:border-emerald-500/30 hover:bg-white/10 transition duration-300 flex flex-col justify-between h-72">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-emerald-300 font-mono">{item.date}</span>
                        </div>
                        <h4 className="font-extrabold text-sm text-white leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-4 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-400">
                        <span>الكاتب: {item.author}</span>
                        <span className="text-emerald-400 font-bold hover:underline cursor-pointer flex items-center gap-1">
                          <span>تفاصيل الخبر ←</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {approvedNews.length > 3 && (
                  <div className="text-center pt-2">
                    <button onClick={() => setActiveTab('departments')} className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition">
                      عرض جميع الأخبار المؤرشفة
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SCREENSHOT 4: ORBITING VISION & VALUES CORE DIAGRAM */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xs space-y-8" id="neelain-orbit-charter">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">ميثاق ورسالة كلية الطب والعلوم الصحية</h3>
                <p className="text-slate-500 text-xs">الهيكل القيمي والتأسيسي لخطط الكلية ومناهجها الأكاديمية المعتمدة</p>
                <div className="h-0.5 w-12 bg-emerald-500 mx-auto mt-2 rounded-full" />
              </div>

              {/* Orbit Connections Diagram */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
                {/* Left Columns: Goals and Message */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Item 1: الرؤية */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative shadow-xs">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        👁
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900">الرؤية الاستراتيجية للكلية</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      أن نكون منارة أكاديمية متميزة في تقديم التعليم الطبي الحديث والبحث العلمي التطبيقي، رائدين في سد الحاجة الصحية بالبلاد.
                    </p>
                  </div>

                  {/* Item 2: الرسالة */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative shadow-xs">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        🎯
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900">رسالتنا الأكاديمية والمجتمعية</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      تأهيل أطباء أكفاء ذوي التزام مهني وأخلاقي، ودعم الأبحاث الطبية لحل المشكلات الصحية بمحليات شرق السودان.
                    </p>
                  </div>
                </div>

                {/* Central Column: Interactive Central Crest Shield with connecting lines simulation */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-6">
                  {/* Connecting lines drawn for desktop view */}
                  <div className="hidden lg:block absolute inset-0 z-0">
                    <svg className="w-full h-full text-emerald-200/50 stroke-current" fill="none">
                      <path d="M 50 100 Q 150 150 200 180" strokeWidth="2" strokeDasharray="5,5" />
                      <path d="M 50 280 Q 150 220 200 180" strokeWidth="2" strokeDasharray="5,5" />
                      <path d="M 350 100 Q 250 150 200 180" strokeWidth="2" strokeDasharray="5,5" />
                      <path d="M 350 280 Q 250 220 200 180" strokeWidth="2" strokeDasharray="5,5" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center p-8 rounded-full bg-emerald-50 border-4 border-emerald-200 shadow-xl h-48 w-48 text-center">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-500 text-white flex items-center justify-center font-extrabold text-3xl shadow-md border-2 border-white mb-2">
                      K
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-900">ميثاق التأسيس</span>
                    <span className="text-[9px] text-emerald-600 block mt-0.5">كلية الطب - جامعة كسلا</span>
                  </div>
                </div>

                {/* Right Columns: Objectives & Emblem Details */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Item 3: شعار التميز */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative shadow-xs">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        👑
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900">شعارنا وقيمنا المعتمدة</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      "عالمية المعرفة، مهنية التدريب، وخدمة المجتمع". نلتزم بالنزاهة والابتكار وتطوير الوعي الصحي الميداني.
                    </p>
                  </div>

                  {/* Item 4: الأهداف الاستراتيجية */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative shadow-xs">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        ⚖
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900">الأهداف الاستراتيجية الستة</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      تضم التعلم مدى الحياة، الأمانة الطبية، تعزيز الشراكات الإقليمية والابتكار المستمر في المناهج والمحاضرات الرقمية.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Original Dean Speech & Layout Contacts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
              {/* Left Dean speech */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/40 rounded-full -mr-16 -mt-16 -z-1" />
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 mb-2">خطاب عمادة الكلية والنائب الأكاديمي</h3>
                      <p className="text-slate-600 text-xs leading-relaxed mb-4">
                        "أبنائي وبناتي الطلاب، زملائي الكرام من أعضاء هيئة التدريس، نرحب بكم في البوابة الرقمية الموحدة لكلية الطب جامعة كسلا. لقد تأسست هذه المنصة الرقمية بالتنسيق مع مركز المعلومات لتكون جسراً تفاعلياً يعزز الشفافية الأكاديمية والتنظيم الإداري. نهدف لتطوير جودة المناهج وتوفير جداول الدروس السريرية وتحديث أبحاث الكلية باستمرار، وتوفير كافة لوائح التدريب المعتمدة. كما نثمن دور رابطتنا الطلابية (KaMSA) ومبادراتها الطبية والمجتمعية التي تنشر الوعي الصحي بولاية كسلا الحبيبة."
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-xs">د. عثمان علي محمد</span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">عميد كلية الطب</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Committee Structure Brief & Links */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-700" />
                    <span>هيكل الإدارة والتنسيق للبوابة</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    توزع الصلاحيات والمسؤوليات التحريرية على 4 مستويات إدارية لضمان الاستمرارية والمصداقية العلمية للبوابة الرقمية:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex gap-2 text-[11px] leading-relaxed">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white font-bold text-[10px]">1</span>
                      <div>
                        <strong className="text-slate-900 block font-bold">العمادة والنائب الأكاديمي</strong>
                      </div>
                    </div>
                    <div className="flex gap-2 text-[11px] leading-relaxed">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">2</span>
                      <div>
                        <strong className="text-slate-700 block font-bold">مركز تكنولوجيا المعلومات IT</strong>
                      </div>
                    </div>
                    <div className="flex gap-2 text-[11px] leading-relaxed">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">3</span>
                      <div>
                        <strong className="text-slate-700 block font-bold">ضباط اتصال الأقسام العلمية</strong>
                      </div>
                    </div>
                    <div className="flex gap-2 text-[11px] leading-relaxed">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-emerald-400 font-bold text-[10px]">4</span>
                      <div>
                        <strong className="text-slate-700 block font-bold">أمانة الرابطة الإعلامية (KaMSA)</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: DEPARTMENTS */}
        {activeTab === 'departments' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fadeIn" id="departments-tab-view">
            
            {/* Left Sidebar: Department Selector list */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="relative mb-3">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن قسم أو مقرر..."
                    value={deptSearchQuery}
                    onChange={(e) => setDeptSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-9 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 text-slate-700"
                  />
                </div>
                
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">أقسام كلية الطب</h3>
                <div className="space-y-1">
                  {departments
                    .filter(d => d.arabicName.includes(deptSearchQuery) || d.name.toLowerCase().includes(deptSearchQuery.toLowerCase()))
                    .map((dept) => (
                      <button
                        key={dept.id}
                        id={`dept-select-${dept.id}`}
                        onClick={() => setSelectedDeptId(dept.id)}
                        className={`w-full text-right px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                          selectedDeptId === dept.id
                            ? 'bg-emerald-900 text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-800'
                        }`}
                      >
                        {dept.arabicName}
                      </button>
                    ))}
                </div>
              </div>

              {/* Quick reminder about role 3 duties */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-[11px] text-emerald-900 leading-relaxed">
                <div className="flex gap-1.5 items-start mb-1">
                  <AlertCircle className="h-3.5 w-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="font-bold text-emerald-950">مستوى تحديث البيانات</span>
                </div>
                يتم تحديث هذه الجداول، وتوصيف المقررات، وقائمة أبحاث أعضاء هيئة التدريس دورياً بواسطة <strong>ضابط اتصال القسم</strong> المكلف من قبل الإدارة الأكاديمية.
              </div>
            </div>

            {/* Right Main Panel: Department Detailed Content */}
            <div className="lg:col-span-3 space-y-6">
              {selectedDept ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 space-y-8" id="dept-details-panel">
                  {/* Dept Header */}
                  <div className="border-b border-slate-100 pb-5">
                    <span className="text-xs font-mono text-emerald-800 uppercase bg-emerald-50 px-2 py-1 rounded-md mb-2 inline-block">
                      Faculty of Medicine / Department of {selectedDept.name}
                    </span>
                    <h3 className="text-2xl font-bold text-emerald-950 mt-1">{selectedDept.arabicName}</h3>
                    <div className="flex items-center gap-2 mt-2 text-slate-500 text-sm">
                      <span className="font-medium text-slate-700">رئيس القسم المكلف:</span>
                      <span className="text-emerald-900 font-bold">{selectedDept.headOfDepartment}</span>
                    </div>
                    <p className="text-slate-600 text-xs mt-3 leading-relaxed">
                      {selectedDept.description}
                    </p>
                  </div>

                  {/* Courses section */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      <span>المقررات الدراسية والتوصيف</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedDept.courses.map((course) => (
                        <div key={course.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-mono text-[10px] font-bold text-emerald-600">{course.code}</span>
                              <span className="text-[10px] bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full font-semibold">{course.hours}</span>
                            </div>
                            <h5 className="font-bold text-slate-950 text-xs">{course.name}</h5>
                            <p className="text-[11px] text-slate-500 mt-1">{course.description}</p>
                          </div>
                          <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
                            <span className="text-slate-400 font-medium">{course.semester}</span>
                            <span className="text-emerald-800 font-bold hover:underline cursor-pointer flex items-center gap-0.5">
                              <span>توصيف المقرر (PDF)</span>
                              <ExternalLink className="h-2.5 w-2.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Schedules (Theoretical & Clinical) */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>الجداول الدراسية الأسبوعية والمحاضرات السريرية</span>
                    </h4>
                    <div className="overflow-x-auto rounded-xl border border-slate-100">
                      <table className="w-full text-right text-xs">
                        <thead className="bg-slate-50 text-slate-500">
                          <tr>
                            <th className="p-3">اليوم</th>
                            <th className="p-3">الزمن</th>
                            <th className="p-3">الموضوع / المحاضرة</th>
                            <th className="p-3">النوع</th>
                            <th className="p-3">الموقع / القاعة</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedDept.schedules.length > 0 ? (
                            selectedDept.schedules.map((sch) => (
                              <tr key={sch.id} className="hover:bg-slate-50/50">
                                <td className="p-3 font-semibold text-slate-800">{sch.day}</td>
                                <td className="p-3 text-slate-500 font-mono">{sch.time}</td>
                                <td className="p-3 font-bold text-slate-900">{sch.subject}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                    sch.type === 'theoretical' 
                                      ? 'bg-blue-50 text-blue-800 border border-blue-200' 
                                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  }`}>
                                    {sch.type === 'theoretical' ? 'نظري' : 'عملي / سريري'}
                                  </span>
                                </td>
                                <td className="p-3 text-slate-500">{sch.location}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="p-4 text-center text-slate-400">لا يوجد جداول معروضة حالياً لهذا القسم.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Faculty list with CV bio summary */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span>أعضاء هيئة التدريس بالقسم</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedDept.faculty.map((member) => (
                        <div key={member.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 border border-emerald-200">
                            <User className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h5 className="font-bold text-xs text-slate-950">{member.name}</h5>
                              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                                {member.title}
                              </span>
                            </div>
                            <p className="text-[10px] text-emerald-700 font-semibold">{member.specialization}</p>
                            <p className="text-[11px] text-slate-500 italic">"{member.bio}"</p>
                            <div className="pt-2 flex items-center justify-between text-[10px]">
                              <span className="text-slate-400 font-mono flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                <span>{member.email}</span>
                              </span>
                              <span className="text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                                الأبحاث: {member.researchCount}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Publications */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      <span>الأبحاث والنشورات العلمية الصادرة من القسم</span>
                    </h4>
                    <div className="space-y-2">
                      {selectedDept.research.map((pub) => (
                        <div key={pub.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                          <div>
                            <h5 className="font-bold text-slate-950 leading-snug">{pub.title}</h5>
                            <p className="text-slate-400 text-[11px] mt-0.5">الباحثون: {pub.authors} | المجلة: <span className="italic">{pub.journal}</span></p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-[10px] font-mono font-bold bg-white text-slate-500 border border-slate-200 py-1 px-2.5 rounded-md">
                              عام {pub.year}
                            </span>
                            <span className="text-emerald-800 font-bold hover:underline cursor-pointer flex items-center gap-0.5 text-[11px]">
                              <span>قراءة البحث</span>
                              <ExternalLink className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 text-slate-400">
                  يرجى اختيار أحد الأقسام من القائمة لعرض التفاصيل الأكاديمية.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: KaMSA & PODCASTS */}
        {activeTab === 'kamsa' && (
          <div className="space-y-8 animate-fadeIn" id="kamsa-tab-view">
            
            {/* KaMSA Intro banner */}
            <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#0e2722] text-white p-6 rounded-3xl border border-emerald-800/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <span className="bg-emerald-700 text-white text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase">
                  أخبار ومبادرات الرابطة
                </span>
                <h3 className="text-xl md:text-2xl font-bold">رابطة طلاب كلية الطب جامعة كسلا (KaMSA)</h3>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  الكيان الطلابي الممثل لطلاب الكلية. تعمل الأمانة الإعلامية على توثيق الأنشطة، القوافل الطبية الإنسانية بمحليات كسلا المختلفة، وإنتاج "بودكاست الكلية" لتبادل الخبرات الأكاديمية بين الأساتذة والطلاب.
                </p>
              </div>
              <div className="flex gap-4 shrink-0 text-center">
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                  <span className="block text-xl font-bold text-emerald-400 font-mono">15+</span>
                  <span className="text-[10px] text-slate-400">قافلة طبية منفذة</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                  <span className="block text-xl font-bold text-emerald-400 font-mono">200+</span>
                  <span className="text-[10px] text-slate-400">طالب متطوع</span>
                </div>
              </div>
            </div>

            {/* Main Interactive Audio Podcast Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Column 1 & 2: Podcast Center */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-bold text-slate-950 text-base">🎙️ بودكاست كلية الطب جامعة كسلا</h4>
                      <p className="text-[11px] text-slate-400">منصة صوتية حوارية مخصصة للثقافة الطبية والإرشاد الأكاديمي للطلاب</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">الأمانة الإعلامية</span>
                  </div>

                  {/* Visual simulated player layout */}
                  {playingEpisode ? (
                    <div className="bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 shadow-inner space-y-4" id="podcast-audio-player">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">يجري تشغيل الحلقة الآن</span>
                          <h5 className="font-bold text-sm leading-snug">{playingEpisode.title}</h5>
                          <p className="text-xs text-slate-400 font-medium">الضيف: <span className="text-white font-semibold">{playingEpisode.guest}</span></p>
                          <p className="text-[11px] text-slate-400 italic">محاورة: {playingEpisode.host}</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-emerald-900 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold text-xs animate-pulse">
                          KaMSA
                        </div>
                      </div>

                      {/* Waveform animation if playing */}
                      <div className="flex justify-center items-end space-x-1.5 space-x-reverse h-10 py-1" id="visualizer-bars">
                        {[...Array(16)].map((_, i) => (
                          <div 
                            key={i} 
                            style={{ 
                              height: isPlaying ? `${Math.floor(Math.random() * 32) + 8}px` : '4px',
                              transition: 'height 0.15s ease-in-out'
                            }}
                            className="w-1 bg-emerald-500 rounded-full"
                          />
                        ))}
                      </div>

                      {/* Sound controls and progress bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span>{currentTime}</span>
                          <span>{playingEpisode.duration}</span>
                        </div>
                        
                        {/* Fake clickable timeline track */}
                        <div 
                          className="w-full bg-slate-800 h-2 rounded-full overflow-hidden cursor-pointer"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const percent = (clickX / rect.width) * 100;
                            setPlayerProgress(percent);
                          }}
                        >
                          <div 
                            style={{ width: `${playerProgress}%` }} 
                            className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
                          />
                        </div>

                        {/* Control buttons */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4 text-slate-400" />
                            <div className="w-16 bg-slate-800 h-1 rounded-full">
                              <div className="bg-slate-400 h-full w-4/5" />
                            </div>
                          </div>

                          <button 
                            id="podcast-play-pause-btn"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="h-11 w-11 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center hover:scale-105 transition active:scale-95"
                          >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-slate-950" />}
                          </button>

                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                            <Clock className="h-3.5 w-3.5" />
                            <span>استماع تفاعلي</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-100 p-8 text-center rounded-2xl text-slate-400 text-xs">
                      حدد أحدى الحلقات أدناه لتشغيل مشغل البودكاست التفاعلي.
                    </div>
                  )}

                  {/* Episode List */}
                  <div className="space-y-3">
                    <h5 className="font-bold text-xs text-slate-400 uppercase tracking-wider">قائمة الحلقات المنشورة</h5>
                    <div className="space-y-3">
                      {podcasts.map((ep) => (
                        <div key={ep.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h6 className="font-bold text-xs text-slate-950">{ep.title}</h6>
                            <p className="text-[11px] text-slate-500">{ep.description}</p>
                            <div className="pt-2 flex flex-wrap items-center gap-3 text-[10px] text-slate-400">
                              <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600 font-semibold">ضيف الحلقة: {ep.guest}</span>
                              <span className="font-mono">المدة: {ep.duration}</span>
                              <span className="font-mono">التاريخ: {ep.date}</span>
                            </div>
                          </div>
                          <button
                            id={`play-ep-${ep.id}`}
                            onClick={() => handlePlayEpisode(ep)}
                            className={`p-2.5 rounded-xl shrink-0 transition ${
                              playingEpisode?.id === ep.id && isPlaying
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-emerald-900 text-white hover:bg-emerald-800'
                            }`}
                          >
                            {playingEpisode?.id === ep.id && isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4 fill-white" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Column 3: Medical Convoys Portfolio */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>سجل القوافل الطبية والمبادرات</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">توثيق للمشاريع الميدانية لتقديم العلاج والرعاية الصحية للأسر والمحليات المحتاجة بولاية كسلا.</p>
                  
                  <div className="space-y-4">
                    {convoys.map((convoy) => (
                      <div key={convoy.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                            convoy.status === 'completed' 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                              : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                          }`}>
                            {convoy.status === 'completed' ? 'تمت بنجاح' : 'قادمة قريباً'}
                          </span>
                          <h5 className="font-bold text-xs text-slate-900 mt-1">{convoy.title}</h5>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1 font-mono">
                            <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{convoy.location}</span>
                            <span>|</span>
                            <span>{convoy.date}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-2 line-clamp-3 leading-relaxed">{convoy.description}</p>
                        </div>

                        {convoy.status === 'completed' && (
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/50 text-center">
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="block text-xs font-bold font-mono text-emerald-800">{convoy.beneficiariesCount}</span>
                              <span className="text-[9px] text-slate-400">مستفيد صحي</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="block text-xs font-bold font-mono text-emerald-800">{convoy.volunteersCount}</span>
                              <span className="text-[9px] text-slate-400">كادر متطوع</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: ACADEMIC GUIDE */}
        {activeTab === 'academic-guide' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn" id="guide-tab-view">
            
            {/* Left & Middle: Academic rules */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="font-bold text-slate-950 text-base">📖 لائحة التدريب الأكاديمي والسريري المعتمدة</h4>
                  <p className="text-xs text-slate-400">الصادرة بقرار مجلس الكلية برئاسة العمادة وعضوية النواب الأكاديميين لدفعة البكالوريوس</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h5 className="font-bold text-xs text-emerald-900">المادة (1): الحضور والغياب في التدريب السريري</h5>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      يُشترط للجلوس للامتحانات النهائية ألا تقل نسبة حضور الطالب للدروس العملية والسريرية والعيادات الخارجية والمرور السريري بمستشفى كسلا التعليمي عن 85%. في حال تدني النسبة، يُحرم الطالب من دخول الملحق أو تقييم نهاية الكورس إلا بعد تبرير رسمي معتمد من رئيس القسم والنائب الأكاديمي.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h5 className="font-bold text-xs text-emerald-900">المادة (2): آلية التقييم المستمر وكتاب التدريب العملي (Logbook)</h5>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      يُمنح كل طالب استمارة تقييم سريري ودفتر تدريب يومي (Logbook) يجب تعبئته وتوقيعه بواسطة الطبيب الاختصاصي أو الاستشاري المشرف بالقسم. تُخصص 20% من الدرجة الكلية للكورس لتقييم الحضور والأداء السلوكي والمهاري للطلاب داخل العنابر بالمستشفى.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h5 className="font-bold text-xs text-emerald-900">المادة (3): الكورسات الحقلية وطب المجتمع الريفي</h5>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      يُعتبر حضور الكورس الحقل الطبي بمنطقة ريف كسلا إلزامياً لجميع طلاب السنة الرابعة تحت إشراف قسم طب المجتمع والبيئة. يلتزم الطلاب بإعداد دراسة وبائية ومسح وبائي مصغر للمنطقة المستهدفة كجزء من متطلبات التخرج.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-400">آخر مراجعة للائحة: سبتمبر 2025</span>
                  <span className="flex items-center gap-1.5 text-emerald-800 font-bold cursor-pointer hover:underline">
                    <FileCheck className="h-4 w-4" />
                    <span>تحميل اللائحة الكاملة (PDF)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Technical Support & Faculty emails list */}
            <div className="space-y-6">
              {/* @kassala.edu.sd Email activation info */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-950 text-sm">📧 تفعيل حساب البريد الإلكتروني الجامعي الموحد</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  تلتزم إدارة الكلية بالتعاون مع إدارة IT الجامعة بتوفير بريد إلكتروني رسمي ينتهي بالنطاق <strong className="text-emerald-950 font-mono">@kassala.edu.sd</strong> لكل عضو هيئة تدريس وطالب بالكلية للوصول للأبحاث، والمجلات الطبية، ونظام الـ LMS.
                </p>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs space-y-2">
                  <span className="font-bold text-emerald-900 block">خطوات التقديم والتفعيل:</span>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                    <li>تقديم طلب تفعيل من خلال لوحة الإدارة بالتنسيق مع ضابط اتصال قسمك.</li>
                    <li>يقوم فريق الـ IT بمراجعة الهوية الأكاديمية وصياغة الحساب في خوادم الجامعة.</li>
                    <li>يصلك إشعار بالبيانات وكلمة السر المؤقتة في غضون 48 ساعة عمل.</li>
                  </ol>
                </div>
              </div>

              {/* Portal Operations Committee Overview */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <h4 className="font-bold text-slate-950 text-sm">🤝 لجنة تشغيل وإدارة الموقع</h4>
                <p className="text-[11px] text-slate-400">توصية تشغيل الموقع والبيانات المعتمدة لضمان استمراريته:</p>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex gap-2 items-start">
                    <span className="text-emerald-800 font-bold">✓</span>
                    <span>اجتماع دوري (مرتين سنوياً) لمراجعة جودة البيانات.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-emerald-800 font-bold">✓</span>
                    <span>مقرر اللجنة يقوم بجدولة مهام ضباط اتصال الأقسام وإدراج الشكاوى التقنية المستلمة.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-emerald-800 font-bold">✓</span>
                    <span>تخزين وأرشفة جميع حلقات بودكاست الكلية والنشاطات الطبية في سيرفرات مركز المعلوماتية.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'public-bulletin' && (
          <div className="space-y-12 animate-fadeIn" id="public-bulletin-view">
            
            {/* Header intro */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1 text-right">
                  <span className="inline-block text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200/60 font-black px-3 py-1 rounded-full">
                    البوابة الطبية التوعوية المعتمدة للجمهور
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-slate-950 mt-1">النشرة الصحية والتثقيفية لعامة المواطنين</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mt-1">
                    تلتزم كلية الطب والعلوم الصحية بجامعة كسلا بتقديم الإرشادات الطبية الموثوقة والتحذيرات الصحية العاجلة لمواطني ولاية كسلا ومحلياتها المختلفة، بالتنسيق مع قسم طب المجتمع والبيئة ورابطة الطلاب.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-900 border border-emerald-200 p-3 rounded-2xl shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                  <div className="text-right text-[11px]">
                    <span className="font-bold block">محتوى طبي معتمد</span>
                    <span className="text-slate-500">مُرخَّص من لجنة الإشراف الأكاديمي</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main grid: 2 Columns (Right: Health alerts / leaflets; Left: subscription & custom requests) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Right Column: Alerts & Leaflets (8/12) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* 1. Flash Alerts Panel */}
                <div className="bg-amber-50/50 border border-amber-200 p-6 rounded-3xl space-y-4 text-right">
                  <h4 className="font-black text-amber-900 text-sm flex items-center gap-2 justify-start">
                    <AlertCircle className="h-5 w-5 text-amber-700 shrink-0" />
                    توجيهات وتحذيرات طبية عاجلة (شرق السودان)
                  </h4>
                  
                  <div className="space-y-3">
                    {[
                      {
                        id: 'adv-1',
                        title: 'الوقاية من حمى الضنك وحمى الشيكونغونيا ونواقل الأمراض',
                        dept: 'قسم طب المجتمع والبيئة والأحياء الدقيقة',
                        date: 'تم التحديث اليوم',
                        short: 'إرشادات أساسية لتجنب تكاثر بعوض الإيديس (Aedes) في المياه الراكدة والمنزلية.',
                        content: 'تُنبه إدارة الكلية المواطنين الكرام بضرورة تغطية أواني تخزين المياه المنزلية بإحكام وتفريغ غسالات الهواء والمكيفات كل 3 أيام، حيث ينشط بعوض الإيديس الناقل لحمى الضنك داخل المنازل وفي المياه النظيفة المكشوفة. يُنصح باستخدام الناموسيات المشبعة، والمبادرة بطلب المساعدة الطبية في حال ظهور حمى مفاجئة مصحوبة بآلام خلف العينين والمفاصل.'
                      },
                      {
                        id: 'adv-2',
                        title: 'طرق تفادي النزلات المعوية الحادة والكوليرا في موسم الأمطار والفيضانات',
                        dept: 'قسم الطب الباطني وقسم الأطفال',
                        date: 'تم النشر منذ يومين',
                        short: 'إرشادات النظافة الشخصية وتطهير مياه الشرب لضمان سلامة الأطفال والمجتمعات.',
                        content: 'أهم خطوة للوقاية هي غلي مياه الشرب أو تعقيمها بالكلور المخصص قبل استخدامها. يجب غسل اليدين بالصابون والماء الجاري قبل تناول الطعام وتجهيزه. عند إصابة أي فرد بوعكة معوية، يجب بدء استخدام محلول الإرواء الفموي (ORS) فوراً والتوجه لأقرب مركز رعاية لتجنب حدوث الجفاف الحاد.'
                      }
                    ].map((adv) => (
                      <div key={adv.id} className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs space-y-2 text-right hover:border-amber-200 transition">
                        <div className="flex justify-between items-start gap-4">
                          <div className="text-right">
                            <span className="text-[9px] bg-amber-50 text-amber-800 border border-amber-200/50 px-2.5 py-0.5 rounded font-black">
                              {adv.dept}
                            </span>
                            <h5 className="font-black text-slate-900 text-xs mt-1.5 hover:text-amber-800 transition cursor-pointer" onClick={() => setActiveAdvisoryId(activeAdvisoryId === adv.id ? null : adv.id)}>
                              {adv.title}
                            </h5>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0">{adv.date}</span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">{adv.short}</p>
                        
                        {activeAdvisoryId === adv.id ? (
                          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl space-y-2 text-right">
                            <p className="font-medium">{adv.content}</p>
                            <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-emerald-800 font-bold pt-2 gap-2">
                              <span>✓ تم التحقق والموافقة الأكاديمية بواسطة النائب الأكاديمي</span>
                              <button onClick={() => setActiveAdvisoryId(null)} className="text-amber-800 hover:underline">إغلاق التفاصيل ×</button>
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setActiveAdvisoryId(adv.id)} 
                            className="text-[11px] text-amber-800 font-black hover:underline mt-1 block cursor-pointer"
                          >
                            عرض التعليمات الطبية والوقائية الكاملة ←
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Educational Leaflets with Search & Likes */}
                <div className="space-y-4 text-right">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="font-black text-slate-950 text-sm">الكتيبات الطبية والنشرات الإرشادية المصغرة</h4>
                      <p className="text-xs text-slate-500">نشرات مبسطة صاغها طلاب الكلية برعاية طب المجتمع للتنزيل والطباعة للجمهور</p>
                    </div>
                    
                    {/* Leaflet search bar */}
                    <div className="relative shrink-0">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="ابحث عن نشرة معينة..."
                        value={leafletSearch}
                        onChange={(e) => setLeafletSearch(e.target.value)}
                        className="w-full sm:w-60 pl-3 pr-9 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 text-slate-700 text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="leaflet-advisories-grid">
                    {[
                      {
                        id: 'l-1',
                        title: 'دليل الوقاية من ضربات الشمس في مناخ كسلا الصيفي',
                        author: 'إعداد: اللجنة العلمية برابطة الطلاب (KaMSA)',
                        downloads: '425 تحميل',
                        pages: 'صفحة واحدة (ملصق حائطي جداري)',
                        desc: 'يتضمن نصائح شرب السوائل، تمييز أعراض الإجهاد الحراري، وكيفية إسعاف المصاب فوراً بالتبريد المائي.'
                      },
                      {
                        id: 'l-2',
                        title: 'كتيب سلامة الأغذية وطرق غسل الخضروات الورقية بكسلا',
                        author: 'إشراف: قسم الأحياء الدقيقة وطب المجتمع',
                        downloads: '284 تحميل',
                        pages: 'كتيب من 4 صفحات ملون',
                        desc: 'طرق التطهير بمواد طبيعية متوفرة منزلياً، تفادي تلوث السالمونيلا والملتويات الطفيلية.'
                      },
                      {
                        id: 'l-3',
                        title: 'الملصق الإرشادي لرعاية الأم الحامل وتغذيتها في الأرياف',
                        author: 'إشراف: قسم أمراض النساء والتوليد',
                        downloads: '610 تحميل',
                        pages: 'بوستر توعوي مصور ومبسط',
                        desc: 'أهم الفحوصات الدورية، علامات الخطر التي توجب التوجه فوراً لمستشفى كسلا التعليمي.'
                      }
                    ]
                    .filter(l => l.title.includes(leafletSearch) || l.desc.includes(leafletSearch))
                    .map((l) => (
                      <div key={l.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between space-y-4 text-right">
                        <div className="space-y-2">
                          <span className="inline-block text-[10px] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded font-bold">
                            {l.pages}
                          </span>
                          <h5 className="font-black text-slate-900 text-xs leading-snug">
                            {l.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 block">{l.author}</span>
                          <p className="text-slate-500 text-xs leading-relaxed">
                            {l.desc}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                          <button 
                            onClick={() => handleLeafletLike(l.id)}
                            className={`flex items-center gap-1.5 font-bold transition ${
                              leafletUserLiked[l.id] ? 'text-emerald-700' : 'text-slate-400 hover:text-emerald-700'
                            }`}
                          >
                            <Heart className={`h-3.5 w-3.5 ${leafletUserLiked[l.id] ? 'fill-current' : ''}`} />
                            <span>مفيد وموثوق</span>
                            <span className="font-mono bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded text-[10px]">
                              {leafletLikes[l.id]}
                            </span>
                          </button>
                          
                          <span className="text-emerald-700 font-extrabold flex items-center gap-1 hover:underline cursor-pointer">
                            <span>تحميل المنشور (PDF)</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Left Column: Subscriptions & Requesting Convoys (4/12) */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* 1. Subscription Box */}
                <div className="bg-emerald-950 text-white p-6 rounded-3xl border border-emerald-900/40 space-y-4 relative overflow-hidden shadow-md text-right">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent)] pointer-events-none" />
                  
                  <div className="relative z-10 space-y-3">
                    <span className="inline-block text-[9px] bg-emerald-800 text-emerald-300 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      النشرة البريدية الأسبوعية
                    </span>
                    <h4 className="font-black text-sm text-white flex items-center gap-1.5 justify-start">
                      <Mail className="h-4 w-4 text-emerald-400" />
                      <span>الاشتراك في النشرة البريدية العامة</span>
                    </h4>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      احصل على تقارير الحميات الأسبوعية، ونصائح الأطباء المشرفين، ومواعيد ومواقع انطلاق القوافل الطبية المجانية مباشرة في بريدك.
                    </p>

                    {isNewsletterSuccess ? (
                      <div className="bg-emerald-900/80 border border-emerald-500 p-4 rounded-2xl text-center space-y-2 animate-fadeIn">
                        <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto" />
                        <span className="font-bold text-xs text-emerald-300 block">تم اشتراكك بنجاح!</span>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                          تم تسجيل بريدك الإلكتروني بنجاح في قاعدة بيانات المشتركين العمومية. ستصلك النشرات الطبية دورياً.
                        </p>
                        <button 
                          onClick={() => {
                            setIsNewsletterSuccess(false);
                            setNewsletterForm({ name: '', email: '' });
                          }} 
                          className="text-[10px] underline text-emerald-400 font-bold block mx-auto mt-2"
                        >
                          تسجيل بريد آخر
                        </button>
                      </div>
                    ) : (
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!newsletterForm.name || !newsletterForm.email) return;
                          setIsNewsletterSubmitting(true);
                          setTimeout(() => {
                            setIsNewsletterSubmitting(false);
                            setIsNewsletterSuccess(true);
                          }, 1200);
                        }}
                        className="space-y-3 pt-2 text-right"
                      >
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-300">الاسم الكامل:</label>
                          <input
                            type="text"
                            required
                            value={newsletterForm.name}
                            onChange={(e) => setNewsletterForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="أدخل اسمك الكريم"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 placeholder-slate-400 text-right"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-300">البريد الإلكتروني المفضل:</label>
                          <input
                            type="email"
                            required
                            value={newsletterForm.email}
                            onChange={(e) => setNewsletterForm(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="example@domain.com"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 placeholder-slate-400 text-left"
                            dir="ltr"
                          />
                        </div>

                        <div className="space-y-1.5 pt-1 text-right">
                          <span className="block text-[10px] font-bold text-slate-300">مجالات الاهتمام الطبية:</span>
                          <div className="space-y-2 text-[10px] text-slate-200">
                            {[
                              { id: 'fever', label: 'الوقاية من الحميات والأوبئة' },
                              { id: 'convoys', label: 'مواعيد وأخبار القوافل الطبية' },
                              { id: 'child', label: 'صحة ورعاية صحة الطفل والأم' },
                              { id: 'uni', label: 'أخبار الأنشطة والتدريب بالكلية' }
                            ].map((interest) => (
                              <label key={interest.id} className="flex items-center gap-2 cursor-pointer hover:text-white justify-start">
                                <input
                                  type="checkbox"
                                  checked={newsletterInterests.includes(interest.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setNewsletterInterests(prev => [...prev, interest.id]);
                                    } else {
                                      setNewsletterInterests(prev => prev.filter(i => i !== interest.id));
                                    }
                                  }}
                                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span>{interest.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isNewsletterSubmitting}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 rounded-xl text-xs transition duration-300 cursor-pointer disabled:opacity-50"
                        >
                          {isNewsletterSubmitting ? 'جاري الاشتراك...' : 'تأكيد الاشتراك في القائمة البريدية'}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* 2. Interactive Community Proposed Convoys Request */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 text-right">
                  <h4 className="font-black text-slate-950 text-sm flex items-center gap-1.5 justify-start">
                    <MapPin className="h-4 w-4 text-emerald-800" />
                    <span>اقتراح تسيير قافلة صحية لبلدة جديدة</span>
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    هل تعاني قريتك أو منطقتك بولاية كسلا من نقص في التغطية الطبية؟ قدّم طلباً مسبقاً للجنة التنسيق المشتركة بكلية الطب لدراسة تسيير القافلة الطبية القادمة إلى قريتكم.
                  </p>

                  {/* List of current community proposals */}
                  <div className="space-y-3 pt-1">
                    <span className="block text-[10px] font-bold text-slate-400">القرى المقترحة الحالية من المواطنين:</span>
                    {proposedVillages.map((pv) => (
                      <div key={pv.id} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs text-right">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-slate-900">{pv.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{pv.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          <strong className="text-slate-700">المشكلة الصحية:</strong> {pv.issue}
                        </p>
                        <div className="flex justify-between items-center text-[10px] pt-1">
                          <span className="text-slate-400">التقدير: {pv.population}</span>
                          
                          <button 
                            onClick={() => {
                              setProposedVillages(prev => prev.map(p => p.id === pv.id ? { ...p, votes: p.votes + 1 } : p));
                            }}
                            className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-lg text-emerald-800 font-bold flex items-center gap-1 cursor-pointer transition"
                          >
                            <span>تأييد الطلب</span>
                            <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-100">{pv.votes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Proposal Form */}
                  {isProposalSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-2 animate-fadeIn text-xs text-slate-700">
                      <CheckCircle2 className="h-6 w-6 text-emerald-700 mx-auto" />
                      <strong className="font-bold text-emerald-900 block">تم تقديم اقتراح القرية بنجاح!</strong>
                      <p className="text-[10px] text-slate-500 leading-relaxed">
                        تم إدراج طلبكم في قائمة المقترحات المجتمعية. ستقوم لجنة تشغيل البوابة والأمانة الصحية برابطة الطلاب بدراسة البيانات والتحقق منها.
                      </p>
                      <button 
                        onClick={() => {
                          setIsProposalSuccess(false);
                          setNewProposal({ name: '', population: '', issue: '', phone: '' });
                        }}
                        className="text-[10px] font-bold text-emerald-700 underline block mx-auto"
                      >
                        تقديم اقتراح لقرية أخرى
                      </button>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newProposal.name || !newProposal.issue || !newProposal.phone) return;
                        setIsProposalSubmitting(true);
                        setTimeout(() => {
                          const newPv = {
                            id: `pv-${Date.now()}`,
                            name: newProposal.name,
                            population: newProposal.population || 'غير محدد',
                            issue: newProposal.issue,
                            phone: newProposal.phone,
                            date: 'الآن',
                            votes: 1
                          };
                          setProposedVillages(prev => [...prev, newPv]);
                          setIsProposalSubmitting(false);
                          setIsProposalSuccess(true);
                        }, 1200);
                      }}
                      className="space-y-3 pt-2 border-t border-slate-100 text-right"
                    >
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-600">اسم القرية أو الحي المقترح:</label>
                        <input
                          type="text"
                          required
                          value={newProposal.name}
                          onChange={(e) => setNewProposal(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="مثال: قرية ود الحليو"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 placeholder-slate-400 text-right"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-600">التعداد التقريبي:</label>
                          <input
                            type="text"
                            value={newProposal.population}
                            onChange={(e) => setNewProposal(prev => ({ ...prev, population: e.target.value }))}
                            placeholder="مثال: 5000 مواطن"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 placeholder-slate-400 text-right"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-600">رقم هاتف الاتصال:</label>
                          <input
                            type="text"
                            required
                            value={newProposal.phone}
                            onChange={(e) => setNewProposal(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="09XXXXXXXX"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 placeholder-slate-400 text-left"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-600">تفاصيل المشكلة الطبية أو الوباء:</label>
                        <textarea
                          required
                          rows={2}
                          value={newProposal.issue}
                          onChange={(e) => setNewProposal(prev => ({ ...prev, issue: e.target.value }))}
                          placeholder="يرجى ذكر المشكلة الصحية الرئيسية بالمنطقة..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 placeholder-slate-400 text-right"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isProposalSubmitting}
                        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-black py-2 rounded-xl text-xs transition cursor-pointer disabled:opacity-50 shadow-sm"
                      >
                        {isProposalSubmitting ? 'جاري الإرسال...' : 'إرسال الاقتراح للجنة التنسيق المشتركة'}
                      </button>
                    </form>
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

        {activeTab === 'gallery' && (
          <MediaGallery />
        )}

      </main>

      {/* Portal Footer */}
      <footer className="bg-gradient-to-b from-[#081815] to-[#040e0c] text-slate-300 text-xs py-10 px-4 mt-12 border-t border-emerald-900/30 animate-fadeIn" id="portal-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-right">
            <p className="font-bold text-white mb-1">كلية الطب والعلوم الصحية - جامعة كسلا</p>
            <p className="text-[10px] text-slate-500">البوابة الرقمية التنسيقية المشتركة بين العمادة والأقسام ورابطة الطلاب © 2026. جميع الحقوق محفوظة.</p>
          </div>
          <div className="flex space-x-4 space-x-reverse font-medium text-slate-400">
            <a href="https://kassala.edu.sd" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">الموقع الأكاديمي الرئيسي</a>
            <span>•</span>
            <button onClick={() => { setActiveTab('departments'); }} className="hover:text-emerald-400 transition">الأقسام العلمية</button>
            <span>•</span>
            <button onClick={() => { setActiveTab('kamsa'); }} className="hover:text-emerald-400 transition">بودكاست الكلية</button>
            <span>•</span>
            <button onClick={() => { setActiveTab('gallery'); }} className="hover:text-emerald-400 transition">معرض الصور</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
