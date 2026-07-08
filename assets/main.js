// 모바일 메뉴 토글 + 드롭다운 확장
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }
  // 모바일에서 드롭다운 상위 메뉴 탭 시 하위 펼침
  document.querySelectorAll('.nav > li').forEach(function (li) {
    var dd = li.querySelector('.dd');
    var link = li.querySelector(':scope > a');
    if (!dd || !link) return;
    link.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width:960px)').matches) {
        // 데스크톱이 아닐 때만 첫 탭은 펼침 동작
        if (!li.classList.contains('exp')) {
          e.preventDefault();
          document.querySelectorAll('.nav > li.exp').forEach(function (o) {
            if (o !== li) o.classList.remove('exp');
          });
          li.classList.add('exp');
        }
      }
    });
  });
})();
