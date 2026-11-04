# SYAFIRA — Syariah Financial Literacy AI Platform

Platform edukasi interaktif kecerdasan buatan untuk literasi keuangan syariah Generasi Z & masyarakat Indonesia, dilengkapi simulasi akad fiqih muamalah, hisab zakat mal, kalkulator nisbah, kurasi fatwa DSN-MUI, dan Asisten AI cerdas berlandaskan regulasi OJK.

---

## 🚀 Panduan Deployment ke Vercel

Agar fitur **AI Syariah Assistant** dapat berfungsi secara optimal di Vercel:

### 1. Konfigurasi Environment Variable di Vercel
Karena file `.env` diabaikan oleh Git demi alasan keamanan (`.gitignore`), Anda perlu menambahkan API Key Google Gemini pada dashboard Vercel:

1. Buka dashboard proyek Anda di [Vercel](https://vercel.com).
2. Masuk ke **Settings** > **Environment Variables**.
3. Tambahkan variabel berikut:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Masukkan Google Gemini API Key Anda (dapatkan gratis di [Google AI Studio](https://aistudio.google.com/app/apikey))
   - **Environments**: Centang **Production**, **Preview**, dan **Development**.
4. Klik **Save**.
5. Buka tab **Deployments** > pilih deployment terbaru > klik **Redeploy** (centang *Use existing build cache* atau tanpa cache).

---

## 🛠️ Menjalankan di Lokal (Development)

1. Clone repositori:
   ```bash
   git clone https://github.com/sundaay03/SYAFIRA.git
   cd SYAFIRA
   ```
2. Salin template `.env.example` ke `.env`:
   ```bash
   cp .env.example .env
   ```
3. Masukkan API Key Anda pada `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Install dependensi dan jalankan server:
   ```bash
   npm install
   npm run dev
   ```
5. Akses aplikasi di peramban: `http://localhost:5173`.

---

## 📁 Arsitektur AI Backend & Vercel Serverless
- `api/chat.js` — Vercel Serverless Function (Node.js runtime) yang menangani endpoint `/api/chat` secara aman di server tanpa mengekspos API Key ke client.
- `vercel.json` — Konfigurasi routing rewrite untuk Vercel agar `/api/*` langsung dieksekusi serverless function dan rute SPA tidak menghasilkan 404.
- `vite.config.js` — Vite dev middleware yang menangani `/api/chat` saat development lokal (`npm run dev`).
- `src/services/aiService.js` — Frontend client service dengan proteksi error format, deteksi status HTTP, dan cascade model Google Gemini.
