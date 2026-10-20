(function () {
  var K = window.KV, M = K.M, esc = K.esc;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var I = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m5 12 5 5 9-10"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6h14v-6"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5C19 15.6 12 20 12 20Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
    vol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l4 6M21 9l-4 6"/></svg>',
    full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 15 6-6 6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 12 5 5 9-10"/></svg>'
  };
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function mono(c, size) { return '<span class="mono" style="background:hsl(' + c.hue + ' 45% 72%)' + (size ? ';width:' + size + 'px;height:' + size + 'px' : '') + '">' + esc(c.mark) + '</span>'; }
  function toolsLine(w, n) {
    var seen = {};
    return w.stages.filter(function (s) {
      if (!s.tool || s.who === '사람') return false;
      var b = s.tool.split(' ')[0]; if (seen[b]) return false; seen[b] = 1; return true;
    }).slice(0, n || 3).map(function (s) { return s.k + ' ' + s.tool.split(' ')[0]; }).join(' · ');
  }
  function lazyVideo(v) { if (!v.src && v.dataset.src) { v.src = v.dataset.src; } return v; }
  function playV(v) { lazyVideo(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); }

  var nav = $('#nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('solid', window.scrollY > 40 || document.body.classList.contains('force-solid')); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  function inViewPlayer(sel, ratio) {
    if (fine) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = $('video', e.target); if (!v) return;
        if (e.intersectionRatio >= ratio) { playV(v); e.target.classList.add('playing'); }
        else { v.pause(); e.target.classList.remove('playing'); }
      });
    }, { threshold: [0, ratio, 1] });
    $$(sel).forEach(function (el) { io.observe(el); });
  }
  function hoverPlayer(sel) {
    if (!fine) return;
    $$(sel).forEach(function (el) {
      var v = $('video', el); if (!v) return;
      el.addEventListener('mouseenter', function () { playV(v); el.classList.add('playing'); });
      el.addEventListener('mouseleave', function () { v.pause(); el.classList.remove('playing'); });
    });
  }

  function footerNote() { return ''; }

  /* ---------- HOME ---------- */
  if ($('#heroMedia')) {
    var heroItems = [
      { id: 'spring', v: M + 'hero/a1.mp4?v=2', p: M + 'hero/a1.jpg?v=2' },
      { id: 'sintel', v: M + 'hero/a2.mp4', p: M + 'hero/a2.jpg' },
      { id: 'charge', v: M + 'hero/a3.mp4', p: M + 'hero/a3.jpg' }
    ];
    var media = $('#heroMedia'), label = $('#heroLabel'), queue = $('#heroQueue');
    media.innerHTML = '<img src="' + heroItems[0].p + '" alt="">' + heroItems.map(function (h, i) {
      return '<video muted playsinline loop preload="' + (i ? 'none' : 'auto') + '" poster="' + h.p + '" ' + (i ? 'data-src' : 'src') + '="' + h.v + '"></video>';
    }).join('');
    queue.innerHTML = heroItems.map(function (h, i) {
      var w = K.work(h.id);
      return '<li data-i="' + i + '"><div class="hq-img"><img src="' + w.wide + '" alt=""></div><div class="hq-bar"><i></i></div><div class="hq-t"><b>0' + (i + 1) + '</b>' + esc(w.title) + '</div></li>';
    }).join('');
    var cur = -1, timer;
    var show = function (i) {
      if (i === cur) return;
      cur = i;
      var vids = $$('video', media);
      vids.forEach(function (v, j) {
        if (j === i) { playV(v); v.classList.add('on'); try { v.currentTime = 0; } catch (e) {} }
        else { v.classList.remove('on'); setTimeout(function () { if (!v.classList.contains('on')) v.pause(); }, 1300); }
      });
      $$('li', queue).forEach(function (li, j) { li.classList.toggle('on', j === i); var b = $('.hq-bar i', li); b.style.animation = 'none'; void b.offsetWidth; b.style.animation = ''; });
      var w = K.work(heroItems[i].id), c = K.creatorOf(w);
      label.style.opacity = 0;
      setTimeout(function () {
        label.innerHTML = '<div class="label-no"><span class="live"></span>오늘의 상영 · No.0' + (i + 1) + '</div>' +
          '<h1 class="h-title">' + esc(w.title) + '</h1>' +
          '<p class="h-en">' + esc(w.en) + '<span class="by">' + esc(c.name) + '</span></p>' +
          '<p class="h-log">' + esc(w.logline) + '</p>' +
          '<div class="ai-cap"><span class="iri-dot"></span>' + esc(w.method) + ' · ' + esc(toolsLine(w, 3)) + '</div>' +
          '<div class="h-cta"><a class="btn play" href="work.html?id=' + w.id + '">' + I.play + '지금 보기</a>' +
          '<a class="btn ghost" href="work.html?id=' + w.id + '#label">제작정보</a>' +
          '<span class="free">' + (w.free ? '무료 · 시작 전 광고 1회' : '구독 작품 · 광고 없이') + '</span></div>';
        label.style.opacity = 1;
      }, cur === 0 && !label.innerHTML ? 0 : 280);
      clearTimeout(timer);
      if (!reduce) timer = setTimeout(function () { show((cur + 1) % heroItems.length); }, 8000);
    };
    label.style.transition = 'opacity .28s';
    $$('li', queue).forEach(function (li) { li.addEventListener('click', function () { show(+li.dataset.i); }); });
    show(0);

    $('#contRow').innerHTML = [
      { id: 'charge', p: 62, s: '남은 시간 1분 40초' },
      { id: 'sprite', p: 35, s: '2화 · 남은 시간 2분 10초' },
      { id: 'sintel', p: 15, s: '남은 시간 12분 30초' }
    ].map(function (x) {
      var w = K.work(x.id);
      return '<a class="cont" href="work.html?id=' + w.id + '"><div class="cont-img"><img src="' + w.wide + '" alt=""><div class="pbar"><i style="width:' + x.p + '%"></i></div></div><div><div class="cont-t">' + esc(w.title) + '</div><div class="cont-s">' + x.s + '</div></div></a>';
    }).join('');

    var portrait = { charge: 1, singularity: 1, hero: 1 };
    $('#wall').innerHTML = K.works.map(function (w) {
      var c = K.creatorOf(w), share = K.aiShare(w);
      var img = portrait[w.id] ? w.poster : w.wide;
      var badges = (w.series ? '<span>시리즈 · 3화</span>' : '') + (w.free ? '' : '<span class="pay">구독</span>');
      return '<a class="frame w-' + w.id + '" href="work.html?id=' + w.id + '" data-tags="' + esc(w.tags.join(' ') + ' ' + w.look + ' m-' + w.methodKey + (w.series ? ' 시리즈' : '')) + '">' +
        '<div class="f-pic"><img src="' + img + '" alt="' + esc(w.title) + ' 장면" loading="lazy"><video muted playsinline loop preload="none" data-src="' + w.prev + '"></video>' +
        (badges ? '<div class="f-badge">' + badges + '</div>' : '') + '</div>' +
        '<div class="f-cap"><div class="f-title">' + esc(w.title) + '</div>' +
        '<div class="f-meta">' + esc(c.name) + ' · ' + esc(w.genre) + ' · ' + esc(w.runtime) + '</div>' +
        '<div class="f-ai"><span class="ai-ring" style="--p:' + share + '"><b>' + share + '</b></span>AI 비중</div>' +
        '<div class="f-how">' + esc(w.method) + ' — ' + esc(toolsLine(w, 3)) + '</div></div></a>';
    }).join('');
    var wallF = [['전체', ''], ['애니메이션', '애니메이션'], ['실사풍', '실사풍'], ['2D', '2D'], ['SF', 'SF'], ['판타지', '판타지'], ['코미디', '코미디'], ['시리즈', '시리즈'], ['|'], ['AI 생성 중심', 'm-ai', 1], ['AI + 사람', 'm-mix', 1], ['사람 + AI 보조', 'm-human', 1]];
    $('#wallFilters').innerHTML = wallF.map(function (f, i) {
      if (f[0] === '|') return '<span class="chip-sep"></span>';
      return '<button class="chip' + (f[2] ? ' ai' : '') + (i === 0 ? ' on' : '') + '" data-f="' + esc(f[1]) + '">' + esc(f[0]) + '</button>';
    }).join('');
    $$('#wallFilters .chip').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('#wallFilters .chip').forEach(function (x) { x.classList.toggle('on', x === b); });
        var f = b.dataset.f;
        $$('#wall .frame').forEach(function (fr) { fr.classList.toggle('off', !!f && (' ' + fr.dataset.tags + ' ').indexOf(f) < 0); });
      });
    });
    hoverPlayer('#wall .frame');
    inViewPlayer('#wall .frame', .7);

    var cursor = $('#cursor');
    if (fine && cursor) {
      document.addEventListener('mousemove', function (e) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
      $$('#wall .frame').forEach(function (f) {
        f.addEventListener('mouseenter', function () { cursor.classList.add('on'); });
        f.addEventListener('mouseleave', function () { cursor.classList.remove('on'); });
      });
    }

    var tools = ['Midjourney', 'Runway', 'Veo', 'Kling', 'Sora', 'Flux', 'ComfyUI', 'Topaz', 'ElevenLabs', 'Suno', 'Udio'];
    var looks = [['실사풍', 'real'], ['회화풍', 'paint'], ['2D', 'flat'], ['3D 카툰', 'toon'], ['추상', 'abstract']];
    var scenes = [];
    K.works.forEach(function (w) {
      w.scenes.forEach(function (s, i) {
        var t = null;
        for (var j = 0; j < tools.length; j++) if (s.how.indexOf(tools[j]) >= 0) { t = tools[j]; break; }
        scenes.push({ w: w, s: s, i: i, tool: t || w.tools[0], text: [w.title, s.title, s.how, w.tags.join(' '), w.look, w.tools.join(' '), w.method].join(' ') });
      });
    });
    $('#scenes').innerHTML = scenes.map(function (x, n) {
      return '<a class="scene" href="work.html?id=' + x.w.id + '&t=' + x.i + '" data-n="' + n + '"><div class="sc-pic"><img src="' + x.s.img + '" alt="' + esc(x.s.title) + '" loading="lazy">' +
        '<span class="sc-tool"><i></i>' + esc(x.tool) + '</span><span class="sc-t">' + esc(x.s.t) + '</span></div>' +
        '<div class="sc-cap"><b>' + esc(x.s.title) + '</b> · ' + esc(x.w.title) + '<span>' + esc(x.s.how) + '</span></div></a>';
    }).join('');
    var used = {};
    scenes.forEach(function (x) { x.w.tools.forEach(function (t) { used[t] = (used[t] || 0) + 1; }); });
    $('#findChips').innerHTML = '<button class="chip on" data-k="">전체</button>' +
      tools.filter(function (t) { return used[t]; }).map(function (t) { return '<button class="chip ai" data-k="t:' + t + '">' + t + ' <span class="n">' + used[t] + '</span></button>'; }).join('') +
      '<span class="chip-sep"></span>' + looks.map(function (l) { return '<button class="chip" data-k="l:' + l[1] + '">' + l[0] + '</button>'; }).join('');
    var state = { k: '', q: '' };
    var applyFind = function () {
      var n = 0;
      $$('#scenes .scene').forEach(function (el) {
        var x = scenes[+el.dataset.n], ok = true;
        if (state.k.indexOf('t:') === 0) ok = x.w.tools.indexOf(state.k.slice(2)) >= 0;
        if (state.k.indexOf('l:') === 0) ok = x.w.lookKey === state.k.slice(2);
        if (ok && state.q) ok = state.q.split(/\s+/).every(function (q) { return x.text.toLowerCase().indexOf(q.toLowerCase()) >= 0 || (q === '실사' && x.w.lookKey === 'real') || (q === '손그림' && x.w.lookKey === 'flat'); });
        el.classList.toggle('off', !ok); if (ok) n++;
      });
      $('#findCount').innerHTML = (state.q ? '‘' + esc(state.q) + '’ — ' : '') + '전체 장면 ' + scenes.length + '개 중 <b>' + n + '개</b>';
    };
    $$('#findChips .chip').forEach(function (b) {
      b.addEventListener('click', function () { $$('#findChips .chip').forEach(function (x) { x.classList.toggle('on', x === b); }); state.k = b.dataset.k; applyFind(); });
    });
    $('#findForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var q = $('#findInput').value.trim();
      var hit = tools.filter(function (t) { return q.toLowerCase().indexOf(t.toLowerCase()) >= 0; })[0];
      state.q = hit ? '' : q.replace(/로 만든|으로 만든|같은|느낌/g, ' ').trim();
      if (hit) { state.k = 't:' + hit; $$('#findChips .chip').forEach(function (x) { x.classList.toggle('on', x.dataset.k === state.k); }); }
      applyFind();
    });
    applyFind();

    $('#shortRail').innerHTML = K.shorts.map(function (s) {
      var w = K.work(s.work);
      return '<a class="short" href="shorts.html#' + s.id + '"><div class="sh-pic"><img src="' + s.poster + '" alt="" loading="lazy"><video muted playsinline loop preload="none" data-src="' + s.src + '"></video><div class="sh-txt">' + esc(s.title) + '</div></div>' +
        '<div class="sh-bridge">' + I.film + '<span>본편 <b>' + esc(w.title) + '</b> ' + esc(s.at) + '부터</span></div></a>';
    }).join('');
    hoverPlayer('#shortRail .short');
    inViewPlayer('#shortRail .short', .8);

    $('#creatorsGrid').innerHTML = ['moun', 'noeul', 'orbital', 'smallwood'].map(function (k) {
      var c = K.creators[k];
      return '<div class="creator">' + mono(c) + '<div><div class="cr-name">' + esc(c.name) + '</div><div class="cr-en">' + esc(c.en) + '</div></div>' +
        '<p class="cr-bio">' + esc(c.bio) + '</p><div class="cr-foot"><span>작품 ' + c.works.length + ' · 쇼츠 ' + c.shorts + '</span><button class="follow" type="button">관심 창작자</button></div></div>';
    }).join('');
    $$('.follow').forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('on'); b.textContent = b.classList.contains('on') ? '관심 창작자 ✓' : '관심 창작자'; }); });
  }

  /* ---------- WORK ---------- */
  if ($('#player')) {
    var qs = new URLSearchParams(location.search);
    var w = K.work(qs.get('id') || 'spring') || K.work('spring');
    var c = K.creatorOf(w);
    document.title = w.title + ' — KIVELO 시안 1';
    var mon = w.montage;
    var pl = $('#player');
    var src = mon ? mon.src : w.prev;
    pl.innerHTML = '<video id="vid" playsinline preload="metadata" ' + (mon ? '' : 'loop ') + 'muted src="' + src + '"></video>' +
      '<img class="pl-poster" src="' + (mon ? mon.poster : w.wide) + '" alt="">' +
      '<div class="pl-ad" id="ad"><span class="ad-tag">광고</span><div class="ad-big">여기에 광고가 나옵니다</div><div class="ad-sm">무료로 볼 때는 작품 시작 전에 짧은 광고 한 편. 광고 상품과 길이는 운영 정책에 맞춰 정합니다.</div><a href="index.html#plans">구독하면 광고 없이 바로 봅니다</a><button type="button" id="skip" disabled>3초 뒤 건너뛰기</button></div>' +
      '<button class="pl-big" id="big" type="button" aria-label="재생">' + I.play + '</button>' +
      '<div class="pl-sub" id="sub" aria-live="polite"></div>' +
      '<div class="pl-ctrl"><div class="pl-track" id="track"><div class="fill" id="fill"></div></div>' +
      '<div class="pl-row"><button type="button" id="pp" aria-label="일시정지">' + I.pause + '</button><span id="time">0:00</span><span class="sp"></span>' +
      '<button type="button" class="subtog on" id="subtog">' + I.info + '제작정보 자막</button>' +
      '<button type="button" class="hide-m" aria-label="소리">' + I.vol + '</button><button type="button" id="fs" aria-label="전체 화면">' + I.full + '</button></div></div>';
    var vid = $('#vid'), sub = $('#sub'), fill = $('#fill'), track = $('#track'), subOn = true;
    var parts = mon ? mon.parts : [{ at: 0, scene: 0 }];
    var total = mon ? mon.total : 5;
    if (mon) parts.forEach(function (p) { var m = document.createElement('i'); m.className = 'mk'; m.style.left = (p.at / total * 100) + '%'; track.appendChild(m); });
    var fmt = function (s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); };
    var lastScene = -1;
    var start = function () { pl.classList.add('started'); playV(vid); };
    $('#big').addEventListener('click', function () {
      if (w.free) {
        pl.classList.add('ad', 'started');
        var n = 3, sk = $('#skip');
        var tick = setInterval(function () {
          n--; if (n > 0) { sk.textContent = n + '초 뒤 건너뛰기'; }
          else { clearInterval(tick); sk.disabled = false; sk.textContent = '광고 건너뛰기 ›'; }
        }, 1000);
        sk.onclick = function () { pl.classList.remove('ad'); start(); };
      } else start();
    });
    $('#pp').addEventListener('click', function () { if (vid.paused) { playV(vid); $('#pp').innerHTML = I.pause; } else { vid.pause(); $('#pp').innerHTML = I.play; } });
    $('#subtog').addEventListener('click', function () { subOn = !subOn; this.classList.toggle('on', subOn); sub.classList.toggle('on', subOn && lastScene >= 0); });
    $('#fs').addEventListener('click', function () { if (pl.requestFullscreen) pl.requestFullscreen(); });
    track.addEventListener('click', function (e) { var r = track.getBoundingClientRect(); vid.currentTime = (e.clientX - r.left) / r.width * (vid.duration || total); });
    vid.addEventListener('timeupdate', function () {
      var d = vid.duration || total; fill.style.width = (vid.currentTime / d * 100) + '%';
      $('#time').textContent = fmt(vid.currentTime) + ' / ' + fmt(d);
      var k = 0; for (var i = 0; i < parts.length; i++) if (vid.currentTime >= parts[i].at) k = i;
      var sc = w.scenes[parts[k].scene];
      if (k !== lastScene && sc) {
        lastScene = k;
        sub.classList.remove('on');
        setTimeout(function () {
          sub.innerHTML = '<em><i></i>이 장면 · ' + esc(sc.title) + ' (' + esc(sc.t) + ')</em><br>' + esc(sc.how);
          sub.classList.toggle('on', subOn);
        }, 250);
        $$('.ss').forEach(function (el, j) { el.classList.toggle('on', j === parts[k].scene); });
      }
    });
    vid.addEventListener('ended', function () { vid.currentTime = 0; playV(vid); });

    $('#wTitle').textContent = w.title;
    $('#wEn').textContent = w.en;
    $('#wMeta').innerHTML = '<a href="#creator"><b>' + esc(c.name) + '</b></a><span>' + w.year + '</span><span>' + esc(w.genre) + '</span><span>' + esc(w.runtime) + '</span><span>' + esc(w.rating) + '</span><span>' + esc(w.look) + '</span><span>자막 한국어·영어</span>';
    $('#wLog').textContent = w.logline;
    $('#wAct').innerHTML = '<a class="btn play" href="#" id="playTop">' + I.play + (w.series ? '1화 보기' : '처음부터 보기') + '</a>' +
      '<button class="btn ghost" type="button" id="fav">' + I.plus + '관심 작품</button><button class="btn ghost" type="button">' + I.share + '공유</button>' +
      '<span class="free" style="align-self:center">' + (w.free ? '무료 · 시작 전 광고 1회' : '구독 작품 · 광고 없이') + '</span>';
    $('#playTop').addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); $('#big').click(); });
    $('#fav').addEventListener('click', function () { this.classList.toggle('on'); this.innerHTML = (this.classList.contains('on') ? I.check + '관심 작품에 담김' : I.plus + '관심 작품'); });
    var myShorts = K.shorts.filter(function (x) { return x.work === w.id; });
    if (myShorts.length) {
      $('#wShorts').innerHTML = '<div class="w-shorts"><h3>이 작품에서 나온 쇼츠</h3><div class="row">' + myShorts.map(function (x) {
        return '<a href="shorts.html#' + x.id + '"><div class="sh-pic"><img src="' + x.poster + '" alt=""><div class="sh-txt">' + esc(x.title) + '</div></div></a>';
      }).join('') + '</div></div>';
    }
    if (w.series) {
      $('#wSeries').innerHTML = '<div class="series">' + w.series.map(function (e) { return '<div class="ep"><b>' + e.no + '</b>' + esc(e.title) + '<span>' + e.len + (e.no === 2 ? ' · 보는 중' : '') + '</span></div>'; }).join('') + '</div>';
    }

    var shortName = { '표정 연기': '표정', '편집·색보정': '편집', '콘셉트 아트': '콘셉트', '중간 그림': '중간', '색 채우기': '채색', '인물 연기': '연기' };
    var who = function (s) { return s.who === 'AI' ? '<span class="who ai">AI</span>' : s.who === '함께' ? '<span class="who mix">함께</span>' : s.who === '없음' ? '<span class="who" style="background:#d7d0c4;color:#8b857b">없음</span>' : '<span class="who">사람</span>'; };
    var aiN = w.stages.filter(function (s) { return s.who === 'AI'; }).length, hN = w.stages.filter(function (s) { return s.who === '사람'; }).length, mN = w.stages.filter(function (s) { return s.who === '함께'; }).length;
    $('#label').innerHTML = '<div class="lb-top"><span>AI 제작정보 · 창작자 제공</span><span class="ok">' + I.ok + esc(w.review.split(' · ')[0]) + '</span></div>' +
      '<div class="lb-title">' + esc(w.title) + ', 이렇게 만들었습니다</div><div class="lb-method">' + esc(w.method) + ' · AI 비중 ' + K.aiShare(w) + '%</div>' +
      '<div class="lb-bar">' + w.stages.map(function (s) { return '<span class="' + (s.who === 'AI' ? 'ai' : s.who === '함께' ? 'mix' : s.who === '없음' ? 'none' : 'h') + '" title="' + esc(s.k) + '">' + esc(shortName[s.k] || s.k) + '</span>'; }).join('') + '</div>' +
      '<div class="lb-legend"><span><i style="background:conic-gradient(from 210deg,#9be7ff,#c9b8ff,#ffc0d6,#ffe4a3,#b8f3d6,#9be7ff)"></i>AI ' + aiN + '</span><span><i style="background:#1c1a17"></i>사람 ' + hN + '</span>' + (mN ? '<span><i style="background:#d8c8f0"></i>함께 ' + mN + '</span>' : '') + '</div>' +
      '<ul class="lb-rows">' + w.stages.map(function (s) {
        return '<li><span class="k">' + esc(s.k) + '</span><span>' + (s.tool ? '<a href="index.html#find">' + esc(s.tool) + '</a>' : (s.who === '없음' ? '대사 없는 작품' : '창작자 직접')) + '</span>' + who(s) + '</li>';
      }).join('') + '</ul>' +
      '<p class="lb-memo">' + esc(w.memo) + '</p>' +
      '<div class="lb-foot">' + esc(w.review) + ' · 도구 이름을 누르면 같은 도구로 만든 작품을 봅니다</div>';

    $('#sceneStrip').innerHTML = w.scenes.map(function (s, j) {
      return '<a class="ss" data-j="' + j + '"><div class="sc-pic"><img src="' + s.img + '" alt="" loading="lazy"><span class="sc-t">' + esc(s.t) + '</span></div><div class="sc-cap"><b>' + esc(s.title) + '</b><span>' + esc(s.how) + '</span></div></a>';
    }).join('');
    $$('.ss').forEach(function (el) {
      el.addEventListener('click', function () {
        var j = +el.dataset.j;
        var p = parts.filter(function (x) { return x.scene === j; })[0];
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (!pl.classList.contains('started')) { pl.classList.add('started'); }
        pl.classList.remove('ad');
        if (p) vid.currentTime = p.at + 0.05;
        playV(vid);
      });
    });

    $('#crBlock').innerHTML = mono(c, 72) + '<div><div class="cr-name">' + esc(c.name) + ' <span class="cr-en">' + esc(c.en) + '</span></div><p class="cr-bio" style="margin:6px 0 0">' + esc(c.bio) + '</p></div><button class="follow" type="button">관심 창작자</button>';
    $('#crBlock .follow').addEventListener('click', function () { this.classList.toggle('on'); this.textContent = this.classList.contains('on') ? '관심 창작자 ✓' : '관심 창작자'; });

    var rel = K.works.filter(function (x) { return x.id !== w.id; }).map(function (x) {
      var same = x.tools.filter(function (t) { return w.tools.indexOf(t) >= 0; });
      return { x: x, n: same.length + (x.methodKey === w.methodKey ? 0.5 : 0), same: same };
    }).sort(function (a, b) { return b.n - a.n; }).slice(0, 4);
    $('#related').innerHTML = rel.map(function (r) {
      var x = r.x;
      return '<a class="frame rel" href="work.html?id=' + x.id + '"><div class="f-pic"><img src="' + x.wide + '" alt="" loading="lazy"><video muted playsinline loop preload="none" data-src="' + x.prev + '"></video></div>' +
        '<div class="f-cap"><div class="f-title">' + esc(x.title) + '</div><div class="f-meta">' + (r.same.length ? '같은 도구 · ' + esc(r.same.join(', ')) : esc(x.method)) + '</div></div></a>';
    }).join('');
    hoverPlayer('#related .frame');

    var t0 = qs.get('t');
    if (t0 !== null && mon) {
      var pp0 = parts.filter(function (x) { return x.scene === +t0; })[0];
      if (pp0) { vid.addEventListener('loadedmetadata', function () { vid.currentTime = pp0.at; }, { once: true }); }
    }
    if (location.hash === '#label') setTimeout(function () { $('#label').scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 300);
  }

  /* ---------- SHORTS ---------- */
  if ($('#spFeed')) {
    var feed = $('#spFeed');
    feed.innerHTML = K.shorts.map(function (s) {
      var w = K.work(s.work), c = K.creatorOf(w);
      var aiTools = w.stages.filter(function (x) { return x.tool && x.who !== '사람'; }).slice(0, 3);
      return '<article class="sp-item" id="' + s.id + '" data-id="' + s.id + '"><video muted playsinline loop preload="none" poster="' + s.poster + '" data-src="' + s.src + '"></video>' +
        '<div class="sp-info"><div class="sp-cr">' + mono(c) + esc(c.name) + '<button type="button">관심</button></div>' +
        '<div class="sp-t">' + esc(s.title) + '</div>' +
        '<div class="sp-ai">' + aiTools.map(function (x) { return '<span>' + esc(x.k) + ' · ' + esc(x.tool.split(' ')[0]) + '</span>'; }).join('') + '</div>' +
        '<a class="sp-bridge" href="work.html?id=' + w.id + '"><img src="' + w.poster + '" alt=""><div><b>본편 ' + esc(w.title) + '</b>' + esc(s.at) + '부터 이어서 · ' + esc(w.runtime) + '</div>' + I.arrow + '</a></div>' +
        '<div class="sp-rail"><button type="button" class="like">' + I.heart + '관심</button><button type="button">' + I.info + '제작정보</button><button type="button">' + I.share + '공유</button></div></article>';
    }).join('');
    $$('.sp-rail .like').forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('liked'); }); });
    var panel = $('#spPanel');
    var setPanel = function (id) {
      if (!panel) return;
      var s = K.shorts.filter(function (x) { return x.id === id; })[0], w = K.work(s.work), c = K.creatorOf(w);
      var idx = K.shorts.indexOf(s);
      var next = K.shorts.slice(idx + 1, idx + 4);
      panel.innerHTML = '<h3>지금 보는 쇼츠의 본편</h3><a class="sp-work" href="work.html?id=' + w.id + '"><img src="' + w.wide + '" alt=""><div><b>' + esc(w.title) + '</b><p>' + esc(c.name) + ' · ' + esc(w.genre) + ' · ' + esc(w.runtime) + '<br>' + esc(s.at) + ' 장면에서 잘라 온 쇼츠입니다</p><span class="btn play">' + I.play + '본편 이어서 보기</span></div></a>' +
        '<div class="mini-label">' + w.stages.filter(function (x) { return x.who !== '없음'; }).slice(0, 5).map(function (x) { return '<div class="row"><span>' + esc(x.k) + '</span>' + esc(x.tool || '사람') + '</div>'; }).join('') + '</div>' +
        '<h3 style="margin-top:22px">다음 쇼츠</h3>' + next.map(function (n) { return '<div class="cont-s" style="padding:4px 0">· ' + esc(n.title) + '</div>'; }).join('');
    };
    var active = null;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = $('video', e.target);
        if (e.intersectionRatio >= .6) {
          if (active !== e.target) { active = e.target; playV(v); setPanel(e.target.dataset.id); if (history.replaceState) history.replaceState(null, '', '#' + e.target.dataset.id); }
        } else { v.pause(); }
      });
    }, { root: feed, threshold: [0, .6, 1] });
    $$('.sp-item', feed).forEach(function (el) { io.observe(el); });
    var go = function (d) { var items = $$('.sp-item', feed); var i = items.indexOf(active); var n = items[Math.min(items.length - 1, Math.max(0, i + d))]; if (n) feed.scrollTo({ top: n.offsetTop, behavior: 'smooth' }); };
    $$('[data-go]').forEach(function (b) { b.addEventListener('click', function () { go(+b.dataset.go); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); go(1); } if (e.key === 'ArrowUp') { e.preventDefault(); go(-1); } });
    if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) { var jump = function () { if (Math.abs(feed.scrollTop - t.offsetTop) > 4) feed.scrollTop = t.offsetTop; }; setTimeout(jump, 50); setTimeout(jump, 400); window.addEventListener('load', jump); } }
    $$('.sp-cats a').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); $$('.sp-cats a').forEach(function (x) { x.classList.toggle('on', x === a); }); }); });
  }
})();
