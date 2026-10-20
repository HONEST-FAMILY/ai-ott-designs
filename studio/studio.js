(function () {
  var K = window.KV, esc = K.esc, M = K.M;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  var toastT;
  function toast(t) { var el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('on'); }, 2600); }

  function show(v) {
    $$('.view').forEach(function (s) { s.classList.toggle('on', s.id === 'v-' + v); });
    $$('.side a[data-v]').forEach(function (a) { a.classList.toggle('on', a.dataset.v === v); });
    $$('.tabs button').forEach(function (b) { b.classList.toggle('on', (v === 'review') === (b.dataset.v === 'review')); });
    window.scrollTo(0, 0);
  }
  $$('[data-v]').forEach(function (el) { el.addEventListener('click', function (e) { e.preventDefault(); show(el.dataset.v); }); });

  var SUG = ['Midjourney v7', 'Runway Gen-4', 'Kling 2.1', 'Veo 3', 'Sora', 'Flux', 'ElevenLabs', 'Suno v4.5', 'Udio', 'ComfyUI', 'Topaz'];
  var rows = [
    { k: '각본', d: '이야기·대사', who: '사람', tools: [] },
    { k: '원화·이미지', d: '캐릭터·배경 그림', who: 'AI', tools: ['Midjourney v7'] },
    { k: '영상', d: '움직임 만들기', who: 'AI', tools: ['Runway Gen-4'] },
    { k: '목소리', d: '대사·내레이션', who: '없음', tools: [] },
    { k: '음악', d: '배경 음악·효과음', who: 'AI', tools: ['Suno v4.5'] },
    { k: '편집·색보정', d: '자르고 붙이기', who: '사람', tools: [] }
  ];
  var pub = { tool: true, scene: true, prompt: false };
  var WHO = ['사람', 'AI', '함께', '없음'];
  function renderRows() {
    $('#rows').innerHTML = rows.map(function (r, i) {
      var needTool = r.who === 'AI' || r.who === '함께';
      return '<div class="prow" data-i="' + i + '"><b>' + esc(r.k) + '<small>' + esc(r.d) + '</small></b>' +
        '<div class="seg">' + WHO.map(function (w) { return '<button type="button" class="' + (r.who === w ? 'on' : '') + (w === 'AI' ? ' ai' : w === '함께' ? ' mix' : '') + '" data-w="' + w + '">' + w + '</button>'; }).join('') + '</div>' +
        '<div class="tools">' + (needTool ? r.tools.map(function (t, j) { return '<span class="tg">' + esc(t) + '<button type="button" data-x="' + j + '" aria-label="' + esc(t) + ' 빼기">×</button></span>'; }).join('') + '<button type="button" class="tadd">+ 도구</button>' : '<span class="dash">' + (r.who === '없음' ? '이 작품에는 없음' : '도구 입력 없이 넘어갑니다') + '</span>') + '</div></div>';
    }).join('');
    $$('.prow').forEach(function (row) {
      var r = rows[+row.dataset.i];
      $$('.seg button', row).forEach(function (b) { b.addEventListener('click', function () { r.who = b.dataset.w; if ((r.who === 'AI' || r.who === '함께') && !r.tools.length) r.tools.push(SUG[(+row.dataset.i + 1) % SUG.length]); renderRows(); }); });
      $$('.tg button', row).forEach(function (b) { b.addEventListener('click', function () { r.tools.splice(+b.dataset.x, 1); renderRows(); }); });
      var add = $('.tadd', row);
      if (add) add.addEventListener('click', function () { var n = SUG.filter(function (s) { return r.tools.indexOf(s) < 0; })[0]; if (n) r.tools.push(n); renderRows(); });
    });
    renderPreview();
  }
  function renderPreview() {
    var ai = rows.filter(function (r) { return r.who === 'AI'; }).length, mix = rows.filter(function (r) { return r.who === '함께'; }).length;
    var method = ai >= 4 ? 'AI 생성 중심' : (ai + mix >= 2 ? 'AI + 사람 공동 제작' : '사람 제작 + AI 보조');
    var n = rows.filter(function (r) { return r.who !== '없음'; }).length;
    var share = n ? Math.round((ai + mix * .5) / n * 100) : 0;
    $('#pvBar').innerHTML = rows.map(function (r) { var c = r.who === 'AI' ? 'a' : r.who === '함께' ? 'x' : r.who === '없음' ? 'n' : 'h'; return '<span class="' + c + '" title="' + esc(r.k) + '">' + esc(r.k.split('·')[0]) + '</span>'; }).join('');
    $('#pvMethod').textContent = method + ' · AI 비중 ' + share + '%' + (pub.scene ? ' · 장면별 제작정보 있음' : '');
    $('#pvRows').innerHTML = rows.map(function (r) {
      var v = r.who === '없음' ? '없음' : r.who === '사람' ? '사람' : (pub.tool ? (r.tools.join(', ') || '도구 미입력') + (r.who === '함께' ? ' + 사람' : '') : '<span class="pv-hide">도구 비공개</span>');
      return '<div><span>' + esc(r.k) + '</span><b style="font-weight:600">' + (v.indexOf('<span') === 0 ? v : esc(v)) + '</b></div>';
    }).join('') + (pub.prompt ? '<div><span>프롬프트</span><b style="font-weight:600">공개</b></div>' : '');
  }
  $$('.sw').forEach(function (s) { s.addEventListener('click', function () { s.classList.toggle('on'); pub[s.dataset.t] = s.classList.contains('on'); renderPreview(); }); });
  $('#next').addEventListener('click', function () { toast('다음 단계는 권리 자료(음악 허락서·목소리 동의서 등)를 올리는 화면입니다'); });
  renderRows();

  var spark = function (pts) { var mx = Math.max.apply(null, pts), mn = Math.min.apply(null, pts); return '<svg viewBox="0 0 100 30" preserveAspectRatio="none"><polyline fill="none" stroke="#8fb3ff" stroke-width="2" points="' + pts.map(function (p, i) { return (i * 100 / (pts.length - 1)).toFixed(1) + ',' + (28 - (p - mn) / (mx - mn || 1) * 24).toFixed(1); }).join(' ') + '"/></svg>'; };
  $('#kpis').innerHTML = [
    ['조회', '1,284', '지난주보다 18% 늘었어요', [3, 5, 4, 7, 8, 7, 10]],
    ['끝까지 본 비율', '62%', '비슷한 길이 작품 평균보다 높아요', [50, 55, 58, 57, 60, 61, 62]],
    ['쇼츠에서 본편으로', '9.4%', '쇼츠 3편 중 ‘산이 깨어나는 순간’이 1위', [4, 6, 6, 8, 9, 9, 9.4]],
    ['관심 작품에 담음', '213', '관심 창작자도 41명 늘었어요', [10, 20, 35, 60, 120, 170, 213]]
  ].map(function (k) { return '<div class="kpi"><span>' + k[0] + '</span><b>' + k[1] + '</b><small>' + k[2] + '</small>' + spark(k[3]) + '</div>'; }).join('');

  var Q = [
    { t: '산이 깨어나는 순간', s: '쇼츠 · 모운 스튜디오 · 2시간 전', img: M + 'shorts/sh05.jpg', ckc: [['ok', '화질 1080×1920', '자동'], ['ok', '길이 0:10', '자동'], ['ok', 'AI 제작정보 6개 공정 입력', '자동'], ['ok', '권리 자료 2개 모두 제출', '자동'], ['me', '연결된 본편 〈봄의 문지기〉 06:52 장면과 일치하는지', '운영자 확인']], msg: '' },
    { t: '겨울 정령 (가제)', s: '시네마 · 모운 스튜디오 · 어제', img: M + 'scene/spring_6.jpg', ckc: [['ok', '화질 1920×804', '자동'], ['ok', '길이 12:03', '자동'], ['ok', 'AI 제작정보 입력', '자동'], ['no', '음악 이용 허락서의 곡 이름이 작품 정보와 다름', '자동'], ['me', '자막 파일 없음 (선택 항목)', '운영자 확인']], msg: '음악 이용 허락서가 다른 곡의 것으로 올라왔습니다. 이 작품에 쓴 곡의 허락서를 다시 올려 주세요.' },
    { t: '네온 골목 (가제)', s: '시네마 · 노을필름랩 · 3일 전', img: M + 'scene/charge_3.jpg', ckc: [['ok', '화질 1920×804', '자동'], ['ok', 'AI 제작정보 입력', '자동'], ['no', '목소리 사용 동의서 없음 (AI 목소리 사용)', '자동'], ['me', '실존 인물과 닮은 얼굴이 있는지', '운영자 판단']], msg: '' }
  ];
  $('#qlist').innerHTML = Q.map(function (q, i) {
    var bad = q.ckc.filter(function (c) { return c[0] === 'no'; }).length;
    return '<button type="button" class="qi' + (i ? '' : ' on') + '" data-i="' + i + '"><img src="' + q.img + '" alt=""><div><b>' + esc(q.t) + '</b><span>' + esc(q.s) + '</span><br><span class="st ' + (bad ? 'fix' : 'wait') + '" style="margin-top:6px">' + (bad ? '보완 필요 ' + bad : '확인 대기') + '</span></div></button>';
  }).join('');
  var detail = function (i) {
    var q = Q[i];
    $$('.qi').forEach(function (b, j) { b.classList.toggle('on', j === i); });
    $('#qd').innerHTML = '<div class="qd-video"><img src="' + q.img + '" alt=""></div><h2 style="margin-top:14px">' + esc(q.t) + '</h2><div class="note-sample" style="margin-top:2px">' + esc(q.s) + '</div>' +
      '<div class="checks">' + q.ckc.map(function (c) { return '<div class="ck ' + c[0] + '"><i>' + (c[0] === 'ok' ? '✓' : c[0] === 'no' ? '!' : '?') + '</i>' + esc(c[1]) + '<small>' + esc(c[2]) + '</small></div>'; }).join('') + '</div>' +
      '<div class="note-sample">자동 검사는 확인할 곳만 표시합니다. 공개 여부는 운영자가 정합니다.</div>' +
      '<textarea class="qd-msg" placeholder="창작자에게 보낼 메시지">' + esc(q.msg) + '</textarea>' +
      '<div class="qd-actions"><button class="btn k" type="button" data-a="ok">승인하고 공개 예약</button><button class="btn g" type="button" data-a="fix">보완 요청 보내기</button><button class="btn r" type="button" data-a="no">반려</button></div>';
    $$('.qd-actions button').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.dataset.a;
        toast(a === 'ok' ? '승인했습니다 — 금요일 20:00 공개로 예약됐습니다' : a === 'fix' ? '보완 요청을 보냈습니다. 창작자 제출 현황에 바로 표시됩니다' : '반려 사유를 메시지에 적어 보내 주세요');
      });
    });
  };
  $$('.qi').forEach(function (b) { b.addEventListener('click', function () { detail(+b.dataset.i); }); });
  detail(0);
  if (location.hash === '#review') show('review');
})();
