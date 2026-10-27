// Deterministik Calculation Engine (PRD FR-04 & FR-15)
// Perhitungan numerik dilakukan oleh fungsi deterministik yang diuji, bukan dihasilkan bebas oleh LLM.

/**
 * Format angka ke mata uang Rupiah (IDR)
 */
export function formatRupiah(amount) {
  if (isNaN(amount) || amount === null || amount === undefined) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Simulator A: Perhitungan Bagi Hasil Mudharabah (PRD FR-04)
 * @param {Object} params
 * @param {number} params.modal Pokok modal investasi (Shahibul Mal)
 * @param {number} params.labaKeuntungan Laba riil usaha
 * @param {number} params.nisbahShahibulMal Porsi laba Shahibul Mal (%)
 * @param {boolean} params.isRugi Skenario apakah usaha mengalami kerugian
 * @param {number} params.rugiNominal Nominal kerugian (jika ada)
 * @param {boolean} params.isKelalaianPengelola Apakah kerugian akibat kelalaian (tafrith/ta'addi) mudharib
 */
export function calculateMudharabah({
  modal = 10000000,
  labaKeuntungan = 2000000,
  nisbahShahibulMal = 40,
  isRugi = false,
  rugiNominal = 1000000,
  isKelalaianPengelola = false
}) {
  // Validasi input dasar
  const cleanModal = Math.max(0, Number(modal) || 0);
  const cleanLaba = Math.max(0, Number(labaKeuntungan) || 0);
  const cleanRugi = Math.max(0, Number(rugiNominal) || 0);
  const cleanNisbahSM = Math.min(100, Math.max(0, Number(nisbahShahibulMal) || 0));
  const cleanNisbahMudharib = 100 - cleanNisbahSM;

  if (cleanModal <= 0) {
    return {
      success: false,
      error: "Modal awal harus lebih dari Rp 0."
    };
  }

  // SKENARIO 1: SKENARIO LABA / UNTUNG
  if (!isRugi) {
    const labaShahibulMal = Math.round(cleanLaba * (cleanNisbahSM / 100));
    const labaMudharib = Math.round(cleanLaba * (cleanNisbahMudharib / 100));
    const totalDanaKembaliSM = cleanModal + labaShahibulMal;
    const equivalentReturnRate = cleanModal > 0 ? ((labaShahibulMal / cleanModal) * 100).toFixed(2) : "0.00";

    return {
      success: true,
      scenario: "LABA",
      modal: cleanModal,
      labaTotal: cleanLaba,
      nisbahSM: cleanNisbahSM,
      nisbahMudharib: cleanNisbahMudharib,
      hasilShahibulMal: labaShahibulMal,
      hasilMudharib: labaMudharib,
      totalPenerimaanShahibulMal: totalDanaKembaliSM,
      equivalentRate: equivalentReturnRate,
      assumptions: [
        "Nisbah adalah proporsi dari keuntungan riil, BUKAN suku bunga flat atas modal awal.",
        "Pendapatan pengelola (Mudharib) berasal murni dari porsi jerih payah pengelolaan usaha.",
        "Modal pokok dikembalikan utuh ditambah bagian laba hak pemilik modal."
      ],
      conventionalComparison: {
        note: "Pada pinjaman bunga konvensional, bunga dipatok tetap (misal 10%) terlepas peminjam untung atau bangkrut. Pada Mudharabah, bagi hasil mengikuti keuntungan riil usaha yang adil."
      }
    };
  }

  // SKENARIO 2: SKENARIO RUGI (PRD: Menampilkan aturan fiqih penanggungan kerugian & peran kelalaian)
  const kerugianMaksimal = Math.min(cleanModal, cleanRugi);
  
  if (!isKelalaianPengelola) {
    // Kerugian murni bisnis tanpa kelalaian
    const sisaModalSM = Math.max(0, cleanModal - kerugianMaksimal);
    return {
      success: true,
      scenario: "RUGI_NORMAL",
      modal: cleanModal,
      nominalRugi: kerugianMaksimal,
      tanggunganShahibulMal: kerugianMaksimal,
      tanggunganMudharib: 0,
      mudharibLossDesc: "Mudharib kehilangan waktu, tenaga, dan tidak memperoleh upah (keuntungan nol).",
      sisaModalShahibulMal: sisaModalSM,
      assumptions: [
        "Kerugian bisnis murni ditanggung sepenuhnya secara finansial oleh Shahibul Mal hingga batas modal yang disetor.",
        "Mudharib tidak menanggung ganti rugi finansial, namun menanggung kerugian waktu, keahlian, dan tenaga yang sia-sia.",
        "Dasar Fiqih: Fatwa DSN-MUI No. 115 dan kaidah 'Al-Kharaj bidh-Dhaman'."
      ]
    };
  } else {
    // Kerugian akibat kelalaian (Ta'addi / Tafrith)
    return {
      success: true,
      scenario: "RUGI_KELALAIAN",
      modal: cleanModal,
      nominalRugi: kerugianMaksimal,
      tanggunganShahibulMal: 0,
      tanggunganMudharib: kerugianMaksimal,
      mudharibLossDesc: "Mudharib terbukti lalai/curang, sehingga wajib menanggung ganti rugi penuh mengembalikan modal pokok.",
      sisaModalShahibulMal: cleanModal,
      assumptions: [
        "Apabila kerugian terbukti diakibatkan oleh kecerobohan (tafrith), pelanggaran syarat akad (ta'addi), atau penipuan oleh pengelola, maka pengelola wajib bertanggung jawab penuh mengganti kerugian.",
        "Hak pemilik modal dilindungi secara hukum syariah dan perdata."
      ]
    };
  }
}

/**
 * Simulator B: Estimasi Zakat Mal (PRD FR-04)
 * @param {Object} params
 * @param {number} params.emasHargaPerGram Harga emas per gram (default acuan 2026: Rp 1.400.000)
 * @param {number} params.tabungan Uang kas, rekening tabungan, dan deposito
 * @param {number} params.emasPerak Nilai emas/perak simpanan
 * @param {number} params.asetLancar Nilai aset lancar usaha/perdagangan
 * @param {number} params.utangJatuhTempo Utang jangka pendek jatuh tempo tahun berjalan
 * @param {boolean} params.haulTercapai Apakah harta telah genap dimiliki selama 1 tahun (haul)
 */
export function calculateZakatMal({
  emasHargaPerGram = 1400000,
  tabungan = 0,
  emasPerak = 0,
  asetLancar = 0,
  utangJatuhTempo = 0,
  haulTercapai = true
}) {
  const hargaEmas = Math.max(1, Number(emasHargaPerGram) || 1400000);
  const valTabungan = Math.max(0, Number(tabungan) || 0);
  const valEmas = Math.max(0, Number(emasPerak) || 0);
  const valAset = Math.max(0, Number(asetLancar) || 0);
  const valUtang = Math.max(0, Number(utangJatuhTempo) || 0);

  // Nisab 85 gram emas murni
  const nisabNominal = 85 * hargaEmas;
  const totalHartaKotor = valTabungan + valEmas + valAset;
  const totalHartaBersih = Math.max(0, totalHartaKotor - valUtang);

  const isNisabReached = totalHartaBersih >= nisabNominal;
  const isWajibZakat = isNisabReached && haulTercapai;

  const estimasiNominalZakat = isWajibZakat ? Math.round(totalHartaBersih * 0.025) : 0;
  const selisihNisab = totalHartaBersih - nisabNominal;

  return {
    success: true,
    hargaEmasPerGram: hargaEmas,
    nisabGram: 85,
    nisabNominal: nisabNominal,
    totalHartaKotor: totalHartaKotor,
    totalUtang: valUtang,
    totalHartaBersih: totalHartaBersih,
    haulTercapai: haulTercapai,
    isNisabReached: isNisabReached,
    isWajibZakat: isWajibZakat,
    estimasiZakat: estimasiNominalZakat,
    selisihKeNisab: selisihNisab,
    asnafDistribution: isWajibZakat ? [
      { name: "Fakir & Miskin", percentage: "Utama (Prioritas BAZNAS)" },
      { name: "Amil Zakat", percentage: "Operasional pengelolaan" },
      { name: "Mualaf, Riqab, Gharimin, Fisabilillah, Ibnu Sabil", percentage: "Sesuai petunjuk asnaf QS At-Taubah: 60" }
    ] : [],
    disclaimer: isWajibZakat 
      ? "Simulasi ini adalah estimasi edukatif berbasis nisab 85 gram emas (Peraturan BAZNAS RI No. 1/2024). Pembayaran zakat dapat disalurkan melalui BAZNAS atau Lembaga Amil Zakat resmi."
      : !haulTercapai 
        ? "Harta Anda telah atau mendekati nisab, namun syarat Haul (1 tahun kepemilikan) belum terpenuhi. Belum diwajibkan zakat mal, namun Anda dianjurkan bersedekah atau infak sukarela."
        : "Total harta bersih Anda belum mencapai batas nisab 85 gram emas. Anda belum berstatus sebagai Muzakki wajib zakat mal, namun tetap dianjurkan berinfak.",
    nisabReference: {
      source: "Peraturan BAZNAS No. 1 Tahun 2024 / Acuan SK BAZNAS 2026",
      dateChecked: "Oktober 2026",
      metal: "Emas 85 gram"
    }
  };
}
