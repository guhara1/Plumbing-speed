// 경기도 31개 시·군 구조.
// - 일반구(행정구)가 있는 7개 시(수원·성남·안양·안산·고양·용인·부천)는 시 → 구 → 동 3단계.
// - 그 외 시·군은 시 → 동(대표 행정동) 2단계.
// "OO1동, OO2동"처럼 번호로 나뉜 행정동은 대표 1개(OO동)로 통합했습니다.
// 각 동/구/시 페이지는 build.js 의 변형 콘텐츠 엔진으로 서로 다른 본문이 생성됩니다.
// dong 항목: [한글명, 슬러그]

const D = (arr) => arr; // 가독성용 별칭

const gyeonggiDistricts = [
  // ===== 일반구가 있는 시 (시 → 구 → 동) =====
  {
    slug: "suwon-si", name: "수원시", note: "대단지 아파트와 상권이 공존해 세대배관 막힘과 상가 배수 문제가 함께 발생합니다.",
    subDistricts: [
      { slug: "jangan-gu", name: "장안구", note: "주거 밀집 지역으로 아파트·빌라 세대배관과 공용 오수관 문제가 잦습니다.", dongs: D([["파장동","pajang-dong"],["율천동","yulcheon-dong"],["정자동","jeongja-dong"],["영화동","yeonghwa-dong"],["송죽동","songjuk-dong"],["조원동","jowon-dong"],["연무동","yeonmu-dong"],["이목동","imok-dong"],["천천동","cheoncheon-dong"]]) },
      { slug: "gwonseon-gu", name: "권선구", note: "주거·산업이 섞여 세대배관과 상가·소규모 공장 배관 문제를 함께 다룹니다.", dongs: D([["세류동","seryu-dong"],["권선동","gwonseon-dong"],["곡선동","gokseon-dong"],["고색동","gosaek-dong"],["오목천동","omokcheon-dong"],["서둔동","seodun-dong"],["구운동","guun-dong"],["금곡동","geumgok-dong"],["호매실동","homaesil-dong"],["탑동","tap-dong"]]) },
      { slug: "paldal-gu", name: "팔달구", note: "도심 상권과 노후 주거가 함께 있어 상가 기름때 막힘과 빌라 배관 노후 문제가 흔합니다.", dongs: D([["인계동","ingye-dong"],["매교동","maegyo-dong"],["매산동","maesan-dong"],["고등동","godeung-dong"],["화서동","hwaseo-dong"],["지동","ji-dong"],["우만동","uman-dong"],["행궁동","haenggung-dong"]]) },
      { slug: "yeongtong-gu", name: "영통구", note: "신도시 아파트가 많아 공용배관·세대배관 구분과 반복 막힘 관리가 중요합니다.", dongs: D([["매탄동","maetan-dong"],["원천동","woncheon-dong"],["영통동","yeongtong-dong"],["망포동","mangpo-dong"],["광교동","gwanggyo-dong"],["이의동","iui-dong"],["하동","ha-dong"]]) },
    ],
  },
  {
    slug: "seongnam-si", name: "성남시", note: "분당·판교 등 주거·업무 지역으로 아파트 공용관과 오피스 배수 문제가 잦습니다.",
    subDistricts: [
      { slug: "sujeong-gu", name: "수정구", note: "구시가 주거와 신규 개발지가 섞여 빌라 공용관과 아파트 세대배관 문제를 함께 다룹니다.", dongs: D([["신흥동","sinheung-dong"],["태평동","taepyeong-dong"],["수진동","sujin-dong"],["단대동","dandae-dong"],["산성동","sanseong-dong"],["양지동","yangji-dong"],["복정동","bokjeong-dong"],["위례동","wirye-dong"],["고등동","godeung-dong"]]) },
      { slug: "jungwon-gu", name: "중원구", note: "주거·준공업 지역으로 세대배관과 상가·소규모 공장 배관 문제가 함께 발생합니다.", dongs: D([["성남동","seongnam-dong"],["금광동","geumgwang-dong"],["은행동","eunhaeng-dong"],["상대원동","sangdaewon-dong"],["하대원동","hadaewon-dong"],["도촌동","dochon-dong"]]) },
      { slug: "bundang-gu", name: "분당구", note: "대단지 아파트와 판교 업무지구로 공용 입상관·세대배관과 오피스 배수 문제가 잦습니다.", dongs: D([["분당동","bundang-dong"],["수내동","sunae-dong"],["정자동","jeongja-dong"],["서현동","seohyeon-dong"],["이매동","imae-dong"],["야탑동","yatap-dong"],["판교동","pangyo-dong"],["삼평동","sampyeong-dong"],["백현동","baekhyeon-dong"],["금곡동","geumgok-dong"],["구미동","gumi-dong"]]) },
    ],
  },
  {
    slug: "anyang-si", name: "안양시", note: "주거·상권이 밀집해 아파트·빌라 세대배관과 상가 배수 문제가 함께 발생합니다.",
    subDistricts: [
      { slug: "manan-gu", name: "만안구", note: "노후 주거·상권으로 빌라 공용관 협착과 상가 기름때 막힘이 흔합니다.", dongs: D([["안양동","anyang-dong"],["석수동","seoksu-dong"],["박달동","bakdal-dong"]]) },
      { slug: "dongan-gu", name: "동안구", note: "평촌 등 대단지 아파트가 많아 공용배관·세대배관 구분이 중요합니다.", dongs: D([["비산동","bisan-dong"],["관양동","gwanyang-dong"],["평촌동","pyeongchon-dong"],["호계동","hogye-dong"]]) },
    ],
  },
  {
    slug: "ansan-si", name: "안산시", note: "산업단지 인접 지역으로 공장 배관과 주거 세대배관 문제가 함께 발생합니다.",
    subDistricts: [
      { slug: "sangnok-gu", name: "상록구", note: "대학·주거 지역으로 아파트·원룸 세대배관과 상가 배수 문제를 함께 다룹니다.", dongs: D([["사동","sa-dong"],["본오동","bono-dong"],["이동","i-dong"],["부곡동","bugok-dong"],["성포동","seongpo-dong"],["월피동","wolpi-dong"],["안산동","ansan-dong"]]) },
      { slug: "danwon-gu", name: "단원구", note: "산업단지·항만과 주거가 섞여 공장 오폐수 배관과 세대·상가 배관 문제가 다양합니다.", dongs: D([["고잔동","gojan-dong"],["원곡동","wongok-dong"],["초지동","choji-dong"],["선부동","seonbu-dong"],["와동","wa-dong"],["신길동","singil-dong"],["대부동","daebu-dong"]]) },
    ],
  },
  {
    slug: "goyang-si", name: "고양시", note: "대단지 아파트가 많아 공용 오수관·세대배관 구분이 중요합니다.",
    subDistricts: [
      { slug: "deogyang-gu", name: "덕양구", note: "구시가 주거와 신규 택지가 섞여 빌라 공용관과 아파트 세대배관 문제를 함께 다룹니다.", dongs: D([["화정동","hwajeong-dong"],["행신동","haengsin-dong"],["성사동","seongsa-dong"],["주교동","jugyo-dong"],["능곡동","neunggok-dong"],["고양동","goyang-dong"],["삼송동","samsong-dong"],["효자동","hyoja-dong"]]) },
      { slug: "ilsandong-gu", name: "일산동구", note: "일산 신도시 대단지 아파트로 공용 입상관·세대배관 문제와 반복 막힘이 흔합니다.", dongs: D([["백석동","baekseok-dong"],["마두동","madu-dong"],["장항동","janghang-dong"],["정발산동","jeongbalsan-dong"],["식사동","siksa-dong"],["중산동","jungsan-dong"],["풍산동","pungsan-dong"]]) },
      { slug: "ilsanseo-gu", name: "일산서구", note: "일산 신도시 주거·상권으로 아파트 세대배관과 상가 배수 문제가 잦습니다.", dongs: D([["주엽동","juyeop-dong"],["대화동","daehwa-dong"],["탄현동","tanhyeon-dong"],["일산동","ilsan-dong"],["송포동","songpo-dong"],["덕이동","deogi-dong"]]) },
    ],
  },
  {
    slug: "yongin-si", name: "용인시", note: "대규모 주거단지가 넓게 분포해 세대·공용배관 구분이 중요합니다.",
    subDistricts: [
      { slug: "cheoin-gu", name: "처인구", note: "도심 주거와 읍·면 지역이 섞여 세대배관과 외부 하수관 문제를 함께 확인합니다.", dongs: D([["김량장동","gimnyangjang-dong"],["역북동","yeokbuk-dong"],["삼가동","samga-dong"],["포곡읍","pogok-eup"],["모현읍","mohyeon-eup"],["이동읍","idong-eup"],["남사읍","namsa-eup"],["양지면","yangji-myeon"]]) },
      { slug: "giheung-gu", name: "기흥구", note: "대단지 아파트와 산업시설이 섞여 세대·공용배관과 상가·공장 배관 문제가 다양합니다.", dongs: D([["신갈동","singal-dong"],["구갈동","gugal-dong"],["상갈동","sanggal-dong"],["동백동","dongbaek-dong"],["보정동","bojeong-dong"],["죽전동","jukjeon-dong"],["마북동","mabuk-dong"],["영덕동","yeongdeok-dong"],["구성동","guseong-dong"]]) },
      { slug: "suji-gu", name: "수지구", note: "대단지 아파트 주거지로 공용 입상관·세대배관 문제와 반복 막힘이 흔합니다.", dongs: D([["풍덕천동","pungdeokcheon-dong"],["죽전동","jukjeon-dong"],["동천동","dongcheon-dong"],["신봉동","sinbong-dong"],["성복동","seongbok-dong"],["상현동","sanghyeon-dong"]]) },
    ],
  },
  {
    slug: "bucheon-si", name: "부천시", note: "밀집 주거·상권으로 빌라 공용관과 상가 기름때 막힘이 잦습니다.",
    subDistricts: [
      { slug: "wonmi-gu", name: "원미구", note: "상업·주거가 밀집해 상가 기름때 막힘과 빌라·아파트 세대배관 문제가 흔합니다.", dongs: D([["중동","jung-dong"],["상동","sang-dong"],["원미동","wonmi-dong"],["심곡동","simgok-dong"],["춘의동","chunui-dong"],["도당동","dodang-dong"],["약대동","yakdae-dong"],["역곡동","yeokgok-dong"]]) },
      { slug: "sosa-gu", name: "소사구", note: "노후 주거 밀집 지역으로 빌라 공용관 협착과 세대배관 막힘이 잦습니다.", dongs: D([["소사본동","sosabon-dong"],["심곡본동","simgokbon-dong"],["범박동","beombak-dong"],["괴안동","goean-dong"],["송내동","songnae-dong"],["옥길동","okgil-dong"]]) },
      { slug: "ojeong-gu", name: "오정구", note: "주거·준공업 지역으로 세대배관과 상가·소규모 공장 배관 문제를 함께 다룹니다.", dongs: D([["오정동","ojeong-dong"],["고강동","gogang-dong"],["원종동","wonjong-dong"],["신흥동","sinheung-dong"]]) },
    ],
  },

  // ===== 일반구가 없는 시 (시 → 동) =====
  {
    slug: "hwaseong-si", name: "화성시", note: "산업단지와 신도시가 함께 있어 공장 배관과 아파트 배관 문제가 모두 나타납니다.",
    dongs: D([["동탄","dongtan"],["병점","byeongjeom"],["봉담","bongdam-eup"],["남양","namyang"],["향남","hyangnam-eup"],["기배동","gibae-dong"],["진안동","jinan-dong"],["능동","neung-dong"],["반월동","banwol-dong"],["새솔동","saesol-dong"],["우정읍","ujeong-eup"],["정남면","jeongnam-myeon"]]) ,
  },
  {
    slug: "namyangju-si", name: "남양주시", note: "주거단지와 단독주택이 함께 있어 세대배관과 외부 하수관 문제를 함께 확인합니다.",
    dongs: D([["다산동","dasan-dong"],["별내동","byeollae-dong"],["와부읍","wabu-eup"],["진접읍","jinjeop-eup"],["화도읍","hwado-eup"],["오남읍","onam-eup"],["퇴계원읍","toegyewon-eup"],["금곡동","geumgok-dong"],["평내동","pyeongnae-dong"],["호평동","hopyeong-dong"],["진건읍","jingeon-eup"]]) ,
  },
  {
    slug: "pyeongtaek-si", name: "평택시", note: "산업·물류 지역으로 공장 오폐수 배관과 상가 배수 문제를 함께 다룹니다.",
    dongs: D([["비전동","bijeon-dong"],["세교동","segyo-dong"],["송탄","songtan"],["서정동","seojeong-dong"],["지제동","jije-dong"],["고덕","godeok"],["팽성읍","paengseong-eup"],["안중읍","anjung-eup"],["포승읍","poseung-eup"],["청북읍","cheongbuk-eup"]]) ,
  },
  {
    slug: "siheung-si", name: "시흥시", note: "산업·주거 혼재 지역으로 공장·상가·세대배관 문제를 폭넓게 다룹니다.",
    dongs: D([["정왕동","jeongwang-dong"],["배곧동","baegot-dong"],["대야동","daeya-dong"],["신천동","sincheon-dong"],["은행동","eunhaeng-dong"],["매화동","maehwa-dong"],["목감동","mokgam-dong"],["연성동","yeonseong-dong"],["능곡동","neunggok-dong"],["장곡동","janggok-dong"]]) ,
  },
  {
    slug: "paju-si", name: "파주시", note: "신도시 아파트와 공단·농촌이 섞여 세대배관과 공장·외부 하수관 문제가 다양합니다.",
    dongs: D([["운정","unjeong"],["금촌동","geumchon-dong"],["교하동","gyoha-dong"],["문산읍","munsan-eup"],["조리읍","jori-eup"],["파주읍","paju-eup"],["광탄면","gwangtan-myeon"],["법원읍","beobwon-eup"]]) ,
  },
  {
    slug: "gimpo-si", name: "김포시", note: "한강신도시 아파트와 공단이 함께 있어 세대배관과 공장 배관 문제를 함께 다룹니다.",
    dongs: D([["장기동","janggi-dong"],["구래동","gurae-dong"],["운양동","unyang-dong"],["사우동","sau-dong"],["김포본동","gimpobon-dong"],["풍무동","pungmu-dong"],["고촌읍","gochon-eup"],["통진읍","tongjin-eup"],["양촌읍","yangchon-eup"]]) ,
  },
  {
    slug: "uijeongbu-si", name: "의정부시", note: "주거 밀집 지역으로 아파트·빌라 세대배관 막힘과 상가 배수 문제가 잦습니다.",
    dongs: D([["의정부동","uijeongbu-dong"],["호원동","howon-dong"],["장암동","jangam-dong"],["신곡동","singok-dong"],["송산동","songsan-dong"],["가능동","ganeung-dong"],["녹양동","nogyang-dong"],["민락동","millak-dong"]]) ,
  },
  {
    slug: "gwangju-si", name: "광주시", note: "택지개발지와 농촌이 섞여 세대배관과 단독주택 외부 하수관 문제를 함께 확인합니다.",
    dongs: D([["경안동","gyeongan-dong"],["송정동","songjeong-dong"],["광남동","gwangnam-dong"],["오포읍","opo-eup"],["초월읍","chowol-eup"],["곤지암읍","gonjiam-eup"],["도척면","docheok-myeon"],["퇴촌면","toechon-myeon"]]) ,
  },
  {
    slug: "gwangmyeong-si", name: "광명시", note: "주거·상권이 밀집해 아파트·빌라 세대배관과 상가 배수 문제가 함께 발생합니다.",
    dongs: D([["철산동","cheolsan-dong"],["하안동","haan-dong"],["소하동","soha-dong"],["광명동","gwangmyeong-dong"],["일직동","iljik-dong"],["학온동","hagon-dong"]]) ,
  },
  {
    slug: "gunpo-si", name: "군포시", note: "산본 등 대단지 아파트가 많아 공용배관·세대배관 구분이 중요합니다.",
    dongs: D([["산본동","sanbon-dong"],["금정동","geumjeong-dong"],["당동","dang-dong"],["부곡동","bugok-dong"],["대야동","daeya-dong"],["재궁동","jaegung-dong"]]) ,
  },
  {
    slug: "hanam-si", name: "하남시", note: "미사 등 신도시 아파트가 많아 공용 입상관·세대배관 문제와 반복 막힘이 흔합니다.",
    dongs: D([["미사동","misa-dong"],["망월동","mangwol-dong"],["덕풍동","deokpung-dong"],["신장동","sinjang-dong"],["감북동","gambuk-dong"],["춘궁동","chungung-dong"],["위례동","wirye-dong"]]) ,
  },
  {
    slug: "osan-si", name: "오산시", note: "주거·산업이 섞여 세대배관과 상가·공장 배관 문제를 함께 다룹니다.",
    dongs: D([["중앙동","jungang-dong"],["대원동","daewon-dong"],["남촌동","namchon-dong"],["신장동","sinjang-dong"],["세마동","sema-dong"],["초평동","chopyeong-dong"]]) ,
  },
  {
    slug: "yangju-si", name: "양주시", note: "택지개발지와 공단·농촌이 섞여 세대배관과 공장·외부 하수관 문제가 다양합니다.",
    dongs: D([["옥정동","okjeong-dong"],["회천동","hoecheon-dong"],["양주동","yangju-dong"],["백석읍","baekseok-eup"],["광적면","gwangjeok-myeon"],["장흥면","jangheung-myeon"]]) ,
  },
  {
    slug: "icheon-si", name: "이천시", note: "산업·물류와 농촌이 함께 있어 공장 오폐수 배관과 상가·주거 배관 문제를 다룹니다.",
    dongs: D([["창전동","changjeon-dong"],["증포동","jeungpo-dong"],["중리동","jungni-dong"],["관고동","gwango-dong"],["부발읍","bubal-eup"],["장호원읍","janghowon-eup"],["마장면","majang-myeon"]]) ,
  },
  {
    slug: "guri-si", name: "구리시", note: "주거 밀집 지역으로 아파트·빌라 세대배관과 상가 배수 문제가 잦습니다.",
    dongs: D([["수택동","sutaek-dong"],["교문동","gyomun-dong"],["인창동","inchang-dong"],["갈매동","galmae-dong"],["동구동","donggu-dong"]]) ,
  },
  {
    slug: "anseong-si", name: "안성시", note: "산업·농촌 지역으로 공장 배관과 상가·주거 배관 문제를 함께 다룹니다.",
    dongs: D([["안성동","anseong-dong"],["공도읍","gongdo-eup"],["봉산동","bongsan-dong"],["대덕면","daedeok-myeon"],["미양면","miyang-myeon"],["일죽면","iljuk-myeon"]]) ,
  },
  {
    slug: "pocheon-si", name: "포천시", note: "산업·농촌 지역으로 공장 오폐수 배관과 단독주택 외부 하수관 문제가 함께 발생합니다.",
    dongs: D([["소흘읍","soheul-eup"],["포천동","pocheon-dong"],["선단동","seondan-dong"],["군내면","gunnae-myeon"],["가산면","gasan-myeon"],["신북면","sinbuk-myeon"]]) ,
  },
  {
    slug: "uiwang-si", name: "의왕시", note: "주거·아파트 지역으로 세대배관과 상가 배수 문제를 함께 확인합니다.",
    dongs: D([["고천동","gocheon-dong"],["부곡동","bugok-dong"],["오전동","ojeon-dong"],["내손동","naeson-dong"],["청계동","cheonggye-dong"]]) ,
  },
  {
    slug: "yeoju-si", name: "여주시", note: "농촌·상권 지역으로 상가·주거 배관과 단독주택 외부 하수관 문제를 다룹니다.",
    dongs: D([["여흥동","yeoheung-dong"],["중앙동","jungang-dong"],["오학동","ohak-dong"],["가남읍","ganam-eup"],["점동면","jeomdong-myeon"],["능서면","neungseo-myeon"]]) ,
  },
  {
    slug: "dongducheon-si", name: "동두천시", note: "주거·상권 지역으로 세대배관과 상가 배수 문제가 함께 발생합니다.",
    dongs: D([["생연동","saengyeon-dong"],["중앙동","jungang-dong"],["불현동","bulhyeon-dong"],["소요동","soyo-dong"],["상패동","sangpae-dong"]]) ,
  },
  {
    slug: "gwacheon-si", name: "과천시", note: "아파트·업무 지역으로 세대배관과 공용배관 문제를 함께 확인합니다.",
    dongs: D([["중앙동","jungang-dong"],["별양동","byeoryang-dong"],["부림동","burim-dong"],["과천동","gwacheon-dong"],["문원동","munwon-dong"]]) ,
  },
  {
    slug: "yangpyeong-gun", name: "양평군", note: "농촌·전원주택 지역으로 단독주택 외부 하수관·정화조 문제를 주로 다룹니다.",
    dongs: D([["양평읍","yangpyeong-eup"],["용문면","yongmun-myeon"],["옥천면","okcheon-myeon"],["강상면","gangsang-myeon"],["서종면","seojong-myeon"]]) ,
  },
  {
    slug: "gapyeong-gun", name: "가평군", note: "관광·전원 지역으로 펜션·숙박 배관과 단독주택 외부 하수관 문제를 다룹니다.",
    dongs: D([["가평읍","gapyeong-eup"],["청평면","cheongpyeong-myeon"],["설악면","seorak-myeon"],["상면","sang-myeon"],["조종면","jojong-myeon"]]) ,
  },
  {
    slug: "yeoncheon-gun", name: "연천군", note: "농촌 지역으로 단독주택 외부 하수관·정화조와 상가 배관 문제를 다룹니다.",
    dongs: D([["연천읍","yeoncheon-eup"],["전곡읍","jeongok-eup"],["청산면","cheongsan-myeon"],["백학면","baekhak-myeon"],["미산면","misan-myeon"]]) ,
  },
];

module.exports = { gyeonggiDistricts };
