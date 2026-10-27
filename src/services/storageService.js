// LocalStorage & Session Service (PRD FR-01, FR-06, FR-11)

const STORAGE_KEYS = {
  USER_PROFILE: "syariah_ai_user_profile",
  MODULE_PROGRESS: "syariah_ai_module_progress",
  ASSESSMENT_DATA: "syariah_ai_assessment_data",
  DAILY_QUESTS: "syariah_ai_daily_quests",
  FEEDBACK_REPORTS: "syariah_ai_feedback_reports",
  AUDIT_LOGS: "syariah_ai_audit_logs",
  THEME: "syariah_ai_theme",
  FONT_SCALE: "syariah_ai_font_scale"
};

const DEFAULT_PROFILE = {
  name: "Sandi Riandi",
  role: "Mahasiswa / Gen Z",
  avatar: "user-student",
  learningGoal: "Memahami Dasar & Kemitraan Usaha Syariah",
  isGuest: false,
  xp: 0,
  streakDays: 1,
  level: 1,
  badges: [],
  hasCompletedOnboarding: false,
  hasCompletedPreTest: false,
  createdAt: new Date().toISOString()
};

export const storageService = {
  getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (data) {
        const parsed = JSON.parse(data);
        let xp = typeof parsed.xp === 'number' ? parsed.xp : 0;

        // Jika ada XP artifisial akibat bug simulator switch tab sebelumnya (> 1500 tanpa modul tuntas) atau belum onboarding
        if (!parsed.hasCompletedOnboarding || xp >= 5000) {
          xp = 0;
          parsed.xp = 0;
          parsed.level = 1;
          parsed.badges = [];
          localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(parsed));
        }

        let calculatedLevel = 1;
        if (xp >= 1300) calculatedLevel = 4;
        else if (xp >= 750) calculatedLevel = 3;
        else if (xp >= 300) calculatedLevel = 2;
        parsed.level = calculatedLevel;
        parsed.xp = xp;
        return parsed;
      }
      return DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  resetProfileToLevel1() {
    const profile = this.getProfile();
    const freshProfile = {
      ...DEFAULT_PROFILE,
      name: profile.name || "Sandi Riandi",
      role: profile.role || "Mahasiswa / Gen Z",
      xp: 0,
      level: 1,
      streakDays: 1,
      badges: [],
      hasCompletedOnboarding: false,
      hasCompletedPreTest: false,
      createdAt: new Date().toISOString()
    };
    this.saveProfile(freshProfile);
    this.saveProgress({
      completedModules: [],
      quizScores: {},
      lastAccessedModuleId: "mod-01"
    });
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENT_DATA);
    try {
      sessionStorage.clear();
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('syafira_')) {
          localStorage.removeItem(key);
        }
      });
    } catch {}
    this.logAudit("PROFILE_RESET_NEW_USER", "Profil pengguna diatur ulang ke Level 1 (Anak Baru).");
    return freshProfile;
  },

  saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error("Gagal menyimpan profil:", e);
    }
  },

  addXP(amount, reason = "Aktivitas Belajar") {
    const profile = this.getProfile();
    const oldXp = profile.xp || 0;
    const newXp = oldXp + amount;

    // Hitung level baru
    let newLevel = 1;
    if (newXp >= 1300) newLevel = 4;
    else if (newXp >= 750) newLevel = 3;
    else if (newXp >= 300) newLevel = 2;

    const updated = {
      ...profile,
      xp: newXp,
      level: newLevel
    };
    this.saveProfile(updated);

    this.logAudit("XP_AWARDED", `Pengguna memperoleh +${amount} XP (${reason}). Total: ${newXp} XP.`);
    return { oldXp, newXp, oldLevel: profile.level, newLevel, leveledUp: newLevel > profile.level };
  },

  unlockBadge(badgeId) {
    const profile = this.getProfile();
    const badges = profile.badges || [];
    if (!badges.includes(badgeId)) {
      badges.push(badgeId);
      this.saveProfile({ ...profile, badges });
      this.logAudit("BADGE_UNLOCKED", `Lencana baru dibuka: ${badgeId}`);
      return true;
    }
    return false;
  },

  getProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MODULE_PROGRESS);
      return data ? JSON.parse(data) : {
        completedModules: [],
        quizScores: {},
        lastAccessedModuleId: "mod-01"
      };
    } catch {
      return { completedModules: [], quizScores: {}, lastAccessedModuleId: "mod-01" };
    }
  },

  saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEYS.MODULE_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error("Gagal menyimpan progres:", e);
    }
  },

  markModuleComplete(moduleId, score) {
    const progress = this.getProgress();
    if (!progress.completedModules.includes(moduleId)) {
      progress.completedModules.push(moduleId);
    }
    progress.quizScores[moduleId] = score;
    this.saveProgress(progress);
    this.logAudit("MODULE_COMPLETED", `Menyelesaikan modul ${moduleId} dengan skor ${score}%.`);
  },

  getAssessmentData() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_DATA);
      return data ? JSON.parse(data) : {
        preTest: null,
        postTest: null
      };
    } catch {
      return { preTest: null, postTest: null };
    }
  },

  savePreTest(result) {
    const data = this.getAssessmentData();
    data.preTest = {
      ...result,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT_DATA, JSON.stringify(data));

    // Update profile
    const profile = this.getProfile();
    profile.hasCompletedPreTest = true;
    this.saveProfile(profile);
    this.unlockBadge("badge-pretest");
    this.addXP(100, "Menyelesaikan Pre-Test Diagnostik");
    this.logAudit("PRE_TEST_COMPLETED", `Pre-test diselesaikan dengan skor ${result.score}%.`);
  },

  savePostTest(result) {
    const data = this.getAssessmentData();
    data.postTest = {
      ...result,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT_DATA, JSON.stringify(data));

    this.unlockBadge("badge-posttest");
    this.addXP(150, "Menyelesaikan Post-Test Evaluasi");
    this.logAudit("POST_TEST_COMPLETED", `Post-test diselesaikan dengan skor ${result.score}%.`);
  },

  // Feedback Laporan Kualitas AI (PRD FR-02 & FR-11)
  getFeedbackReports() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FEEDBACK_REPORTS);
      return data ? JSON.parse(data) : [
        {
          id: "rep-demo-1",
          query: "Apakah pinjol syariah aman dan dijamin LPS?",
          responseSummary: "Penjelasan status fintech P2P berizin OJK dengan fatwa 117.",
          type: "INACCURATE_OR_UNCLEAR",
          reason: "Pengguna ingin penjelasan lebih gamblang bahwa P2P tidak dijamin LPS.",
          timestamp: "2026-10-24T14:20:00.000Z",
          status: "DITINJAU"
        }
      ];
    } catch {
      return [];
    }
  },

  submitFeedback(report) {
    const reports = this.getFeedbackReports();
    const newReport = {
      id: "rep-" + Date.now(),
      ...report,
      timestamp: new Date().toISOString(),
      status: "MENUNGGU_REVIEW"
    };
    reports.unshift(newReport);
    localStorage.setItem(STORAGE_KEYS.FEEDBACK_REPORTS, JSON.stringify(reports));
    this.logAudit("FEEDBACK_SUBMITTED", `Laporan pengguna masuk antrean review reviewer (ID: ${newReport.id})`);
    return newReport;
  },

  // Audit Logs (PRD FR-11 Kriteria 3)
  getAuditLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return data ? JSON.parse(data) : [
        { id: "log-1", action: "SYSTEM_INIT", detail: "Inisialisasi sistem basis pengetahuan SYARIAH-AI v1.0", timestamp: "2026-10-26T08:00:00.000Z" },
        { id: "log-2", action: "DOC_VERIFIED", detail: "Reviewer memvalidasi Fatwa DSN-MUI No. 115 dan SK BAZNAS 2024", timestamp: "2026-10-26T08:30:00.000Z" }
      ];
    } catch {
      return [];
    }
  },

  logAudit(action, detail) {
    try {
      const logs = this.getAuditLogs();
      logs.unshift({
        id: "log-" + Date.now(),
        action,
        detail,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 50)));
    } catch (e) {
      console.warn("Gagal menulis audit log:", e);
    }
  },

  // Reset & Export Data (PRD FR-01: Privasi & Kontrol Data Pengguna)
  exportUserData() {
    return {
      profile: this.getProfile(),
      progress: this.getProgress(),
      assessment: this.getAssessmentData(),
      auditLogs: this.getAuditLogs(),
      exportedAt: new Date().toISOString(),
      system: "SYAFIRA Syariah Financial Literacy"
    };
  },

  resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.MODULE_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENT_DATA);
    localStorage.removeItem(STORAGE_KEYS.DAILY_QUESTS);
    localStorage.removeItem(STORAGE_KEYS.FEEDBACK_REPORTS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    try {
      sessionStorage.clear();
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('syafira_')) {
          localStorage.removeItem(key);
        }
      });
    } catch {}
  }
};
