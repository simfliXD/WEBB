// ===== LIVE HTML-REDIGERARE FÖR STARTSIDAN =====
// Låter en skriva HTML och se resultatet direkt i förhandsvisningen med hjälp av iframe

// Sätt redigerare och förhandsvisnings elementen som konstanter
const htmlEditor = document.querySelector("[data-html-editor]");
const htmlPreview = document.querySelector("[data-html-preview]");


// trim() tar bort tomrum från början och slutet
// srcdoc gör att vi kan sätta HTML direkt i iframe:en utan extern fil
// Vad jag försåt är det som en till html fil som skapas som en separat process men renderas dikekt i iframe:n
const syncHtmlPreview = () => {
	htmlPreview.srcdoc = htmlEditor.textContent.trim();
};

// Uppdatera vid första sidladdningen
syncHtmlPreview();

// Uppdatera diket något skrivs i redigeraren
htmlEditor.addEventListener("input", syncHtmlPreview);
