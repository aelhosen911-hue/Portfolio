// Basic interactivity: hamburger, skill bars animate, parallax on scroll, smooth nav highlight, contact form stub

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Hamburger Toggle & Animation ---
  const ham = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (ham && navLinks) {
    ham.addEventListener("click", () => {
      const expanded = ham.getAttribute("aria-expanded") === "true" || false;
      ham.setAttribute("aria-expanded", !expanded);
      navLinks.classList.toggle("show");
      ham.classList.toggle("active"); // تشغيل أنيميشن الـ X
    });
  }

  // --- 2. Smooth Scroll (Forced by JS) ---
  // ده الحل الجوكر لمشكلة السكرول
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // نلغي القفزة الفورية

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // التحرك للقسم بنعومة
        targetSection.scrollIntoView({ behavior: "smooth" });

        // لو إحنا فاتحين المنيو في الموبايل، نقفلها
        if (navLinks.classList.contains("show")) {
          navLinks.classList.remove("show");
          if (ham) {
            ham.classList.remove("active"); // نرجع الزرار لشكله الأصلي
            ham.setAttribute("aria-expanded", "false");
          }
        }
      }
    });
  });

  // --- 3. Skill bars animate when in view ---
  const skillBars = document.querySelectorAll(".skill-bar");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = bar.getAttribute("data-skill") || 60;
          const span = bar.querySelector("span");
          span.style.width = percent + "%";
          obs.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillBars.forEach((b) => obs.observe(b));

  // --- 4. Parallax subtle effect ---
  const heroBg = document.querySelector(".hero-bg");
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (heroBg) {
        heroBg.style.transform = `translateY(${y * 0.15}px)`;
      }
    },
    { passive: true }
  );

  // --- 5. Set current year ---
  const ySpan = document.getElementById("year");
  if (ySpan) ySpan.textContent = new Date().getFullYear();

  // --- 6. Smooth active link highlight ---
  const sections = document.querySelectorAll("section[id], header[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  const sectObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          const id = ent.target.id;
          // بنشيل الكلاس من كله الأول
          navItems.forEach((n) => n.classList.remove("active"));
          // ونحطه للينك المناسب
          const link = document.querySelector(`.nav-links a[href="#${id}"]`);
          if (link) link.classList.add("active");
        }
      });
    },
    { threshold: 0.5 } // لما 50% من السكشن يظهر
  );
  sections.forEach((s) => sectObs.observe(s));
});

// --- Contact form stub ---
function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const msg = form.querySelector(".form-msg");
  msg.textContent = "Sending...";
  // Simulate success
  setTimeout(() => {
    msg.textContent = "Message sent! I will contact you soon.";
    form.reset();
  }, 900);
}
