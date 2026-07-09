// 광역시 자치구 → 행정동(대표) 구조.
// 구조는 서울과 동일(시·도 → 구 → 동). build.js 의 run() 에서 해당 시·도 districts 로 연결됩니다.
// "OO1동, OO2동" 등 번호 행정동은 대표 1개로 통합. 각 페이지는 조합형 고유 본문으로 생성됩니다.
// dong: [한글명, 슬러그]

const busan = [
  { slug: "jung-gu", name: "중구", note: "원도심 상권으로 상가 공용관과 식당 기름때 배관 문제가 흔합니다.", dongs: [["중앙동","jungang-dong"],["동광동","donggwang-dong"],["대청동","daecheong-dong"],["보수동","bosu-dong"],["부평동","bupyeong-dong"],["광복동","gwangbok-dong"],["남포동","nampo-dong"],["영주동","yeongju-dong"]] },
  { slug: "seo-gu", name: "서구", note: "노후 주거·의료 상권이 섞여 빌라 배관 노후와 상가 배수 문제가 함께 발생합니다.", dongs: [["동대신동","dongdaesin-dong"],["서대신동","seodaesin-dong"],["부민동","bumin-dong"],["아미동","ami-dong"],["초장동","chojang-dong"],["충무동","chungmu-dong"],["남부민동","nambumin-dong"],["암남동","amnam-dong"]] },
  { slug: "dong-gu", name: "동구", note: "역세권 상권과 노후 주거가 함께 있어 상가·빌라 배관 문제가 잦습니다.", dongs: [["초량동","choryang-dong"],["수정동","sujeong-dong"],["좌천동","jwacheon-dong"],["범일동","beomil-dong"]] },
  { slug: "yeongdo-gu", name: "영도구", note: "주거·항만 지역으로 세대배관과 상가·외부 하수관 문제를 함께 확인합니다.", dongs: [["남항동","namhang-dong"],["영선동","yeongseon-dong"],["신선동","sinseon-dong"],["봉래동","bongnae-dong"],["청학동","cheonghak-dong"],["동삼동","dongsam-dong"]] },
  { slug: "busanjin-gu", name: "부산진구", note: "서면 등 상업 중심지로 상가 공용관과 식당 배관 문제가 흔합니다.", dongs: [["부전동","bujeon-dong"],["전포동","jeonpo-dong"],["양정동","yangjeong-dong"],["부암동","buam-dong"],["당감동","danggam-dong"],["가야동","gaya-dong"],["개금동","gaegeum-dong"],["범천동","beomcheon-dong"]] },
  { slug: "dongnae-gu", name: "동래구", note: "주거 밀집 지역으로 아파트·빌라 세대배관 막힘이 잦습니다.", dongs: [["명륜동","myeongnyun-dong"],["온천동","oncheon-dong"],["수민동","sumin-dong"],["안락동","allak-dong"],["명장동","myeongjang-dong"],["사직동","sajik-dong"],["복산동","boksan-dong"]] },
  { slug: "nam-gu", name: "남구", note: "주거·대학가 상권으로 원룸·상가 배관과 세대배관 문제가 함께 발생합니다.", dongs: [["대연동","daeyeon-dong"],["용호동","yongho-dong"],["용당동","yongdang-dong"],["감만동","gamman-dong"],["우암동","uam-dong"],["문현동","munhyeon-dong"]] },
  { slug: "buk-gu", name: "북구", note: "대단지 주거지로 공용 오수관·세대배관 문제와 반복 막힘이 흔합니다.", dongs: [["구포동","gupo-dong"],["덕천동","deokcheon-dong"],["만덕동","mandeok-dong"],["화명동","hwamyeong-dong"],["금곡동","geumgok-dong"]] },
  { slug: "haeundae-gu", name: "해운대구", note: "해안 상권·숙박·식당이 밀집해 기름때 배관과 상가 배수 문제가 잦습니다.", dongs: [["우동","u-dong"],["중동","jung-dong"],["좌동","jwa-dong"],["송정동","songjeong-dong"],["반여동","banyeo-dong"],["반송동","bansong-dong"],["재송동","jaesong-dong"]] },
  { slug: "saha-gu", name: "사하구", note: "주거·산업이 섞여 세대배관과 상가·공장 배관 문제를 함께 다룹니다.", dongs: [["괴정동","goejeong-dong"],["당리동","dangni-dong"],["하단동","hadan-dong"],["신평동","sinpyeong-dong"],["장림동","jangnim-dong"],["다대동","dadae-dong"],["구평동","gupyeong-dong"],["감천동","gamcheon-dong"]] },
  { slug: "geumjeong-gu", name: "금정구", note: "대학가·주거 지역으로 원룸·아파트 세대배관과 상가 배수 문제가 함께 발생합니다.", dongs: [["장전동","jangjeon-dong"],["부곡동","bugok-dong"],["서동","seo-dong"],["금사동","geumsa-dong"],["남산동","namsan-dong"],["구서동","guseo-dong"],["청룡동","cheongnyong-dong"],["노포동","nopo-dong"]] },
  { slug: "gangseo-gu", name: "강서구", note: "산업단지·신도시가 함께 있어 공장 배관과 아파트 세대배관 문제가 다양합니다.", dongs: [["대저동","daejeo-dong"],["명지동","myeongji-dong"],["가락동","garak-dong"],["녹산동","noksan-dong"],["가덕도동","gadeokdo-dong"]] },
  { slug: "yeonje-gu", name: "연제구", note: "시청 인근 주거·업무 지역으로 아파트 세대배관과 상가 배수 문제가 잦습니다.", dongs: [["거제동","geoje-dong"],["연산동","yeonsan-dong"]] },
  { slug: "suyeong-gu", name: "수영구", note: "주거·상권 혼재 지역으로 세대배관과 상가 배수 문제를 함께 다룹니다.", dongs: [["남천동","namcheon-dong"],["수영동","suyeong-dong"],["망미동","mangmi-dong"],["광안동","gwangan-dong"],["민락동","millak-dong"]] },
  { slug: "sasang-gu", name: "사상구", note: "공업지역과 주거가 섞여 공장 오폐수 배관과 세대·상가 배관 문제가 다양합니다.", dongs: [["삼락동","samnak-dong"],["모라동","mora-dong"],["덕포동","deokpo-dong"],["괘법동","gwaebeop-dong"],["감전동","gamjeon-dong"],["주례동","jurye-dong"],["학장동","hakjang-dong"],["엄궁동","eomgung-dong"]] },
  { slug: "gijang-gun", name: "기장군", note: "신도시·산업·농촌이 섞여 세대·상가·공장·외부 하수관 문제를 폭넓게 다룹니다.", dongs: [["기장읍","gijang-eup"],["장안읍","jangan-eup"],["정관읍","jeonggwan-eup"],["일광읍","ilgwang-eup"],["철마면","cheolma-myeon"]] },
];

const incheon = [
  { slug: "jung-gu", name: "중구", note: "원도심·공항·항만이 함께 있어 상가·숙박 배관과 세대배관 문제가 다양합니다.", dongs: [["신포동","sinpo-dong"],["신흥동","sinheung-dong"],["연안동","yeonan-dong"],["운서동","unseo-dong"],["영종동","yeongjong-dong"],["용유동","yongyu-dong"]] },
  { slug: "dong-gu", name: "동구", note: "노후 주거·준공업 지역으로 빌라 배관 노후와 소규모 공장 배관 문제가 흔합니다.", dongs: [["만석동","manseok-dong"],["화수동","hwasu-dong"],["송현동","songhyeon-dong"],["화평동","hwapyeong-dong"],["금창동","geumchang-dong"]] },
  { slug: "michuhol-gu", name: "미추홀구", note: "노후 주거·상권으로 빌라 배관 노후와 상가 배수 문제가 흔합니다.", dongs: [["숭의동","sungui-dong"],["용현동","yonghyeon-dong"],["학익동","hagik-dong"],["도화동","dohwa-dong"],["주안동","juan-dong"],["관교동","gwangyo-dong"],["문학동","munhak-dong"]] },
  { slug: "yeonsu-gu", name: "연수구", note: "송도 등 신도시 오피스텔·아파트가 많아 공용관·세대배관 구분이 중요합니다.", dongs: [["옥련동","ongnyeon-dong"],["선학동","seonhak-dong"],["연수동","yeonsu-dong"],["청학동","cheonghak-dong"],["동춘동","dongchun-dong"],["송도동","songdo-dong"]] },
  { slug: "namdong-gu", name: "남동구", note: "산업단지와 주거가 함께 있어 공장 배관과 세대배관 문제를 함께 다룹니다.", dongs: [["구월동","guwol-dong"],["간석동","ganseok-dong"],["만수동","mansu-dong"],["장수동","jangsu-dong"],["서창동","seochang-dong"],["논현동","nonhyeon-dong"],["도림동","dorim-dong"],["남촌동","namchon-dong"]] },
  { slug: "bupyeong-gu", name: "부평구", note: "밀집 주거·상권으로 빌라 공용관과 상가 기름때 막힘이 잦습니다.", dongs: [["부평동","bupyeong-dong"],["산곡동","sangok-dong"],["청천동","cheongcheon-dong"],["갈산동","galsan-dong"],["삼산동","samsan-dong"],["부개동","bugae-dong"],["일신동","ilsin-dong"],["십정동","sipjeong-dong"]] },
  { slug: "gyeyang-gu", name: "계양구", note: "주거 밀집 지역으로 아파트·빌라 세대배관 막힘과 공용 오수관 문제가 잦습니다.", dongs: [["효성동","hyoseong-dong"],["계산동","gyesan-dong"],["작전동","jakjeon-dong"],["서운동","seoun-dong"],["임학동","imhak-dong"],["병방동","byeongbang-dong"],["귤현동","gyulhyeon-dong"]] },
  { slug: "seo-gu", name: "서구", note: "청라·검단 등 신도시와 공단이 함께 있어 세대·상가·산업 배관 문제가 다양합니다.", dongs: [["검암동","geomam-dong"],["연희동","yeonhui-dong"],["청라동","cheongna-dong"],["가정동","gajeong-dong"],["석남동","seongnam-dong"],["가좌동","gajwa-dong"],["당하동","dangha-dong"],["원당동","wondang-dong"],["마전동","majeon-dong"]] },
  { slug: "ganghwa-gun", name: "강화군", note: "농촌·전원 지역으로 단독주택 외부 하수관·정화조와 상가 배관 문제를 다룹니다.", dongs: [["강화읍","ganghwa-eup"],["선원면","seonwon-myeon"],["길상면","gilsang-myeon"],["화도면","hwado-myeon"],["양도면","yangdo-myeon"]] },
  { slug: "ongjin-gun", name: "옹진군", note: "도서 지역으로 단독주택·숙박 배관과 외부 하수관·정화조 문제를 다룹니다.", dongs: [["백령면","baengnyeong-myeon"],["대청면","daecheong-myeon"],["연평면","yeonpyeong-myeon"],["덕적면","deokjeok-myeon"],["영흥면","yeongheung-myeon"]] },
];

module.exports = { metros: { busan, incheon } };
