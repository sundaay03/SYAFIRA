// SYARIAH-AI — Main Application Shell (PRD v1.0)
import React, { useState, useEffect } from 'react';
import { Sparkles, Award, Target, CheckCircle2, TrendingUp } from 'lucide-react';
import Navbar from './components/Navbar';
import OnboardingModal from './components/OnboardingModal';
import PrePostTestModal from './components/PrePostTestModal';
import CitationModal from './components/CitationModal';
import DashboardView from './views/DashboardView';
import ChatAssistantView from './views/ChatAssistantView';
import LearningModulesView from './views/LearningModulesView';
import SimulatorView from './views/SimulatorView';
import AnalyticsView from './views/AnalyticsView';
import ProductExplorerView from './views/ProductExplorerView';
import AdminCuratorView from './views/AdminCuratorView';
import { storageService } from './services/storageService';

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profile, setProfile] = useState(() => storageService.getProfile());
  const [progress, setProgress] = useState(() => storageService.getProgress());
  const [assessmentData, setAssessmentData] = useState(() => storageService.getAssessmentData());
  const [selectedModuleId, setSelectedModuleId] = useState(() => {
    const prog = storageService.getProgress();
    return prog.lastAccessedModuleId || "mod-01";
  });

  // Accessibility States
  const [fontScale, setFontScale] = useState(() => {
    return localStorage.getItem("syariah_ai_font_scale") || "md";
  });
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  // Modals
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => !profile.hasCompletedOnboarding);
  const [testModalState, setTestModalState] = useState({ isOpen: false, type: "PRE" });
  const [selectedCitationDoc, setSelectedCitationDoc] = useState(null);

  // Toast Notification
  const [toast, setToast] = useState(null);

  // Ensure Dark Mode is permanent
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem("syariah_ai_theme", "dark");
  }, []);

  // Sync Font Scale with DOM
  useEffect(() => {
    document.body.className = `font-scale-${fontScale}`;
    localStorage.setItem("syariah_ai_font_scale", fontScale);
  }, [fontScale]);

  const showToast = (message, type = "gold", icon = null) => {
    setToast({ message, type, icon });
    setTimeout(() => setToast(null), 3000);
  };

  const handleProfileUpdated = (newProfile) => {
    const updated = { ...profile, ...newProfile };
    storageService.saveProfile(updated);
    setProfile(updated);
    showToast("Profil belajar berhasil diperbarui!", "emerald", <CheckCircle2 size={16} />);
  };

  const handleAwardXP = (amount) => {
    const res = storageService.addXP(amount);
    setProfile(storageService.getProfile());
    if (res.leveledUp) {
      showToast(`Naik Level! Sekarang Anda Level ${res.newLevel}!`, "gold", <TrendingUp size={16} />);
    } else {
      showToast(`+${amount} XP Diperoleh!`, "emerald", <Sparkles size={16} />);
    }
  };

  const handleResetToNewUser = () => {
    const fresh = storageService.resetProfileToLevel1();
    setProfile(fresh);
    setProgress(storageService.getProgress());
    setAssessmentData(storageService.getAssessmentData());
    showToast("Profil berhasil diatur ulang ke Level 1 (Anak Baru)!", "emerald", <CheckCircle2 size={16} />);
  };

  const handleSelectModule = (modId) => {
    setSelectedModuleId(modId);
    const updated = { ...progress, lastAccessedModuleId: modId };
    storageService.saveProgress(updated);
    setProgress(updated);
  };

  const handleModuleCompleted = (modId, score) => {
    const updated = storageService.getProgress();
    setProgress(updated);
    setProfile(storageService.getProfile());
    showToast(`Modul ${modId} selesai dengan skor ${score}%!`, "emerald", <Award size={16} />);
  };

  const handleTestCompleted = (result) => {
    setAssessmentData(storageService.getAssessmentData());
    setProfile(storageService.getProfile());
    showToast(`Hasil ${result.type === 'POST' ? 'Post-Test' : 'Pre-Test'} tersimpan (Skor: ${result.score}%)!`, "gold", <Target size={16} />);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="islamic-bg-pattern">
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '60px',
          right: '20px',
          zIndex: 9999,
          background: toast.type === 'emerald' ? 'var(--emerald-600)' : 'var(--gold-500)',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          fontWeight: 700,
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.25s ease-out'
        }}>
          {toast.icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{toast.icon}</span>}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onResetToNewUser={handleResetToNewUser}
      />

      {/* Main Content Area */}
      <main className="app-main-content" style={{
        flex: 1,
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '24px 16px 40px'
      }}>
        {/* Pages are kept mounted so user progress, state, and inputs are never reset on tab switch */}
        <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
          <DashboardView
            profile={profile}
            progress={progress}
            assessmentData={assessmentData}
            setActiveTab={setActiveTab}
            onSelectModule={(modId) => {
              handleSelectModule(modId);
              setActiveTab('learning');
            }}
            onStartPreTest={() => setTestModalState({ isOpen: true, type: "PRE" })}
            onStartPostTest={() => setTestModalState({ isOpen: true, type: "POST" })}
            onOpenCitation={doc => setSelectedCitationDoc(doc)}
          />
        </div>

        <div style={{ display: activeTab === 'chat' ? 'block' : 'none' }}>
          <ChatAssistantView
            onOpenCitation={doc => setSelectedCitationDoc(doc)}
            onAwardXP={handleAwardXP}
          />
        </div>

        <div style={{ display: activeTab === 'learning' ? 'block' : 'none' }}>
          <LearningModulesView
            progress={progress}
            selectedModuleId={selectedModuleId}
            onSelectModule={handleSelectModule}
            onModuleCompleted={handleModuleCompleted}
            onOpenCitation={doc => setSelectedCitationDoc(doc)}
            isAudioEnabled={isAudioEnabled}
            onAwardXP={handleAwardXP}
          />
        </div>

        <div style={{ display: activeTab === 'simulator' ? 'block' : 'none' }}>
          <SimulatorView
            onAwardXP={handleAwardXP}
          />
        </div>

        <div style={{ display: activeTab === 'results' ? 'block' : 'none' }}>
          <AnalyticsView
            assessmentData={assessmentData}
            onStartPreTest={() => setTestModalState({ isOpen: true, type: "PRE" })}
            onStartPostTest={() => setTestModalState({ isOpen: true, type: "POST" })}
            setActiveTab={setActiveTab}
          />
        </div>

        <div style={{ display: activeTab === 'products' ? 'block' : 'none' }}>
          <ProductExplorerView />
        </div>

        <div style={{ display: activeTab === 'admin' ? 'block' : 'none' }}>
          <AdminCuratorView
            onOpenCitation={doc => setSelectedCitationDoc(doc)}
          />
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        padding: '26px 16px 20px',
        marginTop: 'auto',
        fontSize: '0.84rem',
        color: 'var(--text-secondary)'
      }}>
        <div className="app-footer-inner" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <img
                src="/logo/icon.webp"
                alt="SYAFIRA"
                style={{ width: '24px', height: '24px', borderRadius: '4px', objectFit: 'contain' }}
              />
              <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                SYAFIRA
              </strong>
              <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
                Syariah Financial Literacy
              </span>
            </div>
            <p style={{ maxWidth: '640px', lineHeight: 1.5, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Inovasi Teknologi Edukasi Keuangan Syariah untuk Meningkatkan Inklusi dan Literasi Keuangan Masyarakat. Berlandaskan fatwa resmi DSN-MUI, POJK, UU Zakat No. 23/2011, dan Kompilasi Hukum Ekonomi Syariah (KHES).
            </p>
          </div>

          <div className="app-footer-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem' }}>
              <button onClick={() => setActiveTab('admin')} style={{ color: 'var(--emerald-600)', textDecoration: 'underline' }}>
                Admin & Reviewer Hub
              </button>
              <button onClick={() => setActiveTab('results')} style={{ color: 'var(--emerald-600)', textDecoration: 'underline' }}>
                Privasi & Kontrol Data
              </button>
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              © 2026 Tim Pengembang SYAFIRA. Hak cipta dilindungi.
            </span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onStartPreTest={() => setTestModalState({ isOpen: true, type: "PRE" })}
        onProfileUpdated={handleProfileUpdated}
        onResetToNewUser={handleResetToNewUser}
        profile={profile}
      />

      <PrePostTestModal
        isOpen={testModalState.isOpen}
        type={testModalState.type}
        preTestScore={assessmentData.preTest ? assessmentData.preTest.score : null}
        onClose={() => setTestModalState({ isOpen: false, type: "PRE" })}
        onCompleted={handleTestCompleted}
      />

      <CitationModal
        doc={selectedCitationDoc}
        onClose={() => setSelectedCitationDoc(null)}
      />
    </div>
  );
}
