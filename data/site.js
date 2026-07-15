// 전역 사이트 설정 - 연락처/브랜드/네비게이션은 모두 여기서 관리합니다.
const site = {
  name: "스피드 배관공사",
  tagline: "전국 배관공사 · 하수구막힘 긴급 출장 센터",
  // 실제 운영 시 아래 값들을 실제 정보로 교체하세요.
  phone: "1600-0000",
  phoneHref: "tel:16000000",
  sms: "010-0000-0000",
  smsHref: "sms:01000000000",
  kakao: "#",
  email: "help@speed-plumbing.co.kr",
  // 실제 사무실이 있는 단일 주소만 LocalBusiness 로 사용합니다. (가짜 지점 금지)
  office: {
    name: "스피드 배관공사",
    streetAddress: "OO로 000",
    addressLocality: "서울특별시",
    addressRegion: "서울특별시",
    postalCode: "00000",
    country: "KR",
    hours: "Mo-Su 00:00-24:00",
  },
  baseUrl: "https://plumbing-speed.netlify.app",
  locale: "ko_KR",
  year: 2026,
  // 검색엔진 사이트 인증 (Search Console / 네이버 서치어드바이저)
  naverVerification: "7946584b188c6c245079f4439c81719490b442af",
  googleVerification: "", // 구글 서치콘솔 인증 코드가 있으면 여기에 입력
};

// 상단 메뉴 (드롭다운 포함)
const mainMenu = [
  { label: "홈", href: "/" },
  {
    label: "배관공사",
    href: "/pipe-work/",
    children: [
      { label: "배관공사 안내", href: "/pipe-work/" },
      { label: "누수탐지·누수공사", href: "/pipe-work/leak-detection/" },
      { label: "수전교체·수도수리", href: "/pipe-work/faucet-replacement/" },
      { label: "변기교체·부속품수리", href: "/pipe-work/toilet-replacement/" },
      { label: "배관수리", href: "/pipe-work/repair/" },
      { label: "배관교체", href: "/pipe-work/replacement/" },
      { label: "노후 배관교체", href: "/pipe-work/old-pipe-replacement/" },
      { label: "주방 배관공사", href: "/pipe-work/kitchen-pipe/" },
      { label: "욕실 배관공사", href: "/pipe-work/bathroom-pipe/" },
      { label: "상가 배관공사", href: "/pipe-work/commercial-pipe/" },
      { label: "건물 배관공사", href: "/pipe-work/building-pipe/" },
      { label: "공장 배관공사", href: "/pipe-work/factory-pipe/" },
      { label: "누수 배관 보수", href: "/pipe-work/leak-repair/" },
      { label: "배관내시경 점검", href: "/pipe-work/pipe-camera-inspection/" },
    ],
  },
  {
    label: "하수구막힘",
    href: "/drain-clog/",
    children: [
      { label: "하수구막힘 안내", href: "/drain-clog/" },
      { label: "싱크대막힘", href: "/drain-clog/sink/" },
      { label: "변기막힘", href: "/drain-clog/toilet/" },
      { label: "세면대막힘", href: "/drain-clog/basin/" },
      { label: "배수구막힘·뚫음", href: "/drain-clog/drain-outlet/" },
      { label: "욕실 배수구막힘", href: "/drain-clog/bathroom-drain/" },
      { label: "주방 배관막힘", href: "/drain-clog/kitchen-drain/" },
      { label: "베란다 배수구막힘", href: "/drain-clog/veranda-drain/" },
      { label: "세탁실 배수구막힘", href: "/drain-clog/laundry-drain/" },
      { label: "상가 하수구막힘", href: "/drain-clog/commercial-drain/" },
      { label: "식당 하수구막힘", href: "/drain-clog/restaurant-drain/" },
      { label: "오수관·하수관막힘", href: "/drain-clog/sewer-line/" },
      { label: "맨홀막힘", href: "/drain-clog/manhole/" },
      { label: "고압세척", href: "/drain-clog/high-pressure-cleaning/" },
    ],
  },
  {
    label: "막힘 증상",
    href: "/symptom/",
    children: [
      { label: "물이 천천히 내려감", href: "/symptom/slow-drain/" },
      { label: "물이 역류함", href: "/symptom/backflow/" },
      { label: "악취가 올라옴", href: "/symptom/bad-smell/" },
      { label: "배수구에서 소리가 남", href: "/symptom/gurgling-sound/" },
      { label: "싱크대 아래 물샘", href: "/symptom/water-leak-under-sink/" },
      { label: "화장실 바닥 물고임", href: "/symptom/bathroom-floor-water/" },
      { label: "반복적으로 막힘", href: "/symptom/repeated-clog/" },
      { label: "비 올 때 역류", href: "/symptom/rainy-day-backflow/" },
    ],
  },
  {
    label: "건물 유형",
    href: "/place/",
    children: [
      { label: "아파트", href: "/place/apartment/" },
      { label: "빌라", href: "/place/villa/" },
      { label: "단독주택", href: "/place/house/" },
      { label: "원룸", href: "/place/studio/" },
      { label: "오피스텔", href: "/place/officetel/" },
      { label: "상가", href: "/place/commercial-store/" },
      { label: "식당", href: "/place/restaurant/" },
      { label: "카페", href: "/place/cafe/" },
      { label: "공장", href: "/place/factory/" },
      { label: "건물관리", href: "/place/building-management/" },
    ],
  },
  { label: "전국 지역", href: "/area/" },
  { label: "작업 과정", href: "/process/" },
  { label: "비용 안내", href: "/cost/" },
  { label: "시공 사례", href: "/cases/" },
  { label: "예약 문의", href: "/contact/" },
];

// 하단(푸터) 링크
const footerLinks = [
  { label: "배관공사", href: "/pipe-work/" },
  { label: "하수구막힘", href: "/drain-clog/" },
  { label: "막힘 증상", href: "/symptom/" },
  { label: "건물 유형", href: "/place/" },
  { label: "전국 지역", href: "/area/" },
  { label: "작업 과정", href: "/process/" },
  { label: "비용 안내", href: "/cost/" },
  { label: "사진 상담", href: "/photo-consult/" },
  { label: "긴급 출동", href: "/emergency/" },
  { label: "시공 사례", href: "/cases/" },
  { label: "예약 문의", href: "/contact/" },
  { label: "개인정보처리방침", href: "/privacy/" },
  { label: "사이트맵", href: "/sitemap-page/" },
];

module.exports = { site, mainMenu, footerLinks };
