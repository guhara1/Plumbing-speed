// 도(道) 소속 군(郡)의 대표 읍·면 목록. 기존 리프 군 페이지에 동(읍·면) 단계를 추가합니다.
// key = "<시도슬러그>/<군슬러그>", value = [[한글명, 슬러그], ...]
// build.js run() 에서 해당 군에 dongs 로 병합됩니다. 각 읍·면 페이지는 조합형 엔진으로 고유 본문 생성.

const gunDongs = {
  // ===== 강원 =====
  "gangwon/hongcheon-gun": [["홍천읍","hongcheon-eup"],["서면","seo-myeon"],["서석면","seoseok-myeon"],["내촌면","naechon-myeon"],["남면","nam-myeon"],["화촌면","hwachon-myeon"]],
  "gangwon/hoengseong-gun": [["횡성읍","hoengseong-eup"],["우천면","ucheon-myeon"],["안흥면","anheung-myeon"],["둔내면","dunnae-myeon"],["공근면","gonggeun-myeon"]],
  "gangwon/yeongwol-gun": [["영월읍","yeongwol-eup"],["상동읍","sangdong-eup"],["주천면","jucheon-myeon"],["한반도면","hanbando-myeon"],["김삿갓면","gimsatgat-myeon"]],
  "gangwon/pyeongchang-gun": [["평창읍","pyeongchang-eup"],["대화면","daehwa-myeon"],["봉평면","bongpyeong-myeon"],["진부면","jinbu-myeon"],["대관령면","daegwallyeong-myeon"]],
  "gangwon/jeongseon-gun": [["정선읍","jeongseon-eup"],["고한읍","gohan-eup"],["사북읍","sabuk-eup"],["신동읍","sindong-eup"],["남면","nam-myeon"]],
  "gangwon/cheorwon-gun": [["철원읍","cheorwon-eup"],["갈말읍","galmal-eup"],["동송읍","dongsong-eup"],["김화읍","gimhwa-eup"],["서면","seo-myeon"]],
  "gangwon/hwacheon-gun": [["화천읍","hwacheon-eup"],["간동면","gandong-myeon"],["하남면","hanam-myeon"],["상서면","sangseo-myeon"],["사내면","sanae-myeon"]],
  "gangwon/yanggu-gun": [["양구읍","yanggu-eup"],["방산면","bangsan-myeon"],["동면","dong-myeon"],["남면","nam-myeon"],["해안면","haean-myeon"]],
  "gangwon/inje-gun": [["인제읍","inje-eup"],["북면","buk-myeon"],["기린면","girin-myeon"],["서화면","seohwa-myeon"],["남면","nam-myeon"]],
  "gangwon/goseong-gun": [["간성읍","ganseong-eup"],["거진읍","geojin-eup"],["토성면","toseong-myeon"],["죽왕면","jugwang-myeon"],["현내면","hyeonnae-myeon"]],
  "gangwon/yangyang-gun": [["양양읍","yangyang-eup"],["손양면","sonyang-myeon"],["강현면","ganghyeon-myeon"],["현북면","hyeonbuk-myeon"],["서면","seo-myeon"]],

  // ===== 충북 =====
  "chungbuk/boeun-gun": [["보은읍","boeun-eup"],["속리산면","songnisan-myeon"],["마로면","maro-myeon"],["탄부면","tanbu-myeon"],["삼승면","samseung-myeon"]],
  "chungbuk/okcheon-gun": [["옥천읍","okcheon-eup"],["동이면","dongi-myeon"],["이원면","iwon-myeon"],["청산면","cheongsan-myeon"],["안내면","annae-myeon"]],
  "chungbuk/yeongdong-gun": [["영동읍","yeongdong-eup"],["황간면","hwanggan-myeon"],["심천면","simcheon-myeon"],["양강면","yanggang-myeon"],["매곡면","maegok-myeon"]],
  "chungbuk/jeungpyeong-gun": [["증평읍","jeungpyeong-eup"],["도안면","doan-myeon"]],
  "chungbuk/jincheon-gun": [["진천읍","jincheon-eup"],["덕산읍","deoksan-eup"],["이월면","iwol-myeon"],["광혜원면","gwanghyewon-myeon"],["문백면","munbaek-myeon"]],
  "chungbuk/goesan-gun": [["괴산읍","goesan-eup"],["청천면","cheongcheon-myeon"],["청안면","cheongan-myeon"],["감물면","gammul-myeon"],["연풍면","yeonpung-myeon"]],
  "chungbuk/eumseong-gun": [["음성읍","eumseong-eup"],["금왕읍","geumwang-eup"],["대소면","daeso-myeon"],["삼성면","samseong-myeon"],["맹동면","maengdong-myeon"]],
  "chungbuk/danyang-gun": [["단양읍","danyang-eup"],["매포읍","maepo-eup"],["대강면","daegang-myeon"],["가곡면","gagok-myeon"],["영춘면","yeongchun-myeon"]],

  // ===== 충남 =====
  "chungnam/geumsan-gun": [["금산읍","geumsan-eup"],["금성면","geumseong-myeon"],["제원면","jewon-myeon"],["부리면","buri-myeon"],["추부면","chubu-myeon"]],
  "chungnam/buyeo-gun": [["부여읍","buyeo-eup"],["규암면","gyuam-myeon"],["홍산면","hongsan-myeon"],["임천면","imcheon-myeon"],["은산면","eunsan-myeon"]],
  "chungnam/seocheon-gun": [["서천읍","seocheon-eup"],["장항읍","janghang-eup"],["한산면","hansan-myeon"],["마서면","maseo-myeon"],["판교면","pangyo-myeon"]],
  "chungnam/cheongyang-gun": [["청양읍","cheongyang-eup"],["정산면","jeongsan-myeon"],["운곡면","ungok-myeon"],["대치면","daechi-myeon"],["화성면","hwaseong-myeon"]],
  "chungnam/hongseong-gun": [["홍성읍","hongseong-eup"],["홍북읍","hongbuk-eup"],["광천읍","gwangcheon-eup"],["갈산면","galsan-myeon"],["결성면","gyeolseong-myeon"]],
  "chungnam/yesan-gun": [["예산읍","yesan-eup"],["삽교읍","sapgyo-eup"],["덕산면","deoksan-myeon"],["고덕면","godeok-myeon"],["신양면","sinyang-myeon"]],
  "chungnam/taean-gun": [["태안읍","taean-eup"],["안면읍","anmyeon-eup"],["소원면","sowon-myeon"],["근흥면","geunheung-myeon"],["남면","nam-myeon"]],

  // ===== 전북 =====
  "jeonbuk/wanju-gun": [["봉동읍","bongdong-eup"],["삼례읍","samnye-eup"],["용진읍","yongjin-eup"],["이서면","iseo-myeon"],["고산면","gosan-myeon"]],
  "jeonbuk/jinan-gun": [["진안읍","jinan-eup"],["마령면","maryeong-myeon"],["부귀면","bugwi-myeon"],["백운면","baegun-myeon"],["성수면","seongsu-myeon"]],
  "jeonbuk/muju-gun": [["무주읍","muju-eup"],["설천면","seolcheon-myeon"],["안성면","anseong-myeon"],["무풍면","mupung-myeon"],["적상면","jeoksang-myeon"]],
  "jeonbuk/jangsu-gun": [["장수읍","jangsu-eup"],["장계면","janggye-myeon"],["산서면","sanseo-myeon"],["번암면","beonam-myeon"],["계남면","gyenam-myeon"]],
  "jeonbuk/imsil-gun": [["임실읍","imsil-eup"],["오수면","osu-myeon"],["관촌면","gwanchon-myeon"],["강진면","gangjin-myeon"],["신덕면","sindeok-myeon"]],
  "jeonbuk/sunchang-gun": [["순창읍","sunchang-eup"],["인계면","ingye-myeon"],["쌍치면","ssangchi-myeon"],["복흥면","bokheung-myeon"],["금과면","geumgwa-myeon"]],
  "jeonbuk/gochang-gun": [["고창읍","gochang-eup"],["무장면","mujang-myeon"],["흥덕면","heungdeok-myeon"],["대산면","daesan-myeon"],["아산면","asan-myeon"]],
  "jeonbuk/buan-gun": [["부안읍","buan-eup"],["줄포면","julpo-myeon"],["변산면","byeonsan-myeon"],["진서면","jinseo-myeon"],["계화면","gyehwa-myeon"]],

  // ===== 전남 =====
  "jeonnam/damyang-gun": [["담양읍","damyang-eup"],["창평면","changpyeong-myeon"],["대전면","daejeon-myeon"],["봉산면","bongsan-myeon"],["고서면","goseo-myeon"]],
  "jeonnam/gokseong-gun": [["곡성읍","gokseong-eup"],["옥과면","okgwa-myeon"],["석곡면","seokgok-myeon"],["겸면","gyeom-myeon"],["오곡면","ogok-myeon"]],
  "jeonnam/gurye-gun": [["구례읍","gurye-eup"],["마산면","masan-myeon"],["광의면","gwangui-myeon"],["토지면","toji-myeon"],["산동면","sandong-myeon"]],
  "jeonnam/goheung-gun": [["고흥읍","goheung-eup"],["도양읍","doyang-eup"],["풍양면","pungyang-myeon"],["과역면","gwayeok-myeon"],["봉래면","bongnae-myeon"]],
  "jeonnam/boseong-gun": [["보성읍","boseong-eup"],["벌교읍","beolgyo-eup"],["조성면","joseong-myeon"],["회천면","hoecheon-myeon"],["득량면","deungnyang-myeon"]],
  "jeonnam/hwasun-gun": [["화순읍","hwasun-eup"],["능주면","neungju-myeon"],["동면","dong-myeon"],["이양면","iyang-myeon"],["춘양면","chunyang-myeon"]],
  "jeonnam/jangheung-gun": [["장흥읍","jangheung-eup"],["관산읍","gwansan-eup"],["대덕읍","daedeok-eup"],["안양면","anyang-myeon"],["용산면","yongsan-myeon"]],
  "jeonnam/gangjin-gun": [["강진읍","gangjin-eup"],["성전면","seongjeon-myeon"],["도암면","doam-myeon"],["병영면","byeongyeong-myeon"],["마량면","maryang-myeon"]],
  "jeonnam/haenam-gun": [["해남읍","haenam-eup"],["문내면","munnae-myeon"],["화원면","hwawon-myeon"],["황산면","hwangsan-myeon"],["송지면","songji-myeon"]],
  "jeonnam/yeongam-gun": [["영암읍","yeongam-eup"],["삼호읍","samho-eup"],["신북면","sinbuk-myeon"],["시종면","sijong-myeon"],["군서면","gunseo-myeon"]],
  "jeonnam/muan-gun": [["무안읍","muan-eup"],["삼향읍","samhyang-eup"],["일로읍","illo-eup"],["몽탄면","mongtan-myeon"],["청계면","cheonggye-myeon"]],
  "jeonnam/hampyeong-gun": [["함평읍","hampyeong-eup"],["학교면","hakgyo-myeon"],["손불면","sonbul-myeon"],["나산면","nasan-myeon"],["해보면","haebo-myeon"]],
  "jeonnam/yeonggwang-gun": [["영광읍","yeonggwang-eup"],["백수읍","baeksu-eup"],["홍농읍","hongnong-eup"],["법성면","beopseong-myeon"],["묘량면","myoryang-myeon"]],
  "jeonnam/jangseong-gun": [["장성읍","jangseong-eup"],["삼계면","samgye-myeon"],["황룡면","hwangnyong-myeon"],["남면","nam-myeon"],["진원면","jinwon-myeon"]],
  "jeonnam/wando-gun": [["완도읍","wando-eup"],["금일읍","geumil-eup"],["노화읍","nohwa-eup"],["청산면","cheongsan-myeon"],["신지면","sinji-myeon"]],
  "jeonnam/jindo-gun": [["진도읍","jindo-eup"],["군내면","gunnae-myeon"],["고군면","gogun-myeon"],["임회면","imhoe-myeon"],["지산면","jisan-myeon"]],
  "jeonnam/sinan-gun": [["지도읍","jido-eup"],["압해읍","aphae-eup"],["증도면","jeungdo-myeon"],["자은면","jaeun-myeon"],["안좌면","anjwa-myeon"]],

  // ===== 경북 =====
  "gyeongbuk/uiseong-gun": [["의성읍","uiseong-eup"],["단촌면","danchon-myeon"],["안계면","angye-myeon"],["봉양면","bongyang-myeon"],["비안면","bian-myeon"]],
  "gyeongbuk/cheongsong-gun": [["청송읍","cheongsong-eup"],["주왕산면","juwangsan-myeon"],["진보면","jinbo-myeon"],["파천면","pacheon-myeon"],["현동면","hyeondong-myeon"]],
  "gyeongbuk/yeongyang-gun": [["영양읍","yeongyang-eup"],["입암면","ibam-myeon"],["청기면","cheonggi-myeon"],["일월면","irwol-myeon"],["수비면","subi-myeon"]],
  "gyeongbuk/yeongdeok-gun": [["영덕읍","yeongdeok-eup"],["강구면","ganggu-myeon"],["영해면","yeonghae-myeon"],["축산면","chuksan-myeon"],["병곡면","byeonggok-myeon"]],
  "gyeongbuk/cheongdo-gun": [["청도읍","cheongdo-eup"],["화양읍","hwayang-eup"],["각남면","gangnam-myeon"],["풍각면","punggak-myeon"],["이서면","iseo-myeon"]],
  "gyeongbuk/goryeong-gun": [["대가야읍","daegaya-eup"],["개진면","gaejin-myeon"],["쌍림면","ssangnim-myeon"],["운수면","unsu-myeon"],["성산면","seongsan-myeon"]],
  "gyeongbuk/seongju-gun": [["성주읍","seongju-eup"],["선남면","seonnam-myeon"],["초전면","chojeon-myeon"],["월항면","wolhang-myeon"],["대가면","daega-myeon"]],
  "gyeongbuk/chilgok-gun": [["왜관읍","waegwan-eup"],["북삼읍","buksam-eup"],["석적읍","seokjeok-eup"],["지천면","jicheon-myeon"],["동명면","dongmyeong-myeon"]],
  "gyeongbuk/yecheon-gun": [["예천읍","yecheon-eup"],["호명읍","homyeong-eup"],["용문면","yongmun-myeon"],["감천면","gamcheon-myeon"],["풍양면","pungyang-myeon"]],
  "gyeongbuk/bonghwa-gun": [["봉화읍","bonghwa-eup"],["춘양면","chunyang-myeon"],["물야면","mulya-myeon"],["봉성면","bongseong-myeon"],["법전면","beopjeon-myeon"]],
  "gyeongbuk/uljin-gun": [["울진읍","uljin-eup"],["평해읍","pyeonghae-eup"],["후포면","hupo-myeon"],["죽변면","jukbyeon-myeon"],["기성면","giseong-myeon"]],
  "gyeongbuk/ulleung-gun": [["울릉읍","ulleung-eup"],["서면","seo-myeon"],["북면","buk-myeon"]],

  // ===== 경남 =====
  "gyeongnam/uiryeong-gun": [["의령읍","uiryeong-eup"],["가례면","garye-myeon"],["부림면","burim-myeon"],["칠곡면","chilgok-myeon"],["지정면","jijeong-myeon"]],
  "gyeongnam/haman-gun": [["가야읍","gaya-eup"],["칠원읍","chirwon-eup"],["군북면","gunbuk-myeon"],["대산면","daesan-myeon"],["함안면","haman-myeon"]],
  "gyeongnam/changnyeong-gun": [["창녕읍","changnyeong-eup"],["남지읍","namji-eup"],["영산면","yeongsan-myeon"],["대합면","daehap-myeon"],["이방면","ibang-myeon"]],
  "gyeongnam/goseong-gun": [["고성읍","goseong-eup"],["회화면","hoehwa-myeon"],["마암면","maam-myeon"],["하일면","hail-myeon"],["상리면","sangni-myeon"]],
  "gyeongnam/namhae-gun": [["남해읍","namhae-eup"],["이동면","idong-myeon"],["삼동면","samdong-myeon"],["창선면","changseon-myeon"],["미조면","mijo-myeon"]],
  "gyeongnam/hadong-gun": [["하동읍","hadong-eup"],["화개면","hwagae-myeon"],["악양면","akyang-myeon"],["진교면","jingyo-myeon"],["옥종면","okjong-myeon"]],
  "gyeongnam/sancheong-gun": [["산청읍","sancheong-eup"],["신안면","sinan-myeon"],["단성면","danseong-myeon"],["시천면","sicheon-myeon"],["생초면","saengcho-myeon"]],
  "gyeongnam/hamyang-gun": [["함양읍","hamyang-eup"],["안의면","anui-myeon"],["수동면","sudong-myeon"],["마천면","macheon-myeon"],["지곡면","jigok-myeon"]],
  "gyeongnam/geochang-gun": [["거창읍","geochang-eup"],["가조면","gajo-myeon"],["위천면","wicheon-myeon"],["마리면","mari-myeon"],["웅양면","ungyang-myeon"]],
  "gyeongnam/hapcheon-gun": [["합천읍","hapcheon-eup"],["가야면","gaya-myeon"],["야로면","yaro-myeon"],["삼가면","samga-myeon"],["초계면","chogye-myeon"]],
};

module.exports = { gunDongs };
