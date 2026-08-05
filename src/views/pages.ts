const STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #e2e8f0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 16px;
    padding: 48px;
    max-width: 480px;
    width: 100%;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  }
  h1 { font-size: 1.75rem; margin-bottom: 8px; color: #f8fafc; }
  .subtitle { color: #94a3b8; margin-bottom: 32px; line-height: 1.5; }
  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    padding: 14px 24px;
    background: #fff;
    color: #1e293b;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .google-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  .google-icon { width: 20px; height: 20px; }
  .error {
    background: #7f1d1d;
    border: 1px solid #991b1b;
    color: #fecaca;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    font-size: 0.9rem;
  }
  .dashboard-header { margin-bottom: 32px; }
  .user-email {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #0f172a;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
  }
  .avatar {
    width: 40px; height: 40px;
    background: #3b82f6;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; color: #fff;
  }
  .status { color: #94a3b8; font-size: 0.875rem; margin-top: 4px; }
  .actions { display: flex; flex-direction: column; gap: 12px; }
  .btn {
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    text-align: center;
    text-decoration: none;
    display: block;
  }
  .btn-primary { background: #3b82f6; color: #fff; }
  .btn-primary:hover { background: #2563eb; }
  .btn-secondary { background: #334155; color: #e2e8f0; }
  .btn-secondary:hover { background: #475569; }
  .btn-danger { background: transparent; color: #f87171; border: 1px solid #7f1d1d; }
  .info-box {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    font-size: 0.875rem;
    color: #94a3b8;
    line-height: 1.6;
  }
  .info-box strong { color: #e2e8f0; }
  form { display: contents; }
  .wide .card { max-width: 720px; }
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
  }
  .topbar h1 { margin: 0; font-size: 1.5rem; }
  .topbar-actions { display: flex; gap: 8px; align-items: center; }
  .btn-sm {
    padding: 8px 14px;
    font-size: 0.85rem;
    border-radius: 6px;
    text-decoration: none;
    border: none;
    cursor: pointer;
  }
  .email-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .email-item {
    display: block;
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 14px 16px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s;
  }
  .email-item:hover { border-color: #3b82f6; }
  .email-item.unread { border-left: 3px solid #3b82f6; }
  .email-row { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 4px; }
  .email-from { font-weight: 600; color: #f8fafc; font-size: 0.95rem; }
  .email-date { color: #64748b; font-size: 0.8rem; white-space: nowrap; }
  .email-subject { color: #e2e8f0; font-size: 0.9rem; margin-bottom: 4px; }
  .email-snippet { color: #94a3b8; font-size: 0.85rem; line-height: 1.4;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .empty { text-align: center; color: #94a3b8; padding: 32px; }
  .message-meta { margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #334155; }
  .message-meta div { margin-bottom: 6px; color: #94a3b8; font-size: 0.9rem; }
  .message-meta strong { color: #e2e8f0; }
  .message-body {
    white-space: pre-wrap;
    line-height: 1.6;
    color: #cbd5e1;
    font-size: 0.95rem;
    max-height: 400px;
    overflow-y: auto;
  }
  .automation-box {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #334155;
  }
  .automation-box summary {
    cursor: pointer;
    color: #94a3b8;
    font-size: 0.85rem;
    margin-bottom: 12px;
  }
`;

function layout(title: string, body: string, wide = false): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Gmail Inbox Agent</title>
  <style>${STYLES}</style>
</head>
<body class="${wide ? "wide" : ""}">
  <div class="card">${body}</div>
</body>
</html>`;
}

export function loginPage(error?: string): string {
  const errorBlock = error
    ? `<div class="error">${escapeHtml(error)}</div>`
    : "";

  return layout(
    "Iniciar sesión",
    `
    <h1>Gmail Inbox Agent</h1>
    <p class="subtitle">
      Conecta tu cuenta de Google para revisar y analizar correos
      con automatizaciones de Cursor Agents.
    </p>
    ${errorBlock}
    <a href="/auth/google" class="google-btn">
      <svg class="google-icon" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Iniciar sesión con Google
    </a>
  `,
  );
}

export interface InboxPageOptions {
  email: string;
  messages: Array<{
    messageId: string;
    from: string;
    subject: string;
    snippet: string;
    receivedAt: string;
    isUnread: boolean;
  }>;
  cursorConfigured: boolean;
  pubsubConfigured: boolean;
  error?: string;
}

export function inboxPage(opts: InboxPageOptions): string {
  const errorBlock = opts.error
    ? `<div class="error">${escapeHtml(opts.error)}</div>`
    : "";

  const list =
    opts.messages.length === 0
      ? `<div class="empty">No hay correos en tu bandeja de entrada.</div>`
      : `<ul class="email-list">${opts.messages
          .map(
            (m) => `
        <li>
          <a href="/inbox/${escapeHtml(m.messageId)}" class="email-item${m.isUnread ? " unread" : ""}">
            <div class="email-row">
              <span class="email-from">${escapeHtml(shortFrom(m.from))}</span>
              <span class="email-date">${escapeHtml(formatDate(m.receivedAt))}</span>
            </div>
            <div class="email-subject">${escapeHtml(m.subject)}</div>
            <div class="email-snippet">${escapeHtml(m.snippet)}</div>
          </a>
        </li>`,
          )
          .join("")}</ul>`;

  const automationSection = `
    <details class="automation-box">
      <summary>Automatización avanzada (opcional)</summary>
      <div class="info-box" style="margin-top:12px">
        Solo necesitas esto si quieres que un agente de Cursor procese correos automáticamente al llegar.<br><br>
        Pub/Sub: ${opts.pubsubConfigured ? "✓ configurado" : "✗ no configurado"}<br>
        Cursor webhook: ${opts.cursorConfigured ? "✓ configurado" : "✗ no configurado"}
      </div>
      ${opts.pubsubConfigured ? `<form method="post" action="/dashboard/activate-watch"><button type="submit" class="btn btn-secondary btn-sm">Activar vigilancia automática</button></form>` : ""}
    </details>
  `;

  return layout(
    "Bandeja",
    `
    <div class="topbar">
      <h1>Bandeja de entrada</h1>
      <div class="topbar-actions">
        <a href="/inbox" class="btn btn-secondary btn-sm">Actualizar</a>
        <form method="post" action="/auth/logout" style="display:inline">
          <button type="submit" class="btn btn-danger btn-sm">Salir</button>
        </form>
      </div>
    </div>
    <p class="subtitle" style="margin-bottom:20px">${escapeHtml(opts.email)}</p>
    ${errorBlock}
    ${list}
    ${automationSection}
  `,
    true,
  );
}

export interface MessagePageOptions {
  email: string;
  message: {
    from: string;
    to: string;
    subject: string;
    receivedAt: string;
    bodyText: string;
    gmailLink: string;
  };
  error?: string;
}

export function messagePage(opts: MessagePageOptions): string {
  const { message } = opts;
  return layout(
    message.subject,
    `
    <div class="topbar">
      <a href="/inbox" class="btn btn-secondary btn-sm">← Volver</a>
      <form method="post" action="/auth/logout" style="display:inline">
        <button type="submit" class="btn btn-danger btn-sm">Salir</button>
      </form>
    </div>
    <h1 style="font-size:1.25rem;margin-bottom:16px">${escapeHtml(message.subject)}</h1>
    <div class="message-meta">
      <div><strong>De:</strong> ${escapeHtml(message.from)}</div>
      <div><strong>Para:</strong> ${escapeHtml(message.to)}</div>
      <div><strong>Fecha:</strong> ${escapeHtml(formatDate(message.receivedAt))}</div>
      <div><a href="${escapeHtml(message.gmailLink)}" target="_blank" rel="noopener" style="color:#3b82f6">Abrir en Gmail</a></div>
    </div>
    <div class="message-body">${escapeHtml(message.bodyText || "(sin contenido de texto)")}</div>
  `,
    true,
  );
}

function shortFrom(from: string): string {
  const match = from.match(/^"?([^"<]+)"?\s*</);
  return match?.[1]?.trim() || from.split("@")[0] || from;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("es-ES", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export interface DashboardOptions {
  email: string;
  watchConfigured: boolean;
  watchExpiration?: string | null;
  cursorConfigured: boolean;
  pubsubConfigured: boolean;
  message?: string;
  error?: string;
}

export function dashboardPage(opts: DashboardOptions): string {
  const initial = opts.email.charAt(0).toUpperCase();
  const notice = opts.message
    ? `<div class="info-box" style="border-color:#166534;background:#14532d33;color:#bbf7d0">${escapeHtml(opts.message)}</div>`
    : "";
  const errorBlock = opts.error
    ? `<div class="error">${escapeHtml(opts.error)}</div>`
    : "";

  const configStatus = `
    <div class="info-box">
      <strong>Estado de configuración</strong><br>
      Gmail conectado: ✓ ${escapeHtml(opts.email)}<br>
      Pub/Sub: ${opts.pubsubConfigured ? "✓ configurado" : "✗ falta PUBSUB_TOPIC en .env"}<br>
      Cursor webhook: ${opts.cursorConfigured ? "✓ configurado" : "✗ falta CURSOR_WEBHOOK_URL en .env"}<br>
      ${opts.watchConfigured ? `Watch activo hasta: ${opts.watchExpiration ?? "desconocido"}` : "Watch Gmail: no activado"}
    </div>
  `;

  const watchButton = opts.pubsubConfigured
    ? `<form method="post" action="/dashboard/activate-watch"><button type="submit" class="btn btn-primary">Activar vigilancia de bandeja (Gmail Watch)</button></form>`
    : "";

  return layout(
    "Panel",
    `
    <div class="dashboard-header">
      <h1>Panel de control</h1>
      <p class="subtitle">Tu cuenta está conectada y lista para procesar correos.</p>
    </div>
    ${errorBlock}
    ${notice}
    <div class="user-email">
      <div class="avatar">${initial}</div>
      <div>
        <div>${escapeHtml(opts.email)}</div>
        <div class="status">Sesión activa con Google</div>
      </div>
    </div>
    ${configStatus}
    <div class="actions">
      ${watchButton}
      <form method="post" action="/auth/logout">
        <button type="submit" class="btn btn-danger">Cerrar sesión</button>
      </form>
    </div>
  `,
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
