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
  // 충남 (나머지 시)
  "chungnam/gongju-si": [["중학동","junghak-dong"],["중동","jung-dong"],["반포면","banpo-myeon"],["이인면","iin-myeon"],["탄천면","tancheon-myeon"],["우성면","useong-myeon"],["사곡면","sagok-myeon"],["정안면","jeongan-myeon"],["의당면","uidang-myeon"],["계룡면","gyeryong-myeon"]],
  "chungnam/boryeong-si": [["주포면","jupo-myeon"],["주교면","jugyo-myeon"],["오천면","ocheon-myeon"],["청소면","cheongso-myeon"],["청라면","cheongna-myeon"],["남포면","nampo-myeon"],["성주면","seongju-myeon"],["미산면","misan-myeon"]],
  "chungnam/nonsan-si": [["부적면","bujeok-myeon"],["연산면","yeonsan-myeon"],["벌곡면","beolgok-myeon"],["양촌면","yangchon-myeon"],["가야곡면","gayagok-myeon"],["은진면","eunjin-myeon"],["채운면","chaeun-myeon"],["노성면","noseong-myeon"],["상월면","sangwol-myeon"],["광석면","gwangseok-myeon"]],
  "chungnam/dangjin-si": [["당진동","dangjin-dong"],["대호지면","daehoji-myeon"],["정미면","jeongmi-myeon"],["면천면","myeoncheon-myeon"],["순성면","sunseong-myeon"],["우강면","ugang-myeon"],["신평면","sinpyeong-myeon"],["송산면","songsan-myeon"],["고대면","godae-myeon"],["석문면","seongmun-myeon"]],
  "chungnam/gyeryong-si": [["신도안면","sindoan-myeon"]],
  // 전북 (나머지 시)
  "jeonbuk/jeongeup-si": [["시기동","sigi-dong"],["장명동","jangmyeong-dong"],["내장상동","naejangsang-dong"],["감곡면","gamgok-myeon"],["정우면","jeongu-myeon"],["태인면","taein-myeon"],["옹동면","ongdong-myeon"],["산외면","sanoe-myeon"],["북면","buk-myeon"],["입암면","ibam-myeon"],["고부면","gobu-myeon"],["칠보면","chilbo-myeon"]],
  "jeonbuk/namwon-si": [["노암동","noam-dong"],["도통동","dotong-dong"],["인월면","inwol-myeon"],["아영면","ayeong-myeon"],["산내면","sannae-myeon"],["대강면","daegang-myeon"],["사매면","samae-myeon"],["보절면","bojeol-myeon"],["수지면","suji-myeon"],["송동면","songdong-myeon"],["주생면","jusaeng-myeon"],["금지면","geumji-myeon"],["주천면","jucheon-myeon"]],
  "jeonbuk/gimje-si": [["교월동","gyowol-dong"],["봉남면","bongnam-myeon"],["금구면","geumgu-myeon"],["백구면","baekgu-myeon"],["죽산면","juksan-myeon"],["백산면","baeksan-myeon"],["용지면","yongji-myeon"],["성덕면","seongdeok-myeon"],["공덕면","gongdeok-myeon"],["진봉면","jinbong-myeon"],["금산면","geumsan-myeon"]],
  // 경북 (나머지 시)
  "gyeongbuk/sangju-si": [["동문동","dongmun-dong"],["신흥동","sinheung-dong"],["낙동면","nakdong-myeon"],["청리면","cheongni-myeon"],["공성면","gongseong-myeon"],["내서면","naeseo-myeon"],["모동면","modong-myeon"],["화서면","hwaseo-myeon"],["은척면","euncheok-myeon"],["이안면","ian-myeon"],["화북면","hwabuk-myeon"]],
  "gyeongbuk/mungyeong-si": [["영순면","yeongsun-myeon"],["산양면","sanyang-myeon"],["호계면","hogye-myeon"],["산북면","sanbuk-myeon"],["동로면","dongno-myeon"],["마성면","maseong-myeon"],["농암면","nongam-myeon"]],
  "gyeongbuk/yeongcheon-si": [["서부동","seobu-dong"],["남부동","nambu-dong"],["청통면","cheongtong-myeon"],["신녕면","sillyeong-myeon"],["화산면","hwasan-myeon"],["임고면","imgo-myeon"],["고경면","gogyeong-myeon"],["북안면","bugan-myeon"],["대창면","daechang-myeon"],["자양면","jayang-myeon"]],

  // ===== 강원 군 면 완성 =====
  "gangwon/hongcheon-gun": [["두촌면","duchon-myeon"],["북방면","bukbang-myeon"],["내면","nae-myeon"],["영귀미면","yeonggwimi-myeon"]],
  "gangwon/hoengseong-gun": [["갑천면","gapcheon-myeon"],["청일면","cheongil-myeon"],["서원면","seowon-myeon"],["강림면","gangnim-myeon"]],
  "gangwon/yeongwol-gun": [["북면","buk-myeon"],["남면","nam-myeon"],["무릉도원면","mureungdowon-myeon"],["산솔면","sansol-myeon"]],
  "gangwon/pyeongchang-gun": [["미탄면","mitan-myeon"],["방림면","bangnim-myeon"],["용평면","yongpyeong-myeon"]],
  "gangwon/jeongseon-gun": [["북평면","bukpyeong-myeon"],["임계면","imgye-myeon"],["화암면","hwaam-myeon"],["여량면","yeoryang-myeon"]],
  "gangwon/cheorwon-gun": [["근남면","geunnam-myeon"],["근북면","geunbuk-myeon"],["원동면","wondong-myeon"]],
  "gangwon/hwacheon-gun": [["남면","nam-myeon"]],
  "gangwon/inje-gun": [["상남면","sangnam-myeon"]],
  "gangwon/goseong-gun": [["수동면","sudong-myeon"]],
  "gangwon/yangyang-gun": [["현남면","hyeonnam-myeon"]],
  // ===== 경북 군 면 완성 =====
  "gyeongbuk/uiseong-gun": [["점곡면","jeomgok-myeon"],["옥산면","oksan-myeon"],["금성면","geumseong-myeon"],["가음면","gaeum-myeon"],["춘산면","chunsan-myeon"],["구천면","gucheon-myeon"],["단밀면","danmil-myeon"],["단북면","danbuk-myeon"],["다인면","dain-myeon"],["신평면","sinpyeong-myeon"],["안평면","anpyeong-myeon"],["안사면","ansa-myeon"]],
  "gyeongbuk/cheongsong-gun": [["부남면","bunam-myeon"],["현서면","hyeonseo-myeon"],["안덕면","andeok-myeon"]],
  "gyeongbuk/yeongyang-gun": [["석보면","seokbo-myeon"]],
  "gyeongbuk/yeongdeok-gun": [["남정면","namjeong-myeon"],["달산면","dalsan-myeon"],["지품면","jipum-myeon"],["창수면","changsu-myeon"]],
  "gyeongbuk/cheongdo-gun": [["각북면","gakbuk-myeon"],["운문면","unmun-myeon"],["금천면","geumcheon-myeon"],["매전면","maejeon-myeon"]],
  "gyeongbuk/goryeong-gun": [["덕곡면","deokgok-myeon"],["다산면","dasan-myeon"],["우곡면","ugok-myeon"]],
  "gyeongbuk/seongju-gun": [["용암면","yongam-myeon"],["수륜면","suryun-myeon"],["가천면","gacheon-myeon"],["금수면","geumsu-myeon"],["벽진면","byeokjin-myeon"]],
  "gyeongbuk/chilgok-gun": [["가산면","gasan-myeon"],["약목면","yangmok-myeon"],["기산면","gisan-myeon"]],
  "gyeongbuk/yecheon-gun": [["보문면","bomun-myeon"],["유천면","yucheon-myeon"],["용궁면","yonggung-myeon"],["개포면","gaepo-myeon"],["지보면","jibo-myeon"]],
  "gyeongbuk/bonghwa-gun": [["소천면","socheon-myeon"],["재산면","jaesan-myeon"],["명호면","myeongho-myeon"],["상운면","sangun-myeon"]],
  "gyeongbuk/uljin-gun": [["북면","buk-myeon"],["근남면","geunnam-myeon"],["매화면","maehwa-myeon"],["온정면","onjeong-myeon"],["금강송면","geumgangsong-myeon"]],

  // ===== 충북 군 면 완성 =====
  "chungbuk/boeun-gun": [["장안면","jangan-myeon"],["수한면","suhan-myeon"],["회남면","hoenam-myeon"],["회인면","hoein-myeon"],["내북면","naebuk-myeon"],["산외면","sanoe-myeon"]],
  "chungbuk/okcheon-gun": [["안남면","annam-myeon"],["청성면","cheongseong-myeon"],["군서면","gunseo-myeon"],["군북면","gunbuk-myeon"]],
  "chungbuk/yeongdong-gun": [["용산면","yongsan-myeon"],["추풍령면","chupungnyeong-myeon"],["상촌면","sangchon-myeon"],["용화면","yonghwa-myeon"],["학산면","haksan-myeon"],["양산면","yangsan-myeon"]],
  "chungbuk/jincheon-gun": [["초평면","chopyeong-myeon"],["백곡면","baekgok-myeon"]],
  "chungbuk/goesan-gun": [["장연면","jangyeon-myeon"],["칠성면","chilseong-myeon"],["문광면","mungwang-myeon"],["사리면","sari-myeon"],["소수면","sosu-myeon"],["불정면","buljeong-myeon"]],
  "chungbuk/eumseong-gun": [["소이면","soi-myeon"],["원남면","wonnam-myeon"],["생극면","saenggeuk-myeon"],["감곡면","gamgok-myeon"]],
  "chungbuk/danyang-gun": [["어상천면","eosangcheon-myeon"],["적성면","jeokseong-myeon"],["단성면","danseong-myeon"]],
  // ===== 충남 군 면 완성 =====
  "chungnam/geumsan-gun": [["군북면","gunbuk-myeon"],["남일면","namil-myeon"],["남이면","nami-myeon"],["진산면","jinsan-myeon"],["복수면","boksu-myeon"]],
  "chungnam/buyeo-gun": [["외산면","oesan-myeon"],["내산면","naesan-myeon"],["구룡면","guryong-myeon"],["옥산면","oksan-myeon"],["남면","nam-myeon"],["충화면","chunghwa-myeon"],["양화면","yanghwa-myeon"],["장암면","jangam-myeon"],["세도면","sedo-myeon"],["석성면","seokseong-myeon"],["초촌면","chochon-myeon"]],
  "chungnam/seocheon-gun": [["화양면","hwayang-myeon"],["기산면","gisan-myeon"],["마산면","masan-myeon"],["시초면","sicho-myeon"],["문산면","munsan-myeon"],["종천면","jongcheon-myeon"],["비인면","biin-myeon"],["서면","seo-myeon"]],
  "chungnam/cheongyang-gun": [["목면","mok-myeon"],["청남면","cheongnam-myeon"],["장평면","jangpyeong-myeon"],["남양면","namyang-myeon"],["비봉면","bibong-myeon"]],
  "chungnam/hongseong-gun": [["금마면","geumma-myeon"],["홍동면","hongdong-myeon"],["장곡면","janggok-myeon"],["은하면","eunha-myeon"],["서부면","seobu-myeon"],["구항면","guhang-myeon"]],
  "chungnam/yesan-gun": [["대술면","daesul-myeon"],["광시면","gwangsi-myeon"],["대흥면","daeheung-myeon"],["응봉면","eungbong-myeon"],["봉산면","bongsan-myeon"],["신암면","sinam-myeon"],["오가면","oga-myeon"]],
  "chungnam/taean-gun": [["고남면","gonam-myeon"],["원북면","wonbuk-myeon"],["이원면","iwon-myeon"]],
  // ===== 전북 군 면 완성 =====
  "jeonbuk/wanju-gun": [["상관면","sanggwan-myeon"],["소양면","soyang-myeon"],["구이면","gui-myeon"],["비봉면","bibong-myeon"],["운주면","unju-myeon"],["화산면","hwasan-myeon"],["동상면","dongsang-myeon"],["경천면","gyeongcheon-myeon"]],
  "jeonbuk/jinan-gun": [["용담면","yongdam-myeon"],["안천면","ancheon-myeon"],["동향면","donghyang-myeon"],["상전면","sangjeon-myeon"],["정천면","jeongcheon-myeon"],["주천면","jucheon-myeon"]],
  "jeonbuk/muju-gun": [["부남면","bunam-myeon"]],
  "jeonbuk/jangsu-gun": [["천천면","cheoncheon-myeon"],["계북면","gyebuk-myeon"]],
  "jeonbuk/imsil-gun": [["청웅면","cheongung-myeon"],["운암면","unam-myeon"],["신평면","sinpyeong-myeon"],["성수면","seongsu-myeon"],["삼계면","samgye-myeon"],["덕치면","deokchi-myeon"],["지사면","jisa-myeon"]],
  "jeonbuk/sunchang-gun": [["동계면","donggye-myeon"],["풍산면","pungsan-myeon"],["팔덕면","paldeok-myeon"],["적성면","jeokseong-myeon"],["유등면","yudeung-myeon"],["구림면","gurim-myeon"]],
  "jeonbuk/gochang-gun": [["고수면","gosu-myeon"],["공음면","gongeum-myeon"],["상하면","sangha-myeon"],["해리면","haeri-myeon"],["성송면","seongsong-myeon"],["심원면","simwon-myeon"],["성내면","seongnae-myeon"],["신림면","sillim-myeon"],["부안면","buan-myeon"]],
  "jeonbuk/buan-gun": [["주산면","jusan-myeon"],["동진면","dongjin-myeon"],["행안면","haengan-myeon"],["보안면","boan-myeon"],["백산면","baeksan-myeon"],["상서면","sangseo-myeon"],["하서면","haseo-myeon"],["위도면","wido-myeon"]],
  // ===== 전남 군 면 완성 =====
  "jeonnam/damyang-gun": [["가사문학면","gasamunhak-myeon"],["대덕면","daedeok-myeon"],["무정면","mujeong-myeon"],["금성면","geumseong-myeon"],["용면","yong-myeon"],["월산면","wolsan-myeon"],["수북면","subuk-myeon"]],
  "jeonnam/gokseong-gun": [["삼기면","samgi-myeon"],["목사동면","moksadong-myeon"],["죽곡면","jukgok-myeon"],["고달면","godal-myeon"],["입면","ip-myeon"],["오산면","osan-myeon"]],
  "jeonnam/gurye-gun": [["문척면","muncheok-myeon"],["간전면","ganjeon-myeon"],["용방면","yongbang-myeon"]],
  "jeonnam/goheung-gun": [["도덕면","dodeok-myeon"],["금산면","geumsan-myeon"],["도화면","dohwa-myeon"],["포두면","podu-myeon"],["점암면","jeomam-myeon"],["남양면","namyang-myeon"],["동강면","donggang-myeon"],["대서면","daeseo-myeon"],["두원면","duwon-myeon"]],
  "jeonnam/boseong-gun": [["노동면","nodong-myeon"],["미력면","miryeok-myeon"],["겸백면","gyeombaek-myeon"],["율어면","yureo-myeon"],["복내면","bongnae-myeon"],["문덕면","mundeok-myeon"],["웅치면","ungchi-myeon"]],
  "jeonnam/hwasun-gun": [["한천면","hancheon-myeon"],["청풍면","cheongpung-myeon"],["도곡면","dogok-myeon"],["도암면","doam-myeon"],["이서면","iseo-myeon"],["동복면","dongbok-myeon"],["사평면","sapyeong-myeon"]],
  "jeonnam/jangheung-gun": [["장동면","jangdong-myeon"],["장평면","jangpyeong-myeon"],["유치면","yuchi-myeon"],["부산면","busan-myeon"],["회진면","hoejin-myeon"]],
  "jeonnam/gangjin-gun": [["군동면","gundong-myeon"],["칠량면","chillyang-myeon"],["대구면","daegu-myeon"],["신전면","sinjeon-myeon"],["작천면","jakcheon-myeon"],["옴천면","omcheon-myeon"]],
  "jeonnam/haenam-gun": [["삼산면","samsan-myeon"],["화산면","hwasan-myeon"],["현산면","hyeonsan-myeon"],["북평면","bukpyeong-myeon"],["북일면","bugil-myeon"],["옥천면","okcheon-myeon"],["계곡면","gyegok-myeon"],["마산면","masan-myeon"],["산이면","sani-myeon"]],
  "jeonnam/yeongam-gun": [["덕진면","deokjin-myeon"],["금정면","geumjeong-myeon"],["도포면","dopo-myeon"],["서호면","seoho-myeon"],["학산면","haksan-myeon"],["미암면","miam-myeon"]],
  "jeonnam/muan-gun": [["현경면","hyeongyeong-myeon"],["망운면","mangun-myeon"],["해제면","haeje-myeon"],["운남면","unnam-myeon"]],
  "jeonnam/hampyeong-gun": [["신광면","singwang-myeon"],["엄다면","eomda-myeon"],["대동면","daedong-myeon"],["월야면","worya-myeon"]],
  "jeonnam/yeonggwang-gun": [["대마면","daema-myeon"],["불갑면","bulgap-myeon"],["군서면","gunseo-myeon"],["군남면","gunnam-myeon"],["염산면","yeomsan-myeon"],["낙월면","nagwol-myeon"]],
  "jeonnam/jangseong-gun": [["동화면","donghwa-myeon"],["삼서면","samseo-myeon"],["서삼면","seosam-myeon"],["북일면","bugil-myeon"],["북이면","bugi-myeon"],["북하면","bukha-myeon"]],
  "jeonnam/wando-gun": [["군외면","gunoe-myeon"],["고금면","gogeum-myeon"],["약산면","yaksan-myeon"],["소안면","soan-myeon"],["금당면","geumdang-myeon"],["보길면","bogil-myeon"],["생일면","saengil-myeon"]],
  "jeonnam/jindo-gun": [["의신면","uisin-myeon"],["조도면","jodo-myeon"]],
  "jeonnam/sinan-gun": [["임자면","imja-myeon"],["비금면","bigeum-myeon"],["도초면","docho-myeon"],["흑산면","heuksan-myeon"],["하의면","haui-myeon"],["신의면","sinui-myeon"],["장산면","jangsan-myeon"],["팔금면","palgeum-myeon"],["암태면","amtae-myeon"]],
  // ===== 경남 군 면 완성 =====
  "gyeongnam/uiryeong-gun": [["대의면","daeui-myeon"],["화정면","hwajeong-myeon"],["용덕면","yongdeok-myeon"],["정곡면","jeonggok-myeon"],["낙서면","nakseo-myeon"],["봉수면","bongsu-myeon"],["궁류면","gungnyu-myeon"],["유곡면","yugok-myeon"]],
  "gyeongnam/haman-gun": [["법수면","beopsu-myeon"],["칠서면","chilseo-myeon"],["칠북면","chilbuk-myeon"],["산인면","sanin-myeon"],["여항면","yeohang-myeon"]],
  "gyeongnam/changnyeong-gun": [["고암면","goam-myeon"],["성산면","seongsan-myeon"],["대지면","daeji-myeon"],["유어면","yueo-myeon"],["계성면","gyeseong-myeon"],["장마면","jangma-myeon"],["도천면","docheon-myeon"],["길곡면","gilgok-myeon"],["부곡면","bugok-myeon"]],
  "gyeongnam/goseong-gun": [["삼산면","samsan-myeon"],["하이면","hai-myeon"],["대가면","daega-myeon"],["영현면","yeonghyeon-myeon"],["영오면","yeongo-myeon"],["개천면","gaecheon-myeon"],["구만면","guman-myeon"],["동해면","donghae-myeon"],["거류면","georyu-myeon"]],
  "gyeongnam/namhae-gun": [["상주면","sangju-myeon"],["남면","nam-myeon"],["서면","seo-myeon"],["고현면","gohyeon-myeon"],["설천면","seolcheon-myeon"]],
  "gyeongnam/hadong-gun": [["적량면","jeongnyang-myeon"],["횡천면","hoengcheon-myeon"],["고전면","gojeon-myeon"],["금남면","geumnam-myeon"],["양보면","yangbo-myeon"],["북천면","bukcheon-myeon"],["청암면","cheongam-myeon"],["금성면","geumseong-myeon"]],
  "gyeongnam/sancheong-gun": [["차황면","chahwang-myeon"],["오부면","obu-myeon"],["금서면","geumseo-myeon"],["삼장면","samjang-myeon"],["생비량면","saengbiryang-myeon"],["신등면","sindeung-myeon"]],
  "gyeongnam/hamyang-gun": [["휴천면","hyucheon-myeon"],["유림면","yurim-myeon"],["서상면","seosang-myeon"],["서하면","seoha-myeon"],["백전면","baekjeon-myeon"],["병곡면","byeonggok-myeon"]],
  "gyeongnam/geochang-gun": [["주상면","jusang-myeon"],["고제면","goje-myeon"],["북상면","buksang-myeon"],["남상면","namsang-myeon"],["남하면","namha-myeon"],["신원면","sinwon-myeon"],["가북면","gabuk-myeon"]],
  "gyeongnam/hapcheon-gun": [["봉산면","bongsan-myeon"],["묘산면","myosan-myeon"],["율곡면","yulgok-myeon"],["쌍책면","ssangchaek-myeon"],["덕곡면","deokgok-myeon"],["청덕면","cheongdeok-myeon"],["적중면","jeokjung-myeon"],["대양면","daeyang-myeon"],["쌍백면","ssangbaek-myeon"],["가회면","gahoe-myeon"],["대병면","daebyeong-myeon"],["용주면","yongju-myeon"]],

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
