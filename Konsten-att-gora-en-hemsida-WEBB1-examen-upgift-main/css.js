document.getElementById("selector-apply").addEventListener("click", () => {
	const bg = document.getElementById("demo-bg").value;
	const text = document.getElementById("demo-text").value;

	// Ta bort gamla stilar om de finns
	const old = document.getElementById("demo-theme-style");
	if (old) old.remove();

	// Injicera ett <style> element som skriver över CSS-variablerna
	// för BÅDE ljust och mörkt läge via högre kaskadprioritet
	const style = document.createElement("style");
	style.id = "demo-theme-style";
	style.textContent = `
							:root, body.dark-mode {
								--background-color: ${bg} !important;
								--text-color: ${text} !important;
								--header-text-color: ${text} !important;
							}
						`;
	document.head.appendChild(style);

});

document.getElementById("selector-reset").addEventListener("click", () => {
	const old = document.getElementById("demo-theme-style");
	if (old) old.remove();
	document.getElementById("demo-bg").value = "#d4d4dc";
	document.getElementById("demo-text").value = "#1d1e22";
	document.getElementById("demo-status").textContent =
		"Återställt till standardfärger.";
});
