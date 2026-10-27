// Pre-Test & Post-Test Assessment Component (PRD FR-05 & FR-10)
import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, Sparkles, TrendingUp, BookOpen, X, Lightbulb } from 'lucide-react';
import { PRE_POST_TEST_QUESTIONS } from '../data/assessmentQuestions';
import { storageService } from '../services/storageService';
import confetti from 'canvas-confetti';

export default function PrePostTestModal({ isOpen, type = "PRE", preTestScore = null, onClose, onCompleted }) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const saved = sessionStorage.getItem(`syafira_test_${type}_idx`);
      return saved !== null ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    try {
      const saved = sessionStorage.getItem(`syafira_test_${type}_answers`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isFinished, setIsFinished] = useState(false);
  const [resultData, setResultData] = useState(null);

  // Sync test draft to sessionStorage so closing/switching pages preserves answers
  useEffect(() => {
    if (!isFinished && isOpen) {
      try {
        sessionStorage.setItem(`syafira_test_${type}_idx`, currentIndex.toString());
        sessionStorage.setItem(`syafira_test_${type}_answers`, JSON.stringify(selectedAnswers));
      } catch {}
    }
  }, [currentIndex, selectedAnswers, isFinished, isOpen, type]);

  if (!isOpen) return null;

  const currentQ = PRE_POST_TEST_QUESTIONS[currentIndex];
  const totalQuestions = PRE_POST_TEST_QUESTIONS.length;
  const isPostTest = type === "POST";

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    let correctCount = 0;
    const competencyStats = {};

    PRE_POST_TEST_QUESTIONS.forEach(q => {
      const userAns = selectedAnswers[q.id];
      const isCorrect = userAns === q.correctIndex;
      if (isCorrect) correctCount++;

      if (!competencyStats[q.competency]) {
        competencyStats[q.competency] = { total: 0, correct: 0 };
      }
      competencyStats[q.competency].total++;
      if (isCorrect) competencyStats[q.competency].correct++;
    });

    const finalScore = Math.round((correctCount / totalQuestions) * 100);

    const result = {
      type: type,
      score: finalScore,
      correctCount,
      totalQuestions,
      answers: selectedAnswers,
      competencyStats
    };

    setResultData(result);
    setIsFinished(true);

    if (isPostTest) {
      storageService.savePostTest(result);
    } else {
      storageService.savePreTest(result);
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    try {
      sessionStorage.removeItem(`syafira_test_${type}_idx`);
      sessionStorage.removeItem(`syafira_test_${type}_answers`);
    } catch {}

    if (onCompleted) {
      onCompleted(result);
    }
  };

  const handleRestart = () => {
    try {
      sessionStorage.removeItem(`syafira_test_${type}_idx`);
      sessionStorage.removeItem(`syafira_test_${type}_answers`);
    } catch {}
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
    setResultData(null);
  };

  const deltaScore = (isPostTest && preTestScore !== null && resultData) 
    ? resultData.score - preTestScore 
    : 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in" style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <span className={`badge ${isPostTest ? 'badge-gold' : 'badge-emerald'}`}>
              {isPostTest ? "Evaluasi Akhir (Post-Test)" : "Pengukuran Awal (Pre-Test Diagnostik)"}
            </span>
            <h3 style={{ fontSize: '1.2rem', marginTop: '4px' }}>
              {!isFinished 
                ? `Soal ${currentIndex + 1} dari ${totalQuestions}` 
                : "Hasil Pengukuran Literasi Syariah"}
            </h3>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ color: 'var(--text-muted)' }} aria-label="Tutup">
            <X size={20} />
          </button>
        </div>

        {/* Test in progress */}
        {!isFinished ? (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '6px',
              background: 'var(--bg-tertiary)',
              borderRadius: '999px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
                background: isPostTest ? 'var(--gold-500)' : 'var(--emerald-500)',
                transition: 'width 0.3s ease'
              }} />
            </div>

            {/* Competency badge */}
            <div>
              <span className="badge badge-outline" style={{ fontSize: '0.78rem' }}>
                Kompetensi: {currentQ.competency}
              </span>
              <p style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                marginTop: '10px',
                lineHeight: '1.5',
                color: 'var(--text-primary)'
              }}>
                {currentQ.prompt}
              </p>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected 
                        ? `2px solid ${isPostTest ? 'var(--gold-500)' : 'var(--emerald-500)'}` 
                        : '1px solid var(--border-light)',
                      background: isSelected 
                        ? (isPostTest ? 'var(--gold-50)' : 'var(--emerald-50)') 
                        : 'var(--bg-secondary)',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.15s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: isSelected 
                        ? `2px solid ${isPostTest ? 'var(--gold-500)' : 'var(--emerald-500)'}` 
                        : '2px solid var(--border-light)',
                      background: isSelected 
                        ? (isPostTest ? 'var(--gold-500)' : 'var(--emerald-500)') 
                        : 'transparent',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span style={{
                      fontSize: '0.92rem',
                      color: isSelected 
                        ? (isPostTest ? 'var(--gold-600)' : 'var(--emerald-700)') 
                        : 'var(--text-primary)',
                      fontWeight: isSelected ? 600 : 400
                    }}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Finished / Results Screen */
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Score Showcase */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(245, 158, 11, 0.1) 100%)',
              padding: '24px',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              border: '1px solid var(--border-glass)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                boxShadow: 'var(--shadow-md)',
                marginBottom: '12px',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: isPostTest ? 'var(--gold-500)' : 'var(--emerald-500)'
              }}>
                {resultData.score}%
              </div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {resultData.score >= 80 ? (
                  <>
                    <Award size={22} color="var(--gold-500)" />
                    <span>Pemahaman Sangat Baik!</span>
                  </>
                ) : resultData.score >= 60 ? (
                  <>
                    <CheckCircle2 size={22} color="var(--emerald-500)" />
                    <span>Capaian Bagus, Lanjutkan Belajar!</span>
                  </>
                ) : (
                  <>
                    <BookOpen size={22} color="var(--accent-rose)" />
                    <span>Perlu Penguatan Materi Dasar</span>
                  </>
                )}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Anda berhasil menjawab benar <strong>{resultData.correctCount}</strong> dari <strong>{resultData.totalQuestions}</strong> butir soal standar.
              </p>

              {/* KPI Pilot Comparison for Post-Test */}
              {isPostTest && preTestScore !== null && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}>
                  <TrendingUp size={20} color="var(--emerald-500)" />
                  <span style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    Skor Pre-Test: <strong>{preTestScore}%</strong>
                    <ArrowRight size={14} color="var(--text-muted)" />
                    Skor Post-Test: <strong>{resultData.score}%</strong>
                  </span>
                  <span className={`badge ${deltaScore >= 15 ? 'badge-emerald' : 'badge-gold'}`}>
                    Delta: {deltaScore >= 0 ? `+${deltaScore}%` : `${deltaScore}%`}
                  </span>
                </div>
              )}
            </div>

            {/* Competency Breakdown */}
            <div>
              <h5 style={{ fontSize: '0.95rem', marginBottom: '10px' }}>Analisis Penguasaan per Kompetensi:</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(resultData.competencyStats).map(([comp, stat]) => {
                  const pct = Math.round((stat.correct / stat.total) * 100);
                  return (
                    <div key={comp} style={{
                      padding: '10px 14px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>{comp}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          {stat.correct}/{stat.total} Benar
                        </span>
                        <span className={`badge ${pct >= 70 ? 'badge-emerald' : 'badge-gold'}`} style={{ minWidth: '55px', justifyContent: 'center' }}>
                          {pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question Review Accordion */}
            <div>
              <h5 style={{ fontSize: '0.95rem', marginBottom: '8px' }}>Pembahasan Jawaban:</h5>
              <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {PRE_POST_TEST_QUESTIONS.map((q, idx) => {
                  const userAns = selectedAnswers[q.id];
                  const isCorrect = userAns === q.correctIndex;
                  return (
                    <div key={q.id} style={{
                      padding: '10px 12px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        {isCorrect ? (
                          <CheckCircle2 size={16} color="var(--emerald-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        ) : (
                          <XCircle size={16} color="var(--accent-rose)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        )}
                        <div>
                          <strong>{idx + 1}. {q.prompt}</strong>
                          <div style={{ color: isCorrect ? 'var(--emerald-600)' : 'var(--accent-rose)', marginTop: '2px' }}>
                            Jawaban Anda: {q.options[userAns] || "Tidak dijawab"}
                          </div>
                          {!isCorrect && (
                            <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                              Kunci: {q.options[q.correctIndex]}
                            </div>
                          )}
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', background: 'var(--bg-primary)', padding: '6px 8px', borderRadius: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                            <Lightbulb size={13} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--gold-500)' }} />
                            <span>{q.explanation}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-light)',
          background: 'var(--bg-tertiary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0 0 var(--radius-xl) var(--radius-xl)'
        }}>
          {!isFinished ? (
            <>
              <button
                type="button"
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="btn btn-secondary btn-sm"
                style={{ opacity: currentIndex === 0 ? 0.4 : 1 }}
              >
                Sebelumnya
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={selectedAnswers[currentQ.id] === undefined}
                className={`btn ${isPostTest ? 'btn-gold' : 'btn-primary'}`}
                style={{ opacity: selectedAnswers[currentQ.id] === undefined ? 0.5 : 1 }}
              >
                <span>{currentIndex < totalQuestions - 1 ? "Soal Berikutnya" : "Selesaikan Pengukuran"}</span>
                <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={handleRestart} className="btn btn-outline btn-sm">
                <RotateCcw size={14} />
                <span>Ulangi Tes</span>
              </button>
              <button type="button" onClick={onClose} className="btn btn-primary">
                Tutup & Lihat Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
