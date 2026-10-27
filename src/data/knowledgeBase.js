// Basis Pengetahuan Terkurasi SYARIAH-AI (PRD FR-02 & FR-11)
// Dokumen rujukan resmi dari DSN-MUI, OJK, Bank Indonesia, BAZNAS, dan KHES Mahkamah Agung

export const KNOWLEDGE_BASE_DOCS = [
  {
    id: "DSN-115-2017",
    publisher: "Dewan Syariah Nasional - MUI (DSN-MUI)",
    title: "Fatwa DSN-MUI No. 115/DSN-MUI/IX/2017 tentang Akad Mudharabah",
    category: "Akad & Pembiayaan",
    version: "1.0-Resmi",
    reviewedAt: "2026-08-15",
    reviewer: "Dr. K.H. Hasanuddin, M.Ag (Reviewer Syariah)",
    status: "Terbit",
    url: "https://dsnmui.or.id/fatwa/akad-mudharabah-115",
    tags: ["mudharabah", "bagi hasil", "nisbah", "shahibul mal", "mudharib", "kerugian", "tafrith", "laba"],
    summary: "Mengatur ketentuan umum, rukun, syarat, pembagian keuntungan berdasar nisbah yang disepakati, dan ketentuan penanggungan kerugian finansial yang murni ditanggung pemilik modal kecuali akibat kelalaian (ta'addi) pengelola.",
    contentExcerpt: `1. Mudharabah adalah akad kerja sama suatu usaha antara dua pihak di mana pihak pertama (Malik/Shahibul Mal) menyediakan seluruh modal (100%), sedangkan pihak kedua (Amil/Mudharib) bertindak selaku pengelola usaha.
2. Keuntungan usaha dibagi di antara mereka berdasarkan nisbah rasio persentase yang disepakati bersama dalam akad sejak awal (bukan nominal rupiah tetap atau bunga flat atas modal).
3. Kerugian finansial murni bisnis ditanggung sepenuhnya oleh pemilik modal (Shahibul Mal) hingga batas modal yang disetor. Mudharib menanggung kerugian waktu, keahlian, dan tenaga tanpa mendapat bagi hasil.
4. Jika terjadi kerugian akibat kelalaian (tafrith), kecerobohan, penyelewengan, atau pelanggaran ketentuan akad (ta'addi) oleh Mudharib, maka Mudharib wajib bertanggung jawab penuh mengganti kerugian modal tersebut.`
  },
  {
    id: "DSN-04-2000",
    publisher: "Dewan Syariah Nasional - MUI (DSN-MUI)",
    title: "Fatwa DSN-MUI No. 04/DSN-MUI/IV/2000 tentang Akad Murabahah",
    category: "Jual Beli & Pembiayaan",
    version: "1.2-Resmi",
    reviewedAt: "2026-07-20",
    reviewer: "Komite Ahli Edukasi Syariah",
    status: "Terbit",
    url: "https://dsnmui.or.id/fatwa/murabahah-04",
    tags: ["murabahah", "jual beli", "margin", "kpr syariah", "harga pokok", "transparansi", "angsuran", "cicilan tetap"],
    summary: "Akad jual beli barang dengan menegaskan harga perolehan (modal beli) kepada pembeli dan pembeli membayarnya dengan harga lebih sebagai laba/margin yang disepakati bersama.",
    contentExcerpt: `1. Murabahah adalah menjual suatu barang dengan menegaskan harga perolehannya (modal beli) secara jujur kepada pembeli dan pembeli membayarnya dengan harga yang lebih sebagai keuntungan/margin bagi penjual.
2. Penjual harus memberitahukan secara transparan biaya modal yang dikeluarkan serta keuntungan yang dikehendaki.
3. Pembayaran dapat dilakukan secara tunai maupun angsuran/tangguh (bi tsaman ajil) dalam jangka waktu tenor tertentu.
4. Total harga jual dan cicilan per bulan bersifat tetap (fixed) dari awal akad hingga akhir jatuh tempo, tidak boleh dinaikkan secara sepihak mengikuti fluktuasi suku bunga pasar (floating rate).`
  },
  {
    id: "DSN-08-2000",
    publisher: "Dewan Syariah Nasional - MUI (DSN-MUI)",
    title: "Fatwa DSN-MUI No. 08/DSN-MUI/IV/2000 tentang Pembiayaan Musyarakah",
    category: "Akad & Pembiayaan",
    version: "1.0-Resmi",
    reviewedAt: "2026-08-10",
    reviewer: "Komisi Fatwa Perbankan Syariah",
    status: "Terbit",
    url: "https://dsnmui.or.id/fatwa/pembiayaan-musyarakah-08",
    tags: ["musyarakah", "syirkah", "kemitraan", "kongsi", "bagi hasil", "modal bersama", "kpr musyarakah mutanaqisah", "mmp"],
    summary: "Akad kerja sama antara dua pihak atau lebih untuk suatu usaha tertentu, di mana masing-masing pihak memberikan porsi kontribusi dana/modal dengan ketentuan keuntungan dibagi sesuai kesepakatan, sedangkan kerugian dibagi proporsional porsi modal.",
    contentExcerpt: `1. Musyarakah adalah pembiayaan berdasarkan akad kerja sama antara dua pihak atau lebih untuk suatu usaha tertentu di mana masing-masing pihak menyertakan porsi modal.
2. Keuntungan dibagi antara para mitra berdasarkan nisbah yang disepakati bersama dalam akad (bukan bunga modal).
3. Kerugian dibagi secara proporsional sesuai porsi penyertaan modal masing-masing mitra (kaidah: Al-Ghurmu bil Ghunmi).
4. Varian Musyarakah Mutanaqisah (MMQ) sering dipakai pada KPR Syariah modern di mana kepemilikan aset bank berkurang secara bertahap seiring angsuran nasabah hingga aset beralih penuh ke nasabah.`
  },
  {
    id: "DSN-02-2000",
    publisher: "Dewan Syariah Nasional - MUI (DSN-MUI)",
    title: "Fatwa DSN-MUI No. 02/DSN-MUI/IV/2000 tentang Tabungan",
    category: "Perbankan",
    version: "1.0-Resmi",
    reviewedAt: "2026-05-12",
    reviewer: "Komite Ahli Muamalah",
    status: "Terbit",
    url: "https://dsnmui.or.id/fatwa/tabungan-02",
    tags: ["tabungan", "wadiah", "wadiah yad dhamanah", "mudharabah muthlaqah", "bonus", "athaya", "bebas bunga"],
    summary: "Mengatur ketentuan simpanan tabungan bank syariah dengan akad Wadiah (titipan murni dengan jaminan keamanan) dan Mudharabah (investasi penyertaan dana dengan bagi hasil).",
    contentExcerpt: `1. Tabungan yang dibenarkan secara syariah ada dua jenis: Tabungan Wadiah dan Tabungan Mudharabah.
2. Tabungan Wadiah bersifat titipan berjamin (Yad Dhamanah). Uang titipan dapat dimanfaatkan bank, nasabah berhak menarik sewaktu-waktu, dan bank boleh memberikan bonus (athaya) sukarela tanpa dipersyaratkan di awal akad.
3. Tabungan Mudharabah: Nasabah sebagai Shahibul Mal, bank sebagai Mudharib. Modal tidak dijamin untung pasti, nasabah memperoleh porsi bagi hasil bulanan sesuai nisbah kesepakatan.`
  },
  {
    id: "DSN-09-2000",
    publisher: "Dewan Syariah Nasional - MUI (DSN-MUI)",
    title: "Fatwa DSN-MUI No. 09/DSN-MUI/IV/2000 tentang Pembiayaan Ijarah (Sewa)",
    category: "Akad & Pembiayaan",
    version: "1.0-Resmi",
    reviewedAt: "2026-06-25",
    reviewer: "Divisi Standar Akad DSN-MUI",
    status: "Terbit",
    url: "https://dsnmui.or.id/fatwa/ijarah-09",
    tags: ["ijarah", "sewa", "manfaat", "imbt", "sewa beli", "ujrah", "upah"],
    summary: "Akad pemindahan hak guna (manfaat) atas suatu barang atau jasa dalam waktu tertentu melalui pembayaran sewa (ujrah), tanpa diikuti pemindahan kepemilikan barang itu sendiri kecuali dalam IMBT.",
    contentExcerpt: `1. Ijarah adalah akad pemindahan hak guna (manfaat) atas suatu barang atau jasa dalam waktu tertentu melalui pembayaran sewa (ujrah), tanpa diikuti dengan pemindahan kepemilikan barang itu sendiri.
2. Ijarah Muntahiyah Bittamlik (IMBT) adalah perjanjian sewa-menyewa yang disertai janji (wa'ad) pemindahan kepemilikan barang sewa kepada penyewa setelah selesainya masa sewa (lewat hibah atau jual-beli simbolis).`
  },
  {
    id: "DSN-21-2001",
    publisher: "Dewan Syariah Nasional - MUI (DSN-MUI)",
    title: "Fatwa DSN-MUI No. 21/DSN-MUI/X/2001 tentang Pedoman Umum Asuransi Syariah (Takaful)",
    category: "Asuransi Syariah",
    version: "1.1-Resmi",
    reviewedAt: "2026-07-15",
    reviewer: "Komisi Asuransi & Proteksi Syariah",
    status: "Terbit",
    url: "https://dsnmui.or.id/fatwa/asuransi-syariah-21",
    tags: ["asuransi syariah", "takaful", "tabarru", "taawun", "tolong menolong", "wakalah bil ujrah", "bukan judi"],
    summary: "Menetapkan prinsip saling tolong-menolong (ta'awun) dan saling menanggung (takaful) melalui hibah kebajikan (dana tabarru') yang terbebas dari gharar, maysir, dan riba.",
    contentExcerpt: `1. Asuransi Syariah (Ta'min/Takaful/Tadhamun) adalah usaha saling melindungi dan tolong-menolong di antara sejumlah orang melalui investasi dalam bentuk aset dan/atau tabarru' yang memberikan pola pengembalian untuk menghadapi risiko tertentu melalui akad yang sesuai dengan syariah.
2. Akad yang digunakan adalah Akad Tabarru' (hibah kebajikan dana tolong menolong) dan Akad Tijarah (Wakalah bil Ujrah atau Mudharabah untuk pengelolaan investasi).
3. Tidak mengandung gharar (ketidakjelasan pertukaran klaim), maysir (judi untung-untungan), atau riba (bunga klaim pinjaman). Perusahaan asuransi bertindak sebagai pengelola amanah (operator), bukan pemilik dana risiko.`
  },
  {
    id: "DSN-54-2006",
    publisher: "Dewan Syariah Nasional - MUI (DSN-MUI)",
    title: "Fatwa DSN-MUI No. 54/DSN-MUI/X/2006 tentang Syariah Card (Kartu Pembiayaan & Paylater)",
    category: "Pembiayaan Konsumen",
    version: "1.0-Resmi",
    reviewedAt: "2026-08-01",
    reviewer: "Komite Instrumen Pembayaran Syariah",
    status: "Terbit",
    url: "https://dsnmui.or.id/fatwa/syariah-card-54",
    tags: ["kartu kredit syariah", "syariah card", "paylater syariah", "kafalah", "qardh", "ijarah", "tanpa bunga bunga berbunga"],
    summary: "Ketentuan kartu kredit/pembiayaan digital syariah yang menggunakan kombinasi akad Kafalah (penjaminan), Qardh (talangan dana tanpa bunga), dan Ijarah (biaya administrasi jasa keanggotaan tetap).",
    contentExcerpt: `1. Syariah Card adalah kartu yang berfungsi seperti kartu kredit namun berbasis prinsip syariah dengan memadukan tiga akad: Kafalah (penjamin bagi merchant), Qardh (pemberian talangan dana), dan Ijarah (upah pengelolaan sistem dan keanggotaan).
2. Tidak boleh menerapkan bunga pinjaman (interest rate) atau bunga berbunga.
3. Biaya ijarah/annual fee harus berupa nominal tetap (fixed fee), bukan persentase floating dari sisa utang.
4. Denda keterlambatan (late charge) hanya boleh dipungut sebagai ta'zir (sanksi edukatif) yang seluruhnya disalurkan sebagai dana kebajikan sosial (infaq), bukan menjadi pendapatan penerbit kartu.`
  },
  {
    id: "DSN-80-2011",
    publisher: "Dewan Syariah Nasional - MUI (DSN-MUI)",
    title: "Fatwa DSN-MUI No. 80/DSN-MUI/III/2011 tentang Pasar Modal & Saham Syariah",
    category: "Pasar Modal & Investasi",
    version: "1.0-Resmi",
    reviewedAt: "2026-09-10",
    reviewer: "Komite Pasar Modal Syariah OJK & DSN-MUI",
    status: "Terbit",
    url: "https://dsnmui.or.id/fatwa/pasar-modal-saham-80",
    tags: ["saham syariah", "pasar modal", "des", "daftar efek syariah", "screening saham", "bursa efek indonesia", "idx sharia", "cleansing"],
    summary: "Menetapkan keabsahan investasi saham syariah di bursa efek, kriteria penapisan (screening) rasio utang dan pendapatan non-halal, serta larangan transaksi manipulasi (short selling, cornering, insider trading).",
    contentExcerpt: `1. Saham pada prinsipnya adalah bukti kepemilikan modal atas suatu perseroan berbadan hukum (musyarakah/syirkah sahamiyah) yang hukum asalnya adalah mubah (boleh).
2. Kriteria Saham Syariah (Screening OJK & DSN):
   - Kegiatan usaha halal: Tidak memproduksi miras, rokok, daging haram, perjudian, atau jasa keuangan ribawi.
   - Financial ratio: Total utang berbasis bunga dibandingkan total aset tidak lebih dari 45%.
   - Pendapatan non-halal dibandingkan total pendapatan usaha tidak lebih dari 10%.
3. Transaksi yang dilarang: Short selling (jual kosong tanpa memiliki saham), transaksi marjin berbunga, manipulasi pasar (najsy), dan insider trading.`
  },
  {
    id: "DSN-137-2020",
    publisher: "Dewan Syariah Nasional - MUI (DSN-MUI)",
    title: "Fatwa DSN-MUI No. 137/DSN-MUI/IX/2020 tentang Sukuk (Surat Berharga Syariah)",
    category: "Pasar Modal & Investasi",
    version: "1.0-Resmi",
    reviewedAt: "2026-09-12",
    reviewer: "Komite Sukuk Negara & Korporasi",
    status: "Terbit",
    url: "https://dsnmui.or.id/fatwa/sukuk-137",
    tags: ["sukuk", "sbsn", "obligasi syariah", "underlying asset", "kupon sewa", "ijarah", "investasi halal"],
    summary: "Efek syariah berupa sertifikat atau bukti kepemilikan bernilai sama atas aset berwujud riil (underlying asset), hak manfaat, atau jasa proyek tertentu, bukan sekadar surat utang berbunga.",
    contentExcerpt: `1. Sukuk adalah efek syariah berupa sertifikat atau bukti kepemilikan yang bernilai sama dan mewakili bagian yang tidak terpisahkan (syuyu') atas kepemilikan aset berwujud, nilai manfaat jasa, atau proyek investasi riil.
2. Sukuk BUKAN surat pengakuan utang berbunga seperti obligasi konvensional.
3. Imbal hasil sukuk berasal dari sewa aset (Sukuk Ijarah) atau bagi hasil proyek riil (Sukuk Mudharabah/Musyarakah).`
  },
  {
    id: "MUI-IJTIMA-2021",
    publisher: "Komisi Fatwa Majelis Ulama Indonesia (MUI)",
    title: "Keputusan Ijtima Ulama Komisi Fatwa se-Indonesia VII tentang Hukum Uang Kripto (Cryptocurrency)",
    category: "Fintech & Digital",
    version: "1.0-Resmi",
    reviewedAt: "2026-08-20",
    reviewer: "Komisi Fatwa MUI Pusat",
    status: "Terbit",
    url: "https://mui.or.id/fatwa/ijtima-ulama-kripto-2021",
    tags: ["kripto", "cryptocurrency", "bitcoin", "aset kripto", "sil'ah", "gharar", "spekulasi", "qimar", "underlying"],
    summary: "Menetapkan penggunaan cryptocurrency sebagai mata uang hukumnya haram di Indonesia karena tidak memiliki underlying aset dan bertentangan dengan UU Mata Uang. Sebagai komoditas/aset digital, kripto yang tidak memiliki underlying fisik dan mengandung spekulasi tinggi adalah tidak sah.",
    contentExcerpt: `1. Penggunaan cryptocurrency sebagai mata uang hukumnya haram, karena mengandung gharar, dharar, dan bertentangan dengan Undang-Undang No. 7 Tahun 2011 tentang Mata Uang (Rupiah adalah satu-satunya alat pembayaran sah di NKRI).
2. Cryptocurrency sebagai komoditi/aset digital hukumnya tidak sah diperjualbelikan apabila mengandung gharar, dharar, qimar (spekulasi judi), serta tidak memenuhi syarat sil'ah (memiliki wujud fisik atau nilai underlying aset riil, manfaat jelas, dan dapat diserahterimakan).
3. Aset kripto yang memenuhi syarat sebagai sil'ah, memiliki underlying asset riil yang jelas, serta memiliki manfaat yang legal menurut syariat, barulah sah untuk diperjualbelikan sebagai aset digital.`
  },
  {
    id: "DSN-117-2018",
    publisher: "Dewan Syariah Nasional - MUI (DSN-MUI)",
    title: "Fatwa DSN-MUI No. 117/DSN-MUI/II/2018 tentang Layanan Pembiayaan Berbasis Teknologi Informasi Syariah (Fintech P2P)",
    category: "Fintech & Digital",
    version: "1.1-Resmi",
    reviewedAt: "2026-09-02",
    reviewer: "Tim Regulasi Digital Syariah",
    status: "Terbit",
    url: "https://dsnmui.or.id/fatwa/fintech-p2p-117",
    tags: ["fintech", "p2p lending", "digital", "wakalah bil ujrah", "ojk", "pinjol syariah", "riba", "dps"],
    summary: "Mengatur layanan pendanaan bersama berbasis teknologi informasi yang wajib terbebas dari riba, gharar, maysir, tadlis, dharar, dan zhulm, menggunakan akad yang sah (seperti Wakalah bil Ujrah, Mudharabah, atau Murabahah).",
    contentExcerpt: `1. Layanan Pembiayaan Berbasis Teknologi Informasi berbasis Syariah tidak boleh bertentangan dengan prinsip syariah, yaitu terbebas dari riba (bunga), gharar (ketidakjelasan objek/ketentuan), maysir (judi/spekulasi), tadlis (penipuan), dharar (bahaya), dan zhulm (kezaliman).
2. Akad yang dapat digunakan antara lain: Akad Wakalah bil Ujrah antara Pemberi Dana dan Penyelenggara Platform; Akad Mudharabah/Musyarakah/Murabahah antara Pemberi Pembiayaan dan Penerima Pembiayaan.
3. Penyelenggara wajib berizin OJK dan memiliki Dewan Pengawas Syariah (DPS).`
  },
  {
    id: "UU-23-2011",
    publisher: "Pemerintah RI / DPR",
    title: "Undang-Undang Republik Indonesia No. 23 Tahun 2011 tentang Pengelolaan Zakat",
    category: "Zakat & Filantropi",
    version: "1.0-UndangUndang",
    reviewedAt: "2026-06-10",
    reviewer: "Divisi Hukum Filantropi Islam",
    status: "Terbit",
    url: "https://peraturan.go.id/id/uu-no-23-tahun-2011",
    tags: ["zakat", "baznas", "mustahik", "muzakki", "pengelolaan", "laz", "pengurang pajak"],
    summary: "Dasar hukum tata kelola zakat, infak, dan sedekah di Indonesia yang berasaskan syariat Islam, amanah, kemanfaatan, keadilan, kepastian hukum, terintegrasi, dan akuntabilitas.",
    contentExcerpt: `1. Zakat adalah harta yang wajib dikeluarkan oleh seorang muslim atau badan usaha untuk diberikan kepada yang berhak menerimanya sesuai dengan syariat Islam.
2. Pengelolaan zakat berasaskan syariat Islam, amanah, kemanfaatan, keadilan, kepastian hukum, terintegrasi, dan akuntabilitas.
3. Lembaga resmi pengelola zakat meliputi Badan Amil Zakat Nasional (BAZNAS) dan Lembaga Amil Zakat (LAZ) yang memiliki izin operasional resmi dari Kementerian Agama.
4. Zakat yang dibayarkan melalui BAZNAS atau LAZ resmi diakui sebagai pengurang penghasilan bruto kena pajak (tax deduction).`
  },
  {
    id: "BAZNAS-01-2024",
    publisher: "Badan Amil Zakat Nasional (BAZNAS RI)",
    title: "Peraturan BAZNAS No. 1 Tahun 2024 tentang Nilai Nisab Zakat Pendapatan & Emas",
    category: "Zakat & Filantropi",
    version: "2024-Terbaru (Acuan 2026)",
    reviewedAt: "2026-09-20",
    reviewer: "Komisi Fatwa & Hisab Zakat BAZNAS",
    status: "Terbit",
    url: "https://baznas.go.id/panduan-zakat",
    tags: ["nisab", "zakat mal", "emas", "85 gram", "haul", "kadar 2.5%", "zakat profesi", "gaji bulanan"],
    summary: "Ketentuan operasional hisab nisab zakat mal setara 85 gram emas murni dan zakat profesi/penghasilan bulanan. Bila total harta bersih telah mencapai nisab, kadar kewajiban zakat adalah deterministik 2,5%.",
    contentExcerpt: `1. Nisab Zakat Mal (tabungan, deposito, emas, dan aset perdagangan lancar) adalah setara dengan 85 (delapan puluh lima) gram emas murni dengan syarat kepemilikan 1 tahun (haul).
2. Nisab Zakat Penghasilan/Profesi: Setara nilai 85 gram emas per tahun (atau setara ~Rp 6,8 juta – Rp 8,5 juta per bulan tergantung harga pasar emas). Dikeluarkan langsung 2,5% pada saat menerima penghasilan.
3. Besaran zakat yang dikeluarkan adalah deterministik sebesar 2,5% dari total harta kena zakat.`
  },
  {
    id: "POJK-16-2022",
    publisher: "Otoritas Jasa Keuangan (OJK)",
    title: "Peraturan Otoritas Jasa Keuangan POJK No. 16/POJK.03/2022 tentang Bank Umum Syariah dan Unit Usaha Syariah",
    category: "Regulasi Perbankan",
    version: "2.0-OJK",
    reviewedAt: "2026-05-18",
    reviewer: "Regulator Edukasi Keuangan OJK",
    status: "Terbit",
    url: "https://ojk.go.id/id/regulasi/pojk-bank-syariah",
    tags: ["ojk", "bank syariah", "wadiah", "lps", "dps", "pembiayaan", "shariah compliance", "tata kelola"],
    summary: "Mengatur tata kelola, kelembagaan Dewan Pengawas Syariah (DPS), kepatuhan syariah (shariah compliance), serta perlindungan konsumen pada perbankan syariah.",
    contentExcerpt: `1. Bank Umum Syariah (BUS) dan Unit Usaha Syariah (UUS) beroperasi berdasarkan prinsip syariah yang tidak mengandung unsur riba, maisir, gharar, haram, dan zalim.
2. Setiap lembaga perbankan syariah wajib memiliki Dewan Pengawas Syariah (DPS) yang direkomendasikan DSN-MUI untuk mengawasi kepatuhan produk dan operasional.
3. Simpanan nasabah di bank syariah dijamin oleh Lembaga Penjamin Simpanan (LPS) sesuai ketentuan nominal dan tingkat penjaminan yang berlaku.`
  },
  {
    id: "KHES-MA-2008",
    publisher: "Mahkamah Agung RI (Perma No. 2 Tahun 2008)",
    title: "Kompilasi Hukum Ekonomi Syariah (KHES) - Buku II tentang Akad",
    category: "Hukum & Fiqih Muamalah",
    version: "1.0-MA",
    reviewedAt: "2026-03-01",
    reviewer: "Pakar Hukum Ekonomi Syariah Mahkamah Agung",
    status: "Terbit",
    url: "https://mahkamahagung.go.id/khes",
    tags: ["khes", "hukum muamalah", "rukun syarat", "fasakh", "keadilan", "asas perjanjian"],
    summary: "Rujukan yuridis formil bagi peradilan agama dan praktisi hukum muamalah di Indonesia mengenai rukun, keabsahan akad, serta penyelesaian sengketa perdata ekonomi syariah.",
    contentExcerpt: `1. Setiap akad muamalah wajib memenuhi rukun: pihak yang berakad (aqidain), objek akad (ma'qud 'alaih), dan pernyataan kehendak ijab-kabul (shighat).
2. Akad tidak sah jika terdapat paksaan (ikrah), kekeliruan mendasar (ghalath), penipuan (tadlis), ketidakpastian spekulatif (gharar), atau bunga tambahan pinjaman (riba).
3. Asas-asas akad muamalah meliputi: asas kebebasan berkontrak yang halal, asas konsensualisme, asas kepastian hukum, dan asas keadilan seimbang.`
  }
];

// Helper to search documents
export function searchKnowledgeBase(query) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(t => t.length > 2);

  // Score documents based on title, summary, contentExcerpt, tags
  const scored = KNOWLEDGE_BASE_DOCS.map(doc => {
    let score = 0;
    const text = (doc.title + " " + doc.summary + " " + doc.contentExcerpt).toLowerCase();
    
    // Tag matching (high weight)
    doc.tags.forEach(tag => {
      if (q.includes(tag.toLowerCase())) score += 10;
      if (tag.toLowerCase().includes(q)) score += 5;
    });

    // Token matching
    tokens.forEach(tok => {
      if (text.includes(tok)) score += 2;
      if (doc.title.toLowerCase().includes(tok)) score += 4;
    });

    return { doc, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.doc);
}
