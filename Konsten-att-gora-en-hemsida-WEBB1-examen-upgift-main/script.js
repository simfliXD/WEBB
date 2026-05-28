// ===== WEBBPLATSENS HUVUDSKRIPT (Gemensam funktionalitet)=====
// Hanterar mörkt läge, navigeringsmeny och scrollbeteende

// ===== MÖRKT LÄGE =====
// inställt tema sparas i localStorage för att behålla det mellan besök


const darkModeToggle = document.getElementById("darkModeToggle");
const header = document.querySelector("header");

// lägger till eller tar bort CSS-klassen "dark-mode"
// sätter knappen till rätt status beroende på valt tema
function applyTheme(mode) {
	if (mode === "mörkt") {
		document.body.classList.add("dark-mode");
		darkModeToggle.checked = true;
	} else {
		document.body.classList.remove("dark-mode");
		darkModeToggle.checked = false;
	}
}

// Andvändarens preferens
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Ladda sparad tema eller använd användarens preferens
const savedMode = localStorage.getItem("tema");
if (savedMode === "mörkt") {
	applyTheme("mörkt");
} else if (savedMode === "ljust") {
	applyTheme("ljust");
} else {
	// Inget sparat tema, använd användarens preferens
	if (prefersDark) {
		applyTheme("mörkt");
		localStorage.setItem("tema", "mörkt");
	} else {
		applyTheme("ljust");
		localStorage.setItem("tema", "ljust");
	}
}

// Möjliggör mjuk övergång mellan teman (animering)
// requestAnimationFrame väntar på nästa uppdatering av skärmen innan den kör koden
// För att de ser inte bra ut på sidinladdning
requestAnimationFrame(() => {
	document.body.style.transition = "var(--transition-quick) ease";
});

// Lyssnare för toggleknappen samt växlar teman på klick
darkModeToggle?.addEventListener("change", function () {
	if (darkModeToggle.checked) {
		applyTheme("mörkt");
		localStorage.setItem("tema", "mörkt");
	} else {
		applyTheme("ljust");
		localStorage.setItem("tema", "ljust");
	}
});

// ===== NAVIGATIONSMENY - RESPONSIVT BETEENDE =====
// Gömmer menyn automatiskt från tangentbords navigering och skärmläsare -
// på små skärmar (< 1150px)

const mediaQuery = window.matchMedia("(width < 1150px)");
const navbarMenu = document.querySelector(".navbar-menu");

// inert gör att elementet ignoreras vid tabnavigering
// aria-hidden gömmer för skärmläsare
function updateNavbar(e) {
	const isSidebar = e.matches;
	if (isSidebar) {
		navbarMenu.setAttribute("inert", "");
		navbarMenu.setAttribute("aria-hidden", "true");
	} else {
		navbarMenu.removeAttribute("inert");
		navbarMenu.setAttribute("aria-hidden", "false");
	}
}

// Köra vid sidladdning och uppdatera vid fönsterstorleksändring
updateNavbar(mediaQuery);
mediaQuery.addEventListener("change", updateNavbar);

// ===== ÖPPNA/STÄNG NAVIGERINGSMENY =====
// Mobil meny hanteras med CSS-klasser och attributer för tillgänglighet

const overlay = document.getElementById("overlay");
const navbarToggle = document.querySelector(".navbar-menu-toggle");

// Stäng menyn
function closeNavbar() {
	navbarToggle.classList.remove("show");
	navbarToggle.setAttribute("aria-expanded", "false");

	overlay.classList.remove("show");
	navbarMenu.classList.remove("show");

	// inert gör att menyn inte kan nås via tangentbord
	navbarMenu.setAttribute("inert", "");
	navbarMenu.setAttribute("aria-hidden", "true");

	// Flytta tangentbords-fokus tillbaka till hamburgarknappen
	navbarToggle.focus();
}

// Öppna menyn
function openNavbar() {
	navbarToggle.classList.add("show");
	navbarToggle.setAttribute("aria-expanded", "true");

	navbarMenu.classList.add("show");
	navbarMenu.removeAttribute("inert");
	navbarMenu.setAttribute("aria-hidden", "false");

	overlay.classList.add("show");
}

// växlar mellan öppen och stängd meny vid klick på hamburgarknappen
navbarToggle?.addEventListener("click", () => {
	if (navbarMenu.classList.contains("show")) {
		closeNavbar();
	} else {
		openNavbar();
	}
});

// Stäng meny när användaren klickar på bakgrunden (overlay)
// onclick i HTML fungerar även utan JavaScript, så detta är redundant
overlay.addEventListener("click", () => {
	closeNavbar();
});

// Stäng meny när användaren trycker på Escape-tangenten
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && navbarMenu.classList.contains("show")) {
		closeNavbar();
	}
});

// ===== SCROLLNING - DÖLJ/VISA HEADER =====
// Döljer header när användaren scrollar ned för att spara skärmutrymme samt e de koolt
// Visar header igen när användaren scrollar upp

const aside = document.querySelector("aside");

// Spåra föregående scroll-position
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
	const currentScrollY = window.scrollY;
	const scrollDelta = currentScrollY - lastScrollY;

	// Ignorera mycket små scrollningar
	if (Math.abs(scrollDelta) < 5) return;

	// Visa alltid header om hamburgarmenyn är öppen
	if (navbarMenu.classList.contains("show")) return;

	// Scrollar ner och är längre än 120px från toppen = göm header
	if (scrollDelta > 0 && currentScrollY > 120) {
		header.classList.add("hide");
		// Justera sidomenyns position så det ser snyggare ut
		aside.style.top = "1rem";
		aside.style.maxHeight = "calc(100vh - 2rem)";
	} else {
		// Användaren scrollar upp eller är näratoppen = visa header
		header.classList.remove("hide");
		aside.style.top = "calc(var(--header-height) + 1rem)";
		aside.style.maxHeight = "calc(100vh - var(--header-height) - 2rem)";
	}

	lastScrollY = currentScrollY;
});
