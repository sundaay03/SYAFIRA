// Smart Financial Simulator (PRD FR-04)
// Dua Simulator Deterministik: Mudharabah (Laba & Rugi Fiqih) dan Estimasi Zakat Mal (Nisab 85g Emas)

import React, { useState } from 'react';
import {
  Calculator,
  Scale,
  Coins,
  RotateCcw,
  HelpCircle,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Percent
} from 'lucide-react';
import { calculateMudharabah, calculateZakatMal, formatRupiah } from '../services/calculationEngine';
import { storageService } from '../services/storageService';

export default function SimulatorView({ onAwardXP }) {
  const [activeTab, setActiveTab] = useState("mudharabah");

  // STATE SIMULATOR A: MUDHARABAH
  const [modal, setModal] = useState(25000000); // 25 Juta
  const [laba, setLaba] = useState(5000000); // 5 Juta
  const [nisbahSM, setNisbahSM] = useState(40); // 40% Pemilik Modal : 60% Pengelola
  const [isRugi, setIsRugi] = useState(false);
  const [nominalRugi, setNominalRugi] = useState(3000000);
  const [isKelalaian, setIsKelalaian] = useState(false);

  // STATE SIMULATOR B: ZAKAT MAL
  const [hargaEmas, setHargaEmas] = useState(1400000); // 1.4 Juta / gram
  const [tabungan, setTabungan] = useState(110000000);
  const [emasPerak, setEmasPerak] = useState(25000000);
  const [asetLancar, setAsetLancar] = useState(15000000);
  const [utangJatuhTempo, setUtangJatuhTempo] = useState(10000000);
  const [haulTercapai, setHaulTercapai] = useState(true);

  // Jalankan perhitungan deterministik
  const mudharabahResult = calculateMudharabah({
    modal,
    labaKeuntungan: laba,
    nisbahShahibulMal: nisbahSM,
    isRugi,
    rugiNominal: nominalRugi,
    isKelalaianPengelola: isKelalaian
  });

  const zakatResult = calculateZakatMal({
    emasHargaPerGram: hargaEmas,
    tabungan,
    emasPerak,
    asetLancar,
    utangJatuhTempo,
    haulTercapai
  });

  const handleResetMudharabah = () => {
    setModal(25000000);
    setLaba(5000000);
    setNisbahSM(40);
    setIsRugi(false);
    setNominalRugi(3000000);
    setIsKelalaian(false);
  };

  const handleResetZakat = () => {
    setHargaEmas(1400000);
    setTabungan(110000000);
    setEmasPerak(25000000);
    setAsetLancar(15000000);
    setUtangJatuhTempo(10000000);
    setHaulTercapai(true);
  };

  const triggerGamification = (simType) => {
    const profile = storageService.getProfile();
    const badges = profile.badges || [];
    if (simType === 'mudharabah') {
      if (!badges.includes("badge-sim-mudharabah")) {
        storageService.unlockBadge("badge-sim-mudharabah");
        if (onAwardXP) onAwardXP(30, "Mencoba Simulator Mudharabah");
      }
    } else {
      if (!badges.includes("badge-sim-zakat")) {
        storageService.unlockBadge("badge-sim-zakat");
        if (onAwardXP) onAwardXP(30, "Mencoba Simulator Zakat Mal");
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      {/* Top Banner Disclaimer & Tabs */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '20px 24px',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">Engine Deterministik</span>
            <span className="badge badge-outline">Bukan LLM Halusinasi</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', marginTop: '6px' }}>Smart Financial Simulator</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '2px' }}>
            Simulasi interaktif dengan rumus matematika fiqih yang diverifikasi Dewan Pengawas Syariah.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="scrollable-tabs-row" style={{
          background: 'var(--bg-tertiary)',
          padding: '4px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          maxWidth: '100%'
        }}>
          <button
            onClick={() => {
              setActiveTab('mudharabah');
              triggerGamification('mudharabah');
            }}
            className={`btn btn-sm ${activeTab === 'mudharabah' ? 'btn-primary' : ''}`}
            style={{ borderRadius: 'var(--radius-md)', flexShrink: 0 }}
          >
            <Scale size={16} />
            <span>1. Bagi Hasil Mudharabah</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('zakat');
              triggerGamification('zakat');
            }}
            className={`btn btn-sm ${activeTab === 'zakat' ? 'btn-primary' : ''}`}
            style={{ borderRadius: 'var(--radius-md)', flexShrink: 0 }}
          >
            <Coins size={16} />
            <span>2. Estimasi Zakat Mal</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: SIMULATOR MUDHARABAH */}
      {/* ============================================================== */}
      {activeTab === 'mudharabah' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '20px'
        }}>
          {/* Left Form: Parameter Input */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Scale size={20} color="var(--emerald-500)" />
                <span>Parameter Kemitraan</span>
              </h3>
              <button onClick={handleResetMudharabah} className="btn btn-outline btn-sm" title="Kembalikan nilai awal">
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>

            {/* Input Modal */}
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, marginBottom: '6px' }}>
                Modal Investasi Pemilik Dana (Shahibul Mal):
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Rp</span>
                <input
                  type="number"
                  min="0"
                  step="1000000"
                  value={modal}
                  onChange={e => setModal(Math.max(0, Number(e.target.value)))}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontWeight: 700
                  }}
                />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Terbilang: {formatRupiah(modal)}
              </span>
            </div>

            {/* Skenario Untung vs Rugi Toggle (PRD Requirement) */}
            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Uji Skenario Kerugian Bisnis</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Lihat aturan fiqih saat bisnis mengalami kerugian
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsRugi(!isRugi)}
                className={`btn btn-sm ${isRugi ? 'btn-gold' : 'btn-secondary'}`}
              >
                {isRugi ? "Skenario RUGI Aktif" : "Skenario LABA"}
              </button>
            </div>

            {/* If Skenario Laba: Input Laba Usaha */}
            {!isRugi ? (
              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, marginBottom: '6px' }}>
                  Keuntungan / Laba Riil Usaha:
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Rp</span>
                  <input
                    type="number"
                    min="0"
                    step="500000"
                    value={laba}
                    onChange={e => setLaba(Math.max(0, Number(e.target.value)))}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 40px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontWeight: 700
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Terbilang: {formatRupiah(laba)}
                </span>
              </div>
            ) : (
              /* If Skenario Rugi: Input Kerugian & Kelalaian Checkbox */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, marginBottom: '6px', color: 'var(--accent-rose)' }}>
                    Nominal Kerugian Usaha:
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Rp</span>
                    <input
                      type="number"
                      min="0"
                      step="500000"
                      value={nominalRugi}
                      onChange={e => setNominalRugi(Math.max(0, Number(e.target.value)))}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 40px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--accent-rose)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontWeight: 700
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Terbilang rugi: {formatRupiah(nominalRugi)}
                  </span>
                </div>

                <div style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <input
                    type="checkbox"
                    id="kelalaian-check"
                    checked={isKelalaian}
                    onChange={e => setIsKelalaian(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent-rose)', cursor: 'pointer' }}
                  />
                  <label htmlFor="kelalaian-check" style={{ fontSize: '0.82rem', cursor: 'pointer' }}>
                    Kerugian akibat <strong>kelalaian/pelanggaran akad (ta'addi)</strong> oleh pengelola (Mudharib).
                  </label>
                </div>
              </div>
            )}

            {/* Slider Nisbah Bagi Hasil */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>Nisbah Kesepakatan di Awal Akad:</span>
                <span className="badge badge-emerald" style={{ fontWeight: 700 }}>
                  {nisbahSM}% Shahibul Mal : {100 - nisbahSM}% Mudharib
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={nisbahSM}
                onChange={e => setNisbahSM(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--emerald-500)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>10% Pemilik Modal</span>
                <span>50% Seimbang</span>
                <span>90% Pemilik Modal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hasil Deterministik & Edukasi */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-secondary)' }}>
              <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '16px' }}>
                <span className="badge badge-emerald" style={{ marginBottom: '4px' }}>
                  Hasil Perhitungan Fiqih
                </span>
                <h3 style={{ fontSize: '1.25rem' }}>
                  {!isRugi ? "Distribusi Bagi Hasil Laba Riil" : "Penyelesaian Kerugian Sesuai Fiqih"}
                </h3>
              </div>

              {!isRugi ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Two columns for SM vs Mudharib */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--emerald-50)',
                      border: '1px solid var(--emerald-200)'
                    }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--emerald-700)', textTransform: 'uppercase' }}>
                        Hak Pemilik Modal ({nisbahSM}%)
                      </div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-800)', marginTop: '4px' }}>
                        {formatRupiah(mudharabahResult.hasilShahibulMal)}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--emerald-600)', marginTop: '4px' }}>
                        Equivalent Yield: ~{mudharabahResult.equivalentRate}%
                      </div>
                    </div>

                    <div style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--gold-50)',
                      border: '1px solid var(--gold-400)'
                    }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-600)', textTransform: 'uppercase' }}>
                        Hak Pengelola ({100 - nisbahSM}%)
                      </div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gold-600)', marginTop: '4px' }}>
                        {formatRupiah(mudharabahResult.hasilMudharib)}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        Upah keringat / jasa usaha
                      </div>
                    </div>
                  </div>

                  {/* Total Pengembalian */}
                  <div style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Total Dana Diterima Shahibul Mal:</span>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--emerald-600)' }}>
                      {formatRupiah(mudharabahResult.totalPenerimaanShahibulMal)}
                    </strong>
                  </div>

                  {/* Visual Bar Ratio */}
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Proporsi Bagi Hasil:</div>
                    <div style={{ display: 'flex', height: '14px', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${nisbahSM}%`, background: 'var(--emerald-500)' }} title={`Shahibul Mal ${nisbahSM}%`} />
                      <div style={{ width: `${100 - nisbahSM}%`, background: 'var(--gold-500)' }} title={`Mudharib ${100 - nisbahSM}%`} />
                    </div>
                  </div>
                </div>
              ) : (
                /* Tampilan Skenario Kerugian Fiqih */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: isKelalaian ? 'rgba(244, 63, 94, 0.1)' : 'var(--gold-50)',
                    border: `1px solid ${isKelalaian ? 'var(--accent-rose)' : 'var(--gold-400)'}`
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isKelalaian ? 'var(--accent-rose)' : 'var(--gold-600)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertTriangle size={18} />
                      <span>{isKelalaian ? "Kasus Kelalaian (Ta'addi) Pengelola" : "Kerugian Bisnis Murni (Normal)"}</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', marginTop: '8px', lineHeight: 1.5 }}>
                      {!isKelalaian ? (
                        <>
                          Pemilik Modal menanggung kerugian finansial sebesar <strong>{formatRupiah(mudharabahResult.tanggunganShahibulMal)}</strong>.
                          Sisa modal dikembalikan: <strong>{formatRupiah(mudharabahResult.sisaModalShahibulMal)}</strong>.
                          <div style={{ marginTop: '6px', color: 'var(--text-secondary)' }}>
                            Pengelola (Mudharib) menanggung kerugian waktu dan tenaga (tidak mendapatkan penghasilan).
                          </div>
                        </>
                      ) : (
                        <>
                          Pengelola terbukti lalai/menyalahi akad! Pengelola <strong>wajib mengganti seluruh kerugian modal {formatRupiah(mudharabahResult.tanggunganMudharib)}</strong>.
                          Modal pemilik modal terlindungi 100%.
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Asumsi Transparan (PRD FR-04: Semua asumsi ditampilkan di dekat hasil) */}
              <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Asumsi & Kaidah Syariah (Fatwa DSN-MUI No. 115):
                </div>
                <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {mudharabahResult.assumptions.map((asum, i) => (
                    <li key={i}>{asum}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Perbandingan Edukatif vs Bunga Bank Konvensional */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              padding: '16px 20px',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              gap: '12px'
            }}>
              <Info size={20} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  Mengapa Ini Bukan Bunga Pinjaman Konvensional?
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  Bunga konvensional menggaransi keuntungan pasti kepada pemilik dana tanpa mempedulikan nasib peminjam. Pada Mudharabah, hak imbal hasil semata-mata bersumber dari keberhasilan perputaran usaha nyata yang adil bagi kedua belah pihak.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: SIMULATOR ZAKAT MAL */}
      {/* ============================================================== */}
      {activeTab === 'zakat' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '20px'
        }}>
          {/* Left Form: Input Aset & Pengurang Utang */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Coins size={20} color="var(--gold-500)" />
                <span>Komponen Harta Simpanan</span>
              </h3>
              <button onClick={handleResetZakat} className="btn btn-outline btn-sm">
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>

            {/* Standar Acuan Nisab Emas */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(15, 23, 42, 0.8) 100%)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              padding: '14px 16px',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Coins size={16} color="var(--gold-400)" />
                  <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--gold-400)' }}>
                    Acuan Nisab Emas (85 Gram)
                  </span>
                </div>
                <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                  Peraturan BAZNAS No. 1/2024
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                alignItems: 'center'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
                    Harga Dasar Emas Murni:
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      position: 'absolute',
                      left: '12px',
                      color: 'var(--gold-400)',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}>
                      Rp
                    </span>
                    <input
                      type="number"
                      min="100000"
                      step="50000"
                      value={hargaEmas}
                      onChange={e => setHargaEmas(Math.max(1, Number(e.target.value)))}
                      style={{
                        width: '100%',
                        padding: '8px 56px 8px 36px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(251, 191, 36, 0.35)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        outline: 'none'
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      right: '12px',
                      color: 'var(--text-muted)',
                      fontSize: '0.78rem',
                      fontWeight: 600
                    }}>
                      / gram
                    </span>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(251, 191, 36, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Ambang Batas Nisab (85g × Harga):
                  </span>
                  <div style={{
                    fontSize: '1.02rem',
                    fontWeight: 800,
                    color: 'var(--gold-400)',
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span>{formatRupiah(zakatResult.nisabNominal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input 1: Tabungan / Kas */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                1. Saldo Tabungan, Deposito, & Uang Kas:
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.88rem' }}>Rp</span>
                <input
                  type="number"
                  min="0"
                  step="5000000"
                  value={tabungan}
                  onChange={e => setTabungan(Math.max(0, Number(e.target.value)))}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontWeight: 700
                  }}
                />
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{formatRupiah(tabungan)}</span>
            </div>

            {/* Input 2: Emas & Logam Mulia */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                2. Nilai Emas, Perak, & Logam Mulia Simpanan:
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.88rem' }}>Rp</span>
                <input
                  type="number"
                  min="0"
                  step="1000000"
                  value={emasPerak}
                  onChange={e => setEmasPerak(Math.max(0, Number(e.target.value)))}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontWeight: 700
                  }}
                />
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{formatRupiah(emasPerak)}</span>
            </div>

            {/* Input 3: Aset Lancar Perniagaan */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                3. Aset Lancar Usaha / Nilai Stok Siap Jual:
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.88rem' }}>Rp</span>
                <input
                  type="number"
                  min="0"
                  step="1000000"
                  value={asetLancar}
                  onChange={e => setAsetLancar(Math.max(0, Number(e.target.value)))}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontWeight: 700
                  }}
                />
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{formatRupiah(asetLancar)}</span>
            </div>

            {/* Input 4: Utang Jangka Pendek (Pengurang) */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--accent-rose)' }}>
                4. Dikurangi Utang Jangka Pendek Jatuh Tempo:
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--accent-rose)', fontWeight: 600, fontSize: '0.88rem' }}>Rp</span>
                <input
                  type="number"
                  min="0"
                  step="1000000"
                  value={utangJatuhTempo}
                  onChange={e => setUtangJatuhTempo(Math.max(0, Number(e.target.value)))}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(244, 63, 94, 0.4)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontWeight: 700
                  }}
                />
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{formatRupiah(utangJatuhTempo)}</span>
            </div>

            {/* Checkbox Haul 1 Tahun */}
            <div style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <input
                type="checkbox"
                id="haul-check"
                checked={haulTercapai}
                onChange={e => setHaulTercapai(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--emerald-500)', cursor: 'pointer' }}
              />
              <label htmlFor="haul-check" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
                Harta di atas telah dimiliki genap <strong>1 Tahun Penuh (Haul)</strong>.
              </label>
            </div>
          </div>

          {/* Right Column: Keputusan Hisab & Estimasi Zakat */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '16px' }}>
                <span className={`badge ${zakatResult.isWajibZakat ? 'badge-emerald' : 'badge-gold'}`}>
                  {zakatResult.isWajibZakat ? "Wajib Zakat Mal (Muzakki)" : "Belum Wajib Zakat Mal"}
                </span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '6px' }}>
                  Hisab Harta Bersih & Kewajiban 2,5%
                </h3>
              </div>

              {/* Rincian Ringkas */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Total Harta Bruto:</span>
                  <strong>{formatRupiah(zakatResult.totalHartaKotor)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--accent-rose)' }}>
                  <span>Utang Jatuh Tempo (-):</span>
                  <strong>{formatRupiah(zakatResult.totalUtang)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', paddingTop: '8px', borderTop: '1px dashed var(--border-light)' }}>
                  <span style={{ fontWeight: 700 }}>Total Harta Kena Zakat:</span>
                  <strong style={{ color: 'var(--emerald-600)' }}>{formatRupiah(zakatResult.totalHartaBersih)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                  <span>Ambang Batas Nisab 85g Emas:</span>
                  <span>{formatRupiah(zakatResult.nisabNominal)}</span>
                </div>
              </div>

              {/* Hasil Nominal Zakat */}
              <div style={{
                padding: '20px',
                borderRadius: 'var(--radius-lg)',
                background: zakatResult.isWajibZakat
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%)'
                  : 'var(--bg-tertiary)',
                border: `1px solid ${zakatResult.isWajibZakat ? 'var(--emerald-200)' : 'var(--border-light)'}`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Estimasi Kewajiban Zakat Mal (Kadar 2,5%)
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: zakatResult.isWajibZakat ? 'var(--emerald-600)' : 'var(--text-muted)',
                  marginTop: '4px'
                }}>
                  {formatRupiah(zakatResult.estimasiZakat)}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  {zakatResult.disclaimer}
                </p>
              </div>

              {/* Rincian 8 Asnaf */}
              {zakatResult.isWajibZakat && (
                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Alokasi Penyaluran Mustahik (8 Asnaf QS At-Taubah: 60):
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                    {["Fakir", "Miskin", "Amil", "Mualaf", "Riqab", "Gharimin", "Fisabilillah", "Ibnu Sabil"].map(asnaf => (
                      <div key={asnaf} style={{
                        padding: '6px 8px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        textAlign: 'center',
                        fontWeight: 600
                      }}>
                        {asnaf}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer Resmi */}
            <div className="disclaimer-banner">
              <ShieldAlert size={18} color="var(--emerald-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Pemberitahuan Status Simulasi:</strong>
                <p style={{ marginTop: '2px', lineHeight: 1.5 }}>
                  Hasil kalkulasi ini merupakan perkiraan edukatif. Pembayaran resmi dapat disalurkan melalui BAZNAS atau amil zakat terakreditasi Kementerian Agama untuk mendapatkan Bukti Setor Zakat (BSZ) resmi pengurang pajak.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
