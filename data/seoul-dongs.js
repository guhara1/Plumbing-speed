// 서울 25개 자치구별 대표 행정동(동네) 목록.
// "OO1동, OO2동" 처럼 번호로 나뉜 행정동은 대표 1개(OO동)로 통합했습니다.
// 각 항목: [한글 동네명, URL 슬러그]
// 지역명만 바꾼 중복 페이지를 피하기 위해, 각 동 페이지 본문은 data/seoul-dong-content.js 의
// 변형 콘텐츠로 조합되어 서로 다르게 생성됩니다.

const seoulDongs = {
  "gangnam-gu": [
    ["신사동", "sinsa-dong"], ["논현동", "nonhyeon-dong"], ["압구정동", "apgujeong-dong"], ["청담동", "cheongdam-dong"],
    ["삼성동", "samseong-dong"], ["대치동", "daechi-dong"], ["역삼동", "yeoksam-dong"], ["도곡동", "dogok-dong"],
    ["개포동", "gaepo-dong"], ["세곡동", "segok-dong"], ["일원동", "ilwon-dong"], ["수서동", "suseo-dong"],
  ],
  "seocho-gu": [
    ["서초동", "seocho-dong"], ["잠원동", "jamwon-dong"], ["반포동", "banpo-dong"], ["방배동", "bangbae-dong"],
    ["양재동", "yangjae-dong"], ["내곡동", "naegok-dong"],
  ],
  "songpa-gu": [
    ["잠실동", "jamsil-dong"], ["신천동", "sincheon-dong"], ["풍납동", "pungnap-dong"], ["송파동", "songpa-dong"],
    ["석촌동", "seokchon-dong"], ["삼전동", "samjeon-dong"], ["가락동", "garak-dong"], ["문정동", "munjeong-dong"],
    ["장지동", "jangji-dong"], ["방이동", "bangi-dong"], ["오금동", "ogeum-dong"], ["거여동", "geoyeo-dong"], ["마천동", "macheon-dong"],
  ],
  "gangdong-gu": [
    ["강일동", "gangil-dong"], ["상일동", "sangil-dong"], ["명일동", "myeongil-dong"], ["고덕동", "godeok-dong"],
    ["암사동", "amsa-dong"], ["천호동", "cheonho-dong"], ["성내동", "seongnae-dong"], ["길동", "gil-dong"], ["둔촌동", "dunchon-dong"],
  ],
  "gangseo-gu": [
    ["염창동", "yeomchang-dong"], ["등촌동", "deungchon-dong"], ["화곡동", "hwagok-dong"], ["가양동", "gayang-dong"],
    ["마곡동", "magok-dong"], ["발산동", "balsan-dong"], ["공항동", "gonghang-dong"], ["방화동", "banghwa-dong"], ["개화동", "gaehwa-dong"],
  ],
  "yangcheon-gu": [
    ["목동", "mok-dong"], ["신월동", "sinwol-dong"], ["신정동", "sinjeong-dong"],
  ],
  "guro-gu": [
    ["신도림동", "sindorim-dong"], ["구로동", "guro-dong"], ["가리봉동", "garibong-dong"], ["고척동", "gocheok-dong"],
    ["개봉동", "gaebong-dong"], ["오류동", "oryu-dong"], ["궁동", "gung-dong"], ["온수동", "onsu-dong"],
    ["천왕동", "cheonwang-dong"], ["항동", "hang-dong"],
  ],
  "geumcheon-gu": [
    ["가산동", "gasan-dong"], ["독산동", "doksan-dong"], ["시흥동", "siheung-dong"],
  ],
  "yeongdeungpo-gu": [
    ["영등포동", "yeongdeungpo-dong"], ["여의도동", "yeouido-dong"], ["당산동", "dangsan-dong"], ["도림동", "dorim-dong"],
    ["문래동", "mullae-dong"], ["양평동", "yangpyeong-dong"], ["신길동", "singil-dong"], ["대림동", "daerim-dong"],
  ],
  "dongjak-gu": [
    ["노량진동", "noryangjin-dong"], ["상도동", "sangdo-dong"], ["본동", "bon-dong"], ["흑석동", "heukseok-dong"],
    ["동작동", "dongjak-dong"], ["사당동", "sadang-dong"], ["대방동", "daebang-dong"], ["신대방동", "sindaebang-dong"],
  ],
  "gwanak-gu": [
    ["봉천동", "bongcheon-dong"], ["신림동", "sillim-dong"], ["남현동", "namhyeon-dong"],
  ],
  "mapo-gu": [
    ["공덕동", "gongdeok-dong"], ["아현동", "ahyeon-dong"], ["도화동", "dohwa-dong"], ["용강동", "yonggang-dong"],
    ["대흥동", "daeheung-dong"], ["염리동", "yeomni-dong"], ["신수동", "sinsu-dong"], ["서강동", "seogang-dong"],
    ["서교동", "seogyo-dong"], ["합정동", "hapjeong-dong"], ["망원동", "mangwon-dong"], ["연남동", "yeonnam-dong"],
    ["성산동", "seongsan-dong"], ["상암동", "sangam-dong"], ["상수동", "sangsu-dong"],
  ],
  "seodaemun-gu": [
    ["충정로", "chungjeongno"], ["천연동", "cheonyeon-dong"], ["북아현동", "bukahyeon-dong"], ["홍제동", "hongje-dong"],
    ["홍은동", "hongeun-dong"], ["남가좌동", "namgajwa-dong"], ["북가좌동", "bukgajwa-dong"], ["연희동", "yeonhui-dong"],
    ["신촌동", "sinchon-dong"], ["대현동", "daehyeon-dong"], ["창천동", "changcheon-dong"],
  ],
  "eunpyeong-gu": [
    ["녹번동", "nokbeon-dong"], ["불광동", "bulgwang-dong"], ["갈현동", "galhyeon-dong"], ["구산동", "gusan-dong"],
    ["대조동", "daejo-dong"], ["응암동", "eungam-dong"], ["역촌동", "yeokchon-dong"], ["신사동", "sinsa-dong"],
    ["증산동", "jeungsan-dong"], ["수색동", "susaek-dong"], ["진관동", "jingwan-dong"],
  ],
  "jongno-gu": [
    ["청운효자동", "cheongunhyoja-dong"], ["사직동", "sajik-dong"], ["삼청동", "samcheong-dong"], ["부암동", "buam-dong"],
    ["평창동", "pyeongchang-dong"], ["무악동", "muak-dong"], ["교남동", "gyonam-dong"], ["가회동", "gahoe-dong"],
    ["종로동", "jongno-dong"], ["이화동", "ihwa-dong"], ["혜화동", "hyehwa-dong"], ["창신동", "changsin-dong"], ["숭인동", "sungin-dong"],
  ],
  "jung-gu": [
    ["소공동", "sogong-dong"], ["회현동", "hoehyeon-dong"], ["명동", "myeong-dong"], ["필동", "pil-dong"],
    ["장충동", "jangchung-dong"], ["광희동", "gwanghui-dong"], ["을지로동", "euljiro-dong"], ["신당동", "sindang-dong"],
    ["다산동", "dasan-dong"], ["약수동", "yaksu-dong"], ["청구동", "cheonggu-dong"], ["황학동", "hwanghak-dong"], ["중림동", "jungnim-dong"],
  ],
  "yongsan-gu": [
    ["후암동", "huam-dong"], ["용산동", "yongsan-dong"], ["남영동", "namyeong-dong"], ["청파동", "cheongpa-dong"],
    ["원효로동", "wonhyoro-dong"], ["효창동", "hyochang-dong"], ["용문동", "yongmun-dong"], ["한강로동", "hangangno-dong"],
    ["이촌동", "ichon-dong"], ["이태원동", "itaewon-dong"], ["한남동", "hannam-dong"], ["서빙고동", "seobinggo-dong"], ["보광동", "bogwang-dong"],
  ],
  "seongdong-gu": [
    ["왕십리동", "wangsimni-dong"], ["마장동", "majang-dong"], ["사근동", "sageun-dong"], ["행당동", "haengdang-dong"],
    ["응봉동", "eungbong-dong"], ["금호동", "geumho-dong"], ["옥수동", "oksu-dong"], ["성수동", "seongsu-dong"],
    ["송정동", "songjeong-dong"], ["용답동", "yongdap-dong"],
  ],
  "gwangjin-gu": [
    ["중곡동", "junggok-dong"], ["능동", "neung-dong"], ["구의동", "guui-dong"], ["광장동", "gwangjang-dong"],
    ["자양동", "jayang-dong"], ["화양동", "hwayang-dong"], ["군자동", "gunja-dong"],
  ],
  "dongdaemun-gu": [
    ["신설동", "sinseol-dong"], ["용두동", "yongdu-dong"], ["제기동", "jegi-dong"], ["전농동", "jeonnong-dong"],
    ["답십리동", "dapsimni-dong"], ["장안동", "jangan-dong"], ["청량리동", "cheongnyangni-dong"], ["회기동", "hoegi-dong"],
    ["휘경동", "hwigyeong-dong"], ["이문동", "imun-dong"],
  ],
  "jungnang-gu": [
    ["면목동", "myeonmok-dong"], ["상봉동", "sangbong-dong"], ["중화동", "junghwa-dong"], ["묵동", "muk-dong"],
    ["망우동", "mangu-dong"], ["신내동", "sinnae-dong"],
  ],
  "seongbuk-gu": [
    ["성북동", "seongbuk-dong"], ["돈암동", "donam-dong"], ["동소문동", "dongsomun-dong"], ["삼선동", "samseon-dong"],
    ["동선동", "dongseon-dong"], ["안암동", "anam-dong"], ["보문동", "bomun-dong"], ["정릉동", "jeongneung-dong"],
    ["길음동", "gireum-dong"], ["종암동", "jongam-dong"], ["월곡동", "wolgok-dong"], ["장위동", "jangwi-dong"], ["석관동", "seokgwan-dong"],
  ],
  "gangbuk-gu": [
    ["미아동", "mia-dong"], ["번동", "beon-dong"], ["수유동", "suyu-dong"], ["우이동", "ui-dong"],
  ],
  "dobong-gu": [
    ["쌍문동", "ssangmun-dong"], ["방학동", "banghak-dong"], ["창동", "chang-dong"], ["도봉동", "dobong-dong"],
  ],
  "nowon-gu": [
    ["월계동", "wolgye-dong"], ["공릉동", "gongneung-dong"], ["하계동", "hagye-dong"], ["중계동", "junggye-dong"], ["상계동", "sanggye-dong"],
  ],
};

module.exports = { seoulDongs };
