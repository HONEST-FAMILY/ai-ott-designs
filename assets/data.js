window.KV = (function () {
  var M = '../assets/media/';

  var creators = {
    moun: { name: '모운 스튜디오', en: 'MOUN STUDIO', mark: 'M', hue: 32, bio: '산과 계절을 그리는 3인 애니메이션 팀. 원화는 직접 그리고, 움직임은 AI로 만듭니다.', works: ['spring'], shorts: 3 },
    noeul: { name: '노을필름랩', en: 'NOEUL FILM LAB', mark: 'N', hue: 14, bio: '실사 같은 AI 단편을 만드는 영상 연구실. 사람의 얼굴보다 사람의 사정을 찍습니다.', works: ['charge'], shorts: 2 },
    orbital: { name: '오비탈 웍스', en: 'ORBITAL WORKS', mark: 'O', hue: 268, bio: '우주와 빛을 다루는 AI 애니메이션 스튜디오. 장면마다 쓴 도구를 모두 공개합니다.', works: ['singularity'], shorts: 2 },
    smallwood: { name: '작은숲 픽처스', en: 'SMALLWOOD PICTURES', mark: 'S', hue: 120, bio: '웃기고 조금 무서운 숲 이야기를 시리즈로 만듭니다.', works: ['sprite'], shorts: 2 },
    frame9: { name: '프레임하우스 9', en: 'FRAMEHOUSE 9', mark: 'F', hue: 300, bio: '손으로 그린 2D에 AI 배경을 섞는 작은 작업실.', works: ['coffee'], shorts: 1 },
    reddot: { name: '레드닷 모션', en: 'REDDOT MOTION', mark: 'R', hue: 4, bio: '하늘과 비행을 좋아하는 2D 액션 팀.', works: ['hero'], shorts: 1 },
    mallang: { name: '말랑 애니메이션', en: 'MALLANG ANIMATION', mark: 'ML', hue: 200, bio: '온 가족이 같이 웃는 짧은 애니메이션을 만듭니다.', works: ['wingit'], shorts: 1 },
    dawn: { name: '새벽공정', en: 'DAWN PROCESS', mark: 'D', hue: 48, bio: '미술관과 그림을 소재로 엉뚱한 단편을 그립니다.', works: ['glass'], shorts: 1 },
    offset: { name: '오프셋 픽처스', en: 'OFFSET PICTURES', mark: 'OP', hue: 22, bio: '긴 여정을 다루는 판타지 단편 전문 팀.', works: ['sintel'], shorts: 1 }
  };

  var works = [
    {
      id: 'spring', title: '봄의 문지기', en: 'Keeper of Spring', creator: 'moun', year: 2026,
      genre: '판타지 애니메이션', tags: ['판타지', '애니메이션', '잔잔한', '경이로운', '가족'], look: '3D 회화풍', lookKey: 'paint',
      runtime: '7분 44초', mins: 8, rating: '전체관람가', method: 'AI + 사람 공동 제작', methodKey: 'mix',
      logline: '겨울이 끝나지 않는 산. 양치기 소녀와 강아지가 오래된 정령을 깨우러 숲으로 들어갑니다.',
      memo: '원화 120장을 먼저 손으로 그렸고, 움직임은 장면마다 설정을 바꿔 AI로 뽑은 뒤 사람이 이어 붙였습니다.',
      stages: [
        { k: '각본', who: '사람' },
        { k: '원화', who: 'AI', tool: 'Midjourney v7' },
        { k: '움직임', who: 'AI', tool: 'Runway Gen-4' },
        { k: '표정 연기', who: '함께', tool: 'Runway + 수작업 보정' },
        { k: '음악', who: 'AI', tool: 'Suno v4.5' },
        { k: '편집·색보정', who: '사람' }
      ],
      tools: ['Midjourney', 'Runway', 'Suno'], review: '운영 검수 완료 · 음악 이용 허락서 확인',
      free: true, series: null,
      poster: M + 'poster/spring.jpg', wide: M + 'wide/spring.jpg', prev: M + 'prev/spring.mp4',
      scenes: [
        { t: '00:27', s: 27, title: '구름 바다', img: M + 'scene/spring_1.jpg', how: '원화 Midjourney → 구름 움직임 Runway' },
        { t: '01:12', s: 72, title: '산 위의 소녀', img: M + 'scene/spring_2.jpg', how: '원화 Midjourney · 인물은 손으로 다듬음' },
        { t: '03:07', s: 187, title: '갈비뼈 동굴', img: M + 'scene/spring_3.jpg', how: '동굴 전체를 Runway로 생성' },
        { t: '03:52', s: 232, title: '불꽃 꽃', img: M + 'scene/spring_4.jpg', how: '빛 효과만 AI, 꽃 모양은 원화 그대로' },
        { t: '05:12', s: 312, title: '빛나는 지팡이', img: M + 'scene/spring_5.jpg', how: '표정은 사람이 키프레임으로 보정' },
        { t: '05:42', s: 342, title: '걷히는 구름', img: M + 'scene/spring_6.jpg', how: '구름 시뮬레이션 Runway' },
        { t: '06:52', s: 412, title: '깨어나는 산', img: M + 'scene/spring_7.jpg', how: '나무가 자라는 장면은 Runway 3컷을 이어 붙임' }
      ]
    },
    {
      id: 'charge', title: '방전', en: 'Discharge', creator: 'noeul', year: 2026,
      genre: 'SF 드라마', tags: ['SF', '드라마', '긴장감', '쓸쓸한', '실사풍'], look: '실사풍', lookKey: 'real',
      runtime: '4분 23초', mins: 4, rating: '15세 이상', method: 'AI 생성 중심', methodKey: 'ai',
      logline: '전기가 끊긴 마을. 노인은 마지막 배터리를 훔치러 경비 로봇이 지키는 발전소로 향합니다.',
      memo: '모든 장면을 영상 생성으로 만들고, 인물의 얼굴과 손이 장면마다 같아 보이도록 40번 넘게 다시 뽑았습니다.',
      stages: [
        { k: '각본', who: '사람' },
        { k: '콘셉트 아트', who: 'AI', tool: 'Flux' },
        { k: '영상', who: 'AI', tool: 'Veo 3' },
        { k: '목소리', who: 'AI', tool: 'ElevenLabs' },
        { k: '음악', who: '사람' },
        { k: '편집·색보정', who: '사람' }
      ],
      tools: ['Flux', 'Veo', 'ElevenLabs'], review: '운영 검수 완료 · 목소리 사용 동의서 확인',
      free: false, series: null,
      poster: M + 'poster/charge.jpg', wide: M + 'wide/charge.jpg', prev: M + 'prev/charge.mp4',
      scenes: [
        { t: '00:08', s: 8, title: '촛불 작업실', img: M + 'scene/charge_1.jpg', how: '콘셉트 Flux → 영상 Veo 3' },
        { t: '00:50', s: 50, title: '마지막 배터리', img: M + 'scene/charge_2.jpg', how: '손 클로즈업은 12번 다시 생성' },
        { t: '01:22', s: 82, title: '발전소 습격', img: M + 'scene/charge_3.jpg', how: '액션 동선은 사람이 콘티로 지정' },
        { t: '02:04', s: 124, title: '불꽃 속 얼굴', img: M + 'scene/charge_4.jpg', how: '불꽃은 후반에서 사람이 합성' },
        { t: '02:43', s: 163, title: '불가의 두 사람', img: M + 'scene/charge_5.jpg', how: '목소리 ElevenLabs · 숨소리는 녹음' }
      ]
    },
    {
      id: 'singularity', title: '별의 첫 숨', en: 'First Breath of a Star', creator: 'orbital', year: 2026,
      genre: 'SF 애니메이션', tags: ['SF', '애니메이션', '몽환적', '경이로운'], look: '3D 추상', lookKey: 'abstract',
      runtime: '6분 31초', mins: 7, rating: '전체관람가', method: 'AI 생성 중심', methodKey: 'ai',
      logline: '우주 먼지 속에서 태어난 작은 생명이, 별 하나가 깨어나는 순간을 따라갑니다.',
      memo: '대사가 없는 작품이라 색과 음악으로만 이야기를 끌고 갑니다. 장면마다 쓴 도구를 전부 공개합니다.',
      stages: [
        { k: '각본', who: '사람' },
        { k: '원화', who: 'AI', tool: 'Midjourney v7' },
        { k: '영상', who: 'AI', tool: 'Kling 2.1' },
        { k: '목소리', who: '없음' },
        { k: '음악', who: 'AI', tool: 'Suno v4.5' },
        { k: '편집', who: '사람' }
      ],
      tools: ['Midjourney', 'Kling', 'Suno'], review: '운영 검수 완료',
      free: true, series: null,
      poster: M + 'poster/singularity.jpg', wide: M + 'wide/singularity.jpg', prev: M + 'prev/singularity.mp4',
      scenes: [
        { t: '00:57', s: 57, title: '빛나는 해파리', img: M + 'scene/singularity_1.jpg', how: '원화 Midjourney → 영상 Kling' },
        { t: '02:12', s: 132, title: '첫 눈맞춤', img: M + 'scene/singularity_2.jpg', how: '표정 3종을 뽑아 사람이 골라 이음' },
        { t: '03:27', s: 207, title: '금빛 소용돌이', img: M + 'scene/singularity_3.jpg', how: 'Kling 생성 후 속도만 조절' },
        { t: '04:47', s: 287, title: '씨앗이 열릴 때', img: M + 'scene/singularity_4.jpg', how: '원화 Midjourney · 빛은 후반 합성' },
        { t: '05:12', s: 312, title: '깨어난 행성', img: M + 'scene/singularity_5.jpg', how: '행성 표면은 Kling 4컷 합성' }
      ]
    },
    {
      id: 'sprite', title: '버섯 숲의 밤', en: 'A Night in Mushroom Woods', creator: 'smallwood', year: 2026,
      genre: '코미디 호러 애니메이션', tags: ['코미디', '호러', '애니메이션', '유쾌한', '오싹한', '시리즈'], look: '3D 애니메이션', lookKey: 'toon',
      runtime: '시즌 1 · 3화', mins: 11, rating: '12세 이상', method: 'AI + 사람 공동 제작', methodKey: 'mix',
      logline: '숲으로 캠핑을 떠난 다섯 친구. 밤이 되자 버섯들이 하나둘 깨어납니다.',
      memo: '캐릭터는 사람이 디자인하고, 배경과 군중 장면을 AI로 만들었습니다. 매주 한 화씩 공개합니다.',
      stages: [
        { k: '각본', who: '사람' },
        { k: '캐릭터', who: '사람' },
        { k: '배경', who: 'AI', tool: 'Midjourney v7' },
        { k: '움직임', who: 'AI', tool: 'Runway Gen-4' },
        { k: '목소리', who: 'AI', tool: 'ElevenLabs' },
        { k: '음악', who: 'AI', tool: 'Udio' }
      ],
      tools: ['Midjourney', 'Runway', 'ElevenLabs', 'Udio'], review: '운영 검수 완료 · 캐릭터 저작권 확인',
      free: true, series: [
        { no: 1, title: '캠핑장 도착', len: '3:40', img: M + 'scene/sprite_1.jpg', desc: '캠핑장에 도착한 다섯 친구. 숲 한가운데 유난히 버섯이 많습니다.' },
        { no: 2, title: '버섯이 움직였다', len: '3:20', img: M + 'scene/sprite_2.jpg', desc: '밤새 버섯이 자리를 옮겼다는 걸 알아챈 친구들. 누가 장난을 치는 걸까요?' },
        { no: 3, title: '달이 뜨면', len: '3:30', img: M + 'scene/sprite_3.jpg', desc: '보름달이 뜨자 숲속 버섯들이 일제히 고개를 듭니다.' },
        { no: 4, title: '버섯 숲의 왕', len: '3:40', img: M + 'scene/sprite_4.jpg', soon: '10월 25일 일요일 공개', desc: '숲의 가장 깊은 곳, 다섯 친구는 버섯들이 모시는 왕을 만납니다.' }
      ],
      poster: M + 'poster/sprite.jpg', wide: M + 'wide/sprite.jpg', prev: M + 'prev/sprite.mp4',
      scenes: [
        { t: '1화 01:07', s: 67, title: '숲의 새', img: M + 'scene/sprite_1.jpg', how: '배경 Midjourney · 새는 Runway' },
        { t: '1화 02:52', s: 172, title: '버섯 회의', img: M + 'scene/sprite_2.jpg', how: '군중 버섯은 Runway로 복제' },
        { t: '2화 01:52', s: 292, title: '초록 불빛', img: M + 'scene/sprite_3.jpg', how: '빛 효과 AI, 표정은 사람' },
        { t: '3화 00:20', s: 398, title: '나무 사이 달', img: M + 'scene/sprite_4.jpg', how: '달빛 합성은 사람' }
      ]
    },
    {
      id: 'coffee', title: '카페인 러너', en: 'Caffeine Runner', creator: 'frame9', year: 2026,
      genre: '드라마 · 2D', tags: ['드라마', '2D', '경쾌한', '뭉클한', '짧은'], look: '2D 손그림풍', lookKey: 'flat',
      runtime: '3분 05초', mins: 3, rating: '전체관람가', method: '사람 제작 + AI 보조', methodKey: 'human',
      logline: '마감 전 마지막 커피를 사러 뛰어가는 그녀. 그 길 위로 그녀의 하루가 한 장면씩 지나갑니다.',
      memo: '인물은 전부 손으로 그렸고, 배경 일부와 중간 그림만 AI로 채웠습니다.',
      stages: [
        { k: '각본', who: '사람' },
        { k: '작화', who: '사람' },
        { k: '배경', who: '함께', tool: 'ComfyUI + 수작업' },
        { k: '중간 그림', who: 'AI', tool: 'Topaz' },
        { k: '음악', who: '사람' },
        { k: '편집', who: '사람' }
      ],
      tools: ['ComfyUI', 'Topaz'], review: '운영 검수 완료',
      free: true, series: null,
      poster: M + 'poster/coffee.jpg', wide: M + 'wide/coffee.jpg', prev: M + 'prev/coffee.mp4',
      scenes: [
        { t: '00:26', s: 26, title: '보랏빛 거리', img: M + 'scene/coffee_1.jpg', how: '배경 ComfyUI · 인물 손그림' },
        { t: '00:38', s: 38, title: '공원의 빛', img: M + 'scene/coffee_2.jpg', how: '빛줄기만 AI로 보정' },
        { t: '02:07', s: 127, title: '관람차', img: M + 'scene/coffee_3.jpg', how: '중간 그림 Topaz' }
      ]
    },
    {
      id: 'hero', title: '붉은 비행사', en: 'The Red Pilot', creator: 'reddot', year: 2026,
      genre: '액션 어드벤처 · 2D', tags: ['액션', '어드벤처', '2D', '박진감'], look: '2D 셀 애니메이션', lookKey: 'flat',
      runtime: '시즌 1 · 3화', mins: 4, rating: '12세 이상', method: 'AI + 사람 공동 제작', methodKey: 'mix',
      logline: '하늘 도시의 심장이 멈추던 날, 붉은 비행기 한 대가 폭풍 속으로 뛰어듭니다.',
      memo: '콘티와 주요 원화는 사람이, 비행 장면의 움직임은 AI가 맡았습니다.',
      stages: [
        { k: '콘티', who: '사람' },
        { k: '원화', who: '함께', tool: 'Midjourney + 수작업' },
        { k: '움직임', who: 'AI', tool: 'Kling 2.1' },
        { k: '효과', who: '사람' },
        { k: '음악', who: 'AI', tool: 'Suno v4.5' },
        { k: '편집', who: '사람' }
      ],
      tools: ['Midjourney', 'Kling', 'Suno'], review: '운영 검수 완료',
      free: false, series: [
        { no: 1, title: '멈춘 심장', len: '3:57', img: M + 'scene/hero_1.jpg', desc: '하늘 도시의 심장이 멈춘 날, 정비공 소녀가 붉은 비행기의 시동을 겁니다.' },
        { no: 2, title: '폭풍 속으로', len: '4:10', img: M + 'scene/hero_2.jpg', desc: '도시를 덮친 폭풍. 붉은 비행기가 번개 사이를 가르며 날아오릅니다.' },
        { no: 3, title: '되살아난 숲', len: '4:20', img: M + 'scene/hero_3.jpg', desc: '되살린 심장의 빛이 도시 아래 숲까지 번져 나갑니다.' }
      ],
      poster: M + 'poster/hero.jpg', wide: M + 'wide/hero.jpg', prev: M + 'prev/hero.mp4',
      scenes: [
        { t: '00:19', s: 19, title: '빛을 쥔 손', img: M + 'scene/hero_1.jpg', how: '원화 Midjourney · 빛은 사람이 합성' },
        { t: '01:19', s: 79, title: '붉은 비행기', img: M + 'scene/hero_2.jpg', how: '비행 움직임 Kling' },
        { t: '02:16', s: 136, title: '되살아난 숲', img: M + 'scene/hero_3.jpg', how: '배경 Midjourney · 색은 사람' }
      ]
    },
    {
      id: 'wingit', title: '고물 로켓 대작전', en: 'Junk Rocket', creator: 'mallang', year: 2026,
      genre: '가족 코미디 애니메이션', tags: ['코미디', '가족', '애니메이션', '유쾌한', '짧은'], look: '3D 카툰', lookKey: 'toon',
      runtime: '시즌 1 · 4화', mins: 4, rating: '전체관람가', method: 'AI 생성 중심', methodKey: 'ai',
      logline: '헛간의 고물로 로켓을 만든 고양이와 강아지. 정말로 날아오를 수 있을까요?',
      memo: '캐릭터 두 마리가 장면마다 같아 보이도록 캐릭터 시트를 먼저 만들고 영상을 뽑았습니다.',
      stages: [
        { k: '각본', who: '사람' },
        { k: '캐릭터', who: 'AI', tool: 'Midjourney v7' },
        { k: '영상', who: 'AI', tool: 'Sora' },
        { k: '목소리', who: 'AI', tool: 'ElevenLabs' },
        { k: '음악', who: 'AI', tool: 'Suno v4.5' },
        { k: '편집', who: '사람' }
      ],
      tools: ['Midjourney', 'Sora', 'ElevenLabs', 'Suno'], review: '운영 검수 완료',
      free: true, series: [
        { no: 1, title: '헛간의 설계도', len: '3:58', img: M + 'scene/wingit_1.jpg', desc: '고양이와 강아지가 헛간 구석에서 오래된 로켓 설계도를 찾아냅니다.' },
        { no: 2, title: '고물 모으기', len: '4:05', img: M + 'scene/wingit_2.jpg', desc: '동네 고물을 모으러 나선 둘. 쓸 만한 건 고장 난 냉장고 하나뿐입니다.' },
        { no: 3, title: '첫 점화', len: '3:50', img: M + 'wide/wingit.jpg', desc: '드디어 첫 점화. 로켓은 그대로이고 헛간 지붕만 날아갑니다.' },
        { no: 4, title: '구름 위로', len: '4:12', img: M + 'scene/wingit_3.jpg', desc: '마지막 시도. 고양이가 조종석에 앉고, 강아지가 카운트다운을 셉니다.' }
      ],
      poster: M + 'poster/wingit.jpg', wide: M + 'wide/wingit.jpg', prev: M + 'prev/wingit.mp4',
      scenes: [
        { t: '00:14', s: 14, title: '조종석의 고양이', img: M + 'scene/wingit_1.jpg', how: '캐릭터 시트 Midjourney → 영상 Sora' },
        { t: '01:10', s: 70, title: '비명', img: M + 'scene/wingit_2.jpg', how: 'Sora · 표정 과장은 프롬프트로 조절' },
        { t: '01:49', s: 109, title: '구름 위 로켓', img: M + 'scene/wingit_3.jpg', how: '구름 배경 Sora' }
      ]
    },
    {
      id: 'glass', title: '액자 속 반 잔', en: 'Half a Glass', creator: 'dawn', year: 2026,
      genre: '코미디 단편 · 2D', tags: ['코미디', '2D', '엉뚱한', '짧은'], look: '2D 플랫', lookKey: 'flat',
      runtime: '3분 13초', mins: 3, rating: '전체관람가', method: '사람 제작 + AI 보조', methodKey: 'human',
      logline: '미술관에서 같은 그림을 보고 전혀 다른 걸 상상하는 두 사람.',
      memo: '그림과 움직임은 모두 사람이 했고, 상상 장면의 색 채우기만 AI를 썼습니다.',
      stages: [
        { k: '각본', who: '사람' },
        { k: '작화', who: '사람' },
        { k: '색 채우기', who: 'AI', tool: 'ComfyUI' },
        { k: '움직임', who: '사람' },
        { k: '음악', who: '사람' },
        { k: '편집', who: '사람' }
      ],
      tools: ['ComfyUI'], review: '운영 검수 완료',
      free: true, series: null,
      poster: M + 'poster/glass.jpg', wide: M + 'wide/glass.jpg', prev: M + 'prev/glass.mp4',
      scenes: [
        { t: '00:31', s: 31, title: '터지는 상상', img: M + 'scene/glass_1.jpg', how: '색 채우기 ComfyUI' },
        { t: '01:52', s: 112, title: '액자 벽', img: M + 'scene/glass_2.jpg', how: '전부 손그림' }
      ]
    },
    {
      id: 'sintel', title: '용을 찾아서', en: 'Finding the Dragon', creator: 'offset', year: 2026,
      genre: '판타지 어드벤처', tags: ['판타지', '어드벤처', '애틋한', '애니메이션'], look: '3D 시네마틱', lookKey: 'paint',
      runtime: '2부작', mins: 15, rating: '12세 이상', method: 'AI + 사람 공동 제작', methodKey: 'mix',
      logline: '잃어버린 아기 용을 찾아, 눈 덮인 산과 사막을 건너는 소녀의 긴 여정.',
      memo: '가장 긴 작품이라 장면 수가 많습니다. 풍경은 AI, 인물 연기는 사람이 다듬었습니다.',
      stages: [
        { k: '각본', who: '사람' },
        { k: '원화', who: 'AI', tool: 'Midjourney v7' },
        { k: '영상', who: 'AI', tool: 'Runway Gen-4' },
        { k: '인물 연기', who: '사람' },
        { k: '목소리', who: 'AI', tool: 'ElevenLabs' },
        { k: '음악', who: '사람' }
      ],
      tools: ['Midjourney', 'Runway', 'ElevenLabs'], review: '운영 검수 완료',
      free: false, unit: '부', series: [
        { no: 1, title: '잃어버린 아기 용', len: '14:48', img: M + 'scene/sintel_1.jpg', desc: '눈 덮인 산에서 다친 아기 용을 만난 소녀. 함께 지낸 날은 길지 않았습니다.' },
        { no: 2, title: '용의 둥지', len: '15:10', img: M + 'scene/sintel_3.jpg', soon: '11월 14일 금요일 공개', desc: '아기 용이 사라진 뒤, 소녀는 사막 너머 용의 둥지를 찾아 떠납니다.' }
      ],
      poster: M + 'poster/sintel.jpg', wide: M + 'wide/sintel.jpg', prev: M + 'prev/sintel.mp4',
      scenes: [
        { t: '05:03', s: 303, title: '노을 속 용', img: M + 'scene/sintel_1.jpg', how: '하늘 Runway · 용 실루엣 합성' },
        { t: '06:21', s: 381, title: '대나무 숲', img: M + 'scene/sintel_2.jpg', how: '배경 Midjourney' },
        { t: '11:33', s: 693, title: '절벽 끝', img: M + 'scene/sintel_3.jpg', how: '안개는 Runway' },
        { t: '12:03', s: 723, title: '눈꽃', img: M + 'scene/sintel_4.jpg', how: '꽃은 원화 그대로' }
      ]
    }
  ];

  var MON = {
    spring: { total: 30.8, parts: [[0, 0], [4, 1], [8, 2], [12, 3], [16.4, 4], [20.4, 5], [24.8, 6]] },
    charge: { total: 26.0, parts: [[0, 0], [4, 1], [8.4, 2], [13.4, 3], [17, 4], [22, 4]] },
    singularity: { total: 28.7, parts: [[0, 0], [4.2, 1], [7.8, 1], [11.8, 2], [16.3, 3], [19.7, 4], [24.2, 4]] }
  };
  works.forEach(function (w) {
    var m = MON[w.id];
    if (m) w.montage = { src: M + 'montage/' + w.id + '.mp4', poster: M + 'montage/' + w.id + '.jpg', total: m.total, parts: m.parts.map(function (p) { return { at: p[0], scene: p[1] }; }) };
  });

  var shorts = [
    { id: 'sh01', work: 'spring', at: '03:07', title: '갈비뼈 동굴에 들어가면', len: '0:12', src: M + 'shorts/sh01.mp4', poster: M + 'shorts/sh01.jpg' },
    { id: 'sh02', work: 'charge', at: '01:22', title: '경비 로봇과 정면승부', len: '0:10', src: M + 'shorts/sh02.mp4', poster: M + 'shorts/sh02.jpg' },
    { id: 'sh03', work: 'singularity', at: '00:57', title: '빛나는 해파리의 정체', len: '0:11', src: M + 'shorts/sh03.mp4', poster: M + 'shorts/sh03.jpg' },
    { id: 'sh04', work: 'sprite', at: '1화 02:52', title: '버섯들이 회의 중', len: '0:10', src: M + 'shorts/sh04.mp4', poster: M + 'shorts/sh04.jpg' },
    { id: 'sh05', work: 'spring', at: '06:52', title: '산이 깨어나는 순간', len: '0:10', src: M + 'shorts/sh05.mp4?v=2', poster: M + 'shorts/sh05.jpg?v=2' },
    { id: 'sh06', work: 'wingit', at: '01:10', title: '고양이의 비명', len: '0:08', src: M + 'shorts/sh06.mp4', poster: M + 'shorts/sh06.jpg' },
    { id: 'sh07', work: 'hero', at: '01:19', title: '붉은 비행기, 구름을 가르다', len: '0:10', src: M + 'shorts/sh07.mp4', poster: M + 'shorts/sh07.jpg' },
    { id: 'sh08', work: 'singularity', at: '02:12', title: '우주에서 처음 눈 뜬 생명', len: '0:10', src: M + 'shorts/sh08.mp4', poster: M + 'shorts/sh08.jpg' },
    { id: 'sh09', work: 'sintel', at: '05:03', title: '노을 속을 나는 용', len: '0:10', src: M + 'shorts/sh09.mp4', poster: M + 'shorts/sh09.jpg' },
    { id: 'sh10', work: 'sprite', at: '2화 01:52', title: '초록 불빛이 번지면', len: '0:08', src: M + 'shorts/sh10.mp4', poster: M + 'shorts/sh10.jpg' },
    { id: 'sh11', work: 'charge', at: '02:43', title: '불가에 앉은 두 사람', len: '0:10', src: M + 'shorts/sh11.mp4', poster: M + 'shorts/sh11.jpg' },
    { id: 'sh12', work: 'glass', at: '00:31', title: '그림이 터졌다', len: '0:08', src: M + 'shorts/sh12.mp4', poster: M + 'shorts/sh12.jpg' }
  ];

  var toolInfo = {
    'Midjourney': '이미지', 'Flux': '이미지', 'ComfyUI': '이미지', 'Runway': '영상', 'Veo': '영상', 'Sora': '영상', 'Kling': '영상',
    'ElevenLabs': '목소리', 'Suno': '음악', 'Udio': '음악', 'Topaz': '보정'
  };

  works.forEach(function (w) { (w.series || []).forEach(function (e) { e.label = e.no + (w.unit || '화'); }); });
  function work(id) { for (var i = 0; i < works.length; i++) if (works[i].id === id) return works[i]; return null; }
  function epsOpen(w) { return (w.series || []).filter(function (e) { return !e.soon; }); }
  function creatorOf(w) { return creators[w.creator]; }
  function aiShare(w) {
    var ai = 0, n = 0;
    w.stages.forEach(function (s) { if (s.who === '없음') return; n++; if (s.who === 'AI') ai += 1; else if (s.who === '함께') ai += 0.5; });
    return n ? Math.round(ai / n * 100) : 0;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  return { creators: creators, works: works, shorts: shorts, toolInfo: toolInfo, work: work, epsOpen: epsOpen, creatorOf: creatorOf, aiShare: aiShare, esc: esc, M: M };
})();
