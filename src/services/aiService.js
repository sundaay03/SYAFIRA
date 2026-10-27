// Service Komunikasi Frontend ke Backend AI (/api/chat)
// Seluruh pemanggilan Google Gemini API dan API Key dikelola 100% di Backend.
// Frontend tidak menyimpan ataupun melihat API Key sama sekali.

/**
 * Kirim percakapan ke backend endpoint /api/chat
 */
export async function sendChatMessage(messages) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ messages })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Server Error (HTTP ${response.status})`);
  }

  if (!data.success || !data.reply) {
    throw new Error(data.error || "Gagal menerima jawaban dari server backend AI.");
  }

  return data.reply;
}
