(function () {
  var K = window.KV, esc = K.esc;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function playV(v) { if (!v) return; if (!v.src && v.dataset.src) v.src = v.dataset.src; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  var I = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 12 5 5 9-10"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6h14v-6"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5C19 15.6 12 20 12 20Z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>'
  };
  var NODE = {
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/></svg>',
    img: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m4 18 6-5 4 3 3-2 4 3"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>',
    cut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6" cy="7" r="3"/><circle cx="6" cy="17" r="3"/><path d="M8.5 8.5 20 18M8.5 15.5 20 6"/></svg>',
    face: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8M9 9.5h.01M15 9.5h.01"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>'
  };
  function nodeIcon(k) {
    if (/각본|콘티/.test(k)) return NODE.pen;
    if (/원화|콘셉트|캐릭터|배경|작화/.test(k)) return NODE.img;
    if (/영상|움직임/.test(k)) return NODE.film;
    if (/목소리/.test(k)) return NODE.mic;
    if (/음악/.test(k)) return NODE.note;
    if (/편집/.test(k)) return NODE.cut;
    if (/연기/.test(k)) return NODE.face;
    return NODE.spark;
  }
  var MOOD = { spring: .2, charge: .85, singularity: .35, sprite: .6, coffee: .45, hero: .8, wingit: .65, glass: .4, sintel: .55 };
  var REAL = { real: 1, paint: .5, abstract: .55, toon: .35, flat: 0 };
  function lenN(w) { return Math.max(0, Math.min(1, (w.mins - 3) / 12)); }
  function jong(t) {
    t = String(t).trim();
    var m = t.match(/[가-힣A-Za-z0-9](?=[^가-힣A-Za-z0-9]*$)/); if (!m) return 0;
    var ch = m[0], code = ch.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) return (code - 0xAC00) % 28;
    if (/[0-9]/.test(ch)) return { '0': 21, '1': 8, '3': 16, '6': 1, '7': 8, '8': 8 }[ch] || 0;
    return /kling$/i.test(t.replace(/[^A-Za-z]+$/, '')) ? 21 : 0;
  }
  function J(t, pair) { var p = pair.split('/'), j = jong(t); if (pair === '으로/로') return t + (j && j !== 8 ? p[0] : p[1]); return t + (j ? p[0] : p[1]); }
  function toolsText(w) { var t = w.tools.slice(0, 2).join('·'); return w.methodKey === 'human' ? '사람이 만들고 ' + J(t, '으로/로') + ' 다듬은' : J(t, '으로/로') + ' 만든'; }
  function typeInto(el, html, speed, done) {
    if (reduce) { el.innerHTML = html; if (done) done(); return; }
    var tmp = document.createElement('div'); tmp.innerHTML = html; var text = tmp.textContent; var i = 0;
    el.textContent = '';
    var t = setInterval(function () {
      i += 2; el.textContent = text.slice(0, i);
      if (i >= text.length) { clearInterval(t); el.innerHTML = html; if (done) done(); }
    }, speed || 18);
  }

  var nav = $('#nav');
  if (nav && !nav.classList.contains('solid')) {
    var ns = function () { nav.classList.toggle('solid', window.scrollY > 40); };
    window.addEventListener('scroll', ns, { passive: true }); ns();
  }

  /* HOME */
  if ($('#stage')) {
    var stage = $('#stage'), orb = $('#orb'), q = $('#q');
    if (fine) document.addEventListener('mousemove', function (e) {
      var x = (e.clientX / innerWidth - .5) * 24, y = (e.clientY / innerHeight - .5) * 24;
      orb.style.setProperty('--mx', x.toFixed(1) + 'px'); orb.style.setProperty('--my', y.toFixed(1) + 'px');
    });
    var pulse = function () { orb.style.setProperty('--pulse', '1.07'); clearTimeout(pulse.t); pulse.t = setTimeout(function () { orb.style.setProperty('--pulse', '1'); }, 160); };
    q.addEventListener('input', pulse);
    var examples = ['잠들기 전에 볼 잔잔한 애니메이션', '실사 같은 SF 단편', '5분 안에 끝나는 웃긴 거', 'Runway로 만든 작품', '아이랑 같이 볼 판타지'];
    var ei = 0, ci = 0, del = false;
    (function tick() {
      if (document.activeElement === q || q.value) { setTimeout(tick, 600); return; }
      var s = examples[ei];
      if (!del) { ci++; if (ci > s.length) { del = true; setTimeout(tick, 1600); return; } }
      else { ci -= 2; if (ci <= 0) { ci = 0; del = false; ei = (ei + 1) % examples.length; } }
      q.setAttribute('placeholder', s.slice(0, ci));
      setTimeout(tick, del ? 25 : 70);
    })();
    var sugg = ['잔잔한 거, 잠들기 전에', '실사 같은 AI 영상', '손그림 느낌', '웃긴 거 5분 이하', '우주가 나오는 거', 'Runway로 만든 작품', '아이랑 같이 볼 거'];
    $('#sugg').innerHTML = sugg.map(function (s) { return '<button class="chip" type="button">' + esc(s) + '</button>'; }).join('');
    var TOOLS = ['Midjourney', 'Runway', 'Veo', 'Kling', 'Sora', 'Flux', 'ComfyUI', 'Topaz', 'ElevenLabs', 'Suno', 'Udio'];
    var parse = function (s) {
      var c = [];
      if (/잔잔|잠들|조용|힐링|편안/.test(s)) c.push({ k: 'mood', v: 'calm', label: '잔잔한 분위기' });
      if (/신나|박진|액션|긴장/.test(s)) c.push({ k: 'mood', v: 'hot', label: '박진감' });
      if (/웃긴|코미디|유쾌/.test(s)) c.push({ k: 'tag', v: '코미디', label: '웃긴 이야기' });
      if (/무서|호러|오싹/.test(s)) c.push({ k: 'tag', v: '호러', label: '오싹한' });
      if (/우주|SF|미래/i.test(s)) c.push({ k: 'tag', v: 'SF', label: 'SF·우주' });
      if (/판타지|마법|용/.test(s)) c.push({ k: 'tag', v: '판타지', label: '판타지' });
      if (/실사/.test(s)) c.push({ k: 'look', v: 'real', label: '실사 같은 그림' });
      if (/손그림|2D|그림 같은|만화/i.test(s)) c.push({ k: 'look', v: 'flat', label: '손그림 느낌' });
      if (/아이|가족|같이/.test(s)) c.push({ k: 'kid', label: '전체관람가' });
      var m = s.match(/(\d+)\s*분/);
      if (m) c.push({ k: 'max', v: +m[1], label: m[1] + '분 이하' });
      else if (/짧은|짧게|금방/.test(s)) c.push({ k: 'max', v: 5, label: '5분 이하' });
      TOOLS.forEach(function (t) { if (s.toLowerCase().indexOf(t.toLowerCase()) >= 0) c.push({ k: 'tool', v: t, label: t + '로 만든' }); });
      return c;
    };
    var hitOf = function (w, x) {
      if (x.k === 'mood') return x.v === 'calm' ? MOOD[w.id] < .45 : MOOD[w.id] > .6;
      if (x.k === 'tag') return w.tags.indexOf(x.v) >= 0;
      if (x.k === 'look') return x.v === 'real' ? w.lookKey === 'real' : w.lookKey === 'flat';
      if (x.k === 'kid') return w.rating === '전체관람가';
      if (x.k === 'max') return w.mins <= x.v;
      if (x.k === 'tool') return w.tools.indexOf(x.v) >= 0;
      return false;
    };
    var last = [];
    var ask = function (text, crit) {
      var c = crit || parse(text);
      last = c;
      stage.classList.add('asked');
      $('#hint').style.display = 'none';
      var ranked = K.works.map(function (w, i) {
        var hits = c.filter(function (x) { return hitOf(w, x); });
        return { w: w, s: hits.length - i * 0.01, hits: hits };
      }).sort(function (a, b) { return b.s - a.s; }).slice(0, 3);
      var top = ranked[0].w, c0 = K.creatorOf(top);
      var lead = c.length ? c.map(function (x) { return '‘' + x.label + '’'; }).join(', ') + '에 맞춰 세 편을 골랐어요. ' : '정확히 짚지는 못했지만, 요즘 끝까지 많이 본 작품으로 골랐어요. ';
      var aiSt = top.stages.filter(function (s) { return s.tool && s.who !== '사람'; }).slice(0, 2);
      var first = '첫 번째 <b>' + esc(J('〈' + top.title + '〉', '은/는')) + '</b> ' + esc(J(c0.name, '이/가')) + ' ' + esc(aiSt.map(function (s) { return J(s.k, '은/는') + ' ' + J(s.tool.split(' ')[0], '으로/로'); }).join(', ')) + ' 만든 ' + esc(top.runtime) + '짜리 작품이에요.';
      typeInto($('#say'), esc(lead) + first, 14);
      $('#picks').innerHTML = ranked.map(function (r) {
        var w = r.w, pct = Math.min(98, Math.round(c.length ? 58 + 40 * r.hits.length / c.length : 72) - ranked.indexOf(r) * 3);
        var why = r.hits.map(function (x) { return x.label; });
        why.push(w.runtime); why.push(toolsText(w));
        return '<div class="pick glass"><a class="pick-pic" href="work.html?id=' + w.id + '"><img src="' + w.wide + '" alt=""><video muted playsinline loop preload="none" data-src="' + w.prev + '"></video><span class="m"><i class="ring" style="--p:' + pct + '"></i>취향 ' + pct + '%</span></a>' +
          '<div class="pick-b"><div class="pick-t">' + esc(w.title) + '<small>' + esc(w.en) + '</small></div><div class="why">' + why.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div>' +
          '<p>' + esc(w.logline) + '</p><a class="btn w" href="work.html?id=' + w.id + '">' + I.play + '바로 보기</a></div></div>';
      }).join('');
      $$('#picks .pick').forEach(function (p, i) {
        setTimeout(function () { p.classList.add('in'); }, 200 + i * 160);
        var v = $('video', p);
        if (fine) { p.addEventListener('mouseenter', function () { playV(v); }); p.addEventListener('mouseleave', function () { v.pause(); }); }
      });
      $('#refine').innerHTML = '<span class="klabel">다시 고르기</span>' + ['더 짧은 걸로', '실사 같은 걸로', '그림 같은 걸로', '다른 분위기로', '처음부터'].map(function (t) { return '<button class="chip" type="button">' + t + '</button>'; }).join('');
      $$('#refine .chip').forEach(function (b) {
        b.addEventListener('click', function () {
          var t = b.textContent, nc = last.filter(function (x) { return true; });
          if (t === '처음부터') { stage.classList.remove('asked'); $('#hint').style.display = ''; q.value = ''; window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
          if (t === '더 짧은 걸로') { nc = nc.filter(function (x) { return x.k !== 'max'; }); nc.push({ k: 'max', v: 4, label: '4분 이하' }); }
          if (t === '실사 같은 걸로') { nc = nc.filter(function (x) { return x.k !== 'look'; }); nc.push({ k: 'look', v: 'real', label: '실사 같은 그림' }); }
          if (t === '그림 같은 걸로') { nc = nc.filter(function (x) { return x.k !== 'look'; }); nc.push({ k: 'look', v: 'flat', label: '손그림 느낌' }); }
          if (t === '다른 분위기로') { var md = nc.filter(function (x) { return x.k === 'mood'; })[0]; nc = nc.filter(function (x) { return x.k !== 'mood'; }); nc.push(md && md.v === 'calm' ? { k: 'mood', v: 'hot', label: '박진감' } : { k: 'mood', v: 'calm', label: '잔잔한 분위기' }); }
          pulse(); ask('', nc);
        });
      });
      pulse();
      setTimeout(function () { var a = $('#answer'); var y = a.getBoundingClientRect().top + window.scrollY - 90; window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }); }, 900);
    };
    $('#ask').addEventListener('submit', function (e) { e.preventDefault(); if (!q.value.trim()) q.value = q.getAttribute('placeholder') || sugg[0]; ask(q.value.trim()); });
    $$('#sugg .chip').forEach(function (b) { b.addEventListener('click', function () { q.value = b.textContent; ask(b.textContent); }); });

    var lab0 = ['아주 잔잔하게', '잔잔한 편', '적당히', '긴장감 있게', '박진감 있게'], lab1 = ['3분 안쪽', '5분 안팎', '7분 안팎', '10분 안팎', '15분 정도'], lab2 = ['손그림 같은', '그림 쪽', '중간', '실사 쪽', '실사 같은'];
    var renderDial = function () {
      var t0 = $('#k0').value / 100, t1 = $('#k1').value / 100, t2 = $('#k2').value / 100;
      $('#v0').textContent = lab0[Math.min(4, Math.floor(t0 * 5))]; $('#v1').textContent = lab1[Math.min(4, Math.floor(t1 * 5))]; $('#v2').textContent = lab2[Math.min(4, Math.floor(t2 * 5))];
      var ranked = K.works.map(function (w) {
        var a = MOOD[w.id], b = lenN(w), c = REAL[w.lookKey];
        var d = Math.sqrt((Math.pow(a - t0, 2) + Math.pow(b - t1, 2) + Math.pow(c - t2, 2)) / 3);
        return { w: w, m: Math.round((1 - d) * 100), a: a, b: b, c: c };
      }).sort(function (x, y) { return y.m - x.m; }).slice(0, 4);
      $('#dialRes').innerHTML = ranked.map(function (r) {
        var w = r.w;
        return '<a class="dr glass" href="work.html?id=' + w.id + '"><img src="' + w.poster + '" alt=""><div><div class="score"><i class="ring" style="--p:' + r.m + '"></i>지금 기분과 ' + r.m + '%</div><b>' + esc(w.title) + '</b><div class="meta">' + esc(w.genre) + ' · ' + esc(w.runtime) + '</div>' +
          '<div class="bars"><div class="bar">분위기<i style="--w:' + Math.round(r.a * 100) + '%"></i></div><div class="bar">길이<i style="--w:' + Math.round(r.b * 100) + '%"></i></div><div class="bar">실사감<i style="--w:' + Math.round(r.c * 100) + '%"></i></div></div></div></a>';
      }).join('');
    };
    ['#k0', '#k1', '#k2'].forEach(function (s) { $(s).addEventListener('input', renderDial); });
    renderDial();

    var tCount = {};
    K.works.forEach(function (w) { w.tools.forEach(function (t) { tCount[t] = (tCount[t] || 0) + 1; }); });
    var tools = Object.keys(tCount).sort(function (a, b) { return tCount[b] - tCount[a]; });
    $('#tools').innerHTML = tools.map(function (t) { return '<div class="tool" data-t="' + t + '">' + t + '<small>' + K.toolInfo[t] + ' · ' + tCount[t] + '편</small></div>'; }).join('');
    $('#mworks').innerHTML = K.works.map(function (w) { return '<a class="mw" href="work.html?id=' + w.id + '" data-w="' + w.id + '"><img src="' + w.poster + '" alt=""><div><b>' + esc(w.title) + '</b><span>' + esc(w.method) + '</span></div></a>'; }).join('');
    var box = $('#mapBox'), lines = $('#lines');
    var draw = function () {
      if (innerWidth <= 760) { lines.innerHTML = ''; return; }
      var br = box.getBoundingClientRect(), out = '';
      K.works.forEach(function (w) {
        var we = $('.mw[data-w="' + w.id + '"] img', box); if (!we) return;
        var r2 = we.getBoundingClientRect(), x2 = r2.left - br.left, y2 = r2.top - br.top + r2.height / 2;
        w.tools.forEach(function (t) {
          var te = $('.tool[data-t="' + t + '"]', box); var r1 = te.getBoundingClientRect();
          var x1 = r1.right - br.left, y1 = r1.top - br.top + r1.height / 2, mx = (x1 + x2) / 2;
          out += '<path data-t="' + t + '" data-w="' + w.id + '" d="M' + x1 + ' ' + y1 + ' C' + mx + ' ' + y1 + ', ' + mx + ' ' + y2 + ', ' + x2 + ' ' + y2 + '"/>';
        });
      });
      lines.innerHTML = out;
    };
    var focus = function (attr, val) {
      box.classList.add('focus');
      $$('path', lines).forEach(function (p) { p.classList.toggle('hl', p.getAttribute(attr) === val); });
      var ws = {}, ts = {};
      $$('path.hl', lines).forEach(function (p) { ws[p.getAttribute('data-w')] = 1; ts[p.getAttribute('data-t')] = 1; });
      $$('.mw', box).forEach(function (m) { m.classList.toggle('hl', !!ws[m.dataset.w]); });
      $$('.tool', box).forEach(function (m) { m.classList.toggle('hl', !!ts[m.dataset.t]); });
    };
    var unfocus = function () { box.classList.remove('focus'); $$('.hl', box).forEach(function (e) { e.classList.remove('hl'); }); };
    $$('.tool', box).forEach(function (t) {
      t.addEventListener('mouseenter', function () { focus('data-t', t.dataset.t); });
      t.addEventListener('click', function () { focus('data-t', t.dataset.t); });
      t.addEventListener('mouseleave', unfocus);
    });
    $$('.mw', box).forEach(function (m) { m.addEventListener('mouseenter', function () { focus('data-w', m.dataset.w); }); m.addEventListener('mouseleave', unfocus); });
    window.addEventListener('resize', draw);
    window.addEventListener('load', draw);
    setTimeout(draw, 300);

    $('#listBox').innerHTML = [
      { t: '말없이 흘러가는 화면', ids: ['spring', 'singularity', 'sintel'], d: '3편 · 약 29분', n: '대사가 적고 화면이 천천히 흘러가는 작품만 모았어요. 틀어 두기 좋아요.' },
      { t: 'AI가 그린 하늘', ids: ['hero', 'wingit', 'spring'], d: '3편 · 약 16분', n: '세 작품 모두 하늘 장면을 AI 영상으로 만들었어요. 구름 표현을 비교해 보세요.' },
      { t: '5분이면 충분한', ids: ['coffee', 'glass', 'charge'], d: '3편 · 약 11분', n: '출근길에 한 편씩. 모두 5분이 안 걸려요.' }
    ].map(function (l) {
      return '<a class="lst glass" href="work.html?id=' + l.ids[0] + '"><div class="stack">' + l.ids.map(function (id) { return '<img src="' + K.work(id).poster + '" alt="">'; }).join('') + '</div><div><h3>' + esc(l.t) + '</h3><p>' + esc(l.d) + '</p></div><div class="note"><span class="av"></span>' + esc(l.n) + '</div></a>';
    }).join('');
  }

  /* WORK */
  if ($('#wp')) {
    var qs = new URLSearchParams(location.search);
    var w = K.work(qs.get('id') || 'singularity') || K.work('singularity'), c = K.creatorOf(w);
    document.title = w.title + ' — KIVELO 시안 3';
    var wp = $('#wp'), wv = $('#wv'), mon = w.montage;
    wv.src = mon ? mon.src : w.prev; if (!mon) wv.loop = true;
    $('#wpPoster').src = mon ? mon.poster : w.wide;
    var parts = mon ? mon.parts : [{ at: 0, scene: 0 }];
    var curScene = -1;
    var fmt = function (s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); };
    var start = function (t) { wp.classList.add('on'); if (t != null) wv.currentTime = t; playV(wv); };
    $('#wpPlayTxt').textContent = w.free ? '재생 · 시작 전 광고 1회' : '재생 · 광고 없이';
    $('#wpPlay').addEventListener('click', function () { start(null); });
    $('#wpPP').addEventListener('click', function () { if (wv.paused) { playV(wv); this.textContent = '일시정지'; } else { wv.pause(); this.textContent = '재생'; } });
    $('#wpTr').addEventListener('click', function (e) { var r = this.getBoundingClientRect(); wv.currentTime = (e.clientX - r.left) / r.width * (wv.duration || 1); });
    wv.addEventListener('timeupdate', function () {
      var d = wv.duration || 1; $('#wpFill').style.width = (wv.currentTime / d * 100) + '%'; $('#wpTime').textContent = fmt(wv.currentTime) + ' / ' + fmt(d);
      var k = 0; for (var i = 0; i < parts.length; i++) if (wv.currentTime >= parts[i].at) k = i;
      var sj = parts[k].scene;
      if (sj !== curScene) {
        curScene = sj; var sc = w.scenes[sj];
        if (sc) $('#wpScene span').textContent = sc.title + ' · ' + sc.how.split(' · ')[0].split(' → ')[0];
        $$('.scn').forEach(function (e, j) { e.classList.toggle('on', j === sj); });
      }
    });
    wv.addEventListener('ended', function () { wv.currentTime = 0; playV(wv); });

    $('#wT').textContent = w.title; $('#wEn').textContent = w.en; $('#wLog').textContent = w.logline;
    $('#wMeta').innerHTML = '<span><b>' + esc(c.name) + '</b></span><span>' + esc(w.genre) + '</span><span>' + esc(w.runtime) + '</span><span>' + esc(w.rating) + '</span><span>' + esc(w.look) + '</span><span>' + esc(w.method) + '</span>';
    $('#wAct').innerHTML = '<button class="btn w" type="button" id="playTop">' + I.play + '처음부터 보기</button><button class="btn g" type="button" id="fav">' + I.plus + '관심 작품</button><button class="btn g" type="button">' + I.share + '공유</button>';
    $('#playTop').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); start(0); });
    $('#fav').addEventListener('click', function () { this.classList.toggle('on'); this.innerHTML = this.classList.contains('on') ? I.check + '관심 작품' : I.plus + '관심 작품'; });

    var msgs = $('#msgs');
    var bot = function (html, extra) {
      var m = document.createElement('div'); m.className = 'msg bot'; m.textContent = '…'; msgs.appendChild(m); msgs.scrollTop = msgs.scrollHeight;
      setTimeout(function () { typeInto(m, html, 12, function () { if (extra) m.insertAdjacentHTML('beforeend', extra); msgs.scrollTop = msgs.scrollHeight; }); }, 450);
    };
    var me = function (t) { var m = document.createElement('div'); m.className = 'msg me'; m.textContent = t; msgs.appendChild(m); msgs.scrollTop = msgs.scrollHeight; };
    var aiN = w.stages.filter(function (s) { return s.who === 'AI'; }).length, huN = w.stages.filter(function (s) { return s.who === '사람'; }).length, mixN = w.stages.filter(function (s) { return s.who === '함께'; }).length;
    var recs = K.works.filter(function (x) { return x.id !== w.id; }).map(function (x) {
      var same = x.tools.filter(function (t) { return w.tools.indexOf(t) >= 0; });
      return { x: x, same: same, d: Math.abs(MOOD[x.id] - MOOD[w.id]) - same.length * .15 };
    }).sort(function (a, b) { return a.d - b.d; }).slice(0, 3);
    var QA = [
      ['지금 이 장면은 어떻게 만들었어요?', function () {
        var sc = w.scenes[Math.max(0, curScene)];
        return (curScene < 0 ? '아직 재생 전이라 첫 장면 기준으로 말씀드릴게요. ' : '지금 보고 계신 장면은 ') + '<b>‘' + esc(sc.title) + '’</b>' + (jong(sc.title) ? '이에요' : '예요') + '. ' + esc(sc.how) + '. 창작자가 장면마다 직접 적어 준 정보예요.';
      }],
      ['AI가 얼마나 들어갔어요?', function () {
        return '공정 ' + w.stages.length + '개 중 AI가 ' + aiN + '개, 사람이 ' + huN + '개' + (mixN ? ', 함께 만든 게 ' + mixN + '개' : '') + '예요. ' + esc(J(w.stages.filter(function (s) { return s.who === '사람'; }).map(function (s) { return s.k; }).join('·'), '은/는')) + ' 사람이 했어요.';
      }],
      ['비슷한 작품 추천해 줘', function () { return '분위기와 만든 방식이 가까운 순서로 골랐어요.'; }, function () {
        return '<div class="mini">' + recs.map(function (r) { return '<a href="work.html?id=' + r.x.id + '"><img src="' + r.x.poster + '" alt=""><span>' + esc(r.x.title) + '</span></a>'; }).join('') + '</div>';
      }],
      ['누가 만들었어요?', function () { return '<b>' + esc(c.name) + '</b>' + (jong(c.name) ? '이에요' : '예요') + '. ' + esc(c.bio) + ' 관심 창작자로 두시면 새 작품이 나올 때 알려 드릴게요.'; }],
      ['권리 확인은 됐나요?', function () { return '네. ' + esc(w.review) + '. 키벨로에서는 운영팀이 확인한 작품만 공개해요.'; }],
      ['몇 분이에요?', function () { return esc(w.runtime) + '예요. ' + (w.free ? '무료로 보시면 시작 전에 짧은 광고가 한 번 나와요.' : '구독 작품이라 광고 없이 바로 볼 수 있어요.'); }]
    ];
    $('#qs').innerHTML = QA.map(function (x, i) { return '<button class="chip" type="button" data-i="' + i + '">' + x[0] + '</button>'; }).join('');
    $$('#qs .chip').forEach(function (b) {
      b.addEventListener('click', function () { var x = QA[+b.dataset.i]; me(x[0]); bot(x[1](), x[2] ? x[2]() : null); });
    });
    bot('<b>〈' + esc(w.title) + '〉</b>' + (jong(w.title) ? '을' : '를') + ' 고르셨네요. ' + esc(w.memo.split('.')[0]) + '. 궁금한 걸 아래에서 골라 물어보세요.');

    $('#flow').innerHTML = w.stages.map(function (s, i) {
      var cls = s.who === 'AI' ? ' ai' : s.who === '함께' ? ' mix' : '';
      return '<div class="step' + cls + '" data-i="' + i + '"><div class="node">' + nodeIcon(s.k) + '</div><b>' + esc(s.k) + '</b><span>' + esc(s.tool || (s.who === '없음' ? '없음' : '창작자 직접')) + '</span><em>' + (s.who === 'AI' ? 'AI' : s.who === '함께' ? 'AI + 사람' : s.who === '없음' ? '—' : '사람') + '</em></div>';
    }).join('');
    var showStep = function (i) {
      var s = w.stages[i];
      $$('.step').forEach(function (e, j) { e.classList.toggle('on', j === i); });
      var base = s.tool ? s.tool.split(' ')[0] : null;
      var used = base ? w.scenes.filter(function (sc) { return sc.how.indexOf(base) >= 0; }).map(function (sc) { return sc.title; }) : [];
      $('#stepDetail').innerHTML = '<b>' + esc(s.k) + '</b> — ' + (s.who === '없음' ? '이 작품에는 대사가 없어 이 공정은 비어 있어요.' : s.tool ? esc(s.tool) + (s.who === '함께' ? ' (AI와 사람이 함께)' : ' (AI)') + (used.length ? ' · 이 도구가 쓰인 장면: ' + esc(used.join(', ')) : '') : esc(J(c.name, '이/가')) + ' 직접 했어요.');
    };
    $$('.step').forEach(function (e) { e.addEventListener('click', function () { showStep(+e.dataset.i); }); });
    showStep(Math.max(0, w.stages.findIndex(function (s) { return s.who === 'AI'; })));

    $('#scenes').innerHTML = w.scenes.map(function (s, j) {
      return '<div class="scn glass" data-j="' + j + '"><div class="p"><img src="' + s.img + '" alt="" loading="lazy"><span>' + esc(s.t) + '</span></div><div class="c"><b>' + esc(s.title) + '</b><span>' + esc(s.how) + '</span></div></div>';
    }).join('');
    $$('.scn').forEach(function (e) {
      e.addEventListener('click', function () { var j = +e.dataset.j; var p = parts.filter(function (x) { return x.scene === j; })[0]; window.scrollTo({ top: 0, behavior: 'smooth' }); start(p ? p.at : 0); });
    });
    $('#recs').innerHTML = recs.map(function (r) {
      var x = r.x, why = [];
      if (Math.abs(MOOD[x.id] - MOOD[w.id]) < .2) why.push('분위기가 비슷해요');
      if (r.same.length) why.push('같은 도구 · ' + r.same.join(', '));
      if (x.methodKey === w.methodKey) why.push('같은 제작 방식');
      return '<div class="pick glass in"><a class="pick-pic" href="work.html?id=' + x.id + '"><img src="' + x.wide + '" alt=""></a><div class="pick-b"><div class="pick-t">' + esc(x.title) + '<small>' + esc(x.runtime) + '</small></div><div class="why">' + why.map(function (y) { return '<span>' + esc(y) + '</span>'; }).join('') + '</div><a class="btn g" href="work.html?id=' + x.id + '">' + I.play + '보기</a></div></div>';
    }).join('');
  }

  /* SHORTS */
  if ($('#csFeed')) {
    var NOTE = {
      sh01: '동굴 천장의 갈비뼈가 숨 쉬듯 움직이는 장면이에요.', sh02: '실사처럼 보이지만 모든 장면을 영상 생성으로 만들었어요.', sh03: '해파리 속 빛이 박동처럼 번지는 부분을 보세요.',
      sh04: '버섯들의 표정이 하나하나 달라요.', sh05: '나무가 산을 타고 자라 오르는 장면이에요.', sh06: '과장된 표정은 프롬프트로 조절했대요.',
      sh07: '구름을 가르는 비행 장면은 Kling으로 움직였어요.', sh08: '작은 생명의 첫 눈맞춤, 이야기의 시작이에요.', sh09: '노을 속 용 실루엣은 합성으로 넣었어요.',
      sh10: '초록 불빛이 번지는 순간 분위기가 확 바뀌어요.', sh11: '불가에 앉은 두 사람. 숨소리는 직접 녹음했대요.', sh12: '상상이 그림 밖으로 터져 나오는 장면이에요.'
    };
    var moodsOf = { '잔잔': ['sh05', 'sh01', 'sh08', 'sh03', 'sh11'], '신나는': ['sh02', 'sh07', 'sh06', 'sh04'], '몽환': ['sh03', 'sh08', 'sh01', 'sh09'], '웃긴': ['sh06', 'sh04', 'sh12', 'sh10'] };
    var order = K.shorts.map(function (s) { return s.id; });
    var feed = $('#csFeed'), active = null, io;
    var render = function () {
      feed.innerHTML = order.map(function (id) {
        var s = K.shorts.filter(function (x) { return x.id === id; })[0], w = K.work(s.work), c = K.creatorOf(w);
        return '<article class="ci" id="' + s.id + '" data-id="' + s.id + '"><video muted playsinline loop preload="none" poster="' + s.poster + '" data-src="' + s.src + '"></video>' +
          '<div class="ci-note"><span class="av"></span><div><small>큐레이터 한마디</small>' + esc(NOTE[s.id]) + '</div></div>' +
          '<div class="ci-b"><div class="t">' + esc(s.title) + '</div><div class="who">' + esc(c.name) + ' · ' + esc(w.genre) + '</div>' +
          '<button class="ci-why" type="button">' + I.info + '왜 이 쇼츠예요?</button><div class="ci-whytxt">' + esc(w.tags.slice(0, 2).join('·')) + ' 쪽을 오래 보셔서 골랐어요. ' + esc(toolsText(w)) + ' 작품이에요.</div>' +
          '<a class="ci-go" href="work.html?id=' + w.id + '"><img src="' + w.poster + '" alt=""><div><b>본편 ' + esc(w.title) + '</b><span>' + esc(s.at) + '부터 · ' + esc(w.runtime) + '</span></div></a></div>' +
          '<div class="ci-r"><button type="button" class="lk">' + I.heart + '관심</button><button type="button">' + I.chat + '묻기</button><button type="button">' + I.share + '공유</button></div></article>';
      }).join('');
      $$('.ci-why', feed).forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('open'); }); });
      $$('.ci-r .lk', feed).forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('liked'); }); });
      if (io) io.disconnect();
      active = null;
      io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var v = $('video', e.target);
          if (e.intersectionRatio >= .6) {
            if (active !== e.target) {
              if (active) active.classList.remove('act');
              active = e.target; active.classList.add('act'); playV(v); side(e.target.dataset.id);
              if (history.replaceState) history.replaceState(null, '', '#' + e.target.dataset.id);
            }
          } else v.pause();
        });
      }, { root: feed, threshold: [0, .6] });
      $$('.ci', feed).forEach(function (el) { io.observe(el); });
    };
    var side = function (id) {
      var r = $('#csRight'); if (!r) return;
      var s = K.shorts.filter(function (x) { return x.id === id; })[0], w = K.work(s.work);
      r.innerHTML = '<div class="klabel" style="margin-bottom:10px">본편으로</div><a class="card glass" href="work.html?id=' + w.id + '"><img src="' + w.wide + '" alt=""><div><b>' + esc(w.title) + '</b><p>' + esc(w.logline) + '</p><span class="btn w">' + I.play + s.at + '부터 이어 보기</span></div></a>' +
        '<div class="klabel" style="margin:22px 0 10px">이 쇼츠의 제작정보</div><div class="glass" style="border-radius:16px;padding:6px 16px">' +
        w.stages.filter(function (x) { return x.who !== '없음'; }).map(function (x) { return '<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--line);font-size:13px"><span style="color:var(--mute)">' + esc(x.k) + '</span><span>' + esc(x.tool || '사람') + '</span></div>'; }).join('') + '</div>';
    };
    $('#moods').innerHTML = ['전체', '잔잔', '신나는', '몽환', '웃긴'].map(function (m, i) { return '<button class="chip' + (i ? '' : ' on') + '" type="button">' + m + '</button>'; }).join('');
    $$('#moods .chip').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('#moods .chip').forEach(function (x) { x.classList.toggle('on', x === b); });
        var pick = moodsOf[b.textContent] || [];
        var rest = K.shorts.map(function (s) { return s.id; }).filter(function (id) { return pick.indexOf(id) < 0; });
        order = pick.concat(rest);
        render(); feed.scrollTop = 0;
      });
    });
    render();
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return; e.preventDefault();
      var items = $$('.ci', feed), i = items.indexOf(active), n = items[Math.min(items.length - 1, Math.max(0, i + (e.key === 'ArrowDown' ? 1 : -1)))];
      if (n) feed.scrollTo({ top: n.offsetTop, behavior: 'smooth' });
    });
    if (location.hash) { var t0 = document.getElementById(location.hash.slice(1)); if (t0) { var jump = function () { if (Math.abs(feed.scrollTop - t0.offsetTop) > 4) feed.scrollTop = t0.offsetTop; }; setTimeout(jump, 50); setTimeout(jump, 400); window.addEventListener('load', jump); } }
  }
})();
