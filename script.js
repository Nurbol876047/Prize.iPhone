(function () {
  "use strict";

  var screen = document.getElementById("phoneScreen");
  var step1 = document.getElementById("step1");
  var step2 = document.getElementById("step2");
  var overlay = document.getElementById("warningOverlay");
  var toStep2 = document.getElementById("toStep2");
  var prizeForm = document.getElementById("prizeForm");
  var closeWarning = document.getElementById("closeWarning");
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  var shareBtn = document.getElementById("shareBtn");
  var toast = document.getElementById("toast");

  function showStep(step) {
    [step1, step2].forEach(function (el) { el.classList.remove("active"); });
    step.classList.add("active");
  }

  toStep2.addEventListener("click", function () {
    showStep(step2);
  });

  // Demo only: nothing here is sent anywhere or stored. preventDefault keeps
  // the browser from doing a real form submission/navigation.
  prizeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    screen.classList.add("dimmed");
    overlay.classList.add("show");
  });

  closeWarning.addEventListener("click", function () {
    overlay.classList.remove("show");
    screen.classList.remove("dimmed");
    prizeForm.reset();
    showStep(step1);
  });

  navToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { mobileMenu.classList.remove("open"); });
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }

  shareBtn.addEventListener("click", function () {
    var url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: document.title, url: url }).catch(function () {});
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () {
        showToast("Ссылка скопирована");
      }).catch(function () {
        showToast(url);
      });
    } else {
      showToast(url);
    }
  });
})();
