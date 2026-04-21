// ===== JAVASCRIPT =====

// TIPS: Om du anvdänder VS code så kan man flytta musen över koden för att see förknaringar och klicka på MDN referens för djupare förklaring

// document.addEventListener("DOMContentLoaded", function () { // Tog bort eftersom vi andvänder defer taggen så scriptet körs ändå efter allt har laddats in.
const modeToggle = document.getElementById("modeToggle");
const navbarToggle = document.querySelector(".navbar-menu-toggle");
const navbarMenu = document.querySelector(".navbar-menu");
const header = document.querySelector("header");

// ===== MÖRKT LÄGE FUNKTIONALLITET =====
if (modeToggle) {
  const savedMode = localStorage.getItem("darkMode");

  // Checka local storage för att se om boolean för dark mode är sann,
  // och om det är sann, lägg till dark mode klassen till body elementet
  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
    modeToggle.checked = true;
  }

  // Efter en frame så sätter vi igån transiton för body:n. Detta ger en mjuk övergång mellan Ljust/Mörkt läge
  requestAnimationFrame(() => {
    document.body.style.transition = "var(--transition-quick) ease";
  });

  // Lyssna efter eventet "change" på toggle switchen,
  // när det ändras uppdatera klassen på body elementet för att ändra färgschemat
  // och spara det nya värdet i local storage
  modeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
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

  // Ignorera små scrollningar
  if (Math.abs(scrollDelta) < 5) return;

  // Göm inte om navbaren är synlig
  if (navbarMenu.classList.contains("show")) return;

  // ScrollDelta ska vara postiv så man scrollar ner och currentScrollY ska vara större än 120px så att headern inte försvinner direkt när
  if (scrollDelta > 0 && currentScrollY > 120) {
    console.log("scrolling", window.scrollY);
    // Scrollar ner
    header.classList.add("hide");
  } else {
    // Scrollar upp
    header.classList.remove("hide");
  }

  // Updatera senaste scroll värdet
  lastScrollY = currentScrollY;
});
//});
