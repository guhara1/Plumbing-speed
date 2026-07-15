// 사이트 이미지 21장 정의 (홈 + 전 지역 페이지에 배치).
// 실제 이미지는 assets/images/work-01.jpg ~ work-21.jpg 로 넣으면 자동 표시됩니다.
// 파일이 없으면 "이미지 준비 중" 플레이스홀더가 보입니다(레이아웃은 그대로 유지).
// alt 는 SEO 용 — 지역 페이지에서는 지역명이 앞에 자동으로 붙습니다.
// 권장 규격: 가로형(16:10), 각 300KB 이하 최적화 JPG/WebP.

const SITE_IMAGES = [
  { file: "/assets/images/work-01.jpg", alt: "배관공사 작업 전 현장 점검 이미지", cap: "현장 점검" },
  { file: "/assets/images/work-02.jpg", alt: "하수구막힘 관통 장비 작업 이미지", cap: "하수구막힘 관통" },
  { file: "/assets/images/work-03.jpg", alt: "싱크대 하부 배관 점검 이미지", cap: "싱크대 하부 배관" },
  { file: "/assets/images/work-04.jpg", alt: "욕실 배수구막힘 원인 확인 이미지", cap: "욕실 배수구" },
  { file: "/assets/images/work-05.jpg", alt: "변기막힘 작업 이미지", cap: "변기막힘 작업" },
  { file: "/assets/images/work-06.jpg", alt: "세면대막힘 배수 점검 이미지", cap: "세면대 배수" },
  { file: "/assets/images/work-07.jpg", alt: "배수구막힘 뚫음 작업 이미지", cap: "배수구 뚫음" },
  { file: "/assets/images/work-08.jpg", alt: "고압세척 장비 작업 이미지", cap: "고압세척" },
  { file: "/assets/images/work-09.jpg", alt: "배관내시경 촬영 화면 이미지", cap: "배관내시경" },
  { file: "/assets/images/work-10.jpg", alt: "누수탐지 장비 작업 이미지", cap: "누수탐지" },
  { file: "/assets/images/work-11.jpg", alt: "수전교체 작업 이미지", cap: "수전교체" },
  { file: "/assets/images/work-12.jpg", alt: "변기교체 작업 이미지", cap: "변기교체" },
  { file: "/assets/images/work-13.jpg", alt: "노후 배관 교체 전 확인 이미지", cap: "노후 배관 교체" },
  { file: "/assets/images/work-14.jpg", alt: "상가 바닥 배수구 작업 이미지", cap: "상가 바닥 배수" },
  { file: "/assets/images/work-15.jpg", alt: "식당 기름때 배관 세척 이미지", cap: "식당 배관 세척" },
  { file: "/assets/images/work-16.jpg", alt: "외부 하수관·맨홀 점검 이미지", cap: "외부 하수관·맨홀" },
  { file: "/assets/images/work-17.jpg", alt: "배관공사 출동 차량 이미지", cap: "출동 차량" },
  { file: "/assets/images/work-18.jpg", alt: "배관 자재·부품 이미지", cap: "배관 자재·부품" },
  { file: "/assets/images/work-19.jpg", alt: "작업 전후 비교 이미지", cap: "작업 전후" },
  { file: "/assets/images/work-20.jpg", alt: "현장 상담·견적 이미지", cap: "현장 상담" },
  { file: "/assets/images/work-21.jpg", alt: "긴급 출동 이미지", cap: "긴급 출동" },
];

module.exports = { SITE_IMAGES };
