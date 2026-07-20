// ここを編集すれば、自分用のポートフォリオに差し替えられます。
const works = [
  {
    title: "「CYBER SPACE」",
    category: "Poster",
    year: "2023",
    description: "文化誌のために構築した、モノクロ基調のアイデンティティと編集レイアウトです。",
    image: "images/IMG_4026.webp"
  },
  {
    title: "「The Gathering of Cats」",
    category: "Graphic",
    year: "2025",
    description: "高級感のあるブランドキャンペーン向けに制作した、静かな余韻のあるモーション作品です。",
    image: "images/IMG_2611.webp"
  },
  {
    title: "「A Single Flower」",
    category: "Art",
    year: "2025",
    description: "光・質感・時間の流れを意識した、ゆっくりと読まれる写真シリーズです。",
    image: "images/IMG_0803.webp"
  },
  {
    title: "「盗難防止ポスター」",
    category: "Poster",
    year: "2026",
    description: "タイポグラフィのリズムを重視した、強い印象を残すポスターシステムです。",
    image: "images/81e2a768b7c1420b.webp"
  },
  {
    title: "「The Cats of Kagoshima」",
    category: "Art",
    year: "2026",
    description: "モーションと光の残像を通して、Web空間に静かな揺らぎを生み出す実験的作品です。",
    image: "images/IMG_0082.webp"
  },
  {
    title: "「衝動」",
    category: "Art",
    year: "2026",
    description: "空間に浮かぶ植物のような構造を、3Dで立体的に再構築したインスタレーション案です。",
    image: "images/IMG_0060.webp"
  }
];

const workGrid = document.getElementById("work-grid");
const modal = document.getElementById("modal");
const modalBody = modal.querySelector(".modal-body");
const closeButton = modal.querySelector(".modal-close");
const filters = document.querySelectorAll(".filter");
const cursor = document.querySelector(".cursor");
const cursorGlow = document.querySelector(".cursor-glow");

function renderWorks(filter = "all") {
  workGrid.innerHTML = "";

  const filteredWorks = filter === "all"
    ? works
    : works.filter((item) => item.category === filter);

  filteredWorks.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "work-card";
    if (index === 0) {
      card.classList.add("featured");
    }
    const isSpecialImage = item.image === "images/IMG_2611.webp";
    if (isSpecialImage) {
      card.classList.add("special-image-card");
    }
    card.innerHTML = `
      <div class="work-card-image-wrap">
        <img src="${item.image}" alt="${item.title}" />
        <div class="work-card-overlay">
          <span>${item.category}</span>
          <span>${item.year}</span>
        </div>
      </div>
      <div class="work-card-body">
        <h3>${item.title}</h3>
      </div>
    `;

    card.addEventListener("click", () => openModal(item));
    workGrid.appendChild(card);
  });

  requestAnimationFrame(() => {
    document.querySelectorAll(".work-card").forEach((card, idx) => {
      setTimeout(() => card.classList.add("is-visible"), idx * 80);
    });
  });
}

function openModal(item) {
  modalBody.innerHTML = `
    <div class="modal-image-wrap">
      <img src="${item.image}" alt="${item.title}" />
    </div>
    <div class="modal-details">
      <div class="modal-meta">
        <span>${item.category}</span>
        <span>${item.year}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderWorks(button.dataset.filter);
  });
});

closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-animated");
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll(".skill-card").forEach((item) => skillObserver.observe(item));

const parallaxItems = document.querySelectorAll("[data-speed]");
window.addEventListener("scroll", () => {
  const offset = window.scrollY;
  parallaxItems.forEach((item) => {
    const speed = parseFloat(item.dataset.speed || "0.12");
    item.style.transform = `translate3d(0, ${offset * speed}px, 0)`;
  });
}, { passive: true });

window.addEventListener("mousemove", (event) => {
  const x = event.clientX;
  const y = event.clientY;
  cursor.style.transform = `translate(${x}px, ${y}px)`;
  cursorGlow.style.transform = `translate(${x}px, ${y}px)`;
});

renderWorks();
