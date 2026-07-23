/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Department, NewsItem, PodcastEpisode, ITRequest, CommitteeTask, BiannualMeeting, MedicalConvoy } from '../types';

export const initialDepartments: Department[] = [
  {
    id: 'anatomy',
    name: 'Anatomy',
    arabicName: 'قسم التشريح وعلم الأجنة',
    headOfDepartment: 'د. عثمان علي محمد',
    description: 'يُعنى القسم بتدريس علم التشريح البشري، الأنسجة، وعلم الأجنة لطلاب السنوات الأولى والثانية باستخدام المختبرات الحديثة والتقنيات المجسمة.',
    courses: [
      {
        id: 'anat-101',
        name: 'التشريح البشري العام I',
        code: 'ANAT 101',
        hours: '4 ساعات معتمدة',
        description: 'دراسة تشريح الأطراف العلوية والسفلية وجدار الصدر بأسلوب نظري وعملي.',
        semester: 'السمستر الأول'
      },
      {
        id: 'anat-202',
        name: 'تشريح الأعصاب والتشريح العصبي السريري',
        code: 'ANAT 202',
        hours: '3 ساعات معتمدة',
        description: 'دراسة شاملة للجهاز العصبي المركزي والطرفي وتطبيقاتها الإكلينيكية.',
        semester: 'السمستر الثالث'
      }
    ],
    faculty: [
      {
        id: 'fac-anat-1',
        name: 'د. عثمان علي محمد',
        title: 'أستاذ مشارك ورئيس القسم',
        specialization: 'تشريح الأعصاب والعمود الفقري',
        email: 'othman.ali@kassala.edu.sd',
        bio: 'خبرة تزيد عن 15 عاماً في تدريس التشريح في الجامعات السودانية، له أبحاث منشورة في التشوهات الخلقية.',
        researchCount: 8
      },
      {
        id: 'fac-anat-2',
        name: 'أ. محاسن أحمد صالح',
        title: 'محاضر',
        specialization: 'علم الأنسجة والخلايا',
        email: 'mahasin.ahmed@kassala.edu.sd',
        bio: 'متخصصة في دراسة التغيرات النسيجية الدقيقة تحت المجاهر الإلكترونية والإرشاد الأكاديمي للطلاب.',
        researchCount: 3
      }
    ],
    research: [
      {
        id: 'res-anat-1',
        title: 'Structural Variations of Circle of Willis among Sudanese Population: A Cadaveric Study',
        authors: 'د. عثمان علي محمد، أ. محاسن أحمد',
        journal: 'Kassala Medical Journal',
        year: 2024
      }
    ],
    schedules: [
      {
        id: 'sch-anat-1',
        day: 'الأحد',
        time: '08:00 - 10:00',
        subject: 'محاضرة: تشريح الصدر والقلب',
        type: 'theoretical',
        location: 'القاعة الكبرى (أ)'
      },
      {
        id: 'sch-anat-2',
        day: 'الثلاثاء',
        time: '10:00 - 12:00',
        subject: 'عملي: تشريح الطرف السفلي - مجموعة (أ)',
        type: 'clinical',
        location: 'مشرحة كلية الطب'
      }
    ]
  },
  {
    id: 'medicine',
    name: 'Internal Medicine',
    arabicName: 'قسم الطب الباطني',
    headOfDepartment: 'أ.د. عبد الرحمن محمد الحسن',
    description: 'يعد أحد أكبر الأقسام السريرية بالكلية، ويشرف على تدريب الطلاب سريرياً في مستشفى كسلا التعليمي في شتى مجالات الطب الباطني.',
    courses: [
      {
        id: 'med-401',
        name: 'مقدمة في الطب السريري وأخذ التاريخ المرضي',
        code: 'MED 401',
        hours: '6 ساعات معتمدة',
        description: 'بداية التدريب السريري، مهارات الاتصال، فحص الأجهزة الحيوية المختلفة.',
        semester: 'السمستر السابع (السنة الرابعة)'
      },
      {
        id: 'med-501',
        name: 'الطب الباطني المتقدم والقلب والأمراض المعدية',
        code: 'MED 501',
        hours: '8 ساعات معتمدة',
        description: 'دراسة الحالات المرضية الحرجة والمزمنة، التدريب الإكلينيكي المكثف بكسلا التعليمي.',
        semester: 'السمستر التاسع والعاشر'
      }
    ],
    faculty: [
      {
        id: 'fac-med-1',
        name: 'أ.د. عبد الرحمن محمد الحسن',
        title: 'بروفيسور واستشاري الباطنية والقلب',
        specialization: 'أمراض القلب والشرايين',
        email: 'a.alhasan@kassala.edu.sd',
        bio: 'رئيس جمعية أطباء ولاية كسلا، أسهم في تأسيس وحدة العناية المكثفة بمستشفى كسلا ونشر العديد من المقالات الدولية.',
        researchCount: 18
      },
      {
        id: 'fac-med-2',
        name: 'د. ليلى حسن تاج السر',
        title: 'أستاذ مساعد واستشاري الباطنية والأمراض المعدية',
        specialization: 'الحميات والمستوطنات بشرق السودان',
        email: 'laila.hassan@kassala.edu.sd',
        bio: 'خبيرة في تشخيص ومكافحة الأوبئة المتوطنة مثل حمى الضنك والشيكونغونيا بولاية كسلا.',
        researchCount: 11
      }
    ],
    research: [
      {
        id: 'res-med-1',
        title: 'Epidemiological Profile and Clinical Outcomes of Chikungunya Outbreak in Kassala, Eastern Sudan',
        authors: 'د. ليلى حسن، أ.د. عبد الرحمن الحسن',
        journal: 'Transactions of the Royal Society of Tropical Medicine and Hygiene',
        year: 2023
      },
      {
        id: 'res-med-2',
        title: 'Prevalence of Diabetes Mellitus and its Risk Factors in Kassala State',
        authors: 'أ.د. عبد الرحمن الحسن',
        journal: 'Sudanese Journal of Paediatrics & Medicine',
        year: 2025
      }
    ],
    schedules: [
      {
        id: 'sch-med-1',
        day: 'الإثنين',
        time: '09:00 - 12:00',
        subject: 'مرور سريري (Ward Round) - الطالبات والطلاب بالباطنية',
        type: 'clinical',
        location: 'عنابر الباطنية بمستشفى كسلا التعليمي'
      },
      {
        id: 'sch-med-2',
        day: 'الخميس',
        time: '12:00 - 02:00',
        subject: 'محاضرة: أمراض الغدد الصم والسكري',
        type: 'theoretical',
        location: 'قاعة الرازي'
      }
    ]
  },
  {
    id: 'surgery',
    name: 'General Surgery',
    arabicName: 'قسم الجراحة العامة والخاصة',
    headOfDepartment: 'د. طارق الطيب المرضي',
    description: 'يتولى تدريب الطلاب على المبادئ الأساسية للجراحة العامة، جراحة الطوارئ والإصابات، والتخصصات الدقيقة كالعظام والمسالك والعيون والأنف والأذن والحنجرة.',
    courses: [
      {
        id: 'surg-401',
        name: 'الجراحة العامة الأساسية وعلم الجروح',
        code: 'SURG 401',
        hours: '6 ساعات معتمدة',
        description: 'دراسة الصدمة، السوائل والتغذية الجراحية، التعقيم، والمبادئ الأساسية للعمليات.',
        semester: 'السمستر الثامن'
      }
    ],
    faculty: [
      {
        id: 'fac-surg-1',
        name: 'د. طارق الطيب المرضي',
        title: 'أستاذ مساعد واستشاري الجراحة العامة والمنظار',
        specialization: 'جراحة الجهاز الهضمي والمناظير',
        email: 'tarig.almaradi@kassala.edu.sd',
        bio: 'استشاري جراحة المناظير، يساهم في تدريب أطباء الامتياز ونواب الجراحة بمستشفى كسلا التعليمي.',
        researchCount: 9
      }
    ],
    research: [
      {
        id: 'res-surg-1',
        title: 'Management and Outcomes of Obstructed Abdominal Hernias in Eastern Sudan',
        authors: 'د. طارق الطيب المرضي',
        journal: 'East African Medical Journal',
        year: 2024
      }
    ],
    schedules: [
      {
        id: 'sch-surg-1',
        day: 'الأربعاء',
        time: '08:00 - 01:00',
        subject: 'عمليات الجراحة العامة / تدريب بغرفة العمليات',
        type: 'clinical',
        location: 'مجمع العمليات بمستشفى كسلا التعليمي'
      }
    ]
  },
  {
    id: 'community',
    name: 'Community Medicine',
    arabicName: 'قسم طب المجتمع والبيئة',
    headOfDepartment: 'د. أميرة الرشيد بشير',
    description: 'يتميز القسم بريادته في تنظيم الكورسات الحقلية والقوافل الصحية والمسوحات الوبائية لتعليم الطلاب مبادئ الرعاية الصحية الأولية وصحة المجتمع.',
    courses: [
      {
        id: 'comm-201',
        name: 'الإحصاء الحيوي ومبادئ علم الأوبئة',
        code: 'COMM 201',
        hours: '3 ساعات معتمدة',
        description: 'مبادئ حساب المعدلات الصحية والمؤشرات الحيوية ودراسة أنماط انتشار الأوبئة.',
        semester: 'السمستر الرابع'
      },
      {
        id: 'comm-405',
        name: 'الكورس الميداني لطب المجتمع والأسر والمناطق الريفية',
        code: 'COMM 405',
        hours: '4 ساعات معتمدة',
        description: 'تدريب ميداني لمدة أسبوعين في إحدى قرى ريف كسلا لتشخيص مشكلات المجتمع الصحية.',
        semester: 'السمستر الثامن'
      }
    ],
    faculty: [
      {
        id: 'fac-comm-1',
        name: 'د. أميرة الرشيد بشير',
        title: 'أستاذ مشارك واستشاري صحة المجتمع',
        specialization: 'الصحة العامة وصحة الأمومة والطفولة',
        email: 'amira.alrasheed@kassala.edu.sd',
        bio: 'حاصلة على الدكتوراه في الصحة العامة، مستشارة سابقة لمنظمات دولية، وتشرف على الأبحاث الميدانية لطلاب الكلية.',
        researchCount: 14
      }
    ],
    research: [
      {
        id: 'res-comm-1',
        title: 'Maternal Health Services Utilization in Rural Areas of Kassala State: Challenges and Solutions',
        authors: 'د. أميرة الرشيد بشير',
        journal: 'Sudan Journal of Medical Sciences',
        year: 2023
      }
    ],
    schedules: [
      {
        id: 'sch-comm-1',
        day: 'الإثنين',
        time: '08:00 - 10:00',
        subject: 'محاضرة: الرعاية الصحية الأولية والتطعيمات',
        type: 'theoretical',
        location: 'قاعة الرازي'
      }
    ]
  }
];

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'توجيهات عميد الكلية بخصوص انطلاق امتحانات الملحق والبدائل',
    content: 'أصدر عميد كلية الطب، د. عثمان علي محمد، قراراً رسمياً يوضح فيه انطلاق جدول امتحانات الملاحق والبدائل للدفعتين (28) و(29) ابتداءً من الأسبوع القادم في مجمع قاعات الكلية. وتهيب العمادة بجميع الطلاب الالتزام التام بالضوابط الأكاديمية والزي الرسمي وإحضار البطاقات الجامعية.',
    date: '2026-07-20',
    status: 'approved',
    author: 'العمادة والنائب الأكاديمي',
    category: 'إعلانات إدارية',
    approvedBy: 'عميد الكلية'
  },
  {
    id: 'news-2',
    title: 'رابطة الطلاب KaMSA تسير قافلة طبية كبرى إلى ريفي كسلا (منطقة همشكوريب)',
    content: 'بتنسيق كامل بين رابطة طلاب كلية الطب (KaMSA) والأمانة الإعلامية للرابطة، وبرعاية كريمة من عمادة الكلية، أطلقت الرابطة القافلة الطبية الكبرى لمنطقة ريفي همشكوريب. القافلة تشتمل على عيادات باطنية، أطفال، نساء وتوليد، وصيدلية مجانية، مع حملات توعوية واسعة عن حمى الضنك وسوء التغذية وتوزيع مستلزمات رعاية أولية.',
    date: '2026-07-18',
    status: 'approved',
    author: 'الأمانة الإعلامية لرابطة الطلاب',
    category: 'أنشطة طلابية',
    approvedBy: 'النائب الأكاديمي'
  },
  {
    id: 'news-3',
    title: 'تحديث لوائح التدريب الإكلينيكي والسريري بالمستشفيات للعام الجديد',
    content: 'يقوم ضباط الاتصال والنائب الأكاديمي بمراجعة مسودة اللائحة الإكلينيكية الجديدة التي تنظم فترات التواجد السريري في مستشفى كسلا التعليمي للدفعة 27. تشمل اللائحة بنوداً تتعلق بالحضور، الغياب، والتقييم الدوري من قبل الاستشاريين بالأقسام السريرية.',
    date: '2026-07-21',
    status: 'pending',
    author: 'ضباط الاتصال بالأقسام',
    category: 'لوائح أكاديمية'
  },
  {
    id: 'news-4',
    title: 'إعلان عن تسجيل حلقة جديدة من بودكاست كلية الطب مع استشاري أمراض القلب',
    content: 'قامت الأمانة الإعلامية لرابطة الطلاب بتسجيل الحلقة الثالثة من بودكاست الكلية، وتستضيف الحلقة البروفيسور عبد الرحمن الحسن للحديث عن "أمراض القلب والأوعية الدموية في ولاية كسلا وطرق الوقاية والتشخيص المبكر للطلاب". الحلقة قيد المراجعة الفنية والنشر التفاعلي.',
    date: '2026-07-22',
    status: 'pending',
    author: 'الأمانة الإعلامية لرابطة الطلاب',
    category: 'بودكاست الكلية'
  }
];

export const initialPodcastEpisodes: PodcastEpisode[] = [
  {
    id: 'pod-1',
    title: 'كيف تتفوق في السنين الأساسية بالكلية؟ نصائح مجربة',
    guest: 'د. ليلى حسن تاج السر',
    host: 'الطالب أحمد عبد الله (الأمانة الإعلامية)',
    duration: '24:15',
    date: '2026-06-15',
    description: 'في هذه الحلقة، نناقش كيفية تنظيم الوقت لطلاب السنتين الأولى والثانية، كيفية دراسة التشريح والوظائف، والتغلب على حاجز اللغة الإنجليزية، مع استعراض لأهم المراجع المعتمدة.',
  },
  {
    id: 'pod-2',
    title: 'كواليس الكورس الميداني لطب المجتمع وتحديات الصحة الريفية بكسلا',
    guest: 'د. أميرة الرشيد بشير',
    host: 'الطالبة سارة عثمان (الأمانة الإعلامية)',
    duration: '32:40',
    date: '2026-07-02',
    description: 'حلقة خاصة تناقش تجربة طلاب كلية الطب جامعة كسلا في الكورسات الميدانية وتشخيص الأوبئة في القرى المحيطة، والتوعية الفعالة بحميات شرق السودان.',
  }
];

export const initialITRequests: ITRequest[] = [
  {
    id: 'it-req-1',
    type: 'email_activation',
    requesterName: 'أ. محاسن أحمد صالح',
    requesterEmail: 'mahasin.ahmed@kassala.edu.sd',
    details: 'أرجو تفعيل حساب البريد الإلكتروني الجامعي الخاص بي بعد استعادة السيرفر للمنظومة الأكاديمية.',
    status: 'resolved',
    date: '2026-07-15'
  },
  {
    id: 'it-req-2',
    type: 'lms_support',
    requesterName: 'الطالب عمار ياسر',
    requesterEmail: 'ammar24@kassala.edu.sd',
    details: 'أواجه مشكلة في تسجيل الدخول لمنصة التعلم الإلكتروني (LMS) التابعة للجامعة للحصول على محاضرات التشريح وعلم الأنسجة.',
    status: 'pending',
    date: '2026-07-21'
  },
  {
    id: 'it-req-3',
    type: 'server_issue',
    requesterName: 'د. طارق الطيب المرضي',
    requesterEmail: 'tarig.almaradi@kassala.edu.sd',
    details: 'أرجو تفعيل رابط منصة الجراحة لرفع جداول العمليات الإكلينيكية المحدثة.',
    status: 'in_progress',
    date: '2026-07-22'
  }
];

export const initialCommitteeTasks: CommitteeTask[] = [
  {
    id: 'task-1',
    title: 'الاعتماد النهائي للائحة الأكاديمية للتدريب السريري',
    assignedTo: 'العمادة والنائب الأكاديمي',
    level: 1,
    status: 'in_progress',
    priority: 'high',
    date: '2026-07-20'
  },
  {
    id: 'task-2',
    title: 'تحديث منصة الـ LMS وربط خوادم الكلية بنظام الجامعة الموحد',
    assignedTo: 'إدارة IT الجامعة',
    level: 2,
    status: 'todo',
    priority: 'high',
    date: '2026-07-22'
  },
  {
    id: 'task-3',
    title: 'تجميع وحصر سير أعضاء هيئة التدريس الجدد بقسم الباطنية والتشريح',
    assignedTo: 'ضباط الاتصال بالأقسام',
    level: 3,
    status: 'done',
    priority: 'medium',
    date: '2026-07-18'
  },
  {
    id: 'task-4',
    title: 'إعداد ومونتاج الحلقة الثالثة من البودكاست وتوفير البوسترات الخاصة بها',
    assignedTo: 'الأمانة الإعلامية لرابطة الطلاب (KaMSA)',
    level: 4,
    status: 'in_progress',
    priority: 'medium',
    date: '2026-07-21'
  }
];

export const initialMeetings: BiannualMeeting[] = [
  {
    id: 'meet-1',
    title: 'الاجتماع الدوري الأول للجنة تشغيل ومتابعة البوابة الرقمية',
    date: '2026-09-05',
    time: '11:00 ص',
    agenda: [
      'مراجعة شمولية بيانات الأقسام وعضويات هيئة التدريس المسجلة بالبوابة.',
      'تحديث نظام البريد الجامعي للطلاب الجدد المقبولين بالكلية.',
      'مناقشة إنتاجات بودكاست كلية الطب وجداول النشر الإعلامي للرابطة KaMSA.',
      'تحديد آليات الدعم الفني وحل شكاوى الـ LMS وبنك الأسئلة.'
    ],
    status: 'scheduled'
  }
];

export const initialMedicalConvoys: MedicalConvoy[] = [
  {
    id: 'convoy-1',
    title: 'القافلة الصحية والتوعوية الكبرى لمنطقة ريفي غرب كسلا',
    location: 'قرى غرب كسلا',
    date: '2026-05-12',
    description: 'قافلة طبية شاملة نظمتها الرابطة بالتعاون مع العمادة والوزارة الولائية للصحة، شملت عيادات مجانية وأدوية وتوعية ضد حمى الوادي المتصدع والكوليرا، وحققت نتائج قياسية في فحص حالات سوء التغذية بالأطفال.',
    beneficiariesCount: 1250,
    volunteersCount: 65,
    status: 'completed'
  },
  {
    id: 'convoy-2',
    title: 'العيادة الطبية الميدانية لمناطق نازحي شرق السودان بكسلا',
    location: 'مراكز الإيواء بمدينة كسلا',
    date: '2026-07-10',
    description: 'مبادرة صحية طارئة للاستجابة السريعة للأمراض الجلدية وأمراض الشتاء، بالتركيز على توفير الرعاية الأولية، الفحوصات المعملية لمرضى الملاريا، وتوفير الأدوية المنقذة للحياة.',
    beneficiariesCount: 840,
    volunteersCount: 42,
    status: 'completed'
  }
];
