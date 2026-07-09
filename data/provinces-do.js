// 8개 도(道) 시·군 전체 구조.
// - 전체 시·군을 시·도 페이지에 노출.
// - 주요 시(도청소재지·거점도시)와 일반구 보유 시(청주·천안·전주·포항·창원)는 읍·면·동까지 확장.
// - 소규모 군은 고유 콘텐츠 리프 페이지(조합형 엔진). build.js run() 에서 districts 로 연결됩니다.
// dong: [한글명, 슬러그]

const gangwon = [
  { slug: "chuncheon-si", name: "춘천시", note: "도청 소재지로 주거·대학가·상권이 함께 있어 세대·원룸·상가 배관 문제를 다룹니다.", dongs: [["교동","gyo-dong"],["후평동","hupyeong-dong"],["효자동","hyoja-dong"],["석사동","seoksa-dong"],["퇴계동","toegye-dong"],["강남동","gangnam-dong"],["신사우동","sinsau-dong"],["근화동","geunhwa-dong"]] },
  { slug: "wonju-si", name: "원주시", note: "도내 최대 도시로 주거·상업·산업이 섞여 세대·상가·공장 배관 문제가 다양합니다.", dongs: [["단계동","dangye-dong"],["무실동","musil-dong"],["명륜동","myeongnyun-dong"],["단구동","dangu-dong"],["태장동","taejang-dong"],["봉산동","bongsan-dong"],["문막읍","munmak-eup"],["흥업면","heungeop-myeon"]] },
  { slug: "gangneung-si", name: "강릉시", note: "관광·숙박 상권으로 숙박·식당 배관과 세대배관 문제가 함께 발생합니다.", dongs: [["교동","gyo-dong"],["포남동","ponam-dong"],["초당동","chodang-dong"],["경포동","gyeongpo-dong"],["홍제동","hongje-dong"],["강남동","gangnam-dong"],["주문진읍","jumunjin-eup"]] },
  { slug: "donghae-si", name: "동해시", note: "항만·산업 도시로 상가·세대배관과 외부 하수관 문제를 함께 다룹니다.", dongs: [["천곡동","cheongok-dong"],["북삼동","buksam-dong"],["송정동","songjeong-dong"],["묵호동","mukho-dong"],["발한동","balhan-dong"]] },
  { slug: "sokcho-si", name: "속초시", note: "관광·숙박 상권으로 펜션·식당 배관과 세대배관 문제가 함께 발생합니다.", dongs: [["영랑동","yeongnang-dong"],["동명동","dongmyeong-dong"],["금호동","geumho-dong"],["교동","gyo-dong"],["노학동","nohak-dong"],["조양동","joyang-dong"]] },
  { slug: "samcheok-si", name: "삼척시", note: "해안·산간이 섞여 세대·상가 배관과 외부 하수관 문제를 다룹니다.", dongs: [["성내동","seongnae-dong"],["교동","gyo-dong"],["정라동","jeongna-dong"],["도계읍","dogye-eup"],["원덕읍","wondeok-eup"]] },
  { slug: "taebaek-si", name: "태백시", note: "산간 도시로 단독주택 외부 하수관·정화조와 상가 배관 문제를 다룹니다.", dongs: [["황지동","hwangji-dong"],["장성동","jangseong-dong"],["철암동","cheoram-dong"],["상장동","sangjang-dong"]] },
  { slug: "hongcheon-gun", name: "홍천군", note: "농촌·전원 지역으로 단독주택 외부 하수관·정화조 문제를 주로 다룹니다." },
  { slug: "hoengseong-gun", name: "횡성군", note: "농촌 지역으로 단독주택·상가 배관과 외부 하수관 문제를 다룹니다." },
  { slug: "yeongwol-gun", name: "영월군", note: "산간·농촌 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다." },
  { slug: "pyeongchang-gun", name: "평창군", note: "관광·전원 지역으로 펜션·숙박 배관과 외부 하수관 문제를 다룹니다." },
  { slug: "jeongseon-gun", name: "정선군", note: "산간·관광 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "cheorwon-gun", name: "철원군", note: "농촌 지역으로 단독주택 외부 하수관·정화조와 상가 배관 문제를 다룹니다." },
  { slug: "hwacheon-gun", name: "화천군", note: "농촌·전원 지역으로 단독주택 외부 하수관 문제를 주로 다룹니다." },
  { slug: "yanggu-gun", name: "양구군", note: "농촌 지역으로 단독주택 외부 하수관·정화조 문제를 다룹니다." },
  { slug: "inje-gun", name: "인제군", note: "산간·관광 지역으로 펜션·숙박 배관과 외부 하수관 문제를 다룹니다." },
  { slug: "goseong-gun", name: "고성군", note: "해안·관광 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "yangyang-gun", name: "양양군", note: "해안·관광 지역으로 펜션·식당 배관과 외부 하수관 문제를 다룹니다." },
];

const chungbuk = [
  { slug: "cheongju-si", name: "청주시", note: "충북 최대 도시로 주거·상업·산업이 함께 있어 세대·상가·공장 배관 문제가 다양합니다.",
    subDistricts: [
      { slug: "sangdang-gu", name: "상당구", note: "구도심·주거 지역으로 세대배관과 상가 배수 문제를 함께 다룹니다.", dongs: [["용암동","yongam-dong"],["금천동","geumcheon-dong"],["영운동","yeongun-dong"],["남일면","namil-myeon"],["문의면","munui-myeon"]] },
      { slug: "seowon-gu", name: "서원구", note: "대학가·주거 지역으로 원룸·아파트 세대배관과 상가 배수 문제가 잦습니다.", dongs: [["사직동","sajik-dong"],["모충동","mochung-dong"],["산남동","sannam-dong"],["성화개신죽림동","seonghwa-dong"],["수곡동","sugok-dong"]] },
      { slug: "heungdeok-gu", name: "흥덕구", note: "산업단지와 신주거지가 섞여 세대·상가·공장 배관 문제가 다양합니다.", dongs: [["가경동","gagyeong-dong"],["복대동","bokdae-dong"],["봉명동","bongmyeong-dong"],["운천신봉동","uncheon-dong"],["강서동","gangseo-dong"],["오송읍","osong-eup"]] },
      { slug: "cheongwon-gu", name: "청원구", note: "주거·농촌이 섞여 세대배관과 외부 하수관 문제를 함께 확인합니다.", dongs: [["오창읍","ochang-eup"],["내수읍","naesu-eup"],["우암동","uam-dong"],["율량사천동","yullyang-dong"],["오근장동","ogeunjang-dong"]] },
    ] },
  { slug: "chungju-si", name: "충주시", note: "주거·산업 지역으로 세대배관과 공장 배관 문제를 함께 다룹니다.", dongs: [["성내충인동","seongnae-dong"],["교현동","gyohyeon-dong"],["연수동","yeonsu-dong"],["칠금금릉동","chilgeum-dong"],["봉방동","bongbang-dong"],["목행용탄동","mokhaeng-dong"]] },
  { slug: "jecheon-si", name: "제천시", note: "주거·상권·관광 지역으로 아파트·상가·숙박 배관 문제가 발생합니다.", dongs: [["의림동","uirim-dong"],["교동","gyo-dong"],["화산동","hwasan-dong"],["남현동","namhyeon-dong"],["신백동","sinbaek-dong"]] },
  { slug: "boeun-gun", name: "보은군", note: "농촌·관광 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다." },
  { slug: "okcheon-gun", name: "옥천군", note: "농촌 지역으로 단독주택 외부 하수관·정화조와 상가 배관 문제를 다룹니다." },
  { slug: "yeongdong-gun", name: "영동군", note: "농촌·과수 지역으로 단독주택 외부 하수관 문제를 주로 다룹니다." },
  { slug: "jeungpyeong-gun", name: "증평군", note: "주거·농촌이 섞여 세대배관과 외부 하수관 문제를 함께 확인합니다." },
  { slug: "jincheon-gun", name: "진천군", note: "산업단지·농촌이 섞여 공장 배관과 세대·외부 하수관 문제를 다룹니다." },
  { slug: "goesan-gun", name: "괴산군", note: "농촌 지역으로 단독주택 외부 하수관·정화조 문제를 다룹니다." },
  { slug: "eumseong-gun", name: "음성군", note: "산업·농촌 지역으로 공장 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "danyang-gun", name: "단양군", note: "관광·산간 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
];

const chungnam = [
  { slug: "cheonan-si", name: "천안시", note: "충남 최대 도시로 주거·상업·산업이 함께 있어 세대·상가·공장 배관 문제가 다양합니다.",
    subDistricts: [
      { slug: "dongnam-gu", name: "동남구", note: "구도심·대학가·농촌이 섞여 세대·상가 배관과 외부 하수관 문제를 다룹니다.", dongs: [["신부동","sinbu-dong"],["문성동","munseong-dong"],["봉명동","bongmyeong-dong"],["쌍용동","ssangyong-dong"],["신방동","sinbang-dong"],["목천읍","mokcheon-eup"],["병천면","byeongcheon-myeon"]] },
      { slug: "seobuk-gu", name: "서북구", note: "신도시·산업단지로 아파트 세대배관과 상가·공장 배관 문제가 다양합니다.", dongs: [["두정동","dujeong-dong"],["불당동","buldang-dong"],["백석동","baekseok-dong"],["성정동","seongjeong-dong"],["쌍용동","ssangyong-dong"],["직산읍","jiksan-eup"],["성환읍","seonghwan-eup"]] },
    ] },
  { slug: "asan-si", name: "아산시", note: "산업단지·신도시로 공장 배관과 아파트 세대배관 문제를 함께 다룹니다.", dongs: [["온양동","onyang-dong"],["배방읍","baebang-eup"],["탕정면","tangjeong-myeon"],["둔포면","dunpo-myeon"],["신창면","sinchang-myeon"],["온천동","oncheon-dong"]] },
  { slug: "seosan-si", name: "서산시", note: "산업·항만·농촌이 섞여 공장·상가·세대배관 문제가 발생합니다.", dongs: [["동문동","dongmun-dong"],["수석동","suseok-dong"],["석남동","seongnam-dong"],["부춘동","buchun-dong"],["대산읍","daesan-eup"]] },
  { slug: "gongju-si", name: "공주시", note: "역사·관광·농촌 지역으로 숙박·상가 배관과 외부 하수관 문제를 다룹니다.", dongs: [["웅진동","ungjin-dong"],["금학동","geumhak-dong"],["옥룡동","ongnyong-dong"],["신관동","singwan-dong"],["유구읍","yugu-eup"]] },
  { slug: "boryeong-si", name: "보령시", note: "해안·관광 지역으로 숙박·식당 배관과 세대·외부 하수관 문제를 다룹니다.", dongs: [["대천동","daecheon-dong"],["동대동","dongdae-dong"],["명천동","myeongcheon-dong"],["웅천읍","ungcheon-eup"]] },
  { slug: "nonsan-si", name: "논산시", note: "농촌·상권 지역으로 상가·세대배관과 외부 하수관 문제를 다룹니다.", dongs: [["취암동","chwiam-dong"],["부창동","buchang-dong"],["강경읍","ganggyeong-eup"],["연무읍","yeonmu-eup"]] },
  { slug: "gyeryong-si", name: "계룡시", note: "신도시 아파트 지역으로 세대배관과 상가 배수 문제를 함께 확인합니다.", dongs: [["금암동","geumam-dong"],["엄사면","eomsa-myeon"],["두마면","duma-myeon"]] },
  { slug: "dangjin-si", name: "당진시", note: "산업·항만·농촌이 섞여 공장·상가·세대배관 문제가 다양합니다.", dongs: [["읍내동","eumnae-dong"],["채운동","chaeun-dong"],["송악읍","songak-eup"],["합덕읍","hapdeok-eup"]] },
  { slug: "geumsan-gun", name: "금산군", note: "농촌·약령 상권으로 상가 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "buyeo-gun", name: "부여군", note: "역사·농촌 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다." },
  { slug: "seocheon-gun", name: "서천군", note: "해안·농촌 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다." },
  { slug: "cheongyang-gun", name: "청양군", note: "농촌·산간 지역으로 단독주택 외부 하수관·정화조 문제를 다룹니다." },
  { slug: "hongseong-gun", name: "홍성군", note: "도청신도시·농촌이 섞여 세대·상가 배관과 외부 하수관 문제를 다룹니다." },
  { slug: "yesan-gun", name: "예산군", note: "농촌·상권 지역으로 상가 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "taean-gun", name: "태안군", note: "해안·관광 지역으로 펜션·숙박 배관과 외부 하수관 문제를 다룹니다." },
];

const jeonbuk = [
  { slug: "jeonju-si", name: "전주시", note: "전북 중심 도시로 주거·상권·관광이 함께 있어 세대·상가·숙박 배관 문제를 다룹니다.",
    subDistricts: [
      { slug: "wansan-gu", name: "완산구", note: "구도심·한옥마을 상권으로 상가·숙박 배관과 세대배관 문제가 흔합니다.", dongs: [["효자동","hyoja-dong"],["서신동","seosin-dong"],["평화동","pyeonghwa-dong"],["삼천동","samcheon-dong"],["중화산동","junghwasan-dong"],["동서학동","dongseohak-dong"]] },
      { slug: "deokjin-gu", name: "덕진구", note: "대학가·산업 지역으로 원룸·상가·공장 배관과 세대배관 문제가 다양합니다.", dongs: [["인후동","inhu-dong"],["덕진동","deokjin-dong"],["금암동","geumam-dong"],["송천동","songcheon-dong"],["우아동","ua-dong"],["팔복동","palbok-dong"]] },
    ] },
  { slug: "gunsan-si", name: "군산시", note: "항만·산업 지역으로 공장 오폐수 배관과 상가·세대배관 문제가 함께 발생합니다.", dongs: [["나운동","naun-dong"],["수송동","susong-dong"],["미장동","mijang-dong"],["조촌동","jochon-dong"],["소룡동","soryong-dong"],["옥산면","oksan-myeon"]] },
  { slug: "iksan-si", name: "익산시", note: "주거·산업·농촌이 섞여 세대·상가·공장 배관 문제를 함께 다룹니다.", dongs: [["영등동","yeongdeung-dong"],["부송동","busong-dong"],["어양동","eoyang-dong"],["마동","ma-dong"],["남중동","namjung-dong"],["함열읍","hamyeol-eup"]] },
  { slug: "jeongeup-si", name: "정읍시", note: "농촌·상권 지역으로 상가·세대배관과 외부 하수관 문제를 다룹니다.", dongs: [["수성동","suseong-dong"],["연지동","yeonji-dong"],["상교동","sanggyo-dong"],["신태인읍","sintaein-eup"]] },
  { slug: "namwon-si", name: "남원시", note: "관광·농촌 지역으로 숙박·상가 배관과 외부 하수관 문제를 다룹니다.", dongs: [["동충동","dongchung-dong"],["죽항동","jukhang-dong"],["향교동","hyanggyo-dong"],["운봉읍","unbong-eup"]] },
  { slug: "gimje-si", name: "김제시", note: "농촌·평야 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다.", dongs: [["요촌동","yochon-dong"],["신풍동","sinpung-dong"],["검산동","geomsan-dong"],["만경읍","mangyeong-eup"]] },
  { slug: "wanju-gun", name: "완주군", note: "산업단지·농촌이 섞여 공장 배관과 세대·외부 하수관 문제를 다룹니다." },
  { slug: "jinan-gun", name: "진안군", note: "산간·농촌 지역으로 단독주택 외부 하수관·정화조 문제를 다룹니다." },
  { slug: "muju-gun", name: "무주군", note: "관광·산간 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "jangsu-gun", name: "장수군", note: "산간·농촌 지역으로 단독주택 외부 하수관 문제를 주로 다룹니다." },
  { slug: "imsil-gun", name: "임실군", note: "농촌 지역으로 단독주택 외부 하수관·정화조와 상가 배관 문제를 다룹니다." },
  { slug: "sunchang-gun", name: "순창군", note: "농촌·상권 지역으로 상가 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "gochang-gun", name: "고창군", note: "농촌·관광 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "buan-gun", name: "부안군", note: "해안·관광 지역으로 펜션·식당 배관과 외부 하수관 문제를 다룹니다." },
];

const jeonnam = [
  { slug: "mokpo-si", name: "목포시", note: "항만·상권 지역으로 상가·세대배관과 외부 하수관 문제가 함께 발생합니다.", dongs: [["용당동","yongdang-dong"],["상동","sang-dong"],["옥암동","ogam-dong"],["연산동","yeonsan-dong"],["산정동","sanjeong-dong"],["하당","hadang"]] },
  { slug: "yeosu-si", name: "여수시", note: "산업·관광 지역으로 공장 배관과 숙박·식당 배관 문제를 함께 다룹니다.", dongs: [["학동","hak-dong"],["여서동","yeoseo-dong"],["문수동","munsu-dong"],["국동","guk-dong"],["미평동","mipyeong-dong"],["소라면","sora-myeon"]] },
  { slug: "suncheon-si", name: "순천시", note: "주거·상권·관광 지역으로 세대·상가·숙박 배관 문제가 잦습니다.", dongs: [["조례동","jorye-dong"],["연향동","yeonhyang-dong"],["왕조동","wangjo-dong"],["삼산동","samsan-dong"],["풍덕동","pungdeok-dong"],["해룡면","haeryong-myeon"]] },
  { slug: "naju-si", name: "나주시", note: "혁신도시·농촌이 섞여 아파트 세대배관과 상가·외부 하수관 문제를 다룹니다.", dongs: [["빛가람동","bitgaram-dong"],["송월동","songwol-dong"],["영강동","yeonggang-dong"],["금천면","geumcheon-myeon"]] },
  { slug: "gwangyang-si", name: "광양시", note: "산업·항만 지역으로 공장 오폐수 배관과 세대·상가 배관 문제가 다양합니다.", dongs: [["중동","jung-dong"],["광영동","gwangyeong-dong"],["금호동","geumho-dong"],["광양읍","gwangyang-eup"],["옥곡면","okgok-myeon"]] },
  { slug: "damyang-gun", name: "담양군", note: "관광·농촌 지역으로 숙박·상가 배관과 외부 하수관 문제를 다룹니다." },
  { slug: "gokseong-gun", name: "곡성군", note: "농촌·관광 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다." },
  { slug: "gurye-gun", name: "구례군", note: "산간·관광 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "goheung-gun", name: "고흥군", note: "해안·농촌 지역으로 단독주택 외부 하수관·정화조 문제를 다룹니다." },
  { slug: "boseong-gun", name: "보성군", note: "농촌·관광 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "hwasun-gun", name: "화순군", note: "주거·농촌이 섞여 세대배관과 외부 하수관 문제를 함께 확인합니다." },
  { slug: "jangheung-gun", name: "장흥군", note: "농촌·관광 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "gangjin-gun", name: "강진군", note: "농촌·관광 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다." },
  { slug: "haenam-gun", name: "해남군", note: "해안·농촌 지역으로 단독주택 외부 하수관·정화조 문제를 다룹니다." },
  { slug: "yeongam-gun", name: "영암군", note: "산업·농촌이 섞여 공장 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "muan-gun", name: "무안군", note: "도청소재지·농촌이 섞여 세대·상가 배관과 외부 하수관 문제를 다룹니다." },
  { slug: "hampyeong-gun", name: "함평군", note: "농촌 지역으로 단독주택 외부 하수관·정화조와 상가 배관 문제를 다룹니다." },
  { slug: "yeonggwang-gun", name: "영광군", note: "해안·산업·농촌이 섞여 공장·상가·외부 하수관 문제를 다룹니다." },
  { slug: "jangseong-gun", name: "장성군", note: "주거·농촌이 섞여 세대배관과 외부 하수관 문제를 함께 확인합니다." },
  { slug: "wando-gun", name: "완도군", note: "해안·관광 지역으로 숙박·식당 배관과 외부 하수관 문제를 다룹니다." },
  { slug: "jindo-gun", name: "진도군", note: "해안·농촌 지역으로 단독주택 외부 하수관·정화조 문제를 다룹니다." },
  { slug: "sinan-gun", name: "신안군", note: "도서·해안 지역으로 단독주택·숙박 배관과 외부 하수관 문제를 다룹니다." },
];

const gyeongbuk = [
  { slug: "pohang-si", name: "포항시", note: "대규모 산업도시로 공장 오폐수·대구경 배관과 세대·상가 배관 문제가 다양합니다.",
    subDistricts: [
      { slug: "nam-gu", name: "남구", note: "산업단지와 주거가 섞여 공장 배관과 세대·상가 배관 문제가 다양합니다.", dongs: [["상대동","sangdae-dong"],["해도동","haedo-dong"],["송도동","songdo-dong"],["효자동","hyoja-dong"],["대이동","daei-dong"],["오천읍","ocheon-eup"]] },
      { slug: "buk-gu", name: "북구", note: "주거·상권 중심으로 아파트 세대배관과 상가 배수 문제가 잦습니다.", dongs: [["장량동","jangnyang-dong"],["양덕동","yangdeok-dong"],["두호동","duho-dong"],["환여동","hwanyeo-dong"],["죽도동","jukdo-dong"],["흥해읍","heunghae-eup"]] },
    ] },
  { slug: "gyeongju-si", name: "경주시", note: "관광·숙박 상권으로 숙박·식당 배관과 세대배관 문제를 함께 다룹니다.", dongs: [["황성동","hwangseong-dong"],["용강동","yonggang-dong"],["동천동","dongcheon-dong"],["성건동","seonggeon-dong"],["선도동","seondo-dong"],["외동읍","oedong-eup"]] },
  { slug: "gumi-si", name: "구미시", note: "산업단지 중심 도시로 공장 배관과 아파트 세대배관 문제가 함께 발생합니다.", dongs: [["송정동","songjeong-dong"],["원평동","wonpyeong-dong"],["인동동","indong-dong"],["진미동","jinmi-dong"],["양포동","yangpo-dong"],["선주원남동","seonju-dong"]] },
  { slug: "gimcheon-si", name: "김천시", note: "산업·물류·농촌이 섞여 공장·상가·세대배관 문제를 다룹니다.", dongs: [["평화남산동","pyeonghwa-dong"],["자산동","jasan-dong"],["대곡동","daegok-dong"],["율곡동","yulgok-dong"],["아포읍","apo-eup"]] },
  { slug: "andong-si", name: "안동시", note: "도청소재지·관광 지역으로 세대·상가·숙박 배관 문제를 다룹니다.", dongs: [["옥동","ok-dong"],["강남동","gangnam-dong"],["송하동","songha-dong"],["태화동","taehwa-dong"],["안기동","angi-dong"],["풍산읍","pungsan-eup"]] },
  { slug: "yeongju-si", name: "영주시", note: "주거·상권·농촌이 섞여 세대·상가 배관과 외부 하수관 문제를 다룹니다.", dongs: [["휴천동","hyucheon-dong"],["가흥동","gaheung-dong"],["영주동","yeongju-dong"],["풍기읍","punggi-eup"]] },
  { slug: "yeongcheon-si", name: "영천시", note: "산업·농촌이 섞여 공장 배관과 세대·외부 하수관 문제를 다룹니다.", dongs: [["동부동","dongbu-dong"],["중앙동","jungang-dong"],["완산동","wansan-dong"],["금호읍","geumho-eup"]] },
  { slug: "sangju-si", name: "상주시", note: "농촌·상권 지역으로 상가·세대배관과 외부 하수관 문제를 다룹니다.", dongs: [["동성동","dongseong-dong"],["남원동","namwon-dong"],["계림동","gyerim-dong"],["함창읍","hamchang-eup"]] },
  { slug: "mungyeong-si", name: "문경시", note: "관광·산간 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다.", dongs: [["점촌동","jeomchon-dong"],["모전동","mojeon-dong"],["문경읍","mungyeong-eup"],["가은읍","gaeun-eup"]] },
  { slug: "gyeongsan-si", name: "경산시", note: "대학가·산업 지역으로 원룸·상가·공장 배관과 세대배관 문제가 다양합니다.", dongs: [["중방동","jungbang-dong"],["옥곡동","okgok-dong"],["중산동","jungsan-dong"],["압량읍","apnyang-eup"],["하양읍","hayang-eup"]] },
  { slug: "uiseong-gun", name: "의성군", note: "농촌 지역으로 단독주택 외부 하수관·정화조와 상가 배관 문제를 다룹니다." },
  { slug: "cheongsong-gun", name: "청송군", note: "산간·관광 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "yeongyang-gun", name: "영양군", note: "산간·농촌 지역으로 단독주택 외부 하수관 문제를 주로 다룹니다." },
  { slug: "yeongdeok-gun", name: "영덕군", note: "해안·관광 지역으로 숙박·식당 배관과 외부 하수관 문제를 다룹니다." },
  { slug: "cheongdo-gun", name: "청도군", note: "농촌·관광 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다." },
  { slug: "goryeong-gun", name: "고령군", note: "산업·농촌이 섞여 공장 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "seongju-gun", name: "성주군", note: "농촌·시설원예 지역으로 단독주택 외부 하수관 문제를 주로 다룹니다." },
  { slug: "chilgok-gun", name: "칠곡군", note: "산업·주거가 섞여 공장 배관과 아파트 세대배관 문제를 함께 다룹니다." },
  { slug: "yecheon-gun", name: "예천군", note: "도청신도시·농촌이 섞여 세대·상가 배관과 외부 하수관 문제를 다룹니다." },
  { slug: "bonghwa-gun", name: "봉화군", note: "산간·농촌 지역으로 단독주택 외부 하수관·정화조 문제를 다룹니다." },
  { slug: "uljin-gun", name: "울진군", note: "해안·산간 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "ulleung-gun", name: "울릉군", note: "도서 지역으로 숙박·식당 배관과 외부 하수관·정화조 문제를 다룹니다." },
];

const gyeongnam = [
  { slug: "changwon-si", name: "창원시", note: "경남 최대 산업도시로 공장·세대·상가 배관 문제가 폭넓게 발생합니다.",
    subDistricts: [
      { slug: "uichang-gu", name: "의창구", note: "행정·주거 중심으로 아파트 세대배관과 상가 배수 문제가 잦습니다.", dongs: [["명서동","myeongseo-dong"],["봉림동","bongnim-dong"],["팔룡동","pallyong-dong"],["의창동","uichang-dong"],["동읍","dong-eup"]] },
      { slug: "seongsan-gu", name: "성산구", note: "산업단지 중심으로 공장 오폐수 배관과 세대·상가 배관 문제가 다양합니다.", dongs: [["상남동","sangnam-dong"],["가음정동","gaeumjeong-dong"],["중앙동","jungang-dong"],["반송동","bansong-dong"],["웅남동","ungnam-dong"]] },
      { slug: "masanhappo-gu", name: "마산합포구", note: "구도심·항만 상권으로 상가·세대배관과 외부 하수관 문제를 다룹니다.", dongs: [["산호동","sanho-dong"],["월영동","wolyeong-dong"],["가포동","gapo-dong"],["현동","hyeon-dong"],["진동면","jindong-myeon"]] },
      { slug: "masanhoewon-gu", name: "마산회원구", note: "주거·상권 지역으로 세대배관과 상가 배수 문제가 잦습니다.", dongs: [["회원동","hoewon-dong"],["석전동","seokjeon-dong"],["양덕동","yangdeok-dong"],["합성동","hapseong-dong"],["내서읍","naeseo-eup"]] },
      { slug: "jinhae-gu", name: "진해구", note: "군항·주거 지역으로 세대배관과 상가·외부 하수관 문제를 함께 다룹니다.", dongs: [["충무동","chungmu-dong"],["여좌동","yeojwa-dong"],["태백동","taebaek-dong"],["자은동","jaeun-dong"],["웅동","ungdong"]] },
    ] },
  { slug: "jinju-si", name: "진주시", note: "주거·대학가·상권으로 세대배관과 원룸·상가 배수 문제가 잦습니다.", dongs: [["신안동","sinan-dong"],["평거동","pyeonggeo-dong"],["충무공동","chungmugong-dong"],["초전동","chojeon-dong"],["가호동","gaho-dong"],["문산읍","munsan-eup"]] },
  { slug: "gimhae-si", name: "김해시", note: "산업·주거 지역으로 공장 배관과 아파트 세대배관 문제를 함께 다룹니다.", dongs: [["내외동","naeoe-dong"],["북부동","bukbu-dong"],["장유","jangyu"],["삼안동","saman-dong"],["활천동","hwalcheon-dong"],["진영읍","jinyeong-eup"]] },
  { slug: "yangsan-si", name: "양산시", note: "신도시·산업 지역으로 세대·상가·공장 배관 문제가 다양합니다.", dongs: [["중앙동","jungang-dong"],["삼성동","samseong-dong"],["물금읍","mulgeum-eup"],["동면","dong-myeon"],["웅상","ungsang"]] },
  { slug: "geoje-si", name: "거제시", note: "조선·산업·관광 지역으로 공장·숙박·세대배관 문제가 다양합니다.", dongs: [["고현동","gohyeon-dong"],["장평동","jangpyeong-dong"],["옥포동","okpo-dong"],["능포동","neungpo-dong"],["수양동","suyang-dong"]] },
  { slug: "tongyeong-si", name: "통영시", note: "해안·관광 지역으로 숙박·식당 배관과 세대·외부 하수관 문제를 다룹니다.", dongs: [["무전동","mujeon-dong"],["북신동","buksin-dong"],["도천동","docheon-dong"],["광도면","gwangdo-myeon"]] },
  { slug: "sacheon-si", name: "사천시", note: "산업·항공·농촌이 섞여 공장·상가·외부 하수관 문제를 다룹니다.", dongs: [["동서동","dongseo-dong"],["벌용동","beoryong-dong"],["향촌동","hyangchon-dong"],["사천읍","sacheon-eup"]] },
  { slug: "miryang-si", name: "밀양시", note: "농촌·상권 지역으로 상가·세대배관과 외부 하수관 문제를 다룹니다.", dongs: [["내일동","naeil-dong"],["삼문동","sammun-dong"],["가곡동","gagok-dong"],["삼랑진읍","samnangjin-eup"]] },
  { slug: "uiryeong-gun", name: "의령군", note: "농촌 지역으로 단독주택 외부 하수관·정화조와 상가 배관 문제를 다룹니다." },
  { slug: "haman-gun", name: "함안군", note: "산업·농촌이 섞여 공장 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "changnyeong-gun", name: "창녕군", note: "농촌·관광 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다." },
  { slug: "goseong-gun", name: "고성군", note: "해안·농촌 지역으로 단독주택 외부 하수관·정화조 문제를 다룹니다." },
  { slug: "namhae-gun", name: "남해군", note: "해안·관광 지역으로 펜션·숙박 배관과 외부 하수관 문제를 다룹니다." },
  { slug: "hadong-gun", name: "하동군", note: "농촌·관광 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "sancheong-gun", name: "산청군", note: "산간·농촌 지역으로 단독주택 외부 하수관·정화조 문제를 다룹니다." },
  { slug: "hamyang-gun", name: "함양군", note: "산간·관광 지역으로 숙박 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "geochang-gun", name: "거창군", note: "농촌·상권 지역으로 상가 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "hapcheon-gun", name: "합천군", note: "농촌·관광 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다." },
];

const jeju = [
  { slug: "jeju-si", name: "제주시", note: "제주 최대 도시로 주거·상권·숙박이 함께 있어 세대·상가·숙박 배관 문제가 다양합니다.", dongs: [["이도동","ido-dong"],["삼도동","samdo-dong"],["노형동","nohyeong-dong"],["연동","yeon-dong"],["아라동","ara-dong"],["화북동","hwabuk-dong"],["삼양동","samyang-dong"],["외도동","oedo-dong"],["애월읍","aewol-eup"],["한림읍","hallim-eup"],["조천읍","jocheon-eup"],["구좌읍","gujwa-eup"]] },
  { slug: "seogwipo-si", name: "서귀포시", note: "관광·숙박 상권으로 펜션·식당 배관과 세대배관 문제가 함께 발생합니다.", dongs: [["동홍동","donghong-dong"],["서홍동","seohong-dong"],["중문동","jungmun-dong"],["대천동","daecheon-dong"],["정방동","jeongbang-dong"],["중앙동","jungang-dong"],["대정읍","daejeong-eup"],["남원읍","namwon-eup"],["성산읍","seongsan-eup"],["표선면","pyoseon-myeon"],["안덕면","andeok-myeon"]] },
];

const provincesDo = { gangwon, chungbuk, chungnam, jeonbuk, jeonnam, gyeongbuk, gyeongnam, jeju };

module.exports = { provincesDo };
