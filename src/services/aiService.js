// Service Komunikasi Frontend ke Backend AI (/api/chat)
// Didukung Vercel Serverless Function (/api/chat.js) dan fallback otomatis.

const SYSTEM_INSTRUCTION = `Kamu adalah SYARIAH-AI, asisten kecerdasan buatan cerdas, teliti, dan pakar edukasi keuangan syariah untuk Generasi Z serta masyarakat luas.

Prinsip Utama:
1. WAJIB RELEVAN: Jawab pertanyaan pengguna secara akurat, langsung pada inti permasalahan yang ditanyakan. JANGAN PERNAH memberikan jawaban di luar konteks pertanyaan atau berhalusinasi.
2. Jika ditanya sapaan santai (seperti "Halo", "Hai", "Apa kabar"), jawablah dengan ramah dan tanyakan apa topik keuangan syariah yang ingin dieksplorasi hari ini.
3. Jika ditanya konsep fiqih muamalah, jelaskan akad yang relevan secara gamblang (seperti Mudharabah, Musyarakah, Murabahah, Wadiah, Ijarah, Salam, Istishna', dll), dan sebutkan rujukan Fatwa DSN-MUI atau regulasi OJK bila ada.
4. KEPENULISAN MATEMATIKA: Jika ditanya perhitungan (misalnya bagi hasil Mudharabah, simulasi KPR, hisab zakat mal emas 85g, nisbah, atau proporsi bagi untung/rugi), jabarkan perhitungannya secara matematis, runtut langkah demi langkah dengan angka yang jelas. Kamu bisa menggunakan notasi matematika rapi atau rumus blok LaTeX ($$...$$ / $...$). Pastikan rumus tertata jelas, bersih, dan mudah dibaca.
5. Gunakan format Markdown yang indah dan mudah dibaca: gunakan sub-judul, bullet points, dan cetak tebal untuk poin penting.
6. Berikan disclaimer edukasi singkat bahwa penjelasan ini bertujuan edukatif dan konsultatif, bukan fatwa hukum mengikat secara individu.
7. Selalu gunakan Bahasa Indonesia yang santun, hangat, profesional, dan mudah dipahami.`;

function formatMessagesForGemini(rawMessages) {
  const validMessages = (rawMessages || []).filter(m => {
    if (!m.text || !m.text.trim()) return false;
    if (m.id === 'msg-welcome') return false;
    if (m.id && m.id.startsWith('msg-err')) return false;
    return true;
  });

  const formatted = [];
  for (const msg of validMessages) {
    const role = msg.sender === 'user' ? 'user' : 'model';

    if (formatted.length === 0) {
      if (role !== 'user') continue;
      formatted.push({
        role: 'user',
        parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n[Pertanyaan Pengguna]\n${msg.text}` }]
      });
      continue;
    }

    const prev = formatted[formatted.length - 1];
    if (prev.role === role) {
      prev.parts[0].text += `\n\n${msg.text}`;
    } else {
      formatted.push({
        role,
        parts: [{ text: msg.text }]
      });
    }
  }

  if (formatted.length === 0) {
    const lastUser = [...(rawMessages || [])].reverse().find(m => m.sender === 'user');
    if (lastUser) {
      formatted.push({
        role: 'user',
        parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n[Pertanyaan Pengguna]\n${lastUser.text}` }]
      });
    }
  }

  return formatted;
}

async function directGeminiChat(messages, apiKey) {
  const models = [
    "gemini-3.1-flash-lite",
    "gemini-3-flash-preview",
    "gemini-3.5-flash",
    "gemini-3.6-flash",
    "gemini-flash-latest"
  ];
  const contents = formatMessagesForGemini(messages);

  if (contents.length === 0) {
    throw new Error("Pesan yang dikirim kosong. Silakan ketikkan pertanyaan Anda.");
  }

  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents
      };

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000)
      });

      if (!resp.ok) {
        const errJson = await resp.json().catch(() => ({}));
        const msg = errJson.error?.message || `HTTP ${resp.status}`;
        if (
          resp.status === 404 ||
          resp.status === 503 ||
          msg.toLowerCase().includes("not found") ||
          msg.toLowerCase().includes("high demand") ||
          msg.toLowerCase().includes("no longer available")
        ) {
          lastError = new Error(msg);
          continue;
        }
        if (resp.status === 400 && msg.includes("API_KEY_INVALID")) {
          throw new Error("API Key Google Gemini tidak valid. Silakan periksa kembali API Key Anda.");
        }
        if (resp.status === 429) {
          throw new Error("Batas kuota Gemini API tercapai (Rate Limit 15 RPM). Silakan tunggu sebentar lalu coba lagi.");
        }
        throw new Error(`Gemini API Error (${model}): ${msg}`);
      }

      const data = await resp.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    } catch (err) {
      if (err.message.includes("API Key") || err.message.includes("Batas kuota")) {
        throw err;
      }
      lastError = err;
    }
  }

  throw lastError || new Error("Gagal menerima respon dari Google Gemini API.");
}

const getFallbackKey = () => {
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
  if (envKey) return envKey;
  try {
    return atob('QVEuQWI4Uk42S091UEhsM2ZSOGVkNTJEeDctRFlFTWtqQkdrY2pydDhPRjlKQXN0X0lVdXc=');
  } catch {
    return '';
  }
};

/**
 * Kirim percakapan ke backend endpoint /api/chat
 */
export async function sendChatMessage(messages) {
  let response;
  let fetchError = null;

  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    });
  } catch (err) {
    fetchError = err;
  }

  // Jika fetch berhasil dan mengembalikan respons
  if (response) {
    let data = {};
    try {
      data = await response.json();
    } catch {
      // Body bukan JSON (kemungkinan HTML 404/500 dari hosting)
    }

    if (response.ok && data.success && data.reply) {
      return data.reply;
    }

    // Jika server backend mengalami kendala atau kunci belum diset di Vercel,
    // gunakan direct client fallback secara mulus
    const fallbackKey = getFallbackKey();
    if (fallbackKey) {
      try {
        return await directGeminiChat(messages, fallbackKey);
      } catch (directErr) {
        console.warn("Direct fallback error:", directErr);
      }
    }

    // Jika fallback gagal juga, tampilkan error spesifik
    if (data.error) {
      throw new Error(data.error);
    }

    if (response.status === 404) {
      throw new Error(
        "Endpoint /api/chat tidak ditemukan (HTTP 404). Pastikan file api/chat.js dan vercel.json telah ter-deploy di Vercel."
      );
    }

    throw new Error(`Server Error (HTTP ${response.status})`);
  }

  // Jika network fetch gagal (koneksi terputus / offline), coba direct call
  const fallbackKey = getFallbackKey();
  if (fallbackKey) {
    try {
      return await directGeminiChat(messages, fallbackKey);
    } catch (directErr) {
      console.warn("Direct fallback error:", directErr);
    }
  }

  throw new Error(fetchError?.message || "Gagal menghubungi server AI. Periksa koneksi internet Anda.");
}
