// Komponen Renderer Pesan Cerdas dengan Dukungan Penuh Markdown & Notasi Matematika KaTeX
import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Render formula LaTeX menggunakan KaTeX dengan fallback aman.
 */
function renderKaTeX(latex, displayMode = false) {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml'
    });
  } catch (err) {
    // Fallback: bersihkan sintaks LaTeX mentah menjadi teks matematika yang bersih
    const cleaned = latex
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\mathbf\{([^}]+)\}/g, '$1')
      .replace(/\\mathit\{([^}]+)\}/g, '$1')
      .replace(/\\times/g, ' × ')
      .replace(/\\div/g, ' ÷ ')
      .replace(/\\cdot/g, ' · ')
      .replace(/\\pm/g, ' ± ')
      .replace(/\\le/g, ' ≤ ')
      .replace(/\\ge/g, ' ≥ ')
      .replace(/\\neq/g, ' ≠ ')
      .replace(/\\approx/g, ' ≈ ')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
      .replace(/\\%/g, '%')
      .replace(/\\,/g, ' ')
      .replace(/\\;/g, ' ')
      .replace(/\\quad/g, '  ')
      .replace(/\\qquad/g, '    ');
    return `<span class="math-fallback">${cleaned}</span>`;
  }
}

/**
 * Format string teks sebaris untuk bold, italic, inline math, dan inline code.
 */
function parseInline(text) {
  if (!text) return null;

  // Pola untuk:
  // 1. Inline math: $...$ atau \(...\)
  // 2. Bold: **...**
  // 3. Italic: *...* atau _..._
  // 4. Code: `...`
  const inlineTokenRegex = /(\$(?:[^\$\n]+)\$|\\\([^\)]+\\\)|\*\*[^*]+\*\*|(?<!\*)\*[^*]+\*(?!\*)|`[^`]+`)/g;
  const parts = text.split(inlineTokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Inline Math: $...$
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      const math = part.slice(1, -1);
      const html = renderKaTeX(math, false);
      return (
        <span
          key={idx}
          className="inline-math"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    // Inline Math: \(...\)
    if (part.startsWith('\\(') && part.endsWith('\\)') && part.length > 4) {
      const math = part.slice(2, -2);
      const html = renderKaTeX(math, false);
      return (
        <span
          key={idx}
          className="inline-math"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    // Bold: **...**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={idx} style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
          {parseInline(inner)}
        </strong>
      );
    }

    // Italic: *...*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <em key={idx} style={{ fontStyle: 'italic', opacity: 0.9 }}>
          {parseInline(inner)}
        </em>
      );
    }

    // Code: `...`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={idx}
          style={{
            background: 'var(--bg-tertiary)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.88em',
            border: '1px solid var(--border-light)'
          }}
        >
          {inner}
        </code>
      );
    }

    // Teks biasa
    return <span key={idx}>{part}</span>;
  });
}

/**
 * Komponen utama penampil pesan Markdown + LaTeX
 */
export default function FormattedMessage({ text }) {
  if (!text) return null;

  // 1. Ekstrak Display Math Blocks ($$...$$ dan \[...\])
  const normalized = text.replace(/\r\n/g, '\n');
  const mathBlockRegex = /\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\]/g;
  const blocks = [];
  let lastIndex = 0;
  let match;

  while ((match = mathBlockRegex.exec(normalized)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({
        type: 'text',
        content: normalized.substring(lastIndex, match.index)
      });
    }
    const mathContent = match[1] !== undefined ? match[1] : match[2];
    blocks.push({
      type: 'math-block',
      content: mathContent.trim()
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < normalized.length) {
    blocks.push({
      type: 'text',
      content: normalized.substring(lastIndex)
    });
  }

  return (
    <div className="formatted-message" style={{ display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.65' }}>
      {blocks.map((block, bIdx) => {
        // Blok Formula Matematika KaTeX
        if (block.type === 'math-block') {
          const mathHtml = renderKaTeX(block.content, true);
          return (
            <div
              key={bIdx}
              className="math-display-wrapper"
              style={{
                margin: '8px 0',
                padding: '12px 16px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 'var(--radius-md)',
                overflowX: 'auto',
                textAlign: 'center'
              }}
              dangerouslySetInnerHTML={{ __html: mathHtml }}
            />
          );
        }

        // Blok Teks Biasa & Markdown (baris per baris)
        const lines = block.content.split('\n');
        return (
          <div key={bIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) {
                return <div key={lIdx} style={{ height: '4px' }} />;
              }

              // Horizontal Rule (--- atau ***)
              if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
                return (
                  <hr
                    key={lIdx}
                    style={{
                      border: 'none',
                      borderTop: '1px solid var(--border-light)',
                      margin: '10px 0'
                    }}
                  />
                );
              }

              // Heading 4: #### Judul
              if (trimmed.startsWith('#### ')) {
                return (
                  <h5
                    key={lIdx}
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: 'var(--emerald-500)',
                      marginTop: '8px',
                      marginBottom: '2px'
                    }}
                  >
                    {parseInline(trimmed.slice(5))}
                  </h5>
                );
              }

              // Heading 3: ### Judul
              if (trimmed.startsWith('### ')) {
                return (
                  <h4
                    key={lIdx}
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--emerald-500)',
                      marginTop: '10px',
                      marginBottom: '4px'
                    }}
                  >
                    {parseInline(trimmed.slice(4))}
                  </h4>
                );
              }

              // Heading 2: ## Judul
              if (trimmed.startsWith('## ')) {
                return (
                  <h3
                    key={lIdx}
                    style={{
                      fontSize: '1.12rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginTop: '12px',
                      marginBottom: '6px'
                    }}
                  >
                    {parseInline(trimmed.slice(3))}
                  </h3>
                );
              }

              // Numbered List: 1. Item
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
              if (numMatch) {
                return (
                  <div
                    key={lIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      paddingLeft: '4px'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        color: 'var(--emerald-500)',
                        flexShrink: 0
                      }}
                    >
                      {numMatch[1]}.
                    </span>
                    <div style={{ flex: 1 }}>{parseInline(numMatch[2])}</div>
                  </div>
                );
              }

              // Blockquote: > Teks
              if (trimmed.startsWith('>')) {
                const quoteText = trimmed.replace(/^>\s*/, '');
                return (
                  <div
                    key={lIdx}
                    style={{
                      borderLeft: '3px solid var(--emerald-500)',
                      paddingLeft: '12px',
                      margin: '4px 0',
                      color: 'var(--text-secondary)',
                      background: 'rgba(16, 185, 129, 0.04)',
                      paddingTop: '4px',
                      paddingBottom: '4px',
                      borderRadius: '0 6px 6px 0'
                    }}
                  >
                    {parseInline(quoteText)}
                  </div>
                );
              }

              // Bullet List: - Item atau * Item
              const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
              if (bulletMatch) {
                return (
                  <div
                    key={lIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      paddingLeft: '8px'
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--emerald-500)',
                        fontWeight: 800,
                        flexShrink: 0,
                        lineHeight: '1.4'
                      }}
                    >
                      •
                    </span>
                    <div style={{ flex: 1 }}>{parseInline(bulletMatch[1])}</div>
                  </div>
                );
              }

              // Paragraf / Baris Teks Reguler
              return (
                <p key={lIdx} style={{ margin: 0 }}>
                  {parseInline(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
