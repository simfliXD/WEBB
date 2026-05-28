// ===== TEMA-ANPASSNING FÖR CSS-SIDAN =====
// Anpassning av CSS sidan med CSS-variabler baserat på input

function applyStyle() {
	// Ta bort tidigare anpassat tema om det finns
	let old = document.getElementById("custom-theme-style");
	if (old) old.remove();

	// Hämta valda färger från inputfälten
	const bgColor = document.getElementById("custom-bg-color").value;
	const textColor = document.getElementById("custom-text-color").value;

	// Skapa en ny style-tag med de anpassade färgvariablerna
	// !important överskriver allt annat som variablarna anges som
	let style = document.createElement("style");
	style.id = "custom-theme-style";
	style.textContent = `
		:root, body.dark-mode {
			--background-color: ${bgColor} !important;
			--text-color: ${textColor} !important;
			--header-text-color: ${textColor} !important;
		}
	`;

	// Lägg till stilen i <head> (intern CSS i html dokumentet)
	document.head.appendChild(style);
}

// Funktion för att återställa till standard-färger
function resetStyle() {
	// Ta bort anpassat tema
	let old = document.getElementById("custom-theme-style");
	if (old) old.remove();

	// Återställ inputfälten till standard-värden
	document.getElementById("custom-bg-color").value = "#32f932";
	document.getElementById("custom-text-color").value = "#f90000";
}
