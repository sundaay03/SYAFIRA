// Modul Pembelajaran Smart Learning SYARIAH-AI (PRD FR-03)
// 5 Modul Terstruktur dengan Narasi Edukatif, Skenario Gen Z (Alya & Rafi), dan Kuis Latihan

export const LEARNING_MODULES = [
  {
    id: "mod-01",
    order: 1,
    title: "Prinsip Dasar Keuangan Syariah",
    subtitle: "Fondasi Etika, Keadilan, dan Larangan Riba, Gharar, & Maysir",
    category: "Dasar Konseptual",
    level: "Pemula (Beginner)",
    readTime: "7 menit",
    icon: "ShieldCheck",
    xpReward: 150,
    sourceRefIds: ["KHES-MA-2008", "POJK-16-2022"],
    objectives: [
      "Memahami tujuan utama (Maqashid Syariah) dalam pengelolaan harta kekayaan.",
      "Mengenal 3 larangan pokok: Riba (bunga/riba nasi'ah & fadhl), Gharar (ketidakjelasan objek), dan Maysir (spekulasi perjudian).",
      "Membedakan cara pandang keuangan syariah (uang sebagai alat tukar) vs konvensional (uang sebagai komoditas yang berbunga)."
    ],
    lessons: [
      {
        id: "les-01-01",
        title: "1. Filosofi Harta dalam Perspektif Islam",
        content: `Dalam Islam, hakikat kepemilikan mutlak atas segala sesuatu adalah milik Allah SWT. Manusia berperan sebagai pemegang amanah (*khalifah fil ardh*) yang bertugas mengelola harta dengan adil, produktif, dan bermanfaat bagi masyarakat (*maslahah*).
        
Uang diposisikan murni sebagai **alat tukar (*medium of exchange*)** dan **satuan nilai (*unit of account*)**, bukan sebagai komoditas yang dapat diperjualbelikan untuk menghasilkan 'anak uang' secara otomatis tanpa ada underlying aset riil atau usaha produktif.`,
        caseStudy: {
          persona: "Alya (21 tahun, Mahasiswi)",
          scenario: "Alya bertanya: 'Mengapa di bank syariah tidak ada sistem bunga tetap 5% per tahun seperti bank konvensional?'",
          insight: "Karena bunga memastikan keuntungan tetap bagi pemilik dana terlepas apakah peminjam untung atau rugi. Dalam syariah, keuntungan harus bersumber dari aktivitas ekonomi riil melalui bagi hasil atau margin jual-beli yang adil."
        }
      },
      {
        id: "les-01-02",
        title: "2. Tiga Pilar yang Diharamkan: Riba, Gharar, & Maysir",
        content: `Untuk menciptakan sistem finansial yang adil dan stabil, transaksi syariah secara tegas melarang:
        
1. **Riba:** Tambahan tanpa kompensasi penyeimbang riil (*'iwadh*), baik berupa bunga pinjaman hutang (*riba duyun/nasi'ah*) maupun penukaran barang ribawi sejenis dengan takaran berbeda (*riba buyu'/fadhl*).
2. **Gharar:** Ketidakjelasan atau manipulasi informasi mengenai kuantitas, kualitas, harga, atau waktu serah terima barang yang menyebabkan salah satu pihak tertipu atau dirugikan.
3. **Maysir (Qimar):** Transaksi spekulatif untung-untungan di mana keuntungan satu pihak diperoleh langsung dari kerugian total pihak lain (zero-sum game/perjudian).`,
        interactiveBox: {
          title: "Formula 'Maghrib' (Haram)",
          text: "Maysir (Judi) + Gharar (Tipu/Samar) + Haram (Objek Terlarang) + Riba (Bunga) + Batil (Kezaliman) = Ditolak dalam Fiqih Muamalah."
        }
      }
    ],
    glossary: [
      { term: "Riba", desc: "Penambahan nilai tanpa adanya transaksi riil atau penyeimbang yang sah." },
      { term: "Gharar", desc: "Ketidakpastian ekstrem atau ambiguitas dalam rukun dan syarat kontrak." },
      { term: "Maysir", desc: "Perjudian atau spekulasi murni tanpa ada aktivitas ekonomi riil produktif." }
    ],
    quiz: [
      {
        id: "q-01-1",
        question: "Manakah pernyataan yang paling tepat mengenai fungsi uang dalam sistem ekonomi syariah?",
        options: [
          "Uang adalah komoditas yang boleh disewakan dengan bunga tetap setiap bulannya.",
          "Uang adalah alat tukar dan pengukur nilai, bukan komoditas penghasil bunga mandiri.",
          "Uang dapat ditimbun sebanyak-banyaknya tanpa perlu dikeluarkan zakatnya.",
          "Uang hanya boleh digunakan dalam bentuk koin emas dan perak saja."
        ],
        correctIndex: 1,
        explanation: "Dalam keuangan syariah, uang berfungsi sebagai alat tukar dan satuan hitung riil. Menjadikan uang sebagai komoditas untuk berbunga tanpa usaha produktif mengarah pada praktik riba."
      },
      {
        id: "q-01-2",
        question: "Alya ditawari investasi online yang menjanjikan imbal hasil pasti 20% setiap bulan tanpa risiko rugi sama sekali. Berdasarkan prinsip syariah, tawaran ini patut dicurigai karena...",
        options: [
          "Mengandung unsur Riba dan janji keuntungan pasti tanpa risiko usaha nyata (gharar/bodong).",
          "Tingkat keuntungannya terlalu kecil untuk ukuran Gen Z.",
          "Tidak menggunakan mata uang asing.",
          "Memerlukan biaya pendaftaran awal."
        ],
        correctIndex: 0,
        explanation: "Dalam fiqih muamalah berlaku kaidah 'Al-Ghunmu bil Ghurmi' (keuntungan berjalan seiring risiko). Menjanjikan imbal hasil tetap tinggi tanpa risiko kerugian riil biasanya terindikasi skema ponzi, riba, atau penipuan finansial."
      },
      {
        id: "q-01-3",
        question: "Istilah untuk ketidakpastian ekstrem mengenai kualitas, kuantitas, atau waktu penyerahan barang dalam jual-beli adalah...",
        options: [
          "Riba Fadhl",
          "Gharar",
          "Mudharabah",
          "Ijarah"
        ],
        correctIndex: 1,
        explanation: "Gharar adalah ketidakjelasan atau keraguan mendasar dalam kontrak jual-beli yang dapat memicu persengketaan dan merugikan salah satu pihak."
      }
    ]
  },
  {
    id: "mod-02",
    order: 2,
    title: "Pengantar Akad-Akad Muamalah",
    subtitle: "Mengenal Akad Tijarah (Komersial) dan Tabarru' (Sosial)",
    category: "Fiqih Transaksi",
    level: "Pemula (Beginner)",
    readTime: "9 menit",
    icon: "FileSpreadsheet",
    xpReward: 180,
    sourceRefIds: ["DSN-115-2017", "DSN-04-2000", "KHES-MA-2008"],
    objectives: [
      "Mengklasifikasikan dua jenis akad utama: Akad Tabarru' (kebajikan) dan Akad Tijarah (profit oriented).",
      "Memahami akad kemitraan bagi hasil: Mudharabah dan Musyarakah.",
      "Memahami akad jual-beli dan sewa: Murabahah, Salam, Istishna', dan Ijarah."
    ],
    lessons: [
      {
        id: "les-02-01",
        title: "1. Pemisahan Akad Tabarru' vs Akad Tijarah",
        content: `Semua kontrak dalam keuangan syariah dibagi menjadi dua kelompok besar:
        
- **Akad Tabarru' (Sosial/Tolong-Menolong):** Akad yang ditujukan untuk mencari ridha Allah dan membantu sesama tanpa mencari laba materiil. Contoh: Hibah, Wakaf, Qardh (pinjaman kebajikan tanpa bunga), dan Shadaqah.
- **Akad Tijarah (Komersial/Bisnis):** Akad yang ditujukan untuk mencari keuntungan yang sah (*for-profit*). Di sinilah berlaku skema bagi hasil, jual-beli, dan sewa-menyewa.`,
        caseStudy: {
          persona: "Rafi (23 tahun, Karyawan Muda)",
          scenario: "Teman Rafi meminjam Rp 1.000.000 dengan akad Qardh (pinjaman). Bolehkah Rafi meminta dikembalikan Rp 1.100.000 sebagai 'ongkos lelah'?",
          insight: "Tidak boleh! Akad Qardh adalah akad sosial (Tabarru'). Meminta imbalan tambahan atas pinjaman hutang adalah riba yang tegas dilarang: 'Kullu qardhin jarra manfa'atan fahuwa riba'."
        }
      },
      {
        id: "les-02-02",
        title: "2. Membedakan Mudharabah, Musyarakah, & Murabahah",
        content: `Ketiga akad ini adalah instrumen yang paling sering ditemui dalam layanan perbankan dan fintech syariah:
        
1. **Mudharabah (Kemitraan Pasif):** Shahibul Mal (pemilik modal) menyetorkan 100% dana, Mudharib (pengelola) menyumbangkan keahlian & waktu. Laba dibagi sesuai nisbah (misal 60:40).
2. **Musyarakah (Kemitraan Bersama):** Semua pihak menyertakan porsi modal dan bersama-sama memiliki hak mengelola bisnis. Keuntungan dibagi sesuai nisbah, kerugian dibagi proporsional porsi modal.
3. **Murabahah (Jual-Beli Margin Transparan):** Penjual membeli barang yang diinginkan nasabah, menjelaskan harga perolehan, lalu menjualnya ke nasabah dengan tambahan margin laba yang disepakati bersama.`,
        interactiveBox: {
          title: "Catatan Kritis Mudharabah",
          text: "Nisbah Mudharabah adalah persentase dari KEUNTUNGAN/LABA riil, bukan persentase dari pokok modal yang ditanamkan!"
        }
      }
    ],
    glossary: [
      { term: "Shahibul Mal", desc: "Pihak penyedia dana atau pemilik modal dalam akad kemitraan." },
      { term: "Mudharib", desc: "Pihak yang mengelola usaha dengan keahlian dan tenaganya." },
      { term: "Nisbah", desc: "Porsi rasio bagi hasil keuntungan (misal 55% : 45%) yang disepakati di muka." },
      { term: "Murabahah", desc: "Akad jual beli dengan keterbukaan harga modal dan margin laba penjual." }
    ],
    quiz: [
      {
        id: "q-02-1",
        question: "Jika Rafi menyetorkan modal 100% untuk usaha kopi temannya yang bertindak sebagai pengelola penuh, akad apakah yang tepat digunakan?",
        options: [
          "Akad Murabahah",
          "Akad Mudharabah",
          "Akad Qardh Hasan",
          "Akad Wadiah"
        ],
        correctIndex: 1,
        explanation: "Mudharabah adalah akad kerja sama usaha di mana pemilik dana menyediakan 100% modal dan mitra lain bertindak penuh sebagai pengelola usaha (*mudharib*)."
      },
      {
        id: "q-02-2",
        question: "Apa perbedaan paling mendasar antara Mudharabah dan Musyarakah?",
        options: [
          "Mudharabah modalnya dari satu pihak saja, sedangkan Musyarakah modalnya disetorkan oleh kedua belah pihak.",
          "Mudharabah dilarang di bank syariah, sedangkan Musyarakah diperbolehkan.",
          "Musyarakah tidak boleh menghasilkan keuntungan.",
          "Mudharabah menggunakan bunga sedangkan Musyarakah tidak."
        ],
        correctIndex: 0,
        explanation: "Dalam Mudharabah, Shahibul Mal menyediakan 100% modal sedangkan Mudharib menyediakan tenaga/keahlian. Dalam Musyarakah, kedua belah pihak sama-sama menyetorkan porsi modal."
      },
      {
        id: "q-02-3",
        question: "Mengapa bank syariah boleh mengambil keuntungan dalam transaksi pembiayaan KPR Murabahah?",
        options: [
          "Karena bank meminjamkan uang dengan suku bunga mengambang (floating rate).",
          "Karena bank bertindak sebagai penjual barang properti dengan margin laba yang transparan dan tetap.",
          "Karena bank mengenakan denda keterlambatan berbunga.",
          "Karena bank memotong pajak sepihak."
        ],
        correctIndex: 1,
        explanation: "Murabahah adalah akad perniagaan riil (jual-beli), bukan pinjaman berbunga. Bank membeli rumah tersebut lalu menjualnya kepada nasabah dengan cicilan tetap dan margin keuntungan yang disepakati sejak awal."
      }
    ]
  },
  {
    id: "mod-03",
    order: 3,
    title: "Tabungan & Pembiayaan Syariah",
    subtitle: "Mekanisme Tabungan Wadiah vs Mudharabah, serta Simulasi Margin",
    category: "Produk Finansial",
    level: "Menengah (Intermediate)",
    readTime: "8 menit",
    icon: "Wallet",
    xpReward: 200,
    sourceRefIds: ["POJK-16-2022", "DSN-115-2017"],
    objectives: [
      "Mengenal dua jenis akad rekening tabungan: Wadiah Yad Dhamanah vs Mudharabah Muthlaqah.",
      "Memahami perbedaan angsuran margin tetap syariah vs suku bunga mengambang (floating) konvensional.",
      "Mengetahui perlindungan simpanan syariah melalui LPS (Lembaga Penjamin Simpanan)."
    ],
    lessons: [
      {
        id: "les-03-01",
        title: "1. Akad Rekening Tabungan: Wadiah vs Mudharabah",
        content: `Ketika membuka rekening di bank syariah, nasabah dapat memilih antara dua skema akad:
        
1. **Wadiah Yad Dhamanah (Titipan Berjamin):**
   - Nasabah menitipkan uang ke bank.
   - Bank menjamin keamanan uang dan nasabah boleh mengambilnya sewaktu-waktu.
   - Bank boleh memberikan *bonus sukarela (athaya)* yang tidak diperjanjikan di awal dan tidak mengikat. Cocok untuk tabungan harian/transaksional tanpa biaya admin.
   
2. **Mudharabah Muthlaqah (Investasi Bebas):**
   - Nasabah bertindak sebagai penyedia dana, dan bank mengelola dana tersebut ke sektor riil yang halal.
   - Nasabah mendapatkan porsi bagi hasil bulanan sesuai nisbah yang disepakati (misal 20% nasabah : 80% bank).
   - Besaran imbal hasil bergantung pada kinerja pendapatan bank bulan berjalan. Cocok untuk tabungan rencana atau deposito.`,
        caseStudy: {
          persona: "Alya (Mahasiswi)",
          scenario: "Alya ingin menabung uang saku bulanannya yang sering ia tarik lewat ATM tanpa ingin terpotong biaya administrasi bulanan.",
          insight: "Alya sebaiknya memilih Tabungan Wadiah. Rekening Wadiah murni titipan, bebas potongan admin rutin di sebagian besar bank syariah, dan dananya aman dijamin LPS."
        }
      },
      {
        id: "les-03-02",
        title: "2. Mengapa Cicilan Syariah Tidak Terpengaruh Kenaikan Suku Bunga Acuan?",
        content: `Pada pembiayaan pembelian aset (seperti rumah atau kendaraan) dengan akad **Murabahah**:
        
- Total kewajiban cicilan dihitung di awal: **Harga Beli Pokok + Margin Laba Bank**.
- Cicilan per bulan bernilai **tetap (*fixed*)** dari bulan ke-1 hingga bulan terakhir jatuh tempo.
- Jika Bank Sentral menaikkan suku bunga acuan (BI-Rate), cicilan nasabah akad Murabahah yang sudah berjalan **sama sekali tidak boleh dinaikkan**, memberikan kepastian finansial bagi keluarga muda.`
      }
    ],
    glossary: [
      { term: "Wadiah Yad Dhamanah", desc: "Akad titipan barang/uang yang boleh dimanfaatkan pengelola dengan jaminan pengembalian penuh." },
      { term: "Athaya / Bonus", desc: "Pemberian sukarela dari bank syariah pada akad titipan wadiah tanpa janji di muka." },
      { term: "Floating Rate", desc: "Suku bunga mengambang konvensional yang dapat naik sewaktu-waktu sesuai kondisi pasar." }
    ],
    quiz: [
      {
        id: "q-03-1",
        question: "Fitur utama dari tabungan dengan akad Wadiah Yad Dhamanah adalah...",
        options: [
          "Nasabah dijanjikan bagi hasil 10% pasti setiap bulan.",
          "Akad titipan murni berjamin di mana bank dapat memberikan bonus sukarela tanpa dipersyaratkan di awal.",
          "Uang nasabah ditahan selama 5 tahun tanpa boleh ditarik.",
          "Nasabah wajib menanggung kerugian bank."
        ],
        correctIndex: 1,
        explanation: "Wadiah Yad Dhamanah adalah titipan bergaransi. Bank tidak boleh menjanjikan keuntungan pasti di awal, namun berhak memberikan bonus (athaya) sukarela."
      },
      {
        id: "q-03-2",
        question: "Jika terjadi krisis moneter dan suku bunga acuan naik tajam, apa yang terjadi pada cicilan KPR Syariah berakad Murabahah yang sudah disepakati?",
        options: [
          "Cicilan otomatis melonjak mengikuti suku bunga pasar.",
          "Cicilan tetap sama sesuai nominal yang disepakati di awal akad hingga lunas.",
          "Bank berhak menyita properti secara sepihak.",
          "Akad dibatalkan secara otomatis."
        ],
        correctIndex: 1,
        explanation: "Harga jual pada akad Murabahah telah mengikat dan final sejak awal akad. Bank syariah tidak diperkenankan menaikkan harga jual atau margin yang sudah disepakati di tengah jalan."
      },
      {
        id: "q-03-3",
        question: "Lembaga negara manakah di Indonesia yang menjamin keamanan dana simpanan nasabah di bank syariah?",
        options: [
          "LPS (Lembaga Penjamin Simpanan)",
          "BAZNAS",
          "Kominfo",
          "Kadin"
        ],
        correctIndex: 0,
        explanation: "LPS menjamin simpanan nasabah baik di bank konvensional maupun bank syariah hingga batas maksimal yang ditentukan peraturan perundang-undangan."
      }
    ]
  },
  {
    id: "mod-04",
    order: 4,
    title: "Pengantar & Fiqih Zakat Mal Modern",
    subtitle: "Kalkulasi Nisab 85g Emas, Haul, dan Perhitungan Portofolio Harta",
    category: "Zakat & Filantropi",
    level: "Menengah (Intermediate)",
    readTime: "9 menit",
    icon: "Coins",
    xpReward: 200,
    sourceRefIds: ["UU-23-2011", "BAZNAS-01-2024"],
    objectives: [
      "Memahami syarat wajib zakat mal: Kepemilikan penuh, mencapai nisab, dan genap haul (1 tahun).",
      "Mengetahui cara menghitung nisab berbasis harga emas terkini (85 gram emas).",
      "Mengidentifikasi harta yang terkena zakat (tabungan, emas, perniagaan) dikurangi utang jatuh tempo."
    ],
    lessons: [
      {
        id: "les-04-01",
        title: "1. Konsep Nisab, Haul, dan Kadar 2.5%",
        content: `Zakat Mal adalah instrumen redistribusi keadilan sosial Islam untuk membersihkan harta dan menyucikan jiwa:
        
- **Nisab:** Batas minimal kepemilikan harta sehingga seseorang dikategorikan sebagai *Muzakki* (wajib zakat). Untuk harta simpanan dan perniagaan, nisabnya adalah setara dengan **85 gram emas murni**.
- **Haul:** Persyaratan waktu kepemilikan harta tersebut bertahan di atas nisab selama **satu tahun hijriah/masehi**.
- **Kadar Zakat:** Deterministik sebesar **2,5%** dari total harta bersih yang telah memenuhi syarat.`,
        caseStudy: {
          persona: "Rafi (Muzakki Pemula)",
          scenario: "Rafi memiliki total tabungan dan emas senilai Rp 130.000.000 yang sudah ia simpan selama lebih dari 1 tahun. Harga emas saat ini Rp 1.400.000/gram.",
          insight: "Nisab: 85 x Rp 1.400.000 = Rp 119.000.000. Karena harta Rafi (Rp 130 jt) > Nisab (Rp 119 jt) dan telah mencapai haul 1 tahun, Rafi wajib membayar zakat mal sebesar 2.5% x Rp 130.000.000 = Rp 3.250.000."
        }
      },
      {
        id: "les-04-02",
        title: "2. Menghitung Harta Bersih Terkena Zakat",
        content: `Rumus dasar hisab Zakat Mal:
        
**Harta Kena Zakat = (Uang Tunai + Tabungan + Deposito + Emas/Perak + Aset Lancar Usaha) − Utang Jangka Pendek Jatuh Tempo**
        
Jika hasil perhitungan bersih ini ≥ Nilai Nisab Emas, maka zakat yang dikeluarkan adalah:
**Zakat Mal = 2,5% × Harta Kena Zakat**
        
Jika belum mencapai nisab atau belum 1 tahun, pengguna tidak diwajibkan zakat mal, namun dianjurkan mengeluarkan infaq/sedekah sukarela.`
      }
    ],
    glossary: [
      { term: "Nisab", desc: "Batas minimum nominal harta yang menyebabkan wajib zakat (setara 85 gr emas)." },
      { term: "Haul", desc: "Masa kepemilikan harta selama genap satu tahun perputaran." },
      { term: "Muzakki", desc: "Muslim yang telah memenuhi syarat kewajiban menunaikan zakat." },
      { term: "Mustahik", desc: "Golongan orang yang berhak menerima zakat (8 Asnaf)." }
    ],
    quiz: [
      {
        id: "q-04-1",
        question: "Berapakah acuan nisab emas murni untuk kewajiban Zakat Mal menurut regulasi BAZNAS dan fiqih muamalah?",
        options: [
          "50 gram emas",
          "85 gram emas",
          "150 gram emas",
          "500 gram emas"
        ],
        correctIndex: 1,
        explanation: "Standar hisab nisab Zakat Mal (emas, tabungan, dan aset perniagaan) adalah setara dengan 85 gram emas murni."
      },
      {
        id: "q-04-2",
        question: "Jika harga emas Rp 1.400.000 per gram (Nisab = Rp 119.000.000). Dani memiliki tabungan Rp 80.000.000 selama 1 tahun. Apakah Dani wajib membayar Zakat Mal?",
        options: [
          "Wajib membayar zakat 10%.",
          "Belum wajib zakat mal karena hartanya di bawah nisab, namun sangat dianjurkan berinfaq/sedekah.",
          "Wajib membayar zakat mal flat Rp 1.000.000.",
          "Dikenakan denda oleh amil zakat."
        ],
        correctIndex: 1,
        explanation: "Karena harta Dani (Rp 80 jt) masih berada di bawah nilai nisab (Rp 119 jt), Dani belum berstatus sebagai muzakki zakat mal, tetapi disunnahkan berinfaq."
      },
      {
        id: "q-04-3",
        question: "Komponen manakah yang diperbolehkan sebagai pengurang harta simpanan dalam menghitung zakat mal?",
        options: [
          "Pengeluaran hiburan bulan depan",
          "Utang jangka pendek yang telah jatuh tempo pada tahun berjalan",
          "Biaya liburan tahun depan",
          "Seluruh aset tetap seperti rumah tinggal dan mobil pribadi"
        ],
        correctIndex: 1,
        explanation: "Utang jangka pendek yang jatuh tempo pada tahun berjalan diperhitungkan sebagai pengurang likuiditas sebelum membandingkan harta bersih dengan nisab."
      }
    ]
  },
  {
    id: "mod-05",
    order: 5,
    title: "Risiko & Keamanan Keuangan Digital",
    subtitle: "Waspada Scam, Pinjol Ilegal Berkedok Syariah, & Verifikasi Legalitas OJK",
    category: "Literasi Digital & Keamanan",
    level: "Menengah (Intermediate)",
    readTime: "7 menit",
    icon: "ShieldAlert",
    xpReward: 170,
    sourceRefIds: ["DSN-117-2018", "POJK-16-2022"],
    objectives: [
      "Mengidentifikasi modus operandi pinjol ilegal dan investasi bodong yang mencatut istilah syariah.",
      "Memahami 2L (Legal & Logis) dalam memverifikasi tawaran keuangan online.",
      "Mengetahui peran Dewan Pengawas Syariah (DPS) dan izin OJK dalam fintech syariah resmi."
    ],
    lessons: [
      {
        id: "les-05-01",
        title: "1. Ciri-Ciri Investasi Bodong Berlabel 'Syariah'",
        content: `Maraknya penipuan digital yang menyalahgunakan terminologi agama (seperti 'arisan syariah', 'titip dana berkah', 'investasi bagi hasil tanpa risiko') perlu diwaspadai dengan prinsip **2L (Legal dan Logis)**:
        
1. **Tidak Logis:** Menjanjikan imbal hasil pasti sangat tinggi dalam waktu singkat tanpa risiko. Ingat kaidah syariah: tidak ada keuntungan tanpa kesiapan menanggung risiko usaha.
2. **Tidak Legal:** Tidak memiliki izin dari OJK (Otoritas Jasa Keuangan), tidak terdaftar di Bappebti, serta tidak memiliki rekomendasi Dewan Pengawas Syariah (DPS) dari DSN-MUI.
3. **Rekening Pribadi:** Meminta transfer ke rekening perseorangan, bukan rekening berbadan hukum (escrow/virtual account resmi).`,
        caseStudy: {
          persona: "Alya & Rafi",
          scenario: "Sebuah grup Telegram menawarkan program 'Titip Dana Syariah Amanah', modal Rp 1 juta kembali Rp 5 juta dalam 3 hari.",
          insight: "Ini 100% scam! Keuangan syariah tidak mengenal penambahan uang ajaib tanpa perputaran bisnis riil. Selalu cek legalitas platform di situs resmi ojk.go.id atau kontak 157."
        }
      },
      {
        id: "les-05-02",
        title: "2. Pintek P2P Syariah Legal: Fatwa DSN-MUI No. 117",
        content: `Fintech P2P Lending Syariah yang sah wajib:
        
- Mengantongi tanda berizin penuh dari OJK.
- Memiliki Dewan Pengawas Syariah (DPS) bersertifikasi DSN-MUI.
- Menggunakan akad-akad yang jelas (seperti Wakalah bil Ujrah untuk biaya jasa platform, dan Mudharabah/Murabahah untuk pembiayaan proyek UMKM).
- Menghindari pemaksaan penagihan tidak etis, ancaman data pribadi, atau bunga harian terselubung.`
      }
    ],
    glossary: [
      { term: "Dewan Pengawas Syariah (DPS)", desc: "Badan independen yang mengawasi kepatuhan operasional lembaga keuangan terhadap fatwa DSN-MUI." },
      { term: "Prinsip 2L", desc: "Pedoman OJK: Cek Legalitas izin badan usaha dan Logika kewajaran tingkat keuntungan." },
      { term: "Wakalah bil Ujrah", desc: "Akad pelimpahan kuasa untuk mengelola transaksi dengan imbalan upah/jasa (fee) yang disepakati." }
    ],
    quiz: [
      {
        id: "q-05-1",
        question: "Jika sebuah aplikasi pinjaman online mengklaim berlabel syariah tetapi mengenakan denda keterlambatan berbunga harian 2% dan mengakses kontak HP tanpa izin, kesimpulannya adalah...",
        options: [
          "Aplikasi tersebut sah sesuai fiqih muamalah kontemporer.",
          "Aplikasi tersebut adalah pinjol ilegal atau melanggar prinsip syariah dan aturan OJK.",
          "Aplikasi tersebut telah disetujui oleh BAZNAS.",
          "Aplikasi tersebut aman karena ada kata 'syariah' di namanya."
        ],
        correctIndex: 1,
        explanation: "Pinjol syariah resmi tidak mengenakan bunga denda harian yang berlipat ganda, tidak menyedot data kontak pribadi, dan wajib berizin OJK dengan pengawasan DPS."
      },
      {
        id: "q-05-2",
        question: "Pedoman dasar dari Otoritas Jasa Keuangan (OJK) untuk menguji keabsahan tawaran investasi finansial adalah '2L', yaitu...",
        options: [
          "Laba dan Lanjut",
          "Legal dan Logis",
          "Lunas dan Lancar",
          "Lokal dan Luar"
        ],
        correctIndex: 1,
        explanation: "'Legal dan Logis': Legal berarti memiliki izin resmi dari regulator berwenang (OJK/BI/Bappebti), dan Logis berarti rasio imbal hasil masuk akal dengan risiko bisnis riil."
      },
      {
        id: "q-05-3",
        question: "Siapakah yang bertugas mengawasi operasional fintech pendanaan syariah agar senantiasa sesuai dengan fatwa dan syariat Islam?",
        options: [
          "Kementerian Keuangan",
          "Dewan Pengawas Syariah (DPS)",
          "Pengadilan Negeri",
          "Lembaga Penjamin Simpanan (LPS)"
        ],
        correctIndex: 1,
        explanation: "Dewan Pengawas Syariah (DPS) ditempatkan pada setiap institusi keuangan syariah untuk memastikan setiap produk dan akad sesuai fatwa DSN-MUI."
      }
    ]
  }
];
