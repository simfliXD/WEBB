// ===== JAVASCRIPT =====

// TIPS: Om du använder VS Code så kan man flytta musen över koden för att se förklaringar och klicka på MDN-referens för djupare förklaring

// getElementById() hämtar element med specifikt och unikt ID, querySelector() matchande element
const darkModeToggle = document.getElementById("darkModeToggle");
const header = document.querySelector("header");

// ===== MÖRKT LÄGE FUNKTIONALLITET =====
// localStorage sparas i webbläsaren
let savedMode = localStorage.getItem("tema");


// classList.add/remove lägger till eller tar bort CSS-klasser på body elementet
function applyTheme(mode) {
	if (mode === "mörkt") {
		document.body.classList.add("dark-mode");
		if (darkModeToggle) darkModeToggle.checked = true;
	} else {
		document.body.classList.remove("dark-mode");
		if (darkModeToggle) darkModeToggle.checked = false;
	}
}

// matchMedia kollar om mörkt läge är föredraget
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Initiera rätt tema baserat på sparat läge eller systempreferens
if (savedMode === "mörkt") {
	applyTheme("mörkt");
} else if (savedMode === "ljust") {
	applyTheme("ljust");
} else {
	if (prefersDark) {
		applyTheme("mörkt");
		localStorage.setItem("tema", "mörkt");
	} else {
		applyTheme("ljust");
		localStorage.setItem("tema", "ljust");
	}
}

// Efter en frame sätter vi på en transition för mjuk färgövergång
requestAnimationFrame(() => {
	document.body.style.transition = "var(--transition-quick) ease";
});

// change-event triggas när checkbox kryssas i/ur
darkModeToggle?.addEventListener("change", function () {
	if (darkModeToggle.checked) {
		console.log("Mörkt läge aktiverat.");
		applyTheme("mörkt");
		localStorage.setItem("tema", "mörkt");
	} else {
		console.log("Ljust läge aktiverat.");
		applyTheme("ljust");
		localStorage.setItem("tema", "ljust");
	}
});

// ===== MENY FUNKTIONALLITET =====

// matchMedia kollar om skärmen är smalare än 1150px
const mediaQuery = window.matchMedia("(width < 1150px)");
const navbarMenu = document.querySelector(".navbar-menu");

// set/removeAttribute lägger till eller tar bort HTML-attribut
// inert: gör elementet inaktivt för navigations trädet (behåller animationer)
// aria-hidden: döljer elementet för skärmläsare
function updateNavbar(e) {
	const isSidebar = e.matches;
	if (isSidebar) {
		navbarMenu.setAttribute("inert", " ");
		navbarMenu.setAttribute("aria-hidden", "true");
	} else {
		navbarMenu.removeAttribute("inert");
		navbarMenu.setAttribute("aria-hidden", "false");
	}
}

// Kör vid sidladdning och uppdatera vid fönsterstorleksändring
updateNavbar(mediaQuery);
mediaQuery.addEventListener("change", updateNavbar);

// ===== ÖPPNA/STÄNG NAVBAR =====
const overlay = document.getElementById("overlay");
const navbarToggle = document.querySelector(".navbar-menu-toggle");

// classList.add/remove("show") visar/döljer menyn via CSS class
// aria-expanded talar om för skärmläsare om menyn är öppen
// .focus() flyttar tangentbordsfokus till elementet
function closeNavbar() {
	navbarToggle.classList.remove("show");
	navbarToggle.setAttribute("aria-expanded", "false");

	navbarMenu.classList.remove("show");
	if (mediaQuery.matches) {
		navbarMenu.setAttribute("inert", " ");
		navbarMenu.setAttribute("aria-hidden", "true");
	} else {
		navbarMenu.removeAttribute("inert");
		navbarMenu.setAttribute("aria-hidden", "false");
	}

	overlay.classList.remove("show");

	if (mediaQuery.matches) {
		navbarToggle.focus();
	}
}

function openNavbar() {
	navbarToggle.classList.add("show");
	navbarToggle.setAttribute("aria-expanded", "true");

	navbarMenu.classList.add("show");
	navbarMenu.removeAttribute("inert");
	navbarMenu.setAttribute("aria-hidden", "false");

	overlay.classList.add("show");
}

// click-event på hamburgarmenyn för att öppna/stänga menyn.
navbarToggle?.addEventListener("click", () => {
	if (navbarMenu.classList.contains("show")) {
		closeNavbar();
	} else {
		openNavbar();
	}
});

// Stäng navbar vid klick på overlay (utanför menyn)
// finns också onlcick-attribut i HTML som gör att det fungerar även utan JavaScript.
overlay.addEventListener("click", () => {
	closeNavbar();
});

// Stäng navbar med Escape-tangenten
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && navbarMenu.classList.contains("show")) {
		closeNavbar();
	}
});


// ===== SCROLLNING - DÖLJ/VISA HEADER =====

// window.scrollY är antalet pixlar dokumentet scrollats från toppen
// scrollDelta visar riktning: positiv = scrollar ner, negativ = scrollar upp

let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
	const currentScrollY = window.scrollY;
	const scrollDelta = currentScrollY - lastScrollY;

	// Ignorera små scrollningar
	if (Math.abs(scrollDelta) < 5) return;

	// Visa alltid header om mobilmenyn är öppen
	if (navbarMenu.classList.contains("show")) return;

	// Scrollar ner och mer än 120px från toppen = göm header
	if (scrollDelta > 0 && currentScrollY > 120) {
		header.classList.add("hide");
	} else {
		header.classList.remove("hide");
	}

	lastScrollY = currentScrollY;
});
