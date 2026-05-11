// ===== JAVASCRIPT =====

// TIPS: Om du anvdänder VS code så kan man flytta musen över koden för att see förknaringar och klicka på MDN referens för djupare förklaring

const darkModeToggle = document.getElementById("darkModeToggle");
const header = document.querySelector("header");

// ===== MÖRKT LÄGE FUNKTIONALLITET =====

let savedMode = localStorage.getItem("tema");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function applyTheme(mode) {
	if (mode === "mörkt") {
		document.body.classList.add("dark-mode");
		if (darkModeToggle) darkModeToggle.checked = true;
	} else {
		document.body.classList.remove("dark-mode");
		if (darkModeToggle) darkModeToggle.checked = false;
	}
}

// Initial apply
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

// Efter en frame så sätter vi på en transiton för body:n. Detta ger en mjuk övergång mellan Ljust/Mörkt läge.
requestAnimationFrame(() => {
	document.body.style.transition = "var(--transition-quick) ease";
});

// Lyssna på storage-event så att andra öppna fönster/flikar får uppdatering när temat ändras någon annanstans
window.addEventListener("storage", (e) => {
	if (e.key === "tema") {
		applyTheme(e.newValue);
	}
});

// Lyssna efter eventet "change" på toggle switchen,
// då uppdatera klassen på body elementet för att ändra färgschemat
// och sedan sparas det nya värdet i local storage.
darkModeToggle?.addEventListener("change", function () {
	if (darkModeToggle.checked) {
		console.log("Mörkt läge aktiverat.");
		applyTheme("mörkt");
		localStorage.setItem("tema", "mörkt");
		savedMode = "mörkt";
		console.log("Sparat i localStorage:", localStorage.getItem("tema"));
	} else {
		console.log("Ljust läge aktiverat.");
		applyTheme("ljust");
		localStorage.setItem("tema", "ljust");
		savedMode = "ljust";
		console.log("Sparat i localStorage:", localStorage.getItem("tema"));
	}
});

// ===== MENY FUNKTIONALLITET =====

const mediaQuery = window.matchMedia("(width < 1150px)");
const navbarMenu = document.querySelector(".navbar-menu");
function updateNavbar(e) {
	const isSidebar = e.matches;
	// console.log(isSidebar);
	if (isSidebar) {
		navbarMenu.setAttribute("inert", " ");
		navbarMenu.setAttribute("aria-hidden", "true");
		// inert gömmer elementet från accesability trädet och skärmläsare utan att göra elementet osynligt vilket skulle ta bort animationen.
	} else {
		navbarMenu.removeAttribute("inert");
		navbarMenu.setAttribute("aria-hidden", "false");
	}
}

// Kör funktionen en gång närsiudan laddas och updatera sedan varje gång media queryn ändras
updateNavbar(mediaQuery);
mediaQuery.addEventListener("change", updateNavbar);

// Funktioner för att öppna och stänga navbaren, dessa används både av knappen och av overlayn (när man clickar utanför menyn så stängs den)

const overlay = document.getElementById("overlay");
const navbarToggle = document.querySelector(".navbar-menu-toggle");

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
		navbarToggle.focus(); // Lägg focus på meny knappen efter menyn stängs
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

// Visa/dölj navbar när man clickar på knappen (Börgar menyn)
navbarToggle?.addEventListener("click", () => {
	if (navbarMenu.classList.contains("show")) {
		closeNavbar();
	} else {
		openNavbar();
	}
});

// Stäng navbar när man clickar på en länk
const navbarLinks = document.querySelectorAll(".navbar-menu a");
navbarLinks.forEach((link) => {
	link.addEventListener("click", () => {
		closeNavbar();
	});
});

// Stäng navbar när man clickar på overlayen
overlay.addEventListener("click", () => {
	closeNavbar();
});

// Stäng nabrar med Escape tangenten
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && navbarMenu.classList.contains("show")) {
		closeNavbar();
	}
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
