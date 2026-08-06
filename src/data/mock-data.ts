/**
 * Barcha sahifalar uchun mock (soxta) ma'lumotlar — ikki tilli (uz/ru).
 * Real backend tayyor bo'lganda service'lar shu ma'lumotlar o'rniga
 * http (axios) orqali til bo'yicha lokalizatsiyalangan javob oladi.
 */

/** Ikki tilli matn */
export interface LString {
  uz: string
  ru: string
}
const L = (uz: string, ru: string): LString => ({ uz, ru })

export type Status = 'completed' | 'inProgress' | 'notStarted'

/* ----------------------------- Umumiy tiplar ------------------------------ */
export interface Feature {
  id: string
  icon: string
  title: LString
  description: LString
}
export interface Brand {
  id: string
  name: string
}
export interface Step {
  id: string
  icon: string
  title: LString
  description: LString
}
export interface Stat {
  id: string
  label: LString
  value: string
  hint: LString
  tone: 'primary' | 'success' | 'orange'
}
export interface Plan {
  name: LString
  price: string
  period: LString
  description: LString
  features: LString[]
  cta: LString
}
export interface Faq {
  id: string
  question: LString
  answer: LString
}
export interface User {
  id: string
  name: string
  phone: string
  level: LString
  avatar: string
  isVip: boolean
}
export interface DashboardCard {
  id: string
  title: LString
  description: LString
  icon: string
  tone: 'blue' | 'green' | 'orange' | 'purple' | 'violet'
  badge?: LString
  to: string
}
export interface LeaderboardEntry {
  id: string
  rank: number
  name: string
  avatar: string
  tests: number
  accuracy: number
  score: number
  isCurrentUser?: boolean
  verified?: boolean
}

/* ------------------------------- Landing ---------------------------------- */
export const heroFeatures: Feature[] = [
  { id: 'f1', icon: 'TicketStar', title: L('Imtihon formatidagi testlar', 'Тесты в формате экзамена'), description: L('Rasmiy formatda, vaqt bilan', 'В официальном формате, с таймером') },
  { id: 'f2', icon: 'AnalyticsUp', title: L('Shaxsiy progress tahlili', 'Анализ личного прогресса'), description: L('Natijalaringni real vaqtda', 'Ваши результаты в реальном времени') },
  { id: 'f3', icon: 'Video01', title: L('Video darslar', 'Видеоуроки'), description: L('Tushunarli va amaliy darslar', 'Понятные и практичные уроки') },
  { id: 'f4', icon: 'CheckmarkBadge', title: L('Tasdiqlangan avtomaktablar', 'Проверенные автошколы'), description: L('Ishonchli avtomaktablar bilan', 'С надёжными автошколами') },
]

export const brands: Brand[] = [
  { id: 'b1', name: 'Synergy' },
  { id: 'b2', name: 'Horizon' },
  { id: 'b3', name: 'Catalyst' },
  { id: 'b4', name: 'Phoenix' },
  { id: 'b5', name: 'Pulse' },
  { id: 'b6', name: 'Solaris' },
  { id: 'b7', name: 'Aurora' },
]

export const steps: Step[] = [
  { id: 's1', icon: 'UserAdd01', title: L("Ro'yxatdan o'ting", 'Зарегистрируйтесь'), description: L('Shaxsiy profilingizni yarating', 'Создайте личный профиль') },
  { id: 's2', icon: 'PenTool03', title: L("O'rganing va test topshiring", 'Учитесь и проходите тесты'), description: L('Darslar, testlar va mashqlar', 'Уроки, тесты и упражнения') },
  { id: 's3', icon: 'ShieldUser', title: L("Imtihonga tayyor bo'ling", 'Готовьтесь к экзамену'), description: L("O'z darajangizni aniq bilib boring", 'Точно знайте свой уровень') },
]

export const testimonial = {
  name: 'Sardor Kurbanov',
  role: L("Haydovchilik guvohnomasiga tayyorlanayotgan o'quvchi", 'Студент, готовящийся к водительскому удостоверению'),
  quote: L(
    "Testlarni muntazam ishlash va darslarni ko'rish orqali xatolarimni tezda tushundim. Real imtihon formatidagi mashqlar tayyorgarlikni ancha osonlashtirdi.",
    'Регулярно решая тесты и просматривая уроки, я быстро понял свои ошибки. Задания в формате реального экзамена значительно облегчили подготовку.',
  ),
  avatar: 'https://i.pravatar.cc/160?img=12',
  stats: [
    { label: L('Tayyorgarlik vaqti', 'Время подготовки'), value: '12 kun' },
    { label: L("Test natijalari o'sishi", 'Рост результатов'), value: '+63%' },
  ],
}

export const landingStats: Stat[] = [
  { id: 'ls1', label: L('Tasdiqlangan natijalar', 'Подтверждённые результаты'), value: '10 000+', hint: L("Platformada bilimini mustahkamlab, imtihonga tayyorlangan o'quvchilar soni.", 'Количество студентов, укрепивших знания и подготовившихся к экзамену.'), tone: 'primary' },
  { id: 'ls2', label: L('Yuqori muvaffaqiyat darajasi', 'Высокий уровень успеха'), value: '92%', hint: L("Imtihondan muvaffaqiyatli o'tganlar. Real imtihon formati muvaffaqiyatni kafolatladi.", 'Успешно сдавшие экзамен. Формат реального экзамена обеспечил успех.'), tone: 'success' },
  { id: 'ls3', label: L('Keng test bazasi', 'Обширная база тестов'), value: '500+', hint: L("Yo'l harakati qoidalari va vaziyatlar bo'yicha mingga yaqin testlar to'plami.", 'Набор из почти тысячи тестов по правилам и ситуациям дорожного движения.'), tone: 'orange' },
]

export const plan: Plan = {
  name: L('Standart reja', 'Стандартный план'),
  price: "19 890 so'm",
  period: L('oylik', 'в месяц'),
  description: L('Haydovchilik imtihoniga mustaqil va samarali tayyorlanish uchun.', 'Для самостоятельной и эффективной подготовки к экзамену.'),
  features: [
    L('Barcha imtihon testlariga kirish', 'Доступ ко всем тестам экзамена'),
    L('Real imtihon formatidagi mashqlar', 'Задания в формате реального экзамена'),
    L('Natijalar va progress tahlili', 'Анализ результатов и прогресса'),
    L("Xatolar bo'yicha tavsiflar/izohlar", 'Пояснения по ошибкам'),
    L('Shaxsiy kabinet orqali kuzatuv', 'Отслеживание через личный кабинет'),
    L('Texnik yordam va yangilanishlar', 'Техподдержка и обновления'),
  ],
  cta: L('Bepul test topshirish', 'Пройти бесплатный тест'),
}

export const faqs: Faq[] = [
  { id: 'q1', question: L('Platformadan foydalanish bepulmi?', 'Использование платформы бесплатно?'), answer: L("Ha, ro'yxatdan o'tib bepul test topshirishingiz mumkin. To'liq imkoniyatlar uchun oylik obuna mavjud.", 'Да, зарегистрировавшись, вы можете пройти бесплатный тест. Для полного доступа есть месячная подписка.') },
  { id: 'q2', question: L('Testlar rasmiy imtihonga mosmi?', 'Тесты соответствуют официальному экзамену?'), answer: L('Testlar rasmiy imtihon formati va savollari asosida tuzilgan, shu sababli real imtihonga mos keladi.', 'Тесты составлены на основе формата и вопросов официального экзамена, поэтому соответствуют реальному экзамену.') },
  { id: 'q3', question: L("Natijalarimni qayerdan ko'raman?", 'Где я увижу свои результаты?'), answer: L('Barcha natijalar shaxsiy kabinetingizda saqlanadi va progress tahlili orqali kuzatib borasiz.', 'Все результаты сохраняются в личном кабинете, и вы отслеживаете их через анализ прогресса.') },
  { id: 'q4', question: L('Telefon orqali ham ishlaydimi?', 'Работает ли с телефона?'), answer: L("Ha, platforma to'liq moslashuvchan — telefon, planshet va kompyuterda bir xil ishlaydi.", 'Да, платформа полностью адаптивна — одинаково работает на телефоне, планшете и компьютере.') },
  { id: 'q5', question: L('Qaysi avtomaktablar bilan ishlaysiz?', 'С какими автошколами вы работаете?'), answer: L("Biz mamlakat bo'ylab tasdiqlangan avtomaktablar bilan hamkorlik qilamiz.", 'Мы сотрудничаем с проверенными автошколами по всей стране.') },
]

/* -------------------------------- Auth ------------------------------------ */
export const currentUser: User = {
  id: 'u1',
  name: "Ahmadillo Murodxo'jayev",
  phone: '+998 90 123 45 67',
  level: L("Boshlang'ich", 'Начальный'),
  avatar: 'https://i.pravatar.cc/120?img=68',
  isVip: false,
}

/* ------------------------------ Dashboard --------------------------------- */
export const dashboardCards: DashboardCard[] = [
  { id: 'c1', title: L('Biletlar', 'Билеты'), description: L('Rasmiy imtihon biletlari asosida tuzilgan savollarni yechib, real sinovga tayyorlaning.', 'Решайте вопросы по официальным билетам и готовьтесь к реальному экзамену.'), icon: 'TicketStar', tone: 'blue', to: '/tickets' },
  { id: 'c2', title: L('Mavzulashtirilgan testlar', 'Тематические тесты'), description: L("Tanlangan mavzu bo'yicha test ishlab, o'zingizni aniq yo'nalishda sinab ko'ring.", 'Решайте тесты по выбранной теме и проверяйте себя в конкретном направлении.'), icon: 'Note01', tone: 'green', badge: L('Tez kunda', 'Скоро'), to: '/tests' },
  { id: 'c3', title: L('Imtihon topshirish', 'Сдача экзамена'), description: L('Real imtihon formatida vaqt bilan test topshiring va tayyorgarlik darajangizni tekshiring.', 'Проходите тест на время в формате реального экзамена и проверяйте уровень подготовки.'), icon: 'TestTube', tone: 'orange', to: '/exam' },
  { id: 'c4', title: L('Saqlangan savollar', 'Сохранённые вопросы'), description: L("Mavzu yoki qiyinchilik bo'yicha test tanlab, bilimlaringizni mashq qiling.", 'Выбирайте тесты по теме или сложности и тренируйте знания.'), icon: 'Bookmark02', tone: 'purple', to: '/saved' },
  { id: 'c5', title: L("O'quv mavzulari", 'Учебные темы'), description: L("Yo'l harakati qoidalarini mavzular bo'yicha o'rganing va har bir bo'limda.", 'Изучайте правила дорожного движения по темам и в каждом разделе.'), icon: 'TrafficLight', tone: 'violet', to: '/topics' },
]

export const dashboardProgress = {
  overall: 78,
  target: 85,
  metrics: [
    { id: 'm1', value: '84%', label: L('Oxirgi real format test', 'Последний тест в реальном формате') },
    { id: 'm2', value: '92%', label: L("Eng kuchli mavzu: Yo'l belgilari", 'Сильнейшая тема: Дорожные знаки') },
    { id: 'm3', value: '41%', label: L('Takomillashtirish kerak: Chorrahalar', 'Требует улучшения: Перекрёстки') },
    { id: 'm4', value: '12:24', label: L("Platformada o'tkazilgan vaqt", 'Время на платформе') },
  ],
}

export const leaderboard: Record<'weekly' | 'monthly' | 'all', LeaderboardEntry[]> = {
  monthly: [
    { id: 'l1', rank: 1, name: 'Alisher Normatov', avatar: 'https://i.pravatar.cc/100?img=13', tests: 145, accuracy: 96, score: 2847, verified: true },
    { id: 'l2', rank: 2, name: "Ahmadillo Murodxo'jayev", avatar: 'https://i.pravatar.cc/100?img=68', tests: 124, accuracy: 78, score: 2501, isCurrentUser: true },
    { id: 'l3', rank: 3, name: 'Nilufar Rakhimova', avatar: 'https://i.pravatar.cc/100?img=45', tests: 103, accuracy: 72, score: 1938 },
    { id: 'l4', rank: 4, name: 'Jasur Toshmatov', avatar: 'https://i.pravatar.cc/100?img=33', tests: 98, accuracy: 70, score: 1720 },
    { id: 'l5', rank: 5, name: 'Malika Yusupova', avatar: 'https://i.pravatar.cc/100?img=47', tests: 91, accuracy: 68, score: 1602 },
  ],
  weekly: [
    { id: 'w1', rank: 1, name: 'Nilufar Rakhimova', avatar: 'https://i.pravatar.cc/100?img=45', tests: 41, accuracy: 91, score: 980, verified: true },
    { id: 'w2', rank: 2, name: "Ahmadillo Murodxo'jayev", avatar: 'https://i.pravatar.cc/100?img=68', tests: 38, accuracy: 82, score: 910, isCurrentUser: true },
    { id: 'w3', rank: 3, name: 'Alisher Normatov', avatar: 'https://i.pravatar.cc/100?img=13', tests: 35, accuracy: 88, score: 870 },
  ],
  all: [
    { id: 'a1', rank: 1, name: 'Alisher Normatov', avatar: 'https://i.pravatar.cc/100?img=13', tests: 512, accuracy: 95, score: 9840, verified: true },
    { id: 'a2', rank: 2, name: 'Malika Yusupova', avatar: 'https://i.pravatar.cc/100?img=47', tests: 480, accuracy: 90, score: 9120 },
    { id: 'a3', rank: 3, name: "Ahmadillo Murodxo'jayev", avatar: 'https://i.pravatar.cc/100?img=68', tests: 455, accuracy: 84, score: 8730, isCurrentUser: true },
  ],
}

export const activeStudents = {
  count: '5 000+',
  label: L('faol talabalar', 'активных студентов'),
  hint: L('Har kuni yuzlab testlar topshirilmoqda va reyting yangilanmoqda.', 'Каждый день проходятся сотни тестов, и рейтинг обновляется.'),
  avatars: [
    'https://i.pravatar.cc/60?img=1',
    'https://i.pravatar.cc/60?img=5',
    'https://i.pravatar.cc/60?img=8',
    'https://i.pravatar.cc/60?img=15',
    'https://i.pravatar.cc/60?img=20',
    'https://i.pravatar.cc/60?img=25',
  ],
}

/* -------------------------------- Biletlar -------------------------------- */
export interface Ticket {
  id: string
  number: number
  status: Status
  result?: number
  attempts: number
  questions: number
  minutes: number
}
export const ticketStats = { avg: 78, done: '12/30', top: 96 }
export const ticketCounts = { all: 50, inProgress: 2, completed: 12, notStarted: 36 }
export const tickets: Ticket[] = [
  { id: 't1', number: 1, status: 'completed', result: 78, attempts: 1, questions: 20, minutes: 30 },
  { id: 't2', number: 2, status: 'inProgress', result: 92, attempts: 3, questions: 20, minutes: 30 },
  { id: 't3', number: 3, status: 'notStarted', attempts: 0, questions: 20, minutes: 30 },
  { id: 't4', number: 4, status: 'notStarted', attempts: 0, questions: 20, minutes: 30 },
  { id: 't5', number: 5, status: 'completed', result: 96, attempts: 8, questions: 20, minutes: 30 },
  { id: 't6', number: 6, status: 'notStarted', attempts: 0, questions: 20, minutes: 30 },
  { id: 't7', number: 7, status: 'notStarted', attempts: 0, questions: 20, minutes: 30 },
  { id: 't8', number: 8, status: 'notStarted', attempts: 0, questions: 20, minutes: 30 },
]

/* -------------------------- Mavzulashtirilgan testlar --------------------- */
export interface TopicTest {
  id: string
  icon: string
  title: LString
  status: Status
  result?: number
  attempts: number
  questions: number
  minutes: number
}
export const topicTests: TopicTest[] = [
  { id: 'tt1', icon: 'TrafficLight', title: L("Yo'l belgilari", 'Дорожные знаки'), status: 'completed', result: 78, attempts: 1, questions: 20, minutes: 30 },
  { id: 'tt2', icon: 'RoadLocation01', title: L('Chorrahalar', 'Перекрёстки'), status: 'inProgress', result: 92, attempts: 3, questions: 20, minutes: 30 },
  { id: 'tt3', icon: 'ParkingAreaCircle', title: L("To'xtash va parkovka", 'Остановка и парковка'), status: 'notStarted', attempts: 0, questions: 20, minutes: 30 },
  { id: 'tt4', icon: 'RoadIcon', title: L('Belgilar + chiziqlar', 'Знаки + разметка'), status: 'notStarted', attempts: 0, questions: 20, minutes: 30 },
  { id: 'tt5', icon: 'ShieldIcon', title: L('Xavfsizlik qoidalari', 'Правила безопасности'), status: 'completed', result: 96, attempts: 8, questions: 20, minutes: 30 },
]

/* ----------------------------- O'quv mavzular ----------------------------- */
export interface TheoryTopic {
  id: string
  number: number
  title: LString
  locked: boolean
}
export const topicsProgress = { done: 5, total: 28 }
export const theoryTopics: TheoryTopic[] = [
  { id: 'th1', number: 1, title: L('Chorrahalarda harakatlanish qoidalari', 'Правила движения на перекрёстках'), locked: false },
  { id: 'th2', number: 2, title: L('Piyodalarga yo\'l berish va ustunlik tartib qoidalari', 'Правила уступки пешеходам и приоритета'), locked: false },
  { id: 'th3', number: 3, title: L('Tezlik va masofa saqlash qoidalari', 'Правила скорости и дистанции'), locked: true },
  { id: 'th4', number: 4, title: L('Belgilar va yo\'l chiziqlarini amal qilish qoidalari', 'Правила соблюдения знаков и разметки'), locked: true },
  { id: 'th5', number: 5, title: L('Maxsus transport vositalariga yo\'l berish qoidalari', 'Правила уступки спецтранспорту'), locked: true },
]

/* ---------------------------- Saqlangan savollar -------------------------- */
export type SavedCategory = 'wrong' | 'marked' | 'recent'
export interface SavedQuestion {
  id: string
  number: number
  text: LString
  categories: SavedCategory[]
}
export const savedCount = 42
export const savedQuestions: SavedQuestion[] = [
  { id: 'sq1', number: 1, text: L("Ushbu bolalar belgisi yo'l belgisi nimani bildiradi?", 'Что означает этот знак «Дети»?'), categories: ['marked', 'recent'] },
  { id: 'sq2', number: 2, text: L('Haydovchi chorrahaga yaqinlashayotganda svetofor sariq rangda yonsa, nima qilishi kerak?', 'Что должен сделать водитель, если при приближении к перекрёстку загорелся жёлтый сигнал светофора?'), categories: ['wrong'] },
  { id: 'sq3', number: 3, text: L("Rasmdagi holatda kim birinchi o'tadi? (Regulyatsiyasiz chorraha, o'ng tomondan transport kelmoqda)", 'Кто проедет первым в данной ситуации? (Нерегулируемый перекрёсток, транспорт приближается справа)'), categories: ['marked'] },
  { id: 'sq4', number: 4, text: L("Uzluksiz yo'l chizig'ini kesib o'tish qachon ruxsat etiladi?", 'Когда разрешается пересекать сплошную линию разметки?'), categories: ['wrong', 'recent'] },
  { id: 'sq5', number: 5, text: L("Ushbu kirish taqiqlanadi yo'l belgisi nimani anglatadi?", 'Что означает знак «Въезд запрещён»?'), categories: ['marked'] },
]

/* ------------------------------- Imtihon ---------------------------------- */
export interface ExamOption {
  key: string
  text: LString
}
export interface ExamQuestion {
  id: string
  number: number
  text: LString
  sign: string // emoji yoki belgi
  signTone: 'warning' | 'prohibit' | 'info'
  options: ExamOption[]
  correct: string
  explanation: LString
}
export const examMeta = { minutes: 30, count: 20 }
export const examQuestions: ExamQuestion[] = [
  {
    id: 'e1', number: 1, sign: '🚸', signTone: 'warning',
    text: L("Ushbu yo'l belgisining ma'nosi nima?", 'Что означает этот дорожный знак?'),
    options: [
      { key: 'F1', text: L("Bolalar o'ynash joyi", 'Место игр детей') },
      { key: 'F2', text: L("O'tish joyi", 'Пешеходный переход') },
      { key: 'F3', text: L('Maktab zonasiga yaqinlashyapsiz', 'Приближение к школьной зоне') },
      { key: 'F4', text: L('Yashash joyi', 'Жилая зона') },
    ],
    correct: 'F3',
    explanation: L("Bu belgi maktab hududiga yaqinlashayotganingizni bildiradi. Tezlikni kamaytiring va bolalarga e'tibor bering.", 'Этот знак предупреждает о приближении к школьной зоне. Снизьте скорость и будьте внимательны к детям.'),
  },
  {
    id: 'e2', number: 2, sign: '🟡', signTone: 'warning',
    text: L('Svetofor sariq rangda yonsa, haydovchi nima qilishi kerak?', 'Что должен сделать водитель при жёлтом сигнале светофора?'),
    options: [
      { key: 'F1', text: L("Tezlikni oshirib o'tib ketish", 'Ускориться и проехать') },
      { key: 'F2', text: L("To'xtash chizig'i oldida to'xtash", 'Остановиться перед стоп-линией') },
      { key: 'F3', text: L('Signal berish', 'Подать сигнал') },
      { key: 'F4', text: L('Orqaga qaytish', 'Сдать назад') },
    ],
    correct: 'F2',
    explanation: L("Sariq signal to'xtashni talab qiladi, agar xavfsiz to'xtab bo'lsa. Faqat to'xtab bo'lmaydigan holatlarda harakatni davom ettirish mumkin.", 'Жёлтый сигнал требует остановки, если это можно сделать безопасно. Продолжать движение можно только если остановка невозможна.'),
  },
  {
    id: 'e3', number: 3, sign: '⛔', signTone: 'prohibit',
    text: L("Ushbu belgi o'rnatilgan joyda nima taqiqlanadi?", 'Что запрещено там, где установлен этот знак?'),
    options: [
      { key: 'F1', text: L('Barcha transport vositalarining kirishi', 'Въезд всех транспортных средств') },
      { key: 'F2', text: L('Faqat yuk mashinalari', 'Только грузовые автомобили') },
      { key: 'F3', text: L("To'xtash", 'Остановка') },
      { key: 'F4', text: L('Signal berish', 'Подача сигнала') },
    ],
    correct: 'F1',
    explanation: L("«Kirish taqiqlangan» belgisi barcha transport vositalarining ushbu yo'nalishda harakatlanishini taqiqlaydi.", 'Знак «Въезд запрещён» запрещает движение всех транспортных средств в данном направлении.'),
  },
  {
    id: 'e4', number: 4, sign: '↔️', signTone: 'info',
    text: L("Uzluksiz yo'l chizig'ini kesib o'tish qachon ruxsat etiladi?", 'Когда разрешается пересекать сплошную линию?'),
    options: [
      { key: 'F1', text: L("Oldingi mashinani quvib o'tish uchun", 'Для обгона впереди идущего автомобиля') },
      { key: 'F2', text: L("Hech qachon", 'Никогда') },
      { key: 'F3', text: L("Kechasi yo'l bo'sh bo'lsa", 'Ночью, если дорога свободна') },
      { key: 'F4', text: L("Yo'l keng bo'lsa", 'Если дорога широкая') },
    ],
    correct: 'F2',
    explanation: L("Uzluksiz chiziqni kesib o'tish taqiqlanadi. U qarama-qarshi oqimlarni ajratadi va xavfsizlikni ta'minlaydi.", 'Пересекать сплошную линию запрещено. Она разделяет встречные потоки и обеспечивает безопасность.'),
  },
  {
    id: 'e5', number: 5, sign: '🅿️', signTone: 'info',
    text: L("Ushbu belgi nimani anglatadi?", 'Что означает этот знак?'),
    options: [
      { key: 'F1', text: L('Parkovka joyi', 'Место для парковки') },
      { key: 'F2', text: L('Avtobus bekati', 'Автобусная остановка') },
      { key: 'F3', text: L("To'xtash taqiqlangan", 'Остановка запрещена') },
      { key: 'F4', text: L('Yo\'nalishlar', 'Направления') },
    ],
    correct: 'F1',
    explanation: L("Bu belgi transport vositalarini to'xtatib qo'yish (parkovka) uchun ruxsat etilgan joyni bildiradi.", 'Этот знак обозначает место, где разрешена стоянка транспортных средств.'),
  },
]
