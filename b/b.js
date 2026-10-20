(function () {
  var K = window.KV, M = K.M, esc = K.esc;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var I = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4v16l14-8z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="m5 12 5 5 9-10"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6h14v-6"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5C19 15.6 12 20 12 20Z"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h10"/></svg>'
  };
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function playV(v) { if (!v) return; if (!v.src && v.dataset.src) v.src = v.dataset.src; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  function hoverPlay(sel) {
    if (!fine) return;
    $$(sel).forEach(function (el) {
      var v = $('video', el); if (!v) return;
      el.addEventListener('mouseenter', function () { playV(v); el.classList.add('playing'); });
      el.addEventListener('mouseleave', function () { v.pause(); el.classList.remove('playing'); });
    });
  }
  function viewPlay(sel, ratio) {
    if (fine) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { var v = $('video', e.target); if (!v) return; if (e.intersectionRatio >= ratio) { playV(v); e.target.classList.add('playing'); } else { v.pause(); e.target.classList.remove('playing'); } });
    }, { threshold: [0, ratio] });
    $$(sel).forEach(function (el) { io.observe(el); });
  }
  function aiCredit(w, n) {
    var ai = w.stages.filter(function (s) { return s.tool && s.who !== '사람'; });
    var hu = w.stages.filter(function (s) { return s.who === '사람'; }).map(function (s) { return s.k; });
    return ai.slice(0, n || 3).map(function (s) { return '<span>' + esc(s.k) + ' <b>' + esc(s.tool) + '</b></span>'; }).join('') +
      (hu.length ? '<span>' + esc(hu.slice(0, 3).join('·')) + ' <b>사람</b></span>' : '');
  }
  function aiLine(w, n) {
    var seen = {};
    return w.stages.filter(function (s) { if (!s.tool || s.who === '사람') return false; var b = s.tool.split(' ')[0]; if (seen[b]) return false; seen[b] = 1; return true; })
      .slice(0, n || 3).map(function (s) { return s.k + ' ' + s.tool; }).join(' · ');
  }
  function fav(btn, on, off) { btn.addEventListener('click', function () { btn.classList.toggle('on'); btn.innerHTML = btn.classList.contains('on') ? on : off; }); }

  var nav = $('#nav');
  if (nav && !nav.classList.contains('solid')) {
    var ns = function () { nav.classList.toggle('solid', window.scrollY > 60); };
    window.addEventListener('scroll', ns, { passive: true }); ns();
  }

  /* HOME */
  if ($('#heroInfo')) {
    var w0 = K.work('charge'), c0 = K.creatorOf(w0);
    $('#heroInfo').innerHTML = '<span class="now"><i></i>NOW SHOWING · 지난 금요일 개봉</span>' +
      '<h1 class="k hero-t">' + esc(w0.title) + '</h1><div class="d hero-en">' + esc(w0.en) + '</div>' +
      '<div class="hero-cr"><span>감독 <b>' + esc(c0.name) + '</b></span><span>' + esc(w0.genre) + '</span><span>' + esc(w0.runtime) + '</span><span>' + esc(w0.rating) + '</span><span>패스 전용</span></div>' +
      '<p class="hero-log">' + esc(w0.logline) + '</p>' +
      '<div class="hero-btns"><a class="btn y" href="work.html?id=charge&play=1">' + I.play + '상영 시작</a><a class="btn o" href="shorts.html#sh02">예고편</a><button class="btn o" type="button" id="want">' + I.plus + '보고 싶어요</button></div>' +
      '<div class="ai-credit"><span class="d">AI credits</span>' + aiCredit(w0, 3) + '</div>';
    fav($('#want'), I.check + '보고 싶어요', I.plus + '보고 싶어요');
    $('#heroSide').innerHTML = '<h4>Coming up</h4>' + [
      ['coffee', '수 20:00', '프리미어'], ['hero', '금 20:00', '프리미어'], ['singularity', '토 14:00', '관객과의 대화']
    ].map(function (x) {
      var w = K.work(x[0]);
      return '<a class="hs" href="work.html?id=' + w.id + '"><img src="' + w.poster + '" alt=""><div><b>' + esc(w.title) + '</b><span><em>' + x[2] + '</em>' + x[1] + '</span></div></a>';
    }).join('');

    var tk = ['지난 금요일 개봉 〈방전〉 상영 중', '수요일 밤 8시 〈카페인 러너〉 프리미어', '금요일 밤 8시 〈붉은 비행사〉 개봉', '토요일 오후 2시 〈별의 첫 숨〉 관객과의 대화', '〈버섯 숲의 밤〉 일요일 3화 공개', '키벨로 패스 — 광고 없이 먼저 입장'];
    $('#ticker').innerHTML = tk.concat(tk).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');

    var days = [
      { d: 'Mon', n: '10.19', slots: [{ id: 'sprite', time: '20:00', type: '새 화', t: '2화 · 버섯이 움직였다' }] },
      { d: 'Tue', n: '10.20', today: 1, slots: [{ id: 'spring', time: '21:00', type: '다시 상영', t: '봄의 문지기' }] },
      { d: 'Wed', n: '10.21', slots: [{ id: 'coffee', time: '20:00', type: '프리미어', pre: 1, t: '카페인 러너' }] },
      { d: 'Thu', n: '10.22', slots: [] },
      { d: 'Fri', n: '10.23', slots: [{ id: 'hero', time: '20:00', type: '프리미어', pre: 1, t: '붉은 비행사' }] },
      { d: 'Sat', n: '10.24', slots: [{ id: 'singularity', time: '14:00', type: '관객과의 대화', t: '별의 첫 숨 · 감독과 함께 보기' }] },
      { d: 'Sun', n: '10.25', slots: [{ id: 'sprite', time: '19:00', type: '새 화', t: '3화 · 달이 뜨면' }] }
    ];
    $('#weekGrid').innerHTML = days.map(function (d) {
      return '<div class="day' + (d.today ? ' today' : '') + '"><div class="day-h"><span class="d">' + d.d + '</span><span>' + d.n + (d.today ? ' · 오늘' : '') + '</span></div>' +
        (d.slots.length ? d.slots.map(function (s) {
          var w = K.work(s.id);
          return '<div class="slot"><a class="slot-img" href="work.html?id=' + w.id + '"><img src="' + w.poster + '" alt="" loading="lazy"></a><div><span class="slot-type' + (s.pre ? ' pre' : '') + '">' + esc(s.type) + '</span><div class="slot-time">' + s.time + '</div><div class="slot-t">' + esc(s.t) + '</div></div><button class="alarm" type="button">' + I.bell + '알림 받기</button></div>';
        }).join('') : '<div class="day-empty">상영 없음<br>지난 작품을 다시 보기 좋은 날</div>') + '</div>';
    }).join('');
    $$('.alarm').forEach(function (b) { fav(b, I.check + '알림 켜짐', I.bell + '알림 받기'); });

    var rows = ['charge', 'spring', 'singularity', 'sprite', 'sintel'];
    $('#list').innerHTML = rows.map(function (id, i) {
      var w = K.work(id), c = K.creatorOf(w);
      return '<a class="row" href="work.html?id=' + w.id + '"><span class="num">' + ('0' + (i + 1)) + '</span>' +
        '<div class="pic"><img src="' + w.poster + '" alt="" loading="lazy"><video muted playsinline loop preload="none" data-src="' + w.prev + '"></video></div>' +
        '<div><div class="k t">' + esc(w.title) + '</div><div class="d en">' + esc(w.en) + '</div>' +
        '<div class="cr"><span>감독 ' + esc(c.name) + '</span><span>' + esc(w.genre) + '</span><span>' + esc(w.runtime) + '</span><span>' + esc(w.rating) + '</span></div>' +
        '<div class="ai"><b>AI</b>' + esc(aiLine(w, 3)) + '</div></div>' +
        '<div class="go"><span class="tag-pay">' + (w.free ? '무료 · 광고' : '패스 전용') + '</span><span class="btn y">' + I.play + '상영 시작</span></div></a>';
    }).join('');
    hoverPlay('#list .row'); viewPlay('#list .row', .8);

    $('#more').innerHTML = [['wingit', ''], ['glass', ''], ['coffee', '수요일 개봉'], ['hero', '금요일 개봉']].map(function (x) {
      var w = K.work(x[0]);
      return '<a class="pp" href="work.html?id=' + w.id + '"><div class="pic"><img src="' + w.poster + '" alt="" loading="lazy"></div><b>' + esc(w.title) + '</b><span>' + (x[1] ? '<em style="font-style:normal;color:var(--y);font-weight:800">' + x[1] + '</em> · ' : '') + esc(w.genre) + '</span></a>';
    }).join('') + '<a class="pp" href="../studio/index.html"><div class="pic" style="display:grid;place-items:center;background:#111;box-shadow:inset 0 0 0 1px var(--line2)"><span class="d" style="font-size:44px;text-align:center;color:var(--y)">Your<br>film<br>here</span></div><b>상영 신청</b><span>당신의 작품을 이 자리에</span></a>';

    $('#hallGrid').innerHTML = [
      { n: '01', name: 'SF관', id: 'charge', count: 2 }, { n: '02', name: '판타지관', id: 'spring', count: 2 },
      { n: '03', name: '애니메이션관', id: 'sprite', count: 3 }, { n: '04', name: '단편·코미디관', id: 'wingit', count: 3 }
    ].map(function (h) {
      var w = K.work(h.id);
      return '<a class="hall" href="#now"><img src="' + w.wide + '" alt="" loading="lazy"><video muted playsinline loop preload="none" data-src="' + w.prev + '"></video><div class="hall-n">' + h.n + '<small>관</small></div><div class="hall-b"><b>' + h.name + '</b><span>상영작 ' + h.count + '편 · 이어서 상영</span></div></a>';
    }).join('');
    hoverPlay('#hallGrid .hall'); viewPlay('#hallGrid .hall', .7);

    $('#trail').innerHTML = K.shorts.map(function (s) {
      var w = K.work(s.work);
      return '<a class="tr" href="shorts.html#' + s.id + '"><div class="tr-pic"><img src="' + s.poster + '" alt="" loading="lazy"><video muted playsinline loop preload="none" data-src="' + s.src + '"></video><div class="tr-t">' + esc(s.title) + '</div><div class="tr-b">본편 ' + esc(w.title) + ' · ' + esc(w.runtime) + '</div></div></a>';
    }).join('');
    hoverPlay('#trail .tr'); viewPlay('#trail .tr', .85);

    $('#dirList').innerHTML = ['noeul', 'moun', 'orbital', 'smallwood'].map(function (k) {
      var c = K.creators[k];
      return '<div class="dir"><div class="nm">' + esc(c.name) + '<small>' + esc(c.en) + '</small></div><p>' + esc(c.bio) + '</p><div class="fl">' +
        c.works.map(function (id) { var w = K.work(id); return '<a href="work.html?id=' + id + '" title="' + esc(w.title) + '"><img src="' + w.poster + '" alt="' + esc(w.title) + '" loading="lazy"></a>'; }).join('') + '</div></div>';
    }).join('');
  }

  /* WORK */
  if ($('#bkT')) {
    var qs = new URLSearchParams(location.search);
    var w = K.work(qs.get('id') || 'charge') || K.work('charge'), c = K.creatorOf(w);
    document.title = w.title + ' — KIVELO 시안 2';
    $('#bkBg').src = w.wide; $('#bkPoster').src = w.poster;
    $('#bkNow').innerHTML = '<i></i>NOW SHOWING · ' + (w.free ? '무료 상영' : '패스 전용');
    $('#bkT').textContent = w.title; $('#bkEn').textContent = w.en; $('#bkLog').textContent = w.logline;
    var tr = K.shorts.filter(function (s) { return s.work === w.id; })[0];
    $('#bkBtns').innerHTML = '<button class="btn y" type="button" id="playBtn">' + I.play + (w.series ? '1화 상영 시작' : '상영 시작') + '</button>' +
      (tr ? '<a class="btn o" href="shorts.html#' + tr.id + '">예고편</a>' : '') +
      '<button class="btn o" type="button" id="want">' + I.plus + '보고 싶어요</button><button class="btn o" type="button">' + I.share + '공유</button>';
    fav($('#want'), I.check + '보고 싶어요', I.plus + '보고 싶어요');
    $('#facts').innerHTML = [['러닝타임', w.runtime], ['관람 등급', w.rating], ['장르', w.genre], ['화질', '1080p · 자막 한/영'], ['관람', w.free ? '무료 · 상영 전 광고' : '키벨로 패스']]
      .map(function (f) { return '<div><small>' + f[0] + '</small><b>' + esc(f[1]) + '</b></div>'; }).join('');

    $('#crSum').innerHTML = '<div><small>제작 방식</small><b>' + esc(w.method) + '</b></div><div><small>AI가 맡은 공정</small><b>' + K.aiShare(w) + '%</b></div><div><small>운영 확인</small><b>' + esc(w.review.split(' · ')[0]) + '</b></div>';
    $('#credRoll').innerHTML = w.stages.map(function (s) {
      var name = s.tool ? esc(s.tool) : (s.who === '없음' ? '없음 — 대사 없는 작품' : esc(c.name));
      var tag = s.who === 'AI' ? '<span class="ai">AI</span>' : s.who === '함께' ? '<span class="ai" style="background:#fff">AI + 사람</span>' : s.who === '없음' ? '' : '<span class="hu">사람</span>';
      return '<div class="cr-role">' + esc(s.k) + '</div><div class="cr-name">' + name + tag + '</div>';
    }).join('') + '<div class="cr-role">감독</div><div class="cr-name">' + esc(c.name) + '<span class="hu">사람</span></div>' +
      '<div class="cr-end">KIVELO</div><div class="cr-note">' + esc(w.review) + '</div><div class="cr-note" style="max-width:520px;margin:14px auto 0">“' + esc(w.memo) + '”</div>';

    $('#strip').innerHTML = w.scenes.map(function (s, j) {
      return '<div class="fr" data-j="' + j + '"><div class="pic"><img src="' + s.img + '" alt="" loading="lazy"><span class="tc">' + esc(s.t) + '</span></div><div class="cap"><b>' + esc(s.title) + '</b><span>' + esc(s.how) + '</span></div></div>';
    }).join('');

    $('#dirBox').innerHTML = '<div><div class="k nm">' + esc(c.name) + '</div><div class="d" style="font-size:22px;color:var(--mute);margin-top:10px">' + esc(c.en) + '</div></div>' +
      '<div><p>' + esc(c.bio) + '</p><p style="margin-top:14px;color:var(--mute);font-size:14px">상영작 ' + c.works.length + ' · 예고편·쇼츠 ' + c.shorts + '</p><button class="btn o" type="button" id="follow" style="margin-top:18px;height:46px">' + I.plus + '관심 감독</button></div>';
    fav($('#follow'), I.check + '관심 감독', I.plus + '관심 감독');

    $('#also').innerHTML = K.works.filter(function (x) { return x.id !== w.id; }).slice(0, 5).map(function (x) {
      return '<a class="pp" href="work.html?id=' + x.id + '"><div class="pic"><img src="' + x.poster + '" alt="" loading="lazy"></div><b>' + esc(x.title) + '</b><span>' + esc(x.genre) + ' · ' + esc(x.runtime) + '</span></a>';
    }).join('');

    var th = $('#theater'), tv = $('#thVid'), cap = $('#thCap'), capOn = true, last = -1;
    var mon = w.montage;
    tv.src = mon ? mon.src : w.prev;
    if (!mon) tv.loop = true;
    var parts = mon ? mon.parts : [{ at: 0, scene: 0 }];
    var fmt = function (s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); };
    var open = function (seek) {
      th.classList.add('on'); document.body.style.overflow = 'hidden'; document.body.classList.add('theater-on');
      var cnt = $('#thCount'); var n = 3;
      var go = function () { cnt.classList.add('off'); th.classList.add('playing'); if (seek != null) tv.currentTime = seek; playV(tv); };
      if (reduce || seek != null) { go(); return; }
      cnt.classList.remove('off'); cnt.textContent = n;
      var t = setInterval(function () { n--; if (n > 0) cnt.textContent = n; else { clearInterval(t); go(); } }, 700);
    };
    var close = function () { th.classList.remove('on', 'playing'); tv.pause(); document.body.style.overflow = ''; document.body.classList.remove('theater-on'); };
    $('#playBtn').addEventListener('click', function () { open(null); });
    $('#thClose').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    $('#thPP').addEventListener('click', function () { if (tv.paused) { playV(tv); this.textContent = '일시정지'; } else { tv.pause(); this.textContent = '재생'; } });
    $('#thCapTog').addEventListener('click', function () { capOn = !capOn; this.textContent = capOn ? 'AI 크레딧 자막 켬' : 'AI 크레딧 자막 끔'; cap.classList.toggle('on', capOn && last >= 0); });
    $('#thTrack').addEventListener('click', function (e) { var r = this.getBoundingClientRect(); tv.currentTime = (e.clientX - r.left) / r.width * (tv.duration || 1); });
    tv.addEventListener('timeupdate', function () {
      var d = tv.duration || 1; $('#thFill').style.width = (tv.currentTime / d * 100) + '%'; $('#thTime').textContent = fmt(tv.currentTime) + ' / ' + fmt(d);
      var k = 0; for (var i = 0; i < parts.length; i++) if (tv.currentTime >= parts[i].at) k = i;
      if (k !== last) {
        last = k; var sc = w.scenes[parts[k].scene];
        cap.classList.remove('on');
        if (sc) setTimeout(function () { cap.innerHTML = '<b>' + esc(sc.t) + '</b>' + esc(sc.title) + ' — ' + esc(sc.how); cap.classList.toggle('on', capOn); }, 200);
      }
    });
    tv.addEventListener('ended', function () { tv.currentTime = 0; playV(tv); });
    $$('#strip .fr').forEach(function (f) {
      f.addEventListener('click', function () { var j = +f.dataset.j; var p = parts.filter(function (x) { return x.scene === j; })[0]; open(p ? p.at : 0); });
    });
    if (qs.get('play') === '1') setTimeout(function () { open(null); }, 400);
  }

  /* SHORTS */
  if ($('#tsFeed')) {
    var feed = $('#tsFeed');
    feed.innerHTML = K.shorts.map(function (s) {
      var w = K.work(s.work), c = K.creatorOf(w);
      return '<article class="ti" id="' + s.id + '" data-id="' + s.id + '"><video muted playsinline loop preload="none" poster="' + s.poster + '" data-src="' + s.src + '"></video>' +
        '<div class="ti-b"><div class="tt2">' + esc(s.title) + '</div><div class="who">' + esc(c.name) + ' · 〈' + esc(w.title) + '〉 ' + esc(s.at) + '</div>' +
        '<div class="ai2"><b>AI</b>' + esc(aiLine(w, 2)) + '</div>' +
        '<a class="go2" href="work.html?id=' + w.id + '">' + I.play + '본편 상영 · ' + esc(w.runtime) + '</a></div>' +
        '<div class="ti-r"><button type="button" class="lk">' + I.heart + '보고 싶어요</button><button type="button">' + I.list + '크레딧</button><button type="button">' + I.share + '공유</button></div></article>';
    }).join('');
    $$('.ti-r .lk').forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('liked'); }); });
    $('#tsList').innerHTML = K.shorts.map(function (s, i) { return '<a href="#' + s.id + '" data-id="' + s.id + '"><span class="d">' + ('0' + (i + 1)).slice(-2) + '</span><span>' + esc(s.title) + '</span></a>'; }).join('');
    var setLeft = function (id) {
      var s = K.shorts.filter(function (x) { return x.id === id; })[0], w = K.work(s.work), c = K.creatorOf(w);
      $('#tsLeft').innerHTML = '<div class="lab">Trailer · ' + ('0' + (K.shorts.indexOf(s) + 1)).slice(-2) + '</div><div class="k tt">' + esc(s.title) + '</div>' +
        '<div class="wk"><img src="' + w.poster + '" alt=""><div><b>' + esc(w.title) + '</b><span>감독 ' + esc(c.name) + '<br>' + esc(w.genre) + ' · ' + esc(w.runtime) + '<br>' + (w.free ? '무료 상영' : '패스 전용') + '</span></div></div>' +
        '<a class="btn y" href="work.html?id=' + w.id + '">' + I.play + '본편 상영 시작</a>';
      $$('#tsList a').forEach(function (a) { a.classList.toggle('on', a.dataset.id === id); });
    };
    var active = null;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = $('video', e.target);
        if (e.intersectionRatio >= .6) { if (active !== e.target) { active = e.target; playV(v); setLeft(e.target.dataset.id); if (history.replaceState) history.replaceState(null, '', '#' + e.target.dataset.id); } }
        else v.pause();
      });
    }, { root: feed, threshold: [0, .6] });
    $$('.ti', feed).forEach(function (el) { io.observe(el); });
    $$('#tsList a').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); var t = document.getElementById(a.dataset.id); feed.scrollTo({ top: t.offsetTop, behavior: 'smooth' }); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return; e.preventDefault();
      var items = $$('.ti', feed), i = items.indexOf(active), n = items[Math.min(items.length - 1, Math.max(0, i + (e.key === 'ArrowDown' ? 1 : -1)))];
      if (n) feed.scrollTo({ top: n.offsetTop, behavior: 'smooth' });
    });
    if (location.hash) { var t0 = document.getElementById(location.hash.slice(1)); if (t0) { var jump = function () { if (Math.abs(feed.scrollTop - t0.offsetTop) > 4) feed.scrollTop = t0.offsetTop; }; setTimeout(jump, 50); setTimeout(jump, 400); window.addEventListener('load', jump); } }
  }
})();
