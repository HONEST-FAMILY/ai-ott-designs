(function () {
  var K = window.KV, esc = K.esc;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function playV(v) { if (!v) return; if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  var toastEl, toastT;
  function toast(t) {
    if (!toastEl) { toastEl = el('div', 'fx-toast'); document.body.appendChild(toastEl); }
    toastEl.textContent = t; toastEl.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2300);
  }

  var prog = el('div', 'fx-prog'); document.body.appendChild(prog);
  var onScroll = function () { var h = document.documentElement.scrollHeight - innerHeight; prog.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')'; };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  if (!reduce) {
    $$('.sec-h .d, .call > div > .d').forEach(function (d) {
      var text = d.textContent; d.textContent = '';
      var wrap = el('span', 'fx-split');
      text.split('').forEach(function (ch, i) { var s = el('span'); s.textContent = ch === ' ' ? ' ' : ch; s.style.transitionDelay = (i * 0.045) + 's'; wrap.appendChild(s); });
      d.appendChild(wrap);
    });
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.3 });
    $$('.fx-split').forEach(function (s) { io.observe(s); });
    var heads = $$('.sec-h .d');
    var drift = function () {
      heads.forEach(function (h) {
        var r = h.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
        var p = (r.top + r.height / 2) / innerHeight - 0.5;
        h.style.transform = 'translateX(' + (p * -70).toFixed(1) + 'px)';
      });
    };
    window.addEventListener('scroll', drift, { passive: true }); drift();
  }

  var cur = null;
  if (fine && !reduce) {
    cur = el('div', 'fx-cur'); document.body.appendChild(cur);
    var cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    document.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
    (function loop() { cx = lerp(cx, tx, 0.22); cy = lerp(cy, ty, 0.22); cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; requestAnimationFrame(loop); })();
    var label = function (t) { cur.textContent = t; cur.classList.toggle('on', !!t); };
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest && e.target.closest('.pp, .hall, .tr, .slot-img, .hs, .fr');
      if (!t) return;
      label(t.classList.contains('hall') ? '입장' : t.classList.contains('tr') ? '예고편' : t.classList.contains('fr') ? '이 장면부터' : '상영작 보기');
    });
    document.addEventListener('mouseout', function (e) {
      var t = e.target.closest && e.target.closest('.pp, .hall, .tr, .slot-img, .hs, .fr');
      if (t && !(e.relatedTarget && t.contains(e.relatedTarget))) label('');
    });
    $$('.btn.y, .pass').forEach(function (b) {
      b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1) + 'px)'; });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------- 홈 ---------- */
  if ($('#heroInfo')) {
    var hero = $('.hero'), wm = $('.wordmark');
    if (wm) {
      var t = wm.textContent; wm.textContent = '';
      t.split('').forEach(function (ch, i) { var s = el('span', 'wl'); s.textContent = ch; s.style.transitionDelay = (0.9 + i * 0.07) + 's'; wm.appendChild(s); });
    }
    if (!reduce && !sessionStorage.getItem('kv-b-curtain')) {
      sessionStorage.setItem('kv-b-curtain', '1');
      var ct = el('div', 'fx-curtain', '<div class="h l"></div><div class="h r"></div><div class="mark">' + 'KIVELO'.split('').map(function (c, i) { return '<span style="animation-delay:' + (0.08 + i * 0.06) + 's">' + c + '</span>'; }).join('') + '</div>');
      document.body.appendChild(ct);
      setTimeout(function () { ct.classList.add('open'); }, 900);
      setTimeout(function () { ct.remove(); }, 2300);
      setTimeout(function () { if (wm) wm.classList.add('in'); }, 900);
    } else if (wm) setTimeout(function () { wm.classList.add('in'); }, 60);

    if (fine && !reduce) {
      var vid = $('video', hero), info = $('#heroInfo');
      hero.addEventListener('mousemove', function (e) {
        var x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
        if (vid) vid.style.transform = 'scale(1.06) translate(' + (x * -18).toFixed(1) + 'px,' + (y * -12).toFixed(1) + 'px)';
        if (wm) wm.style.transform = 'translate(' + (x * 40).toFixed(1) + 'px,' + (y * 16).toFixed(1) + 'px)';
        if (info) info.style.transform = 'translateY(-58%) translate(' + (x * 10).toFixed(1) + 'px,' + (y * 8).toFixed(1) + 'px)';
      });
      hero.addEventListener('mouseleave', function () { if (vid) vid.style.transform = ''; if (wm) wm.style.transform = ''; if (info) info.style.transform = ''; });
    }

    var tk = $('#ticker');
    if (tk && !reduce) {
      tk.style.animation = 'none';
      var x = 0, dir = 1, vel = 0, lastY = scrollY, lastT = performance.now();
      window.addEventListener('scroll', function () { var d = scrollY - lastY; lastY = scrollY; if (Math.abs(d) > 1) dir = d > 0 ? 1 : -1; vel = Math.min(1400, vel + Math.abs(d) * 6); }, { passive: true });
      (function run(now) {
        var dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
        vel *= 0.93;
        var half = tk.scrollWidth / 2 || 1;
        x -= (70 + vel) * dir * dt;
        if (x <= -half) x += half; if (x > 0) x -= half;
        tk.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
        requestAnimationFrame(run);
      })(lastT);
    }

    var navR = $('.nav-r'), passBtn = $('.nav .pass');
    var cnt = el('a', 'fx-count', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4z"/></svg>내 알림 <b>0</b>');
    cnt.href = '#week';
    if (navR && passBtn) navR.insertBefore(cnt, passBtn);
    var n = 0;
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.alarm'); if (!b) return;
      setTimeout(function () {
        var on = b.classList.contains('on');
        n = Math.max(0, n + (on ? 1 : -1));
        if (!on) { $('b', cnt).textContent = n; return; }
        var r = b.getBoundingClientRect(), tr = cnt.getBoundingClientRect();
        if (reduce || tr.width === 0) { $('b', cnt).textContent = n; toast('상영이 시작되면 알려 드릴게요'); return; }
        var tkt = el('div', 'fx-ticket', 'ADMIT'); document.body.appendChild(tkt);
        var x0 = r.left + r.width / 2 - 32, y0 = r.top, x1 = tr.left + tr.width / 2 - 32, y1 = tr.top + 4;
        var t0 = performance.now(), D = 800;
        (function fly(now) {
          var k = Math.min(1, (now - t0) / D), e2 = 1 - Math.pow(1 - k, 3);
          var px = lerp(x0, x1, e2), py = lerp(y0, y1, e2) - Math.sin(k * Math.PI) * 160;
          tkt.style.transform = 'translate(' + px + 'px,' + py + 'px) rotate(' + (k * 540) + 'deg) scale(' + (1 - k * 0.45) + ')';
          if (k < 1) requestAnimationFrame(fly);
          else { tkt.remove(); $('b', cnt).textContent = n; cnt.classList.remove('bump'); void cnt.offsetWidth; cnt.classList.add('bump'); toast('상영이 시작되면 알려 드릴게요'); }
        })(t0);
      }, 0);
    });

    if (fine && !reduce) {
      var fl = el('div', 'fx-float', '<img alt=""><video muted playsinline loop preload="none"></video><b></b>'); document.body.appendChild(fl);
      var fx = 0, fy = 0, gx = 0, gy = 0, rot = 0, onRow = null, vt;
      document.addEventListener('mousemove', function (e) { gx = e.clientX; gy = e.clientY; });
      (function loop2() {
        var px = fx; fx = lerp(fx, gx + 40, 0.14); fy = lerp(fy, gy - 110, 0.14);
        rot = lerp(rot, Math.max(-12, Math.min(12, (fx - px) * 0.6)), 0.15);
        fl.style.left = fx + 'px'; fl.style.top = fy + 'px'; fl.style.rotate = rot.toFixed(2) + 'deg';
        requestAnimationFrame(loop2);
      })();
      $$('#list .row').forEach(function (row) {
        var id = (row.getAttribute('href').match(/id=([a-z]+)/) || [])[1], w = K.work(id); if (!w) return;
        row.addEventListener('mouseenter', function () {
          onRow = row; fx = gx + 40; fy = gy - 110;
          $('img', fl).src = w.wide; var v = $('video', fl); v.dataset.src = w.prev; v.removeAttribute('src'); fl.classList.remove('vid');
          $('b', fl).textContent = w.en;
          fl.classList.add('on');
          clearTimeout(vt); vt = setTimeout(function () { if (onRow !== row) return; v.addEventListener('playing', function () { fl.classList.add('vid'); }, { once: true }); playV(v); }, 350);
        });
        row.addEventListener('mouseleave', function () { onRow = null; fl.classList.remove('on'); var v = $('video', fl); v.pause(); });
      });
      $$('.pp').forEach(function (p) {
        var pic = $('.pic', p);
        p.addEventListener('mousemove', function (e) { var r = pic.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; pic.style.transform = 'perspective(700px) rotateY(' + (x * 14).toFixed(1) + 'deg) rotateX(' + (y * -14).toFixed(1) + 'deg) scale(1.03)'; });
        p.addEventListener('mouseleave', function () { pic.style.transform = ''; });
      });
      $$('.ticket').forEach(function (tc) {
        tc.addEventListener('mousemove', function (e) { var r = tc.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; tc.style.transform = 'perspective(900px) rotateY(' + (x * 8).toFixed(1) + 'deg) rotateX(' + (y * -8).toFixed(1) + 'deg)'; });
        tc.addEventListener('mouseleave', function () { tc.style.transform = ''; });
      });
    }
    $$('.ticket .btn').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault(); var tc = b.closest('.ticket');
        tc.classList.add('torn');
        toast(tc.classList.contains('y') ? '키벨로 패스 입장권을 뜯었어요 · 광고 없이 바로 상영' : '무료 관람권을 뜯었어요 · 상영 전 광고 한 편');
        setTimeout(function () { tc.classList.remove('torn'); }, 1900);
      });
    });

    var trail = $('#trail');
    if (trail && fine) {
      var down = false, sx = 0, sl = 0, moved = 0, v2 = 0, lastX = 0, lastTm = 0, raf;
      trail.addEventListener('pointerdown', function (e) { if (e.button !== 0) return; down = true; moved = 0; sx = e.clientX; sl = trail.scrollLeft; lastX = e.clientX; lastTm = performance.now(); cancelAnimationFrame(raf); });
      window.addEventListener('pointermove', function (e) {
        if (!down) return;
        var d = e.clientX - sx; moved = Math.max(moved, Math.abs(d));
        if (moved > 6) trail.classList.add('drag');
        trail.scrollLeft = sl - d;
        var now = performance.now(); v2 = (e.clientX - lastX) / Math.max(1, now - lastTm); lastX = e.clientX; lastTm = now;
        $$('.tr', trail).forEach(function (t2) { t2.style.transform = 'skewX(' + Math.max(-8, Math.min(8, v2 * -6)).toFixed(2) + 'deg)'; });
      });
      window.addEventListener('pointerup', function () {
        if (!down) return; down = false;
        setTimeout(function () { trail.classList.remove('drag'); }, 0);
        var vel = v2 * 16;
        (function glide() {
          vel *= 0.94; trail.scrollLeft -= vel;
          $$('.tr', trail).forEach(function (t2) { t2.style.transform = 'skewX(' + Math.max(-8, Math.min(8, vel * -0.4)).toFixed(2) + 'deg)'; });
          if (Math.abs(vel) > 0.4) raf = requestAnimationFrame(glide);
          else $$('.tr', trail).forEach(function (t2) { t2.style.transform = ''; });
        })();
      });
      trail.addEventListener('click', function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
    }
  }

  /* ---------- 작품 ---------- */
  var cnt2 = $('#thCount');
  if (cnt2) {
    var render = function () {
      var t = cnt2.textContent.trim();
      if (!/^\d$/.test(t) || $('.ld', cnt2)) return;
      cnt2.innerHTML = '<div class="ld"><i class="h"></i><i class="v"></i><b>' + t + '</b></div>';
      var ld = $('.ld', cnt2), t0 = performance.now();
      (function sweep(now) { var k = ((now - t0) % 700) / 700; ld.style.setProperty('--a', (k * 360).toFixed(1) + 'deg'); if (document.body.contains(ld)) requestAnimationFrame(sweep); })(t0);
    };
    new MutationObserver(function () {
      var b = $('.ld b', cnt2), raw = cnt2.childNodes.length === 1 && cnt2.firstChild.nodeType === 3 ? cnt2.textContent.trim() : null;
      if (raw && /^\d$/.test(raw)) { if (b) { b.textContent = raw; } else render(); }
    }).observe(cnt2, { childList: true, characterData: true, subtree: true });
    var pb = document.getElementById('playBtn');
    if (pb && !reduce) {
      var lights = el('div', 'fx-lights'); document.body.appendChild(lights);
      pb.addEventListener('click', function (e) {
        lights.style.setProperty('--x', e.clientX + 'px'); lights.style.setProperty('--y', e.clientY + 'px');
        lights.classList.add('on'); setTimeout(function () { lights.classList.remove('on'); }, 900);
      }, true);
    }
  }
})();
