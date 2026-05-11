// ===== JAVASCRIPT =====

// TIPS: Om du använder VS Code så kan man flytta musen över koden för att se förklaringar och klicka på MDN-referens för djupare förklaring

// getElementById() hämtar element med specifikt ID, querySelector() hämtar första matchande element
const darkModeToggle = document.getElementById("darkModeToggle");
const header = document.querySelector("header");

// ===== MÖRKT LÄGE FUNKTIONALLITET =====
// localStorage sparas i webbläsaren och finns kvar mellan besök
// matchMedia kollar om användaren har mörkt tema i sitt operativsystem

let savedMode = localStorage.getItem("tema");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// classList.add/remove lägger till eller tar bort CSS-klasser på element
function applyTheme(mode) {
	if (mode === "mörkt") {
		document.body.classList.add("dark-mode");
		if (darkModeToggle) darkModeToggle.checked = true;
	} else {
		document.body.classList.remove("dark-mode");
		if (darkModeToggle) darkModeToggle.checked = false;
	}
}

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

// Storage-event synkar temat mellan öppna flikar/fönster
window.addEventListener("storage", (e) => {
	if (e.key === "tema") {
		applyTheme(e.newValue);
	}
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
// matchMedia kollar om skärmen är smalare än 1150px (mobil vs desktop)
const mediaQuery = window.matchMedia("(width < 1150px)");
const navbarMenu = document.querySelector(".navbar-menu");

// setAttribute/removeAttribute lägger till eller tar bort HTML-attribut
// inert: gör elementet inaktivt (osynligt för tillgänglighet men behåller animationer)
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

// classList.add/remove("show") visar/döljer menyn via CSS
// aria-expanded talar om för skärmläsare om menyn är öppen
// .focus() flyttar tangentbordsfokus till element (viktigt för tillgänglighet)
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

// classList.contains("show") kollar om elementet har klassen "show"
navbarToggle?.addEventListener("click", () => {
	if (navbarMenu.classList.contains("show")) {
		closeNavbar();
	} else {
		openNavbar();
	}
});

// Stäng navbar vid länkklick
const navbarLinks = document.querySelectorAll(".navbar-menu a");
navbarLinks.forEach((link) => {
	link.addEventListener("click", () => {
		closeNavbar();
	});
});

// Stäng navbar vid klick på overlay (utanför menyn)
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

	// Ignorera små scrollningar för att undvika flimmer
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