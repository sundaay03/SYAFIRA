// Syariah Quest & Gamifikasi (PRD FR-07)

export const LEVEL_TIERS = [
  { level: 1, title: "Thalibul Ilmi", minXp: 0, maxXp: 300, icon: "BookOpen", desc: "Penuntut ilmu dasar keuangan syariah." },
  { level: 2, title: "Muamalah Explorer", minXp: 300, maxXp: 750, icon: "Compass", desc: "Penjelajah akad dan perbankan syariah." },
  { level: 3, title: "Syariah Strategist", minXp: 750, maxXp: 1300, icon: "Coins", desc: "Cakap dalam hisab zakat dan bagi hasil." },
  { level: 4, title: "Amanah Master", minXp: 1300, maxXp: 99999, icon: "Crown", desc: "Duta literasi dan teladan muamalah halal." }
];

export const ALL_BADGES = [
  {
    id: "badge-onboard",
    name: "Pionir Syariah",
    desc: "Menyelesaikan orientasi awal dan menetapkan tujuan belajar.",
    icon: "Sparkles",
    category: "Onboarding"
  },
  {
    id: "badge-pretest",
    name: "Penilai Diri",
    desc: "Menyelesaikan pre-test diagnostik literasi awal.",
    icon: "Target",
    category: "Assessment"
  },
  {
    id: "badge-chat",
    name: "Pencari Hikmah",
    desc: "Mengajukan pertanyaan pertama ke AI Syariah Assistant ber-RAG.",
    icon: "MessageSquare",
    category: "AI Chat"
  },
  {
    id: "badge-mod1",
    name: "Penjaga Etika",
    desc: "Tuntas mempelajari Modul Prinsip Dasar (Anti Riba, Gharar, Maysir).",
    icon: "Shield",
    category: "Learning"
  },
  {
    id: "badge-sim-mudharabah",
    name: "Mitra Mudharabah",
    desc: "Mengeksplorasi kalkulasi nisbah bagi hasil di simulator deterministik.",
    icon: "Scale",
    category: "Simulator"
  },
  {
    id: "badge-sim-zakat",
    name: "Muzakki Cermat",
    desc: "Menghitung hisab Zakat Mal 85 gram emas di simulator zakat.",
    icon: "Coins",
    category: "Simulator"
  },
  {
    id: "badge-posttest",
    name: "Juara Literasi",
    desc: "Menuntaskan evaluasi Post-test dengan kenaikan skor signifikan.",
    icon: "Award",
    category: "Assessment"
  }
];

export const INITIAL_DAILY_QUESTS = [
  {
    id: "quest-1",
    title: "Tanya AI Syariah",
    desc: "Ajukan 1 pertanyaan edukatif tentang akad atau zakat ke AI Assistant",
    xp: 40,
    completed: false
  },
  {
    id: "quest-2",
    title: "Selesaikan 1 Kuis Modul",
    desc: "Uji pemahamanmu dengan menjawab latihan soal pada modul pembelajaran",
    xp: 60,
    completed: false
  },
  {
    id: "quest-3",
    title: "Coba Simulator Keuangan",
    desc: "Lakukan uji perhitungan Bagi Hasil Mudharabah atau Estimasi Zakat Mal",
    xp: 50,
    completed: false
  }
];
