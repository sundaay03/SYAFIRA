// Syariah Product Explorer Catalog (PRD FR-08)
// Katalog Edukatif Konsep Produk Keuangan Syariah di Indonesia

export const ISLAMIC_PRODUCTS = [
  {
    id: "prod-tabungan-wadiah",
    name: "Tabungan Transaksional Syariah",
    category: "Perbankan",
    akad: "Wadiah Yad Dhamanah (Titipan Bergaransi)",
    riskLevel: "Sangat Rendah",
    riskBadgeColor: "emerald",
    targetUser: "Mahasiswa, pelajar, atau pekerja pemula untuk kebutuhan transaksi sehari-hari.",
    lastReviewed: "2026-10-15",
    regulator: "OJK (Berizin) & Dijamin LPS",
    summary: "Simpanan harian yang aman tanpa bunga, bebas riba, dan bebas potongan biaya administrasi bulanan di beberapa bank syariah.",
    mechanism: "Uang dititipkan ke bank syariah. Bank berwenang mengelola dana dengan jaminan pengembalian 100% saat ditarik. Bank dapat memberikan bonus (athaya) sukarela tanpa janji di muka.",
    pros: [
      "Likuiditas tinggi: bebas setor dan tarik kapan saja via ATM/Mobile Banking.",
      "Dijamin LPS hingga Rp 2 Miliar per nasabah.",
      "Tersedia opsi tanpa biaya admin kartu/bulanan."
    ],
    risks: [
      "Tidak ada bagi hasil tetap bulanan.",
      "Bonus sukarela (jika ada) nominalnya relatif kecil dibanding inflasi."
    ],
    checklist: [
      "Pastikan bank syariah terdaftar di OJK dan merupakan peserta penjaminan LPS.",
      "Pahami apakah ada biaya transfer antar bank atau biaya buku tabungan.",
      "Periksa limit transaksi kartu debit dan mobile banking."
    ]
  },
  {
    id: "prod-deposito-mudharabah",
    name: "Deposito Investasi Syariah",
    category: "Perbankan & Investasi",
    akad: "Mudharabah Muthlaqah (Investasi Kemitraan)",
    riskLevel: "Rendah - Terukur",
    riskBadgeColor: "emerald",
    targetUser: "Individu yang memiliki dana mengendap dan ingin mendapatkan bagi hasil bulanan.",
    lastReviewed: "2026-10-10",
    regulator: "OJK & Dijamin LPS (sesuai tingkat bunga/nisbah penjaminan LPS)",
    summary: "Simpanan berjangka (1, 3, 6, 12 bulan) dengan nisbah bagi hasil kompetitif yang bersumber dari pembiayaan sektor riil.",
    mechanism: "Nasabah bertindak sebagai penyedia dana (Shahibul Mal) dan bank sebagai pengelola (Mudharib). Keuntungan bisnis pembiayaan bank dibagi berdasarkan nisbah (misal 45% nasabah : 55% bank).",
    pros: [
      "Imbal hasil riil yang halal dan adil mengikuti kinerja bank.",
      "Tersedia fasilitas ARO (Automatic Roll Over).",
      "Dapat dijadikan agunan pembiayaan syariah jika mendesak."
    ],
    risks: [
      "Imbal hasil bulanan berfluktuasi mengikuti pendapatan bank (bukan bunga tetap).",
      "Pencairan sebelum jatuh tempo umumnya dikenakan pembatalan bagi hasil berjalan."
    ],
    checklist: [
      "Tanyakan estimasi equivalent rate historis bagi hasil 3 bulan terakhir.",
      "Perhatikan syarat jatuh tempo penarikan dana.",
      "Pastikan nisbah disepakati di lembar akad."
    ]
  },
  {
    id: "prod-kpr-murabahah",
    name: "Pembiayaan Rumah Syariah (KPR Murabahah)",
    category: "Pembiayaan Properti",
    akad: "Murabahah (Jual Beli Angsuran)",
    riskLevel: "Terukur",
    riskBadgeColor: "gold",
    targetUser: "Keluarga muda atau profesional yang ingin memiliki rumah tanpa risiko suku bunga floating.",
    lastReviewed: "2026-09-28",
    regulator: "OJK & DPS DSN-MUI",
    summary: "Pembiayaan pembelian hunian dengan kepastian total harga jual dan cicilan tetap flat sejak akad sampai lunas.",
    mechanism: "Bank syariah membeli rumah yang diinginkan nasabah dari developer/penjual, kemudian menjualnya kembali kepada nasabah dengan tambahan margin laba yang disepakati. Nasabah membayar dengan cicilan tetap setiap bulan.",
    pros: [
      "Cicilan pasti dan tetap (fixed) tidak terpengaruh kenaikan suku bunga Bank Sentral.",
      "Transparan: nasabah mengetahui harga beli asli bank dan margin keuntungan bank.",
      "Bebas dari riba pinjaman bunga majemuk."
    ],
    risks: [
      "Jika suku bunga pasar sedang turun drastis, angsuran murabahah tetap stabil tidak ikut turun.",
      "Pelunasan dipercepat memiliki mekanisme tersendiri sesuai kebijakan diskon/potongan sukarela bank."
    ],
    checklist: [
      "Cek legalitas sertifikat (SHM/HGB) dan IMB/PBG pengembang perumahan.",
      "Bandingkan margin efektif tahunan antar bank syariah.",
      "Tanyakan apakah ada denda ta'zir (denda keterlambatan yang disalurkan sebagai dana kebajikan sosial, bukan laba bank)."
    ]
  },
  {
    id: "prod-sukuk-sbsn",
    name: "Sukuk Ritel / SBSN (Surat Berharga Syariah Negara)",
    category: "Investasi Surat Berharga",
    akad: "Ijarah Asset to be Leased (Sewa Aset Proyek Negara)",
    riskLevel: "Sangat Rendah (Bebas Risiko Gagal Bayar)",
    riskBadgeColor: "emerald",
    targetUser: "Masyarakat umum yang ingin investasi aman 100% dijamin undang-undang negara sekaligus membiayai pembangunan fasilitas publik.",
    lastReviewed: "2026-10-01",
    regulator: "Kementerian Keuangan RI, Bank Indonesia, & DSN-MUI",
    summary: "Investasi syariah ritel yang diterbitkan Pemerintah RI (seperti seri SR atau Sukuk Tabungan ST) dengan kupon imbal hasil bulanan tetap.",
    mechanism: "Pemerintah menerbitkan sukuk dengan underlying aset berupa proyek infrastruktur negara (gedung, jalan, jembatan). Dana investor digunakan untuk pembangunan, dan investor menerima imbalan sewa (ujrah) bulanan secara tepat waktu.",
    pros: [
      "Kupon imbal hasil dan pokok 100% dijamin oleh UU APBN Negara Republik Indonesia.",
      "Pajak imbal hasil sukuk (10%) lebih rendah dibanding pajak bunga deposito (20%).",
      "Dapat dibeli mulai dari Rp 1.000.000 melalui mitra distribusi resmi."
    ],
    risks: [
      "Terdapat masa minimum holding period sebelum bisa diperjualbelikan di pasar sekunder (untuk seri SR) atau fasilitas early redemption (untuk ST)."
    ],
    checklist: [
      "Beli hanya melalui Mitra Distribusi resmi yang ditunjuk Kemenkeu (Bank Syariah, Sekuritas, FinTech berizin).",
      "Pahami tipe sukuk: tradable (bisa dijual kembali) vs non-tradable."
    ]
  },
  {
    id: "prod-reksadana-syariah",
    name: "Reksadana Syariah",
    category: "Pasar Modal",
    akad: "Wakalah bil Ujrah & Mudharabah",
    riskLevel: "Sedang - Tinggi (Sesuai Tipe Portofolio)",
    riskBadgeColor: "cyan",
    targetUser: "Investor muda yang ingin mendiversifikasi dana ke saham halal dan sukuk secara profesional.",
    lastReviewed: "2026-09-15",
    regulator: "OJK Pasar Modal & DSN-MUI (Daftar Efek Syariah / DES)",
    summary: "Wadah investasi kolektif yang dikelola Manajer Investasi ke dalam portofolio efek syariah (saham syariah DES dan sukuk) dengan mekanisme *cleansing*.",
    mechanism: "Investor mempercayakan dananya kepada Manajer Investasi (MI) dengan akad Wakalah. MI hanya boleh berinvestasi pada saham yang masuk Daftar Efek Syariah (DES OJK) dan memiliki proses pembersihan pendapatan non-halal (cleansing) untuk dana sosial.",
    pros: [
      "Diversifikasi otomatis dengan modal mulai Rp 10.000,-.",
      "Dikelola tim profesional bersertifikasi WMI.",
      "Diawasi oleh Dewan Pengawas Syariah (DPS)."
    ],
    risks: [
      "Nilai Aktiva Bersih (NAB) berfluktuasi mengikuti pergerakan pasar bursa.",
      "Tidak ada jaminan imbal hasil pasti."
    ],
    checklist: [
      "Baca Prospektus dan Ringkasan Informasi Produk (Fund Fact Sheet) bulanan.",
      "Sesuaikan dengan profil risiko: Pasar Uang Syariah (rendah), Pendapatan Tetap Syariah (sedang), atau Saham Syariah (tinggi)."
    ]
  },
  {
    id: "prod-p2p-syariah",
    name: "Fintech Pendanaan P2P Syariah",
    category: "Fintech Pendanaan",
    akad: "Wakalah bil Ujrah & Mudharabah / Musyarakah",
    riskLevel: "Tinggi - Terukur",
    riskBadgeColor: "rose",
    targetUser: "Pemberi dana (lender) yang ingin membiayai langsung proyek riil UMKM dengan imbal hasil menarik.",
    lastReviewed: "2026-10-20",
    regulator: "OJK & DSN-MUI (Fatwa No. 117)",
    summary: "Platform digital yang mempertemukan pemberi dana dengan pelaku UMKM syariah yang membutuhkan modal kerja atau invoice financing.",
    mechanism: "Lender memberikan kuasa (Wakalah) kepada platform untuk menyalurkan dana ke proyek UMKM tervalidasi. Keuntungan proyek dibagi antara lender dan peminjam UMKM sesuai nisbah, sementara platform memungut biaya jasa (ujrah).",
    pros: [
      "Mendukung inklusi finansial langsung bagi pelaku UMKM di pelosok negeri.",
      "Potensi imbal hasil bagi hasil yang kompetitif.",
      "Durasi pendanaan relatif fleksibel (1 hingga 6 bulan)."
    ],
    risks: [
      "Risiko gagal bayar atau keterlambatan pembayaran proyek oleh debitur.",
      "Tidak dijamin oleh LPS (namun beberapa platform menyediakan proteksi asuransi pembiayaan)."
    ],
    checklist: [
      "Wajib cek apakah platform tercantum di daftar penyelenggara berizin di situs resmi ojk.go.id.",
      "Pastikan platform memiliki nama anggota DPS DSN-MUI resmi.",
      "Jangan pernah menyetorkan seluruh modal ke satu proyek saja (terapkan diversifikasi)."
    ]
  }
];
