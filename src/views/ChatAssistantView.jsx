// AI Syariah Assistant (Frontend Murni Terhubung ke Backend /api/chat)
// Tidak ada form pengaturan, tidak ada pemaparan API Key di frontend.
import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Bot,
  User,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Zap,
  HelpCircle
} from 'lucide-react';
import { sendChatMessage } from '../services/aiService';
import { storageService } from '../services/storageService';
import FormattedMessage from '../components/FormattedMessage';

const SUGGESTED_QUESTIONS = [
  "Apa perbedaan mendasar bank syariah dan bank konvensional?",
  "Bagaimana cara bagi hasil akad Mudharabah jika modal 25 juta laba 5 juta?",
  "Mengapa cicilan KPR Syariah Murabahah bersifat tetap dan tidak naik?",
  "Berapa nisab zakat mal emas 85 gram dan bagaimana cara hisabnya?",
  "Bagaimana hukum kartu kredit syariah dan paylater menurut DSN-MUI?",
  "Bagaimana hukum trading saham syariah dan aset kripto menurut MUI?",
  "Apakah pinjol P2P syariah aman dan dijamin LPS?",
  "Bagaimana hukum asuransi konvensional vs asuransi syariah (takaful)?"
];

const DEFAULT_WELCOME_MESSAGE = {
  id: "msg-welcome",
  sender: "ai",
  text: `**Assalamu'alaikum! Selamat datang di SYAFIRA.**
      
Saya adalah asisten kecerdasan buatan cerdas untuk edukasi **Syariah Financial Literacy** dan fiqih muamalah.
      
Seluruh jawaban diproses secara cerdas dan mendalam secara langsung dari server AI kami.
      
*Silakan ajukan pertanyaan seputar perbankan syariah, perhitungan bagi hasil Mudharabah/Musyarakah, hisab zakat mal, KPR syariah, investasi halal, atau topik keuangan syariah lainnya.*`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export default function ChatAssistantView({ onAwardXP }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('syafira_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Gagal memuat pesan chat dari sessionStorage", e);
    }
    return [DEFAULT_WELCOME_MESSAGE];
  });

  const [inputQuery, setInputQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  useEffect(() => {
    try {
      sessionStorage.setItem('syafira_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.warn("Gagal menyimpan riwayat chat ke sessionStorage", e);
    }
  }, [messages]);

  const handleResetChat = () => {
    const defaultList = [DEFAULT_WELCOME_MESSAGE];
    setMessages(defaultList);
    try {
      sessionStorage.removeItem('syafira_chat_history');
    } catch (e) {}
    if (speakingId && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
  };

  const handleSpeak = (msgId, text) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/\$\$[\s\S]*?\$\$/g, (m) => {
        return m
          .replace(/\\text\{([^}]+)\}/g, '$1')
          .replace(/\\mathbf\{([^}]+)\}/g, '$1')
          .replace(/\\times/g, ' kali ')
          .replace(/\\%/g, ' persen ')
          .replace(/[\$\\]/g, '');
      })
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/[*_#>`\\]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
    setSpeakingId(msgId);
  };

  const handleCopy = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (queryToSend) => {
    const query = queryToSend || inputQuery;
    if (!query.trim() || isThinking) return;

    if (speakingId && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }

    const userMessageId = "msg-" + Date.now();
    const updatedMessages = [
      ...messages,
      {
        id: userMessageId,
        sender: "user",
        text: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(updatedMessages);
    setInputQuery("");
    setIsThinking(true);

    try {
      // Panggil endpoint backend /api/chat
      const replyText = await sendChatMessage(updatedMessages);

      const aiMessageId = "msg-ai-" + Date.now();
      setMessages([
        ...updatedMessages,
        {
          id: aiMessageId,
          sender: "ai",
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      // Gamifikasi XP
      storageService.unlockBadge("badge-chat");
      if (onAwardXP) onAwardXP(40, "Tanya AI Syariah");

    } catch (err) {
      console.error("AI Chat Error:", err);
      const errMsg = err.message || "Gagal mendapatkan respon dari server AI.";

      setMessages([
        ...updatedMessages,
        {
          id: "msg-err-" + Date.now(),
          sender: "ai",
          text: `**Kendala Sistem AI:**\n${errMsg}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleFeedback = (messageId, type) => {
    setFeedbackGiven(prev => ({ ...prev, [messageId]: type }));
    storageService.logAudit("AI_CHAT_FEEDBACK", `Pengguna memberi reaksi ${type} pada pesan ${messageId}`);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100dvh - 140px)',
      minHeight: '480px',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-light)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-md)'
    }} className="animate-fade-in">
      {/* Top Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-light)',
        background: 'var(--bg-tertiary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/logo/icon.webp"
            alt="SYAFIRA"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              objectFit: 'contain',
              boxShadow: 'var(--shadow-glow)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>SYAFIRA AI</h3>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                <Zap size={11} /> Online
              </span>
            </div>
            <div className="desktop-only" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Syariah Financial Literacy — Asisten Edukasi Fiqih Muamalah & Keuangan Syariah
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={handleResetChat}
            className="btn btn-outline btn-sm"
            title="Bersihkan riwayat percakapan"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px' }}
          >
            <RotateCcw size={14} />
            <span className="desktop-only">Reset Chat</span>
          </button>
        </div>
      </div>

      {/* Messages Body */}
      <div
        ref={chatContainerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'var(--bg-primary)'
        }}
      >
        {messages.map(msg => {
          const isAi = msg.sender === 'ai';
          const feedback = feedbackGiven[msg.id];
          const isCopied = copiedId === msg.id;
          const isSpeaking = speakingId === msg.id;

          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '8px',
                alignSelf: isAi ? 'flex-start' : 'flex-end',
                maxWidth: isAi ? '92%' : '86%',
                flexDirection: isAi ? 'row' : 'row-reverse'
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isAi ? 'var(--emerald-500)' : 'var(--bg-tertiary)',
                color: isAi ? '#ffffff' : 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid var(--border-light)'
              }}>
                {isAi ? <Bot size={16} /> : <User size={16} />}
              </div>

              {/* Message Bubble Container */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                alignItems: isAi ? 'flex-start' : 'flex-end',
                width: '100%'
              }}>
                <div style={{
                  padding: '12px 14px',
                  borderRadius: isAi ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                  background: isAi ? 'var(--bg-secondary)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: isAi ? 'var(--text-primary)' : '#ffffff',
                  border: isAi ? '1px solid var(--border-light)' : 'none',
                  boxShadow: 'var(--shadow-sm)',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  whiteSpace: isAi ? 'normal' : 'pre-line',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere'
                }}>
                  {isAi ? <FormattedMessage text={msg.text} /> : <div>{msg.text}</div>}
                </div>

                {/* Actions: Copy, Audio Reader, Feedback */}
                {isAi && msg.id !== "msg-welcome" && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '4px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{msg.timestamp}</span>

                    <button
                      onClick={() => handleSpeak(msg.id, msg.text)}
                      title={isSpeaking ? "Hentikan Suara" : "Dengarkan Jawaban"}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isSpeaking ? 'var(--emerald-500)' : 'var(--text-muted)',
                        padding: '2px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem'
                      }}
                    >
                      {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      <span>{isSpeaking ? "Hening" : "Dengarkan"}</span>
                    </button>

                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      title="Salin jawaban"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isCopied ? 'var(--emerald-500)' : 'var(--text-muted)',
                        padding: '2px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem'
                      }}
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{isCopied ? "Tersalin!" : "Salin"}</span>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => handleFeedback(msg.id, 'THUMBS_UP')}
                        title="Jawaban akurat & membantu"
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: feedback === 'THUMBS_UP' ? 'var(--emerald-500)' : 'var(--text-muted)',
                          padding: '2px'
                        }}
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, 'THUMBS_DOWN')}
                        title="Jawaban kurang memuaskan"
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: feedback === 'THUMBS_DOWN' ? 'var(--accent-rose)' : 'var(--text-muted)',
                          padding: '2px'
                        }}
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Real-time Thinking Animation */}
        {isThinking && (
          <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start', maxWidth: '80%' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--emerald-500)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Bot size={18} />
            </div>
            <div style={{
              padding: '16px 20px',
              borderRadius: '4px 20px 20px 20px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Sparkles size={18} className="animate-spin" color="var(--emerald-500)" />
              <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                AI sedang merumuskan jawaban generatif cerdas...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions Carousel */}
      <div className="scrollable-tabs-row" style={{
        padding: '10px 16px',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={13} color="var(--gold-500)" />
          <span>Contoh Pertanyaan:</span>
        </span>
        {SUGGESTED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(q)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-light)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s'
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div style={{
        padding: '12px 14px',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Tanyakan topik fiqih muamalah, hisab zakat, perbankan syariah..."
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            fontSize: '0.92rem'
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputQuery.trim() || isThinking}
          className="btn btn-primary"
          style={{
            padding: '12px 16px',
            opacity: (!inputQuery.trim() || isThinking) ? 0.5 : 1,
            flexShrink: 0
          }}
          aria-label="Kirim Pesan"
        >
          <span className="desktop-only">Kirim</span>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
