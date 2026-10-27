// Syariah Product Explorer (PRD FR-08)
// Katalog Edukatif Konsep Produk Keuangan Syariah di Indonesia

import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Calendar, 
  Layers,
  Info
} from 'lucide-react';
import { ISLAMIC_PRODUCTS } from '../data/productsData';

export default function ProductExplorerView() {
  const [selectedCategory, setSelectedCategory] = useState("SEMUA");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProductId, setExpandedProductId] = useState(null);

  const categories = ["SEMUA", "Perbankan", "Pembiayaan Properti", "Investasi Surat Berharga", "Pasar Modal", "Fintech Pendanaan"];

  const filteredProducts = ISLAMIC_PRODUCTS.filter(prod => {
    const matchesCat = selectedCategory === "SEMUA" || prod.category.includes(selectedCategory);
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.akad.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header Banner */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '24px 28px',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-emerald">Katalog Edukasi Produk</span>
          <span className="badge badge-outline">Bukan Promosi Komersial</span>
        </div>
        <h2 style={{ fontSize: '1.45rem', marginTop: '6px' }}>Syariah Product Explorer</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '2px', maxWidth: '750px', lineHeight: 1.5 }}>
          Pelajari konsep akad, cara kerja imbal hasil, profil risiko, dan checklist pemeriksaan sebelum Anda memilih produk keuangan syariah di Indonesia.
        </p>

        {/* Filter and Search Bar */}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Categories Pills */}
          <div className="scrollable-tabs-row" style={{ paddingBottom: '4px', width: '100%' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari akad, sukuk, KPR..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem'
              }}
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: '20px'
      }}>
        {filteredProducts.map(prod => {
          const isExpanded = expandedProductId === prod.id;

          return (
            <div 
              key={prod.id}
              className="glass-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: isExpanded ? '2px solid var(--emerald-500)' : '1px solid var(--border-light)'
              }}
            >
              <div>
                {/* Header Tag and Risk */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                  <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                    {prod.category}
                  </span>
                  <span className={`badge badge-${prod.riskBadgeColor}`} style={{ fontSize: '0.72rem' }}>
                    Risiko: {prod.riskLevel}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{prod.name}</h3>
                
                {/* Akad Tag */}
                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--emerald-600)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Layers size={14} />
                  <span>Akad: {prod.akad}</span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {prod.summary}
                </p>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{
                    marginTop: '14px',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {/* Mekanisme */}
                    <div>
                      <strong style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>Mekanisme Kerja:</strong>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.5 }}>
                        {prod.mechanism}
                      </p>
                    </div>

                    {/* Keunggulan & Risiko */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                      <div style={{ background: 'var(--emerald-50)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--emerald-700)' }}>Karakteristik Positif:</span>
                        <ul style={{ paddingLeft: '16px', fontSize: '0.78rem', color: 'var(--emerald-800)', marginTop: '2px' }}>
                          {prod.pros.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>

                      <div style={{ background: 'var(--gold-50)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--gold-600)' }}>Aspek Risiko yang Perlu Dipahami:</span>
                        <ul style={{ paddingLeft: '16px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {prod.risks.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                    </div>

                    {/* Checklist Pemeriksaan Nasabah */}
                    <div>
                      <strong style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>Checklist Sebelum Memilih:</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                        {prod.checklist.map((item, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <CheckCircle2 size={13} color="var(--emerald-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Metadata Review & Button */}
              <div style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} />
                  <span>Ditinjau: {prod.lastReviewed}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedProductId(isExpanded ? null : prod.id)}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.78rem' }}
                >
                  {isExpanded ? "Tutup Rincian" : "Pelajari Detail"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer Resmi PRD FR-08 */}
      <div className="disclaimer-banner">
        <Info size={20} color="var(--emerald-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Catatan Edukatif Kepatuhan Syariah:</strong>
          <p style={{ marginTop: '2px', lineHeight: 1.5 }}>
            Sesuai kriteria PRD FR-08, katalog ini tidak memberikan label otomatis "pasti halal" atau "bebas risiko". Pastikan Anda selalu memeriksa izin resmi OJK, rekomendasi Dewan Pengawas Syariah (DPS), serta membaca prospektus produk sebelum bertransaksi.
          </p>
        </div>
      </div>
    </div>
  );
}
