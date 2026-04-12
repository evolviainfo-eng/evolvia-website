/* ============================================================
   Evolvia — AI Chatbot Widget
   Backend: n8n → Groq (llama-3.3-70b, free tier)
   Voice in: Web Speech API (Chrome/Edge)
   Voice out: SpeechSynthesis API (all modern browsers)
   ============================================================ */
(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────────────── */
  var WEBHOOK     = 'https://evolvia23324.app.n8n.cloud/webhook/evolvia-chat';
  var WELCOME_MSG = 'Sveiki! Esu Evolvia AI asistentas. Klauskite apie AI automatizavimą, svetainių kūrimą ar konsultacijas — atsakysiu iš karto.';

  /* ── Feature detection ──────────────────────────────────── */
  var SpeechRec  = window.SpeechRecognition || window.webkitSpeechRecognition;
  var hasVoiceIn  = !!SpeechRec;
  var hasVoiceOut = !!window.speechSynthesis;

  /* ── State ──────────────────────────────────────────────── */
  var isOpen      = false;
  var isBusy      = false;
  var isListening = false;
  var voiceOut    = false;
  var recognition = null;

  /* ── CSS ────────────────────────────────────────────────── */
  var css = [
    '#ec-wrap,#ec-wrap * {',
    '  box-sizing:border-box; margin:0; padding:0;',
    '  font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
    '}',

    /* Toggle button */
    '#ec-btn {',
    '  position:fixed; bottom:24px; right:24px; z-index:9100;',
    '  width:56px; height:56px; border-radius:50%;',
    '  background:#B8913A; border:none; cursor:pointer;',
    '  display:flex; align-items:center; justify-content:center;',
    '  box-shadow:0 4px 24px rgba(184,145,58,.45),0 2px 8px rgba(0,0,0,.5);',
    '  transition:transform .2s,box-shadow .2s;',
    '}',
    '#ec-btn:hover { transform:scale(1.07); box-shadow:0 6px 32px rgba(184,145,58,.55),0 2px 8px rgba(0,0,0,.5); }',
    '#ec-btn svg { width:24px; height:24px; color:#0A0807; transition:opacity .15s; }',
    '#ec-btn .ico-open  { display:block; }',
    '#ec-btn .ico-close { display:none; }',
    '.ec-open #ec-btn .ico-open  { display:none; }',
    '.ec-open #ec-btn .ico-close { display:block; }',

    /* Panel */
    '#ec-panel {',
    '  position:fixed; bottom:92px; right:24px; z-index:9099;',
    '  width:360px; max-height:540px;',
    '  display:flex; flex-direction:column;',
    '  background:#0E0C0B; border:1px solid rgba(255,255,255,.07);',
    '  border-radius:16px; overflow:hidden;',
    '  box-shadow:0 24px 64px rgba(0,0,0,.65),0 0 0 1px rgba(184,145,58,.07);',
    '  opacity:0; transform:translateY(14px) scale(.97);',
    '  pointer-events:none;',
    '  transition:opacity .25s ease,transform .25s ease;',
    '}',
    '.ec-open #ec-panel {',
    '  opacity:1; transform:translateY(0) scale(1); pointer-events:all;',
    '}',
    '@media (max-width:400px){',
    '  #ec-panel { width:calc(100vw - 24px); right:12px; bottom:80px; }',
    '  #ec-btn   { right:16px; bottom:16px; }',
    '}',

    /* Header */
    '#ec-head {',
    '  display:flex; align-items:center; gap:10px;',
    '  padding:13px 14px; flex-shrink:0;',
    '  background:#161410; border-bottom:1px solid rgba(255,255,255,.07);',
    '}',
    '.ec-av {',
    '  width:34px; height:34px; border-radius:50%; flex-shrink:0;',
    '  background:linear-gradient(135deg,#B8913A 0%,#7A5E22 100%);',
    '  display:flex; align-items:center; justify-content:center;',
    '  font-size:11px; font-weight:700; color:#0A0807; letter-spacing:.03em;',
    '}',
    '.ec-hinfo { flex:1; }',
    '.ec-hname { display:block; font-size:13px; font-weight:600; color:#F2F2F5; }',
    '.ec-hstat { display:flex; align-items:center; gap:4px; font-size:11px; color:#4ade80; }',
    '.ec-hdot  { width:6px; height:6px; border-radius:50%; background:#4ade80; }',
    '#ec-vol {',
    '  width:30px; height:30px; flex-shrink:0; cursor:pointer;',
    '  background:none; border:1px solid rgba(255,255,255,.08); border-radius:8px;',
    '  display:flex; align-items:center; justify-content:center;',
    '  color:rgba(242,242,245,.4); transition:all .15s;',
    '}',
    '#ec-vol svg { width:14px; height:14px; }',
    '#ec-vol:hover { color:#B8913A; border-color:rgba(184,145,58,.35); }',
    '#ec-vol.on { color:#B8913A; border-color:rgba(184,145,58,.45); background:rgba(184,145,58,.1); }',

    /* Messages */
    '#ec-msgs {',
    '  flex:1; overflow-y:auto; padding:14px;',
    '  display:flex; flex-direction:column; gap:10px;',
    '}',
    '#ec-msgs::-webkit-scrollbar { width:3px; }',
    '#ec-msgs::-webkit-scrollbar-thumb { background:rgba(255,255,255,.09); border-radius:2px; }',
    '.ec-m { display:flex; flex-direction:column; max-width:86%; }',
    '.ec-bot { align-self:flex-start; }',
    '.ec-usr { align-self:flex-end; }',
    '.ec-bub {',
    '  padding:9px 13px; font-size:13.5px; line-height:1.55;',
    '}',
    '.ec-bot .ec-bub {',
    '  background:#1E1B16; border:1px solid rgba(255,255,255,.07); color:#F2F2F5;',
    '  border-radius:4px 12px 12px 12px;',
    '}',
    '.ec-usr .ec-bub {',
    '  background:#B8913A; color:#0A0807; font-weight:500;',
    '  border-radius:12px 4px 12px 12px;',
    '}',

    /* Typing dots */
    '.ec-dots { display:flex; gap:5px; align-items:center; padding:13px 15px; }',
    '.ec-dots span {',
    '  width:6px; height:6px; border-radius:50%;',
    '  background:rgba(242,242,245,.35);',
    '  animation:ec-b 1.2s ease-in-out infinite;',
    '}',
    '.ec-dots span:nth-child(2) { animation-delay:.2s; }',
    '.ec-dots span:nth-child(3) { animation-delay:.4s; }',
    '@keyframes ec-b {',
    '  0%,60%,100% { transform:translateY(0); opacity:.35; }',
    '  30% { transform:translateY(-5px); opacity:1; }',
    '}',

    /* Input bar */
    '#ec-bar {',
    '  display:flex; align-items:center; gap:7px;',
    '  padding:11px 12px; flex-shrink:0;',
    '  background:#161410; border-top:1px solid rgba(255,255,255,.07);',
    '}',
    '#ec-inp {',
    '  flex:1; background:#1E1B16;',
    '  border:1px solid rgba(255,255,255,.08); border-radius:10px;',
    '  padding:8px 11px; font-size:13px; color:#F2F2F5; outline:none;',
    '  transition:border-color .15s;',
    '}',
    '#ec-inp::placeholder { color:rgba(242,242,245,.28); }',
    '#ec-inp:focus { border-color:rgba(184,145,58,.4); }',
    '#ec-mic,#ec-snd {',
    '  width:36px; height:36px; flex-shrink:0; border-radius:10px; cursor:pointer;',
    '  border:none; display:flex; align-items:center; justify-content:center;',
    '  transition:background .15s,transform .1s;',
    '}',
    '#ec-mic {',
    '  background:#1E1B16; border:1px solid rgba(255,255,255,.08);',
    '  color:rgba(242,242,245,.45);',
    '}',
    '#ec-mic:hover { color:#B8913A; border-color:rgba(184,145,58,.35); }',
    '#ec-mic.on {',
    '  background:rgba(184,145,58,.12); border-color:rgba(184,145,58,.5); color:#B8913A;',
    '  animation:ec-p 1.2s ease-in-out infinite;',
    '}',
    '@keyframes ec-p {',
    '  0%,100% { box-shadow:0 0 0 0 rgba(184,145,58,.3); }',
    '  50% { box-shadow:0 0 0 6px rgba(184,145,58,0); }',
    '}',
    '#ec-mic svg,#ec-snd svg { width:16px; height:16px; }',
    '#ec-snd { background:#B8913A; color:#0A0807; }',
    '#ec-snd:hover { background:#96712A; }',
    '#ec-snd:active { transform:scale(.93); }',
    '#ec-snd:disabled { opacity:.55; cursor:not-allowed; }',

    /* Footer label */
    '#ec-foot {',
    '  font-size:10px; color:rgba(242,242,245,.16); text-align:center;',
    '  padding:4px 0 7px; background:#161410; letter-spacing:.06em;',
    '}'
  ].join('\n');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── HTML ───────────────────────────────────────────────── */
  var wrap = document.createElement('div');
  wrap.id = 'ec-wrap';

  var volBtn = hasVoiceOut
    ? '<button id="ec-vol" title="Garsinis atsakymas" aria-pressed="false">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    + '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>'
    + '<path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>'
    + '</svg></button>'
    : '';

  var micBtn = hasVoiceIn
    ? '<button id="ec-mic" title="Kalbėti" aria-label="Balso įvestis">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>'
    + '<path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>'
    + '<line x1="12" y1="19" x2="12" y2="23"></line>'
    + '<line x1="8" y1="23" x2="16" y2="23"></line>'
    + '</svg></button>'
    : '';

  wrap.innerHTML =
    '<button id="ec-btn" aria-label="Atidaryti Evolvia AI pokalbį" aria-expanded="false">'
    + '<svg class="ico-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>'
    + '</svg>'
    + '<svg class="ico-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">'
    + '<line x1="18" y1="6" x2="6" y2="18"></line>'
    + '<line x1="6" y1="6" x2="18" y2="18"></line>'
    + '</svg>'
    + '</button>'
    + '<div id="ec-panel" role="dialog" aria-label="Evolvia AI pokalbis" aria-hidden="true">'
    +   '<div id="ec-head">'
    +     '<div class="ec-av">AI</div>'
    +     '<div class="ec-hinfo">'
    +       '<span class="ec-hname">Evolvia AI</span>'
    +       '<span class="ec-hstat"><span class="ec-hdot"></span>Online</span>'
    +     '</div>'
    +     volBtn
    +   '</div>'
    +   '<div id="ec-msgs" aria-live="polite" aria-relevant="additions"></div>'
    +   '<div id="ec-bar">'
    +     '<input id="ec-inp" type="text" placeholder="Rašykite klausimą..." autocomplete="off" maxlength="500" />'
    +     micBtn
    +     '<button id="ec-snd" aria-label="Siųsti">'
    +       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">'
    +       '<line x1="22" y1="2" x2="11" y2="13"></line>'
    +       '<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>'
    +       '</svg>'
    +     '</button>'
    +   '</div>'
    +   '<div id="ec-foot">Evolvia AI &nbsp;·&nbsp; Groq</div>'
    + '</div>';

  document.body.appendChild(wrap);

  /* ── DOM refs ───────────────────────────────────────────── */
  var btn   = document.getElementById('ec-btn');
  var panel = document.getElementById('ec-panel');
  var msgs  = document.getElementById('ec-msgs');
  var inp   = document.getElementById('ec-inp');
  var snd   = document.getElementById('ec-snd');
  var mic   = document.getElementById('ec-mic');
  var vol   = document.getElementById('ec-vol');

  /* ── Open / Close ───────────────────────────────────────── */
  function open() {
    isOpen = true;
    wrap.classList.add('ec-open');
    btn.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    if (!msgs.children.length) addBot(WELCOME_MSG);
    setTimeout(function () { inp.focus(); }, 280);
  }

  function close() {
    isOpen = false;
    wrap.classList.remove('ec-open');
    btn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    stopListening();
  }

  btn.addEventListener('click', function () { isOpen ? close() : open(); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) close();
  });

  /* ── Messages ───────────────────────────────────────────── */
  function esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function addBot(text) {
    var el = document.createElement('div');
    el.className = 'ec-m ec-bot';
    el.innerHTML = '<div class="ec-bub">' + esc(text) + '</div>';
    msgs.appendChild(el);
    scroll();
    if (voiceOut) speak(text);
  }

  function addUser(text) {
    var el = document.createElement('div');
    el.className = 'ec-m ec-usr';
    el.innerHTML = '<div class="ec-bub">' + esc(text) + '</div>';
    msgs.appendChild(el);
    scroll();
  }

  function typing() {
    var el = document.createElement('div');
    el.className = 'ec-m ec-bot';
    el.innerHTML = '<div class="ec-bub ec-dots"><span></span><span></span><span></span></div>';
    msgs.appendChild(el);
    scroll();
    return el;
  }

  function scroll() { msgs.scrollTop = msgs.scrollHeight; }

  /* ── Send ───────────────────────────────────────────────── */
  function send() {
    var text = inp.value.trim();
    if (!text || isBusy) return;
    addUser(text);
    inp.value = '';
    isBusy = true;
    snd.disabled = true;

    var t = typing();

    fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (d) {
      t.remove();
      addBot(d.reply || 'Atsiprašome, įvyko klaida. Bandykite dar kartą.');
    })
    .catch(function () {
      t.remove();
      addBot('Nepavyko prisijungti. Parašykite mums kontaktas.html arba susisiekite tiesiogiai.');
    })
    .finally(function () {
      isBusy = false;
      snd.disabled = false;
      inp.focus();
    });
  }

  snd.addEventListener('click', send);
  inp.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });

  /* ── Voice input ────────────────────────────────────────── */
  if (hasVoiceIn && mic) {
    recognition = new SpeechRec();
    recognition.lang = 'lt-LT';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function (e) {
      var t = e.results[0][0].transcript.trim();
      if (t) { inp.value = t; send(); }
      mic.classList.remove('on');
      isListening = false;
    };

    recognition.onerror = function () {
      mic.classList.remove('on');
      isListening = false;
    };

    recognition.onend = function () {
      mic.classList.remove('on');
      isListening = false;
    };

    mic.addEventListener('click', function () {
      if (isListening) {
        stopListening();
      } else {
        try {
          recognition.start();
          mic.classList.add('on');
          isListening = true;
        } catch (err) {
          isListening = false;
        }
      }
    });
  }

  function stopListening() {
    if (recognition && isListening) {
      try { recognition.stop(); } catch (e) {}
    }
    if (mic) mic.classList.remove('on');
    isListening = false;
  }

  /* ── Voice output ───────────────────────────────────────── */
  if (hasVoiceOut && vol) {
    vol.addEventListener('click', function () {
      voiceOut = !voiceOut;
      vol.classList.toggle('on', voiceOut);
      vol.setAttribute('aria-pressed', String(voiceOut));
      if (!voiceOut) window.speechSynthesis.cancel();
    });
  }

  function speak(text) {
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'lt-LT';
    u.rate = 1.05;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  }

})();
