(function () {
  var K = window.KV, M = K.M, esc = K.esc;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = function () { return window.innerWidth <= 760; };
  var I = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
    keep: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M6 4h12v17l-6-4-6 4z"/></svg>',
    keepF: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M6 4h12v17l-6-4-6 4z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.6-4.6-9.8-9.6A5.4 5.4 0 0 1 12 5.6a5.4 5.4 0 0 1 9.8 5.8C19.6 16.4 12 21 12 21Z"/></svg>',
    heartO: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.3-9-8.9A4.9 4.9 0 0 1 12 6.4a4.9 4.9 0 0 1 9 4.7C19 15.7 12 20 12 20Z"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m9 5 7 7-7 7"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m15 5-7 7 7 7"/></svg>',
    out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6h14v-6"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>',
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 12 5 5 9-10"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 8.5h6M9 12h6M9 15.5h3.5"/></svg>',
    vol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>',
    volx: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9.5l5 5M22 9.5l-5 5"/></svg>',
    replay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/></svg>',
    mvUp: '<svg viewBox="0 0 12 12" fill="currentColor"><path d="M6 2.5 10.5 9h-9z"/></svg>',
    mvDn: '<svg viewBox="0 0 12 12" fill="currentColor"><path d="M6 9.5 1.5 3h9z"/></svg>'
  };
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function playV(v) { if (!v) return; if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src; var p = v.play(); if (p && p.catch) p.catch(function () {}); }

  var ORIG = { spring: 1, charge: 1, singularity: 1, sintel: 1, sprite: 1 };
  var MOODS = ['잔잔한', '경이로운', '긴장감', '쓸쓸한', '몽환적', '유쾌한', '오싹한', '경쾌한', '뭉클한', '박진감', '엉뚱한', '애틋한'];
  var EPDESC = { 1: '캠핑장에 도착한 다섯 친구. 숲 한가운데 유난히 버섯이 많습니다.', 2: '밤새 버섯이 자리를 옮겼다는 걸 알아챈 친구들. 누가 장난을 치는 걸까요?', 3: '보름달이 뜨자 숲속 버섯들이 일제히 고개를 듭니다.' };
  var CONT = [
    { id: 'charge', sc: 4, f: 40, s: '02:43에서 멈춤 · 1분 40초 남음' },
    { id: 'sprite', sc: 2, f: 30, ep: 2, s: '2화 01:52에서 멈춤 · 1분 28초 남음' },
    { id: 'sintel', sc: 0, f: 20, s: '05:11에서 멈춤 · 9분 37초 남음' },
    { id: 'singularity', sc: 4, f: 30, s: '05:13에서 멈춤 · 1분 18초 남음' }
  ];
  var CONTM = {}; CONT.forEach(function (x) { CONTM[x.id] = x; });
  var TOP = ['spring', 'charge', 'sprite', 'singularity', 'sintel', 'wingit', 'hero', 'coffee', 'glass'];
  var MOVE = { spring: ['same'], charge: ['up', 2], sprite: ['new'], singularity: ['dn', 1], sintel: ['up', 1], wingit: ['dn', 2], hero: ['new'], coffee: ['same'], glass: ['up', 3] };
  var LIST = ['glass', 'coffee'];
  var LIKE = {};
  var METH = [
    { k: 'ai', t: 'AI로 만든 작품', d: '그림과 영상 대부분을 AI로 만들고, 각본과 편집은 사람이 맡았습니다' },
    { k: 'mix', t: '사람과 AI가 함께 만든 작품', d: '사람이 그린 원화와 연기에 AI가 움직임과 배경을 더했습니다' },
    { k: 'human', t: '사람이 만들고 AI가 거든 작품', d: '그림과 움직임은 사람이, 배경과 색 채우기 일부만 AI가 했습니다' }
  ];
  var LOOKS = [['real', '실사풍'], ['paint', '회화풍'], ['toon', '3D 카툰'], ['flat', '2D 손그림'], ['abstract', '3D 추상']];
  var TOOLD = { '이미지': '원화와 배경을 그린 작품', '영상': '움직임을 만든 작품', '목소리': '목소리를 입힌 작품', '음악': '음악을 만든 작품', '보정': '화면을 다듬은 작품' };

  function age(w) { return w.rating === '전체관람가' ? '전체' : w.rating.replace('세 이상', '+'); }
  function price(w) { return w.free ? '<span class="m-free">무료</span>' : '<span class="m-pay">구독</span>'; }
  function tagsOf(w) {
    var m = w.tags.filter(function (t) { return MOODS.indexOf(t) >= 0; }).slice(0, 2);
    var g = w.tags.filter(function (t) { return MOODS.indexOf(t) < 0 && ['시리즈', '짧은', '가족'].indexOf(t) < 0; }).slice(0, 3 - m.length);
    return m.concat(g);
  }
  function aiStages(w, n) {
    var seen = {};
    return w.stages.filter(function (s) {
      if (!s.tool || s.who === '사람') return false;
      var b = s.tool.split(' ')[0]; if (seen[b]) return false; seen[b] = 1; return true;
    }).slice(0, n || 3);
  }
  function tool1(s) { return s.tool.split(' ')[0]; }
  function madeLine(w, n) { var a = aiStages(w, n); return a.length ? a.map(function (s) { return esc(s.k) + ' <em>' + esc(tool1(s)) + '</em>'; }).join(' · ') : '사람이 직접 만든 작품'; }
  function madeText(w, n) { var a = aiStages(w, n); return a.length ? a.map(function (s) { return s.k + ' ' + tool1(s); }).join(' · ') : '사람이 직접 만든 작품'; }
  function sceneIdx(w, at) { for (var i = 0; i < w.scenes.length; i++) if (w.scenes[i].t === at) return i; return 0; }
  function inList(id) { return LIST.indexOf(id) >= 0; }
  function kpInner(on, style) {
    var ic = on ? I.keepF : I.keep;
    if (style === 'icon') return ic;
    if (style === 'pbtn') return ic + '<span>' + (on ? '보관함에 있음' : '보관') + '</span>';
    if (style === 'rail') return ic + '<span>' + (on ? '보관됨' : '보관') + '</span>';
    return ic + (on ? '보관됨' : '보관');
  }
  function kpBtn(w, style) {
    var on = inList(w.id);
    return '<button type="button" class="kp' + (style === 'pbtn' ? ' pbtn' : '') + (on ? ' on' : '') + '" data-act="keep" data-id="' + w.id + '" data-style="' + style + '" aria-pressed="' + on + '" aria-label="보관함">' + kpInner(on, style) + '</button>';
  }
  function similar(w) {
    return K.works.filter(function (x) { return x.id !== w.id; }).map(function (x) {
      var t = x.tools.filter(function (a) { return w.tools.indexOf(a) >= 0; }).length;
      var g = x.tags.filter(function (a) { return w.tags.indexOf(a) >= 0; }).length;
      return { x: x, n: t + g * 0.6 + (x.methodKey === w.methodKey ? 0.5 : 0) };
    }).sort(function (a, b) { return b.n - a.n; }).map(function (r) { return r.x; });
  }
  function reason(w, x) {
    var t = x.tools.filter(function (a) { return w.tools.indexOf(a) >= 0; });
    if (t.length) return '같은 도구 · ' + t.slice(0, 2).join(', ');
    var m = x.tags.filter(function (a) { return MOODS.indexOf(a) >= 0 && w.tags.indexOf(a) >= 0; });
    if (m.length) return '같은 분위기 · ' + m[0];
    if (x.methodKey === w.methodKey) return '같은 만든 방식';
    return '함께 많이 본 작품';
  }

  var toastEl = $('#toast'), toastT;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.innerHTML = I.ok + '<span>' + esc(msg) + '</span>';
    toastEl.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2400);
  }
  var wipe = $('#wipe');
  function go(url, x, y) {
    if (!wipe || reduce) { location.href = url; return; }
    wipe.style.setProperty('--x', (x != null ? x : window.innerWidth / 2) + 'px');
    wipe.style.setProperty('--y', (y != null ? y : window.innerHeight / 2) + 'px');
    wipe.classList.add('on');
    setTimeout(function () { location.href = url; }, 480);
  }
  window.addEventListener('pageshow', function () { if (wipe) wipe.classList.remove('on'); });

  var nav = $('#nav'), mtabs = $('#mtabs');
  if (nav && !nav.classList.contains('fixed-solid')) {
    var lastY = 0;
    var onScroll = function () {
      var y = window.scrollY;
      nav.classList.toggle('solid', y > 30);
      if (mtabs) {
        mtabs.classList.toggle('solid', y > 30);
        if (y > lastY + 6 && y > 120) mtabs.classList.add('hide');
        else if (y < lastY - 6) mtabs.classList.remove('hide');
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  var menu = $('#menu');
  if (menu) {
    var mInd = $('.menu-ind', menu), mOn = $('a.on', menu);
    var mPlace = function (a) { if (!a || !mInd) return; mInd.style.width = a.offsetWidth + 'px'; mInd.style.transform = 'translateX(' + a.offsetLeft + 'px)'; };
    var mSettle = function () { mPlace(mOn); };
    $$('a', menu).forEach(function (a) { a.addEventListener('mouseenter', function () { mPlace(a); }); });
    menu.addEventListener('mouseleave', mSettle);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(mSettle);
    setTimeout(mSettle, 80); window.addEventListener('resize', mSettle);
  }

  function closeDrops() { $$('.drop.open').forEach(function (o) { o.classList.remove('open'); }); }
  $$('.drop').forEach(function (d) {
    var t;
    var open = function () { clearTimeout(t); $$('.drop.open').forEach(function (o) { if (o !== d) o.classList.remove('open'); }); d.classList.add('open'); if (d.id === 'bellDrop') { var b = $('#bellDot'); if (b) b.style.transform = 'scale(0)'; } };
    var close = function () { t = setTimeout(function () { d.classList.remove('open'); }, 220); };
    if (fine) { d.addEventListener('mouseenter', open); d.addEventListener('mouseleave', close); }
    $('.drop-btn', d).addEventListener('click', function (e) { e.stopPropagation(); if (d.classList.contains('open') && !fine) d.classList.remove('open'); else open(); });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.drop')) closeDrops(); });
  if ($('#bellMenu')) {
    $('#bellMenu').innerHTML = '<div class="dm-h"><b>알림</b><span>최근 7일</span></div>' + [
      { img: M + 'scene/sprite_4.jpg', b: '새 에피소드 · 버섯 숲의 밤 3화', s: '‘달이 뜨면’이 올라왔어요 · 어제', n: 1, id: 'sprite' },
      { img: M + 'scene/spring_7.jpg', b: '모운 스튜디오가 쇼츠를 올렸어요', s: '산이 깨어나는 순간 · 2일 전', n: 1, id: 'spring' },
      { img: M + 'scene/singularity_5.jpg', b: '공개 예정 · 별의 첫 숨 감독판', s: '10월 31일 금요일에 공개됩니다 · 3일 전', n: 1, id: 'singularity' },
      { img: M + 'scene/charge_5.jpg', b: '이어서 보기 · 방전', s: '1분 40초 남았어요 · 1주 전', id: 'charge' }
    ].map(function (x) { return '<a class="noti' + (x.n ? ' new' : '') + '" href="work.html?id=' + x.id + '" data-act="open" data-id="' + x.id + '"><img src="' + x.img + '" alt=""><div><b>' + esc(x.b) + '</b><span>' + esc(x.s) + '</span></div></a>'; }).join('');
  }
  function setKeepN() {
    ['keepN', 'keepN2'].forEach(function (k) {
      var b = document.getElementById(k); if (!b) return;
      b.textContent = LIST.length; b.style.display = LIST.length ? '' : 'none';
      b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
    });
    var kt = $('#keepT'); if (kt) kt.textContent = LIST.length;
  }

  /* ---------- 카드 ---------- */
  function segsHTML(n, cur, f) {
    var h = '<span class="c-seg">';
    for (var i = 0; i < n; i++) h += '<i' + (cur == null ? '' : i < cur ? ' class="done"' : i === cur ? ' class="cur" style="--f:' + f + '%"' : '') + '></i>';
    return h + '</span>';
  }
  function labOf(w, o) {
    if (o.tag) return '<span class="c-lab new">' + esc(o.tag) + '</span>';
    if (ORIG[w.id] && !o.noOrig) return '<span class="c-lab">오리지널</span>';
    return '';
  }
  function cWork(w, o) {
    o = o || {};
    var c = K.creatorOf(w), tall = !!o.tall, href = 'work.html?id=' + w.id;
    return '<div class="card ' + (tall ? 'p' : 'w') + '" data-id="' + w.id + '" data-kind="work">' +
      '<a class="c-pic" href="' + href + '" aria-label="' + esc(w.title) + '"><img class="c-base" src="' + (tall ? w.poster : w.wide) + '" alt="" loading="lazy" draggable="false">' +
      (tall ? '' : '<img class="c-scrub" alt="" draggable="false">') + '<video muted playsinline loop preload="none" data-src="' + w.prev + '"></video>' +
      (tall ? '' : segsHTML(w.scenes.length) + '<span class="c-when"></span>') + (w.free ? '' : '<span class="c-pay">구독</span>') + '</a>' +
      '<div class="c-cap"><div class="c-t">' + labOf(w, o) + '<b>' + esc(w.title) + '</b></div>' +
      '<div class="c-by">' + esc(c.name) + ' · ' + esc(w.runtime) + '</div>' +
      '<div class="c-sw"><div class="c-made">' + madeLine(w, 2) + '</div><div class="c-acts"><button type="button" class="go" data-act="play" data-id="' + w.id + '">' + I.play + '바로 보기</button>' + kpBtn(w, 'card') + '</div></div></div></div>';
  }
  function cCont(x) {
    var w = K.work(x.id), sc = w.scenes[x.sc];
    var href = 'watch.html?id=' + w.id + (x.ep ? '&ep=' + x.ep : '&t=' + x.sc);
    return '<div class="card c" data-id="' + w.id + '" data-kind="cont"><a class="c-pic" href="' + href + '" aria-label="' + esc(w.title) + ' 이어서 보기"><img class="c-base" src="' + sc.img + '" alt="" loading="lazy" draggable="false">' +
      '<span class="c-resume">' + I.play + '이어서 보기</span>' + segsHTML(w.scenes.length, x.sc, x.f) + '</a>' +
      '<div class="c-cap"><div class="c-t"><b>' + esc(w.title) + '</b></div><div class="c-by">' + esc(x.s) + '</div></div></div>';
  }
  function cShort(s) {
    var w = K.work(s.work);
    return '<a class="card short" href="shorts.html#' + s.id + '" data-kind="short"><div class="c-pic"><img src="' + s.poster + '" alt="" loading="lazy" draggable="false"><video muted playsinline loop preload="none" data-src="' + s.src + '"></video><span class="c-name">' + esc(s.title) + '</span></div>' +
      '<div class="c-bridge">' + I.film + '<span>본편 <b>' + esc(w.title) + '</b> ' + esc(s.at) + '부터</span></div></a>';
  }
  function cEmpty() { return '<div class="card empty"><div class="c-pic"><span>아직 보관한 작품이 없어요.<br>작품 카드의 ‘보관’을 눌러 보세요.</span></div></div>'; }
  function chRow(id, i) {
    var w = K.work(id), c = K.creatorOf(w), mv = MOVE[id] || ['same'];
    var mvh = mv[0] === 'up' ? '<span class="ch-mv up" aria-label="' + mv[1] + '계단 올라옴">' + I.mvUp + mv[1] + '</span>' : mv[0] === 'dn' ? '<span class="ch-mv dn" aria-label="' + mv[1] + '계단 내려감">' + I.mvDn + mv[1] + '</span>' : mv[0] === 'new' ? '<span class="ch-mv nw">새로</span>' : '<span class="ch-mv" aria-label="그대로">–</span>';
    var dg = ''; for (var d = 0; d <= i + 1; d++) dg += '<i>' + d + '</i>';
    return '<a class="chr" href="work.html?id=' + id + '" data-id="' + id + '" data-kind="work" style="--i:' + i + ';--n:' + (i + 1) + '"><span class="ch-n" aria-label="' + (i + 1) + '위"><span aria-hidden="true">' + dg + '</span></span>' + mvh +
      '<span class="ch-pic"><img src="' + w.wide + '" alt="" loading="lazy"><video muted playsinline loop preload="none" data-src="' + w.prev + '"></video></span>' +
      '<span class="ch-b"><b>' + esc(w.title) + '</b><span>' + esc(c.name) + ' · ' + esc(w.genre) + '</span><em>' + esc(madeText(w, 3)) + '</em></span><span class="ch-go">' + I.play + '</span></a>';
  }
  function mtHTML(m) {
    var ws = K.works.filter(function (w) { return w.methodKey === m.k; });
    var avg = Math.round(ws.reduce(function (a, w) { return a + K.aiShare(w); }, 0) / Math.max(1, ws.length));
    var pics = ws.map(function (w) { return w.wide; });
    if (pics.length < 3) pics.push(ws[0].scenes[1].img);
    return '<button class="mt" type="button" data-act="method" data-m="' + m.k + '"><span class="mt-fan"><img src="' + pics[1] + '" alt="" loading="lazy"><img src="' + pics[2] + '" alt="" loading="lazy"><img src="' + pics[0] + '" alt="" loading="lazy"></span>' +
      '<span class="mt-n">' + ws.length + '편</span><h3>' + esc(m.t) + '</h3><p>' + esc(m.d) + '</p><span class="mt-bar" style="--ai:' + avg + '%"><i></i></span><span class="mt-leg"><span>AI가 맡은 공정 평균 <b>' + avg + '%</b></span><span>보러 가기 ›</span></span></button>';
  }
  function mzHTML(w, j, cls, area, i) {
    var s = w.scenes[j];
    return '<a class="mz' + (cls ? ' ' + cls : '') + '" href="watch.html?id=' + w.id + '&t=' + j + '" data-id="' + w.id + '" data-scene="' + j + '" data-kind="scene"' + (area ? ' style="grid-area:' + area + ';--i:' + i + '"' : '') + '><img src="' + s.img + '" alt="" loading="lazy">' +
      '<span class="mz-play">' + I.play + '</span><span class="mz-cap"><em>' + esc(w.title) + ' · ' + esc(s.t) + '</em><b>' + esc(s.title) + '</b><span class="mz-how"><span>' + esc(s.how) + '</span></span></span></a>';
  }
  function cSoon(x, i) {
    var w = K.work(x.id), c = K.creatorOf(w);
    return '<div class="sn" data-id="' + x.id + '" style="--i:' + i + '"><div class="sn-d"><b>' + esc(x.day) + '</b>' + esc(x.when) + '</div><div class="c-pic"><img src="' + x.img + '" alt="" loading="lazy"></div><h3>' + esc(x.title) + '</h3><p>' + esc(c.name) + '</p>' +
      '<button class="remind" type="button" data-when="' + esc(x.day + ' ' + x.when) + '">' + I.bell + '알림 받기</button></div>';
  }
  function cCrea(k) {
    var c = K.creators[k], w = K.work(c.works[0]), n = w.scenes.length;
    return '<div class="cr" data-cr="' + k + '" tabindex="0" role="link" aria-label="' + esc(c.name) + ' 작품 보기"><div class="cr-strip"><div><img src="' + w.scenes[0].img + '" alt="" loading="lazy" draggable="false"></div><div><img src="' + w.scenes[1 % n].img + '" alt="" loading="lazy" draggable="false"></div><div><img src="' + w.scenes[2 % n].img + '" alt="" loading="lazy" draggable="false"></div></div>' +
      '<div class="cr-b"><span class="cr-av"><img src="' + w.poster + '" alt="" loading="lazy" draggable="false"></span><span><span class="cr-n">' + esc(c.name) + '</span><span class="cr-s">작품 ' + c.works.length + ' · 쇼츠 ' + c.shorts + '</span></span><button class="fol" type="button">팔로우</button><p class="cr-bio">' + esc(c.bio) + '</p></div></div>';
  }

  /* ---------- 카드에 마우스를 올리면: 장면 훑어보기 → 멈추면 영상 ---------- */
  var HV = { card: null, vt: 0, st: 0 };
  function hvVideo(card) {
    var v = $('video', card); if (!v) return;
    v.addEventListener('playing', function () { if (HV.card === card && !card.classList.contains('scrub')) card.classList.add('vid'); }, { once: true });
    playV(v);
  }
  function hvClear(card) { $$('.c-seg i.on', card).forEach(function (i) { i.classList.remove('on'); }); card._k = -1; }
  function hvEnter(card) {
    if (HV.card === card) return;
    if (HV.card) hvLeave(HV.card);
    HV.card = card; card.classList.add('hov');
    var w = K.work(card.dataset.id);
    if (w && !card._pre && card.classList.contains('w')) { card._pre = 1; w.scenes.forEach(function (s) { var im = new Image(); im.src = s.img; }); }
    clearTimeout(HV.vt);
    HV.vt = setTimeout(function () { if (HV.card === card && !card.classList.contains('scrub')) hvVideo(card); }, 650);
  }
  function hvLeave(card) {
    card.classList.remove('hov', 'scrub', 'vid');
    var v = $('video', card); if (v) v.pause();
    hvClear(card);
    clearTimeout(HV.vt); clearTimeout(HV.st);
    if (HV.card === card) HV.card = null;
  }
  function hvMove(card, e) {
    if (!card.classList.contains('w')) return;
    var pic = $('.c-pic', card), r = pic.getBoundingClientRect();
    var w = K.work(card.dataset.id), n = w.scenes.length;
    var k = Math.max(0, Math.min(n - 1, Math.floor((e.clientX - r.left) / r.width * n)));
    if (card._k !== k) {
      card._k = k; var sc = w.scenes[k];
      $('.c-scrub', card).src = sc.img;
      $('.c-when', card).textContent = sc.t + ' · ' + sc.title;
      $$('.c-seg i', card).forEach(function (i, j) { i.classList.toggle('on', j === k); });
    }
    if (!card.classList.contains('scrub')) { card.classList.add('scrub'); card.classList.remove('vid'); var v = $('video', card); if (v) v.pause(); }
    clearTimeout(HV.vt); clearTimeout(HV.st);
    HV.st = setTimeout(function () { if (HV.card !== card) return; card.classList.remove('scrub'); hvClear(card); hvVideo(card); }, 1200);
  }
  if (fine) {
    document.addEventListener('mouseover', function (e) {
      var card = e.target.closest && e.target.closest('.card[data-kind="work"]');
      if (card && !card.closest('.rail.drag')) hvEnter(card);
    });
    document.addEventListener('mouseout', function (e) {
      var card = e.target.closest && e.target.closest('.card[data-kind="work"]');
      if (!card) return;
      var to = e.relatedTarget; if (to && card.contains(to)) return;
      hvLeave(card);
    });
    document.addEventListener('mousemove', function (e) {
      if (!HV.card || !HV.card.contains(e.target)) return;
      if (e.target.closest('.c-pic')) hvMove(HV.card, e);
    }, { passive: true });
    document.addEventListener('mouseover', function (e) {
      var c = e.target.closest && e.target.closest('.card.short'); if (!c || c._on) return;
      c._on = 1; playV($('video', c)); c.classList.add('playing');
    });
    document.addEventListener('mouseout', function (e) {
      var c = e.target.closest && e.target.closest('.card.short'); if (!c || (e.relatedTarget && c.contains(e.relatedTarget))) return;
      c._on = 0; var v = $('video', c); if (v) v.pause(); c.classList.remove('playing');
    });
    document.addEventListener('mouseover', function (e) {
      var ch = e.target.closest && e.target.closest('.chr'); if (!ch || ch._on) return;
      ch._on = 1; clearTimeout(ch._t);
      ch._t = setTimeout(function () { if (!ch._on) return; var v = $('video', ch); v.addEventListener('playing', function () { if (ch._on) ch.classList.add('vid'); }, { once: true }); playV(v); }, 350);
    });
    document.addEventListener('mouseout', function (e) {
      var ch = e.target.closest && e.target.closest('.chr'); if (!ch || (e.relatedTarget && ch.contains(e.relatedTarget))) return;
      ch._on = 0; clearTimeout(ch._t); ch.classList.remove('vid'); var v = $('video', ch); if (v) v.pause();
    });
  }

  /* ---------- 가로 줄: 끌어서 넘기기 · 화살표 · 위치 막대 ---------- */
  function activeRail(sec) { return $('.pane.on .rail', sec) || $('.rail', sec); }
  function setupRail(rail) {
    var sec = rail.closest('.sec');
    var line = rail.nextElementSibling && rail.nextElementSibling.classList.contains('rail-line') ? rail.nextElementSibling : null, thumb = line ? $('i', line) : null;
    var upd = function () {
      var max = rail.scrollWidth - rail.clientWidth;
      if (thumb) { thumb.style.width = Math.min(100, rail.clientWidth / rail.scrollWidth * 100) + '%'; thumb.style.transform = 'translateX(' + (rail.scrollLeft / rail.clientWidth * 100) + '%)'; line.hidden = max <= 4; }
      if (sec && activeRail(sec) === rail) {
        var pv = $('.arr.prev', sec), nx = $('.arr.next', sec);
        if (pv) pv.disabled = rail.scrollLeft <= 4;
        if (nx) nx.disabled = rail.scrollLeft >= max - 4;
      }
    };
    rail._upd = upd;
    rail.addEventListener('scroll', upd, { passive: true });
    if (line) line.addEventListener('click', function (e) { var r = line.getBoundingClientRect(); rail.scrollTo({ left: (e.clientX - r.left) / r.width * rail.scrollWidth - rail.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' }); });
    var st = null, raf = 0;
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      cancelAnimationFrame(raf);
      st = { x: e.clientX, l: rail.scrollLeft, t: performance.now(), v: 0, lx: e.clientX, moved: false, id: e.pointerId };
    });
    rail.addEventListener('pointermove', function (e) {
      if (!st || e.pointerId !== st.id) return;
      var dx = e.clientX - st.x;
      if (!st.moved && Math.abs(dx) > 6) { st.moved = true; rail.classList.add('drag'); try { rail.setPointerCapture(e.pointerId); } catch (er) {} if (HV.card) hvLeave(HV.card); }
      if (!st.moved) return;
      var now = performance.now(), dt = Math.max(1, now - st.t);
      st.v = 0.7 * st.v + 0.3 * ((e.clientX - st.lx) / dt); st.lx = e.clientX; st.t = now;
      rail.scrollLeft = st.l - dx;
    });
    var end = function () {
      if (!st) return;
      var s = st; st = null;
      if (!s.moved) return;
      rail._dragged = true; setTimeout(function () { rail._dragged = false; }, 80);
      rail.classList.remove('drag');
      var v = -s.v * 16;
      var step = function () { if (Math.abs(v) < 0.5) return; rail.scrollLeft += v; v *= 0.93; raf = requestAnimationFrame(step); };
      if (!reduce) raf = requestAnimationFrame(step);
    };
    rail.addEventListener('pointerup', end); rail.addEventListener('pointercancel', end);
    rail.addEventListener('click', function (e) { if (rail._dragged) { e.preventDefault(); e.stopPropagation(); } }, true);
    upd();
  }
  function railHTML(cards) { return '<div class="rail"><div class="rail-track">' + cards + '</div></div><div class="rail-line" hidden><i></i></div>'; }
  function secHTML(o) {
    return '<section class="sec' + (o.reveal ? ' reveal' : '') + '" id="sec-' + o.key + '" data-type="' + o.type + '">' +
      '<header class="sec-h"><div class="sec-t"><div class="row1"><h2><span>' + esc(o.title) + '</span></h2>' + (o.tabs || '') + '</div>' + (o.desc ? '<p data-desc>' + esc(o.desc) + '</p>' : '') + '</div>' +
      '<div class="sec-c">' + (o.all || '') + (o.arrows ? '<button class="arr prev" type="button" aria-label="이전" disabled>' + I.left + '</button><button class="arr next" type="button" aria-label="다음">' + I.chev + '</button>' : '') + '</div></header>' + o.body + '</section>';
  }
  function moveInd(ind, btn) { if (!ind || !btn) return; ind.style.width = btn.offsetWidth + 'px'; ind.style.transform = 'translate(' + btn.offsetLeft + 'px,' + (ind.classList.contains('chips-ind') ? btn.offsetTop : 0) + 'px)'; }
  function setTab(sec, name) {
    var tabs = sec && $('.tabs', sec); if (!tabs) return;
    var btn = $('[data-tab="' + name + '"]', tabs); if (!btn) return;
    $$('button', tabs).forEach(function (b) { b.classList.toggle('on', b === btn); b.setAttribute('aria-selected', b === btn); });
    moveInd($('.tabs-ind', tabs), btn);
    $$('.pane', sec).forEach(function (p) {
      var on = p.dataset.pane === name;
      if (on && !p.classList.contains('on')) {
        p.classList.add('on', 'enter'); setTimeout(function () { p.classList.remove('enter'); }, 900);
        var r = $('.rail', p); r.scrollLeft = 0; if (r._upd) r._upd();
      } else if (!on) p.classList.remove('on');
    });
    var d = $('[data-desc]', sec); if (d) d.textContent = name === 'keep' ? '보관한 작품이 여기에 모입니다' : '멈춘 장면에서 바로 이어 봅니다';
  }
  function setTool(t, first) {
    var sec = $('#sec-tool'); if (!sec) return;
    var chips = $('#toolChips'), btn = $('[data-t="' + t + '"]', chips); if (!btn) return;
    $$('.chip', chips).forEach(function (b) { b.classList.toggle('on', b === btn); b.setAttribute('aria-pressed', b === btn); });
    moveInd($('.chips-ind', chips), btn);
    var ws = K.works.filter(function (w) { return w.tools.indexOf(t) >= 0; });
    var cat = K.toolInfo[t] || '';
    $('[data-desc]', sec).textContent = t + (t === 'Kling' ? '으로 ' : '로 ') + (TOOLD[cat] || '만든 작품') + ' ' + ws.length + '편';
    var track = $('.rail-track', sec), rail = $('.rail', sec);
    if (first) { track.innerHTML = ws.map(function (w) { return cWork(w); }).join(''); if (rail._upd) rail._upd(); return; }
    if (HV.card) hvLeave(HV.card);
    var old = $$('.rail-track > *', sec);
    old.forEach(function (el, i) { el.style.animationDelay = (Math.min(i, 6) * 0.03) + 's'; el.classList.add('out'); });
    setTimeout(function () {
      track.innerHTML = ws.map(function (w) { return cWork(w); }).join('');
      rail.scrollLeft = 0;
      $$('.rail-track > *', sec).forEach(function (el, i) { el.style.animationDelay = (i * 0.05) + 's'; el.classList.add('in2'); });
      if (rail._upd) rail._upd();
    }, reduce ? 0 : 280 + Math.min(old.length, 6) * 30);
  }

  if ($('#browse')) {
    var W = function (id) { return K.work(id); };
    var toolCount = {};
    K.works.forEach(function (w) { w.tools.forEach(function (t) { toolCount[t] = (toolCount[t] || 0) + 1; }); });
    var tools = Object.keys(toolCount).sort(function (a, b) { return toolCount[b] - toolCount[a] || a.localeCompare(b); }).slice(0, 8);
    var SOON = [
      { id: 'sprite', img: M + 'wide/sprite.jpg', day: '10월 25일', when: '일요일 공개', title: '버섯 숲의 밤 4화' },
      { id: 'singularity', img: M + 'scene/singularity_5.jpg', day: '10월 31일', when: '금요일 공개', title: '별의 첫 숨 감독판' },
      { id: 'hero', img: M + 'scene/hero_2.jpg', day: '11월 7일', when: '금요일 공개', title: '붉은 비행사 메이킹' },
      { id: 'sintel', img: M + 'scene/sintel_1.jpg', day: '11월 14일', when: '금요일 공개', title: '용을 찾아서 2부' }
    ];
    var NEWB = { sprite: '새 에피소드', hero: '새 작품', glass: '새 작품', coffee: '새 작품', wingit: '새 작품' };
    var MZ = [
      ['spring', 0, 'big', '1/1/3/3'], ['charge', 1, '', '1/3/2/4'], ['singularity', 2, 'wide', '1/4/2/6'], ['sintel', 2, 'tall', '1/6/3/7'],
      ['sprite', 1, 'wide', '2/3/3/5'], ['hero', 1, '', '2/5/3/6'], ['wingit', 0, '', '3/1/4/2'], ['coffee', 2, 'wide', '3/2/4/4'],
      ['spring', 6, 'big', '3/4/5/6'], ['glass', 0, '', '3/6/4/7'], ['singularity', 0, '', '4/1/5/2'], ['charge', 4, '', '4/2/5/3'],
      ['sintel', 0, '', '4/3/5/4'], ['hero', 2, '', '4/6/5/7']
    ];
    var html = '';
    html += secHTML({ key: 'mine', type: 'cont', title: '내 감상', desc: '멈춘 장면에서 바로 이어 봅니다', arrows: 1,
      tabs: '<div class="tabs" role="tablist"><button type="button" class="on" role="tab" aria-selected="true" data-tab="cont">이어서 보기<span>' + CONT.length + '</span></button><button type="button" role="tab" aria-selected="false" data-tab="keep">보관함<span id="keepT">' + LIST.length + '</span></button><i class="tabs-ind"></i></div>',
      body: '<div class="pane on" data-pane="cont">' + railHTML(CONT.map(cCont).join('')) + '</div><div class="pane" data-pane="keep">' + railHTML(LIST.length ? LIST.map(function (id) { return cWork(W(id)); }).join('') : cEmpty()) + '</div>' });
    html += secHTML({ key: 'chart', type: 'chart', title: '이번 주 많이 본 작품', desc: fine ? '지난 7일 동안 많이 본 순서입니다. 마우스를 올리면 바로 미리 봅니다' : '지난 7일 동안 많이 본 순서입니다',
      body: '<div class="chart" id="chart">' + TOP.map(chRow).join('') + '</div><div class="ch-more"><button type="button" data-act="chmore">6~9위 더 보기</button></div>' });
    html += secHTML({ key: 'method', type: 'method', title: '만든 방식으로 고르기', desc: '같은 AI 영상이라도 사람이 맡은 몫이 다릅니다',
      body: '<div class="methods">' + METH.map(mtHTML).join('') + '</div><div class="looks"><span>화풍으로 고르기</span>' + LOOKS.map(function (l) {
        var n = K.works.filter(function (w) { return w.lookKey === l[0]; }).length;
        return '<button class="chip" type="button" data-act="look" data-l="' + l[0] + '">' + l[1] + '<span>' + n + '</span></button>';
      }).join('') + '</div>' });
    html += secHTML({ key: 'orig', type: 'tall', title: '키벨로 오리지널', desc: '키벨로가 창작자와 함께 기획한 작품', reveal: 1, arrows: 1,
      body: railHTML(['spring', 'charge', 'singularity', 'sprite', 'sintel'].map(function (id) { return cWork(W(id), { tall: 1, noOrig: 1 }); }).join('')) });
    html += secHTML({ key: 'shorts', type: 'shorts', title: '쇼츠', desc: '짧게 보고, 마음에 들면 그 장면부터 본편으로 이어 봅니다', reveal: 1, arrows: 1,
      all: '<a class="all" href="shorts.html">쇼츠 전체' + I.chev + '</a>', body: railHTML(K.shorts.map(cShort).join('')) });
    html += secHTML({ key: 'scene', type: 'scene', title: '명장면', desc: '작품 9편에서 고른 장면입니다. 누르면 그 장면부터 재생합니다',
      all: '<button class="all" type="button" data-act="allscenes">장면 36개 모두 보기' + I.chev + '</button>',
      body: '<div class="mz-grid">' + MZ.map(function (x, i) { return mzHTML(W(x[0]), x[1], x[2], x[3], i); }).join('') + '</div>' });
    html += secHTML({ key: 'tool', type: 'wide', title: '만든 도구로 찾아보기', desc: ' ', arrows: 1,
      body: '<div class="chips" id="toolChips" role="group" aria-label="만든 도구">' + tools.map(function (t) { return '<button class="chip" type="button" data-act="tool" data-t="' + esc(t) + '" aria-pressed="false">' + esc(t) + '<span>' + esc(K.toolInfo[t] || '') + ' ' + toolCount[t] + '</span></button>'; }).join('') + '<i class="chips-ind"></i></div>' + railHTML('') });
    html += secHTML({ key: 'new', type: 'wide', title: '새로 들어온 작품', desc: '이번 주에 올라온 작품과 새 에피소드', reveal: 1, arrows: 1,
      body: railHTML(['sprite', 'hero', 'glass', 'coffee', 'wingit', 'singularity'].map(function (id) { return cWork(W(id), { tag: NEWB[id] }); }).join('')) });
    html += '<div class="planbar"><div class="pb-pics">' + ['charge', 'sintel', 'hero'].map(function (id, k) { return '<img src="' + W(id).poster + '" alt="" style="--i:' + k + '">'; }).join('') + '</div>' +
      '<p><b>지금은 무료로 보는 중이에요</b>작품 시작 전에 광고가 한 번 나옵니다. 구독하면 광고 없이, 구독 작품까지 모두 봅니다.</p><a class="btn play" href="#">구독 안내 보기</a></div>';
    html += secHTML({ key: 'soon', type: 'soon', title: '공개 예정', desc: '알림을 켜 두면 공개되는 날 알려 드립니다', body: '<div class="tl">' + SOON.map(cSoon).join('') + '</div>' });
    html += secHTML({ key: 'crea', type: 'crea', title: '키벨로의 창작자', desc: '팔로우하면 새 작품과 쇼츠가 올라올 때 먼저 알려 드립니다', reveal: 1, arrows: 1,
      body: railHTML(Object.keys(K.creators).map(cCrea).join('')) });
    $('#browse').innerHTML = html;
    setTool(tools[0], true);
    $$('#browse .rail').forEach(setupRail);
    var placeInds = function () {
      $$('#browse .tabs').forEach(function (t) { moveInd($('.tabs-ind', t), $('button.on', t)); });
      var tc = $('#toolChips'); if (tc) moveInd($('.chips-ind', tc), $('.chip.on', tc));
    };
    placeInds();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeInds);
    var ro; window.addEventListener('resize', function () { clearTimeout(ro); ro = setTimeout(function () { $$('#browse .rail').forEach(function (r) { if (r._upd) r._upd(); }); placeInds(); }, 150); });
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
      $$('#browse .sec').forEach(function (r) { io.observe(r); });
    } else $$('#browse .sec').forEach(function (r) { r.classList.add('in'); });
    var sb = $('#stripBg');
    if (sb) sb.innerHTML = ['spring_1', 'charge_3', 'singularity_1', 'sprite_2', 'sintel_2', 'hero_2', 'wingit_3', 'coffee_1', 'glass_1', 'spring_4', 'singularity_3', 'charge_5'].map(function (n) { return '<img src="' + M + 'scene/' + n + '.jpg" alt="" loading="lazy">'; }).join('');
    if (location.hash === '#keep') setTimeout(openKeep, 120);
  }

  /* ---------- 보관함 ---------- */
  function flyKeep(from, id) {
    if (reduce || !from) return false;
    var w = K.work(id), tg = small() ? $('.tabbar [data-keep]') : $('#keepBtn'); if (!tg || !w) return false;
    var r = from.getBoundingClientRect(), t = tg.getBoundingClientRect(); if (!t.width || !r.width) return false;
    var f = document.createElement('div'); f.className = 'kfly'; f.innerHTML = '<div><img src="' + w.wide + '" alt=""></div>';
    document.body.appendChild(f);
    var x0 = r.left + r.width / 2 - 36, y0 = r.top + r.height / 2 - 20, x1 = t.left + t.width / 2 - 36, y1 = t.top + t.height / 2 - 20;
    if (!f.animate) { f.remove(); return false; }
    f.animate([{ transform: 'translateX(' + x0 + 'px)' }, { transform: 'translateX(' + x1 + 'px)' }], { duration: 760, easing: 'cubic-bezier(.3,.7,.4,1)', fill: 'forwards' });
    var a = f.firstChild.animate([
      { transform: 'translateY(' + y0 + 'px) scale(1)', opacity: 1 },
      { transform: 'translateY(' + (y1 + (y0 - y1) * 0.35) + 'px) scale(.75)', opacity: 1, offset: 0.55 },
      { transform: 'translateY(' + y1 + 'px) scale(.22)', opacity: 0.35 }
    ], { duration: 760, easing: 'cubic-bezier(.55,0,.75,.4)', fill: 'forwards' });
    a.onfinish = function () { f.remove(); setKeepN(); };
    return true;
  }
  function toggleKeep(id, btn) {
    var w = K.work(id); if (!w) return;
    var on = !inList(id);
    if (on) LIST.unshift(id); else LIST.splice(LIST.indexOf(id), 1);
    toast(on ? '‘' + w.title + '’을(를) 보관함에 담았어요' : '‘' + w.title + '’을(를) 보관함에서 뺐어요');
    $$('[data-act="keep"][data-id="' + id + '"]').forEach(function (b) { b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); b.innerHTML = kpInner(on, b.dataset.style); });
    if (btn) { btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop'); }
    var pane = $('#sec-mine .pane[data-pane="keep"]');
    if (pane) {
      var track = $('.rail-track', pane), rail = $('.rail', pane);
      if (on) {
        var em = $('.empty', track); if (em) em.remove();
        track.insertAdjacentHTML('afterbegin', cWork(w)); track.firstElementChild.classList.add('in2');
      } else {
        var el = $('.card[data-id="' + id + '"]', track);
        if (el) { el.classList.add('out'); setTimeout(function () { el.remove(); if (!LIST.length) track.innerHTML = cEmpty(); if (rail._upd) rail._upd(); }, 300); }
      }
      if (rail._upd) rail._upd();
    }
    if (!(on && flyKeep(btn, id))) setKeepN();
  }
  function openKeep() {
    var sec = $('#sec-mine');
    if (!sec) { location.href = 'index.html#keep'; return; }
    if (document.body.classList.contains('searching')) clearSearch();
    setTab(sec, 'keep');
    window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY - 84, behavior: reduce ? 'auto' : 'smooth' });
  }

  /* ---------- 작품 노트(오른쪽에서 열리는 상세) ---------- */
  var nt = $('#nt'), NT = { id: null, from: null, io: null, lock: 0 };
  function stageCls(s) { return s.who === 'AI' ? 'ai' : s.who === '사람' ? 'hu' : s.who === '함께' ? 'mix' : 'none'; }
  function stageWho(s) {
    if (s.who === 'AI') return '<span class="ai">AI · ' + esc(s.tool) + '</span>';
    if (s.who === '함께') return '<span class="ai">함께 · ' + esc(s.tool) + '</span>';
    if (s.who === '없음') return '<span>없음</span>';
    return '<span>사람</span>';
  }
  function mkHTML(w) {
    var n = w.stages.length, cnt = { ai: 0, hu: 0, mix: 0 };
    w.stages.forEach(function (s) { var k = stageCls(s); if (cnt[k] != null) cnt[k]++; });
    return '<div class="mk-bar">' + w.stages.map(function (s, k) { return '<i class="' + stageCls(s) + '" style="--k:' + k + '" title="' + esc(s.k + ' · ' + (s.tool || s.who)) + '"></i>'; }).join('') + '</div>' +
      '<div class="mk-cols" style="--n:' + n + '">' + w.stages.map(function (s, k) { return '<div style="--k:' + k + '"><b>' + esc(s.k) + '</b>' + stageWho(s) + '</div>'; }).join('') + '</div>' +
      '<div class="mk-leg"><span><i class="hu"></i>사람 ' + cnt.hu + '</span><span><i class="ai"></i>AI ' + cnt.ai + '</span>' + (cnt.mix ? '<span><i class="mix"></i>함께 ' + cnt.mix + '</span>' : '') + '<span class="chk">' + I.ok + esc(w.review) + '</span></div>';
  }
  function ntHTML(w) {
    var c = K.creatorOf(w), vsrc = w.montage ? w.montage.src : w.prev, cont = CONTM[w.id];
    var label = w.series ? '2화 이어서 보기' : cont ? '이어서 보기' : '바로 보기';
    var pa = 'data-act="play" data-id="' + w.id + '"' + (w.series ? ' data-ep="2"' : cont ? ' data-scene="' + cont.sc + '"' : '');
    var tabs = [['about', '개요'], w.series ? ['eps', '회차', w.series.length] : null, ['made', '만든 과정'], ['scenes', '장면', w.scenes.length], ['sim', '비슷한 작품']].filter(Boolean);
    var h = '<div class="nt-top"><button class="nt-x" type="button" data-act="close">' + I.out + '닫기</button><div class="nt-r"><span class="nt-k">작품 노트</span><span class="nt-mini" id="ntMini"><span>' + esc(w.title) + '</span><button class="pbtn go" type="button" ' + pa + '>' + I.play + label + '</button></span></div></div>';
    h += '<div class="nt-media" id="ntMedia"><img src="' + w.wide + '" alt=""><video muted playsinline loop preload="none" data-src="' + vsrc + '"></video><button class="vmute" type="button" data-act="mute" aria-label="소리">' + I.volx + '</button></div>';
    h += '<div class="nt-head"><h2 class="nt-title">' + esc(w.title) + '</h2><div class="nt-en">' + esc(w.en) + '</div>' +
      '<div class="nt-meta">' + price(w) + '<span>' + w.year + '</span><span>' + esc(w.runtime) + '</span><span>' + esc(w.rating) + '</span><a href="#" data-act="creator" data-cr="' + w.creator + '">' + esc(c.name) + '</a></div>' +
      '<div class="nt-btns"><button class="pbtn go" type="button" ' + pa + '>' + I.play + label + '</button>' + kpBtn(w, 'pbtn') +
      '<button class="pbtn like' + (LIKE[w.id] ? ' on' : '') + '" type="button" data-act="like" data-id="' + w.id + '">' + (LIKE[w.id] ? I.heart : I.heartO) + '<span>좋아요</span></button>' +
      '<button class="pbtn" type="button" data-act="share">' + I.share + '<span>공유</span></button></div></div>';
    h += '<nav class="nt-tabs" id="ntTabs" aria-label="작품 노트 목차">' + tabs.map(function (t, i) { return '<button type="button" data-go="nt-' + t[0] + '"' + (i ? '' : ' class="on"') + '>' + t[1] + (t[2] ? '<span>' + t[2] + '</span>' : '') + '</button>'; }).join('') + '<i class="nt-ind"></i></nav>';
    h += '<section class="nt-sec" id="nt-about"><p class="nt-log">' + esc(w.logline) + '</p><div class="nt-memo"><b>창작자 메모 · ' + esc(c.name) + '</b>' + esc(w.memo) + '</div>' +
      '<dl class="nt-dl"><dt>장르</dt><dd>' + esc(w.genre) + '</dd><dt>분위기</dt><dd>' + esc(tagsOf(w).join(', ')) + '</dd><dt>화풍</dt><dd>' + esc(w.look) + '</dd><dt>만든 방식</dt><dd>' + esc(w.method) + '</dd><dt>보는 방법</dt><dd>' + (w.free ? '무료 · 시작 전 광고 1회' : '구독 · 광고 없이') + '</dd><dt>자막</dt><dd>한국어 · 영어</dd></dl></section>';
    if (w.series) {
      h += '<section class="nt-sec" id="nt-eps"><h3>회차 <small>시즌 1 · 매주 일요일 한 화씩</small></h3><div class="eps">' + w.series.map(function (e, i) {
        var now = e.no === 2;
        return '<div class="ep2' + (now ? ' now' : '') + '" data-act="play" data-id="' + w.id + '" data-ep="' + e.no + '"><div class="c-pic"><img src="' + w.scenes[Math.min(i, w.scenes.length - 1)].img + '" alt="" loading="lazy">' + (now ? segsHTML(1, 0, 56) : '') + '</div>' +
          '<b>' + e.no + '화 · ' + esc(e.title) + '<span>' + e.len + '</span></b><p>' + esc(EPDESC[e.no] || '') + '</p></div>';
      }).join('') + '</div></section>';
    }
    h += '<section class="nt-sec" id="nt-made"><h3>만든 과정 <small>공정마다 사람이 했는지 AI로 했는지 창작자가 적었습니다</small></h3>' + mkHTML(w) + '</section>';
    h += '<section class="nt-sec" id="nt-scenes"><h3>장면으로 보기 <small>누르면 그 장면부터 재생합니다</small></h3><div class="scs">' + w.scenes.map(function (s, j) {
      return '<div class="sc2" data-act="play" data-id="' + w.id + '" data-scene="' + j + '"><div class="c-pic"><img src="' + s.img + '" alt="" loading="lazy"><em>' + esc(s.t) + '</em></div><b>' + esc(s.title) + '</b><span>' + esc(s.how) + '</span></div>';
    }).join('') + '</div>';
    var mine = K.shorts.filter(function (s) { return s.work === w.id; });
    if (mine.length) h += '<h3 style="margin:32px 0 14px;font-size:16px">이 작품에서 나온 쇼츠</h3><div class="nt-shorts">' + mine.map(function (s) {
      return '<a class="card short" href="shorts.html#' + s.id + '" data-kind="short"><div class="c-pic"><img src="' + s.poster + '" alt="" loading="lazy"><span class="c-name">' + esc(s.title) + '</span></div></a>';
    }).join('') + '</div>';
    h += '</section>';
    h += '<section class="nt-sec" id="nt-sim"><h3>비슷한 작품 <small>같은 도구·분위기로 만든 작품부터</small></h3><div class="sims">' + similar(w).slice(0, 6).map(function (x) {
      return '<div class="sim2" data-act="swap" data-id="' + x.id + '"><div class="c-pic"><img src="' + x.wide + '" alt="" loading="lazy"></div><div><em>' + esc(reason(w, x)) + '</em><b>' + esc(x.title) + '</b><p>' + esc(x.logline) + '</p></div>' + kpBtn(x, 'icon') + '</div>';
    }).join('') + '</div></section>';
    h += '<div class="nt-end">작품 정보와 제작정보는 창작자가 올리고 운영팀이 확인했습니다. 권리 문제가 있으면 ‘권리 침해 신고’로 알려 주세요.</div>';
    h += '<div class="nt-bar"><button class="pbtn go" type="button" ' + pa + '>' + I.play + label + '</button></div>';
    return h;
  }
  var lockPad = 0;
  function lockScroll() {
    lockPad = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add('lock');
    if (lockPad > 0) { document.body.style.paddingRight = lockPad + 'px'; if (nav) nav.style.paddingRight = 'calc(var(--pad) + ' + lockPad + 'px)'; }
  }
  function unlockScroll() {
    document.body.classList.remove('lock');
    document.body.style.paddingRight = ''; if (nav) nav.style.paddingRight = '';
  }
  function flyBox(src1, src2, r) {
    var f = document.createElement('div'); f.className = 'fly';
    f.style.left = r.left + 'px'; f.style.top = r.top + 'px'; f.style.width = r.width + 'px'; f.style.height = r.height + 'px';
    f.innerHTML = '<img src="' + src1 + '" alt="">' + (src2 && src2 !== src1 ? '<img src="' + src2 + '" alt="" style="opacity:0">' : '');
    document.body.appendChild(f);
    return f;
  }
  function flyTo(f, a, b, r0, r1, done) {
    if (!f.animate) { f.remove(); if (done) done(); return; }
    var an = f.animate([
      { left: a.left + 'px', top: a.top + 'px', width: a.width + 'px', height: a.height + 'px', borderRadius: r0 + 'px' },
      { left: b.left + 'px', top: b.top + 'px', width: b.width + 'px', height: b.height + 'px', borderRadius: r1 + 'px' }
    ], { duration: 620, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
    var two = f.children[1]; if (two) setTimeout(function () { two.style.opacity = 1; }, 120);
    an.onfinish = function () { if (done) done(); };
  }
  function srcOf(el) {
    if (!el) return null;
    var card = el.closest('.card');
    if (card && card.classList.contains('scrub')) { var sc = $('.c-scrub', card); if (sc && sc.src) return sc.src; }
    var im = el.tagName === 'IMG' ? el : $('img', el);
    return im ? im.src : null;
  }
  function openNote(id, fromEl, noPush) {
    var w = K.work(id); if (!w || !nt) return;
    if (HV.card) hvLeave(HV.card);
    closeDrops();
    if (nt.classList.contains('on')) { swapNote(id, fromEl); return; }
    nt.innerHTML = '<div class="nt-dim" data-act="close"></div><aside class="nt-panel" id="ntPanel" tabindex="-1">' + ntHTML(w) + '</aside>';
    var panel = $('#ntPanel'), media = $('#ntMedia');
    lockScroll();
    NT.id = id; NT.from = fromEl || null;
    var fr = fromEl && !reduce ? fromEl.getBoundingClientRect() : null;
    if (fr && fr.width > 0 && fr.bottom > 0 && fr.top < window.innerHeight) {
      var mr = media.getBoundingClientRect();
      var target = { left: mr.left - panel.offsetWidth * 1.04, top: mr.top, width: mr.width, height: mr.height };
      media.classList.add('hold');
      var f = flyBox(srcOf(fromEl), w.wide, fr);
      void nt.offsetWidth;
      nt.classList.add('on');
      flyTo(f, fr, target, 10, small() ? 0 : 14, function () { media.classList.remove('hold'); setTimeout(function () { f.remove(); }, 40); });
    } else {
      void nt.offsetWidth;
      nt.classList.add('on');
    }
    setupNote(panel, w);
    try { panel.focus({ preventScroll: true }); } catch (er) {}
    if (!noPush && history.pushState) history.pushState({ nt: id }, '', 'work.html?id=' + id);
  }
  function swapNote(id, fromEl) {
    var w = K.work(id), panel = $('#ntPanel'); if (!w || !panel) return;
    var v = $('#ntMedia video'); if (v) v.pause();
    var fr = fromEl && !reduce ? fromEl.getBoundingClientRect() : null, src = fr ? srcOf(fromEl) : null;
    panel.scrollTop = 0;
    panel.innerHTML = ntHTML(w);
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
    NT.id = id; NT.from = null;
    if (fr && src) {
      var media = $('#ntMedia'), mr = media.getBoundingClientRect();
      media.classList.add('hold');
      var f = flyBox(src, w.wide, fr);
      flyTo(f, fr, mr, 8, small() ? 0 : 14, function () { media.classList.remove('hold'); setTimeout(function () { f.remove(); }, 40); });
    }
    setupNote(panel, w);
    if (history.replaceState) history.replaceState({ nt: id }, '', 'work.html?id=' + id);
  }
  function closeNote(fromPop) {
    if (!nt || !nt.classList.contains('on')) return;
    var media = $('#ntMedia'), v = media && $('video', media); if (v) v.pause();
    var el = NT.from;
    if (el && document.body.contains(el) && !reduce && media) {
      var r = el.getBoundingClientRect(), mr = media.getBoundingClientRect();
      if (r.width > 0 && r.bottom > 0 && r.top < window.innerHeight && mr.bottom > 0) {
        var f = flyBox($('img', media).src, null, mr);
        media.classList.add('hold');
        flyTo(f, mr, r, 14, 10, function () { f.style.transition = 'opacity .2s'; f.style.opacity = 0; setTimeout(function () { f.remove(); }, 220); });
      }
    }
    nt.classList.remove('on');
    unlockScroll();
    if (NT.io) NT.io.disconnect();
    setTimeout(function () { if (!nt.classList.contains('on')) nt.innerHTML = ''; }, 680);
    NT.id = null;
    if (!fromPop && history.replaceState) {
      if (history.state && history.state.nt) history.back(); else history.replaceState(null, '', 'index.html' + (location.hash || ''));
    }
  }
  function setupNote(panel, w) {
    var media = $('#ntMedia'), v = $('video', media);
    setTimeout(function () {
      if (!nt.classList.contains('on') || NT.id !== w.id) return;
      v.addEventListener('playing', function () { media.classList.add('vid'); }, { once: true });
      playV(v);
    }, 700);
    var tabs = $('#ntTabs'), ind = $('.nt-ind', tabs), btns = $$('button', tabs);
    var setOn = function (b) { btns.forEach(function (x) { x.classList.toggle('on', x === b); }); ind.style.width = b.offsetWidth + 'px'; ind.style.transform = 'translateX(' + b.offsetLeft + 'px)'; };
    setOn(btns[0]);
    setTimeout(function () { var b = $('button.on', tabs); if (b) setOn(b); }, 300);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var s = document.getElementById(b.dataset.go); if (!s) return;
        NT.lock = Date.now();
        panel.scrollTo({ top: s.offsetTop - (small() ? 100 : 108), behavior: reduce ? 'auto' : 'smooth' });
        setOn(b);
      });
    });
    var spy = function () {
      var head = $('.nt-head', panel), mini = $('#ntMini'), k = $('.nt-k', panel);
      var past = head && panel.scrollTop > head.offsetTop + head.offsetHeight - 80;
      if (mini) mini.classList.toggle('on', !!past);
      if (k) k.style.opacity = past ? 0 : 1;
      if (NT.lock && Date.now() - NT.lock < 800) return;
      var y = panel.scrollTop + 140, cur = btns[0];
      btns.forEach(function (b) { var s = document.getElementById(b.dataset.go); if (s && s.offsetTop <= y) cur = b; });
      if (panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 6) cur = btns[btns.length - 1];
      if (!cur.classList.contains('on')) setOn(cur);
    };
    if (panel._spy) panel.removeEventListener('scroll', panel._spy);
    panel._spy = spy; panel.addEventListener('scroll', spy, { passive: true });
    if (NT.io) NT.io.disconnect();
    if ('IntersectionObserver' in window && !reduce) {
      NT.io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); NT.io.unobserve(e.target); } }); }, { root: panel, threshold: 0.25 });
      $$('.nt-sec', panel).forEach(function (s) { NT.io.observe(s); });
    } else $$('.nt-sec', panel).forEach(function (s) { s.classList.add('in'); });
  }
  window.addEventListener('popstate', function (e) { if (e.state && e.state.nt) openNote(e.state.nt, null, true); else closeNote(true); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nt && nt.classList.contains('on')) closeNote();
    if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('cr')) e.target.click();
  });

  /* ---------- 클릭 한 곳에서 처리 ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (t) {
      var act = t.dataset.act, idEl = t.dataset.id ? t : t.closest('[data-id]'), id = idEl ? idEl.dataset.id : null;
      if (act === 'play') {
        e.preventDefault(); e.stopPropagation();
        go('watch.html?id=' + id + (t.dataset.scene != null ? '&t=' + t.dataset.scene : '') + (t.dataset.ep ? '&ep=' + t.dataset.ep : ''), e.clientX, e.clientY); return;
      }
      if (act === 'open') { e.preventDefault(); openNote(id, null); return; }
      if (act === 'keep') { e.preventDefault(); e.stopPropagation(); toggleKeep(id, t); return; }
      if (act === 'like') {
        e.preventDefault(); LIKE[id] = !LIKE[id];
        t.classList.toggle('on', !!LIKE[id]); t.innerHTML = (LIKE[id] ? I.heart : I.heartO) + '<span>좋아요</span>';
        if (LIKE[id]) toast('좋아요를 남겼어요. 비슷한 작품을 더 보여 드릴게요');
        return;
      }
      if (act === 'close') { closeNote(); return; }
      if (act === 'swap') { swapNote(id, $('.c-pic', t)); return; }
      if (act === 'share') { toast('작품 주소를 복사했어요'); return; }
      if (act === 'mute') { var vv = $('#ntMedia video'); if (vv) { vv.muted = !vv.muted; t.innerHTML = vv.muted ? I.volx : I.vol; } return; }
      if (act === 'creator') { e.preventDefault(); var cr = K.creators[t.dataset.cr]; closeNote(); setTimeout(function () { runSearch(cr.name); }, 380); return; }
      if (act === 'method') { showMethod(t.dataset.m); return; }
      if (act === 'look') { showLook(t.dataset.l); return; }
      if (act === 'tool') { setTool(t.dataset.t); return; }
      if (act === 'allscenes') { showAllScenes(); return; }
      if (act === 'chmore') { var chs = $('#chart'); chs.classList.toggle('open'); t.textContent = chs.classList.contains('open') ? '접기' : '6~9위 더 보기'; return; }
    }
    var tb = e.target.closest('.tabs button'); if (tb) { setTab(tb.closest('.sec'), tb.dataset.tab); return; }
    var arr = e.target.closest('.arr');
    if (arr) { var rail = activeRail(arr.closest('.sec')); if (rail) rail.scrollBy({ left: (arr.classList.contains('next') ? 1 : -1) * rail.clientWidth * 0.84, behavior: reduce ? 'auto' : 'smooth' }); return; }
    var kl = e.target.closest('[data-keep]'); if (kl) { e.preventDefault(); closeDrops(); openKeep(); return; }
    var fd = e.target.closest('[data-find]'); if (fd) { e.preventDefault(); openFind(); return; }
    var fol = e.target.closest('.fol');
    if (fol) {
      e.preventDefault(); e.stopPropagation();
      fol.classList.toggle('on'); fol.textContent = fol.classList.contains('on') ? '팔로우 중' : '팔로우';
      var ck = fol.closest('.cr').dataset.cr;
      if (fol.classList.contains('on')) toast('‘' + K.creators[ck].name + '’의 새 작품이 올라오면 알려 드릴게요');
      return;
    }
    var rem = e.target.closest('.remind');
    if (rem) {
      rem.classList.toggle('on'); rem.innerHTML = rem.classList.contains('on') ? I.ok + '알림 켜짐' : I.bell + '알림 받기';
      if (rem.classList.contains('on')) toast(rem.dataset.when + ' 공개되면 알려 드릴게요');
      return;
    }
    var card = e.target.closest('.card, .chr, .mz, .cr, .sn');
    if (!card || !(card.closest('.browse') || card.closest('.results') || card.closest('.nt'))) return;
    if (card.classList.contains('short') || card.classList.contains('empty')) return;
    e.preventDefault();
    if (card.classList.contains('cr')) { runSearch(K.creators[card.dataset.cr].name); return; }
    if (card.classList.contains('mz')) { go(card.getAttribute('href'), e.clientX, e.clientY); return; }
    if (card.dataset.kind === 'cont') { go($('a', card).getAttribute('href'), e.clientX, e.clientY); return; }
    if (card.classList.contains('sn')) { openNote(card.dataset.id, $('.c-pic', card)); return; }
    openNote(card.dataset.id, card.classList.contains('chr') ? $('.ch-pic', card) : $('.c-pic', card));
  });

  /* ---------- 검색과 모아 보기 ---------- */
  var resEl = $('#results'), srch = $('#srch'), sIn = $('#srchIn');
  function showResults(html) {
    if (!resEl) return;
    if (HV.card) hvLeave(HV.card);
    resEl.innerHTML = html;
    document.body.classList.add('searching');
    window.scrollTo(0, 0);
    $$('[data-home]', resEl).forEach(function (b) { b.addEventListener('click', clearSearch); });
    $$('[data-q]', resEl).forEach(function (b) { b.addEventListener('click', function () { runSearch(b.dataset.q); }); });
  }
  function clearSearch() {
    if (sIn) sIn.value = '';
    if (srch) srch.classList.remove('has');
    document.body.classList.remove('searching');
    if (resEl) resEl.innerHTML = '';
    if (history.replaceState && /[?&]q=/.test(location.search)) history.replaceState(null, '', location.pathname);
  }
  function backBar(rel) {
    return '<div class="res-top"><button class="res-back" type="button" data-home>' + I.left + '홈으로</button>' +
      (rel && rel.length ? '<div class="res-rel"><span>관련</span>' + rel.map(function (k) { return '<button type="button" data-q="' + esc(k) + '">' + esc(k) + '</button>'; }).join('') + '</div>' : '') + '</div>';
  }
  function showSet(title, desc, ws) {
    showResults(backBar() + '<h2 class="res-title">' + esc(title) + '</h2><p class="res-desc">' + esc(desc) + '</p><div class="res-grid">' + ws.map(function (w) { return cWork(w); }).join('') + '</div>');
  }
  function showMethod(k) {
    var m = METH.filter(function (x) { return x.k === k; })[0];
    showSet(m.t, m.d, K.works.filter(function (w) { return w.methodKey === k; }));
  }
  function showLook(l) {
    var lb = LOOKS.filter(function (x) { return x[0] === l; })[0];
    showSet(lb[1] + ' 작품', '화풍이 ' + lb[1] + '인 작품을 모았습니다', K.works.filter(function (w) { return w.lookKey === l; }));
  }
  function showAllScenes() {
    var h = '';
    K.works.forEach(function (w) { w.scenes.forEach(function (s, j) { h += mzHTML(w, j, '', '', 0); }); });
    showResults(backBar() + '<h2 class="res-title">명장면 36개</h2><p class="res-desc">누르면 그 장면부터 재생합니다. 장면마다 어떻게 만들었는지 함께 적었습니다.</p><div class="res-grid">' + h + '</div>');
  }
  function hay(w) {
    var c = K.creatorOf(w);
    return [w.title, w.en, c.name, c.en, w.genre, w.tags.join(' '), w.look, w.method, w.tools.join(' '), w.stages.map(function (s) { return s.k + ' ' + (s.tool || ''); }).join(' '), w.logline].join(' ').toLowerCase();
  }
  function match(text, toks, w) {
    return toks.every(function (q) {
      if (text.indexOf(q) >= 0) return true;
      if (w && q === '실사') return w.lookKey === 'real';
      if (w && (q === '손그림' || q === '그림')) return w.lookKey === 'flat';
      if (w && q === '애니') return w.tags.indexOf('애니메이션') >= 0;
      return false;
    });
  }
  function runSearch(q) {
    q = (q || '').trim();
    if (sIn && sIn.value !== q) sIn.value = q;
    if (srch) { srch.classList.add('open'); srch.classList.toggle('has', !!q); }
    if (!q) { clearSearch(); return; }
    var toks = q.toLowerCase().replace(/으로 만든|로 만든|같은|느낌|작품|영상/g, ' ').split(/\s+/).filter(Boolean);
    if (!toks.length) toks = [q.toLowerCase()];
    var ws = K.works.filter(function (w) { return match(hay(w), toks, w); });
    var sc = [];
    K.works.forEach(function (w) { w.scenes.forEach(function (s, j) { if (match((w.title + ' ' + s.title + ' ' + s.how + ' ' + hay(w)).toLowerCase(), toks, w)) sc.push([w, j]); }); });
    var sh = K.shorts.filter(function (s) { var w = K.work(s.work); return match((s.title + ' ' + hay(w)).toLowerCase(), toks, w); });
    var rel = {};
    ws.forEach(function (w) { w.tools.concat(tagsOf(w)).forEach(function (t) { if (q.toLowerCase().indexOf(t.toLowerCase()) < 0) rel[t] = (rel[t] || 0) + 1; }); });
    var relK = Object.keys(rel).sort(function (a, b) { return rel[b] - rel[a]; }).slice(0, 8);
    var h = backBar(relK) + '<h2 class="res-title">‘' + esc(q) + '’ 찾은 결과</h2><p class="res-desc">작품 ' + ws.length + '편 · 장면 ' + sc.length + '개 · 쇼츠 ' + sh.length + '개</p>';
    if (!ws.length && !sc.length && !sh.length) h += '<p class="res-empty">‘' + esc(q) + '’와(과) 맞는 작품이 아직 없어요. 제목, 창작자, 장르, 만든 도구(예: Runway, Midjourney)로 찾아 보세요.</p>';
    if (ws.length) h += '<h3 class="res-h">작품</h3><div class="res-grid">' + ws.map(function (w) { return cWork(w); }).join('') + '</div>';
    if (sc.length) h += '<h3 class="res-h">장면</h3><div class="res-grid">' + sc.slice(0, 20).map(function (x) { return mzHTML(x[0], x[1], '', '', 0); }).join('') + '</div>';
    if (sh.length) h += '<h3 class="res-h">쇼츠</h3><div class="res-grid short-grid">' + sh.map(cShort).join('') + '</div>';
    showResults(h);
    if (history.replaceState) history.replaceState(null, '', location.pathname + '?q=' + encodeURIComponent(q));
  }
  function openFind() {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    if (srch && sIn) { srch.classList.add('open'); setTimeout(function () { sIn.focus(); }, 200); }
  }
  if (srch) {
    var stt;
    $('#srchBtn').addEventListener('click', function () { srch.classList.add('open'); sIn.focus(); });
    sIn.addEventListener('input', function () { srch.classList.toggle('has', !!sIn.value); clearTimeout(stt); stt = setTimeout(function () { runSearch(sIn.value); }, 220); });
    sIn.addEventListener('blur', function () { if (!sIn.value) srch.classList.remove('open'); });
    sIn.addEventListener('keydown', function (e) { if (e.key === 'Escape') { clearSearch(); sIn.blur(); } });
    srch.addEventListener('submit', function (e) { e.preventDefault(); runSearch(sIn.value); });
    $('#srchX').addEventListener('click', function () { clearSearch(); sIn.focus(); });
    var q0 = new URLSearchParams(location.search).get('q');
    if (q0) setTimeout(function () { runSearch(q0); }, 30);
  }

  /* ---------- 메인 배너 ---------- */
  if ($('#heroMedia')) {
    var hero = $('#hero');
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
    var chars = function (t) { var d = 0; return t.split('').map(function (ch) { if (ch === ' ') return ' '; d++; return '<span class="ch" style="animation-delay:' + (0.05 + d * 0.045).toFixed(3) + 's">' + esc(ch) + '</span>'; }).join(''); };
    var cur = -1, timer, calmT;
    var show = function (i) {
      if (i === cur) return;
      cur = i;
      $$('video', media).forEach(function (v, j) {
        if (j === i) { playV(v); v.classList.add('on'); try { v.currentTime = 0; } catch (e) {} }
        else { v.classList.remove('on'); setTimeout(function () { if (!v.classList.contains('on')) v.pause(); }, 1300); }
      });
      $$('li', queue).forEach(function (li, j) { li.classList.toggle('on', j === i); var b = $('.hq-bar i', li); b.style.animation = 'none'; void b.offsetWidth; b.style.animation = ''; });
      var w = K.work(heroItems[i].id), c = K.creatorOf(w);
      hero.classList.remove('calm');
      label.style.opacity = 0;
      setTimeout(function () {
        label.innerHTML = '<div class="label-no"><span class="live"></span>오늘의 상영 · No.0' + (i + 1) + '</div>' +
          '<h1 class="h-title" aria-label="' + esc(w.title) + '">' + chars(w.title) + '</h1>' +
          '<p class="h-en">' + esc(w.en) + '<span class="by">' + esc(c.name) + '</span></p>' +
          '<div class="h-fold"><div><p class="h-log">' + esc(w.logline) + '</p><p class="h-made"><span>' + esc(w.method) + '</span>' + aiStages(w, 3).map(function (s) { return '<span>' + esc(s.k) + ' ' + esc(tool1(s)) + '</span>'; }).join('') + '</p></div></div>' +
          '<div class="h-cta"><a class="btn play" href="watch.html?id=' + w.id + '" data-act="play" data-id="' + w.id + '">' + I.play + '지금 보기</a>' +
          '<button class="btn ghost" type="button" data-act="open" data-id="' + w.id + '">' + I.note + '작품 노트</button>' +
          '<span class="free">' + (w.free ? '무료 · 시작 전 광고 1회' : '구독 작품 · 광고 없이') + '</span></div>';
        label.style.opacity = 1;
      }, cur === 0 && !label.innerHTML ? 0 : 280);
      clearTimeout(timer); clearTimeout(calmT);
      if (!reduce) {
        calmT = setTimeout(function () { hero.classList.add('calm'); }, 6500);
        timer = setTimeout(function () { show((cur + 1) % heroItems.length); }, 12000);
      }
    };
    label.style.transition = 'opacity .28s';
    label.addEventListener('mouseenter', function () { hero.classList.remove('calm'); clearTimeout(calmT); });
    label.addEventListener('mouseleave', function () { clearTimeout(calmT); if (!reduce) calmT = setTimeout(function () { hero.classList.add('calm'); }, 2500); });
    $$('li', queue).forEach(function (li) { li.addEventListener('click', function () { show(+li.dataset.i); }); });
    show(0);
  }

  var openId = document.body.dataset.open !== undefined ? (new URLSearchParams(location.search).get('id') || 'spring') : null;
  if (openId && K.work(openId)) setTimeout(function () { openNote(openId, null, true); }, 120);

  /* ---------- 재생 화면 ---------- */
  if ($('#wp')) {
    var qs = new URLSearchParams(location.search);
    var w = K.work(qs.get('id') || 'spring') || K.work('spring'), c = K.creatorOf(w);
    var ep = +(qs.get('ep') || 0);
    document.title = w.title + ' 재생 — KIVELO 시안 1';
    var wp = $('#wp'), vid = $('#wv'), mon = w.montage;
    vid.src = mon ? mon.src : w.prev;
    if (!mon) vid.loop = true;
    var parts = mon ? mon.parts : [{ at: 0, scene: 0 }];
    var total = mon ? mon.total : 5;
    $('#wpTitle').textContent = w.title + (w.series ? ' · ' + (ep || 1) + '화' : '');
    var note = $('#wpNote'); if (note) note.href = 'work.html?id=' + w.id;
    var fmt = function (s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); };
    var bar = $('#wpBar'), rail = $('.wp-rail', bar), knob = $('#wpKnob'), tip = $('#wpTip'), xr = $('#wpX'), xOn = true, last = -1;
    var dur = function () { return vid.duration || total; };
    var ends = parts.map(function (p, k) { return k < parts.length - 1 ? parts[k + 1].at : total; });
    rail.innerHTML = parts.map(function (p, k) { return '<i class="sg" style="flex:' + Math.max(0.2, ends[k] - p.at).toFixed(2) + '"><b></b><u></u></i>'; }).join('');
    var sgs = $$('.sg', rail);
    var paintSeg = function (t, sel) {
      var d = dur();
      parts.forEach(function (p, k) {
        var e2 = k < parts.length - 1 ? parts[k + 1].at : d;
        var f = Math.max(0, Math.min(1, (t - p.at) / Math.max(0.01, e2 - p.at)));
        $(sel, sgs[k]).style.transform = 'scaleX(' + f + ')';
      });
    };
    var partAt = function (t) { var k = 0; for (var i = 0; i < parts.length; i++) if (t >= parts[i].at) k = i; return k; };
    var flash = function (icon) { var f = $('#wpFlash'); f.innerHTML = icon; f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); };
    var idleT;
    var wake = function () { wp.classList.remove('idle'); clearTimeout(idleT); idleT = setTimeout(function () { if (!vid.paused && !wp.classList.contains('ad') && !wp.classList.contains('ended')) wp.classList.add('idle'); }, 2600); };
    ['mousemove', 'touchstart', 'keydown'].forEach(function (ev) { document.addEventListener(ev, wake, { passive: true }); });
    var setPP = function () { $('#wpPP').innerHTML = vid.paused ? I.play : I.pause; wp.classList.toggle('paused', vid.paused); };
    var start = function () {
      wp.classList.remove('ad'); wp.classList.add('started');
      var t0 = qs.get('t');
      if (t0 !== null && mon) { var pp = parts.filter(function (x) { return x.scene === +t0; })[0]; if (pp) { var seek = function () { vid.currentTime = pp.at + 0.05; }; if (vid.readyState > 0) seek(); else vid.addEventListener('loadedmetadata', seek, { once: true }); } }
      playV(vid); wake();
    };
    var toggle = function () { if (!wp.classList.contains('started') || wp.classList.contains('ended')) return; if (vid.paused) { playV(vid); flash(I.play); } else { vid.pause(); flash(I.pause); } };
    vid.addEventListener('play', setPP); vid.addEventListener('pause', setPP);
    $('#wpPP').addEventListener('click', toggle);
    vid.addEventListener('click', toggle);
    $('#wpBk').addEventListener('click', function () { vid.currentTime = Math.max(0, vid.currentTime - 10); flash('<b>-10</b>'); });
    $('#wpFw').addEventListener('click', function () { vid.currentTime = Math.min(dur() - 0.1, vid.currentTime + 10); flash('<b>+10</b>'); });
    $('#wpVol').addEventListener('click', function () { this.classList.toggle('off'); });
    var speeds = [1, 1.25, 1.5, 0.75], si = 0;
    $('#wpSpd').addEventListener('click', function () { si = (si + 1) % speeds.length; vid.playbackRate = speeds[si]; this.textContent = speeds[si] + 'x'; flash('<b>' + speeds[si] + 'x</b>'); });
    $('#wpFs').addEventListener('click', function () { if (document.fullscreenElement) document.exitFullscreen(); else if (wp.requestFullscreen) wp.requestFullscreen(); });
    $('#wpXTog').addEventListener('click', function () { xOn = !xOn; this.classList.toggle('on', xOn); xr.classList.toggle('on', xOn && last >= 0); });
    $('#wpBack').addEventListener('click', function (e) { if (history.length > 1 && document.referrer.indexOf(location.host) >= 0) { e.preventDefault(); history.back(); } });
    var seekFrom = function (e) { var r = rail.getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)); };
    bar.addEventListener('mousemove', function (e) {
      var f = seekFrom(e), t = f * dur(), k = partAt(t), sc = w.scenes[parts[k].scene];
      paintSeg(t, 'u');
      sgs.forEach(function (s, j) { s.classList.toggle('hv', j === k); });
      tip.style.left = (f * 100) + '%';
      $('img', tip).src = sc ? sc.img : w.wide; $('b', tip).textContent = fmt(t); $('span', tip).textContent = sc ? sc.title : '';
      bar.classList.add('hover');
    });
    bar.addEventListener('mouseleave', function () { bar.classList.remove('hover'); paintSeg(-1, 'u'); sgs.forEach(function (s) { s.classList.remove('hv'); }); });
    var dragging = false;
    bar.addEventListener('pointerdown', function (e) { dragging = true; bar.setPointerCapture(e.pointerId); vid.currentTime = seekFrom(e) * dur(); });
    bar.addEventListener('pointermove', function (e) { if (dragging) vid.currentTime = seekFrom(e) * dur(); });
    bar.addEventListener('pointerup', function () { dragging = false; });
    vid.addEventListener('timeupdate', function () {
      var d = dur(), f = vid.currentTime / d;
      paintSeg(vid.currentTime, 'b');
      knob.style.left = (f * 100) + '%';
      $('#wpTime').textContent = fmt(vid.currentTime) + ' / ' + fmt(d);
      var k = partAt(vid.currentTime), sc = w.scenes[parts[k].scene];
      if (k !== last && sc) {
        last = k;
        xr.classList.remove('on');
        $('#wpScene').textContent = sc.title;
        setTimeout(function () {
          xr.innerHTML = '<img src="' + sc.img + '" alt=""><div><em>지금 장면 · ' + esc(sc.t) + '</em><b>' + esc(sc.title) + '</b><span>' + esc(sc.how) + '</span></div>';
          xr.classList.toggle('on', xOn);
        }, 260);
      }
    });
    var seriesNext = w.series && (ep || 1) < w.series.length;
    var picks = [];
    if (seriesNext) picks.push({ url: 'watch.html?id=' + w.id + '&ep=' + ((ep || 1) + 1), img: w.scenes[Math.min(ep || 1, w.scenes.length - 1)].img, t: w.title + ' ' + ((ep || 1) + 1) + '화', r: '다음 화' });
    similar(w).slice(0, 2).forEach(function (x) { picks.push({ url: 'watch.html?id=' + x.id, img: x.wide, t: x.title, r: reason(w, x) }); });
    picks = picks.slice(0, 2);
    var endEl = $('#wpEnd'), endT;
    var showEnd = function () {
      endEl.innerHTML = '<div class="we-l"><span class="we-k">끝까지 보셨어요</span><h2>' + esc(w.title) + '</h2><p>' + esc(c.name) + ' · ' + esc(w.runtime) + ' · ' + esc(w.method) + '</p><div class="we-mk">' + mkHTML(w) + '</div>' +
        '<div class="we-btns"><button class="pbtn" type="button" id="weAgain">' + I.replay + '처음부터 다시</button><a class="pbtn" href="work.html?id=' + w.id + '">작품 노트</a></div></div>' +
        '<div class="we-r"><span class="we-k">다음으로 볼 작품</span>' + picks.map(function (p, i) {
          return '<a class="we-n' + (i ? '' : ' auto') + '" href="' + p.url + '"><span class="we-pic"><img src="' + p.img + '" alt=""><i class="we-cd"></i></span><span class="we-b"><em>' + esc(p.r) + '</em><b>' + esc(p.t) + '</b>' + (i ? '' : '<small id="weCd">8초 뒤 이어서 재생합니다</small>') + '</span></a>';
        }).join('') + '</div>';
      endEl.classList.add('on'); wp.classList.remove('idle'); wp.classList.add('ended');
      setTimeout(function () { var mk = $('.we-mk', endEl); if (mk) mk.classList.add('mk-now'); }, 60);
      var n = 8;
      clearInterval(endT);
      endT = setInterval(function () { n--; var cd = $('#weCd'); if (cd) cd.textContent = n + '초 뒤 이어서 재생합니다'; if (n <= 0) { clearInterval(endT); go(picks[0].url); } }, 1000);
      $('#weAgain').addEventListener('click', function () { clearInterval(endT); endEl.classList.remove('on'); wp.classList.remove('ended'); vid.currentTime = 0; playV(vid); });
      $$('.we-n', endEl).forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); clearInterval(endT); go(a.getAttribute('href'), e.clientX, e.clientY); }); });
    };
    vid.addEventListener('ended', function () { if (mon) showEnd(); });
    $('#wpNextBtn').addEventListener('click', function () { go(picks[0].url); });
    $('#wpNextBtn').setAttribute('aria-label', seriesNext ? '다음 화' : '다음 작품');
    if (w.series) {
      var eb = $('#wpEps'); eb.hidden = false;
      var epp = $('#wpEpsPanel');
      epp.innerHTML = '<h4>' + esc(w.title) + ' · 시즌 1</h4>' + w.series.map(function (e2, i) {
        return '<a href="watch.html?id=' + w.id + '&ep=' + e2.no + '" class="' + ((ep || 1) === e2.no ? 'on' : '') + '"><img src="' + w.scenes[Math.min(i, w.scenes.length - 1)].img + '" alt=""><div><b>' + e2.no + '화 · ' + esc(e2.title) + '</b><span>' + e2.len + ' · ' + esc(EPDESC[e2.no] || '') + '</span></div></a>';
      }).join('');
      eb.addEventListener('click', function (e) { e.stopPropagation(); epp.classList.toggle('on'); });
      document.addEventListener('click', function (e) { if (!e.target.closest('#wpEpsPanel')) epp.classList.remove('on'); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); toggle(); }
      else if (e.key === 'ArrowRight') { vid.currentTime = Math.min(dur() - 0.1, vid.currentTime + 5); flash('<b>+5</b>'); }
      else if (e.key === 'ArrowLeft') { vid.currentTime = Math.max(0, vid.currentTime - 5); flash('<b>-5</b>'); }
      else if (e.key === 'f') $('#wpFs').click();
    });
    if (w.free) {
      wp.classList.add('ad');
      var an = 5, sk = $('#adSkip'), adT = $('#adT');
      sk.style.setProperty('--d', '3s'); sk.classList.add('run');
      var tick = setInterval(function () {
        an--; adT.textContent = '0:0' + Math.max(0, an);
        if (an === 2) { sk.disabled = false; $('#adSkipT').textContent = '광고 건너뛰기'; }
        else if (an > 2) $('#adSkipT').textContent = (an - 2) + '초 뒤 건너뛰기';
        if (an <= 0) { clearInterval(tick); start(); }
      }, 1000);
      sk.addEventListener('click', function () { clearInterval(tick); start(); });
    } else start();
    setPP();
  }

  /* ---------- 쇼츠 ---------- */
  if ($('#spFeed')) {
    var feed = $('#spFeed');
    feed.innerHTML = K.shorts.map(function (s) {
      var w2 = K.work(s.work), c2 = K.creatorOf(w2), j = sceneIdx(w2, s.at);
      return '<article class="sx" id="' + s.id + '" data-id="' + s.id + '"><div class="sx-v"><video muted playsinline loop preload="none" poster="' + s.poster + '" data-src="' + s.src + '"></video>' +
        '<div class="sx-prog"><i></i></div><div class="sx-hearts"></div>' +
        '<div class="sx-info"><div class="sx-cr"><img src="' + w2.scenes[0].img + '" alt=""><b>' + esc(c2.name) + '</b><button class="sx-fol" type="button">팔로우</button></div>' +
        '<div class="sx-t">' + esc(s.title) + '</div><div class="sx-made">' + aiStages(w2, 2).map(function (x) { return esc(x.k) + ' ' + esc(tool1(x)); }).join(' · ') + '</div>' +
        '<a class="sx-bridge" href="watch.html?id=' + w2.id + '&t=' + j + '" data-act="play" data-id="' + w2.id + '" data-scene="' + j + '"><img src="' + w2.poster + '" alt=""><div><b>본편 · ' + esc(w2.title) + '</b><span>' + esc(s.at) + ' 장면부터 이어서 · ' + esc(w2.runtime) + '</span></div><span class="sx-go">' + I.play + '</span></a></div></div>' +
        '<div class="sx-rail"><button type="button" class="sx-like" aria-label="좋아요">' + I.heart + '<span>좋아요</span></button>' +
        kpBtn(w2, 'rail') +
        '<button type="button" data-act="share">' + I.share + '<span>공유</span></button>' +
        '<a href="work.html?id=' + w2.id + '" class="sx-info-btn">' + I.note + '<span>작품 노트</span></a></div></article>';
    }).join('');
    var side = $('#spR');
    var setSide = function (id) {
      if (!side) return;
      var s = K.shorts.filter(function (x) { return x.id === id; })[0], w3 = K.work(s.work), c3 = K.creatorOf(w3), j = sceneIdx(w3, s.at);
      var idx = K.shorts.indexOf(s), nexts = K.shorts.slice(idx + 1).concat(K.shorts.slice(0, idx)).slice(0, 4);
      side.innerHTML = '<div class="sr-in"><h3>지금 보는 쇼츠의 본편</h3><a class="sr-work" href="watch.html?id=' + w3.id + '&t=' + j + '" data-act="play" data-id="' + w3.id + '" data-scene="' + j + '"><div class="c-pic"><img src="' + w3.wide + '" alt=""><span class="sr-play">' + I.play + esc(s.at) + '부터 이어 보기</span></div><b class="sr-t">' + esc(w3.title) + '</b></a>' +
        '<div class="nt-meta" style="margin-top:8px;font-size:13px">' + price(w3) + '<span>' + esc(w3.runtime) + '</span><span>' + esc(c3.name) + '</span></div>' +
        '<p class="sr-log">' + esc(w3.logline) + '</p><p class="sr-from">이 쇼츠는 <b>' + esc(s.at) + '</b> 장면에서 잘라 왔어요. 위 그림을 누르면 그 장면부터 이어서 봅니다.</p>' +
        '<h3 style="margin-top:26px">다음 쇼츠</h3><div class="sr-next">' + nexts.map(function (n2) { return '<button type="button" data-jump="' + n2.id + '"><img src="' + n2.poster + '" alt=""><span>' + esc(n2.title) + '</span></button>'; }).join('') + '</div></div>';
      $$('[data-jump]', side).forEach(function (b) { b.addEventListener('click', function () { var t = document.getElementById(b.dataset.jump); feed.scrollTo({ top: t.offsetTop, behavior: 'smooth' }); }); });
    };
    var active = null;
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var el = e.target, v = $('video', el);
        if (e.intersectionRatio >= 0.6) {
          if (active !== el) {
            if (active) active.classList.remove('ready');
            active = el; playV(v); setSide(el.dataset.id);
            clearTimeout(el._rt); el._rt = setTimeout(function () { if (active === el) el.classList.add('ready'); }, 1500);
            if (history.replaceState) history.replaceState(null, '', '#' + el.dataset.id);
          }
        } else { v.pause(); el.classList.remove('ready'); }
      });
    }, { root: feed, threshold: [0, 0.6, 1] });
    $$('.sx', feed).forEach(function (el) {
      io2.observe(el);
      var v = $('video', el), pr = $('.sx-prog i', el);
      v.addEventListener('timeupdate', function () { pr.style.width = (v.currentTime / (v.duration || 1) * 100) + '%'; });
      var lastTap = 0;
      var like = function (x, y) {
        var b = $('.sx-like', el); b.classList.add('on');
        var hb = $('.sx-hearts', el), h = document.createElement('i');
        h.innerHTML = I.heart; h.style.left = x + 'px'; h.style.top = y + 'px'; h.style.setProperty('--r', (Math.random() * 30 - 15).toFixed(0) + 'deg');
        hb.appendChild(h); setTimeout(function () { h.remove(); }, 900);
      };
      $('.sx-v', el).addEventListener('click', function (e) {
        if (e.target.closest('a,button')) return;
        var now = Date.now(), r = this.getBoundingClientRect();
        if (now - lastTap < 320) { like(e.clientX - r.left, e.clientY - r.top); lastTap = 0; return; }
        lastTap = now;
        setTimeout(function () { if (lastTap && Date.now() - lastTap >= 300) { if (v.paused) playV(v); else v.pause(); el.classList.toggle('held', v.paused); lastTap = 0; } }, 330);
      });
      $('.sx-like', el).addEventListener('click', function () { this.classList.toggle('on'); if (this.classList.contains('on')) like($('.sx-v', el).clientWidth / 2, $('.sx-v', el).clientHeight / 2); });
      $('.sx-fol', el).addEventListener('click', function () { this.classList.toggle('on'); this.textContent = this.classList.contains('on') ? '팔로우 중' : '팔로우'; });
    });
    var goN = function (d) { var items = $$('.sx', feed), i = items.indexOf(active), n2 = items[Math.min(items.length - 1, Math.max(0, i + d))]; if (n2) feed.scrollTo({ top: n2.offsetTop, behavior: 'smooth' }); };
    $$('[data-go]').forEach(function (b) { b.addEventListener('click', function () { goN(+b.dataset.go); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); goN(1); } if (e.key === 'ArrowUp') { e.preventDefault(); goN(-1); } });
    if (location.hash) { var tg = document.getElementById(location.hash.slice(1)); if (tg) { var jump = function () { if (Math.abs(feed.scrollTop - tg.offsetTop) > 4) feed.scrollTop = tg.offsetTop; }; setTimeout(jump, 50); setTimeout(jump, 400); window.addEventListener('load', jump); } }
    $$('.sp-cats button').forEach(function (b) { b.addEventListener('click', function () { $$('.sp-cats button').forEach(function (x) { x.classList.toggle('on', x === b); }); }); });
  }
})();
