// Butir Soal Pengukuran Literasi Keuangan Syariah (PRD FR-05 & FR-10)
// Menguji 5 Domain Kompetensi:
// 1. Prinsip Dasar & Maqashid
// 2. Fiqih Akad & Kemitraan
// 3. Tabungan & Pembiayaan
// 4. Hisab Zakat Mal
// 5. Keamanan Digital & Verifikasi OJK

export const PRE_POST_TEST_QUESTIONS = [
  {
    id: "test-q1",
    competency: "Prinsip Dasar & Maqashid",
    competencyCode: "PDS",
    prompt: "Dalam sistem ekonomi syariah, uang diperlakukan sebagai...",
    options: [
      "Komoditas yang nilainya bertambah seiring waktu melalui sistem bunga pinjaman.",
      "Alat tukar dan pengukur nilai dalam perputaran sektor riil, bukan komoditas mandiri berbunga.",
      "Aset yang bebas dari pertanggungjawaban sosial dan zakat.",
      "Alat spekulasi valuta asing tanpa underlying transaksi fisik."
    ],
    correctIndex: 1,
    explanation: "Dalam fiqih muamalah kontemporer, uang adalah alat tukar (*qiwam* / *medium of exchange*), bukan komoditas yang boleh diperanakkan lewat bunga tanpa aktivitas usaha produktif riil."
  },
  {
    id: "test-q2",
    competency: "Prinsip Dasar & Maqashid",
    competencyCode: "PDS",
    prompt: "Transaksi yang mengandung unsur ketidakpastian ekstrem mengenai kualitas, kuantitas, atau waktu penyerahan barang dikategorikan sebagai...",
    options: [
      "Riba Fadhl",
      "Gharar",
      "Ijarah",
      "Wakalah"
    ],
    correctIndex: 1,
    explanation: "Gharar adalah ketidakjelasan (*uncertainty*) yang dapat menimbulkan perselisihan atau penipuan hak milik para pihak dalam berakad."
  },
  {
    id: "test-q3",
    competency: "Fiqih Akad & Kemitraan",
    competencyCode: "FAK",
    prompt: "Pada akad Mudharabah, apabila terjadi kerugian murni bisnis yang bukan akibat kelalaian atau kecurangan pengelola, bagaimanakah penanggungan kerugiannya?",
    options: [
      "Pengelola wajib mengganti seluruh modal pemilik dana.",
      "Kerugian finansial ditanggung pemilik modal, sedangkan pengelola rugi waktu dan tenaga.",
      "Dibagi rata 50:50 apapun penyebabnya.",
      "Pemerintah yang wajib menalangi kerugian tersebut."
    ],
    correctIndex: 1,
    explanation: "Sesuai Fatwa DSN-MUI No. 115, kerugian finansial pada Mudharabah ditanggung shahibul mal (pemilik dana), kecuali terbukti ada kelalaian (tafrith/ta'addi) dari mudharib."
  },
  {
    id: "test-q4",
    competency: "Fiqih Akad & Kemitraan",
    competencyCode: "FAK",
    prompt: "Apakah arti dari persentase nisbah bagi hasil (misal nisbah 60% : 40%) pada tabungan atau usaha mudharabah?",
    options: [
      "Persentase bunga tetap dari nominal pokok saldo yang disimpan.",
      "Porsi pembagian laba/keuntungan bersih riil yang diperoleh dari usaha.",
      "Biaya administrasi yang ditarik oleh bank setiap bulan.",
      "Potongan pajak penghasilan dari pemerintah."
    ],
    correctIndex: 1,
    explanation: "Nisbah adalah proporsi pembagian keuntungan (*profit sharing ratio*), bukan tingkat bunga flat atas pokok modal."
  },
  {
    id: "test-q5",
    competency: "Tabungan & Pembiayaan",
    competencyCode: "TBP",
    prompt: "Rekening tabungan bank syariah dengan akad Wadiah Yad Dhamanah memiliki karakteristik utama...",
    options: [
      "Nasabah pasti memperoleh bagi hasil 12% per tahun.",
      "Titipan bergaransi aman yang dapat ditarik sewaktu-waktu dan bank dapat memberi bonus sukarela tanpa janji di muka.",
      "Uang nasabah hangus jika bank mengalami kerugian operasional.",
      "Nasabah wajib membeli produk asuransi tambahan."
    ],
    correctIndex: 1,
    explanation: "Wadiah Yad Dhamanah adalah titipan berjamin. Nasabah bebas mengambil dananya kapan saja, dan bank dapat memberi bonus (athaya) yang sifatnya murni sukarela."
  },
  {
    id: "test-q6",
    competency: "Tabungan & Pembiayaan",
    competencyCode: "TBP",
    prompt: "Pada skema pembiayaan kepemilikan rumah (KPR Syariah) dengan akad Murabahah, mengapa besaran cicilan tetap hingga masa tenor berakhir?",
    options: [
      "Karena bank syariah disubsidi oleh Bank Indonesia.",
      "Karena harga jual barang (pokok + margin laba) telah disepakati mengikat sejak awal akad dan tidak boleh diubah sepihak.",
      "Karena bank syariah tidak memiliki sistem penghitungan bunga otomatis.",
      "Karena nasabah membayar asuransi jiwa."
    ],
    correctIndex: 1,
    explanation: "Akad Murabahah adalah akad jual-beli. Harga jual dan margin laba telah ditetapkan sejak akad ditandatangani, sehingga cicilan bersifat tetap (*fixed*) dan kebal dari fluktuasi suku bunga acuan."
  },
  {
    id: "test-q7",
    competency: "Hisab Zakat Mal",
    competencyCode: "HZM",
    prompt: "Berapakah batas minimal kepemilikan (nisab) untuk Zakat Mal (emas/tabungan/perniagaan) yang menjadi acuan resmi BAZNAS?",
    options: [
      "Setara 25 gram emas murni",
      "Setara 85 gram emas murni",
      "Setara 200 gram emas murni",
      "Setara 1 kilogram perak"
    ],
    correctIndex: 1,
    explanation: "Berdasarkan regulasi BAZNAS dan konsensus fiqih muamalah, nisab zakat mal atas emas, simpanan uang, dan perdagangan adalah setara 85 gram emas murni."
  },
  {
    id: "test-q8",
    competency: "Hisab Zakat Mal",
    competencyCode: "HZM",
    prompt: "Persyaratan waktu di mana harta yang telah mencapai nisab harus dimiliki genap selama satu tahun perputaran disebut...",
    options: [
      "Nisbah",
      "Haul",
      "Kafarat",
      "Fidyah"
    ],
    correctIndex: 1,
    explanation: "Haul adalah syarat jangka waktu kepemilikan harta selama satu tahun hijriah/masehi penuh di atas batas nisab sebelum dikenakan kewajiban zakat 2,5%."
  },
  {
    id: "test-q9",
    competency: "Keamanan Digital & Verifikasi OJK",
    competencyCode: "KDO",
    prompt: "Penyelenggara fintech pendanaan bersama (P2P Lending) berbasis syariah wajib diawasi oleh dua lembaga utama di Indonesia, yaitu...",
    options: [
      "KPK dan Kominfo",
      "Otoritas Jasa Keuangan (OJK) dan Dewan Pengawas Syariah (DPS) rekomendasi DSN-MUI",
      "Badan Pusat Statistik dan Bea Cukai",
      "Kementerian Ketenagakerjaan dan BPK"
    ],
    correctIndex: 1,
    explanation: "Sesuai Fatwa DSN-MUI No. 117 dan POJK, platform fintech syariah beroperasi di bawah pengawasan regulasi OJK untuk aspek legalitas keuangan dan diawasi oleh DPS untuk kepatuhan syariat."
  },
  {
    id: "test-q10",
    competency: "Keamanan Digital & Verifikasi OJK",
    competencyCode: "KDO",
    prompt: "Sebuah akun media sosial menawarkan program 'Titip Dana Berkah Syariah' dengan imbal hasil pasti 50% dalam 24 jam tanpa risiko. Tindakan paling tepat bagi Gen Z adalah...",
    options: [
      "Mencoba menyetor uang Rp 100.000 untuk mengetes keaslian.",
      "Mengabaikan dan melaporkannya, karena tawaran tersebut melanggar prinsip 'Logis' (janji keuntungan pasti tanpa risiko) dan terindikasi penipuan/ponzi.",
      "Mengajak teman-teman kuliah untuk ikut bergabung.",
      "Meminta jaminan KTP pemilik akun."
    ],
    correctIndex: 1,
    explanation: "Prinsip 2L (Legal dan Logis) dari OJK mengingatkan bahwa keuntungan sangat tinggi dalam hitungan jam tanpa risiko adalah ciri khas penipuan finansial / skema ponzi yang menyalahgunakan nama syariah."
  }
];
