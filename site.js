// Fill these in after the Marketplace listing and Lemon Squeezy products exist (see LAUNCH.md).
var TELLAL = {
  // Google review: no Marketplace links until the listing is approved. Swap in the listing URL then.
  installUrl: 'guide.html',
  checkoutMonthly: 'https://codeven.lemonsqueezy.com/checkout/buy/8929fc56-71c6-46b0-87cf-92268fc65436',
  checkoutYearly: 'https://codeven.lemonsqueezy.com/checkout/buy/3ccf4bd9-63e9-4da5-9cdd-514d97dc816c',
  supportEmail: 'CodEven@codeven.io',
  apiBase: 'https://dbygawmnmbvckigvsorw.supabase.co/functions/v1/es-exchange'
};

(function () {
  function pickLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'tr' || q === 'en') return q;
    try { var s = localStorage.getItem('tellal_lang'); if (s) return s; } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  }
  function setLang(l) {
    document.body.setAttribute('data-lang', l);
    document.documentElement.lang = l;
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === l));
    });
    try { localStorage.setItem('tellal_lang', l); } catch (e) {}
  }
  setLang(pickLang());
  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set')); });
  });

  document.querySelectorAll('[data-install]').forEach(function (a) { a.href = TELLAL.installUrl; });
  document.querySelectorAll('[data-support]').forEach(function (a) {
    a.href = 'mailto:' + TELLAL.supportEmail; if (!a.textContent.trim()) a.textContent = TELLAL.supportEmail;
  });
  document.querySelectorAll('[data-checkout]').forEach(function (a) {
    var url = a.getAttribute('data-checkout') === 'yearly' ? TELLAL.checkoutYearly : TELLAL.checkoutMonthly;
    if (url) a.href = url; else a.href = TELLAL.installUrl;
  });

  // Hero: rows get sent one after another, once.
  var rows = document.querySelectorAll('.sheet tbody tr');
  if (!rows.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var i = 0;
  function next() {
    if (i > 0) rows[i - 1].classList.remove('sending');
    if (i >= rows.length) return;
    var row = rows[i++];
    row.classList.add('sending');
    var mark = row.querySelector('.st span');
    setTimeout(function () { mark.classList.add('on'); next(); }, reduce ? 0 : 650);
  }
  setTimeout(next, reduce ? 0 : 700);
})();
