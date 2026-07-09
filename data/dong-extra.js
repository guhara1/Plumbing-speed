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

  // ===== 광역시 전 행정동 완성 (대표 목록 누락분 보강, 번호 동은 대표 1개) =====
  // --- 부산 ---
  "busan/busanjin-gu": [["연지동","yeonji-dong"],["초읍동","choeup-dong"],["범전동","beomjeon-dong"]],
  "busan/dongnae-gu": [["낙민동","nangmin-dong"]],
  "busan/geumjeong-gu": [["선두구동","seondugu-dong"],["금성동","geumseong-dong"]],
  "busan/gangseo-gu": [["강동동","gangdong-dong"],["신호동","sinho-dong"]],
  // --- 대구 ---
  "daegu/dong-gu": [["도평동","dopyeong-dong"],["공산동","gongsan-dong"],["해안동","haean-dong"],["각산동","gaksan-dong"]],
  "daegu/seo-gu": [["상중이동","sangjungi-dong"]],
  "daegu/buk-gu": [["고성동","goseong-dong"],["검단동","geomdan-dong"],["무태조야동","mutaejoya-dong"],["관문동","gwanmun-dong"],["읍내동","eumnae-dong"],["국우동","gugu-dong"]],
  "daegu/suseong-gu": [["중동","jung-dong"],["상동","sang-dong"]],
  "daegu/dalseo-gu": [["용산동","yongsan-dong"],["신당동","sindang-dong"],["본동","bon-dong"],["유천동","yucheon-dong"],["도원동","dowon-dong"],["송현동","songhyeon-dong"]],
  "daegu/dalseong-gun": [["구지면","guji-myeon"]],
  "daegu/gunwi-gun": [["의흥면","uiheung-myeon"],["산성면","sanseong-myeon"],["삼국유사면","samgukyusa-myeon"]],
  // --- 인천 ---
  "incheon/jung-gu": [["도원동","dowon-dong"],["율목동","yulmok-dong"],["동인천동","dongincheon-dong"],["개항동","gaehang-dong"]],
  "incheon/dong-gu": [["창영동","changyeong-dong"],["송림동","songnim-dong"]],
  "incheon/namdong-gu": [["고잔동","gojan-dong"]],
  "incheon/gyeyang-gu": [["동양동","dongyang-dong"]],
  "incheon/seo-gu": [["왕길동","wanggil-dong"],["신현동","sinhyeon-dong"],["원창동","wonchang-dong"]],
  "incheon/ganghwa-gun": [["불은면","bureun-myeon"],["하점면","hajeom-myeon"],["교동면","gyodong-myeon"],["삼산면","samsan-myeon"],["내가면","naega-myeon"]],
  "incheon/ongjin-gun": [["북도면","bukdo-myeon"],["자월면","jawol-myeon"]],
  // --- 대전 ---
  "daejeon/dong-gu": [["중앙동","jungang-dong"],["신인동","sinin-dong"],["효동","hyo-dong"],["용전동","yongjeon-dong"],["산내동","sannae-dong"],["가오동","gao-dong"]],
  "daejeon/jung-gu": [["목동","mok-dong"],["중촌동","jungchon-dong"],["문창동","munchang-dong"],["석교동","seokgyo-dong"],["대사동","daesa-dong"],["부사동","busa-dong"],["용두동","yongdu-dong"]],
  "daejeon/seo-gu": [["복수동","boksu-dong"],["변동","byeon-dong"],["용문동","yongmun-dong"],["가장동","gajang-dong"],["내동","nae-dong"],["도안동","doan-dong"],["기성동","giseong-dong"]],
  "daejeon/yuseong-gu": [["학하동","hakha-dong"],["온천동","oncheon-dong"],["구즉동","gujeuk-dong"]],
  "daejeon/daedeok-gu": [["대화동","daehwa-dong"],["목상동","moksang-dong"]],
  // --- 광주 ---
  "gwangju/dong-gu": [["서남동","seonam-dong"],["소태동","sotae-dong"],["용연동","yongyeon-dong"]],
  "gwangju/seo-gu": [["유덕동","yudeok-dong"],["동천동","dongcheon-dong"]],
  "gwangju/nam-gu": [["사직동","sajik-dong"],["송암동","songam-dong"],["대촌동","daechon-dong"]],
  "gwangju/buk-gu": [["중앙동","jungang-dong"],["임동","im-dong"],["동림동","dongnim-dong"],["우산동","usan-dong"],["풍향동","punghyang-dong"],["문화동","munhwa-dong"],["각화동","gakhwa-dong"],["양산동","yangsan-dong"],["신용동","sinyong-dong"],["건국동","geonguk-dong"],["석곡동","seokgok-dong"]],
  "gwangju/gwangsan-gu": [["신흥동","sinheung-dong"],["어등동","eodeung-dong"],["신창동","sinchang-dong"],["임곡동","imgok-dong"],["동곡동","donggok-dong"],["평동","pyeong-dong"],["삼도동","samdo-dong"],["본량동","bollyang-dong"],["어룡동","eoryong-dong"]],
  // --- 울산 ---
  "ulsan/jung-gu": [["성남동","seongnam-dong"],["옥교동","okgyo-dong"],["약사동","yaksa-dong"]],
  "ulsan/nam-gu": [["삼호동","samho-dong"],["수암동","suam-dong"]],
  "ulsan/buk-gu": [["신현동","sinhyeon-dong"]],
  "ulsan/ulju-gun": [["두서면","duseo-myeon"],["삼동면","samdong-myeon"]],

  // ===== 도(道) 주요 시 행정동 보강 =====
  "gangwon/wonju-si": [["일산동","ilsan-dong"],["학성동","hakseong-dong"],["우산동","usan-dong"],["개운동","gaeun-dong"],["원인동","wonin-dong"],["중앙동","jungang-dong"]],
  "gangwon/gangneung-si": [["옥천동","okcheon-dong"],["중앙동","jungang-dong"],["성덕동","seongdeok-dong"],["송정동","songjeong-dong"],["사천면","sacheon-myeon"],["연곡면","yeongok-myeon"]],
  "jeonnam/yeosu-si": [["여천동","yeocheon-dong"],["쌍봉동","ssangbong-dong"],["시전동","sijeon-dong"],["돌산읍","dolsan-eup"],["율촌면","yulchon-myeon"],["화양면","hwayang-myeon"]],
  "jeonnam/suncheon-si": [["승주읍","seungju-eup"],["낙안면","nagan-myeon"],["별량면","byeollyang-myeon"],["서면","seo-myeon"],["도사동","dosa-dong"],["중앙동","jungang-dong"],["저전동","jeojeon-dong"]],
  "gyeongbuk/gyeongju-si": [["중부동","jungbu-dong"],["황남동","hwangnam-dong"],["월성동","wolseong-dong"],["불국동","bulguk-dong"],["보덕동","bodeok-dong"],["안강읍","angang-eup"],["건천읍","geoncheon-eup"],["감포읍","gampo-eup"],["내남면","naenam-myeon"]],
  "gyeongbuk/gumi-si": [["형곡동","hyeonggok-dong"],["지산동","jisan-dong"],["도량동","doryang-dong"],["광평동","gwangpyeong-dong"],["상모사곡동","sangmosagok-dong"],["임오동","imo-dong"],["신평동","sinpyeong-dong"],["비산동","bisan-dong"],["공단동","gongdan-dong"],["선산읍","seonsan-eup"],["고아읍","goa-eup"]],
  "gyeongnam/gimhae-si": [["동상동","dongsang-dong"],["부원동","buwon-dong"],["회현동","hoehyeon-dong"],["칠산서부동","chilsanseobu-dong"],["불암동","bulam-dong"],["진례면","jillye-myeon"],["주촌면","juchon-myeon"],["생림면","saengnim-myeon"],["대동면","daedong-myeon"],["상동면","sangdong-myeon"],["한림면","hallim-myeon"]],
  "gyeongnam/yangsan-si": [["양주동","yangju-dong"],["서창동","seochang-dong"],["소주동","soju-dong"],["평산동","pyeongsan-dong"],["덕계동","deokgye-dong"],["강서동","gangseo-dong"],["상북면","sangbuk-myeon"],["하북면","habuk-myeon"],["원동면","wondong-myeon"]],
  "gyeongnam/jinju-si": [["성북동","seongbuk-dong"],["중앙동","jungang-dong"],["상봉동","sangbong-dong"],["상대동","sangdae-dong"],["하대동","hadae-dong"],["상평동","sangpyeong-dong"],["판문동","panmun-dong"],["이현동","ihyeon-dong"],["명석면","myeongseok-myeon"],["금산면","geumsan-myeon"],["집현면","jiphyeon-myeon"]],
  // 충북
  "chungbuk/chungju-si": [["문화동","munhwa-dong"],["주덕읍","judeok-eup"],["앙성면","angseong-myeon"],["노은면","noeun-myeon"],["살미면","salmi-myeon"],["대소원면","daesowon-myeon"],["신니면","sinni-myeon"]],
  "chungbuk/jecheon-si": [["청전동","cheongjeon-dong"],["영서동","yeongseo-dong"],["봉양읍","bongyang-eup"],["백운면","baegun-myeon"],["송학면","songhak-myeon"],["금성면","geumseong-myeon"],["청풍면","cheongpung-myeon"]],
  // 충남
  "chungnam/asan-si": [["염치읍","yeomchi-eup"],["송악면","songak-myeon"],["인주면","inju-myeon"],["영인면","yeongin-myeon"],["음봉면","eumbong-myeon"],["도고면","dogo-myeon"],["선장면","seonjang-myeon"]],
  "chungnam/seosan-si": [["인지면","inji-myeon"],["부석면","buseok-myeon"],["지곡면","jigok-myeon"],["성연면","seongyeon-myeon"],["음암면","eumam-myeon"],["운산면","unsan-myeon"],["해미면","haemi-myeon"],["고북면","gobuk-myeon"],["팔봉면","palbong-myeon"]],
  // 전북
  "jeonbuk/gunsan-si": [["월명동","wolmyeong-dong"],["신풍동","sinpung-dong"],["흥남동","heungnam-dong"],["구암동","guam-dong"],["대야면","daeya-myeon"],["회현면","hoehyeon-myeon"],["임피면","impi-myeon"],["서수면","seosu-myeon"],["옥도면","okdo-myeon"]],
  "jeonbuk/iksan-si": [["모현동","mohyeon-dong"],["송학동","songhak-dong"],["인화동","inhwa-dong"],["동산동","dongsan-dong"],["황등면","hwangdeung-myeon"],["금마면","geumma-myeon"],["왕궁면","wanggung-myeon"],["여산면","yeosan-myeon"],["삼기면","samgi-myeon"]],
  // 전남
  "jeonnam/mokpo-si": [["원산동","wonsan-dong"],["대성동","daeseong-dong"],["목원동","mogwon-dong"],["유달동","yudal-dong"],["죽교동","jukgyo-dong"],["북항동","bukhang-dong"],["만호동","manho-dong"],["이로동","iro-dong"]],
  "jeonnam/naju-si": [["남평읍","nampyeong-eup"],["성북동","seongbuk-dong"],["영산동","yeongsan-dong"],["봉황면","bonghwang-myeon"],["세지면","seji-myeon"],["왕곡면","wanggok-myeon"],["반남면","bannam-myeon"],["노안면","noan-myeon"],["다시면","dasi-myeon"]],
  "jeonnam/gwangyang-si": [["골약동","golyak-dong"],["태인동","taein-dong"],["진상면","jinsang-myeon"],["진월면","jinwol-myeon"],["다압면","daap-myeon"],["봉강면","bonggang-myeon"],["옥룡면","ongnyong-myeon"]],
  // 경북
  "gyeongbuk/andong-si": [["중구동","junggu-dong"],["명륜동","myeongnyun-dong"],["용상동","yongsang-dong"],["와룡면","waryong-myeon"],["도산면","dosan-myeon"],["예안면","yean-myeon"],["임하면","imha-myeon"],["길안면","giran-myeon"],["남후면","namhu-myeon"]],
  "gyeongbuk/gimcheon-si": [["양금동","yanggeum-dong"],["지좌동","jijwa-dong"],["개령면","gaeryeong-myeon"],["감천면","gamcheon-myeon"],["어모면","eomo-myeon"],["봉산면","bongsan-myeon"],["대덕면","daedeok-myeon"],["지례면","jirye-myeon"]],
  "gyeongbuk/gyeongsan-si": [["서부동","seobu-dong"],["남부동","nambu-dong"],["북부동","bukbu-dong"],["동부동","dongbu-dong"],["진량읍","jillyang-eup"],["자인면","jain-myeon"],["남산면","namsan-myeon"],["용성면","yongseong-myeon"],["와촌면","wachon-myeon"]],
  "gyeongbuk/yeongju-si": [["상망동","sangmang-dong"],["하망동","hamang-dong"],["문수면","munsu-myeon"],["안정면","anjeong-myeon"],["봉현면","bonghyeon-myeon"],["순흥면","sunheung-myeon"],["부석면","buseok-myeon"],["단산면","dansan-myeon"]],
  // 경남
  "gyeongnam/tongyeong-si": [["정량동","jeongnyang-dong"],["미수동","misu-dong"],["봉평동","bongpyeong-dong"],["명정동","myeongjeong-dong"],["산양읍","sanyang-eup"],["용남면","yongnam-myeon"],["도산면","dosan-myeon"],["욕지면","yokji-myeon"],["한산면","hansan-myeon"]],
  "gyeongnam/sacheon-si": [["동서금동","dongseogeum-dong"],["선구동","seongu-dong"],["남양동","namyang-dong"],["정동면","jeongdong-myeon"],["사남면","sanam-myeon"],["용현면","yonghyeon-myeon"],["곤양면","gonyang-myeon"],["서포면","seopo-myeon"]],
  "gyeongnam/geoje-si": [["상문동","sangmun-dong"],["장승포동","jangseungpo-dong"],["마전동","majeon-dong"],["아주동","aju-dong"],["일운면","irun-myeon"],["동부면","dongbu-myeon"],["거제면","geoje-myeon"],["사등면","sadeung-myeon"],["연초면","yeoncho-myeon"],["하청면","hacheong-myeon"],["장목면","jangmok-myeon"]],
  "gyeongnam/miryang-si": [["교동","gyo-dong"],["내이동","naei-dong"],["하남읍","hanam-eup"],["초동면","chodong-myeon"],["상남면","sangnam-myeon"],["부북면","bubuk-myeon"],["산외면","sanoe-myeon"],["단장면","danjang-myeon"],["무안면","muan-myeon"]],

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
