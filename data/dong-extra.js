// 특정 시·군의 동(읍·면·동)을 더 촘촘히 채우기 위한 '추가' 목록.
// key = "<시도>/<...>/<노드슬러그>" (해당 노드까지의 경로), value = 추가할 [[한글, 슬러그], ...]
// build.js 가 기존 dongs 에 병합(슬러그 중복은 자동 제거)합니다.
// 여기에 항목을 추가하면 즉시 더 촘촘해집니다. (실제 콘텐츠 보강 전 색인 확장용)

const dongExtra = {
  // ===== 서울 전 행정동 완성 (대표 목록에 누락된 행정동 보강, 번호 동은 대표 1개) =====
  // 관악구: 행정동 명칭이 봉천·신림과 달라 다수 누락 → 실제 행정동 보강
  "seoul/gwanak-gu": [["보라매동","boramae-dong"],["은천동","euncheon-dong"],["성현동","seonghyeon-dong"],["중앙동","jungang-dong"],["청림동","cheongnim-dong"],["행운동","haengun-dong"],["청룡동","cheongnyong-dong"],["낙성대동","nakseongdae-dong"],["인헌동","inheon-dong"],["서원동","seowon-dong"],["신원동","sinwon-dong"],["서림동","seorim-dong"],["신사동","sinsa-dong"],["난향동","nanhyang-dong"],["조원동","jowon-dong"],["대학동","daehak-dong"],["삼성동","samseong-dong"],["미성동","miseong-dong"],["난곡동","nangok-dong"]],
  // 강북구: 삼양·송중·송천·삼각산·인수동 보강
  "seoul/gangbuk-gu": [["삼양동","samyang-dong"],["송중동","songjung-dong"],["송천동","songcheon-dong"],["삼각산동","samgaksan-dong"],["인수동","insu-dong"]],
  // 송파구: 위례동 보강
  "seoul/songpa-gu": [["위례동","wirye-dong"]],
  // 강서구: 우장산동 보강
  "seoul/gangseo-gu": [["우장산동","usangsan-dong"]],
  // 동대문구: 용신동 보강
  "seoul/dongdaemun-gu": [["용신동","yongsin-dong"]],
  // 서대문구: 충현동 보강
  "seoul/seodaemun-gu": [["충현동","chunghyeon-dong"]],
  // 중구: 동화동(누락 시) 보강
  "seoul/jung-gu": [["동화동","donghwa-dong"]],
  // 종로구: 명륜동 보강
  "seoul/jongno-gu": [["명륜동","myeongnyun-dong"]],

  // 화성시 (면 지역 보강)
  "gyeonggi/hwaseong-si": [["화산동","hwasan-dong"],["매송면","maesong-myeon"],["비봉면","bibong-myeon"],["마도면","mado-myeon"],["송산면","songsan-myeon"],["서신면","seosin-myeon"],["팔탄면","paltan-myeon"],["장안면","jangan-myeon"],["양감면","yanggam-myeon"]],
  // 평택시 (읍·면·동 보강)
  "gyeonggi/pyeongtaek-si": [["진위면","jinwi-myeon"],["서탄면","seotan-myeon"],["오성면","oseong-myeon"],["현덕면","hyeondeok-myeon"],["중앙동","jungang-dong"],["신평동","sinpyeong-dong"],["원평동","wonpyeong-dong"],["통복동","tongbok-dong"]],
  // 파주시 (면 지역 보강)
  "gyeonggi/paju-si": [["적성면","jeokseong-myeon"],["파평면","papyeong-myeon"],["월롱면","wollong-myeon"],["탄현면","tanhyeon-myeon"],["장단면","jangdan-myeon"],["군내면","gunnae-myeon"]],
  // 의정부시 (동 보강)
  "gyeonggi/uijeongbu-si": [["자금동","jageum-dong"],["흥선동","heungseon-dong"]],
  // 남양주시 (면 보강)
  "gyeonggi/namyangju-si": [["조안면","joan-myeon"],["수동면","sudong-myeon"],["별내면","byeollae-myeon"]],
  // 시흥시 (동 보강)
  "gyeonggi/siheung-si": [["신현동","sinhyeon-dong"],["군자동","gunja-dong"],["과림동","gwarim-dong"],["월곶동","wolgot-dong"]],
  // 김포시 (면 보강)
  "gyeonggi/gimpo-si": [["대곶면","daegot-myeon"],["월곶면","wolgot-myeon"],["하성면","haseong-myeon"]],
  // 광주시(경기) (면 보강)
  "gyeonggi/gwangju-si": [["남종면","namjong-myeon"],["남한산성면","namhansanseong-myeon"]],
  // 안산 단원구 (동 보강)
  "gyeonggi/ansan-si/danwon-gu": [["호수동","hosu-dong"]],
  // 용인 처인구 (면 보강)
  "gyeonggi/yongin-si/cheoin-gu": [["원삼면","wonsam-myeon"],["백암면","baegam-myeon"]],
};

module.exports = { dongExtra };
