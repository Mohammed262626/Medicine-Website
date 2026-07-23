import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon, 
  ZoomIn, 
  Eye, 
  Heart, 
  Calendar, 
  MapPin, 
  UploadCloud, 
  X, 
  Check, 
  Camera,
  Info
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'campus' | 'clinical' | 'convoy' | 'lab';
  imageUrl: string;
  date: string;
  location: string;
  views: number;
  likes: number;
  photographer: string;
}

export default function MediaGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewSize, setViewSize] = useState<'large' | 'cinema'>('cinema');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>({
    '1': 142,
    '2': 189,
    '3': 234,
    '4': 115,
  });

  // Photo upload submission simulation
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'campus',
    photographer: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Stateful gallery items allowing live uploads/additions
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: '1',
      title: 'طلاب الدفعة الجديدة بكلية الطب والعلوم الصحية',
      description: 'لقاء تعريفي وتوجيهي للطلاب الجدد في فناء الكلية بحضور عميد الكلية والنائب الأكاديمي، لبدء مسارهم المهني الطبي بكل همة وتفانٍ.',
      category: 'campus',
      imageUrl: '/src/assets/images/kassala_med_students_1784710226776.jpg',
      date: '15 يوليو 2026',
      location: 'مجمع الكليات الطبية، جامعة كسلا',
      views: 524,
      likes: 142,
      photographer: 'أنس عثمان - اللجنة الإعلامية KaMSA',
    },
    {
      id: '2',
      title: 'جلسة تدريب سريري تفاعلية بمستشفى كسلا التعليمي',
      description: 'أعضاء هيئة التدريس الأكفاء يشرفون على تدريب أطباء الامتياز وطلاب الكلية حول فحص العلامات الحيوية وتطبيق محاكاة الرعاية الحرجة للمرضى.',
      category: 'clinical',
      imageUrl: '/src/assets/images/kassala_teaching_hospital_1784710241883.jpg',
      date: '10 يوليو 2026',
      location: 'عنابر الباطنية، مستشفى كسلا التعليمي',
      views: 748,
      likes: 189,
      photographer: 'د. مجدي حسن - منسق التدريب الإكلينيكي',
    },
    {
      id: '3',
      title: 'قافلة طبية شاملة تخدم القرى المحيطة بجبال التاكا',
      description: 'رابطة طلاب الطب (KaMSA) تسير قافلة طبية كبرى تشمل الكشف الطبي المجاني، الفحوصات المعملية، وصرف الأدوية والتثقيف الصحي للأسر المتعففة.',
      category: 'convoy',
      imageUrl: '/src/assets/images/kamsa_health_convoy_1784710256947.jpg',
      date: '3 يوليو 2026',
      location: 'قرية ريفي كسلا، جبال التاكا الشرقية',
      views: 932,
      likes: 234,
      photographer: 'محمد صلاح - الأمانة الإعلامية KaMSA',
    },
    {
      id: '4',
      title: 'مختبر أبحاث الأحياء الدقيقة وعلم الأمراض المتطور',
      description: 'جانب من التجهيزات المعملية الحديثة بالكلية، حيث يتلقى الطلاب دروساً عملية تفصيلية على المجاهر لفحص العينات الطبية وبحوث الوبائيات المحلية.',
      category: 'lab',
      imageUrl: '/src/assets/images/kassala_medical_lab_1784710272789.jpg',
      date: '28 يونيو 2026',
      location: 'مختبرات البحوث الطبية، مبنى الكلية الرئيسي',
      views: 412,
      likes: 115,
      photographer: 'هند سليمان - ضابط اتصال قسم الأحياء الدقيقة',
    },
  ]);

  const categories = [
    { id: 'all', name: 'جميع الصور والأنشطة' },
    { id: 'campus', name: 'الحياة الجامعية والطلاب' },
    { id: 'clinical', name: 'التدريب السريري والعملي' },
    { id: 'convoy', name: 'القوافل الصحية ومجتمع كسلا' },
    { id: 'lab', name: 'المختبرات والبحث العلمي' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = !likedItems[id];
    setLikedItems(prev => ({ ...prev, [id]: isLiked }));
    setLikesCount(prev => {
      const updatedVal = isLiked ? (prev[id] || 0) + 1 : (prev[id] || 0) - 1;
      const updated = {
        ...prev,
        [id]: updatedVal
      };
      
      // Sync in list state too so likes stay active on both lists
      setGalleryItems(prevItems => prevItems.map(item => item.id === id ? {
        ...item,
        likes: updatedVal
      } : item));

      return updated;
    });
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.photographer) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newId = `uploaded-${Date.now()}`;
      
      // Select appropriate placeholder based on category
      let placeholderUrl = '/src/assets/images/kassala_med_students_1784710226776.jpg';
      if (uploadForm.category === 'clinical') {
        placeholderUrl = '/src/assets/images/kassala_teaching_hospital_1784710241883.jpg';
      } else if (uploadForm.category === 'convoy') {
        placeholderUrl = '/src/assets/images/kamsa_health_convoy_1784710256947.jpg';
      } else if (uploadForm.category === 'lab') {
        placeholderUrl = '/src/assets/images/kassala_medical_lab_1784710272789.jpg';
      }

      const newItem: GalleryItem = {
        id: newId,
        title: uploadForm.title,
        description: uploadForm.description || 'صورة توثيقية تمت مشاركتها بواسطة أحد زوار البوابة للمشروع الأكاديمي.',
        category: uploadForm.category as 'campus' | 'clinical' | 'convoy' | 'lab',
        imageUrl: placeholderUrl,
        date: 'الآن',
        location: uploadForm.location || 'كلية الطب والعلوم الصحية، جامعة كسلا',
        views: 12,
        likes: 0,
        photographer: uploadForm.photographer,
      };

      setLikesCount(prev => ({ ...prev, [newId]: 0 }));
      setGalleryItems(prev => [newItem, ...prev]);
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowUploadModal(false);
        setUploadForm({
          title: '',
          description: '',
          category: 'campus',
          photographer: '',
          location: '',
        });
      }, 2000);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="media-gallery-module">
      
      {/* Visual Header / Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#0e2722] text-white rounded-3xl p-6 md:p-8 border border-emerald-800/30 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-emerald-400" />
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase">
              المستند البصري الموثق
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold">معرض الصور والأنشطة الميدانية</h3>
          <p className="text-xs text-slate-400 max-w-xl">
            نافذة تفاعلية توثق مسيرة التميز الطبي لطلاب كلية الطب بجامعة كسلا، من تدريب إكلينيكي في المشافي وقوافل صحية تخدم ربوع الولاية إلى كواليس المعامل والبحوث.
          </p>
        </div>
        <div className="relative z-10 shrink-0">
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-950/45"
          >
            <UploadCloud className="h-4 w-4" />
            <span>شاركنا بصورة توثيقية</span>
          </button>
        </div>
      </div>

      {/* Categories / Filter Navigation & Layout Switches */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/60" id="gallery-category-filters">
        <div className="flex flex-wrap gap-2 overflow-x-auto py-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dynamic Size Control Switches */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50 self-end md:self-auto shrink-0 shadow-inner">
          <button
            onClick={() => setViewSize('cinema')}
            className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              viewSize === 'cinema'
                ? 'bg-white text-emerald-900 shadow-md font-black border border-slate-200/20'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>تخطيط موسّع</span>
          </button>
          <button
            onClick={() => setViewSize('large')}
            className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              viewSize === 'large'
                ? 'bg-white text-emerald-900 shadow-md font-black border border-slate-200/20'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>تخطيط قياسي</span>
          </button>
        </div>
      </div>

      {/* Grid Display: Larger size option support */}
      <div 
        className={`grid grid-cols-1 ${
          viewSize === 'cinema' 
            ? 'md:grid-cols-2 lg:grid-cols-2 gap-10 xl:gap-12' 
            : 'md:grid-cols-2 lg:grid-cols-3 gap-6'
        }`} 
        id="gallery-image-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300/80 transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Frame with larger aspect ratios for Cinema Mode */}
              <div className={`relative overflow-hidden bg-slate-100 ${
                viewSize === 'cinema' ? 'aspect-[16/9]' : 'aspect-[16/10] md:aspect-[4/3]'
              }`}>
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                
                {/* Visual indicators */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
                  <span className="text-xs text-white/95 font-bold flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl">
                    <ZoomIn className="h-4 w-4 text-emerald-400" />
                    توسيع العرض بالتفصيل
                  </span>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-emerald-900/90 text-emerald-100 border border-emerald-800/40 px-3 py-1.5 rounded font-black">
                      {categories.find(c => c.id === item.category)?.name.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Micro Tag in corner */}
                <span className="absolute top-4 right-4 text-[10px] font-black bg-white/95 text-emerald-950 backdrop-blur-xs border border-slate-200/60 px-3 py-1 rounded-full shadow-xs">
                  {item.date}
                </span>
              </div>

              {/* Text metadata info with larger sizing for Cinema Mode */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className={`font-black text-slate-950 group-hover:text-emerald-900 transition leading-snug ${
                    viewSize === 'cinema' ? 'text-base' : 'text-sm'
                  }`}>
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-bold text-slate-600">
                    <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-44">{item.location.split('،')[1] || item.location}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => handleLike(item.id, e)}
                      className={`flex items-center gap-1.5 transition ${likedItems[item.id] ? 'text-rose-600 font-bold' : 'hover:text-rose-600'}`}
                    >
                      <Heart className={`h-4 w-4 ${likedItems[item.id] ? 'fill-rose-600 text-rose-600' : ''}`} />
                      <span className="text-xs font-bold">{likesCount[item.id]}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal / Popup for detailed image view */}
      <AnimatePresence>
        {activeItem && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveItem(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full border border-slate-200 shadow-2xl text-right flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Area */}
              <div className="relative md:w-2/3 bg-black flex items-center justify-center aspect-video md:aspect-auto">
                <img 
                  src={activeItem.imageUrl} 
                  alt={activeItem.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover max-h-[640px] md:max-h-[720px]"
                />
                <button 
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition border border-white/10 md:hidden"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Metadata details Area */}
              <div className="p-8 md:w-1/3 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full font-bold">
                      {categories.find(c => c.id === activeItem.category)?.name}
                    </span>
                    <button 
                      onClick={() => setActiveItem(null)}
                      className="hidden md:flex bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-950 leading-snug">
                    {activeItem.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {activeItem.description}
                  </p>

                  <div className="space-y-2 mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                      <span>تاريخ الالتقاط: <strong>{activeItem.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                      <span className="leading-tight">الموقع البصري: <strong>{activeItem.location}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                      <span>تصوير: <strong className="text-slate-700">{activeItem.photographer}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{activeItem.views + 120} مشاهدة</span>
                    </span>
                  </div>
                  
                  <button 
                    onClick={(e) => handleLike(activeItem.id, e)}
                    className={`flex items-center gap-1.5 text-xs py-2 px-4 rounded-xl border transition ${
                      likedItems[activeItem.id] 
                        ? 'bg-rose-50 border-rose-200 text-rose-600 font-bold' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${likedItems[activeItem.id] ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span>أعجبني ({likesCount[activeItem.id]})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Suggestion Form Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl text-right space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-emerald-700" />
                  <h4 className="font-extrabold text-sm text-slate-900">مشاركة مادة بصريّة أو صورة</h4>
                </div>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <h5 className="font-bold text-slate-950 text-sm">تم إرسال الصورة بنجاح!</h5>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    شكراً لمساهمتك البصرية. سيقوم ضابط الاتصال أو الأمانة الإعلامية للرابطة بمراجعة جودة الصورة ومطابقتها قبل نشرها في المعرض العام للجمهور.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">عنوان الصورة / الحدث *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="مثال: القافلة الصحية السابعة لريف كسلا"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-700 text-right bg-slate-50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">الوصف أو التفاصيل والزملاء بالصورة</label>
                    <textarea 
                      placeholder="صف الحدث وأهم تفاصيله..."
                      rows={3}
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-700 text-right bg-slate-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">فئة الصورة *</label>
                      <select 
                        value={uploadForm.category}
                        onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-700 text-right bg-slate-50"
                      >
                        <option value="campus">الحياة الجامعية والطلاب</option>
                        <option value="clinical">التدريب السريري والعملي</option>
                        <option value="convoy">القوافل الصحية</option>
                        <option value="lab">المختبرات والبحث</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">الموقع / المرفق</label>
                      <input 
                        type="text" 
                        placeholder="مثال: مستشفى كسلا"
                        value={uploadForm.location}
                        onChange={(e) => setUploadForm({ ...uploadForm, location: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-700 text-right bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">اسم الملتقط أو المصور *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="مثال: طالبة طب - الدفعة ٢٥"
                      value={uploadForm.photographer}
                      onChange={(e) => setUploadForm({ ...uploadForm, photographer: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-700 text-right bg-slate-50"
                    />
                  </div>

                  {/* Simulated drag & drop area */}
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition cursor-pointer">
                    <ImageIcon className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <span className="block text-xs font-bold text-slate-700">اسحب الملف هنا أو انقر للتصفح</span>
                    <span className="block text-[10px] text-slate-400 mt-1">تنسيقات مدعومة: JPG, PNG (حد أقصى 10 ميغابايت)</span>
                  </div>

                  {/* Info alert about validation */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[10px] text-amber-900 leading-relaxed flex gap-2 items-start">
                    <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                    <p>
                      تخضع جميع الصور والمواد البصريّة المرفوعة هنا لتدقيق ومراجعة الأمانة الإعلامية لـ <strong>KaMSA</strong> أو <strong>اللجنة المشتركة بالعمادة</strong> لضمان حماية خصوصية المرضى والالتزام بأخلاقيات المهنة قبل النشر العام.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-900 hover:bg-emerald-800 disabled:bg-emerald-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <UploadCloud className="h-4 w-4 animate-pulse" />
                        <span>يجري إرسال الصورة للتنسيق...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-4 w-4" />
                        <span>إرسال الصورة للتحكيم والنشر</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
