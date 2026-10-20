(function () {
  var here = location.pathname;
  var root = here.replace(/\/(a|b|c|studio)\/[^\/]*$/, '/').replace(/\/[^\/]*$/, '/');
  var cur = (here.match(/\/(a|b|c|studio)\//) || [])[1] || '';
  var names = { a: '1안 · AI 영상관', b: '2안 · 극장형', c: '3안 · AI 큐레이터', studio: '창작자 화면 · 공통' };
  var css = '' +
    '.kv-sw{position:fixed;z-index:9999;right:16px;bottom:16px;font-family:"Pretendard Variable",Pretendard,system-ui,sans-serif;}' +
    '.kv-sw.left{right:auto;left:16px}' +
    '.kv-sw-btn{display:flex;align-items:center;gap:8px;height:40px;padding:0 14px 0 12px;border-radius:999px;border:1px solid rgba(255,255,255,.22);background:rgba(18,18,18,.78);color:#fff;font-size:13px;font-weight:600;letter-spacing:-.01em;cursor:pointer;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 6px 24px rgba(0,0,0,.35)}' +
    '.kv-sw-btn i{width:8px;height:8px;border-radius:50%;background:#ffd84a;box-shadow:0 0 0 3px rgba(255,216,74,.18)}' +
    '.kv-sw-menu{position:absolute;right:0;bottom:50px;width:288px;padding:10px;border-radius:16px;background:rgba(20,20,20,.94);border:1px solid rgba(255,255,255,.14);color:#eee;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);box-shadow:0 18px 50px rgba(0,0,0,.5);display:none}' +
    '.kv-sw.left .kv-sw-menu{right:auto;left:0}' +
    '.kv-sw.open .kv-sw-menu{display:block}' +
    '.kv-sw-menu b{display:block;padding:6px 8px 8px;font-size:12px;color:#999;font-weight:500}' +
    '.kv-sw-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px;border-radius:10px}' +
    '.kv-sw-row.on{background:rgba(255,255,255,.07)}' +
    '.kv-sw-row span{font-size:13px;font-weight:600}' +
    '.kv-sw-row nav{display:flex;gap:4px}' +
    '.kv-sw-row a{font-size:12px;color:#ddd;text-decoration:none;padding:5px 8px;border-radius:7px;background:rgba(255,255,255,.08)}' +
    '.kv-sw-row a:hover{background:rgba(255,255,255,.18)}' +
    '.kv-sw-home{display:block;margin-top:6px;padding:9px 8px;font-size:12px;color:#bbb;text-decoration:none;border-top:1px solid rgba(255,255,255,.1)}' +
    '@media (max-width:760px){.kv-sw{bottom:80px;right:12px}.kv-sw.left{left:12px}.kv-sw-btn{height:36px;font-size:12px}' +
    '.kv-sw.mtop{top:68px;bottom:auto;right:12px;left:auto}.kv-sw.mtop .kv-sw-menu{top:44px;bottom:auto;right:0;left:auto}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var box = document.createElement('div');
  box.className = 'kv-sw' + (document.body.hasAttribute('data-sw-left') ? ' left' : '') + (document.body.hasAttribute('data-sw-mtop') ? ' mtop' : '');
  var rows = ['a', 'b', 'c'].map(function (k) {
    return '<div class="kv-sw-row' + (k === cur ? ' on' : '') + '"><span>' + names[k] + '</span><nav>' +
      '<a href="' + root + k + '/index.html">홈</a><a href="' + root + k + '/work.html">작품</a><a href="' + root + k + '/shorts.html">쇼츠</a></nav></div>';
  }).join('');
  box.innerHTML = '<div class="kv-sw-menu" role="menu"><b>키벨로 디자인 시안</b>' + rows +
    '<div class="kv-sw-row' + (cur === 'studio' ? ' on' : '') + '"><span>' + names.studio + '</span><nav><a href="' + root + 'studio/index.html">열기</a></nav></div>' +
    '<a class="kv-sw-home" href="' + root + 'index.html">← 시안 모음으로</a></div>' +
    '<button class="kv-sw-btn" type="button" aria-haspopup="true"><i></i>' + (names[cur] || '시안 보기') + '</button>';
  document.body.appendChild(box);
  box.querySelector('.kv-sw-btn').addEventListener('click', function (e) { e.stopPropagation(); box.classList.toggle('open'); });
  document.addEventListener('click', function (e) { if (!box.contains(e.target)) box.classList.remove('open'); });
})();
