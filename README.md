# 스피드 배관공사 — 전국 배관공사·하수구막힘 웹사이트

전국 배관공사·하수구막힘 안내를 위한 **데이터 기반 정적 웹사이트**입니다.
콘텐츠(서비스·증상·건물 유형·지역)를 `data/`의 JS 파일로 관리하고, `build.js`가
일관된 SEO(타이틀·메타·canonical·noindex·JSON-LD)·내비게이션·CTA를 붙여
`dist/`에 순수 HTML을 생성합니다. 별도 프레임워크·빌드 의존성이 없습니다(Node.js만 필요).

## 빠른 시작

```bash
node build.js        # dist/ 에 사이트 생성
node scripts/serve.js # http://localhost:4321 에서 미리보기
# 또는
npm start            # 빌드 + 미리보기
```

## 디렉터리 구조

```
data/            # 콘텐츠 소스 (여기만 고치면 사이트가 바뀝니다)
  site.js        # 브랜드·연락처·상단/하단 메뉴
  services.js    # 배관공사 / 하수구막힘 서비스 (허브 + 세부)
  symptoms.js    # 막힘 증상별 페이지
  places.js      # 건물 유형별 페이지
  regions.js     # 전국 시·도 + 핵심 시·군·구
  depth.js       # 각 페이지의 심화 콘텐츠(고유 본문)
assets/          # style.css, main.js (그대로 dist 로 복사)
scripts/serve.js # 로컬 미리보기 서버
build.js         # 정적 사이트 생성기
dist/            # 생성 결과물 (배포 대상)
```

## 생성되는 페이지 (139개)

| 구분 | 개수 | 경로 |
|---|---|---|
| 메인 | 1 | `/` |
| 핵심 서비스 허브 | 2 | `/pipe-work/`, `/drain-clog/` |
| 배관공사 세부 | 10 | `/pipe-work/*` |
| 하수구막힘 세부 | 11 | `/drain-clog/*` |
| 막힘 증상 | 8+1 | `/symptom/`, `/symptom/*` |
| 건물 유형 | 10+1 | `/place/`, `/place/*` |
| 전국 지역(시·도) | 17+1 | `/area/`, `/area/*` |
| 핵심 시·군·구 | 60 | `/area/<시도>/<시군구>/` |
| 안내 페이지 | 7 | `/process/`, `/cost/`, `/photo-consult/`, `/emergency/`, `/cases/`, `/contact/`, `/privacy/` |
| 사이트맵(사람용) | 1 | `/sitemap-page/` |

`sitemap.xml`, `robots.txt`, `404.html`, `.nojekyll` 도 함께 생성됩니다.

## ⚠️ 배포 전 반드시 교체할 값 — `data/site.js`

현재 연락처·주소·도메인은 **플레이스홀더**입니다. 실제 값으로 바꾸세요.

```js
phone: "1600-0000",         // 실제 대표번호
phoneHref: "tel:16000000",
sms: "010-0000-0000",
email: "help@speed-plumbing.co.kr",
baseUrl: "https://www.speed-plumbing.co.kr", // 실제 도메인 (canonical/OG/sitemap 에 사용)
office: { ... }             // 실제 사무실 1곳 주소 (LocalBusiness 스키마)
```

## SEO 설계 (구성안 반영)

- **키워드 2축 분리**: 배관공사(`/pipe-work`) / 하수구막힘(`/drain-clog`). 싱크대·변기·배수구
  막힘은 하수구막힘 하위, 배관수리·교체·누수 보수는 배관공사 하위로 배치.
- **구조화 데이터(JSON-LD)**: 전 페이지 `WebPage` + `BreadcrumbList`, 서비스 페이지 `Service`,
  FAQ 있는 페이지 `FAQPage`, 홈/문의 페이지에만 `Organization` + `PlumbingService`(LocalBusiness).
  → **지역 페이지에는 LocalBusiness 를 넣지 않습니다.** (실제 사무실이 아닌 곳에 가짜 지점 스키마 금지)
- **canonical**: 모든 페이지 자기참조 canonical. 얇은 지역 조합 페이지가 필요해지면
  `layout({ canonical })` 로 상위 페이지를 가리키게 할 수 있습니다.
- **자동 noindex(구성안 17장 반영)**: 본문 가시 텍스트가 `MIN_CONTENT_CHARS`(기본 600자)
  미만이면 `index` 대상이라도 자동으로 `noindex,follow` 처리하고 `sitemap.xml` 에서 제외합니다.
  본문을 보강해 다시 빌드하면 자동으로 `index` 로 전환됩니다. 빌드 로그에 대상 페이지가 출력됩니다.
  - 네비게이션 허브·안내 페이지는 `forceIndex: true` 로 색인 유지.
  - `개인정보처리방침`·사람용 `사이트맵` 은 관례상 `noindex`.
- **중복 방지**: 지역·서비스·증상·건물 유형 각 페이지는 `data/depth.js` 에 **고유 본문**을 두어
  "이름만 바꾼 중복 페이지"를 피했습니다. 시·군·구 페이지도 지역별 특성 문구(`note`)로 도입부를 차별화.

### 정직성 원칙 (코드에 반영됨)

- 가짜 후기·허위 별점·가짜 시공 사례 없음 (`Review`/`AggregateRating` 스키마 미사용).
- "전국 1위·무조건 최저가·100% 해결" 같은 보장 문구 없음.
- 비용은 "현장 확인 후 안내" 로 일관 표기.

## 콘텐츠 추가/수정 방법

- **연락처·메뉴**: `data/site.js`
- **서비스 문구/FAQ**: `data/services.js` (+ 심화 본문 `data/depth.js` 의 `serviceDepth`)
- **증상 페이지**: `data/symptoms.js` (+ `symptomDepth`)
- **건물 유형**: `data/places.js` (+ `placeDepth`)
- **지역 추가**: `data/regions.js` 의 `provinces[].districts[]` 에 `{slug,name,note}` 추가 후 재빌드.
  구성안대로 읍·면·동은 상담 데이터가 쌓인 뒤 순차 확장하세요.

수정 후 `node build.js` 만 다시 실행하면 됩니다.

## 배포

- **GitHub Pages**: `.github/workflows/deploy.yml` 이 푸시 시 `dist/` 를 빌드·배포합니다.
  저장소 Settings → Pages → Source 를 "GitHub Actions" 로 설정하세요.
- **정적 호스팅(Netlify/Vercel/S3 등)**: 빌드 명령 `node build.js`, 배포 디렉터리 `dist`.

## 라이선스

내부 프로젝트. 무단 배포 금지.
