/* 정적 사이트 생성기
 * data/*.js 의 콘텐츠를 읽어 dist/ 에 HTML 을 생성합니다.
 * SEO(타이틀·메타·canonical·noindex·JSON-LD), 내비게이션, CTA, 사이트맵을 일관되게 처리합니다.
 * 실행: node build.js
 */
const fs = require("fs");
const path = require("path");

const { site, mainMenu, footerLinks } = require("./data/site");
const { pipeWork, drainClog } = require("./data/services");
const { symptoms } = require("./data/symptoms");
const { places } = require("./data/places");
const { regions } = require("./data/regions");
const { serviceDepth, symptomDepth, placeDepth } = require("./data/depth");
const { seoulDongs } = require("./data/seoul-dongs");
const { gyeonggiDistricts } = require("./data/gyeonggi");
const { metros } = require("./data/metros");
const { provincesDo } = require("./data/provinces-do");
const { gunDongs } = require("./data/gun-dongs");
const { composeDong } = require("./data/dong-compose");

const OUT = path.join(__dirname, "dist");
const pages = []; // {path, title, desc, noindex, changefreq, priority}

/* ---------- helpers ---------- */
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const json = (o) => JSON.stringify(o).replace(/</g, "\\u003c");
const abs = (p) => site.baseUrl + p;

function menuHtml() {
  return mainMenu
    .map((m) => {
      if (m.children) {
        const sub = m.children
          .map((c) => `<li><a href="${c.href}">${esc(c.label)}</a></li>`)
          .join("");
        return `<li><a href="${m.href}">${esc(m.label)}</a><ul class="dd">${sub}</ul></li>`;
      }
      return `<li><a href="${m.href}">${esc(m.label)}</a></li>`;
    })
    .join("");
}

function header() {
  return `
<div class="topbar"><div class="wrap">
  <span>전국 배관공사 · 하수구막힘 24시 긴급 출장</span>
  <span>상담 전화 <strong>${esc(site.phone)}</strong></span>
</div></div>
<header class="site-header"><div class="wrap header-inner">
  <a class="brand" href="/"><span class="logo">🔧</span><span>${esc(site.name)}<small>${esc(site.tagline)}</small></span></a>
  <button class="menu-toggle" aria-label="메뉴 열기" aria-expanded="false">☰</button>
  <nav aria-label="주요 메뉴"><ul class="nav">${menuHtml()}
    <li><a class="nav-cta" href="${site.phoneHref}">전화 상담</a></li>
  </ul></nav>
</div></header>`;
}

function footer() {
  const links = footerLinks
    .map((l) => `<a href="${l.href}">${esc(l.label)}</a>`)
    .join("");
  return `
<footer class="site-footer"><div class="wrap">
  <div class="footer-grid">
    <div>
      <h4>${esc(site.name)}</h4>
      <p>전국 배관공사·하수구막힘 출장 안내 · 싱크대·변기·배수구 막힘, 배관수리·교체, 누수 보수, 고압세척, 배관내시경 점검</p>
      <p>상담 전화 <a href="${site.phoneHref}"><strong>${esc(site.phone)}</strong></a><br>
      문자·사진 문의 <a href="${site.smsHref}">${esc(site.sms)}</a></p>
    </div>
    <div>
      <h4>바로가기</h4>
      <div class="footer-links">${links}</div>
    </div>
  </div>
  <div class="fine">
    ⓒ ${site.year} ${esc(site.name)}. 본 사이트의 비용·작업 내용은 현장 상황에 따라 달라질 수 있으며, 정확한 견적은 현장 확인 후 안내됩니다.
  </div>
</div></footer>`;
}

function mobileBar() {
  return `
<nav class="mobile-bar" aria-label="빠른 상담">
  <a class="primary" href="${site.phoneHref}"><span class="ic">📞</span>전화 상담</a>
  <a href="${site.smsHref}"><span class="ic">💬</span>문자 문의</a>
  <a href="/photo-consult/"><span class="ic">📷</span>사진 보내기</a>
  <a href="/area/"><span class="ic">📍</span>지역 선택</a>
  <a href="/emergency/"><span class="ic">🚑</span>긴급 출동</a>
</nav>`;
}

function ctaBand(title = "지금 상황을 알려주세요", text = "전화 상담·사진 상담으로 증상과 지역을 확인하면 작업 방향을 빠르게 안내해 드립니다.") {
  return `
<section class="cta-band">
  <h2>${esc(title)}</h2>
  <p>${esc(text)}</p>
  <div class="hero-cta">
    <a class="btn btn-call" href="${site.phoneHref}">📞 전화 상담 ${esc(site.phone)}</a>
    <a class="btn btn-out" href="/photo-consult/">📷 사진 보내기</a>
    <a class="btn btn-ghost" href="/area/">📍 지역 선택</a>
  </div>
</section>`;
}

function breadcrumb(items) {
  // items: [{label, href}]  마지막은 현재 페이지(href optional)
  const html = items
    .map((it, i) =>
      it.href && i < items.length - 1
        ? `<a href="${it.href}">${esc(it.label)}</a>`
        : `<span>${esc(it.label)}</span>`
    )
    .join(" › ");
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: abs(it.href || pages._current || "/"),
    })),
  };
  return { html: `<nav class="crumb" aria-label="위치">${html}</nav>`, schema };
}

function faqBlock(faqs) {
  if (!faqs || !faqs.length) return { html: "", schema: null };
  const html =
    `<section class="section"><h2>자주 묻는 질문</h2>` +
    faqs
      .map(
        (f) =>
          `<details class="faq"><summary>${esc(f.q)}</summary><div class="a">${esc(f.a)}</div></details>`
      )
      .join("") +
    `</section>`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return { html, schema };
}

function cardGrid(items, cols = 3) {
  return (
    `<div class="grid c${cols}">` +
    items
      .map(
        (c) =>
          `<a class="card" href="${c.href}">${c.tag ? `<span class="tag">${esc(c.tag)}</span>` : ""}<h3>${esc(c.title)}</h3>${c.text ? `<p>${esc(c.text)}</p>` : ""}</a>`
      )
      .join("") +
    `</div>`
  );
}

function chips(items) {
  return (
    `<div class="chip-grid">` +
    items.map((c) => `<a class="chip" href="${c.href}">${esc(c.label)}</a>`).join("") +
    `</div>`
  );
}

const orgSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.baseUrl,
  telephone: site.phone,
  email: site.email,
  areaServed: "KR",
});

// LocalBusiness 는 실제 사무실 1곳에만 사용 (홈·문의 페이지). 지역 페이지엔 절대 넣지 않음.
const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "PlumbingService",
  name: site.office.name,
  telephone: site.phone,
  email: site.email,
  url: site.baseUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.office.streetAddress,
    addressLocality: site.office.addressLocality,
    addressRegion: site.office.addressRegion,
    postalCode: site.office.postalCode,
    addressCountry: site.office.country,
  },
  openingHours: site.office.hours,
  areaServed: "KR",
});

function webPageSchema(p) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: p.title,
    description: p.description,
    url: abs(p.path),
    inLanguage: "ko",
    isPartOf: { "@type": "WebSite", name: site.name, url: site.baseUrl },
  };
}

/* ---------- layout ---------- */
// 본문 콘텐츠 임계값. 스펙 17장 "본문이 약한 페이지는 noindex" 규칙을 자동으로 적용합니다.
// 임계값 미만 페이지는 index 대상이라도 자동 noindex 처리하여, 얇은 페이지가 색인되는 것을 방지합니다.
const MIN_CONTENT_CHARS = 600;
function visibleText(bodyHtml) {
  return bodyHtml
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function visibleLen(bodyHtml) {
  return visibleText(bodyHtml).length;
}

function layout(p) {
  // p: {path,title,description,noindex,body,schemas,changefreq,priority}
  pages._current = p.path;
  const schemas = [webPageSchema(p), ...(p.schemas || [])].filter(Boolean);
  const ldjson = schemas
    .map((s) => `<script type="application/ld+json">${json(s)}</script>`)
    .join("\n");
  const canonical = abs(p.canonical || p.path);
  // 콘텐츠 길이 기반 자동 noindex (명시적 noindex 이거나, 임계값 미만이면 noindex)
  const text = visibleText(p.body);
  const contentLen = text.length;
  const autoThin = !p.forceIndex && contentLen < MIN_CONTENT_CHARS;
  p.noindex = p.noindex || autoThin;
  if (autoThin) layout._thin = (layout._thin || []).concat([[p.path, contentLen]]);
  // 중복 검사용 본문 텍스트 저장 (지역 페이지 대상)
  layout._text = layout._text || {};
  layout._text[p.path] = text;
  const robots = p.noindex ? "noindex,follow" : "index,follow";
  const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${site.locale}">
<meta name="theme-color" content="#0b3d63">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>">
<link rel="stylesheet" href="/assets/style.css">
${ldjson}
</head>
<body>
${header()}
<main><div class="wrap">
${p.body}
</div></main>
${footer()}
${mobileBar()}
<script src="/assets/main.js" defer></script>
</body>
</html>`;

  pages.push({
    path: p.path,
    noindex: !!p.noindex,
    changefreq: p.changefreq || "monthly",
    priority: p.priority || 0.6,
    canonical: p.canonical || null,
  });
  writeFile(p.path, html);
}

function writeFile(routePath, html) {
  const rel = routePath === "/" ? "index.html" : routePath.replace(/^\//, "").replace(/\/$/, "") + "/index.html";
  const full = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
}

/* ============================================================
 *  PAGE BUILDERS
 * ============================================================ */

/* ---- Home ---- */
function buildHome() {
  const services = [
    ["/pipe-work/", "배관공사", "배관수리·교체·누수 보수"],
    ["/drain-clog/", "하수구막힘", "싱크대·변기·배수구 막힘"],
    ["/drain-clog/sink/", "싱크대막힘", "기름때·음식물 배관"],
    ["/drain-clog/toilet/", "변기막힘", "물티슈·이물질"],
    ["/drain-clog/bathroom-drain/", "욕실 배수구막힘", "머리카락·비누때"],
    ["/drain-clog/commercial-drain/", "상가 하수구막힘", "바닥 배수·공용관"],
    ["/drain-clog/restaurant-drain/", "식당 하수구막힘", "기름때·그리스트랩"],
    ["/drain-clog/high-pressure-cleaning/", "고압세척", "관벽 오염 제거"],
    ["/pipe-work/pipe-camera-inspection/", "배관내시경", "내부 촬영 진단"],
    ["/pipe-work/leak-repair/", "누수 배관 보수", "누수탐지·최소 개봉"],
    ["/pipe-work/replacement/", "배관교체", "노후·반복 누수"],
    ["/pipe-work/repair/", "긴급 배관수리", "이음부·부분 파손"],
  ].map(([href, title, text]) => ({ href, title, text, tag: href.startsWith("/pipe") ? "배관공사" : "하수구막힘" }));

  const sym = symptoms.items.map((s) => ({ href: symptoms.base + s.slug + "/", label: s.name }));
  const placeChips = places.items.map((pl) => ({ href: places.base + pl.slug + "/", label: pl.name }));
  const areaChips = regions.provinces.map((r) => ({ href: regions.base + r.slug + "/", label: r.name }));

  const checklist = [
    "물이 어느 위치에서 막히나요? (싱크대·변기·욕실·베란다)",
    "물이 역류하나요, 천천히 내려가나요?",
    "악취가 함께 올라오나요?",
    "최근에 기름·음식물·물티슈·머리카락이 들어갔나요?",
    "이전에 같은 위치가 반복해서 막혔나요?",
    "상가·식당이라면 영업 중 작업이 필요한가요?",
    "배관이 오래되었거나 누수가 의심되나요?",
    "사진이나 영상을 보낼 수 있나요?",
    "야간·주말 출동이 필요한가요?",
  ];

  const body = `
<section class="hero" style="margin:-34px -18px 0;border-radius:0">
  <div class="wrap" style="padding:0 18px">
    <div class="badges">
      <span class="badge">전국 출장</span><span class="badge">24시 긴급</span>
      <span class="badge">사진 상담</span><span class="badge">배관내시경·고압세척</span>
    </div>
    <h1>전국 배관공사 · 하수구막힘 긴급 출장 안내</h1>
    <p class="lead">싱크대막힘, 변기막힘, 욕실 배수구막힘, 상가 하수구막힘, 노후 배관교체, 누수 배관 보수, 고압세척, 배관내시경 점검까지 현장 상황에 맞는 작업 기준을 안내합니다.</p>
    <div class="hero-cta">
      <a class="btn btn-call" href="${site.phoneHref}">📞 전화 상담 ${esc(site.phone)}</a>
      <a class="btn btn-line" href="/photo-consult/">📷 사진 보내기</a>
      <a class="btn btn-ghost" href="/drain-clog/">하수구막힘 확인</a>
      <a class="btn btn-ghost" href="/pipe-work/">배관공사 확인</a>
    </div>
  </div>
</section>

<section class="section">
  <h2>배관공사와 하수구막힘은 원인 확인이 먼저입니다</h2>
  <div class="lead-block prose">
    <p>물이 천천히 내려가는 단순 막힘인지, 기름때와 이물질이 쌓인 배관 문제인지, 노후 배관 파손인지, 외부 하수관 문제인지에 따라 작업 방식이 크게 달라집니다. 현장에서는 증상, 사용 장소, 배관 위치, 역류 여부, 악취 여부, 반복 막힘 여부를 확인한 뒤 장비와 작업 범위를 정합니다. 무리하게 뚫기부터 시도하기보다 원인을 먼저 확인하는 것이 재발과 불필요한 비용을 줄이는 길입니다.</p>
  </div>
</section>

<section class="section">
  <h2>주요 서비스 안내</h2>
  ${cardGrid(services, 4)}
</section>

<section class="section">
  <h2>증상별로 확인하세요</h2>
  <p class="prose">지금 겪는 증상을 선택하면 원인과 확인 방법, 관련 서비스로 이동합니다.</p>
  ${chips(sym)}
</section>

<section class="section">
  <h2>건물 유형별 작업 기준</h2>
  <p class="prose">건물 유형에 따라 배관 구조와 책임 구분이 달라 내용을 다르게 안내합니다.</p>
  ${chips(placeChips)}
</section>

<section class="section">
  <h2>전국 지역별 배관공사·하수구막힘 안내</h2>
  <p class="prose">시·도를 선택하면 핵심 시·군·구별 안내로 이동합니다.</p>
  ${chips(areaChips)}
</section>

${ctaBand()}

<section class="section">
  <h2>작업 전 확인해야 할 내용</h2>
  <div class="callout"><strong>아래 항목을 미리 확인하면 상담이 빨라집니다.</strong> 정확한 상담을 위해 증상 사진이나 영상을 함께 보내주시면 작업 방향을 안내하기 쉽습니다.</div>
  <ul class="checklist">${checklist.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
</section>
`;

  const faq = faqBlock([
    { q: "전국 배관공사 출장이 가능한가요?", a: "지역, 작업 내용, 현장 상황에 따라 가능 여부를 확인합니다. 정확한 주소와 증상 사진을 보내면 작업 가능 범위를 안내하기 쉽습니다." },
    { q: "하수구막힘은 바로 뚫을 수 있나요?", a: "단순 이물질 막힘은 비교적 빠르게 해결될 수 있지만, 기름때 누적·공용 배관 문제·노후 배관 손상·외부 하수관 문제라면 추가 점검이 필요할 수 있습니다." },
    { q: "사진을 보내면 견적이 가능한가요?", a: "증상 사진, 배수 위치, 물이 역류하는 영상, 건물 유형을 보내면 대략적인 작업 방향을 안내할 수 있습니다. 단, 정확한 비용은 현장 확인 후 달라질 수 있습니다." },
    { q: "비용은 어떻게 정해지나요?", a: "막힌 위치, 작업 난이도, 장비 사용 여부, 배관 길이, 야간·주말 여부, 현장 접근성에 따라 달라질 수 있습니다." },
  ]);

  layout({
    path: "/",
    title: "전국 배관공사·하수구막힘｜싱크대·변기·배수구 막힘 긴급 출장",
    description:
      "전국 배관공사와 하수구막힘 출장 서비스를 안내합니다. 싱크대막힘, 변기막힘, 욕실 배수구, 상가 하수관, 배관교체, 누수탐지, 고압세척, 배관내시경 점검 기준을 확인하세요.",
    body: body + faq.html,
    schemas: [orgSchema(), localBusinessSchema(), faq.schema],
    changefreq: "weekly",
    priority: 1.0,
  });
}

/* ---- Service hub (pipe-work / drain-clog) ---- */
function buildServiceHub(group, label) {
  const h = group.hub;
  const bc = breadcrumb([{ label: "홈", href: "/" }, { label }]);
  const itemCards = group.items.map((it) => ({
    href: group.base + it.slug + "/",
    title: it.name,
    text: it.title.split("｜")[1] || "",
    tag: label,
  }));
  const sections = h.sections
    .map((s) => `<section class="section"><h2>${esc(s.h2)}</h2><div class="prose"><p>${esc(s.body)}</p></div></section>`)
    .join("");
  const faq = faqBlock(h.faqs);

  const body = `
${bc.html}
<h1>${esc(h.h1)}</h1>
<div class="lead-block prose"><p>${esc(h.intro)}</p></div>
${sections}
<section class="section"><h2>세부 서비스 바로가기</h2>${cardGrid(itemCards, 3)}</section>
${ctaBand()}
${faq.html}
`;
  layout({
    path: group.base,
    title: h.title,
    description: h.description,
    body,
    schemas: [
      bc.schema,
      { "@context": "https://schema.org", "@type": "Service", name: label, serviceType: label, areaServed: "KR", provider: { "@type": "Organization", name: site.name } },
      faq.schema,
    ],
    changefreq: "weekly",
    priority: 0.9,
  });
}

/* ---- Service detail item ---- */
function buildServiceItem(group, groupLabel, it) {
  const p = group.base + it.slug + "/";
  const bc = breadcrumb([{ label: "홈", href: "/" }, { label: groupLabel, href: group.base }, { label: it.name }]);
  const causes = it.causes
    ? `<section class="section"><h2>주요 원인</h2><ul class="pill-list">${it.causes.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></section>`
    : "";
  const proc = it.process
    ? `<section class="section"><h2>작업 진행 순서</h2><ol class="steps">${it.process.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></section>`
    : "";
  // 심화 콘텐츠 (항목별 고유)
  const dep = serviceDepth[it.slug];
  const depthSections = dep
    ? dep.sections.map((s) => `<section class="section"><h2>${esc(s.h2)}</h2><div class="prose"><p>${esc(s.body)}</p></div></section>`).join("") +
      (dep.tips ? `<section class="section"><h2>이렇게 하면 도움이 됩니다</h2><ul class="checklist">${dep.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></section>` : "")
    : "";
  // 관련 증상/서비스 내부링크
  let related = "";
  if (it.relatedSymptoms) {
    const chipItems = it.relatedSymptoms
      .map((slug) => symptoms.items.find((s) => s.slug === slug))
      .filter(Boolean)
      .map((s) => ({ href: symptoms.base + s.slug + "/", label: s.name }));
    related = `<section class="section related"><h2>관련 증상 확인</h2>${chips(chipItems)}</section>`;
  }
  const faq = faqBlock(it.faqs);

  const body = `
${bc.html}
<h1>${esc(it.h1)}</h1>
<div class="lead-block prose"><p>${esc(it.intro)}</p></div>
${causes}
${depthSections}
${proc}
<section class="section">
  <div class="callout"><strong>작업 전 확인하면 좋은 내용</strong><br>막힌 위치, 물이 역류하는지 또는 천천히 내려가는지, 악취·반복 여부, 건물 유형을 알려주시고 가능하면 증상 사진을 함께 보내주세요.</div>
</section>
${related}
${ctaBand(esc(it.name) + " 상담이 필요하신가요?")}
${faq.html}
<section class="section related"><h2>관련 서비스</h2>${chips([{ href: group.base, label: groupLabel + " 전체" }, { href: "/cost/", label: "비용 안내" }, { href: "/process/", label: "작업 과정" }, { href: "/area/", label: "지역 선택" }])}</section>
`;
  layout({
    path: p,
    title: it.title,
    description: it.description,
    body,
    schemas: [
      bc.schema,
      { "@context": "https://schema.org", "@type": "Service", name: it.name, serviceType: it.name, areaServed: "KR", provider: { "@type": "Organization", name: site.name } },
      faq.schema,
    ],
    changefreq: "monthly",
    priority: 0.8,
  });
}

/* ---- Symptom hub + items ---- */
function buildSymptomHub() {
  const h = symptoms.hub;
  const bc = breadcrumb([{ label: "홈", href: "/" }, { label: "막힘 증상" }]);
  const cards = symptoms.items.map((s) => ({ href: symptoms.base + s.slug + "/", title: s.name, text: s.title.split("｜")[1] || "", tag: "증상" }));
  const body = `
${bc.html}
<h1>${esc(h.h1)}</h1>
<div class="lead-block prose"><p>${esc(h.intro)}</p></div>
<section class="section">${cardGrid(cards, 3)}</section>
${ctaBand()}
`;
  layout({ path: symptoms.base, title: h.title, description: h.description, body, schemas: [bc.schema], changefreq: "monthly", priority: 0.7, forceIndex: true });
}

function buildSymptomItem(s) {
  const p = symptoms.base + s.slug + "/";
  const bc = breadcrumb([{ label: "홈", href: "/" }, { label: "막힘 증상", href: symptoms.base }, { label: s.name }]);
  const checks = `<section class="section"><h2>이렇게 확인해 보세요</h2><ul class="checklist">${s.checks.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></section>`;
  const note = `<div class="callout"><strong>원인 구분</strong><br>${esc(s.causeNote)}</div>`;
  const rel = chips(s.relatedServices.map(([href, label]) => ({ href, label })));
  const dep = symptomDepth[s.slug];
  const detailBlock = dep
    ? `<section class="section"><h2>왜 이런 증상이 생길까요</h2><div class="prose"><p>${esc(dep.detail)}</p></div></section>` +
      (dep.mistakes ? `<section class="section"><h2>이런 실수를 피하세요</h2><ul class="pill-list">${dep.mistakes.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></section>` : "")
    : "";
  const body = `
${bc.html}
<h1>${esc(s.h1)}</h1>
<div class="lead-block prose"><p>${esc(s.intro)}</p></div>
${detailBlock}
${checks}
<section class="section">${note}</section>
<section class="section related"><h2>관련 서비스</h2>${rel}</section>
${ctaBand("이 증상, 원인부터 확인하세요")}
`;
  layout({ path: p, title: s.title, description: s.description, body, schemas: [bc.schema], changefreq: "monthly", priority: 0.7 });
}

/* ---- Place hub + items ---- */
function buildPlaceHub() {
  const h = places.hub;
  const bc = breadcrumb([{ label: "홈", href: "/" }, { label: "건물 유형" }]);
  const cards = places.items.map((pl) => ({ href: places.base + pl.slug + "/", title: pl.name, text: pl.title.split("｜")[1] || "", tag: "건물 유형" }));
  const body = `
${bc.html}
<h1>${esc(h.h1)}</h1>
<div class="lead-block prose"><p>${esc(h.intro)}</p></div>
<section class="section">${cardGrid(cards, 3)}</section>
${ctaBand()}
`;
  layout({ path: places.base, title: h.title, description: h.description, body, schemas: [bc.schema], changefreq: "monthly", priority: 0.7, forceIndex: true });
}

function buildPlaceItem(pl) {
  const p = places.base + pl.slug + "/";
  const bc = breadcrumb([{ label: "홈", href: "/" }, { label: "건물 유형", href: places.base }, { label: pl.name }]);
  const points = `<section class="section"><h2>${esc(pl.name)} 배관·하수구막힘 확인 포인트</h2><ul class="pill-list">${pl.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>`;
  const dep = placeDepth[pl.slug];
  const depthSections = dep
    ? dep.sections.map((s) => `<section class="section"><h2>${esc(s.h2)}</h2><div class="prose"><p>${esc(s.body)}</p></div></section>`).join("") +
      (dep.checklist ? `<section class="section"><h2>상담 전 이렇게 정리해 주세요</h2><ul class="checklist">${dep.checklist.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></section>` : "")
    : "";
  const faq = faqBlock([
    { q: `${pl.name} 배관·하수구막힘도 출장이 가능한가요?`, a: "지역과 현장 상황에 따라 가능 여부를 확인합니다. 증상과 위치, 건물 유형을 알려주시고 사진을 보내주시면 안내가 빠릅니다." },
    { q: "공용배관 문제인지 어떻게 아나요?", a: "여러 세대·점포가 동시에 겪거나 아래층까지 영향이 있으면 공용배관 문제일 가능성이 큽니다. 계통을 확인해 구분합니다." },
  ]);
  const rel = chips(pl.relatedServices.map(([href, label]) => ({ href, label })));
  const body = `
${bc.html}
<h1>${esc(pl.h1)}</h1>
<div class="lead-block prose"><p>${esc(pl.intro)}</p></div>
${points}
${depthSections}
<section class="section related"><h2>관련 서비스</h2>${rel}</section>
${ctaBand(esc(pl.name) + " 배관·하수구막힘 상담")}
${faq.html}`;
  layout({ path: p, title: pl.title, description: pl.description, body, schemas: [bc.schema, faq.schema], changefreq: "monthly", priority: 0.7 });
}

/* ---- Area hub + province + district ---- */
function buildAreaHub() {
  const h = regions.hub;
  const bc = breadcrumb([{ label: "홈", href: "/" }, { label: "전국 지역" }]);
  const cards = regions.provinces.map((r) => ({ href: regions.base + r.slug + "/", title: r.name, text: r.districts.length ? `${r.districts.map((d) => d.name).slice(0, 3).join(" · ")} 등` : "지역 안내", tag: "지역" }));
  const body = `
${bc.html}
<h1>${esc(h.h1)}</h1>
<div class="lead-block prose"><p>${esc(h.intro)}</p></div>
<section class="section">${cardGrid(cards, 4)}</section>
${ctaBand()}
`;
  layout({ path: regions.base, title: h.title, description: h.description, body, schemas: [bc.schema], changefreq: "monthly", priority: 0.7, forceIndex: true });
}

const areaFaq = (scope) => [
  { q: `${scope} 배관공사·하수구막힘 출장이 가능한가요?`, a: "지역, 작업 내용, 현장 상황에 따라 가능 여부를 확인합니다. 정확한 주소와 증상 사진을 보내면 작업 가능 범위를 안내하기 쉽습니다." },
  { q: "여러 곳이 동시에 막혔어요.", a: "공용 배관 또는 외부 하수관 문제일 가능성이 높습니다. 세대 내부만이 아니라 계통 전체를 확인해야 재발을 줄일 수 있습니다." },
  { q: "사진을 보내면 견적이 가능한가요?", a: "대략적인 작업 방향은 안내할 수 있습니다. 정확한 비용은 현장 확인 후 달라질 수 있습니다." },
];

function buildProvince(r) {
  const p = regions.base + r.slug + "/";
  const bc = breadcrumb([{ label: "홈", href: "/" }, { label: "전국 지역", href: regions.base }, { label: r.name }]);
  const districtCards = r.districts.length
    ? `<section class="section"><h2>${esc(r.name)} 시·군·구별 안내</h2>${cardGrid(
        r.districts.map((d) => ({ href: p + d.slug + "/", title: d.name, text: "배관공사·하수구막힘 안내", tag: r.name })),
        3
      )}</section>`
    : `<section class="section"><div class="callout">${esc(r.fullName)}의 시·군·구별 세부 페이지는 상담 데이터가 쌓이는 대로 순차적으로 확장합니다. 지금도 <a href="${site.phoneHref}">전화 상담</a>과 사진 상담으로 안내가 가능합니다.</div></section>`;
  // 시·도 페이지도 조합형 고유 본문 사용(도별 note 로 도입부 차별화)
  const composed = composeDong("prov|" + r.slug, r.name, "전국");
  const composedSections = composed.sections
    .map((s) => `<section class="section"><h2>${esc(s.h2)}</h2><div class="prose"><p>${esc(s.body)}</p></div></section>`)
    .join("");
  const faq = faqBlock(areaFaq(r.name).concat([composed.faqExtra]));
  const body = `
${bc.html}
<h1>${esc(r.fullName)} 배관공사·하수구막힘 안내</h1>
<div class="lead-block prose"><p>${esc(r.note)} ${esc(composed.intro)}</p></div>
${districtCards}
${composedSections}
${ctaBand(esc(r.name) + " 배관공사·하수구막힘 상담")}
${faq.html}
<section class="section related"><h2>주요 서비스 바로가기</h2>${chips([{ href: "/pipe-work/", label: "배관공사" }, { href: "/drain-clog/", label: "하수구막힘" }, { href: "/cost/", label: "비용 안내" }, { href: "/emergency/", label: "긴급 출동" }])}</section>
`;
  // 지역 페이지엔 LocalBusiness 를 넣지 않음(가짜 지점 방지). WebPage + Breadcrumb + FAQ 만.
  layout({ path: p, title: r.title, description: r.description, body, schemas: [bc.schema, faq.schema], changefreq: "monthly", priority: 0.6 });
}

// 결정적 해시(같은 슬러그 → 항상 같은 결과, 빌드 재현성 보장)
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h;
}
function fill(str, dong, gu) {
  return str.replace(/\{D\}/g, dong).replace(/\{G\}/g, gu);
}
function areaCrumbs(r, ancestors) {
  const items = [
    { label: "홈", href: "/" },
    { label: "전국 지역", href: regions.base },
    { label: r.name, href: regions.base + r.slug + "/" },
  ];
  let acc = regions.base + r.slug + "/";
  for (const c of ancestors) {
    acc += c.slug + "/";
    items.push({ label: c.name, href: acc });
  }
  return items;
}

// 지역 상위 노드(시/군/구) 페이지: 하위 목록(구 또는 동)을 렌더하고 하위를 재귀 생성.
// ancestors: province 아래 ~ 이 노드 바로 위까지의 [{name,slug}] (이 노드 제외)
// siblings: 같은 레벨 형제 노드 배열(주변 지역 링크용)
function buildAreaNode(r, ancestors, node, siblings) {
  const chain = ancestors.concat([{ name: node.name, slug: node.slug }]);
  const base = regions.base + r.slug + "/" + chain.map((c) => c.slug).join("/") + "/";
  const scope = r.name + " " + chain.map((c) => c.name).join(" ");
  const crumbItems = areaCrumbs(r, ancestors).concat([{ label: node.name }]);
  const bc = breadcrumb(crumbItems);

  // 하위(구 또는 동) 목록 섹션
  let childSection = "";
  if (node.subDistricts && node.subDistricts.length) {
    childSection = `<section class="section"><h2>${esc(node.name)} 행정구 안내</h2>
<p class="prose">${esc(node.name)}의 행정구를 선택하면 해당 구의 동네별 안내로 이동합니다.</p>
${chips(node.subDistricts.map((sd) => ({ href: base + sd.slug + "/", label: sd.name })))}</section>`;
  } else if (node.dongs && node.dongs.length) {
    childSection = `<section class="section"><h2>${esc(node.name)} 동네별 안내</h2>
<p class="prose">${esc(node.name)} 내 동네를 선택하면 해당 지역 배관공사·하수구막힘 안내로 이동합니다. (OO1동·2동 등은 대표 동으로 통합했습니다.)</p>
${chips(node.dongs.map(([name, slug]) => ({ href: base + slug + "/", label: name })))}</section>`;
  }

  // 형제(주변 지역) 링크
  const sibBase = regions.base + r.slug + "/" + (ancestors.length ? ancestors.map((c) => c.slug).join("/") + "/" : "");
  const nearby = (siblings || []).filter((x) => x.slug !== node.slug).slice(0, 8);
  const nearLabel = ancestors.length ? esc(ancestors[ancestors.length - 1].name) + " 주변" : esc(r.name) + " 주변 지역";
  const nearbyChips = nearby.length
    ? `<section class="section related"><h2>${nearLabel}</h2>${chips(nearby.map((x) => ({ href: sibBase + x.slug + "/", label: x.name })))}</section>`
    : "";

  const parentLinks = ancestors.length
    ? chips(ancestors.map((c, i) => ({ href: regions.base + r.slug + "/" + ancestors.slice(0, i + 1).map((a) => a.slug).join("/") + "/", label: c.name + " 전체" })))
    : "";

  // 지역명만 바꾼 중복을 피하기 위해, 상위 노드(시/구)도 조합형 고유 본문을 사용.
  // {G} 토큰 = 직속 상위(구가 있으면 시, 없으면 시·도)
  const parentName = ancestors.length ? ancestors[ancestors.length - 1].name : r.name;
  const composed = composeDong("node|" + r.slug + "/" + chain.map((c) => c.slug).join("/"), node.name, parentName);
  const introText = (node.note ? esc(node.note) + " " : "") + esc(composed.intro);
  const composedSections = composed.sections
    .map((s) => `<section class="section"><h2>${esc(s.h2)}</h2><div class="prose"><p>${esc(s.body)}</p></div></section>`)
    .join("");
  const faqNode = faqBlock(areaFaq(scope).concat([composed.faqExtra]));

  const body = `
${bc.html}
<h1>${esc(scope)} 배관공사·하수구막힘 안내</h1>
<div class="lead-block prose"><p>${introText}</p></div>
${childSection}
${composedSections}
<section class="section"><h2>${esc(scope)} 서비스 바로가기</h2>${chips([{ href: "/drain-clog/sink/", label: "싱크대막힘" }, { href: "/drain-clog/toilet/", label: "변기막힘" }, { href: "/drain-clog/bathroom-drain/", label: "욕실 배수구막힘" }, { href: "/drain-clog/high-pressure-cleaning/", label: "고압세척" }, { href: "/pipe-work/pipe-camera-inspection/", label: "배관내시경" }, { href: "/pipe-work/leak-repair/", label: "누수 배관 보수" }])}</section>
${ctaBand(esc(scope) + " 배관공사·하수구막힘 상담")}
${faqNode.html}
${nearbyChips}
${parentLinks ? `<section class="section related"><h2>상위 지역</h2>${parentLinks}</section>` : ""}
<section class="section related"><h2>주요 서비스 바로가기</h2>${chips([{ href: "/pipe-work/", label: "배관공사" }, { href: "/drain-clog/", label: "하수구막힘" }, { href: "/cost/", label: "비용 안내" }, { href: "/process/", label: "작업 과정" }])}</section>
`;
  const title = `${scope} 배관공사·하수구막힘｜싱크대·변기·배수구 막힘 출장`;
  const desc = `${scope} 배관공사·하수구막힘 출장 안내입니다. 싱크대·변기·욕실 배수구 막힘, 배관수리·교체, 고압세척, 배관내시경 기준을 확인하세요.`;
  const priority = ancestors.length ? 0.5 : 0.55;
  layout({ path: base, title, description: desc.slice(0, 155), body, schemas: [bc.schema, faqNode.schema], changefreq: "monthly", priority });

  // 하위 재귀 생성
  if (node.subDistricts && node.subDistricts.length) {
    node.subDistricts.forEach((sd) => buildAreaNode(r, chain, sd, node.subDistricts));
  } else if (node.dongs && node.dongs.length) {
    node.dongs.forEach((dong) => buildDong(r, ancestors, node, dong));
  }
}

// 지역 리프(동) 페이지 - 임의 상위 체인 지원 (서울: 구>동, 경기: 시>구>동 또는 시>동).
// ancestors: node(=parent) 위 상위 체인, parent: 직속 부모 노드(dongs 보유)
function buildDong(r, ancestors, parent, dong) {
  const [dName, dSlug] = dong;
  const chain = ancestors.concat([{ name: parent.name, slug: parent.slug }]);
  const parentBase = regions.base + r.slug + "/" + chain.map((c) => c.slug).join("/") + "/";
  const p = parentBase + dSlug + "/";
  const scope = r.name + " " + chain.map((c) => c.name).join(" ") + " " + dName;
  const g = parent.name; // {G} 토큰 = 직속 상위(구 또는 시)
  const seed = hashStr(r.slug + "|" + chain.map((c) => c.slug).join("|") + "|" + dSlug);
  const bc = breadcrumb(areaCrumbs(r, chain).concat([{ label: dName }]));

  // 조합형 고유 본문 생성 (문장 슬롯 조합 + 테마 선택/순서)
  const composed = composeDong(r.slug + "/" + chain.map((c) => c.slug).join("/") + "/" + dSlug, dName, g);
  const intro = composed.intro;
  const sectionsHtml = composed.sections
    .map((s) => `<section class="section"><h2>${esc(s.h2)}</h2><div class="prose"><p>${esc(s.body)}</p></div></section>`)
    .join("");
  const faq = faqBlock(areaFaq(scope).concat([composed.faqExtra]));

  const others = parent.dongs.filter(([, s]) => s !== dSlug);
  const start = seed % Math.max(1, others.length);
  const nearby = others.slice(start).concat(others.slice(0, start)).slice(0, 8);
  const nearbyChips = nearby.length
    ? `<section class="section related"><h2>${esc(parent.name)} 주변 동네</h2>${chips(nearby.map(([name, s]) => ({ href: parentBase + s + "/", label: name })))}</section>`
    : "";

  const body = `
${bc.html}
<h1>${esc(scope)} 배관공사·하수구막힘 안내</h1>
<div class="lead-block prose"><p>${esc(intro)}</p></div>
${sectionsHtml}
${ctaBand(esc(scope) + " 배관공사·하수구막힘 상담")}
${faq.html}
${nearbyChips}
<section class="section related"><h2>${esc(parent.name)} 전체 · 주요 서비스</h2>${chips([{ href: parentBase, label: parent.name + " 전체" }, { href: "/pipe-work/", label: "배관공사" }, { href: "/drain-clog/", label: "하수구막힘" }, { href: "/cost/", label: "비용 안내" }])}</section>
`;
  const title = `${scope} 배관공사·하수구막힘｜싱크대·변기·배수구 막힘 출장`;
  const desc = `${scope} 배관공사·하수구막힘 출장 안내. 싱크대·변기·욕실 배수구 막힘, 배관수리·교체, 누수, 고압세척, 배관내시경 점검 기준을 확인하세요.`;
  // 지역 페이지엔 LocalBusiness 미포함(가짜 지점 방지). WebPage + Breadcrumb + FAQ 만.
  layout({ path: p, title, description: desc.slice(0, 155), body, schemas: [bc.schema, faq.schema], changefreq: "monthly", priority: 0.5 });
}

/* ---- Static pages ---- */
function staticPage({ path: p, title, description, h1, crumb, bodyMain, faqs, priority = 0.6, extraSchema, noindex, forceIndex }) {
  const bc = breadcrumb([{ label: "홈", href: "/" }, { label: crumb }]);
  const faq = faqBlock(faqs);
  const body = `
${bc.html}
<h1>${esc(h1)}</h1>
${bodyMain}
${ctaBand()}
${faq.html}
`;
  layout({ path: p, title, description, body, schemas: [bc.schema, faq.schema, extraSchema].filter(Boolean), priority, noindex, forceIndex });
}

function buildStaticPages() {
  // 작업 과정
  staticPage({
    path: "/process/",
    forceIndex: true,
    title: "작업 과정｜배관공사·하수구막힘 진행 순서 안내",
    description: "상담부터 현장 확인, 원인 진단, 작업, 마무리 확인까지 배관공사·하수구막힘 작업 진행 순서를 안내합니다.",
    h1: "작업 과정 · 상담부터 마무리까지",
    crumb: "작업 과정",
    bodyMain: `
<div class="lead-block prose"><p>스피드 배관공사는 무리하게 작업부터 시작하지 않고, 원인을 확인한 뒤 필요한 작업만 진행하는 것을 원칙으로 합니다. 아래는 일반적인 진행 순서입니다. 현장 상황에 따라 단계가 조정될 수 있습니다.</p></div>
<section class="section"><ol class="steps">
  <li><strong>전화·사진 상담</strong> — 증상, 막힌 위치, 역류·악취·반복 여부, 건물 유형을 확인합니다.</li>
  <li><strong>현장 확인</strong> — 배관 위치와 구조, 재질, 노후 여부를 점검합니다.</li>
  <li><strong>원인 진단</strong> — 필요 시 배관내시경으로 내부 상태를 확인합니다.</li>
  <li><strong>작업 범위·방법 안내</strong> — 뚫음·고압세척·보수·교체 중 필요한 작업과 비용 기준을 설명합니다.</li>
  <li><strong>작업 진행</strong> — 동의된 범위 안에서 작업합니다.</li>
  <li><strong>마무리 확인</strong> — 배수·누수 상태를 함께 확인하고 재발 방지 방향을 안내합니다.</li>
</ol></section>`,
    faqs: [
      { q: "작업 전에 비용을 알 수 있나요?", a: "현장 확인 후 작업 범위와 함께 비용 기준을 안내합니다. 동의 후 작업을 시작합니다." },
      { q: "원인만 확인하고 결정해도 되나요?", a: "네. 진단 후 작업 여부를 결정하실 수 있습니다." },
    ],
    priority: 0.6,
  });

  // 비용 안내
  staticPage({
    path: "/cost/",
    forceIndex: true,
    title: "비용 안내｜배관공사·하수구막힘 비용이 달라지는 기준",
    description: "막힌 위치, 작업 난이도, 장비 사용, 배관 길이, 야간·주말 여부 등 배관공사·하수구막힘 비용이 달라지는 기준을 안내합니다.",
    h1: "비용 안내 · 무엇에 따라 달라지나요",
    crumb: "비용 안내",
    bodyMain: `
<div class="lead-block prose"><p>배관공사·하수구막힘 비용은 정해진 하나의 금액이 아니라 현장 상황에 따라 달라집니다. 아래 요소들이 비용에 영향을 줍니다. 허위 최저가·무조건 정액 안내 대신, 현장을 확인하고 정직하게 안내하는 것을 원칙으로 합니다.</p></div>
<section class="section"><h2>비용에 영향을 주는 요소</h2><ul class="pill-list">
  <li>막힌 위치 (싱크대·변기·욕실·외부 하수관 등)</li>
  <li>작업 난이도와 접근성</li>
  <li>사용 장비 (관통 장비·고압세척·배관내시경)</li>
  <li>배관 길이와 구간</li>
  <li>단순 막힘인지, 세척·보수·교체가 필요한지</li>
  <li>야간·주말·긴급 출동 여부</li>
</ul></section>
<section class="section"><div class="callout"><strong>정확한 비용은 현장 확인 후 안내됩니다.</strong> 증상 사진과 위치를 미리 보내주시면 대략적인 작업 방향을 먼저 안내해 드릴 수 있습니다.</div></section>`,
    faqs: [
      { q: "전화로 정확한 금액을 알 수 있나요?", a: "현장 상황에 따라 달라져 전화만으로 확정하기 어렵습니다. 사진 상담으로 방향을 먼저 안내합니다." },
      { q: "추가 비용이 갑자기 생기지 않나요?", a: "작업 전 범위와 기준을 설명하고 동의 후 진행합니다. 범위가 달라지면 다시 안내합니다." },
    ],
    priority: 0.6,
  });

  // 사진 상담
  staticPage({
    path: "/photo-consult/",
    forceIndex: true,
    title: "사진 상담｜증상 사진·영상으로 빠른 안내",
    description: "증상 사진과 영상, 배수 위치, 건물 유형을 보내면 배관공사·하수구막힘 작업 방향을 빠르게 안내받을 수 있습니다.",
    h1: "사진 상담 · 증상 사진으로 빠르게",
    crumb: "사진 상담",
    bodyMain: `
<div class="lead-block prose"><p>말로 설명하기 어려운 배관·하수구 문제는 사진과 영상이 가장 빠릅니다. 아래 내용을 문자로 보내주시면 작업 방향을 안내해 드립니다. 단, 정확한 비용과 작업은 현장 확인 후 달라질 수 있습니다.</p></div>
<section class="section"><h2>이렇게 보내주세요</h2><ul class="checklist">
  <li>막힌 곳의 사진 (싱크대 하부·변기·배수구 등)</li>
  <li>물이 역류하거나 안 내려가는 영상</li>
  <li>배수 위치와 건물 유형 (아파트·상가·식당 등)</li>
  <li>증상 (역류·악취·반복 막힘 여부)</li>
</ul></section>
<section class="section"><div class="hero-cta">
  <a class="btn btn-call" href="${site.smsHref}">💬 문자·사진 보내기</a>
  <a class="btn btn-blue" href="${site.phoneHref}">📞 전화 상담</a>
</div></section>`,
    faqs: [{ q: "사진만으로 비용이 확정되나요?", a: "대략적인 방향을 안내하며, 정확한 비용은 현장 확인 후 달라질 수 있습니다." }],
    priority: 0.6,
  });

  // 긴급 출동
  staticPage({
    path: "/emergency/",
    forceIndex: true,
    title: "긴급 출동 안내｜야간·주말 배관·하수구막힘",
    description: "역류·누수 등 긴급 상황 시 야간·주말 배관공사·하수구막힘 출동 전 확인 사항을 안내합니다.",
    h1: "긴급 출동 안내",
    crumb: "긴급 출동",
    bodyMain: `
<div class="lead-block prose"><p>물이 역류하거나 누수로 아래층까지 피해가 우려되는 상황은 빠른 확인이 중요합니다. 출동 전 아래 내용을 알려주시면 준비와 안내가 빨라집니다.</p></div>
<section class="section"><h2>출동 전 확인해 주세요</h2><ul class="checklist">
  <li>지금 물이 역류하고 있나요, 멈췄나요?</li>
  <li>어느 위치에서 문제가 생겼나요?</li>
  <li>여러 곳이 동시에 문제인가요?</li>
  <li>누수로 다른 곳(아래층 등)에 피해가 있나요?</li>
  <li>정확한 주소와 건물 유형</li>
</ul></section>
<section class="section"><div class="callout"><strong>임시 조치:</strong> 역류가 심하면 해당 배수구·변기 사용을 멈추고, 누수가 있다면 가능한 경우 해당 부분의 밸브를 잠근 뒤 연락 주세요.</div></section>
<section class="section"><div class="hero-cta"><a class="btn btn-call" href="${site.phoneHref}">📞 긴급 전화 ${esc(site.phone)}</a></div></section>`,
    faqs: [{ q: "야간·주말에도 출동하나요?", a: "지역과 상황에 따라 가능 여부를 확인합니다. 전화로 문의해 주세요." }],
    priority: 0.6,
  });

  // 시공 사례 허브 (실제 사례 축적 전 - 안내 위주, index 유지)
  staticPage({
    path: "/cases/",
    forceIndex: true,
    title: "시공 사례｜배관공사·하수구막힘 작업 사례 안내",
    description: "배관공사·하수구막힘 작업 사례를 원인·작업 방식 중심으로 안내합니다. 실제 현장 사례는 순차적으로 업데이트됩니다.",
    h1: "시공 사례 안내",
    crumb: "시공 사례",
    bodyMain: `
<div class="lead-block prose"><p>작업 사례는 원인 확인 → 작업 방식 → 결과 중심으로 정리합니다. 실제 현장 사진과 사례는 진행되는 대로 순차적으로 업데이트됩니다. (가짜 후기·허위 사례는 게시하지 않습니다.)</p></div>
<section class="section"><h2>대표 유형별 작업 방향</h2>
${cardGrid([
  { href: "/drain-clog/sink/", title: "싱크대 반복 막힘", text: "기름때 관벽 협착 → 고압세척", tag: "하수구막힘" },
  { href: "/drain-clog/restaurant-drain/", title: "식당 하수구막힘", text: "그리스트랩·기름때 → 세척·관리", tag: "하수구막힘" },
  { href: "/drain-clog/sewer-line/", title: "외부 하수관 역류", text: "배관내시경 진단 → 원인 확인", tag: "하수구막힘" },
  { href: "/pipe-work/old-pipe-replacement/", title: "노후 배관 녹물", text: "부식 확인 → 구간 교체", tag: "배관공사" },
  { href: "/pipe-work/leak-repair/", title: "벽 속 누수", text: "누수탐지 → 최소 개봉 보수", tag: "배관공사" },
  { href: "/pipe-work/pipe-camera-inspection/", title: "원인 불명 반복 막힘", text: "내시경 촬영 → 정확한 진단", tag: "배관공사" },
], 3)}
</section>`,
    faqs: null,
    priority: 0.5,
  });

  // 문의하기 (LocalBusiness - 실제 사무실)
  staticPage({
    path: "/contact/",
    forceIndex: true,
    title: "예약 문의｜배관공사·하수구막힘 상담 접수",
    description: "전화·문자·사진으로 배관공사·하수구막힘 상담을 접수합니다. 증상과 지역, 건물 유형을 알려주세요.",
    h1: "예약 문의",
    crumb: "예약 문의",
    bodyMain: `
<div class="lead-block prose"><p>아래 연락처로 상담을 접수해 주세요. 증상, 막힌 위치, 지역, 건물 유형과 함께 증상 사진을 보내주시면 작업 방향을 빠르게 안내해 드립니다.</p></div>
<section class="section"><ul class="pill-list">
  <li>📞 전화 상담 — <a href="${site.phoneHref}"><strong>${esc(site.phone)}</strong></a></li>
  <li>💬 문자·사진 문의 — <a href="${site.smsHref}">${esc(site.sms)}</a></li>
  <li>✉️ 이메일 — <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>
  <li>🕒 상담 시간 — 24시 (지역·상황에 따라 출동 가능 여부 확인)</li>
</ul></section>
<section class="section"><div class="hero-cta">
  <a class="btn btn-call" href="${site.phoneHref}">📞 전화 상담</a>
  <a class="btn btn-blue" href="${site.smsHref}">💬 문자·사진</a>
  <a class="btn btn-out" href="/area/">📍 지역 선택</a>
</div></section>`,
    faqs: null,
    extraSchema: localBusinessSchema(),
    priority: 0.7,
  });

  // 개인정보처리방침
  staticPage({
    path: "/privacy/",
    noindex: true,
    title: "개인정보처리방침",
    description: "스피드 배관공사 개인정보처리방침 안내입니다.",
    h1: "개인정보처리방침",
    crumb: "개인정보처리방침",
    bodyMain: `
<div class="prose">
<p>${esc(site.name)}(이하 '회사')는 이용자의 개인정보를 중요하게 생각하며, 관련 법령을 준수합니다. 본 방침은 상담·서비스 제공 과정에서 수집되는 개인정보의 처리에 관한 기준을 안내합니다.</p>
<h2>1. 수집하는 항목</h2><p>상담·예약 접수 시 이름, 연락처, 주소, 증상 관련 사진·영상 등 서비스 제공에 필요한 최소한의 정보를 수집합니다.</p>
<h2>2. 이용 목적</h2><p>수집된 정보는 상담 응대, 출장 서비스 제공, 작업 안내 및 사후 확인 목적으로만 이용합니다.</p>
<h2>3. 보유·이용 기간</h2><p>서비스 제공 완료 후 관련 법령에서 정한 기간 동안 보관하며, 목적 달성 후 지체 없이 파기합니다.</p>
<h2>4. 제3자 제공</h2><p>이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 법령에 근거가 있는 경우는 예외로 합니다.</p>
<h2>5. 이용자의 권리</h2><p>이용자는 언제든지 본인의 개인정보 열람·정정·삭제를 요청할 수 있습니다.</p>
<h2>6. 문의</h2><p>개인정보 관련 문의는 <a href="mailto:${esc(site.email)}">${esc(site.email)}</a> 또는 <a href="${site.phoneHref}">${esc(site.phone)}</a> 로 연락 주시기 바랍니다.</p>
<p>본 방침은 관련 법령 및 회사 정책에 따라 변경될 수 있으며, 변경 시 본 페이지를 통해 안내합니다.</p>
</div>`,
    faqs: null,
    priority: 0.2,
  });

  // 사이트맵(사람용 페이지)
  buildHtmlSitemapPage();
}

function buildHtmlSitemapPage() {
  const groups = [];
  groups.push(["핵심 서비스", [["/pipe-work/", "배관공사"], ["/drain-clog/", "하수구막힘"]]]);
  groups.push(["배관공사 세부", pipeWork.items.map((i) => [pipeWork.base + i.slug + "/", i.name])]);
  groups.push(["하수구막힘 세부", drainClog.items.map((i) => [drainClog.base + i.slug + "/", i.name])]);
  groups.push(["막힘 증상", symptoms.items.map((i) => [symptoms.base + i.slug + "/", i.name])]);
  groups.push(["건물 유형", places.items.map((i) => [places.base + i.slug + "/", i.name])]);
  groups.push(["전국 지역", regions.provinces.map((r) => [regions.base + r.slug + "/", r.fullName])]);
  groups.push(["안내", [["/process/", "작업 과정"], ["/cost/", "비용 안내"], ["/photo-consult/", "사진 상담"], ["/emergency/", "긴급 출동"], ["/cases/", "시공 사례"], ["/contact/", "예약 문의"], ["/privacy/", "개인정보처리방침"]]]);

  const bc = breadcrumb([{ label: "홈", href: "/" }, { label: "사이트맵" }]);
  const body =
    bc.html +
    `<h1>사이트맵</h1>` +
    groups
      .map(
        ([t, items]) =>
          `<section class="section"><h2>${esc(t)}</h2>${chips(items.map(([href, label]) => ({ href, label })))}</section>`
      )
      .join("");
  layout({ path: "/sitemap-page/", title: "사이트맵｜전체 페이지 안내", description: "스피드 배관공사 전체 페이지 목록입니다. 배관공사, 하수구막힘, 증상, 건물 유형, 전국 지역 페이지를 확인하세요.", body, schemas: [bc.schema], priority: 0.3, noindex: true });
}

/* ---- sitemap.xml + robots.txt ---- */
function buildSitemapXml() {
  const urls = pages
    .filter((p) => !p.noindex) // noindex 페이지는 색인 사이트맵에서 제외
    .map(
      (p) =>
        `  <url><loc>${abs(p.path)}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), xml);

  const robots = `User-agent: *
Allow: /
Sitemap: ${abs("/sitemap.xml")}
`;
  fs.writeFileSync(path.join(OUT, "robots.txt"), robots);
}

/* ---- copy assets ---- */
function copyAssets() {
  const dest = path.join(OUT, "assets");
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(path.join(__dirname, "assets"))) {
    fs.copyFileSync(path.join(__dirname, "assets", f), path.join(dest, f));
  }
  // .nojekyll (GitHub Pages 에서 _ 디렉토리 처리 방지 및 정적 그대로 서빙)
  fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
  // 404
  fs.writeFileSync(
    path.join(OUT, "404.html"),
    `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>페이지를 찾을 수 없습니다</title><meta name="robots" content="noindex"><link rel="stylesheet" href="/assets/style.css"></head><body>${header()}<main><div class="wrap"><h1>페이지를 찾을 수 없습니다</h1><p>요청하신 페이지가 없거나 이동되었습니다.</p><p><a class="btn btn-blue" href="/">홈으로</a> <a class="btn btn-out" href="/sitemap-page/">사이트맵 보기</a></p></div></main>${footer()}${mobileBar()}</body></html>`
  );
}

/* ============================================================
 *  RUN
 * ============================================================ */
function run() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  buildHome();
  buildServiceHub(pipeWork, "배관공사");
  pipeWork.items.forEach((it) => buildServiceItem(pipeWork, "배관공사", it));
  buildServiceHub(drainClog, "하수구막힘");
  drainClog.items.forEach((it) => buildServiceItem(drainClog, "하수구막힘", it));

  buildSymptomHub();
  symptoms.items.forEach(buildSymptomItem);

  buildPlaceHub();
  places.items.forEach(buildPlaceItem);

  buildAreaHub();
  regions.provinces.forEach((r) => {
    // 서울 자치구에 행정동 목록 연결 (data/seoul-dongs.js)
    if (r.slug === "seoul") {
      r.districts.forEach((d) => {
        d.dongs = seoulDongs[d.slug] || [];
      });
    }
    // 경기도 시·군 → (행정구) → 행정동 구조 연결 (data/gyeonggi.js)
    if (r.slug === "gyeonggi") {
      r.districts = gyeonggiDistricts;
    }
    // 광역시 자치구 → 행정동 구조 연결 (data/metros.js)
    if (metros[r.slug]) {
      r.districts = metros[r.slug];
    }
    // 도(道) 시·군 → (행정구) → 읍·면·동 구조 연결 (data/provinces-do.js)
    if (provincesDo[r.slug]) {
      r.districts = provincesDo[r.slug];
      // 리프 군(郡)에 대표 읍·면 병합 (data/gun-dongs.js)
      r.districts.forEach((d) => {
        const key = r.slug + "/" + d.slug;
        if (gunDongs[key] && !d.dongs && !d.subDistricts) d.dongs = gunDongs[key];
      });
    }
    buildProvince(r);
    r.districts.forEach((d) => buildAreaNode(r, [], d, r.districts));
  });

  buildStaticPages();

  copyAssets();
  buildSitemapXml();

  const indexed = pages.filter((p) => !p.noindex).length;
  console.log(`생성 완료: 총 ${pages.length} 페이지 (index ${indexed}, noindex ${pages.length - indexed})`);
  if (layout._thin && layout._thin.length) {
    console.log(`\n[자동 noindex] 본문 ${MIN_CONTENT_CHARS}자 미만으로 색인 제외된 페이지 ${layout._thin.length}개:`);
    layout._thin.sort((a, b) => a[1] - b[1]).forEach(([pth, len]) => console.log(`  - ${pth} (${len}자)`));
    console.log(`  → 본문 보강 후 다시 빌드하면 자동으로 index 로 전환됩니다.`);
  }
  checkDuplication();
}

/* ============================================================
 *  중복/복사/도어웨이 검사 (MinHash + LSH 근사 중복 탐지)
 *  지역 리프(동) 페이지들 간 본문 유사도를 측정해, 근사 중복 쌍을 보고합니다.
 * ============================================================ */
function prng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shingles(text, k = 6) {
  const toks = text.split(/\s+/).filter(Boolean);
  const set = new Set();
  if (toks.length < k) {
    if (toks.length) set.add(toks.join(" "));
    return set;
  }
  for (let i = 0; i + k <= toks.length; i++) set.add(toks.slice(i, i + k).join(" "));
  return set;
}
function checkDuplication() {
  const NUM = 48, ROWS = 4, BANDS = NUM / ROWS, THRESH = 0.7;
  // 지역 리프(동) 페이지: /area/<시도>/.../<동>/ 중 하위가 없는 최종 노드.
  // 판별: /area/ 로 시작하고, 하위 경로를 prefix 로 갖는 다른 경로가 없는 것.
  // 전국 지역 페이지 전체(시·도 / 시·군·구 / 행정동) 대상. 리프뿐 아니라 중간 노드도 검사.
  const leaves = Object.keys(layout._text).filter((p) => p.startsWith("/area/") && p !== "/area/");
  if (leaves.length < 2) return;

  // MinHash 계수(결정적)
  const rng = prng(1234567);
  const A = [], B = [];
  for (let i = 0; i < NUM; i++) { A.push((Math.floor(rng() * 0xffffffff) | 1) >>> 0); B.push(Math.floor(rng() * 0xffffffff) >>> 0); }

  const sigs = new Map();
  for (const p of leaves) {
    const sh = shingles(layout._text[p]);
    const sig = new Array(NUM).fill(0xffffffff);
    for (const s of sh) {
      const h = hashStr(s);
      for (let i = 0; i < NUM; i++) {
        const v = (Math.imul(A[i], h) + B[i]) >>> 0;
        if (v < sig[i]) sig[i] = v;
      }
    }
    sigs.set(p, sig);
  }

  // LSH 밴딩으로 후보쌍 추림
  const candidates = new Set();
  for (let b = 0; b < BANDS; b++) {
    const buckets = new Map();
    for (const p of leaves) {
      const sig = sigs.get(p);
      const key = b + ":" + sig.slice(b * ROWS, b * ROWS + ROWS).join(",");
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(p);
    }
    for (const arr of buckets.values()) {
      if (arr.length < 2) continue;
      for (let i = 0; i < arr.length; i++)
        for (let j = i + 1; j < arr.length; j++) candidates.add(arr[i] < arr[j] ? arr[i] + " " + arr[j] : arr[j] + " " + arr[i]);
    }
  }

  // 후보쌍 시그니처 유사도 추정
  let maxSim = 0, nearDup = 0;
  const flagged = new Set();
  const worst = [];
  for (const pair of candidates) {
    const [x, y] = pair.split(" ");
    const sx = sigs.get(x), sy = sigs.get(y);
    let eq = 0;
    for (let i = 0; i < NUM; i++) if (sx[i] === sy[i]) eq++;
    const sim = eq / NUM;
    if (sim > maxSim) maxSim = sim;
    if (sim >= THRESH) { nearDup++; flagged.add(x); flagged.add(y); worst.push([sim, x, y]); }
  }

  console.log(`\n[중복/도어웨이 검사] 지역 리프(동) 페이지 ${leaves.length}개 · 후보쌍 ${candidates.size}개`);
  console.log(`  근사중복 임계값 ${THRESH} 이상 쌍: ${nearDup}개, 관련 페이지: ${flagged.size}개, 관측 최대 유사도: ${maxSim.toFixed(2)}`);
  if (worst.length) {
    worst.sort((a, b) => b[0] - a[0]);
    console.log(`  상위 유사 쌍:`);
    worst.slice(0, 8).forEach(([s, x, y]) => console.log(`   ${s.toFixed(2)}  ${x}  ⟷  ${y}`));
    console.log(`  → 유사도가 높으면 data/dong-compose.js 의 문장 풀을 늘려 다양성을 높이세요.`);
  } else {
    console.log(`  ✓ 임계값 이상 근사중복 쌍 없음 (도어웨이/복사 위험 낮음)`);
  }
}

run();
