// 세종특별자치시: 시·군·구가 없는 단층제 → 읍·면·동을 시·도 바로 아래에 직접 연결.
// build.js run() 에서 sejong 의 districts 로 설정됩니다. 각 노드는 리프(동/읍/면) 페이지.

const sejongDistricts = [
  // 신도시(행복도시) 동 지역 — 대단지 아파트·상가
  { slug: "hansol-dong", name: "한솔동", note: "신도시 대단지 아파트·상가 지역으로 세대·공용배관과 상가 배수 문제를 함께 다룹니다." },
  { slug: "saerom-dong", name: "새롬동", note: "신도시 아파트 밀집 지역으로 공용 입상관·세대배관 문제와 반복 막힘이 흔합니다." },
  { slug: "dodam-dong", name: "도담동", note: "신도시 주거·상권으로 아파트 세대배관과 상가 배수 문제가 잦습니다." },
  { slug: "areum-dong", name: "아름동", note: "신도시 대단지 아파트로 공용배관·세대배관 구분이 중요합니다." },
  { slug: "jongchon-dong", name: "종촌동", note: "신도시 아파트·상가 지역으로 세대·공용배관 문제를 함께 확인합니다." },
  { slug: "goun-dong", name: "고운동", note: "신도시 대단지 주거지로 공용 오수관·세대배관 문제가 함께 발생합니다." },
  { slug: "boram-dong", name: "보람동", note: "행정·주거 지역으로 아파트 세대배관과 상가·업무시설 배수 문제를 다룹니다." },
  { slug: "daepyeong-dong", name: "대평동", note: "주거·상업 지역으로 세대배관과 상가 배수 문제가 함께 나타납니다." },
  { slug: "sodam-dong", name: "소담동", note: "신도시 아파트·상권으로 공용배관·세대배관과 상가 배수 문제를 다룹니다." },
  { slug: "bangok-dong", name: "반곡동", note: "신도시 주거·연구단지로 세대배관과 상가·시설 배관 문제가 다양합니다." },
  { slug: "dajeong-dong", name: "다정동", note: "신도시 대단지 아파트로 공용 입상관·세대배관 문제와 반복 막힘이 흔합니다." },
  { slug: "haemil-dong", name: "해밀동", note: "신도시 신규 주거지로 아파트 세대배관과 공용배관 문제를 함께 확인합니다." },
  { slug: "sanul-dong", name: "산울동", note: "신도시 신규 주거지로 세대·공용배관 문제를 함께 다룹니다." },
  { slug: "hapgang-dong", name: "합강동", note: "신규 개발 지역으로 세대배관과 공용·상가 배관 문제를 다룹니다." },
  { slug: "naseong-dong", name: "나성동", note: "상업·주거 복합 지역으로 상가 배수와 아파트 세대배관 문제가 함께 발생합니다." },
  { slug: "eojin-dong", name: "어진동", note: "정부청사·업무 지역으로 상가·업무시설 배수와 세대배관 문제를 다룹니다." },
  // 원도심·읍
  { slug: "jochiwon-eup", name: "조치원읍", note: "세종 원도심 상권·주거로 상가 기름때 배관과 노후 빌라 배관 문제가 흔합니다." },
  // 면(농촌) 지역 — 단독주택 외부 하수관·정화조
  { slug: "yeongi-myeon", name: "연기면", note: "농촌·주거가 섞여 단독주택 외부 하수관과 세대배관 문제를 다룹니다." },
  { slug: "yeondong-myeon", name: "연동면", note: "농촌 지역으로 단독주택 외부 하수관·정화조 문제를 주로 다룹니다." },
  { slug: "bugang-myeon", name: "부강면", note: "산업·농촌이 섞여 공장 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "geumnam-myeon", name: "금남면", note: "농촌·주거 지역으로 단독주택 외부 하수관과 세대배관 문제를 함께 확인합니다." },
  { slug: "janggun-myeon", name: "장군면", note: "농촌·전원 지역으로 단독주택 외부 하수관·정화조 문제를 다룹니다." },
  { slug: "yeonseo-myeon", name: "연서면", note: "농촌 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다." },
  { slug: "jeonui-myeon", name: "전의면", note: "농촌·상권 지역으로 상가 배관과 단독주택 외부 하수관 문제를 다룹니다." },
  { slug: "jeondong-myeon", name: "전동면", note: "농촌 지역으로 단독주택 외부 하수관·정화조 문제를 주로 다룹니다." },
  { slug: "sojeong-myeon", name: "소정면", note: "농촌 지역으로 단독주택 외부 하수관과 상가 배관 문제를 다룹니다." },
];

module.exports = { sejongDistricts };
