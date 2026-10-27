import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

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
        parts: [{ text: msg.text }]
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
        parts: [{ text: lastUser.text }]
      });
    }
  }

  return formatted;
}

async function handleGeminiChat(messages, apiKey) {
  const models = ["gemini-3.5-flash", "gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.7-flash", "gemini-flash-latest"];
  const contents = formatMessagesForGemini(messages);

  if (contents.length === 0) {
    throw new Error("Pesan yang dikirim kosong. Silakan ketikkan pertanyaan Anda.");
  }

  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2500
        }
      };

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        const errJson = await resp.json().catch(() => ({}));
        const msg = errJson.error?.message || `HTTP ${resp.status}`;
        if (resp.status === 404 || resp.status === 503 || msg.toLowerCase().includes("not found") || msg.toLowerCase().includes("high demand")) {
          lastError = new Error(msg);
          continue;
        }
        if (resp.status === 400 && msg.includes("API_KEY_INVALID")) {
          throw new Error("API Key Google Gemini pada backend tidak valid. Silakan periksa GEMINI_API_KEY pada file .env server.");
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

function backendApiPlugin() {
  return {
    name: 'backend-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const { messages } = JSON.parse(body || '{}');
            const env = loadEnv(server.config.mode || 'development', process.cwd(), '');
            const apiKey = (env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '').trim();

            if (!apiKey) {
              res.statusCode = 500;
              return res.end(JSON.stringify({
                success: false,
                error: 'GEMINI_API_KEY belum dikonfigurasi di file .env backend server. Silakan masukkan GEMINI_API_KEY di file .env.'
              }));
            }

            const reply = await handleGeminiChat(messages, apiKey);
            res.statusCode = 200;
            return res.end(JSON.stringify({ success: true, reply }));
          } catch (err) {
            console.error('[Backend API Error]', err);
            res.statusCode = 500;
            return res.end(JSON.stringify({ success: false, error: err.message || 'Internal Server Error' }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), backendApiPlugin()],
})
