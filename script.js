// Theme toggle (saved in localStorage)
(function themeInit(){
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
        document.documentElement.dataset.theme = saved;
    } else {
        // default = dark, but you can switch to "light" if you want
        document.documentElement.dataset.theme = "dark";
    }
})();

document.getElementById("themeToggle")?.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
});

// Lightbox for images with data-lightbox
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lightboxImg");
const lbClose = document.getElementById("lightboxClose");

document.querySelectorAll("img[data-lightbox]").forEach(img => {
    img.addEventListener("click", () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt || "";
        lb.classList.add("open");
        lb.setAttribute("aria-hidden", "false");
    });
});

function closeLightbox(){
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
}

lbClose?.addEventListener("click", closeLightbox);
lb?.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

// Auto-highlight TOC link by section in view
const tocLinks = Array.from(document.querySelectorAll("#tocNav a"));
const sections = tocLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
    const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const id = "#" + visible.target.id;
    tocLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
}, { rootMargin: "-15% 0px -70% 0px", threshold: [0.1, 0.2, 0.4, 0.6] });

sections.forEach(s => observer.observe(s));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();