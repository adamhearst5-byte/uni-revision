(function () {
  'use strict';

  /* ---------------- Data ---------------- */
  const MODULES = window.COURSE.modules;
  const BANK = window.BANK || {};
  const TOPICS = [];
  const TOPIC = {};

  function norm(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }

  MODULES.forEach(function (m) {
    m.topics.forEach(function (t) {
      t.module = m;
      const seenQ = new Set();
      t.cardItems = t.cards.map(function (c, i) { return { id: t.id + '-c' + i, q: c[0], a: c[1] }; });
      t.mcqItems = t.mcq.map(function (q, i) { seenQ.add(norm(q[0])); return { id: t.id + '-m' + i, q: q[0], o: q[1], a: q[2], e: q[3] || '' }; });
      t.blankItems = t.blanks.map(function (b, i) { return { id: t.id + '-b' + i, t: b, e: '' }; });
      const extra = BANK[t.id];
      if (extra) {
        const seenCards = new Set(t.cardItems.map(function (c) { return norm(c.q); }));
        extra.cards.forEach(function (c) { if (!seenCards.has(norm(c.q))) { seenCards.add(norm(c.q)); t.cardItems.push(c); } });
        extra.mcq.forEach(function (q) { const k = norm(q.q); if (!seenQ.has(k) || /~~~/.test(q.q)) { seenQ.add(k); t.mcqItems.push(q); } });
        const seenB = new Set(t.blankItems.map(function (b) { return norm(b.t); }));
        extra.blanks.forEach(function (b) { if (!seenB.has(norm(b.t))) { seenB.add(norm(b.t)); t.blankItems.push(b); } });
      }
      TOPICS.push(t);
      TOPIC[t.id] = t;
    });
  });
  const CARD_INDEX = {};
  TOPICS.forEach(function (t) { t.cardItems.forEach(function (c) { CARD_INDEX[c.id] = { card: c, topic: t }; }); });

  const KEY_DATES = [
    { id: 'k1', mod: 'py', date: '2026-11-02', what: 'COM161 Class Test 1', detail: 'Week 7 · 40% · about 35 multiple-choice questions, 90 minutes. Study notes allowed.', approx: true },
    { id: 'k2', mod: 'db', date: '2026-11-09', what: 'COM106 Set Exercise', detail: 'Week 8, in your lab session · 40% · 90 minutes, practical SQL Server skills.', approx: true },
    { id: 'k3', mod: 'py', date: '2026-11-09', what: 'COM161 practice coding tasks released', detail: 'Week 8 · do them all before Class Test 2.', approx: true },
    { id: 'k4', mod: 'db', date: '2026-12-11', time: '12:00', what: 'COM106 Assignment due', detail: 'Friday 12 noon · 60% · 3-page design document + 10-minute screencast.' },
    { id: 'k5', mod: 'py', date: '2026-12-14', what: 'COM161 Class Test 2', detail: 'Week 13 · 60% · practical coding under exam conditions, 90 minutes.', approx: true },
  ];

  /* ---------------- Storage ---------------- */
  const STORE_KEY = 'uni-study-v1';
  let S = { cards: {}, quiz: {}, blanks: {}, read: {}, attempts: {}, tests: [], reminders: [], days: [], done: {} };
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) S = Object.assign(S, JSON.parse(raw));
  } catch (e) { /* storage unavailable: run without saving */ }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

  /* ---------------- Dates ---------------- */
  function pad(n) { return String(n).padStart(2, '0'); }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today() { return ymd(new Date()); }
  function addDays(s, n) { const d = parseDate(s); d.setDate(d.getDate() + n); return ymd(d); }
  function parseDate(s) { const p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function daysBetween(a, b) { return Math.round((parseDate(b) - parseDate(a)) / 86400000); }
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  function nice(s) { const d = parseDate(s); return DAYS[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()]; }
  function markStudied() { const t = today(); if (S.days.indexOf(t) < 0) { S.days.push(t); S.days = S.days.slice(-400); save(); } }
  function streak() {
    let n = 0; let d = today();
    if (S.days.indexOf(d) < 0) d = addDays(d, -1);
    while (S.days.indexOf(d) >= 0) { n++; d = addDays(d, -1); }
    return n;
  }

  /* ---------------- Text rendering ---------------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function inline(s) {
    const codes = [];
    return esc(s)
      .replace(/«([^»]+)»/g, function (_, c) { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; })
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*\w])\*([^*\s][^*]*)\*(?!\w)/g, '$1<em>$2</em>')
      .replace(/\u0000(\d+)\u0000/g, function (_, i) { return '<code>' + codes[Number(i)] + '</code>'; });
  }
  // Short text: inline formatting plus ~~~ code blocks; newlines kept by CSS pre-wrap.
  function rich(s) {
    const parts = String(s).split(/\n?~~~\n?/);
    return parts.map(function (p, i) {
      if (i % 2 === 1) return '<pre class="code"><code>' + esc(p) + '</code></pre>';
      return inline(p);
    }).join('');
  }
  function md(src) {
    const lines = String(src).replace(/^\n+|\n+$/g, '').split('\n');
    let html = ''; let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (/^~~~/.test(line)) {
        const buf = []; i++;
        while (i < lines.length && !/^~~~/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        html += '<pre class="code"><code>' + esc(buf.join('\n')) + '</code></pre>';
        continue;
      }
      if (/^### /.test(line)) { html += '<h3>' + inline(line.slice(4)) + '</h3>'; i++; continue; }
      if (/^## /.test(line)) { html += '<h2>' + inline(line.slice(3)) + '</h2>'; i++; continue; }
      if (/^\|/.test(line)) {
        const rows = [];
        while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
        const cells = function (r) { return r.replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); }); };
        let t = '<div class="tablewrap"><table><thead><tr>' + cells(rows[0]).map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead><tbody>';
        rows.slice(2).forEach(function (r) { t += '<tr>' + cells(r).map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>'; });
        html += t + '</tbody></table></div>';
        continue;
      }
      if (/^- /.test(line)) {
        let b = '<ul>';
        while (i < lines.length && /^- /.test(lines[i])) { b += '<li>' + inline(lines[i].slice(2)) + '</li>'; i++; }
        html += b + '</ul>'; continue;
      }
      if (/^\d+\. /.test(line)) {
        let b = '<ol>';
        while (i < lines.length && /^\d+\. /.test(lines[i])) { b += '<li>' + inline(lines[i].replace(/^\d+\. /, '')) + '</li>'; i++; }
        html += b + '</ol>'; continue;
      }
      if (!line.trim()) { i++; continue; }
      const para = [];
      while (i < lines.length && lines[i].trim() && !/^(## |### |\||- |\d+\. |~~~)/.test(lines[i])) { para.push(lines[i]); i++; }
      html += '<p>' + inline(para.join(' ')) + '</p>';
    }
    return '<div class="md">' + html + '</div>';
  }

  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function modClass(t) { return 'mod-' + t.module.id; }
  function pct(n, d) { return d ? Math.round(100 * n / d) : 0; }

  /* ---------------- Blank answers ---------------- */
  function parseBlank(text) {
    const out = []; const re = /\{\{(.+?)\}\}/g; let last = 0; let m;
    while ((m = re.exec(text))) {
      out.push({ text: text.slice(last, m.index) });
      out.push({ answers: m[1].split('|') });
      last = re.lastIndex;
    }
    out.push({ text: text.slice(last) });
    return out;
  }
  function cleanAns(s) { return String(s).toLowerCase().replace(/[«»"'`]/g, '').replace(/\s+/g, ' ').replace(/[.\s]+$/, '').trim(); }
  function matches(given, answers) { const g = cleanAns(given); return g.length > 0 && answers.some(function (a) { return cleanAns(a) === g; }); }

  /* ---------------- Spaced repetition (Leitner) ---------------- */
  const INTERVALS = [0, 1, 2, 4, 8, 16, 32];
  function cardState(id) { return S.cards[id]; }
  function rateCard(id, rating) {
    const st = S.cards[id] || { box: 0, due: today() };
    if (rating === 'again') { st.box = 1; st.due = today(); }
    else if (rating === 'good') { st.box = Math.min(st.box + 1, 6); st.due = addDays(today(), INTERVALS[st.box]); }
    else { st.box = Math.min(st.box + 2, 6); st.due = addDays(today(), INTERVALS[st.box]); }
    st.seen = today();
    S.cards[id] = st; markStudied(); save();
  }
  function isDue(id) { const st = S.cards[id]; return st && st.due <= today(); }
  function dueCards(filter) {
    const out = [];
    Object.keys(S.cards).forEach(function (id) {
      const ref = CARD_INDEX[id];
      if (ref && isDue(id) && (!filter || filter(ref.topic))) out.push(id);
    });
    return out;
  }
  function topicCardStats(t) {
    let seen = 0, mastered = 0, due = 0;
    t.cardItems.forEach(function (c) { const st = S.cards[c.id]; if (st) { seen++; if (st.box >= 4) mastered++; if (st.due <= today()) due++; } });
    return { total: t.cardItems.length, seen: seen, mastered: mastered, due: due };
  }
  function topicScore(t) {
    // 0-5 bars: notes read, cards seen ≥ half, cards mastered ≥ half, quiz best ≥ 70, blanks best ≥ 70
    const cs = topicCardStats(t); let n = 0;
    if (S.read[t.id]) n++;
    if (cs.seen >= cs.total / 2) n++;
    if (cs.mastered >= cs.total / 2) n++;
    if ((S.quiz[t.id] || {}).best >= 70) n++;
    if ((S.blanks[t.id] || {}).best >= 70) n++;
    return n;
  }

  /* ---------------- App shell ---------------- */
  const app = document.getElementById('app');
  const nav = document.getElementById('nav');
  let view = { name: 'today' };
  let session = null; // flashcard / quiz / test state

  function go(name, extra) {
    clearTimer();
    view = Object.assign({ name: name }, extra || {});
    session = null;
    const token = name === 'topic' ? view.id : name;
    try { if (location.hash.slice(1) !== token) history.replaceState(null, '', '#' + token); } catch (e) { /* ignore */ }
    render();
    window.scrollTo(0, 0);
  }
  function render() {
    updateNav();
    if (view.name === 'today') renderToday();
    else if (view.name === 'topics') renderTopics();
    else if (view.name === 'topic') renderTopic();
    else if (view.name === 'review') renderReview();
    else if (view.name === 'test') renderTest();
    else if (view.name === 'reminders') renderReminders();
  }
  function updateNav() {
    const due = dueCards().length;
    const remDue = remindersDue().length;
    nav.querySelectorAll('button').forEach(function (b) {
      const v = b.dataset.view;
      b.setAttribute('aria-current', (view.name === v || (v === 'topics' && view.name === 'topic')) ? 'page' : 'false');
      const c = b.querySelector('.count');
      if (c) c.remove();
      const n = v === 'review' ? due : v === 'reminders' ? remDue : 0;
      if (n) { const s = document.createElement('span'); s.className = 'count'; s.textContent = n; b.appendChild(s); }
    });
  }
  nav.addEventListener('click', function (e) { const b = e.target.closest('button'); if (b) go(b.dataset.view); });
  document.getElementById('brand').addEventListener('click', function (e) { e.preventDefault(); go('today'); });

  function h(html) { app.innerHTML = html; }
  function on(sel, ev, fn) { app.querySelectorAll(sel).forEach(function (el) { el.addEventListener(ev, fn); }); }

  /* ---------------- Today ---------------- */
  function countdownHtml(k) {
    const d = daysBetween(today(), k.date);
    const t = { id: k.mod };
    const label = d < 0 ? 'done' : d === 0 ? 'today' : d === 1 ? 'tomorrow' : d + '<small>days</small>';
    return '<div class="date mod-' + t.id + (d < 0 ? ' past' : '') + '"><div class="days">' + label + '</div>' +
      '<div class="what">' + esc(k.what) + '</div>' +
      '<div class="small muted">' + (k.approx ? 'Week of ' : '') + nice(k.date) + (k.time ? ', ' + k.time : '') + '</div>' +
      '<div class="small">' + esc(k.detail) + '</div></div>';
  }
  function topicRowHtml(t) {
    const sc = topicScore(t); const cs = topicCardStats(t);
    let bars = ''; for (let i = 0; i < 5; i++) bars += '<i class="' + (i < sc ? 'on' : '') + '"></i>';
    return '<button class="topic-row ' + modClass(t) + '" data-topic="' + t.id + '">' +
      '<span class="wk">W' + t.week + '</span>' +
      '<span class="tr-main"><span class="t-title">' + esc(t.title) + '</span><span class="t-sum">' + esc(t.summary) + '</span></span>' +
      '<span class="meterbox"><span class="meter" aria-label="Progress ' + sc + ' of 5">' + bars + '</span><span class="meter-label">' + cs.mastered + '/' + cs.total + ' cards learnt</span></span>' +
      '</button>';
  }
  function weakestTopic() {
    let best = null;
    TOPICS.forEach(function (t) {
      const s = topicScore(t) * 10 + ((S.quiz[t.id] || {}).best || 0) / 20;
      if (!best || s < best.s) best = { t: t, s: s };
    });
    return best && best.t;
  }
  function renderToday() {
    const due = dueCards().length;
    const upcoming = KEY_DATES.filter(function (k) { return daysBetween(today(), k.date) >= 0; }).slice(0, 4);
    const rems = remindersDue();
    const weak = weakestTopic();
    const st = streak();
    const totalCards = TOPICS.reduce(function (n, t) { return n + t.cardItems.length; }, 0);
    const learnt = TOPICS.reduce(function (n, t) { return n + topicCardStats(t).mastered; }, 0);
    let html = '<div class="stack">';
    html += '<div class="hello"><div class="stack" style="gap:6px"><span class="eyebrow">' + nice(today()) + '</span><h1>What to study today</h1>' +
      '<p class="muted">Revision for COM106 Introduction to Databases and COM161 Problem Solving for Computing, weeks 1 to 5.</p></div>' +
      '<div class="row" style="gap:28px"><div class="stat"><b>' + st + '</b><span class="small muted">day streak</span></div>' +
      '<div class="stat"><b>' + learnt + '<span class="muted" style="font-size:1rem">/' + totalCards + '</span></b><span class="small muted">cards learnt</span></div></div></div>';

    html += '<div class="grid2">';
    html += '<div class="panel stack" style="gap:10px"><span class="eyebrow">Flashcards</span>';
    if (due) html += '<h2>' + due + ' card' + (due === 1 ? '' : 's') + ' due for review</h2><p class="muted small">Cards come back on a schedule: 1, 2, 4, 8 then 16 days as you get them right.</p><div class="row"><button class="btn" data-go="review">Review now</button></div>';
    else html += '<h2>No cards due</h2><p class="muted small">Start a topic\'s flashcards to build your review queue. Cards you know come back less often.</p><div class="row"><button class="btn ghost" data-go="review">Learn new cards</button></div>';
    html += '</div>';
    html += '<div class="panel stack ' + (weak ? modClass(weak) : '') + '" style="gap:10px"><span class="eyebrow">Suggested next</span>';
    if (weak) html += '<h2>' + esc(weak.title) + '</h2><p class="muted small"><span class="tag">' + weak.module.code + ' · Week ' + weak.week + '</span> This is your least practised topic.</p><div class="row"><button class="btn" data-topic="' + weak.id + '">Open topic</button><button class="btn ghost" data-go="test">Take a mini test</button></div>';
    html += '</div></div>';

    if (rems.length) {
      html += '<div class="panel stack" style="gap:8px"><span class="eyebrow">Your reminders</span>' + rems.map(reminderRowHtml).join('') + '</div>';
    }

    html += '<div class="stack" style="gap:10px"><span class="eyebrow">Coming up</span><div class="dates">' + upcoming.map(countdownHtml).join('') + '</div></div>';

    html += '<div class="grid2">';
    MODULES.forEach(function (m) {
      html += '<div class="panel mod-' + m.id + '"><div class="row" style="justify-content:space-between;margin-bottom:6px"><h2>' + esc(m.name) + '</h2><span class="tag">' + m.code + '</span></div><div class="topic-list">' + m.topics.map(topicRowHtml).join('') + '</div></div>';
    });
    html += '</div></div>';
    h(html);
    bindCommon();
    bindReminderRows();
  }
  function bindCommon() {
    on('[data-topic]', 'click', function (e) { go('topic', { id: e.currentTarget.dataset.topic, tab: e.currentTarget.dataset.tab || 'notes' }); });
    on('[data-go]', 'click', function (e) { go(e.currentTarget.dataset.go); });
  }

  /* ---------------- Topics list ---------------- */
  function renderTopics() {
    let html = '<div class="stack"><div class="stack" style="gap:6px"><span class="eyebrow">All topics</span><h1>Topics</h1><p class="muted">Each topic has revision notes, flashcards, multiple choice, fill-the-blanks and exercises with model answers.</p></div><div class="grid2">';
    MODULES.forEach(function (m) {
      html += '<div class="panel mod-' + m.id + '"><div class="row" style="justify-content:space-between;margin-bottom:6px"><h2>' + esc(m.name) + '</h2><span class="tag">' + m.code + '</span></div><div class="topic-list">' + m.topics.map(topicRowHtml).join('') + '</div></div>';
    });
    html += '</div></div>';
    h(html); bindCommon();
  }

  /* ---------------- Topic page ---------------- */
  const TABS = [['notes', 'Notes'], ['cards', 'Flashcards'], ['mcq', 'Multiple choice'], ['blanks', 'Fill the blanks'], ['exercises', 'Exercises']];
  function renderTopic() {
    const t = TOPIC[view.id]; if (!t) return go('topics');
    const tab = view.tab || 'notes';
    const counts = { notes: '', cards: t.cardItems.length, mcq: t.mcqItems.length, blanks: t.blankItems.length, exercises: t.exercises.length };
    let html = '<div class="stack ' + modClass(t) + '">';
    html += '<div class="topic-head"><div><button class="crumb" data-go="topics">← All topics</button></div>' +
      '<div class="row" style="gap:8px"><span class="tag">' + t.module.code + ' ' + esc(t.module.short) + '</span><span class="wk">WEEK ' + t.week + '</span></div>' +
      '<h1>' + esc(t.title) + '</h1><p class="muted" style="max-width:70ch">' + esc(t.summary) + '</p></div>';
    html += '<div class="tabs" role="tablist">' + TABS.map(function (x) {
      return '<button role="tab" data-tab="' + x[0] + '" aria-selected="' + (x[0] === tab) + '">' + x[1] + (counts[x[0]] ? '<span class="n">' + counts[x[0]] + '</span>' : '') + '</button>';
    }).join('') + '</div><div id="tabbody"></div></div>';
    h(html);
    on('[data-go]', 'click', function (e) { go(e.currentTarget.dataset.go); });
    on('.tabs button', 'click', function (e) { clearTimer(); view.tab = e.currentTarget.dataset.tab; session = null; renderTopic(); });
    const body = document.getElementById('tabbody');
    if (tab === 'notes') renderNotes(t, body);
    else if (tab === 'cards') startCards(body, t.cardItems.map(function (c) { return c.id; }), { topic: t });
    else if (tab === 'mcq') startQuiz(body, t);
    else if (tab === 'blanks') renderBlanks(body, t);
    else renderExercises(body, t);
  }

  function renderNotes(t, body) {
    const read = !!S.read[t.id];
    body.innerHTML = md(t.notes) +
      '<div class="row" style="margin-top:24px"><button class="btn ' + (read ? 'ghost' : '') + '" id="markread">' + (read ? '✓ Marked as read' : 'Mark notes as read') + '</button>' +
      '<button class="btn ghost" id="tocards">Test yourself with flashcards →</button></div>';
    body.querySelector('#markread').addEventListener('click', function () { S.read[t.id] = !S.read[t.id]; if (S.read[t.id]) markStudied(); save(); renderTopic(); });
    body.querySelector('#tocards').addEventListener('click', function () { view.tab = 'cards'; renderTopic(); });
  }

  /* ---------------- Flashcards ---------------- */
  function startCards(body, ids, opts) {
    // Order: due first, then new, then the rest (for a topic run-through)
    const due = [], fresh = [], rest = [];
    ids.forEach(function (id) { const st = S.cards[id]; if (!st) fresh.push(id); else if (st.due <= today()) due.push(id); else rest.push(id); });
    const queue = shuffle(due).concat(fresh, opts.topic ? shuffle(rest) : []);
    session = { kind: 'cards', queue: queue, pos: 0, flipped: false, done: 0, again: 0, body: body, opts: opts, total: queue.length };
    drawCard();
  }
  function drawCard() {
    const s = session; const body = s.body;
    if (!s.queue.length) {
      body.innerHTML = '<div class="empty">' + (s.opts.emptyText || 'No cards here yet.') + '</div>';
      return;
    }
    if (s.pos >= s.queue.length) {
      body.innerHTML = '<div class="panel stack" style="max-width:640px"><span class="eyebrow">Session complete</span><h2>' + s.done + ' card' + (s.done === 1 ? '' : 's') + ' reviewed</h2>' +
        '<p class="muted">' + (s.again ? s.again + ' marked "Again". They will come back first next time.' : 'Nothing marked "Again". Nice.') + ' Check the Today page for when cards are next due.</p>' +
        '<div class="row"><button class="btn" id="again-run">Go through again</button></div></div>';
      body.querySelector('#again-run').addEventListener('click', function () { startCards(body, s.queue.slice(), s.opts); });
      if (s.opts.onDone) s.opts.onDone();
      updateNav();
      return;
    }
    const id = s.queue[s.pos]; const ref = CARD_INDEX[id]; const c = ref.card; const t = ref.topic;
    const st = S.cards[id];
    const status = !st ? '<span class="pill soon">New</span>' : st.due <= today() ? '<span class="pill due">Due</span>' : '<span class="pill ok">Box ' + st.box + '</span>';
    let html = '<div class="cardstage ' + modClass(t) + '">';
    html += '<div class="row" style="justify-content:space-between"><span class="small muted">Card ' + (s.pos + 1) + ' of ' + s.queue.length + (s.opts.topic ? '' : ' · ' + esc(t.title)) + '</span>' + status + '</div>';
    html += '<div class="progressbar"><i style="width:' + pct(s.pos, s.queue.length) + '%"></i></div>';
    if (!s.flipped) {
      html += '<div class="card-face" id="face" tabindex="0" role="button" aria-label="Show answer"><span class="side">Question</span><div>' + rich(c.q) + '</div></div>';
      html += '<div class="row"><button class="btn" id="flip">Show answer</button><span class="small muted">or press Space</span></div>';
    } else {
      html += '<div class="card-face back" id="face"><span class="side">Answer</span><div class="small muted">' + rich(c.q) + '</div><div>' + rich(c.a) + '</div></div>';
      html += '<div class="rate"><button class="btn bad" data-rate="again">Again<small>see it today</small></button><button class="btn" data-rate="good">Good<small>' + nextLabel(id, 'good') + '</small></button><button class="btn good" data-rate="easy">Easy<small>' + nextLabel(id, 'easy') + '</small></button></div>';
      html += '<div class="small muted">Keys: 1 Again · 2 Good · 3 Easy</div>';
    }
    html += '</div>';
    body.innerHTML = html;
    const flip = function () { s.flipped = true; drawCard(); };
    const f = body.querySelector('#flip'); if (f) f.addEventListener('click', flip);
    const face = body.querySelector('#face'); if (face && !s.flipped) face.addEventListener('click', flip);
    body.querySelectorAll('[data-rate]').forEach(function (b) { b.addEventListener('click', function () { rate(b.dataset.rate); }); });
  }
  function nextLabel(id, r) {
    const st = S.cards[id] || { box: 0 };
    const box = Math.min(st.box + (r === 'good' ? 1 : 2), 6);
    const d = INTERVALS[box];
    return d === 1 ? 'in 1 day' : 'in ' + d + ' days';
  }
  function rate(r) {
    const s = session; const id = s.queue[s.pos];
    rateCard(id, r);
    s.done++;
    if (r === 'again') { s.again++; s.queue.push(id); }
    s.pos++; s.flipped = false; drawCard(); updateNav();
  }
  document.addEventListener('keydown', function (e) {
    if (!session || session.kind !== 'cards') return;
    if (/input|textarea|select/i.test((e.target.tagName || ''))) return;
    if (!session.flipped && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); session.flipped = true; drawCard(); }
    else if (session.flipped && ['1', '2', '3'].indexOf(e.key) >= 0) rate(['again', 'good', 'easy'][Number(e.key) - 1]);
  });

  /* ---------------- Review (all modules) ---------------- */
  function renderReview() {
    const filt = view.mod || 'all';
    const f = function (t) { return filt === 'all' || t.module.id === filt; };
    const due = dueCards(f);
    let html = '<div class="stack"><div class="stack" style="gap:6px"><span class="eyebrow">Spaced repetition</span><h1>Flashcard review</h1>' +
      '<p class="muted" style="max-width:62ch">Cards you rate "Good" come back after 1, 2, 4, 8, 16 then 32 days. "Again" brings a card back today. Cards in box 4 or higher count as learnt.</p></div>';
    html += '<div class="row"><div class="seg" role="group" aria-label="Module">' + [['all', 'Both modules'], ['db', 'COM106'], ['py', 'COM161']].map(function (x) {
      return '<button data-mod="' + x[0] + '" aria-pressed="' + (filt === x[0]) + '">' + x[1] + '</button>';
    }).join('') + '</div><span class="small muted">' + due.length + ' due now</span>' +
      '<button class="btn ghost small" id="addnew">Add 10 new cards</button></div><div id="revbody"></div></div>';
    h(html);
    on('[data-mod]', 'click', function (e) { view.mod = e.currentTarget.dataset.mod; renderReview(); });
    const body = document.getElementById('revbody');
    const newIds = function () {
      const out = [];
      TOPICS.forEach(function (t) { if (f(t)) t.cardItems.forEach(function (c) { if (!S.cards[c.id]) out.push(c.id); }); });
      return out;
    };
    app.querySelector('#addnew').addEventListener('click', function () {
      const ids = newIds().slice(0, 10);
      startCards(body, due.concat(ids), { emptyText: 'You have seen every card in this selection.' });
    });
    startCards(body, due, { emptyText: 'Nothing is due right now. Use "Add 10 new cards" to learn more, or open a topic and work through its flashcards.' });
  }

  /* ---------------- Multiple choice (per topic) ---------------- */
  function startQuiz(body, t) {
    const len = Math.min(view.qlen || 10, t.mcqItems.length);
    const items = shuffle(t.mcqItems).slice(0, len).map(prepMcq);
    session = { kind: 'quiz', items: items, pos: 0, score: 0, answered: false, body: body, topic: t };
    drawQuiz();
  }
  function prepMcq(q) {
    const order = shuffle(q.o.map(function (_, i) { return i; }));
    return { src: q, opts: order.map(function (i) { return q.o[i]; }), answer: order.indexOf(q.a) };
  }
  function drawQuiz() {
    const s = session; const body = s.body; const t = s.topic;
    if (s.pos >= s.items.length) {
      const p = pct(s.score, s.items.length);
      const rec = S.quiz[t.id] || { best: 0, runs: 0 };
      rec.best = Math.max(rec.best || 0, p); rec.last = p; rec.runs = (rec.runs || 0) + 1; S.quiz[t.id] = rec; markStudied(); save();
      body.innerHTML = '<div class="panel stack" style="max-width:640px"><span class="eyebrow">Quiz complete</span><div class="score-big">' + p + '%</div>' +
        '<p>' + s.score + ' of ' + s.items.length + ' correct. Your best on this topic is ' + rec.best + '%.</p>' +
        '<p class="muted small">' + (p >= 80 ? 'Strong. Try the fill-the-blanks or a mixed mini test next.' : p >= 50 ? 'Getting there. Re-read the notes for the ones you missed, then try again.' : 'Go back over the notes and flashcards, then retake this quiz.') + '</p>' +
        '<div class="row"><button class="btn" id="retake">New quiz</button><button class="btn ghost" id="tonotes">Back to notes</button></div></div>';
      body.querySelector('#retake').addEventListener('click', function () { startQuiz(body, t); });
      body.querySelector('#tonotes').addEventListener('click', function () { view.tab = 'notes'; renderTopic(); });
      return;
    }
    const it = s.items[s.pos];
    let html = '<div class="q">';
    html += '<div class="row" style="justify-content:space-between"><span class="small muted">Question ' + (s.pos + 1) + ' of ' + s.items.length + '</span><span class="small muted">Score ' + s.score + '</span></div>';
    html += '<div class="progressbar"><i style="width:' + pct(s.pos, s.items.length) + '%"></i></div>';
    html += '<div class="stem">' + rich(it.src.q) + '</div><div class="opts">';
    it.opts.forEach(function (o, i) {
      let cls = 'opt';
      if (s.answered) { if (i === it.answer) cls += ' right'; else if (i === s.picked) cls += ' wrong'; }
      html += '<button class="' + cls + '" data-i="' + i + '"' + (s.answered ? ' disabled' : '') + '><span class="k">' + 'ABCDEF'[i] + '</span><span>' + rich(o) + '</span></button>';
    });
    html += '</div>';
    if (s.answered) {
      const ok = s.picked === it.answer;
      html += '<div class="feedback ' + (ok ? 'ok' : 'no') + '"><b>' + (ok ? 'Correct.' : 'Not quite.') + '</b> ' + rich(it.src.e || '') + '</div>';
      html += '<div class="row"><button class="btn" id="next">' + (s.pos + 1 < s.items.length ? 'Next question' : 'See result') + '</button></div>';
    }
    html += '</div>';
    body.innerHTML = html;
    body.querySelectorAll('.opt').forEach(function (b) {
      b.addEventListener('click', function () {
        if (s.answered) return;
        s.answered = true; s.picked = Number(b.dataset.i);
        if (s.picked === it.answer) s.score++;
        drawQuiz();
        const n = body.querySelector('#next'); if (n) n.focus();
      });
    });
    const n = body.querySelector('#next');
    if (n) n.addEventListener('click', function () { s.pos++; s.answered = false; drawQuiz(); });
  }

  /* ---------------- Fill the blanks (per topic) ---------------- */
  function blankHtml(item, key) {
    let gi = 0;
    return parseBlank(item.t).map(function (p) {
      if (p.text !== undefined) return inline(p.text);
      const w = Math.max(7, Math.min(22, p.answers[0].length + 3));
      return '<input class="gap" style="width:' + w + 'ch" data-key="' + key + '" data-g="' + (gi++) + '" aria-label="Blank" autocomplete="off" autocapitalize="off" spellcheck="false">';
    }).join('');
  }
  function renderBlanks(body, t) {
    const items = view.blankOrder && view.blankOrder.topic === t.id ? view.blankOrder.items : shuffle(t.blankItems);
    view.blankOrder = { topic: t.id, items: items };
    let html = '<div class="stack" style="max-width:72ch"><p class="muted small">Type the missing word or phrase in each gap. Spelling counts, capitals do not. Press Enter to jump to the next gap.</p><div class="panel">';
    items.forEach(function (it, i) {
      html += '<div class="blank-item"><div class="blank-text">' + blankHtml(it, i) + '</div><div class="reveal" id="rev' + i + '" hidden></div></div>';
    });
    html += '</div><div class="row"><button class="btn" id="checkall">Check answers</button><button class="btn ghost" id="showall">Show all answers</button><button class="btn ghost" id="reshuffle">New order</button><span id="blankscore" class="small"></span></div></div>';
    body.innerHTML = html;
    const gaps = Array.prototype.slice.call(body.querySelectorAll('.gap'));
    gaps.forEach(function (g, i) { g.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); if (gaps[i + 1]) gaps[i + 1].focus(); else check(); } }); });
    function check(reveal) {
      let right = 0;
      items.forEach(function (it, i) {
        const parts = parseBlank(it.t).filter(function (p) { return p.answers; });
        let allOk = true;
        body.querySelectorAll('.gap[data-key="' + i + '"]').forEach(function (g) {
          const ans = parts[Number(g.dataset.g)].answers;
          const ok = matches(g.value, ans);
          g.classList.toggle('right', ok); g.classList.toggle('wrong', !ok);
          if (!ok) allOk = false;
        });
        if (allOk) right++;
        const rev = body.querySelector('#rev' + i);
        if (!allOk || reveal) {
          rev.hidden = false;
          rev.innerHTML = 'Answer: ' + parts.map(function (p) { return '<b>' + esc(p.answers[0]) + '</b>'; }).join(', ') + (it.e ? ' · ' + rich(it.e) : '');
        } else rev.hidden = true;
      });
      const p = pct(right, items.length);
      body.querySelector('#blankscore').textContent = right + ' of ' + items.length + ' fully correct (' + p + '%)';
      if (!reveal) { const rec = S.blanks[t.id] || { best: 0 }; rec.best = Math.max(rec.best || 0, p); rec.last = p; S.blanks[t.id] = rec; markStudied(); save(); }
    }
    body.querySelector('#checkall').addEventListener('click', function () { check(false); });
    body.querySelector('#showall').addEventListener('click', function () { check(true); });
    body.querySelector('#reshuffle').addEventListener('click', function () { view.blankOrder = null; renderBlanks(body, t); });
  }

  /* ---------------- Exercises ---------------- */
  function renderExercises(body, t) {
    let html = '<div class="stack" style="max-width:76ch"><p class="muted small">Try each exercise yourself first (in your IDE or SQL Server, or in the box below, which is saved in this browser), then compare with the model answer.</p>';
    t.exercises.forEach(function (ex, i) {
      const key = t.id + '-x' + i;
      const done = !!S.done[key];
      html += '<div class="ex"><div class="row" style="justify-content:space-between"><h3>' + (i + 1) + '. ' + esc(ex.title) + '</h3>' + (done ? '<span class="pill ok">Done</span>' : '') + '</div>' + md(ex.task) +
        '<label class="legend" for="att-' + key + '">Your attempt</label><textarea id="att-' + key + '" data-key="' + key + '" placeholder="Write your answer or code here">' + esc(S.attempts[key] || '') + '</textarea>' +
        '<details><summary>Show model answer</summary><div class="answer" style="margin-top:10px">' + md(ex.solution) + '</div></details>' +
        '<div class="row"><button class="btn ghost small" data-done="' + key + '">' + (done ? 'Mark as not done' : 'Mark as done') + '</button></div></div>';
    });
    html += '</div>';
    body.innerHTML = html;
    body.querySelectorAll('textarea').forEach(function (ta) {
      ta.addEventListener('input', function () { S.attempts[ta.dataset.key] = ta.value; save(); });
    });
    body.querySelectorAll('[data-done]').forEach(function (b) {
      b.addEventListener('click', function () { const k = b.dataset.done; S.done[k] = !S.done[k]; if (S.done[k]) markStudied(); save(); renderExercises(body, t); });
    });
  }

  /* ---------------- Mini test ---------------- */
  let timerId = null;
  function clearTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
  function renderTest() {
    if (session && session.kind === 'test') return drawTest();
    const cfg = view.cfg || { topics: TOPICS.map(function (t) { return t.id; }), len: 15, timed: true };
    view.cfg = cfg;
    let html = '<div class="stack"><div class="stack" style="gap:6px"><span class="eyebrow">Exam practice</span><h1>Mini test</h1>' +
      '<p class="muted" style="max-width:62ch">A mixed set of multiple-choice and fill-the-blank questions with no feedback until the end, like the real class test. Results are saved so you can see your progress.</p></div>';
    html += '<div class="panel stack">';
    MODULES.forEach(function (m) {
      html += '<div class="stack mod-' + m.id + '" style="gap:8px"><div class="row" style="justify-content:space-between"><span class="legend">' + m.code + ' ' + esc(m.name) + '</span><button class="btn ghost small" data-all="' + m.id + '">Toggle all</button></div><div class="checks">' +
        m.topics.map(function (t) { return '<label class="check"><input type="checkbox" id="tt-' + t.id + '" data-t="' + t.id + '"' + (cfg.topics.indexOf(t.id) >= 0 ? ' checked' : '') + '> W' + t.week + ' ' + esc(t.title) + '</label>'; }).join('') + '</div></div>';
    });
    html += '<div class="row" style="gap:20px;align-items:flex-end"><div class="field"><span class="legend">Questions</span><div class="seg" role="group">' + [10, 15, 25, 35].map(function (n) {
      return '<button data-len="' + n + '" aria-pressed="' + (cfg.len === n) + '">' + n + '</button>';
    }).join('') + '</div></div>' +
      '<label class="check"><input type="checkbox" id="timed"' + (cfg.timed ? ' checked' : '') + '> Timed (about 1 minute per question)</label></div>';
    html += '<div class="row"><button class="btn" id="start">Start test</button><span class="small muted" id="poolinfo"></span></div></div>';

    if (S.tests.length) {
      html += '<div class="panel"><h2 style="margin-bottom:8px">Recent results</h2><div class="tablewrap"><table class="history"><thead><tr><th>Date</th><th>Topics</th><th>Questions</th><th>Score</th></tr></thead><tbody>' +
        S.tests.slice(-10).reverse().map(function (r) {
          return '<tr><td>' + nice(r.date) + '</td><td>' + esc(r.label) + '</td><td>' + r.n + '</td><td><b>' + r.pct + '%</b></td></tr>';
        }).join('') + '</tbody></table></div></div>';
    }
    html += '</div>';
    h(html);
    const pool = function () {
      let n = 0; cfg.topics.forEach(function (id) { n += TOPIC[id].mcqItems.length + TOPIC[id].blankItems.length; });
      app.querySelector('#poolinfo').textContent = cfg.topics.length ? n + ' questions available from ' + cfg.topics.length + ' topic' + (cfg.topics.length === 1 ? '' : 's') : 'Pick at least one topic';
      app.querySelector('#start').disabled = !cfg.topics.length;
    };
    on('[data-t]', 'change', function () { cfg.topics = Array.prototype.slice.call(app.querySelectorAll('[data-t]:checked')).map(function (x) { return x.dataset.t; }); pool(); });
    on('[data-all]', 'click', function (e) {
      const m = e.currentTarget.dataset.all; const ids = TOPICS.filter(function (t) { return t.module.id === m; }).map(function (t) { return t.id; });
      const allOn = ids.every(function (id) { return cfg.topics.indexOf(id) >= 0; });
      cfg.topics = cfg.topics.filter(function (id) { return ids.indexOf(id) < 0; }).concat(allOn ? [] : ids);
      renderTest();
    });
    on('[data-len]', 'click', function (e) { cfg.len = Number(e.currentTarget.dataset.len); renderTest(); });
    app.querySelector('#timed').addEventListener('change', function (e) { cfg.timed = e.target.checked; });
    app.querySelector('#start').addEventListener('click', function () { beginTest(cfg); });
    pool();
  }
  function beginTest(cfg) {
    // Balance across topics: round-robin over shuffled per-topic pools; about 70% multiple choice.
    const pools = cfg.topics.map(function (id) {
      const t = TOPIC[id];
      return shuffle(t.mcqItems.map(function (q) { return { type: 'mcq', t: t, q: q }; }).concat(
        shuffle(t.blankItems).slice(0, Math.ceil(t.blankItems.length / 2)).map(function (b) { return { type: 'blank', t: t, b: b }; })));
    });
    const picked = []; let guard = 0;
    while (picked.length < cfg.len && guard < 5000) {
      pools.forEach(function (p) { if (picked.length < cfg.len && p.length) picked.push(p.shift()); });
      guard++;
      if (pools.every(function (p) { return !p.length; })) break;
    }
    const items = shuffle(picked).map(function (it) { if (it.type === 'mcq') { const m = prepMcq(it.q); m.type = 'mcq'; m.t = it.t; return m; } return it; });
    const mods = new Set(cfg.topics.map(function (id) { return TOPIC[id].module.code; }));
    session = {
      kind: 'test', items: items, pos: 0, answers: items.map(function () { return null; }), finished: false,
      label: cfg.topics.length === TOPICS.length ? 'Everything' : cfg.topics.length === 1 ? TOPIC[cfg.topics[0]].title : Array.from(mods).join(' + ') + ' (' + cfg.topics.length + ' topics)',
      deadline: cfg.timed ? Date.now() + items.length * 60000 : null
    };
    drawTest();
    if (session.deadline) {
      timerId = setInterval(function () {
        const el = document.getElementById('timer');
        const left = session && session.deadline ? session.deadline - Date.now() : 0;
        if (left <= 0) { clearTimer(); if (session && !session.finished) finishTest(true); return; }
        if (el) el.textContent = fmtTime(left);
      }, 1000);
    }
  }
  function fmtTime(ms) { const s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + pad(s % 60); }
  function drawTest() {
    const s = session;
    if (s.finished) return drawTestResult();
    const it = s.items[s.pos];
    let html = '<div class="stack ' + modClass(it.t) + '" style="max-width:76ch">';
    html += '<div class="row" style="justify-content:space-between"><span class="eyebrow">Mini test · ' + esc(s.label) + '</span>' + (s.deadline ? '<span class="timer" id="timer">' + fmtTime(s.deadline - Date.now()) + '</span>' : '') + '</div>';
    html += '<div class="progressbar"><i style="width:' + pct(s.pos, s.items.length) + '%"></i></div>';
    html += '<div class="q"><span class="small muted">Question ' + (s.pos + 1) + ' of ' + s.items.length + ' · <span class="tag">' + it.t.module.code + ' W' + it.t.week + '</span></span>';
    if (it.type === 'mcq') {
      html += '<div class="stem">' + rich(it.src.q) + '</div><div class="opts">' + it.opts.map(function (o, i) {
        return '<button class="opt' + (s.answers[s.pos] === i ? ' picked' : '') + '" data-i="' + i + '"><span class="k">' + 'ABCDEF'[i] + '</span><span>' + rich(o) + '</span></button>';
      }).join('') + '</div>';
    } else {
      html += '<div class="stem" style="font-weight:400">Fill in the blank' + (parseBlank(it.b.t).filter(function (p) { return p.answers; }).length > 1 ? 's' : '') + ':</div><div class="blank-text panel">' + blankHtml(it.b, 'test') + '</div>';
    }
    html += '</div><div class="row" style="justify-content:space-between"><button class="btn ghost" id="prev"' + (s.pos ? '' : ' disabled') + '>← Previous</button>' +
      '<span class="small muted">' + s.answers.filter(function (a) { return a !== null && a !== ''; }).length + ' answered</span>' +
      (s.pos + 1 < s.items.length ? '<button class="btn" id="nextq">Next →</button>' : '<button class="btn" id="finish">Finish test</button>') + '</div>';
    html += '<div class="row"><button class="btn ghost small" id="endnow">End test now</button><span class="small muted" id="endconfirm"></span></div></div>';
    h(html);
    if (it.type === 'blank') {
      const gaps = app.querySelectorAll('.gap');
      const prev = s.answers[s.pos] || [];
      gaps.forEach(function (g, i) {
        g.value = prev[i] || '';
        g.addEventListener('input', function () { s.answers[s.pos] = Array.prototype.map.call(gaps, function (x) { return x.value; }); });
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); if (gaps[i + 1]) gaps[i + 1].focus(); else { const n = app.querySelector('#nextq') || app.querySelector('#finish'); n.click(); } } });
      });
      if (gaps[0]) gaps[0].focus();
    }
    on('.opt', 'click', function (e) { s.answers[s.pos] = Number(e.currentTarget.dataset.i); drawTest(); });
    const pv = app.querySelector('#prev'); pv.addEventListener('click', function () { s.pos--; drawTest(); });
    const nx = app.querySelector('#nextq'); if (nx) nx.addEventListener('click', function () { s.pos++; drawTest(); });
    const fin = app.querySelector('#finish'); if (fin) fin.addEventListener('click', function () { finishTest(false); });
    app.querySelector('#endnow').addEventListener('click', function (e) {
      const span = app.querySelector('#endconfirm');
      if (span.dataset.armed) return finishTest(false);
      span.dataset.armed = '1'; span.textContent = 'Unanswered questions will be marked wrong. Click again to end.';
      e.currentTarget.textContent = 'Yes, end the test';
    });
  }
  function testItemCorrect(it, ans) {
    if (it.type === 'mcq') return ans === it.answer;
    const parts = parseBlank(it.b.t).filter(function (p) { return p.answers; });
    return Array.isArray(ans) && parts.every(function (p, i) { return matches(ans[i] || '', p.answers); });
  }
  function finishTest(timeUp) {
    const s = session; clearTimer();
    s.finished = true; s.timeUp = timeUp;
    s.correct = s.items.map(function (it, i) { return testItemCorrect(it, s.answers[i]); });
    const score = s.correct.filter(Boolean).length;
    s.pct = pct(score, s.items.length);
    S.tests.push({ date: today(), label: s.label, n: s.items.length, pct: s.pct });
    S.tests = S.tests.slice(-50);
    markStudied(); save();
    drawTestResult();
    window.scrollTo(0, 0);
  }
  function drawTestResult() {
    const s = session;
    const score = s.correct.filter(Boolean).length;
    const byTopic = {};
    s.items.forEach(function (it, i) { const k = it.t.id; byTopic[k] = byTopic[k] || { t: it.t, n: 0, ok: 0 }; byTopic[k].n++; if (s.correct[i]) byTopic[k].ok++; });
    let html = '<div class="stack" style="max-width:76ch"><div class="panel stack"><span class="eyebrow">' + (s.timeUp ? 'Time up' : 'Test complete') + ' · ' + esc(s.label) + '</span>' +
      '<div class="row" style="gap:20px;align-items:flex-end"><div class="score-big">' + s.pct + '%</div><p>' + score + ' of ' + s.items.length + ' correct</p></div>' +
      '<div class="tablewrap"><table class="history"><thead><tr><th>Topic</th><th>Correct</th></tr></thead><tbody>' +
      Object.keys(byTopic).map(function (k) { const r = byTopic[k]; return '<tr class="' + modClass(r.t) + '"><td><span class="wk">' + r.t.module.code + ' W' + r.t.week + '</span> ' + esc(r.t.title) + '</td><td>' + r.ok + '/' + r.n + '</td></tr>'; }).join('') +
      '</tbody></table></div><div class="row"><button class="btn" id="again">New test</button></div></div>';
    const wrong = s.items.map(function (it, i) { return { it: it, i: i }; }).filter(function (x) { return !s.correct[x.i]; });
    if (wrong.length) {
      html += '<h2>Review what you missed</h2>';
      wrong.forEach(function (x) {
        const it = x.it; const ans = s.answers[x.i];
        html += '<div class="panel q ' + modClass(it.t) + '"><span class="small muted"><span class="tag">' + it.t.module.code + ' W' + it.t.week + '</span> ' + esc(it.t.title) + '</span>';
        if (it.type === 'mcq') {
          html += '<div class="stem">' + rich(it.src.q) + '</div>' +
            '<div class="feedback no">Your answer: ' + (ans === null ? '<i>none</i>' : rich(it.opts[ans])) + '</div>' +
            '<div class="feedback ok">Correct: ' + rich(it.opts[it.answer]) + (it.src.e ? '<br><span class="small">' + rich(it.src.e) + '</span>' : '') + '</div>';
        } else {
          const parts = parseBlank(it.b.t);
          let gi = 0;
          const filled = parts.map(function (p) { if (p.text !== undefined) return inline(p.text); const a = (ans || [])[gi++] || ''; return '<b>[' + esc(p.answers[0]) + ']</b>' + (a ? ' <s class="muted">' + esc(a) + '</s>' : ''); }).join('');
          html += '<div class="stem" style="font-weight:400">' + filled + '</div>' + (it.b.e ? '<div class="small muted">' + rich(it.b.e) + '</div>' : '');
        }
        html += '<div><button class="btn ghost small" data-topic="' + it.t.id + '">Open topic notes</button></div></div>';
      });
    } else html += '<div class="feedback ok">Full marks. Try a longer test or a different mix of topics.</div>';
    html += '</div>';
    h(html);
    app.querySelector('#again').addEventListener('click', function () { session = null; renderTest(); });
    bindCommon();
  }

  /* ---------------- Reminders ---------------- */
  function nextOccurrence(r) {
    // Returns the next due date string (>= today) for repeating reminders, or the fixed date.
    if (!r.repeat || r.repeat === 'none') return r.date;
    let d = r.date; const step = r.repeat === 'daily' ? 1 : 7;
    const lastDone = r.lastDone || '';
    while (d < today() || d <= lastDone) d = addDays(d, step);
    return d;
  }
  function reminderState(r) {
    const d = r.repeat && r.repeat !== 'none' ? nextOccurrence(r) : r.date;
    if (r.done && (!r.repeat || r.repeat === 'none')) return { date: d, state: 'done' };
    const diff = daysBetween(today(), d);
    if (diff < 0) return { date: d, state: 'late' };
    if (diff === 0) return { date: d, state: 'due' };
    return { date: d, state: 'soon', diff: diff };
  }
  function remindersDue() {
    return S.reminders.filter(function (r) { const st = reminderState(r).state; return st === 'due' || st === 'late'; });
  }
  function reminderRowHtml(r) {
    const st = reminderState(r);
    const pill = st.state === 'late' ? '<span class="pill late">Overdue</span>' : st.state === 'due' ? '<span class="pill due">Today</span>' : st.state === 'done' ? '<span class="pill ok">Done</span>' : '<span class="pill soon">In ' + st.diff + ' day' + (st.diff === 1 ? '' : 's') + '</span>';
    const rep = r.repeat === 'daily' ? ' · every day' : r.repeat === 'weekly' ? ' · every week' : '';
    return '<div class="rem"><span class="when">' + nice(st.date) + (r.time ? ' ' + r.time : '') + '</span><div><div><b>' + esc(r.text) + '</b></div><div class="small muted">' + pill + rep + '</div></div>' +
      '<div class="row" style="gap:6px">' + (st.state !== 'done' ? '<button class="btn ghost small" data-rdone="' + r.id + '">Done</button>' : '') + '<button class="btn ghost small" data-rdel="' + r.id + '" aria-label="Delete reminder">✕</button></div></div>';
  }
  function bindReminderRows() {
    on('[data-rdone]', 'click', function (e) {
      const r = S.reminders.find(function (x) { return x.id === e.currentTarget.dataset.rdone; });
      if (!r) return;
      if (r.repeat && r.repeat !== 'none') r.lastDone = reminderState(r).date; else r.done = true;
      save(); render();
    });
    on('[data-rdel]', 'click', function (e) {
      S.reminders = S.reminders.filter(function (x) { return x.id !== e.currentTarget.dataset.rdel; });
      save(); render();
    });
  }
  let framed = true;
  try { framed = window.self !== window.top; } catch (e) { framed = true; }
  function renderReminders() {
    const rs = S.reminders.slice().sort(function (a, b) { return reminderState(a).date < reminderState(b).date ? -1 : 1; });
    let html = '<div class="stack"><div class="stack" style="gap:6px"><span class="eyebrow">Plan</span><h1>Reminders</h1>' +
      '<p class="muted" style="max-width:62ch">Key deadlines from your module handbooks, plus your own study reminders. Reminders show on the Today page when they are due, and pop up while this page is open.</p></div>';
    html += '<div class="dates">' + KEY_DATES.map(countdownHtml).join('') + '</div>';
    html += '<div class="grid2"><div class="panel stack"><h2>Add a reminder</h2><form id="remform" class="stack" style="gap:12px">' +
      '<div class="field"><label for="r-text">What</label><input id="r-text" required maxlength="120" placeholder="e.g. Normalisation flashcards"></div>' +
      '<div class="row" style="align-items:flex-end"><div class="field"><label for="r-date">Date</label><input id="r-date" type="date" required value="' + today() + '"></div>' +
      '<div class="field"><label for="r-time">Time</label><input id="r-time" type="time" value="19:00"></div>' +
      '<div class="field"><label for="r-rep">Repeat</label><select id="r-rep"><option value="none">Once</option><option value="daily">Every day</option><option value="weekly">Every week</option></select></div></div>' +
      '<div class="row"><button class="btn" type="submit">Add reminder</button></div></form>' +
      '<div class="stack" style="gap:6px"><span class="legend">Quick add</span><div class="row" style="gap:6px">' +
      '<button class="btn ghost small" data-quick="daily">Daily flashcard review, 7pm</button><button class="btn ghost small" data-quick="weekly">Weekly mini test, Sunday</button><button class="btn ghost small" data-quick="assign">Start COM106 assignment plan</button></div></div></div>';
    html += '<div class="panel stack" style="gap:8px"><h2>Your reminders</h2>' + (rs.length ? rs.map(reminderRowHtml).join('') : '<div class="empty">No reminders yet. Add one, or use a quick add.</div>') + '</div></div>';
    html += '<div class="panel stack" style="gap:10px"><h2>Get reminders on your phone</h2>';
    if (!framed) html += '<p class="muted">Download a calendar file with the key deadlines and your reminders, then open it to add them to Apple, Google or Outlook calendar.</p><div class="row"><button class="btn" id="ics">Download calendar file</button><button class="btn ghost" id="notif">Allow pop-up notifications</button></div>';
    else html += '<p class="muted">A ready-made calendar file with the key deadlines and a weekly revision slot is in your project folder as <code>study-site/uni-revision-calendar.ics</code>. Open it on your phone to add the events. When you open the offline copy of this site (<code>study-site/index.html</code>) you can also download a calendar file that includes your own reminders.</p>';
    html += '</div></div>';
    h(html);
    bindReminderRows();
    app.querySelector('#remform').addEventListener('submit', function (e) {
      e.preventDefault();
      const text = app.querySelector('#r-text').value.trim(); if (!text) return;
      S.reminders.push({ id: 'r' + Date.now(), text: text, date: app.querySelector('#r-date').value || today(), time: app.querySelector('#r-time').value, repeat: app.querySelector('#r-rep').value });
      save(); renderReminders(); toast('Reminder added');
    });
    on('[data-quick]', 'click', function (e) {
      const q = e.currentTarget.dataset.quick; const t = today();
      if (q === 'daily') S.reminders.push({ id: 'r' + Date.now(), text: 'Flashcard review (10 minutes)', date: t, time: '19:00', repeat: 'daily' });
      if (q === 'weekly') { const d = parseDate(t); const add = (7 - d.getDay()) % 7; S.reminders.push({ id: 'r' + Date.now(), text: 'Mixed mini test, both modules', date: addDays(t, add), time: '11:00', repeat: 'weekly' }); }
      if (q === 'assign') S.reminders.push({ id: 'r' + Date.now(), text: 'Plan the COM106 assignment: read the scenario, sketch the ER diagram', date: '2026-11-16', time: '10:00', repeat: 'none' });
      save(); renderReminders(); toast('Reminder added');
    });
    const ics = app.querySelector('#ics'); if (ics) ics.addEventListener('click', downloadIcs);
    const nb = app.querySelector('#notif'); if (nb) nb.addEventListener('click', function () {
      try {
        if (!('Notification' in window)) return toast('This browser does not support notifications.');
        Notification.requestPermission().then(function (p) { toast(p === 'granted' ? 'Notifications on while this page is open' : 'Notifications were not allowed'); });
      } catch (err) { toast('Notifications are not available here.'); }
    });
  }
  function icsDate(d, time) { return d.replace(/-/g, '') + (time ? 'T' + time.replace(':', '') + '00' : ''); }
  function downloadIcs() {
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Uni revision//EN', 'CALSCALE:GREGORIAN'];
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    function ev(uid, date, time, title, desc, rrule) {
      lines.push('BEGIN:VEVENT', 'UID:' + uid + '@uni-revision', 'DTSTAMP:' + stamp);
      if (time) { lines.push('DTSTART:' + icsDate(date, time), 'DURATION:PT30M'); }
      else { lines.push('DTSTART;VALUE=DATE:' + icsDate(date), 'DTEND;VALUE=DATE:' + icsDate(addDays(date, 1))); }
      lines.push('SUMMARY:' + title.replace(/[,;]/g, '\\$&'));
      if (desc) lines.push('DESCRIPTION:' + desc.replace(/[,;]/g, '\\$&'));
      if (rrule) lines.push('RRULE:' + rrule);
      lines.push('BEGIN:VALARM', 'TRIGGER:' + (time ? '-PT0M' : '-PT15H'), 'ACTION:DISPLAY', 'DESCRIPTION:' + title.replace(/[,;]/g, '\\$&'), 'END:VALARM', 'END:VEVENT');
    }
    KEY_DATES.forEach(function (k) { ev(k.id, k.date, k.time, k.what, k.detail, null); });
    S.reminders.forEach(function (r) { if (!r.done) ev(r.id, r.date, r.time, r.text, 'Study reminder', r.repeat === 'daily' ? 'FREQ=DAILY' : r.repeat === 'weekly' ? 'FREQ=WEEKLY' : null); });
    lines.push('END:VCALENDAR');
    try {
      const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'uni-revision.ics';
      document.body.appendChild(a); a.click(); a.remove();
    } catch (e) { toast('Could not create the file in this browser.'); }
  }

  /* ---------------- Toast + reminder pop-ups ---------------- */
  let toastTimer = null;
  function toast(msg, action) {
    let el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.innerHTML = '<span>' + esc(msg) + '</span>' + (action ? '<button id="toastact">' + esc(action.label) + '</button>' : '') + '<button id="toastx" aria-label="Dismiss">✕</button>';
    el.hidden = false;
    el.querySelector('#toastx').addEventListener('click', function () { el.hidden = true; });
    if (action) el.querySelector('#toastact').addEventListener('click', function () { el.hidden = true; action.fn(); });
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.hidden = true; }, action ? 15000 : 3500);
  }
  const notified = {};
  function checkReminders() {
    const now = new Date(); const hm = pad(now.getHours()) + ':' + pad(now.getMinutes());
    S.reminders.forEach(function (r) {
      const st = reminderState(r);
      if (st.state !== 'due') return;
      if (r.time && r.time > hm) return;
      const key = r.id + st.date;
      if (notified[key]) return;
      notified[key] = true;
      toast('Reminder: ' + r.text, { label: 'Open', fn: function () { go('reminders'); } });
      try { if ('Notification' in window && Notification.permission === 'granted') new Notification('Study reminder', { body: r.text }); } catch (e) { /* ignore */ }
    });
    updateNav();
  }

  /* ---------------- Boot ---------------- */
  const start = (location.hash || '').slice(1);
  if (TOPIC[start]) go('topic', { id: start, tab: 'notes' });
  else if (['today', 'topics', 'review', 'test', 'reminders'].indexOf(start) >= 0) go(start);
  else go('today');
  const due = dueCards().length;
  if (due && view.name === 'today') setTimeout(function () { toast(due + ' flashcard' + (due === 1 ? ' is' : 's are') + ' due today', { label: 'Review', fn: function () { go('review'); } }); }, 600);
  checkReminders();
  setInterval(checkReminders, 30000);
})();
