(function () {
  var K = window.KV, M = K.M, esc = K.esc;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = function () { return window.innerWidth <= 760; };
  var I = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m5 12 5 5 9-10"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M7 10v10H4V10zM7 10l4-7c1.6 0 2.6 1.3 2.2 2.8L12.5 9H19a2 2 0 0 1 2 2.3l-1.2 6.8A2.2 2.2 0 0 1 17.6 20H7"/></svg>',
    dn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" style="transform:rotate(180deg)"><path d="M7 10v10H4V10zM7 10l4-7c1.6 0 2.6 1.3 2.2 2.8L12.5 9H19a2 2 0 0 1 2 2.3l-1.2 6.8A2.2 2.2 0 0 1 17.6 20H7"/></svg>',
    love: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M5 11.5v8.5H2.5v-8.5zM5 11.5l3.3-6c1.3 0 2.2 1.1 1.8 2.4L9.6 10.6H15a1.7 1.7 0 0 1 1.7 2l-1 5.6a1.9 1.9 0 0 1-1.9 1.8H5"/><path d="M12.4 5.2 13.8 2.6c1.3 0 2.2 1.1 1.8 2.4l-.6 2.6H20a1.7 1.7 0 0 1 1.7 2l-1 5.6a1.9 1.9 0 0 1-1.9 1.8h-.6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m6 9 6 6 6-6"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m9 5 7 7-7 7"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m15 5-7 7 7 7"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6h14v-6"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.6-4.6-9.8-9.6A5.4 5.4 0 0 1 12 5.6a5.4 5.4 0 0 1 9.8 5.8C19.6 16.4 12 21 12 21Z"/></svg>',
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 12 5 5 9-10"/></svg>'
  };
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function playV(v) { if (!v) return; if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src; var p = v.play(); if (p && p.catch) p.catch(function () {}); }

  var ORIG = { spring: 1, charge: 1, singularity: 1, sintel: 1, sprite: 1 };
  var MOODS = ['잔잔한', '경이로운', '긴장감', '쓸쓸한', '몽환적', '유쾌한', '오싹한', '경쾌한', '뭉클한', '박진감', '엉뚱한', '애틋한'];
  var EPDESC = { 1: '캠핑장에 도착한 다섯 친구. 숲 한가운데 유난히 버섯이 많습니다.', 2: '밤새 버섯이 자리를 옮겼다는 걸 알아챈 친구들. 누가 장난을 치는 걸까요?', 3: '보름달이 뜨자 숲속 버섯들이 일제히 고개를 듭니다.' };
  var CONT = [
    { id: 'charge', p: 62, s: '남은 시간 1분 40초' },
    { id: 'sprite', p: 35, s: '2화 · 남은 시간 2분 10초' },
    { id: 'sintel', p: 15, s: '남은 시간 12분 30초' },
    { id: 'singularity', p: 80, s: '남은 시간 1분 20초' }
  ];
  var CONTM = {}; CONT.forEach(function (x) { CONTM[x.id] = x; });
  var TOP = ['spring', 'charge', 'sprite', 'singularity', 'sintel', 'wingit', 'hero', 'coffee', 'glass'];
  var LIST = ['glass', 'coffee'];
  var RATE = {};

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
  function madeHTML(w, n) { return esc(w.method) + ' · ' + aiStages(w, n).map(function (s) { return esc(s.k) + ' <b>' + esc(s.tool.split(' ')[0]) + '</b>'; }).join(' · '); }
  function sceneIdx(w, at) { for (var i = 0; i < w.scenes.length; i++) if (w.scenes[i].t === at) return i; return 0; }
  function inList(id) { return LIST.indexOf(id) >= 0; }
  function addBtn(w) {
    var on = inList(w.id);
    return '<button class="cb add' + (on ? ' on' : '') + '" type="button" data-act="add" data-id="' + w.id + '" aria-label="내가 찜한 작품">' + (on ? I.check : I.plus) + '<span class="tip">' + (on ? '찜 목록에서 빼기' : '내가 찜한 작품에 담기') + '</span></button>';
  }
  function rateBtn(w) {
    var v = RATE[w.id];
    return '<div class="rate" data-id="' + w.id + '"><button class="cb' + (v ? ' on' : '') + '" type="button" aria-label="평가">' + (v === -1 ? I.dn : v === 2 ? I.love : I.up) + '</button>' +
      '<div class="rate-pop"><button type="button" data-act="rate" data-v="-1" data-id="' + w.id + '" class="' + (v === -1 ? 'on' : '') + '" aria-label="별로예요">' + I.dn + '<span class="tip">별로예요</span></button>' +
      '<button type="button" data-act="rate" data-v="1" data-id="' + w.id + '" class="' + (v === 1 ? 'on' : '') + '" aria-label="좋아요">' + I.up + '<span class="tip">좋아요</span></button>' +
      '<button type="button" data-act="rate" data-v="2" data-id="' + w.id + '" class="' + (v === 2 ? 'on' : '') + '" aria-label="최고예요">' + I.love + '<span class="tip">최고예요!</span></button></div></div>';
  }
  function pic(w, tall) {
    if (tall) return '<img src="' + w.poster + '" alt="" loading="lazy">';
    return '<picture><source media="(max-width: 760px)" srcset="' + w.poster + '"><img src="' + w.wide + '" alt="" loading="lazy"></picture>';
  }

  var toastEl = $('#toast'), toastT;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.innerHTML = I.ok + '<span>' + esc(msg) + '</span>';
    toastEl.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2400);
  }
  function go(url) {
    var wp = $('#wipe');
    if (!wp || reduce) { location.href = url; return; }
    wp.classList.add('on'); setTimeout(function () { location.href = url; }, 300);
  }
  window.addEventListener('pageshow', function () { var wp = $('#wipe'); if (wp) wp.classList.remove('on'); });

  var nav = $('#nav');
  if (nav && !nav.classList.contains('fixed-solid')) {
    var pills = $('#pills'), lastY = 0;
    var onScroll = function () {
      var y = window.scrollY;
      nav.classList.toggle('solid', y > 30);
      if (pills) {
        pills.classList.toggle('solid', y > 30);
        if (y > lastY + 6 && y > 120) pills.classList.add('hide');
        else if (y < lastY - 6) pills.classList.remove('hide');
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  $$('.drop').forEach(function (d) {
    var t;
    var open = function () { clearTimeout(t); $$('.drop.open').forEach(function (o) { if (o !== d) o.classList.remove('open'); }); d.classList.add('open'); if (d.id === 'bellDrop') { var b = $('#bellN'); if (b) { b.style.transition = 'transform .3s'; b.style.transform = 'scale(0)'; } } };
    var close = function () { t = setTimeout(function () { d.classList.remove('open'); }, 220); };
    if (fine) { d.addEventListener('mouseenter', open); d.addEventListener('mouseleave', close); }
    $('.drop-btn', d).addEventListener('click', function (e) { e.stopPropagation(); if (d.classList.contains('open') && !fine) d.classList.remove('open'); else open(); });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.drop')) $$('.drop.open').forEach(function (o) { o.classList.remove('open'); }); });
  if ($('#bellMenu')) {
    $('#bellMenu').innerHTML = [
      { img: M + 'scene/sprite_4.jpg', b: '새 에피소드 · 버섯 숲의 밤 3화', s: '‘달이 뜨면’이 올라왔어요 · 어제', n: 1, id: 'sprite' },
      { img: M + 'scene/spring_7.jpg', b: '모운 스튜디오가 쇼츠를 올렸어요', s: '산이 깨어나는 순간 · 2일 전', n: 1, id: 'spring' },
      { img: M + 'scene/singularity_5.jpg', b: '공개 예정 · 별의 첫 숨 감독판', s: '10월 31일 금요일에 공개됩니다 · 3일 전', n: 1, id: 'singularity' },
      { img: M + 'scene/charge_2.jpg', b: '이어서 보기 · 방전', s: '1분 40초 남았어요 · 1주 전', id: 'charge' }
    ].map(function (x) { return '<a class="noti' + (x.n ? ' new' : '') + '" href="work.html?id=' + x.id + '" data-act="open" data-id="' + x.id + '"><img src="' + x.img + '" alt=""><div><b>' + esc(x.b) + '</b><span>' + esc(x.s) + '</span></div></a>'; }).join('');
  }

  /* ---------- 카드 ---------- */
  function cWork(w, o) {
    o = o || {};
    return '<a class="card ' + (o.tall ? 'tall' : 'wide') + '" href="work.html?id=' + w.id + '" data-id="' + w.id + '" data-kind="work"><div class="c-pic' + (o.tag ? ' tagged' : '') + '">' + pic(w, o.tall) +
      (ORIG[w.id] ? '<span class="k-mark" title="키벨로 오리지널">K</span>' : '') + (o.corner ? '<span class="c-corner">' + esc(o.corner) + '</span>' : '') + '<span class="c-name">' + esc(w.title) + '</span>' +
      (o.tag ? '<span class="c-tag">' + esc(o.tag) + '</span>' : '') + '</div></a>';
  }
  function cCont(x) {
    var w = K.work(x.id);
    return '<a class="card cont" href="watch.html?id=' + w.id + '" data-id="' + w.id + '" data-kind="cont"><div class="c-pic">' + pic(w) + '<span class="c-name">' + esc(w.title) + '</span><span class="c-play"><span>' + I.play + '</span></span></div>' +
      '<div class="c-prog"><i style="width:' + x.p + '%"></i></div><div class="c-sub">' + esc(x.s) + '</div></a>';
  }
  function cTop(w, i) {
    return '<a class="card top" href="work.html?id=' + w.id + '" data-id="' + w.id + '" data-kind="work"><span class="num" aria-hidden="true"><svg viewBox="0 0 110 160"><text x="108" y="150" text-anchor="end">' + (i + 1) + '</text></svg></span>' +
      '<div class="c-pic"><img src="' + w.poster + '" alt="' + esc(w.title) + '" loading="lazy">' + (ORIG[w.id] ? '<span class="k-mark">K</span>' : '') + '</div></a>';
  }
  function cShort(s) {
    var w = K.work(s.work);
    return '<a class="card short" href="shorts.html#' + s.id + '" data-kind="short"><div class="c-pic"><img src="' + s.poster + '" alt="" loading="lazy"><video muted playsinline loop preload="none" data-src="' + s.src + '"></video><span class="c-name">' + esc(s.title) + '</span></div>' +
      '<div class="c-bridge">' + I.film + '<span>본편 <b>' + esc(w.title) + '</b> ' + esc(s.at) + '</span></div></a>';
  }
  function cScene(w, j) {
    var s = w.scenes[j];
    return '<a class="card scene" href="watch.html?id=' + w.id + '&t=' + j + '" data-id="' + w.id + '" data-scene="' + j + '" data-kind="scene"><div class="c-pic"><img src="' + s.img + '" alt="" loading="lazy"><span class="c-time">' + esc(s.t) + '</span><span class="c-name">' + esc(s.title) + '</span></div>' +
      '<div class="c-how"><b>' + esc(w.title) + '</b> · ' + esc(s.how) + '</div></a>';
  }
  function cSoon(x) {
    return '<div class="card soon" data-id="' + x.id + '" data-kind="soon" tabindex="0"><div class="c-pic"><img src="' + x.img + '" alt="" loading="lazy"><span class="c-date"><b>' + esc(x.day) + '</b>' + esc(x.when) + '</span><span class="c-name">' + esc(x.title) + '</span></div>' +
      '<button class="remind" type="button" data-when="' + esc(x.day + ' ' + x.when) + '">' + I.bell + '알림 받기</button></div>';
  }
  function cCrea(k) {
    var c = K.creators[k], w = K.work(c.works[0]);
    return '<div class="card crea" data-cr="' + k + '" data-kind="crea" tabindex="0"><div class="cr-pic"><img src="' + w.scenes[0].img + '" alt="" loading="lazy"></div><div class="cr-n">' + esc(c.name) + '</div><div class="cr-s">작품 ' + c.works.length + ' · 쇼츠 ' + c.shorts + '</div><button class="fol" type="button">팔로우</button></div>';
  }
  function cEmpty() { return '<div class="card list-empty"><div class="c-pic"><span>아직 찜한 작품이 없어요.<br>작품 위에 마우스를 올리고 ＋를 눌러 보세요.</span></div></div>'; }

  /* ---------- 미리보기 카드 ---------- */
  var pv = $('#pv'), PV = { open: false, card: null, pend: null, showT: 0, hideT: 0, vidT: 0, from: '' };
  function pvHTML(card, w) {
    var j = card.dataset.scene, sc = j != null ? w.scenes[+j] : null;
    var h = '<div class="pv-media" data-act="open" data-id="' + w.id + '"><img src="' + (sc ? sc.img : w.wide) + '" alt="">' +
      (sc ? '' : '<video muted playsinline loop preload="none" data-src="' + w.prev + '"></video>') + '<span class="c-name">' + esc(sc ? sc.title : w.title) + '</span></div>';
    h += '<div class="pv-body"><div class="pv-btns"><button class="cb fill" type="button" data-act="play" data-id="' + w.id + '"' + (sc ? ' data-scene="' + j + '"' : '') + ' aria-label="재생">' + I.play + '</button>' + addBtn(w) + rateBtn(w) +
      '<span class="sp"></span><button class="cb" type="button" data-act="open" data-id="' + w.id + '" aria-label="상세 정보">' + I.down + '<span class="tip">상세 정보</span></button></div>';
    if (sc) {
      h += '<div class="pv-meta"><b>' + esc(w.title) + '</b><span>' + esc(sc.t) + '부터 재생</span></div><div class="pv-made"><b>이 장면</b> · ' + esc(sc.how) + '</div>';
    } else {
      var x = card.dataset.kind === 'cont' ? CONTM[w.id] : null;
      if (x) h += '<div class="pv-meta"><span>' + esc(x.s) + '</span></div><div class="c-prog" style="margin-top:8px;border-radius:3px"><i style="width:' + x.p + '%"></i></div>';
      h += '<div class="pv-meta">' + price(w) + '<span class="m-age">' + age(w) + '</span><span>' + esc(w.runtime) + '</span><span class="m-hd">HD</span></div>' +
        '<div class="pv-tags">' + tagsOf(w).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<div class="pv-made">' + madeHTML(w, 3) + '</div>';
    }
    return h + '</div>';
  }
  function showPv(card) {
    if (!pv || small() || (mo && mo.classList.contains('on'))) return;
    var w = K.work(card.dataset.id); if (!w) return;
    var p = $('.c-pic', card) || card, r = p.getBoundingClientRect();
    if (r.width < 20 || r.bottom < 60 || r.top > window.innerHeight) return;
    var big = card.classList.contains('tall') || card.classList.contains('top');
    var W = Math.round(Math.max(300, Math.min(440, r.width * (big ? 1.9 : 1.52))));
    pv.style.width = W + 'px';
    pv.innerHTML = pvHTML(card, w);
    pv.dataset.id = w.id;
    var mh = W * 9 / 16, margin = window.innerWidth * 0.022;
    var left = Math.min(Math.max(r.left + r.width / 2 - W / 2, margin), window.innerWidth - margin - W);
    var top = r.top + r.height / 2 - mh / 2 - (big ? r.height * 0.08 : 0);
    top = Math.max(76, top);
    var from = 'translate(' + (r.left - left) + 'px,' + (r.top - top) + 'px) scale(' + (r.width / W) + ')';
    pv.style.left = left + 'px'; pv.style.top = (top + window.scrollY) + 'px';
    pv.style.transition = 'none'; pv.style.transform = from; pv.style.opacity = '0';
    pv.classList.add('on'); pv.classList.remove('full');
    PV.open = true; PV.card = card; PV.from = from;
    void pv.offsetWidth;
    pv.style.transition = 'transform .4s cubic-bezier(.2,.8,.2,1), opacity .16s';
    pv.style.transform = 'none'; pv.style.opacity = '1';
    setTimeout(function () { if (PV.card === card) pv.classList.add('full'); }, 150);
    var v = $('video', pv);
    clearTimeout(PV.vidT);
    if (v) PV.vidT = setTimeout(function () {
      if (PV.card !== card) return;
      v.addEventListener('playing', function () { var m = $('.pv-media', pv); if (m) m.classList.add('vid'); }, { once: true });
      playV(v);
    }, 700);
  }
  function hidePv(now) {
    clearTimeout(PV.showT); clearTimeout(PV.vidT); PV.pend = null;
    if (!PV.open || !pv) return;
    PV.open = false;
    var card = PV.card; PV.card = null;
    var v = $('video', pv); if (v) v.pause();
    pv.classList.remove('full', 'on');
    if (now) { pv.style.transition = 'none'; pv.style.opacity = '0'; return; }
    var to = PV.from;
    if (card && document.body.contains(card)) {
      var p = $('.c-pic', card) || card, r = p.getBoundingClientRect(), W = pv.offsetWidth;
      var left = parseFloat(pv.style.left), top = parseFloat(pv.style.top) - window.scrollY;
      to = 'translate(' + (r.left - left) + 'px,' + (r.top - top) + 'px) scale(' + (r.width / W) + ')';
    }
    pv.style.transition = 'transform .3s cubic-bezier(.4,0,.2,1), opacity .22s .08s';
    pv.style.transform = to; pv.style.opacity = '0';
  }
  if (pv && fine) {
    document.addEventListener('mouseover', function (e) {
      var card = e.target.closest && e.target.closest('.card');
      if (!card || !card.dataset.id || card.dataset.kind === 'soon' || card.dataset.kind === 'short') return;
      if (card === PV.card) { clearTimeout(PV.hideT); return; }
      if (card === PV.pend) return;
      clearTimeout(PV.showT); PV.pend = card;
      PV.showT = setTimeout(function () { PV.pend = null; if (PV.open) hidePv(true); showPv(card); }, PV.open ? 160 : 480);
    });
    document.addEventListener('mouseout', function (e) {
      var card = e.target.closest && e.target.closest('.card');
      if (!card || !card.dataset.id) return;
      var to = e.relatedTarget;
      if (to && card.contains(to)) return;
      var toPv = to && to.closest && to.closest('#pv');
      if (card === PV.pend && !toPv) { clearTimeout(PV.showT); PV.pend = null; }
      if (card === PV.card && !toPv) { clearTimeout(PV.hideT); PV.hideT = setTimeout(function () { hidePv(); }, 90); }
    });
    pv.addEventListener('mouseenter', function () { clearTimeout(PV.hideT); });
    pv.addEventListener('mouseleave', function (e) {
      var to = e.relatedTarget;
      if (to && PV.card && PV.card.contains(to)) return;
      clearTimeout(PV.hideT); PV.hideT = setTimeout(function () { hidePv(); }, 70);
    });
    window.addEventListener('scroll', function () { if (PV.open) hidePv(true); clearTimeout(PV.showT); PV.pend = null; }, { passive: true });
  }

  /* ---------- 상세 창 ---------- */
  var mo = $('#mo'), MO = { id: null, from: null };
  function similar(w) {
    return K.works.filter(function (x) { return x.id !== w.id; }).map(function (x) {
      var t = x.tools.filter(function (a) { return w.tools.indexOf(a) >= 0; }).length;
      var g = x.tags.filter(function (a) { return w.tags.indexOf(a) >= 0; }).length;
      return { x: x, n: t + g * 0.6 + (x.methodKey === w.methodKey ? 0.5 : 0) };
    }).sort(function (a, b) { return b.n - a.n; }).map(function (r) { return r.x; });
  }
  function modalHTML(w) {
    var c = K.creatorOf(w), vsrc = w.montage ? w.montage.src : w.prev;
    var h = '<button class="mo-x" type="button" data-act="close" aria-label="닫기">' + I.x + '</button>' +
      '<div class="mo-media"><img src="' + w.wide + '" alt=""><video muted playsinline loop preload="none" data-src="' + vsrc + '"></video>' +
      '<div class="mo-head"><h2 class="mo-title">' + esc(w.title) + '</h2><div class="mo-en">' + esc(w.en) + '</div>' +
      '<div class="mo-btns"><a class="btn play" href="watch.html?id=' + w.id + '" data-act="play" data-id="' + w.id + '"' + (w.series ? ' data-ep="2"' : '') + '>' + I.play + (w.series ? '2화 이어서 재생' : CONTM[w.id] ? '이어서 재생' : '재생') + '</a>' + addBtn(w) + rateBtn(w) + '</div></div></div>';
    h += '<div class="mo-body"><div class="mo-grid"><div><div class="mo-meta">' + price(w) + '<span>' + w.year + '</span><span>' + esc(w.runtime) + '</span><span class="m-hd">HD</span><span class="m-age">' + age(w) + '</span><span>자막 한국어·영어</span></div>' +
      '<p class="mo-log">' + esc(w.logline) + '</p><p class="mo-memo">' + esc(w.memo) + '</p></div>' +
      '<div class="mo-side"><p>제작: <a href="#" data-act="creator" data-cr="' + w.creator + '">' + esc(c.name) + '</a></p><p>장르: <b>' + esc(w.genre) + '</b></p><p>특징: <b>' + esc(tagsOf(w).join(', ')) + '</b></p>' +
      '<p>만든 방식: <b>' + esc(w.method) + '</b></p><p>보는 방법: <b>' + (w.free ? '무료 · 시작 전 광고 1회' : '구독 · 광고 없이') + '</b></p></div></div>';
    if (w.series) {
      h += '<div class="mo-sec"><div class="mo-sec-h"><h3>회차</h3><span>시즌 1 · 매주 일요일 한 화씩</span></div>' + w.series.map(function (e, i) {
        return '<div class="ep" data-act="play" data-id="' + w.id + '" data-ep="' + e.no + '"><div class="ep-n">' + e.no + '</div><div class="ep-pic"><img src="' + w.scenes[Math.min(i, w.scenes.length - 1)].img + '" alt="" loading="lazy"><span class="c-play"><span>' + I.play + '</span></span></div>' +
          '<div><div class="ep-t">' + e.no + '화 · ' + esc(e.title) + '<span>' + e.len + '</span></div><p>' + esc(EPDESC[e.no] || '') + '</p>' + (e.no === 2 ? '<div class="ep-bar"><i style="width:35%"></i></div>' : '') + '</div></div>';
      }).join('') + '</div>';
    }
    h += '<div class="mo-sec"><div class="mo-sec-h"><h3>장면으로 보기</h3><span>장면을 누르면 그 장면부터 재생합니다</span></div><div class="sc-grid">' + w.scenes.map(function (s, j) {
      return '<div class="sc" data-act="play" data-id="' + w.id + '" data-scene="' + j + '"><div class="c-pic"><img src="' + s.img + '" alt="" loading="lazy"><span class="c-time">' + esc(s.t) + '</span><span class="c-play"><span>' + I.play + '</span></span></div><b>' + esc(s.title) + '</b><span class="how">' + esc(s.how) + '</span></div>';
    }).join('') + '</div></div>';
    var mine = K.shorts.filter(function (s) { return s.work === w.id; });
    if (mine.length) {
      h += '<div class="mo-sec"><div class="mo-sec-h"><h3>이 작품에서 나온 쇼츠</h3><span>짧게 보고 본편으로</span></div><div class="mo-shorts">' + mine.map(function (s) {
        return '<a class="card short" href="shorts.html#' + s.id + '" data-kind="short"><div class="c-pic"><img src="' + s.poster + '" alt="" loading="lazy"><span class="c-name">' + esc(s.title) + '</span></div></a>';
      }).join('') + '</div></div>';
    }
    var rel = similar(w).slice(0, 8);
    h += '<div class="mo-sec"><div class="mo-sec-h"><h3>비슷한 작품</h3><span>같은 도구·분위기로 만든 작품부터</span></div><div class="sim-wrap"><div class="sim">' + rel.map(function (x) {
      return '<div class="si" data-act="swap" data-id="' + x.id + '"><div class="c-pic"><img src="' + x.wide + '" alt="" loading="lazy"><span class="c-time">' + esc(x.runtime) + '</span><span class="c-name">' + esc(x.title) + '</span></div>' +
        '<div class="si-b"><div class="si-r"><div><span class="m-age">' + age(x) + '</span>' + price(x) + '</div>' + addBtn(x) + '</div><p>' + esc(x.logline) + '</p></div></div>';
    }).join('') + '</div><div class="sim-more"><button class="cb" type="button" data-act="simmore" aria-label="더 보기">' + I.down + '</button></div></div></div>';
    h += '<div class="mo-sec about"><h3><b>' + esc(w.title) + '</b> 상세 정보</h3><dl><dt>제작</dt><dd>' + esc(c.name) + '</dd>' + w.stages.map(function (s) {
      var v = s.who === '사람' ? '사람' : s.who === '없음' ? '없음' : '<span class="ai">' + esc(s.tool || 'AI') + '</span>' + (s.who === '함께' ? ' · 사람과 함께' : '');
      return '<dt>' + esc(s.k) + '</dt><dd>' + v + '</dd>';
    }).join('') + '<dt>장르</dt><dd>' + esc(w.genre) + '</dd><dt>관람 등급</dt><dd>' + esc(w.rating) + '</dd><dt>운영 확인</dt><dd>' + esc(w.review) + '</dd></dl></div>';
    return h + '</div>';
  }
  function startModalVideo() {
    var v = $('.mo-media video', mo); if (!v) return;
    setTimeout(function () {
      if (!mo.classList.contains('on')) return;
      v.addEventListener('playing', function () { var m = $('.mo-media', mo); if (m) m.classList.add('vid'); }, { once: true });
      playV(v);
    }, 650);
  }
  function openModal(id, fromEl, noPush) {
    var w = K.work(id); if (!w || !mo) return;
    hidePv(true); closeSheet();
    mo.innerHTML = '<div class="mo-panel" id="moPanel">' + modalHTML(w) + '</div>';
    mo.scrollTop = 0;
    mo.classList.add('on'); document.body.classList.add('lock');
    var panel = $('#moPanel');
    var f = panel.getBoundingClientRect(), from;
    if (fromEl && !reduce && !small()) {
      var r = fromEl.getBoundingClientRect();
      from = 'translate(' + (r.left - f.left) + 'px,' + (r.top - f.top) + 'px) scale(' + (r.width / f.width) + ')';
    } else from = small() ? 'translateY(60px)' : 'translateY(36px) scale(.95)';
    panel.style.transition = 'none'; panel.style.transform = from; panel.style.opacity = fromEl ? '.5' : '0';
    void panel.offsetWidth;
    panel.style.transition = 'transform .55s cubic-bezier(.2,.8,.2,1), opacity .3s';
    panel.style.transform = 'none'; panel.style.opacity = '1';
    MO = { id: id, from: fromEl };
    startModalVideo();
    if (!noPush && history.pushState) history.pushState({ mo: id }, '', 'work.html?id=' + id);
  }
  function swapModal(id) {
    var w = K.work(id), panel = $('#moPanel'); if (!w || !panel) return;
    panel.style.transition = 'opacity .22s, transform .3s'; panel.style.opacity = '0'; panel.style.transform = 'translateY(14px)';
    mo.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    setTimeout(function () {
      panel.innerHTML = modalHTML(w);
      panel.style.opacity = '1'; panel.style.transform = 'none';
      MO.id = id; MO.from = null;
      startModalVideo();
      if (history.replaceState) history.replaceState({ mo: id }, '', 'work.html?id=' + id);
    }, 240);
  }
  function closeModal(fromPop) {
    if (!mo || !mo.classList.contains('on')) return;
    var panel = $('#moPanel'), v = $('.mo-media video', mo); if (v) v.pause();
    var el = MO.from;
    if (el && document.body.contains(el) && el.getBoundingClientRect().width > 0 && !reduce && !small()) {
      var r = el.getBoundingClientRect(), f = panel.getBoundingClientRect();
      panel.style.transition = 'transform .42s cubic-bezier(.4,0,.2,1), opacity .3s .12s';
      panel.style.transform = 'translate(' + (r.left - f.left) + 'px,' + (r.top - f.top) + 'px) scale(' + (r.width / f.width) + ')';
    } else { panel.style.transition = 'transform .32s, opacity .26s'; panel.style.transform = small() ? 'translateY(60px)' : 'translateY(24px) scale(.97)'; }
    panel.style.opacity = '0';
    mo.classList.remove('on'); document.body.classList.remove('lock');
    setTimeout(function () { if (!mo.classList.contains('on')) mo.innerHTML = ''; }, 460);
    if (!fromPop && history.replaceState) {
      if (history.state && history.state.mo) history.back(); else history.replaceState(null, '', 'index.html' + location.hash);
    }
  }
  window.addEventListener('popstate', function (e) { if (e.state && e.state.mo) openModal(e.state.mo, null, true); else closeModal(true); });
  if (mo) mo.addEventListener('click', function (e) { if (e.target === mo) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (mo && mo.classList.contains('on')) closeModal(); else closeSheet(); } });

  /* ---------- 아래에서 올라오는 창(폰) ---------- */
  var sheet = $('#sheet');
  function openSheet(id, j) {
    var w = K.work(id); if (!w || !sheet) return;
    var sc = j != null ? w.scenes[+j] : null, on = inList(id);
    sheet.innerHTML = '<div class="sheet-bg" data-act="sheetx"></div><div class="sheet-in"><button class="sh-x" type="button" data-act="sheetx" aria-label="닫기">' + I.x + '</button>' +
      '<div class="sh-top"><img src="' + w.poster + '" alt=""><div><h3>' + esc(w.title) + '</h3><div class="pv-meta">' + price(w) + '<span>' + w.year + '</span><span class="m-age">' + age(w) + '</span><span>' + esc(w.runtime) + '</span></div>' +
      '<p>' + (sc ? '선택한 장면 · <b>' + esc(sc.title) + '</b> (' + esc(sc.t) + ') — ' + esc(sc.how) : esc(w.logline)) + '</p></div></div>' +
      '<div class="sh-btns"><a class="go" href="watch.html?id=' + w.id + '" data-act="play" data-id="' + w.id + '"' + (sc ? ' data-scene="' + j + '"' : '') + '>' + I.play + (sc ? '이 장면부터' : '재생') + '</a>' +
      '<button type="button" class="add' + (on ? ' on' : '') + '" data-act="add" data-id="' + w.id + '" data-style="sheet">' + (on ? I.check : I.plus) + '<span>찜</span></button>' +
      '<button type="button" data-act="share">' + I.share + '<span>공유</span></button></div>' +
      '<button class="sh-info" type="button" data-act="open" data-id="' + w.id + '"><span>' + I.info + '</span><span style="flex:1;text-align:left;margin-left:10px">' + (w.series ? '회차 및 상세 정보' : '상세 정보') + '</span>' + I.chev + '</button></div>';
    sheet.classList.add('on');
  }
  function closeSheet() { if (sheet) sheet.classList.remove('on'); }

  /* ---------- 찜·평가 ---------- */
  function refreshAdd(id) {
    var on = inList(id);
    $$('[data-act="add"][data-id="' + id + '"]').forEach(function (b) {
      b.classList.toggle('on', on);
      if (b.dataset.style === 'sheet') b.innerHTML = (on ? I.check : I.plus) + '<span>찜</span>';
      else b.innerHTML = (on ? I.check : I.plus) + '<span class="tip">' + (on ? '찜 목록에서 빼기' : '내가 찜한 작품에 담기') + '</span>';
    });
  }
  function toggleList(id) {
    var w = K.work(id); if (!w) return;
    var row = $('#row-list'), track = row && $('.row-track', row);
    if (inList(id)) {
      LIST.splice(LIST.indexOf(id), 1);
      toast('‘' + w.title + '’을(를) 찜 목록에서 뺐어요');
      if (track) {
        var el = $('.card[data-id="' + id + '"]', track);
        if (el) { el.classList.add('leave'); setTimeout(function () { el.remove(); if (!LIST.length) track.innerHTML = cEmpty(); if (row._render) row._render(); }, 420); }
      }
    } else {
      LIST.unshift(id);
      toast('‘' + w.title + '’을(를) 내가 찜한 작품에 담았어요');
      if (track) {
        var em = $('.list-empty', track); if (em) em.remove();
        track.insertAdjacentHTML('afterbegin', cWork(w));
        var nc = track.firstElementChild; nc.classList.add('enter');
        if (row._render) row._render();
      }
    }
    var cnt = row && $('.row-h .cnt', row); if (cnt) cnt.textContent = LIST.length;
    refreshAdd(id);
  }
  function rate(id, v) {
    var w = K.work(id); if (!w) return;
    RATE[id] = RATE[id] === v ? 0 : v;
    $$('.rate[data-id="' + id + '"]').forEach(function (r) {
      var b = r.firstElementChild, cur = RATE[id];
      b.classList.toggle('on', !!cur); b.innerHTML = cur === -1 ? I.dn : cur === 2 ? I.love : I.up;
      $$('.rate-pop button', r).forEach(function (o) { o.classList.toggle('on', +o.dataset.v === cur); });
    });
    toast(!RATE[id] ? '평가를 지웠어요' : v === -1 ? '별로예요를 남겼어요. 비슷한 작품은 덜 보여 드릴게요' : v === 1 ? '좋아요를 남겼어요. 비슷한 작품을 더 보여 드릴게요' : '최고예요! 비슷한 작품을 먼저 보여 드릴게요');
  }

  /* ---------- 클릭 한 곳에서 처리 ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (t) {
      var act = t.dataset.act, idEl = t.dataset.id ? t : t.closest('[data-id]'), id = idEl ? idEl.dataset.id : null;
      if (act === 'play') {
        e.preventDefault();
        var url = 'watch.html?id=' + id + (t.dataset.scene != null ? '&t=' + t.dataset.scene : '') + (t.dataset.ep ? '&ep=' + t.dataset.ep : '');
        go(url); return;
      }
      if (act === 'open') {
        e.preventDefault();
        var src = t.closest('.pv') ? $('.pv-media', pv) : null;
        if (!src && PV.card) src = $('.c-pic', PV.card);
        openModal(id, src || null); return;
      }
      if (act === 'add') { e.preventDefault(); e.stopPropagation(); toggleList(id); t.classList.add('pop'); return; }
      if (act === 'rate') { e.preventDefault(); e.stopPropagation(); rate(id, +t.dataset.v); return; }
      if (act === 'close') { closeModal(); return; }
      if (act === 'swap') { if (e.target.closest('[data-act="add"]')) return; swapModal(id); return; }
      if (act === 'simmore') { t.closest('.sim-wrap').classList.toggle('open'); return; }
      if (act === 'sheetx') { closeSheet(); return; }
      if (act === 'share') { toast('작품 주소를 복사했어요'); return; }
      if (act === 'creator') { e.preventDefault(); var cr = K.creators[t.dataset.cr]; closeModal(); setTimeout(function () { runSearch(cr.name); }, 300); return; }
    }
    var rateWrap = e.target.closest('.rate');
    if (rateWrap && !fine) { rateWrap.classList.toggle('open'); return; }
    var fol = e.target.closest('.fol');
    if (fol) {
      e.preventDefault(); fol.classList.toggle('on'); fol.textContent = fol.classList.contains('on') ? '팔로우 중' : '팔로우';
      var ck = fol.closest('.crea').dataset.cr;
      if (fol.classList.contains('on')) toast('‘' + K.creators[ck].name + '’의 새 작품이 올라오면 알려 드릴게요');
      return;
    }
    var rem = e.target.closest('.remind');
    if (rem) {
      rem.classList.toggle('on'); rem.innerHTML = rem.classList.contains('on') ? I.check + '알림 켜짐' : I.bell + '알림 받기';
      if (rem.classList.contains('on')) toast(rem.dataset.when + ' 공개되면 알려 드릴게요');
      return;
    }
    var card = e.target.closest('.card');
    if (card && (card.closest('.browse') || card.closest('.results'))) {
      var kind = card.dataset.kind;
      if (kind === 'short' || card.classList.contains('list-empty')) return;
      e.preventDefault();
      if (kind === 'crea') { runSearch(K.creators[card.dataset.cr].name); return; }
      if (kind === 'cont' && !small()) { go(card.getAttribute('href')); return; }
      if (small()) { openSheet(card.dataset.id, card.dataset.scene); return; }
      if (kind === 'scene') { go(card.getAttribute('href')); return; }
      openModal(card.dataset.id, $('.c-pic', card));
    }
  });

  /* ---------- 줄 ---------- */
  function rowHTML(r) {
    return '<section class="row reveal" id="row-' + r.key + '" data-type="' + r.type + '"><h2 class="row-h"><a href="#row-' + r.key + '" data-gal="' + r.key + '">' + esc(r.title) +
      (r.count ? ' <span class="cnt" style="color:var(--mute);font-weight:600">' + r.count + '</span>' : '') + (r.more === false ? '' : '<span class="row-more">모두 보기' + I.chev + '</span>') + '</a><ol class="row-pages"></ol></h2>' +
      '<div class="row-view"><button class="row-arr prev" type="button" aria-label="이전" hidden>' + I.left + '</button><div class="row-track">' + r.html + '</div><button class="row-arr next" type="button" aria-label="다음">' + I.chev + '</button></div></section>';
  }
  function setupRow(row) {
    var track = $('.row-track', row), prev = $('.row-arr.prev', row), next = $('.row-arr.next', row), pages = $('.row-pages', row), page = 0, moved = false;
    var per = function () { return parseInt(getComputedStyle(row).getPropertyValue('--per'), 10) || 6; };
    var n = function () { return track.children.length; };
    var render = function () {
      var p = per(), cnt = Math.max(1, Math.ceil(n() / p));
      if (page > cnt - 1) page = cnt - 1;
      track.style.setProperty('--k', Math.min(page * p, Math.max(0, n() - p)));
      next.hidden = cnt <= 1; prev.hidden = cnt <= 1 || !moved;
      var html = ''; if (cnt > 1) for (var i = 0; i < cnt; i++) html += '<li' + (i === page ? ' class="on"' : '') + '></li>';
      pages.innerHTML = html;
    };
    next.addEventListener('click', function () { hidePv(true); var cnt = Math.ceil(n() / per()); page = (page + 1) % cnt; moved = true; render(); });
    prev.addEventListener('click', function () { hidePv(true); var cnt = Math.ceil(n() / per()); page = (page - 1 + cnt) % cnt; render(); });
    row._render = render; render();
  }

  if ($('#browse')) {
    var W = function (id) { return K.work(id); };
    var allScenes = [];
    TOP.forEach(function (id) { var w = W(id); w.scenes.forEach(function (s, j) { allScenes.push([w, j]); }); });
    var mixed = [];
    for (var round = 0; round < 7; round++) allScenes.forEach(function (x) { if (x[1] === round) mixed.push(x); });
    var SOON = [
      { id: 'sprite', img: M + 'wide/sprite.jpg', day: '10월 25일', when: '일요일 공개', title: '버섯 숲의 밤 4화' },
      { id: 'singularity', img: M + 'scene/singularity_5.jpg', day: '10월 31일', when: '금요일 공개', title: '별의 첫 숨 감독판' },
      { id: 'hero', img: M + 'scene/hero_2.jpg', day: '11월 7일', when: '금요일 공개', title: '붉은 비행사 메이킹' },
      { id: 'sintel', img: M + 'scene/sintel_1.jpg', day: '11월 14일', when: '금요일 공개', title: '용을 찾아서 2부' }
    ];
    var NEWB = { sprite: '새 에피소드', hero: '새 작품', glass: '새 작품', coffee: '새 작품', wingit: '새 작품' };
    var rows = [
      { key: 'cont', type: 'cont', title: '시청 중인 작품', more: false, html: CONT.map(cCont).join('') },
      { key: 'list', type: 'wide', title: '내가 찜한 작품', more: false, count: LIST.length, html: LIST.map(function (id) { return cWork(W(id)); }).join('') },
      { key: 'top', type: 'top', title: '오늘 키벨로에서 많이 본 작품', html: TOP.map(function (id, i) { return cTop(W(id), i); }).join('') },
      { key: 'trend', type: 'wide', title: '지금 뜨는 작품', html: ['sintel', 'sprite', 'charge', 'wingit', 'spring', 'hero', 'singularity', 'glass', 'coffee'].map(function (id) { return cWork(W(id), { corner: W(id).free ? '' : '구독' }); }).join('') },
      { key: 'orig', type: 'tall', title: '키벨로 오리지널', html: ['spring', 'charge', 'singularity', 'sprite', 'sintel'].map(function (id) { return cWork(W(id), { tall: 1 }); }).join('') },
      { key: 'shorts', type: 'shorts', title: '쇼츠 · 짧게 보고 본편으로', html: K.shorts.map(cShort).join('') },
      { key: 'scene', type: 'scene', title: '명장면 · 장면부터 바로 보기', html: mixed.map(function (x) { return cScene(x[0], x[1]); }).join('') },
      { key: 'new', type: 'new', title: '새로 올라온 작품', html: ['sprite', 'hero', 'glass', 'coffee', 'wingit', 'singularity'].map(function (id) { return cWork(W(id), { tag: NEWB[id] }); }).join('') },
      { key: 'mj', type: 'wide', title: 'Midjourney로 그린 원화에서 시작한 작품', html: K.works.filter(function (w) { return w.tools.indexOf('Midjourney') >= 0; }).map(function (w) { return cWork(w); }).join('') },
      { key: 'family', type: 'tall', title: '가족과 함께 보기 좋은 작품', html: K.works.filter(function (w) { return w.rating === '전체관람가'; }).map(function (w) { return cWork(w, { tall: 1 }); }).join('') },
      { key: 'soon', type: 'soon', title: '공개 예정', more: false, html: SOON.map(cSoon).join('') },
      { key: 'crea', type: 'creators', title: '키벨로의 창작자', more: false, html: Object.keys(K.creators).map(cCrea).join('') }
    ];
    var html = '';
    rows.forEach(function (r, i) {
      html += rowHTML(r);
      if (r.key === 'scene') {
        html += '<div class="planbar"><div class="pb-pics">' + ['charge', 'sintel', 'hero'].map(function (id, k) { return '<img src="' + W(id).poster + '" alt="" style="--i:' + k + '">'; }).join('') + '</div>' +
          '<p><b>지금은 무료로 보는 중이에요</b>작품 시작 전에 광고가 한 번 나옵니다. 구독하면 광고 없이, 구독 작품까지 모두 봅니다.</p><a class="btn play" href="#">구독 안내 보기</a></div>';
      }
    });
    $('#browse').innerHTML = html;
    $$('#browse .row').forEach(setupRow);
    var ro; window.addEventListener('resize', function () { clearTimeout(ro); ro = setTimeout(function () { $$('#browse .row').forEach(function (r) { if (r._render) r._render(); }); }, 150); });
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
      $$('#browse .row').forEach(function (r) { io.observe(r); });
    } else $$('#browse .row').forEach(function (r) { r.classList.add('in'); });

    document.addEventListener('mouseover', function (e) {
      var c = e.target.closest && e.target.closest('.card.short'); if (!c || !fine) return;
      if (c._on) return; c._on = 1; playV($('video', c)); c.classList.add('playing');
    });
    document.addEventListener('mouseout', function (e) {
      var c = e.target.closest && e.target.closest('.card.short'); if (!c || (e.relatedTarget && c.contains(e.relatedTarget))) return;
      c._on = 0; var v = $('video', c); if (v) v.pause(); c.classList.remove('playing');
    });

    var sb = $('#stripBg');
    if (sb) sb.innerHTML = ['spring_1', 'charge_3', 'singularity_1', 'sprite_2', 'sintel_2', 'hero_2', 'wingit_3', 'coffee_1', 'glass_1', 'spring_4', 'singularity_3', 'charge_5'].map(function (n) { return '<img src="' + M + 'scene/' + n + '.jpg" alt="" loading="lazy">'; }).join('');

    $$('#browse [data-gal]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var row = a.closest('.row'); if (!$('.row-more', a)) return;
        e.preventDefault();
        var title = a.childNodes[0].textContent;
        showResults('<div class="res-rel"><button type="button" data-home>‹ 홈으로</button></div><h2 class="res-h" style="font-size:28px;margin-bottom:22px">' + esc(title) + '</h2><div class="res-grid">' +
          $$('.row-track > .card', row).map(function (c) { var n = c.cloneNode(true); n.classList.remove('enter'); return n.outerHTML; }).join('') + '</div>');
      });
    });
  }

  /* ---------- 검색 ---------- */
  var resEl = $('#results'), srch = $('#srch'), sIn = $('#srchIn');
  function showResults(html) {
    if (!resEl) return;
    hidePv(true);
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
    var h = '<div class="res-rel">' + (relK.length ? '<span>다음과 관련된 작품:</span>' + relK.map(function (k) { return '<button type="button" data-q="' + esc(k) + '">' + esc(k) + '</button>'; }).join('') : '<button type="button" data-home>‹ 홈으로</button>') + '</div>';
    if (!ws.length && !sc.length && !sh.length) h += '<p class="res-empty">‘' + esc(q) + '’와(과) 맞는 작품이 아직 없어요. 제목, 창작자, 장르, 만든 도구(예: Runway, Midjourney)로 찾아 보세요.</p>';
    if (ws.length) h += '<h3 class="res-h">작품 ' + ws.length + '편</h3><div class="res-grid">' + ws.map(function (w) { return cWork(w); }).join('') + '</div>';
    if (sc.length) h += '<h3 class="res-h">장면 ' + sc.length + '개</h3><div class="res-grid">' + sc.slice(0, 18).map(function (x) { return cScene(x[0], x[1]); }).join('') + '</div>';
    if (sh.length) h += '<h3 class="res-h">쇼츠 ' + sh.length + '개</h3><div class="res-grid short-grid">' + sh.map(cShort).join('') + '</div>';
    showResults(h);
    if (history.replaceState) history.replaceState(null, '', location.pathname + '?q=' + encodeURIComponent(q));
  }
  if (srch) {
    var st;
    $('#srchBtn').addEventListener('click', function () { srch.classList.add('open'); sIn.focus(); });
    sIn.addEventListener('input', function () { srch.classList.toggle('has', !!sIn.value); clearTimeout(st); st = setTimeout(function () { runSearch(sIn.value); }, 220); });
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
          '<div class="h-fold"><div><p class="h-log">' + esc(w.logline) + '</p><p class="h-made"><span>' + esc(w.method) + '</span>' + aiStages(w, 3).map(function (s) { return '<span>' + esc(s.k) + ' ' + esc(s.tool.split(' ')[0]) + '</span>'; }).join('') + '</p></div></div>' +
          '<div class="h-cta"><a class="btn play" href="watch.html?id=' + w.id + '" data-act="play" data-id="' + w.id + '">' + I.play + '지금 보기</a>' +
          '<button class="btn ghost" type="button" data-act="open" data-id="' + w.id + '">' + I.info + '상세 정보</button>' +
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
  if (openId && K.work(openId)) setTimeout(function () { openModal(openId, null, true); }, 120);

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
    $('#wpTitle').textContent = w.title + (w.series ? ' · ' + (ep || 1) + '화' : '');
    var fmt = function (s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); };
    var bar = $('#wpBar'), fill = $('#wpFill'), hov = $('#wpHov'), knob = $('#wpKnob'), tip = $('#wpTip'), xr = $('#wpX'), xOn = true, last = -1;
    var dur = function () { return vid.duration || (mon ? mon.total : 5); };
    if (mon) parts.forEach(function (p, k) { if (!k) return; var m = document.createElement('i'); m.className = 'mk'; m.style.left = (p.at / mon.total * 100) + '%'; $('.wp-rail', bar).appendChild(m); });
    var partAt = function (t) { var k = 0; for (var i = 0; i < parts.length; i++) if (t >= parts[i].at) k = i; return k; };
    var flash = function (icon) { var f = $('#wpFlash'); f.innerHTML = icon; f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); };
    var idleT;
    var wake = function () { wp.classList.remove('idle'); clearTimeout(idleT); idleT = setTimeout(function () { if (!vid.paused && !wp.classList.contains('ad')) wp.classList.add('idle'); }, 2600); };
    ['mousemove', 'touchstart', 'keydown'].forEach(function (ev) { document.addEventListener(ev, wake, { passive: true }); });
    var setPP = function () { $('#wpPP').innerHTML = vid.paused ? I.play : I.pause; wp.classList.toggle('paused', vid.paused); };
    var start = function () {
      wp.classList.remove('ad'); wp.classList.add('started');
      var t0 = qs.get('t');
      if (t0 !== null && mon) { var pp = parts.filter(function (x) { return x.scene === +t0; })[0]; if (pp) { var seek = function () { vid.currentTime = pp.at + 0.05; }; if (vid.readyState > 0) seek(); else vid.addEventListener('loadedmetadata', seek, { once: true }); } }
      playV(vid); wake();
    };
    var toggle = function () { if (!wp.classList.contains('started')) return; if (vid.paused) { playV(vid); flash(I.play); } else { vid.pause(); flash(I.pause); } };
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
    var seekFrom = function (e) { var r = $('.wp-rail', bar).getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)); };
    bar.addEventListener('mousemove', function (e) {
      var f = seekFrom(e), t = f * dur(), k = partAt(t), sc = w.scenes[parts[k].scene];
      hov.style.width = (f * 100) + '%';
      tip.style.left = (f * 100) + '%';
      $('img', tip).src = sc ? sc.img : w.wide; $('b', tip).textContent = fmt(t); $('span', tip).textContent = sc ? sc.title : '';
      bar.classList.add('hover');
    });
    bar.addEventListener('mouseleave', function () { bar.classList.remove('hover'); hov.style.width = '0'; });
    var dragging = false;
    bar.addEventListener('pointerdown', function (e) { dragging = true; bar.setPointerCapture(e.pointerId); vid.currentTime = seekFrom(e) * dur(); });
    bar.addEventListener('pointermove', function (e) { if (dragging) vid.currentTime = seekFrom(e) * dur(); });
    bar.addEventListener('pointerup', function () { dragging = false; });
    vid.addEventListener('timeupdate', function () {
      var d = dur(), f = vid.currentTime / d;
      fill.style.width = (f * 100) + '%'; knob.style.left = (f * 100) + '%';
      $('#wpTime').textContent = '남은 시간 ' + fmt(d - vid.currentTime);
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
    var order = TOP.filter(function (id) { return id !== w.id; });
    var nextW = w.series && (ep || 1) < w.series.length ? null : K.work(order[0]);
    var nextUrl = w.series && (ep || 1) < w.series.length ? 'watch.html?id=' + w.id + '&ep=' + ((ep || 1) + 1) : 'watch.html?id=' + nextW.id;
    var nx = $('#wpNext'), nxT;
    var showNext = function () {
      var title = nextW ? nextW.title : w.title + ' ' + ((ep || 1) + 1) + '화', img = nextW ? nextW.wide : w.scenes[Math.min(ep || 1, w.scenes.length - 1)].img;
      nx.innerHTML = '<div class="nx-pic"><img src="' + img + '" alt=""></div><div class="nx-b"><span>' + (nextW ? '다음으로 볼 작품' : '다음 화') + '</span><b>' + esc(title) + '</b><div class="nx-btns"><a class="btn play" href="' + nextUrl + '"><svg class="nx-ring" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15"/></svg>' + I.play + '바로 재생</a><button class="btn ghost" type="button" id="nxAgain">다시 보기</button></div></div>';
      nx.classList.add('on'); wp.classList.remove('idle');
      clearTimeout(nxT); nxT = setTimeout(function () { go(nextUrl); }, 8000);
      $('#nxAgain').addEventListener('click', function () { clearTimeout(nxT); nx.classList.remove('on'); vid.currentTime = 0; playV(vid); });
    };
    vid.addEventListener('ended', function () { if (mon) showNext(); });
    $('#wpNextBtn').addEventListener('click', function () { go(nextUrl); });
    $('#wpNextBtn').setAttribute('aria-label', nextW ? '다음 작품' : '다음 화');
    if (w.series) {
      var eb = $('#wpEps'); eb.hidden = false;
      var panel = $('#wpEpsPanel');
      panel.innerHTML = '<h4>' + esc(w.title) + ' · 시즌 1</h4>' + w.series.map(function (e2, i) {
        return '<a href="watch.html?id=' + w.id + '&ep=' + e2.no + '" class="' + ((ep || 1) === e2.no ? 'on' : '') + '"><img src="' + w.scenes[Math.min(i, w.scenes.length - 1)].img + '" alt=""><div><b>' + e2.no + '화 · ' + esc(e2.title) + '</b><span>' + e2.len + ' · ' + esc(EPDESC[e2.no] || '') + '</span></div></a>';
      }).join('');
      eb.addEventListener('click', function (e) { e.stopPropagation(); panel.classList.toggle('on'); });
      document.addEventListener('click', function (e) { if (!e.target.closest('#wpEpsPanel')) panel.classList.remove('on'); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); toggle(); }
      else if (e.key === 'ArrowRight') { vid.currentTime = Math.min(dur() - 0.1, vid.currentTime + 5); flash('<b>+5</b>'); }
      else if (e.key === 'ArrowLeft') { vid.currentTime = Math.max(0, vid.currentTime - 5); flash('<b>-5</b>'); }
      else if (e.key === 'f') $('#wpFs').click();
    });
    if (w.free) {
      wp.classList.add('ad');
      var n = 5, sk = $('#adSkip'), adT = $('#adT');
      sk.style.setProperty('--d', '3s'); sk.classList.add('run');
      var tick = setInterval(function () {
        n--; adT.textContent = '0:0' + Math.max(0, n);
        if (n === 2) { sk.disabled = false; $('#adSkipT').textContent = '광고 건너뛰기'; }
        else if (n > 2) $('#adSkipT').textContent = (n - 2) + '초 뒤 건너뛰기';
        if (n <= 0) { clearInterval(tick); start(); }
      }, 1000);
      sk.addEventListener('click', function () { clearInterval(tick); start(); });
    } else start();
    setPP();
  }

  /* ---------- 쇼츠 ---------- */
  if ($('#spFeed')) {
    var feed = $('#spFeed');
    feed.innerHTML = K.shorts.map(function (s) {
      var w = K.work(s.work), c = K.creatorOf(w), j = sceneIdx(w, s.at);
      return '<article class="sx" id="' + s.id + '" data-id="' + s.id + '"><div class="sx-v"><video muted playsinline loop preload="none" poster="' + s.poster + '" data-src="' + s.src + '"></video>' +
        '<div class="sx-prog"><i></i></div><div class="sx-hearts"></div>' +
        '<div class="sx-info"><div class="sx-cr"><img src="' + w.scenes[0].img + '" alt=""><b>' + esc(c.name) + '</b><button class="sx-fol" type="button">팔로우</button></div>' +
        '<div class="sx-t">' + esc(s.title) + '</div><div class="sx-made">' + aiStages(w, 2).map(function (x) { return esc(x.k) + ' ' + esc(x.tool.split(' ')[0]); }).join(' · ') + '</div>' +
        '<a class="sx-bridge" href="watch.html?id=' + w.id + '&t=' + j + '" data-act="play" data-id="' + w.id + '" data-scene="' + j + '"><img src="' + w.poster + '" alt=""><div><b>본편 · ' + esc(w.title) + '</b><span>' + esc(s.at) + ' 장면부터 이어서 · ' + esc(w.runtime) + '</span></div><span class="sx-go">' + I.play + '</span></a></div></div>' +
        '<div class="sx-rail"><button type="button" class="sx-like" aria-label="좋아요">' + I.heart + '<span>좋아요</span></button>' +
        '<button type="button" data-act="add" data-id="' + w.id + '" data-style="sheet" class="' + (inList(w.id) ? 'on' : '') + '">' + (inList(w.id) ? I.check : I.plus) + '<span>찜</span></button>' +
        '<button type="button" data-act="share">' + I.share + '<span>공유</span></button>' +
        '<a href="work.html?id=' + w.id + '" class="sx-info-btn">' + I.info + '<span>정보</span></a></div></article>';
    }).join('');
    var side = $('#spR');
    var setSide = function (id) {
      if (!side) return;
      var s = K.shorts.filter(function (x) { return x.id === id; })[0], w = K.work(s.work), c = K.creatorOf(w), j = sceneIdx(w, s.at);
      var idx = K.shorts.indexOf(s), nexts = K.shorts.slice(idx + 1).concat(K.shorts.slice(0, idx)).slice(0, 4);
      side.innerHTML = '<div class="sr-in"><h3>지금 보는 쇼츠의 본편</h3><a class="sr-work" href="watch.html?id=' + w.id + '&t=' + j + '" data-act="play" data-id="' + w.id + '" data-scene="' + j + '"><div class="c-pic"><img src="' + w.wide + '" alt=""><span class="c-name">' + esc(w.title) + '</span><span class="c-play"><span>' + I.play + '</span></span></div></a>' +
        '<div class="pv-meta" style="margin-top:12px">' + price(w) + '<span class="m-age">' + age(w) + '</span><span>' + esc(w.runtime) + '</span><span>' + esc(c.name) + '</span></div>' +
        '<p class="sr-log">' + esc(w.logline) + '</p><p class="sr-from">이 쇼츠는 <b>' + esc(s.at) + '</b> 장면에서 잘라 왔어요. 위 그림을 누르면 그 장면부터 이어서 봅니다.</p>' +
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
