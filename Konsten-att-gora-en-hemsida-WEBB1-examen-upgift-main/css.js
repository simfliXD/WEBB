function applyStyle() {
	let old = document.getElementById("custom-theme-style"); // Ta bort tidigare anopassat thema
	if (old) old.remove();

		// Skapa anpassat tema genom att lägga till en style-tag i head
	let style = document.createElement("style");
	style.id = "custom-theme-style";
	style.textContent = `
		:root, body.dark-mode {
			--background-color: ${document.getElementById("custom-bg-color").value} !important;
			--text-color: ${document.getElementById("custom-text-color").value} !important;
			--header-text-color: ${document.getElementById("custom-text-color").value} !important;
		}
	`;
	document.head.appendChild(style); // lägg till temat i slutet av head taggen
}

function resetStyle() {
	let old = document.getElementById("custom-theme-style");
	if (old) old.remove();
	document.getElementById("custom-bg-color").value = "#32f932";
	document.getElementById("custom-text-color").value = "#f90000";
}
