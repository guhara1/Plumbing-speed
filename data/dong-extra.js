// 특정 시·군의 동(읍·면·동)을 더 촘촘히 채우기 위한 '추가' 목록.
// key = "<시도>/<...>/<노드슬러그>" (해당 노드까지의 경로), value = 추가할 [[한글, 슬러그], ...]
// build.js 가 기존 dongs 에 병합(슬러그 중복은 자동 제거)합니다.
// 여기에 항목을 추가하면 즉시 더 촘촘해집니다. (실제 콘텐츠 보강 전 색인 확장용)

const dongExtra = {
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
