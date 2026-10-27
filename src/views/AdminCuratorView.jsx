// Admin & Kurasi Konten Basis Pengetahuan (PRD FR-11 & FR-02)
import React, { useState } from 'react';
import {
  ShieldCheck,
  BookOpen,
  Plus,
  FileEdit,
  CheckCircle,
  Archive,
  AlertCircle,
  Clock,
  Eye,
  ExternalLink,
  Search,
  Flag,
  UserCheck,
  ArrowLeftRight,
  X
} from 'lucide-react';
import { KNOWLEDGE_BASE_DOCS } from '../data/knowledgeBase';
import { storageService } from '../services/storageService';

export default function AdminCuratorView({ onOpenCitation }) {
  const [activeSubTab, setActiveSubTab] = useState("DOCS"); // "DOCS", "FEEDBACK", "LOGS"
  const [docsList, setDocsList] = useState(KNOWLEDGE_BASE_DOCS);
  const [searchDocQuery, setSearchDocQuery] = useState("");
  const [feedbackReports, setFeedbackReports] = useState(storageService.getFeedbackReports());
  const [auditLogs, setAuditLogs] = useState(storageService.getAuditLogs());
  const [newDocModal, setNewDocModal] = useState(false);

  // Form New Draft Doc
  const [newTitle, setNewTitle] = useState("");
  const [newPublisher, setNewPublisher] = useState("Dewan Syariah Nasional - MUI");
  const [newCategory, setNewCategory] = useState("Akad & Pembiayaan");
  const [newSummary, setNewSummary] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newTags, setNewTags] = useState("");

  const filteredDocs = docsList.filter(d =>
    d.title.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
    d.publisher.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
    d.id.toLowerCase().includes(searchDocQuery.toLowerCase())
  );

  const handleToggleDocStatus = (docId) => {
    const updated = docsList.map(d => {
      if (d.id === docId) {
        const nextStatus = d.status === "Terbit" ? "Arsip" : "Terbit";
        storageService.logAudit("DOC_STATUS_CHANGE", `Mengubah status dokumen ${docId} menjadi ${nextStatus}`);
        return { ...d, status: nextStatus };
      }
      return d;
    });
    setDocsList(updated);
    setAuditLogs(storageService.getAuditLogs());
  };

  const handleCreateNewDoc = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDoc = {
      id: "CUSTOM-" + Date.now().toString().slice(-4),
      publisher: newPublisher,
      title: newTitle,
      category: newCategory,
      version: "1.0-Draf Reviewer",
      reviewedAt: new Date().toISOString().slice(0, 10),
      reviewer: "Reviewer Syariah Internal (Admin)",
      status: "Draf",
      url: "#",
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      summary: newSummary,
      contentExcerpt: newExcerpt || newSummary
    };

    const updated = [newDoc, ...docsList];
    setDocsList(updated);
    storageService.logAudit("DOC_CREATED", `Menambahkan draf dokumen baru: ${newDoc.title} (${newDoc.id})`);
    setAuditLogs(storageService.getAuditLogs());

    // Reset Form
    setNewTitle("");
    setNewSummary("");
    setNewExcerpt("");
    setNewTags("");
    setNewDocModal(false);
  };

  const handleResolveFeedback = (reportId) => {
    const updated = feedbackReports.map(r => {
      if (r.id === reportId) {
        return { ...r, status: "SELESAI_DITINJAU" };
      }
      return r;
    });
    setFeedbackReports(updated);
    storageService.logAudit("FEEDBACK_RESOLVED", `Laporan pengguna ${reportId} telah ditindaklanjuti reviewer`);
    setAuditLogs(storageService.getAuditLogs());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      {/* Admin Header */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '24px 28px',
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
            <span className="badge badge-emerald">Portal Admin & Reviewer</span>
            <span className="badge badge-gold">FR-11 Content Management</span>
          </div>
          <h2 style={{ fontSize: '1.45rem', marginTop: '6px' }}>Kurasi Basis Pengetahuan & Audit Kepatuhan</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '2px' }}>
            Kelola dokumen referensi resmi DSN-MUI/OJK, tinjau laporan akurasi respon AI dari pengguna, dan pantau log audit.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setNewDocModal(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>Tambah Dokumen Rujukan</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="scrollable-tabs-row" style={{
        background: 'var(--bg-tertiary)',
        padding: '6px',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <button
          onClick={() => setActiveSubTab("DOCS")}
          className={`btn btn-sm ${activeSubTab === "DOCS" ? 'btn-primary' : ''}`}
          style={{ flexShrink: 0 }}
        >
          <BookOpen size={15} />
          <span>Dokumen Terkurasi ({docsList.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab("FEEDBACK")}
          className={`btn btn-sm ${activeSubTab === "FEEDBACK" ? 'btn-primary' : ''}`}
          style={{ flexShrink: 0 }}
        >
          <Flag size={15} />
          <span>Antrean Laporan Pengguna ({feedbackReports.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab("LOGS")}
          className={`btn btn-sm ${activeSubTab === "LOGS" ? 'btn-primary' : ''}`}
          style={{ flexShrink: 0 }}
        >
          <Clock size={15} />
          <span>Audit Log ({auditLogs.length})</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: DOKUMEN TERKURASI */}
      {/* ============================================================== */}
      {activeSubTab === "DOCS" && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Search bar & Mobile scroll hint */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%', maxWidth: '360px' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px' }} />
              <input
                type="text"
                value={searchDocQuery}
                onChange={e => setSearchDocQuery(e.target.value)}
                placeholder="Cari fatwa, kode, atau penerbit..."
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-secondary)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
            <div className="mobile-only" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ArrowLeftRight size={13} />
              <span>Geser tabel untuk melihat seluruh kolom</span>
            </div>
          </div>

          {/* Table of Documents */}
          <div className="table-responsive-wrapper glass-card" style={{ padding: '0' }}>
            <table style={{ minWidth: '700px', width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 16px', minWidth: '220px' }}>Kode & Judul Dokumen</th>
                  <th style={{ padding: '12px 16px', minWidth: '150px' }}>Penerbit</th>
                  <th style={{ padding: '12px 16px' }}>Kategori</th>
                  <th style={{ padding: '12px 16px' }}>Versi & Reviewer</th>
                  <th style={{ padding: '12px 16px' }}>Status RAG</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', minWidth: '130px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map(doc => {
                  const isPublished = doc.status === "Terbit";
                  return (
                    <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{doc.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                          ID: {doc.id}
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                        {doc.publisher}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span className="badge badge-outline" style={{ fontSize: '0.72rem' }}>
                          {doc.category}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '0.8rem' }}>
                        <div>{doc.version || "1.0"}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{doc.reviewedAt}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span className={`badge ${isPublished ? 'badge-emerald' : 'badge-gold'}`} style={{ fontSize: '0.72rem' }}>
                          {doc.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => onOpenCitation(doc)}
                            className="btn btn-secondary btn-sm"
                            title="Pratinjau Dokumen"
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            onClick={() => handleToggleDocStatus(doc.id)}
                            className={`btn btn-sm ${isPublished ? 'btn-outline' : 'btn-primary'}`}
                            title={isPublished ? "Tarik dari RAG (Arsip)" : "Terbitkan ke RAG"}
                          >
                            {isPublished ? <Archive size={13} /> : <CheckCircle size={13} />}
                            <span style={{ fontSize: '0.75rem' }}>{isPublished ? "Arsipkan" : "Terbitkan"}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: ANTREAN LAPORAN PENGGUNA (FEEDBACK QUEUE) */}
      {/* ============================================================== */}
      {activeSubTab === "FEEDBACK" && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Laporan pengguna atas jawaban AI yang dinilai ambigu, kurang akurat, atau memerlukan penyesuaian rujukan fiqih (PRD FR-02 Kriteria 5).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {feedbackReports.map(report => (
              <div
                key={report.id}
                className="glass-card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                      {report.type}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {report.timestamp}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    Pertanyaan: "{report.query}"
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Alasan Laporan: {report.reason}
                  </div>
                </div>

                <div style={{ flexShrink: 0 }}>
                  {report.status === "SELESAI_DITINJAU" ? (
                    <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                      Selesai Ditinjau
                    </span>
                  ) : (
                    <button
                      onClick={() => handleResolveFeedback(report.id)}
                      className="btn btn-primary btn-sm"
                    >
                      <UserCheck size={14} />
                      <span>Tandai Selesai Tinjau</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 3: AUDIT LOGS */}
      {/* ============================================================== */}
      {activeSubTab === "LOGS" && (
        <div className="table-responsive-wrapper glass-card" style={{ padding: '0' }}>
          <table style={{ minWidth: '580px', width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 16px', minWidth: '150px' }}>Waktu Audit</th>
                <th style={{ padding: '12px 16px', minWidth: '140px' }}>Aksi Sistem</th>
                <th style={{ padding: '12px 16px' }}>Rincian Perubahan</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.78rem' }}>
                    {log.timestamp}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                    {log.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Tambah Dokumen Rujukan Baru */}
      {newDocModal && (
        <div className="modal-overlay" onClick={() => setNewDocModal(false)}>
          <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px' }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h3 style={{ fontSize: '1.08rem' }}>Tambah Dokumen Rujukan Baru</h3>
              <button onClick={() => setNewDocModal(false)} className="btn-icon" style={{ color: 'var(--text-muted)' }} aria-label="Tutup">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateNewDoc} style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  Judul Fatwa / Regulasi Resmi:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Contoh: Fatwa DSN-MUI No. XX/DSN-MUI/2026..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                    Lembaga Penerbit:
                  </label>
                  <select
                    value={newPublisher}
                    onChange={e => setNewPublisher(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-primary)'
                    }}
                  >
                    <option value="Dewan Syariah Nasional - MUI (DSN-MUI)">DSN-MUI</option>
                    <option value="Otoritas Jasa Keuangan (OJK)">Otoritas Jasa Keuangan (OJK)</option>
                    <option value="Badan Amil Zakat Nasional (BAZNAS RI)">BAZNAS RI</option>
                    <option value="Bank Indonesia (BI)">Bank Indonesia (BI)</option>
                    <option value="Mahkamah Agung (KHES)">Mahkamah Agung (KHES)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                    Kategori Materi:
                  </label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-primary)'
                    }}
                  >
                    <option value="Akad & Pembiayaan">Akad & Pembiayaan</option>
                    <option value="Zakat & Filantropi">Zakat & Filantropi</option>
                    <option value="Regulasi Perbankan">Regulasi Perbankan</option>
                    <option value="Fintech & Digital">Fintech & Digital</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  Ringkasan Ketentuan:
                </label>
                <textarea
                  rows={3}
                  required
                  value={newSummary}
                  onChange={e => setNewSummary(e.target.value)}
                  placeholder="Ringkasan poin utama fatwa..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  Petikan Teks Resmi / Pasal untuk Sitasi RAG:
                </label>
                <textarea
                  rows={4}
                  value={newExcerpt}
                  onChange={e => setNewExcerpt(e.target.value)}
                  placeholder="Kutipan bunyi pasal atau diktum fatwa..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  Kata Kunci Pencarian (Pisahkan dengan koma):
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  placeholder="misal: qiradh, modal, jaminan, nisbah"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setNewDocModal(false)} className="btn btn-secondary btn-sm">
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Simpan sebagai Draf Reviewer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
