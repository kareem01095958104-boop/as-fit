const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#booking-form");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("open");
    }
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const age = formData.get("age")?.toString().trim() || "";
    const goal = formData.get("goal")?.toString().trim() || "";
    const selectedPackage = formData.get("package")?.toString().trim() || "";
    const weight = formData.get("weight")?.toString().trim() || "";
    const height = formData.get("height")?.toString().trim() || "";
    const experience = formData.get("experience")?.toString().trim() || "";
    const healthCondition = formData.get("healthCondition")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    const whatsappMessage = [
      "Hello Coach Ahmed Saadallah,",
      "",
      "New Booking Request:",
      "",
      `Name: ${name}`,
      "",
      `Phone: ${phone}`,
      "",
      `Age: ${age}`,
      "",
      `Goal: ${goal}`,
      "",
      `Package: ${selectedPackage}`,
      "",
      `Weight: ${weight}`,
      "",
      `Height: ${height}`,
      "",
      `Experience: ${experience}`,
      "",
      `Injuries / Chronic Conditions: ${healthCondition}`,
      "",
      `Notes: ${message}`,
      "",
      "Please contact me to start my training plan.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/201017068587?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener");
  });
}
