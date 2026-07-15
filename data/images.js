// 사이트 이미지 21장 (홈 + 전 지역 페이지에 배치).
// 실제 현장 사진(WebP, 각 ~50KB)을 assets/images/work-01.webp ~ work-21.webp 로 넣었습니다.
// alt 는 실제 사진 내용에 맞춘 SEO 문구 — 지역 페이지에서는 지역명이 앞에 자동으로 붙습니다.
// 파일이 없으면 "이미지 준비 중" 플레이스홀더가 보입니다(레이아웃 유지).

const SITE_IMAGES = [
  { file: "/assets/images/work-01.webp", alt: "배관공사·배관설비 현장 작업 이미지", cap: "배관설비 공사" },
  { file: "/assets/images/work-02.webp", alt: "배관 점검·누수 확인 현장 이미지", cap: "배관 점검" },
  { file: "/assets/images/work-03.webp", alt: "배관내시경으로 배관 내부를 확인하는 화면 이미지", cap: "배관내시경 촬영" },
  { file: "/assets/images/work-04.webp", alt: "노후 배관 교체·벽체 배관 작업 이미지", cap: "배관 교체 작업" },
  { file: "/assets/images/work-05.webp", alt: "배수구막힘·바닥 배수구 점검 이미지", cap: "바닥 배수구 점검" },
  { file: "/assets/images/work-06.webp", alt: "하수구막힘·외부 배수구 관통 작업 이미지", cap: "외부 배수구 작업" },
  { file: "/assets/images/work-07.webp", alt: "배관내시경 장비로 하수관을 점검하는 이미지", cap: "배관내시경 장비" },
  { file: "/assets/images/work-08.webp", alt: "싱크대 하부 배관·주방 배수 점검 이미지", cap: "싱크대 하부 배관" },
  { file: "/assets/images/work-09.webp", alt: "고압세척·배관 세척 장비 이미지", cap: "고압세척 장비" },
  { file: "/assets/images/work-10.webp", alt: "누수탐지 장비로 수도 누수를 확인하는 이미지", cap: "누수탐지" },
  { file: "/assets/images/work-11.webp", alt: "노후 배관 교체·매립 배관 확인 이미지", cap: "노후 배관 교체" },
  { file: "/assets/images/work-12.webp", alt: "배관 수리·이음부 보수 작업 이미지", cap: "배관 수리" },
  { file: "/assets/images/work-13.webp", alt: "세면대막힘·하부 배수 트랩 점검 이미지", cap: "세면대 배수 점검" },
  { file: "/assets/images/work-14.webp", alt: "수전교체·배관 연결 작업 이미지", cap: "수전교체 작업" },
  { file: "/assets/images/work-15.webp", alt: "욕실 배수구막힘·바닥 배수 작업 이미지", cap: "욕실 배수구" },
  { file: "/assets/images/work-16.webp", alt: "맨홀·외부 하수관 점검 이미지", cap: "맨홀·외부 하수관" },
  { file: "/assets/images/work-17.webp", alt: "배관설비·급수 배관 자재 이미지", cap: "배관설비 자재" },
  { file: "/assets/images/work-18.webp", alt: "하수관막힘·맨홀 역류 점검 이미지", cap: "하수관·맨홀" },
  { file: "/assets/images/work-19.webp", alt: "하수구막힘 관통 장비 작업 이미지", cap: "하수구막힘 관통" },
  { file: "/assets/images/work-20.webp", alt: "배관내시경으로 외부 하수관을 촬영하는 이미지", cap: "외부 하수관 내시경" },
  { file: "/assets/images/work-21.webp", alt: "식당 기름때 배관·배수구 청소 이미지", cap: "식당 배관 청소" },
];

module.exports = { SITE_IMAGES };
