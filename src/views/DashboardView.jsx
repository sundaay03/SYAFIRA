// Dashboard Progres & Beranda Pembelajaran (PRD FR-06 & FR-07)
import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Award,
  BookOpen,
  Flame,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
  MessageSquare,
  Calculator,
  Compass,
  Scale,
  Coins,
  Target
} from 'lucide-react';
import { LEARNING_MODULES } from '../data/learningModules';
import { ALL_BADGES, LEVEL_TIERS, INITIAL_DAILY_QUESTS } from '../data/defaultQuests';

export default function DashboardView({
  profile,
  progress,
  assessmentData,
  setActiveTab,
  onStartPreTest,
  onStartPostTest,
  onOpenCitation,
  onSelectModule
}) {
  const completedCount = (progress.completedModules || []).length;
  const totalModules = LEARNING_MODULES.length;
  const completionPercentage = Math.round((completedCount / totalModules) * 100);

  const preTest = assessmentData.preTest;
  const postTest = assessmentData.postTest;
  const deltaScore = (postTest && preTest) ? (postTest.score - preTest.score) : null;

  const currentLevelInfo = LEVEL_TIERS.find(t => t.level === profile.level) || LEVEL_TIERS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Hero Welcome Card */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(20px, 5vw, 32px) clamp(16px, 4vw, 32px)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Background glow circle */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.25)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="#fef3c7" />
              <span>Selamat Datang, {profile.name}</span>
            </span>
            <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.25)', color: '#fef3c7', border: '1px solid #fbbf24', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Target size={14} color="#fbbf24" />
              <span>{profile.learningGoal}</span>
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.25rem, 4.5vw, 1.85rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, marginBottom: '12px' }}>
            Kuasai Keuangan Syariah dengan Pemahaman Nyata & Bebas Riba
          </h2>
          <p style={{ color: '#d1fae5', fontSize: 'clamp(0.85rem, 2.8vw, 0.98rem)', lineHeight: '1.6', marginBottom: '20px' }}>
            Pelajari konsep fiqih muamalah secara terstruktur, buktikan pemahaman lewat simulator deterministik, dan konsultasikan keraguan Anda dengan AI Assistant ber-RAG.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {!preTest ? (
              <button
                onClick={onStartPreTest}
                className="btn btn-gold"
                style={{ padding: '12px 20px', fontSize: '0.92rem' }}
              >
                <Sparkles size={18} />
                <span>Mulai Pre-Test Diagnostik (+100 XP)</span>
              </button>
            ) : completedCount >= 3 && !postTest ? (
              <button
                onClick={onStartPostTest}
                className="btn btn-gold"
                style={{ padding: '12px 20px', fontSize: '0.92rem' }}
              >
                <TrendingUp size={18} />
                <span>Ikuti Post-Test Evaluasi (+150 XP)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (onSelectModule) {
                    const nextUnfinished = LEARNING_MODULES.find(m => !(progress.completedModules || []).includes(m.id)) || LEARNING_MODULES[0];
                    onSelectModule(nextUnfinished.id);
                  } else {
                    setActiveTab('learning');
                  }
                }}
                className="btn"
                style={{ background: '#ffffff', color: '#064e3b', fontWeight: 700, padding: '12px 20px' }}
              >
                <BookOpen size={18} />
                <span>Lanjutkan Modul Pembelajaran</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('chat')}
              className="btn"
              style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
            >
              <MessageSquare size={18} />
              <span>Tanya AI Syariah</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Grid Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
        gap: '12px'
      }}>
        {/* Stat 1: Progress Modul */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROGRES MODUL</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '2px' }}>
                {completedCount} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ {totalModules}</span>
              </h3>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--emerald-50)',
              color: 'var(--emerald-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={20} />
            </div>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${completionPercentage}%`, background: 'var(--emerald-500)', transition: 'width 0.3s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '8px', display: 'block' }}>
            {completionPercentage}% kurikulum terselesaikan
          </span>
        </div>

        {/* Stat 2: Literasi Pre vs Post Test */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>PENGUKURAN LITERASI</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '2px', color: deltaScore !== null ? 'var(--emerald-500)' : 'var(--text-primary)' }}>
                {deltaScore !== null ? `+${deltaScore}%` : preTest ? `${preTest.score}%` : "Belum Tes"}
              </h3>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gold-50)',
              color: 'var(--gold-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>
            {deltaScore !== null
              ? (deltaScore >= 15 ? "Target KPI pilot tercapai! (≥15 poin)" : "Meningkat dari skor awal")
              : preTest
                ? "Skor awal terukur, ikuti post-test"
                : "Uji pemahaman dasar sekarang"}
          </span>
        </div>

        {/* Stat 3: Total XP & Level */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>LEVEL BELAJAR</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '2px', color: 'var(--emerald-600)' }}>
                Lv.{profile.level} {currentLevelInfo.title}
              </h3>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--emerald-50)',
              color: 'var(--emerald-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={20} />
            </div>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>
            Total akumulasi: <strong>{profile.xp} XP</strong>
          </span>
        </div>

        {/* Stat 4: Learning Streak */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>STREAK BELAJAR</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '2px', color: 'var(--gold-500)' }}>
                {profile.streakDays || 3} Hari
              </h3>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gold-50)',
              color: 'var(--gold-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Flame size={20} />
            </div>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>
            Konsistensi muamalah harian aktif
          </span>
        </div>
      </div>

      {/* Main Content Layout: Left 2 Cols (Learning Modules) + Right 1 Col (Quests & Tools) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: '24px'
      }}>
        {/* Left Column: Kurikulum Modul Interaktif */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Jalur Pembelajaran Modul (P0)</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                Kurikulum terstruktur berbasis fatwa DSN-MUI dan literasi OJK
              </p>
            </div>
            <button
              onClick={() => setActiveTab('learning')}
              className="btn btn-outline btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Lihat Semua</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {LEARNING_MODULES.map(module => {
              const isCompleted = (progress.completedModules || []).includes(module.id);
              const quizScore = progress.quizScores ? progress.quizScores[module.id] : null;

              return (
                <div
                  key={module.id}
                  className="glass-card"
                  onClick={() => {
                    if (onSelectModule) onSelectModule(module.id);
                    else setActiveTab('learning');
                  }}
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      background: isCompleted ? 'var(--emerald-100)' : 'var(--bg-tertiary)',
                      color: isCompleted ? 'var(--emerald-600)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {isCompleted ? <CheckCircle2 size={24} /> : module.order}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <span className="badge badge-outline" style={{ fontSize: '0.72rem' }}>
                          {module.category}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Clock size={12} /> {module.readTime}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '3px' }}>{module.title}</h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {module.subtitle}
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    {isCompleted ? (
                      <div>
                        <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                          Selesai ({quizScore || 100}%)
                        </span>
                      </div>
                    ) : (
                      <span className="badge badge-outline" style={{ fontSize: '0.75rem' }}>
                        Mulai (+{module.xpReward} XP)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Quests, Quick Simulators, & Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Daily Quests Card */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--gold-500)" />
                <h4 style={{ fontSize: '1.05rem' }}>Misi Harian (Daily Quests)</h4>
              </div>
              <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>Reset 24 Jam</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {INITIAL_DAILY_QUESTS.map(quest => (
                <div key={quest.id} style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{quest.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {quest.desc}
                    </div>
                  </div>
                  <span className="badge badge-gold" style={{ flexShrink: 0, fontSize: '0.75rem' }}>
                    +{quest.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access to Simulators */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator size={18} color="var(--emerald-500)" />
              <span>Smart Financial Simulator</span>
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.5' }}>
              Uji skenario perhitungan riil secara deterministik (bukan halusinasi LLM):
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => setActiveTab('simulator')}
                className="btn btn-secondary btn-sm"
                style={{ textAlign: 'center', padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--emerald-50)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Scale size={20} color="var(--emerald-600)" />
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>Bagi Hasil Mudharabah</span>
              </button>

              <button
                onClick={() => setActiveTab('simulator')}
                className="btn btn-secondary btn-sm"
                style={{ textAlign: 'center', padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gold-50)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Coins size={20} color="var(--gold-500)" />
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>Hisab Zakat Mal</span>
              </button>
            </div>
          </div>

          {/* Badge Showcase */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="var(--gold-500)" />
                <span>Koleksi Lencana ({profile.badges ? profile.badges.length : 1} / {ALL_BADGES.length})</span>
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 70px), 1fr))', gap: '8px' }}>
              {ALL_BADGES.map(badge => {
                const isUnlocked = (profile.badges || []).includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    title={`${badge.name}: ${badge.desc}`}
                    style={{
                      padding: '10px 6px',
                      borderRadius: 'var(--radius-md)',
                      background: isUnlocked ? 'var(--emerald-50)' : 'var(--bg-tertiary)',
                      border: isUnlocked ? '1px solid var(--emerald-200)' : '1px solid var(--border-light)',
                      textAlign: 'center',
                      opacity: isUnlocked ? 1 : 0.45,
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '28px', marginBottom: '4px' }}>
                      {badge.id === "badge-onboard" ? <Sparkles size={20} color={isUnlocked ? "var(--gold-500)" : "var(--text-muted)"} /> :
                        badge.id === "badge-pretest" ? <Target size={20} color={isUnlocked ? "var(--accent-blue)" : "var(--text-muted)"} /> :
                          badge.id === "badge-chat" ? <MessageSquare size={20} color={isUnlocked ? "var(--accent-cyan)" : "var(--text-muted)"} /> :
                            badge.id === "badge-mod1" ? <ShieldCheck size={20} color={isUnlocked ? "var(--emerald-500)" : "var(--text-muted)"} /> :
                              badge.id === "badge-sim-mudharabah" ? <Scale size={20} color={isUnlocked ? "var(--gold-500)" : "var(--text-muted)"} /> :
                                badge.id === "badge-sim-zakat" ? <Coins size={20} color={isUnlocked ? "var(--gold-600)" : "var(--text-muted)"} /> : 
                                <Award size={20} color={isUnlocked ? "var(--emerald-600)" : "var(--text-muted)"} />}
                    </div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {badge.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
