// Smart Learning & Kuis Interaktif (PRD FR-03 & FR-09)
import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Volume2,
  VolumeX,
  ShieldCheck,
  HelpCircle,
  Award,
  RotateCcw,
  BookMarked,
  Lightbulb,
  User,
  Check,
  X
} from 'lucide-react';
import { LEARNING_MODULES } from '../data/learningModules';
import { KNOWLEDGE_BASE_DOCS } from '../data/knowledgeBase';
import { storageService } from '../services/storageService';
import confetti from 'canvas-confetti';

export default function LearningModulesView({
  progress,
  selectedModuleId: propSelectedModuleId,
  onSelectModule,
  onModuleCompleted,
  onOpenCitation,
  isAudioEnabled,
  onAwardXP
}) {
  const [internalSelectedModuleId, setInternalSelectedModuleId] = useState(() => {
    return propSelectedModuleId || progress.lastAccessedModuleId || "mod-01";
  });

  const selectedModuleId = propSelectedModuleId || internalSelectedModuleId;

  const [currentLessonIndex, setCurrentLessonIndex] = useState(() => {
    try {
      const saved = localStorage.getItem(`syafira_lesson_${selectedModuleId}`);
      return saved !== null ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync lesson index when selectedModuleId changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`syafira_lesson_${selectedModuleId}`);
      setCurrentLessonIndex(saved !== null ? Number(saved) : 0);
    } catch {
      setCurrentLessonIndex(0);
    }
  }, [selectedModuleId]);

  const changeLessonIndex = (newIndex) => {
    setCurrentLessonIndex(newIndex);
    try {
      localStorage.setItem(`syafira_lesson_${selectedModuleId}`, newIndex.toString());
    } catch {}
  };

  const activeModule = LEARNING_MODULES.find(m => m.id === selectedModuleId) || LEARNING_MODULES[0];
  const isCompleted = (progress.completedModules || []).includes(activeModule.id);

  // Audio Speech Synthesis Helper (PRD FR-09: Inclusive Learning Mode)
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const cleanText = text.replace(/[*_#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleSelectModule = (modId) => {
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (onSelectModule) {
      onSelectModule(modId);
    } else {
      setInternalSelectedModuleId(modId);
    }
    try {
      const saved = localStorage.getItem(`syafira_lesson_${modId}`);
      setCurrentLessonIndex(saved !== null ? Number(saved) : 0);
    } catch {
      setCurrentLessonIndex(0);
    }
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizFinished(false);
  };

  const handleSelectQuizOption = (questionId, optionIndex) => {
    if (quizFinished) return;
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleFinishQuiz = () => {
    let correct = 0;
    activeModule.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const score = Math.round((correct / activeModule.quiz.length) * 100);
    setQuizScore(score);
    setQuizFinished(true);

    if (score >= 60) {
      storageService.markModuleComplete(activeModule.id, score);
      if (activeModule.id === "mod-01") {
        storageService.unlockBadge("badge-mod1");
      }
      if (onAwardXP) onAwardXP(activeModule.xpReward, `Menyelesaikan Modul: ${activeModule.title}`);
      if (onModuleCompleted) onModuleCompleted(activeModule.id, score);

      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch { }
    }
  };

  const currentLesson = activeModule.lessons[currentLessonIndex] || activeModule.lessons[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      {/* Top Selector Strip */}
      <div className="scrollable-tabs-row" style={{
        paddingBottom: '6px',
        width: '100%'
      }}>
        {LEARNING_MODULES.map(m => {
          const isSelected = m.id === selectedModuleId;
          const isModDone = (progress.completedModules || []).includes(m.id);
          return (
            <button
              key={m.id}
              onClick={() => handleSelectModule(m.id)}
              style={{
                padding: '12px 18px',
                borderRadius: 'var(--radius-lg)',
                border: isSelected ? '2px solid var(--emerald-500)' : '1px solid var(--border-light)',
                background: isSelected ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                flexShrink: 0,
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isModDone ? 'var(--emerald-500)' : isSelected ? 'var(--emerald-100)' : 'var(--bg-primary)',
                color: isModDone ? '#ffffff' : isSelected ? 'var(--emerald-700)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                {isModDone ? <CheckCircle2 size={18} /> : m.order}
              </div>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  {m.category}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: isSelected ? 'var(--emerald-600)' : 'var(--text-primary)' }}>
                  {m.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Learning Content Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: '20px'
      }}>
        {/* Left Column: Lesson Reader / Quiz */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '28px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Header of Active Module */}
          <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-emerald">Modul {activeModule.order}</span>
                <span className="badge badge-outline" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {activeModule.readTime}
                </span>
                <span className="badge badge-gold">+{activeModule.xpReward} XP</span>
              </div>

              {/* Audio Reader Button */}
              {isAudioEnabled && !showQuiz && (
                <button
                  onClick={() => speakText(currentLesson.content)}
                  className={`btn btn-sm ${isSpeaking ? 'btn-gold' : 'btn-secondary'}`}
                  title="Dengarkan pembacaan teks materi"
                >
                  {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  <span>{isSpeaking ? "Hentikan Suara" : "Dengarkan Audio"}</span>
                </button>
              )}
            </div>

            <h2 style={{ fontSize: '1.5rem', marginTop: '10px' }}>{activeModule.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
              {activeModule.subtitle}
            </p>

            {/* Mode Toggle: Baca Materi vs Kuis Latihan */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button
                onClick={() => setShowQuiz(false)}
                className={`btn btn-sm ${!showQuiz ? 'btn-primary' : 'btn-secondary'}`}
              >
                <BookOpen size={15} />
                <span>Materi Pembelajaran</span>
              </button>
              <button
                onClick={() => setShowQuiz(true)}
                className={`btn btn-sm ${showQuiz ? 'btn-gold' : 'btn-secondary'}`}
              >
                <HelpCircle size={15} />
                <span>Kuis Latihan ({activeModule.quiz.length} Soal)</span>
              </button>
            </div>
          </div>

          {/* MODE 1: MATERI PEMBELAJARAN */}
          {!showQuiz ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Lesson Nav Tabs */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {activeModule.lessons.map((les, idx) => (
                  <button
                    key={les.id}
                    onClick={() => changeLessonIndex(idx)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.85rem',
                      fontWeight: currentLessonIndex === idx ? 700 : 500,
                      background: currentLessonIndex === idx ? 'var(--emerald-50)' : 'var(--bg-tertiary)',
                      color: currentLessonIndex === idx ? 'var(--emerald-700)' : 'var(--text-secondary)',
                      border: currentLessonIndex === idx ? '1px solid var(--emerald-200)' : '1px solid var(--border-light)',
                      cursor: 'pointer'
                    }}
                  >
                    {les.title}
                  </button>
                ))}
              </div>

              {/* Lesson Body Content */}
              <div style={{
                fontSize: '0.98rem',
                lineHeight: '1.75',
                color: 'var(--text-primary)',
                whiteSpace: 'pre-line'
              }}>
                {currentLesson.content}
              </div>

              {/* Interactive Highlight Box if any */}
              {currentLesson.interactiveBox && (
                <div style={{
                  background: 'var(--gold-50)',
                  border: '1px solid var(--gold-400)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--gold-600)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lightbulb size={16} />
                    <span>{currentLesson.interactiveBox.title}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {currentLesson.interactiveBox.text}
                  </div>
                </div>
              )}

              {/* Real World Gen Z Case Study (Alya & Rafi) */}
              {currentLesson.caseStudy && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)',
                  borderLeft: '4px solid var(--emerald-500)',
                  padding: '18px 20px',
                  borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--emerald-600)'
                    }}>
                      <User size={15} />
                    </div>
                    <strong style={{ color: 'var(--emerald-700)', fontSize: '0.92rem' }}>
                      Studi Kasus Nyata: {currentLesson.caseStudy.persona}
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "{currentLesson.caseStudy.scenario}"
                  </p>
                  <div style={{
                    background: 'var(--bg-secondary)',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.88rem',
                    color: 'var(--text-primary)'
                  }}>
                    <strong>Penyelesaian Syariah:</strong> {currentLesson.caseStudy.insight}
                  </div>
                </div>
              )}

              {/* Bottom Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                {currentLessonIndex > 0 ? (
                  <button
                    onClick={() => changeLessonIndex(currentLessonIndex - 1)}
                    className="btn btn-secondary btn-sm"
                  >
                    Bagian Sebelumnya
                  </button>
                ) : <div />}

                {currentLessonIndex < activeModule.lessons.length - 1 ? (
                  <button
                    onClick={() => changeLessonIndex(currentLessonIndex + 1)}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Lanjut ke {activeModule.lessons[currentLessonIndex + 1].title}</span>
                    <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="btn btn-gold btn-sm"
                  >
                    <span>Uji Pemahaman di Kuis (+{activeModule.xpReward} XP)</span>
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* MODE 2: KUIS MODUL INTERAKTIF */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {!quizFinished ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {activeModule.quiz.map((q, idx) => {
                      const selected = quizAnswers[q.id];
                      return (
                        <div
                          key={q.id}
                          style={{
                            padding: '16px 20px',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border-light)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                          }}
                        >
                          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                            {idx + 1}. {q.question}
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {q.options.map((opt, optIdx) => {
                              const isChecked = selected === optIdx;
                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  onClick={() => handleSelectQuizOption(q.id, optIdx)}
                                  style={{
                                    padding: '10px 14px',
                                    borderRadius: 'var(--radius-md)',
                                    border: isChecked ? '2px solid var(--emerald-500)' : '1px solid var(--border-light)',
                                    background: isChecked ? 'var(--emerald-50)' : 'var(--bg-secondary)',
                                    color: isChecked ? 'var(--emerald-800)' : 'var(--text-primary)',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontSize: '0.88rem',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    border: isChecked ? '2px solid var(--emerald-500)' : '1px solid var(--border-light)',
                                    background: isChecked ? 'var(--emerald-500)' : 'transparent',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.72rem',
                                    fontWeight: 700
                                  }}>
                                    {String.fromCharCode(65 + optIdx)}
                                  </div>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button
                      onClick={handleFinishQuiz}
                      disabled={Object.keys(quizAnswers).length < activeModule.quiz.length}
                      className="btn btn-gold"
                      style={{ opacity: Object.keys(quizAnswers).length < activeModule.quiz.length ? 0.5 : 1 }}
                    >
                      <span>Kirim Jawaban Kuis</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                /* Quiz Results Review with Instant Explanations */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{
                    padding: '24px',
                    borderRadius: 'var(--radius-lg)',
                    background: quizScore >= 60
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(244, 63, 94, 0.05) 100%)',
                    textAlign: 'center',
                    border: '1px solid var(--border-glass)'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: quizScore >= 60 ? 'var(--emerald-600)' : 'var(--accent-rose)'
                    }}>
                      Skor Kuis: {quizScore}%
                    </div>
                    <h4 style={{ fontSize: '1.2rem', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      {quizScore >= 60 ? (
                        <>
                          <Award size={20} color="var(--emerald-600)" />
                          <span>Selamat, Anda Lulus Modul Ini!</span>
                        </>
                      ) : (
                        <span>Skor Belum Mencapai Batas Kelulusan (60%)</span>
                      )}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {quizScore >= 60
                        ? `Anda mendapatkan +${activeModule.xpReward} XP dan progres modul Anda telah diperbarui.`
                        : "Pelajari kembali materi di atas dan ulangi kuis untuk mendapatkan XP."}
                    </p>
                  </div>

                  {/* Pembahasan Detail Soal */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h5 style={{ fontSize: '0.95rem' }}>Pembahasan Lengkap:</h5>
                    {activeModule.quiz.map((q, idx) => {
                      const userAns = quizAnswers[q.id];
                      const isCorrect = userAns === q.correctIndex;
                      return (
                        <div key={q.id} style={{
                          padding: '14px 16px',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-tertiary)',
                          border: isCorrect ? '1px solid var(--emerald-200)' : '1px solid rgba(244, 63, 94, 0.3)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            {idx + 1}. {q.question}
                          </div>
                          <div style={{ fontSize: '0.84rem', color: isCorrect ? 'var(--emerald-600)' : 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>Jawaban Anda: {q.options[userAns]}</span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                              {isCorrect ? (
                                <>
                                  (<Check size={14} /> Benar)
                                </>
                              ) : (
                                <>
                                  (<X size={14} /> Kurang Tepat)
                                </>
                              )}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                              Kunci Jawaban: {q.options[q.correctIndex]}
                            </div>
                          )}
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '8px 10px', borderRadius: '4px', marginTop: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                            <Lightbulb size={14} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--gold-500)' }} />
                            <span>{q.explanation}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        setQuizFinished(false);
                        setQuizAnswers({});
                      }}
                      className="btn btn-secondary btn-sm"
                    >
                      <RotateCcw size={14} />
                      <span>Ulangi Kuis</span>
                    </button>
                    <button
                      onClick={() => setShowQuiz(false)}
                      className="btn btn-primary btn-sm"
                    >
                      Kembali ke Materi
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Objectives, Glossary, & Official Citations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Learning Objectives */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookMarked size={18} color="var(--emerald-500)" />
              <span>Tujuan Pembelajaran Modul</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeModule.objectives.map((obj, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--emerald-500)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {obj}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Glossary (PRD FR-03) */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--emerald-500)" />
              <span>Glosarium Istilah Modul</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeModule.glossary.map(item => (
                <div key={item.term} style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--emerald-600)' }}>
                    {item.term}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Source References (PRD FR-03 Kriteria 1) */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--emerald-500)" />
              <span>Rujukan Resmi Modul Ini</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeModule.sourceRefIds.map(docId => {
                const doc = KNOWLEDGE_BASE_DOCS.find(d => d.id === docId);
                if (!doc) return null;
                return (
                  <button
                    key={doc.id}
                    onClick={() => onOpenCitation(doc)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--emerald-200)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>{doc.title}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{doc.publisher}</div>
                    </div>
                    <ChevronRight size={16} color="var(--emerald-600)" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
