// Top Navigation Bar & Accessibility Controls (PRD FR-01, FR-06, FR-09, FR-11)
import React, { useState } from 'react';
import {
  Home,
  MessageSquare,
  BookOpen,
  Calculator,
  BarChart3,
  Compass,
  ShieldAlert,
  Menu,
  X,
  User,
  Settings,
  RotateCcw
} from 'lucide-react';
import { LEVEL_TIERS } from '../data/defaultQuests';

export default function Navbar({
  activeTab,
  setActiveTab,
  profile,
  onOpenOnboarding,
  onResetToNewUser
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Cari level info
  const currentLevelInfo = LEVEL_TIERS.find(t => t.level === profile.level) || LEVEL_TIERS[0];
  const nextLevelInfo = LEVEL_TIERS.find(t => t.level === (profile.level + 1)) || LEVEL_TIERS[LEVEL_TIERS.length - 1];

  // XP progress calculation
  const xpCurrentLevel = profile.xp - currentLevelInfo.minXp;
  const xpRange = Math.max(1, (nextLevelInfo.minXp || 1300) - currentLevelInfo.minXp);
  const xpPercent = Math.min(100, Math.max(0, Math.round((xpCurrentLevel / xpRange) * 100)));

  const navLinks = [
    { id: "dashboard", label: "Beranda", icon: Home },
    { id: "chat", label: "Tanya AI", icon: MessageSquare },
    { id: "learning", label: "Belajar", icon: BookOpen },
    { id: "simulator", label: "Simulasi", icon: Calculator },
    { id: "results", label: "Hasil Belajar", icon: BarChart3 },
    { id: "products", label: "Produk Syariah", icon: Compass },
    { id: "admin", label: "Admin & Kurasi", icon: ShieldAlert }
  ];



  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-glass-strong)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-light)',
      transition: 'all 0.3s'
    }}>
      {/* Top Banner Disclaimer */}
      <div style={{
        background: 'linear-gradient(90deg, #064e3b 0%, #065f46 50%, #047857 100%)',
        color: '#ecfdf5',
        fontSize: '0.75rem',
        padding: '4px 16px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 500
      }}>
        <span>SYAFIRA | Platform Edukasi Keuangan Syariah</span>
      </div>

      <div className="navbar-container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        {/* Logo and Brand */}
        <div
          onClick={() => setActiveTab('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
        >
          <img
            src="/logo/icon.webp"
            alt="SYAFIRA Logo"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              objectFit: 'contain',
              boxShadow: 'var(--shadow-glow)',
              flexShrink: 0
            }}
          />
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.05rem',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              display: 'block',
              lineHeight: 1.1
            }}>
              SYAFIRA
            </span>
            <div className="brand-subtitle" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1, marginTop: '2px', whiteSpace: 'nowrap' }}>
              Syariah Financial Literacy
            </div>
          </div>
        </div>

        {/* Desktop Nav Tabs */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '4px'
        }} className="desktop-nav">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--emerald-600)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--emerald-50)' : 'transparent',
                  transition: 'all 0.15s'
                }}
              >
                <Icon size={16} color={isActive ? 'var(--emerald-500)' : 'currentColor'} />
                <span>{link.label}</span>
                {link.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    background: isActive ? 'var(--emerald-200)' : 'var(--bg-tertiary)',
                    color: isActive ? 'var(--emerald-800)' : 'var(--text-muted)'
                  }}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Gamification Pill & Accessibility */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {/* User Level & XP Pill - Desktop Only */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              title="Klik untuk melihat level atau reset ke Level 1"
              className="desktop-only"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-secondary)',
                border: profileDropdownOpen ? '1px solid var(--emerald-500)' : '1px solid var(--border-light)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'var(--emerald-100)',
                color: 'var(--emerald-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={15} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--emerald-600)' }}>
                    Lv.{profile.level} {currentLevelInfo.title}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '70px' }}>
                  <div style={{
                    flex: 1,
                    height: '4px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '999px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${xpPercent}%`,
                      background: 'var(--gold-500)'
                    }} />
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{profile.xp} XP</span>
                </div>
              </div>
            </div>

            {/* Level & Profile Dropdown */}
            {profileDropdownOpen && (
              <>
                <div
                  onClick={() => setProfileDropdownOpen(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                />
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '280px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '16px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'var(--emerald-100)',
                      color: 'var(--emerald-700)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800
                    }}>
                      <User size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{profile.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{profile.role}</div>
                    </div>
                  </div>

                  {/* Level Status Card */}
                  <div style={{
                    background: 'var(--bg-tertiary)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--emerald-600)' }}>
                        Lv.{profile.level} {currentLevelInfo.title}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', fontWeight: 700 }}>
                        {profile.xp} XP
                      </span>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      {currentLevelInfo.desc}
                    </p>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: 'var(--bg-primary)',
                      borderRadius: '999px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${xpPercent}%`,
                        background: 'var(--gold-500)'
                      }} />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenOnboarding();
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Ubah Preferensi Belajar
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        if (onResetToNewUser) onResetToNewUser();
                      }}
                      className="btn btn-outline btn-sm"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        color: 'var(--accent-rose)',
                        borderColor: 'rgba(244, 63, 94, 0.4)',
                        fontSize: '0.78rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <RotateCcw size={13} />
                      <span>Reset ke Level 1 (Anak Baru)</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>




          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon btn-secondary mobile-menu-btn"
            style={{ width: '34px', height: '34px', flexShrink: 0 }}
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-light)',
          padding: '14px 16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {/* User Profile Card in Mobile Drawer */}
          <div
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOnboarding();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-light)',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--emerald-100)',
                color: 'var(--emerald-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--emerald-600)' }}>
                  Lv.{profile.level} {currentLevelInfo.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                  <div style={{
                    width: '90px',
                    height: '5px',
                    background: 'var(--border-light)',
                    borderRadius: '999px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${xpPercent}%`,
                      background: 'var(--gold-500)'
                    }} />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{profile.xp} XP ({xpPercent}%)</span>
                </div>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--emerald-600)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Settings size={13} />
              <span>Edit</span>
            </span>
          </div>



          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: isActive ? 'var(--emerald-50)' : 'transparent',
                    color: isActive ? 'var(--emerald-600)' : 'var(--text-primary)',
                    fontWeight: isActive ? 700 : 500,
                    border: isActive ? '1px solid var(--emerald-200)' : '1px solid transparent'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={18} />
                    <span style={{ fontSize: '0.92rem' }}>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Desktop navigation responsive media query styling */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
