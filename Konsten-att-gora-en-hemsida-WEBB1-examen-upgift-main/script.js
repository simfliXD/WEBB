// ===== JAVASCRIPT =====

// TIPS: Om du anvdänder VS code så kan man flytta musen över koden för att see förknaringar och klicka på MDN referens för djupare förklaring

const darkModeToggle = document.getElementById("darkModeToggle");
const navbarToggle = document.querySelector(".navbar-menu-toggle");
const navbarMenu = document.querySelector(".navbar-menu");
const header = document.querySelector("header");

// ===== MÖRKT LÄGE FUNKTIONALLITET =====
if (darkModeToggle) {
  const savedMode = localStorage.getItem("darkMode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  } else if (savedMode === "disabled") {
    // Gör inget, behåll ljust läge
  } else {
    // Inget sparat värde, använd systemets preferens
    if (prefersDark) {
      console.log("Föredraget mörkt läge, aktiverar mörkt läge.");
      document.body.classList.add("dark-mode");
      darkModeToggle.checked = true;
      localStorage.setItem("darkMode", "enabled");
    } else {
      console.log("Föredraget ljust läge, behåller ljust läge.");
      localStorage.setItem("darkMode", "disabled");
    }
  }

  // Efter en frame så sätter vi på en transiton för body:n. Detta ger en mjuk övergång mellan Ljust/Mörkt läge.
  requestAnimationFrame(() => {
    document.body.style.transition = "var(--transition-quick) ease";
  });

  // Lyssna efter eventet "change" på toggle switchen,
  // då uppdatera klassen på body elementet för att ändra färgschemat
  // och sedan sparas det nya värdet i local storage.
  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      console.log("Mörkt läge aktiverat.");
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      console.log("Ljust läge aktiverat.");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  });
}

// Visa navbar när man clickar på knappen (Börgar menyn)
navbarToggle.addEventListener("click", () => {
  navbarToggle.classList.toggle("show");
  navbarMenu.classList.toggle("show");
});

// ===== SCROLLNINGS LOGIC FÖR ATT BESTÄMMA OM HEADERN SKA VARA SYNLIG =====

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;

  // Ignorera små scrollningar för att undvika flimmer
  if (Math.abs(scrollDelta) < 5) return;

  // Göm inte headern om mobilmenyn är öppen
  if (navbarMenu.classList.contains("show")) return;

  // Om användaren scrollar ner och har scrollat mer än 120px från toppen, göm headern
  if (scrollDelta > 0 && currentScrollY > 120) {
    header.classList.add("hide");
  } else {
    // Annars visa headern
    header.classList.remove("hide");
  }
  //console.log(
  //  "Scroll delta:",
  //  scrollDelta,
  //  "Current scroll Y:",
  //  currentScrollY,
  // );

  // Uppdatera senaste scrollpositionen
  lastScrollY = currentScrollY;
});
