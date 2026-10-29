// Onboarding 3 Langkah (PRD FR-01)
import React, { useState, useEffect } from 'react';
import { Sparkles, Shield, Compass, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const LEARNING_GOALS = [
  {
    id: "goal-basic",
    title: "Paham Dasar & Prinsip Syariah",
    desc: "Mengenal etika keuangan Islam, larangan Riba, Gharar, dan Maysir dengan analogi simpel.",
    icon: "Shield"
  },
  {
    id: "goal-partnership",
    title: "Kemitraan Usaha & Bagi Hasil",
    desc: "Memahami akad Mudharabah, Musyarakah, dan kalkulasi proporsi keuntungan nisbah.",
    icon: "Compass"
  },
  {
    id: "goal-saving",
    title: "Menabung & Investasi Halal",
    desc: "Mengetahui tabungan Wadiah, KPR Murabahah angsuran tetap, dan Sukuk Ritel SBSN.",
    icon: "BookOpen"
  },
  {
    id: "goal-zakat",
    title: "Hisab Zakat Mal & Portofolio",
    desc: "Menghitung nisab 85 gram emas, haul 1 tahun, dan kewajiban zakat mal 2,5%.",
    icon: "Sparkles"
  }
];

export default function OnboardingModal({
  isOpen,
  onClose,
  onStartPreTest,
  onProfileUpdated,
  onResetToNewUser,
  profile = {}
}) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(() => {
    if (!profile?.hasCompletedOnboarding || profile?.name === "") {
      return "";
    }
    return profile?.name || "";
  });
  const [selectedGoal, setSelectedGoal] = useState("goal-partnership");
  const [userRole, setUserRole] = useState(profile.role || "Mahasiswa");

  // Pastikan form nama kosong jika pengguna baru / belum onboarding
  useEffect(() => {
    if (isOpen) {
      if (!profile?.hasCompletedOnboarding || profile?.name === "") {
        setName("");
      } else {
        setName(profile?.name || "");
      }
    }
  }, [isOpen, profile?.hasCompletedOnboarding, profile?.name]);

  if (!isOpen) return null;

  const handleFinish = (wantsPreTest = false) => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch { }

    const selectedGoalObj = LEARNING_GOALS.find(g => g.id === selectedGoal);
    const updated = {
      name: name.trim() || (profile?.hasCompletedOnboarding && profile?.name ? profile.name : "Sobat SYAFIRA"),
      role: userRole,
      learningGoal: selectedGoalObj ? selectedGoalObj.title : "Dasar Keuangan Syariah",
      hasCompletedOnboarding: true
    };

    onProfileUpdated(updated);
    onClose();

    if (wantsPreTest) {
      setTimeout(() => {
        onStartPreTest();
      }, 350);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in" style={{ maxWidth: '600px' }}>
        {/* Step Indicator Header */}
        <div style={{
          padding: '24px 24px 16px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '6px' }}>
              Orientasi Belajar • Langkah {step} dari 3
            </span>
            <h3 style={{ fontSize: '1.25rem' }}>
              {step === 1 && "Selamat Datang di SYAFIRA"}
              {step === 2 && "Tentukan Arah Belajar Anda"}
              {step === 3 && "Mulai Perjalanan & Uji Literasi Awal"}
            </h3>
          </div>
          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {[1, 2, 3].map(s => (
              <div
                key={s}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: step >= s ? 'var(--emerald-500)' : 'var(--border-light)',
                  transition: 'background 0.3s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%)',
                padding: '20px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-glass)',
                display: 'flex',
                gap: '16px',
                alignItems: 'center'
              }}>
                <img
                  src="/logo/icon.webp"
                  alt="SYAFIRA"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'contain',
                    boxShadow: 'var(--shadow-glow)'
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--emerald-600)', marginBottom: '4px', fontWeight: 800 }}>
                    SYAFIRA — Syariah Financial Literacy
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Platform cerdas untuk Generasi Z dan masyarakat Indonesia. Belajar fiqih muamalah, mencoba simulasi bagi hasil & zakat, serta berdialog dengan Asisten AI berlandaskan fatwa resmi DSN-MUI & regulasi OJK.
                  </p>
                </div>
              </div>

              {/* Disclaimer Resmi PRD */}
              <div className="disclaimer-banner">
                <Shield size={20} color="var(--emerald-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Pemberitahuan Transparansi & Kebijakan:</strong>
                  <p style={{ marginTop: '4px', lineHeight: '1.5' }}>
                    SYAFIRA adalah sarana <strong>edukasi interaktif</strong>, bukan penyedia layanan perbankan, penasihat investasi berlisensi, atau lembaga pemberi fatwa mutlak. Semua perhitungan simulasi bersifat ilustratif edukatif.
                  </p>
                </div>
              </div>

              {/* Nama Pengguna */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                  Nama Panggilan / Nama Anda:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Contoh: Sandi / Alya / Rafi"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              {onResetToNewUser && (
                <div style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(244, 63, 94, 0.08)',
                  border: '1px solid rgba(244, 63, 94, 0.25)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '4px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
                      Mulai Dari Nol (Level 1)
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Atur ulang semua XP, modul, dan mulai dari awal sebagai Anak Baru (0 XP).
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onResetToNewUser();
                      onClose();
                    }}
                    className="btn btn-outline btn-sm"
                    style={{
                      color: 'var(--accent-rose)',
                      borderColor: 'var(--accent-rose)',
                      fontSize: '0.75rem',
                      padding: '6px 10px',
                      flexShrink: 0
                    }}
                  >
                    Reset ke Lv.1
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                  Pilih Profil Pengguna:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 100px), 1fr))', gap: '8px' }}>
                  {["Mahasiswa", "Fresh Graduate / Gen Z", "Pelaku Usaha Muda"].map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setUserRole(role)}
                      className={`btn btn-sm ${userRole === role ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ textAlign: 'center', padding: '10px 8px', fontSize: '0.8rem' }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                  Pilih Fokus Pembelajaran Utama:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {LEARNING_GOALS.map(goal => (
                    <div
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: selectedGoal === goal.id ? '2px solid var(--emerald-500)' : '1px solid var(--border-light)',
                        background: selectedGoal === goal.id ? 'var(--emerald-50)' : 'var(--bg-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: selectedGoal === goal.id ? 'var(--emerald-700)' : 'var(--text-primary)' }}>
                          {goal.title}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {goal.desc}
                        </div>
                      </div>
                      {selectedGoal === goal.id && (
                        <CheckCircle size={20} color="var(--emerald-600)" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                textAlign: 'center',
                padding: '20px',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--emerald-100)',
                  color: 'var(--emerald-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <UserCheck size={32} />
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Profil Belajar Anda Telah Siap!</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto' }}>
                  Akun belajar lokal Anda telah disiapkan. Progres belajar, skor kuis, perolehan XP, dan riwayat simulasi tersimpan aman di peramban Anda.
                </p>
              </div>

              <div style={{
                background: 'var(--gold-50)',
                border: '1px solid var(--gold-400)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                gap: '12px'
              }}>
                <Sparkles size={24} color="var(--gold-600)" style={{ flexShrink: 0 }} />
                <div>
                  <h5 style={{ fontSize: '0.92rem', color: 'var(--gold-600)', fontWeight: 700 }}>
                    Rekomendasi: Ikuti Pre-Test Diagnostik (5 Menit)
                  </h5>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.5' }}>
                    Sesuai metodologi evaluasi dampak literasi (PRD FR-05 & KPI Pilot), pre-test akan mengukur pemahaman awal Anda sebelum mempelajari modul dan post-test.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-light)',
          background: 'var(--bg-tertiary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0 0 var(--radius-xl) var(--radius-xl)'
        }}>
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="btn btn-secondary btn-sm"
            >
              Kembali
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="btn btn-primary"
            >
              <span>Lanjut</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleFinish(false)}
                className="btn btn-secondary"
              >
                Langsung ke Dashboard
              </button>
              <button
                type="button"
                onClick={() => handleFinish(true)}
                className="btn btn-gold"
              >
                <span>Mulai Pre-Test (+100 XP)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
