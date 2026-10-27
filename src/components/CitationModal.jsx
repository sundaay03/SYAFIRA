// Modal Rujukan Resmi / Sitasi Dokumen Terverifikasi (PRD FR-02 & FR-11)
import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck, Calendar, UserCheck, X } from 'lucide-react';

export default function CitationModal({ doc, onClose }) {
  if (!doc) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--emerald-50)',
              color: 'var(--emerald-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <BookOpen size={22} />
            </div>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '4px' }}>
                <ShieldCheck size={13} /> {doc.status || "Terverifikasi Reviewer"}
              </span>
              <h3 style={{ fontSize: '1.15rem', lineHeight: '1.4' }}>{doc.title}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="btn-icon"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Tutup modal rujukan"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 'clamp(16px, 4vw, 24px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Metadata Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
            gap: '12px',
            background: 'var(--bg-tertiary)',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Penerbit Resmi</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '2px' }}>{doc.publisher}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Versi / Kode Dokumen</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '2px' }}>{doc.version || doc.id}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Tanggal Tinjauan Reviewer</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} color="var(--emerald-500)" /> {doc.reviewedAt || "2026-09-01"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Reviewer Ahli</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <UserCheck size={14} color="var(--emerald-500)" /> {doc.reviewer || "Komite Ahli Syariah"}
              </div>
            </div>
          </div>

          {/* Ringkasan */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: 'var(--emerald-600)' }}>Ringkasan Substansi:</h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{doc.summary}</p>
          </div>

          {/* Kutipan Resmi Lengkap */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: 'var(--emerald-600)' }}>Petikan Teks Resmi Terverifikasi:</h4>
            <div style={{
              background: 'var(--bg-primary)',
              borderLeft: '4px solid var(--emerald-500)',
              padding: '16px',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              whiteSpace: 'pre-line',
              color: 'var(--text-primary)',
              maxHeight: '220px',
              overflowY: 'auto'
            }}>
              {doc.contentExcerpt}
            </div>
          </div>

          {/* Tags */}
          {doc.tags && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {doc.tags.map(t => (
                <span key={t} className="badge badge-outline" style={{ fontSize: '0.75rem' }}>
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

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
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Status basis data: Terverifikasi dan siap diakses RAG
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            {doc.url && (
              <a 
                href={doc.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Buka Rujukan Asli</span>
                <ExternalLink size={14} />
              </a>
            )}
            <button onClick={onClose} className="btn btn-primary btn-sm">
              Selesai Membaca
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
