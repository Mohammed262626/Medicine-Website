/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  BookOpen, 
  Radio, 
  Handshake, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  RefreshCw, 
  Trash2, 
  MessageSquare, 
  Clock, 
  Sliders, 
  FileText, 
  UserPlus, 
  Send,
  AlertCircle,
  Edit,
  Save,
  Search,
  Filter
} from 'lucide-react';
import { Department, NewsItem, PodcastEpisode, ITRequest, CommitteeTask, BiannualMeeting, MedicalConvoy, Course, FacultyMember, DepartmentResearch, ScheduleEvent } from '../types';

interface CommitteeConsoleProps {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  podcasts: PodcastEpisode[];
  setPodcasts: React.Dispatch<React.SetStateAction<PodcastEpisode[]>>;
  convoys: MedicalConvoy[];
  setConvoys: React.Dispatch<React.SetStateAction<MedicalConvoy[]>>;
  itRequests: ITRequest[];
  setItRequests: React.Dispatch<React.SetStateAction<ITRequest[]>>;
  committeeTasks: CommitteeTask[];
  setCommitteeTasks: React.Dispatch<React.SetStateAction<CommitteeTask[]>>;
  meetings: BiannualMeeting[];
  setMeetings: React.Dispatch<React.SetStateAction<BiannualMeeting[]>>;
}

type CommitteeRole = 'level-1-dean' | 'level-2-it' | 'level-3-academic' | 'level-4-kamsa' | 'joint-committee';

export default function CommitteeConsole({
  departments,
  setDepartments,
  news,
  setNews,
  podcasts,
  setPodcasts,
  convoys,
  setConvoys,
  itRequests,
  setItRequests,
  committeeTasks,
  setCommitteeTasks,
  meetings,
  setMeetings
}: CommitteeConsoleProps) {
  
  const [activeRole, setActiveRole] = useState<CommitteeRole>('joint-committee');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Advanced News Management states
  const [newsSearchTerm, setNewsSearchTerm] = useState('');
  const [newsStatusFilter, setNewsStatusFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  
  // Edit Form States
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editStatus, setEditStatus] = useState<'pending' | 'approved'>('approved');
  const [editDate, setEditDate] = useState('');

  // Create Form States (Inside News Panel)
  const [createTitle, setCreateTitle] = useState('');
  const [createContent, setCreateContent] = useState('');
  const [createCategory, setCreateCategory] = useState('إعلانات إدارية');
  const [createAuthor, setCreateAuthor] = useState('لجنة التنسيق المشتركة');
  const [createStatus, setCreateStatus] = useState<'approved' | 'pending'>('approved');
  const [createDate, setCreateDate] = useState(new Date().toISOString().split('T')[0]);

  // Forms state for Level 4: KaMSA Media
  const [newDraftTitle, setNewDraftTitle] = useState('');
  const [newDraftContent, setNewDraftContent] = useState('');
  const [newDraftCategory, setNewDraftCategory] = useState('أنشطة طلابية');
  
  const [newPodTitle, setNewPodTitle] = useState('');
  const [newPodGuest, setNewPodGuest] = useState('');
  const [newPodHost, setNewPodHost] = useState('');
  const [newPodDuration, setNewPodDuration] = useState('25:00');
  const [newPodDesc, setNewPodDesc] = useState('');

  const [newConvoyTitle, setNewConvoyTitle] = useState('');
  const [newConvoyLocation, setNewConvoyLocation] = useState('');
  const [newConvoyBeneficiaries, setNewConvoyBeneficiaries] = useState(500);
  const [newConvoyVolunteers, setNewConvoyVolunteers] = useState(30);
  const [newConvoyDesc, setNewConvoyDesc] = useState('');

  // Forms state for Level 3: Academic Liaison
  const [selectedDeptId, setSelectedDeptId] = useState<string>(departments[0]?.id || '');
  
  // Faculty form
  const [newFacName, setNewFacName] = useState('');
  const [newFacTitle, setNewFacTitle] = useState('أستاذ مساعد');
  const [newFacSpec, setNewFacSpec] = useState('');
  const [newFacEmail, setNewFacEmail] = useState('');
  const [newFacBio, setNewFacBio] = useState('');

  // Course form
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseHours, setNewCourseHours] = useState('3 ساعات معتمدة');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [newCourseSemester, setNewCourseSemester] = useState('السمستر الأول');

  // Schedule form
  const [newSchDay, setNewSchDay] = useState('الأحد');
  const [newSchTime, setNewSchTime] = useState('08:00 - 10:00');
  const [newSchSubject, setNewSchSubject] = useState('');
  const [newSchType, setNewSchType] = useState<'theoretical' | 'clinical'>('theoretical');
  const [newSchLocation, setNewSchLocation] = useState('القاعة الكبرى (أ)');

  // Form state for Joint Committee Task Creator
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignedTo, setNewTaskAssignedTo] = useState('ضباط الاتصال بالأقسام');
  const [newTaskLevel, setNewTaskLevel] = useState<1 | 2 | 3 | 4>(3);
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Form state for Joint Committee Meeting Planner
  const [newMeetTitle, setNewMeetTitle] = useState('');
  const [newMeetDate, setNewMeetDate] = useState('');
  const [newMeetTime, setNewMeetTime] = useState('');
  const [newMeetAgendaRaw, setNewMeetAgendaRaw] = useState('');

  // Live coordination message logs state
  const [coordLogs, setCoordLogs] = useState<Array<{ sender: string, role: string, text: string, time: string }>>([
    { sender: 'د. عثمان علي (العميد)', role: 'العمادة', text: 'أرجو من ضباط اتصال الأقسام مراجعة جداول الدروس السريرية المتداخلة بمستشفى كسلا.', time: '09:12 ص' },
    { sender: 'م. أحمد الطيب (الـ IT)', role: 'مركز المعلوماتية', text: 'تم تحديث خادم الـ LMS الرئيسي والموقع الآن يعمل بكفاءة كاملة.', time: '09:45 ص' },
    { sender: 'الطالب أحمد عبد الله (رئيس الرابطة)', role: 'الأمانة الإعلامية', text: 'تم تسجيل حلقة البودكاست الجديدة مع بروفيسور عبد الرحمن الحسن، وبانتظار اعتماد الخبر من العمادة لنشرها بالبوابة العامة.', time: '10:15 ص' }
  ]);
  const [newCoordMessage, setNewCoordMessage] = useState('');

  // Server state simulation
  const [serverStatus, setServerStatus] = useState({
    gateway: 'online',
    lms: 'online',
    database: 'online'
  });

  const triggerToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  // --- ACTIONS ---

  // ADVANCED NEWS CONTROL ACTIONS
  const handleStartEditNews = (item: NewsItem) => {
    setEditingNewsId(item.id);
    setEditTitle(item.title);
    setEditContent(item.content);
    setEditCategory(item.category);
    setEditAuthor(item.author);
    setEditStatus(item.status);
    setEditDate(item.date);
  };

  const handleSaveEditNews = (id: string) => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert('الرجاء كتابة العنوان ومحتوى الخبر.');
      return;
    }
    setNews(prev => prev.map(item => item.id === id ? {
      ...item,
      title: editTitle,
      content: editContent,
      category: editCategory,
      author: editAuthor,
      status: editStatus,
      date: editDate,
      approvedBy: editStatus === 'approved' ? 'لجنة التنسيق المشتركة' : undefined
    } : item));
    setEditingNewsId(null);
    triggerToast('تم تحديث وحفظ بيانات الخبر بنجاح!');
  };

  const handleDeleteNews = (id: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا الخبر نهائياً من النظام؟')) {
      setNews(prev => prev.filter(item => item.id !== id));
      triggerToast('تم حذف الخبر بنجاح من البوابة الرقمية.');
    }
  };

  const handleCreateNewsFromPanel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTitle.trim() || !createContent.trim()) {
      alert('الرجاء كتابة عنوان الخبر وتفاصيله.');
      return;
    }
    const newItem: NewsItem = {
      id: `news-${Date.now()}`,
      title: createTitle,
      content: createContent,
      category: createCategory,
      author: createAuthor,
      date: createDate || new Date().toISOString().split('T')[0],
      status: createStatus,
      approvedBy: createStatus === 'approved' ? 'لجنة التنسيق المشتركة' : undefined
    };
    setNews(prev => [newItem, ...prev]);
    
    // Clear create form
    setCreateTitle('');
    setCreateContent('');
    setCreateCategory('إعلانات إدارية');
    setCreateAuthor('لجنة التنسيق المشتركة');
    setCreateStatus('approved');
    setCreateDate(new Date().toISOString().split('T')[0]);
    triggerToast('تم إنشاء ونشر الخبر الجديد بنجاح في النظام!');
  };

  const handleToggleNewsStatus = (id: string, currentStatus: 'pending' | 'approved') => {
    const nextStatus = currentStatus === 'approved' ? 'pending' : 'approved';
    setNews(prev => prev.map(item => item.id === id ? {
      ...item,
      status: nextStatus,
      approvedBy: nextStatus === 'approved' ? 'لجنة التنسيق المشتركة' : undefined
    } : item));
    triggerToast(nextStatus === 'approved' ? 'تم اعتماد ونشر الخبر للجمهور!' : 'تم سحب اعتماد الخبر وتحويله لمسودة معلقة.');
  };

  // LEVEL 1: Dean actions
  const handleApproveNews = (id: string) => {
    setNews(prev => prev.map(item => item.id === id ? { ...item, status: 'approved', approvedBy: 'عميد الكلية' } : item));
    triggerToast('تم اعتماد الخبر وبثه على البوابة الرقمية العامة للكلية بنجاح!');
  };

  const handlePublishOfficialAnnouncement = () => {
    if (!newDraftTitle || !newDraftContent) {
      alert('الرجاء تعبئة العنوان والمحتوى للإعلان الرسمي.');
      return;
    }
    const newAnn: NewsItem = {
      id: `ann-${Date.now()}`,
      title: newDraftTitle,
      content: newDraftContent,
      date: new Date().toISOString().split('T')[0],
      status: 'approved',
      author: 'العمادة والنائب الأكاديمي',
      category: 'إعلانات إدارية',
      approvedBy: 'عميد الكلية والنائب الأكاديمي'
    };
    setNews(prev => [newAnn, ...prev]);
    setNewDraftTitle('');
    setNewDraftContent('');
    triggerToast('تم نشر الإعلان الرسمي للعمادة فوراً على البوابة العامة!');
  };

  // LEVEL 2: IT Actions
  const handleToggleServer = (server: 'gateway' | 'lms' | 'database') => {
    setServerStatus(prev => ({
      ...prev,
      [server]: prev[server] === 'online' ? 'offline' : 'online'
    }));
    triggerToast(`تم تعديل حالة خادم [${server}] لمحاكاة الصيانة التقنية.`);
  };

  const handleResolveITRequest = (id: string) => {
    setItRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'resolved' } : req));
    triggerToast('تم حل تذكرة الدعم التقني وتفعيل الحساب الأكاديمي للجامعة.');
  };

  // LEVEL 3: Academic Liaison Actions
  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeptId || !newFacName || !newFacSpec || !newFacEmail) {
      alert('الرجاء تعبئة جميع بيانات عضو هيئة التدريس.');
      return;
    }
    const newMember: FacultyMember = {
      id: `fac-${Date.now()}`,
      name: newFacName,
      title: newFacTitle,
      specialization: newFacSpec,
      email: newFacEmail,
      bio: newFacBio || 'عضو هيئة تدريس بقسم الطب جامعة كسلا.',
      researchCount: 0
    };

    setDepartments(prev => prev.map(dept => {
      if (dept.id === selectedDeptId) {
        return { ...dept, faculty: [...dept.faculty, newMember] };
      }
      return dept;
    }));

    setNewFacName('');
    setNewFacSpec('');
    setNewFacEmail('');
    setNewFacBio('');
    triggerToast('تمت إضافة عضو هيئة التدريس بنجاح وتحديث قاعدة البيانات الأكاديمية!');
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeptId || !newCourseName || !newCourseCode) {
      alert('الرجاء تعبئة بيانات المقرر الأساسية.');
      return;
    }
    const newC: Course = {
      id: `course-${Date.now()}`,
      name: newCourseName,
      code: newCourseCode,
      hours: newCourseHours,
      description: newCourseDesc || 'توصيف مقرر طبي متكامل لطلاب كلية الطب.',
      semester: newCourseSemester
    };

    setDepartments(prev => prev.map(dept => {
      if (dept.id === selectedDeptId) {
        return { ...dept, courses: [...dept.courses, newC] };
      }
      return dept;
    }));

    setNewCourseName('');
    setNewCourseCode('');
    setNewCourseDesc('');
    triggerToast('تم إدراج المقرر الدراسي وتوصيفه في القسم الأكاديمي بنجاح!');
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeptId || !newSchSubject) {
      alert('الرجاء كتابة موضوع المحاضرة أو الجلسة السريرية.');
      return;
    }
    const newSch: ScheduleEvent = {
      id: `sch-${Date.now()}`,
      day: newSchDay,
      time: newSchTime,
      subject: newSchSubject,
      type: newSchType,
      location: newSchLocation
    };

    setDepartments(prev => prev.map(dept => {
      if (dept.id === selectedDeptId) {
        return { ...dept, schedules: [...dept.schedules, newSch] };
      }
      return dept;
    }));

    setNewSchSubject('');
    triggerToast('تم تحديث جدول المحاضرات الأسبوعي وإتاحته فوراً للطلاب!');
  };

  // LEVEL 4: KaMSA actions
  const handleDraftNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDraftTitle || !newDraftContent) {
      alert('الرجاء كتابة العنوان وتفاصيل تغطية الخبر.');
      return;
    }
    const newDraft: NewsItem = {
      id: `news-${Date.now()}`,
      title: newDraftTitle,
      content: newDraftContent,
      date: new Date().toISOString().split('T')[0],
      status: 'pending', // Pending level 1 approval
      author: 'الأمانة الإعلامية لرابطة الطلاب',
      category: newDraftCategory
    };
    setNews(prev => [newDraft, ...prev]);
    setNewDraftTitle('');
    setNewDraftContent('');
    triggerToast('تم تقديم مسودة التغطية الإخبارية بنجاح! بانتظار مراجعة واعتماد عميد الكلية.');
  };

  const handleAddPodcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPodTitle || !newPodGuest || !newPodHost) {
      alert('الرجاء تعبئة الحقول الأساسية لبودكاست الكلية.');
      return;
    }
    const newEp: PodcastEpisode = {
      id: `pod-${Date.now()}`,
      title: newPodTitle,
      guest: newPodGuest,
      host: newPodHost,
      duration: newPodDuration,
      date: new Date().toISOString().split('T')[0],
      description: newPodDesc || 'حلقة حوارية شيقة تناقش الشؤون والعلوم الطبية والصحية بولاية كسلا.'
    };
    setPodcasts(prev => [...prev, newEp]);
    setNewPodTitle('');
    setNewPodGuest('');
    setNewPodHost('');
    setNewPodDesc('');
    triggerToast('تم تسجيل حلقة البودكاست بنجاح وإتاحتها للبث بالبوابة العامة!');
  };

  const handleAddConvoy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConvoyTitle || !newConvoyLocation) {
      alert('الرجاء تعبئة تفاصيل مشروع القافلة الطبية.');
      return;
    }
    const newConv: MedicalConvoy = {
      id: `convoy-${Date.now()}`,
      title: newConvoyTitle,
      location: newConvoyLocation,
      date: new Date().toISOString().split('T')[0],
      description: newConvoyDesc || 'قافلة صحية تطوعية بمشاركة طلاب الطب وأعضاء هيئة التدريس لخدمة مجتمعات ولاية كسلا.',
      beneficiariesCount: Number(newConvoyBeneficiaries) || 200,
      volunteersCount: Number(newConvoyVolunteers) || 15,
      status: 'completed'
    };
    setConvoys(prev => [newConv, ...prev]);
    setNewConvoyTitle('');
    setNewConvoyLocation('');
    setNewConvoyDesc('');
    triggerToast('تم توثيق وإضافة القافلة الطبية الإنسانية لقائمة المبادرات بنجاح!');
  };

  // JOINT COMMITTEE ACTIONS
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    const newTask: CommitteeTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      assignedTo: newTaskAssignedTo,
      level: newTaskLevel,
      status: 'todo',
      priority: newTaskPriority,
      date: new Date().toISOString().split('T')[0]
    };
    setCommitteeTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
    triggerToast('تم التكليف بالمهمة وإدراجها بجدول لجنة التشغيل المشتركة.');
  };

  const handleUpdateTaskStatus = (id: string, currentStatus: 'todo' | 'in_progress' | 'done') => {
    let nextStatus: 'todo' | 'in_progress' | 'done' = 'in_progress';
    if (currentStatus === 'todo') nextStatus = 'in_progress';
    else if (currentStatus === 'in_progress') nextStatus = 'done';
    else nextStatus = 'todo';

    setCommitteeTasks(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));
    triggerToast('تم تحديث حالة التكليف باللجنة بنجاح.');
  };

  const handlePlanMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetTitle || !newMeetDate || !newMeetTime) {
      alert('الرجاء ملء بيانات الاجتماع الدوري للجنة التشغيل.');
      return;
    }
    const newMeet: BiannualMeeting = {
      id: `meet-${Date.now()}`,
      title: newMeetTitle,
      date: newMeetDate,
      time: newMeetTime,
      agenda: newMeetAgendaRaw ? newMeetAgendaRaw.split('\n') : ['مراجعة مؤشرات المنصة وسير تحديث بيانات الأقسام الكلية.'],
      status: 'scheduled'
    };
    setMeetings(prev => [...prev, newMeet]);
    setNewMeetTitle('');
    setNewMeetDate('');
    setNewMeetTime('');
    setNewMeetAgendaRaw('');
    triggerToast('تمت جدولة الاجتماع الدوري المشترك للجنة وتنبيه الممثلين!');
  };

  const handleSendCoordMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoordMessage.trim()) return;
    
    // Determine author based on current active role
    let authorName = 'ممثل التنسيق';
    let authorRole = 'لجنة التشغيل';
    if (activeRole === 'level-1-dean') {
      authorName = 'د. عثمان علي (العميد)';
      authorRole = 'العمادة';
    } else if (activeRole === 'level-2-it') {
      authorName = 'م. أحمد الطيب (الـ IT)';
      authorRole = 'مركز المعلوماتية';
    } else if (activeRole === 'level-3-academic') {
      authorName = 'أ. سكرتارية الأقسام';
      authorRole = 'ضباط الاتصال';
    } else if (activeRole === 'level-4-kamsa') {
      authorName = 'الطالب عمار ياسر (الإعلامية)';
      authorRole = 'رابطة الطلاب KaMSA';
    }

    const newMessage = {
      sender: authorName,
      role: authorRole,
      text: newCoordMessage,
      time: 'الآن'
    };

    setCoordLogs(prev => [...prev, newMessage]);
    setNewCoordMessage('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 min-h-[80vh] text-slate-800" id="committee-console-container">
      
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-emerald-900 border-2 border-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-fadeIn max-w-md">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold leading-relaxed">{successMessage}</p>
        </div>
      )}

      {/* 1. Left Sidebar: Role Switcher of the 4 Levels of Responsibility */}
      <aside className="lg:col-span-1 lg:w-1/4 shrink-0 space-y-4" id="role-switcher-sidebar">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-950 text-base leading-tight">صلاحيات لجنة التشغيل</h3>
            <p className="text-[11px] text-slate-400 mt-1">اختر الجهة لتعديل أو اعتماد المحتوى المرتبط بالمسؤولية الإدارية:</p>
          </div>

          <div className="space-y-1">
            <button
              id="role-joint"
              onClick={() => setActiveRole('joint-committee')}
              className={`w-full text-right px-3.5 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-2.5 ${
                activeRole === 'joint-committee'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Handshake className="h-4 w-4 text-emerald-500" />
              <span>🤝 لجنة التشغيل والتنسيق المشترك</span>
            </button>
            
            <button
              id="role-l1"
              onClick={() => setActiveRole('level-1-dean')}
              className={`w-full text-right px-3.5 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-2.5 ${
                activeRole === 'level-1-dean'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>🥇 المستوى 1: العمادة والاعتماد الرسمي</span>
            </button>

            <button
              id="role-l2"
              onClick={() => setActiveRole('level-2-it')}
              className={`w-full text-right px-3.5 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-2.5 ${
                activeRole === 'level-2-it'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Terminal className="h-4 w-4 text-emerald-500" />
              <span>💻 المستوى 2: الـ IT والبنية التقنية</span>
            </button>

            <button
              id="role-l3"
              onClick={() => setActiveRole('level-3-academic')}
              className={`w-full text-right px-3.5 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-2.5 ${
                activeRole === 'level-3-academic'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="h-4 w-4 text-emerald-500" />
              <span>📖 المستوى 3: ضباط اتصال الأقسام</span>
            </button>

            <button
              id="role-l4"
              onClick={() => setActiveRole('level-4-kamsa')}
              className={`w-full text-right px-3.5 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-2.5 ${
                activeRole === 'level-4-kamsa'
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Radio className="h-4 w-4 text-emerald-500" />
              <span>🎙️ المستوى 4: الأمانة الإعلامية KaMSA</span>
            </button>
          </div>
        </div>

        {/* Informative text about Joint Action */}
        <div className="bg-emerald-950 text-emerald-100 p-5 rounded-2xl border border-emerald-900 space-y-2 text-[11px] leading-relaxed">
          <strong className="text-emerald-400 block text-xs">💡 آلية التنسيق المتبادل:</strong>
          تسمح هذه المنصة بنظام تكاملي، حيث تقوم الأمانة الإعلامية بمسودة أخبار، فتظهر مباشرة في لوحة العمادة للاعتماد والموافقة الفورية. كما تقوم الأقسام بإدراج التغييرات الدراسية ومشاكل الـ LMS ليراها مهندس الـ IT ويعالجها على الفور!
        </div>
      </aside>

      {/* 2. Main Dashboard Panel */}
      <section className="flex-1 space-y-6" id="console-workspace">
        
        {/* =======================================================
            JOINT COMMITTEE HUB (لجنة تشغيل البوابة والتنسيق المشترك)
            ======================================================= */}
        {activeRole === 'joint-committee' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header / Intro Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <span className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full font-bold">ملخص التنسيق المشترك</span>
                  <h3 className="text-xl font-bold text-slate-950 mt-1.5">لوحة لجنة تشغيل ومتابعة البوابة الرقمية</h3>
                  <p className="text-xs text-slate-400">تجمع ممثلي العمادة، الـ IT، المعيدين، ومندوبي رابطة الطلاب (KaMSA) لمراجعة استمرارية تحديث المنصة.</p>
                </div>
                <div className="flex gap-4 text-center">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 min-w-20">
                    <span className="block text-lg font-bold text-emerald-800 font-mono">
                      {committeeTasks.filter(t => t.status === 'done').length}
                    </span>
                    <span className="text-[10px] text-slate-400">مهام مكتملة</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 min-w-20">
                    <span className="block text-lg font-bold text-emerald-600 font-mono">
                      {committeeTasks.filter(t => t.status !== 'done').length}
                    </span>
                    <span className="text-[10px] text-slate-400">مهام قيد العمل</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Board Management */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Task Planner Creator */}
              <div className="md:col-span-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">تكليف ومتابعة مهمة جديدة</h4>
                <form onSubmit={handleAddTask} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">تفاصيل التكليف أو المهمة:</label>
                    <input
                      type="text"
                      placeholder="مثال: مراجعة المنهج الدراسي لقسم الأطفال"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">الجهة المسؤولة:</label>
                      <select
                        value={newTaskAssignedTo}
                        onChange={(e) => setNewTaskAssignedTo(e.target.value)}
                        className="w-full text-[11px] p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="العمادة والنائب الأكاديمي">العمادة (المستوى 1)</option>
                        <option value="إدارة IT الجامعة">الـ IT (المستوى 2)</option>
                        <option value="ضباط الاتصال بالأقسام">ضباط الأقسام (المستوى 3)</option>
                        <option value="الأمانة الإعلامية (KaMSA)">الرابطة (المستوى 4)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">الأولوية:</label>
                      <select
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value as any)}
                        className="w-full text-[11px] p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="high">عالية جداً</option>
                        <option value="medium">متوسطة</option>
                        <option value="low">منخفضة</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex justify-center items-center gap-1.5"
                  >
                    <Plus className="h-4 w-4 text-emerald-400" />
                    <span>إدراج وتكليف بالمهمة</span>
                  </button>
                </form>
              </div>

              {/* Committee Active Tasks Log list */}
              <div className="md:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">سجل التكليفات والمهام الفعالة للجنة</h4>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {committeeTasks.map((task) => (
                    <div key={task.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                       <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                            task.status === 'done' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : task.status === 'in_progress'
                              ? 'bg-teal-50 text-teal-700 border border-teal-200'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {task.status === 'done' ? 'مكتمل' : task.status === 'in_progress' ? 'قيد العمل' : 'بانتظار البدء'}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                            task.priority === 'high' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-500'
                          }`}>
                            أولوية: {task.priority === 'high' ? 'عالية' : 'متوسطة'}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-xs">{task.title}</h5>
                        <p className="text-[10px] text-slate-400">الجهة المكلفة: <span className="text-emerald-900 font-semibold">{task.assignedTo}</span></p>
                      </div>

                      <button
                        onClick={() => handleUpdateTaskStatus(task.id, task.status)}
                        className="px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-[10px] font-semibold flex items-center gap-1"
                      >
                        <RefreshCw className="h-3 w-3 text-emerald-600" />
                        <span>تغيير الحالة</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Coordination Meeting Schedule & Live Interactive Committee Message logs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Meeting scheduler form & meeting table */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">جدولة الاجتماعات الدورية للجنة</h4>
                <form onSubmit={handlePlanMeeting} className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">عنوان الاجتماع:</label>
                    <input
                      type="text"
                      placeholder="مثال: الاجتماع التقييمي لبداية الفصل الدراسي الثاني"
                      value={newMeetTitle}
                      onChange={(e) => setNewMeetTitle(e.target.value)}
                      required
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">التاريخ:</label>
                    <input
                      type="date"
                      value={newMeetDate}
                      onChange={(e) => setNewMeetDate(e.target.value)}
                      required
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">الزمن:</label>
                    <input
                      type="text"
                      placeholder="مثال: 12:00 ظهراً"
                      value={newMeetTime}
                      onChange={(e) => setNewMeetTime(e.target.value)}
                      required
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">جدول الأعمال (كل بند في سطر):</label>
                    <textarea
                      rows={2}
                      placeholder="مثال:&#10;مراجعة جودة جداول الباطنية&#10;الموافقة على تصميمات الرابطة"
                      value={newMeetAgendaRaw}
                      onChange={(e) => setNewMeetAgendaRaw(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <button type="submit" className="col-span-2 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2 px-3 rounded-xl transition">
                    جدولة الاجتماع ونشر الأجندة
                  </button>
                </form>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h5 className="font-bold text-[11px] text-slate-400">الاجتماعات المجدولة القادمة:</h5>
                  {meetings.map((meet) => (
                    <div key={meet.id} className="bg-emerald-50/30 p-3 rounded-xl border border-emerald-100 text-xs">
                      <div className="flex justify-between items-start">
                        <h6 className="font-bold text-slate-950">{meet.title}</h6>
                        <span className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-1.5 py-0.5 rounded-full">مخطط له</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono mt-1">الموعد: {meet.date} | الساعة {meet.time}</p>
                      <ul className="list-disc list-inside mt-1 text-[10px] text-slate-600 space-y-0.5">
                        {meet.agenda.map((ag, index) => <li key={index}>{ag}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Interactive Committee Message Logs */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">مساحة التنسيق الفوري لأعضاء لجنة التشغيل</h4>
                  <p className="text-[10px] text-slate-400 mb-2">تواصل وتنسيق داخلي فوري للتوافق على اللوائح وجداول النشر قبل النشر للطلاب.</p>
                  
                  <div className="space-y-3 max-h-60 overflow-y-auto border border-slate-100 p-3 rounded-xl bg-slate-50" id="coord-messages-container">
                    {coordLogs.map((log, index) => (
                      <div key={index} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-emerald-950">{log.sender}</span>
                          <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full font-semibold">{log.role}</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{log.text}</p>
                        <div className="text-left text-[8px] text-slate-400 font-mono">{log.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSendCoordMessage} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="اكتب رسالة تنسيقية عاجلة للجنة..."
                    value={newCoordMessage}
                    onChange={(e) => setNewCoordMessage(e.target.value)}
                    className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                  <button type="submit" className="p-2.5 bg-emerald-900 text-white rounded-xl hover:bg-emerald-800 transition">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>

            </div>

            {/* =======================================================
                ADVANCED NEWS CONTROL CENTER (لوحة التحكم الشاملة بالأخبار والقرارات)
                ======================================================= */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 mt-6 animate-fadeIn" id="advanced-news-control-panel">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-emerald-50 rounded-lg text-emerald-950">
                    <Sliders className="h-5 w-5 text-emerald-800" />
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-950">إدارة الأخبار والقرارات الرسمية العامة</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">تحكم كامل وتعديل شامل بجميع الأخبار، الإعلانات، ومسودات رابطة الطلاب المعروضة في البوابة الرقمية للجمهور.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* 1. Create News Form */}
                <div className="xl:col-span-1 bg-slate-50/50 p-5 rounded-xl border border-slate-200/60 space-y-4">
                  <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200/40 pb-2">
                    <Plus className="h-4 w-4 text-emerald-700" />
                    <span>إضافة خبر أو توجيه جديد</span>
                  </h4>
                  
                  <form onSubmit={handleCreateNewsFromPanel} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">عنوان الخبر / التوجيه:</label>
                      <input
                        type="text"
                        placeholder="أدخل عنواناً جذاباً ودقيقاً للخبر..."
                        value={createTitle}
                        onChange={(e) => setCreateTitle(e.target.value)}
                        required
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700 text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">تفاصيل ومحتوى الخبر:</label>
                      <textarea
                        rows={4}
                        placeholder="اكتب كامل تفاصيل التغطية الإعلامية أو نص القرار الإداري المعتمد..."
                        value={createContent}
                        onChange={(e) => setCreateContent(e.target.value)}
                        required
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700 text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">تصنيف الخبر:</label>
                        <select
                          value={createCategory}
                          onChange={(e) => setCreateCategory(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-800"
                        >
                          <option value="إعلانات إدارية">إعلانات إدارية</option>
                          <option value="أنشطة طلابية">أنشطة طلابية</option>
                          <option value="فعاليات أكاديمية">فعاليات أكاديمية</option>
                          <option value="مبادرات طبية">مبادرات طبية</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">الجهة الناشرة/المصدر:</label>
                        <input
                          type="text"
                          value={createAuthor}
                          onChange={(e) => setCreateAuthor(e.target.value)}
                          placeholder="مثال: أمانة الإعلام"
                          className="w-full p-2 bg-white border border-slate-200 rounded-xl focus:outline-none text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">تاريخ النشر:</label>
                        <input
                          type="date"
                          value={createDate}
                          onChange={(e) => setCreateDate(e.target.value)}
                          className="w-full p-1.5 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">حالة النشر الفورية:</label>
                        <select
                          value={createStatus}
                          onChange={(e) => setCreateStatus(e.target.value as any)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-800"
                        >
                          <option value="approved">🟢 معتمد ومنشور فوراً</option>
                          <option value="pending">🟡 مسودة معلقة للمراجعة</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex justify-center items-center gap-1.5 shadow-sm mt-2"
                    >
                      <Plus className="h-4 w-4 text-emerald-400" />
                      <span>حفظ ونشر الخبر بالنظام</span>
                    </button>
                  </form>
                </div>

                {/* 2. List & Full Edit control area */}
                <div className="xl:col-span-2 space-y-4">
                  
                  {/* Search and Filters Bar */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-3">
                    
                    {/* Search Field */}
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="ابحث في العناوين أو المحتوى..."
                        value={newsSearchTerm}
                        onChange={(e) => setNewsSearchTerm(e.target.value)}
                        className="w-full text-xs pr-9 pl-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700 text-slate-800"
                      />
                    </div>

                    {/* Filter Status */}
                    <div className="flex gap-1 items-center self-end sm:self-auto">
                      <span className="text-[10px] text-slate-400 font-bold ml-1.5 flex items-center gap-1">
                        <Filter className="h-3 w-3" /> تصفية:
                      </span>
                      {[
                        { id: 'all', label: 'الكل' },
                        { id: 'approved', label: 'معتمد' },
                        { id: 'pending', label: 'معلق' }
                      ].map((btn) => (
                        <button
                          key={btn.id}
                          type="button"
                          onClick={() => setNewsStatusFilter(btn.id as any)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition whitespace-nowrap ${
                            newsStatusFilter === btn.id
                              ? 'bg-emerald-900 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* News Register List */}
                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    {news.filter(item => {
                      const matchesSearch = item.title.toLowerCase().includes(newsSearchTerm.toLowerCase()) || 
                                            item.content.toLowerCase().includes(newsSearchTerm.toLowerCase());
                      const matchesStatus = newsStatusFilter === 'all' || item.status === newsStatusFilter;
                      return matchesSearch && matchesStatus;
                    }).length > 0 ? (
                      news.filter(item => {
                        const matchesSearch = item.title.toLowerCase().includes(newsSearchTerm.toLowerCase()) || 
                                              item.content.toLowerCase().includes(newsSearchTerm.toLowerCase());
                        const matchesStatus = newsStatusFilter === 'all' || item.status === newsStatusFilter;
                        return matchesSearch && matchesStatus;
                      }).map((item) => {
                        const isEditing = editingNewsId === item.id;
                        return (
                          <div 
                            key={item.id} 
                            className={`p-4 rounded-xl border transition ${
                              isEditing 
                                ? 'bg-emerald-50/40 border-emerald-300 shadow-md ring-1 ring-emerald-300' 
                                : 'bg-slate-50/55 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {isEditing ? (
                              /* TIGHT EDIT FORM FOR HIGH-FIDELITY NEWS UPDATING */
                              <div className="space-y-3.5 text-xs text-right">
                                <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                                  <span className="font-extrabold text-emerald-950 flex items-center gap-1">
                                    <Edit className="h-3.5 w-3.5" /> تحرير الخبر الحالي
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">معرف الخبر: {item.id}</span>
                                </div>

                                <div className="space-y-2">
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">عنوان الخبر المعدل:</label>
                                    <input
                                      type="text"
                                      value={editTitle}
                                      onChange={(e) => setEditTitle(e.target.value)}
                                      className="w-full p-2 bg-white border border-emerald-200 rounded-lg text-xs font-bold focus:outline-none text-slate-800"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-0.5">تفاصيل المحتوى المعدل:</label>
                                    <textarea
                                      rows={3}
                                      value={editContent}
                                      onChange={(e) => setEditContent(e.target.value)}
                                      className="w-full p-2 bg-white border border-emerald-200 rounded-lg text-xs leading-relaxed focus:outline-none text-slate-800"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">التصنيف:</label>
                                      <select
                                        value={editCategory}
                                        onChange={(e) => setEditCategory(e.target.value)}
                                        className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-800"
                                      >
                                        <option value="إعلانات إدارية">إعلانات إدارية</option>
                                        <option value="أنشطة طلابية">أنشطة طلابية</option>
                                        <option value="فعاليات أكاديمية">فعاليات أكاديمية</option>
                                        <option value="مبادرات طبية">مبادرات طبية</option>
                                      </select>
                                    </div>

                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">الكاتب/المصدر:</label>
                                      <input
                                        type="text"
                                        value={editAuthor}
                                        onChange={(e) => setEditAuthor(e.target.value)}
                                        className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-[11px] focus:outline-none text-slate-800"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">التاريخ:</label>
                                      <input
                                        type="date"
                                        value={editDate}
                                        onChange={(e) => setEditDate(e.target.value)}
                                        className="w-full p-1 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-800"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">حالة الاعتماد:</label>
                                      <select
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value as any)}
                                        className="w-full p-1.5 bg-white border border-emerald-200 rounded-lg text-[11px] font-bold text-slate-800"
                                      >
                                        <option value="approved">🟢 معتمد ومنشور</option>
                                        <option value="pending">🟡 مسودة معلقة</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex gap-2 justify-end pt-2 border-t border-emerald-100">
                                  <button
                                    type="button"
                                    onClick={() => handleSaveEditNews(item.id)}
                                    className="bg-emerald-900 hover:bg-emerald-800 text-white text-[11px] font-bold py-1.5 px-3.5 rounded-lg transition flex items-center gap-1 shadow-xs"
                                  >
                                    <Save className="h-3.5 w-3.5 text-emerald-400" />
                                    <span>حفظ التعديلات الفورية</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingNewsId(null)}
                                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-bold py-1.5 px-3.5 rounded-lg transition"
                                  >
                                    إلغاء
                                  </button>
                                </div>
                              </div>
                            ) : (
                              /* READ-ONLY & ACTION CONSOLE VIEW OF NEWS ITEM */
                              <div className="space-y-2.5 text-xs text-right">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                                      {item.category}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                                      item.status === 'approved' 
                                        ? 'bg-emerald-100 text-emerald-800' 
                                        : 'bg-amber-100 text-amber-800'
                                    }`}>
                                      <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                                      {item.status === 'approved' ? 'منشور ومعتمد' : 'معلق / بانتظار الاعتماد'}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    {item.date} | الكاتب: {item.author}
                                  </span>
                                </div>

                                <div className="space-y-1">
                                  <h5 className="font-bold text-slate-900 text-sm">{item.title}</h5>
                                  <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">{item.content}</p>
                                </div>

                                {item.approvedBy && (
                                  <p className="text-[10px] text-emerald-700 font-semibold">
                                    ✓ تم الاعتماد بواسطة: <span className="underline">{item.approvedBy}</span>
                                  </p>
                                )}

                                {/* FULL INTERACTIVE CONTROL PANEL ROW */}
                                <div className="pt-2.5 border-t border-slate-200/50 flex flex-wrap justify-between items-center gap-2">
                                  <div className="flex gap-1">
                                    <button
                                      type="button"
                                      onClick={() => handleToggleNewsStatus(item.id, item.status)}
                                      className={`text-[10px] font-bold py-1 px-2.5 rounded-lg transition border flex items-center gap-1 ${
                                        item.status === 'approved'
                                          ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                                          : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                                      }`}
                                    >
                                      {item.status === 'approved' ? (
                                        <>
                                          <XCircle className="h-3 w-3" />
                                          <span>سحب الاعتماد</span>
                                        </>
                                      ) : (
                                        <>
                                          <CheckCircle2 className="h-3 w-3" />
                                          <span>اعتماد ونشر للجمهور</span>
                                        </>
                                      )}
                                    </button>
                                  </div>

                                  <div className="flex gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleStartEditNews(item)}
                                      className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-[10px] font-bold py-1 px-2.5 rounded-lg transition flex items-center gap-1"
                                    >
                                      <Edit className="h-3 w-3 text-slate-500" />
                                      <span>تعديل</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteNews(item.id)}
                                      className="bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 text-[10px] font-bold py-1 px-2.5 rounded-lg transition flex items-center gap-1"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                      <span>حذف</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="bg-slate-50 p-8 text-center rounded-xl text-slate-400 text-xs">
                        لا توجد أخبار تطابق معايير البحث والتصفية المحددة حالياً.
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* =======================================================
            LEVEL 1: DEAN & ACADEMIC ACCREDITATION (العمادة والاعتماد الرسمي)
            ======================================================= */}
        {activeRole === 'level-1-dean' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">لجنة المستوى 1</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">المستوى الإشرافي والاعتماد الرسمي (عميد الكلية والنائب الأكاديمي)</h3>
              <p className="text-xs text-slate-400 mt-1">
                صلاحية اعتماد ونشر اللوائح الأكاديمية الرسمية، جداول التدريب الإكلينيكي الحساسة، والموافقة النهائية على المقالات والأخبار والمواد الإعلامية المرفوعة من الرابطة KaMSA قبل بثها للجمهور.
              </p>
            </div>

            {/* Pending Approvals Management section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Approvals list */}
              <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">طلبات الاعتماد والنشر المعلقة</h4>
                
                <div className="space-y-4">
                  {news.filter(item => item.status === 'pending').length > 0 ? (
                    news.filter(item => item.status === 'pending').map((item) => (
                      <div key={item.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">{item.category}</span>
                            <span className="text-[10px] text-slate-400 font-mono block mt-1">تاريخ الرفع: {item.date} | المرفوع بواسطة: {item.author}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              id={`approve-btn-${item.id}`}
                              onClick={() => handleApproveNews(item.id)}
                              className="bg-emerald-900 hover:bg-emerald-800 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg transition"
                            >
                              اعتماد ونشر للجمهور
                            </button>
                          </div>
                        </div>
                        <h5 className="font-bold text-slate-900">{item.title}</h5>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{item.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-slate-50 p-6 text-center rounded-xl text-slate-400">
                      لا توجد أخبار أو قرارات معلقة بانتظار الاعتماد الرسمي حالياً.
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Announcement creator for Dean */}
              <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">إصدار توجيه أو قرار رسمي عاجل</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">عنوان التوجيه الإداري:</label>
                    <input
                      type="text"
                      placeholder="مثال: قرار بخصوص انطلاق امتحانات نصف العام"
                      value={newDraftTitle}
                      onChange={(e) => setNewDraftTitle(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">نص القرار الرسمي المعتمد:</label>
                    <textarea
                      rows={4}
                      placeholder="اكتب هنا التفاصيل الدقيقة للتوجيه والأثر الأكاديمي للطلاب وأعضاء هيئة التدريس..."
                      value={newDraftContent}
                      onChange={(e) => setNewDraftContent(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handlePublishOfficialAnnouncement}
                    className="w-full bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold py-2.5 rounded-xl transition"
                  >
                    نشر وتعميم فوراً (تجاوز المراجعة)
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =======================================================
            LEVEL 2: IT AND INFRASTRUCTURE (المستوى التقني والشبكات)
            ======================================================= */}
        {activeRole === 'level-2-it' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full font-bold">لجنة المستوى 2</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">المستوى التقني والبنية التحتية (إدارة IT الجامعة ومركز المعلوماتية)</h3>
              <p className="text-xs text-slate-400 mt-1">
                تشرف الإدارة التقنية على استقرار سيرفرات البوابة، تفعيل حسابات البريد الجامعي للطلاب والأساتذة، وربط منصة التعلم الإلكتروني LMS لمعالجة كافة الدعم الفني والمشاكل التقنية المرفوعة.
              </p>
            </div>

            {/* Simulated Server Infrastructure and IT Tickets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Servers Status simulation */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">حالة البنية التحتية والخوادم (محاكاة)</h4>
                
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <strong className="block text-slate-950 font-semibold">بوابة الكلية الرئيسية (Gateway)</strong>
                      <span className="text-[10px] text-slate-400 font-mono">Cdn & Proxy: Port 3000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        serverStatus.gateway === 'online' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>{serverStatus.gateway === 'online' ? 'فعال' : 'متوقف'}</span>
                      <button 
                        onClick={() => handleToggleServer('gateway')}
                        className="p-1.5 bg-white border border-slate-300 rounded hover:bg-slate-100"
                        title="تبديل حالة خادم البوابة"
                      >
                        <RefreshCw className="h-3 w-3 text-slate-500" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <strong className="block text-slate-950 font-semibold">منصة الـ LMS والتعليم الإلكتروني</strong>
                      <span className="text-[10px] text-slate-400 font-mono">lms.kassala.edu.sd</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        serverStatus.lms === 'online' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>{serverStatus.lms === 'online' ? 'فعال' : 'متوقف'}</span>
                      <button 
                        onClick={() => handleToggleServer('lms')}
                        className="p-1.5 bg-white border border-slate-300 rounded hover:bg-slate-100"
                        title="تبديل حالة خادم LMS"
                      >
                        <RefreshCw className="h-3 w-3 text-slate-500" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <strong className="block text-slate-950 font-semibold">قاعدة بيانات الطلاب والمقررات</strong>
                      <span className="text-[10px] text-slate-400 font-mono">Kassala Med DB (Postgres)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        serverStatus.database === 'online' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>{serverStatus.database === 'online' ? 'فعال' : 'متوقف'}</span>
                      <button 
                        onClick={() => handleToggleServer('database')}
                        className="p-1.5 bg-white border border-slate-300 rounded hover:bg-slate-100"
                        title="تبديل خادم قواعد البيانات"
                      >
                        <RefreshCw className="h-3 w-3 text-slate-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Helpdesk support tickets */}
              <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">طلبات الدعم التقني وتفعيل البريد الجامعي</h4>
                
                <div className="space-y-3">
                  {itRequests.map((req) => (
                    <div key={req.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            req.type === 'email_activation' 
                              ? 'bg-blue-50 text-blue-800 border border-blue-200' 
                              : 'bg-teal-50 text-teal-800 border border-teal-200'
                          }`}>
                            {req.type === 'email_activation' ? 'تفعيل البريد الجامعي' : req.type === 'lms_support' ? 'مشكلة LMS' : 'مشكلة بالخادم'}
                          </span>
                          <span className="text-slate-400 text-[10px] font-mono">{req.date}</span>
                        </div>
                        <h5 className="font-bold text-slate-950">{req.requesterName} <span className="font-normal font-mono text-[10px] text-slate-400">({req.requesterEmail})</span></h5>
                        <p className="text-slate-500 text-[11px] leading-relaxed italic">"{req.details}"</p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {req.status === 'resolved' ? (
                          <span className="text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>تم الحل والتفعيل</span>
                          </span>
                        ) : (
                          <button
                            id={`resolve-btn-${req.id}`}
                            onClick={() => handleResolveITRequest(req.id)}
                            className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-[10px] py-1.5 px-3 rounded-lg transition"
                          >
                            موافقة وحل المشكلة التقنية
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =======================================================
            LEVEL 3: ACADEMIC LIAISONS (ضباط اتصال الأقسام العلمية)
            ======================================================= */}
        {activeRole === 'level-3-academic' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">لجنة المستوى 3</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">المستوى الأكاديمي وتحديث البيانات (ضباط الاتصال بالأقسام)</h3>
              <p className="text-xs text-slate-400 mt-1">
                يتولى ضباط الاتصال (المعيدون أو السكرتارية التنفيذية للأقسام) تعبئة بيانات أعضاء هيئة التدريس وسيرهم الذاتية، وتحديث جداول الدروس الأسبوعية السريرية والنظرية، وتغذية المنصة بأحدث توصيفات المناهج والأبحاث.
              </p>
            </div>

            {/* Department selector filter */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4 flex-wrap">
              <span className="text-xs font-bold text-slate-500">اختر القسم العلمي لإدارة بياناته:</span>
              <div className="flex gap-2 flex-wrap">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    id={`liaison-dept-${dept.id}`}
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedDeptId === dept.id
                        ? 'bg-emerald-900 text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {dept.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Big interactive database update forms */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Form 1: Add Faculty Member */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <UserPlus className="h-4 w-4 text-emerald-800" />
                  <span>إضافة عضو هيئة تدريس وسيرته</span>
                </h4>
                
                <form onSubmit={handleAddFaculty} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">الاسم الكامل:</label>
                    <input
                      type="text"
                      placeholder="مثال: د. مجذوب إدريس محمد"
                      value={newFacName}
                      onChange={(e) => setNewFacName(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">الدرجة العلمية:</label>
                      <select
                        value={newFacTitle}
                        onChange={(e) => setNewFacTitle(e.target.value)}
                        className="w-full text-[11px] p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="بروفيسور">بروفيسور (أستاذ)</option>
                        <option value="أستاذ مشارك">أستاذ مشارك</option>
                        <option value="أستاذ مساعد">أستاذ مساعد</option>
                        <option value="محاضر">محاضر</option>
                        <option value="مساعد تدريس (معيد)">معيد</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">التخصص الدقيق:</label>
                      <input
                        type="text"
                        placeholder="مثال: جراحة العظام"
                        value={newFacSpec}
                        onChange={(e) => setNewFacSpec(e.target.value)}
                        required
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">البريد الجامعي المعتمد (@kassala.edu.sd):</label>
                    <input
                      type="email"
                      placeholder="magzoub.idris@kassala.edu.sd"
                      value={newFacEmail}
                      onChange={(e) => setNewFacEmail(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">نبذة عن مسيرته وأبحاثه (Bio):</label>
                    <textarea
                      rows={2}
                      placeholder="خبرة أكاديمية واهتمام بمشاكل صحة مجتمع ولاية كسلا..."
                      value={newFacBio}
                      onChange={(e) => setNewFacBio(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded-xl transition">
                    حفظ وتحديث قاعدة هيئة التدريس
                  </button>
                </form>
              </div>

              {/* Form 2: Add Syllabus/Course */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-emerald-800" />
                  <span>إضافة وتوصيف مقرر دراسي جديد</span>
                </h4>
                
                <form onSubmit={handleAddCourse} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">اسم المقرر العلمي:</label>
                    <input
                      type="text"
                      placeholder="مثال: أساسيات علم السموم الإكلينيكي"
                      value={newCourseName}
                      onChange={(e) => setNewCourseName(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">رمز المقرر:</label>
                      <input
                        type="text"
                        placeholder="مثال: PHAR 305"
                        value={newCourseCode}
                        onChange={(e) => setNewCourseCode(e.target.value)}
                        required
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">الفصل الدراسي:</label>
                      <select
                        value={newCourseSemester}
                        onChange={(e) => setNewCourseSemester(e.target.value)}
                        className="w-full text-[11px] p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="السمستر الأول">السمستر الأول</option>
                        <option value="السمستر الثاني">السمستر الثاني</option>
                        <option value="السمستر الثالث">السمستر الثالث</option>
                        <option value="السمستر الرابع">السمستر الرابع</option>
                        <option value="السمستر الخامس">السمستر الخامس</option>
                        <option value="السمستر السادس">السمستر السادس</option>
                        <option value="السمستر السابع">السمستر السابع</option>
                        <option value="السمستر الثامن">السمستر الثامن</option>
                        <option value="السمستر التاسع">السمستر التاسع</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">الساعات المعتمدة:</label>
                    <input
                      type="text"
                      placeholder="مثال: 3 ساعات معتمدة (2 نظري + 1 عملي)"
                      value={newCourseHours}
                      onChange={(e) => setNewCourseHours(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">خلاصة توصيف المنهج:</label>
                    <textarea
                      rows={2}
                      placeholder="وصف تفصيلي لأهداف كورس علم السموم ومخرجات التعلم..."
                      value={newCourseDesc}
                      onChange={(e) => setNewCourseDesc(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded-xl transition">
                    إدراج ونشر المقرر العلمي بالبوابة
                  </button>
                </form>
              </div>

              {/* Form 3: Add Schedule Event */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="h-4 w-4 text-emerald-800" />
                  <span>تحديث الجداول الدراسية الأسبوعية</span>
                </h4>
                
                <form onSubmit={handleAddSchedule} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">يوم المحاضرة:</label>
                      <select
                        value={newSchDay}
                        onChange={(e) => setNewSchDay(e.target.value)}
                        className="w-full text-[11px] p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="الأحد">الأحد</option>
                        <option value="الإثنين">الإثنين</option>
                        <option value="الثلاثاء">الثلاثاء</option>
                        <option value="الأربعاء">الأربعاء</option>
                        <option value="الخميس">الخميس</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">التوقيت والزمن:</label>
                      <input
                        type="text"
                        placeholder="مثال: 10:00 - 12:00"
                        value={newSchTime}
                        onChange={(e) => setNewSchTime(e.target.value)}
                        required
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">الموضوع أو عنوان المحاضرة السريرية:</label>
                    <input
                      type="text"
                      placeholder="مثال: فحص الجهاز الدوري الإكلينيكي"
                      value={newSchSubject}
                      onChange={(e) => setNewSchSubject(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">نوع الدرس:</label>
                      <select
                        value={newSchType}
                        onChange={(e) => setNewSchType(e.target.value as any)}
                        className="w-full text-[11px] p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="theoretical">نظري (Lecture)</option>
                        <option value="clinical">إكلينيكي / سريري (Round)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">القاعة أو موقع التدريب:</label>
                      <input
                        type="text"
                        placeholder="مثال: عنبر الباطنية بمستشفى كسلا"
                        value={newSchLocation}
                        onChange={(e) => setNewSchLocation(e.target.value)}
                        required
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded-xl transition">
                    نشر وتحديث الجدول الدراسي
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

        {/* =======================================================
            LEVEL 4: KaMSA STUDENT MEDIA (الأمانة الإعلامية للرابطة)
            ======================================================= */}
        {activeRole === 'level-4-kamsa' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">لجنة المستوى 4</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">المستوى التنفيذي والإعلامي (الأمانة الإعلامية لرابطة الطلاب KaMSA)</h3>
              <p className="text-xs text-slate-400 mt-1">
                صلاحية صياغة الأخبار الطلابية، التغطيات الطبية، إدارة بودكاست الكلية، إضافة حلقات جديدة للبث التفاعلي، وتسجيل تفاصيل القوافل الصحية والمسوحات الوبائية لخدمة ولاية كسلا.
              </p>
            </div>

            {/* News drafting and podcast/convoy additions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Form 1: Draft News for Approval */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-emerald-800" />
                  <span>صياغة خبر طلابي (يتطلب اعتماد العمادة)</span>
                </h4>
                
                <form onSubmit={handleDraftNews} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">عنوان التغطية الإخبارية:</label>
                    <input
                      type="text"
                      placeholder="مثال: ختام الدوري الرياضي السنوي لطلاب الطب"
                      value={newDraftTitle}
                      onChange={(e) => setNewDraftTitle(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">تصنيف الخبر:</label>
                    <select
                      value={newDraftCategory}
                      onChange={(e) => setNewDraftCategory(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="أنشطة طلابية">أنشطة طلابية وتوعية</option>
                      <option value="مبادرات إنسانية">مبادرات إنسانية وقوافل</option>
                      <option value="بودكاست الكلية">بودكاست الكلية</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">تفاصيل المحتوى والصياغة الإعلامية:</label>
                    <textarea
                      rows={4}
                      placeholder="اكتب التغطية الصحفية أو نص الإعلان الطلابي بالتفصيل هنا..."
                      value={newDraftContent}
                      onChange={(e) => setNewDraftContent(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded-xl transition">
                    تقديم المسودة للاعتماد الإداري (L1)
                  </button>
                </form>
              </div>

              {/* Form 2: Add Podcast Episode */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Radio className="h-4 w-4 text-emerald-800" />
                  <span>تسجيل حلقة بودكاست كلية الطب جديدة</span>
                </h4>
                
                <form onSubmit={handleAddPodcast} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">عنوان موضوع الحلقة:</label>
                    <input
                      type="text"
                      placeholder="مثال: أسرار التميز في الامتحانات السريرية"
                      value={newPodTitle}
                      onChange={(e) => setNewPodTitle(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">ضيف الحلقة:</label>
                      <input
                        type="text"
                        placeholder="مثال: أ.د. عبد الرحمن"
                        value={newPodGuest}
                        onChange={(e) => setNewPodGuest(e.target.value)}
                        required
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">المحاور (مقدم البودكاست):</label>
                      <input
                        type="text"
                        placeholder="مثال: الطالب أحمد"
                        value={newPodHost}
                        onChange={(e) => setNewPodHost(e.target.value)}
                        required
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">مدة التسجيل (دقيقة:ثانية):</label>
                    <input
                      type="text"
                      value={newPodDuration}
                      onChange={(e) => setNewPodDuration(e.target.value)}
                      required
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">وصف مختصر وتفاصيل نقاش الحلقة:</label>
                    <textarea
                      rows={2}
                      placeholder="عن ماذا تدور الحلقة وأبرز النصائح المسجلة بها للطلاب..."
                      value={newPodDesc}
                      onChange={(e) => setNewPodDesc(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded-xl transition">
                    نشر وتوفير حلقة البودكاست بالمنصة
                  </button>
                </form>
              </div>

              {/* Form 3: Add Medical Convoy */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-emerald-800" />
                  <span>توثيق قافلة طبية كبرى بمحليات كسلا</span>
                </h4>
                
                <form onSubmit={handleAddConvoy} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">اسم المشروع أو القافلة:</label>
                    <input
                      type="text"
                      placeholder="مثال: القافلة الصحية للتوعية بمنطقة همشكوريب"
                      value={newConvoyTitle}
                      onChange={(e) => setNewConvoyTitle(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">المنطقة المستهدفة (الموقع):</label>
                    <input
                      type="text"
                      placeholder="مثال: ريفي همشكوريب - ولاية كسلا"
                      value={newConvoyLocation}
                      onChange={(e) => setNewConvoyLocation(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">عدد المستفيدين:</label>
                      <input
                        type="number"
                        value={newConvoyBeneficiaries}
                        onChange={(e) => setNewConvoyBeneficiaries(Number(e.target.value))}
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">عدد المتطوعين:</label>
                      <input
                        type="number"
                        value={newConvoyVolunteers}
                        onChange={(e) => setNewConvoyVolunteers(Number(e.target.value))}
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">وصف موجز للمشروع والأدوية الموزعة:</label>
                    <textarea
                      rows={2}
                      placeholder="اشرح هنا تفاصيل العيادات المجانية والحملات التوعوية المنفذة بالمنطقة..."
                      value={newConvoyDesc}
                      onChange={(e) => setNewConvoyDesc(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded-xl transition">
                    حفظ وتوثيق بيانات القافلة الصحية
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

      </section>

    </div>
  );
}
